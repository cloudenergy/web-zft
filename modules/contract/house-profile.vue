<template>
	<div class="house-profile">
		<el-row>
			<div class="select-with-label el-input-group">
				<span class="el-input-group__prepend">承租房源</span>
				<el-select v-model="property.houseType" class="house-type">
					<el-option label="全部" value="1"></el-option>
					<el-option label="整租" value="2"></el-option>
					<el-option label="合租" value="3"></el-option>
					<el-option label="独栋" value="4"></el-option>
				</el-select>
				<el-autocomplete
						class="inline-input"
						v-model="property.house"
						:fetch-suggestions="querySearch"
						placeholder="搜索房源编号、小区名称等关键字"
						:trigger-on-focus="false"
						@select="handleSelect">
				</el-autocomplete>
			</div>
		</el-row>
	</div>
</template>

<script>
	export default {
		props: {
			property: {
				required: true
			}
		},
		methods: {
			handleSelect(item) {
				console.log(item);
				return {};
			},
			querySearch(queryString, cb) {
				cb(["房子1", "房子2"]);
			}
		}
	}
</script>

<style lang="less" scoped>
	.house-type {
		display: block;
	}
	.inline-input {
		width: 70%;
	}

	.select-with-label {
		display: inline-table;
		.el-input__inner {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
		.inline-input {
			display: table-cell;
			.el-input__inner {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}
		}
	}

</style>
<style lang="less">
	.select-with-label {
		.house-type .el-input__inner {
			border-radius: 0;
		}
	}
</style>