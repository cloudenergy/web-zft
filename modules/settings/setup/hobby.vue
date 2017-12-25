<template>
<el-row :gutter="20">

<el-col :span="2">
  <el-menu
      class="el-menu-vertical-demo"
	  default-active='Contract'
	  @select='toggleComponents'
	  >
      <el-menu-item index="Contract">
        <span slot="title">合同偏好</span>
      </el-menu-item>
	   <el-menu-item index="Comm">
        <span slot="title">综合偏好</span>
      </el-menu-item>
	   <el-menu-item index="Cycle">
        <span slot="title">支付方式</span>
      </el-menu-item>
	   <el-menu-item index="Check">
        <span slot="title">财务审批</span>
      </el-menu-item>
      <el-menu-item index="ContractSettin">
        <span slot="title">合同设置</span>
      </el-menu-item>
      <el-menu-item index="Bill">
        <span slot="title">记账偏好</span>
      </el-menu-item>
      <el-menu-item index="Payment">
        <span slot="title">账单偏好</span>
      </el-menu-item>
      <el-menu-item index="Late">
        <span slot="title">滞纳金</span>
      </el-menu-item>
      <el-menu-item index="RoomPhone">
        <span slot="title">出房电话</span>
      </el-menu-item>
    </el-menu>
</el-col>

<el-col :span="22">
<component :is="currentView">

</component>
</el-col>
	</el-row>
</template>

<script>
import Contract from './hobby/contract';

export default {
	components: {
    Contract,
	},
	data() {
		return {
			currentView: 'Contract'
		};
	},
	methods: {
		toggleComponents(index, path) {
			this.currentView = index;
		}
	}
};
</script>