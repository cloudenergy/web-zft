<template>
    <div class="house-cell" :class="{leased: out}">
        <div class="cell">
            <h3>{{room.name}}</h3>
            <div>读数：0000</div>
            
        </div>
        <div class="actions flexc">
            <p @click="edit()">
                <i class="el-icon-edit-outline" />
                <span>解绑</span>
            </p>
            <p @click="view()">
                <i class="el-icon-view" />
                <span>换表</span>
            </p>
            <p>
                <el-switch
                    v-model="conversions"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
                <span>断电</span>
            </p>
        </div>
        <el-dialog
            title="换表"
            :visible.sync="dialogVisible"
            width="40%">
            <conversion/>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="choosechange()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import conversion from './conversion.vue'
    export default {
    	props: {
    		room: Object
    	},
    	components: {
            conversion  
        },
    	data() {
    		return {
                out: Math.random() > 0.5,
                conversions:true,
                dialogVisible: false
    		};
    	},
    	methods: {
            view(){
                this.dialogVisible = true
            },
            choosechange(){
                this.del()
            },
            del(){
                this.$confirm('此操作将更换租户电表, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '更换成功!'
						});
                        this.dialogVisible = false
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '更换失败'
						});
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

    	}

    	.actions {
    		cursor: pointer;
    		position: absolute;
    		bottom: 0px;
    		background-color: rgba(250, 246, 246,0);
    		display: none;
    		text-align: center;
    		border-radius: 2px;
    		right: 15px;
            margin-left: -36px;
            margin-right: 28px;
            p:last-child{
                position: absolute;
                top:-1px;
            }
    		p {
                height: 21px;
                display: inline-block;
                position: relative;
                width: 32px;
                span{
                    position: absolute;
                    top:25px;
                    left: 4px;
                    display: none;
                }
                &:hover span{
                    display: block;
                    color:lightblue
                }
                i{
                    font-size: 20px;
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
