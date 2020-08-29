# p-charts

> Chart components based on AntV G2

[Examples](http://silianpan.cn/p-charts)

## Getting Started

### installation

```bash
npm install -S p-charts
# or
yarn add p-charts
```

### Usage

```js
// main.js
import PCharts from 'p-charts'
Vue.use(PCharts)

// or
import PCharts from 'p-charts'
export default {
  components: {
    PCharts
  }
}
```

#### p-pie

```html
<template>
  <p-pie
    :data="PieJson"
    :options="options"
    ref="pieRef"
    @pie-title-click="handleTitleClick"
    @pie-label-click="handleLabelClick"
  />
</template>

<script>
import PieJson from './data/pie1.json'
export default {
  data() {
    return {
      PieJson,
      options: {
        fieldMap: {
          time: 'year',
          name: 'budgetSubject',
          // 统计指标，可以更换
          value: 'budgetNum'
        },
        title: `总收入和总支出占比情况-预算数（单位：万元）`,
        colorList: ['#1890ff', '#37c661']
      }
    }
  },
  methods: {
    updateData() {
      this.$refs.pieRef.initData()
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
```

## Development

``` bash
# install dependencies
npm install
# or
yarn

# serve with hot reload at localhost:8080
npm run dev
# or
yarn dev

# build for production with minification
npm run build
# or
yarn build
```
