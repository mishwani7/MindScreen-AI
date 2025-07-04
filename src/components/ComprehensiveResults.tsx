import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { PDFService } from './PDFReport'  // Temporarily commented out
import { useNotification, Notification } from './Notification'
import { 
  Brain, 
  // Download,  // Temporarily commented out
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Phone, 
  MapPin,
  Clock,
  Target,
  Lightbulb,
  Heart,
  Activity,
  Shield,
  ExternalLink,
  Star,
  User,
  FileText
} from 'lucide-react'
import type { ComprehensiveAssessmentResult, BaseAssessmentResult } from '@/types/assessment'

interface ComprehensiveResultsProps {
  result: ComprehensiveAssessmentResult<BaseAssessmentResult>
  onDownloadPDF?: () => void
  onRetakeAssessment?: () => void
  onReset?: () => void
}

export function ComprehensiveResults({ result, /* onDownloadPDF, */ onRetakeAssessment, onReset }: ComprehensiveResultsProps) {
  const [activeTab, setActiveTab] = useState('summary')
  // const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)  // Temporarily commented out
  // const [pdfStatus, setPdfStatus] = useState<string>('')  // Temporarily commented out
  const { /* showNotification, */ notification, clearNotification } = useNotification()

  // Debug logging for professional resources
  console.log('🏥 ComprehensiveResults - Professional Resources:', {
    emergencyResources: result.professionalResources.emergencyResources,
    localProviders: result.professionalResources.localProviders,
    onlineResources: result.professionalResources.onlineResources
  })

  // Debug logging for user profile to check age and location
  console.log('👤 ComprehensiveResults - User Profile:', {
    firstName: result.userProfile.firstName,
    lastName: result.userProfile.lastName,
    age: result.userProfile.age,
    city: result.userProfile.city,
    country: result.userProfile.country,
    zipCode: result.userProfile.zipCode,
    hasLocation: !!(result.userProfile.city || result.userProfile.country || result.userProfile.zipCode),
    fullProfile: result.userProfile
  })

  /* Temporarily commented out download functionality
  const handleDownloadPDF = async () => {
    if (onDownloadPDF) {
      onDownloadPDF()
    } else {
      // Use our professional PDF generation
      try {
        setIsGeneratingPDF(true)
        setPdfStatus('Generating your comprehensive PDF report...')
        showNotification('Generating PDF report...', 'info')
        await PDFService.generateAndDownload(result)
        setPdfStatus('PDF downloaded successfully!')
        showNotification('PDF report downloaded successfully!', 'success')
        setTimeout(() => setPdfStatus(''), 3000)
      } catch (error) {
        console.error('Failed to generate PDF:', error)
        setPdfStatus('PDF generation failed. Using browser print as fallback.')
        showNotification('PDF generation failed. Please try again.', 'error')
        setTimeout(() => setPdfStatus(''), 3000)
        // Fallback to print
        window.print()
      } finally {
        setIsGeneratingPDF(false)
      }
    }
  }
  */

  const handleRetakeAssessment = () => {
    if (onRetakeAssessment) {
      onRetakeAssessment()
    } else if (onReset) {
      onReset()
    }
  }

  const getSeverityColor = () => {
    const severity = result.baseResult.severity.toLowerCase()
    if (severity.includes('minimal') || severity.includes('none')) {
      return 'text-green-800 bg-green-100 border-green-300 dark:text-green-100 dark:bg-green-800 dark:border-green-600'
    } else if (severity.includes('mild')) {
      return 'text-yellow-800 bg-yellow-100 border-yellow-300 dark:text-yellow-100 dark:bg-yellow-800 dark:border-yellow-600'
    } else if (severity.includes('moderate')) {
      return 'text-orange-800 bg-orange-100 border-orange-300 dark:text-orange-100 dark:bg-orange-800 dark:border-orange-600'
    } else if (severity.includes('severe')) {
      return 'text-red-800 bg-red-100 border-red-300 dark:text-red-100 dark:bg-red-800 dark:border-red-600'
    }
    return 'text-primary-foreground bg-primary border-primary hover:bg-primary/90'
  }

  const getScoreColor = (score: number) => {
    if (score <= 4) return 'text-emerald-600'
    if (score <= 9) return 'text-amber-600'
    if (score <= 14) return 'text-orange-600'
    if (score <= 19) return 'text-red-600'
    return 'text-red-800'
  }

  const getImmediateInterventionMessage = () => {
    const score = result.baseResult.score
    
    // Debug logging to track AI content usage
    console.log('🚨 Immediate Intervention Message Debug:', {
      hasAIMessage: !!result.aiInsights.immediateInterventionMessage,
      aiMessage: result.aiInsights.immediateInterventionMessage,
      score: score,
      isRealAI: result.aiInsights._aiVerification?.isRealAI
    })
    
    // Use AI-generated message if available
    if (result.aiInsights.immediateInterventionMessage) {
      console.log('✅ Using AI-generated immediate intervention message')
      return cleanAgeReferences(result.aiInsights.immediateInterventionMessage)
    }
    
    console.log('⚠️ Falling back to contextual message based on score')
    // Generate contextual message based on score and severity
    if (score >= 20) {
      return `Your PHQ-9 score of ${score} indicates severe depressive symptoms requiring immediate professional attention. These scores suggest significant impairment in daily functioning and potential safety concerns. Please contact a mental health professional or crisis hotline immediately for urgent evaluation and support.`
    } else if (score >= 15) {
      return `Your PHQ-9 score of ${score} indicates moderately severe depressive symptoms that warrant prompt professional evaluation. This level of depression can significantly impact your daily life and wellbeing. We strongly recommend contacting a mental health professional within the next few days for assessment and treatment planning.`
    } else if (score >= 10) {
      return `Your PHQ-9 score of ${score} indicates moderate depressive symptoms that would benefit from professional support. While not an emergency, these symptoms can affect your quality of life and may worsen without appropriate care. Consider scheduling an appointment with a mental health professional or your primary care doctor.`
    } else {
      return `Based on your responses, some concerning symptoms were identified that merit professional attention. Even with lower overall scores, certain responses indicate areas of concern that could benefit from professional evaluation and support.`
    }
  }

  const getInterventionTitle = () => {
    const score = result.baseResult.score
    
    if (score >= 20) {
      return "Immediate Attention Required"
    } else if (score >= 15) {
      return "Professional Evaluation Recommended"
    } else if (score >= 10) {
      return "Professional Support Beneficial"
    } else {
      return "Consider Professional Consultation"
    }
  }

  // Function to check if user provided location information
  const hasUserLocation = (): boolean => {
    return !!(result.userProfile.city || result.userProfile.country || result.userProfile.zipCode)
  }

  // Function to clean age references from AI content when age is not provided
  const cleanAgeReferences = (text: string): string => {
    if (!text) return text
    
    // Always clean unprofessional age/location references for a more professional tone
    return text
      .replace(/As a \d+-year-old,?\s*/gi, '')
      .replace(/At \d+ years old,?\s*/gi, '')
      .replace(/Being \d+,?\s*/gi, '')
      .replace(/At your age \(\d+\),?\s*/gi, '')
      .replace(/\d+-year-old\s+/gi, '')
      .replace(/,?\s*aged \d+,?\s*/gi, '')
      .replace(/\s*\(\d+ years old\)/gi, '')
      .replace(/Given your age of \d+,?\s*/gi, '')
      .replace(/\s*\d+ years of age\s*/gi, ' ')
      .replace(/As a resident of [^,]+,?\s*/gi, '')
      .replace(/Living in [^,]+,?\s*/gi, '')
      .replace(/Being from [^,]+,?\s*/gi, '')
      .replace(/As someone from [^,]+,?\s*/gi, '')
      .replace(/In [^,]+ like yourself,?\s*/gi, '')
      .trim()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8">
      {/* Notification */}
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={clearNotification} 
        />
      )}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl mb-4 shadow-lg">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Your PHQ-9 Assessment Results
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive analysis of your depression screening with personalized insights and recommendations
          </p>
          
          {/* AI Verification Status - Internal Use */}
          {result.aiInsights._aiVerification && (
            <div className="mt-4 max-w-md mx-auto">
              <div className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-sm ${
                result.aiInsights._aiVerification.isRealAI 
                  ? 'bg-muted/30 border-border/60 text-foreground' 
                  : result.aiInsights._aiVerification.responseSource === 'rate-limited-fallback'
                  ? 'bg-muted/30 border-border/60 text-foreground'
                  : 'bg-muted/30 border-border/60 text-foreground'
              }`}>
                <span className="text-lg">
                  {result.aiInsights._aiVerification.isRealAI 
                    ? '✅' 
                    : result.aiInsights._aiVerification.responseSource === 'rate-limited-fallback'
                    ? '⏳'
                    : '⚠️'}
                </span>
                <span className="font-medium">
                  {result.aiInsights._aiVerification.isRealAI 
                    ? `AI Verified: ${result.aiInsights._aiVerification.model}` 
                    : result.aiInsights._aiVerification.responseSource === 'rate-limited-fallback'
                    ? 'Rate Limited - Try again in 60 seconds'
                    : `Demo Mode: ${result.aiInsights._aiVerification.responseSource}`}
                </span>
                {result.aiInsights._aiVerification.responseTime && (
                  <span className="text-xs opacity-75">
                    ({result.aiInsights._aiVerification.responseTime}ms)
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Assessment Overview Card */}
        <Card className="mb-8 bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border shadow-lg hover:shadow-xl transition-all duration-500 animate-slide-up">
          <CardHeader className="text-center pb-4">
            {(result.userProfile.firstName || result.userProfile.lastName) && (
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {result.userProfile.firstName && result.userProfile.firstName.trim() ? result.userProfile.firstName : ''} {result.userProfile.lastName && result.userProfile.lastName.trim() ? result.userProfile.lastName : ''}
                  </span>
                </div>
              </div>
            )}
            
            {/* Quick Assessment Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Score Card */}
              <div className="text-center">
                <div className="bg-background/90 backdrop-blur-sm border border-border/70 hover:border-border rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between min-h-[180px]">
                  <div className="flex flex-col items-center">
                    <div className={`text-6xl font-bold mb-4 ${getScoreColor(result.baseResult.score)}`}>
                      {result.baseResult.score}
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-2">Assessment Score</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Comprehensive analysis score
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="w-full bg-muted/40 rounded-full h-3 mb-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${(result.baseResult.score / 27) * 100}%` }}
                      />
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {result.baseResult.score} out of 27 points ({Math.round((result.baseResult.score / 27) * 100)}%)
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Severity Card */}
              <div className="text-center">
                <div className="bg-background/90 backdrop-blur-sm border border-border/70 hover:border-border rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between min-h-[180px]">
                  <div className="flex flex-col items-center">
                    <div className="mb-6">
                      <Badge className={`px-8 py-4 text-lg font-bold border-2 rounded-xl ${getSeverityColor()}`}>
                        {result.baseResult.severity}
                      </Badge>
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-2">Severity Level</div>
                  </div>
                  <div className="mt-auto">
                    <div className="text-sm font-medium text-foreground capitalize bg-muted/30 px-4 py-2 rounded-lg border border-border/40">
                      {result.baseResult.risk} risk level
                    </div>
                  </div>
                </div>
              </div>
              
              {/* AI Confidence Card */}
              <div className="text-center">
                <div className="bg-background/90 backdrop-blur-sm border border-border/70 hover:border-border rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between min-h-[180px]">
                  <div className="flex flex-col items-center">
                    <div className="text-6xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">
                      {result.confidenceScore}%
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-2">AI Confidence</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Analysis reliability score
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="w-full bg-muted/40 rounded-full h-3 mb-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-green-600 h-3 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${result.confidenceScore}%` }}
                      />
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      High-quality AI assessment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            {result.riskAssessment.immediateIntervention && (
              <div className="bg-muted/30 border-2 border-red-500 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-destructive rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-destructive-foreground flex-shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{getInterventionTitle()}</h4>
                    <p className="text-foreground text-sm leading-relaxed">
                      {getImmediateInterventionMessage()}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Temporarily hidden download button */}
              {/*
              <Button 
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF Report'}
              </Button>
              */}
              <Button 
                onClick={handleRetakeAssessment}
                variant="outline"
                size="lg"
                className="border-border hover:bg-muted hover:text-foreground transition-all duration-200"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Retake Assessment
              </Button>
            </div>
            
            {/* Temporarily commented out PDF status display
            {pdfStatus && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">{pdfStatus}</p>
              </div>
            )}
            */}
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1 bg-muted/50 rounded-xl">
            <TabsTrigger value="summary" className="flex flex-col gap-1 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200">
              <FileText className="h-4 w-4" />
              <span className="text-xs">Summary</span>
            </TabsTrigger>
            <TabsTrigger value="detailed" className="flex flex-col gap-1 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200">
              <Activity className="h-4 w-4" />
              <span className="text-xs">Detailed</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex flex-col gap-1 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200">
              <Lightbulb className="h-4 w-4" />
              <span className="text-xs">Tips</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex flex-col gap-1 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200">
              <Users className="h-4 w-4" />
              <span className="text-xs">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex flex-col gap-1 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">Progress</span>
            </TabsTrigger>
          </TabsList>

          {/* AI Summary Tab - Completely Personalized & AI-Driven */}
          <TabsContent value="summary" className="space-y-6">
            {/* Main AI Personalized Message Card */}
            <Card className="bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-foreground">Your Personal Mental Health Insights</span>
                  </CardTitle>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/30 border border-border/60 rounded-lg">
                    <span className="text-lg">✨</span>
                    <span className="text-xs font-medium text-foreground">
                      {result.userProfile.firstName && result.userProfile.firstName.trim() 
                        ? `AI-Generated for ${result.userProfile.firstName}` 
                        : 'AI-Generated for You'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-6">
                {/* AI Key Insights */}
                {result.aiInsights.keyInsights && result.aiInsights.keyInsights.length > 0 && (
                  <div className="bg-muted/30 rounded-xl p-6 border border-border/60">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-semibold text-foreground">Key Insights About Your Mental Health</h4>
                    </div>
                    <div className="space-y-4">
                      {result.aiInsights.keyInsights.slice(0, 4).map((insight, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border/40">
                          <div className="p-1.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mt-1">
                            <Star className="h-4 w-4 text-white" />
                          </div>
                          <p className="text-sm text-foreground leading-relaxed text-left font-medium">
                            {cleanAgeReferences(insight)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Personalized Summary */}
                <div className="bg-muted/30 rounded-xl p-6 border border-border/60">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground">Your Complete Mental Health Picture</h4>
                  </div>
                  <p className="leading-relaxed text-foreground text-left">
                    {cleanAgeReferences(result.aiInsights.personalizedSummary)}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* AI-Generated Strengths */}
                  <div className="bg-muted/30 rounded-xl p-6 border border-border/60">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-semibold text-foreground">Your Personal Strengths</h4>
                    </div>
                    <ul className="space-y-3">
                      {(result.aiInsights.strengthsIdentified && result.aiInsights.strengthsIdentified.length > 0 ? 
                        result.aiInsights.strengthsIdentified : result.strengthsAndPositives).slice(0, 4).map((strength, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm">
                            <div className="p-1.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mt-0.5">
                              <CheckCircle className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-foreground leading-relaxed font-medium">{strength}</span>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  
                  {/* AI-Generated Areas of Focus */}
                  <div className="bg-muted/30 rounded-xl p-6 border border-border/60">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                        <Target className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-semibold text-foreground">Areas to Focus On</h4>
                    </div>
                    <ul className="space-y-3">
                      {(result.aiInsights.riskAnalysis ? 
                        result.aiInsights.riskAnalysis.split('.').filter(risk => risk.trim().length > 10) : 
                        result.riskAssessment.riskFactors).slice(0, 4).map((risk, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm">
                            <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mt-1.5 flex-shrink-0" />
                            <span className="text-foreground leading-relaxed font-medium">
                              {typeof risk === 'string' ? risk.trim() + (risk.trim().endsWith('.') ? '' : '.') : risk}
                            </span>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>

                {/* AI-Generated Encouragement */}
                {result.aiInsights.personalizedEncouragement && (
                  <div className="bg-muted/30 rounded-xl p-6 border border-border/60">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                        <Heart className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-semibold text-foreground">Personal Words of Encouragement</h4>
                    </div>
                    <blockquote className="text-foreground leading-relaxed text-left text-lg italic border-l-4 border-indigo-400 pl-4">
                      "{cleanAgeReferences(result.aiInsights.personalizedEncouragement)}"
                    </blockquote>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI-Enhanced Detailed Analysis Tab */}
          <TabsContent value="detailed" className="space-y-6">
            {/* AI-Generated Detailed Analysis */}
            <Card className="bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-foreground">AI-Powered Detailed Analysis</span>
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Deep insights into your mental health patterns and responses
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {/* AI Risk Analysis */}
                {result.aiInsights.riskAnalysis && (
                  <div className="bg-muted/30 rounded-xl p-6 mb-6 border border-border/60">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-foreground">
                      <div className="p-1.5 bg-orange-500 rounded-full">
                        <AlertTriangle className="h-4 w-4 text-white" />
                      </div>
                      AI Risk Analysis
                    </h4>
                    <p className="text-sm text-foreground leading-relaxed text-left">
                      {cleanAgeReferences(result.aiInsights.riskAnalysis)}
                    </p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Score Breakdown */}
                  <div className="bg-muted/30 rounded-xl p-6 border border-border/60">
                    <h4 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
                      <div className="p-1.5 bg-primary rounded-full">
                        <Activity className="h-4 w-4 text-primary-foreground" />
                      </div>
                      Response Pattern Analysis
                    </h4>
                    <div className="space-y-4">
                      {result.detailedScoreBreakdown.slice(0, 5).map((item, index) => (
                        <div key={index} className="p-3 bg-muted/50 rounded-lg border border-border/40">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium text-foreground">{item.category}</div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={item.impact === 'high' ? 'destructive' : item.impact === 'moderate' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {item.impact}
                              </Badge>
                              <span className="font-mono text-sm font-bold text-foreground">{item.score}</span>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">{item.question}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Interventions */}
                  <div className="bg-muted/30 rounded-xl p-6 border border-border/60">
                    <h4 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
                      <div className="p-1.5 bg-green-600 dark:bg-green-500 rounded-full">
                        <Shield className="h-4 w-4 text-white" />
                      </div>
                      AI Intervention Recommendations
                    </h4>
                    <div className="space-y-4">
                      {/* Immediate Interventions */}
                      {result.aiInsights.recommendedInterventions.immediate.length > 0 && (
                        <div>
                          <h5 className="text-xs font-semibold text-destructive uppercase tracking-wide mb-2">Immediate:</h5>
                          {result.aiInsights.recommendedInterventions.immediate.slice(0, 2).map((intervention, index) => (
                            <div key={index} className="flex items-start gap-2 mb-2">
                              <div className="w-2 h-2 bg-destructive rounded-full mt-1.5 flex-shrink-0" />
                              <p className="text-sm text-foreground leading-relaxed">{intervention}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Short-term Interventions */}
                      {result.aiInsights.recommendedInterventions.shortTerm.length > 0 && (
                        <div>
                          <h5 className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide mb-2">Short-term:</h5>
                          {result.aiInsights.recommendedInterventions.shortTerm.slice(0, 2).map((intervention, index) => (
                            <div key={index} className="flex items-start gap-2 mb-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                              <p className="text-sm text-foreground leading-relaxed">{intervention}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Long-term Interventions */}
                      {result.aiInsights.recommendedInterventions.longTerm.length > 0 && (
                        <div>
                          <h5 className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-2">Long-term:</h5>
                          {result.aiInsights.recommendedInterventions.longTerm.slice(0, 2).map((intervention, index) => (
                            <div key={index} className="flex items-start gap-2 mb-2">
                              <div className="w-2 h-2 bg-green-600 dark:bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                              <p className="text-sm text-foreground leading-relaxed">{intervention}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* AI Lifestyle Recommendations */}
                <div className="bg-muted/30 rounded-xl p-6 mt-6 border border-border/60">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground">AI Lifestyle Recommendations</h4>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(result.aiInsights.lifestyleRecommendations).map(([category, recommendations]) => (
                      recommendations.length > 0 && (
                        <div key={category} className="bg-muted/50 p-4 rounded-lg border border-border/40">
                          <h5 className="font-semibold text-foreground mb-2 capitalize">
                            {category.replace(/([A-Z])/g, ' $1').trim()}
                          </h5>
                          <ul className="space-y-1">
                            {recommendations.slice(0, 2).map((rec, index) => (
                              <li key={index} className="text-sm text-foreground flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-600 dark:bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI-Powered Tips Tab - Completely Personalized */}
          <TabsContent value="recommendations" className="space-y-6">
            {/* AI-Generated Personalized Tips */}
            {result.aiInsights.personalizedTips && result.aiInsights.personalizedTips.length > 0 && (
              <Card className="bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-foreground">
                        {result.userProfile.firstName && result.userProfile.firstName.trim() 
                          ? `Personalized Tips for ${result.userProfile.firstName}` 
                          : 'Your Personalized Tips'}
                      </span>
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      🤖 AI-Tailored for Your Situation
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    {result.aiInsights.personalizedTips.map((tip, index) => (
                      <div key={index} className="bg-muted/30 rounded-xl p-6 border border-border/60">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-muted/50 rounded-lg border border-border/40">
                            <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{tip.title}</h4>
                            <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">{tip.category}</span>
                          </div>
                        </div>
                        <p className="text-sm text-foreground mb-4 leading-relaxed">{cleanAgeReferences(tip.description)}</p>
                        
                        {tip.actionSteps && tip.actionSteps.length > 0 && (
                          <div className="space-y-2 mb-4">
                            <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Action Steps:</h5>
                            {tip.actionSteps.map((step, stepIndex) => (
                              <div key={stepIndex} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-purple-500 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-foreground">{cleanAgeReferences(step)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {tip.personalizedNote && (
                          <div className="bg-muted/50 rounded-lg p-3 border border-border/40">
                            <p className="text-xs text-foreground italic">
                              <strong>Why this helps you:</strong> {cleanAgeReferences(tip.personalizedNote)}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI-Generated Daily Practices */}
            {result.aiInsights.dailyPractices && result.aiInsights.dailyPractices.length > 0 && (
              <Card className="bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-foreground">Your Daily Wellness Practices</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid md:grid-cols-3 gap-4">
                    {result.aiInsights.dailyPractices.map((practice, index) => (
                      <div key={index} className="bg-muted/30 rounded-xl p-5 border border-border/60">
                        <div className="text-center mb-4">
                          <div className="p-3 bg-muted/50 rounded-full mx-auto w-fit mb-3 border border-border/40">
                            <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <h4 className="font-semibold text-foreground mb-1">{practice.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {practice.frequency}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground mb-3 text-center leading-relaxed">{practice.description}</p>
                        {practice.personalizedTip && (
                          <div className="bg-muted/50 rounded-lg p-3 border border-border/40">
                            <p className="text-xs text-foreground text-center">
                              <strong>💡 For you:</strong> {practice.personalizedTip}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI-Generated Goals */}
            <Card className="bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-foreground">Your Personalized Goals</span>
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    🎯 Tailored for Your Progress
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  {result.aiInsights.personalizedGoals && result.aiInsights.personalizedGoals.length > 0 ? (
                    result.aiInsights.personalizedGoals.map((goal, index) => (
                      <div key={index} className="bg-muted/30 rounded-xl p-6 border border-border/60">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-muted/50 rounded-lg border border-border/40">
                            <Star className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{goal.goal}</h4>
                            <span className="text-xs text-primary font-medium">{goal.timeframe}</span>
                          </div>
                        </div>
                        
                        {goal.why && (
                          <div className="mb-4">
                            <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Why This Matters:</h5>
                            <p className="text-sm text-foreground leading-relaxed">{goal.why}</p>
                          </div>
                        )}
                        
                        {goal.steps && goal.steps.length > 0 && (
                          <div className="space-y-2 mb-4">
                            <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Your Action Plan:</h5>
                            {goal.steps.map((step, stepIndex) => (
                              <div key={stepIndex} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-foreground">{step}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {goal.successMetrics && goal.successMetrics.length > 0 && (
                          <div className="bg-muted/50 rounded-lg p-3 border border-border/40">
                            <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Success Metrics:</h5>
                            {goal.successMetrics.map((metric, metricIndex) => (
                              <p key={metricIndex} className="text-xs text-foreground">
                                • {metric}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <div className="p-4 bg-muted/50 rounded-lg border border-border/40">
                        <Target className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                        <p className="text-foreground">
                          Personalized goals are being generated based on your responses. Please refresh to see your AI-tailored recommendations.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Fallback to show actionable tips if AI tips aren't available */}
            {(!result.aiInsights.personalizedTips || result.aiInsights.personalizedTips.length === 0) && (
              <Card className="bg-background border border-border shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                      <Lightbulb className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="text-foreground">General Wellness Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid gap-4">
                    {result.actionableTips.slice(0, 3).map((tip, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-background border-border">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-foreground">{tip.title}</h4>
                            <p className="text-sm text-muted-foreground">{tip.category}</p>
                          </div>
                          <Badge variant={tip.difficulty === 'easy' ? 'secondary' : 'default'}>
                            {tip.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground mb-3">{tip.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{tip.timeframe}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* AI-Powered Resources Tab - Completely Personalized */}
          <TabsContent value="resources" className="space-y-6">
            {/* AI-Generated Support Resources Header */}
            <div className="bg-muted/30 border border-border/60 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {result.userProfile.firstName && result.userProfile.firstName.trim() 
                    ? `Resources Personalized for ${result.userProfile.firstName}` 
                    : 'Personalized Resources for You'}
                </h3>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {hasUserLocation() 
                  ? "Based on your assessment results and location, here are AI-selected resources specifically for your situation."
                  : "Based on your assessment results, here are AI-selected resources specifically for your situation."
                }
              </p>
            </div>

            {/* AI-Generated Emergency Resources */}
            {result.riskAssessment.immediateIntervention && result.aiInsights && (
              <Card className="bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-foreground">Immediate Support - Available Now</span>
                  </CardTitle>
                  <CardDescription className="text-foreground font-medium">
                    ⚠️ If you're in crisis or need immediate help, please reach out to these resources right away
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Show AI-generated emergency resources first, then fallback to static ones */}
                    {(result.aiInsights._aiVerification?.isRealAI && 
                      result.professionalResources.emergencyResources.some(r => r.name !== '988 Suicide & Crisis Lifeline')) ? 
                      result.professionalResources.emergencyResources.map((resource, index) => (
                        <div key={index} className="p-4 bg-muted/30 border border-border/60 rounded-lg hover:shadow-sm transition-shadow">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-destructive rounded-full">
                              <Phone className="h-4 w-4 text-destructive-foreground" />
                            </div>
                            <h4 className="font-semibold text-foreground">{resource.name}</h4>
                          </div>
                          <p className="text-sm text-foreground mb-3 leading-relaxed">{resource.description}</p>
                          <div className="flex items-center gap-2 mb-2 p-2 bg-muted/50 rounded border border-border/40">
                            <span className="text-lg">📞</span>
                            <a href={`tel:${resource.phone}`} className="font-mono text-lg font-bold text-foreground hover:underline">
                              {resource.phone}
                            </a>
                          </div>
                          <p className="text-xs text-foreground font-medium">{resource.availability}</p>
                        </div>
                      )) : 
                      // Fallback emergency resources with enhanced presentation
                      [
                        {
                          name: '988 Suicide & Crisis Lifeline',
                          phone: '988',
                          description: '24/7 free and confidential support for people in distress, prevention and crisis resources.',
                          availability: 'Available 24/7'
                        },
                        {
                          name: 'Crisis Text Line',
                          phone: 'Text HOME to 741741',
                          description: 'Free, 24/7 crisis support via text message.',
                          availability: 'Available 24/7'
                        }
                      ].map((resource, index) => (
                        <div key={index} className="p-4 bg-muted/30 border border-border/60 rounded-lg hover:shadow-sm transition-shadow">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-destructive rounded-full">
                              <Phone className="h-4 w-4 text-destructive-foreground" />
                            </div>
                            <h4 className="font-semibold text-foreground">{resource.name}</h4>
                          </div>
                          <p className="text-sm text-foreground mb-3 leading-relaxed">{resource.description}</p>
                          <div className="flex items-center gap-2 mb-2 p-2 bg-muted/50 rounded border border-border/40">
                            <span className="text-lg">📞</span>
                            <span className="font-mono text-lg font-bold text-foreground">
                              {resource.phone}
                            </span>
                          </div>
                          <p className="text-xs text-foreground font-medium">{resource.availability}</p>
                        </div>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI-Generated Professional Support */}
            <Card className="bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-foreground">Professional Support Recommendations</span>
                </CardTitle>
                <CardDescription className="text-foreground">
                  Based on your assessment, these professional resources may be particularly helpful for your situation
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Show AI-generated local providers if available AND user has location, otherwise show generic guidance */}
                {hasUserLocation() && result.professionalResources.localProviders.length > 0 ? (
                  <div className="space-y-4">
                    {result.professionalResources.localProviders.slice(0, 3).map((provider, index) => (
                      <div key={index} className="p-4 bg-muted/30 border border-border/60 rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                              <div className="p-1 bg-primary rounded-full">
                                <MapPin className="h-3 w-3 text-primary-foreground" />
                              </div>
                              {provider.name}
                            </h4>
                            <p className="text-sm text-primary capitalize font-medium">{provider.type}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {provider.rating && (
                              <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded border border-border/40">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-foreground font-medium">{provider.rating}</span>
                              </div>
                            )}
                            {provider.acceptsInsurance && (
                              <Badge variant="secondary" className="bg-muted/50 text-foreground border border-border/40">
                                Accepts Insurance
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <p className="flex items-center gap-2 text-foreground">
                              <MapPin className="h-4 w-4 text-blue-500" />
                              {provider.address}
                            </p>
                            <p className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-blue-500" />
                              <a href={`tel:${provider.phone}`} className="hover:underline text-blue-600 dark:text-blue-400 font-medium">
                                {provider.phone}
                              </a>
                            </p>
                            {provider.distanceKm && (
                              <p className="text-muted-foreground flex items-center gap-2">
                                <span className="text-blue-500">📍</span>
                                {provider.distanceKm} km from your location
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <p className="font-medium mb-2 text-foreground">Specializes in:</p>
                            <div className="flex flex-wrap gap-1">
                              {provider.specialties.slice(0, 4).map((specialty, specialtyIndex) => (
                                <Badge key={specialtyIndex} variant="outline" className="text-xs bg-muted/50 border-border/40">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="p-4 bg-muted/30 border border-border/60 rounded-lg">
                      <Users className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                      <h4 className="font-semibold text-foreground mb-2">
                        {hasUserLocation() 
                          ? "Find Professional Support Near You" 
                          : "Find Professional Support"
                        }
                      </h4>
                      <p className="text-sm text-foreground mb-4 leading-relaxed">
                        Based on your assessment results, speaking with a mental health professional could be very beneficial. Here's how to find the right support:
                      </p>
                      <div className="text-left space-y-2 max-w-md mx-auto">
                        <p className="text-sm text-foreground">• Contact your insurance provider for covered therapists</p>
                        <p className="text-sm text-foreground">• Search Psychology Today for local providers</p>
                        <p className="text-sm text-foreground">• Ask your primary care doctor for referrals</p>
                        <p className="text-sm text-foreground">• Consider online therapy platforms if local options are limited</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI-Enhanced Online Resources */}
            <Card className="bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
                    <ExternalLink className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-foreground">Digital Wellness Tools</span>
                </CardTitle>
                <CardDescription className="text-foreground">
                  Curated apps and online resources that align with your assessment results
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid md:grid-cols-2 gap-4">
                  {result.professionalResources.onlineResources.length > 0 ? 
                    result.professionalResources.onlineResources.slice(0, 4).map((resource, index) => (
                      <div key={index} className="p-4 bg-muted/30 border border-border/60 rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            <div className="p-1 bg-green-500 rounded-full">
                              <ExternalLink className="h-3 w-3 text-white" />
                            </div>
                            {resource.title}
                          </h4>
                          <Badge variant={resource.cost === 'free' ? 'secondary' : 'outline'} 
                                 className={resource.cost === 'free' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : ''}>
                            {resource.cost}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground mb-3 leading-relaxed">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            {resource.rating && (
                              <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded border border-border/40">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-foreground font-medium">{resource.rating}</span>
                              </div>
                            )}
                            <Badge variant="outline" className="text-xs bg-muted/50 border-border/40">
                              {resource.type}
                            </Badge>
                          </div>
                          <Button size="sm" variant="outline" asChild className="border-border hover:bg-muted">
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Try Now
                            </a>
                          </Button>
                        </div>
                      </div>
                    )) : 
                    // Fallback recommended resources
                    [
                      {
                        title: 'Headspace',
                        description: 'Guided meditation and mindfulness exercises designed to reduce stress and improve mental wellbeing.',
                        cost: 'freemium',
                        type: 'Meditation App',
                        rating: 4.8,
                        url: 'https://headspace.com'
                      },
                      {
                        title: 'MindShift',
                        description: 'Free app designed to help manage anxiety, worry, and panic using cognitive behavioral therapy strategies.',
                        cost: 'free',
                        type: 'CBT App',
                        rating: 4.6,
                        url: 'https://mindshift.bc.ca'
                      },
                      {
                        title: 'Crisis Text Line',
                        description: 'Free, confidential support via text message when you need it most.',
                        cost: 'free',
                        type: 'Crisis Support',
                        rating: 4.7,
                        url: 'https://crisistextline.org'
                      },
                      {
                        title: 'NAMI Resources',
                        description: 'National Alliance on Mental Illness - comprehensive mental health education and support resources.',
                        cost: 'free',
                        type: 'Educational',
                        rating: 4.5,
                        url: 'https://nami.org'
                      }
                    ].map((resource, index) => (
                      <div key={index} className="p-4 bg-muted/30 border border-border/60 rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            <div className="p-1 bg-green-500 rounded-full">
                              <ExternalLink className="h-3 w-3 text-white" />
                            </div>
                            {resource.title}
                          </h4>
                          <Badge variant={resource.cost === 'free' ? 'secondary' : 'outline'} 
                                 className={resource.cost === 'free' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : ''}>
                            {resource.cost}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground mb-3 leading-relaxed">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded border border-border/40">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-foreground font-medium">{resource.rating}</span>
                            </div>
                            <Badge variant="outline" className="text-xs bg-muted/50 border-border/40">
                              {resource.type}
                            </Badge>
                          </div>
                          <Button size="sm" variant="outline" asChild className="border-border hover:bg-muted">
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Try Now
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tracking Tab - AI Enhanced */}
          <TabsContent value="tracking" className="space-y-6">
            {/* AI-Generated Follow-up Recommendations */}
            <Card className="bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-foreground">Your Personalized Follow-up Plan</span>
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    🎯 Tailored to Your Progress
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-muted/30 border border-border/60 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
                      <div className="p-1.5 bg-primary rounded-full">
                        <Target className="h-4 w-4 text-primary-foreground" />
                      </div>
                      Your Next Steps
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border/40">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-white">1</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Retake This Assessment</p>
                          <p className="text-sm text-muted-foreground">
                            In {result.followUpRecommendation.retakeInWeeks} weeks to track your progress
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border/40">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-white">2</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Regular Check-ins</p>
                          <p className="text-sm text-muted-foreground">
                            {result.followUpRecommendation.monitoringFrequency}
                          </p>
                        </div>
                      </div>
                      {result.aiInsights.personalizedGoals && result.aiInsights.personalizedGoals.length > 0 && (
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border/40">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-white">3</span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">Work on Personal Goals</p>
                            <p className="text-sm text-muted-foreground">
                              Focus on the {result.aiInsights.personalizedGoals.length} personalized goals created for you
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 border border-border/60 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
                      <div className="p-1.5 bg-orange-500 rounded-full">
                        <AlertTriangle className="h-4 w-4 text-white" />
                      </div>
                      Warning Signs to Monitor
                    </h4>
                    <div className="space-y-3">
                      {(result.aiInsights.warningSignsToWatch && result.aiInsights.warningSignsToWatch.length > 0 ? 
                        result.aiInsights.warningSignsToWatch : 
                        result.followUpRecommendation.warningSignsToWatch).slice(0, 5).map((sign, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border border-border/40">
                            <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-foreground leading-relaxed">{sign}</span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI-Enhanced Progress Tracking Metrics */}
            <Card className="bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-foreground">Track Your Mental Health Progress</span>
                </CardTitle>
                <CardDescription className="text-foreground">
                  Monitor these key areas to see your improvement over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {/* AI-enhanced progress metrics with better presentation */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.followUpRecommendation.progressTracking.map((metric, index) => (
                    <div key={index} className="p-4 bg-muted/30 border border-border/60 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                          <Heart className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-foreground leading-relaxed">{metric}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI-Generated Encouragement for Progress Tracking */}
                <div className="mt-6 bg-muted/30 border border-border/60 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground">Progress Tracking Tips</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-foreground mb-2">
                        <strong>Daily Check-ins:</strong> Rate your mood and energy levels each day to identify patterns.
                      </p>
                      <p className="text-sm text-foreground mb-2">
                        <strong>Weekly Reflection:</strong> Note what strategies are working and what challenges you're facing.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground mb-2">
                        <strong>Celebrate Small Wins:</strong> Acknowledge every positive step, no matter how small it seems.
                      </p>
                      <p className="text-sm text-foreground">
                        <strong>Stay Patient:</strong> Mental health progress takes time - be compassionate with yourself.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
