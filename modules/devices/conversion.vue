<template>
  <div>
        <div class="flexcenter">
            <RentSearch style="width:300px" class="clearmargin"/>
            <p>106个未绑定的仪表</p>
        </div>
        <div class="newchoose prevent">
            <div v-for="list in item" :key="list.index">
                <el-radio v-model="radio" :label="list.deviceId" style="width:100%;" @change="equipmentId()" >
                    <span>{{list.title}}</span><span style="float:right;display:inline-block">{{list.deviceId}}</span>
                </el-radio>
            </div>
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
                    mode:'FREE'
                }
            }
        },
        computed: {
			projectId() {
				return this.$store.state.user.projectId;
			}
		},
        created () {
            this.query(this.room)  
        },
        methods: {
            log(){
                this.radio = ''
            },
            changeelectricity(data){
                this.$emit('setEquipmentid',this.radio)
            },
            query(data){
                console.log(data)
                this.$model('devices')
                .query(data,{projectId:this.projectId})
                .then((data)=>{
                    console.log(data)
                    this.$set(this, 'item', data || [])
                })
            },
            equipmentId(){
                console.log(this.radio)
            }
        }
    }
</script>

<style lang="less" scoped>
    .newchoose{
        margin-top: 20px;
        border: 1px solid #ddd;
        padding: 5px;
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

