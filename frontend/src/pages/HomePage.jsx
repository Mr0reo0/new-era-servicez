import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { ArrowRight, Rocket, Building2, Zap, Target, DollarSign, TrendingUp } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  const layers = [
    {
      id: 'identity',
      icon: Target,
      name: 'Identity Layer',
      description: 'Boot worldview, category POV, brand, archetype, messaging.',
      color: 'from-violet to-cyan'
    },
    {
      id: 'product',
      icon: Zap,
      name: 'Product Layer',
      description: 'Boot offers, pricing, 10x feature, signature experience.',
      color: 'from-cyan to-violet'
    },
    {
      id: 'audience',
      icon: TrendingUp,
      name: 'Audience Layer',
      description: 'Boot growth engine, distribution strategy, content systems.',
      color: 'from-violet to-cyan'
    },
    {
      id: 'systems',
      icon: Building2,
      name: 'Systems Layer',
      description: 'Boot automation, CRM, workflows, pipelines.',
      color: 'from-cyan to-violet'
    },
    {
      id: 'financial',
      icon: DollarSign,
      name: 'Financial Layer',
      description: 'Boot financial models, scenarios, revenue engine, pricing system.',
      color: 'from-violet to-cyan'
    },
    {
      id: 'expansion',
      icon: Rocket,
      name: 'Expansion Layer',
      description: 'Boot partnerships, ecosystem, category leadership, scale map.',
      color: 'from-cyan to-violet'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-porcelain via-porcelain to-cyan/5 py-24 md:py-32">
        <div className="absolute inset-0 grid-background opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-cyan/10 text-cyan font-body text-sm font-medium rounded-full border border-cyan/20">
                The Startup Operating System
              </span>
            </div>
            <h1 className="font-display font-bold text-5xl md:text-7xl tracking-tight text-onyx mb-6">
              Boot your startup.<br />
              <span className="gradient-text">Scale your vision.</span>
            </h1>
            <p className="text-xl md:text-2xl text-graphite font-body leading-relaxed mb-12 max-w-3xl mx-auto">
              The OS for category-defining founders. Build a complete company layer by layer, 
              preview everything in real time, and export a fully structured blueprint ready for execution.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" variant="default" className="gap-2 w-full sm:w-auto">
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button size="lg" variant="default" className="gap-2 w-full sm:w-auto">
                      Boot a New Company
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/waitlist">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Join Waitlist
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Two Primary Doors */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="tracing-beam hover:scale-105 transition-transform cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan to-violet rounded-sm flex items-center justify-center mb-4">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">New Company</CardTitle>
                  <CardDescription className="text-base">
                    Start from an idea and boot your way to revenue
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="tracing-beam hover:scale-105 transition-transform cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-violet to-cyan rounded-sm flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Existing Company</CardTitle>
                  <CardDescription className="text-base">
                    Optimize systems, refine brand, and scale your growth engine
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 Layers Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-onyx mb-6">
              The 6 Layers of Your Startup OS
            </h2>
            <p className="text-xl text-graphite font-body max-w-3xl mx-auto">
              Each layer builds on the previous one, creating a complete operating system 
              for your company. Boot them sequentially or jump to what you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {layers.map((layer, index) => {
              const Icon = layer.icon
              return (
                <Card key={layer.id} className="tracing-beam group hover:scale-105 transition-all">
                  <CardHeader>
                    <div className={`w-14 h-14 bg-gradient-to-br ${layer.color} rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-body font-medium text-cyan">Layer {index + 1}</span>
                    </div>
                    <CardTitle className="text-xl">{layer.name}</CardTitle>
                    <CardDescription>{layer.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={isAuthenticated ? `/layers/${layer.id}` : '/login'}>
                      <Button variant="ghost" className="w-full gap-2 group-hover:text-cyan">
                        Preview Boot Sequence
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link to={isAuthenticated ? '/layers' : '/login'}>
              <Button size="lg" variant="accent" className="gap-2">
                Explore All Layers
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-porcelain">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-onyx mb-6">
              How It Works
            </h2>
            <p className="text-xl text-graphite font-body max-w-3xl mx-auto">
              From idea to execution in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan to-violet rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-display font-bold text-2xl">1</span>
              </div>
              <h3 className="font-display font-semibold text-2xl text-onyx mb-4">Boot Your Layers</h3>
              <p className="text-graphite font-body">
                Use AI-powered generation to create each layer of your startup. 
                From identity to expansion, build systematically.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-violet to-cyan rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-display font-bold text-2xl">2</span>
              </div>
              <h3 className="font-display font-semibold text-2xl text-onyx mb-4">Preview & Refine</h3>
              <p className="text-graphite font-body">
                See everything in real-time. Toggle between versions, 
                customize content, and perfect your strategy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan to-violet rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-display font-bold text-2xl">3</span>
              </div>
              <h3 className="font-display font-semibold text-2xl text-onyx mb-4">Export & Execute</h3>
              <p className="text-graphite font-body">
                Download your complete blueprint as PDF, JSON, or Notion. 
                Ready for immediate execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-onyx text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
            Ready to boot your startup?
          </h2>
          <p className="text-xl text-porcelain/80 font-body mb-12">
            Join category-defining founders building the future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={isAuthenticated ? '/dashboard' : '/login'}>
              <Button size="lg" variant="accent" className="gap-2 w-full sm:w-auto">
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/investor-room">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                Investor Room
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
