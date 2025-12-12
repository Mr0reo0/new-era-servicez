import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlueprint } from '../contexts/BlueprintContext'
import { exportAPI } from '../lib/api'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { Download, FileText, FileJson, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

const BlueprintGeneratorPage = () => {
  const navigate = useNavigate()
  const { blueprint, getProgress } = useBlueprint()
  const [exporting, setExporting] = useState(false)

  const handleExportPDF = async () => {
    setExporting(true)
    try {
      const response = await exportAPI.exportPDF()
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${blueprint?.company_name || 'startup'}_blueprint.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Blueprint exported as PDF!')
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export PDF')
    } finally {
      setExporting(false)
    }
  }

  const handleExportJSON = async () => {
    setExporting(true)
    try {
      const response = await exportAPI.exportJSON()
      const dataStr = JSON.stringify(response.data, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = window.URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${blueprint?.company_name || 'startup'}_blueprint.json`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Blueprint exported as JSON!')
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export JSON')
    } finally {
      setExporting(false)
    }
  }

  const progress = getProgress()

  return (
    <div className="min-h-screen bg-porcelain py-12">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-onyx mb-4">
            Blueprint Generator
          </h1>
          <p className="text-xl text-graphite font-body">
            Export your complete startup operating system
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 tracing-beam">
          <CardHeader>
            <CardTitle>Blueprint Status</CardTitle>
            <CardDescription>
              {blueprint?.company_name || 'Your Startup'} - {progress}% Complete
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {blueprint?.layers?.map((layer) => (
                <div key={layer.layer_id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {layer.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-graphite/30"></div>
                    )}
                    <span className="font-body text-onyx">{layer.layer_name}</span>
                  </div>
                  <span className="text-sm font-body text-graphite">{layer.progress_percent}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:scale-105 transition-transform">
            <CardHeader>
              <FileText className="w-12 h-12 text-cyan mb-4" />
              <CardTitle>Export as PDF</CardTitle>
              <CardDescription>
                Download a formatted PDF document with all your layers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleExportPDF}
                disabled={exporting}
                variant="default"
                size="lg"
                className="w-full gap-2"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-transform">
            <CardHeader>
              <FileJson className="w-12 h-12 text-violet mb-4" />
              <CardTitle>Export as JSON</CardTitle>
              <CardDescription>
                Download structured data for integration with other tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleExportJSON}
                disabled={exporting}
                variant="default"
                size="lg"
                className="w-full gap-2"
              >
                <Download className="w-5 h-5" />
                Download JSON
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button onClick={() => navigate('/dashboard')} variant="outline" size="lg">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BlueprintGeneratorPage
