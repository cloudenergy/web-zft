<template>
	<div class="top-nav">

		  <el-tabs v-model="activeName" @tab-click="handleClick" style="height:100%">
        <div v-loading="loading">
            <el-tab-pane label="按科目" name="second"><flowsubject/></el-tab-pane>
            <el-tab-pane label="按时间" name="first"><quantum/></el-tab-pane>
            <el-tab-pane label="按月度" name="third"><flowmounth/></el-tab-pane>
            <el-tab-pane label="按渠道" name="fourth"><flowchnnel/></el-tab-pane>
        </div>
            
      </el-tabs>

	</div>
</template>
<script>
  import {
		flowchnnel,
		flowmounth,
		flowsubject,
		quantum
	} from './index';
  export default {
    components: {
      flowchnnel,
      flowmounth,
      flowsubject,
      quantum,
    },
    data() {
      return {
        activeName: 'first',
        loading: false,
        tanind: 0
      };
    },
    methods: {
      handleClick(tab) {
        this.tanind = parseInt(tab.index);
        // switch(this.tanind){
        //   case 0:
        //     this.loading0=true;
        //   case 1:
        //     this.loading1=true;
        //     break;
        //   case 2:
        //     this.loading2=true;
        //     break;
        //   case 3:
        //     this.loading3=true;
        //     break;
      
        }
      }
    }
</script>

<style lang="less" scoped>
  .top-nav{
    height: 100%;

  }
</style>