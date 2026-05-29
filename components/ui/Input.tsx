'use client'

import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

const inputClasses =
  'w-full border border-border rounded-lg px-[14px] py-[10px] text-sm bg-white text-accent placeholder:text-[#a0a0a0] focus:outline-none focus:border-indigo-500 focus:ring-[3px] focus:ring-indigo-500/20 transition-all duration-150'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = '', ...props }: InputProps) {
  return <input className={`${inputClasses} ${className}`} {...props} />
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className = '', ...props }: TextareaProps) {
  return <textarea className={`${inputClasses} resize-y min-h-[80px] ${className}`} {...props} />
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
}

export function Select({ className = '', children, ...props }: SelectProps) {
  return (
    <select className={`${inputClasses} ${className}`} {...props}>
      {children}
    </select>
  )
}
