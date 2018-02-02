<template>
	<div class="partner">
		<el-col :span="2">
			<el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			<el-button class="addBtn" size="medium" @click="addSteward=true">添加岗位</el-button>
		</el-col>
		<el-col :span="20">
			<component :is="currentView"></component>
		</el-col>

		<el-dialog title="提示" :visible.sync="addSteward" width="30%">
			<el-form ref="addStewardForm" :model="addStewardForm" label-width="80px">

				<el-form-item label="管家姓名">
					<el-input v-model="addStewardForm.username" placeholder="管家姓名"></el-input>
				</el-form-item>
				<el-form-item label="账户密码">
					<el-input v-model="password" placeholder="密码" type="password"></el-input>
				</el-form-item>
				<el-form-item label="权限">
					<el-select v-model="addStewardForm.level" placeholder="请选择">
						<el-option value="manager" label="管家"></el-option>
						<el-option value="accountant" label="财务"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="电子邮件">
					<el-input v-model="addStewardForm.email" placeholder="电子邮件"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addSteward = false">取 消</el-button>
				<el-button type="primary" @click="add">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	import Root from './role/root';
	import All from './role/all';
	import Medics from './role/medics';
	import md5 from 'js-md5';
	export default {
		components: {
			Root,
			All,
			Medics
		},
		data() {
			return {
				addSteward: false,
				addStewardForm: {
					username: '',
					level: '',
					password:'',
					email: '' 
				},
				dialogVisible: false,
				password:'',
				currentView: 'all',
				selectedOptions: [],
				value: [],
				number: '0',
				postName: '',
				dialogTable: [{
					name: '工作台',
					jurisdiction: [{
							label: '公告',
							checked: ['浏览', '新增']
						},
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
						{
							label: '统计',
							checked: ['浏览']
						}
					]
				}, {
					name: '工作台',
					jurisdiction: [{
							label: '公告',
							checked: ['浏览', '新增']
						},
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
						{
							label: '统计',
							checked: ['浏览']
						}
					]
				}, ],

				options: [{
						label: '本人',
						value: '1'
					},
					{
						label: '本部',
						value: '10'
					},
					{
						label: '所有',
						value: '20'
					}
				],
				rentReduction: [{
						label: 'a',
						value: 'a'
					},
					{
						label: 'b',
						value: 'b',
						children: [{
							label: 'bb',
							value: 'bb'
						}]
					}
				],
				tree: [{
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

			},
			add() {
				this.addSteward = false;
				this.addStewardForm.password = md5(this.password);
				console.log(this.addStewardForm.password)
				this.$model('credentials')
				.create(this.addStewardForm, {
					projectId: this.projectId
				})
				.then(res=>{
					console.log(res)
					if(res.status!=200){
						this.$message('创建失败')
					}else{
						this.$message.success('创建成功')
						this.addStewardForm.username=this.addStewardForm.password=this.password=''
					}
				})
			}
		},
		computed: {
			projectId() {
				return this.$store.state.user.projectId;
			}
		},

	};
</script>

<style lang='less' scoped>
	.partner {
		/deep/.addBtn {
			margin-top: 10px;
			width: 100%;
		}
		.dialog_tab_ul {
			label {
				width: 10%;
				float: left;
			}
			.dialog_tab_ul_checked {
				float: left;
				width: 80%;
			}
		}
	}
</style>