// Debug Environment Variables Component
import React from 'react'

const EnvDebug: React.FC = () => {
  const envVars = {
    VITE_GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN,
    VITE_GITHUB_MODELS_API_KEY: import.meta.env.VITE_GITHUB_MODELS_API_KEY,
    VITE_GITHUB_BACKUP_KEY: import.meta.env.VITE_GITHUB_BACKUP_KEY,
    VITE_FORCE_DEMO_MODE: import.meta.env.VITE_FORCE_DEMO_MODE
  }

  const testAI = async () => {
    try {
      const { aiService } = await import('../services/aiService')
      
      console.log('🧪 Environment Debug Test:', {
        envVars,
        aiServiceConfigured: aiService.isConfigured(),
        aiServiceRealAPI: aiService.isRealAPIConfigured(),
        modelInfo: aiService.getCurrentModelInfo()
      })
      
      const testRequest = {
        assessmentType: 'PHQ-9 Test',
        totalScore: 10,
        severity: 'Moderate',
        responses: [{
          questionId: 'test',
          question: 'Test question',
          value: 2,
          selectedOption: 'Sometimes'
        }],
        userContext: {
          age: 25,
          gender: 'female',
          country: 'United States',
          city: 'New York'
        }
      }
      
      const result = await aiService.analyzeAssessmentResults(testRequest)
      console.log('🎯 AI Test Result:', result)
      alert(`AI Test: ${result._aiVerification?.isRealAI ? 'Real AI' : 'Demo Mode'} - ${result._aiVerification?.model}`)
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('❌ AI Test Error:', error)
      alert(`Error: ${errorMessage}`)
    }
  }

  return (
    <div className="p-4 bg-gray-100 m-4 rounded">
      <h3 className="font-bold mb-2">Environment Debug</h3>
      <div className="space-y-2 text-sm">
        {Object.entries(envVars).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="font-mono">{key}:</span>
            <span className="font-mono text-xs">
              {value ? `${String(value).substring(0, 20)}...` : 'undefined'}
            </span>
          </div>
        ))}
      </div>
      <button 
        onClick={testAI}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test AI Service
      </button>
    </div>
  )
}

export default EnvDebug
