import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Github,
  ExternalLink,
  Heart,
  Target,
  Award,
  Lightbulb,
  Clock,
  FileText
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppStore } from '@/store/app-store'

export default function AboutPage() {
  const { theme } = useAppStore()
  
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI interpretation for personalized insights and recommendations tailored to your unique responses.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Clinically Validated',
      description: 'All screening tools are based on established clinical assessments like PHQ-9, GAD-7, and ASRS, trusted by healthcare professionals worldwide.',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get immediate scoring, detailed analysis, and personalized recommendations within seconds of completing any assessment.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'Professional Grade',
      description: 'Designed with mental health professionals in mind, providing comprehensive reports suitable for clinical discussion and personal tracking.',
      color: 'from-amber-500 to-amber-600'
    }
  ]

  const howItWorks = [
    {
      icon: Target,
      title: 'Choose Your Assessment',
      description: 'Select from our comprehensive library of clinically validated mental health screening tools.',
      step: '01'
    },
    {
      icon: FileText,
      title: 'Complete the Questions',
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
      icon: Heart,
      title: 'Get Your Results',
      description: 'Receive detailed reports with recommendations and next steps for your mental health journey.',
      step: '04'
    }
  ]

  const benefits = [
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Complete comprehensive mental health screenings in minutes, not hours.'
    },
    {
      icon: Award,
      title: 'Evidence-Based',
      description: 'All tools are based on peer-reviewed research and clinical best practices.'
    },
    {
      icon: Lightbulb,
      title: 'Actionable Insights',
      description: 'Get specific, practical recommendations you can act on immediately.'
    },
    {
      icon: Shield,
      title: '100% Private',
      description: 'Your data stays secure with no personal information stored on our servers.'
    }
  ]

  const assessments = [
    { name: 'PHQ-9', fullName: 'Patient Health Questionnaire-9', purpose: 'Depression screening', available: true },
    { name: 'GAD-7', fullName: 'Generalized Anxiety Disorder-7', purpose: 'Anxiety assessment', available: false },
    { name: 'ASRS', fullName: 'Adult ADHD Self-Report Scale', purpose: 'ADHD screening', available: false },
    { name: 'AQ-10', fullName: 'Autism Spectrum Quotient-10', purpose: 'Autism screening', available: false },
    { name: 'PCL-5', fullName: 'PTSD Checklist for DSM-5', purpose: 'PTSD assessment', available: false },
    { name: 'OCI-R', fullName: 'Obsessive-Compulsive Inventory-Revised', purpose: 'OCD screening', available: false },
    { name: 'MDQ', fullName: 'Mood Disorder Questionnaire', purpose: 'Bipolar screening', available: false },
    { name: 'K10', fullName: 'Kessler Psychological Distress Scale', purpose: 'General distress', available: false }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Width */}
      <section className="relative min-h-[80vh] w-full overflow-hidden flex items-center border-b border-border/20">
        {/* Professional gradient background with subtle colors */}
        <div className={`absolute inset-0 ${
          theme === 'light' 
            ? 'bg-gradient-to-br from-white via-blue-50/30 to-purple-50/40' 
            : 'bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40'
        }`}>
          {/* Decorative elements - Desktop only with reduced opacity */}
          <div className="absolute inset-0 hidden lg:block opacity-60">
            {/* Large decorative circles with floating animation */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-br from-purple-100/20 to-blue-100/20 rounded-full blur-3xl animate-float-delayed"></div>
            
            {/* Mind & Health themed floating elements */}
            <div className="absolute inset-0 opacity-50">
              {/* Brain neurons - interconnected dots */}
              <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-blue-400/70 rounded-full animate-float-slow">
                <div className="absolute inset-0 bg-blue-400/50 rounded-full animate-ping"></div>
              </div>
              <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-purple-400/70 rounded-full animate-float-medium" style={{ animationDelay: '1s' }}>
                <div className="absolute inset-0 bg-purple-400/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-indigo-400/70 rounded-full animate-float-fast" style={{ animationDelay: '2s' }}>
                <div className="absolute inset-0 bg-indigo-400/50 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
              <div className="absolute bottom-1/4 right-1/5 w-3 h-3 bg-blue-400/70 rounded-full animate-float-slow" style={{ animationDelay: '0.5s' }}>
                <div className="absolute inset-0 bg-blue-400/50 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8 py-12">
              {/* Main Heading */}
              <div className="animate-slide-up">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-4 animate-float shadow-lg">
                    <Brain className="h-16 w-16 text-blue-500" />
                  </div>
                </div>
                <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  About{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    MindScreen AI
                  </span>
                </h1>
              </div>
              
              {/* Subtitle */}
              <p className={`text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto animate-fade-in ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`} style={{ animationDelay: '0.3s' }}>
                A comprehensive, AI-powered mental health screening platform designed to provide professional-grade assessments with personalized insights and actionable recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"></div>

      {/* Mission, Vision & Objectives Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Purpose & Vision
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Driving the future of accessible mental health care through innovation and technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Heart,
                title: 'Our Mission',
                description: 'To democratize access to high-quality mental health screening by combining clinically validated assessment tools with cutting-edge AI technology, making professional-grade mental health evaluation accessible to everyone.',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: Target,
                title: 'Our Vision',
                description: 'A world where mental health screening is as accessible and routine as physical health checkups, empowering individuals to take proactive control of their mental wellness with confidence and privacy.',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: Award,
                title: 'Our Objectives',
                description: 'Provide scientifically-backed assessments, deliver AI-powered personalized insights, ensure complete privacy and security, and bridge the gap between self-assessment and professional mental health care.',
                color: 'from-emerald-500 to-emerald-600'
              }
            ].map((item, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-slide-up bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="text-center relative z-10 pb-4">
                  <div className={`bg-gradient-to-r ${item.color} rounded-2xl p-3 sm:p-4 w-fit mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 pt-0">
                  <CardDescription className="text-center text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
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
            {howItWorks.map((step, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-slide-up bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="text-center relative z-10 pb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-3 sm:p-4 w-fit mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{step.step}</div>
                  <CardTitle className="text-lg sm:text-xl text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{step.title}</CardTitle>
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

      {/* Key Features */}        
      <section className="py-16 sm:py-20 lg:py-24 bg-background relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose MindScreen AI?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              What makes our platform different from traditional mental health screening tools.
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

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Key Benefits
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the advantages of using AI-powered mental health screening.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-slide-up bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="text-center relative z-10 pb-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-3 sm:p-4 w-fit mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 pt-0">
                  <CardDescription className="text-center text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"></div>

      {/* Available Assessments */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Clinical Assessment Tools
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive screening across multiple mental health domains using validated clinical instruments.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {assessments.map((assessment, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-slide-up bg-background/80 backdrop-blur-sm hover:bg-background border border-border/60 hover:border-border"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-4 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-blue-600 group-hover:text-purple-600 transition-colors duration-300">{assessment.name}</div>
                    {assessment.available ? (
                      <CheckCircle className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-foreground font-medium mb-1">{assessment.fullName}</div>
                  <div className="text-xs text-muted-foreground">{assessment.purpose}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Section Separator */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent mb-16"></div>

          {/* AI Integration */}
          <div className="mb-16">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                AI-Powered Analysis
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                Advanced AI interpretation for sophisticated analysis of your screening results.
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
                  icon: Target,
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

          {/* Privacy & Security */}
          <div className="mb-16">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Privacy & Security
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                Your mental health data is sensitive, and we take privacy seriously with comprehensive protection measures.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Shield,
                  title: 'No Server Storage',
                  description: 'Your personal data is never stored on our servers, ensuring complete privacy and security.',
                  color: 'from-green-500 to-green-600'
                },
                {
                  icon: Brain,
                  title: 'Local Processing',
                  description: 'All data processing happens locally in your browser for maximum security and privacy.',
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  icon: Zap,
                  title: 'Encrypted Transmission',
                  description: 'All data transmission is encrypted using industry-standard security protocols.',
                  color: 'from-purple-500 to-purple-600'
                },
                {
                  icon: CheckCircle,
                  title: 'No Tracking',
                  description: 'We don\'t use analytics, tracking, or collect any personal information whatsoever.',
                  color: 'from-amber-500 to-amber-600'
                },
                {
                  icon: FileText,
                  title: 'Open Source',
                  description: 'Complete transparency with open source code available for public review and audit.',
                  color: 'from-teal-500 to-teal-600'
                },
                {
                  icon: Heart,
                  title: 'HIPAA-Conscious',
                  description: 'Designed with healthcare privacy standards and best practices in mind.',
                  color: 'from-rose-500 to-rose-600'
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
                    <CardTitle className="text-lg sm:text-xl text-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{feature.title}</CardTitle>
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

          {/* CTA Section */}
          <div className="text-center animate-slide-up">
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
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-2 border-slate-300 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:border-emerald-400 dark:hover:bg-emerald-900/40 dark:hover:border-emerald-300 text-lg px-8 py-6 rounded-2xl font-semibold transition-all duration-300"
              >
                <a 
                  href="https://github.com/mishwani7/MindScreen-AI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-900 hover:text-slate-900 dark:text-emerald-100 dark:hover:text-emerald-50 flex items-center justify-center"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View Source Code
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
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
