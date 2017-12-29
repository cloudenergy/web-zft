<template>
  <div>
        <div class="flexcenter">
            <RentSearch style="width:300px" class="clearmargin"/>
            <p>106个未绑定的仪表</p>
        </div>
        <div class="newchoose prevent" v-loading="loading">
            <div v-for="list in item" :key="list.index">
                <el-radio v-model="radio" :label="list.deviceId" style="width:100%;" @change="equipmentId()">
                    <span>{{list.title}}</span><span style="float:right;display:inline-block">{{list.deviceId}}</span>
                </el-radio>
            </div>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="listInfo.count"
                @current-change="handleCurrentChange"
                style="margin-top:5px;text-align:right"
                :page-size='12'>
            </el-pagination>
        </div>
  </div>
</template>

<script>
    import {
		RentSearch
	} from '~/modules/rent'
    export default {
        components: {
            RentSearch,
        },
        data () {
            return {
                radio:'',
                item:[],
                room:{
                    mode:'FREE',
                    index:1,
                    size:12
                },
                loading:true,
                listInfo:''
            }
        },
        computed: {
			projectId() {
				return this.$store.state.user.projectId;
			}
		},
        created () {
            this.query()  
        },
        methods: {
            log(){
                this.radio = ''
            },
            changeelectricity(data){
                this.$emit('setEquipmentid',this.radio)
            },
            query(){
                this.$model('devices')
                .query((this.room),{projectId:this.projectId})
                .then((data)=>{
                    console.log(data)
                    console.log(this.loading)
                    this.$set(this, 'item', data.data || [])
                    this.$set(this, 'listInfo', data.paging || [])
                    this.loading = false
                    console.log(this.item)
                })
            },
            equipmentId(){
                console.log(this.radio)
            },
            setNewList(){
                this.query(this.room)
            },
            handleCurrentChange(val){
                this.room.index = val
                this.loading = true
                this.query()
            }
        }
    }
</script>

<style lang="less" scoped>
    .newchoose{
        margin-top: 20px;
        border: 1px solid #ddd;
        padding: 5px;
        min-height: 100px;
    }
</style>
<style>
    .clearmargin>div{
        margin-left: 0;
    }
    .newchoose.prevent .el-radio__input{
        display: none;
    }
</style>

