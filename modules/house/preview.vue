<template>
    <div class="preview">
        <h3 class="title">{{room.name}} {{room.area}} {{room.orientation}}</h3>
        <div class="base section">
            <h4>房间信息</h4>
            <p>房间: 次卧 18平 东</p>
        </div>
        <div class="facilities section">
            <h4>房间配置</h4>
            <house-facility></house-facility>
        </div>
        <div class="devices section">
            <h4 class="flexc" style="aline-item:center">
                <span style="line-height:20px;margin-right:15px">
                    职能设备
                </span>
                <i class="el-icon-circle-plus-outline" style="font-size:20px" @click="bindEleciricity"></i>
            </h4>
            <el-table :data="room.devices" stripe>
                <el-table-column prop="deviceId" label="ID" width="150">
                </el-table-column>
                <el-table-column prop="title" label="设备" min-width="200">
                </el-table-column>
                <el-table-column label="通讯状态"  width="100">
                     <template slot-scope="scope">
                        <span>正常</span>
                        <span>异常</span>
                    </template>
                </el-table-column>
                <el-table-column label="控制"  width="100">
                     <template slot-scope="scope">
                        <el-switch
                            style="display: block"
                            v-model="value4"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="管理"  width="100">
                     <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">解绑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="bills section">
            <h4>租费设置</h4>
            <el-table :data="room.bills" stripe>
                <el-table-column prop="name" label="名称" width="150">
                </el-table-column>
                <el-table-column prop="amount" label="金额">
                </el-table-column>
                <el-table-column prop="period" label="周期">
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-button @click.native="del" type="danger">删除</el-button>
        </div>
        <el-dialog
            title="选择要绑定的智能设备"
            :visible.sync="dialogVisible"
            width="40%"
            append-to-body>
            <conversion ref="aaa" @setEquipmentid="setEquipmentid" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="choosechange()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import conversion from '../devices/conversion.vue'
    export default {
     	props: {
    		house: Object,
    		room: {
    			type: Object,
    			default() {
    				return {
    					houseType: {},
    					devcies: [{ part: '门锁', room: '1021', id: '12132013' }],
    					bills: [{ name: '租金', amount: '1400', period: '一月一付' }]
    				};
    			}
            }
        },
        data () {
            return {
                dialogVisible:false,
                value4:true
            }
        },
        components: {
            conversion  
        },
        computed: {
    		projectId() {
    			return this.$store.state.user.projectId;
    		}
    	},
    	watch: {
    		room(val) {
    			console.log('change:', this.room, this.house);
    		}
    	},
    	created() {
    		// 获取房间数据
    		console.log('room:', this.room, this.house);
    	},
    	methods: {
    		del(room) {
    			this.$model('rooms').delete(null, {
    				id: this.roomId
    			});
    		},
            handleDelete(data){
                console.log(1)
                this.$confirm('此操作将解绑此电表, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
                        this.$model('room_devices')
                        .delete({},{projectId:this.projectId,houseId:this.house.houseId,roomId:this.room.id,id:data.deviceId})
                        .then((res)=>{
                            // console.log(res)
                            this.queryAgain('unbundling')
                        })
					}).catch(err => {
						
				});
            },
            bindEleciricity(){
                this.dialogVisible = true
            },
            setEquipmentid(data){
                this.$model('room_devices')
				.update({},{projectId:this.projectId,houseId:this.house.houseId,roomId:this.room.id,id:data})
				.then((data)=>{
                    this.$refs.aaa.setNewList()
                    this.queryAgain('bind')
				})
				.catch(err=>{
					this.$message.mistake('绑定失败')
				})
            },
            choosechange(){
                this.chooseElectricity()
            },
            chooseElectricity(){
                this.$confirm('此操作将选择此电表, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
                        this.$refs.aaa.changeelectricity(this.houseId)
                        this.dialogVisible = false
                        this.$refs.aaa.log()
					}).catch(err => {
						
				});
            },
            queryAgain(data){
                this.$model('room_detail')
                    .query({},{projectId:this.projectId,houseId:this.house.houseId,roomId:this.room.id})
                    .then(res=>{
                        if(data=='bind'){
                            if(res.devices.length!=0){
                                this.$message.success('操作成功')
                            }else{
                                this.$message('操作失败')
                            }
                        }else{
                            if(res.devices.length==0){
                                this.$message.success('操作成功')
                            }else{
                                this.$message('操作失败')
                            }
                        }
                        this.room.devices = res.devices
                    })
            }
    	}
    };
</script>

<style lang="less" scoped>
    .section {
    	margin-bottom: 30px;

    	h4 {
    		margin-bottom: 20px;
    	}
    }
</style>
<style>
    .el-switch{
        height: 22px;
    }
</style>


