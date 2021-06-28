<template>
  <div :id="`slice-${indexForId}`" class="stat">
    <prismic-rich-text :field="content.block_title" />
    <prismic-rich-text :field="content.block_presentation" />
    <chart-section :data="chartData" />
  </div>
</template>

<script>
export default {
  name: 'StatSlice',
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
    data() {
      return this.slice.items
    },

    chartData() {
      function backgroundColorFrom(color) {
        const hex = color.replace('#', '')
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)

        return 'rgba(' + r + ',' + g + ',' + b + ',0.2)'
      }

      const valueData = this.data.map((data) => data.data_value)
      const labelData = this.data.map((data) => data.data_date)
      const chartData = {
        datasets: [
          {
            backgroundColor: backgroundColorFrom(
              this.content.block_graph_color
            ),
            borderColor: this.content.block_graph_color,
            data: valueData,
            label: this.content.block_data_name[0].text,
            type: 'line',
          },
        ],
        labels: labelData,
      }
      return chartData
    },
  },
}
</script>

<style lang="scss">
.stat {
  text-align: center;
  max-width: 1140px;
  margin: 0 50px;

  @include device-is('desktop') {
    margin: 0 auto;
  }

  canvas {
    margin: 40px 0;
  }
}
</style>
