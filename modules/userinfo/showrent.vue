<template>
    <div>
        <div class="block">
            <span class="demonstration">起租/退租</span>
            <el-date-picker disabled v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                class="startEND">
            </el-date-picker>
        </div>
        <el-form ref="form" :model="form" label-width="120px" :label-position="labelPosition">
            <el-form-item label="租金" class="disable">
                <el-input disabled v-model="form.name" class="inputuser"></el-input>
                <el-input disabled v-model="form.name" class="inputuser"></el-input>
                <br>
                <el-input disabled v-model="form.name" class="inputuser" style="margin-top:10px;"></el-input>
            </el-form-item>
            <el-form-item label="押金" class="disable">
                <el-input disabled v-model="form.name" class="inputuser"></el-input>
                <el-input disabled v-model="form.name" class="inputuser"></el-input>
            </el-form-item>
            <el-form-item label="支付时间" class="disable">
                <el-input disabled v-model="form.timemoney" class="inputuser"></el-input>
                <el-input disabled v-model="form.name" class="inputuser"></el-input>
            </el-form-item>
            <!-- <el-form-item label="合同编号/管理员" class="disable">
                <el-input disabled v-model="form.username" class="inputuser"></el-input>
                <el-input disabled v-model="form.name" class="inputuser"></el-input>
            </el-form-item> -->
            <el-form-item label="签约时间" class="disable">
                <el-input disabled v-model="form.signingtime" class="inputuser"></el-input>
            </el-form-item>
        </el-form>

    </div>

</template>

<script>
    export default {
        data() {
            return {
                labelPosition: 'left',
                value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                form: {
                    name: '123元/月',
                    timemoney: '账单开始前',
                    username: 'zhangsan',
                    signingtime: '2016-10-10'
                }
            };
        },
        methods: {

        }
    };
</script>

<style lang="less" scoped>
    .demonstration {
        display: inline-block;
        width: 120px;
    }

    .inputuser {
        width: 200px;
    }

    .disable {
        margin-bottom: 0px;
        margin-top: 10px;
        .inputuser:nth-child(2) {
            margin-left: 10px;
        }
    }

    .block>.startEND {
        width: 410px;
    }
</style>