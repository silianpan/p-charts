import PPie from './packages/pie/index'
import PBar from './packages/bar/index'
import PColumn from './packages/column/index'
import PLineChart from './packages/line-chart/index'

const components = [PPie, PBar, PColumn, PLineChart]

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  PPie,
  PBar,
  PColumn,
  PLineChart
}
