import Vue from 'vue'
import App from './App.vue'
import './assets/common.css'
import PCharts from './index'
Vue.use(PCharts)

new Vue({
  el: '#app',
  render: h => h(App)
})
