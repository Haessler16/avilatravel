import { Users, Plus, Minus, PawPrint, Luggage } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Switch } from '@/components/ui/Switch'
import { BookingStepProps, DOCUMENT_TYPES, Traveler } from '@/types/booking'

export const TravelersStep = ({
  data,
  updateData,
  onNext,
  onPrev,
}: BookingStepProps) => {
  const updateTraveler = (index: number, updates: Partial<Traveler>) => {
    const updatedTravelers = data.travelers.map((traveler, i) =>
      i === index ? { ...traveler, ...updates } : traveler,
    )
    updateData({ travelers: updatedTravelers })
  }

  const incrementTravelers = () => {
    if (data.numberOfTravelers < 10) {
      updateData({ numberOfTravelers: data.numberOfTravelers + 1 })
    }
  }

  const decrementTravelers = () => {
    if (data.numberOfTravelers > 1) {
      updateData({ numberOfTravelers: data.numberOfTravelers - 1 })
    }
  }

  const isValid =
    data.travelers.every(
      (t) => t.fullName && t.birthDate && t.documentType && t.documentNumber,
    ) && data.travelers.length === data.numberOfTravelers

  return (
    <div className='space-y-8 animate-fade-in'>
      {/* Header */}
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-gradient mb-2'>
          Información de viajeros
        </h2>
        <p className='text-gray-600'>
          Cuéntanos quiénes van a disfrutar de este viaje
        </p>
      </div>

      {/* Number of Travelers */}
      <Card className='p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <Users className='h-6 w-6 text-primary-500' />
            <div>
              <h3 className='font-semibold text-gray-900'>
                Número de viajeros
              </h3>
              <p className='text-sm text-gray-500'>Mínimo 1, máximo 10</p>
            </div>
          </div>
          <div className='flex items-center space-x-3'>
            <button
              onClick={decrementTravelers}
              disabled={data.numberOfTravelers <= 1}
              className='w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'>
              <Minus className='h-4 w-4' />
            </button>
            <span className='text-2xl font-bold text-gray-900 w-12 text-center'>
              {data.numberOfTravelers}
            </span>
            <button
              onClick={incrementTravelers}
              disabled={data.numberOfTravelers >= 10}
              className='w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'>
              <Plus className='h-4 w-4' />
            </button>
          </div>
        </div>
      </Card>

      {/* Travelers Information */}
      <div className='space-y-6'>
        {data.travelers.map((traveler, index) => (
          <Card
            key={traveler.id}
            className='p-6 animate-slide-up'
            style={{ animationDelay: `${index * 100}ms` }}>
            <h3 className='font-semibold text-gray-900 mb-4 flex items-center'>
              <div className='w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3'>
                {index + 1}
              </div>
              Viajero {index + 1}
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                label='Nombre completo'
                placeholder='Ingresa el nombre completo'
                value={traveler.fullName}
                onChange={(e) =>
                  updateTraveler(index, { fullName: e.target.value })
                }
              />
              <Input
                label='Fecha de nacimiento'
                type='date'
                value={traveler.birthDate}
                onChange={(e) =>
                  updateTraveler(index, { birthDate: e.target.value })
                }
              />
              <Select
                label='Tipo de documento'
                value={traveler.documentType}
                onChange={(e) =>
                  updateTraveler(index, { documentType: e.target.value as any })
                }
                options={DOCUMENT_TYPES}
                placeholder='Selecciona el tipo'
              />
              <Input
                label='Número de documento'
                placeholder='Ingresa el número'
                value={traveler.documentNumber}
                onChange={(e) =>
                  updateTraveler(index, { documentNumber: e.target.value })
                }
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Options */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Pets */}
        <Card className='p-6'>
          <Switch
            checked={data.hasPets}
            onChange={(checked) =>
              updateData({ hasPets: checked, numberOfPets: checked ? 1 : 0 })
            }
            label='¿Viajas con mascotas?'
            description='Costo adicional de $100 por mascota'
          />

          {data.hasPets && (
            <div className='mt-4 animate-slide-up'>
              <div className='flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200'>
                <div className='flex items-center space-x-3'>
                  <PawPrint className='h-5 w-5 text-amber-600' />
                  <span className='font-medium text-amber-900'>
                    Cantidad de mascotas
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  <button
                    onClick={() =>
                      updateData({
                        numberOfPets: Math.max(0, data.numberOfPets - 1),
                      })
                    }
                    disabled={data.numberOfPets <= 1}
                    className='w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center hover:bg-amber-300 disabled:opacity-50 transition-colors duration-200'>
                    <Minus className='h-3 w-3' />
                  </button>
                  <span className='font-bold text-amber-900 w-8 text-center'>
                    {data.numberOfPets}
                  </span>
                  <button
                    onClick={() =>
                      updateData({ numberOfPets: data.numberOfPets + 1 })
                    }
                    className='w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center hover:bg-amber-300 transition-colors duration-200'>
                    <Plus className='h-3 w-3' />
                  </button>
                </div>
              </div>
              <p className='text-sm text-amber-700 mt-2'>
                Costo total: ${data.numberOfPets * 100}
              </p>
            </div>
          )}
        </Card>

        {/* Extra Luggage */}
        <Card className='p-6'>
          <Switch
            checked={data.hasExtraLuggage}
            onChange={(checked) =>
              updateData({
                hasExtraLuggage: checked,
                numberOfExtraLuggage: checked ? 1 : 0,
              })
            }
            label='¿Necesitas maletas extra?'
            description='Costo adicional de $50 por maleta'
          />

          {data.hasExtraLuggage && (
            <div className='mt-4 animate-slide-up'>
              <div className='flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200'>
                <div className='flex items-center space-x-3'>
                  <Luggage className='h-5 w-5 text-blue-600' />
                  <span className='font-medium text-blue-900'>
                    Maletas extra
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  <button
                    onClick={() =>
                      updateData({
                        numberOfExtraLuggage: Math.max(
                          0,
                          data.numberOfExtraLuggage - 1,
                        ),
                      })
                    }
                    disabled={data.numberOfExtraLuggage <= 1}
                    className='w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center hover:bg-blue-300 disabled:opacity-50 transition-colors duration-200'>
                    <Minus className='h-3 w-3' />
                  </button>
                  <span className='font-bold text-blue-900 w-8 text-center'>
                    {data.numberOfExtraLuggage}
                  </span>
                  <button
                    onClick={() =>
                      updateData({
                        numberOfExtraLuggage: data.numberOfExtraLuggage + 1,
                      })
                    }
                    className='w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center hover:bg-blue-300 transition-colors duration-200'>
                    <Plus className='h-3 w-3' />
                  </button>
                </div>
              </div>
              <p className='text-sm text-blue-700 mt-2'>
                Costo total: ${data.numberOfExtraLuggage * 50}
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Navigation */}
      <div className='flex justify-between'>
        <Button onClick={onPrev} variant='outline' size='lg' className='px-8'>
          Anterior
        </Button>
        <Button onClick={onNext} disabled={!isValid} size='lg' className='px-8'>
          Continuar
        </Button>
      </div>
    </div>
  )
}
