import type { ReactNode } from 'react'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    // Mobile: full-bleed. Larger screens: a centered phone-width panel on a
    // darker backdrop, so the surrounding space reads as an intentional frame.
    <div className="min-h-dvh bg-navy-950 sm:flex sm:justify-center sm:py-6">
      <div className="flex min-h-dvh w-full max-w-md flex-col bg-navy-900 px-4 sm:min-h-[calc(100dvh-3rem)] sm:rounded-[28px] sm:border sm:border-navy-800 sm:px-5 sm:shadow-2xl">
        {children}
      </div>
    </div>
  )
}
