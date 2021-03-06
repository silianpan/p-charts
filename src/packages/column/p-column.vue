<!-- 柱状图 -->
<template>
  <div>
    <p slot="title" class="analysis-card-title" @click="titleClick">
      {{ newOptions.title }}
    </p>
    <div :id="containerId" />
  </div>
</template>

<script>
import _ from 'lodash'
import CommonUtil from '@/utils/index'
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
export default {
  name: 'PColumn',
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
      chart: null,
      containerId: '',
      defaultOptions: {
        // 标题
        title: '',
        // chart本身属性：width,height等
        chartProps: {
          height: 500,
          padding: [10, 120, 80, 120]
        },
        scaleProps: null,
        legendProps: null,
        adjustProps: null,
        labelProps: {
          offset: 10
        },
        tooltipProps: {
          showTitle: false
        },
        xFieldProps: {
          label: {
            textStyle: {
              rotate: 16
            }
          }
        },
        yFieldProps: {
          line: {
            lineWidth: 2,
            lineDash: [3, 3]
          },
          label: {
            textStyle: {
              fill: '#aaaaaa'
            }
          },
          title: {
            offset: 60
          }
        },
        transformProps: [],
        // 图形颜色列表
        colorList: [],
        // 组合字段（分组字段）
        groupField: 'name',
        // 条目字段（明细字段、图例字段）
        itemField: 'time',
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
      try {
        if (this.chart !== null) {
          const nameOp = this.newOptions.fieldMap.name
          const timeOp = this.newOptions.fieldMap.time
          const valueOp = this.newOptions.fieldMap.value
          const foldFieldsOp = this.newOptions.foldFields
          const foldFieldsRenameOp = this.newOptions.foldFieldsRename
          const ds = new DataSet()
          const dv = ds.createView().source(this.data)
          if (foldFieldsOp) {
            dv.transform({
              type: 'fold',
              fields: foldFieldsOp,
              key: this.newOptions.fieldMap[this.newOptions.itemField],
              value: valueOp
            })
          }
          dv.transform({
            type: 'map',
            callback(row) {
              // 加工数据后返回新的一行，默认返回行数据本身
              row[nameOp] = row[nameOp] + ''
              row[timeOp] = foldFieldsRenameOp
                ? foldFieldsRenameOp[row[timeOp] + '']
                : row[timeOp] + ''
              row[valueOp] =
                row[valueOp] === undefined ||
                row[valueOp] === null ||
                isNaN(row[valueOp])
                  ? 0
                  : row[valueOp]
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
        console.log('err', err)
      }
    },
    initChart(data) {
      const nameOp = this.newOptions.fieldMap.name
      const valueOp = this.newOptions.fieldMap.value
      const timeOp = this.newOptions.fieldMap.time
      const valueUnitOp = this.newOptions.valueUnit
      const foldFieldsOp = this.newOptions.foldFields
      const foldFieldsRenameOp = this.newOptions.foldFieldsRename

      const ds = new DataSet()
      const dv = ds.createView().source(data)
      if (foldFieldsOp) {
        dv.transform({
          type: 'fold',
          fields: foldFieldsOp,
          key: this.newOptions.fieldMap[this.newOptions.itemField],
          value: valueOp
        })
      }
      dv.transform({
        type: 'map',
        callback(row) {
          // 加工数据后返回新的一行，默认返回行数据本身
          row[nameOp] = row[nameOp] + ''
          row[timeOp] = foldFieldsRenameOp
            ? foldFieldsRenameOp[row[timeOp] + '']
            : row[timeOp] + ''
          row[valueOp] =
            row[valueOp] === undefined || row[valueOp] === null
              ? 0
              : row[valueOp]
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
        [valueOp]: {
          alias: this.newOptions.title
        }
        // [timeOp]: {
        //   type: 'timeCat'
        // }
      })
      if (this.newOptions.scaleProps) {
        this.chart.scale(this.newOptions.scaleProps)
      }
      this.chart.axis(nameOp, this.newOptions.xFieldProps)
      this.chart.axis(valueOp, this.newOptions.yFieldProps)
      this.chart.legend(this.newOptions.legendProps)
      this.chart.tooltip(this.newOptions.tooltipProps)
      this.chart
        .interval()
        .position(
          `${this.newOptions.fieldMap[this.newOptions.groupField]}*${valueOp}`
        )
        // .size(26)
        .opacity(1)
        .label(valueOp, this.newOptions.labelProps)
        .adjust(this.newOptions.adjustProps)
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
      this.chart.on('label:click', ev => {
        this.$emit('column-label-click', ev.data)
      })
      this.chart.render()
      this.$nextTick(() => {
        this.chart.forceFit()
      })
    },
    titleClick() {
      this.$emit('column-title-click')
    }
  }
}
</script>
