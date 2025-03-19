import Chat from './components/Chat'
import PDFUpload from './components/PDFUpload'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0a0a0a] text-white">
      <div className="flex items-center p-4 border-b border-gray-800">
        <button className="p-2 hover:bg-gray-800 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
          </svg>
        </button>
        <select className="ml-4 bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700">
          <option>Small model</option>
          <option>Medium model</option>
          <option>Large model</option>
        </select>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
          <div className="p-4 rounded-lg border border-gray-800 hover:bg-gray-900 cursor-pointer">
            <h3 className="font-semibold mb-2">What are the advantages</h3>
            <p className="text-gray-400">of using Next.js?</p>
          </div>
          <div className="p-4 rounded-lg border border-gray-800 hover:bg-gray-900 cursor-pointer">
            <h3 className="font-semibold mb-2">Write code to</h3>
            <p className="text-gray-400">demonstrate dijkstra's algorithm</p>
          </div>
          <div className="p-4 rounded-lg border border-gray-800 hover:bg-gray-900 cursor-pointer">
            <h3 className="font-semibold mb-2">Help me write an essay</h3>
            <p className="text-gray-400">about silicon valley</p>
          </div>
          <div className="p-4 rounded-lg border border-gray-800 hover:bg-gray-900 cursor-pointer">
            <h3 className="font-semibold mb-2">What is the weather</h3>
            <p className="text-gray-400">in San Francisco?</p>
          </div>
        </div>
        <Chat />
      </div>
    </main>
  )
}
