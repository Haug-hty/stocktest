<template>
  <div ref = 'myEchart' style="width:145px;height:100px"></div>
</template>

<script type="text/babel">
    import echarts from 'echarts'
    export default {
        name:"pie",
        data() {
            return {
                dataList:[
                    {value:this.data.value, name:this.data.name},
                    {value:this.data.value1, name:this.data.name1},
                ]
            }
        },
        props: {
            data: Object,
        },
        methods: {
            // 图表初始化数据
            initChart(){
                let myChart = echarts.init(this.$refs.myEchart);
                myChart.setOption({
                    tooltip: {
                        trigger:'item',
                        formatter: "{a} <br/>{b}: {c} <br/> ({d}%)"
                    },
                    series : [
                        {
                            name:'',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '50%'],
                            avoidLabelOverlap: false,
                            data: this.dataList,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 2,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                                }
                            }
                        }
                    ]
                })
            }
        },
        mounted () {
            let obj = this.$refs.myEchart;
            if(obj){
                this.initChart();
            }
        }
    }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>

</style>
