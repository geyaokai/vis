function loadChurnAnalysis() {
    // 生命周期分析图表配置
    const lifeCycleChartOption = {
        backgroundColor: 'transparent',
        title: {
            text: '客户生命周期分析',
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
            data: ['客户总数', '流失客户', '平均消费', '流失率'],
            top: 40,
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
            data: [],
            axisLabel: {
                color: '#fff'
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: [
            {
                type: 'value',
                name: '客户数量',
                nameTextStyle: {
                    color: '#fff'
                },
                axisLabel: {
                    color: '#fff'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: 'rgba(255,255,255,0.2)'
                    }
                }
            },
            {
                type: 'value',
                name: '金额/比率',
                nameTextStyle: {
                    color: '#fff'
                },
                axisLabel: {
                    color: '#fff',
                    formatter: '{value}%'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '客户总数',
                type: 'bar',
                barWidth: '30%',
                data: [],
                itemStyle: {
                    color: '#91cc75'
                }
            },
            {
                name: '流失客户',
                type: 'bar',
                barWidth: '30%',
                data: [],
                itemStyle: {
                    color: '#ee6666'
                }
            },
            {
                name: '平均消费',
                type: 'line',
                yAxisIndex: 1,
                data: [],
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: {
                    width: 3
                },
                itemStyle: {
                    color: '#fac858'
                }
            },
            {
                name: '流失率',
                type: 'line',
                yAxisIndex: 1,
                data: [],
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: {
                    width: 3
                },
                itemStyle: {
                    color: '#5470c6'
                }
            }
        ]
    };

    // 添加合同分析图表配置
    const contractChartOption = {
        backgroundColor: 'transparent',
        title: {
            text: '不同合同类型的客户流失分析',
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
            data: ['已流失', '未流失'],
            top: 40,
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
            data: [],
            axisLabel: {
                color: '#fff'
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '客户数量',
            nameTextStyle: {
                color: '#fff'
            },
            axisLabel: {
                color: '#fff'
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
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
                name: '已流失',
                type: 'bar',
                stack: 'total',
                data: [],
                itemStyle: {
                    color: '#ee6666'
                }
            },
            {
                name: '未流失',
                type: 'bar',
                stack: 'total',
                data: [],
                itemStyle: {
                    color: '#91cc75'
                }
            }
        ]
    };

    // 客户流失路径桑基图配置
    const sankeyChartOption = {
        backgroundColor: 'transparent',
        title: {
            text: '客户流失路径分析',
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
            triggerOn: 'mousemove',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderColor: '#1890ff',
            borderWidth: 1,
            textStyle: {
                color: '#fff'
            }
        },
        series: [{
            type: 'sankey',
            layout: 'none',
            emphasis: {
                focus: 'adjacency'
            },
            lineStyle: {
                color: 'gradient',
                curveness: 0.5
            },
            label: {
                color: '#fff',
                fontSize: 12
            },
            data: [
                { name: '所有客户' },
                { name: '合同类型:月付' },
                { name: '合同类型:年付' },
                { name: '合同类型:两年付' },
                { name: '服务不满意' },
                { name: '价格因素' },
                { name: '竞争对手' },
                { name: '其他原因' }
            ],
            links: []
        }]
    };

    // 客户流失风险漏斗图配置
    const funnelChartOption = {
        backgroundColor: 'transparent',
        title: {
            text: '客户流失风险阶段分析',
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
                return `${params.name}<br/>
                        数量: ${params.value}人<br/>
                        占比: ${params.percent}%`;
            }
        },
        series: [
            {
                name: '流失风险漏斗',
                type: 'funnel',
                left: '5%',
                right: '55%',
                top: 60,
                bottom: 60,
                width: '40%',
                minSize: '30%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{b}\n{c}人',
                    fontSize: 14,
                    color: '#fff',
                    fontWeight: 'bold'
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    opacity: 0.9
                },
                emphasis: {
                    label: {
                        fontSize: 16
                    }
                }
            },
            {
                name: '流失原因分布',
                type: 'funnel',
                left: '55%',
                right: '5%',
                top: 60,
                bottom: 60,
                width: '40%',
                minSize: '30%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{b}\n{c}人',
                    fontSize: 14,
                    color: '#fff',
                    fontWeight: 'bold'
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    opacity: 0.9
                },
                emphasis: {
                    label: {
                        fontSize: 16
                    }
                }
            },
            {
                type: 'lines',
                coordinateSystem: 'none',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.1,
                    symbol: 'arrow',
                    symbolSize: 8
                },
                lineStyle: {
                    type: 'dashed',
                    width: 2,
                    opacity: 0.4,
                    curveness: 0.2,
                    color: '#fff'
                },
                data: []
            }
        ],
        color: [
            '#5470c6', '#91cc75', '#fac858', '#ee6666',
            '#73c0de', '#3ba272', '#fc8452', '#9a60b4'
        ]
    };

    // 初始化图表
    charts.lifeCycleAnalysis = echarts.init(document.getElementById('lifeCycleAnalysis'));
    charts.contractAnalysis = echarts.init(document.getElementById('contractAnalysis'));
    charts.churnPathSankey = echarts.init(document.getElementById('churnPathSankey'));
    charts.churnFunnel = echarts.init(document.getElementById('churnFunnel'));
    
    // 设置初始配置
    charts.lifeCycleAnalysis.setOption(lifeCycleChartOption);
    charts.contractAnalysis.setOption(contractChartOption);
    charts.churnPathSankey.setOption(sankeyChartOption);
    charts.churnFunnel.setOption(funnelChartOption);

    // 获取生命周期分析数据
    fetch(window.location.pathname + 'api/chart-data?type=lifecycle')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            charts.lifeCycleAnalysis.setOption({
                xAxis: {
                    data: data.categories
                },
                series: [
                    {
                        name: '客户总数',
                        data: data.totalCustomers
                    },
                    {
                        name: '流失客户',
                        data: data.churnCustomers
                    },
                    {
                        name: '平均消费',
                        data: data.avgCharges
                    },
                    {
                        name: '流失率',
                        data: data.churnRates
                    }
                ]
            });
        })
        .catch(error => {
            console.error('获取生命周期分析数据失败:', error);
            document.getElementById('lifeCycleAnalysis').innerHTML = 
                '<p style="color: red; text-align: center">加载数据失败: ' + error.message + '</p>';
        });

    // 获取合同类型分析数据
    fetch(window.location.pathname + 'api/chart-data?type=contract')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Contract data:', data);
            const contracts = Object.keys(data);
            const yesData = contracts.map(c => data[c].Yes || 0);
            const noData = contracts.map(c => data[c].No || 0);

            charts.contractAnalysis.setOption({
                xAxis: {
                    data: contracts.map(c => {
                        switch(c) {
                            case 'Month-to-month': return '月付';
                            case 'One year': return '年付';
                            case 'Two year': return '两年付';
                            default: return c;
                        }
                    })
                },
                series: [
                    {
                        name: '已流失',
                        data: yesData
                    },
                    {
                        name: '未流失',
                        data: noData
                    }
                ]
            });
        })
        .catch(error => {
            console.error('获取合同数据失败:', error);
            document.getElementById('contractAnalysis').innerHTML = 
                '<p style="color: red; text-align: center">加载数据失败: ' + error.message + '</p>';
        });

    // 获取流失路径数据
    fetch(window.location.pathname + 'api/chart-data?type=churn-path')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            // 准备所有客户到合同类型的连接
            const contractTotals = {};
            data.links.forEach(link => {
                if (!contractTotals[link.source]) {
                    contractTotals[link.source] = 0;
                }
                contractTotals[link.source] += link.value;
            });

            // 创建从"所有客户"到各合同类型的连接
            const allLinks = [];
            Object.entries(contractTotals).forEach(([contract, total]) => {
                allLinks.push({
                    source: '所有客户',
                    target: contract,
                    value: total
                });
            });

            // 添加从合同类型到流失原因的连接
            allLinks.push(...data.links);

            // 更新桑基图
            charts.churnPathSankey.setOption({
                series: [{
                    links: allLinks
                }]
            });
        })
        .catch(error => {
            console.error('获取流失路径数据失败:', error);
            document.getElementById('churnPathSankey').innerHTML = 
                '<p style="color: red; text-align: center">加载数据失败: ' + error.message + '</p>';
        });

    // 获取流失漏斗数据
    fetch(window.location.pathname + 'api/chart-data?type=churn-funnel')
        .then(response => response.json())
        .then(data => {
            // 计算每个层级的中心点位置
            const leftCenter = 0.25; // 左侧漏斗中心位置
            const rightCenter = 0.75; // 右侧漏斗中心位置
            
            // 创建连接线数据
            const linesData = [];
            const confirmedChurn = data.overall.find(item => item.name === '确认流失');
            if (confirmedChurn) {
                data.reasons.forEach((reason, index) => {
                    const sourceY = 0.8; // 左侧确认流失层的垂直位置
                    const targetY = 0.2 + (index * 0.15); // 右侧各原因的垂直位置
                    linesData.push({
                        coords: [
                            [leftCenter, sourceY],
                            [rightCenter, targetY]
                        ]
                    });
                });
            }

            charts.churnFunnel.setOption({
                series: [
                    {
                        name: '流失风险漏斗',
                        data: data.overall
                    },
                    {
                        name: '流失原因分布',
                        data: data.reasons
                    },
                    {
                        data: linesData
                    }
                ]
            });
        })
        .catch(error => {
            console.error('获取流失漏斗数据失败:', error);
            document.getElementById('churnFunnel').innerHTML = 
                '<p style="color: red; text-align: center">加载数据失败: ' + error.message + '</p>';
        });
} 