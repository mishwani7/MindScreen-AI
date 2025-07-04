// Enhanced PHQ-9 comprehensive results types and data
export interface UserProfile {
  firstName: string
  lastName: string
  age: number
  gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say'
  email?: string
  phoneNumber?: string
  occupation?: string
  previousMentalHealthHistory?: boolean
  currentMedications?: string
  emergencyContact?: {
    name: string
    relationship: string
    phone: string
  }
}

export interface ComprehensivePHQ9Result extends PHQ9Result {
  userProfile: UserProfile
  assessmentDate: string
  assessmentId: string
  detailedScoreBreakdown: {
    questionId: string
    question: string
    score: number
    category: 'mood' | 'sleep' | 'energy' | 'appetite' | 'concentration' | 'psychomotor' | 'guilt' | 'suicidal'
    impact: 'low' | 'moderate' | 'high'
  }[]
  riskAssessment: {
    suicidalIdeation: boolean
    immediateIntervention: boolean
    riskFactors: string[]
    protectiveFactors: string[]
  }
  strengthsAndPositives: string[]
  actionableTips: {
    category: string
    title: string
    description: string
    difficulty: 'easy' | 'moderate' | 'challenging'
    timeframe: string
  }[]
  followUpRecommendation: {
    retakeInWeeks: number
    monitoringFrequency: string
    warningSignsToWatch: string[]
  }
  professionalResources: {
    localProviders: {
      name: string
      type: 'psychiatrist' | 'psychologist' | 'therapist' | 'counselor' | 'clinic'
      address: string
      phone: string
      specialties: string[]
      acceptsInsurance: boolean
      distanceKm?: number
    }[]
    onlineResources: {
      title: string
      url: string
      type: 'article' | 'video' | 'app' | 'course' | 'support-group'
      description: string
      duration?: string
    }[]
    emergencyResources: {
      name: string
      phone: string
      description: string
      availability: string
    }[]
  }
  educationalContent: {
    videos: {
      title: string
      url: string
      duration: string
      thumbnail: string
      description: string
    }[]
    articles: {
      title: string
      url: string
      readTime: string
      summary: string
    }[]
    tips: {
      category: string
      content: string[]
    }[]
  }
  aiInsights: {
    personalizedSummary: string
    riskAnalysis: string
    strengthsIdentified: string[]
    recommendedInterventions: {
      immediate: string[]
      shortTerm: string[]
      longTerm: string[]
    }
    lifestyleRecommendations: {
      sleep: string[]
      exercise: string[]
      nutrition: string[]
      socialSupport: string[]
      stressManagement: string[]
    }
  }
}

export interface PDFReportData {
  userProfile: UserProfile
  result: ComprehensivePHQ9Result
  generatedDate: string
  reportId: string
}

// Question categories for detailed analysis
export const PHQ9_QUESTION_CATEGORIES = {
  'phq9_1': { category: 'mood', name: 'Interest/Pleasure' },
  'phq9_2': { category: 'mood', name: 'Depressed Mood' },
  'phq9_3': { category: 'sleep', name: 'Sleep Disturbance' },
  'phq9_4': { category: 'energy', name: 'Fatigue/Energy' },
  'phq9_5': { category: 'appetite', name: 'Appetite Changes' },
  'phq9_6': { category: 'guilt', name: 'Self-Worth/Guilt' },
  'phq9_7': { category: 'concentration', name: 'Concentration' },
  'phq9_8': { category: 'psychomotor', name: 'Psychomotor Changes' },
  'phq9_9': { category: 'suicidal', name: 'Suicidal Ideation' }
} as const

// Sample educational content
export const DEPRESSION_EDUCATIONAL_CONTENT = {
  videos: [
    {
      title: "Understanding Depression: Signs, Symptoms, and Treatment",
      url: "https://www.youtube.com/watch?v=z-IR48Mb3W0",
      duration: "8:32",
      thumbnail: "/images/depression-understanding.jpg",
      description: "A comprehensive overview of depression, its symptoms, and available treatment options."
    },
    {
      title: "Cognitive Behavioral Therapy for Depression",
      url: "https://www.youtube.com/watch?v=0ViaCs0k2Nc",
      duration: "12:45",
      thumbnail: "/images/cbt-depression.jpg",
      description: "Learn about CBT techniques that can help manage depression symptoms."
    },
    {
      title: "Depression and Sleep: Breaking the Cycle",
      url: "https://www.youtube.com/watch?v=fm4jBZ1hoss",
      duration: "6:20",
      thumbnail: "/images/depression-sleep.jpg",
      description: "Understanding the relationship between sleep and depression, with practical tips."
    }
  ],
  articles: [
    {
      title: "The Science Behind Depression: What Happens in Your Brain",
      url: "https://www.healthline.com/health/depression/effects-brain",
      readTime: "8 min read",
      summary: "Explore how depression affects brain chemistry and structure, and what this means for treatment."
    },
    {
      title: "Natural Ways to Fight Depression",
      url: "https://www.mayoclinic.org/diseases-conditions/depression/in-depth/depression-and-exercise/art-20046495",
      readTime: "5 min read",
      summary: "Evidence-based natural approaches to managing depression symptoms alongside professional treatment."
    },
    {
      title: "Building a Support Network When You Have Depression",
      url: "https://www.psycom.net/depression/depression-support-group",
      readTime: "6 min read",
      summary: "Practical advice on building and maintaining supportive relationships during depression recovery."
    }
  ],
  tips: {
    dailyRoutine: [
      "Establish a consistent wake-up time, even on weekends",
      "Create a morning routine that includes pleasant activities",
      "Set small, achievable daily goals",
      "Practice gratitude by writing down three things you're thankful for each day"
    ],
    selfCare: [
      "Take a warm bath or shower to relax",
      "Spend 10-15 minutes in sunlight each day",
      "Practice deep breathing exercises",
      "Engage in activities you used to enjoy, even if they don't feel appealing right now"
    ],
    socialConnection: [
      "Reach out to one friend or family member each day",
      "Join a support group or online community",
      "Volunteer for a cause you care about",
      "Consider getting a pet for companionship"
    ]
  }
}

// Emergency resources
export const EMERGENCY_RESOURCES = [
  {
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    description: "24/7 crisis support for people in suicidal crisis or emotional distress",
    availability: "24/7"
  },
  {
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "Free, 24/7 crisis support via text message",
    availability: "24/7"
  },
  {
    name: "SAMHSA National Helpline",
    phone: "1-800-662-4357",
    description: "Treatment referral and information service for mental health and substance abuse",
    availability: "24/7"
  },
  {
    name: "Emergency Services",
    phone: "911",
    description: "For immediate medical emergencies or if you're in immediate danger",
    availability: "24/7"
  }
]

// Professional help finder (mock data - in real app, integrate with actual provider databases)
export const findLocalProviders = (zipCode: string) => {
  // Mock implementation - integrate with real provider databases
  return [
    {
      name: "Dr. Sarah Johnson, MD",
      type: "psychiatrist" as const,
      address: "123 Mental Health Ave, Suite 200",
      phone: "(555) 123-4567",
      specialties: ["Depression", "Anxiety", "Medication Management"],
      acceptsInsurance: true,
      distanceKm: 2.3
    },
    {
      name: "Mindful Therapy Center",
      type: "clinic" as const,
      address: "456 Wellness Blvd",
      phone: "(555) 987-6543",
      specialties: ["Individual Therapy", "Group Therapy", "CBT", "DBT"],
      acceptsInsurance: true,
      distanceKm: 3.7
    },
    {
      name: "Lisa Chen, LCSW",
      type: "therapist" as const,
      address: "789 Healing Way, Suite 101",
      phone: "(555) 456-7890",
      specialties: ["Depression", "Trauma", "EMDR"],
      acceptsInsurance: false,
      distanceKm: 1.8
    }
  ]
}

// Generate actionable tips based on score and symptoms
export const generateActionableTips = (result: PHQ9Result, responses: any[]) => {
  const tips = []
  
  // Sleep-related tips
  const sleepResponse = responses.find(r => r.questionId === 'phq9_3')
  if (sleepResponse && sleepResponse.value >= 2) {
    tips.push({
      category: "Sleep Hygiene",
      title: "Improve Your Sleep Quality",
      description: "Establish a consistent bedtime routine, avoid screens 1 hour before bed, and create a comfortable sleep environment.",
      difficulty: "easy" as const,
      timeframe: "1-2 weeks"
    })
  }
  
  // Energy and fatigue tips
  const energyResponse = responses.find(r => r.questionId === 'phq9_4')
  if (energyResponse && energyResponse.value >= 2) {
    tips.push({
      category: "Energy Management",
      title: "Boost Your Energy Naturally",
      description: "Start with 10 minutes of light exercise daily, eat regular nutritious meals, and take short breaks throughout the day.",
      difficulty: "easy" as const,
      timeframe: "2-3 weeks"
    })
  }
  
  // Mood and interest tips
  const moodResponse = responses.find(r => r.questionId === 'phq9_1')
  if (moodResponse && moodResponse.value >= 2) {
    tips.push({
      category: "Mood Enhancement",
      title: "Rediscover Joy in Activities",
      description: "Schedule one small pleasant activity each day, even if you don't feel like it. Start with 15-minute activities you used to enjoy.",
      difficulty: "moderate" as const,
      timeframe: "3-4 weeks"
    })
  }
  
  // Social connection tips
  tips.push({
    category: "Social Support",
    title: "Strengthen Your Support Network",
    description: "Reach out to one person you trust each week. Consider joining a support group or engaging in community activities.",
    difficulty: "moderate" as const,
    timeframe: "4-6 weeks"
  })
  
  return tips
}
