import React from 'react'
import { Link } from '@inertiajs/react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  fullWidth?: boolean
}

/**
 * Button component - Reusable button component
 * Provides consistent styling and behavior for buttons across the application
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false
}: ButtonProps) {
  // Base button classes
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-public-primary text-white hover:bg-public-secondary shadow-sm hover:shadow-md focus-visible:ring-public-primary/60',
    secondary: 'bg-public-secondary text-white hover:bg-public-primary shadow-sm hover:shadow-md focus-visible:ring-public-secondary/60',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500/60',
    ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500/60'
  }
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-xl'
  }
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : ''
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  
  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClasses,
    disabledClasses,
    className
  ].filter(Boolean).join(' ')

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    )
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  )
}
