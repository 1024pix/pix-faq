<template>
  <div>
    <div v-if="type === 'form_page'">
      <form-page :content="document.data" />
    </div>
    <div v-if="type === 'simple_page'">
      <simple-page :content="document.data" />
    </div>
    <div v-if="type === 'slices_page'">
      <slice-zone :slices="slices" />
    </div>
  </div>
</template>

<script>
import { documentFetcher } from '~/services/document-fetcher'

export default {
  name: 'CustomPage',
  nuxtI18n: {
    paths: {
      fr: '/:uid',
      'fr-fr': '/:uid',
      'en-gb': '/:uid',
    },
  },
  async asyncData({ params, app, req, error, currentPagePath }) {
    try {
      const document = await documentFetcher(
        app.$prismic,
        app.i18n,
        req
      ).getPageByUid(params.uid)

      const meta = document.data.meta

      const latestNewsItems = await documentFetcher(
        app.$prismic,
        app.i18n,
        req
      ).findNewsItems({ page: 1, pageSize: 3 })
      return { currentPagePath, meta, document, latestNewsItems }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    const meta = this.$getMeta(this.meta, this.currentPagePath, this.$prismic)

    return {
      meta,
      title: `${this.title} | Pix`,
    }
  },
  computed: {
    slices() {
      const rawDocumentSlices = this.document.data.body
      return rawDocumentSlices.map((slice, index) => {
        if (slice.slice_type === 'latest_news') {
          slice.primary.latest_news_items = this.latestNewsItems
        }
        return slice
      })
    },
    type() {
      return this.document.type
    },
    title() {
      return this.document.data.title[0].text
    },
  },
}
</script>

<style lang="scss"></style>
