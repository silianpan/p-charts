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
import PieJson from './data/pie.json'

const valueUnit = '万元'
const titlePre = '总收入和总支出占比情况'
export default {
  created() {
    this.options = {
      fieldMap: {
        time: 'year',
        name: 'budgetSubject',
        // 统计指标，可以更换
        value: 'budgetNum'
      },
      title: `${titlePre}-预算数（单位：${valueUnit}）`,
      colorList: ['#1890ff', '#37c661']
    }
  },
  data() {
    return {
      PieJson,
      options: {
        title: `${titlePre}（单位：${valueUnit}）`,
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
