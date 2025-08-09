import { SelectHTMLAttributes, forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

import { SelectOption } from '@/types/booking'

interface SelectProps<T = string>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string
  error?: string
  options: SelectOption<T>[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps<any>>(
  ({ className, label, error, options, placeholder, ...props }, ref) => {
    return (
      <div className='w-full'>
        {label && (
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            {label}
          </label>
        )}
        <div className='relative'>
          <select
            ref={ref}
            className={cn(
              'w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 transition-all duration-200 appearance-none cursor-pointer',
              'focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none',
              'hover:border-gray-300',
              error && 'border-red-300 focus:border-red-500 focus:ring-red-100',
              className,
            )}
            {...props}>
            {placeholder && (
              <option value='' disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none' />
        </div>
        {error && (
          <p className='mt-1 text-sm text-red-600 animate-fade-in'>{error}</p>
        )}
      </div>
    )
  },
)

Select.displayName = 'Select'
