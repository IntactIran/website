import { useRef, useState } from 'react'
import { usePathname, useParams, useSelectedLayoutSegments } from 'next/navigation'
import { useOuterClick } from './util/useOuterClick'
import { LocaleTypes, locales } from 'app/[locale]/i18n/settings'
import { allBlogs } from '.contentlayer/generated'
import slugMap from 'app/[locale]/localeid-map.json'
import Link from 'next/link'

const LangSwitch = () => {
  const pathname = usePathname()
  const urlSegments = useSelectedLayoutSegments()
  const locale = useParams()?.locale as LocaleTypes

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLocaleChange = (newLocale: string): string => {
    const newUrl = `/${newLocale}/${urlSegments.join('/')}`

    // Find the current post based on the current locale and slug
    const currentPost = allBlogs.find((p) => pathname.includes(p.slug))

    if (currentPost) {
      // Find the corresponding slug in the new language
      const newSlug = slugMap[currentPost.localeid]?.[newLocale]

      if (newSlug) {
        return `/${newLocale}/blog/${newSlug}`
      } else {
        return `/${newLocale}/blog`
      }
    }

    return newUrl
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }
  const menubarRef = useRef<HTMLDivElement>(null)
  useOuterClick(menubarRef, closeMenu)

  return (
    <div ref={menubarRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full items-center justify-center rounded-md
           border-2 border-cadetGray-400 px-2 pb-1 pt-2 text-sm font-medium text-ghostWhite
            shadow-sm hover:bg-cadetGray-400 dark:bg-gray-800
            dark:text-white"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          {locale}
        </button>
      </div>
      {isMenuOpen && (
        <div
          className="absolute right-0 mt-2 w-fit origin-top-right rounded-md bg-antiFlashWhite-50
           text-cadetGray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border
           dark:border-cadetGray-400 dark:bg-delftBlue-400 dark:text-ghostWhite dark:shadow-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          onBlur={closeMenu}
        >
          {locales.map((newLocale: string) => (
            <Link key={newLocale} href={handleLocaleChange(newLocale)} locale={false}>
              <button
                className="h-9 w-12 rounded-md text-sm hover:bg-antiFlashWhite-100
                    dark:hover:bg-gray-600"
                role="menuitem"
                onClick={closeMenu}
              >
                {newLocale}
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default LangSwitch
