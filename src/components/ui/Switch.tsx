import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface SwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  className?: string
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    { checked = false, onChange, label, description, disabled, className },
    ref,
  ) => {
    return (
      <div className={cn('flex items-start space-x-3', className)}>
        <button
          ref={ref}
          type='button'
          onClick={() => onChange?.(!checked)}
          disabled={disabled}
          className={cn(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            checked ? 'bg-primary-500' : 'bg-gray-200',
            disabled && 'opacity-50 cursor-not-allowed',
          )}>
          <span
            className={cn(
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out shadow-lg',
              checked ? 'translate-x-6' : 'translate-x-1',
            )}
          />
        </button>
        {(label || description) && (
          <div className='flex-1'>
            {label && (
              <p className='text-sm font-medium text-gray-900'>{label}</p>
            )}
            {description && (
              <p className='text-sm text-gray-500'>{description}</p>
            )}
          </div>
        )}
      </div>
    )
  },
)

Switch.displayName = 'Switch'
