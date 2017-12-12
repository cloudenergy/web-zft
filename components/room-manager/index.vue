<script>
    const options = [
    	{ value: 'laojiang', label: '老蒋' },
    	{ value: 'laowang', label: '老王' },
    	{ value: 'laozhang', label: '老张' }
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
    				placeholder="管理"
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
