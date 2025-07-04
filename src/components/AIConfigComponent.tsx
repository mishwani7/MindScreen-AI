import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { aiService } from '@/services/aiService'
import { CheckCircle, AlertTriangle, Settings, Eye, EyeOff } from 'lucide-react'

export default function AIConfigComponent() {
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [isConfigured, setIsConfigured] = useState(aiService.isConfigured())
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      aiService.updateConfig({ apiKey: apiKey.trim() })
      setIsConfigured(true)
      setTestStatus('idle')
      setApiKey('')
    }
  }

  const handleTestConnection = async () => {
    setTestStatus('testing')
    try {
      // Simple test request
      const testRequest = {
        assessmentType: 'PHQ-9 Test',
        totalScore: 5,
        severity: 'Mild',
        responses: [
          {
            questionId: 'test',
            question: 'Test question',
            value: 1,
            selectedOption: 'Several days'
          }
        ]
      }
      
      await aiService.analyzeAssessmentResults(testRequest)
      setTestStatus('success')
    } catch {
      setTestStatus('error')
    }
  }

  const getStatusIcon = () => {
    switch (testStatus) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Settings className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusText = () => {
    switch (testStatus) {
      case 'testing':
        return 'Testing connection...'
      case 'success':
        return 'AI connection successful!'
      case 'error':
        return 'Connection failed. Check your API key.'
      default:
        return isConfigured ? 'AI configured and ready' : 'AI not configured'
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <CardTitle>AI Configuration</CardTitle>
        </div>
        <CardDescription>
          Configure GitHub Models API for AI-powered insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Status: {getStatusText()}
        </div>

        {!isConfigured && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">GitHub Models API Key</label>
              <div className="flex space-x-2 mt-1">
                <div className="relative flex-1">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your GitHub Models API key"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Button onClick={handleSaveKey} disabled={!apiKey.trim()}>
                  Save
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Get your API key from{' '}
              <a 
                href="https://github.com/marketplace/models" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub Models
              </a>
            </div>
          </div>
        )}

        {isConfigured && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">AI is configured and ready to use</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  aiService.updateConfig({ apiKey: '' })
                  setIsConfigured(false)
                  setTestStatus('idle')
                }}
              >
                Reset
              </Button>
            </div>

            <Button 
              onClick={handleTestConnection}
              disabled={testStatus === 'testing'}
              className="w-full"
            >
              {testStatus === 'testing' ? 'Testing...' : 'Test AI Connection'}
            </Button>
          </div>
        )}

        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="text-sm font-medium mb-2">AI Features Include:</div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Personalized result interpretation</li>
            <li>• Custom recommendations based on responses</li>
            <li>• Risk factor identification</li>
            <li>• Professional referral guidance</li>
            <li>• Curated support resources</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
