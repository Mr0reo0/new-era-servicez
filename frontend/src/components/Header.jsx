import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from './ui/button'
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 glass-surface border-b border-graphite/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan to-violet rounded-sm flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl">N</span>
            </div>
            <span className="font-display font-bold text-xl text-onyx hidden sm:block">
              New Era Servicez
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/layers" className="text-graphite hover:text-onyx font-body transition-colors">
              The OS
            </Link>
            <Link to="/pricing" className="text-graphite hover:text-onyx font-body transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-graphite hover:text-onyx font-body transition-colors">
              About
            </Link>
            {isAuthenticated && (
              <Link to="/mentor" className="text-graphite hover:text-onyx font-body transition-colors">
                Mentor Hub
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-body font-medium text-onyx">{user?.name}</p>
                    <p className="text-xs text-graphite">{user?.email}</p>
                  </div>
                  {user?.picture ? (
                    <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan to-violet rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/waitlist">
                  <Button variant="accent">Join Waitlist</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-onyx"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-graphite/10">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/layers"
                className="text-graphite hover:text-onyx font-body transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                The OS
              </Link>
              <Link
                to="/pricing"
                className="text-graphite hover:text-onyx font-body transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="text-graphite hover:text-onyx font-body transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className="text-graphite hover:text-onyx font-body transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/mentor"
                    className="text-graphite hover:text-onyx font-body transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mentor Hub
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="text-left text-graphite hover:text-onyx font-body transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/waitlist" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="accent" className="w-full">Join Waitlist</Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
