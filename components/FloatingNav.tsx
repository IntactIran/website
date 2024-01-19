'use client'

import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import classNames from 'classnames'
import { dir } from 'i18next'
import { useParams, usePathname } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

const FloatingNav = ({ children }) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, '')
  const pathname = usePathname()
  const [navShow, setNavShow] = useState(false)
  const isRTL = dir(locale) === 'rtl'

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
      <div className="fixed bottom-8 left-8 z-10 flex flex-col gap-3">
        <button
          aria-label={t('toc')}
          onClick={onToggleNav}
          className="rounded-lg border-2 border-cadetGray-400 bg-antiFlashWhite-50 p-1 text-cadetGray-400 transition-all hover:bg-antiFlashWhite-100 dark:bg-antiFlashWhite-900 dark:text-cadetGray-300 dark:hover:bg-antiFlashWhite-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </button>
      </div>
      <div
        className={`fixed left-0 top-0 z-30 h-full w-full transform bg-delftBlue-400 text-cadetGray-100 opacity-95 duration-300 ease-in-out ${
          navShow ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-start">
          <button className="m-8 mt-11 h-8 w-8" aria-label="Toggle Menu" onClick={onToggleNav}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          onClick={onToggleNav}
          className="fixed mt-8 h-full w-full overflow-y-auto px-8 sm:px-20"
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default FloatingNav
