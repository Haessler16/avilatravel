import { useState, useCallback, useEffect } from 'react'
import { BookingForm, Flight, Traveler } from '@/types/booking'

const initialFormData: BookingForm = {
  destination: '',
  departureDate: '',
  returnDate: '',
  flightClass: 'Economy',
  numberOfTravelers: 1,
  travelers: [
    {
      id: 'traveler-1',
      fullName: '',
      birthDate: '',
      documentType: 'passport',
      documentNumber: '',
    },
  ],
  hasPets: false,
  numberOfPets: 0,
  hasExtraLuggage: false,
  numberOfExtraLuggage: 0,
  travelInsurance: false,
  preferredSeats: false,
  specialAssistance: false,
  assistanceNote: '',
}

export const useBookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<BookingForm>(initialFormData)
  const [flights, setFlights] = useState<Flight[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Fetch flights data
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          'https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json',
        )
        const data = await response.json()
        setFlights(data)
      } catch (error) {
        console.error('Error fetching flights:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFlights()
  }, [])

  // Update form data
  const updateFormData = useCallback((updates: Partial<BookingForm>) => {
    setFormData((prev) => {
      const newData = { ...prev, ...updates }

      // Auto-generate travelers array when numberOfTravelers changes
      if ('numberOfTravelers' in updates) {
        const numberOfTravelers = updates.numberOfTravelers || 1
        const currentTravelers = prev.travelers || []

        if (numberOfTravelers > currentTravelers.length) {
          // Add new travelers
          const newTravelers: Traveler[] = []
          for (let i = currentTravelers.length; i < numberOfTravelers; i++) {
            newTravelers.push({
              id: `traveler-${i + 1}`,
              fullName: '',
              birthDate: '',
              documentType: 'passport',
              documentNumber: '',
            })
          }
          newData.travelers = [...currentTravelers, ...newTravelers]
        } else if (numberOfTravelers < currentTravelers.length) {
          // Remove excess travelers
          newData.travelers = currentTravelers.slice(0, numberOfTravelers)
        }
      }

      return newData
    })
  }, [])

  // Update specific traveler
  const updateTraveler = useCallback(
    (index: number, traveler: Partial<Traveler>) => {
      setFormData((prev) => ({
        ...prev,
        travelers: prev.travelers.map((t, i) =>
          i === index ? { ...t, ...traveler } : t,
        ),
      }))
    },
    [],
  )

  // Navigation functions
  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 4))
  }, [])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }, [])

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, 4)))
  }, [])

  // Calculate pricing
  const calculatePricing = useCallback(() => {
    const selectedFlight = flights.find(
      (f) =>
        f.destination.toLowerCase() === formData.destination.toLowerCase() &&
        f.class === formData.flightClass,
    )

    const flightPrice = selectedFlight
      ? selectedFlight.priceUSD * formData.numberOfTravelers
      : 0
    const petsPrice = formData.hasPets ? formData.numberOfPets * 100 : 0
    const extraLuggagePrice = formData.hasExtraLuggage
      ? formData.numberOfExtraLuggage * 50
      : 0

    // Additional services pricing
    let servicesPrice = 0
    if (formData.travelInsurance)
      servicesPrice += 75 * formData.numberOfTravelers
    if (formData.preferredSeats)
      servicesPrice += 25 * formData.numberOfTravelers
    if (formData.specialAssistance) servicesPrice += 50

    const totalPrice =
      flightPrice + petsPrice + extraLuggagePrice + servicesPrice

    return {
      flightPrice,
      petsPrice,
      extraLuggagePrice,
      servicesPrice,
      totalPrice,
    }
  }, [formData, flights])

  // Get available destinations
  const getDestinations = useCallback(() => {
    return Array.from(new Set(flights.map((f) => f.destination))).sort()
  }, [flights])

  // Get flights for selected destination
  const getFlightsForDestination = useCallback(
    (destination: string) => {
      return flights.filter(
        (f) => f.destination.toLowerCase() === destination.toLowerCase(),
      )
    },
    [flights],
  )

  // Validation functions
  const validateStep = useCallback(
    (step: number) => {
      switch (step) {
        case 1:
          return !!(
            formData.destination &&
            formData.departureDate &&
            formData.returnDate &&
            formData.flightClass
          )
        case 2:
          const allTravelersValid = formData.travelers.every(
            (t) =>
              t.fullName && t.birthDate && t.documentType && t.documentNumber,
          )
          return (
            allTravelersValid &&
            formData.travelers.length === formData.numberOfTravelers
          )
        case 3:
          return true // Services are optional
        case 4:
          return true // Summary step
        default:
          return false
      }
    },
    [formData],
  )

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setCurrentStep(1)
  }, [])

  return {
    // State
    currentStep,
    formData,
    flights,
    isLoading,

    // Actions
    updateFormData,
    updateTraveler,
    nextStep,
    prevStep,
    goToStep,
    resetForm,

    // Computed
    pricing: calculatePricing(),
    destinations: getDestinations(),
    getFlightsForDestination,
    validateStep: (step?: number) => validateStep(step || currentStep),

    // Utils
    totalSteps: 4,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === 4,
  }
}
