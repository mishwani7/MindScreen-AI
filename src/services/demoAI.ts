// Demo AI responses for testing without API key
import type { AIAnalysisResponse } from './aiService'

export const getDemoAIResponse = (severity: string, totalScore: number): AIAnalysisResponse => {
  const responses: Record<string, AIAnalysisResponse> = {
    'Minimal': {
      interpretation: "Your PHQ-9 responses suggest minimal depression symptoms, which is encouraging! Your score of " + totalScore + " falls within the normal range, indicating that you're currently experiencing few depressive symptoms that might interfere with your daily life. This suggests good emotional resilience and effective coping strategies.",
      personalizedRecommendations: [
        "Continue maintaining your current healthy habits and coping strategies",
        "Keep up regular physical activity, which is excellent for mental well-being",
        "Maintain strong social connections and don't hesitate to reach out when needed",
        "Practice mindfulness or relaxation techniques to build stress resilience",
        "Consider this assessment as a baseline for future mental health monitoring"
      ],
      riskFactors: [
        "Life stressors could potentially impact mood in the future",
        "Changes in sleep, work, or relationships could affect mental health"
      ],
      positiveFactors: [
        "Taking proactive steps to monitor mental health",
        "Low current symptom burden indicates good emotional regulation",
        "Likely has effective coping mechanisms in place",
        "Good awareness of mental health importance"
      ],
      nextSteps: [
        "Continue with your current lifestyle and coping strategies",
        "Stay aware of any changes in mood or energy levels",
        "Consider retaking this assessment if life circumstances change",
        "Share these positive results with healthcare providers during routine visits"
      ],
      professionalReferral: false,
      urgencyLevel: 'low',
      supportResources: [
        {
          type: 'Wellness',
          resource: 'Mental Health America - Wellness Resources',
          description: 'Tips and tools for maintaining good mental health'
        },
        {
          type: 'Prevention',
          resource: 'CDC Mental Health Resources',
          description: 'Evidence-based strategies for mental wellness'
        }
      ],
      followUpSuggestions: [
        "Retake this screening in 3-6 months as part of routine self-care",
        "Keep a mood journal to identify patterns and triggers",
        "Continue building your toolkit of healthy coping strategies"
      ]
    },
    'Mild': {
      interpretation: "Your responses indicate mild depression symptoms with a score of " + totalScore + ". While these symptoms may not be severely impairing your daily functioning, they represent an important signal to pay attention to your mental health. Early recognition and proactive steps can prevent symptom progression and improve your overall well-being.",
      personalizedRecommendations: [
        "Establish a consistent daily routine that includes enjoyable activities",
        "Prioritize regular exercise - even 20-30 minutes of walking can be beneficial",
        "Focus on sleep hygiene: aim for 7-9 hours of quality sleep nightly",
        "Practice stress-reduction techniques like deep breathing or meditation",
        "Stay connected with supportive friends and family members",
        "Consider speaking with a counselor or therapist for additional coping strategies"
      ],
      riskFactors: [
        "Mild symptoms could progress without proper attention and care",
        "Stress from work, relationships, or life changes may worsen symptoms",
        "Social isolation or reduced activity levels could increase depression risk"
      ],
      positiveFactors: [
        "Early recognition of symptoms allows for proactive intervention",
        "Mild severity suggests good potential for improvement with lifestyle changes",
        "Taking this assessment shows good self-awareness and health consciousness",
        "Many effective treatment options available at this stage"
      ],
      nextSteps: [
        "Monitor your symptoms over the next 2-4 weeks",
        "Implement healthy lifestyle changes consistently",
        "Consider speaking with your primary care provider about your results",
        "Keep track of factors that seem to improve or worsen your mood"
      ],
      professionalReferral: false,
      urgencyLevel: 'low',
      supportResources: [
        {
          type: 'Self-Help',
          resource: 'National Institute of Mental Health - Depression Basics',
          description: 'Comprehensive information about depression and self-care strategies'
        },
        {
          type: 'Online Support',
          resource: 'Depression and Bipolar Support Alliance',
          description: 'Peer support and educational resources'
        }
      ],
      followUpSuggestions: [
        "Retake this assessment in 2-3 weeks to monitor progress",
        "Consider additional screenings if recommended by healthcare providers",
        "Keep a mood and activity diary to identify helpful patterns"
      ]
    },
    'Moderate': {
      interpretation: "Your PHQ-9 score of " + totalScore + " indicates moderate depression symptoms that are likely impacting multiple areas of your life. This level of symptoms often affects work performance, relationships, and daily activities. The good news is that moderate depression responds well to treatment, and there are many effective options available to help you feel better.",
      personalizedRecommendations: [
        "Schedule an appointment with a healthcare provider or mental health professional within the next 1-2 weeks",
        "Consider evidence-based treatments like cognitive-behavioral therapy (CBT) or interpersonal therapy",
        "Discuss the benefits and risks of antidepressant medication with a qualified provider",
        "Maintain basic self-care: regular meals, adequate sleep, and gentle physical activity",
        "Inform trusted friends or family members about your situation for additional support",
        "Consider joining a depression support group in your community or online"
      ],
      riskFactors: [
        "Moderate symptoms can significantly impact work and relationship functioning",
        "Risk of progression to more severe depression without appropriate treatment",
        "Increased vulnerability to stress and life challenges",
        "Potential for social withdrawal and isolation"
      ],
      positiveFactors: [
        "Recognition of symptoms is the first important step toward recovery",
        "Moderate depression has many proven, effective treatment options",
        "Many people with similar scores achieve significant improvement with treatment",
        "Taking this assessment demonstrates commitment to your mental health"
      ],
      nextSteps: [
        "Contact your healthcare provider to discuss these results",
        "Research mental health professionals in your area who specialize in depression",
        "Create a support plan with trusted friends or family members",
        "Begin implementing basic wellness strategies while seeking professional help"
      ],
      professionalReferral: true,
      urgencyLevel: 'medium',
      supportResources: [
        {
          type: 'Treatment Locator',
          resource: 'Psychology Today Provider Directory',
          description: 'Find licensed mental health professionals in your area'
        },
        {
          type: 'Crisis Support',
          resource: '988 Suicide & Crisis Lifeline',
          description: '24/7 free and confidential support (call or text 988)'
        },
        {
          type: 'Information',
          resource: 'National Alliance on Mental Illness (NAMI)',
          description: 'Educational resources and local support groups'
        }
      ],
      followUpSuggestions: [
        "Retake this assessment weekly to monitor treatment progress",
        "Keep detailed notes about mood changes and treatment effects",
        "Share these results with any healthcare providers you consult"
      ]
    },
    'Moderately Severe': {
      interpretation: "Your PHQ-9 score of " + totalScore + " indicates moderately severe depression symptoms that are significantly impacting your daily life. This level of depression typically interferes substantially with work, relationships, and basic daily activities. Professional treatment is strongly recommended, as depression at this level rarely improves on its own and responds well to appropriate care.",
      personalizedRecommendations: [
        "Schedule an appointment with a mental health professional or your primary care provider within the next few days",
        "Consider more intensive treatment options such as therapy combined with medication",
        "Explore whether intensive outpatient programs might be beneficial",
        "Establish a strong support network and inform trusted people about your situation",
        "Focus on basic safety and self-care while seeking professional help",
        "Avoid making major life decisions until symptoms improve with treatment"
      ],
      riskFactors: [
        "Significant impairment in work, social, and personal functioning",
        "High risk of symptom progression without appropriate treatment",
        "Increased vulnerability to suicidal thoughts or behaviors",
        "Risk of social isolation and withdrawal from support systems"
      ],
      positiveFactors: [
        "Recognition and assessment of symptoms is a crucial first step",
        "Depression at this level typically responds very well to professional treatment",
        "Many evidence-based treatments are available and effective",
        "Recovery is definitely possible with appropriate care and support"
      ],
      nextSteps: [
        "Contact a mental health professional immediately - don't delay",
        "Reach out to trusted friends or family members for support",
        "Create a safety plan and know who to contact if thoughts of self-harm occur",
        "Follow up with treatment recommendations consistently"
      ],
      professionalReferral: true,
      urgencyLevel: 'high',
      supportResources: [
        {
          type: 'Immediate Support',
          resource: '988 Suicide & Crisis Lifeline',
          description: 'Call or text 988 for immediate, confidential support 24/7'
        },
        {
          type: 'Emergency',
          resource: 'Crisis Text Line',
          description: 'Text HOME to 741741 for immediate crisis support'
        },
        {
          type: 'Treatment',
          resource: 'SAMHSA Treatment Locator',
          description: 'Find mental health treatment facilities in your area'
        }
      ],
      followUpSuggestions: [
        "Monitor symptoms closely and follow up with treatment providers regularly",
        "Retake this assessment weekly to track treatment progress",
        "Keep detailed records of mood changes and treatment responses"
      ]
    },
    'Severe': {
      interpretation: "Your PHQ-9 score of " + totalScore + " indicates severe depression symptoms that are significantly impairing your ability to function in daily life. This level of depression requires immediate professional attention. Please know that severe depression is highly treatable, and with appropriate care, most people experience substantial improvement. Your safety and well-being are the top priority right now.",
      personalizedRecommendations: [
        "Contact a mental health professional or your primary care provider today",
        "Consider calling 988 (Suicide & Crisis Lifeline) if you're having thoughts of self-harm",
        "Reach out to trusted friends or family members immediately - don't isolate yourself",
        "Consider whether you need someone to stay with you or check on you regularly",
        "Follow all treatment recommendations from healthcare providers",
        "Consider intensive treatment options such as intensive outpatient or partial hospitalization programs"
      ],
      riskFactors: [
        "Severe functional impairment across multiple life domains",
        "High risk of suicidal thoughts or behaviors",
        "Significant risk if symptoms remain untreated",
        "Potential for complete social and occupational withdrawal"
      ],
      positiveFactors: [
        "Taking this assessment shows important self-awareness and help-seeking behavior",
        "Severe depression responds very well to appropriate professional treatment",
        "Many people with similar scores achieve full recovery with proper care",
        "Multiple effective treatment options are available"
      ],
      nextSteps: [
        "Seek immediate professional help - contact a mental health provider today",
        "Create a safety plan and identify people you can contact for support",
        "If you're having thoughts of self-harm, go to an emergency room or call 988",
        "Follow up with all treatment recommendations without delay"
      ],
      professionalReferral: true,
      urgencyLevel: 'critical',
      supportResources: [
        {
          type: 'Crisis',
          resource: '988 Suicide & Crisis Lifeline',
          description: 'Call or text 988 immediately for crisis support - available 24/7'
        },
        {
          type: 'Emergency',
          resource: 'Emergency Services',
          description: 'Call 911 or go to your nearest emergency room if in immediate danger'
        },
        {
          type: 'Crisis Chat',
          resource: 'Crisis Text Line',
          description: 'Text HOME to 741741 for immediate crisis counseling'
        }
      ],
      followUpSuggestions: [
        "Follow up with treatment providers within 24-48 hours",
        "Have someone trusted check on you regularly",
        "Retake this assessment as directed by your healthcare provider"
      ]
    }
  }

  return responses[severity] || responses['Moderate']
}

export const isDemoMode = (apiKey?: string): boolean => {
  // Force demo mode for testing (temporary)
  if (import.meta.env.VITE_FORCE_DEMO_MODE === 'true') {
    console.log('💡 Demo mode FORCED by VITE_FORCE_DEMO_MODE=true')
    return true
  }
  
  // Check if API key is provided as parameter (runtime configuration)
  if (apiKey && apiKey.trim() !== '' && apiKey !== 'your_github_models_api_key_here') {
    return false
  }
  
  // Check environment variables
  const envToken = import.meta.env.VITE_GITHUB_TOKEN
  const envApiKey = import.meta.env.VITE_GITHUB_MODELS_API_KEY
  
  if ((envToken && envToken.trim() !== '' && envToken !== 'your_github_models_api_key_here') ||
      (envApiKey && envApiKey.trim() !== '' && envApiKey !== 'your_github_models_api_key_here')) {
    return false
  }
  
  console.log('⚠️ Demo mode - no valid API keys found')
  return true
}
