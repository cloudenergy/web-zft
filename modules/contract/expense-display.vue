<template>
	<div>
		<el-row>
			<el-col :span="12">
				<el-input placeholder="" v-model="expense.amount">
					<template slot="prepend">{{expense.name}}</template>
				</el-input>
			</el-col>
			<el-col :span="12">
				<el-input placeholder="" v-model="expense.paymentMethod">
					<template slot="prepend">方式</template>
				</el-input>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		props: {
			expense: {
				required: true
			}
		}
	}
</script>

<style lang="less" scoped>

</style>