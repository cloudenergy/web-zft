<template>
  <div class="usage-dialog">
    <div class="form-inline text-right">
      <!--<div class="btn-group btn-group-sm pull-left ml15">-->
        <!--<a class="btn btn-sm btn-primary"-->
           <!--:class="{active:currentChannelId===item.funcid}" v-for="item in channels"-->
           <!--@click="channelDetail()" ng-bind="item.channel"></a>-->
      <!--</div>-->
      <div class="form-group form-group-sm has-feedback date ml15">
        <input type="text" class="form-control" v-model="date"/>
        <i class="form-control-feedback emweb web-calendar"></i>
      </div>
      <div class="btn-group btn-group-sm ml15">
        <a class="btn btn-primary" @click="channelDetail()"><i
          class="emweb web-search"></i> 查询</a>
      </div>
      <div class="btn-group btn-group-sm ml15">
        <a class="btn btn-primary" v-for="(key,val) in timeTypes"
           :class="{active:timeType === key}" @click="timeTypeChange(key)" ng-bind="val"></a>
      </div>
      <div class="btn-group btn-group-sm ml15">
        <a class="btn btn-info" :class="{active: chartType === 'spline'}"
           @click="typeChange('spline')">
          折线<i class="emweb web-spline"></i>
        </a>
        <a class="btn btn-info" :class="{active: chartType === 'column'}"
           @click="typeChange('column')">
          柱状<i class="emweb web-column"></i>
        </a>
      </div>
      <div class="btn-group btn-group-sm ml15">
        <a class="btn btn-info" :class="{active: curveType === 'diff'}"
           @click="lineTypeChange('diff')">
          差值
          <i class="emweb web-curve-area"></i>
        </a>
        <a class="btn btn-info" :class="{active: curveType === 'scale'}"
           @click="lineTypeChange('scale')">
          刻度
          <i class="emweb web-line-spacing"></i>
        </a>
      </div>
    </div>
    <highcharts class="highcharts-panel mt15" :options="timeline"></highcharts>
  </div>
</template>

<script>
  import {
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
        timeFormat: {
          DAY: 'H',
          WEEK: 'M-DD',
          MONTH: 'M-DD',
          YEAR: 'YYYY-MM'
        },
        date: new Date(),
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
        return {
          'startDate': Date.parse(subDays(new Date(), 7)) / 1000,
          'endDate': Date.parse(new Date()) / 1000
        }
      },
      curveUnit() {
        return 'kWh'
      },
      timeline() {
        const data = this.curveType === 'diff' ? this.diffCurve(this.deviceScale)
          : this.scaleCurve(this.deviceScale)
        console.log(this.deviceScale, this.curveType, data);
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
                return format(new Date(this.value), 'H');
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
      }
    },
    methods: {
      formatValue(data, f) {
        return format(new Date(data), f)
      },
      typeChange(type) {
        this.$set(this, 'chartType', type);
      },
      lineTypeChange(type) {
        this.$set(this, 'curveType', type);
      },
      timeTypeChange(type) {
        this.$set(this, 'timeType', type);
      },
      channelDetail() {
        this.$model('device_usage')
          .query(this.reqData, {
            projectId: this.projectId,
            deviceId: this.oneEquipment ? this.houseDevice : this.houseDevice.devices[0].deviceId
          })
          .then(res => {
            this.$set(this, 'deviceScale', res)
            console.log(this.deviceScale);
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

<style scoped>
  .usage-dialog {
    margin: 15px;
  }
</style>
