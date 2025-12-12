import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { BlueprintProvider } from './contexts/BlueprintContext'
import { Toaster } from 'sonner'

// Layout
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import WaitlistPage from './pages/WaitlistPage'
import DashboardPage from './pages/DashboardPage'
import LayersPage from './pages/LayersPage'
import LayerDetailPage from './pages/LayerDetailPage'
import BrandEnginePage from './pages/BrandEnginePage'
import LegalPage from './pages/LegalPage'
import CRMPage from './pages/CRMPage'
import BlueprintGeneratorPage from './pages/BlueprintGeneratorPage'
import MentorHubPage from './pages/MentorHubPage'
import MarketplacePage from './pages/MarketplacePage'
import PricingPage from './pages/PricingPage'
import InvestorRoomPage from './pages/InvestorRoomPage'
import AboutPage from './pages/AboutPage'
import FounderStoryPage from './pages/FounderStoryPage'
import DocsLibraryPage from './pages/DocsLibraryPage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlueprintProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/waitlist" element={<WaitlistPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/founder-story" element={<FounderStoryPage />} />
              <Route path="/investor-room" element={<InvestorRoomPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/layers"
                element={
                  <ProtectedRoute>
                    <LayersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/layers/:layerId"
                element={
                  <ProtectedRoute>
                    <LayerDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/brand-engine"
                element={
                  <ProtectedRoute>
                    <BrandEnginePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/legal"
                element={
                  <ProtectedRoute>
                    <LegalPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/crm"
                element={
                  <ProtectedRoute>
                    <CRMPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blueprint"
                element={
                  <ProtectedRoute>
                    <BlueprintGeneratorPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mentor"
                element={
                  <ProtectedRoute>
                    <MentorHubPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/marketplace"
                element={
                  <ProtectedRoute>
                    <MarketplacePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/docs"
                element={
                  <ProtectedRoute>
                    <DocsLibraryPage />
                  </ProtectedRoute>
                }
              />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
          <Toaster position="top-right" richColors />
        </BlueprintProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
