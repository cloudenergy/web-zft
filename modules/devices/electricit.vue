<template>
  <div class="readingElectric">
    <el-table :data="readingElectric" :row-key="getRowKeys" @row-click='handleRowHandle'
              ref="readingElectric">
      <el-table-column type="index" width="50" label="序号" :index="indexMethod">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="innerTable">
            <el-table :data="props.row.details">
              <el-table-column label="房源" min-width="160">
              </el-table-column>
              <el-table-column label="仪表名称/ID" min-width="120">
                <template slot-scope="scope">
                  <span>{{ removePrefix(scope.row.device.deviceId) }}</span>
                  <br>
                </template>
              </el-table-column>
              <el-table-column label="用户姓名" min-width="120">
                <template slot-scope="scope">
                  <span style="margin-left: 2px;" class="margin_top">{{ username(scope.row) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="起始日期" min-width="160">
                <template slot-scope="scope">
                  <div>
                    <p>{{dateTime(scope.row.startDate*1000)}}</p>
                    <p>{{ usageDisplay(scope.row.startScale) }}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="截止日期" min-width="160">
                <template slot-scope="scope">
                  <div>
                    <p>{{dateTime(scope.row.endDate*1000)}}</p>
                    <p>{{ usageDisplay(scope.row.endScale) }}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="用量/Kwh" width="80">
                <template slot-scope="scope">
                  <span>{{ usageDisplay(scope.row.usage) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单价/元" width="70">
                <template slot-scope="scope">
                  <span>{{ price(scope.row.price) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="金额/元" width="80">
                <template slot-scope="scope">
                  <span>{{ price(scope.row.amount) }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="房源" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.location.district }}{{ scope.row.location.name }}</span>
          <br>
          <span style="margin-top:5px">{{ scope.row.building }}幢{{ scope.row.unit }}单元{{ scope.row.roomNumber }}室 <span>{{(scope.row.roomName?scope.row.roomName:'公区')}}</span></span>
          <br>
        </template>
      </el-table-column>
      <el-table-column label="仪表名称/ID" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.details.length!==0">{{ removePrefix(scope.row.details[0].device.deviceId) }}</span>
          <br>
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" min-width="120">
        <template slot-scope="scope">
          <span style="margin-left: 2px;" class="margin_top">{{ username(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="起始日期" min-width="160">
        <template slot-scope="scope">
          <el-date-picker v-model="scope.row.startDateForControl" type="date" placeholder="选择日期" style="width:160px"
                          @input="oldTime(scope.row,scope.$index)">
          </el-date-picker>
          <br/>
          <span v-if="scope.row.details.length!==0"
                class="margin_top">上期刻度：{{ usageDisplay(scope.row.details[0].startScale) }}Kwh</span>
          <br>
        </template>
      </el-table-column>
      <el-table-column label="截止日期" min-width="160">
        <template slot-scope="scope">
          <el-date-picker v-model="scope.row.endDateForControl" type="date" placeholder="选择日期" style="width:160px"
                          @change="newTime(scope.row,scope.$index)">
          </el-date-picker>
          <br/>
          <span v-if="scope.row.details.length!==0"
                class="margin_top">本期刻度：{{ usageDisplay(scope.row.details[0].endScale) }}Kwh</span>
          <br>
        </template>
      </el-table-column>
      <el-table-column label="用量/Kwh" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.details[0]">{{ usageDisplay(scope.row.details[0].usage) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价/元" width="70">
        <template slot-scope="scope">
          <span v-if="scope.row.details[0]">{{ price(scope.row.details[0].price) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额/元" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.details[0]">{{ price(scope.row.details[0].amount) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import fp from 'lodash/fp'
  import startOfYesterday from 'date-fns/start_of_yesterday'
  import getTime from 'date-fns/get_time'
  import format from 'date-fns/format'
  import {removePrefix} from '~/utils/helper';

  export default {
    props: {
      readingElectric: {
        type: Array
      },
      houseFormat: {
        required: true
      }
    },
    data() {
      return {
        valueuser: '',
        // 获取row的key值

        // 要展开的行，数值的元素是row的key值
        expands: [],
        // readingElectricData:[{startDate:'0',endDate:'0'}],
        upflowi: 0
      }
    },
    computed: {
      projectId() {
        return this.$store.state.userInfo.user.projectId
      }
    },
    mounted(){
      fp.each(this.mountTime.bind(this))(this.readingElectric)
    },
    watch: {
      readingElectric(newVal, oldVal) {
        if(!fp.isEmpty(newVal)) {
          fp.each(this.mountTime.bind(this))(newVal)
        }
      }
    },
    methods: {
      mountTime(data) {
        data.startDateForControl = new Date(data.startDate);
        data.endDateForControl = new Date(data.endDate)
      },
      username(row) {
        console.log('username', row);
        return fp.get('details[0].userName')(row) || fp.getOr('')('userName')(row)
      },
      indexMethod(row) {
        return row + 1;
      },
      removePrefix(val) {
        return removePrefix(val);
      },
      getRowKeys(row) {
        return row.index;
      },
      dateTime(data) {
        return format(new Date(data), 'YYYY-MM-DD')
      },
      price(val) {
        return (val / 100).toFixed(2)
      },
      usageDisplay(val) {
        return val ? Number(val).toFixed(2) : '0.00'
      },
      oldTime(data, index) {
        this.roomReading(data.startDateForControl.getTime() / 1000, data.endDateForControl.getTime() / 1000, data.houseId, data.roomId,
          index)
      },
      roomReading(startDate, endDate, houseId, roomId, index) {
        let roomReadingData = {
          houseFormat: this.houseFormat,
          startDate,
          endDate,
          houseId,
          roomId
        };
        this.$model('reading_equipment')
          .query(roomReadingData, {
            projectId: this.projectId
          })
          .then(({data, }) => {
            //TODO: why only one here?
            if (data.length === 1) {
              data[0].startDate = startDate * 1000;
              data[0].endDate = endDate * 1000;
              data[0].index = index;
              this.mountTime(data[0]);
              this.readingElectric[index] = data[0];
              this.$refs.readingElectric.toggleRowExpansion(this.readingElectric.find(d => d.index === index))
            }
          })
      },
      newTime(data, index) {
        this.roomReading(data.startDateForControl.getTime() / 1000, data.endDateForControl.getTime() / 1000, data.houseId, data.roomId,
          index)
      },
      computations(newnum, oldnum) {
        return newnum - oldnum;
      },
      computationsPrice(differentnum, price) {
        return differentnum * price
      },
      handleRowHandle(row, event) {
        // 阻止冒泡
        if (event.path[0].tagName != 'INPUT') {
          if (row.index != this.upflowi) {
            this.toggle(row.index)
            if (this.upflowi != 0) {
              this.toggle(this.upflowi)
              this.upflowi = row.index
            }
          } else {
            this.toggle(row.index)
          }
        }
      },
      // 展开
      toggle(flowi) {
        this.$refs.readingElectric.toggleRowExpansion(this.readingElectric.find(d => d.index === flowi))
      }
    }
  }
</script>

<style lang="less" scoped>
  input.choose {
    border: 1px solid transparent;
  }

  .devicesuser {
    display: inline-block;
    width: 100%;
  }

  .margin_top {
    margin-top: 5px;
  }

  .innerTable {
    padding-left: 45px;
  }

</style>
<style lang="less">
  .no-border > .el-input > .el-input__inner {
    border: 1px solid transparent;
    padding: 0;
    background-color: unset;
  }

  .innerTable .el-table__header-wrapper {
    display: none;
  }

  .readingElectric .el-table__expanded-cell {
    padding: 10px 0 0 50px;
    color: #999;
    background: #f5f7fa;
    .el-table__row {
      background: #f5f7fa;
    }
    .el-table, .el-table__expanded-cell {
      background: #f5f7fa;
    }
  }
</style>
