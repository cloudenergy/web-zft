<script>
    const rooms = [
    	{ val: 1, label: '一室' },
    	{ val: 2, label: '两室' },
    	{ val: 3, label: '三室' },
    	{ val: 4, label: '四室' }
    ];
    export default {
    	props: ['value'],
    	render() {
    		return (
    			<el-select
    				onChange={val => {
    					this.$emit('input', val);
    				}}
    				value={this.value}
    			>
    				{rooms.map(item => {
    					return <el-option value={item.val} label={item.label} />;
    				})}
    			</el-select>
    		);
    	}
    };
</script>