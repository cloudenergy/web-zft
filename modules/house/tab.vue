<template>
    <div class="secondary-side">
        <el-tabs v-model="type" @tab-click="change">
            <el-tab-pane label="合租" name="1"></el-tab-pane>
            <el-tab-pane label="整租" name="2"></el-tab-pane>
            <el-tab-pane label="整幢" name="3"></el-tab-pane>
        </el-tabs>
        <div class="filters">
            <el-select v-model="filters.city" size="mini" clearable placeholder="请选择城市">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="filters.area" size="mini" clearable placeholder="请选择区域">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <el-card class="box-card">
            <ul class="list house-list">
                <li class="">全部小区</li>
                <li>朝会小区</li>
                <li>保利香槟国际</li>
            </ul>
        </el-card>
    </div>
</template>

<script>
    export default {
    	data() {
    		return {
    			type: '1',
    			filters: {
    				city: '',
    				area: ''
    			},
    			options: []
    		};
    	},
    	methods: {
    		change(key) {
    			this.$emit('change', key);
    		}
    	}
    };
</script>

<style lang="less">
    .secondary-side .el-tabs__nav-wrap {
    	padding-left: 40px;
    }
</style>

<style lang="less" scoped>
    .secondary-side {
    	width: 240px;
    	text-align: center;

    	.filters {
    		display: flex;
    		justify-content: space-between;

    		.el-select {
    			width: 48%;
    		}
    	}

    	.box-card {
    		margin-top: 15px;
    	}

    	.list {
    		text-align: left;
    		list-style: none;

    		li {
    			height: 30px;
    			line-height: 30px;
    		}
    	}

    	.house-list li + li {
    		border-top: 1px solid @light;
    	}
    }
</style>