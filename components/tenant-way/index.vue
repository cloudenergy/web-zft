<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline  flexc flexce" size="mini">
        <el-form-item label="" style="margin:0">
            <el-select v-model="formInline.type" placeholder="承租方式" class="minisel" @change="changeflow" size="small">
                <el-option :label="item.label" v-for="item in formInlinetype" :key="item.value" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
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
                    value:'SHARE',
                    label:'合租'
                },
                {
                    value:'SOLE',
                    label:'整租'
                },
                {
                    value:'ENTIRE',
                    label:'整栋'
                },
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

