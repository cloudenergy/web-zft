<template>
    <div class="contractList">
        <div class="flexc" v-for="list in item" :key="list.to">
            <div>
                <div v-if="nowData<=list.from*1000" class="setAuto flexdirection willIn">
                    <span class="willIn">将搬入</span>
                </div>
                <div v-if="nowData>list.from*1000" class="setAuto flexdirection inThere">
                    <span>在租中</span>
                </div>
            </div>
            <icon type="icon-test1" :symbol="true" />
            <div style="margin:2px 0 0 10px">
                <div>{{list.user.name}} |
                    <span v-if="list.user.mobile!==''">{{list.user.mobile}}</span>
                    <span v-if="list.user.mobile===''">暂无电话</span>
                </div>
                <div>{{setTime(list.from)}}至{{setTime(list.to)}}</div>
                <div>{{price(list.strategy.freq.rent)}}/月·{{list.strategy.freq.pattern}}月一付</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Array
            }
        },
        computed: {
            nowData() {
                return Date.parse(new Date())
            }
        },
        methods: {
            price(data) {
                return (data / 100).toFixed(2)
            },
            setTime(data) {
                return new Date(parseInt(data) * 1000).toLocaleDateString().replace(/\//g, "-")
            }
        }
    }
</script>

<style lang="less" scoped>
    .contractList {
        .setAuto {
            height: 72px;
            width: 80px;
            span {
                width: 50px;
                height: 27px;
                margin-left: -10px;
                position: relative;
                display: inline-block;
                background: #67c23a;
                color: #fff;
                font-size: 12px;
                padding-left: 5px;
                line-height: 28px;
            }
            span:after {
                position: absolute;
                bottom: 0;
                width: 0;
                height: 0;
                right: -16px;
                margin-left: -10px;
                content: " ";
                border-top: 14px solid transparent;
                border-left: 16px solid #67c23a;
                border-bottom: 13px solid transparent;
            }

        }

        .willIn span.willIn {
            background: #d2d2d2;
        }

        .willIn span.willIn:after {
            border-left: 16px solid #d2d2d2;
        }
        i{
            width: 72px;
            height: 72px;
        }
    }
</style>
<style>
    .contractList i svg{
        width: 72px;
        height: 72px;
    }
</style>
