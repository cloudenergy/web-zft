<template>
    <div class="paymuser">
        <icon type="icon-test1" :symbol="true" />
        <div style="text-align:center">
            <div>
                <p>{{contractInfo.user.name}}</p>
                <p>{{contractInfo.user.accountName}}</p>
            </div>
            <div class="paymUserInfo">
                <div>
                    <p>姓名</p>
                    <p>{{contractInfo.user.name}}</p>
                    <p v-if="contractInfo.user.name===null">暂无信息</p>
                </div>
                <div>
                    <p>性别</p>
                    <p v-if="contractInfo.user.gender=='M'">男</p>
                    <p v-if="contractInfo.user.gender=='F'">女</p>
                    <p v-if="contractInfo.user.gender===null">暂无信息</p>
                </div>
                <div>
                    <p>身份证号</p>
                    <p>{{contractInfo.user.documentId}}</p>
                    <p v-if="contractInfo.user.documentId===null">暂无信息</p>
                </div>
                <div>
                    <p>手机号</p>
                    <p>{{contractInfo.user.mobile}}</p>
                    <p v-if="contractInfo.user.mobile===null">暂无信息</p>
                </div>
                <div class="others"></div>
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                
            }
        },
        props: {
            contractInfo: {
                required:true
            }
        },
        created () {
        }
    }
</script>

<style lang="less" scoped>
    .paymuser {
        width: 180px;
        text-align: center;
        border: 1px solid #aaa;
        padding:10px;
        .paymUserInfo {
            border-top: 1px solid #ccc;
            text-align:left;
            color:#888;
            div{
                margin-top: 3px;
            }
            p:first-child {
                color:#333;
            }
        }
        .others{
            height: 30px;
        }
    }
</style>

<style lang="less">
    .paymuser i {
        width: 75px;
        height: 75px;
        svg{
            width: 75px;
            height: 75px;
        }
    }
</style>

