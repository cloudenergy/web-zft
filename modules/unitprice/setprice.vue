<template>
    <div>
        <!-- {{item}} -->
        <div class="flexc">
            <el-input v-model="input" placeholder="请输入修改价格" style="width:80%"></el-input>
            &nbsp;&nbsp;&nbsp;
            <span style="line-height:28px;display:inline-block">元/度</span>
        </div>
        
        <div class="prompting">(价格调整后，新的价格设置只影响未来的计算费用，对已有数据不产生影响)</div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
			required: true
	    }
    },
    data() {
        return {
            input: ''
        }
    },
    methods: {
        sendchange(){
            console.log(this.item)
        }
    }
}
</script>

<style lang="less" scoped>
    .prompting{
        color: #aaa;
        font-size: 12px;
        margin-top: 3px;
    }
</style>



