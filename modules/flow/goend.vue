<template>
    <div>
        <div style="position:relative;display:inline-block;" class="settimeEnd">

            <el-date-picker v-model="value3" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:200px;padding:3px;over-flow:hidden"
                class="datach" @change="oldTime(value3)" size="small" :clearable="false">
            </el-date-picker>
            <span style="position: absolute;" class="shabi">至</span>
        </div>
    </div>
</template>

<script>
    import startOfMonth from 'date-fns/start_of_month'
    import endOfDay from 'date-fns/end_of_day'
    let startOfMounth = startOfMonth(new Date())
    let endOfDate = endOfDay(new Date())
    export default {
        data() {
            return {
                value3: [startOfMounth, endOfDate],
            }
        },
        methods: {
            oldTime(data) {
                this.$emit('from-toTime',(data.map((ele,index)=>{
                    switch (index) 
                    {   
                        case 0:
                            return Date.parse(ele)
                            break
                        case 1:
                            return Date.parse(endOfDay(ele))
                            break
                    }
                    
                })))
            }
        }
    }
</script>

<style lang="less" scoped>
    .shabi {
        left: 98px;
        top: 7.5px;
        display: inline-block;
        line-height: 18px;
        background-color: #fff;
    }

    .marsp {
        margin-right: 5px;
    }
</style>

<style>
    .settimeEnd>div>span.el-range-separator {
        min-width: 0;
    }
</style>