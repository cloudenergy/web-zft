<template>
 <div class="partner">
     <el-col :span="2">
     <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
     </el-col>
 </div>
</template>

<script>
export default {
	data() {
		return {
			tree: [
				{
					label: 'a',
					children: [{
						label: 'b'
					}]
				}
			],
			defaultProps: {
				children: 'children',
				label: 'label'
			}
		};
	},
	methods: {
		handleNodeClick(data) {
			console.log(data);
		}
	}
};
</script>

<style>

</style>
