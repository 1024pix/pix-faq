<template>
  <section :id="`slice-${indexForId}`" class="latest-news">
    <prismic-rich-text
      v-if="shouldDisplayTitle && hasTitle"
      class="latest-news__title"
      :field="slice.primary.latest_news_title"
    />
    <prismic-rich-text
      v-else
      class="sr-only"
      :field="slice.primary.latest_news_title"
    />
    <ul v-if="hasLatestNewsItems" class="latest-news__list">
      <news-item-card
        v-for="(item, index) in slice.primary.latest_news_items"
        :key="`item-${index}`"
        :slice="item.data"
        :uid="item.uid"
      />
    </ul>
    <pix-link
      class="latest-news__link-to"
      :field="slice.primary.latest_news_redirection_link_url"
    >
      <fa icon="arrow-right" />
      {{ slice.primary.latest_news_redirection_link_text }}
    </pix-link>
  </section>
</template>

<script>
export default {
  name: 'LatestNews',
  props: {
    slice: {
      type: Object,
      default: null,
    },
    indexForId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    shouldDisplayTitle() {
      return this.slice.primary.latest_news_should_display_title
    },
    hasTitle() {
      return (
        this.slice.primary.latest_news_title &&
        this.slice.primary.latest_news_title.length &&
        this.slice.primary.latest_news_title[0].text &&
        this.slice.primary.latest_news_title[0].text.length
      )
    },
    hasLatestNewsItems() {
      return (
        this.slice.primary.latest_news_items &&
        this.slice.primary.latest_news_items.length
      )
    },
  },
  methods: {},
}
</script>

<style lang="scss">
.latest-news {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 118px;

  &__list {
    max-width: 1140px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding-left: 0;

    @include device-is('tablet') {
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-evenly;
    }

    li {
      padding-left: 0;

      &::before {
        content: none;
      }
    }
  }

  &__link-to {
    height: 26px;
    color: $blue;
    font-family: $font-roboto;
    font-size: 1.25rem;
    font-weight: $font-medium;
    letter-spacing: 0.009rem;
    margin-top: 60px;

    &:active,
    &:focus,
    &:hover {
      text-decoration: none;
      color: $blue;
    }
  }

  &__title h2 {
    color: $grey-90;
    font-weight: $font-normal;
    letter-spacing: 0.15px;
    text-align: center;
    margin-top: 48px;
    margin-bottom: 63px;
  }
}
</style>
