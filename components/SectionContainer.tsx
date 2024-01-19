import { ReactNode } from 'react'

interface SectionContainerProps {
  children: ReactNode
}

export default function SectionContainer({ children }: SectionContainerProps) {
  return (
    <section className="mx-auto min-h-screen max-w-screen-xl px-4 py-6 font-sans md:py-8 lg:py-10">
      {children}
    </section>
  )
}
