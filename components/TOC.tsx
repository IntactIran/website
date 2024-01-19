'use client'

import { Toc } from 'pliny/mdx-plugins/remark-toc-headings'
import classNames from 'classnames'
import { dir } from 'i18next'
import { useParams } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

export interface TOCInlineProps {
  toc: Toc
  indentDepth?: number
  fromHeading?: number
  toHeading?: number
  asDisclosure?: boolean
  exclude?: string | string[]
  collapse?: boolean
  wrap?: boolean
  onClick?: () => void | undefined
  params: { locale: LocaleTypes }
}

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * `asDisclosure` will wrap the TOC in a `details` element with a `summary` element.
 * `collapse` will collapse the TOC when `AsDisclosure` is true.
 *
 * @param {TOCInlineProps} {
 *   toc,
 *   indentDepth = 3,
 *   fromHeading = 1,
 *   toHeading = 6,
 *   asDisclosure = false,
 *   exclude = '',
 *   collapse = false,
 * }
 *
 */
const TOC = ({
  toc,
  indentDepth = 1,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = '',
  collapse = false,
  wrap = false,
  onClick = undefined,
}: TOCInlineProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, '')
  const isRTL = dir(locale) === 'rtl'

  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i')

  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  )

  const tocList = (
    <ol>
      {filteredToc.map((heading) => (
        <a
          className="block rounded-lg px-2 py-1 text-opacity-25 hover:bg-antiFlashWhite-50/25 hover:text-opacity-100 dark:hover:bg-antiFlashWhite-50/5"
          key={heading.value}
          onClick={onClick}
          href={heading.url}
        >
          <li
            style={
              isRTL
                ? { paddingRight: heading.depth - 1 + 'em' }
                : { paddingLeft: heading.depth - 1 + 'em' }
            }
            className={classNames(
              wrap ? 'text-balance' : 'max-w-full overflow-hidden text-ellipsis text-nowrap'
            )}
          >
            {heading.value}
          </li>
        </a>
      ))}
    </ol>
  )

  return (
    <>
      {asDisclosure ? (
        <details open={!collapse}>
          <summary className="ml-6 pb-2 pt-2 text-xl font-bold">{t('toc')}</summary>
          <div className="ml-6">{tocList}</div>
        </details>
      ) : (
        <nav className="text-md max-w-full overflow-y-auto font-serif font-semibold">
          <title className="sr-only">{t('toc')}</title>
          {tocList}
        </nav>
      )}
    </>
  )
}

export default TOC
