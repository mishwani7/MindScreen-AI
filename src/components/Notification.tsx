import { useState } from 'react'
import { AlertCircle, CheckCircle, X } from 'lucide-react'

interface NotificationProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
}

export function Notification({ message, type, onClose }: NotificationProps) {
  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />
      default: return <AlertCircle className="h-5 w-5 text-blue-500" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800'
      case 'error': return 'bg-red-50 border-red-200 text-red-800'
      default: return 'bg-blue-50 border-blue-200 text-blue-800'
    }
  }

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border shadow-lg max-w-md ${getStyles()}`}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button onClick={onClose} className="ml-2">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

interface UseNotificationReturn {
  showNotification: (message: string, type: 'success' | 'error' | 'info') => void
  notification: { message: string; type: 'success' | 'error' | 'info' } | null
  clearNotification: () => void
}

export function useNotification(): UseNotificationReturn {
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000) // Auto dismiss after 5 seconds
  }

  const clearNotification = () => {
    setNotification(null)
  }

  return { showNotification, notification, clearNotification }
}
