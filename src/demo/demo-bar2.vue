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
import barJson from './data/bar2.json'
export default {
  data() {
    return {
      barJson,
      options: {
        title: `非税收入年度对比情况-预算数（单位：万元）`,
        fieldMap: {
          time: 'year',
          name: 'budgetSubject',
          value: 'budgetNum'
        },
        chartProps: {
          height: 800,
          padding: [10, 140, 80, 60]
        },
        legendProps: {
          position: 'right-bottom'
        },
        tooltipProps: {
          showTitle: true
        },
        adjustProps: [
          {
            type: 'dodge',
            marginRatio: 0.3
          }
        ],
        labelProps: {
          offset: 10,
          textStyle: {
            fill: '#0050b3',
            fontSize: '12'
            // fontWeight: 'bold',
            // rotate: -30
          }
        },
        groupField: 'time',
        itemField: 'name',
        colorList: [
          '#ff786b',
          '#0fdd7e',
          '#bc9dfb',
          '#ff2e6a',
          '#7effa2',
          '#e57ec0',
          '#2c818f',
          '#ff7730'
        ]
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
