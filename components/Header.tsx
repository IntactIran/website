'use client'

import { useParams, usePathname } from 'next/navigation'
import classNames from 'classnames'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
// import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import LangSwitch from './LangSwitch'
import SearchButton from './search/SearchButton'
import { dir } from 'i18next'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTheme } from 'next-themes'

const Header = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, '')
  // Get current page path
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  console.log(resolvedTheme)
  const isRTL = dir(locale) === 'rtl'

  return (
    <header className="sticky top-0 z-10 font-mono text-ghostWhite">
      <div
        className={classNames(
          'flex items-center justify-between bg-delftBlue-400 px-5 py-2 sm:py-3 md:py-5',
          isRTL ? 'flex-row-reverse' : 'flex-row-reverse sm:flex-row',
          {
            'sm:flex-row-reverse': isRTL,
          }
        )}
      >
        <div>
          <Link href={`/${locale}/`} aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center justify-between">
              {/* <div className="mr-3">
                <Logo />
              </div> */}
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="h-6 text-2xl font-bold">{siteMetadata.headerTitle}</div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>
        </div>
        <div
          className={classNames(
            'flex items-center gap-4 leading-5 sm:gap-6',
            isRTL ? 'flex-row-reverse' : 'flex-row-reverse sm:flex-row',
            {
              'sm:flex-row-reverse': isRTL,
            }
          )}
        >
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => {
              const isSelected = pathname.includes(link.href)
              return (
                <Link
                  key={link.title}
                  href={`/${locale}${link.href}`}
                  className={classNames('hidden text-sm font-medium sm:block', {
                    'text-bittersweet': isSelected,
                  })}
                >
                  {t(`${link.title.toLowerCase()}`)}
                </Link>
              )
            })}
          <SearchButton />
          <ThemeSwitch />
          <LangSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
