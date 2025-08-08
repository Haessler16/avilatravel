import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className='w-full'>
        {label && (
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            {label}
          </label>
        )}
        <div className='relative'>
          {icon && (
            <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200',
              'focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none',
              'hover:border-gray-300',
              icon && 'pl-10',
              error && 'border-red-300 focus:border-red-500 focus:ring-red-100',
              className,
            )}
            {...props}
          />
        </div>
        {error && (
          <p className='mt-1 text-sm text-red-600 animate-fade-in'>{error}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
