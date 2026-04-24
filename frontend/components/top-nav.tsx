'use client'

import { UserButton } from '@clerk/nextjs'
import { Bell, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function TopNav() {
  const router = useRouter()
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">IL</span>
            </div>
            <h1 className="text-lg font-semibold text-foreground">Industrial Load Intelligence</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => router.push('/settings')}>
              <Settings className="h-5 w-5" />
            </Button>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  )
}
