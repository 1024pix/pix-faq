<template>
  <div class="news-item-post">
    <header class="news-item-post__header">
      <prismic-rich-text
        class="news-item-post__title"
        :field="newsItem.data.title"
      />
      <p class="news-item-post__meta">
        <span :class="`news-item-post__category ${categoryClassName}`">
          {{ $t(categoryLabel) }}
        </span>
        •
        <span class="news-item-post__date">{{ date }}</span>
      </p>
    </header>

    <div class="news-item-post__body">
      <div class="news-item-post__excerpt">
        <prismic-rich-text :field="newsItem.data.body" />
        <slice-zone :slices="newsItem.data.slices" />
      </div>
    </div>
    <footer class="news-item-post__footer"></footer>
  </div>
</template>

<script>
export default {
  name: 'NewsItemPost',
  props: {
    newsItem: {
      type: Object,
      default: null,
    },
  },
  computed: {
    categoryClassName() {
      return `news-item-card__category--${this.categoryLabel}`
    },
    categoryLabel() {
      return this.newsItem.data.category.toLowerCase()
    },
    date() {
      if (!this.newsItem.first_publication_date) {
        return 'Preview'
      }
      return this.$moment(this.newsItem.data.date)
        .locale(this.$i18n.locale.split('-')[0])
        .format('LL')
    },
  },
}
</script>

<style lang="scss">
.news-item-post {
  h1,
  h2,
  h3,
  h4,
  p {
    font-family: $font-open-sans;
  }

  position: relative;
  border-radius: 10px;
  background: #fff;
  color: $grey-45;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.04);
  margin-bottom: 60px;

  a {
    text-decoration: underline;
  }

  /* === LAYOUT === */

  &__header {
    padding: 30px;
    text-align: center;

    @include device-is('tablet') {
      padding: 70px 150px 30px;
    }
  }

  &__body {
    padding: 0 30px 30px;

    @include device-is('tablet') {
      padding: 0 150px 70px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      padding: 0;
      margin: 0 0 15px;
    }

    ul,
    li {
      list-style: none;
    }

    h2 {
      margin-top: 30px;
      font-size: 1.2rem;
    }
  }

  &__footer {
    padding: 0;
    margin: 0;
    background: none;
  }

  /* === ELEMENTS === */

  &__author {
    font-weight: 500;
    margin: 0;
  }

  &__avatar {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    background-color: $blue;
    padding: 5px;
    margin-right: 10px;
  }

  &__category {
    font-size: 0.85rem;
    font-weight: 600;

    &--announcement {
      color: #12a3ff;
    }

    &--engineering {
      color: #f1a141;
    }

    &--event {
      color: #ff3f94;
    }

    &--feature {
      color: #57c884;
    }

    &--society {
      color: #574da6;
    }
  }

  &__date {
    margin: 0;
    color: #6b6c7a;
  }

  &__excerpt {
  }

  &__illustration {
    width: 100%;
    height: 180px;
    background-position: 50% 50%;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background-origin: border-box;
    background-size: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &__link {
    color: $grey-45;

    &:active,
    &:focus,
    &:hover,
    &:visited {
      text-decoration: none;
    }
  }

  &__meta {
    color: #6b6c7a;
    text-align: center;
    font-weight: 300;
  }

  &__publication {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    line-height: 1.2rem;
  }

  &__title h1 {
    font-size: 2.75rem;
    line-height: 3.25rem;
    color: #222222;
    font-weight: 300;
    margin: 0 0 20px;
  }

  /* === RICH TEXT STYLES === */

  p.block-img img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
  }

  .number-large-blue {
    font-weight: 600;
    color: $blue;
    text-align: center;
    font-size: 2.25rem;
    line-height: 4.063rem;
  }

  .blue {
    color: $blue;
  }

  .yellow {
    color: $yellow;
  }

  .large {
    font-size: 1.875rem;
    line-height: 2.375rem;

    @include device-is('tablet') {
      font-size: 2.875rem;
      line-height: 3.875rem;
    }
  }

  .center {
    text-align: center;
    display: block;
  }

  .justify {
    display: block;
    text-align: justify;
  }

  p > br {
    display: none;
  }
}

.multiple-column {
  margin: 0 -10px;

  @include device-is('large-mobile') {
    display: flex;
    justify-content: space-between;
  }

  .column {
    flex-basis: 50%;
    margin: 0 10px;
  }

  .vertical_align_center {
    align-self: center;
  }
}
</style>
