<template>
  <div class="usage-dialog">
    <div class="form-inline pull-left">
      <el-button type="primary">
                 正向有功
      </el-button>
    </div>
    <div class="form-inline text-right pull-right">
      <div class="form-inline pull-left">
        <el-date-picker v-model="selectedTime" :type="pickType" placeholder="选择日期" style="width:160px">
        </el-date-picker>
      </div>

      <el-button-group>
        <el-button type="primary" icon="el-icon-search" class="search-button"
                   @click="channelDetail()"> 查询
        </el-button>
      </el-button-group>
      <el-button-group>
        <el-button type="primary" v-for="(val, key) in timeTypes" :key="key"
                   :class="{active:timeType === key}" class="time-type-buttons" @click="timeTypeChange(key)">{{val}}
        </el-button>
      </el-button-group>
      <el-button-group class="chart-type-buttons">
        <el-button type="primary"
                   :class="{active: chartType === 'spline'}" icon="el-icon-edit-outline"
                   @click="typeChange('spline')"> 折线
        </el-button>
        <el-button type="primary"
                   :class="{active: chartType === 'column'}" icon="el-icon-picture"
                   @click="typeChange('column')"> 柱状
        </el-button>
      </el-button-group>
      <el-button-group class="chart-type-buttons">
        <el-button type="primary"
                   :class="{active: curveType === 'diff'}" icon="el-icon-tickets"
                   @click="lineTypeChange('diff')"> 差值
        </el-button>
        <el-button type="primary"
                   :class="{active: curveType === 'scale'}" icon="el-icon-sort"
                   @click="lineTypeChange('scale')"> 刻度
        </el-button>
      </el-button-group>
    </div>
    <highcharts class="highcharts-panel mt15" :options="timeline"></highcharts>
  </div>
</template>

<script>
  import {
    startOfDay,
    startOfWeek,
    startOfMonth,
    startOfYear,
    subDays,
    format
  } from 'date-fns';
  import fp from 'lodash/fp';

  export default {
    props: {
      houseDevice: {
        required: true
      },
      oneEquipment: {
        type: Boolean
      },
      title: {
        type: String
      }
    },
    data() {
      return {
        deviceScale: [],
        curveEnabled: true,
        categories: [],
        chartType: 'spline',
        curveType: 'diff',
        currentChannelId: '',
        timeType: 'DAY',
        timeTypes: {
          DAY: '日',
          WEEK: '周',
          MONTH: '月',
          YEAR: '年'
        },
        startTimeOfTypes: {
          DAY: startOfDay,
          WEEK: t => startOfWeek(t, {weekStartsOn: 1}),
          MONTH: startOfMonth,
          YEAR: startOfYear
        },
        timeFormat: {
          DAY: 'H',
          WEEK: 'M-DD',
          MONTH: 'M-DD',
          YEAR: 'YYYY-MM'
        },
        pickTypes: {
          DAY: 'date',
          WEEK: 'week',
          MONTH: 'month',
          YEAR: 'year'
        },
        selectedTime: subDays(new Date(), 1),
        channels: [],
      }
    },
    mounted() {
      this.channelDetail();
    },
    computed: {
      projectId() {
        return this.$store.state.userInfo.user.projectId
      },
      reqData() {
        console.log(`this.selectedTime ${this.selectedTime} ${this.startTimeOfTypes[this.timeType](this.selectedTime)}`);
        return {
          startDate: Date.parse(this.startTimeOfTypes[this.timeType](this.selectedTime)) / 1000,
          mode: this.timeType
        }
      },
      curveUnit() {
        return 'kWh'
      },
      timeline() {
        const data = this.curveType === 'diff' ? this.diffCurve(this.deviceScale)
          : this.scaleCurve(this.deviceScale)
        const currentFormat = this.timeFormat[this.timeType]
        return {
          chart: {
            type: this.chartType
          },
          title: true,
          xAxis: {
            type: 'datetime',
            categories: this.categories,
            labels: {
              formatter: function () {
                return format(new Date(this.value), currentFormat);
              }
            }
          },
          yAxis: {
            title: false
          },
          tooltip: {
            xDateFormat: '%m月%d日',
            pointFormat: '{series.name}: <span style="color:{point.color};font-weight:700;">{point.y:.2f} ' + this.curveUnit + '</span>'
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: '{point.y:.2f}' + this.curveUnit
              }
            }
          },
          series: [{
            name: this.title,
            data
          }]
        }
      },
      pickType() {
        return this.pickTypes[this.timeType]
      },
    },
    methods: {
      typeChange(type) {
        this.$set(this, 'chartType', type);
      },
      lineTypeChange(type) {
        this.$set(this, 'curveType', type);
      },
      timeTypeChange(type) {
        this.$set(this, 'timeType', type);
        this.channelDetail()
      },
      channelDetail() {
        this.$model('device_usage')
          .query(this.reqData, {
            projectId: this.projectId,
            deviceId: this.oneEquipment ? this.houseDevice : this.houseDevice.devices[0].deviceId
          })
          .then(res => {
            this.$set(this, 'deviceScale', res)
            this.$set(this, 'categories', fp.map(t => t.time * 1000)(this.deviceScale))
          })
      },
      diffCurve(deviceScale) {
        return fp.map(e => Number((e.usage / 10000).toFixed(2)))(deviceScale)
      },
      scaleCurve(deviceScale) {
        return fp.map(e => Number((e.endScale / 10000).toFixed(2)))(deviceScale)
      },
    }
  }
</script>

<style lang="less" scoped>
  .form-inline {
    margin-bottom: 10px;
  }
  .el-button-group {
    margin: 0 5px;
  }
  .time-type-buttons, .search-button {
    background-color: #1abc9c;
    &.active {
      background-color: #16a085;
    }
  }

  .chart-type-buttons .el-button {
    background-color: #3498db;
    &.active {
      background-color: #2c81ba;
    }
  }

</style>
