## vue-lite-datepicker

### 安装  

```bash
# 组件依赖 dayjs，所以需要安装 dayjs
npm i vue dayjs vue-lite-datepicker
```

### 使用

```js
import Vue from 'vue'
import DatePicker from 'vue-lite-datepicker'
Vue.use(DatePicker)
```

### 示例

```html
<template>
<div>
  <date-picker :params="params" @change="showDate"></date-picker>
</div>
</template>

<script>
export default {
  data () {
    return {
      params: {
        startDate: '2019-08-08',
        endDate: '2020-06-06'
      }
    }
  },
  methods: {
    showDate (curDate) {
      // 打印选中的时间
      console.log(curDate)
    }
  }
}
</script>
```

### 参数

| 参数 | 说明 |  
| ---- | ---- |  
| startDate | 设置时间选择器的开始时间 |
| endDate | 设置时间选择器的结束时间 |
    
### 事件

change：选中时间后会触发，回调函数参数为当前选择的时间
    
### 注意事项

* 如果不带起止时间参数则默认可以选择所有时间
* 起止时间参数格式为`YYYY-MM-DD`或`YYYY-MM`，格式错误则认为没有参数
* 如果起始时间大于截止时间则认为没有参数
* 如果只有起始时间则可以选择起始时间之后的所有时间
* 如果只有截止时间则可以选择截止时间之前的所有时间
* 如果起止时间不包含今天则不会显示`今天`按钮
* 如果起始时间格式为`YYYY-MM`，则默认从该月 1 号开始
* 如果截止时间格式为`YYYY-MM`，则默认到该月最后一天截止