<!-- 地图 -->
<template>
  <div>
    <p slot="title" class="analysis-card-title" @click="titleClick">
      {{ newOptions.title }}
    </p>
    <div :style="`height:${newOptions.containerHeight};position:relative;width:100%`" :id="containerId" />
  </div>
</template>

<script>
import CommonUtil from '@/utils/index'
import { Scene } from '@antv/l7'
import { CountryLayer } from '@antv/l7-district'
import { Mapbox } from '@antv/l7-maps'
export default {
  name: 'PMap',
  props: {
    // 选项
    options: {
      type: Object,
      default: () => { }
    },
    // 数据
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      scene: null,
      containerId: '',
      newOptions: {},
      defaultOptions: {
        containerHeight: '580px',
        chartProps: {
          map: new Mapbox({
            center: [116.2825, 39.9],
            pitch: 0,
            style: 'blank',
            zoom: 3,
            minZoom: 0,
            maxZoom: 10
          })
        },
        // 字段映射
        fieldMap: {
          name: 'name',
          value: 'num'
        },
        // 值单位
        valueUnit: '个'
      }
    }
  },
  created() {
    this.containerId = `container${CommonUtil.uuid()}`
    this.newOptions = { ...this.defaultOptions, ...this.options }
  },
  mounted() {
    this.updateData()
  },
  beforeDestroy() {
    if (this.scene !== null) {
      this.scene.destroy()
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
      if (this.scene !== null) {
        const layers = this.scene.getLayers()
        if (layers !== null && layers !== undefined) {
          layers.forEach(item => {
            this.scene.removeLayer(item)
          })
        }
        this.scene.destroy()
        this.scene = null
      }
      this.newOptions = { ...this.defaultOptions, ...this.options }
      this.initChart()
    },
    initChart() {
      this.scene = new Scene({
        id: this.containerId,
        forceFit: true,
        ...this.newOptions.chartProps
      })

      const nameOp = this.newOptions.fieldMap.name
      const valueOp = this.newOptions.fieldMap.value
      this.scene.on('loaded', () => {
        new CountryLayer(this.scene, {
          data: this.data,
          joinBy: ['NAME_CHN', nameOp],
          depth: 1,
          fill: {
            color: {
              field: valueOp,
              // values: [
              //   '#feedde',
              //   '#fdd0a2',
              //   '#fdae6b',
              //   '#fd8d3c',
              //   '#e6550d',
              //   '#a63603'
              // ]
              values: [
                '#e6f7ff',
                '#bae7ff',
                '#91d5ff',
                '#69c0ff',
                '#40a9ff',
                '#1890ff',
                '#096dd9',
                '#0050b3',
                '#003a8c',
                '#002766'
              ]
            }
          },
          popup: {
            enable: true,
            Html: props => {
              return `<span>${props.NAME_CHN}: ${props[valueOp] || 0}${this.newOptions.valueUnit}</span>`;
            }
          }
        })
      })
    },
    titleClick() {
      this.$emit('column-title-click')
    }
  }
}
</script>
