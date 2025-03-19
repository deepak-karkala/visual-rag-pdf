import { Message } from '../lib/api'

type Props = {
  messages: Message[]
}

export default function MessageList({ messages }: Props) {
  return (
    <div className="space-y-4 px-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'assistant' ? 'bg-gray-900' : ''} p-4 rounded-lg`}
        >
          <div className="flex-shrink-0 mr-4">
            {message.role === 'assistant' ? (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="font-medium mb-1">{message.role === 'assistant' ? 'Assistant' : 'You'}</div>
            <div className="text-gray-300 whitespace-pre-wrap">{message.content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
