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
import columnJson from './data/column1.json'
export default {
  data() {
    return {
      columnJson,
      options: {
        title: `支出分布情况-预算数（单位：万元）`,
        fieldMap: {
          time: 'year',
          name: 'budgetSubject',
          value: 'budgetNum'
        },
        chartProps: {
          height: 500,
          padding: [50, 120, 100, 120]
        },
        legendProps: {
          offsetY: -1,
          position: 'top'
        },
        labelProps: {
          // useHtml: true,
          // htmlTemplate: function htmlTemplate(text, item) {
          //   return (
          //     '<span class="g2-label-item"><p class="g2-label-item-value">' +
          //     item.point.budgetFinalNum +
          //     '</p></span>'
          //   )
          // }
          offset: 10,
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
