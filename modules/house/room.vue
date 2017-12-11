<template>
    <div class="house-cell" :class="{out: out}">
        <div>
            <h3>{{room.name}}</h3>
            <p>{{room.houseType.name}} {{room.houseType.area}} {{room.houseType.orientation}}</p>
            <p>￥ 200</p>
            <p class="rentee">
                <span>
                    <icon type="user" />小清新</span>
                <span>退: 2018-10-1</span>
            </p>
        </div>
        <div class="actions">
            <p @click="edit()">编辑</p>
            <p @click="view()">查看</p>
        </div>
    </div>
</template>

<script>
    import AddModal from './add';

    export default {
    	props: {
    		room: Object
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
    	padding: 10px;
    	width: 180px;
    	height: 116px;
    	border-radius: 4px;
    	border: 1px solid @light;
    	border-left: 4px solid @success;
    	cursor: pointer;

    	&.out {
    		border-left-color: @primary;
    	}

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

    	.actions {
    		display: none;
    	}

    	&:hover {
    		.actions {
    			display: block;
    		}
    	}
    }
</style>
