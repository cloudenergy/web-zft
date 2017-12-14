<template>
 <ReportsNav :tab-name='tabName'/>
</template>

<script>
import ReportsNav from '../../../modules/reports/reports-nav';
 export default {
   components: {
		ReportsNav
	},
   data () {
     return {
 tabName: [
		{ label: '运营数据',name:"1" },
		{ label: '业务出房',name:"2" },
		{ label: '业务收支',name:"3" },
		{ label: '收房出房',name:"4" }
	],
     }
   },
   
 }
</script>

<style>

 
</style>
