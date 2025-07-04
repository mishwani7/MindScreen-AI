import { Brain, Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  className?: string
}

export function LoadingSpinner({ size = 'md', text, className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 animate-ping">
          <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-20 h-full w-full" />
        </div>
        <Loader2 className={`${sizeClasses[size]} animate-spin text-emerald-600`} />
      </div>
      {text && (
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  )
}

interface PageLoadingProps {
  text?: string
}

export function PageLoading({ text = 'Loading...' }: PageLoadingProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative mx-auto w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 rounded-2xl blur-lg opacity-30 animate-pulse" />
          <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 animate-bounce">
            <Brain className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground">{text}</p>
          <div className="flex items-center justify-center space-x-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProcessingStateProps {
  stage: string
  progress?: number
  className?: string
}

export function ProcessingState({ stage, progress, className = '' }: ProcessingStateProps) {
  return (
    <div className={`bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 ${className}`}>
      <div className="text-center space-y-4">
        <div className="relative mx-auto w-12 h-12">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl blur-md opacity-40 animate-pulse" />
          <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-3">
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">{stage}</p>
          {progress !== undefined && (
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
