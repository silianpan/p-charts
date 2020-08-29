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
import columnJson from './data/column2.json'
export default {
  data() {
    return {
      columnJson,
      options: {
        title: '预算支出情况（万元）',
        foldFields: ['subtotal', 'outBase', 'outProject'],
        foldFieldsRename: {
          subtotal: '小计',
          outBase: '基本支出',
          outProject: '项目支出'
        },
        groupField: 'name',
        itemField: 'time',
        fieldMap: {
          time: 'outType',
          name: 'subject',
          value: 'outValue'
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
