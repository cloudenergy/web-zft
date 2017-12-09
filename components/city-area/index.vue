<script>
    const city = [
    	{
    		label: '北京',
    		value: 20100
    	},
    	{
    		label: '杭州',
    		value: 30100
    	}
    ];

    const area = [
    	{
    		label: '北京',
    		parent: 20100,
    		value: 20101
    	},
    	{
    		value: '杭州',
    		parent: 30100,
    		value: 30101
    	}
    ];
    const filters = {
    	city,
    	area
    };

    function isCity(city) {
    	return function(item) {
    		return city ? item.parent == city : true;
    	};
    }

    export default {
    	render() {
    		let city = (
    			<el-select
    				value={this.city}
    				size="mini"
    				on-change={() => this.$emit('change', { city: this.city })}
    				clearable
    				placeholder="请选择城市"
    			>
    				{filters.city.map(item => {
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
    		let area = (
    			<el-select
    				value={this.area}
    				size="mini"
    				clearable
    				on-change={() => this.$emit('change', { area: this.area })}
    				placeholder="请选择区域"
    			>
    				{filters.area.filter(isCity(this.city)).map(item => {
    					<el-option
    						key={item.value}
    						label={item.label}
    						value={item.value}
    					/>;
    				})}
    			</el-select>
    		);
    		return (
    			<div class={{ inForm: this.isForm, filters: !this.isForm }}>
    				{this.isForm ? (
    					<el-form-item label="城市">{city}</el-form-item>
    				) : (
    					city
    				)}
    				{this.isForm ? (
    					<el-form-item label="区域">{area}</el-form-item>
    				) : (
    					area
    				)}
    				{this.$slots.default}
    			</div>
    		);
    	},
    	data() {
    		return {
    			city: '',
    			area: ''
    		};
    	},
    	created() {},
    	props: {
    		isForm: {
    			type: Boolean,
    			default: false
    		}
    	}
    };
</script>

<style lang="less" scoped>
    .filters {
    	display: flex;
    	justify-content: space-between;
    	.el-select {
    		width: 48%;
    	}
    }
</style>
