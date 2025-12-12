import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { ArrowRight } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-porcelain py-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h1 className="font-display font-bold text-5xl md:text-6xl text-onyx mb-8">
          About New Era Servicez
        </h1>
        <div className="prose prose-lg max-w-none font-body text-graphite space-y-6">
          <p className="text-xl">
            New Era Servicez is the world's first Startup Operating System—a platform that lets founders 
            boot a complete company layer by layer.
          </p>
          <h2 className="font-display font-bold text-3xl text-onyx mt-12 mb-4">The Category: Company Booting Platforms</h2>
          <p>
            We're not a template library. We're not a course platform. We're the OS that powers category-defining startups.
          </p>
          <p>
            Instead of giving founders generic advice, we let them systematically build the six layers of a company—from 
            identity to expansion—with AI-powered generation, real-time previews, and export-ready blueprints.
          </p>
          <h2 className="font-display font-bold text-3xl text-onyx mt-12 mb-4">Why This Exists</h2>
          <p>
            Most startup tools focus on execution. But execution without foundation is chaos. New Era Servicez gives 
            founders the infrastructure to think clearly, build systematically, and scale inevitably.
          </p>
          <div className="mt-12">
            <Link to="/founder-story">
              <Button variant="accent" size="lg" className="gap-2">
                Read the Founder Story
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
