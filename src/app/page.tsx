import Link from 'next/link'
import { Plane, Globe, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  const features = [
    {
      icon: Globe,
      title: 'Destinos únicos',
      description:
        'Explora lugares increíbles alrededor del mundo con nuestras rutas cuidadosamente seleccionadas.',
    },
    {
      icon: Star,
      title: 'Experiencia premium',
      description:
        'Servicios de primera calidad y atención personalizada para hacer tu viaje inolvidable.',
    },
    {
      icon: Plane,
      title: 'Reserva fácil',
      description:
        'Proceso de reserva simplificado en pocos pasos. Rápido, seguro y confiable.',
    },
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100'>
      <Header />

      <main>
        {/* Hero Section */}
        <section className='container mx-auto px-4 py-16 text-center'>
          <div className='max-w-4xl mx-auto'>
            <h1 className='text-5xl md:text-7xl font-bold text-gradient mb-6 animate-fade-in'>
              Tu próxima aventura
              <br />
              comienza aquí
            </h1>
            <p
              className='text-xl text-gray-600 mb-8 animate-slide-up'
              style={{ animationDelay: '200ms' }}>
              Descubre el mundo con Globetrotter. Reserva vuelos, personaliza tu
              experiencia y crea recuerdos que durarán para siempre.
            </p>
            <div
              className='flex flex-col sm:flex-row gap-4 justify-center animate-slide-up'
              style={{ animationDelay: '400ms' }}>
              <Link href='/booking'>
                <Button size='lg' className='px-8 py-4 text-lg'>
                  Reservar ahora
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
              <Button variant='outline' size='lg' className='px-8 py-4 text-lg'>
                Ver destinos
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='container mx-auto px-4 py-16'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              ¿Por qué elegir Globetrotter?
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Nos dedicamos a hacer que cada viaje sea una experiencia única y
              memorable.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className='p-8 text-center hover:shadow-lg transition-all duration-300 animate-slide-up'
                style={{ animationDelay: `${index * 200}ms` }}>
                <div className='p-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl w-fit mx-auto mb-6'>
                  <feature.icon className='h-8 w-8 text-white' />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                  {feature.title}
                </h3>
                <p className='text-gray-600'>{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className='container mx-auto px-4 py-16'>
          <Card className='p-12 text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white'>
            <h2 className='text-3xl font-bold mb-4'>
              ¿Listo para tu próxima aventura?
            </h2>
            <p className='text-xl mb-8 opacity-90'>
              Comienza a planificar tu viaje perfecto en solo unos minutos.
            </p>
            <Link href='/booking'>
              <Button
                variant='secondary'
                size='lg'
                className='px-8 py-4 text-lg'>
                Comenzar reserva
                <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
            </Link>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
