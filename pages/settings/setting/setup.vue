<template>
<el-row :gutter="20">

<el-col :span="2">
  <el-menu
      class="el-menu-vertical-demo"
	  default-active='Dict'
	  @select='toggleComponents'
	  >
      <el-menu-item index="Dict">
        <span slot="title">字典管理</span>
      </el-menu-item>
	   <el-menu-item index="Hobby">
        <span slot="title">偏好设置</span>
      </el-menu-item>
	   <el-menu-item index="Online">
        <span slot="title">线上签约</span>
      </el-menu-item>
	   <el-menu-item index="Generalize">
        <span slot="title">全网推广</span>
      </el-menu-item>
       <el-menu-item index="Company">
        <span slot="title">企业设置</span>
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
import Dict from "../../../modules/settings/setup/dict";


export default {
components:{
Dict
},
	data() {
		return {
			currentView:'Dict',
			
		};
	},
	methods: {
		toggleComponents(index,path){
			this.currentView=index
		}
		
	}
};
</script>