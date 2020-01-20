<template>
  <div class="jhtpcontainer" ref="jhtpcontainer">
    <input class="jh-text-center" v-bind:value="pickTime" @click="showTimePanel($event)" readonly />
    <div v-if="panelStatus" class="jh-time-panel">
      <div class="jh-panel-head">
        <div class="jh-panel-page jh-text-center jh-button-style" @click="goPreMonth">&lt;</div>
        <span class="jh-panel-time jh-text-center">{{ panelTime }}</span>
        <div class="jh-panel-page jh-text-center jh-button-style" @click="goNextMonth">&gt;</div>
      </div>
      <div
        v-for="week in weekDayText"
        class="jh-panel-week jh-text-center jh-button-style"
        :key="week"
      >{{ week }}</div>
      <div
        v-for="day in panelPreMonth"
        :key="day.id"
        class="jh-panel-day jh-no-select jh-text-center jh-button-style"
      >{{ day }}</div>
      <div
        v-for="day in panelCurMonth"
        class="jh-panel-day jh-text-center jh-button-style"
        @click="selectDay(day, $event)"
        v-bind:class="dayStyle(day)"
        :key="day.id"
      >{{ day }}</div>
      <div
        v-for="day in panelNextMonth"
        :key="day.id"
        class="jh-panel-day jh-no-select jh-text-center jh-button-style"
      >{{ day }}</div>
      <div class="jh-gotoday-style jh-text-center" v-if="todayStatus" @click="goToday($event)">今天</div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data: function() {
    return {
      pickTime: "",
      panelTime: "",
      realTime: "",
      preSelect: null,
      panelStatus: false,
      panelPreMonth: [],
      panelCurMonth: [],
      panelNextMonth: [],
      startYearMonth: "",
      startDay: "",
      endYearMonth: "",
      endDay: "",
      todayStatus: false,
      weekDayText: ["日", "一", "二", "三", "四", "五", "六"]
    };
  },
  props: ["params"],
  created: function() {
    let reg = /^\d{4}-\d{2}$|^\d{4}-\d{2}-\d{2}$/;
    if (this.params !== undefined) {
      if (
        this.params.endDate &&
        this.params.startDate &&
        this.params.endDate < this.params.startDate
      ) {
        console.warn("Please ensure your 'startDate' is less than 'endDate'");
      } else {
        if (this.params.startDate) {
          if (reg.test(this.params.startDate)) {
            this.startYearMonth = this.params.startDate.substr(0, 7);
            this.startDay = this.params.startDate.substr(8, 2) || 1;
          } else {
            console.warn(
              "Please ensure your format of parameter 'startDate' like as 'YYYY-MM-DD' or 'YYYY-MM'"
            );
          }
        }
        if (this.params.endDate) {
          if (reg.test(this.params.endDate)) {
            this.endYearMonth = this.params.endDate.substr(0, 7);
            this.endDay =
              this.params.endDate.substr(8, 2) ||
              dayjs(this.params.endDate).daysInMonth();
          } else {
            console.warn(
              "Please ensure your format of parameter 'endDate' like as 'YYYY-MM-DD' or 'YYYY-MM'"
            );
          }
        }
      }
    }
    this.goToday();
  },
  mounted: function() {
    let that = this;
    document.addEventListener("click", function(e) {
      e.stopPropagation();
      if (that.panelStatus) {
        that.panelStatus = false;
      }
    });
      this.$refs["jhtpcontainer"]
      .addEventListener("click", function(e) {
        e.stopPropagation();
      });
  },
  methods: {
    showTimePanel() {
      this.panelStatus = !this.panelStatus;
      this.panelPreMonth = this.createPreMonth(this.panelTime);
      this.panelCurMonth = this.createCurMonth(this.panelTime);
      this.panelNextMonth = this.createNextMonth(this.panelTime);
    },
    createPreMonth(time) {
      let moment = dayjs(time);
      let preDayArray = [];
      let firstWeekday = moment.date(1).day();
      let preTime = moment.subtract(1, "M");
      let preLastDay = preTime.daysInMonth();
      for (let i = 0; i < firstWeekday; i++) {
        preDayArray[i] = preLastDay - firstWeekday + 1 + i;
      }
      if (this.startYearMonth && time.substr(0, 7) === this.startYearMonth) {
        for (let j = 1; j < this.startDay; j++) {
          preDayArray.push(j);
        }
      }
      return preDayArray;
    },
    createCurMonth(time) {
      let moment = dayjs(time);
      let curDayArray = [];
      let preLastDay = moment.daysInMonth();
      let startDay =
        time.substr(0, 7) !== this.startYearMonth ? 1 : parseInt(this.startDay);
      let endDay =
        time.substr(0, 7) !== this.endYearMonth ? preLastDay : this.endDay;
      for (let i = startDay; i <= endDay; i++) {
        curDayArray.push(i);
      }
      return curDayArray;
    },
    createNextMonth(time) {
      let moment = dayjs(time);
      let nextDayArray = [];
      let preLastDay = moment.daysInMonth();
      let lastWeekday = moment.date(preLastDay).day();
      if (this.endYearMonth && time.substr(0, 7) === this.endYearMonth) {
        for (let j = parseInt(this.endDay); j < preLastDay; j++) {
          nextDayArray.push(j + 1);
        }
      }
      for (let i = 0; i < 6 - lastWeekday; i++) {
        nextDayArray.push(i + 1);
      }
      return nextDayArray;
    },
    goPreMonth() {
      let moment = dayjs(this.panelTime);
      let time = this.formatTimeYM(moment.subtract(1, "M"));
      if (this.startYearMonth && time.substr(0, 7) < this.startYearMonth) {
        return;
      }
      this.panelTime = time;
      this.panelPreMonth = this.createPreMonth(time);
      this.panelCurMonth = this.createCurMonth(time);
      this.panelNextMonth = this.createNextMonth(time);
    },
    goNextMonth() {
      let moment = dayjs(this.panelTime);
      let time = this.formatTimeYM(moment.add(1, "M"));
      if (this.endYearMonth && time.substr(0, 7) > this.endYearMonth) {
        return;
      }
      this.panelTime = time;
      this.panelPreMonth = this.createPreMonth(time);
      this.panelCurMonth = this.createCurMonth(time);
      this.panelNextMonth = this.createNextMonth(time);
    },
    selectDay(day, e) {
      e.stopPropagation();
      let moment = dayjs(this.panelTime);
      moment = moment.date(day);
      this.pickTime = this.formatTimeYMD(moment);
      this.$emit("change", this.pickTime);
      this.panelStatus = false;
    },
    dayStyle(day) {
      if (
        day === dayjs(this.realTime).date() &&
        this.realTime.substr(0, 7) === this.panelTime
      ) {
        if (this.realTime === this.pickTime) {
          return "jh-today-style jh-select-style";
        }
        return "jh-today-style";
      }
      if (
        day === dayjs(this.pickTime).date() &&
        this.pickTime.substr(0, 7) === this.panelTime
      ) {
        return "jh-select-style";
      }
      return "jh-otherday-style";
    },
    formatTimeYMD(moment) {
      return moment.format("YYYY-MM-DD");
    },
    formatTimeYM(moment) {
      return moment.format("YYYY-MM");
    },
    goToday(e) {
      let moment = dayjs();
      this.realTime = this.formatTimeYMD(moment);
      let tempTime = this.formatTimeYM(moment);
      if (this.startYearMonth && this.params.startDate > this.realTime) {
        this.panelTime = this.startYearMonth;
      } else if (this.endYearMonth && this.params.endDate < this.realTime) {
        this.panelTime = this.endYearMonth;
      } else {
        this.panelTime = tempTime;
        this.todayStatus = true;
      }
      this.panelStatus = false;
      if (e) {
        e.stopPropagation();
        this.pickTime = this.realTime;
        this.$emit("change", this.pickTime);
      }
    }
  }
};
</script>

<style scoped>
.jhtpcontainer {
  width: 120px;
  height: 28px;
  position: relative;
}
.jhtpcontainer input {
  height: 28px;
  width: 120px;
  border: 1px solid #999;
  border-radius: 4px;
  font-size: 16px;
  color: #666;
}
.jh-panel-head {
  color: #333;
}
.jh-time-panel {
  width: 242px;
  min-height: 228px;
  border: 1px solid #999;
  font-size: 0px;
  position: absolute;
  left: 0;
  top: 36px;
  padding: 8px;
  background-color: #fff;
  border-radius: 4px;
}
.jh-panel-day {
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 2px;
  color: #666;
}
.jh-panel-week {
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  color: #333;
}
.jh-panel-page {
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 2px;
  font-weight: bold;
}
.jh-panel-time {
  width: 160px;
  height: 28px;
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  user-select: none;
}
.jh-no-select {
  cursor: default;
  color: #ccc;
}
.jh-select-style {
  color: #fff;
  background-color: #099;
}
.jh-today-style {
  border: 1px dashed #999;
}
.jh-otherday-style:hover {
  background-color: #ddd;
}
.jh-gotoday-style {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin: 4px auto;
  user-select: none;
  width: 48px;
  color: #333;
}
.jh-text-center {
  text-align: center;
  line-height: 28px;
}
.jh-button-style {
  width: 28px;
  height: 28px;
  margin: 2px;
  user-select: none;
}
.jh-time-panel,
.jh-panel-day {
  box-sizing: border-box;
}
</style>