<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">

      <p class="formTit">基本信息</p>
      
      <el-form-item label="L O G O">
        <el-button type="danger" style="margin-left:10px" v-on:click='upLogo'>上传图片</el-button>
      </el-form-item>
      
      <el-form-item label="公寓品牌">
        <el-col :span="10">
          <el-input v-model="apartmentBrand" placeholder="请输入公寓品牌"></el-input>
        </el-col>
      </el-form-item>
    
      <el-form-item label="服务电话">
        <el-col :span="10">
          <el-input placeholder="选填，将呈现在租客端个人信息页面"></el-input>
        </el-col>
      </el-form-item>
    
      <el-form-item label="公寓介绍">
        <el-col :span="20">
          <el-input type="textarea" v-model="form.desc" placeholder="必填(不少于50字)"></el-input>
        </el-col>
      </el-form-item>
    
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>

    </el-form>
      
    <p class="formTit">基本信息</p>

    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="职业房东（个人性质）" name="personal" >
          <el-form class="tabForm tabForm1" label-position='left'>
            <p class="formTit tabForm_p">个人房东认证 <span>(未认证)</span></p>
                
            <el-form-item label="姓 名">
              <el-col :span="10">  
                <el-input placeholder="公司法人姓名"></el-input>
              </el-col>
            </el-form-item>

              <el-form-item label="身份证">
                <el-col :span="10">
                  <el-input placeholder="法人身份证"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="身份证照片">
                <el-button type="danger" style="margin-left:10px" @click='upIDCard'>上传图片</el-button>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit" class="tabForm_btn1">提交认证</el-button>
              </el-form-item>

            </el-form>

          </el-tab-pane>

          <el-tab-pane label="职业房东（企业性质）" name="enterprise">
            <el-form class="tabForm" label-position='left'>
 <p class="formTit tabForm_p">企业认证 <span>(未认证)</span></p>

              <el-form-item label="公司全称">
                <el-col :span="10">
                  <el-input placeholder="未来住客"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="法人姓名">
                <el-col :span="10">
                  <el-input placeholder="公司法人姓名"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="法人身份证">
                 <el-col :span="10">
                    <el-input placeholder="法人身份证"></el-input>
                  </el-col>
              </el-form-item>

              <el-form-item label="联系人姓名">
                <el-col :span="10">
                  <el-input placeholder="胡恒"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="手机号">
                <el-col :span="10">
                  <el-input placeholder="13858129096"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="营业执照号">
                 <el-col :span="10">
                   <el-input placeholder="(营业执照号),如果为三证合一，填统一社会信用代码"></el-input>
                </el-col>
              </el-form-item>

            <el-form-item label="组织机构代码">
              <el-col :span="10">
                <el-input placeholder="(组织机构代码),如果为三证合一，填统一社会信用代码"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="税务登记证号">
              <el-col :span="10">
                <el-input placeholder="(税务登记证号),如果为三证合一，填统一社会信用代码"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="营业执照照片">
              <el-col :span="10">
                <el-button @click="upLicense">点击上传图片</el-button>
              </el-col>
            </el-form-item>

            <el-form-item label="企业注册地址">
              <el-col :span="10">
                <el-input placeholder="企业注册地址"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="房源所在的城市">
              <el-col :span="10">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in city"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>

            <el-form-item label="房源样图(6张)">
              <el-col :span="10">
                <el-button @click="upDrawing">点击上传图片</el-button>
              </el-col>
            </el-form-item>

            <el-form-item label="认证后提交推广审核">
              <el-col :span="10">
                <el-checkbox v-model="checked">自动提交</el-checkbox>
              </el-col>
            </el-form-item>

 <el-form-item>
                <el-button type="primary" @click="onSubmit" class="tabForm_btn">提交认证</el-button>
              </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>    
<UploadImg :is-show='isShow' :title='title' :action='action' :multiple='multiple' :limit='limit' v-on:listenIsShow="uploadClose"/>
  </div>
</template>

<script>
import UploadImg from "../uploadImg";
export default {
  components:{
UploadImg
  },
	data() {
		return {
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			apartmentBrand: '未来住客',
      activeName: 'personal',
      city:[{value:'杭州',label:'hz'}],
      value:'',
      isShow:false,
            title:'',
            action:'',
            multiple:false,
            limit:1,
            checked: true

		};
	},
	methods: {
		onSubmit() {
			console.log('submit!');
		},
		handleClick(tab, event) {
			console.log(tab, event);
    },
    upLogo(){
      this.isShow=true;
      this.title="请上传logo";
      this.action='';
      this.multiple=false;
      this.limit=1;
      
      
    }, upLicense(){
      this.isShow=true;
      this.title="请上传营业执照照片";
      this.action='';
      this.multiple=false;
      this.limit=1;
    },
  upIDCard(){
      this.isShow=true;
      this.title="身份证照片(正反面共2张)";
      this.action='';
      this.multiple=true;
      this.limit=2;
    },
    upDrawing(){
      this.isShow=true;
      this.title="请上传房源样图(6张)";
      this.action='';
      this.multiple=true;
      this.limit=6;
    },


            uploadClose(data){
              this.isShow=data;
              console.log(data)
            }    
	}
};
</script>
<style scoped>
.formTit{
      background-color: #e0e7ec;
    line-height: 52px;
   padding-left:20px;
   font-size:14px;
    color: #000;
    border-top: none;
    margin-bottom:10px;
}
form{
  background:#fff;
  padding-bottom:10px;
  margin-bottom:10px;
}
.tabForm{
  padding-left:20px;
}
.tabForm_p{
  margin-left:-20px;
}
.tabForm_p span{
  margin-left:10px;
  color:red;
}
.tabForm label{
  width:140px;
}
.tabForm_btn{
  margin-left:80px;
}
.tabForm_btn1{
  margin-left:110px;
}
.tabForm1 label{
  width:100px;
}
</style>

