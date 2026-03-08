'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UploadCloud } from 'lucide-react'

export function DataUploadSection() {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Handle file drop
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Factory Data Upload</CardTitle>
        <CardDescription>Upload historical load data for predictions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-blue-50'
              : 'border-border bg-muted/30 hover:border-primary/50'
          }`}
        >
          <UploadCloud className="mx-auto h-8 w-8 text-primary mb-3" />
          <p className="text-sm font-medium text-foreground mb-1">Drag and drop your file here</p>
          <p className="text-xs text-muted-foreground mb-4">or</p>
          <Button variant="outline" size="sm">
            Upload CSV / Excel File
          </Button>
          <p className="text-xs text-muted-foreground mt-3">Supported: .csv, .xlsx</p>
        </div>

        {/* Format Example */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Required Data Format:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-border rounded-md">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-3 py-2 font-semibold text-foreground">Date</th>
                  <th className="px-3 py-2 font-semibold text-foreground">Time</th>
                  <th className="px-3 py-2 font-semibold text-foreground">Load (kW)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 text-muted-foreground">2024-01-01</td>
                  <td className="px-3 py-2 text-muted-foreground">10:00</td>
                  <td className="px-3 py-2 text-muted-foreground">420</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 text-muted-foreground">2024-01-01</td>
                  <td className="px-3 py-2 text-muted-foreground">11:00</td>
                  <td className="px-3 py-2 text-muted-foreground">450</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-2 text-muted-foreground">2024-01-01</td>
                  <td className="px-3 py-2 text-muted-foreground">12:00</td>
                  <td className="px-3 py-2 text-muted-foreground">480</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Please upload historical factory load data using the above column format.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
