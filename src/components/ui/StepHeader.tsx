interface StepHeaderProps {
  title: string
  description: string
}

export const StepHeader = ({ title, description }: StepHeaderProps) => {
  return (
    <section className='text-center'>
      <h2 className='text-3xl font-bold text-gradient mb-2'>{title}</h2>
      <p className='text-gray-600'>{description}</p>
    </section>
  )
}
