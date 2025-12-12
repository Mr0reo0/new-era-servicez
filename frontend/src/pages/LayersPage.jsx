import React from 'react'
import { Link } from 'react-router-dom'
import { useBlueprint } from '../contexts/BlueprintContext'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { Progress } from '../components/ui/progress'
import { 
  Target, Zap, TrendingUp, Building2, DollarSign, Rocket, 
  ArrowRight, CheckCircle2, Circle, Clock
} from 'lucide-react'

const LayersPage = () => {
  const { blueprint, loading } = useBlueprint()

  const layers = [
    {
      id: 'identity',
      icon: Target,
      name: 'Identity Layer',
      description: 'Boot worldview, category POV, brand, archetype, messaging.',
      details: [
        'Define your unique worldview',
        'Establish category positioning',
        'Create brand archetype',
        'Craft core messaging'
      ]
    },
    {
      id: 'product',
      icon: Zap,
      name: 'Product Layer',
      description: 'Boot offers, pricing, 10x feature, signature experience.',
      details: [
        'Design core product offering',
        'Develop pricing strategy',
        'Identify 10x differentiator',
        'Create signature experience'
      ]
    },
    {
      id: 'audience',
      icon: TrendingUp,
      name: 'Audience Layer',
      description: 'Boot growth engine, distribution strategy, content systems.',
      details: [
        'Define target audience',
        'Build distribution channels',
        'Create content strategy',
        'Design growth engine'
      ]
    },
    {
      id: 'systems',
      icon: Building2,
      name: 'Systems Layer',
      description: 'Boot automation, CRM, workflows, pipelines.',
      details: [
        'Setup CRM systems',
        'Automate key processes',
        'Design workflows',
        'Build sales pipeline'
      ]
    },
    {
      id: 'financial',
      icon: DollarSign,
      name: 'Financial Layer',
      description: 'Boot financial models, scenarios, revenue engine, pricing system.',
      details: [
        'Create revenue model',
        'Design pricing tiers',
        'Build financial projections',
        'Track key metrics'
      ]
    },
    {
      id: 'expansion',
      icon: Rocket,
      name: 'Expansion Layer',
      description: 'Boot partnerships, ecosystem, category leadership, scale map.',
      details: [
        'Identify partnerships',
        'Build ecosystem vision',
        'Plan category leadership',
        'Create scale roadmap'
      ]
    }
  ]

  const getLayerData = (layerId) => {
    return blueprint?.layers?.find(l => l.layer_id === layerId)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'in_progress':
        return <Clock className="w-5 h-5 text-cyan" />
      default:
        return <Circle className="w-5 h-5 text-graphite/30" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-porcelain">
        <div className="text-center">
          <div className="spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-graphite font-body">Loading layers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-porcelain py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display font-bold text-5xl md:text-6xl text-onyx mb-6">
            The 6 Layers
          </h1>
          <p className="text-xl text-graphite font-body max-w-3xl mx-auto">
            Build your startup systematically. Each layer creates the foundation for the next, 
            resulting in a complete operating system for your company.
          </p>
        </div>

        {/* Layers Grid */}
        <div className="space-y-8">
          {layers.map((layer, index) => {
            const Icon = layer.icon
            const layerData = getLayerData(layer.id)
            const progress = layerData?.progress_percent || 0
            const status = layerData?.status || 'not_started'

            return (
              <Card key={layer.id} className="tracing-beam hover:scale-[1.02] transition-all">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex items-start gap-6 flex-1">
                      <div className={`w-16 h-16 bg-gradient-to-br ${
                        index % 2 === 0 ? 'from-cyan to-violet' : 'from-violet to-cyan'
                      } rounded-sm flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-body font-medium text-cyan">
                            Layer {index + 1}
                          </span>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(status)}
                            <span className="text-sm font-body text-graphite capitalize">
                              {status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                        <CardTitle className="text-2xl md:text-3xl mb-3">
                          {layer.name}
                        </CardTitle>
                        <CardDescription className="text-base mb-4">
                          {layer.description}
                        </CardDescription>
                        <ul className="space-y-2">
                          {layer.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-graphite font-body">
                              <div className="w-1.5 h-1.5 bg-cyan rounded-full"></div>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="md:text-right md:min-w-[120px]">
                      <div className="text-4xl font-display font-bold text-onyx mb-2">
                        {progress}%
                      </div>
                      <Progress value={progress} className="w-full md:w-24 mb-4" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link to={`/layers/${layer.id}`}>
                    <Button 
                      variant={status === 'completed' ? 'outline' : 'default'} 
                      size="lg" 
                      className="w-full md:w-auto gap-2 group"
                    >
                      {status === 'completed' ? 'Review & Edit' : status === 'in_progress' ? 'Continue Building' : 'Start Layer'}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-br from-onyx to-graphite text-white inline-block">
            <CardContent className="p-8">
              <h3 className="font-display font-bold text-2xl text-white mb-3">
                Need guidance?
              </h3>
              <p className="text-porcelain/80 font-body mb-6">
                Chat with our AI mentor for expert advice on any layer
              </p>
              <Link to="/mentor">
                <Button variant="accent" size="lg" className="gap-2">
                  Open Mentor Hub
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LayersPage
