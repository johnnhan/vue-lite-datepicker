import Vue from 'vue'
import Example from './example.vue'
// 打包前的组件测试
import DatePicker from '../src/index.js'
// 打包后的组件测试
// import DatePicker from '../dist/vue-lite-datepicker.umd.js'

Vue.use(DatePicker)

new Vue({
  render: h => h(Example),
}).$mount('#app')
