<template>
  <div>
    <div class="form-inline text-right">
      <div class="btn-group btn-group-sm pull-left ml15">
        <a href="javascript:void(0)" class="btn btn-sm btn-primary"
           ng-class="{active:$ctrl.currentchannelid===item.funcid}" ng-repeat="item in $ctrl.channels"
           ng-click="$ctrl.currentchannelid=item.funcid;$ctrl.channeldetail()" ng-bind="item.channel"></a>
      </div>
      <div class="form-group form-group-sm has-feedback date ml15">
        <input type="text" class="form-control" ng-model="$ctrl.date" datetimepicker/>
        <i class="form-control-feedback emweb web-calendar"></i>
      </div>
      <div class="btn-group btn-group-sm ml15">
        <a class="btn btn-primary" href="javascript:void(0)" ng-click="$ctrl.channeldetail()"><i
          class="emweb web-search"></i> 查询</a>
      </div>
      <div class="btn-group btn-group-sm ml15">
        <a class="btn btn-primary" href="javascript:void(0)" ng-repeat="(key,val) in $ctrl.timetype"
           ng-class="{active:$ctrl.timetype_current===key}" ng-click="$ctrl.timetypeChange(key)" ng-bind="val"></a>
      </div>
      <div class="btn-group btn-group-sm ml15">
        <a class="btn btn-info" href="javascript:void(0)" ng-class="{active:$ctrl.charttype==='spline'}"
           ng-click="$ctrl.typeChange('spline');">
          折线<i class="emweb web-spline"></i>
        </a>
        <a class="btn btn-info" href="javascript:void(0)" ng-class="{active:$ctrl.charttype==='column'}"
           ng-click="$ctrl.typeChange('column');">
          柱状<i class="emweb web-column"></i>
        </a>
      </div>
      <div class="btn-group btn-group-sm ml15">
        <a class="btn btn-info" href="javascript:void(0)" ng-class="{active:$ctrl.curve.type==='diff'}"
           ng-click="$ctrl.lineType('diff');">
          差值
          <i class="emweb web-curve-area"></i>
        </a>
        <a class="btn btn-info" href="javascript:void(0)" ng-class="{active:$ctrl.curve.type==='scale'}"
           ng-click="$ctrl.lineType('scale');">
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
      }
    },
    data() {
      return {
        deviceScale: [],
        curveEnabled: true,
        curve: {
            diff: [],
            scale: [],
          },
        categories: []
      }
    },
    created() {
      this.$model('device_usage')
        .query(this.reqData, {
          projectId: this.projectId,
          deviceId: this.oneEquipment ? this.houseDevice : this.houseDevice.devices[0].deviceId
        })
        .then(res => {
          this.$set(this, 'deviceScale', res)
          console.log(this.deviceScale);
          this.$set(this, 'categories', fp.map(t => t.time * 1000)(this.deviceScale))
          this.$set(this.curve, 'diff', fp.map(e => Number((e.usage / 10000).toFixed(2)))(this.deviceScale))
          this.$set(this.curve, 'scale', fp.map(e => Number((e.endScale / 10000).toFixed(2)))(this.deviceScale))
        })

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
      chartType() {
        return 'column'
      },
      timeFormat() {
        return 'H'
      },
      curveUnit() {
        return 'kWh'
      },
      curveTitle() {
        return 'title'
      },
      curveType() {
        return 'diff'
      },
      timeline() {
        return {
          chart: {
            type: this.chartType
          },
          title: false,
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
            name: this.curveTitle,
            data: this.curve[this.curveType]
          }]
        }
      }
    },
    methods: {
      formatValue(data, f) {
        return format(new Date(data), f)
      },
    }
  }
</script>

<style scoped>

</style>
