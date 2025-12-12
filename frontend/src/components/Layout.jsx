import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  const location = useLocation()
  
  // Pages that should have a different layout or no header/footer
  const noHeaderFooterPages = ['/login']
  const showHeaderFooter = !noHeaderFooterPages.includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col bg-porcelain">
      {showHeaderFooter && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  )
}

export default Layout
