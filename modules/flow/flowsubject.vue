<template>
  <div>
    <div class="block" style="margin-bottom:10px">
        <el-form :inline="true" :model="formInline" class="demo-form-inline  flexc flexce" size="mini">   
          <goend/>
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
      <flowsubjectlist/>
  </div>
</template>
<script>
import flowsubjectlist from './flowsubjectlist.vue'
import goend from './goend.vue'

export default {
  components: {
      flowsubjectlist,
      goend
  },
  data() {
    return {
      formInline: {
          user: '',
          region: '',
          type: '',
          city: '',
          community: ''
        }
    }
  }
}
</script>
<style lang="less" scoped>
    .importres{
    flex:1;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
    .flexce{
    align-items: center;
  }
    .minisel{
    width: 100px;
  }
  .marsp{
    margin-right:5px;
  }
  .marspa{
    margin-left: 5px;
  }
</style>
