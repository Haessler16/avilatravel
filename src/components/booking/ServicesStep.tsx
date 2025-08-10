import { Shield, Armchair, Heart, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Switch } from '@/components/ui/Switch'
import { BookingStepProps } from '@/types/booking'

export const ServicesStep = ({
  data,
  updateData,
  onNext,
  onPrev,
}: BookingStepProps) => {
  const services = [
    {
      key: 'travelInsurance',
      icon: Shield,
      title: 'Seguro de viaje',
      description:
        'Protege tu inversión contra cancelaciones, emergencias médicas y más',
      price: 75,
      color: 'emerald',
      benefits: [
        'Cancelación por cualquier motivo',
        'Cobertura médica internacional',
        'Equipaje perdido o dañado',
        'Asistencia 24/7',
      ],
    },
    {
      key: 'preferredSeats',
      icon: Armchair,
      title: 'Asientos preferenciales',
      description:
        'Selecciona tus asientos favoritos con más espacio para las piernas',
      price: 25,
      color: 'blue',
      benefits: [
        'Más espacio para las piernas',
        'Embarque prioritario',
        'Selección de ubicación',
        'Comodidad garantizada',
      ],
    },
    {
      key: 'specialAssistance',
      icon: Heart,
      title: 'Asistencia especial',
      description: 'Servicios personalizados para necesidades especiales',
      price: 50,
      color: 'purple',
      benefits: [
        'Asistencia personalizada',
        'Silla de ruedas disponible',
        'Dietas especiales',
        'Cuidados médicos',
      ],
    },
  ]

  const getTotalServicesPrice = () => {
    let total = 0
    if (data.travelInsurance) total += 75 * data.numberOfTravelers
    if (data.preferredSeats) total += 25 * data.numberOfTravelers
    if (data.specialAssistance) total += 50
    return total
  }

  return (
    <div className='space-y-8 animate-fade-in'>
      {/* Header */}
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-gradient mb-2'>
          Servicios adicionales
        </h2>
        <p className='text-gray-600'>
          Mejora tu experiencia de viaje con nuestros servicios premium
        </p>
      </div>

      {/* Services Grid */}
      <div className='space-y-6'>
        {services.map((service, index) => {
          const Icon = service.icon
          const isSelected = data[service.key as keyof typeof data] as boolean
          const colorClasses = {
            emerald: {
              bg: 'bg-emerald-50',
              border: 'border-emerald-200',
              text: 'text-emerald-900',
              icon: 'text-emerald-600',
              accent: 'bg-emerald-500',
            },
            blue: {
              bg: 'bg-blue-50',
              border: 'border-blue-200',
              text: 'text-blue-900',
              icon: 'text-blue-600',
              accent: 'bg-blue-500',
            },
            purple: {
              bg: 'bg-purple-50',
              border: 'border-purple-200',
              text: 'text-purple-900',
              icon: 'text-purple-600',
              accent: 'bg-purple-500',
            },
          }
          const colors =
            colorClasses[service.color as keyof typeof colorClasses]

          return (
            <Card
              key={service.key}
              className={`p-6 transition-all duration-300 cursor-pointer animate-slide-up ${
                isSelected
                  ? `${colors.bg} ${colors.border} ring-2 ring-opacity-20 transform scale-[1.02]`
                  : 'hover:shadow-md hover:border-gray-200'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}>
              <div
                className='flex items-start justify-between mb-4'
                onClick={() => updateData({ [service.key]: !isSelected })}>
                <div className='flex items-center space-x-4'>
                  <div
                    className={`p-3 rounded-xl ${
                      isSelected ? colors.accent : 'bg-gray-100'
                    }`}>
                    <Icon
                      className={`h-6 w-6 ${
                        isSelected ? 'text-white' : 'text-gray-600'
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-semibold ${
                        isSelected ? colors.text : 'text-gray-900'
                      }`}>
                      {service.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        isSelected
                          ? colors.text + ' opacity-80'
                          : 'text-gray-600'
                      }`}>
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className='flex flex-col items-end space-y-2'>
                  <Switch
                    checked={isSelected}
                    onChange={(checked) =>
                      updateData({ [service.key]: checked })
                    }
                  />
                  <div className='text-right'>
                    <p
                      className={`text-lg font-bold ${
                        isSelected ? colors.text : 'text-gray-900'
                      }`}>
                      ${service.price}
                      {service.key !== 'specialAssistance' && (
                        <span className='text-sm font-normal'> / viajero</span>
                      )}
                    </p>
                    {service.key !== 'specialAssistance' && isSelected && (
                      <p className={`text-xs ${colors.text + ' opacity-70'}`}>
                        Total: ${service.price * data.numberOfTravelers}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {isSelected && (
                <div
                  className={`mt-4 p-4 rounded-xl ${colors.bg} border ${colors.border} animate-fade-in`}>
                  <h4 className={`font-medium ${colors.text} mb-2`}>
                    Beneficios incluidos:
                  </h4>
                  <ul className='space-y-1'>
                    {service.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className={`text-sm ${
                          colors.text + ' opacity-80'
                        } flex items-center`}>
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${colors.accent} mr-2`}></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {service.key === 'specialAssistance' && (
                    <div className='mt-4'>
                      <label
                        className={`block text-sm font-medium ${colors.text} mb-2`}>
                        Describe tus necesidades especiales (opcional)
                      </label>
                      <div className='relative'>
                        <textarea
                          value={data.assistanceNote}
                          onChange={(e) =>
                            updateData({
                              assistanceNote: e.target.value.slice(0, 200),
                            })
                          }
                          onClick={(e) => e.stopPropagation()}
                          onFocus={(e) => e.stopPropagation()}
                          placeholder='Describe cualquier asistencia especial que necesites...'
                          className={`w-full px-4 py-3 border ${colors.border} rounded-lg resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-20`}
                          rows={3}
                          maxLength={200}
                        />
                        <MessageSquare
                          className={`absolute top-3 right-3 h-4 w-4 ${colors.icon} opacity-50`}
                        />
                      </div>
                      <div
                        className={`text-xs ${
                          colors.text + ' opacity-60'
                        } mt-1 text-right`}>
                        {data.assistanceNote.length}/200 caracteres
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Services Summary */}
      {getTotalServicesPrice() > 0 && (
        <Card className='p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 animate-slide-up'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='font-semibold text-gray-900'>
                Resumen de servicios adicionales
              </h3>
              <p className='text-sm text-gray-600'>
                {data.numberOfTravelers} viajero
                {data.numberOfTravelers > 1 ? 's' : ''}
              </p>
            </div>
            <div className='text-right'>
              <p className='text-2xl font-bold text-primary-600'>
                ${getTotalServicesPrice().toLocaleString()}
              </p>
              <p className='text-xs text-gray-500'>Costo total adicional</p>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className='flex justify-between'>
        <Button onClick={onPrev} variant='outline' size='lg' className='px-8'>
          Anterior
        </Button>
        <Button onClick={onNext} size='lg' className='px-8'>
          Continuar al resumen
        </Button>
      </div>
    </div>
  )
}
