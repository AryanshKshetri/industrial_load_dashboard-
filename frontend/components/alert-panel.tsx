import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, AlertTriangle } from 'lucide-react'

interface AlertPanelProps {
  isExceeding?: boolean
}

export function AlertPanel({ isExceeding = false }: AlertPanelProps) {
  return (
    <Card className={isExceeding ? 'border-destructive/30 bg-red-50/30' : 'border-green-200/30 bg-green-50/30'}>
      <CardHeader>
        <CardTitle className="text-base">Smart Alert</CardTitle>
        <CardDescription>Real-time demand status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isExceeding ? (
            <div className="flex gap-3">
              <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-destructive">Risk Alert</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Predicted load may exceed contract demand on Wednesday. Review forecasting settings.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-700">All Clear</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Predicted loads remain safely within contract limits for the next 7 days.
                </p>
              </div>
            </div>
          )}
          
          <div className={`rounded-md p-2.5 text-xs ${
            isExceeding 
              ? 'bg-red-100 text-red-900' 
              : 'bg-green-100 text-green-900'
          }`}>
            <span className="font-semibold">Last Updated:</span> 2 minutes ago
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2 font-medium">Status Indicators:</p>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Margin available: 5.3%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Data points analyzed: 720</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span>Model confidence: 94.2%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
