import type { 
  ComprehensiveAssessmentResult, 
  BaseAssessmentResult, 
  UserProfile, 
  AssessmentResponse,
  DetailedScoreBreakdown,
  RiskAssessment,
  ActionableTip,
  FollowUpRecommendation,
  ProfessionalResources,
  EducationalContent,
  AIInsights,
  OnlineResource
} from '@/types/assessment'

export abstract class BaseAssessmentProcessor<T extends BaseAssessmentResult> {
  protected assessmentType: string

  constructor(assessmentType: string) {
    this.assessmentType = assessmentType
  }

  // Abstract methods that each assessment must implement
  abstract calculateBaseResult(responses: AssessmentResponse[]): T
  abstract categorizeQuestions(responses: AssessmentResponse[]): DetailedScoreBreakdown[]
  abstract assessRisk(baseResult: T, responses: AssessmentResponse[]): RiskAssessment
  abstract generateActionableTips(baseResult: T, responses: AssessmentResponse[], userProfile: UserProfile): ActionableTip[]
  abstract getEducationalContent(): EducationalContent

  // Common methods that can be overridden if needed
  identifyStrengths(responses: AssessmentResponse[], baseResult: T): string[] {
    const strengths: string[] = []
    
    // Find low-scoring items (strengths)
    responses.forEach(response => {
      if (response.value <= 1) {
        strengths.push(this.getStrengthFromLowScore(response.questionId))
      }
    })

    // Add general strengths based on completion
    strengths.push("Completed a mental health assessment, showing self-awareness and proactive approach to wellbeing")
    
    if (baseResult.risk === 'low' || baseResult.risk === 'mild') {
      strengths.push("Currently experiencing manageable levels of symptoms")
    }

    return strengths.filter(Boolean)
  }

  protected abstract getStrengthFromLowScore(questionId: string): string

  generateFollowUpRecommendation(baseResult: T): FollowUpRecommendation {
    let retakeWeeks = 4
    let monitoringFrequency = "Weekly self-check"
    
    switch (baseResult.risk) {
      case 'severe':
      case 'high':
        retakeWeeks = 1
        monitoringFrequency = "Daily monitoring recommended"
        break
      case 'moderately-severe':
      case 'moderate':
        retakeWeeks = 2
        monitoringFrequency = "Every 3-4 days"
        break
      case 'mild':
        retakeWeeks = 3
        monitoringFrequency = "Twice weekly"
        break
      default:
        retakeWeeks = 4
        monitoringFrequency = "Weekly self-check"
    }

    return {
      retakeInWeeks: retakeWeeks,
      monitoringFrequency,
      warningSignsToWatch: this.getWarningSignsToWatch(),
      progressTracking: this.getProgressTrackingMetrics()
    }
  }

  protected abstract getWarningSignsToWatch(): string[]
  protected abstract getProgressTrackingMetrics(): string[]

  async generateAIInsights(
    baseResult: T, 
    responses: AssessmentResponse[], 
    userProfile: UserProfile
  ): Promise<AIInsights> {
    try {
      // Import the AI service dynamically to avoid circular imports
      const { aiService } = await import('./aiService')
      
      // Debug: Check AI service configuration
      console.log('🔍 BaseAssessmentProcessor - AI Service Check:', {
        isConfigured: aiService.isConfigured(),
        isRealAPI: aiService.isRealAPIConfigured(),
        modelInfo: aiService.getCurrentModelInfo()
      })
      
      // Build the AI analysis request
      const aiRequest = {
        assessmentType: this.assessmentType.toUpperCase(),
        totalScore: baseResult.score,
        severity: baseResult.severity,
        responses: responses.map(r => ({
          questionId: r.questionId,
          question: r.question,
          value: r.value,
          selectedOption: r.label
        })),
        userContext: {
          age: userProfile.age && userProfile.age > 0 ? userProfile.age : undefined,
          gender: userProfile.gender,
          country: userProfile.country,
          city: userProfile.city,
          zipCode: userProfile.zipCode,
          previousAssessments: false // Could be tracked in future
        }
      }
      
      console.log('🤖 Calling AI service with request:', aiRequest)
      
      // Call the real AI service
      const aiResponse = await aiService.analyzeAssessmentResults(aiRequest)
      
      console.log('✅ AI service response received:', {
        interpretation: aiResponse.interpretation?.substring(0, 100) + '...',
        personalizedRecommendations: aiResponse.personalizedRecommendations?.length || 0,
        riskFactors: aiResponse.riskFactors?.length || 0,
        positiveFactors: aiResponse.positiveFactors?.length || 0,
        nextSteps: aiResponse.nextSteps?.length || 0,
        model: aiResponse._aiVerification?.model
      })
      
      // Transform AI response to our format
      return {
        personalizedSummary: aiResponse.personalizedSummary || aiResponse.interpretation,
        personalizedMessage: aiResponse.personalizedMessage,
        keyInsights: aiResponse.keyInsights,
        riskAnalysis: aiResponse.riskFactors?.join('. ') || '',
        strengthsIdentified: aiResponse.positiveFactors || [],
        immediateInterventionMessage: aiResponse.immediateInterventionMessage,
        recommendedInterventions: {
          immediate: aiResponse.nextSteps?.slice(0, 2) || [],
          shortTerm: aiResponse.nextSteps?.slice(2, 4) || [],
          longTerm: aiResponse.nextSteps?.slice(4) || []
        },
        personalizedGoals: this.mapAIGoalsToFormat(aiResponse.personalizedGoals),
        personalizedTips: aiResponse.personalizedTips,
        personalizedEncouragement: aiResponse.personalizedEncouragement,
        warningSignsToWatch: aiResponse.warningSignsToWatch,
        dailyPractices: aiResponse.dailyPractices,
        lifestyleRecommendations: {
          exercise: aiResponse.personalizedRecommendations?.filter(rec => 
            rec.toLowerCase().includes('exercise') || rec.toLowerCase().includes('physical')
          ).slice(0, 2).concat(['Regular physical activity as recommended']) || ['Regular physical activity as recommended'],
          nutrition: aiResponse.personalizedRecommendations?.filter(rec => 
            rec.toLowerCase().includes('nutrition') || rec.toLowerCase().includes('eat')
          ).slice(0, 2).concat(['Healthy eating habits as suggested']) || ['Healthy eating habits as suggested'],
          sleep: aiResponse.personalizedRecommendations?.filter(rec => 
            rec.toLowerCase().includes('sleep') || rec.toLowerCase().includes('rest')
          ).slice(0, 2).concat(['Improve sleep hygiene as advised']) || ['Improve sleep hygiene as advised'],
          socialSupport: aiResponse.personalizedRecommendations?.filter(rec => 
            rec.toLowerCase().includes('social') || rec.toLowerCase().includes('support')
          ).slice(0, 2).concat(['Build social connections as recommended']) || ['Build social connections as recommended'],
          stressManagement: aiResponse.personalizedRecommendations?.filter(rec => 
            rec.toLowerCase().includes('stress') || rec.toLowerCase().includes('relax')
          ).slice(0, 2).concat(['Practice stress reduction techniques']) || ['Practice stress reduction techniques']
        },
        _aiVerification: aiResponse._aiVerification
      }
    } catch (error) {
      console.error('AI insights generation failed, using fallback:', error)
      // Fallback to mock insights
      return this.mockAIInsights(baseResult, userProfile)
    }
  }

  protected mapAIGoalsToFormat(aiGoals?: Array<{
    goal: string
    why?: string
    how?: string[]
    timeframe: string
    successMetrics?: string[]
  }>): Array<{
    goal: string
    why?: string
    how?: string[]
    timeframe: string
    steps: string[]
    measurable: string
    successMetrics?: string[]
  }> {
    if (!aiGoals || !Array.isArray(aiGoals)) {
      return [{
        goal: 'Mental Health Self-Care',
        timeframe: '2 weeks',
        steps: [
          'Practice daily mindfulness or relaxation',
          'Maintain regular sleep schedule',
          'Engage in physical activity'
        ],
        measurable: 'Complete self-care activities 5 days per week'
      }]
    }

    return aiGoals.map(goal => ({
      goal: goal.goal,
      why: goal.why,
      how: goal.how,
      timeframe: goal.timeframe,
      steps: goal.how || [],
      measurable: goal.successMetrics?.join(', ') || 'Track progress regularly',
      successMetrics: goal.successMetrics
    }))
  }

  // Legacy method for backward compatibility
  protected generatePersonalizedGoalsFromAI(aiResponse: {
    nextSteps?: string[]
    positiveFactors?: string[]
    personalizedRecommendations?: string[]
    riskFactors?: string[]
  }): Array<{
    goal: string
    timeframe: string
    steps: string[]
    measurable: string
  }> {
    console.log('🎯 Generating personalized goals from AI response:', {
      nextSteps: aiResponse.nextSteps?.length || 0,
      positiveFactors: aiResponse.positiveFactors?.length || 0,
      personalizedRecommendations: aiResponse.personalizedRecommendations?.length || 0,
      riskFactors: aiResponse.riskFactors?.length || 0
    })
    
    // Extract goals from AI recommendations
    const goals = []
    
    // Primary goal from next steps
    if (aiResponse.nextSteps && aiResponse.nextSteps.length > 0) {
      goals.push({
        goal: 'Implement Immediate Action Plan',
        timeframe: '2 weeks',
        steps: aiResponse.nextSteps.slice(0, 3),
        measurable: 'Complete at least 2 of the recommended actions'
      })
    }
    
    // Build on strengths goal
    if (aiResponse.positiveFactors && aiResponse.positiveFactors.length > 0) {
      goals.push({
        goal: 'Strengthen Personal Resilience',
        timeframe: '1 month',
        steps: aiResponse.positiveFactors.slice(0, 3).map(factor => `Develop: ${factor}`),
        measurable: 'Regularly practice identified strengths weekly'
      })
    }
    
    // Address areas of concern
    if (aiResponse.riskFactors && aiResponse.riskFactors.length > 0) {
      goals.push({
        goal: 'Address Key Challenges',
        timeframe: '6 weeks',
        steps: aiResponse.riskFactors.slice(0, 3).map(risk => `Work on: ${risk}`),
        measurable: 'Show improvement in identified risk areas'
      })
    }
    
    // Additional goal from recommendations
    if (aiResponse.personalizedRecommendations && aiResponse.personalizedRecommendations.length > 0) {
      goals.push({
        goal: 'Professional Development Plan',
        timeframe: '3 months',
        steps: aiResponse.personalizedRecommendations.slice(0, 3),
        measurable: 'Follow through on professional recommendations'
      })
    }
    
    // If no goals were created from AI, provide fallback goals
    if (goals.length === 0) {
      console.log('⚠️ No AI goals generated, using fallback goals')
      goals.push({
        goal: 'Mental Health Self-Care',
        timeframe: '2 weeks',
        steps: [
          'Practice daily mindfulness or relaxation',
          'Maintain regular sleep schedule',
          'Engage in physical activity'
        ],
        measurable: 'Complete self-care activities 5 days per week'
      })
    }
    
    console.log(`✅ Generated ${goals.length} personalized goals`)
    return goals
  }

  protected buildAIPrompt(baseResult: T, responses: AssessmentResponse[], userProfile: UserProfile): string {
    return `
      Analyze this ${this.assessmentType} assessment for personalized mental health insights:
      
      User Profile:
      - Age: ${userProfile.age && userProfile.age > 0 ? `${userProfile.age} years old` : 'Not specified'}, Gender: ${userProfile.gender}
      - Location: ${userProfile.city || 'Not specified'}, ${userProfile.country || ''}
      
      Assessment Results:
      - Score: ${baseResult.score}
      - Severity: ${baseResult.severity}
      - Risk Level: ${baseResult.risk}
      
      Individual Responses:
      ${responses.map(r => `${r.question}: ${r.label} (${r.value})`).join('\n')}
      
      Please provide:
      1. Personalized summary
      2. Risk analysis with specific attention to user demographics
      3. Strengths identified
      4. Immediate, short-term, and long-term intervention recommendations
      5. Lifestyle recommendations across all domains
      6. Personalized goals with measurable outcomes
    `
  }

  protected abstract mockAIInsights(baseResult: T, userProfile: UserProfile): AIInsights

  // Main processing method
  async processAssessment(
    responses: AssessmentResponse[],
    userProfile: UserProfile
  ): Promise<ComprehensiveAssessmentResult<T>> {
    const assessmentId = this.generateAssessmentId()
    const baseResult = this.calculateBaseResult(responses)
    
    return {
      assessmentType: this.assessmentType as ComprehensiveAssessmentResult<T>['assessmentType'],
      baseResult,
      userProfile,
      assessmentDate: new Date().toISOString(),
      assessmentId,
      detailedScoreBreakdown: this.categorizeQuestions(responses),
      riskAssessment: this.assessRisk(baseResult, responses),
      strengthsAndPositives: this.identifyStrengths(responses, baseResult),
      actionableTips: this.generateActionableTips(baseResult, responses, userProfile),
      followUpRecommendation: this.generateFollowUpRecommendation(baseResult),
      professionalResources: await this.getProfessionalResources(userProfile),
      educationalContent: this.getEducationalContent(),
      aiInsights: await this.generateAIInsights(baseResult, responses, userProfile),
      completionTime: this.calculateCompletionTime(responses),
      confidenceScore: this.calculateConfidenceScore(responses),
      dataQuality: this.assessDataQuality(responses)
    }
  }

  protected generateAssessmentId(): string {
    return `${this.assessmentType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  protected calculateCompletionTime(responses: AssessmentResponse[]): number {
    if (responses.length === 0) return 0
    
    const startTime = new Date(responses[0].timestamp).getTime()
    const endTime = new Date(responses[responses.length - 1].timestamp).getTime()
    
    return Math.round((endTime - startTime) / 1000) // in seconds
  }

  protected calculateConfidenceScore(responses: AssessmentResponse[]): number {
    // Calculate confidence based on response patterns, completion time, etc.
    let confidence = 100
    
    // Reduce confidence for very quick responses (may indicate not reading carefully)
    const avgTimePerQuestion = this.calculateCompletionTime(responses) / responses.length
    if (avgTimePerQuestion < 10) { // less than 10 seconds per question
      confidence -= 20
    }
    
    // Reduce confidence for incomplete responses
    if (responses.some(r => r.value === undefined || r.value === null)) {
      confidence -= 30
    }
    
    // Reduce confidence for straight-line responses (all same score)
    const uniqueValues = new Set(responses.map(r => r.value)).size
    if (uniqueValues <= 2) {
      confidence -= 25
    }
    
    return Math.max(0, Math.min(100, confidence))
  }

  protected assessDataQuality(responses: AssessmentResponse[]): 'high' | 'medium' | 'low' {
    const confidenceScore = this.calculateConfidenceScore(responses)
    
    if (confidenceScore >= 80) return 'high'
    if (confidenceScore >= 60) return 'medium'
    return 'low'
  }

  protected async getProfessionalResources(userProfile: UserProfile): Promise<ProfessionalResources> {
    console.log('🔍 Getting professional resources for user profile:', {
      country: userProfile.country,
      city: userProfile.city,
      zipCode: userProfile.zipCode
    })
    
    const { LocationService } = await import('./locationService')
    
    try {
      // Use the new AI-powered location service
      const locationBasedResources = await LocationService.getLocationBasedResources({
        country: userProfile.country || 'Unknown',
        city: userProfile.city || 'Unknown',
        zipCode: userProfile.zipCode
      })
      
      console.log('✅ Location-based resources retrieved:', {
        emergencyCount: locationBasedResources.emergencyResources.length,
        providerCount: locationBasedResources.medicalProviders.length
      })
      
      return {
        localProviders: locationBasedResources.medicalProviders.map(provider => ({
          name: provider.name,
          type: (provider.type === 'private-practice' ? 'therapist' : provider.type) as 'psychiatrist' | 'psychologist' | 'therapist' | 'counselor' | 'clinic' | 'hospital',
          address: provider.address,
          phone: provider.phone,
          website: provider.website,
          rating: provider.rating,
          acceptsInsurance: true, // Default to true for now
          specialties: provider.description.toLowerCase().includes('depression') ? ['Depression'] : 
                      provider.description.toLowerCase().includes('anxiety') ? ['Anxiety'] : 
                      provider.description.toLowerCase().includes('mental health') ? ['General Mental Health'] :
                      ['General Mental Health']
        })),
        onlineResources: this.getOnlineResources(),
        emergencyResources: locationBasedResources.emergencyResources
      }
    } catch (error) {
      console.error('❌ Failed to get location-based resources:', error)
      
      // Fallback to basic resources
      return {
        localProviders: [{
          name: `Mental Health Services - ${userProfile.city || 'Your Area'}`,
          type: 'clinic',
          address: `${userProfile.city || 'Your Area'}, ${userProfile.country || 'Your Country'}`,
          phone: 'Contact local directory',
          website: undefined,
          acceptsInsurance: true,
          specialties: ['General Mental Health']
        }],
        onlineResources: this.getOnlineResources(),
        emergencyResources: [{
          name: 'Local Emergency Services',
          phone: 'Contact local emergency services',
          description: 'Reach out to local mental health crisis services',
          availability: 'Varies by location',
          type: 'emergency-services'
        }]
      }
    }
  }

  protected abstract getOnlineResources(): OnlineResource[]
}

// Utility functions for common operations
export class AssessmentUtils {
  static categorizeByScore(score: number, ranges: { min: number; max: number; category: string }[]) {
    for (const range of ranges) {
      if (score >= range.min && score <= range.max) {
        return range.category
      }
    }
    return 'unknown'
  }

  static generateReportId(): string {
    return `REPORT_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }

  static formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  static calculateAge(birthDate: string): number {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  }

  static sanitizeForPDF(text: string): string {
    return text.replace(/[^\w\s\-.,!?()]/g, '').trim()
  }
}
