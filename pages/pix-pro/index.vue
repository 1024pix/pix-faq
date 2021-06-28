<template>
  <div>
    <div v-if="type === 'form_page'">
      <form-page :content="document.data" />
    </div>
    <div v-if="type === 'simple_page'">
      <simple-page :content="document.data" />
    </div>
    <div v-if="type === 'slices_page'">
      <slice-zone :slices="document.data.body" />
    </div>
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
      ).getPageByUid('decouvrir-pix-pro')
      const meta = document.data.meta

      return { currentPagePath, meta, document }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    const meta = this.$getMeta(this.meta, this.currentPagePath, this.$prismic)

    return {
      meta,
      title: `${this.title} | Pix Pro`,
    }
  },
  computed: {
    type() {
      return this.document.type
    },
    title() {
      return this.document.data.title[0].text
    },
  },
}
</script>
