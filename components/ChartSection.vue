<template>
  <section>
    <line-chart :type="'line'" :data="data" :width="300" :height="110" />
  </section>
</template>

<script>
export default {
  name: 'ChartSection',
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped></style>
