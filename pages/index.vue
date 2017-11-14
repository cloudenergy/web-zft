<template>
	<div class="page"></div>
</template>
<script>
<<<<<<< HEAD
    export default {
    	data() {
    		return {
    			value: '',
    			options: [{ label: '选项一', value: '1' }]
    		};
    	},
    	created() {
    		this.$forward('/houses');
    	}
    };
</script>
<style lang="less" scoped>
    .page {
    	padding: 30px;
    }
=======
	export default {
		data() {
			return {
				value: '',
				options: [{ label: '选项一', value: '1' }]
			};
		},
		created() {
			this.$forward('/houses');
		}
	};
</script>
<style lang="less" scoped>
	.page {
		padding: 30px;
	}
>>>>>>> 3873eb3b054b29d666debb700241fca03d254495
</style>