<template>
<el-row :gutter="20">

<el-col :span="3">
  <el-menu
      class="el-menu-vertical-demo"
	  default-active='Profile'
	  @select='toggleComponents'
	  >
      <el-menu-item index="Profile">
        <span slot="title">个人资料</span>
      </el-menu-item>
	   <el-menu-item index="Aptinfo">
        <span slot="title">公寓资料</span>
      </el-menu-item>
	   <el-menu-item index="PassWord">
        <span slot="title">账号密码</span>
      </el-menu-item>
	   <el-menu-item index="PayNew">
        <span slot="title">服务购买</span>
      </el-menu-item>
    </el-menu>
</el-col>

<el-col :span="20">
<component :is="currentView">

</component>
</el-col>
	</el-row>
</template>

<script>
import Profile from "../../modules//settings/index/profile";
import PassWord from "../../modules//settings/index/password";
import Aptinfo from "../../modules//settings/index/aptinfo";
import PayNew from "../../modules//settings/index/paynew";

export default {
components:{
Profile,
Aptinfo,
PassWord,
PayNew
},
	data() {
		return {
			currentView:'Profile',
			
		};
	},
	methods: {
		toggleComponents(index,path){
			this.currentView=index
		}
		
	}
};
</script>