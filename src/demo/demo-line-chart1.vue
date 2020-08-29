<template>
  <p-line-chart
    :options="options"
    :data="lineChartJson"
    ref="pieRef"
  />
</template>

<script>
import lineChartJson from './data/line-chart1.json'
export default {
  data() {
    return {
      lineChartJson,
      options: {
        title: `总收入和总支出年度对比趋势-预算数（单位：万元）`,
        fieldMap: {
          time: 'year',
          name: 'budgetSubject',
          value: 'budgetNum'
        }
      }
    }
  },
  methods: {
    updateData() {
      this.$refs.pieRef.initData()
    }
  }
}
</script>
