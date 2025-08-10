import { useState, useEffect } from 'react'
import { MapPin, Calendar, Plane } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import {
  BookingStepProps,
  Flight,
  FLIGHT_CLASSES,
  FlightClass,
} from '@/types/booking'

interface TripInfoStepProps extends BookingStepProps {
  destinations: string[]
  getFlightsForDestination: (destination: string) => any[]
}

export const TripInfoStep = ({
  data,
  updateData,
  onNext,
  destinations,
  getFlightsForDestination,
}: TripInfoStepProps) => {
  const [filteredDestinations, setFilteredDestinations] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedFlights, setSelectedFlights] = useState<Flight[]>([])

  // Filter destinations based on input
  useEffect(() => {
    if (data.destination) {
      const filtered = destinations.filter((dest) =>
        dest.toLowerCase().includes(data.destination.toLowerCase()),
      )
      setFilteredDestinations(filtered)
      setSelectedFlights(getFlightsForDestination(data.destination))
    } else {
      setFilteredDestinations([])
      setSelectedFlights([])
    }
  }, [data.destination, destinations, getFlightsForDestination])

  const handleDestinationChange = (value: string) => {
    updateData({ destination: value })
    setShowSuggestions(value.length > 0)
  }

  const selectDestination = (destination: string) => {
    updateData({ destination })
    setShowSuggestions(false)
  }

  const isValid =
    data.destination &&
    data.departureDate &&
    data.returnDate &&
    data.flightClass

  return (
    <div className='space-y-8 animate-fade-in'>
      {/* Header */}
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-gradient mb-2'>
          ¿A dónde quieres viajar?
        </h2>
        <p className='text-gray-600'>
          Cuéntanos los detalles de tu próxima aventura
        </p>
      </div>

      <div className='grid md:grid-cols-2 gap-6'>
        {/* Destination Input with Autocomplete */}
        <Card className='p-6 md:col-span-2'>
          <div className='relative'>
            <Input
              label='Destino'
              placeholder='¿A dónde quieres ir?'
              value={data.destination}
              onChange={(e) => handleDestinationChange(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              icon={<MapPin className='h-5 w-5' />}
            />

            {/* Destination Suggestions */}
            {showSuggestions && filteredDestinations.length > 0 && (
              <div className='absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto'>
                {filteredDestinations.slice(0, 8).map((destination) => (
                  <button
                    key={destination}
                    onClick={() => selectDestination(destination)}
                    className='w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl transition-colors duration-150 flex items-center space-x-2'>
                    <MapPin className='h-4 w-4 text-primary-500' />
                    <span>{destination}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Departure Date */}
        <Card className='p-6'>
          <Input
            label='Fecha de salida'
            type='date'
            value={data.departureDate}
            onChange={(e) => updateData({ departureDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            icon={<Calendar className='h-5 w-5' />}
          />
        </Card>

        {/* Return Date */}
        <Card className='p-6'>
          <Input
            label='Fecha de regreso'
            type='date'
            value={data.returnDate}
            onChange={(e) => updateData({ returnDate: e.target.value })}
            min={data.departureDate || new Date().toISOString().split('T')[0]}
            icon={<Calendar className='h-5 w-5' />}
          />
        </Card>

        {/* Flight Class Selection */}
        <Card className='p-6 md:col-span-2'>
          <label className='block text-sm font-medium text-gray-700 mb-4'>
            Clase de vuelo
          </label>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {FLIGHT_CLASSES.map((flightClass) => {
              const isSelected = data.flightClass === flightClass.value
              const price =
                selectedFlights.find((f) => f.class === flightClass.value)
                  ?.priceUSD || 0

              return (
                <button
                  key={flightClass.value}
                  onClick={() =>
                    updateData({
                      flightClass: flightClass.value as FlightClass,
                    })
                  }
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-100 transform scale-105'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}>
                  <div className='flex items-center justify-between mb-2'>
                    <Plane
                      className={`h-5 w-5 ${
                        isSelected ? 'text-primary-600' : 'text-gray-400'
                      }`}
                    />
                    {isSelected && (
                      <div className='w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center'>
                        <div className='w-2 h-2 bg-white rounded-full'></div>
                      </div>
                    )}
                  </div>
                  <h3
                    className={`font-semibold ${
                      isSelected ? 'text-primary-900' : 'text-gray-900'
                    }`}>
                    {flightClass.label}
                  </h3>
                  {price > 0 && (
                    <p
                      className={`text-sm ${
                        isSelected ? 'text-primary-700' : 'text-gray-600'
                      }`}>
                      ${price.toLocaleString()}
                    </p>
                  )}
                </button>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Flight Information Preview */}
      {data.destination && selectedFlights.length > 0 && (
        <Card className='p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 animate-slide-up'>
          <h3 className='font-semibold text-blue-900 mb-4 flex items-center'>
            <Plane className='h-5 w-5 mr-2' />
            Vuelos disponibles para {data.destination}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {FLIGHT_CLASSES.map((flightClass) => {
              const flight = selectedFlights.find(
                (f) => f.class === flightClass.value,
              )

              return flight ? (
                <div
                  key={flightClass.value}
                  className={`p-3 rounded-lg ${
                    data.flightClass === flightClass.value
                      ? 'bg-blue-200 border border-blue-300'
                      : 'bg-white border border-blue-100'
                  }`}>
                  <p className='font-medium text-blue-900'>
                    {flightClass.label}
                  </p>
                  <p className='text-lg font-bold text-blue-700'>
                    ${flight.priceUSD.toLocaleString()}
                  </p>
                </div>
              ) : null
            })}
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className='flex justify-end'>
        <Button onClick={onNext} disabled={!isValid} size='lg' className='px-8'>
          Continuar
        </Button>
      </div>
    </div>
  )
}
