<template>
  <div>
    <div class="block">
        <el-form :inline="true" :model="formInline" class="demo-form-inline  flexc flexce" size="mini">
          <div style="position:relative;display:inline-block;">
            <span class="marsp">范围</span>
            <el-date-picker
              v-model="value3"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:200px;padding:3px"
              class="datach">
            </el-date-picker>
            <span style="position: absolute;" class="shabi">至</span>
          </div>
          
          <span class="marsp marspa ">流水来源</span>
          <el-form-item label="" style="margin:0">
            <el-select v-model="formInline.region" placeholder="流水来源" class="minisel">
              <el-option label="充值账户" value="1"></el-option>
              <el-option label="租金扣费" value="2"></el-option>
              <el-option label="仪表扣费" value="3"></el-option>
            </el-select>
          </el-form-item>
          <span class="marsp marspa ">承租方式</span>
          <el-form-item label="" style="margin:0">
            <el-select v-model="formInline.type" placeholder="承租方式" class="minisel">
              <el-option label="全部" value="1"></el-option>
              <el-option label="合租" value="2"></el-option>
              <el-option label="整租" value="3"></el-option>
              <el-option label="整栋" value="4"></el-option>
            </el-select>
          </el-form-item>
          <span class="marsp marspa ">城市</span>
          <el-form-item label="" style="margin:0">
            <el-select v-model="formInline.city" placeholder="城市" class="minisel">
              <el-option label="杭州" value="1"></el-option>
              <el-option label="背景" value="2"></el-option>
              <el-option label="上海" value="3"></el-option>
            </el-select>
          </el-form-item>
          <span class="marsp marspa ">小区</span>
          <el-form-item label="" style="margin:0">
            <el-select v-model="formInline.community" placeholder="小区" class="minisel">
              <el-option label="1号小区" value="1"></el-option>
              <el-option label="2号小区" value="2"></el-option>
              <el-option label="3号小区" value="3"></el-option>
            </el-select>
          </el-form-item>
          <rent-search/>
          <div class="importres">
            <div class="actions">
              <el-button type="warning" size="mini">
                导出
                <i class="el-icon-sort"></i>
              </el-button>
            </div>
            <span class="result-info">32项结果</span>
          </div>
          
        </el-form>
      </div>
  </div>
  
</template>

<script>
  import {RentSearch} from '../rent'
  export default {
    components: {
			RentSearch
		},
    data() {
      return {  
        value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        formInline: {
          user: '',
          region: '',
          type: '',
          city: '',
          community: ''
        }
      };
    }
  };
</script>

<style lang="less" scoped>
  .flexce{
    align-items: center;
  }
  .marsp{
    margin-right:5px;
  }
  .marspa{
    margin-left: 5px;
  }
  .minisel{
    width: 100px;
  }

  .shabi{
    left: 128px;
    top: 5px;
    display: inline-block;
    line-height: 18px;
    background-color: #fff;
  }
  .importres{
    flex:1;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
</style>
