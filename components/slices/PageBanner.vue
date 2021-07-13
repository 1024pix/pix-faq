<template>
  <div :id="`slice-${indexForId}`" :style="[background]">
    <section class="banner row-block">
      <div class="row-block__main-content">
        <prismic-rich-text
          :field="title"
          class="title--big"
          :class="`title--${fontContrast}`"
        />
        <prismic-rich-text
          :field="textContent"
          class="text--normal"
          :class="`text--${fontContrast}`"
        />
        <slot></slot>
        <div class="banner__button-group">
          <div v-for="(link, index) in links" :key="`item-${index}`">
            <pix-link
              v-if="!isVideo(link)"
              :field="link.banner_link_url"
              class="button"
              :class="videoClass(link)"
            >
              {{ link.banner_link_text }}
            </pix-link>
            <template v-if="isVideo(link)">
              <button
                class="button button-video"
                :class="`button--${fontContrast}`"
                @click="openVideoModal()"
              >
                <fa icon="play-circle" />
                {{ link.banner_link_text }}
              </button>
              <modal ref="modal" name="videoModal" height="auto">
                <media-player :video-url="link.banner_link_url.url" />
              </modal>
            </template>
          </div>
        </div>
      </div>
      <pix-image
        v-if="hasImage"
        :field="imageUrl"
        class="row-block__side-content"
      />
    </section>
  </div>
</template>

<script>
export default {
  name: 'PageBanner',
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
    background() {
      let style = {}
      if (this.hasBackgroundImage) {
        style = {
          background: `no-repeat url(${this.slice.primary.banner_background.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top right',
          'clip-path': 'ellipse(110% 55% at 50% 40%)',
        }
      }
      style.backgroundColor = this.slice.primary.banner_background_color
      return style
    },
    fontContrast() {
      return this.slice.primary.banner_font_contrast
    },
    title() {
      return this.slice.primary.banner_title
    },
    textContent() {
      return this.slice.primary.banner_content
    },
    links() {
      return this.slice.items
    },
    hasImage() {
      return (
        this.slice.primary.banner_image && this.slice.primary.banner_image.url
      )
    },
    hasBackgroundImage() {
      return (
        this.slice.primary.banner_background &&
        this.slice.primary.banner_background.url
      )
    },
    imageUrl() {
      return this.slice.primary.banner_image
    },
  },
  methods: {
    openVideoModal() {
      this.$modal.show('videoModal')
    },
    isVideo(link) {
      return link?.banner_link_url?.url?.includes('pix-videos/')
    },
    videoClass(link) {
      return this.isVideo(link)
        ? 'banner__video'
        : 'button--' + this.fontContrast
    },
  },
}
</script>

<style lang="scss">
.banner {
  text-align: center;

  .text--normal p {
    margin: 16px 0 24px;
  }

  .banner__button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .button {
      margin: 5px 0;
    }
  }

  &.row-block {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      'a a a a'
      'b b b b';
    grid-gap: 16px;

    font-family: $font-open-sans;
    padding: 81px 0;
    margin: 0 16px;

    & > * {
      max-width: 100%;
    }

    .row-block__main-content {
      grid-area: a;
    }

    .row-block__side-content {
      grid-area: b;
      display: none;
    }
  }
}

@include device-is('tablet') {
  .banner {
    padding: 80px 0;

    .banner__button-group {
      flex-direction: row;

      .button {
        width: initial;
        margin: 0 10px;
      }
    }

    &.row-block {
      margin: 0 32px;
      grid-template-columns: repeat(8, 1fr);
      grid-template-areas:
        'a a a a a a a a'
        'b b b b b b b b';
    }
  }
}

@include device-is('desktop') {
  .banner.row-block {
    margin: 0 32px;
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      'a a a a a a a a a a a a'
      '. . . b b b b b b . . .';

    .row-block__side-content {
      display: initial;
      width: 100%;
      box-sizing: border-box;
    }
  }
}

@include device-is('large-screen') {
  .banner.row-block {
    margin: 0 auto;
    grid-template-columns: 1.2fr repeat(12, 1fr) 1.2fr;
    grid-template-areas: '. a a a a a a . b b b b b .';
    grid-gap: 24px;

    .row-block__main-content {
      text-align: left;
      align-self: center;

      .banner__button-group {
        justify-content: flex-start;

        .button {
          margin: 0 20px 0 0;
        }
      }
    }
  }
}
</style>
