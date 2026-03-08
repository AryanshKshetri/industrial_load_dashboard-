import { Bell, User, TrendingUp, AlertTriangle, CheckCircle, UploadCloud, Zap, Activity } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TopNav } from '@/components/top-nav'
import { KPICard } from '@/components/kpi-card'
import { DataUploadSection } from '@/components/data-upload-section'
import { DemandControlPanel } from '@/components/demand-control-panel'
import { LoadChart } from '@/components/load-chart'
import { PredictionResults } from '@/components/prediction-results'
import { AlertPanel } from '@/components/alert-panel'
import { ForecastSection } from '@/components/forecast-section'
import { RecentPredictionsTable } from '@/components/recent-predictions-table'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Industrial Load Intelligence Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">Monitor factory loads, predict demand peaks, and stay within contract limits</p>
        </div>

        {/* KPI Cards Section */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard 
            title="Current Load" 
            value="1,245" 
            unit="kW" 
            icon={<Zap className="h-5 w-5" />}
            trend="+5.2%"
          />
          <KPICard 
            title="Predicted Load (Next Day)" 
            value="1,420" 
            unit="kW" 
            icon={<TrendingUp className="h-5 w-5" />}
            trend="+13.8%"
          />
          <KPICard 
            title="Predicted Load (Next Week)" 
            value="1,385" 
            unit="kW" 
            icon={<Activity className="h-5 w-5" />}
            trend="+11.2%"
          />
          <KPICard 
            title="Contract Demand" 
            value="1,500" 
            unit="kVA" 
            icon={<AlertTriangle className="h-5 w-5" />}
            trend="Limit"
          />
        </div>

        {/* Data Upload and Demand Control Section */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <DataUploadSection />
          <DemandControlPanel />
        </div>

        {/* Load Analytics Chart */}
        <div className="mb-8">
          <LoadChart />
        </div>

        {/* Prediction Results and Alert Panel */}
        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PredictionResults />
          </div>
          <div>
            <AlertPanel />
          </div>
        </div>

        {/* Future Forecast Section */}
        <div className="mb-8">
          <ForecastSection />
        </div>

        {/* Recent Predictions Table */}
        <div>
          <RecentPredictionsTable />
        </div>
      </main>
    </div>
  )
}
