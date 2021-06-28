<template>
  <div :id="`slice-${indexForId}`" :style="[background]">
    <div
      class="article"
      :class="{
        'article--only-text': isOnlyTextLayout,
        'article--reverse': shouldBeReversed,
        'article--vertical': shouldBeVertical,
      }"
    >
      <div
        class="article__content"
        :class="{
          'article__content--only-text': isOnlyTextLayout,
          'article__content--vertical': shouldBeVertical,
          'article__primary-content': isMediaLayout,
        }"
      >
        <prismic-rich-text
          :field="content.article_title"
          class="article-content__title"
          :class="{
            'article-content__title--only-text': isOnlyTextLayout,
            'article-content__title--vertical': shouldBeVertical,
          }"
        />
        <prismic-rich-text
          :field="content.article_description"
          class="article-content__description"
          :class="{
            'article-content__description--only-text': isOnlyTextLayout,
          }"
        />
        <div v-if="content.article_link_type !== 'none'">
          <cta-button
            v-if="content.article_link_type === 'call-to-action'"
            :link="content.article_link_url"
            :name="content.article_link_name"
          />
          <pix-link
            v-else-if="content.article_link_type === 'link-to'"
            :field="content.article_link_url"
            class="article-content__link-to"
          >
            <fa icon="arrow-right" /> {{ content.article_link_name }}
          </pix-link>
        </div>
      </div>
      <pix-image
        v-if="isMediaLayout && content.article_background.url && !containsVideo"
        :field="content.article_background"
        class="article__secondary-content article-secondary-content__background"
      />
      <pix-image
        v-if="isMediaLayout && !containsVideo"
        :field="content.article_image"
        class="article__secondary-content article-secondary-content__image"
      />
      <video
        v-if="isMediaLayout && containsVideo"
        class="article__secondary-content article-secondary-content__video"
        :poster="content.article_video_poster.url"
        controls
      >
        <source :src="content.article_video.url" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
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
    content() {
      return this.slice.primary
    },
    background() {
      let style = {}
      if (this.isOnlyTextLayout && this.hasBackgroundImage) {
        style = {
          background: `no-repeat url(${this.content.article_background.url})`,
          backgroundSize: '100%',
          backgroundPosition: 'top right',
        }
      }
      style['background-color'] = `${this.content.article_background_color}`
      return style
    },
    containsVideo() {
      return (
        this.content.article_video &&
        this.content.article_video.link_type !== 'Any'
      )
    },
    hasBackgroundImage() {
      return (
        this.content.article_background && this.content.article_background.url
      )
    },
    isOnlyTextLayout() {
      return this.content.article_layout === 'only-text'
    },
    isMediaLayout() {
      return ['text-image', 'image-text', 'vertical-text-image'].includes(
        this.content.article_layout
      )
    },
    shouldBeReversed() {
      return this.content.article_layout === 'image-text'
    },
    shouldBeVertical() {
      return this.content.article_layout === 'vertical-text-image'
    },
  },
}
</script>

<style lang="scss">
.article-content__title {
  text-align: left;

  &--only-text,
  &--vertical {
    text-align: center;
  }
}

.article {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    'a a a a'
    'b b b b';
  grid-gap: 16px;

  font-family: $font-open-sans;
  padding: 64px 0;
  margin: 0 16px;

  & > * {
    max-width: 100%;
    justify-self: center;
  }

  &__content {
    align-self: center;

    &--only-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 65%;
    }

    &--vertical {
      text-align: center;
    }
  }

  &__primary-content {
    grid-area: a;
    align-self: center;
  }

  &__secondary-content {
    grid-area: b;
    align-self: center;
    max-height: 80%;
  }

  &--reverse {
    grid-template-areas:
      'b b b b'
      'a a a a';
  }
  &--vertical {
    grid-template-areas:
      'a a a a'
      'b b b b';
  }

  &--only-text {
    display: flex;
    justify-content: center;
  }
}

@include device-is('tablet') {
  .article {
    margin: 0 32px;
    grid-template-columns: repeat(8, 1fr);
    grid-template-areas:
      'a a a a a a a a'
      'b b b b b b b b';

    &--reverse {
      grid-template-areas:
        'b b b b b b b b'
        'a a a a a a a a';
    }

    &--vertical {
      grid-template-areas:
        'a a a a a a a a'
        'b b b b b b b b';
    }
  }
}

@include device-is('desktop') {
  .article {
    grid-template-columns: repeat(8, 1fr);
    grid-template-areas: 'a a a a . b b b';

    &--reverse {
      grid-template-areas: 'b b b . a a a a';
    }
    &--vertical {
      grid-template-areas:
        '. a a a a a a .'
        '. b b b b b b .';
    }
  }
}

@include device-is('large-screen') {
  .article {
    max-width: 1920px;
    margin: 0 auto;
    grid-template-columns: 1.2fr repeat(12, 1fr) 1.2fr;
    grid-template-areas: '. a a a a a a . b b b b b .';
    grid-gap: 24px;

    &--reverse {
      grid-template-areas: '. b b b b b . a a a a a a .';
    }

    &--vertical {
      margin: 0 0;
      grid-template-areas:
        '. . a a a a a a a a a a . .'
        '. . b b b b b b b b b b . .';
    }
  }
}

.article .article__secondary-content.article-secondary-content__background {
  grid-column-start: b-start;
  grid-column-end: b-end;

  @include device-is('large-screen') {
    grid-column-start: 10;
    width: 100%;
  }
}

.article .article__secondary-content.article-secondary-content__image {
  grid-column-start: b-start;
  grid-column-end: b-end;
}

.article .article__secondary-content.article-secondary-content__video {
  grid-column-start: b-start;
  grid-column-end: b-end;
  cursor: pointer;
}

.article.article--reverse
  .article__secondary-content.article-secondary-content__background {
  grid-column-start: b-start;
  grid-column-end: b-end;

  @include device-is('large-screen') {
    grid-column-start: b-start;
    grid-column-end: 6;
    width: 100%;
  }
}

.article.article--reverse
  .article__secondary-content.article-secondary-content__image {
  grid-column-start: b-start;
  grid-column-end: b-end;

  @include device-is('large-screen') {
    justify-self: flex-end;
  }
}

.article-content {
  &__description {
    margin: 16px 0 24px 0;
    color: $grey-60;
    font-size: 1.125rem;
    line-height: 30px;

    h3 {
      margin-top: 8px;
    }

    ul {
      list-style: none;
      padding: 0;

      li:before {
        color: $grey-60;
      }
    }

    & p {
      font-size: 1.125rem;
      font-weight: $font-normal;
      letter-spacing: 0;
      line-height: 1.875rem;
      margin: 8px 0px;
    }

    &--only-text {
      text-align: center;
    }
  }

  &__link-to {
    height: 26px;
    color: $blue;
    font-family: $font-roboto;
    font-size: 1.125rem;
    font-weight: $font-medium;
    letter-spacing: 0;
    line-height: 0.009rem;

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
    letter-spacing: 0.00875rem;
    line-height: 2.875rem;
    margin-top: 0;
  }
}
</style>
