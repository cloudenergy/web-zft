<template>
    <div>
        <div class='flexc'>
            <div class="exit-house-left">
                <span>合同周期 </span>
                <span>{{form.fromDate}}-{{form.toDate}}</span>
            </div>
            <div>
                <span style="margin-right:10px;">退租后房间转为关闭状态</span>
                <el-radio v-model="roomStatus" label="">是</el-radio>
                <el-radio v-model="roomStatus" label="pause">否</el-radio>
            </div>
        </div>
        <div class='flexc'>
            <div class="exit-house-left">
                <span>租户姓名 </span>
                <span>{{form.user.name}}</span>
            </div>
            <div>
                <span class="set-width">经办人</span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class='flexc'>
            <div class="exit-house-left">
                <span>租户账号 </span>
                <span>{{form.user.accountName}}</span>
            </div>
            <div>
                <span class="set-width">支付方式</span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class='flexc'>
            <div class="exit-house-left">
                <span>当前余额 </span>
                <span>{}</span>
            </div>
            <div class="flexc setInput">
                <span class="set-width">结算余额</span>
                <el-input v-model="input" placeholder="输入结算金额" style="widht:158px;"></el-input>
                <span class="hint">整数表示收款，负数表示退款</span>
            </div>
        </div>
        <div>
            <div class="flexc setElementHeight">
                <span style="display:inline-block;width:70px">
                    结算余额
                </span>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea" style="min-height:80px">
                </el-input>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            form: {
                type: Object
            }
        },
        computed: {
			projectId() {
				return this.$store.state.user.projectId;
			}
		},
        data() {
            return {
                radio: '',
                input: '',
                textarea: '',
                value:'',
                roomStatus:'',
                options: [{
                    value: '1',
                    label: 'laoli'
                }, {
                    value: '2',
                    label: 'laowang'
                }, {
                    value: '3',
                    label: 'laozhang'
                }]
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            operateRent(){
                this.$model('operate_contracts')
                .update({status: 'terminated'},{projectId:this.projectId,id:this.form.id})
                .then(res=>{
                    console.log(res)
                    this.$message.success('退组成功')
                })
                .catch(res=>{
                    this.$message.info('退租失败')
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .flexc{
        margin-bottom: 15px;
        .exit-house-left{
            width: 50%;
        }
        .set-width{
            display: inline-block;
            width:130px;
        }
        .setInput{
            position: relative;
            .hint{
                color:#bbb;
                font-size: 12px;
                position: absolute;
                bottom: -22px;
                right: 0;
            }
        }
    }
</style>
<style>
    .flexc.setInput>.el-input.el-input--mini{
        width:158px;
    }
    .setElementHeight .el-textarea__inner{
        height: 100%;
    }
</style>

