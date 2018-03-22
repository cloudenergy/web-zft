<template>
    <div>
        <div class="flexc">
            <el-input v-model="input" placeholder="请输入备注" style="width:80%" @input="upddateValue"></el-input>
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            item: {
                required: true
            },
            input: {
                required: String
            }
        },
        data() {
            return {
            }
        },
        methods: {
            
        }
    }
</script>

<style lang="less" scoped>
</style>