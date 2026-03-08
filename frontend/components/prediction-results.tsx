import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Calendar, Zap, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function PredictionResults() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prediction Results</CardTitle>
        <CardDescription>AI-powered forecast analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Next Day Prediction */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Next Day Prediction</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground mb-1">Expected Load</p>
              <p className="text-2xl font-bold text-foreground">1,420</p>
              <p className="text-xs text-muted-foreground mt-1">kW</p>
            </div>
            <div className="rounded-lg bg-green-50 p-3 border border-green-200">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <p className="text-lg font-bold text-green-700">Safe</p>
              <p className="text-xs text-green-600 mt-1">Within limits</p>
            </div>
          </div>
        </div>

        {/* Next Week Trend */}
        <div className="space-y-3 border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Next Week Trend</h3>
          </div>
          <div className="rounded-lg bg-muted/30 p-4">
            <div className="space-y-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                const values = [1350, 1420, 1385, 1450, 1380, 1200, 950]
                const value = values[idx]
                const maxValue = 1500
                const percentage = (value / maxValue) * 100
                return (
                  <div key={day} className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground w-8">{day}</span>
                    <div className="flex-1 h-6 bg-muted rounded-sm overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-chart-1 to-chart-2 rounded-sm transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-foreground w-12 text-right">{value} kW</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Contract Demand and Risk */}
        <div className="space-y-3 border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Contract Analysis</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground mb-1">Contract Demand</p>
              <p className="text-2xl font-bold text-foreground">1,500</p>
              <p className="text-xs text-muted-foreground mt-1">kVA</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-3 border border-blue-200">
              <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
              <p className="text-lg font-bold text-blue-700">Low</p>
              <p className="text-xs text-blue-600 mt-1">5.3% margin</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
