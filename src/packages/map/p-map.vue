<!-- 地图 -->
<template>
  <div style="height:580px">
    <p slot="title" class="analysis-card-title" @click="titleClick">
      {{ newOptions.title }}
    </p>
    <div :id="containerId" />
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
      chart: null,
      containerId: '',
      newOptions: {},
      defaultOptions: {}
    }
  },
  created() {
    this.containerId = `container${CommonUtil.uuid()}`
  },
  mounted() {
    this.newOptions = { ...this.defaultOptions, ...this.options }
    this.initChart()
  },
  methods: {
    initChart() {
      const scene = new Scene({
        id: this.containerId,
        map: new Mapbox({
          center: [116.2825, 39.9],
          pitch: 0,
          style: 'blank',
          zoom: 3,
          minZoom: 0,
          maxZoom: 10
        })
      })

      scene.on('loaded', () => {
        new CountryLayer(scene, {
          data: this.data,
          joinBy: ['NAME_CHN', 'name'],
          depth: 1,
          fill: {
            color: {
              field: 'NAME_CHN',
              values: [
                '#feedde',
                '#fdd0a2',
                '#fdae6b',
                '#fd8d3c',
                '#e6550d',
                '#a63603'
              ]
            }
          },
          popup: {
            enable: true,
            Html: props => {
              return `<span>${props.NAME_CHN}</span>`;
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
