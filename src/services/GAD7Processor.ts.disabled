import { BaseAssessmentProcessor } from './BaseAssessmentProcessor'
import type { 
  AssessmentResponse, 
  UserProfile, 
  BaseAssessmentResult, 
  DetailedScoreBreakdown, 
  RiskAssessment, 
  ActionableTip, 
  FollowUpRecommendation,
  AIInsights
} from '@/types/assessment'

// GAD-7 specific result interface
export interface GAD7Result extends BaseAssessmentResult {
  totalScore: number
  severity: 'Minimal' | 'Mild' | 'Moderate' | 'Severe'
  anxietyLevel: 'low' | 'mild' | 'moderate' | 'severe'
  interpretation: string
  recommendations: string[]
}

export class GAD7Processor extends BaseAssessmentProcessor<GAD7Result> {
  protected assessmentType = 'GAD-7' as const

  calculateBaseResult(responses: AssessmentResponse[]): GAD7Result {
    const totalScore = responses.reduce((sum, response) => sum + response.value, 0)
    
    let severity: GAD7Result['severity']
    let anxietyLevel: GAD7Result['anxietyLevel']
    
    if (totalScore <= 4) {
      severity = 'Minimal'
      anxietyLevel = 'low'
    } else if (totalScore <= 9) {
      severity = 'Mild'
      anxietyLevel = 'mild'
    } else if (totalScore <= 14) {
      severity = 'Moderate'
      anxietyLevel = 'moderate'
    } else {
      severity = 'Severe'
      anxietyLevel = 'severe'
    }

    const interpretation = this.getInterpretation(severity, totalScore)
    const recommendations = this.getRecommendations(severity, totalScore)

    return {
      score: totalScore,
      severity,
      risk: anxietyLevel,
      totalScore,
      anxietyLevel,
      interpretation,
      recommendations
    }
  }

  private getInterpretation(severity: string, score: number): string {
    switch (severity) {
      case 'Minimal':
        return `Your GAD-7 score of ${score} suggests minimal anxiety symptoms. You're experiencing very few symptoms that may not significantly impact your daily life.`
      case 'Mild':
        return `Your GAD-7 score of ${score} indicates mild anxiety symptoms. You may experience some worry or nervousness that occasionally affects your daily activities.`
      case 'Moderate':
        return `Your GAD-7 score of ${score} suggests moderate anxiety symptoms. You're likely experiencing frequent worry and anxiety that impacts various aspects of your life.`
      case 'Severe':
        return `Your GAD-7 score of ${score} indicates severe anxiety symptoms. You're experiencing significant anxiety that substantially interferes with your daily functioning and quality of life.`
      default:
        return `Your GAD-7 score of ${score} has been recorded.`
    }
  }

  private getRecommendations(severity: string, score: number): string[] {
    const baseRecommendations = [
      'Practice deep breathing exercises and mindfulness techniques',
      'Maintain regular exercise and healthy sleep habits',
      'Consider keeping a worry journal to identify triggers'
    ]

    switch (severity) {
      case 'Minimal':
        return [
          ...baseRecommendations,
          'Continue current stress management practices',
          'Monitor for any changes in anxiety levels'
        ]
      case 'Mild':
        return [
          ...baseRecommendations,
          'Consider stress reduction techniques like yoga or meditation',
          'Evaluate and manage sources of stress in your life'
        ]
      case 'Moderate':
        return [
          ...baseRecommendations,
          'Consider speaking with a mental health professional',
          'Explore therapy options such as Cognitive Behavioral Therapy (CBT)',
          'Discuss treatment options with your healthcare provider'
        ]
      case 'Severe':
        return [
          'Seek professional help from a mental health specialist immediately',
          'Contact your primary care physician to discuss treatment options',
          'Consider both therapy and medication evaluation',
          'Reach out to trusted friends or family for support',
          'Create a safety plan for managing severe anxiety episodes'
        ]
      default:
        return baseRecommendations
    }
  }

  categorizeQuestions(responses: AssessmentResponse[]): DetailedScoreBreakdown[] {
    const categories = {
      'nervous': 'General Anxiety',
      'control_worry': 'Worry Control', 
      'worrying': 'Excessive Worry',
      'trouble_relaxing': 'Relaxation Difficulty',
      'restless': 'Restlessness',
      'annoyed': 'Irritability',
      'afraid': 'Fear Response'
    }

    return responses.map((response, index) => ({
      questionId: response.questionId,
      question: response.question,
      score: response.value,
      category: Object.keys(categories)[index] || 'general',
      categoryName: Object.values(categories)[index] || 'General Anxiety',
      impact: response.value >= 2 ? 'high' : response.value === 1 ? 'moderate' : 'low',
      description: this.getQuestionDescription(response.value)
    }))
  }

  private getQuestionDescription(score: number): string {
    switch (score) {
      case 0: return 'Not bothered by this symptom'
      case 1: return 'Occasionally bothered by this symptom'
      case 2: return 'Frequently bothered by this symptom'
      case 3: return 'Nearly always bothered by this symptom'
      default: return 'Response recorded'
    }
  }

  assessRisk(baseResult: GAD7Result, responses: AssessmentResponse[]): RiskAssessment {
    const highScoreQuestions = responses.filter(r => r.value >= 2)
    const severeSymptoms = responses.filter(r => r.value === 3)
    
    return {
      overallRisk: baseResult.anxietyLevel,
      immediateIntervention: baseResult.severity === 'Severe',
      riskFactors: [
        ...(highScoreQuestions.length >= 4 ? ['Multiple high-severity anxiety symptoms'] : []),
        ...(severeSymptoms.length >= 2 ? ['Several severe anxiety symptoms present'] : []),
        ...(baseResult.totalScore >= 15 ? ['Very high anxiety score indicating severe impairment'] : [])
      ],
      protectiveFactors: [
        ...(baseResult.totalScore <= 4 ? ['Low overall anxiety levels'] : []),
        ...(responses.some(r => r.value === 0) ? ['Some areas without anxiety symptoms'] : [])
      ],
      recommendations: baseResult.severity === 'Severe' 
        ? ['Immediate professional consultation recommended', 'Consider emergency support if experiencing panic attacks']
        : ['Regular monitoring and self-care practices recommended']
    }
  }

  identifyStrengths(responses: AssessmentResponse[], baseResult: GAD7Result): string[] {
    const strengths = []
    
    if (baseResult.totalScore <= 4) {
      strengths.push('Low overall anxiety levels indicate good emotional regulation')
    }
    
    const lowScoreCount = responses.filter(r => r.value <= 1).length
    if (lowScoreCount >= 4) {
      strengths.push('Minimal symptoms in most anxiety domains')
    }
    
    if (responses.some(r => r.value === 0)) {
      strengths.push('Complete absence of anxiety in some areas')
    }

    if (strengths.length === 0) {
      strengths.push('Seeking help and self-awareness about anxiety symptoms')
      strengths.push('Taking proactive steps toward mental health assessment')
    }
    
    return strengths
  }

  generateActionableTips(baseResult: GAD7Result, responses: AssessmentResponse[], _userProfile: UserProfile): ActionableTip[] {
    const tips: ActionableTip[] = []

    // Breathing and relaxation tips
    tips.push({
      category: 'Relaxation Techniques',
      title: 'Practice Progressive Muscle Relaxation',
      description: 'Spend 10-15 minutes daily tensing and relaxing different muscle groups to reduce physical anxiety symptoms.',
      difficulty: 'easy',
      timeframe: '1-2 weeks',
      priority: 'high'
    })

    // Worry management
    const worryResponse = responses.find(r => r.questionId.includes('worry'))
    if (worryResponse && worryResponse.value >= 2) {
      tips.push({
        category: 'Worry Management',
        title: 'Implement Worry Time Technique',
        description: 'Set aside 15 minutes daily to write down worries, then practice letting them go outside this designated time.',
        difficulty: 'moderate',
        timeframe: '2-3 weeks',
        priority: 'high'
      })
    }

    // Exercise and movement
    tips.push({
      category: 'Physical Activity',
      title: 'Regular Anxiety-Reducing Exercise',
      description: 'Engage in 20-30 minutes of moderate exercise (walking, swimming, yoga) to naturally reduce anxiety levels.',
      difficulty: 'easy',
      timeframe: '1 week',
      priority: 'medium'
    })

    // Sleep hygiene for anxiety
    tips.push({
      category: 'Sleep & Rest',
      title: 'Optimize Sleep for Anxiety Management',
      description: 'Establish a calming bedtime routine and avoid screens 1 hour before sleep to improve rest quality.',
      difficulty: 'easy',
      timeframe: '1-2 weeks',
      priority: 'medium'
    })

    return tips
  }

  generateFollowUpRecommendation(baseResult: GAD7Result): FollowUpRecommendation {
    const baseRecommendation = {
      warningSignsToWatch: [
        'Increased frequency or intensity of worry',
        'Physical symptoms like rapid heartbeat or shortness of breath',
        'Avoidance of normal activities due to anxiety',
        'Sleep disturbances or changes in appetite'
      ]
    }

    switch (baseResult.severity) {
      case 'Minimal':
        return {
          ...baseRecommendation,
          retakeInWeeks: 12,
          monitoringFrequency: 'quarterly',
          nextSteps: ['Continue self-care practices', 'Annual mental health check-ins']
        }
      case 'Mild':
        return {
          ...baseRecommendation,
          retakeInWeeks: 8,
          monitoringFrequency: 'monthly',
          nextSteps: ['Monitor symptoms', 'Consider counseling if symptoms worsen']
        }
      case 'Moderate':
        return {
          ...baseRecommendation,
          retakeInWeeks: 4,
          monitoringFrequency: 'bi-weekly',
          nextSteps: ['Schedule appointment with mental health professional', 'Begin therapy or counseling']
        }
      case 'Severe':
        return {
          ...baseRecommendation,
          retakeInWeeks: 2,
          monitoringFrequency: 'weekly',
          nextSteps: ['Immediate professional consultation', 'Consider medication evaluation', 'Weekly therapy sessions']
        }
      default:
        return {
          ...baseRecommendation,
          retakeInWeeks: 8,
          monitoringFrequency: 'monthly',
          nextSteps: ['Regular monitoring recommended']
        }
    }
  }

  protected mockAIInsights(baseResult: GAD7Result, userProfile: UserProfile): AIInsights {
    return {
      personalizedSummary: `Based on your ${baseResult.severity.toLowerCase()} anxiety screening results, you are experiencing ${baseResult.anxietyLevel} levels of anxiety symptoms. As a ${userProfile.age}-year-old ${userProfile.gender}, it's important to address these symptoms with appropriate anxiety management strategies tailored to your life circumstances.`,
      riskAnalysis: baseResult.severity === 'Severe' 
        ? 'Your results indicate severe anxiety that requires immediate professional attention. This level of anxiety can significantly impact daily functioning and quality of life.'
        : `Your anxiety levels are in the ${baseResult.severity.toLowerCase()} range, which ${baseResult.severity === 'Minimal' ? 'suggests good anxiety management' : 'may benefit from targeted interventions'}.`,
      strengthsIdentified: [
        'Proactive approach to mental health assessment',
        'Willingness to seek help and support',
        ...(baseResult.totalScore <= 9 ? ['Manageable anxiety levels'] : []),
        ...(userProfile.age < 30 ? ['Young age associated with better treatment response'] : [])
      ],
      recommendedInterventions: {
        immediate: baseResult.severity === 'Severe' 
          ? ['Professional consultation', 'Crisis support if needed', 'Safety planning']
          : ['Self-care practices', 'Stress reduction techniques'],
        shortTerm: [
          'Regular exercise routine',
          'Mindfulness and relaxation training',
          'Sleep hygiene improvements',
          ...(baseResult.severity !== 'Minimal' ? ['Counseling or therapy'] : [])
        ],
        longTerm: [
          'Ongoing anxiety management skills',
          'Stress resilience building',
          'Regular mental health check-ins',
          'Lifestyle optimization for anxiety prevention'
        ]
      },
      lifestyleRecommendations: {
        stressManagement: [
          'Daily mindfulness or meditation practice',
          'Regular breaks and relaxation time',
          'Boundary setting to reduce overwhelm'
        ],
        exercise: [
          'Daily movement (walking, stretching)',
          'Yoga or tai chi for anxiety reduction',
          'Regular cardiovascular exercise'
        ],
        sleep: [
          'Consistent sleep schedule',
          'Relaxing bedtime routine',
          'Limit caffeine and screens before bed'
        ],
        nutrition: [
          'Limit caffeine and alcohol',
          'Regular balanced meals',
          'Stay hydrated throughout the day'
        ],
        socialSupport: [
          'Regular connection with supportive people',
          'Consider anxiety support groups',
          'Open communication about anxiety with trusted individuals'
        ]
      }
    }
  }
}
