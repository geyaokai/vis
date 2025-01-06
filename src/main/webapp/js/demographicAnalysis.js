function loadDemographicAnalysis() {
    // 性别分布柱状图配置
    const genderChartOption = {
        backgroundColor: 'transparent',
        title: {
            text: '客户性别分布',
            left: 'center',
            top: 10,
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderColor: '#1890ff',
            borderWidth: 1,
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            data: ['流失', '未流失'],
            top: '10%',
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['男性', '女性'],
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLabel: {
                color: '#fff'
            }
        },
        yAxis: {
            type: 'value',
            name: '客户数量',
            nameTextStyle: {
                color: '#fff'
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLabel: {
                color: '#fff'
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(255,255,255,0.2)'
                }
            }
        },
        series: [
            {
                name: '流失',
                type: 'bar',
                itemStyle: {
                    color: '#ee6666'
                },
                emphasis: {
                    focus: 'series',
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data: []
            },
            {
                name: '未流失',
                type: 'bar',
                itemStyle: {
                    color: '#91cc75'
                },
                emphasis: {
                    focus: 'series',
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data: []
            }
        ]
    };

    // 年龄服务雷达图配置
    const ageServiceChartOption = {
        backgroundColor: 'transparent',
        title: {
            text: '不同年龄段服务使用情况',
            left: 'center',
            top: 10,
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderColor: '#1890ff',
            borderWidth: 1,
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            data: ['青年', '中年', '老年'],
            bottom: 10,
            textStyle: {
                color: '#fff'
            }
        },
        radar: {
            center: ['50%', '55%'],
            radius: '60%',
            indicator: [
                { name: '电话服务', max: 100 },
                { name: '互联网服务', max: 100 },
                { name: '在线安全', max: 100 },
                { name: '在线备份', max: 100 },
                { name: '设备保护', max: 100 },
                { name: '技术支持', max: 100 },
                { name: '流媒体TV', max: 100 },
                { name: '流媒体电影', max: 100 }
            ],
            shape: 'circle',
            splitNumber: 4,
            axisName: {
                color: '#fff',
                fontSize: 12,
                padding: [3, 5]
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.2)'
                }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.05)']
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.2)'
                }
            }
        },
        series: [
            {
                name: '年龄段服务使用',
                type: 'radar',
                symbolSize: 4,
                lineStyle: {
                    width: 2
                },
                data: [
                    {
                        name: '青年',
                        value: [],
                        itemStyle: {
                            color: '#5470c6'
                        },
                        areaStyle: {
                            opacity: 0.2
                        }
                    },
                    {
                        name: '中年',
                        value: [],
                        itemStyle: {
                            color: '#91cc75'
                        },
                        areaStyle: {
                            opacity: 0.2
                        }
                    },
                    {
                        name: '老年',
                        value: [],
                        itemStyle: {
                            color: '#fac858'
                        },
                        areaStyle: {
                            opacity: 0.2
                        }
                    }
                ]
            }
        ]
    };

    // 年龄-消费-流失气泡图配置
    const ageBubbleOption = {
        backgroundColor: 'transparent',
        title: {
            text: '年龄段消费能力与流失风险分析',
            left: 'center',
            top: 10,
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff'
            }
        },
        legend: {
            right: '10%',
            top: '3%',
            data: ['低风险', '中风险', '高风险'],
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            left: '8%',
            right: '10%',
            top: '20%',
            bottom: '10%'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return `年龄段: ${params.data.name}<br/>
                        平均消费: ${params.data.value[1]}元<br/>
                        客户数量: ${params.data.value[2]}人<br/>
                        流失率: ${params.data.value[3]}%`;
            }
        },
        xAxis: {
            type: 'category',
            data: ['18-25岁', '26-35岁', '36-45岁', '46-55岁', '56-65岁', '65岁以上'],
            axisLine: { lineStyle: { color: '#fff' } },
            axisLabel: { color: '#fff' }
        },
        yAxis: {
            type: 'value',
            name: '月均消费（元）',
            nameTextStyle: { color: '#fff' },
            axisLine: { lineStyle: { color: '#fff' } },
            axisLabel: { color: '#fff' },
            splitLine: { lineStyle: { type: 'dashed', color: 'rgba(255,255,255,0.2)' } }
        },
        series: [
            {
                name: '低风险',
                type: 'scatter',
                symbolSize: function(data) {
                    return Math.sqrt(data[2]) * 3;
                },
                itemStyle: {
                    color: '#91cc75',
                    opacity: 0.8
                },
                data: [
                    {name: '18-25岁', value: [0, 150, 500, 5]},
                    {name: '26-35岁', value: [1, 200, 800, 8]},
                    {name: '36-45岁', value: [2, 250, 1000, 10]},
                    {name: '46-55岁', value: [3, 180, 600, 12]},
                    {name: '56-65岁', value: [4, 160, 400, 15]},
                    {name: '65岁以上', value: [5, 140, 200, 18]}
                ]
            },
            {
                name: '中风险',
                type: 'scatter',
                symbolSize: function(data) {
                    return Math.sqrt(data[2]) * 3;
                },
                itemStyle: {
                    color: '#fac858',
                    opacity: 0.8
                },
                data: [
                    {name: '18-25岁', value: [0, 180, 300, 15]},
                    {name: '26-35岁', value: [1, 250, 600, 18]},
                    {name: '36-45岁', value: [2, 300, 800, 20]},
                    {name: '46-55岁', value: [3, 220, 400, 22]},
                    {name: '56-65岁', value: [4, 190, 300, 25]},
                    {name: '65岁以上', value: [5, 170, 150, 28]}
                ]
            },
            {
                name: '高风险',
                type: 'scatter',
                symbolSize: function(data) {
                    return Math.sqrt(data[2]) * 3;
                },
                itemStyle: {
                    color: '#ee6666',
                    opacity: 0.8
                },
                data: [
                    {name: '18-25岁', value: [0, 220, 200, 25]},
                    {name: '26-35岁', value: [1, 300, 400, 28]},
                    {name: '36-45岁', value: [2, 350, 500, 30]},
                    {name: '46-55岁', value: [3, 260, 300, 32]},
                    {name: '56-65岁', value: [4, 220, 200, 35]},
                    {name: '65岁以上', value: [5, 200, 100, 38]}
                ]
            }
        ]
    };

    // 人口特征与服务选择桑基图配置
    const demographicSankeyOption = {
        backgroundColor: 'transparent',
        title: {
            text: '人口特征与服务选择关系',
            left: 'center',
            top: 10,
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [{
            type: 'sankey',
            left: '10%',
            right: '10%',
            emphasis: {
                focus: 'adjacency'
            },
            data: [
                {name: '年轻客户'},
                {name: '中年客户'},
                {name: '老年客户'},
                {name: '男性'},
                {name: '女性'},
                {name: '基础套餐'},
                {name: '标准套餐'},
                {name: '高级套餐'},
                {name: '流媒体服务'},
                {name: '安全服务'},
                {name: '技术支持'}
            ],
            links: [
                {source: '年轻客户', target: '基础套餐', value: 500},
                {source: '年轻客户', target: '标准套餐', value: 800},
                {source: '年轻客户', target: '高级套餐', value: 300},
                {source: '中年客户', target: '基础套餐', value: 400},
                {source: '中年客户', target: '标准套餐', value: 900},
                {source: '中年客户', target: '高级套餐', value: 500},
                {source: '老年客户', target: '基础套餐', value: 600},
                {source: '老年客户', target: '标准套餐', value: 400},
                {source: '老年客户', target: '高级套餐', value: 100},
                {source: '基础套餐', target: '流媒体服务', value: 800},
                {source: '标准套餐', target: '流媒体服务', value: 1500},
                {source: '高级套餐', target: '流媒体服务', value: 700},
                {source: '基础套餐', target: '安全服务', value: 400},
                {source: '标准套餐', target: '安全服务', value: 1200},
                {source: '高级套餐', target: '安全服务', value: 800},
                {source: '基础套餐', target: '技术支持', value: 300},
                {source: '标准套餐', target: '技术支持', value: 1000},
                {source: '高级套餐', target: '技术支持', value: 900}
            ],
            lineStyle: {
                color: 'gradient',
                curveness: 0.5
            },
            label: {
                color: '#fff',
                fontSize: 12
            }
        }]
    };

    // 设置初始配置
    charts.genderDistribution.setOption(genderChartOption);
    charts.ageServiceRadar.setOption(ageServiceChartOption);

    // 获取性别分布数据
    fetch(window.location.pathname + 'api/chart-data?type=gender')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Gender data:', data);
            charts.genderDistribution.setOption({
                series: [
                    {
                        name: '流失',
                        data: [data.male.churn, data.female.churn]
                    },
                    {
                        name: '未流失',
                        data: [data.male.notChurn, data.female.notChurn]
                    }
                ]
            });
        })
        .catch(error => {
            console.error('获取性别数据失败:', error);
            document.getElementById('genderDistribution').innerHTML = 
                '<p style="color: red; text-align: center">加载数据失败: ' + error.message + '</p>';
        });

    // 获取年龄服务数据
    fetch(window.location.pathname + 'api/chart-data?type=age-service')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Age-service data:', data);
            charts.ageServiceRadar.setOption({
                series: [{
                    data: [
                        {
                            name: '青年',
                            value: data.young
                        },
                        {
                            name: '中年',
                            value: data.middle
                        },
                        {
                            name: '老年',
                            value: data.senior
                        }
                    ]
                }]
            });
        })
        .catch(error => {
            console.error('获取年龄服务数据失败:', error);
            document.getElementById('ageServiceRadar').innerHTML = 
                '<p style="color: red; text-align: center">加载数据失败: ' + error.message + '</p>';
        });

    // 初始化图表
    charts.ageBubble = echarts.init(document.getElementById('ageBubble'));
    charts.demographicSankey = echarts.init(document.getElementById('demographicSankey'));

    // 设置配置项
    charts.ageBubble.setOption(ageBubbleOption);
    charts.demographicSankey.setOption(demographicSankeyOption);
} 