import { Metadata } from 'next'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'

import bg from 'public/static/images/hufo-anatomy-p-500.jpeg'
import Link from 'next/link'

type ProjectsProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: ProjectsProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'comming-soon')
  return genPageMetadata({
    title: t('title'),
    params: { locale: locale },
    description: t('description'),
  })
}

export default async function CommingSoon({ params: { locale } }: ProjectsProps) {
  const { t } = await createTranslation(locale, 'comming-soon')
  return (
    <>
      <div
        className="image h-screen w-full bg-white bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg.src})`, height: '100vh', width: '100%' }}
      >
        <div className="overlay flex h-screen w-full flex-col items-center justify-center gap-3 bg-antiFlashWhite-50/85 backdrop-blur-sm dark:bg-delftBlue-400/90">
          <div className="flex w-11/12 flex-col items-center justify-center gap-3 space-y-2 pb-8 pt-6 text-cadetGray-400 md:w-1/2 md:gap-6 md:space-y-5 dark:text-cadetGray-300">
            <h1 className="font-mono text-3xl font-semibold leading-9 tracking-tight text-cadetGray-800 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-cadetGray-100">
              {t('title')}
            </h1>
            <p className="text-balance text-center text-lg leading-7">{t('description')}</p>
            <div className="flex flex-col items-center justify-center gap-3 sm:w-3/4">
              <Link
                href={`/${locale}/blog`}
                className="underline underline-offset-8 hover:text-cadetGray-800 dark:hover:text-cadetGray-100"
              >
                <span>{t('weblog')}</span>
              </Link>
              <p className="text-balance text-center">{t('help')}</p>
              <button className="mx-auto rounded-md bg-bittersweet px-2 py-1 text-ghostWhite shadow-sm hover:shadow-lg dark:hover:shadow-ghostWhite/50">
                {t('buyCoffee')}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {t('title')}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{t('description')}</p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">jhjshdfk</div>
        </div>
      </div> */}
    </>
  )
}
