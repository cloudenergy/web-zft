<template>
	<div class="app">
		<div class="sider">
			<site-nav />
		</div>
		<div class="main">
			<slot />
			<div class="userInfo flexc cursorp">
				<el-dropdown placement="bottom" style="margin-right:20px" size="medium">
					<span class="el-dropdown-link">
						<icon type="logout-user" style="font-size:30px;margin:-14px 20px 0 0"/>
						<span style="font-size:20px;">{{userInfo.username}}</span>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="logout">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<el-dropdown size="medium">
					<span type="primary" class="add">
						+ 添加
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="create()"><p class="setPading">房源</p></el-dropdown-item>
						<el-dropdown-item @click.native="createContract()"><p class="setPading">租户</p></el-dropdown-item>
						<el-dropdown-item @click.native="deviceDialog()"><p class="setPading">设备</p></el-dropdown-item>
						<!-- <el-dropdown-item>批量导入</el-dropdown-item> -->
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<app-modal ref="modal"></app-modal>
	</div>
</template>
<script>
import fp from 'lodash/fp';
import site_nav from './site-nav';
import AddModal from '~/modules/house/add';
import { NewContract } from '~/modules/contract';
import { ImportDevices } from '~/modules/devices';
export default {
	name: 'app',
	components: {
		'site-nav': site_nav
	},
	computed: {
		userInfo() {
      const userFromStorage = JSON.parse(localStorage.getItem('user'));
      return userFromStorage || {};
		}
	},
  created() {
    // read cookie or storage
    fp.isUndefined(this.$store.state.userInfo.user.auth) ? this.$forward('/login') : '';
  },
	methods: {
		logout() {
			localStorage.removeItem('user');
			this.$message.success('退出成功');
			this.$router.replace('/login');
			this.$store.dispatch('CLEAR_USER_INFO')
			this.$model('logout')
			.create({},{})
		},
		create(type) {
			this.$modal.$emit('open', {
				comp: AddModal,
				title: '新增房源',
				className: 'new-house'
			});
		},
		createContract() {
			this.$modal.$emit('open', {
				comp: NewContract,
				title: '新增合约',
				className: 'new-contract'
			});
		},
		deviceDialog() {
			this.$modal.$emit('open', {
				comp: ImportDevices,
				title: '导入设备',
				className: 'new-devices'
			});
		}
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

.app > .sider {
	z-index: 2;
	width: 120px;
	background-color: #2f3c4d;
	flex: 0 0 110px;
	max-width: 110px;
	min-width: 110px;
	width: 110px;
}

.app .userInfo {
	position: absolute;
	top: 0px;
	right: 20px;
	height: 60px;
	z-index: 4;
	align-items: center;
}

.add {
	display: inline-block;
	font-size: 18px;
	height: 32px;
	line-height: 32px;
	width: 100px;
	text-align: center;
	background-color: rgb(81, 140, 224);
	color: #fff;
	border-radius: 3px;
	margin-right: -4px;
}
.setPading {
	padding:0 18px;
}
.new-house .el-dialog {
	width: 730px;
	.el-row{
		margin-bottom: 20px;
	}
}
.new-contract .el-dialog {
	width: 780px;
}
</style>

<style lang="less" scoped>

</style>
