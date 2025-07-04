import { Brain, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'brain' | 'dots' | 'pulse'
  text?: string
  className?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default', 
  text,
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  if (variant === 'brain') {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 rounded-2xl blur-xl opacity-30 animate-pulse-gentle" />
          <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-3 animate-float">
            <Brain className={cn(sizeClasses[size], 'text-white')} />
          </div>
        </div>
        {text && (
          <p className={cn(textSizeClasses[size], 'text-muted-foreground font-medium animate-pulse')}>
            {text}
          </p>
        )}
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                'rounded-full bg-gradient-to-r from-emerald-500 to-teal-600',
                size === 'sm' ? 'w-2 h-2' : 
                size === 'md' ? 'w-3 h-3' : 
                size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'
              )}
              style={{
                animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite`
              }}
            />
          ))}
        </div>
        {text && (
          <p className={cn(textSizeClasses[size], 'text-muted-foreground font-medium')}>
            {text}
          </p>
        )}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
        <div className="relative">
          <div className={cn(
            'rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 animate-pulse',
            sizeClasses[size]
          )} />
          <div className={cn(
            'absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 animate-ping opacity-30',
            sizeClasses[size]
          )} />
        </div>
        {text && (
          <p className={cn(textSizeClasses[size], 'text-muted-foreground font-medium')}>
            {text}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <Loader2 className={cn(
        sizeClasses[size], 
        'animate-spin text-primary'
      )} />
      {text && (
        <p className={cn(textSizeClasses[size], 'text-muted-foreground font-medium')}>
          {text}
        </p>
      )}
    </div>
  )
}

// Processing state component for forms and assessments
interface ProcessingStateProps {
  isLoading: boolean
  loadingText?: string
  children: React.ReactNode
  className?: string
}

export function ProcessingState({ 
  isLoading, 
  loadingText = "Processing...", 
  children, 
  className 
}: ProcessingStateProps) {
  if (isLoading) {
    return (
      <div className={cn(
        'flex items-center justify-center min-h-[200px] bg-gradient-to-br from-background via-muted/20 to-background rounded-2xl border',
        className
      )}>
        <LoadingSpinner variant="brain" size="lg" text={loadingText} />
      </div>
    )
  }

  return <>{children}</>
}

// Skeleton loader for cards and content
export function SkeletonLoader({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse', className)}>
      <div className="bg-muted rounded-lg h-4 w-3/4 mb-3" />
      <div className="bg-muted rounded-lg h-4 w-1/2 mb-3" />
      <div className="bg-muted rounded-lg h-4 w-5/6" />
    </div>
  )
}

// Full page loader
export function PageLoader({ text = "Loading MindScreen AI..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-background/90 backdrop-blur border rounded-3xl p-8 shadow-2xl">
        <LoadingSpinner variant="brain" size="xl" text={text} />
      </div>
    </div>
  )
}
