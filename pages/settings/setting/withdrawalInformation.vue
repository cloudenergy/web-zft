<template>
    <div>
        234
    </div>
</template>
<script>
    export default {
        props:{
            val:{
                required:true
            }
        },
        computed:{
            projectId() {
                return this.$store.state.userInfo.user.projectId
            }
        },
        created() {
            this.$model('electric_withdraw')
            .query({},{projectId:this.projectId,id:this.val.id})
            .then(res=>this.$set(this,'cashInfo',res))
        }
    }
</script>

<style lang="less" scoped>

</style>
