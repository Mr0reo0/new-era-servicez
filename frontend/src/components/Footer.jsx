import React from 'react'
import { Link } from 'react-router-dom'
import { Twitter, Linkedin, Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-graphite text-porcelain">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan to-violet rounded-sm flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">N</span>
              </div>
              <span className="font-display font-bold text-lg text-white">
                New Era Servicez
              </span>
            </div>
            <p className="text-sm text-porcelain/70 font-body mb-6">
              The Startup Operating System for category-defining founders.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-porcelain/70 hover:text-cyan transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-porcelain/70 hover:text-cyan transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-porcelain/70 hover:text-cyan transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3 font-body text-sm">
              <li>
                <Link to="/layers" className="text-porcelain/70 hover:text-cyan transition-colors">
                  The 6 Layers
                </Link>
              </li>
              <li>
                <Link to="/brand-engine" className="text-porcelain/70 hover:text-cyan transition-colors">
                  Brand Engine
                </Link>
              </li>
              <li>
                <Link to="/mentor" className="text-porcelain/70 hover:text-cyan transition-colors">
                  Mentor Hub
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-porcelain/70 hover:text-cyan transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-porcelain/70 hover:text-cyan transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3 font-body text-sm">
              <li>
                <Link to="/about" className="text-porcelain/70 hover:text-cyan transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/founder-story" className="text-porcelain/70 hover:text-cyan transition-colors">
                  Founder Story
                </Link>
              </li>
              <li>
                <Link to="/investor-room" className="text-porcelain/70 hover:text-cyan transition-colors">
                  Investor Room
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-porcelain/70 hover:text-cyan transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3 font-body text-sm">
              <li>
                <Link to="/legal" className="text-porcelain/70 hover:text-cyan transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-porcelain/70 hover:text-cyan transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-porcelain/70 hover:text-cyan transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-porcelain/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-porcelain/70 font-body">
            © 2024 New Era Servicez. All rights reserved.
          </p>
          <p className="text-sm text-porcelain/70 font-body mt-4 md:mt-0">
            Built for category-defining founders.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
