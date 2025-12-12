import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useBlueprint } from '../contexts/BlueprintContext'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { Progress } from '../components/ui/progress'
import { 
  Target, Zap, TrendingUp, Building2, DollarSign, Rocket, 
  Download, MessageSquare, ArrowRight, CheckCircle2, Circle, Clock
} from 'lucide-react'

const DashboardPage = () => {
  const { user } = useAuth()
  const { blueprint, loading, getProgress } = useBlueprint()

  const layerIcons = {
    identity: Target,
    product: Zap,
    audience: TrendingUp,
    systems: Building2,
    financial: DollarSign,
    expansion: Rocket
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

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'in_progress':
        return 'In Progress'
      default:
        return 'Not Started'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-porcelain">
        <div className="text-center">
          <div className="spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-graphite font-body">Loading your command centre...</p>
        </div>
      </div>
    )
  }

  const overallProgress = getProgress()
  const completedLayers = blueprint?.layers?.filter(l => l.status === 'completed').length || 0
  const totalLayers = blueprint?.layers?.length || 6

  return (
    <div className="min-h-screen bg-porcelain py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-onyx mb-2">
                Command Centre
              </h1>
              <p className="text-xl text-graphite font-body">
                Welcome back, {user?.name?.split(' ')[0]}
              </p>
            </div>
            <Link to="/blueprint">
              <Button variant="accent" size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                Export Blueprint
              </Button>
            </Link>
          </div>

          {/* Company Name */}
          {blueprint?.company_name && (
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan/10 to-violet/10 rounded-sm border border-cyan/20">
              <span className="font-body font-medium text-onyx">
                {blueprint.company_name}
              </span>
            </div>
          )}
        </div>

        {/* Overall Progress */}
        <Card className="mb-12 tracing-beam">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Overall Progress</CardTitle>
                <CardDescription>
                  {completedLayers} of {totalLayers} layers completed
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-4xl font-display font-bold text-onyx mb-1">
                  {overallProgress}%
                </div>
                <p className="text-sm text-graphite font-body">Complete</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={overallProgress} className="h-3" />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link to="/layers">
            <Card className="hover:scale-105 transition-transform cursor-pointer h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan to-violet rounded-sm flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-onyx">Boot Layers</h3>
                    <p className="text-sm text-graphite font-body">Continue building</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/mentor">
            <Card className="hover:scale-105 transition-transform cursor-pointer h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet to-cyan rounded-sm flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-onyx">Mentor Hub</h3>
                    <p className="text-sm text-graphite font-body">Get expert advice</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/blueprint">
            <Card className="hover:scale-105 transition-transform cursor-pointer h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan to-violet rounded-sm flex items-center justify-center">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-onyx">Export</h3>
                    <p className="text-sm text-graphite font-body">Download blueprint</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Layer Status */}
        <div className="mb-12">
          <h2 className="font-display font-bold text-3xl text-onyx mb-6">
            Your 6 Layers
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {blueprint?.layers?.map((layer, index) => {
              const Icon = layerIcons[layer.layer_id] || Target
              return (
                <Card key={layer.layer_id} className="tracing-beam hover:scale-105 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${
                          index % 2 === 0 ? 'from-cyan to-violet' : 'from-violet to-cyan'
                        } rounded-sm flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusIcon(layer.status)}
                            <span className="text-sm font-body text-graphite">
                              {getStatusText(layer.status)}
                            </span>
                          </div>
                          <CardTitle className="text-xl">{layer.layer_name}</CardTitle>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-display font-bold text-onyx">
                          {layer.progress_percent}%
                        </div>
                      </div>
                    </div>
                    <Progress value={layer.progress_percent} className="mb-4" />
                  </CardHeader>
                  <CardContent>
                    <Link to={`/layers/${layer.layer_id}`}>
                      <Button variant="ghost" className="w-full gap-2 group">
                        {layer.status === 'completed' ? 'Review Layer' : 'Continue Building'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Next Steps */}
        <Card className="bg-gradient-to-br from-onyx to-graphite text-white">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Next Steps</CardTitle>
            <CardDescription className="text-porcelain/80">
              Recommended actions to accelerate your progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {overallProgress < 100 ? (
              <>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-onyx font-body font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-body text-white font-medium">Complete all 6 layers</p>
                    <p className="text-sm text-porcelain/70 font-body">
                      Build a comprehensive foundation for your startup
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-violet rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-body font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-body text-white font-medium">Consult with AI Mentor</p>
                    <p className="text-sm text-porcelain/70 font-body">
                      Get expert guidance on your strategy and execution
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-onyx font-body font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-body text-white font-medium">Export your blueprint</p>
                    <p className="text-sm text-porcelain/70 font-body">
                      Download and share your complete startup OS
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  Congratulations! 🎉
                </h3>
                <p className="text-porcelain/80 font-body mb-6">
                  You've completed all 6 layers. Your startup OS is ready!
                </p>
                <Link to="/blueprint">
                  <Button variant="accent" size="lg" className="gap-2">
                    <Download className="w-5 h-5" />
                    Export Complete Blueprint
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
