<template>
 <div class="partner">
     <el-col :span="2">
     <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
     <el-button class="addBtn" size="medium" @click="dialogVisible=true">添加岗位</el-button>
     </el-col>
     <el-col :span="20">
       <component :is="currentView"></component>
     </el-col>

<el-dialog
  title="操作权限分配"
  :visible.sync="dialogVisible"
  width="50%">
  <el-form>

    <el-form-item label="岗位名称">
      <el-col :span="10">
<el-input v-model="postName" placeholder="请输入岗位名称"></el-input>
      </el-col>
    </el-form-item>

    <el-form-item label="排序序号">
      <el-col :span="10">
<el-input v-model="number" placeholder=""></el-input>
      </el-col>
    </el-form-item>

    <el-form-item label="操作房源范围">
      <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</el-form-item>


    <el-form-item label="租金降价权限">
      <el-cascader
    :options="rentReduction"
    v-model="selectedOptions"
    separator=','>
  </el-cascader>
    </el-form-item>
  

<el-form-item>
   <el-table
      :data="dialogTable"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="模块"
        width="140">
      </el-table-column>
      <el-table-column
        prop="jurisdiction"
        label="权限">
        <template slot-scope="scope">
          <ul class="dialog_tab_ul" v-for="dialogTable_v in dialogTable" :key="dialogTable_v.id">
            <li v-for="jurisdiction_v in dialogTable_v.jurisdiction" :key="jurisdiction_v.id">
              <label>{{jurisdiction_v.label}}</label>
              <div class="dialog_tab_ul_checked">
<el-checkbox v-for="checked_v in jurisdiction_v.checked" :label="checked_v" :key="checked_v.id"></el-checkbox>
              </div>
              
            </li>
          </ul>
          
        </template>
      </el-table-column>
    </el-table>
</el-form-item>

</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

 </div>
</template>

<script>
import Root from './role/root';
import All from './role/all';
import Medics from './role/medics';

export default {
	components: {
		Root,
		All,
		Medics
	},
	data() {
		return {
			dialogVisible: false,
			currentView: 'all',
			selectedOptions: [],
			value: [],
			number: '0',
			postName: '',
			dialogTable: [
				{
					name: '工作台',
					jurisdiction: [
						{ label: '公告', checked: ['浏览', '新增'] },
						{
							label: '首页报表',
							checked: ['收支情况', '入住情况', '续租率', '月度统计', '今日账务']
						},
						{
							label: '待收账单',
							checked: ['浏览', '忽略', '催租']
						},
						{
							label: '待付账单',
							checked: ['浏览', '忽略', '通知']
						},
						{
							label: '即将搬入',
							checked: ['浏览', '忽略', '通知']
						},
						{
							label: '即将退房',
							checked: ['浏览', '忽略', '通知']
						},
						{
							label: '预定',
							checked: ['浏览', '新增', '删除', '撤销+退定', '撤销+预约退定']
						},
						{
							label: '在线签约',
							checked: [
								'浏览',
								'接受签约',
								'拒绝签约',
								'发送预准',
								'取消预准',
								'发起绑定'
							]
						},
						{
							label: '财务审批',
							checked: ['浏览', '通过', '驳回', '导出']
						},
						{ label: '统计', checked: ['浏览'] }
					]
				},{
					name: '工作台',
					jurisdiction: [
						{ label: '公告', checked: ['浏览', '新增'] },
						{
							label: '首页报表',
							checked: ['收支情况', '入住情况', '续租率', '月度统计', '今日账务']
						},
						{
							label: '待收账单',
							checked: ['浏览', '忽略', '催租']
						},
						{
							label: '待付账单',
							checked: ['浏览', '忽略', '通知']
						},
						{
							label: '即将搬入',
							checked: ['浏览', '忽略', '通知']
						},
						{
							label: '即将退房',
							checked: ['浏览', '忽略', '通知']
						},
						{
							label: '预定',
							checked: ['浏览', '新增', '删除', '撤销+退定', '撤销+预约退定']
						},
						{
							label: '在线签约',
							checked: [
								'浏览',
								'接受签约',
								'拒绝签约',
								'发送预准',
								'取消预准',
								'发起绑定'
							]
						},
						{
							label: '财务审批',
							checked: ['浏览', '通过', '驳回', '导出']
						},
						{ label: '统计', checked: ['浏览'] }
					]
				},
			],

			options: [
				{ label: '本人', value: '1' },
				{ label: '本部', value: '10' },
				{ label: '所有', value: '20' }
			],
			rentReduction: [
				{
					label: 'a',
					value: 'a'
				},
				{
					label: 'b',
					value: 'b',
					children: [
						{
							label: 'bb',
							value: 'bb'
						}
					]
				}
			],
			tree: [
				{
					label: '所有岗位(1人)',
					index: 'All'
				},
				{
					label: '管理员(1人)',
					index: 'Root'
				},
				{
					label: '卫生员(0人)',
					index: 'Medics'
				}
			],
			defaultProps: {
				children: 'children',
				label: 'label'
			}
		};
	},
	methods: {
		handleNodeClick(data) {
			this.currentView = data.index;
			console.log(data);
		}
	}
};
</script>

<style lang='less' scoped>
.partner {
	/deep/.addBtn {
		margin-top: 10px;
		width: 100%;
  }
  .dialog_tab_ul{
    label{
      width: 10%;
      float: left;
    }
    .dialog_tab_ul_checked{
      float: left;
      width: 80%;
    }
  }
}
</style>

