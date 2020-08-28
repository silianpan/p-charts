<!-- 柱状图 -->
<template>
  <Card shadow>
    <Spin v-if="loading" fix large></Spin>
    <p slot="title" class="analysis-card-title" @click="titleClick">{{ newOptions.title }}</p>
    <div :id="containerId" />
  </Card>
</template>

<script>
import CommonUtil from '@/utils/index'
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
export default {
  name: 'PColumn',
  props: {
    // 查询方法
    queryFunc: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    // 查询参数
    queryParams: {
      type: Object,
      default: () => {}
    },
    // 选项
    options: {
      type: Object,
      default: () => {}
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
    this.newOptions = { ...this.defaultOptions, ...this.options }
    this.queryData()
  },
  beforeDestroy() {
    if (this.chart !== null) {
      this.chart.destroy()
    }
  },
  watch: {
    // 监听查询参数
    queryParams: {
      handler(newVal, oldVal) {
        this.queryData()
      },
      deep: true
    },
    options: {
      handler(newVal, oldVal) {
        if (this.chart !== null) {
          this.chart.destroy()
          this.chart = null
        }
        this.newOptions = { ...this.defaultOptions, ...this.options }
        this.queryData()
      },
      deep: true
    }
  },
  methods: {
    async queryData() {
      if (this.$_.isEmpty(this.queryParams)) {
        return
      }
      this.loading = true
      const res = await this.queryFunc(this.queryParams)
      try {
        if (res && res.ok()) {
          if (this.chart !== null) {
            const nameOp = this.newOptions.fieldMap.name
            const timeOp = this.newOptions.fieldMap.time
            const valueOp = this.newOptions.fieldMap.value
            const foldFieldsOp = this.newOptions.foldFields
            const foldFieldsRenameOp = this.newOptions.foldFieldsRename
            const ds = new DataSet()
            const dv = ds.createView().source(res.data)
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
                row[timeOp] = foldFieldsRenameOp ? foldFieldsRenameOp[row[timeOp] + ''] : row[timeOp] + ''
                row[valueOp] =
                  row[valueOp] === undefined || row[valueOp] === null || isNaN(row[valueOp])
                    ? 0
                    : row[valueOp]
                return row
              }
            })
            this.chart.changeData(dv)
          } else {
            this.initChart(res.data)
          }
        }
      } catch (error) {
        this.loading = false
      }
      this.loading = false
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
          row[timeOp] = foldFieldsRenameOp ? foldFieldsRenameOp[row[timeOp] + ''] : row[timeOp] + ''
          row[valueOp] =
            row[valueOp] === undefined || row[valueOp] === null
              ? 0
              : row[valueOp]
          return row
        }
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
      this.chart.axis(nameOp, {
        label: {
          textStyle: {
            rotate: 16
          }
        }
      })
      this.chart.axis(valueOp, {
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
      })
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
          this.$_.isEmpty(this.newOptions.colorList)
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
