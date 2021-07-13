<template>
  <div class="slice-zone">
    <section v-for="(slice, index) in slices" :key="`slice-${index}`">
      <template v-if="slice.slice_type === 'rich_text'">
        <prismic-rich-text :field="slice.primary.text" />
      </template>
      <template v-if="slice.slice_type === 'pop-in'">
        <slices-pop-in-campaigns :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'banner'">
        <slices-page-banner :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'article'">
        <slices-article :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'multiple_block'">
        <slices-multiple-block :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'partners_logos'">
        <slices-partners-logos :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'latest_news'">
        <slices-latest-news :slice="slice" :index-for-id="index" />
      </template>
      <template v-if="slice.slice_type === 'stat'">
        <slices-stat :slice="slice" :index-for-id="index" />
      </template>
    </section>
  </div>
</template>

<script>
export default {
  name: 'SliceZone',
  props: {
    slices: {
      type: Array,
      default: null,
    },
  },
}
</script>
