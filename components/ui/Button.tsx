'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'icon'
  children: ReactNode
}

const base = 'inline-flex items-center justify-center gap-2 text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-[3px] focus:ring-indigo-500/20'

const variants: Record<string, string> = {
  primary: 'bg-accent text-white hover:bg-[#333] active:scale-[0.98] px-4 py-2 rounded-lg',
  ghost: 'bg-transparent border border-border text-muted hover:bg-bg hover:text-accent px-4 py-2 rounded-lg',
  icon: 'bg-transparent border-0 text-muted hover:bg-[#f0f0ee] p-[6px] rounded-md',
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
