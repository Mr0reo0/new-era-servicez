import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/card'

const InvestorRoomPage = () => {
  return (
    <div className="min-h-screen bg-onyx py-12">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
          Investor Room
        </h1>
        <p className="text-xl text-porcelain font-body mb-12">
          Private access for investors and partners
        </p>
        <Card className="bg-graphite border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Access Restricted</CardTitle>
            <CardDescription className="text-porcelain">
              This area is for invited investors only. Please contact us for access.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default InvestorRoomPage
