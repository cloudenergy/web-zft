<template>
	<div class="top-nav">
		<div class="links">
		<el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="按时间" name="first">
                <quantum/>
                <quantumlist/>
            </el-tab-pane>
            <el-tab-pane label="按科目" name="second"><flowsubject/></el-tab-pane>
            <el-tab-pane label="按月度" name="third"><flowmounth/></el-tab-pane>
            <el-tab-pane label="按渠道" name="fourth"><flowchnnel/></el-tab-pane>
        </el-tabs>
		</div>
	</div>
</template>
<script>
import {
		flowchnnel,
		flowmounth,
		flowsubject,
		quantum,
		quantumlist
	} from './index';
  export default {
    components: {
		flowchnnel,
		flowmounth,
		flowsubject,
        quantum,
        quantumlist
		},
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab) {
        console.log(tab.index);
      }
    }
  };
</script>

<style lang="less" scoped>
	
</style>