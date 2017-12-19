<template>
    <div class="house-cell" :class="{leased: out}">
        <div class="cell">
            <h3>{{room.name}}</h3>
            <p>{{room.name}} {{room.area}} {{room.orientation | orientation}}</p>
            <p>￥ 200</p>
            <p class="rentee">
                <span>
                    <icon type="yuangong" />小清新</span>
                <span>退: 2018-10-1</span>
            </p>
        </div>
        <div class="actions">
            <p @click="edit()">
                <i class="el-icon-edit-outline" />
            </p>
            <p @click="view()">
                <i class="el-icon-view" />
            </p>
        </div>
    </div>
</template>

<script>
    import AddModal from './add';
    const orientations = {
    	N: '北',
    	S: '南',
    	E: '东',
    	W: '西'
    };

    export default {
    	props: {
    		room: Object
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
    						name: 'test'
    					}
    				},
    				title: '新增房源'
    			});
    		},
    		view() {
    			this.$emit('view', this.room.id);
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
    		position: absolute;
    		bottom: -14px;
    		background: #fff;
    		display: none;
    		text-align: center;
    		border: 1px solid #ddd;
    		border-radius: 2px;
    		left: 50%;
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
