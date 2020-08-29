<template>
  <p-column
    :options="options"
    :data="columnJson"
    ref="columnRef"
    @column-title-click="handleTitleClick"
    @column-label-click="handleLabelClick"
  />
</template>

<script>
import CommonUtil from '@/utils/index'
import columnJson from './data/column3.json'
export default {
  data() {
    return {
      columnJson,
      options: {
        title: '预算支出部门对比（万元）',
        groupField: 'time',
        itemField: 'name',
        fieldMap: {
          time: 'govDept',
          name: 'subject',
          value: 'subtotal'
        },
        chartProps: {
          height: 500,
          padding: [50, 120, 100, 120]
        },
        legendProps: {
          position: 'bottom'
        },
        tooltipProps: {
          showTitle: true
        },
        labelProps: {
          textStyle: {
            fill: '#0050b3',
            fontSize: '12',
            // fontWeight: 'bold',
            rotate: -60
          }
        },
        adjustProps: [
          {
            type: 'dodge',
            marginRatio: 1 / 32
          }
        ]
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
