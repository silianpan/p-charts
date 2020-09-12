<!-- 折线图 -->
<template>
  <div>
    <p slot="title" class="analysis-card-title" @click="titleClick">
      {{ newOptions.title }}
    </p>
    <Spin v-if="loading" fix large></Spin>
    <div :id="containerId" />
  </div>
</template>

<script>
import _ from 'lodash'
import CommonUtil from '@/utils/index'
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
export default {
  name: 'PLineChart',
  props: {
    // 选项
    options: {
      type: Object,
      default: () => {}
    },
    // 数据
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      chart: null,
      containerId: '',
      defaultOptions: {
        // 标题
        title: '',
        // chart本身属性：width,height等
        chartProps: {
          height: 500,
          padding: [20, 120, 100, 120]
        },
        legendProps: null,
        adjustProps: null,
        labelProps: {
          textStyle: {
            fill: '#0050b3',
            fontSize: '12'
            // fontWeight: 'bold',
            // rotate: -60
          }
        },
        tooltipProps: {
          crosshairs: {
            type: 'line'
          }
        },
        yFieldProps: {
          line: {
            lineWidth: 2,
            lineDash: [3, 3]
          },
          label: {
            formatter: val => {
              return val + this.defaultOptions.valueUnit
            }
          }
        },
        transformProps: [],
        // 图形颜色列表
        colorList: [],
        // 组合字段（分组字段）
        groupField: 'time',
        // 条目字段（明细字段、图例字段）
        itemField: 'name',
        // 字段映射
        fieldMap: {
          time: 'year',
          name: 'budgetSubject',
          value: 'budgetFinalNum'
        },
        // 值单位
        valueUnit: '万元'
      },
      newOptions: {}
    }
  },
  created() {
    this.containerId = `container${CommonUtil.uuid()}`
  },
  mounted() {
    this.updateData()
  },
  beforeDestroy() {
    if (this.chart !== null) {
      this.chart.destroy()
    }
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        this.updateData()
      },
      deep: true
    },
    data: {
      handler(newVal, oldVal) {
        this.updateData()
      },
      deep: true
    }
  },
  methods: {
    updateData() {
      if (this.chart !== null) {
        this.chart.destroy()
        this.chart = null
      }
      this.newOptions = { ...this.defaultOptions, ...this.options }
      this.initData()
    },
    initData() {
      if (_.isEmpty(this.data)) {
        return
      }
      this.loading = true
      try {
        if (this.chart !== null) {
          const valueOp = this.newOptions.fieldMap.value
          const ds = new DataSet()
          const dv = ds.createView().source(this.data)
          dv.transform({
            type: 'map',
            callback(row) {
              if (
                row[valueOp] === null ||
                row[valueOp] === undefined ||
                isNaN(row[valueOp])
              ) {
                row[valueOp] = 0
              }
              return row
            }
          })
          this.newOptions.transformProps.forEach(item => {
            dv.transform(item)
          })
          this.chart.changeData(dv)
        } else {
          this.initChart(this.data)
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    initChart(data) {
      const timeOp = this.newOptions.fieldMap.time
      const valueOp = this.newOptions.fieldMap.value
      const valueUnitOp = this.newOptions.valueUnit

      const ds = new DataSet()
      const dv = ds.createView().source(data)
      dv.transform({
        type: 'map',
        callback(row) {
          if (
            row[valueOp] === null ||
            row[valueOp] === undefined ||
            isNaN(row[valueOp])
          ) {
            row[valueOp] = 0
          }
          return row
        }
      })

      this.newOptions.transformProps.forEach(item => {
        dv.transform(item)
      })

      this.chart = new G2.Chart({
        container: this.containerId,
        forceFit: true,
        ...this.newOptions.chartProps
      })
      this.chart.source(dv, {
        [timeOp]: {
          // 自定义刻度间距
          tickInterval: 1
        }
      })
      this.chart.axis(valueOp, this.newOptions.yFieldProps)
      this.chart.legend(this.newOptions.legendProps)
      this.chart.tooltip(this.newOptions.tooltipProps)

      this.chart
        .line()
        .position(
          `${this.newOptions.fieldMap[this.newOptions.groupField]}*${valueOp}`
        )
        .color(
          this.newOptions.fieldMap[this.newOptions.itemField],
          _.isEmpty(this.newOptions.colorList)
            ? null
            : this.newOptions.colorList
        )
        .tooltip(
          `${this.newOptions.fieldMap[this.newOptions.itemField]}*${valueOp}`,
          (name, value) => {
            return {
              name: name,
              value: value + valueUnitOp
            }
          }
        )
      this.chart
        .point()
        .position(
          `${this.newOptions.fieldMap[this.newOptions.groupField]}*${valueOp}`
        )
        .color(
          this.newOptions.fieldMap[this.newOptions.itemField],
          _.isEmpty(this.newOptions.colorList)
            ? null
            : this.newOptions.colorList
        )
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        })
        .label(valueOp, this.newOptions.labelProps)
        .tooltip(
          `${this.newOptions.fieldMap[this.newOptions.itemField]}*${valueOp}`,
          (name, value) => {
            return {
              name: name,
              value: value + valueUnitOp
            }
          }
        )
      this.chart.on('point:click', ev => {})
      this.chart.render()
    },
    titleClick() {
      this.$emit('line-title-click')
    }
  }
}
</script>
