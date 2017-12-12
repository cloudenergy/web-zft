<script>
    import Vue from 'vue';

    function isCity(city) {
    	return function(item) {
    		return city ? item.parent == city : false;
    	};
    }

    export default {
    	render() {
    		const city = [
    			{ label: '北京', value: 20100 },
    			{ label: '浙江', value: 30100 }
    		];

    		const area = [
    			{ label: '北京', parent: 20100, value: 20101 },
    			{ label: '杭州', parent: 30100, value: 30101 }
    		];
    		const filters = new Vue({
    			data: {
    				city,
    				area
    			}
    		});

    		let citySelect = (
    			<el-select
    				value={this.city}
    				size="mini"
    				on-change={val => {
    					this.city = val;
    					this.$emit('change', { city: this.city });
    					filters.area = [];
    					this.area = null;
    				}}
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
    		let areaSelect = (
    			<el-select
    				value={this.area}
    				size="mini"
    				on-change={val => {
    					this.area = val;
    					this.$emit('change', { area: this.area });
    				}}
    				placeholder="请选择区域"
    			>
    				{filters.area.filter(isCity(this.city)).map(item => {
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
    		return (
    			<div class={{ inForm: this.isForm, filters: !this.isForm }}>
    				{this.isForm ? (
    					<el-form-item label="城市">{citySelect}</el-form-item>
    				) : (
    					citySelect
    				)}
    				{this.isForm ? (
    					<el-form-item label="区域">{areaSelect}</el-form-item>
    				) : (
    					areaSelect
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
