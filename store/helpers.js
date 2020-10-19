import { documents, documentFetcher } from '~/services/document-fetcher'

export function getNavigation(prismic, i18n) {
  return documentFetcher(prismic, i18n).get(documents.navigation)
}

export function getMainNavigations(prismic, i18n) {
  return documentFetcher(prismic, i18n).findByType(documents.mainNavigation)
}

export function getMainFooters(prismic, i18n) {
  return documentFetcher(prismic, i18n).findByType(documents.mainFooter)
}

export function getHotNews(prismic, i18n) {
  return documentFetcher(prismic, i18n).get(documents.hotNews)
}
