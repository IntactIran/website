import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { components } from '@/components/MDXComponents'
import { createTranslation } from 'app/[locale]/i18n/server'
import { dir } from 'i18next'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import TOC from '@/components/TOC'
import classNames from 'classnames'
import FloatingNav from '@/components/FloatingNav'

interface PostSimpleProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  params: { locale: LocaleTypes }
}

export default async function PostLayout({
  content,
  next,
  prev,
  children,
  params: { locale },
}: PostSimpleProps) {
  const { slug, date, title, language } = content
  const { t } = await createTranslation(locale, 'home')
  const isRTL = dir(locale) === 'rtl'

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <div className="mx-auto min-h-screen py-6 md:flex md:flex-row-reverse md:gap-8 md:py-8 lg:py-10">
        <div className="block md:hidden">
          <FloatingNav>
            <TOC toc={content.toc} />
          </FloatingNav>
        </div>
        <div className="sticky top-[126px] z-0 hidden h-[calc(100vh-121px)] max-h-screen text-cadetGray-400 md:flex md:w-3/12">
          <TOC toc={content.toc} />
        </div>

        <article className="w-full px-1 md:w-9/12 md:px-6">
          <header className="border-b border-cadetGray-100 pt-9 dark:border-cadetGray-700">
            <div className="dark:border-antiFlashWhite-800">
              <div className="pb-3">
                <PageTitle>{title}</PageTitle>
              </div>
              <dl className="pb-3 text-base font-medium leading-6 text-cadetGray-400">
                <div>
                  <dt className="sr-only">{t('pub')}</dt>
                  <dd>
                    <time dateTime={date}>{formatDate(date, language)}</time>
                  </dd>
                </div>
              </dl>
            </div>
          </header>
          <section className="">
            <div className="">
              <div
                className="prose max-w-none pb-8 pt-10 dark:prose-invert prose-headings:scroll-mt-32 prose-headings:font-serif prose-headings:text-cadetGray-800 prose-p:text-balance prose-p:text-cadetGray-600 prose-img:m-0 dark:prose-headings:text-cadetGray-200"
                style={{ offsetAnchor: 'left -128px' }}
              >
                {children}
              </div>
            </div>
          </section>
          <footer></footer>
        </article>
      </div>
    </SectionContainer>
  )
}
