import type { InitOptions } from 'i18next'
import * as langs from './locales'

export const locales = Object.entries(langs).map((item, index) => item[1])
export type LocaleTypes = (typeof locales)[number]
export const defaultNS = 'common'

export function getOptions(locale = langs.fallbackLng, ns = defaultNS): InitOptions {
  return {
    debug: true,
    supportedLngs: locales,
    fallbackLng: langs.fallbackLng,
    lng: locale,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
