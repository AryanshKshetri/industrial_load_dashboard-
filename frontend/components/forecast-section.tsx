'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { Badge } from '@/components/ui/badge'

const forecastData = [
  { day: 'Mon', load: 1350 },
  { day: 'Tue', load: 1420 },
  { day: 'Wed', load: 1385 },
  { day: 'Thu', load: 1450 },
  { day: 'Fri', load: 1380 },
  { day: 'Sat', load: 1200 },
  { day: 'Sun', load: 950 },
]

export function ForecastSection() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Next Day Forecast */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Next Day Forecast</CardTitle>
            <CardDescription>Monday, January 15, 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Expected Load</span>
                <span className="text-2xl font-bold text-foreground">1,420 kW</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-94.7% bg-gradient-to-r from-chart-1 to-chart-2 rounded-full" />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>0 kW</span>
                <span>1,500 kW</span>
              </div>
            </div>
            <div className="rounded-lg bg-green-50 border border-green-200 p-3">
              <p className="text-xs font-semibold text-green-700">✓ Status: Safe</p>
              <p className="text-xs text-green-600 mt-1">Predicted load is 5.3% below contract limit</p>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><span className="font-semibold">Peak Load:</span> 2:00 PM - 1,520 kW</p>
              <p><span className="font-semibold">Low Load:</span> 4:00 AM - 760 kW</p>
              <p><span className="font-semibold">Avg Load:</span> 1,280 kW</p>
            </div>
          </CardContent>
        </Card>

        {/* Week Trend Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">7-Day Trend Summary</CardTitle>
            <CardDescription>Jan 15 - Jan 21, 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Load</span>
                <span className="text-2xl font-bold text-foreground">1,338 kW</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-89.2% bg-gradient-to-r from-chart-3 to-chart-2 rounded-full" />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>0 kW</span>
                <span>1,500 kW</span>
              </div>
            </div>
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
              <p className="text-xs font-semibold text-blue-700">ℹ Trend: Stable</p>
              <p className="text-xs text-blue-600 mt-1">Consistent demand with predictable patterns</p>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><span className="font-semibold">Peak Day:</span> Thursday - 1,450 kW</p>
              <p><span className="font-semibold">Lowest Day:</span> Sunday - 950 kW</p>
              <p><span className="font-semibold">Days at Risk:</span> 0 / 7</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Week Chart */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day Load Forecast Chart</CardTitle>
          <CardDescription>Predicted daily loads with contract limit reference</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis 
                  dataKey="day" 
                  stroke="var(--muted-foreground)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="var(--muted-foreground)"
                  style={{ fontSize: '12px' }}
                  label={{ value: 'Load (kW)', angle: -90, position: 'insideLeft' }}
                  domain={[0, 1600]}
                />
                <ChartTooltip 
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '8px',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="load" 
                  stroke="var(--chart-1)" 
                  name="Predicted Load"
                  strokeWidth={3}
                  dot={{ fill: 'var(--primary)', r: 5 }}
                />
                {/* Contract Limit Reference Line */}
                <line x1="0" y1="1500" x2="100%" y2="1500" stroke="var(--destructive)" strokeDasharray="5 5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
