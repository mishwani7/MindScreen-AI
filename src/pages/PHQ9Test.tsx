import { PHQ9_QUESTIONS } from '@/data/phq9'

export default function PHQ9Test() {
  console.log('PHQ9_QUESTIONS:', PHQ9_QUESTIONS)
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">PHQ9 Test Debug</h1>
      <p>Number of questions: {PHQ9_QUESTIONS.length}</p>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Questions:</h2>
        {PHQ9_QUESTIONS.map((question, index) => (
          <div key={question.id} className="mt-2 p-2 border rounded">
            <p><strong>Q{index + 1}:</strong> {question.question}</p>
            <p><em>Options: {question.options.length}</em></p>
          </div>
        ))}
      </div>
    </div>
  )
}
