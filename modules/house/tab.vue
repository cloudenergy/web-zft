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
		<el-menu default-active="0">
			<el-menu-item index="0">
				<!-- <i class="el-icon-menu"></i> -->
				<span slot="title">全部小区</span>
			</el-menu-item>
			<el-menu-item v-for="item in community" :key="item.key" :index="item.key">
				<span slot="title">{{item.name}}</span>
			</el-menu-item>
		</el-menu>
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
				options: [],
				community: [
					{
						key: 1,
						name: '朝会小区'
					},
					{
						key: 2,
						name: '保利香槟国际'
					},
					{
						key: 3,
						name: '范家天城公寓'
					},
					{
						key: 4,
						name: '龙湖滟澜山'
					},
					{
						key: 5,
						name: '佳丰北苑-南门'
					},
					{
						key: 6,
						name: '永康苑'
					},
					{
						key: 7,
						name: '天成嘉苑'
					}
				]
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

		.filters {
			display: flex;
			justify-content: space-between;
			.el-select {
				width: 48%;
			}
		}

		.el-menu {
			margin-top: 15px;
			padding: 15px 0;
			border-radius: 2px;
			border-right: 0;
			box-shadow: 0 0 4px #ddd;
			.el-menu-item.is-active {
				background-color: #ecf5ff;
				&:before {
					position: absolute;
					content: '';
					left: 0;
					top: 0;
					bottom: 0;
					width: 3px;
					background-color: #409eff;
				}
			}
		}
	}
</style>