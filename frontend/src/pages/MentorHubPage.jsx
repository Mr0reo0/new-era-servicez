import React, { useState, useEffect, useRef } from 'react'
import { useBlueprint } from '../contexts/BlueprintContext'
import { aiAPI } from '../lib/api'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { MessageSquare, Send, Sparkles, User, Bot } from 'lucide-react'
import { toast } from 'sonner'

const MentorHubPage = () => {
  const { blueprint } = useBlueprint()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    loadChatHistory()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadChatHistory = async () => {
    try {
      const response = await aiAPI.getChatHistory()
      setMessages(response.data.messages || [])
    } catch (error) {
      console.error('Failed to load chat history:', error)
    } finally {
      setLoadingHistory(false)
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    
    // Add user message to UI
    const newUserMsg = {
      role: 'user',
      content: userMessage,
      created_at: new Date().toISOString()
    }
    setMessages(prev => [...prev, newUserMsg])

    setLoading(true)
    try {
      // Create context from blueprint
      const context = blueprint ? `Company: ${blueprint.company_name || 'Unnamed'}, Progress: ${
        blueprint.layers?.map(l => `${l.layer_name}: ${l.progress_percent}%`).join(', ')
      }` : ''

      const response = await aiAPI.mentorChat(userMessage, context)
      
      // Add assistant response
      const assistantMsg = {
        role: 'assistant',
        content: response.data.response,
        created_at: new Date().toISOString()
      }
      setMessages(prev => [...prev, assistantMsg])
    } catch (error) {
      console.error('Chat error:', error)
      toast.error('Failed to get response. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (loadingHistory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-porcelain">
        <div className="text-center">
          <div className="spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-graphite font-body">Loading mentor hub...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-porcelain py-12">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet to-cyan rounded-full mb-6">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-onyx mb-4">
            AI Mentor Hub
          </h1>
          <p className="text-xl text-graphite font-body max-w-2xl mx-auto">
            Get expert guidance on strategy, product, growth, and execution. 
            Your AI mentor knows your blueprint and provides context-aware advice.
          </p>
        </div>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b border-graphite/10">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan" />
              Chat with Your Mentor
            </CardTitle>
            <CardDescription>
              Ask anything about your startup, strategy, or execution
            </CardDescription>
          </CardHeader>
          
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-md">
                  <Bot className="w-16 h-16 text-graphite/30 mx-auto mb-4" />
                  <h3 className="font-display font-semibold text-xl text-onyx mb-2">
                    Start a Conversation
                  </h3>
                  <p className="text-graphite font-body mb-6">
                    Ask me anything about your startup, from strategy to execution
                  </p>
                  <div className="space-y-2 text-left">
                    <button
                      onClick={() => setInput("How should I position my startup in the market?")}
                      className="w-full p-3 text-sm text-left bg-porcelain hover:bg-graphite/5 rounded-sm transition-colors font-body text-graphite"
                    >
                      💡 How should I position my startup in the market?
                    </button>
                    <button
                      onClick={() => setInput("What's the best pricing strategy for a B2B SaaS?")}
                      className="w-full p-3 text-sm text-left bg-porcelain hover:bg-graphite/5 rounded-sm transition-colors font-body text-graphite"
                    >
                      💰 What's the best pricing strategy for a B2B SaaS?
                    </button>
                    <button
                      onClick={() => setInput("How do I build a growth engine for my startup?")}
                      className="w-full p-3 text-sm text-left bg-porcelain hover:bg-graphite/5 rounded-sm transition-colors font-body text-graphite"
                    >
                      📈 How do I build a growth engine for my startup?
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-violet to-cyan rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-onyx text-white'
                          : 'bg-porcelain text-onyx'
                      }`}
                    >
                      <p className="font-body text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-graphite rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-violet to-cyan rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-porcelain p-4 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-graphite rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-graphite rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-graphite rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </CardContent>

          {/* Input */}
          <div className="border-t border-graphite/10 p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your mentor anything..."
                disabled={loading}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                variant="gradient"
                size="lg"
                className="gap-2"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default MentorHubPage
