import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Globetrotter - Tu próxima aventura comienza aquí',
  description:
    'Reserva vuelos y personaliza tu experiencia de viaje con Globetrotter. Destinos únicos, servicios premium y reservas fáciles.',
  keywords: 'viajes, vuelos, reservas, turismo, vacaciones',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
