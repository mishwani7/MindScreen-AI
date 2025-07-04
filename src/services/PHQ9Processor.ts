import { BaseAssessmentProcessor } from './BaseAssessmentProcessor'
import type { 
  PHQ9Result, 
  AssessmentResponse, 
  DetailedScoreBreakdown, 
  RiskAssessment, 
  ActionableTip, 
  UserProfile, 
  EducationalContent,
  AIInsights,
  ProfessionalProvider,
  OnlineResource,
  EmergencyResource
} from '@/types/assessment'

export class PHQ9Processor extends BaseAssessmentProcessor<PHQ9Result> {
  constructor() {
    super('phq9')
  }

  calculateBaseResult(responses: AssessmentResponse[]): PHQ9Result {
    const totalScore = responses.reduce((sum, response) => sum + response.value, 0)
    
    let severity: string
    let risk: PHQ9Result['risk']
    let interpretation: string
    
    if (totalScore <= 4) {
      severity = 'Minimal'
      risk = 'low'
      interpretation = 'Minimal depression symptoms. Continue monitoring your mental health.'
    } else if (totalScore <= 9) {
      severity = 'Mild'
      risk = 'mild'
      interpretation = 'Mild depression symptoms. Consider lifestyle modifications and monitoring.'
    } else if (totalScore <= 14) {
      severity = 'Moderate'
      risk = 'moderate'
      interpretation = 'Moderate depression symptoms. Professional consultation recommended.'
    } else if (totalScore <= 19) {
      severity = 'Moderately Severe'
      risk = 'moderately-severe'
      interpretation = 'Moderately severe depression. Professional treatment strongly recommended.'
    } else {
      severity = 'Severe'
      risk = 'severe'
      interpretation = 'Severe depression symptoms. Immediate professional intervention recommended.'
    }

    // Check for suicidal ideation (question 9)
    const suicidalResponse = responses.find(r => r.questionId === 'phq9_9')
    const suicidalIdeation = suicidalResponse ? suicidalResponse.value > 0 : false

    let functionalImpairment = 'None'
    if (totalScore >= 15) {
      functionalImpairment = 'Severe'
    } else if (totalScore >= 10) {
      functionalImpairment = 'Moderate'
    } else if (totalScore >= 5) {
      functionalImpairment = 'Mild'
    }

    return {
      score: totalScore,
      severity,
      risk,
      interpretation,
      recommendations: this.getBasicRecommendations(risk, suicidalIdeation),
      suicidalIdeation,
      functionalImpairment
    }
  }

  private getBasicRecommendations(risk: string, suicidalIdeation: boolean): string[] {
    const recommendations = []
    
    if (suicidalIdeation) {
      recommendations.push('Seek immediate professional help - contact crisis hotline or emergency services')
    }
    
    if (risk === 'severe' || risk === 'moderately-severe') {
      recommendations.push('Schedule appointment with mental health professional immediately')
      recommendations.push('Consider medication evaluation with psychiatrist')
      recommendations.push('Establish safety plan and support network')
    } else if (risk === 'moderate') {
      recommendations.push('Schedule consultation with therapist or counselor')
      recommendations.push('Consider cognitive behavioral therapy (CBT)')
      recommendations.push('Implement daily self-care routine')
    } else if (risk === 'mild') {
      recommendations.push('Monitor symptoms with regular self-assessment')
      recommendations.push('Focus on sleep hygiene and regular exercise')
      recommendations.push('Consider stress management techniques')
    } else {
      recommendations.push('Continue healthy lifestyle habits')
      recommendations.push('Stay socially connected')
      recommendations.push('Practice stress prevention techniques')
    }
    
    return recommendations
  }

  categorizeQuestions(responses: AssessmentResponse[]): DetailedScoreBreakdown[] {
    const categories = {
      'phq9_1': { category: 'Anhedonia', name: 'Interest/Pleasure' },
      'phq9_2': { category: 'Depressed Mood', name: 'Feeling Down' },
      'phq9_3': { category: 'Sleep', name: 'Sleep Problems' },
      'phq9_4': { category: 'Energy', name: 'Fatigue/Energy' },
      'phq9_5': { category: 'Appetite', name: 'Appetite Changes' },
      'phq9_6': { category: 'Self-Worth', name: 'Guilt/Worthlessness' },
      'phq9_7': { category: 'Concentration', name: 'Concentration Problems' },
      'phq9_8': { category: 'Psychomotor', name: 'Movement Changes' },
      'phq9_9': { category: 'Suicidal Ideation', name: 'Thoughts of Death/Self-Harm' }
    }

    return responses.map(response => {
      const category = categories[response.questionId as keyof typeof categories]
      let impact: 'low' | 'moderate' | 'high' = 'low'
      
      if (response.value >= 3) impact = 'high'
      else if (response.value >= 2) impact = 'moderate'
      
      return {
        questionId: response.questionId,
        question: response.question,
        score: response.value,
        category: category?.category || 'Unknown',
        impact
      }
    })
  }

  assessRisk(baseResult: PHQ9Result, responses: AssessmentResponse[]): RiskAssessment {
    const riskFactors: string[] = []
    const protectiveFactors: string[] = []
    
    // Assess specific risk factors
    responses.forEach(response => {
      if (response.value >= 2) {
        switch (response.questionId) {
          case 'phq9_9':
            riskFactors.push('Suicidal ideation present')
            break
          case 'phq9_6':
            riskFactors.push('Feelings of worthlessness or guilt')
            break
          case 'phq9_3':
            riskFactors.push('Sleep disturbance')
            break
          case 'phq9_7':
            riskFactors.push('Concentration difficulties affecting daily function')
            break
        }
      } else if (response.value === 0) {
        // Protective factors
        switch (response.questionId) {
          case 'phq9_1':
            protectiveFactors.push('Maintains interest in activities')
            break
          case 'phq9_2':
            protectiveFactors.push('Stable mood most days')
            break
          case 'phq9_9':
            protectiveFactors.push('No thoughts of self-harm')
            break
        }
      }
    })

    if (baseResult.score >= 15) {
      riskFactors.push('Severe depression symptoms')
    }

    return {
      immediateIntervention: baseResult.suicidalIdeation || baseResult.score >= 20,
      riskFactors,
      protectiveFactors,
      specificRisks: {
        suicidalIdeation: baseResult.suicidalIdeation,
        selfHarm: baseResult.suicidalIdeation,
        functionalImpairment: baseResult.score >= 10
      }
    }
  }

  generateActionableTips(baseResult: PHQ9Result, responses: AssessmentResponse[], _userProfile: UserProfile): ActionableTip[] {
    const tips: ActionableTip[] = []
    
    // Sleep hygiene tips
    const sleepResponse = responses.find(r => r.questionId === 'phq9_3')
    if (sleepResponse && sleepResponse.value >= 2) {
      tips.push({
        category: 'Sleep Hygiene',
        title: 'Establish Healthy Sleep Patterns',
        description: 'Create a consistent bedtime routine, avoid screens 1 hour before bed, and maintain a cool, dark sleeping environment. Aim for 7-9 hours of sleep per night.',
        difficulty: 'easy',
        timeframe: '1-2 weeks',
        evidenceBased: true
      })
    }
    
    // Energy and activity tips
    const energyResponse = responses.find(r => r.questionId === 'phq9_4')
    const interestResponse = responses.find(r => r.questionId === 'phq9_1')
    if ((energyResponse && energyResponse.value >= 2) || (interestResponse && interestResponse.value >= 2)) {
      tips.push({
        category: 'Behavioral Activation',
        title: 'Gradual Activity Increase',
        description: 'Start with 10-15 minutes of light physical activity daily. Schedule one pleasant activity each day, even if you don\'t feel motivated. Small steps lead to bigger changes.',
        difficulty: 'moderate',
        timeframe: '2-4 weeks',
        evidenceBased: true
      })
    }
    
    // Social connection tips
    tips.push({
      category: 'Social Support',
      title: 'Strengthen Social Connections',
      description: 'Reach out to one trusted person each week. Consider joining a support group or engaging in community activities. Social connection is crucial for mental health recovery.',
      difficulty: 'moderate',
      timeframe: '2-6 weeks',
      evidenceBased: true
    })
    
    // Mindfulness and coping
    if (baseResult.score >= 10) {
      tips.push({
        category: 'Stress Management',
        title: 'Daily Mindfulness Practice',
        description: 'Practice 5-10 minutes of deep breathing or meditation daily. Use grounding techniques when feeling overwhelmed. Apps like Headspace or Calm can help guide you.',
        difficulty: 'easy',
        timeframe: '1-3 weeks',
        evidenceBased: true
      })
    }
    
    // Professional help tip for higher scores
    if (baseResult.score >= 15) {
      tips.push({
        category: 'Professional Support',
        title: 'Seek Professional Treatment',
        description: 'Schedule an appointment with a mental health professional. Consider both therapy (CBT, IPT) and medication evaluation. Professional support significantly improves outcomes.',
        difficulty: 'challenging',
        timeframe: 'Immediate',
        evidenceBased: true
      })
    }
    
    return tips
  }

  protected getStrengthFromLowScore(questionId: string): string {
    const strengthMap: Record<string, string> = {
      'phq9_1': 'Maintains interest and enjoyment in activities',
      'phq9_2': 'Generally maintains positive mood',
      'phq9_3': 'Has healthy sleep patterns',
      'phq9_4': 'Maintains good energy levels',
      'phq9_5': 'Has stable appetite',
      'phq9_6': 'Maintains positive self-regard',
      'phq9_7': 'Has good concentration abilities',
      'phq9_8': 'Maintains normal activity levels',
      'phq9_9': 'No thoughts of self-harm (major protective factor)'
    }
    
    return strengthMap[questionId] || ''
  }

  protected getWarningSignsToWatch(): string[] {
    return [
      'Thoughts of death or self-harm',
      'Significant worsening of mood for several days',
      'Complete loss of interest in all activities',
      'Inability to function at work or in relationships',
      'Severe sleep disturbance (sleeping too much or too little)',
      'Significant appetite changes or weight loss/gain',
      'Increased agitation or severe slowing of movement',
      'Persistent feelings of worthlessness or excessive guilt'
    ]
  }

  protected getProgressTrackingMetrics(): string[] {
    return [
      'Daily mood rating (1-10 scale)',
      'Hours of sleep per night',
      'Energy levels throughout the day',
      'Number of pleasant activities engaged in',
      'Social interactions per week',
      'Exercise or physical activity frequency',
      'Medication adherence (if applicable)',
      'Therapy session attendance'
    ]
  }

  protected mockAIInsights(baseResult: PHQ9Result, userProfile: UserProfile): AIInsights {
    // const ageGroup = userProfile.age < 25 ? 'young adult' : userProfile.age < 50 ? 'adult' : 'older adult'
    
    return {
      personalizedSummary: `Based on your ${baseResult.severity.toLowerCase()} depression screening results, you are experiencing symptoms that may be impacting your daily functioning. As a ${userProfile.age}-year-old ${userProfile.gender}, it's important to address these symptoms with appropriate interventions tailored to your life stage and circumstances.`,
      
      riskAnalysis: baseResult.suicidalIdeation 
        ? 'Your responses indicate thoughts of death or self-harm, which require immediate professional attention. Please contact a mental health professional or crisis hotline today.'
        : `Your risk level is currently ${baseResult.risk}. While concerning, depression is highly treatable with proper support and intervention.`,
      
      strengthsIdentified: [
        'Completed self-assessment showing self-awareness',
        'Seeking help and information about mental health',
        ...(baseResult.score < 15 ? ['Symptoms are at a manageable level with proper support'] : []),
        ...(userProfile.age < 30 ? ['Young age is associated with better treatment response'] : [])
      ],
      
      recommendedInterventions: {
        immediate: baseResult.suicidalIdeation 
          ? ['Contact crisis hotline or emergency services', 'Inform trusted friend/family member', 'Remove means of self-harm']
          : baseResult.score >= 15
          ? ['Schedule mental health appointment within 1 week', 'Establish safety plan', 'Daily check-ins with support person']
          : ['Implement daily self-care routine', 'Monitor symptoms daily', 'Increase social support'],
        
        shortTerm: [
          'Begin therapy (CBT or IPT recommended)',
          'Establish regular sleep schedule',
          'Start light exercise routine',
          'Practice stress management techniques'
        ],
        
        longTerm: [
          'Develop comprehensive treatment plan with professional',
          'Build sustainable coping strategies',
          'Create strong support network',
          'Focus on life goals and meaning-making activities'
        ]
      },
      
      lifestyleRecommendations: {
        sleep: [
          'Maintain consistent bedtime (aim for same time each night)',
          'Limit screen time 1 hour before bed',
          'Create relaxing bedtime routine',
          'Keep bedroom cool and dark'
        ],
        exercise: [
          'Start with 10-15 minutes of walking daily',
          'Try yoga or stretching for mood and flexibility',
          'Consider swimming or cycling for low-impact cardio',
          'Join group fitness classes for social interaction'
        ],
        nutrition: [
          'Eat regular, balanced meals',
          'Include omega-3 rich foods (fish, walnuts)',
          'Limit alcohol and caffeine',
          'Stay hydrated throughout the day'
        ],
        socialSupport: [
          'Schedule regular contact with friends/family',
          'Consider joining support groups',
          'Engage in community activities',
          'Practice open communication about your needs'
        ],
        stressManagement: [
          'Practice daily deep breathing exercises',
          'Try mindfulness meditation',
          'Use progressive muscle relaxation',
          'Engage in creative hobbies or activities'
        ]
      },
      
      personalizedGoals: [
        {
          goal: 'Improve sleep quality',
          timeframe: '2 weeks',
          steps: ['Set consistent bedtime', 'Create bedtime routine', 'Limit evening screen time'],
          measurable: 'Sleep 7-8 hours per night for 5 consecutive days'
        },
        {
          goal: 'Increase physical activity',
          timeframe: '3 weeks',
          steps: ['Walk 10 minutes daily', 'Increase to 20 minutes', 'Add enjoyable physical activity'],
          measurable: 'Exercise 150 minutes per week'
        },
        {
          goal: 'Strengthen social connections',
          timeframe: '1 month',
          steps: ['Contact one friend weekly', 'Join one social activity', 'Practice sharing feelings'],
          measurable: 'Have meaningful conversation with someone weekly'
        }
      ]
    }
  }

  getEducationalContent(): EducationalContent {
    return {
      videos: [
        {
          title: 'Understanding Depression: Signs, Symptoms, and Treatment',
          url: 'https://www.youtube.com/watch?v=z-IR48Mb3W0',
          duration: '8:32',
          thumbnail: '/images/depression-understanding.jpg',
          description: 'A comprehensive overview of depression, its symptoms, and available treatment options.',
          speaker: 'Dr. John Grohol',
          organization: 'Psych Central'
        },
        {
          title: 'Cognitive Behavioral Therapy for Depression',
          url: 'https://www.youtube.com/watch?v=0ViaCs0k2Nc',
          duration: '12:45',
          thumbnail: '/images/cbt-depression.jpg',
          description: 'Learn about CBT techniques that can help manage depression symptoms.',
          speaker: 'Dr. Judith Beck',
          organization: 'Beck Institute'
        },
        {
          title: 'Depression and Sleep: Breaking the Cycle',
          url: 'https://www.youtube.com/watch?v=fm4jBZ1hoss',
          duration: '6:20',
          thumbnail: '/images/depression-sleep.jpg',
          description: 'Understanding the relationship between sleep and depression, with practical tips.'
        }
      ],
      articles: [
        {
          title: 'The Science Behind Depression: What Happens in Your Brain',
          url: 'https://www.healthline.com/health/depression/effects-brain',
          readTime: '8 min read',
          summary: 'Explore how depression affects brain chemistry and structure, and what this means for treatment.',
          author: 'Dr. Timothy Legg',
          source: 'Healthline'
        },
        {
          title: 'Natural Ways to Fight Depression',
          url: 'https://www.mayoclinic.org/diseases-conditions/depression/in-depth/depression-and-exercise/art-20046495',
          readTime: '5 min read',
          summary: 'Evidence-based natural approaches to managing depression symptoms alongside professional treatment.',
          source: 'Mayo Clinic'
        }
      ],
      tips: [
        {
          category: 'Daily Routine',
          icon: '🌅',
          content: [
            'Establish a consistent wake-up time, even on weekends',
            'Create a morning routine that includes pleasant activities',
            'Set small, achievable daily goals',
            'Practice gratitude by writing down three things you\'re thankful for each day'
          ],
          priority: 'high'
        },
        {
          category: 'Self-Care',
          icon: '🛁',
          content: [
            'Take a warm bath or shower to relax',
            'Spend 10-15 minutes in sunlight each day',
            'Practice deep breathing exercises',
            'Engage in activities you used to enjoy, even if they don\'t feel appealing right now'
          ],
          priority: 'high'
        },
        {
          category: 'Social Connection',
          icon: '👥',
          content: [
            'Reach out to one friend or family member each day',
            'Join a support group or online community',
            'Volunteer for a cause you care about',
            'Consider getting a pet for companionship'
          ],
          priority: 'medium'
        }
      ]
    }
  }

  protected async findLocalProviders(_zipCode?: string): Promise<ProfessionalProvider[]> {
    // Mock implementation - integrate with real provider databases
    return [
      {
        name: 'Dr. Sarah Johnson, MD',
        type: 'psychiatrist',
        address: '123 Mental Health Ave, Suite 200',
        phone: '(555) 123-4567',
        email: 'dr.johnson@mindhealth.com',
        website: 'https://www.mindhealth.com',
        specialties: ['Depression', 'Anxiety', 'Medication Management'],
        acceptsInsurance: true,
        distanceKm: 2.3,
        rating: 4.8,
        languagesSpoken: ['English', 'Spanish']
      },
      {
        name: 'Mindful Therapy Center',
        type: 'clinic',
        address: '456 Wellness Blvd',
        phone: '(555) 987-6543',
        website: 'https://www.mindfultherapy.com',
        specialties: ['Individual Therapy', 'Group Therapy', 'CBT', 'DBT'],
        acceptsInsurance: true,
        distanceKm: 3.7,
        rating: 4.6
      },
      {
        name: 'Lisa Chen, LCSW',
        type: 'therapist',
        address: '789 Healing Way, Suite 101',
        phone: '(555) 456-7890',
        specialties: ['Depression', 'Trauma', 'EMDR'],
        acceptsInsurance: false,
        distanceKm: 1.8,
        rating: 4.9
      }
    ]
  }

  protected getOnlineResources(): OnlineResource[] {
    return [
      {
        title: 'BetterHelp Online Therapy',
        url: 'https://www.betterhelp.com',
        type: 'app',
        description: 'Professional online therapy with licensed therapists',
        cost: 'paid',
        rating: 4.2,
        difficulty: 'beginner'
      },
      {
        title: 'Headspace Meditation',
        url: 'https://www.headspace.com',
        type: 'app',
        description: 'Guided meditation and mindfulness exercises',
        cost: 'freemium',
        rating: 4.5,
        difficulty: 'beginner'
      },
      {
        title: 'Feeling Good: The New Mood Therapy',
        url: 'https://www.amazon.com/Feeling-Good-New-Mood-Therapy/dp/0380810336',
        type: 'book',
        description: 'Classic self-help book on cognitive behavioral therapy for depression',
        cost: 'paid',
        rating: 4.7,
        difficulty: 'intermediate'
      }
    ]
  }

  protected getEmergencyResources(): EmergencyResource[] {
    return [
      {
        name: 'National Suicide Prevention Lifeline',
        phone: '988',
        description: '24/7 crisis support for people in suicidal crisis or emotional distress',
        availability: '24/7',
        type: 'crisis-line',
        languages: ['English', 'Spanish']
      },
      {
        name: 'Crisis Text Line',
        phone: 'Text HOME to 741741',
        description: 'Free, 24/7 crisis support via text message',
        availability: '24/7',
        type: 'text-support'
      },
      {
        name: 'SAMHSA National Helpline',
        phone: '1-800-662-4357',
        description: 'Treatment referral and information service for mental health and substance abuse',
        availability: '24/7',
        type: 'crisis-line'
      },
      {
        name: 'Emergency Services',
        phone: '911',
        description: 'For immediate medical emergencies or if you\'re in immediate danger',
        availability: '24/7',
        type: 'emergency-services'
      }
    ]
  }
}
