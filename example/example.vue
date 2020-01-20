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