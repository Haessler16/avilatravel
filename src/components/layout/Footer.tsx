import { Plane, Mail, Phone, MapPin } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo and Description */}
          <div className='md:col-span-2'>
            <div className='flex items-center space-x-2 mb-4'>
              <div className='p-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg'>
                <Plane className='h-6 w-6 text-white' />
              </div>
              <span className='text-xl font-bold'>Globetrotter</span>
            </div>
            <p className='text-gray-400 max-w-md'>
              Creamos experiencias de viaje únicas y memorables. Tu próxima
              aventura está a solo un clic de distancia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='font-semibold mb-4'>Enlaces rápidos</h3>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Destinos populares
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Ofertas especiales
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Política de cancelación
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className='font-semibold mb-4'>Contacto</h3>
            <div className='space-y-2 text-gray-400'>
              <div className='flex items-center space-x-2'>
                <Mail className='h-4 w-4' />
                <span>info@globetrotter.com</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Phone className='h-4 w-4' />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className='flex items-center space-x-2'>
                <MapPin className='h-4 w-4' />
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>&copy; 2025 Globetrotter. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
