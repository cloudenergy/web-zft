<template>
<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item v-if="isShow.indexOf('房源')!=-1">
<el-select v-model="value" placeholder="房源">
    <el-option
      v-for="compact1 in compact"
      :key="compact1.value"
      :label="compact1.label"
      :value="compact1.value">
    </el-option>
  </el-select>
  </el-form-item>


<el-form-item v-if="isShow.indexOf('时间')!=-1">
      <!-- <div class="block"> -->
    <el-date-picker
      v-model="data"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  <!-- </div> -->
  </el-form-item>


  <el-form-item v-if="isShow.indexOf('城市')!=-1">
      <el-select v-model="cityVal"  placeholder="城市">
    <el-option
      v-for="city1 in city"
      :key="city1.value"
      :label="city1.label"
      :value="city1.value">
    </el-option>
  </el-select>
  </el-form-item>

  <el-form-item v-if="isShow.indexOf('小区')!=-1">
      <el-select v-model="communityVal"  placeholder="小区">
    <el-option
      v-for="community1 in community"
      :key="community1.value"
      :label="community1.label"
      :value="community1.value">
    </el-option>
  </el-select>
  </el-form-item>

 <el-form-item v-if="isShow.indexOf('角色')!=-1">
      <el-select v-model="cityVal"  placeholder="角色">
    <el-option
      v-for="city1 in city"
      :key="city1.value"
      :label="city1.label"
      :value="city1.value">
    </el-option>
  </el-select>
  </el-form-item>

   <el-form-item v-if="isShow.indexOf('员工')!=-1">
      <el-select v-model="cityVal"  placeholder="员工">
    <el-option
      v-for="city1 in city"
      :key="city1.value"
      :label="city1.label"
      :value="city1.value">
    </el-option>
  </el-select>
  </el-form-item>

   <el-form-item v-if="isShow.indexOf('结余')!=-1">
      <el-select v-model="cityVal"  placeholder="结余">
    <el-option
      v-for="city1 in city"
      :key="city1.value"
      :label="city1.label"
      :value="city1.value">
    </el-option>
  </el-select>
  </el-form-item>


<el-form-item v-if="isShow.indexOf('显示')!=-1">
      <el-select v-model="cityVal"  placeholder="显示">
    <el-option
      v-for="city1 in city"
      :key="city1.value"
      :label="city1.label"
      :value="city1.value">
    </el-option>
  </el-select>
  </el-form-item>

  <el-form-item v-if="isShow.indexOf('流水')!=-1">
      <el-select v-model="cityVal"  placeholder="流水来源">
    <el-option
      v-for="city1 in city"
      :key="city1.value"
      :label="city1.label"
      :value="city1.value">
    </el-option>
  </el-select>
  </el-form-item>

  <el-form-item v-if="isShow.indexOf('状态')!=-1">
      <el-select v-model="cityVal"  placeholder="状态">
    <el-option
      v-for="city1 in city"
      :key="city1.value"
      :label="city1.label"
      :value="city1.value">
    </el-option>
  </el-select>
  </el-form-item>

<el-form-item v-if="isShow.indexOf('签约人')!=-1">
      <el-select v-model="cityVal"  placeholder="签约人">
    <el-option
      v-for="city1 in city"
      :key="city1.value"
      :label="city1.label"
      :value="city1.value">
    </el-option>
  </el-select>
  </el-form-item>

<el-form-item v-if="isShow.indexOf('归属')!=-1">
	 <el-cascader
	 placeholder="房源归属"
    :options="cascader"
    v-model="selectedOptions"
    @change="handleChange">
  </el-cascader>
</el-form-item>

</el-form>
</template>
<script>
export default {
	props: { isShow: Array },
	data() {
		return {
			formInline: {
				user: '',
				region: ''
			},
			value: '',
			cityVal: '',
			data: '',
			communityVal: '',
			community: '',
			props: { value: 'value', label: 'label', children: 'children' },
			compact: [
				{ value: 'all', label: '全部' },
				{ value: 'h', label: '合租' },
				{ value: 'z', label: '整租' },
				{ value: 'd', label: '独栋' }
			],
			city: [
				{
					label: '杭州',
					value: 'hz'
				},
				{
					label: '余杭',
					value: 'yh'
				}
			],
			community: [
				{ label: '杭州小区1', value: 'hzxq1' },
				{ label: '杭州小区2', value: 'hzxq2' },
				{ label: '杭州小区3', value: 'hzxq3' },

				{ label: '余杭小区1', value: 'yhxq1' },
				{ community: '余杭小区2', value: 'yhxq2' },
				{ community: '余杭小区3', value: 'yhxq3' }
			],
			cascader: [
				{
					value: 'hz',
					label: '杭州',
					children: [
						{ value: 'hzxq1', label: '杭州小区1' },
						{ value: 'hzxq2', label: '杭州小区2' }
					]
				},
				{
					value: 'yh',
					label: '余杭',
					children: [{ value: 'yhxq1', label: '余杭小区1' }]
				}
			],
			selectedOptions: [],
			options: [
				{
					id: 143828,
					name: '龙湖滟澜山',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null,
					value: '1',
					label: 'a'
				},
				{
					id: 81947,
					name: '范家小区',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 227459,
					name: '佳丰北苑-南门',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 117510,
					name: '联庄公寓',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 84358,
					name: '浮山后一小区',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 228086,
					name: '燕巢',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 49494,
					name: '闸弄口东村',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 49567,
					name: '朝晖三区',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 81944,
					name: '范家天城公寓',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 72539,
					name: '采荷翠柳',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 63904,
					name: '保利香槟国际',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 229285,
					name: '水楼公寓大楼',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 229296,
					name: '关岛度假公寓',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 229406,
					name: '新青年广场',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 72540,
					name: '采荷东区',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 229505,
					name: '关岛度假公寓',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 229516,
					name: '浅山',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 66767,
					name: '新帝朗郡',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 234983,
					name: '新帝',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 236677,
					name: '公寓的名称',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 239746,
					name: '保利心语',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 124296,
					name: '南班巷',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 240043,
					name: '国家大学科技园',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 240186,
					name: '范家公寓',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				},
				{
					id: 240241,
					name: '杭州绿谷',
					buildingId: null,
					houseNum: 0,
					selectFlag: false,
					selectNum: 0,
					pid: null
				}
			]
		};
	},
	methods: {
		onSubmit() {
			console.log('submit!');
		},
		handleChange(value) {
			console.log(value);
		}
	}
};
</script>
<style>
.el-range-editor--mini.el-input__inner {
	width: 250px;
}
.el-range-editor--mini .el-range-separator {
	min-width: 20px;
}
</style>
