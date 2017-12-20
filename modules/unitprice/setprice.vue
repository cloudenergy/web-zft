<template>
    <div>
        <!-- {{item}} -->
        <el-input v-model="input" placeholder="请输入修改价格"></el-input>
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

