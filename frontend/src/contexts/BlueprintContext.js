import React, { createContext, useContext, useState, useEffect } from 'react'
import { blueprintAPI } from '../lib/api'
import { useAuth } from './AuthContext'

const BlueprintContext = createContext(null)

export const useBlueprint = () => {
  const context = useContext(BlueprintContext)
  if (!context) {
    throw new Error('useBlueprint must be used within a BlueprintProvider')
  }
  return context
}

export const BlueprintProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [blueprint, setBlueprint] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isAuthenticated) {
      fetchBlueprint()
    } else {
      setLoading(false)
    }
  }, [isAuthenticated])

  const fetchBlueprint = async () => {
    try {
      setLoading(true)
      const response = await blueprintAPI.get()
      setBlueprint(response.data)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch blueprint:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateCompanyName = async (companyName) => {
    try {
      await blueprintAPI.updateCompanyName(companyName)
      setBlueprint(prev => ({ ...prev, company_name: companyName }))
    } catch (err) {
      console.error('Failed to update company name:', err)
      throw err
    }
  }

  const updateLayer = async (layerId, content, status) => {
    try {
      const response = await blueprintAPI.updateLayer(layerId, content, status)
      setBlueprint(prev => ({
        ...prev,
        layers: response.data.layers,
        updated_at: new Date().toISOString()
      }))
    } catch (err) {
      console.error('Failed to update layer:', err)
      throw err
    }
  }

  const getLayer = (layerId) => {
    return blueprint?.layers?.find(layer => layer.layer_id === layerId)
  }

  const getProgress = () => {
    if (!blueprint?.layers) return 0
    const total = blueprint.layers.reduce((sum, layer) => sum + (layer.progress_percent || 0), 0)
    return Math.round(total / blueprint.layers.length)
  }

  const value = {
    blueprint,
    loading,
    error,
    fetchBlueprint,
    updateCompanyName,
    updateLayer,
    getLayer,
    getProgress,
  }

  return <BlueprintContext.Provider value={value}>{children}</BlueprintContext.Provider>
}
