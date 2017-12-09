<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline  flexc flexce" size="mini">
        <el-form-item label="" style="margin:0">
            <el-select v-model="formInline.type" placeholder="年份" class="minisel" @change="changeflow">
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
                    value:1,
                    label:'1990'
                },
                {
                    value:2,
                    label:'1991'
                },
                {
                    value:3,
                    label:'1992'
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

