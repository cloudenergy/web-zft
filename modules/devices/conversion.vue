<template>
  <div>
        <div class="flexcenter">
            <RentSearch style="width:300px" class="clearmargin"/>
            <p>106个未绑定的仪表</p>
        </div>
        <div class="newchoose">
            <div v-for="list in item" :key="list.index">
                <el-radio v-model="radio" :label="list.id" style="width:100%;"><span>{{list.name}}</span><span style="float:right;display:inline-block">{{list.id}}</span></el-radio>
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
                item:[{
                    index:1,
                    name:'adsf',
                    id:'231243asdf24234324'
                },
                {
                    index:2,
                    name:'adsf',
                    id:'23124adsf324234324'
                },
                {
                    index:3,
                    name:'adsf',
                    id:'23124324234dfasdf324'
                }]
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
</style>

