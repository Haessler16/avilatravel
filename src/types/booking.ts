export interface Flight {
  id: string
  destination: string
  departure_date: string
  return_date: string
  flight_class: 'economy' | 'business' | 'first'
  price: number
}

export interface Traveler {
  id: string
  fullName: string
  birthDate: string
  documentType: 'passport' | 'id' | 'driver_license'
  documentNumber: string
}

export interface BookingForm {
  // Step 1: Trip Information
  destination: string
  departureDate: string
  returnDate: string
  flightClass: 'economy' | 'business' | 'first'

  // Step 2: Travelers Information
  numberOfTravelers: number
  travelers: Traveler[]

  // Pets
  hasPets: boolean
  numberOfPets: number

  // Extra Luggage
  hasExtraLuggage: boolean
  numberOfExtraLuggage: number

  // Step 3: Additional Services
  travelInsurance: boolean
  preferredSeats: boolean
  specialAssistance: boolean
  assistanceNote: string
}

export interface BookingStep {
  id: number
  title: string
  description: string
  component: React.ComponentType<BookingStepProps>
}

export interface BookingStepProps {
  data: BookingForm
  updateData: (data: Partial<BookingForm>) => void
  onNext: () => void
  onPrev: () => void
  isLoading?: boolean
}

export interface BookingSummary {
  destination: string
  departureDate: string
  returnDate: string
  flightClass: string
  numberOfTravelers: number
  totalPrice: number
  breakdown: {
    flightPrice: number
    petsPrice: number
    extraLuggagePrice: number
    servicesPrice: number
  }
}

export const DOCUMENT_TYPES = [
  { value: 'passport', label: 'Pasaporte' },
  { value: 'id', label: 'Cédula de Identidad' },
  { value: 'driver_license', label: 'Licencia de Conducir' },
] as const

export const FLIGHT_CLASSES = [
  { value: 'economy', label: 'Económica' },
  { value: 'business', label: 'Ejecutiva' },
  { value: 'first', label: 'Primera Clase' },
] as const
