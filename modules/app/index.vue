<template>
	<div class="app">
		<div class="sider">
			<site-nav />
		</div>
		<div class="main">
			<slot />
		</div>
		<app-modal ref="modal"></app-modal>
		<div class="userInfo flexc">
			<el-dropdown style="margin-right:20px">
                <span type="primary">
                   <icon type="icon02" style="font-size:40px;color:#559ffd"/>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="create()">房源</el-dropdown-item>
                    <el-dropdown-item @click.native="createContract()">租户</el-dropdown-item>
                    <el-dropdown-item>批量导入</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
			<el-dropdown placement="bottom">
				<span class="el-dropdown-link">
					username
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="logout">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>
<script>
	import site_nav from './site-nav';
	import AddModal from '~/modules/house/add';
    import { NewContract } from '~/modules/contract';
	export default {
		name: 'app',
		components: {
			'site-nav': site_nav
		},
		methods: {
			logout() {
				
			},
			create(type) {
    			this.$modal.$emit('open', {
    				comp: AddModal,
    				title: '新增房源'
    			});
    		},
    		createContract() {
    			this.$modal.$emit('open', {
    				comp: NewContract,
    				title: '新增合约'
    			});
			},
		}
	};
</script>

<style lang="less">
	@top-height: 60px;

	.app {
		display: flex;
	}

	.main {
		overflow-y: scroll;
	}

	.app,
	.main {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.app>.sider {
		z-index: 2;
		width: 120px;
		background-color: #2f3c4d;
		flex: 0 0 256px;
		max-width: 256px;
		min-width: 256px;
		width: 256px;
	}

	.app .userInfo {
		position: absolute;
		top:0px;
		right: 20px;
		height: 60px;
		z-index: 4;
		align-items: center;
	}
</style>

<style lang="less" scoped>
</style>