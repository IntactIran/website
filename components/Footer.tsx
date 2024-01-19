'use client'

import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'

import { useContactModal } from './formspree/store'
import { ContactModal } from './formspree'

export default function Footer() {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'footer')
  const contactModal = useContactModal()

  const handleContactClick = (): void => {
    contactModal.onOpen()
  }
  function ContactClick(): void {
    handleContactClick()
  }

  return (
    <>
      <footer>
        <div className="flex flex-col items-center bg-delftBlue-400 pt-7 text-cadetGray-400">
          {/* <div className="mb-3 flex gap-4">
            <div className="flex items-center">
              {siteMetadata.formspree === false ? (
                <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
              ) : (
                <button className="flex items-center focus:outline-none" onClick={ContactClick}>
                  <SocialIcon kind="mail" size={6} />
                </button>
              )}
            </div>
            <div className="flex items-center">
              <SocialIcon kind="github" href={siteMetadata.github} size={6} />
            </div>
            <div className="flex items-center">
              <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
            </div>
            <div className="flex items-center">
              <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
            </div>
            <div className="flex items-center">
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
            </div>
            <div className="flex items-center">
              <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
            </div>
          </div> */}
          <div className="mb-2 flex gap-2 text-sm  ">
            <div>{siteMetadata.author}</div>
            <div>{` • `}</div>
            <div>{`© ${new Date().getFullYear()}`}</div>
            <div>{` • `}</div>
            <Link href="/">{siteMetadata.title}</Link>
          </div>
          <div className="mb-8 text-sm">
            <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">{t('theme')}</Link>
          </div>
        </div>
      </footer>
      {/* <ContactModal /> */}
    </>
  )
}
