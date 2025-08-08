import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  gradient?: boolean
  glass?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, gradient, glass, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-200',
          gradient && 'bg-gradient-to-br from-white to-gray-50',
          glass && 'glass-effect',
          'hover:shadow-md hover:border-gray-200',
          className,
        )}
        {...props}>
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'
