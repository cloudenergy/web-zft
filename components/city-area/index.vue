<script>
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
    				{this.filters.city.map(item => {
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
    				{this.filters.area.map(item => {
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
    			area: '',
    			filters: {
    				city: [],
    				area: []
    			}
    		};
    	},
    	created() {
    		this.$store
    			.dispatch('GET_CITY_AREA')
    			.then(val => this.$set(this.filters, val));
    	},
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
