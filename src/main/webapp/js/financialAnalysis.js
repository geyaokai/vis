function loadFinancialAnalysis() {
    // 费用散点图配置
    const scatterChartOption = {
        backgroundColor: 'transparent',
        title: {
            text: '月费用与总费用关系分析',
            left: 'center',
            top: 10,
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
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
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return `月费用: ${params.value[0].toFixed(2)}元<br/>
                        总费用: ${params.value[1].toFixed(2)}元<br/>
                        ${params.seriesName}`;
            },
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderColor: '#1890ff',
            borderWidth: 1,
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            left: '10%',
            right: '15%',
            top: '10%',
            bottom: '15%'
        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: 0,
                start: 0,
                end: 100,
                bottom: 5
            },
            {
                type: 'slider',
                show: true,
                yAxisIndex: 0,
                start: 0,
                end: 100,
                right: 5
            }
        ],
        xAxis: {
            type: 'value',
            name: '月费用(元)',
            nameTextStyle: {
                color: '#fff'
            },
            axisLabel: {
                color: '#fff',
                formatter: '{value}元'
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(255,255,255,0.2)'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '总费用(元)',
            nameTextStyle: {
                color: '#fff'
            },
            axisLabel: {
                color: '#fff',
                formatter: '{value}元'
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(255,255,255,0.2)'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        series: [
            {
                name: '未流失',
                type: 'scatter',
                symbolSize: 8,
                itemStyle: {
                    color: '#91cc75'
                },
                data: []
            },
            {
                name: '已流失',
                type: 'scatter',
                symbolSize: 8,
                itemStyle: {
                    color: '#ee6666'
                },
                data: []
            }
        ]
    };

    // 费用箱线图配置
    const boxplotChartOption = {
        backgroundColor: 'transparent',
        title: {
            text: '不同合同类型的费用分布',
            left: 'center',
            top: 10,
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff'
            }
        },
        legend: {
            data: ['费用分布', '异常值'],
            top: 40,
            textStyle: {
                color: '#fff'
            },
            itemStyle: {
                borderWidth: 0
            }
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderColor: '#1890ff',
            borderWidth: 1,
            textStyle: {
                color: '#fff'
            },
            formatter: function (params) {
                if (params.seriesType === 'boxplot') {
                    return `${params.name}<br/>
                            最大值: ${params.data[5].toFixed(2)}元<br/>
                            上四分位: ${params.data[4].toFixed(2)}元<br/>
                            中位数: ${params.data[3].toFixed(2)}元<br/>
                            下四分位: ${params.data[2].toFixed(2)}元<br/>
                            最小值: ${params.data[1].toFixed(2)}元`;
                }
                return `${params.name}: ${params.value.toFixed(2)}元`;
            }
        },
        grid: {
            left: '10%',
            right: '5%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: ['月付', '年付', '两年付'],
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
            name: '月费用(元)',
            nameTextStyle: {
                color: '#fff'
            },
            axisLabel: {
                color: '#fff',
                formatter: '{value}元'
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(255,255,255,0.2)'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        series: [
            {
                name: '费用分布',
                type: 'boxplot',
                data: [],
                itemStyle: {
                    color: '#fff',
                    borderColor: '#1890ff'
                },
                emphasis: {
                    itemStyle: {
                        borderWidth: 2,
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            {
                name: '异常值',
                type: 'scatter',
                data: [],
                itemStyle: {
                    color: '#ee6666'
                }
            }
        ]
    };

    // 设置初始配置
    charts.chargesScatter.setOption(scatterChartOption);
    charts.chargesBoxplot.setOption(boxplotChartOption);

    // 获取费用散点图数据
    fetch(window.location.pathname + 'api/chart-data?type=charges-scatter')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Charges scatter data:', data);
            // 将数据分成两组
            const notChurnData = [];
            const churnData = [];

            data.forEach(point => {
                if (point[2]) {  // 已流失
                    churnData.push([point[0], point[1]]);
                } else {        // 未流失
                    notChurnData.push([point[0], point[1]]);
                }
            });

            charts.chargesScatter.setOption({
                series: [
                    {
                        name: '未流失',
                        data: notChurnData
                    },
                    {
                        name: '已流失',
                        data: churnData
                    }
                ]
            });
        })
        .catch(error => {
            console.error('获取费用散点数据失败:', error);
            document.getElementById('chargesScatter').innerHTML =
                '<p style="color: red; text-align: center">加载数据失败: ' + error.message + '</p>';
        });

    // 获取费用箱线图数据
    fetch(window.location.pathname + 'api/chart-data?type=charges-boxplot')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Charges boxplot data:', data);
            charts.chargesBoxplot.setOption({
                series: [
                    {
                        data: data.boxData
                    },
                    {
                        data: data.outliers
                    }
                ]
            });
        })
        .catch(error => {
            console.error('获取费用箱线图数据失败:', error);
            document.getElementById('chargesBoxplot').innerHTML =
                '<p style="color: red; text-align: center">加载数据失败: ' + error.message + '</p>';
        });

    // 获取统计指标数据
    fetch(window.location.pathname + 'api/chart-data?type=financial-stats')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            // 更新统计卡片数据
            document.getElementById('avgMonthlyCharges').textContent =
                data.avgMonthlyCharges.toFixed(2) + '元';
            document.getElementById('avgTotalCharges').textContent =
                data.avgTotalCharges.toFixed(2) + '元';
            document.getElementById('highValueCustomers').textContent =
                data.highValueCustomers + '位';
            document.getElementById('revenueContribution').textContent =
                data.revenueContribution.toFixed(1) + '%';
        })
        .catch(error => {
            console.error('获取统计数据失败:', error);
        });
} 