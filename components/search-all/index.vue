<template>
    <el-input
        :placeholder='title'
        prefix-icon="el-icon-search"
        v-model="searchInput"
        @keyup.native="show($event)"
        size="small"
        class="searchInput">
    </el-input>
</template>
<script>
export default {
    props: {
        title:{
            required:true
        }
    },
    data () {
        return {
            searchInput:''
        }
    },
    methods: {
        show(el) {
            if(el.keyCode===13){
                this.$modal.$emit('keyup',this.searchInput)
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .searchInput{
        margin-bottom: 13px;
    }
</style>

