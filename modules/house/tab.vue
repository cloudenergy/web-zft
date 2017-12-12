<template>
    <div class="secondary-side">
        <el-tabs v-model="type" @tab-click="change">
            <el-tab-pane v-for="item in houseTypes" :key="item[0]" :label="item[1]" :name="item[0]" />
        </el-tabs>
        <city-area />
        <el-menu default-active="0">
            <el-menu-item index="0">
                <!-- <i class="el-icon-menu"></i> -->
                <span slot="title">全部小区</span>
            </el-menu-item>
            <el-menu-item v-for="(item, index) in community" :key="index" :index="item.name">
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
    	computed: {
    		...mapState({
    			houseTypes: state => state.houseTypes,
    			defaultHouseTypes: state => state.defaultHouseTypes
    		})
    	},
    	data() {
    		return {
    			type: 'sole',
    			filters: {
    				city: '',
    				area: ''
    			},
    			options: [],
    			community: []
    		};
    	},
    	created() {
    		this.$store
    			.dispatch('GET_COMMUNITIES')
    			.then(data => (this.community = data));
    	},
    	methods: {
    		change(key) {
    			this.$emit('change', key);
    		}
    	}
    };
</script>

<style lang="less">
    .secondary-side {
    	.el-tabs__nav-wrap {
    		padding-left: 40px;
    	}
    	.el-menu-item,
    	.el-submenu__title {
    		height: 42px;
    		line-height: 40px;
    		text-align: left;
    	}
    }
</style>

<style lang="less" scoped>
    .secondary-side {
    	width: 240px;
    	text-align: center;

    	.el-menu {
    		margin-top: 15px;
    		padding: 15px 0;
    		border-radius: 2px;
    		border-right: 0;
    		box-shadow: 0 0 4px #ddd;
    		.el-menu-item.is-active {
    			background-color: fade(@primary, 10);
    			&:before {
    				position: absolute;
    				content: '';
    				left: 0;
    				top: 0;
    				bottom: 0;
    				width: 3px;
    				background-color: @primary;
    			}
    		}
    	}
    }
</style>