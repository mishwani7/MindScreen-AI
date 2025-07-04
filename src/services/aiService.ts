// AI Service for DeepSeek-V3-0324 integration via GitHub Models
import { getDemoAIResponse, isDemoMode } from './demoAI'

export interface AIAnalysisRequest {
  assessmentType: string
  totalScore: number
  severity: string
  responses: Array<{
    questionId: string
    question: string
    value: number
    selectedOption: string
  }>
  userContext?: {
    age?: number
    gender?: string
    country?: string
    city?: string
    zipCode?: string
    previousAssessments?: boolean
  }
}

export interface AIVerification {
  isRealAI: boolean
  model: string
  timestamp: string
  responseSource: string
  responseTime?: number
}

export interface AIAnalysisResponse {
  interpretation: string
  personalizedRecommendations: string[]
  riskFactors: string[]
  positiveFactors: string[]
  immediateInterventionMessage?: string  // AI-generated message for crisis situations
  nextSteps: string[]
  professionalReferral: boolean
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
  supportResources: Array<{
    type: string
    resource: string
    description: string
  }>
  followUpSuggestions: string[]
  // Enhanced AI fields for complete personalization
  personalizedSummary?: string
  personalizedMessage?: string
  keyInsights?: string[]
  personalizedTips?: Array<{
    category: string
    title: string
    description: string
    actionSteps: string[]
    personalizedNote?: string
  }>
  personalizedGoals?: Array<{
    goal: string
    why: string
    how: string[]
    timeframe: string
    successMetrics: string[]
  }>
  personalizedEncouragement?: string
  warningSignsToWatch?: string[]
  dailyPractices?: Array<{
    name: string
    description: string
    frequency: string
    personalizedTip: string
  }>
  _aiVerification?: AIVerification
}

export interface AIServiceConfig {
  apiKey: string
  model: string
  endpoint: string
  backupModel?: string
}

class AIService {
  private config: AIServiceConfig
  private baseURL = 'https://models.github.ai/inference'
  private apiKeys: string[]
  private models: string[]
  private currentModelIndex: number = 0

  constructor(config: Partial<AIServiceConfig> = {}) {
    // Collect all available API keys
    this.apiKeys = [
      import.meta.env.VITE_GITHUB_TOKEN,
      import.meta.env.VITE_GITHUB_MODELS_API_KEY,
      import.meta.env.VITE_GITHUB_BACKUP_KEY,
      config.apiKey
    ].filter(key => key && key.trim() !== '' && key !== 'your_github_models_api_key_here')

    // Define available models in priority order (GPT-4 first for production reliability)
    this.models = [
      'openai/gpt-4o',
      'deepseek/DeepSeek-V3-0324'
    ]

    this.config = {
      apiKey: this.apiKeys[0] || '',
      model: this.models[0],
      backupModel: this.models[1],
      endpoint: config.endpoint || '/chat/completions',
      ...config
    }
    
    // AI Service initialized with multi-key and multi-model fallback support
    console.log(`AI Service initialized with ${this.apiKeys.length} API keys and ${this.models.length} models`)
    console.log(`Primary model: ${this.config.model} (GPT-4), Backup model: ${this.config.backupModel} (DeepSeek-V3)`)
  }

  private getCurrentModel(): string {
    return this.models[this.currentModelIndex] || this.config.model
  }

  async analyzeAssessmentResults(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    const startTime = Date.now()
    
    try {
      if (isDemoMode(this.config.apiKey)) {
        console.warn('⚠️ Using demo mode - real AI disabled')
        await new Promise(resolve => setTimeout(resolve, 1500))
        const demoResponse = getDemoAIResponse(request.severity, request.totalScore)
        return {
          ...demoResponse,
          _aiVerification: {
            isRealAI: false,
            model: 'demo-mode',
            timestamp: new Date().toISOString(),
            responseSource: 'hardcoded-demo',
            responseTime: Date.now() - startTime
          }
        }
      }

      console.log('🚀 Attempting real AI analysis...')
      return await this.tryAnalysisWithFallback(request, startTime)
      
    } catch (error: unknown) {
      console.error('❌ AI Service Error:', error)
      console.error('All API keys failed, using fallback response')
      
      // Enhanced fallback with rate limit info
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      const isRateLimit = errorMessage.includes('429') || errorMessage.includes('rate limit')
      
      const fallbackResponse = this.getFallbackResponse(request, isRateLimit)
      return {
        ...fallbackResponse,
        _aiVerification: {
          isRealAI: false,
          model: isRateLimit ? 'rate-limited-fallback' : 'error-fallback',
          timestamp: new Date().toISOString(),
          responseSource: isRateLimit ? 'rate-limited-fallback' : 'error-fallback',
          responseTime: Date.now() - startTime
        }
      }
    }
  }

  private async tryAnalysisWithFallback(request: AIAnalysisRequest, startTime: number): Promise<AIAnalysisResponse> {
    let lastError: Error | null = null
    
    // Try each model with all API keys
    for (let modelIndex = 0; modelIndex < this.models.length; modelIndex++) {
      const currentModel = this.models[modelIndex]
      console.log(`🔄 Trying model: ${currentModel}`)
      
      // Try all API keys for current model
      for (let keyIndex = 0; keyIndex < this.apiKeys.length; keyIndex++) {
        const apiKey = this.apiKeys[keyIndex]
        const attemptNumber = (modelIndex * this.apiKeys.length) + keyIndex + 1
        const totalAttempts = this.models.length * this.apiKeys.length
        
        try {
          console.log(`🚀 Attempting AI call with ${currentModel} using key ${keyIndex + 1}/${this.apiKeys.length} (attempt ${attemptNumber}/${totalAttempts})`)
          
          const result = await this.makeAPICall(request, apiKey, currentModel)
          
          // Success! Update current model and key indices
          this.currentModelIndex = modelIndex
          
          console.log(`✅ AI analysis successful with ${currentModel}`)
          return {
            ...result,
            _aiVerification: {
              isRealAI: true,
              model: currentModel,
              timestamp: new Date().toISOString(),
              responseSource: 'github-models-api',
              responseTime: Date.now() - startTime
            }
          }
          
        } catch (error: unknown) {
          lastError = error as Error
          console.log(`❌ AI call failed with ${currentModel}: ${lastError.message}`)
          
          // If rate limited, try next key immediately
          if (lastError.message.includes('429') || lastError.message.includes('rate limit')) {
            console.log(`⏳ Rate limit hit for ${currentModel}, trying next option...`)
            continue // Try next key or model
          } else {
            // For other errors, also try next option but log the error
            console.log(`🔧 API error for ${currentModel}, trying next option: ${lastError.message}`)
            continue
          }
        }
      }
      
      console.log(`🔄 All keys exhausted for ${currentModel}, trying next model...`)
    }
    
    // All models and keys failed
    console.error('💥 All AI models and API keys exhausted')
    throw lastError || new Error('All AI services unavailable')
  }

  private async makeAPICall(request: AIAnalysisRequest, apiKey: string, model: string): Promise<AIAnalysisResponse> {
    const prompt = this.buildAnalysisPrompt(request)
    
    const response = await fetch(`${this.baseURL}${this.config.endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(model)
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model: model,
        temperature: model.includes('gpt') ? 0.7 : 0.8, // Adjust temperature per model
        top_p: model.includes('gpt') ? 0.9 : 0.1,       // Adjust top_p per model
        max_tokens: 2048
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`AI API request failed: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content

    if (!aiResponse) {
      throw new Error('No response content from AI service')
    }

    return this.parseAIResponse(aiResponse)
  }

  private getSystemPrompt(model?: string): string {
    const modelName = model || this.config.model
    
    return `You are a specialized AI assistant for mental health screening analysis, working with MindScreen AI platform developed by Abu Zar Mishwani. Your role is to provide completely personalized, comprehensive mental health insights.

Model: ${modelName}

PERSONALIZATION REQUIREMENTS:
- Address the user by incorporating their age, gender, and personal context into every response
- Use personalized language that feels like speaking directly to this individual
- Reference their specific responses and patterns throughout your analysis
- Avoid generic advice - everything should be tailored to their unique situation
- Make the user feel understood, validated, and hopeful

COMPREHENSIVE RESPONSE STRUCTURE:
You must provide a complete JSON response with these personalized fields:

{
  "interpretation": "Personalized summary of their mental health picture",
  "personalizedMessage": "Direct, encouraging message to this specific person",
  "keyInsights": ["3-4 personalized insights about their responses"],
  "personalizedRecommendations": ["Specific recommendations based on their profile"],
  "riskFactors": ["Areas of concern specific to their responses"],
  "positiveFactors": ["Their specific strengths and protective factors"],
  "immediateInterventionMessage": "Urgent personalized message if immediate intervention needed (only include if assessment indicates high risk)",
  "nextSteps": ["Immediate, personalized action steps"],
  "personalizedTips": [
    {
      "category": "Daily Wellness",
      "title": "Personalized tip title",
      "description": "Detailed description tailored to them",
      "actionSteps": ["Specific steps they can take"],
      "personalizedNote": "Why this specifically helps them"
    }
  ],
  "personalizedGoals": [
    {
      "goal": "Specific goal for this person", 
      "why": "Why this goal matters for their situation",
      "how": ["Step-by-step personalized approach"],
      "timeframe": "Realistic timeframe for them",
      "successMetrics": ["How they'll know they're improving"]
    }
  ],
  "dailyPractices": [
    {
      "name": "Practice name",
      "description": "What it involves for them specifically",
      "frequency": "How often they should do it",
      "personalizedTip": "Why this will help their specific situation"
    }
  ],
  "warningSignsToWatch": ["Personalized warning signs based on their profile"],
  "personalizedEncouragement": "Hopeful, personalized message for this individual",
  "supportResources": [
    {
      "type": "Emergency/Local Provider/National Backup",
      "resource": "Actual facility/service name with contact",
      "description": "What services they provide and why relevant to this person"
    }
  ],
  "followUpSuggestions": ["Personalized follow-up recommendations"],
  "professionalReferral": true/false,
  "urgencyLevel": "low/medium/high/critical"
}

PERSONALIZATION GUIDELINES:
- If they're young (under 25): Focus on academic/career stress, peer relationships, future planning
- If they're older (over 40): Consider work-life balance, family responsibilities, life transitions
- For women: Consider hormonal factors, societal pressures, caregiving roles
- For men: Address stigma around seeking help, encourage emotional expression
- For parents: Include family impact, role modeling, balancing self-care
- For students: Academic pressure, social dynamics, future anxiety
- For working adults: Work stress, career concerns, work-life balance

CRISIS INTERVENTION:
- Include "immediateInterventionMessage" only when scores indicate high risk or crisis
- Message should be urgent, specific, and actionable for their situation
- Focus on immediate safety and professional help seeking
- Be direct but supportive about the need for immediate attention

LOCATION-SPECIFIC RESOURCES:
When location is provided, include:
- Actual local mental health facilities with real names, addresses, phones (research actual facilities in that area)
- Local emergency numbers specific to that country/region  
- Real hospitals that provide psychiatric services in that location
- Community mental health centers and NGOs operating in that area
- Telehealth options if rural/remote areas have limited resources
- Format as realistic, actionable contact information

Example for Pakistan/Chitral:
- DHQ Hospital Chitral: (0943) 412207, Near Governor Cottage Road
- Emergency Services: Police 15, Rescue 1122, Mental Health Helpline 0311-7786264
- Aga Khan Health Services for community support

TONE AND STYLE:
- Warm, encouraging, and hopeful
- Professional yet conversational  
- Validating of their experience
- Specific and actionable
- Culturally sensitive
- Gender and age appropriate WITHOUT explicitly mentioning "as a 23-year-old" or "being from Chitral"
- Use context-aware personalization that feels natural, not formulaic

Remember: This person took time to complete an assessment - acknowledge their courage and commitment to their mental health. Make them feel seen, understood, and supported.

CRITICAL: Use professional, natural language. Avoid formulaic phrases like "as a 23-year-old" or "being from [location]". Instead, let the personalization come through in the specific advice, recommendations, and cultural sensitivity without explicitly stating demographics.

Always respond in valid JSON format only. No additional text outside the JSON structure.`
  }

  private buildAnalysisPrompt(request: AIAnalysisRequest): string {
    const { assessmentType, totalScore, severity, responses, userContext } = request

    // Generate varied prompt structures
    const promptVariations = [
      {
        opening: `I need your expert analysis of this ${assessmentType} assessment:`,
        structure: 'clinical-first',
        tone: 'professional'
      },
      {
        opening: `Please help me understand these ${assessmentType} screening results:`,
        structure: 'empathetic-first', 
        tone: 'supportive'
      },
      {
        opening: `Let's examine this ${assessmentType} assessment together:`,
        structure: 'collaborative',
        tone: 'partnered'
      }
    ]

    const variation = promptVariations[Math.floor(Math.random() * promptVariations.length)]

    let prompt = `${variation.opening}

**Assessment Overview:**
- Total Score: ${totalScore} (${severity} level)
- Assessment Type: ${assessmentType}
- Number of Questions: ${responses.length}

**Detailed Responses:**
${responses.map((r, index) => 
  `${index + 1}. ${r.question}\n   Answer: ${r.selectedOption} (Score: ${r.value})`
).join('\n')}
`

    if (userContext) {
      prompt += `\n**Individual Context:**`
      if (userContext.age && userContext.age > 0) prompt += `\n- Age: ${userContext.age} years old`
      if (userContext.gender && userContext.gender !== 'prefer-not-to-say') {
        prompt += `\n- Gender: ${userContext.gender}`
      }
      if (userContext.previousAssessments) {
        prompt += `\n- Previous assessment experience: Yes`
      }
      
      // Add location context if available
      if (userContext.country || userContext.city || userContext.zipCode) {
        prompt += `\n- Location: `
        const locationParts = []
        if (userContext.city) locationParts.push(userContext.city)
        if (userContext.country) locationParts.push(userContext.country)
        if (userContext.zipCode) locationParts.push(`(${userContext.zipCode})`)
        prompt += locationParts.join(', ')
        prompt += `\n  * Please provide specific mental health resources, providers, and services available in this location`
        prompt += `\n  * Include realistic provider names, addresses, phone numbers, and specialties for this area`
        prompt += `\n  * Research and include actual hospitals, clinics, and mental health centers operating in this location`
        prompt += `\n  * Provide local emergency numbers and crisis services specific to this country/region`
        prompt += `\n  * If resources are limited in this area, suggest telehealth options and explain alternatives`
      }
    }

    // Vary the analysis request based on the selected variation
    if (variation.structure === 'clinical-first') {
      prompt += `\n\nPlease provide a thorough clinical interpretation focusing on:
1. Evidence-based analysis of the score and response patterns
2. Risk stratification and immediate safety considerations
3. Differential considerations and symptom clusters
4. Evidence-based treatment recommendations
5. Personalized coping strategies and self-care approaches
6. Professional referral guidelines and urgency assessment
7. Location-specific mental health resources and providers
8. Concrete follow-up planning and monitoring suggestions`
    } else if (variation.structure === 'empathetic-first') {
      prompt += `\n\nI'd like you to approach this with empathy and hope while being clinically accurate:
1. Acknowledge the person's experience with validation and understanding
2. Highlight their strengths and positive coping factors
3. Provide gentle guidance on what these results mean
4. Offer encouraging yet realistic next steps
5. Suggest supportive resources and community connections
6. Address any concerning findings with care and sensitivity
7. Recommend local mental health professionals and services
8. Provide hope-filled follow-up recommendations`
    } else {
      prompt += `\n\nLet's work together to understand these results and create a path forward:
1. What do these patterns tell us about the current mental health picture?
2. What strengths and resources can we build upon?
3. What areas might benefit from additional support or intervention?
4. How can we create a personalized action plan?
5. What local resources and professionals could be helpful?
6. How should we monitor progress and adjust the approach?
7. What emergency resources should be readily available?
8. How can we maintain hope and motivation for positive change?`
    }

    prompt += `\n\nIMPORTANT REQUIREMENTS:
- Provide varied, unique analysis - avoid repetitive patterns or templates
- Use different terminology and explanations than in previous assessments
- Be specific about location-based resources when location is provided
- Balance clinical accuracy with accessibility and hope
- Address crisis situations with appropriate urgency if indicated
- Respond in valid JSON format matching the AIAnalysisResponse interface

Remember: Each person's mental health journey is unique. Tailor your response to feel personally crafted for this individual's specific situation, context, and location.`

    return prompt
  }

  private parseAIResponse(response: string): AIAnalysisResponse {
    try {
      
      // Try to extract JSON from the response - handle markdown code blocks
      let jsonString = response
      
      // Remove markdown code block markers if present
      const codeBlockMatch = response.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
      if (codeBlockMatch) {
        jsonString = codeBlockMatch[1]
      } else {
        // Try to extract JSON object
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          jsonString = jsonMatch[0]
        }
      }
      
      const parsed = JSON.parse(jsonString)
        
      // Handle different response structures
      let data = parsed
      if (parsed.analysis) {
        data = parsed.analysis // Handle nested structure
      }
      
      // Map the response to our expected format with extensive field mapping
      const interpretation = data.interpretation || 
                       data.personalizedInterpretation || 
                       data.message_of_hope || 
                       data.messageOfHope ||
                       data.summary || 
                       data.analysis_summary || 
                       'Analysis completed successfully.'
      
      return {
        interpretation,
        personalizedRecommendations: this.extractStringArray(data, [
          'personalizedRecommendations', 'recommendations', 'suggested_actions', 'advice', 'personal_recommendations',
          'specificRecommendations', 'concreteNextSteps'
        ]),
        riskFactors: this.extractStringArray(data, [
          'riskFactors', 'risk_factors', 'concerns', 'warning_signs', 'areas_of_concern',
          'identifiedRiskFactors'
        ]),
        positiveFactors: this.extractStringArray(data, [
          'positiveFactors', 'positive_factors', 'strengths', 'protective_factors', 'positive_aspects'
        ]),
        immediateInterventionMessage: data.immediateInterventionMessage as string || 
                                    data.immediate_intervention_message as string ||
                                    data.crisisMessage as string ||
                                    data.urgentMessage as string,
        nextSteps: this.extractStringArray(data, [
          'nextSteps', 'next_steps', 'immediate_actions', 'action_items', 'recommended_steps',
          'concreteNextSteps'
        ]),
        professionalReferral: Boolean(
          data.professionalReferral || 
          data.professional_referral?.recommended || 
          data.professional_referral || 
          data.seek_professional_help
        ),
        urgencyLevel: this.extractUrgencyLevel(data),
        supportResources: this.extractSupportResources(data),
        followUpSuggestions: this.extractStringArray(data, [
          'followUpSuggestions', 'follow_up_suggestions', 'followup', 'future_steps', 'follow_up'
        ]),
        // Enhanced personalized fields
        personalizedSummary: data.personalizedSummary as string || data.interpretation as string,
        personalizedMessage: data.personalizedMessage as string,
        keyInsights: this.extractStringArray(data, ['keyInsights', 'key_insights', 'insights']),
        personalizedTips: this.extractPersonalizedTips(data),
        personalizedGoals: this.extractPersonalizedGoals(data),
        personalizedEncouragement: data.personalizedEncouragement as string,
        warningSignsToWatch: this.extractStringArray(data, ['warningSignsToWatch', 'warning_signs', 'warningSignsToWatch']),
        dailyPractices: this.extractDailyPractices(data)
      }
      
    } catch (error: unknown) {
      console.error('Error parsing AI response:', error)
      throw new Error('Failed to parse AI response')
    }
  }

  private extractStringArray(data: Record<string, unknown>, fieldNames: string[]): string[] {
    for (const fieldName of fieldNames) {
      if (Array.isArray(data[fieldName])) {
        return data[fieldName]
          .filter((item: unknown) => typeof item === 'string' && item.trim().length > 0)
          .map((item: string) => item.trim())
      }
    }
    return []
  }
  
  private extractUrgencyLevel(data: Record<string, unknown>): 'low' | 'medium' | 'high' | 'critical' {
    const possibleFields = ['urgencyLevel', 'urgency_level', 'urgency', 'priority']
    
    for (const field of possibleFields) {
      if (data[field]) {
        const value = data[field].toString().toLowerCase()
        if (['low', 'medium', 'high', 'critical'].includes(value)) {
          return value as 'low' | 'medium' | 'high' | 'critical'
        }
        // Map common variations
        if (value.includes('immediate') || value.includes('urgent')) return 'critical'
        if (value.includes('high')) return 'high'
        if (value.includes('low')) return 'low'
      }
    }
    
    // Check professional referral urgency
    const professionalReferral = data.professional_referral as Record<string, unknown>
    if (professionalReferral?.urgency) {
      const urgency = professionalReferral.urgency.toString().toLowerCase()
      if (urgency.includes('immediate')) return 'critical'
      if (urgency.includes('urgent') || urgency.includes('high')) return 'high'
      if (urgency.includes('low')) return 'low'
    }
    
    return 'medium'
  }
  
  private extractSupportResources(data: Record<string, unknown>): Array<{ type: string; resource: string; description: string }> {
    const resourceFields = ['supportResources', 'support_resources', 'resources', 'help_resources']
    
    for (const field of resourceFields) {
      if (Array.isArray(data[field])) {
        return data[field].map((resource: unknown) => {
          const r = resource as Record<string, unknown>
          if (typeof resource === 'string') {
            return {
              type: 'Support',
              resource: resource,
              description: resource
            }
          }
          return {
            type: (r.type as string) || (r.category as string) || 'Support',
            resource: (r.resource as string) || (r.name as string) || (r.title as string) || 'Resource',
            description: (r.description as string) || (r.contact as string) || (r.url as string) || (r.info as string) || 'Support resource available'
          }
        })
      }
    }
    return []
  }

  private extractPersonalizedTips(data: Record<string, unknown>): Array<{
    category: string
    title: string
    description: string
    actionSteps: string[]
    personalizedNote?: string
  }> {
    const tips = data.personalizedTips || data.personalized_tips || data.tips
    if (Array.isArray(tips)) {
      return tips.map((tip: Record<string, unknown>) => ({
        category: (tip.category as string) || 'Wellness',
        title: (tip.title as string) || 'Personalized Tip',
        description: (tip.description as string) || '',
        actionSteps: Array.isArray(tip.actionSteps) ? tip.actionSteps as string[] : (Array.isArray(tip.action_steps) ? tip.action_steps as string[] : []),
        personalizedNote: (tip.personalizedNote as string) || (tip.personalized_note as string)
      }))
    }
    return []
  }

  private extractPersonalizedGoals(data: Record<string, unknown>): Array<{
    goal: string
    why: string
    how: string[]
    timeframe: string
    successMetrics: string[]
  }> {
    const goals = data.personalizedGoals || data.personalized_goals || data.goals
    if (Array.isArray(goals)) {
      return goals.map((goal: Record<string, unknown>) => ({
        goal: (goal.goal as string) || 'Personal Goal',
        why: (goal.why as string) || (goal.reason as string) || '',
        how: Array.isArray(goal.how) ? goal.how as string[] : [],
        timeframe: (goal.timeframe as string) || (goal.timeline as string) || '2-4 weeks',
        successMetrics: Array.isArray(goal.successMetrics) ? goal.successMetrics as string[] : (Array.isArray(goal.success_metrics) ? goal.success_metrics as string[] : [])
      }))
    }
    return []
  }

  private extractDailyPractices(data: Record<string, unknown>): Array<{
    name: string
    description: string
    frequency: string
    personalizedTip: string
  }> {
    const practices = data.dailyPractices || data.daily_practices || data.practices
    if (Array.isArray(practices)) {
      return practices.map((practice: Record<string, unknown>) => ({
        name: (practice.name as string) || 'Daily Practice',
        description: (practice.description as string) || '',
        frequency: (practice.frequency as string) || 'Daily',
        personalizedTip: (practice.personalizedTip as string) || (practice.personalized_tip as string) || ''
      }))
    }
    return []
  }

  private getFallbackResponse(request: AIAnalysisRequest, isRateLimit: boolean = false): AIAnalysisResponse {
    const { severity, totalScore } = request
    
    const rateLimitMessage = isRateLimit 
      ? "Due to high demand, our AI analysis service is currently rate-limited. Please try again in a few minutes for personalized AI insights. "
      : "While AI analysis is temporarily unavailable, "
    
    return {
      interpretation: `Based on your assessment results (Score: ${totalScore}, Severity: ${severity}), this screening provides important insights into your current mental health status. ${rateLimitMessage}your results indicate specific areas that may benefit from attention and support.`,
      personalizedRecommendations: [
        'Consider discussing these results with a healthcare provider',
        'Maintain regular sleep, exercise, and nutrition routines',
        'Stay connected with supportive friends and family',
        'Practice stress management techniques like deep breathing or meditation',
        'Monitor your symptoms and seek help if they worsen'
      ],
      riskFactors: severity === 'Severe' || severity === 'Moderately Severe' 
        ? ['High symptom severity requiring professional attention']
        : ['Symptoms may impact daily functioning'],
      positiveFactors: [
        'Taking proactive steps by completing this assessment',
        'Seeking information about mental health',
        'Opportunity for early intervention and support'
      ],
      nextSteps: [
        'Schedule an appointment with a healthcare provider',
        'Keep a mood diary to track patterns',
        'Explore available mental health resources',
        'Consider joining support groups or communities'
      ],
      professionalReferral: ['Moderate', 'Moderately Severe', 'Severe'].includes(severity),
      urgencyLevel: severity === 'Severe' ? 'high' : severity === 'Moderately Severe' ? 'medium' : 'low',
      supportResources: [
        {
          type: 'Crisis Support',
          resource: '988 Suicide & Crisis Lifeline',
          description: '24/7 free and confidential support for people in crisis'
        },
        {
          type: 'Mental Health',
          resource: 'Psychology Today Provider Directory',
          description: 'Find mental health professionals in your area'
        },
        {
          type: 'Online Support',
          resource: 'NAMI (National Alliance on Mental Illness)',
          description: 'Educational resources and support groups'
        }
      ],
      followUpSuggestions: [
        'Retake this assessment in 2-4 weeks to monitor changes',
        'Consider taking additional screenings if recommended',
        'Share results with trusted healthcare providers',
        'Keep track of factors that influence your symptoms'
      ]
    }
  }

  // Utility method to check if API is configured
  isConfigured(): boolean {
    return Boolean(this.config.apiKey && this.config.apiKey.trim() !== '')
  }

  // Utility method to check if real API is configured (not demo)
  isRealAPIConfigured(): boolean {
    return Boolean(this.config.apiKey && this.config.apiKey.trim() !== '') && !isDemoMode(this.config.apiKey)
  }

  // Utility method to get current model information
  getCurrentModelInfo(): { model: string; backupModel: string; availableKeys: number } {
    return {
      model: this.getCurrentModel(),
      backupModel: this.config.backupModel || 'none',
      availableKeys: this.apiKeys.length
    }
  }

  // Utility method to reset model/key rotation
  resetRotation(): void {
    this.currentModelIndex = 0
  }

  // Method to update configuration
  updateConfig(newConfig: Partial<AIServiceConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }
}

// Export singleton instance
export const aiService = new AIService()

// For external access and configuration
export { aiService as default }

// Export utility functions
export const formatAIRecommendations = (recommendations: string[]): string[] => {
  return recommendations.map(rec => rec.trim()).filter(rec => rec.length > 0)
}

export const getUrgencyColor = (urgencyLevel: string): string => {
  switch (urgencyLevel) {
    case 'low': return 'text-green-600 bg-green-50 border-green-200'
    case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200' 
    case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
    case 'critical': return 'text-red-600 bg-red-50 border-red-200'
    default: return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}
