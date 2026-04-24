'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { TopNav } from '@/components/top-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getUserSettings, saveUserSettings, UserSettings } from '@/lib/api'
import { Zap, Factory, MapPin, TrendingUp, Bell, Shield, ChevronRight } from 'lucide-react'

const TABS = [
  { id: 'factory', label: 'Factory Settings', icon: Factory },
  { id: 'alerts', label: 'Alert Preferences', icon: Bell },
  { id: 'integrations', label: 'Integrations', icon: TrendingUp },
  { id: 'security', label: 'Security', icon: Shield },
]

const INDUSTRY_TYPES = [
  'Manufacturing', 'Textile', 'Steel & Metal',
  'Chemical', 'Food Processing', 'Cement',
  'Automobile', 'Pharmaceutical', 'Paper & Pulp', 'Other'
]

export default function SettingsPage() {
  const { user } = useUser()
  const router = useRouter()
  const userId = user?.id || "anonymous"
  const [activeTab, setActiveTab] = useState('factory')
  const [settings, setSettings] = useState<UserSettings>({
    factory_name: '',
    industry_type: '',
    location: '',
    contract_demand: 0,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (userId !== "anonymous") {
      getUserSettings(userId).then(data => {
        if (data && Object.keys(data).length > 0) {
          setSettings(data)
        }
      })
    }
  }, [userId])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveSuccess(false)
    const success = await saveUserSettings(userId, settings)
    setIsSaving(false)
    if (success) {
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your factory configuration and preferences
          </p>
        </div>

        <div className="flex gap-8">

          {/* Sidebar Tabs */}
          <div className="w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-2">
                {TABS.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      {tab.label}
                      {activeTab !== tab.id && (
                        <ChevronRight className="h-3 w-3 ml-auto opacity-50" />
                      )}
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Back to Dashboard */}
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => router.push('/')}
            >
              ← Back to Dashboard
            </Button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 space-y-6">

            {/* Factory Settings Tab */}
            {activeTab === 'factory' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Factory className="h-5 w-5 text-primary" />
                      Factory Information
                    </CardTitle>
                    <CardDescription>
                      Basic details about your factory
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="factory_name">Factory Name</Label>
                      <Input
                        id="factory_name"
                        placeholder="e.g. ABC Manufacturing Unit"
                        value={settings.factory_name || ''}
                        onChange={(e) => setSettings({ ...settings, factory_name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry_type">Industry Type</Label>
                      <select
                        id="industry_type"
                        value={settings.industry_type || ''}
                        onChange={(e) => setSettings({ ...settings, industry_type: e.target.value })}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select industry type</option>
                        {INDUSTRY_TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> Location
                        </span>
                      </Label>
                      <Input
                        id="location"
                        placeholder="e.g. Indore, Madhya Pradesh"
                        value={settings.location || ''}
                        onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Contract Demand
                    </CardTitle>
                    <CardDescription>
                      Set your electricity contract demand limit — this will be used automatically for all predictions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contract_demand">Contract Demand (kW)</Label>
                      <Input
                        id="contract_demand"
                        type="number"
                        placeholder="e.g. 500"
                        value={settings.contract_demand || ''}
                        onChange={(e) => setSettings({ ...settings, contract_demand: parseFloat(e.target.value) })}
                      />
                      <p className="text-xs text-muted-foreground">
                        This is the maximum load agreed with your electricity provider. Exceeding this causes penalties.
                      </p>
                    </div>

                    {settings.contract_demand && settings.contract_demand > 0 && (
                      <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                        <p className="text-xs text-green-700 font-medium">
                          ✅ Contract demand set to {settings.contract_demand} kW
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex items-center gap-4">
                  <Button onClick={handleSave} disabled={isSaving} className="px-8">
                    {isSaving ? 'Saving...' : 'Save Settings'}
                  </Button>
                  {saveSuccess && (
                    <p className="text-sm text-green-600 font-medium">✅ Settings saved successfully!</p>
                  )}
                </div>
              </>
            )}

            {/* Alert Preferences Tab */}
            {activeTab === 'alerts' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Alert Preferences
                  </CardTitle>
                  <CardDescription>
                    Configure how you want to be notified
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-muted/50 border border-border p-6 text-center">
                    <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground">Email & SMS Alerts</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Get notified when predicted load exceeds contract demand
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3 py-1">
                      <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                      <span className="text-xs text-blue-700 font-medium">Coming Soon</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Integrations Tab */}
            {activeTab === 'integrations' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Integrations
                  </CardTitle>
                  <CardDescription>
                    Connect external data sources
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'SCADA System', desc: 'Auto-import real-time load data from your factory SCADA', status: 'Coming Soon' },
                    { name: 'Raw Material Pricing API', desc: 'Integrate commodity prices to improve prediction accuracy', status: 'Coming Soon' },
                    { name: 'Weather API', desc: 'Use temperature data to account for seasonal load variations', status: 'Coming Soon' },
                    { name: 'ERP System', desc: 'Sync production schedule from SAP or other ERP systems', status: 'Coming Soon' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 ml-4 flex-shrink-0">
                        <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                        <span className="text-xs text-blue-700 font-medium">Coming Soon</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Security
                  </CardTitle>
                  <CardDescription>
                    Manage your account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account', status: 'Managed by Clerk' },
                    { name: 'Active Sessions', desc: 'View and manage your active login sessions', status: 'Managed by Clerk' },
                    { name: 'Password Management', desc: 'Change or reset your account password', status: 'Managed by Clerk' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-3 py-1 ml-4 flex-shrink-0">
                        <span className="h-2 w-2 rounded-full bg-green-400"></span>
                        <span className="text-xs text-green-700 font-medium">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </main>
    </div>
  )
}
