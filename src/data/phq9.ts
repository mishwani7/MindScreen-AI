// PHQ-9 Depression Screening Tool Data
export interface PHQ9Question {
  id: string
  question: string
  options: PHQ9Option[]
}

export interface PHQ9Option {
  value: number
  label: string
  description: string
}

export interface PHQ9Response {
  questionId: string
  value: number
}

export interface PHQ9Result {
  totalScore: number
  severity: 'Minimal' | 'Mild' | 'Moderate' | 'Moderately Severe' | 'Severe'
  interpretation: string
  recommendations: string[]
  riskLevel: 'Low' | 'Medium' | 'High' | 'Very High'
}

export const PHQ9_OPTIONS: PHQ9Option[] = [
  { value: 0, label: 'Not at all', description: 'Never or almost never' },
  { value: 1, label: 'Several days', description: 'A few days in the past 2 weeks' },
  { value: 2, label: 'More than half the days', description: 'More than 7 days in the past 2 weeks' },
  { value: 3, label: 'Nearly every day', description: 'Almost daily in the past 2 weeks' }
]

export const PHQ9_QUESTIONS: PHQ9Question[] = [
  {
    id: 'phq9_1',
    question: 'Little interest or pleasure in doing things',
    options: PHQ9_OPTIONS
  },
  {
    id: 'phq9_2', 
    question: 'Feeling down, depressed, or hopeless',
    options: PHQ9_OPTIONS
  },
  {
    id: 'phq9_3',
    question: 'Trouble falling or staying asleep, or sleeping too much',
    options: PHQ9_OPTIONS
  },
  {
    id: 'phq9_4',
    question: 'Feeling tired or having little energy',
    options: PHQ9_OPTIONS
  },
  {
    id: 'phq9_5',
    question: 'Poor appetite or overeating',
    options: PHQ9_OPTIONS
  },
  {
    id: 'phq9_6',
    question: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
    options: PHQ9_OPTIONS
  },
  {
    id: 'phq9_7',
    question: 'Trouble concentrating on things, such as reading the newspaper or watching television',
    options: PHQ9_OPTIONS
  },
  {
    id: 'phq9_8',
    question: 'Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
    options: PHQ9_OPTIONS
  },
  {
    id: 'phq9_9',
    question: 'Thoughts that you would be better off dead, or of hurting yourself',
    options: PHQ9_OPTIONS
  }
]

export function calculatePHQ9Score(responses: PHQ9Response[]): PHQ9Result {
  const totalScore = responses.reduce((sum, response) => sum + response.value, 0)
  
  let severity: PHQ9Result['severity']
  let riskLevel: PHQ9Result['riskLevel']
  let interpretation: string
  let recommendations: string[]

  // Determine severity based on total score
  if (totalScore <= 4) {
    severity = 'Minimal'
    riskLevel = 'Low'
    interpretation = 'Your responses suggest minimal depression symptoms. This is within the normal range.'
    recommendations = [
      'Continue maintaining good mental health habits',
      'Stay physically active and maintain social connections',
      'Practice stress management techniques',
      'Monitor your mood and seek help if symptoms worsen'
    ]
  } else if (totalScore <= 9) {
    severity = 'Mild'
    riskLevel = 'Low'
    interpretation = 'Your responses suggest mild depression symptoms. While not severe, these symptoms may be affecting your daily life.'
    recommendations = [
      'Consider lifestyle changes like regular exercise and good sleep hygiene',
      'Practice relaxation techniques and stress management',
      'Maintain social connections and engage in enjoyable activities',
      'Consider speaking with a healthcare provider if symptoms persist',
      'Monitor your symptoms and take the assessment again in 2 weeks'
    ]
  } else if (totalScore <= 14) {
    severity = 'Moderate'
    riskLevel = 'Medium'
    interpretation = 'Your responses suggest moderate depression symptoms. These symptoms are likely impacting your daily functioning.'
    recommendations = [
      'Strongly consider consulting with a healthcare provider or mental health professional',
      'Discuss treatment options such as therapy or counseling',
      'Maintain regular sleep, exercise, and nutrition routines',
      'Reach out to trusted friends, family, or support groups',
      'Consider taking time off from stressful activities if possible'
    ]
  } else if (totalScore <= 19) {
    severity = 'Moderately Severe'
    riskLevel = 'High'
    interpretation = 'Your responses suggest moderately severe depression symptoms. Professional treatment is recommended.'
    recommendations = [
      'Schedule an appointment with a healthcare provider or mental health professional soon',
      'Discuss treatment options including therapy and possibly medication',
      'Inform trusted family members or friends about your symptoms',
      'Avoid making major life decisions while experiencing these symptoms',
      'Create a safety plan and know who to contact in crisis situations'
    ]
  } else {
    severity = 'Severe'
    riskLevel = 'Very High'
    interpretation = 'Your responses suggest severe depression symptoms. Immediate professional attention is strongly recommended.'
    recommendations = [
      'Contact a healthcare provider or mental health professional immediately',
      'Consider calling a crisis helpline or going to an emergency room if you have thoughts of self-harm',
      'Do not isolate yourself - stay connected with supportive people',
      'Follow up with professional treatment as soon as possible',
      'Consider intensive treatment options such as intensive outpatient programs'
    ]
  }

  // Check for suicidal ideation (question 9)
  const suicidalResponse = responses.find(r => r.questionId === 'phq9_9')
  if (suicidalResponse && suicidalResponse.value > 0) {
    riskLevel = 'Very High'
    recommendations.unshift(
      '⚠️ IMPORTANT: You indicated thoughts of self-harm. Please seek immediate help.',
      'Call 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room',
      'Talk to a trusted person immediately'
    )
  }

  return {
    totalScore,
    severity,
    interpretation,
    recommendations,
    riskLevel
  }
}
