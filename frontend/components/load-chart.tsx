'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartLegend } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

const data = [
  { time: '00:00', historical: 850, predicted_next_day: 890, trend: 870 },
  { time: '04:00', historical: 720, predicted_next_day: 760, trend: 740 },
  { time: '08:00', historical: 1200, predicted_next_day: 1280, trend: 1240 },
  { time: '12:00', historical: 1450, predicted_next_day: 1520, trend: 1480 },
  { time: '16:00', historical: 1380, predicted_next_day: 1420, trend: 1400 },
  { time: '20:00', historical: 1100, predicted_next_day: 1150, trend: 1120 },
  { time: '23:59', historical: 950, predicted_next_day: 1000, trend: 970 },
]

export function LoadChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Load Analytics</CardTitle>
        <CardDescription>Historical and predicted load patterns over 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="var(--muted-foreground)"
                style={{ fontSize: '12px' }}
                label={{ value: 'Load (kW)', angle: -90, position: 'insideLeft' }}
              />
              <ChartTooltip 
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '8px',
                }}
              />
              <ChartLegend />
              <Line 
                type="monotone" 
                dataKey="historical" 
                stroke="var(--chart-1)" 
                name="Historical Load"
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="predicted_next_day" 
                stroke="var(--chart-2)" 
                name="Predicted (Next Day)"
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="trend" 
                stroke="var(--chart-3)" 
                name="7-Day Trend"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
