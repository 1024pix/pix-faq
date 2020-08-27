<template>
  <div class="slice-zone">
    <section v-for="(slice, index) in slices" :key="`slice-${index}`">
      <template v-if="slice.slice_type === 'rich_text'">
        <prismic-rich-text :field="slice.primary.text" />
      </template>
      <template v-if="slice.slice_type === 'multiple_column'">
        <multiple-column :slice="slice" />
      </template>
      <template v-if="slice.slice_type === 'web_snippet'">
        <web-snippet :slice="slice" />
      </template>
      <template v-if="slice.slice_type === 'pop-in'">
        <pop-in-campaigns :content="slice" />
      </template>
      <template v-if="slice.slice_type === 'banner'">
        <banner :content="slice"></banner>
      </template>
      <template v-if="slice.slice_type === 'old-banner'">
        <hero-banner
          :section-class="'index__hero-banner'"
          :background-class="'hero-banner__background'"
          :content-class="'hero-banner__content'"
          :button-class="'hero-banner-content__button'"
          :content="slice"
        >
        </hero-banner>
      </template>
      <template v-if="slice.slice_type === 'old-demo'">
        <img-text-column-slice
          :content="slice"
          :section-class="'section-demo'"
          :container-class="'section-demo__container'"
          :button-class="'section-demo__button'"
        ></img-text-column-slice>
      </template>
      <template v-if="slice.slice_type === 'old-features'">
        <section-slice
          :content="slice"
          :section-class="'index__features'"
          :container-class="'features__container'"
          :flex-container-class="'features-container__list'"
          :flex-content-class="'features-container-list__item'"
        >
        </section-slice>
      </template>
      <template v-if="slice.slice_type === 'features'">
        <features-slice :content="slice" />
      </template>
      <template v-if="slice.slice_type === 'article'">
        <article-slice :slice="slice" :button-class="'section-demo__button'" />
      </template>
      <template v-if="slice.slice_type === 'article'">
        <article-slice :slice="slice" :button-class="'section-demo__button'" />
      </template>
    </section>
  </div>
</template>

<script>
import ArticleSlice from '@/components/slices/Article'
import Banner from '@/components/slices/Banner'
import HeroBanner from '@/components/slices/HeroBanner'
import ImgTextColumnSlice from '@/components/slices/ImgTextColumn'
import MultipleColumn from '@/components/slices/MultipleColumn'
import PopInCampaigns from '@/components/PopInCampaigns'
import SectionSlice from '@/components/slices/Section'
import WebSnippet from '@/components/slices/WebSnippet'
import FeaturesSlice from '@/components/slices/Features'

export default {
  name: 'SliceZone',
  components: {
    ArticleSlice,
    Banner,
    HeroBanner,
    ImgTextColumnSlice,
    MultipleColumn,
    PopInCampaigns,
    SectionSlice,
    WebSnippet,
    FeaturesSlice,
  },
  props: {
    slices: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style></style>
