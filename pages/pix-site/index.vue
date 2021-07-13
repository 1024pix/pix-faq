<template>
  <div class="index">
    <slice-zone :slices="slices" />
  </div>
</template>

<script>
import { documentFetcher } from '~/services/document-fetcher'

export default {
  name: 'Index',
  nuxtI18n: {
    paths: {
      fr: '/',
      'fr-fr': '/',
      'en-gb': '/',
    },
  },
  async asyncData({ app, req, error, currentPagePath }) {
    try {
      const document = await documentFetcher(
        app.$prismic,
        app.i18n,
        req
      ).getPageByUid('index-pix-site')

      const latestNewsItems = await documentFetcher(
        app.$prismic,
        app.i18n,
        req
      ).findNewsItems({ page: 1, pageSize: 3 })

      return {
        currentPagePath,
        meta: document.data.meta,
        document: document.data.body,
        title: document.data.title[0].text,
        latestNewsItems,
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error({ e })
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    const meta = this.$getMeta(this.meta, this.currentPagePath, this.$prismic)
    return {
      title: `${this.title} | Pix`,
      meta,
    }
  },
  computed: {
    slices() {
      return this.document.map((slice, index) => {
        if (slice.slice_type === 'latest_news') {
          slice.primary.latest_news_items = this.latestNewsItems
        }
        return slice
      })
    },
  },
}
</script>
