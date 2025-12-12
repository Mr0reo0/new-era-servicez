import React, { useState } from 'react'
import { waitlistAPI } from '../lib/api'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

const WaitlistPage = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email')
      return
    }

    setLoading(true)
    try {
      await waitlistAPI.join(email, name)
      setSuccess(true)
      toast.success('Successfully joined the waitlist!')
    } catch (error) {
      console.error('Waitlist error:', error)
      toast.error('Failed to join waitlist. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-porcelain via-porcelain to-cyan/5 py-12 px-6">
        <div className="absolute inset-0 grid-background opacity-50"></div>
        <div className="relative text-center max-w-2xl">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="font-display font-bold text-4xl md:text-5xl text-onyx mb-4">
            You're on the list! 🎉
          </h1>
          <p className="text-xl text-graphite font-body mb-8">
            We'll notify you when New Era Servicez is ready to boot your startup.
          </p>
          <Button onClick={() => window.location.href = '/'} variant="accent" size="lg">
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-porcelain via-porcelain to-cyan/5 py-12 px-6">
      <div className="absolute inset-0 grid-background opacity-50"></div>
      
      <div className="relative w-full max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-cyan/10 text-cyan font-body text-sm font-medium rounded-full border border-cyan/20">
              Early Access
            </span>
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-onyx mb-6">
            Join the Waitlist
          </h1>
          <p className="text-xl text-graphite font-body max-w-xl mx-auto">
            Be among the first founders to boot their startup with the most advanced 
            operating system for category-defining companies.
          </p>
        </div>

        <Card className="tracing-beam">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan" />
              Get Early Access
            </CardTitle>
            <CardDescription>
              Join thousands of founders building the future
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-body font-medium text-onyx mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@startup.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-onyx mb-2">
                  Name (Optional)
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                variant="gradient"
                size="lg"
                className="w-full"
              >
                {loading ? 'Joining...' : 'Join Waitlist'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-display font-bold text-onyx mb-2">6</div>
            <p className="text-sm text-graphite font-body">Layers to Boot</p>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-onyx mb-2">AI</div>
            <p className="text-sm text-graphite font-body">Powered Generation</p>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-onyx mb-2">∞</div>
            <p className="text-sm text-graphite font-body">Possibilities</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitlistPage
