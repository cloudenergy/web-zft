<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline  flexc flexce">
        <el-form-item label="" style="margin:0">
            <el-select v-model="formInline.type" placeholder="年份" class="minisel" @change="changeflow" size="small">
                <el-option :label="item.label" v-for="item in formInlinetype" :key="item.value" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                formInline: {
                    type: ''
                },
                formInlinetype: [{
                        value: '2018',
                        label: '2018'
                    },
                    {
                        value: '2019',
                        label: '2019'
                    }
                ]
            }
        },
        methods: {
            changeflow(val) {
                this.$emit('change',val)
            }
        }
    }
</script>

<style lang="less" scoped>
    .flexce {
        align-items: center;
    }

    .minisel {
        width: 100px;
    }
</style>