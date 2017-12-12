<script>
    const options = [
    	{ value: 'all', label: '全部' },
    	{ value: 'lease', label: '租约' },
    	{ value: 'bookkeeping', label: '记账' },
    	{ value: 'refunds', label: '退款' }
    ];
    export default {
    	render() {
    		return (
    			<el-select
    				value={this.value}
    				onChange={val => {
    					this.$emit('input', val);
    				}}
    				size="mini"
    				filterable
    				placeholder="类型"
    				class="select"
    			>
    				{options.map(item => {
    					return (
    						<el-option
    							key={item.value}
    							label={item.label}
    							value={item.value}
    						/>
    					);
    				})}
    			</el-select>
    		);
    	},
    	props: ['value']
    };
</script>
