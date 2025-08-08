# Globetrotter - Plataforma de Reservas de Vuelos

Globetrotter es una aplicación web moderna para la reserva de vuelos, construida con Next.js 15 y diseñada para ofrecer una experiencia de usuario fluida y agradable.

## 🌟 Características

- **Diseño Moderno y Responsivo**

  - Interfaz de usuario intuitiva y atractiva
  - Animaciones suaves y transiciones elegantes
  - Totalmente adaptable a dispositivos móviles

- **Proceso de Reserva en 4 Pasos**
  1. Información del Viaje
     - Selección de destino
     - Fechas de viaje
     - Clase de vuelo
  2. Información de Viajeros
     - Datos personales
     - Documentación
     - Opciones de equipaje y mascotas
  3. Servicios Adicionales
     - Seguro de viaje
     - Asientos preferenciales
     - Asistencia especial
  4. Resumen y Confirmación
     - Desglose de costos
     - Confirmación de detalles
     - Proceso de pago

## 🛠 Tecnologías

- **Frontend**

  - Next.js 15.4.6 con App Router
  - React 19.1.0
  - TypeScript
  - Tailwind CSS 3.4.1
  - Framer Motion para animaciones
  - Lucide React para iconos

- **Herramientas de Desarrollo**
  - ESLint
  - PostCSS
  - Autoprefixer
  - TurboPack

## 📦 Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx            # Página principal
│   ├── booking/
│   │   └── page.tsx        # Página de reservas
│   ├── globals.css         # Estilos globales
│   └── layout.tsx          # Layout principal
├── components/
│   ├── ui/                 # Componentes base
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Switch.tsx
│   │   └── ProgressBar.tsx
│   ├── layout/            # Componentes de layout
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── booking/           # Componentes de reserva
│       ├── BookingWizard.tsx
│       ├── TripInfoStep.tsx
│       ├── TravelersStep.tsx
│       ├── ServicesStep.tsx
│       └── SummaryStep.tsx
├── hooks/
│   └── useBookingForm.ts  # Hook personalizado para el formulario
└── types/
    └── booking.ts         # Tipos TypeScript
```

## 🚀 Inicio Rápido

1. **Instalación**

   ```bash
   npm install
   ```

2. **Desarrollo**

   ```bash
   npm run dev
   ```

   Abre [http://localhost:3000](http://localhost:3000)

3. **Producción**
   ```bash
   npm run build
   npm start
   ```

## 🌐 API de Vuelos

La aplicación consume datos de vuelos desde:

```
https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json
```

Estructura de datos:

```typescript
interface Flight {
  destination: string
  class: 'Economy' | 'Business' | 'First Class'
  priceUSD: number
}
```

## 🎨 Temas y Estilos

- **Paleta de Colores**

  - Primary: Escala de azules (#0ea5e9 a #0369a1)
  - Gray: Escala de grises (#f9fafb a #111827)

- **Animaciones**
  - fade-in
  - slide-up
  - scale-in
  - bounce-gentle

## 📱 Responsive Design

- Mobile First
- Breakpoints:
  - md: 768px
  - lg: 1024px
  - xl: 1280px

## 🔒 Seguridad

- Validación de datos en el cliente
- Manejo seguro de información sensible
- Protección contra inyección de datos

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -am 'Añade nueva mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Crea un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
