<template>
    <div class="preview">
        <h3 class="title">{{house.location.name}}{{house.building}}{{house.ubit}}{{house.roomNumber}}</h3>
        <div class="base section">
            <h4>房源信息</h4>
            <p>朝向:{{house.layout.orientation}}</p>
        </div>
        <div class="facilities section">
            <h4>房间配置</h4>
            <house-facility></house-facility>
        </div>
        <div class="devices section">
            <h4 class="flexc" style="aline-item:center">
                <span style="line-height:20px;margin-right:15px">
                    智能设备
                </span>
                <i class="el-icon-circle-plus-outline" style="font-size:20px" v-if="house.devices.length==0" @click="bindEleciricity"></i>
            </h4>
            <el-table :data="house.devices" stripe>
                <el-table-column prop="deviceId" label="ID" width="150">
                </el-table-column>
                <el-table-column prop="title" label="设备" min-width="200">
                </el-table-column>
                <el-table-column label="管理"  max-width="80">
                     <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">解绑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-button @click.native="del" type="danger">删除</el-button>
        </div>
        <el-dialog
            title="选择要绑定的职能设备"
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
            houseType:String
        },
        data () {
            return {
                dialogVisible:false
            }
        },
        // created () {
        //     this.$model('housedetail')
        //             .query({houseFormat:this.houseType},{projectId:this.projectId,id:this.house.houseId})
        //             .then(res=>{
        //                 console.log(res)
        //             })
        //             .catch(err=>{
        //                 console.log(err)
        //             })  
        // },
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
    	methods: {
    		del(room) {
    			this.$model('rooms').delete(null, {
    				id: this.roomId
    			});
    		},
            handleDelete(data){
                this.$confirm('此操作将解绑此电表, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
                        this.$model('house_devices')
                        .delete({},{projectId:this.projectId,houseId:this.house.houseId,id:data.deviceId})
                        .then((res)=>{
                            this.queryAgain('unbundling')
                        })
					}).catch(() => {
						
				});
            },
            bindEleciricity(){
                this.dialogVisible = true
            },
            setEquipmentid(data){
                this.$model('house_devices')
				.update({public:'1'},{projectId:this.projectId,houseId:this.house.houseId,id:data})
				.then((data)=>{
                    this.$refs.aaa.setNewList()
                    this.queryAgain('bind')
                    
				})
				.catch(()=>{
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
					}).catch(() => {
						
				});
            },
            queryAgain(data){
                this.$model('housedetail')
                    .query({houseFormat:this.houseType},{projectId:this.projectId,id:this.house.houseId})
                    .then(res=>{
                        console.log(res)
                    })
                    .catch(err=>{
                        console.log(err)
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

