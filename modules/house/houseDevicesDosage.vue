<template>
    <div style="height:400px;">
        <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
    </div>

</template>

<script>
    import {
		subDays
	} from 'date-fns';
    export default {
        name: 'hello',
        data() {
            return {
                'deviceScale': []
            }
        },
        created () {
            this.$model('scale_read')
            .query(this.reqData,{
                projectId:this.projectId,
                deviceId:this.houseDevice.devices[0].deviceId
            })
            .then(res=>{
                console.log(res)
                this.$set(this,'deviceScale',res)
            })
        },
        props: {
            houseDevice: {
                type:Object
            }
        },
        computed: {
            projectId() {
                return this.$store.state.userInfo.user.projectId
            },
            reqData() {
                return {
                    'startDate': Date.parse(subDays(new Date(),7))/1000,
                    'endDate': Date.parse(new Date())/1000
                }
            }
        },
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                var data_val = [20, 12, 41, 30, 49, 30, 29],
                    xAxis_val = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                var data_val1 = [0, 0, 0, 0, 0, 0, 0];
                var option = {
                    backgroundColor: '#ffffff',
                    grid: {
                        left: 10,
                        top: '10%',
                        bottom: 20,
                        right: 40,
                        containLabel: true
                    },
                    tooltip: {
                        show: true,
                        backgroundColor: '#384157',
                        borderColor: '#384157',
                        borderWidth: 1,
                        formatter: '{b}:{c}',
                        extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 1)'
                    },
                    legend: {
                        right: 0,
                        top: 0,
                        data: ['用量'],
                        textStyle: {
                            color: '#5c6076'
                        }
                    },
                    title: {
                        text: '每日电表用量',
                        x: '0.5%',
                        top: '1%',
                        textStyle: {
                            color: '#5c6076'
                        }
                    },
                    xAxis: {
                        data: xAxis_val,
                        boundaryGap: false,
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#5c6076'
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    yAxis: {
                        ayisLine: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#5c6076'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#2e3547'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#384157'
                            }
                        }
                    },

                    series: [{
                            type: 'bar',
                            name: 'linedemo',


                            tooltip: {
                                show: false
                            },
                            animation: false,
                            barWidth: 1.4,
                            hoverAnimation: false,
                            data: data_val,
                            itemStyle: {
                                normal: {
                                    color: '#f17a52',
                                    opacity: 0.6,
                                    label: {
                                        show: false
                                    }
                                }
                            }
                        },
                        {
                            type: 'line',
                            name: '用量',

                            animation: false,
                            symbol: 'circle',

                            hoverAnimation: false,
                            data: data_val1,
                            itemStyle: {
                                normal: {
                                    color: '#f17a52',
                                    opacity: 0,
                                }
                            },
                            lineStyle: {
                                normal: {
                                    width: 1,
                                    color: '#384157',
                                    opacity: 1
                                }
                            }
                        },
                        {
                            type: 'line',
                            name: 'linedemo',
                            smooth: true,
                            symbolSize: 10,
                            animation: false,
                            lineWidth: 1.2,
                            hoverAnimation: false,
                            data: data_val,
                            symbol: 'circle',
                            itemStyle: {
                                normal: {
                                    color: '#f17a52',
                                    shadowBlur: 40,
                                    label: {
                                        show: true,
                                        position: 'top',
                                        textStyle: {
                                            color: '#f17a52',

                                        }
                                    }
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: '#f17a52',
                                    opacity: 0.08
                                }
                            }

                        }
                    ]
                };
                myChart.setOption(option);
            }
        }
    }
</script>