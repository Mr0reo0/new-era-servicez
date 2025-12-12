import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/card'

const BrandEnginePage = () => {
  return (
    <div className="min-h-screen bg-porcelain py-12">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-onyx mb-4">
          Brand & Website Engine
        </h1>
        <p className="text-xl text-graphite font-body mb-12">
          Generate your complete brand identity and website structure
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>
              This feature is under development and will be available soon.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default BrandEnginePage
