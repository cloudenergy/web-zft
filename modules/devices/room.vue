<template>
    <div class="house-cell" :class="{leased: out}">
        <div class="cell">
            <h3>{{room.name}}</h3>
            <div v-if="room.devices!=''||null">
                <div>名称：{{room.showEquipment.title}}</div>
                <div>表ID：{{room.showEquipment.deviceId}}</div>
                <div>读数：{{room.showEquipment.scale}}</div>
                <div>时间：{{room.showEquipment.updatedAtTime}}</div>
            </div>

        </div>
        <div class="actions flexc">
            <div v-if="room.devices!=''||null">
                <p @click="deleteequipment()">
                    <icon type="jiebang1" />
                    <span>解绑</span>
                </p>
                <p class="setswitch">
                    <el-switch :width="num" v-model="conversions" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                    <span>断电</span>
                </p>
            </div>
            <div v-if="room.devices==''||null" class="add" @click="edit(room)">
                <i class="el-icon-circle-plus"></i>
            </div>
        </div>
        <el-dialog title="选择要绑定的职能设备" :visible.sync="dialogVisible" width="40%">
            <conversion ref="aaa" @setEquipmentid="setEquipmentid" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="choosechange()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import conversion from './conversion.vue';
    export default {
    	props: {
    		room: Object,
    		houseId: { required: true }
    	},
    	components: {
    		conversion
    	},
    	computed: {
    		projectId() {
    			return this.$store.state.user.projectId;
    		}
    	},
    	data() {
    		return {
    			out: Math.random() > 0.5,
    			conversions: true,
    			dialogVisible: false,
    			num: 30
    		};
    	},
    	methods: {
    		choosechange() {
    			this.del();
    		},
    		del() {
    			this.$confirm('此操作将选择此电表, 是否继续?', '提示', {
    				confirmButtonText: '确定',
    				cancelButtonText: '取消',
    				type: 'warning'
    			})
    				.then(() => {
    					this.$refs.aaa.changeelectricity(this.houseId);
    					this.dialogVisible = false;
    					this.$refs.aaa.log();
    				})
    				.catch(err => {});
    		},
    		edit(data) {
    			this.dialogVisible = true;
    		},
    		setEquipmentid(data) {
    			this.$model('room_devices')
    				.update(
    					{},
    					{
    						houseId: this.houseId,
    						roomId: this.room.id,
    						projectId: this.projectId,
    						id: data
    					}
    				)
    				.then(data => {
    					this.$message.success('绑定成功');
    					this.$emit('sendFloor');
    					this.$refs.aaa.setNewList();
    				})
    				.catch(err => {
    					this.$message.mistake('绑定失败');
    				});
    		},
    		deleteequipment() {
    			this.$model('room_devices')
    				.delete(
    					{},
    					{
    						projectId: this.projectId,
    						houseId: this.houseId,
    						roomId: this.room.id,
    						id: this.room.devices[0].deviceId
    					}
    				)
    				.then(data => {
						console.log(data)
    					this.$message.success('解绑成功');
    					this.$emit('sendFloor');
    				})
    				.catch(err => {
    					this.$message('解绑失败');
    				});
    		}
    	}
    };
</script>

<style lang="less" scoped>
    .house-cell {
    	position: relative;
    	padding: 10px;
    	width: 180px;
    	height: 116px;
    	border-radius: 4px;
    	border: 1px solid @light;
    	border-left: 4px solid @success;

    	// &.leased {
    	// 	border-left-color: @light;
    	// }

    	.cell {
    		h3 {
    			margin-bottom: 12px;
    			overflow: hidden;
    			white-space: nowrap;
    		}

    		p {
    			margin-top: 10px;
    			color: @gray;
    			overflow: hidden;
    			white-space: nowrap;
    		}
    		> div {
    			color: #7f7d80;
    			> div {
    				margin-top: 3px;
    			}
    		}
    	}

    	.actions {
    		cursor: pointer;
    		position: absolute;
    		bottom: -5px;
    		background-color: rgba(250, 246, 246, 0);
    		display: none;
    		text-align: center;
    		border-radius: 2px;
    		right: 15px;
    		margin-left: -36px;
    		margin-right: 28px;
    		.add {
    			position: absolute;
    			right: -35px;
    			bottom: 3px;
    			font-size: 20px;
    		}
    		p:last-child {
    			position: absolute;
    			top: -5px;
    		}
    		p {
    			height: 21px;
    			display: inline-block;
    			position: relative;
    			width: 32px;
    			span {
    				position: absolute;
    				top: 18px;
    				left: 4px;
    				display: none;
    			}

    			&:hover span {
    				display: block;
    				color: lightblue;
    			}
    			// i{
    			//     font-size: 20px;
    			// }
    		}
    		p.setswitch {
    			span {
    				top: 23px;
    			}
    		}
    	}
    	&:hover {
    		.actions {
    			display: block;
    		}
    	}
    }
</style>

<style>
    .setswitch > div > span {
    	height: 14px;
    	width: 30px;
    }
    .setswitch > div > span.el-switch__core > span.el-switch__button {
    	height: 10px;
    	width: 10px;
    	left: 4px;
    }
</style>

