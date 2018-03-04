<script>
import _ from 'lodash'
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
	computed: {
		listCity() {
			return this.$store.state.userInfo.businessCity
		}	
	},
	created () {
		if(this.isForm){
			this.$store.dispatch('GET_CITY_AREA').then(({ result }) => {
				this.list.city = result.map(mapper);
			})
		}
		this.houseFormatChange('SHARE')	
	},
	watch: {
		listCity(newVal,oldVal) {
			var city = newVal.filter((item)=>{return item.houseFormat===this.clickType})
			if(!this.isForm) {
				this.list.city = _.uniqBy(city.map((ele)=>{
					return ele.city
				}).map(mapper),'value')
			}
		}	
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
			this.$store.dispatch('GET_DISTRICTS',{
				city:this.city,
				isForm:this.isForm
			}).then(data=>{
				this.list.area = this.isForm?data.result:data[0].area
			})
			this.area = null;
		},
		houseFormatChange(data) {
			this.city=this.area=""
			this.list.city =  _.uniqBy(this.listCity.filter((item)=>{return item.houseFormat===data}).map((ele)=>{return ele.city}).map(mapper),'value')
			
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
				class='normal'
				clearable={true}
				filterable={true}
				on-change={val => {
					this.city = val;
					this.cityChange();
					this.$emit('cityChange', { city: this.city });
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
				class='normal'
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
					<span style="margin-right:28px"><div tabindex="0" class="el-input-group__prepend addwidth" style="font-size:14px;display:inline-block">城市</div>{citySelect}</span>
				) : (
					citySelect
				)}
				{this.isForm ? (
					<span><div tabindex="0" class="el-input-group__prepend addwidth" style="font-size:14px;display:inline-block">区域</div>{areaSelect}</span>
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
		},
		clickType: {
			type: String
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
.normal{
	width: 145px;
}
</style>
