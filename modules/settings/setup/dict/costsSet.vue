<template>
<el-form>
      <p class="formTit">基本信息</p>
<el-form-item label="押金">
    <ul class="formUl">
        <li v-for="(val,index,key) in cashPledge" :key="val.id">
            <el-col :span="8">
 {{val}} {{index}}
            <i class="el-icon-delete"></i>
            </el-col>
           
        </li>
    </ul>
    </el-form-item>    
</el-form>
</template>

<script>
export default {
	data() {
		return {
			cashPledge: [
				'常规押金',
				'门卡押金',
				'内门卡押金',
				'外门卡押金',
				'门禁押金',
				'钥匙押金',
				'家具押金',
				'家电押金',
				'电卡押金',
				'水卡押金',
				'电费押金',
				'水费押金',
				'水电押金',
				'装修押金',
				'其他押金'
			]
		};
	}
};
</script>

<style>
.formUl li{
    float: left;
    list-style: none;
    width: 25%;
    margin-left: 5%;
}
.form-item__label{
    float: left;
    height: 100%;
}
</style>
