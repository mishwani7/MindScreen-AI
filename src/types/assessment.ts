// Core assessment types that can be reused across all screeners

export interface UserProfile {
  firstName: string
  lastName: string
  age: number
  gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say'
  country?: string
  city?: string
  zipCode?: string
}

export interface BaseAssessmentResult {
  score: number
  severity: string
  risk: 'low' | 'mild' | 'moderate' | 'moderately-severe' | 'severe' | 'high'
  interpretation: string
  recommendations: string[]
}

export interface DetailedScoreBreakdown {
  questionId: string
  question: string
  score: number
  category: string
  impact: 'low' | 'moderate' | 'high'
}

export interface RiskAssessment {
  immediateIntervention: boolean
  riskFactors: string[]
  protectiveFactors: string[]
  specificRisks: {
    [key: string]: boolean // e.g., suicidalIdeation, selfHarm, etc.
  }
}

export interface ActionableTip {
  category: string
  title: string
  description: string
  difficulty: 'easy' | 'moderate' | 'challenging'
  timeframe: string
  evidenceBased: boolean
}

export interface FollowUpRecommendation {
  retakeInWeeks: number
  monitoringFrequency: string
  warningSignsToWatch: string[]
  progressTracking: string[]
}

export interface ProfessionalProvider {
  name: string
  type: 'psychiatrist' | 'psychologist' | 'therapist' | 'counselor' | 'clinic' | 'hospital'
  address: string
  phone: string
  email?: string
  website?: string
  specialties: string[]
  acceptsInsurance: boolean
  distanceKm?: number
  rating?: number
  languagesSpoken?: string[]
}

export interface OnlineResource {
  title: string
  url: string
  type: 'article' | 'video' | 'app' | 'course' | 'support-group' | 'podcast' | 'book'
  description: string
  duration?: string
  cost?: 'free' | 'paid' | 'freemium'
  rating?: number
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
}

export interface EmergencyResource {
  name: string
  phone: string
  description: string
  availability: string
  type: 'crisis-line' | 'text-support' | 'chat-support' | 'emergency-services'
  languages?: string[]
}

export interface EducationalVideo {
  title: string
  url: string
  duration: string
  thumbnail: string
  description: string
  speaker?: string
  organization?: string
  viewCount?: number
}

export interface EducationalArticle {
  title: string
  url: string
  readTime: string
  summary: string
  author?: string
  publishedDate?: string
  source: string
}

export interface TipCategory {
  category: string
  icon?: string
  content: string[]
  priority: 'high' | 'medium' | 'low'
}

export interface EducationalContent {
  videos: EducationalVideo[]
  articles: EducationalArticle[]
  tips: TipCategory[]
  podcasts?: OnlineResource[]
  books?: OnlineResource[]
}

export interface ProfessionalResources {
  localProviders: ProfessionalProvider[]
  onlineResources: OnlineResource[]
  emergencyResources: EmergencyResource[]
  supportGroups?: OnlineResource[]
}

export interface AIInsights {
  personalizedSummary: string
  personalizedMessage?: string
  keyInsights?: string[]
  riskAnalysis: string
  strengthsIdentified: string[]
  immediateInterventionMessage?: string  // AI-generated message for crisis situations
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
    mindfulness?: string[]
    workLife?: string[]
  }
  personalizedGoals: Array<{
    goal: string
    why?: string
    how?: string[]
    timeframe: string
    steps: string[]
    measurable: string
    successMetrics?: string[]
  }>
  personalizedTips?: Array<{
    category: string
    title: string
    description: string
    actionSteps: string[]
    personalizedNote?: string
  }>
  personalizedEncouragement?: string
  warningSignsToWatch?: string[]
  dailyPractices?: Array<{
    name: string
    description: string
    frequency: string
    personalizedTip: string
  }>
  _aiVerification?: {
    isRealAI: boolean
    model: string
    timestamp: string
    responseSource: string
    responseTime?: number
  }
}

export interface ComprehensiveAssessmentResult<T extends BaseAssessmentResult> {
  // Core assessment data
  assessmentType: 'phq9' | 'gad7' | 'asrs' | 'aq10' | 'pcl5' | 'ocir' | 'mdq' | 'k10'
  baseResult: T
  userProfile: UserProfile
  assessmentDate: string
  assessmentId: string
  
  // Detailed analysis
  detailedScoreBreakdown: DetailedScoreBreakdown[]
  riskAssessment: RiskAssessment
  strengthsAndPositives: string[]
  
  // Actionable content
  actionableTips: ActionableTip[]
  followUpRecommendation: FollowUpRecommendation
  
  // Resources and education
  professionalResources: ProfessionalResources
  educationalContent: EducationalContent
  
  // AI-powered insights
  aiInsights: AIInsights
  
  // Meta information
  completionTime: number // in seconds
  confidenceScore: number // 0-100
  dataQuality: 'high' | 'medium' | 'low'
}

export interface PDFReportData<T extends BaseAssessmentResult> {
  userProfile: UserProfile
  result: ComprehensiveAssessmentResult<T>
  generatedDate: string
  reportId: string
  clinicianNotes?: string
}

// Assessment-specific interfaces that extend the base
export interface PHQ9Result extends BaseAssessmentResult {
  suicidalIdeation: boolean
  functionalImpairment: string
}

export interface GAD7Result extends BaseAssessmentResult {
  panicSymptoms: boolean
  avoidanceBehaviors: string[]
}

export interface ASRSResult extends BaseAssessmentResult {
  inattentiveSymptoms: number
  hyperactiveSymptoms: number
  functionalDomains: string[]
}

export interface AQ10Result extends BaseAssessmentResult {
  socialCommunication: number
  repetitiveBehaviors: number
  sensoryIssues: number
}

// Type aliases for specific assessments
export type ComprehensivePHQ9Result = ComprehensiveAssessmentResult<PHQ9Result>
export type ComprehensiveGAD7Result = ComprehensiveAssessmentResult<GAD7Result>
export type ComprehensiveASRSResult = ComprehensiveAssessmentResult<ASRSResult>
export type ComprehensiveAQ10Result = ComprehensiveAssessmentResult<AQ10Result>

// Response tracking for all assessments
export interface AssessmentResponse {
  questionId: string
  question: string
  value: number
  label: string
  timestamp: string
}

export interface AssessmentSession {
  sessionId: string
  assessmentType: string
  userProfile: UserProfile
  responses: AssessmentResponse[]
  startTime: string
  endTime?: string
  completed: boolean
}
