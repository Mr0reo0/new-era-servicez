import React from 'react'

const FounderStoryPage = () => {
  return (
    <div className="min-h-screen bg-porcelain py-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h1 className="font-display font-bold text-5xl md:text-6xl text-onyx mb-8">
          Founder Story
        </h1>
        <div className="prose prose-lg max-w-none font-body text-graphite space-y-6">
          <p className="text-xl font-semibold">
            Every great company starts with a vision. This is ours.
          </p>
          <p>
            New Era Servicez was born from a simple observation: most startups fail not because they lack 
            execution, but because they lack foundation.
          </p>
          <p>
            Founders are told to "just start building." But building without a clear identity, product strategy, 
            audience understanding, operational systems, financial model, and expansion plan is like constructing 
            a skyscraper without blueprints.
          </p>
          <p>
            We created the Startup Operating System to change that. A platform where founders can systematically 
            boot each layer of their company, preview everything in real-time, and export a complete blueprint 
            ready for execution.
          </p>
          <p>
            This isn't about templates. It's about infrastructure. It's about giving category-defining founders 
            the tools to think clearly, build systematically, and scale inevitably.
          </p>
          <p className="text-xl font-semibold mt-12">
            Welcome to the new era of company building.
          </p>
        </div>
      </div>
    </div>
  )
}

export default FounderStoryPage
