import type { ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-card border border-navy-700 bg-navy-800 ${className}`}>{children}</div>
  )
}
