<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline  flexc flexce" size="mini">
            <el-select v-model="formInline.type" placeholder="流水来源" class="minisel" @change="changeflow" size="small">
                <el-option :label="item.label" v-for="item in formInlinetype" :key="item.value" :value="item.value"></el-option>
            </el-select>
    </el-form>
</template>
<script>
export default {
    data() {
        return{
            formInline:{
                type:''
            },
            formInlinetype:[
                {
                    value:1,
                    label:'充值账户'
                },
                {
                    value:2,
                    label:'租金扣费'
                },
                {
                    value:3,
                    label:'仪表扣费'
                }
            ]
        }
    },
    methods:{
        changeflow(){
            console.log(this.formInline.type)
        }
    }
}
</script>

<style lang="less" scoped>
  .flexce{
    align-items: center;
  }
  .minisel{
    width: 100px;
  }
</style>

