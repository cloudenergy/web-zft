<template>
    <div>
        <div class="block">
            <span class="demonstration">起租/退租</span>
            <el-date-picker 
            disabled
            type="datetimerange" 
            range-separator="至" 
            :start-placeholder="tt1" 
            :end-placeholder="tt2" 
            class="startEND">
            </el-date-picker>
        </div>
        <el-form ref="form" :model="form" label-width="120px" :label-position="labelPosition">
            <el-form-item label="租金" class="disable">
                <el-input disabled class="inputuser" placeholder="月租"></el-input>
                <el-input disabled class="inputuser" v-if="form.strategy.freq.pattern==1" placeholder="一月一付"></el-input>
                <el-input disabled class="inputuser" v-if="form.strategy.freq.pattern==2" placeholder="二月一付"></el-input>
                <el-input disabled class="inputuser" v-if="form.strategy.freq.pattern==3" placeholder="三月一付"></el-input>
                <el-input disabled class="inputuser" v-if="form.strategy.freq.pattern==6" placeholder="半年一付"></el-input>
                <el-input disabled class="inputuser" v-if="form.strategy.freq.pattern==12" placeholder="一年一付"></el-input>
                <el-input disabled class="inputuser" v-if="form.strategy.freq.pattern=='paidOff'" placeholder="一次付清付"></el-input>
                <br>
                <el-tag type="info" class="inputuser">￥{{form.strategy.freq.rent}}元/月</el-tag>
            </el-form-item>
            <el-form-item label="押金" class="disable">
                <el-input disabled class="inputuser" placeholder="常规押金"></el-input>
                <el-input disabled v-model="form.expenses[2].rent" class="inputuser"></el-input>
            </el-form-item>
            <el-form-item label="支付时间" class="disable">
                <el-tag type="info" class="inputuser">账单开始前提前</el-tag>
                <el-tag type="info" class="inputuser">{{form.paymentPlan}}天收租</el-tag>
            </el-form-item>
            <el-form-item label="合同编号/管理员" class="disable">
                <el-input disabled v-model="form.username" class="inputuser"></el-input>
                <el-input disabled v-model="form.name" class="inputuser"></el-input>
            </el-form-item>
            <el-form-item label="签约时间" class="disable">
                <el-input disabled v-model="tt" class="inputuser"></el-input>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    export default {
        props: {
            form: {
                type: Object
            }
        },
        data() {
            return {
                labelPosition: 'left',
                tt: '',
                tt1:'',
                tt2:''
            };
        },
        watch:{
            form(oldval,newval){
                // console.log(oldval,newval)
                // this.form=oldval
                // console.log(this.form)
                console.log(oldval)
                this.changetime(oldval.signUpTime,oldval.from,oldval.to)
            }
        },
        mounted() {
            this.changetime(this.form.signUpTime,this.form.from,this.form.to)
            console.log(this.form.paymentPlan)
        },
      
        methods: {
            changetime(tm,tm1,tm2) {
                this.tt=new Date(parseInt(tm) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ") 
                this.tt1=new Date(parseInt(tm1) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ") 
                this.tt2=new Date(parseInt(tm2) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ") 
            }
            
        }
    };
</script>

<style lang="less" scoped>
    .demonstration {
        display: inline-block;
        width: 120px;
    }
    .inputuser{
        width:200px;
        line-height: 28px;
        height: 28px;
    }
    .disable {
        margin-bottom: 0px;
        margin-top: 10px;
        .inputuser:nth-child(2){
        margin-left: 10px;
    }}
    .block>.startEND{
        width: 410px;
    }
</style>