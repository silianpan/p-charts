# p-charts

> Chart components based on AntV G2

[![CircleCI status][circleci-image]][circleci-url] [![CI status][github-action-image]][github-action-url] [![codecov][codecov-image]][codecov-url] [![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[![david deps][david-image]][david-url] [![david devDeps][david-dev-image]][david-dev-url] [![Total alerts][lgtm-image]][lgtm-url] [![FOSSA Status][fossa-image]][fossa-url] [![Issues need help][help-wanted-image]][help-wanted-url]

[![Follow Twitter][twitter-image]][twitter-url] [![Gitter][gitter-english-image]][gitter-english-url] [![Gitter][gitter-chinese-image]][gitter-chinese-url] [![[SemVer stability]][semver-stability-image]][semver-stability-url]

[Document](https://juejin.im/post/6866330015970099208/)

[Blog](http://silianpan.cn/index.php/2020/08/29/p-charts/)

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
