<template>
<el-row :gutter="20">

<el-col :span="2">
  <el-menu
      class="el-menu-vertical-demo"
	  default-active='Department'
	  @select='toggleComponents'
	  >
      <el-menu-item index="Department">
        <span slot="title">组织架构</span>
      </el-menu-item>
	   <el-menu-item index="Role">
        <span slot="title">岗位管理</span>
      </el-menu-item>
	   <el-menu-item index="Partner">
        <span slot="title">股东管理</span>
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
import Department from "../../../modules/settings/permit/department";
import Partner from "../../../modules/settings/permit/partner";
import Role from "../../../modules/settings/permit/role";


export default {
components:{
Department,
Partner,Role
},
	data() {
		return {
			currentView:'Department',
			
		};
	},
	methods: {
		toggleComponents(index,path){
			this.currentView=index
		}
		
	}
};
</script>