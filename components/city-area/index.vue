<script>
import Vue from 'vue';

function isCity(city) {
	return function(item) {
		return parseInt(item.value / 100) === city / 100;
	};
}

let pending = false;

function mapper(item) {
	return {
		label: item.name,
		value: item.id
	};
}

export default {
	created() {
			this.$store.dispatch('GET_CITY_AREA').then(({ result }) => {
				this.list.city = result.map(mapper);
			});
	},
	data() {
		return {
			list: {
				city: [],
				area: []
			},
			city: '',
			area: ''
		};
	},
	methods: {
		cityChange() {
			this.$model('districts', { level: 3, cityId: this.city }).then(
				({ result }) => {
					this.list.area = result;
					console.log('list', this.list);
				}
			);
			this.area = null;
			this.$emit('change', { city: this.city, area: this.area });
		}
	},
	render() {
		const city = this.list.city;
		const area = this.list.area.map(mapper);
		const filters = {
			city,
			area
		};

		let citySelect = (
			<el-select
				value={this.city}
				size={this.isForm ? 'mini' : 'small'}
				clearable={true}
				filterable={true}
				on-change={val => {
					this.city = val;
					this.cityChange();
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
				size={this.isForm ? 'mini' : 'small'}
				on-change={val => {
					this.area = val;
					this.$emit('change', { area: this.area, city: this.city });
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
