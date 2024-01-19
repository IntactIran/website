import Link from 'next/link'
import { slug } from 'github-slugger'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

interface TagProps {
  text: string
  params: { locale: LocaleTypes }
}

const Tag: React.FC<TagProps> = ({ text, params: { locale } }) => {
  // Define the link URL based on the locale
  const tagLink = `/${locale}/tags/${slug(text)}`

  return (
    <Link
      href={tagLink}
      className="rounded-xl bg-antiFlashWhite-50 px-2 py-1 text-sm font-thin uppercase
       text-cadetGray-500 hover:text-bittersweet dark:bg-antiFlashWhite-900 dark:text-cadetGray-200"
    >
      {text.replace(/ /g, '-')}
    </Link>
  )
}

export default Tag
