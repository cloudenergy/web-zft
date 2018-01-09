<template>
    <div class="house-cell" :class="{leased: out}">
        <div class="cell" @click="view()">
            <h3>{{room.name}}</h3>
            <p>{{room.name}} {{room.area}} {{room.orientation | orientation}}</p>
            <p>￥ 200</p>
            <p class="rentee">
                <span>
                    <icon type="yuangong" />小清新</span>
                <span>退: 2018-10-1</span>
            </p>
        </div>
        <div class="actions cursorp">
			<el-tooltip content="房源预览" placement="top" style="margin:0 5px;">
				<p @click="view()">
					<i class="el-icon-view" />
				</p>
			</el-tooltip>
			<el-tooltip content="合同列表" placement="top" style="margin:0 5px;">
				<p @click="view()">
					<i class="el-icon-view" />
				</p>
			</el-tooltip>
			<el-tooltip content="添加合同" placement="top" style="margin:0 5px;">
				<p @click="addContracts()">
					<i class="el-icon-view" />
				</p>
			</el-tooltip>
			<el-tooltip content="更多操作" placement="top" style="margin:0 5px;">
				<p @click="view()">
					<i class="el-icon-view" />
				</p>
			</el-tooltip>
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
    	data() {
    		return {
    			out: Math.random() > 0.5
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
					data:{
						item_room: this.room,
						item_house: this.house
					},
    				title: '新增合约'
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

    	&.leased {
    		border-left-color: @light;
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
    		}

    		p + p {
    			border-left: 1px solid #ddd;
    		}
    	}

    	&:hover {
    		.actions {
    			display: block;
    		}
    	}
    }
</style>
