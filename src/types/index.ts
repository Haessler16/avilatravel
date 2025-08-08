export interface TripInfo {
  destination: string
  departureDate: string
  returnDate: string
  passengers: number
}

export interface TravelerInfo {
  name: string
  email: string
  phone: string
  documentType: 'passport' | 'id'
  documentNumber: string
}

export interface AdditionalServices {
  insurance: boolean
  extraLuggage: boolean
  priorityBoarding: boolean
  mealPreference?: string
}

export interface TravelFormData {
  tripInfo: TripInfo
  travelerInfo: TravelerInfo
  services: AdditionalServices
}
