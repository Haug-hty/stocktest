<template>
    <div id="myChart" style="width:300px;height:200px;"></div>
</template>

<script>
    import ECharts from 'echarts/dist/echarts'
    export default {
        name: 'bar',
        data() {
            return {
                xAxisDa:this.xAxisData.xAx,
                interfaceErrorBarDa:this.xAxisData.inter
            }
        },
        props:{
            xAxisData:Object
        },
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = ECharts.init(document.getElementById('myChart'));

                // 指定图表的配置项和数据
                var option = {
                    // title: {
                    //     text: '第一个 ECharts 实例'
                    // },
                    tooltip: {},
                    legend: {
                        data: ['接口']
                    },
                    xAxis: {
                        data: this.xAxisDa
                    },
                    yAxis: {},
                    series: [{
                        name: '接口',
                        type: 'bar',
                        data: this.interfaceErrorBarDa
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        }
    }
</script>