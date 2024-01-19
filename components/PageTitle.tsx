import { ReactNode } from 'react'

interface PageTitleProps {
  children: ReactNode
}

export default function PageTitle({ children }: PageTitleProps) {
  return (
    <h1 className="font-serif text-3xl font-extrabold leading-9 tracking-tight text-cadetGray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-cadetGray-200">
      {children}
    </h1>
  )
}
