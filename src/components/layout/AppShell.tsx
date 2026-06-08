import type { ReactNode } from 'react'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-navy-900 text-slate-100">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4">{children}</div>
    </div>
  )
}
