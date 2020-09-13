<template>
  <p-pie
    :data="PieJson"
    :options="options"
    ref="pieRef"
    @pie-title-click="handleTitleClick"
    @pie-label-click="handleLabelClick"
  />
</template>

<script>
import PieJson from './data/pie1.json'
export default {
  data() {
    return {
      PieJson,
      options: {
        fieldMap: {
          time: 'year',
          name: 'budgetSubject',
          // 统计指标，可以更换
          value: 'budgetNum'
        },
        title: `demo-pie1-总收入和总支出占比情况-预算数（单位：万元）`,
        colorList: ['#1890ff', '#37c661']
      }
    }
  },
  methods: {
    updateData() {
      this.$refs.pieRef.initData()
    },
    handleTitleClick() {
      console.log('title-click')
    },
    handleLabelClick(data) {
      console.log('label-click', data)
    }
  }
}
</script>
