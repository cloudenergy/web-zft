<script>
    const facilities = [
    	{ value: 'WIFI', label: 'WIFI' },
    	{ value: '油烟机', label: '油烟机' },
    	{ value: '停车位', label: '停车位' },
    	{ value: '空调', label: '空调' },
    	{ value: '阳台', label: '阳台' },
    	{ value: '煤气', label: '煤气' },
    	{ value: '游泳池', label: '游泳池' }
    ];

    const names = facilities.map(item => item.value);
    export default {
    	render() {
    		const handleChangeAll = val => {
    			this.model = val ? names : [];
    			this.indeterminate = false;
    		};

    		const handleCheckChange = val => {
    			let checkedCount = val.length;
    			this.all = checkedCount === facilities.length;
    			this.isIndeterminate =
    				checkedCount > 0 && checkedCount < facilities.length;
    		};

    		return (
    			<div class="house-facilities">
    				<el-checkbox
    					label="全选"
    					name="type"
    					indeterminate={this.indeterminate}
    					on-change={handleChangeAll}
    					value={this.all}
    					on-input={val => (this.all = val)}
    				/>
    				{this.all}
    				<el-checkbox-group
    					on-input={val => {
    						this.model = val;
    						this.$emit('input', val);
    					}}
    					on-change={handleCheckChange}
    					value={this.model}
    				>
    					{facilities.map(item => {
    						return (
    							<el-checkbox label={item.value} key={item.label}>
    								{item.label}
    							</el-checkbox>
    						);
    					})}
    				</el-checkbox-group>
    			</div>
    		);
    	},
    	data() {
    		return {
    			all: false,
    			model: this.value,
    			isIndeterminate: true
    		};
    	},
    	props: {
    		value: {
    			default() {
    				return [];
    			},
    			type: Array
    		}
    	}
    };
</script>

<style lang="less" scoped>
    .house-facilities {
    	.el-checkbox-group {
    		display: flex;
    		flex-wrap: wrap;
    	}

    	.el-checkbox {
    		width: 20%;
    		margin-left: 0px;
    	}
    }
</style>

