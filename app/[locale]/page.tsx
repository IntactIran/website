import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { LocaleTypes } from './i18n/settings'
import { redirect } from 'next/navigation'

type HomeProps = {
  params: { locale: LocaleTypes }
}

export default async function Page({ params: { locale } }: HomeProps) {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  redirect(`/${locale}/blog/`)

  return <Main posts={posts} params={{ locale: locale }} />
}
