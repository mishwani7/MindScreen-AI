import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  PHQ9_QUESTIONS, 
  calculatePHQ9Score
} from '@/data/phq9'
import type { PHQ9Response, PHQ9Result } from '@/data/phq9'
import type { UserProfile, ComprehensiveAssessmentResult, BaseAssessmentResult } from '@/types/assessment'
import { PHQ9Processor } from '@/services/PHQ9Processor'
import { UserProfileForm } from '@/components/UserProfileForm'
import { ComprehensiveResults } from '@/components/ComprehensiveResults'
import { ModernGeneratingDialog } from '@/components/ModernGeneratingDialog'
import { AlertTriangle, CheckCircle, ArrowLeft, ArrowRight, Brain, Shield, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PHQ9ScreenerPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, number>>({})
  const [basicResult, setBasicResult] = useState<PHQ9Result | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [comprehensiveResult, setComprehensiveResult] = useState<ComprehensiveAssessmentResult<BaseAssessmentResult> | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const progress = ((currentStep + 1) / PHQ9_QUESTIONS.length) * 100
  const answeredQuestions = Object.keys(responses).length

  const handleSubmit = async () => {
    const responseArray: PHQ9Response[] = Object.entries(responses).map(([questionId, value]) => ({
      questionId,
      value
    }))

    const calculatedResult = calculatePHQ9Score(responseArray)
    setBasicResult(calculatedResult)
    setShowProfileForm(true)
  }

  const handleProfileComplete = async (profile: UserProfile) => {
    if (!basicResult) return
    
    setUserProfile(profile)
    setIsProcessing(true)
    setShowProfileForm(false)

    try {
      const processor = new PHQ9Processor()
      const assessmentResponses = Object.entries(responses).map(([questionId, value]) => ({
        questionId,
        value,
        question: PHQ9_QUESTIONS.find(q => q.id === questionId)?.question || '',
        label: PHQ9_QUESTIONS.find(q => q.id === questionId)?.options.find(opt => opt.value === value)?.label || '',
        timestamp: new Date().toISOString()
      }))

      const comprehensive = await processor.processAssessment(
        assessmentResponses,
        profile
      )

      setComprehensiveResult(comprehensive)
      setIsCompleted(true)
    } catch (error) {
      console.error('Error generating comprehensive results:', error)
      // Show basic results as fallback
      setIsCompleted(true)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleProfileSkip = async () => {
    if (!basicResult) return

    console.log('🌍 User skipped profile form, attempting IP location detection...')
    
    // Try to detect location via IP
    let detectedLocation = null
    try {
      const { IPLocationService } = await import('@/services/locationService')
      detectedLocation = await IPLocationService.getUserLocation()
      console.log('📍 IP location detected:', detectedLocation)
    } catch (error) {
      console.warn('⚠️ IP location detection failed:', error)
    }

    // Create a minimal profile with detected location
    const minimalProfile: UserProfile = {
      firstName: '',
      lastName: '',
      age: 0, // No age provided when skipping
      gender: 'prefer-not-to-say',
      country: detectedLocation?.country || '',
      city: detectedLocation?.city || '',
      zipCode: ''
    }

    console.log('👤 Using minimal profile with detected location:', {
      country: minimalProfile.country,
      city: minimalProfile.city
    })

    await handleProfileComplete(minimalProfile)
  }

  const resetAssessment = () => {
    setIsCompleted(false)
    setBasicResult(null)
    setUserProfile(null)
    setComprehensiveResult(null)
    setShowProfileForm(false)
    setIsProcessing(false)
    setCurrentStep(0)
    setResponses({})
  }

  const handleNext = () => {
    if (currentStep < PHQ9_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAnswerSelect = (questionId: string, value: number) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const getCurrentQuestionAnswer = (questionId: string) => {
    return responses[questionId]
  }

  const isCurrentQuestionAnswered = () => {
    const currentQuestion = PHQ9_QUESTIONS[currentStep]
    return getCurrentQuestionAnswer(currentQuestion.id) !== undefined
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'text-green-600 bg-green-50 border-green-200'
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'Very High': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  // Show user profile form after completing assessment
  if (showProfileForm && basicResult) {
    return (
      <div className="min-h-screen bg-background py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <UserProfileForm
            onComplete={handleProfileComplete}
            onSkip={handleProfileSkip}
          />
        </div>
      </div>
    )
  }

  // Show processing state with modern dialog
  if (isProcessing) {
    return <ModernGeneratingDialog />
  }

  // Show comprehensive results
  if (isCompleted && comprehensiveResult) {
    return <ComprehensiveResults result={comprehensiveResult} onReset={resetAssessment} />
  }

  // Show basic results fallback (if comprehensive processing failed)
  if (isCompleted && basicResult && !comprehensiveResult) {
    return (
      <div className="min-h-screen bg-background py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 animate-slide-up">
              <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg animate-float">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              PHQ-9 Assessment{' '}
              <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500 bg-clip-text text-transparent">
                Complete
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Your depression screening results are ready with personalized insights
            </p>
          </div>

          {/* Basic Results Card */}
          <Card className="mb-8 sm:mb-12 shadow-lg bg-card/70 backdrop-blur-sm border-border/30 animate-fade-in hover:shadow-xl transition-all duration-300" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Your Results</CardTitle>
              <div className={`inline-flex items-center px-6 py-3 rounded-2xl border-2 text-lg font-bold shadow-lg ${getRiskLevelColor(basicResult.riskLevel)}`}>
                <span>Score: {basicResult.totalScore}/27</span>
                <span className="mx-3">•</span>
                <span>{basicResult.severity}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Risk Alert */}
              {basicResult.riskLevel === 'Very High' && (
                <div className="border-2 border-red-300 bg-red-50 dark:bg-red-950/20 dark:border-red-800 p-6 rounded-2xl animate-pulse">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0" />
                    <div className="text-red-800 dark:text-red-200">
                      <strong>Important:</strong> Your responses indicate you may need immediate support. 
                      If you're having thoughts of self-harm, please contact emergency services or 
                      call 988 (Suicide & Crisis Lifeline) immediately.
                    </div>
                  </div>
                </div>
              )}

              {/* Interpretation */}
              <div className="bg-muted/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                  <Brain className="h-6 w-6 text-primary" />
                  What This Means
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{basicResult.interpretation}</p>
              </div>

              {/* Recommendations */}
              <div className="bg-muted/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                  Recommended Next Steps
                </h3>
                <ul className="space-y-3">
                  {basicResult.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/50">
                <Button 
                  variant="outline" 
                  className="flex-1 text-lg py-6 rounded-2xl border-2 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={resetAssessment}
                >
                  Take Again
                </Button>
                <Button 
                  variant="outline" 
                  asChild
                  className="flex-1 text-lg py-6 rounded-2xl border-2 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Link to="/screeners">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Screeners
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-gradient-to-r from-muted/30 to-muted/50 backdrop-blur-sm border-border/30 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-3">Important Disclaimer</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This screening tool is not a substitute for professional medical advice, diagnosis, or treatment. 
                    If you have concerns about your mental health, please consult with a qualified healthcare provider. 
                    In case of emergency or if you're having thoughts of self-harm, contact emergency services immediately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-slide-up">
          <Link to="/screeners" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-all duration-300 group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Screeners
          </Link>
          
          {/* Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl mb-4 animate-float shadow-lg">
              <CheckCircle className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            PHQ-9{' '}
            <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Depression Screening
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The Patient Health Questionnaire-9 (PHQ-9) is a clinically validated tool for screening 
            and monitoring depression severity. Get personalized insights with AI-powered analysis.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="bg-card/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-border/20 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Question {currentStep + 1} of {PHQ9_QUESTIONS.length}
              </span>
              <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                {answeredQuestions}/{PHQ9_QUESTIONS.length} completed
                <CheckCircle className="w-4 h-4 text-blue-500" />
              </span>
            </div>
            <div className="relative w-full bg-muted/50 rounded-full h-3 overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
              <span>Just started</span>
              <span className="font-medium text-primary">{Math.round(progress)}% complete</span>
              <span>All done!</span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-lg mb-8 sm:mb-12 bg-card/70 backdrop-blur-sm border-border/30 animate-slide-up hover:shadow-xl transition-all duration-300" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="pb-6 sm:pb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">{currentStep + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-3">
                  Over the last 2 weeks, how often have you been bothered by:
                </CardTitle>
                <CardDescription className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground leading-relaxed">
                  {PHQ9_QUESTIONS[currentStep].question}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 sm:space-y-4">
              {PHQ9_QUESTIONS[currentStep].options.map((option, index) => (
                <div 
                  key={option.value} 
                  className={`group relative flex items-center space-x-4 p-4 sm:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    getCurrentQuestionAnswer(PHQ9_QUESTIONS[currentStep].id) === option.value
                      ? 'bg-blue-50/80 dark:bg-blue-950/30 border-blue-400 dark:border-blue-600'
                      : 'hover:bg-muted/50 border-border/50 hover:border-border'
                  }`}
                  onClick={() => handleAnswerSelect(PHQ9_QUESTIONS[currentStep].id, option.value)}
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  {/* Selection indicator */}
                  <div className={`relative flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                    getCurrentQuestionAnswer(PHQ9_QUESTIONS[currentStep].id) === option.value
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-muted-foreground/40 group-hover:border-blue-400/60'
                  }`}>
                    {getCurrentQuestionAnswer(PHQ9_QUESTIONS[currentStep].id) === option.value && (
                      <div className="absolute inset-1 bg-white rounded-full animate-scale-in"></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <label className="flex-1 cursor-pointer">
                    <div className="font-semibold text-base sm:text-lg text-foreground mb-1">
                      {option.label}
                    </div>
                    <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {option.description}
                    </div>
                  </label>
                  
                  {/* Hidden radio input for accessibility */}
                  <input
                    type="radio"
                    name={PHQ9_QUESTIONS[currentStep].id}
                    value={option.value}
                    checked={getCurrentQuestionAnswer(PHQ9_QUESTIONS[currentStep].id) === option.value}
                    onChange={() => handleAnswerSelect(PHQ9_QUESTIONS[currentStep].id, option.value)}
                    className="sr-only"
                  />
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-2xl border-2 font-semibold transition-all duration-300 disabled:opacity-50 shadow-lg"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Previous
          </Button>

          <div className="flex flex-col items-center gap-2">
            <div className={`text-sm sm:text-base font-semibold px-2 py-1 rounded-lg transition-all duration-300 ${
              isCurrentQuestionAnswered() 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-orange-600 dark:text-orange-400'
            }`}>
              {isCurrentQuestionAnswered() ? (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  ✓ Answered
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current rounded-full animate-pulse"></div>
                  Please select an answer
                </span>
              )}
            </div>
          </div>

          {currentStep === PHQ9_QUESTIONS.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={answeredQuestions < PHQ9_QUESTIONS.length}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Get Results
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered()}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
            >
              Next
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Info Card */}
        <Card className="mt-8 sm:mt-12 bg-card/70 backdrop-blur-sm border-border/30 animate-fade-in shadow-lg" style={{ animationDelay: '1s' }}>
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg sm:text-xl mb-3 text-foreground">About the PHQ-9</h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  The PHQ-9 is a reliable and clinically validated measure of depression severity. It's widely used 
                  by healthcare professionals for screening, diagnosing, monitoring, and measuring 
                  the severity of depression. Your responses are completely confidential and stored locally on your device.
                </p>
                <div className="flex flex-wrap gap-4 mt-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">Clinically Validated</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">100% Private</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                    <Zap className="w-4 h-4" />
                    <span className="font-medium">AI-Enhanced</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
