import 'css/tailwind.css'
import 'pliny/search/algolia.css'

import { Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'
// import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider } from '@/components/search/SearchProvider'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { maintitle, maindescription } from '@/data/localeMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import { dir } from 'i18next'
import { LocaleTypes, locales } from './i18n/settings'
import TwSizeIndicator from '@/components/helper/TwSizeIndicator'
import classNames from 'classnames'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// theme inspired from: https://en.99designs.de/profiles/Archangelo/designs/1151601

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const yekan = localFont({
  src: [
    {
      path: '../../public/static/fonts/yekan-font/iranyekan_regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/static/fonts/yekan-font/iranyekan_regular.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/static/fonts/yekan-font/iranyekan_regular.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-yekan',
})

const vazir = localFont({
  src: [
    {
      path: '../../public/static/fonts/vazir-font-v18.0.0/Vazir-Thin.woff',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/static/fonts/vazir-font-v18.0.0/Vazir-Light.woff',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/static/fonts/vazir-font-v18.0.0/Vazir.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/static/fonts/vazir-font-v18.0.0/Vazir-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/static/fonts/vazir-font-v18.0.0/Vazir-Bold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/static/fonts/vazir-font-v18.0.0/Vazir-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/static/fonts/vazir-font-v18.0.0/Vazir-Bold.woff',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-vazir',
})

const tanha = localFont({
  src: '../../public/static/fonts/tanha-font-v0.9/Tanha.woff',
  variable: '--font-tanha',
})

const nazanin = localFont({
  src: '../../public/static/fonts/B Nazanin.ttf',
  variable: '--font-nazanin',
})

export async function generateMetadata({ params: { locale } }): Promise<Metadata> {
  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: maintitle[locale],
      template: `%s | ${maintitle[locale]}`,
    },
    description: maindescription[locale],
    openGraph: {
      title: maintitle[locale],
      description: maindescription[locale],
      url: './',
      siteName: maintitle[locale],
      images: [siteMetadata.socialBanner],
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: maintitle[locale],
      card: 'summary_large_image',
      images: [siteMetadata.socialBanner],
    },
  }
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: LocaleTypes }
}) {
  const isRTL = dir(locale) === 'rtl'
  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={classNames(
        'scroll-smooth',
        isRTL &&
          `${space_grotesk.variable} ${yekan.variable} ${vazir.variable} ${tanha.variable} ${nazanin.variable}`
      )}
      suppressHydrationWarning
    >
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="min-h-screen w-full bg-white font-sans text-cadetGray-400 antialiased dark:bg-delftBlue-900">
        <TwSizeIndicator />
        <ThemeProviders>
          {/* <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} /> */}
          {/* <SectionContainer> */}
          <SearchProvider>
            <Header />
            <main>{children}</main>
          </SearchProvider>
          <Footer />
          {/* </SectionContainer> */}
        </ThemeProviders>
      </body>
    </html>
  )
}
