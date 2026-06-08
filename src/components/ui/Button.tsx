import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'ghost'

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base =
    'w-full rounded-xl px-5 py-3.5 text-base font-semibold transition active:scale-[0.99] disabled:opacity-40 disabled:active:scale-100'
  const styles =
    variant === 'primary'
      ? 'bg-accent text-white hover:bg-accent-600'
      : 'border border-navy-600 bg-navy-800 text-slate-200 hover:bg-navy-700'
  return <button className={`${base} ${styles} ${className}`} {...props} />
}
