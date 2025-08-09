export interface Flight {
  id: string
  destination: string
  departure_date: string
  return_date: string
  flight_class: FlightClass
  price: number
}

export interface Traveler {
  id: string
  fullName: string
  birthDate: string
  documentType: DocumentType
  documentNumber: string
}

export interface BookingForm {
  // Step 1: Trip Information
  destination: string
  departureDate: string
  returnDate: string
  flightClass: FlightClass

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

export type SelectOption<T = string> = {
  value: T
  label: string
}

export type DocumentType = 'passport' | 'id' | 'driver_license'
export type FlightClass = 'economy' | 'business' | 'first'

export const DOCUMENT_TYPES: SelectOption<DocumentType>[] = [
  { value: 'passport', label: 'Pasaporte' },
  { value: 'id', label: 'Cédula de Identidad' },
  { value: 'driver_license', label: 'Licencia de Conducir' },
]

export const FLIGHT_CLASSES: SelectOption<FlightClass>[] = [
  { value: 'economy', label: 'Económica' },
  { value: 'business', label: 'Ejecutiva' },
  { value: 'first', label: 'Primera Clase' },
]
