import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBlueprint } from '../contexts/BlueprintContext'
import { aiAPI } from '../lib/api'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Progress } from '../components/ui/progress'
import { ArrowLeft, Sparkles, Save, RefreshCw, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

const LayerDetailPage = () => {
  const { layerId } = useParams()
  const navigate = useNavigate()
  const { blueprint, updateLayer, getLayer } = useBlueprint()
  
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [content, setContent] = useState({})
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)

  const layerData = getLayer(layerId)

  useEffect(() => {
    if (layerData?.content) {
      setContent(layerData.content)
    }
  }, [layerData])

  const layerInfo = {
    identity: {
      name: 'Identity Layer',
      description: 'Define your startup\'s worldview, category positioning, and brand identity',
      fields: [
        { key: 'worldview', label: 'Worldview', placeholder: 'Your unique perspective on the market...' },
        { key: 'category_pov', label: 'Category POV', placeholder: 'How you see your category differently...' },
        { key: 'brand_archetype', label: 'Brand Archetype', placeholder: 'The Innovator, The Sage, etc.' },
        { key: 'core_message', label: 'Core Message', placeholder: 'Your positioning statement...' },
        { key: 'values', label: 'Core Values', placeholder: 'Innovation, Transparency, etc.', isArray: true }
      ]
    },
    product: {
      name: 'Product Layer',
      description: 'Design your core offering, pricing strategy, and signature experience',
      fields: [
        { key: 'main_offer', label: 'Main Offer', placeholder: 'Your core product/service...' },
        { key: 'pricing_strategy', label: 'Pricing Strategy', placeholder: 'Value-based, tiered, etc.' },
        { key: 'ten_x_feature', label: '10x Feature', placeholder: 'What makes you 10x better...' },
        { key: 'signature_experience', label: 'Signature Experience', placeholder: 'Unique customer experience...' }
      ]
    },
    audience: {
      name: 'Audience Layer',
      description: 'Identify your target audience and build your growth engine',
      fields: [
        { key: 'target_audience', label: 'Target Audience', placeholder: 'Detailed customer profile...' },
        { key: 'distribution_channels', label: 'Distribution Channels', placeholder: 'LinkedIn, Content, etc.', isArray: true },
        { key: 'content_strategy', label: 'Content Strategy', placeholder: 'Your content approach...' },
        { key: 'growth_engine', label: 'Growth Engine', placeholder: 'Primary growth mechanism...' }
      ]
    },
    systems: {
      name: 'Systems Layer',
      description: 'Build operational systems, automation, and workflows',
      fields: [
        { key: 'crm_approach', label: 'CRM Approach', placeholder: 'How you manage relationships...' },
        { key: 'automation_priorities', label: 'Automation Priorities', placeholder: 'Email, onboarding, etc.', isArray: true },
        { key: 'key_workflows', label: 'Key Workflows', placeholder: 'Sales, support, etc.', isArray: true },
        { key: 'tech_stack', label: 'Tech Stack', placeholder: 'Tools and platforms...', isArray: true }
      ]
    },
    financial: {
      name: 'Financial Layer',
      description: 'Create your revenue model, pricing tiers, and financial projections',
      fields: [
        { key: 'revenue_model', label: 'Revenue Model', placeholder: 'How you make money...' },
        { key: 'pricing_tiers', label: 'Pricing Tiers', placeholder: 'Starter, Pro, Enterprise', isArray: true },
        { key: 'key_metrics', label: 'Key Metrics', placeholder: 'MRR, CAC, LTV, etc.', isArray: true },
        { key: 'financial_projections', label: 'Financial Projections', placeholder: 'Growth scenarios...' }
      ]
    },
    expansion: {
      name: 'Expansion Layer',
      description: 'Plan partnerships, ecosystem, and path to category leadership',
      fields: [
        { key: 'partnership_opportunities', label: 'Partnership Opportunities', placeholder: 'Strategic partners...', isArray: true },
        { key: 'ecosystem_vision', label: 'Ecosystem Vision', placeholder: 'How you build an ecosystem...' },
        { key: 'scale_map', label: 'Scale Map', placeholder: 'Phases of growth...', isArray: true },
        { key: 'category_leadership', label: 'Category Leadership', placeholder: 'Path to market leadership...' }
      ]
    }
  }

  const currentLayer = layerInfo[layerId]

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please provide some context for AI generation')
      return
    }

    setGenerating(true)
    try {
      const response = await aiAPI.generateLayerContent(
        layerId,
        prompt,
        blueprint?.company_name || ''
      )
      
      setContent(response.data.content)
      toast.success('Content generated successfully!')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Failed to generate content. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateLayer(layerId, content)
      toast.success('Layer saved successfully!')
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Failed to save layer. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleCopyAll = () => {
    const text = Object.entries(content)
      .map(([key, value]) => {
        const field = currentLayer.fields.find(f => f.key === key)
        const label = field?.label || key
        const valueStr = Array.isArray(value) ? value.join(', ') : value
        return `${label}: ${valueStr}`
      })
      .join('\n\n')
    
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Content copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFieldChange = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }))
  }

  if (!currentLayer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-porcelain">
        <div className="text-center">
          <p className="text-graphite font-body">Layer not found</p>
          <Button onClick={() => navigate('/layers')} className="mt-4">
            Back to Layers
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-porcelain py-12">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/layers')}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Layers
          </Button>
          
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-onyx mb-3">
                {currentLayer.name}
              </h1>
              <p className="text-xl text-graphite font-body">
                {currentLayer.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-display font-bold text-onyx mb-1">
                {layerData?.progress_percent || 0}%
              </div>
              <Progress value={layerData?.progress_percent || 0} className="w-24" />
            </div>
          </div>
        </div>

        {/* AI Generation Section */}
        <Card className="mb-8 tracing-beam">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan" />
              AI-Powered Generation
            </CardTitle>
            <CardDescription>
              Describe your startup or provide specific details, and our AI will generate VC-grade content for this layer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-onyx mb-2">
                Tell us about your startup
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., We're building a B2B SaaS platform that helps sales teams automate their outreach using AI. Our target market is mid-size tech companies..."
                className="w-full h-32 bg-white border border-graphite/20 rounded-sm px-4 py-3 text-sm font-body text-onyx placeholder:text-graphite/50 focus:border-cyan focus:ring-1 focus:ring-cyan outline-none transition-all resize-none"
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleGenerate}
                disabled={generating || !prompt.trim()}
                variant="gradient"
                size="lg"
                className="gap-2"
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Content
                  </>
                )}
              </Button>
              {Object.keys(content).length > 0 && (
                <Button
                  onClick={handleCopyAll}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Copied!' : 'Copy All'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Content Fields */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Layer Content</CardTitle>
            <CardDescription>
              Review and edit the generated content or fill in manually
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentLayer.fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-body font-medium text-onyx mb-2">
                  {field.label}
                </label>
                {field.isArray ? (
                  <Input
                    value={Array.isArray(content[field.key]) ? content[field.key].join(', ') : content[field.key] || ''}
                    onChange={(e) => handleFieldChange(field.key, e.target.value.split(',').map(s => s.trim()))}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <textarea
                    value={content[field.key] || ''}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full h-24 bg-white border border-graphite/20 rounded-sm px-4 py-3 text-sm font-body text-onyx placeholder:text-graphite/50 focus:border-cyan focus:ring-1 focus:ring-cyan outline-none transition-all resize-none"
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => navigate('/layers')}
            variant="outline"
            size="lg"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            variant="default"
            size="lg"
            className="gap-2"
          >
            {saving ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Layer
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LayerDetailPage
