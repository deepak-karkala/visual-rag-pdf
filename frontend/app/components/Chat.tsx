'use client'

import { useState } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { Message, sendMessage } from '../lib/api'

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSendMessage = async (content: string) => {
    setIsLoading(true)
    setError(null)

    // Add user message
    const userMessage: Message = {
      content,
      role: 'user'
    }
    setMessages(prev => [...prev, userMessage])

    try {
      // Get response from API
      const response = await sendMessage(content)
      
      // Add assistant message
      const assistantMessage: Message = {
        content: response.response,
        role: 'assistant'
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get response')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} />
        {error && (
          <div className="text-red-500 text-center mt-2">
            {error}
          </div>
        )}
      </div>
      <div className="mt-4">
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}
