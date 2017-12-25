<template>
<el-row :gutter="20">

<el-col :span="2">
  <el-menu
      class="el-menu-vertical-demo"
	  default-active='CostsSet'
	  @select='toggleComponents'
	  >
      <el-menu-item index="CostsSet">
        <span slot="title">费用设定</span>
      </el-menu-item>
	   <el-menu-item index="Discount">
        <span slot="title">折扣设定</span>
      </el-menu-item>
	   <el-menu-item index="Housing">
        <span slot="title">房源设备</span>
      </el-menu-item>
	   <el-menu-item index="ModeOfPayment">
        <span slot="title">支付方式</span>
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
import CostsSet from './dict/costsSet';
import Housing from './dict/housing';

export default {
	components: {
    CostsSet,
    Housing
	},
	data() {
		return {
			currentView: 'CostsSet'
		};
	},
	methods: {
		toggleComponents(index, path) {
			this.currentView = index;
		}
	}
};
</script>