import { Link } from 'react-router-dom'
import { Brain, Shield, Zap, FileText, ArrowRight, Star, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppStore } from '@/store/app-store'

export default function HomePage() {
  const { theme } = useAppStore()
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI interpretation for personalized insights and actionable mental health recommendations.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Clinically Validated',
      description: 'All screening tools are based on established clinical assessments like PHQ-9, GAD-7, and ASRS.',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get immediate scoring and detailed reports with actionable next steps for your mental health.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FileText,
      title: 'Downloadable Reports',
      description: 'Export comprehensive PDF reports to share with healthcare providers or for personal records.',
      color: 'from-amber-500 to-amber-600'
    }
  ]

  const screeners = [
    { 
      name: 'Depression (PHQ-9)', 
      description: 'Screen for major depressive symptoms', 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      available: true
    },
    { 
      name: 'Anxiety (GAD-7)', 
      description: 'Assess generalized anxiety disorder', 
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      available: false
    },
    { 
      name: 'ADHD (ASRS)', 
      description: 'Adult ADHD self-report scale', 
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      available: false
    },
    { 
      name: 'Autism (AQ-10)', 
      description: 'Autism spectrum quotient screening', 
      color: 'bg-gradient-to-r from-pink-500 to-pink-600',
      available: false
    },
    { 
      name: 'PTSD (PCL-5)', 
      description: 'Post-traumatic stress disorder checklist', 
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      available: false
    },
    { 
      name: 'OCD (OCI-R)', 
      description: 'Obsessive-compulsive inventory', 
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      available: false
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Width */}
      <section className="relative min-h-[80vh] w-full overflow-hidden flex items-center border-b border-border/20">
        {/* Professional gradient background with subtle colors */}
        <div className={`absolute inset-0 ${
          theme === 'light' 
            ? 'bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/40' 
            : 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40'
        }`}>
          {/* Decorative elements - Desktop only with reduced opacity */}
          <div className="absolute inset-0 hidden lg:block opacity-60">
            {/* Large decorative circles with floating animation */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-br from-cyan-100/20 to-emerald-100/20 rounded-full blur-3xl animate-float-delayed"></div>
            
            {/* Mind & Health themed floating elements */}
            <div className="absolute inset-0 opacity-50">
              {/* Brain neurons - interconnected dots */}
              <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-emerald-400/70 rounded-full animate-float-slow">
                <div className="absolute inset-0 bg-emerald-400/50 rounded-full animate-ping"></div>
              </div>
              <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-teal-400/70 rounded-full animate-float-medium" style={{ animationDelay: '1s' }}>
                <div className="absolute inset-0 bg-teal-400/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-cyan-400/70 rounded-full animate-float-fast" style={{ animationDelay: '2s' }}>
                <div className="absolute inset-0 bg-cyan-400/50 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
              <div className="absolute bottom-1/4 right-1/5 w-3 h-3 bg-emerald-400/70 rounded-full animate-float-slow" style={{ animationDelay: '0.5s' }}>
                <div className="absolute inset-0 bg-emerald-400/50 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
              </div>
              
              {/* Additional neural network nodes */}
              <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-teal-300/70 rounded-full animate-float-medium" style={{ animationDelay: '3s' }}></div>
              <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-cyan-300/70 rounded-full animate-float-fast" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute top-1/6 right-1/6 w-2 h-2 bg-emerald-300/70 rounded-full animate-float-slow" style={{ animationDelay: '2.5s' }}></div>
              
              {/* Connecting lines simulation with small moving dots */}
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-emerald-200/70 rounded-full animate-float-path" style={{ animationDelay: '4s' }}></div>
              <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-teal-200/70 rounded-full animate-float-path-reverse" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-1/2 left-1/2 w-1 h-1 bg-cyan-200/70 rounded-full animate-float-path" style={{ animationDelay: '3s' }}></div>
            </div>
            
            {/* Professional geometric patterns with enhanced movement */}
            <div className="absolute top-20 right-20 w-32 h-32 border border-emerald-200/25 rounded-2xl animate-float-rotate" style={{ animationDelay: '3s' }}></div>
            <div className="absolute bottom-32 left-16 w-24 h-24 border border-teal-200/25 rounded-full animate-float-scale" style={{ animationDelay: '2s' }}></div>
            
            {/* Health-themed abstract shapes */}
            <div className="absolute top-1/2 right-1/6 w-16 h-16 border-2 border-emerald-300/20 rounded-full animate-float-orbit" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/6 right-1/4 w-12 h-12 bg-gradient-to-br from-teal-200/12 to-cyan-200/12 rounded-lg animate-float-wobble" style={{ animationDelay: '2.5s' }}></div>
            
            {/* Mindfulness-inspired flowing elements */}
            <div className="absolute top-1/6 left-1/4 w-20 h-6 bg-gradient-to-r from-emerald-100/20 to-transparent rounded-full animate-float-flow" style={{ animationDelay: '4s' }}></div>
            <div className="absolute bottom-1/4 right-1/8 w-24 h-4 bg-gradient-to-l from-teal-100/20 to-transparent rounded-full animate-float-flow-reverse" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8 py-12">
              {/* Main Heading */}
              <div className="animate-slide-up">
                <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  Transform Your{' '}
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    Mental Health
                  </span>
                </h1>
              </div>
              
              {/* Subtitle */}
              <p className={`text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto animate-fade-in ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`} style={{ animationDelay: '0.3s' }}>
                AI-powered mental health screening with clinically validated assessments. Get personalized insights and take control of your wellbeing journey.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6 rounded-2xl font-semibold group"
                >
                  <Link to="/screeners">
                    Start Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-emerald-400 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-500 hover:text-emerald-950 dark:border-emerald-600 dark:text-emerald-200 dark:hover:bg-emerald-900/30 dark:hover:border-emerald-500 dark:hover:text-emerald-100 text-lg px-8 py-6 rounded-2xl font-semibold transition-all duration-300"
                  asChild
                >
                  <Link to="/about">
                    How It Works
                  </Link>
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 sm:gap-8 justify-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
                <div className={`flex items-center gap-2 text-sm font-medium ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  Clinically Validated
                </div>
                <div className={`flex items-center gap-2 text-sm font-medium ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                  <Shield className="h-5 w-5 text-teal-600" />
                  100% Private & Secure
                </div>
                <div className={`flex items-center gap-2 text-sm font-medium ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                  <Brain className="h-5 w-5 text-cyan-600" />
                  AI-Enhanced Results
                </div>
                <div className={`flex items-center gap-2 text-sm font-medium ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                  <Star className="h-5 w-5 text-amber-500" />
                  Trusted by Thousands
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"></div>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose MindScreen AI?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Combining clinical expertise with artificial intelligence for comprehensive mental health screening.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-slide-up bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="text-center relative z-10 pb-4">
                  <div className={`bg-gradient-to-r ${feature.color} rounded-2xl p-3 sm:p-4 w-fit mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 pt-0">
                  <CardDescription className="text-center text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"></div>

      {/* Screeners Preview */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Mental Health Assessments
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Access a wide range of clinically validated screening tools for various mental health conditions.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {screeners.map((screener, index) => (
              <Card 
                key={index} 
                className={`group hover:shadow-xl transition-all duration-300 animate-slide-up bg-background/80 backdrop-blur-sm border border-border/60 hover:border-border ${screener.available ? 'cursor-pointer hover:scale-[1.02]' : 'opacity-60'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                  <div className={`w-4 h-4 rounded-full ${screener.color} mr-3 shadow-sm flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-base sm:text-lg text-foreground">{screener.name}</CardTitle>
                      {screener.available ? (
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground whitespace-nowrap">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <CardDescription className="mt-1 text-sm text-muted-foreground">{screener.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          <div className="text-center animate-fade-in">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <Link to="/screeners">
                View All Screeners 
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"></div>

      {/* Trust Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center items-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 fill-current animate-bounce" 
                  style={{ animationDelay: `${i * 0.1}s`, animationDuration: '2s' }}
                />
              ))}
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
              Trusted by Mental Health Professionals
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
              Our platform uses established clinical assessment tools and AI-powered analysis 
              to provide accurate, reliable mental health screening results that you can trust.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              {[
                { number: "8", label: "Assessment Tools" },
                { number: "100%", label: "Clinically Validated" },
                { number: "AI", label: "Powered Insights" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="animate-slide-up bg-background/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-border/60 hover:border-border shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium text-sm sm:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"></div>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple, secure, and scientifically backed mental health screening in four easy steps.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: FileText,
                title: 'Choose Assessment',
                description: 'Select from our library of clinically validated mental health screening tools.',
                step: '01'
              },
              {
                icon: CheckCircle,
                title: 'Complete Questions',
                description: 'Answer thoughtfully designed questions based on established clinical protocols.',
                step: '02'
              },
              {
                icon: Brain,
                title: 'AI Analysis',
                description: 'Our advanced AI analyzes your responses and generates personalized insights.',
                step: '03'
              },
              {
                icon: Star,
                title: 'Get Results',
                description: 'Receive detailed reports with recommendations and next steps for your mental health journey.',
                step: '04'
              }
            ].map((step, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-slide-up bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="text-center relative z-10 pb-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-3 sm:p-4 w-fit mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{step.step}</div>
                  <CardTitle className="text-lg sm:text-xl text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 pt-0">
                  <CardDescription className="text-center text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"></div>

      {/* AI Technology Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              AI-Powered Analysis
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced AI interpretation for sophisticated analysis of your screening results with personalized insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: Brain,
                title: 'Contextual Analysis',
                description: 'Considers multiple factors and patterns in your responses for comprehensive understanding.',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: FileText,
                title: 'Personalized Insights',
                description: 'Tailored recommendations based on your specific results and response patterns.',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: Shield,
                title: 'Risk Assessment',
                description: 'Evaluates severity levels and identifies potential areas of concern requiring attention.',
                color: 'from-amber-500 to-amber-600'
              },
              {
                icon: ArrowRight,
                title: 'Next Steps',
                description: 'Actionable guidance for seeking appropriate support and continuing your mental health journey.',
                color: 'from-emerald-500 to-emerald-600'
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-slide-up bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="text-center relative z-10 pb-4">
                  <div className={`bg-gradient-to-r ${feature.color} rounded-2xl p-3 sm:p-4 w-fit mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 pt-0">
                  <CardDescription className="text-center text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"></div>

      {/* Security & Privacy Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Privacy & Security
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Your mental health data is sensitive, and we take privacy seriously. Here's how we protect your information.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Shield,
                title: 'No Server Storage',
                description: 'Your personal data is never stored on our servers. All information stays on your device.',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: CheckCircle,
                title: 'Local Processing',
                description: 'Assessment data is processed locally in your browser for maximum privacy protection.',
                color: 'from-emerald-500 to-emerald-600'
              },
              {
                icon: Brain,
                title: 'Encrypted Analysis',
                description: 'All AI analysis requests are encrypted and transmitted securely without personal identifiers.',
                color: 'from-teal-500 to-teal-600'
              },
              {
                icon: Star,
                title: 'No Tracking',
                description: 'We don\'t use analytics, tracking, or cookies that compromise your privacy.',
                color: 'from-cyan-500 to-cyan-600'
              },
              {
                icon: FileText,
                title: 'Open Source',
                description: 'Full transparency with open source code that you can review and verify.',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: ArrowRight,
                title: 'HIPAA Conscious',
                description: 'Designed with healthcare privacy standards in mind for professional-grade security.',
                color: 'from-purple-500 to-purple-600'
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-slide-up bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="text-center relative z-10 pb-4">
                  <div className={`bg-gradient-to-r ${feature.color} rounded-2xl p-3 sm:p-4 w-fit mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 pt-0">
                  <CardDescription className="text-center text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"></div>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background relative">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-3 w-fit mx-auto mb-6 shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Take Control of Your Mental Health?
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
              Begin your mental health screening journey with our comprehensive, AI-powered assessment tools 
              designed by professionals for everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6 rounded-2xl font-semibold group"
              >
                <Link to="/screeners">
                  Start Your Assessment
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>✓ 100% Free • ✓ No Registration Required • ✓ Instant Results • ✓ Complete Privacy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
