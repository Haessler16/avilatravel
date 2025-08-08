import { useState } from 'react'
import {
  MapPin,
  Calendar,
  Users,
  Plane,
  PawPrint,
  Luggage,
  Shield,
  Armchair,
  Heart,
  CheckCircle,
  Sparkles,
  Edit,
  DollarSign,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { BookingStepProps, DOCUMENT_TYPES } from '@/types/booking'

interface SummaryStepProps extends BookingStepProps {
  pricing: {
    flightPrice: number
    petsPrice: number
    extraLuggagePrice: number
    servicesPrice: number
    totalPrice: number
  }
  goToStep: (step: number) => void
}

export const SummaryStep = ({
  data,
  onPrev,
  pricing,
  goToStep,
}: SummaryStepProps) => {
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleConfirmBooking = async () => {
    setIsConfirming(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsConfirming(false)
    setIsConfirmed(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getClassLabel = (flightClass: string) => {
    const labels = {
      economy: 'Económica',
      business: 'Ejecutiva',
      first: 'Primera Clase',
    }
    return labels[flightClass as keyof typeof labels]
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--
    }

    return age
  }

  if (isConfirmed) {
    return (
      <div className='text-center space-y-8 animate-fade-in'>
        <div className='animate-scale-in'>
          <div className='mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-gentle'>
            <CheckCircle className='h-12 w-12 text-green-600' />
          </div>
          <h2 className='text-4xl font-bold text-green-600 mb-2'>
            ¡Reserva confirmada!
          </h2>
          <p className='text-xl text-gray-600'>
            Tu aventura está a punto de comenzar
          </p>
        </div>

        <Card className='p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'>
          <div className='flex items-center justify-center space-x-2 mb-4'>
            <Sparkles className='h-6 w-6 text-green-600' />
            <h3 className='text-xl font-semibold text-green-900'>
              Detalles de tu reserva
            </h3>
          </div>
          <div className='text-center space-y-2'>
            <p className='text-green-800'>
              <strong>{data.destination}</strong> •{' '}
              {formatDate(data.departureDate)}
            </p>
            <p className='text-green-700'>
              {data.numberOfTravelers} viajero
              {data.numberOfTravelers > 1 ? 's' : ''} • Clase{' '}
              {getClassLabel(data.flightClass)}
            </p>
            <p className='text-2xl font-bold text-green-600'>
              Total: ${pricing.totalPrice.toLocaleString()}
            </p>
          </div>
        </Card>

        <Button
          onClick={() => window.location.reload()}
          variant='outline'
          size='lg'
          className='px-8'>
          Nueva reserva
        </Button>
      </div>
    )
  }

  return (
    <div className='space-y-8 animate-fade-in'>
      {/* Header */}
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-gradient mb-2'>
          Resumen de tu reserva
        </h2>
        <p className='text-gray-600'>
          Revisa todos los detalles antes de confirmar
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Trip Details */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Flight Information */}
          <Card className='p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-xl font-semibold text-gray-900 flex items-center'>
                <Plane className='h-5 w-5 mr-2 text-primary-500' />
                Información del vuelo
              </h3>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => goToStep(1)}
                className='text-primary-600 hover:text-primary-700'>
                <Edit className='h-4 w-4 mr-1' />
                Editar
              </Button>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <MapPin className='h-4 w-4 text-gray-400' />
                <span className='text-gray-900'>
                  Destino: <strong>{data.destination}</strong>
                </span>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex items-center space-x-3'>
                  <Calendar className='h-4 w-4 text-gray-400' />
                  <div>
                    <p className='text-sm text-gray-600'>Salida</p>
                    <p className='font-medium'>
                      {formatDate(data.departureDate)}
                    </p>
                  </div>
                </div>
                <div className='flex items-center space-x-3'>
                  <Calendar className='h-4 w-4 text-gray-400' />
                  <div>
                    <p className='text-sm text-gray-600'>Regreso</p>
                    <p className='font-medium'>{formatDate(data.returnDate)}</p>
                  </div>
                </div>
              </div>
              <div className='flex items-center space-x-3'>
                <Plane className='h-4 w-4 text-gray-400' />
                <span className='text-gray-900'>
                  Clase: <strong>{getClassLabel(data.flightClass)}</strong>
                </span>
              </div>
            </div>
          </Card>

          {/* Travelers Information */}
          <Card className='p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-xl font-semibold text-gray-900 flex items-center'>
                <Users className='h-5 w-5 mr-2 text-primary-500' />
                Viajeros ({data.numberOfTravelers})
              </h3>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => goToStep(2)}
                className='text-primary-600 hover:text-primary-700'>
                <Edit className='h-4 w-4 mr-1' />
                Editar
              </Button>
            </div>
            <div className='space-y-3'>
              {data.travelers.map((traveler, index) => (
                <div
                  key={traveler.id}
                  className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                  <div>
                    <p className='font-medium text-gray-900'>
                      {traveler.fullName}
                    </p>
                    <p className='text-sm text-gray-600'>
                      {calculateAge(traveler.birthDate)} años •{' '}
                      {
                        DOCUMENT_TYPES.find(
                          (doc) => doc.value === traveler.documentType,
                        )?.label
                      }
                    </p>
                  </div>
                  <div className='text-sm text-gray-500'>
                    Viajero {index + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Items */}
            {(data.hasPets || data.hasExtraLuggage) && (
              <div className='mt-4 pt-4 border-t border-gray-200'>
                {data.hasPets && (
                  <div className='flex items-center space-x-3 mb-2'>
                    <PawPrint className='h-4 w-4 text-amber-500' />
                    <span className='text-gray-900'>
                      {data.numberOfPets} mascota
                      {data.numberOfPets > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                {data.hasExtraLuggage && (
                  <div className='flex items-center space-x-3'>
                    <Luggage className='h-4 w-4 text-blue-500' />
                    <span className='text-gray-900'>
                      {data.numberOfExtraLuggage} maleta
                      {data.numberOfExtraLuggage > 1 ? 's' : ''} extra
                    </span>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Services */}
          {(data.travelInsurance ||
            data.preferredSeats ||
            data.specialAssistance) && (
            <Card className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-xl font-semibold text-gray-900 flex items-center'>
                  <Sparkles className='h-5 w-5 mr-2 text-primary-500' />
                  Servicios adicionales
                </h3>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => goToStep(3)}
                  className='text-primary-600 hover:text-primary-700'>
                  <Edit className='h-4 w-4 mr-1' />
                  Editar
                </Button>
              </div>
              <div className='space-y-3'>
                {data.travelInsurance && (
                  <div className='flex items-center space-x-3'>
                    <Shield className='h-4 w-4 text-emerald-500' />
                    <span className='text-gray-900'>Seguro de viaje</span>
                  </div>
                )}
                {data.preferredSeats && (
                  <div className='flex items-center space-x-3'>
                    <Armchair className='h-4 w-4 text-blue-500' />
                    <span className='text-gray-900'>
                      Asientos preferenciales
                    </span>
                  </div>
                )}
                {data.specialAssistance && (
                  <div className='flex items-center space-x-3'>
                    <Heart className='h-4 w-4 text-purple-500' />
                    <span className='text-gray-900'>Asistencia especial</span>
                  </div>
                )}
                {data.assistanceNote && (
                  <div className='mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200'>
                    <p className='text-sm text-purple-900'>
                      <strong>Nota de asistencia:</strong> {data.assistanceNote}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Price Breakdown */}
        <div className='lg:col-span-1'>
          <Card className='p-6 sticky top-6'>
            <h3 className='text-xl font-semibold text-gray-900 mb-6 flex items-center'>
              <DollarSign className='h-5 w-5 mr-2 text-primary-500' />
              Resumen de costos
            </h3>

            <div className='space-y-4'>
              {/* Flight Cost */}
              <div className='flex justify-between items-center'>
                <div>
                  <p className='font-medium text-gray-900'>Vuelos</p>
                  <p className='text-sm text-gray-600'>
                    {data.numberOfTravelers} viajero
                    {data.numberOfTravelers > 1 ? 's' : ''} •{' '}
                    {getClassLabel(data.flightClass)}
                  </p>
                </div>
                <p className='font-bold text-gray-900'>
                  ${pricing.flightPrice.toLocaleString()}
                </p>
              </div>

              {/* Pets Cost */}
              {data.hasPets && (
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-medium text-gray-900'>Mascotas</p>
                    <p className='text-sm text-gray-600'>
                      {data.numberOfPets} mascota
                      {data.numberOfPets > 1 ? 's' : ''} × $100
                    </p>
                  </div>
                  <p className='font-bold text-gray-900'>
                    ${pricing.petsPrice.toLocaleString()}
                  </p>
                </div>
              )}

              {/* Extra Luggage Cost */}
              {data.hasExtraLuggage && (
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-medium text-gray-900'>Maletas extra</p>
                    <p className='text-sm text-gray-600'>
                      {data.numberOfExtraLuggage} maleta
                      {data.numberOfExtraLuggage > 1 ? 's' : ''} × $50
                    </p>
                  </div>
                  <p className='font-bold text-gray-900'>
                    ${pricing.extraLuggagePrice.toLocaleString()}
                  </p>
                </div>
              )}

              {/* Services Cost */}
              {pricing.servicesPrice > 0 && (
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-medium text-gray-900'>
                      Servicios adicionales
                    </p>
                    <div className='text-sm text-gray-600'>
                      {data.travelInsurance && <p>• Seguro de viaje</p>}
                      {data.preferredSeats && <p>• Asientos preferenciales</p>}
                      {data.specialAssistance && <p>• Asistencia especial</p>}
                    </div>
                  </div>
                  <p className='font-bold text-gray-900'>
                    ${pricing.servicesPrice.toLocaleString()}
                  </p>
                </div>
              )}

              {/* Divider */}
              <div className='border-t border-gray-200 pt-4'>
                <div className='flex justify-between items-center'>
                  <p className='text-xl font-bold text-gray-900'>Total</p>
                  <p className='text-2xl font-bold text-primary-600'>
                    ${pricing.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <Button
              onClick={handleConfirmBooking}
              loading={isConfirming}
              size='lg'
              className='w-full mt-6'>
              {isConfirming ? 'Procesando...' : 'Confirmar Reserva'}
            </Button>

            <p className='text-xs text-gray-500 text-center mt-3'>
              Al confirmar aceptas nuestros términos y condiciones
            </p>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className='flex justify-between lg:col-span-2'>
        <Button onClick={onPrev} variant='outline' size='lg' className='px-8'>
          Anterior
        </Button>
      </div>
    </div>
  )
}
