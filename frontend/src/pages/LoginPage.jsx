import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { Chrome, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

const LoginPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    // Handle OAuth callback
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      handleOAuthCallback(sessionId)
    }
  }, [searchParams])

  const handleOAuthCallback = async (sessionId) => {
    try {
      setLoading(true)
      await login(sessionId)
      toast.success('Successfully logged in!')
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Redirect to Emergent OAuth
    const redirectUri = `${window.location.origin}/login`
    const oauthUrl = `https://demobackend.emergentagent.com/auth/v1/env/oauth/google?redirect_uri=${encodeURIComponent(redirectUri)}`
    window.location.href = oauthUrl
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-porcelain">
        <div className="text-center">
          <div className="spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-graphite font-body">Logging you in...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-porcelain via-porcelain to-cyan/5 py-12 px-6">
      <div className="absolute inset-0 grid-background opacity-50"></div>
      
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan to-violet rounded-sm flex items-center justify-center">
              <span className="text-white font-display font-bold text-2xl">N</span>
            </div>
            <span className="font-display font-bold text-2xl text-onyx">
              New Era Servicez
            </span>
          </div>
          <h1 className="font-display font-bold text-4xl text-onyx mb-3">
            Welcome Back
          </h1>
          <p className="text-graphite font-body text-lg">
            Sign in to continue building your startup OS
          </p>
        </div>

        <Card className="tracing-beam">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Use your Google account to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleGoogleLogin}
              variant="default"
              size="lg"
              className="w-full gap-3"
              disabled={loading}
            >
              <Chrome className="w-5 h-5" />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-graphite/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-graphite font-body">
                  New to New Era Servicez?
                </span>
              </div>
            </div>

            <Button
              onClick={() => navigate('/waitlist')}
              variant="outline"
              size="lg"
              className="w-full gap-2"
            >
              Join Waitlist
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-graphite font-body mt-6">
          By signing in, you agree to our{' '}
          <a href="/legal" className="text-cyan hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/legal" className="text-cyan hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
