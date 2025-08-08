'use client'

import { Plane, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className='bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center space-x-2'>
            <div className='p-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg'>
              <Plane className='h-6 w-6 text-white' />
            </div>
            <span className='text-xl font-bold text-gradient'>
              Globetrotter
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            <Link
              href='/'
              className='text-gray-600 hover:text-primary-600 transition-colors'>
              Inicio
            </Link>
            <Link
              href='/booking'
              className='text-gray-600 hover:text-primary-600 transition-colors'>
              Destinos
            </Link>
            <Link href='/booking'>
              <Button
                variant='primary'
                size='sm'
                className='animate-bounce-gentle'>
                ¡Reserva Ahora!
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'>
            {isMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden py-4 border-t border-gray-200 animate-fade-in'>
            <nav className='flex flex-col space-y-3'>
              <Link
                href='/'
                className='text-gray-600 hover:text-primary-600 transition-colors py-2'>
                Inicio
              </Link>
              <Link
                href='/booking'
                className='text-gray-600 hover:text-primary-600 transition-colors py-2'>
                Destinos
              </Link>
              <Link href='/booking'>
                <Button
                  variant='primary'
                  size='sm'
                  className='w-fit animate-bounce-gentle'>
                  ¡Reserva Ahora!
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
