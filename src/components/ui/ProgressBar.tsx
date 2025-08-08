import { cn } from '@/utils/cn'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export const ProgressBar = ({
  currentStep,
  totalSteps,
  className,
}: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className={cn('w-full', className)}>
      <div className='flex justify-between text-sm text-gray-600 mb-2'>
        <span>
          Paso {currentStep} de {totalSteps}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
        <div
          className='h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300 ease-out'
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
