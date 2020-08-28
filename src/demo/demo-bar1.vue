<template>
  <p-bar
    :options="options"
    :data="barJson"
    ref="barRef"
    @bar-title-click="handleTitleClick"
    @bar-label-click="handleLabelClick"
  />
</template>

<script>
import CommonUtil from '@/utils/index'
import barJson from './data/bar1.json'
export default {
  data() {
    return {
      barJson,
      options: {
        title: `税收收入分布情况-决算数（单位：万元）`,
        fieldMap: {
          time: 'year',
          name: 'budgetSubject',
          value: 'budgetFinalNum'
        },
        chartProps: {
          height: 600,
          padding: [10, 125, 80, 120]
        },
        legendProps: {
          position: 'right'
        },
        labelProps: {
          offset: 6,
          textStyle: {
            fill: '#0050b3',
            fontSize: '12'
            // fontWeight: 'bold',
            // rotate: -30
          }
        },
        itemField: 'name'
        // colorList: ['#ff786b', '#0fdd7e', '#bc9dfb', '#ff2e6a', '#7effa2', '#e57ec0', '#2c818f', '#ff7730']
      }
    }
  },
  methods: {
    updateData() {
      this.$refs.barRef.initData()
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
