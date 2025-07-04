import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Brain, Sparkles, Zap, Target, Heart, Lightbulb } from 'lucide-react'

export function ModernGeneratingDialog() {
  const [currentStage, setCurrentStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [animatedText, setAnimatedText] = useState('')

  const stages = useMemo(() => [
    {
      icon: Brain,
      title: "Analyzing Neural Patterns",
      subtitle: "Processing your responses with advanced AI algorithms",
      color: "from-blue-500 to-indigo-600",
      duration: 2000
    },
    {
      icon: Sparkles,
      title: "Generating Insights",
      subtitle: "Creating personalized mental health insights",
      color: "from-purple-500 to-pink-600",
      duration: 2500
    },
    {
      icon: Target,
      title: "Crafting Recommendations",
      subtitle: "Building targeted wellness strategies for you",
      color: "from-green-500 to-emerald-600",
      duration: 2000
    },
    {
      icon: Heart,
      title: "Personalizing Experience",
      subtitle: "Tailoring content to your unique situation",
      color: "from-red-500 to-rose-600",
      duration: 1800
    },
    {
      icon: Lightbulb,
      title: "Finalizing Report",
      subtitle: "Compiling your comprehensive mental health analysis",
      color: "from-amber-500 to-orange-600",
      duration: 1500
    }
  ], [])

  const currentStageData = stages[currentStage]
  const CurrentIcon = currentStageData.icon

  useEffect(() => {
    const text = currentStageData.title
    let index = 0
    setAnimatedText('')
    
    const typewriter = setInterval(() => {
      if (index < text.length) {
        setAnimatedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(typewriter)
      }
    }, 50)

    return () => clearInterval(typewriter)
  }, [currentStageData.title])

  useEffect(() => {
    const totalDuration = stages.reduce((sum, stage) => sum + stage.duration, 0)
    let elapsed = 0

    const progressInterval = setInterval(() => {
      elapsed += 50
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100)
      setProgress(newProgress)
    }, 50)

    const stageInterval = setInterval(() => {
      setCurrentStage(prev => {
        if (prev < stages.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, currentStageData.duration)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stageInterval)
    }
  }, [currentStage, currentStageData.duration, stages])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="relative overflow-hidden bg-background/80 backdrop-blur-sm border border-border/60 shadow-2xl">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>
            {/* Futuristic Scan Line */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent animate-pulse"></div>
              <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-bounce"></div>
            </div>
          </div>

          <CardContent className="relative p-12 text-center">
            {/* Main Icon with Animated Ring */}
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full animate-ping opacity-20">
                <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${currentStageData.color}`}></div>
              </div>
              <div className="absolute inset-0 rounded-full animate-pulse opacity-40">
                <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${currentStageData.color}`}></div>
              </div>
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full opacity-60">
                <div className={`w-28 h-28 mx-auto rounded-full bg-gradient-to-r ${currentStageData.color} blur-md animate-pulse`}></div>
              </div>
              <div className={`relative w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${currentStageData.color} flex items-center justify-center shadow-2xl`}>
                <CurrentIcon className="h-12 w-12 text-white animate-bounce" />
              </div>
            </div>

            {/* Animated Title */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-3 min-h-[2.5rem]">
                {animatedText}
                <span className="animate-pulse text-primary">|</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                {currentStageData.subtitle}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Processing Stage {currentStage + 1} of {stages.length}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full h-3 bg-muted/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${currentStageData.color} rounded-full transition-all duration-300 ease-out relative`}
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Stage Indicators */}
            <div className="flex justify-center gap-3 mb-8">
              {stages.map((stage, index) => {
                const StageIcon = stage.icon
                return (
                  <div
                    key={index}
                    className={`p-3 rounded-full border-2 transition-all duration-500 ${
                      index <= currentStage
                        ? `bg-gradient-to-r ${stage.color} border-transparent text-white shadow-lg`
                        : 'border-border/40 text-muted-foreground bg-muted/20'
                    }`}
                  >
                    <StageIcon className="h-5 w-5" />
                  </div>
                )
              })}
            </div>

            {/* Futuristic Details */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/30 border border-border/60 rounded-full">
                <Zap className="h-4 w-4 text-amber-500 animate-pulse" />
                <span className="text-sm font-medium text-foreground">
                  Powered by Powerful AI Models
                </span>
              </div>
            </div>

            {/* Floating Particles Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-1 h-1 rounded-full animate-ping ${
                    i % 4 === 0 ? 'bg-blue-400/40' :
                    i % 4 === 1 ? 'bg-purple-400/40' :
                    i % 4 === 2 ? 'bg-green-400/40' : 'bg-pink-400/40'
                  }`}
                  style={{
                    left: `${15 + (i * 12)}%`,
                    top: `${25 + (i % 4) * 15}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${2 + (i % 3)}s`
                  }}
                />
              ))}
              
              {/* Floating Sparkles */}
              {[...Array(4)].map((_, i) => (
                <Sparkles
                  key={`sparkle-${i}`}
                  className="absolute w-3 h-3 text-amber-400/30 animate-pulse"
                  style={{
                    left: `${25 + (i * 20)}%`,
                    top: `${20 + (i % 2) * 40}%`,
                    animationDelay: `${i * 0.8}s`,
                    animationDuration: '3s'
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/20 border border-border/40 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground font-medium">
              🧠 Advanced AI analyzing your mental health patterns • Estimated completion: {Math.max(0, 12 - Math.floor(progress * 0.12))}s
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
