'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Card } from '@/components/ui/Card'
import { useBookingForm } from '@/hooks/useBookingForm'
import { TripInfoStep } from './TripInfoStep'
import { TravelersStep } from './TravelersStep'
import { ServicesStep } from './ServicesStep'
import { SummaryStep } from './SummaryStep'

export const BookingWizard = () => {
  const {
    currentStep,
    formData,
    isLoading,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    pricing,
    destinations,
    getFlightsForDestination,
    totalSteps,
  } = useBookingForm()

  const steps = [
    {
      id: 1,
      title: 'Información del viaje',
      component: TripInfoStep,
    },
    {
      id: 2,
      title: 'Información de viajeros',
      component: TravelersStep,
    },
    {
      id: 3,
      title: 'Servicios adicionales',
      component: ServicesStep,
    },
    {
      id: 4,
      title: 'Resumen y confirmación',
      component: SummaryStep,
    },
  ]

  const currentStepData = steps.find((step) => step.id === currentStep)
  const CurrentStepComponent = currentStepData?.component

  // Renderizar el componente según el paso actual
  const renderStepComponent = () => {
    if (!CurrentStepComponent) return null

    switch (currentStep) {
      case 1:
        return (
          <TripInfoStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
            destinations={destinations || []}
            getFlightsForDestination={getFlightsForDestination}
          />
        )
      case 4:
        return (
          <SummaryStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
            pricing={pricing}
            goToStep={goToStep}
          />
        )
      case 2:
        return (
          <TravelersStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 3:
        return (
          <ServicesStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
        <Card className='p-8 text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4'></div>
          <p className='text-gray-600'>Cargando destinos disponibles...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-gray-900'>
      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold text-gradient mb-4'>
            Globetrotter
          </h1>
          <p className='text-xl text-gray-700 mb-8'>
            Tu próxima aventura comienza aquí
          </p>

          {/* Progress Bar */}
          <div className='max-w-md mx-auto'>
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        </div>

        {/* Step Navigation */}
        <div className='max-w-4xl mx-auto mb-8'>
          <div className='flex justify-center space-x-2 md:space-x-4'>
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => goToStep(step.id)}
                disabled={step.id > currentStep}
                className={`p-2 md:p-3 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 ${
                  step.id === currentStep
                    ? 'bg-primary-500 text-white shadow-lg transform scale-105'
                    : step.id < currentStep
                    ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}>
                <div className='flex items-center space-x-2'>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step.id === currentStep
                        ? 'bg-white text-primary-500'
                        : step.id < currentStep
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                    {step.id}
                  </div>
                  <span className='hidden md:inline'>{step.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className='max-w-4xl mx-auto'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}>
              {renderStepComponent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
