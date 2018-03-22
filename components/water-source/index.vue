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
                    value:'all',
                    label:'全部'
                },
                {
                    value:'rent',
                    label:'租约缴费'
                },
                {
                    value:'topup',
                    label:'账户充值'
                },
                {
                    value:'final',
                    label:'退租结算'
                }
            ]
        }
    },
    methods:{
        changeflow(val){
            this.$emit('change',val)
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

