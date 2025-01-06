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
            data: ['老年用户-成熟', '老年用户-新客', '年轻用户-成熟', '年轻用户-新客'],
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
                name: '客户群体服务使用',
                type: 'radar',
                symbolSize: 4,
                lineStyle: {
                    width: 2
                },
                data: [
                    {
                        name: '老年用户-成熟',
                        value: [],
                        itemStyle: {
                            color: '#91cc75'
                        },
                        areaStyle: {
                            opacity: 0.2
                        }
                    },
                    {
                        name: '老年用户-新客',
                        value: [],
                        itemStyle: {
                            color: '#fac858'
                        },
                        areaStyle: {
                            opacity: 0.2
                        }
                    },
                    {
                        name: '年轻用户-成熟',
                        value: [],
                        itemStyle: {
                            color: '#ee6666'
                        },
                        areaStyle: {
                            opacity: 0.2
                        }
                    },
                    {
                        name: '年轻用户-新客',
                        value: [],
                        itemStyle: {
                            color: '#5470c6'
                        },
                        areaStyle: {
                            opacity: 0.2
                        }
                    }
                ]
            }
        ]
    };

    // 年龄消费气泡图配置
    const bubbleChartOption = {
        backgroundColor: 'transparent',
        title: {
            text: '客户群体消费能力与流失风险分析',
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
            formatter: function(params) {
                return `客户群体: ${params.name}<br/>
                        月均消费: ${params.value[0].toFixed(2)} 元<br/>
                        流失率: ${params.value[1].toFixed(2)}%<br/>
                        客户数量: ${params.value[2]} 人`;
            },
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#1890ff',
            borderWidth: 1,
            padding: [10, 15],
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            right: 10,
            top: 20,
            orient: 'vertical',
            itemGap: 15,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: '#fff',
                fontSize: 12
            }
        },
        grid: {
            left: '8%',
            right: '15%',
            top: '20%',
            bottom: '12%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            name: '月均消费（元）',
            nameGap: 25,
            min: 0,
            max: 120,
            interval: 20,
            nameTextStyle: {
                color: '#fff',
                fontSize: 12,
                padding: [0, 0, 0, 10]
            },
            axisLabel: {
                color: '#fff',
                formatter: '{value} 元',
                fontSize: 11,
                margin: 8
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(255,255,255,0.1)'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '流失率（%）',
            nameGap: 25,
            min: 0,
            max: 100,
            interval: 20,
            nameTextStyle: {
                color: '#fff',
                fontSize: 12,
                padding: [0, 10, 0, 0]
            },
            axisLabel: {
                color: '#fff',
                formatter: '{value}%',
                fontSize: 11,
                margin: 8
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(255,255,255,0.1)'
                }
            }
        },
        series: [
            {
                name: '老年用户-成熟',
                type: 'scatter',
                symbolSize: function(data) {
                    return Math.sqrt(data[2]) * 1.5;
                },
                itemStyle: {
                    color: '#91cc75',
                    opacity: 0.8,
                    shadowBlur: 10,
                    shadowColor: 'rgba(145, 204, 117, 0.3)'
                },
                emphasis: {
                    itemStyle: {
                        opacity: 1,
                        shadowBlur: 20,
                        borderColor: '#fff',
                        borderWidth: 2
                    }
                },
                data: []
            },
            {
                name: '老年用户-新客',
                type: 'scatter',
                symbolSize: function(data) {
                    return Math.sqrt(data[2]) * 1.5;
                },
                itemStyle: {
                    color: '#fac858',
                    opacity: 0.8,
                    shadowBlur: 10,
                    shadowColor: 'rgba(250, 200, 88, 0.3)'
                },
                emphasis: {
                    itemStyle: {
                        opacity: 1,
                        shadowBlur: 20,
                        borderColor: '#fff',
                        borderWidth: 2
                    }
                },
                data: []
            },
            {
                name: '年轻用户-成熟',
                type: 'scatter',
                symbolSize: function(data) {
                    return Math.sqrt(data[2]) * 1.5;
                },
                itemStyle: {
                    color: '#5470c6',
                    opacity: 0.8,
                    shadowBlur: 10,
                    shadowColor: 'rgba(84, 112, 198, 0.3)'
                },
                emphasis: {
                    itemStyle: {
                        opacity: 1,
                        shadowBlur: 20,
                        borderColor: '#fff',
                        borderWidth: 2
                    }
                },
                data: []
            },
            {
                name: '年轻用户-新客',
                type: 'scatter',
                symbolSize: function(data) {
                    return Math.sqrt(data[2]) * 1.5;
                },
                itemStyle: {
                    color: '#ee6666',
                    opacity: 0.8,
                    shadowBlur: 10,
                    shadowColor: 'rgba(238, 102, 102, 0.3)'
                },
                emphasis: {
                    itemStyle: {
                        opacity: 1,
                        shadowBlur: 20,
                        borderColor: '#fff',
                        borderWidth: 2
                    }
                },
                data: []
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

    // 初始化所有图表
    charts.genderDistribution = echarts.init(document.getElementById('genderDistribution'));
    charts.ageServiceRadar = echarts.init(document.getElementById('ageServiceRadar'));
    charts.ageBubble = echarts.init(document.getElementById('ageBubble'));
    charts.demographicSankey = echarts.init(document.getElementById('demographicSankey'));

    // 设置初始配置
    charts.genderDistribution.setOption(genderChartOption);
    charts.ageServiceRadar.setOption(ageServiceChartOption);
    charts.ageBubble.setOption(bubbleChartOption);
    charts.demographicSankey.setOption(demographicSankeyOption);

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
        .then(response => response.json())
        .then(data => {
            charts.ageServiceRadar.setOption({
                series: [{
                    data: [
                        {
                            name: '老年用户-成熟',
                            value: data.senior_mature
                        },
                        {
                            name: '老年用户-新客',
                            value: data.senior_new
                        },
                        {
                            name: '年轻用户-成熟',
                            value: data.young_mature
                        },
                        {
                            name: '年轻用户-新客',
                            value: data.young_new
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

    // 获取年龄-消费-流失气泡图数据
    fetch(window.location.pathname + 'api/chart-data?type=age-bubble')
        .then(response => response.json())
        .then(data => {
            console.log('Age bubble data:', data);
            // 将数据分配到对应的系列中
            const seriesData = {
                '老年用户-成熟': [],
                '老年用户-新客': [],
                '年轻用户-成熟': [],
                '年轻用户-新客': []
            };
            
            data.forEach(item => {
                seriesData[item.name] = [[
                    item.value[0],  // 月均消费
                    item.value[2],  // 流失率
                    item.value[1]   // 客户数量（用于气泡大小）
                ]];
            });
            
            charts.ageBubble.setOption({
                series: [
                    {
                        name: '老年用户-成熟',
                        data: seriesData['老年用户-成熟']
                    },
                    {
                        name: '老年用户-新客',
                        data: seriesData['老年用户-新客']
                    },
                    {
                        name: '年轻用户-成熟',
                        data: seriesData['年轻用户-成熟']
                    },
                    {
                        name: '年轻用户-新客',
                        data: seriesData['年轻用户-新客']
                    }
                ]
            });
        })
        .catch(error => {
            console.error('获取年龄消费数据失败:', error);
            document.getElementById('ageBubble').innerHTML = 
                '<p style="color: red; text-align: center">加载数据失败: ' + error.message + '</p>';
        });

    // 获取人口特征与服务选择桑基图数据
    fetch(window.location.pathname + 'api/chart-data?type=demographic-sankey')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Demographic sankey data:', data);
            charts.demographicSankey.setOption({
                series: [{
                    data: data.nodes,
                    links: data.links
                }]
            });
        })
        .catch(error => {
            console.error('获取人口特征服务选择数据失败:', error);
            document.getElementById('demographicSankey').innerHTML = 
                '<p style="color: red; text-align: center">加载数据失败: ' + error.message + '</p>';
        });
} 