import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { Check } from 'lucide-react'

const PricingPage = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for exploring the platform',
      features: [
        'Access to 2 layers',
        'Basic AI generation',
        'Export as PDF',
        'Community support'
      ]
    },
    {
      name: 'Pro',
      price: '$49',
      period: '/month',
      description: 'For serious founders building their startup',
      features: [
        'All 6 layers unlocked',
        'Unlimited AI generation',
        'Export as PDF, JSON, Notion',
        'Priority mentor support',
        'Advanced analytics',
        'Custom branding'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For teams and accelerators',
      features: [
        'Everything in Pro',
        'Multi-user access',
        'White-label options',
        'Dedicated support',
        'Custom integrations',
        'Training & onboarding'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-porcelain py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h1 className="font-display font-bold text-5xl md:text-6xl text-onyx mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-graphite font-body max-w-2xl mx-auto">
            Choose the plan that fits your journey. All plans include our core OS features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? 'tracing-beam scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-cyan to-violet text-white text-sm font-body font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-display font-bold text-onyx">{plan.price}</span>
                  {plan.period && <span className="text-graphite font-body">{plan.period}</span>}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-body text-graphite">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/login">
                  <Button
                    variant={plan.popular ? 'gradient' : 'default'}
                    size="lg"
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PricingPage
