<template>
  <p-line-chart
    :options="options"
    :data="lineChartJson"
    ref="pieRef"
  />
</template>

<script>
import lineChartJson from './data/line-chart2.json'
export default {
  data() {
    return {
      lineChartJson,
      options: {
        title: '本年收入合计、本年支出合计、上年结转、结转下年占比趋势（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: 'year',
          name: 'subject',
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
