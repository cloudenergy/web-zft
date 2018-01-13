<template>
    <div class="house-cell" :class="{leased: classOut}">
        <div class="cell" @click="view()">
            <h3>{{room.name}}</h3>
            <p>{{room.name}} {{room.area}} {{room.orientation | orientation}}</p>
            <p v-if="room.contract.rent!==undefined">￥{{rentSmall}}/月</p>
            <p v-if="room.contract.rent===undefined">未出租</p>
            <p class="rentee"  v-if="room.contract.rent!==undefined">
                <span>
                    <icon type="yuangong" />{{room.contract.name}}</span>
                <span>退: 2018-10-1</span>
            </p>
        </div>
        <div class="actions cursorp">
            <el-tooltip content="房源预览" placement="top">
                <p @click="view()">
                    <i class="el-icon-view"  style="margin:0 5px;"/>
                </p>
            </el-tooltip>
            <el-tooltip content="合同列表" placement="top">
                <p @click="viewContracts()">
                    <icon type="touxiang1"  style="margin:0 5px;"/>
                </p>
            </el-tooltip>
            <el-tooltip content="添加合同" placement="top">
                <p @click="addContracts()">
                    <icon type="shebeiguanli4"  style="margin:0 5px;"/>
                </p>
            </el-tooltip>
            
                <p class="moreSet">
					<span class="el-dropdown-link">
						<icon type="gengduo1"  style="margin:0 5px;"/>
					</span>
					<ul>
						<li>退租</li>
						<li>续租</li>
						<li>删除合同</li>
						<li>删除房间</li>
						<li>编辑房间</li>
						<li>关闭房间</li>
					</ul>
                </p>
        </div>
    </div>
</template>

<script>
    import AddModal from './add';
    import { NewContract } from '~/modules/contract';
    const orientations = {
    	N: '北',
    	S: '南',
    	E: '东',
    	W: '西'
    };

    export default {
    	props: {
    		room: Object,
    		house: Object
    	},
    	filters: {
    		orientation(val) {
    			return orientations[val] || '';
    		}
		},
		computed: {
			classOut() {
				return this.room.contract.status==='IDLE'
			},
			rentSmall() {
				return this.room.contract.rent/100
			},
			projectId() {
				return this.$store.state.user.projectId
			}
		},
    	data() {
    		return {
    			roomAllContracts:[]
    		};
    	},
    	methods: {
    		edit() {
    			// 编辑窗口
    			this.$modal.$emit('open', {
    				comp: AddModal,
    				data: {
    					item: {
    						...this.room
    					}
    				},
    				title: '房源信息'
    			});
    		},
    		view() {
    			this.$emit('view', { room: this.room, house: this.house });
    		},
    		addContracts() {
    			this.$modal.$emit('open', {
    				comp: NewContract,
    				data: {
    					itemRoom: this.room,
    					itemHouse: this.house
    				},
    				title: '新增合约'
    			});
			},
			viewContracts(){
				this.$model('room_contracts')
				.query({},{projectId:this.projectId,roomId:this.room.id})
				.then(res=>{
					this.$set(this,'roomAllContracts',res)
				})
				.catch(err=>{
					consosle.log(err)
				})
			}
    	}
    };
</script>

<style lang="less" scoped>
    .house-cell {
    	position: relative;
    	padding: 10px;
    	width: 240px;
    	height: 116px;
    	border-radius: 4px;
    	border: 1px solid @light;
    	border-left: 4px solid @success;

    	&.leased {
    		border-left-color: rgb(253, 109, 109);
    	}

    	.cell {
    		cursor: pointer;
    		h3 {
    			margin-bottom: 10px;
    			overflow: hidden;
    			white-space: nowrap;
    		}

    		p {
    			margin-top: 10px;
    			color: @gray;
    			overflow: hidden;
    			white-space: nowrap;
    		}

    		.rentee {
    			border-top: 1px solid @light;
    			padding-top: 12px;
    			margin-top: 8px;

    			display: flex;
    			justify-content: space-between;
    		}
    	}

    	.actions {
    		cursor: pointer;
    		position: absolute;
    		bottom: -14px;
    		background: #fff;
    		display: none;
    		text-align: center;
    		border: 1px solid #ddd;
    		border-radius: 2px;
    		right: 10%;
    		margin-left: -36px;
    		p {
    			padding: 5px;
				display: inline-block;
				position: relative;
				ul{
					position: absolute;
					bottom: 21px;
					right:-4px;
					width: 60px;
					background: #fff;
					box-shadow:0 0 1px #CCC;
					display: none;
					overflow: hidden;
					li{
						list-style: none;
						margin:4px 0;
					}
				}
			}
			

    		p + p {
    			border-left: 1px solid #ddd;
			}
			.moreSet:hover ul{
				display: block;	
				li:hover{
					color:#409eff
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
