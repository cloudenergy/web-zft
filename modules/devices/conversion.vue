<template>
    <div>
        <div class="flexcenter">
            <RentSearch style="width:300px" class="clearmargin" :placeholder="placeholder" @childinfo='childinfo'/>
            <p>数量/{{listInfo.count}}</p>
        </div>
        <div class="newchoose prevent" v-loading="loading">
            <div v-for="list in item" :key="list.index" class="mini">
                <el-radio v-model="radio" :label="list.deviceId" style="width:100%;" @change="equipmentId()" size="mini">
                    <div class="flexcenter space-between">
                        <span>电表:</span>
						<p class="memo">{{list.memo}}</p>
                        <span style="padding-right:10px">{{removePrefix(list.deviceId)}}</span>
                    </div>
                </el-radio>
            </div>
            <el-pagination :background="background" layout="prev, pager, next" :total="listInfo.count" @current-change="handleCurrentChange"
                style="margin-top:5px;text-align:right" :page-size='12'>
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { removePrefix } from '~/utils/helper';
import { RentSearch } from '~/modules/rent';
export default {
	components: {
		RentSearch
	},
	data() {
		return {
			radio: '',
			item: [],
			room: {
				mode: 'FREE',
				index: 1,
				size: 12
			},
			loading: true,
			listInfo: '',
			background: true,
			placeholder: '请输入仪表ID'
		};
	},
	computed: {
		projectId() {
			return this.$store.state.userInfo.user.projectId;
		}
	},
	created() {
		this.query();
	},
	methods: {
    removePrefix(val) {
			return removePrefix(val);
		},
		childinfo(val) {
			this.room.q = val;
			this.query();
		},
		log() {
			this.radio = '';
		},
		changeelectricity() {
			this.$emit('setEquipmentid', this.radio);
		},
		query() {
			this.$model('devices')
				.query(this.room, {
					projectId: this.projectId
				})
				.then(data => {
					this.$set(this, 'item', data.data || []);
					this.$set(this, 'listInfo', data.paging || []);
					this.loading = false;
				});
		},
		equipmentId() {},
		setNewList() {
			this.query();
		},
		handleCurrentChange(val) {
			this.room.index = val;
			this.loading = true;
			this.query();
		}
	}
};
</script>

<style lang="less" scoped>
.newchoose {
	margin-top: 20px;
	border: 1px solid #ddd;
	padding: 5px;
	min-height: 100px;
}
.mini {
	height: 40px;
	border-bottom: 1px solid #eee;
}
.space-between {
	display: flex;
	justify-content: space-between;
	.memo {
		width: 200px;
	}
}
</style>
<style>
.clearmargin > div {
	margin-left: 0;
}
.newchoose.prevent .el-radio__input {
	display: none;
}

</style>
