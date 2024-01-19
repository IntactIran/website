'use client'

import siteMetadata from '@/data/siteMetadata'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ScrollTopAndComment = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, '')
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }
  const handleScrollToComment = () => {
    document.getElementById('comment')?.scrollIntoView()
  }
  return (
    <div className={`fixed bottom-8 right-8 flex-col gap-3 ${show ? 'z-10 flex' : 'hidden'}`}>
      {siteMetadata.comments?.provider && (
        <button
          aria-label={t('scrollcomment')}
          onClick={handleScrollToComment}
          className="rounded-full bg-antiFlashWhite-100 p-2 text-cadetGray-400 transition-all hover:bg-antiFlashWhite-300 dark:bg-antiFlashWhite-900 dark:text-cadetGray-400 dark:hover:bg-antiFlashWhite-700"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      <button
        aria-label={t('scrolltop')}
        onClick={handleScrollTop}
        className="rounded-full bg-antiFlashWhite-50 p-2 text-cadetGray-400 transition-all hover:bg-antiFlashWhite-100 dark:bg-antiFlashWhite-900 dark:text-cadetGray-300 dark:hover:bg-antiFlashWhite-800"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default ScrollTopAndComment
