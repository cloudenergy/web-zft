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
                <el-tag type="info" class="inputuser">月租</el-tag>
                <el-tag type="info" class="inputuser" v-if="form.strategy.freq.pattern==1">一月一付</el-tag>
                <el-tag type="info" class="inputuser" v-if="form.strategy.freq.pattern==2">二月一付</el-tag>
                <el-tag type="info" class="inputuser" v-if="form.strategy.freq.pattern==3">三月一付</el-tag>
                <el-tag type="info" class="inputuser" v-if="form.strategy.freq.pattern==6">半年一付</el-tag>
                <el-tag type="info" class="inputuser" v-if="form.strategy.freq.pattern==12">一年一付</el-tag>
                <el-tag type="info" class="inputuser" v-if="form.strategy.freq.pattern=='paidOff'">一次付清付</el-tag>
                <br>
                <el-tag type="info" class="inputuser" style="margin-top:10px">￥{{price(form.strategy.freq.rent)}}元/月</el-tag>
            </el-form-item>
            <el-form-item label="押金" class="disable">
                <el-tag type="info" class="inputuser">常规押金</el-tag>
                <el-tag type="info" class="inputuser">{{price(form.strategy.bond)}}</el-tag>
            </el-form-item>
            <el-form-item label="支付时间" class="disable">
                <el-tag type="info" class="inputuser" v-if="this.form.paymentP==11">开始前提前</el-tag>
                <el-tag type="info" class="inputuser" v-if="this.form.paymentP==22">开始后固定</el-tag>
                <el-tag type="info" class="inputuser" v-if="this.form.paymentP==33">开始前固定</el-tag>
                <el-tag type="info" class="inputuser" v-if="this.form.paymentP==44">开始前一个月固定</el-tag>
                <el-tag type="info" class="inputuser" v-if="this.form.paymentP==11">{{form.paymentPlan}}天收租</el-tag>
                <el-tag type="info" class="inputuser" v-if="this.form.paymentP!=11">{{form.paymentPlan}}号收租</el-tag>
            </el-form-item>
            <el-form-item label="合同编号/管理员" class="disable">
            <!-- @@@没有东西，用时间代替 -->
                <el-tag type="info" class="inputuser">{{tt}}</el-tag>
                <el-tag type="info" class="inputuser">{{tt}}</el-tag>
            </el-form-item>
            <el-form-item label="签约时间" class="disable">
                <el-tag type="info" class="inputuser">{{tt}}</el-tag>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    import {isIdCard} from '../../utils/rules'
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
            form(newval,oldval){
                console.log(newval)
                this.changetime(newval.signUpTime,newval.from,newval.to)
                this.strt(newval.paymentPlan)
            }
        },
        mounted() {
            this.changetime(this.form.signUpTime,this.form.from,this.form.to)
            this.strt(this.form.paymentPlan)
        },
        methods: {
            changetime(tm,tm1,tm2) {
                this.tt=this.set(tm)
                this.tt1=this.set(tm1)
                this.tt2=this.set(tm2)
            },
            set(time){
                return new Date(parseInt(time) * 1000).toLocaleDateString().replace(/\//g, "-")
            },
            strt(payment){
                if(/-/g.test(payment)){
                    this.form.paymentP=11
                    this.form.paymentPlan=this.form.paymentPlan.replace(/-/g,'')
                }
                if(/\+/g.test(payment)){
                    this.form.paymentP=22
                    this.form.paymentPlan=this.form.paymentPlan.replace(/\+/g,'')
                }
                if(/F/g.test(payment)){
                    this.form.paymentP=33
                    this.form.paymentPlan=this.form.paymentPlan.replace(/F/g,'')
                }
                if(/M/g.test(payment)){
                    this.form.paymentP=44
                    this.form.paymentPlan=this.form.paymentPlan.replace(/M/g,'')
                }
            },
            price(data){
                return data/100
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
        padding-left: 15px
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