import { Inter } from 'next/font/google'
import classNames from 'classnames'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { ReactNode } from 'react'
import Header from './Header'

interface LayoutWrapperProps {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
})

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return (
    <SectionContainer>
      <div
        className={classNames('flex h-screen flex-col justify-between font-sans', inter.className)}
      >
        <Header />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
