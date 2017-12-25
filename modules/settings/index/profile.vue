<template>
 <el-form ref="form" :model="form" label-width="80px">
      <p class="formTit">基本信息</p>

  <el-form-item label="头像">
    <img src="" alt="" v-on:click="upHeadPortrait
">
  </el-form-item>

  <el-form-item label="姓名">
      <el-col :span="10">
   <el-input v-model="form.name"></el-input>
      </el-col>
  </el-form-item>

  <el-form-item label="昵称">
      <el-col :span="10">
   <el-input v-model="form.nickname"></el-input>    
      </el-col>
  </el-form-item>

  <el-form-item label="性别">
      <el-radio-group v-model="form.sex">
      <el-radio-button label="妹子"></el-radio-button>
      <el-radio-button label="汉子"></el-radio-button>
    </el-radio-group>
  </el-form-item>

  <el-form-item label="国籍">
   <el-select v-model="form.citizenship" class="sel">
       <el-option label="c" value="1"></el-option>
   </el-select>
  </el-form-item>

  <el-form-item label="证件">
      <el-col :span="10">
      <el-input placeholder="身份证号" v-model="form.certificate" class="input-with-select">
    <el-select v-model="form.card" slot="prepend" placeholder="请选择">
      <el-option label="身份证" value="1"></el-option>
    </el-select>
   
  </el-input>
    </el-col>

  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="onSubmit" class="sel">保存</el-button>
  </el-form-item>
  <UploadImg :is-show='isShow' :title='title' :action='action' :multiple='multiple' :limit='limit' v-on:listenIsShow="uploadClose"/>

</el-form>

</template>

<script>

import UploadImg from "../uploadImg";
 export default {
      components:{
UploadImg
  },
   data () {
     return {
form: {
				name: '',
				nickname: '',
                sex: '妹子',
                citizenship:'',
				certificate: '',
				card:'1'
            },
            isShow:false,
            title:'',
            action:'',
            multiple:false,
            limit:1,
            
     }
   },
   methods:{
       onSubmit() {
			console.log('submit!');
        },
        upHeadPortrait(){
      this.isShow=true;
      this.title="请上传头像";
      this.action='';
      this.multiple=false;
      this.limit=1;
    },


            uploadClose(data){
              this.isShow=data;
            } 
   }
 }
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
 .el-input-group__prepend{
     width: 100px;
 }
 .el-radio-group{
     margin-left: 10px;
 }
 .sel{
     margin-left: 10px;
 }
</style>
