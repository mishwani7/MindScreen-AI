import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Heart, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  Activity,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Timer,
  FileText
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ScreenersPage() {
  const navigate = useNavigate()
  
  const screeningTools = [
    {
      id: 'phq9',
      name: 'Depression Screening',
      shortName: 'PHQ-9',
      description: 'Comprehensive depression assessment using the clinically validated Patient Health Questionnaire',
      questions: 9,
      duration: '3-5 minutes',
      icon: Heart,
      color: 'from-blue-500 to-blue-600',
      bgGradient: 'bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10',
      textColor: 'text-blue-600 dark:text-blue-400',
      category: 'Mood Disorders',
      available: true,
      featured: true,
      accuracy: '95%'
    },
    {
      id: 'gad7',
      name: 'Anxiety Assessment',
      shortName: 'GAD-7',
      description: 'Evaluate generalized anxiety disorder symptoms with this widely-used 7-item clinical tool',
      questions: 7,
      duration: '2-4 minutes',
      icon: Zap,
      color: 'from-emerald-500 to-emerald-600',
      bgGradient: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      category: 'Anxiety Disorders',
      available: false,
      featured: true,
      accuracy: '93%'
    },
    {
      id: 'asrs',
      name: 'ADHD Screening',
      shortName: 'ASRS',
      description: 'Adult ADHD Self-Report Scale for comprehensive attention deficit hyperactivity assessment',
      questions: 18,
      duration: '5-7 minutes',
      icon: Activity,
      color: 'from-purple-500 to-purple-600',
      bgGradient: 'bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10',
      textColor: 'text-purple-600 dark:text-purple-400',
      category: 'Attention Disorders',
      available: false,
      featured: true,
      accuracy: '91%'
    },
    {
      id: 'aq10',
      name: 'Autism Screening',
      shortName: 'AQ-10',
      description: 'Autism Spectrum Quotient short form for adults screening and assessment',
      questions: 10,
      duration: '3-5 minutes',
      icon: Brain,
      color: 'from-teal-500 to-teal-600',
      bgGradient: 'bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-950/20 dark:to-teal-900/10',
      textColor: 'text-teal-600 dark:text-teal-400',
      category: 'Neurodevelopmental',
      available: false,
      featured: false,
      accuracy: '88%'
    },
    {
      id: 'pcl5',
      name: 'PTSD Assessment',
      shortName: 'PCL-5',
      description: 'PTSD Checklist for DSM-5 to assess post-traumatic stress disorder symptoms',
      questions: 20,
      duration: '7-10 minutes',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      bgGradient: 'bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/10',
      textColor: 'text-red-600 dark:text-red-400',
      category: 'Trauma Disorders',
      available: false,
      featured: false,
      accuracy: '92%'
    },
    {
      id: 'ocir',
      name: 'OCD Screening',
      shortName: 'OCI-R',
      description: 'Obsessive-Compulsive Inventory-Revised for comprehensive OCD symptom assessment',
      questions: 18,
      duration: '5-8 minutes',
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      bgGradient: 'bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10',
      textColor: 'text-orange-600 dark:text-orange-400',
      category: 'Anxiety Disorders',
      available: false,
      featured: false,
      accuracy: '89%'
    },
    {
      id: 'mdq',
      name: 'Bipolar Screening',
      shortName: 'MDQ',
      description: 'Mood Disorder Questionnaire for bipolar disorder screening and assessment',
      questions: 15,
      duration: '4-6 minutes',
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      bgGradient: 'bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/20 dark:to-indigo-900/10',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      category: 'Mood Disorders',
      available: false,
      featured: false,
      accuracy: '87%'
    },
    {
      id: 'k10',
      name: 'Distress Scale',
      shortName: 'K10',
      description: 'Kessler Psychological Distress Scale for general mental health screening',
      questions: 10,
      duration: '3-5 minutes',
      icon: Clock,
      color: 'from-cyan-500 to-cyan-600',
      bgGradient: 'bg-gradient-to-br from-cyan-50 to-cyan-100/50 dark:from-cyan-950/20 dark:to-cyan-900/10',
      textColor: 'text-cyan-600 dark:text-cyan-400',
      category: 'General Assessment',
      available: false,
      featured: false,
      accuracy: '86%'
    }
  ]

  const handleStartScreening = (toolId: string) => {
    if (toolId === 'phq9') {
      navigate('/screeners/phq9')
    } else {
      // For now, show coming soon message for other tools
      alert(`${screeningTools.find(t => t.id === toolId)?.name} is coming soon!`)
    }
  }

  const featuredTools = screeningTools.filter(tool => tool.featured)
  const allTools = screeningTools

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8 sm:py-12 lg:py-16 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 animate-slide-up">
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 animate-float shadow-xl">
              <Brain className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2">
            Mental Health{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Screening Tools
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
            Comprehensive, clinically validated assessment tools powered by AI to help you understand your mental health. 
            Each screening provides personalized insights and actionable recommendations.
          </p>
        </div>

        {/* Featured Assessments */}
        <section className="mb-16 sm:mb-20 animate-slide-up">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-3 sm:px-4 py-2 mb-3 sm:mb-4 border border-primary/20">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span className="text-sm sm:text-base text-primary font-semibold">Featured Assessments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 px-2">
              Most Popular Screening Tools
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Start with these widely-used, evidence-based assessments trusted by mental health professionals worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {featuredTools.map((tool, index) => (
              <Card 
                key={tool.id} 
                className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-slide-up bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="text-center relative z-10 pb-3 sm:pb-4">
                  <div className={`bg-gradient-to-r ${tool.color} rounded-2xl p-2.5 sm:p-3 lg:p-4 w-fit mx-auto mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <Badge variant="secondary" className="bg-white/95 dark:bg-gray-800/95 text-gray-800 dark:text-gray-200 shadow-sm font-medium border border-gray-200 dark:border-gray-700 text-xs sm:text-sm">
                      {tool.accuracy} Accuracy
                    </Badge>
                    {tool.available && (
                      <Badge className="bg-green-500 text-white shadow-sm border-0 text-xs sm:text-sm">
                        <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                        Available
                      </Badge>
                    )}
                    {!tool.available && (
                      <Badge variant="outline" className="text-muted-foreground bg-muted/50 border-muted text-xs sm:text-sm">
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className="text-base sm:text-lg lg:text-xl text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors px-2">
                    {tool.name}
                  </CardTitle>
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
                    <span className="font-semibold text-foreground">{tool.shortName}</span>
                    <span>•</span>
                    <span className="text-center">{tool.category}</span>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 pt-0 px-3 sm:px-6">
                  <CardDescription className="text-center text-sm sm:text-base leading-relaxed text-muted-foreground mb-3 sm:mb-4 px-2">
                    {tool.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground bg-muted/30 rounded-lg p-2.5 sm:p-3 mb-3 sm:mb-4">
                    <div className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="font-medium">{tool.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Timer className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="font-medium">{tool.duration}</span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full bg-gradient-to-r ${tool.color} hover:shadow-lg transition-all duration-300 text-white border-0 font-semibold hover:scale-105 text-sm sm:text-base`}
                    size="lg"
                    onClick={() => handleStartScreening(tool.id)}
                    disabled={!tool.available}
                  >
                    {tool.available ? (
                      <>
                        Start Assessment
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    ) : (
                      <>
                        Coming Soon
                        <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Assessments */}
        <section className="mb-12 sm:mb-16 animate-slide-up">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 px-2">
              All Assessment Tools
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Comprehensive collection of evidence-based mental health screening instruments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {allTools.map((tool, index) => (
              <Card 
                key={tool.id} 
                className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-slide-up bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="relative z-10 p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <tool.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    {tool.available ? (
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                  
                  <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {tool.shortName}
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground font-medium leading-tight">
                      {tool.name}
                    </p>
                    <p className="text-xs text-muted-foreground bg-muted/40 rounded px-2 py-1">
                      {tool.questions} questions • {tool.duration}
                    </p>
                  </div>

                  <Button 
                    variant={tool.available ? "default" : "outline"}
                    size="sm"
                    className={`w-full transition-all duration-300 font-semibold text-xs sm:text-sm ${
                      tool.available 
                        ? `bg-gradient-to-r ${tool.color} text-white border-0 hover:scale-105 hover:shadow-lg` 
                        : 'bg-muted/50 text-muted-foreground'
                    }`}
                    onClick={() => handleStartScreening(tool.id)}
                    disabled={!tool.available}
                  >
                    {tool.available ? 'Start Assessment' : 'Coming Soon'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent my-16"></div>

        {/* Usage Statistics Section */}
        <section className="text-center animate-slide-up mb-16">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Join the community using our validated screening tools for better mental health awareness.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: "10,000+", label: "Assessments Completed", icon: Activity, color: "from-blue-500 to-blue-600" },
              { number: "95%", label: "Clinical Accuracy", icon: CheckCircle, color: "from-emerald-500 to-emerald-600" },
              { number: "8", label: "Validated Tools", icon: FileText, color: "from-purple-500 to-purple-600" },
              { number: "24/7", label: "Available Access", icon: Clock, color: "from-amber-500 to-amber-600" }
            ].map((stat, index) => (
              <Card 
                key={index}
                className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-slide-up bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="text-center relative z-10 pb-4">
                  <div className={`bg-gradient-to-r ${stat.color} rounded-2xl p-3 sm:p-4 w-fit mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-2">
                    {stat.number}
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{stat.label}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent mb-16"></div>

        {/* FAQ Section */}
        <section className="animate-slide-up mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Common questions about our mental health screening tools and assessments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                question: "How accurate are these screening tools?",
                answer: "Our screening tools are based on clinically validated assessments like PHQ-9 and GAD-7, which have been extensively researched and validated in clinical settings with accuracy rates of 90-95%."
              },
              {
                question: "Is my data private and secure?",
                answer: "Yes, absolutely. We don't store any personal information on our servers. All data is processed locally in your browser and encrypted during transmission to our AI analysis service."
              },
              {
                question: "Can these replace professional diagnosis?",
                answer: "No, these are screening tools designed to help identify potential mental health concerns. They should not replace professional medical advice, diagnosis, or treatment from qualified healthcare providers."
              },
              {
                question: "How long do assessments take?",
                answer: "Most assessments take 2-7 minutes to complete, depending on the tool. The PHQ-9 takes about 3-5 minutes, while more comprehensive tools like ASRS may take 5-7 minutes."
              },
              {
                question: "What happens after I complete an assessment?",
                answer: "You'll receive instant results with AI-powered analysis, including severity scores, personalized insights, and recommendations for next steps based on your responses."
              },
              {
                question: "Are the tools suitable for all ages?",
                answer: "Our current tools are designed for adults (18+). Different age groups may require specialized assessments that we're considering for future releases."
              }
            ].map((faq, index) => (
              <Card 
                key={index}
                className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-slide-up bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10 pb-4">
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 pt-0">
                  <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent mb-16"></div>

        {/* Information Section */}
        <section className="text-center animate-slide-up">
          <Card className="bg-gradient-to-br from-muted/50 to-muted/20 border-2 border-muted backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-3 sm:p-4 shadow-lg">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 px-2">
                Important Information
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto px-4">
                These screening tools are for educational and informational purposes only. They are not 
                intended to replace professional medical advice, diagnosis, or treatment. If you're experiencing 
                mental health concerns, please consult with a qualified healthcare provider or mental health professional.
              </p>
              <div className="mt-6 sm:mt-8 flex justify-center">
                <Button 
                  variant="outline" 
                  className="bg-background/70 backdrop-blur-sm hover:bg-background/90 transition-all duration-300 border-2 border-muted-foreground/20 text-foreground font-medium text-sm sm:text-base w-full sm:w-auto max-w-xs sm:max-w-none"
                  size="lg"
                  onClick={() => navigate('/about')}
                >
                  Learn More About Our Assessments
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
