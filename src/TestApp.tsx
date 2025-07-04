import './index.css'

function TestApp() {
  return (
    <div className="min-h-screen bg-blue-500 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Tailwind Test</h1>
      <p className="text-xl mb-4">If this is blue background with white text, Tailwind is working!</p>
      <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
        Test Button
      </button>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-red-500 p-4 rounded">Red Box</div>
        <div className="bg-yellow-500 p-4 rounded">Yellow Box</div>
        <div className="bg-purple-500 p-4 rounded">Purple Box</div>
      </div>
    </div>
  )
}

export default TestApp
