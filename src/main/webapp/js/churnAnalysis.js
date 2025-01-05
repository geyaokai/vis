function loadChurnAnalysis() {
    // 饼图配置
    const churnChartOption = {
        backgroundColor: 'transparent',
        title: {
            text: '客户流失分布',
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
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderColor: '#1890ff',
            borderWidth: 1,
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            orient: 'horizontal',
            bottom: 'bottom',
            icon: 'circle',
            textStyle: {
                color: '#fff'
            }
        },
        series: [{
            name: '流失状态',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: true,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#041633',
                borderWidth: 2
            },
            label: {
                show: true,
                formatter: '{b}: {c} ({d}%)',
                color: '#fff'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold'
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            data: []
        }]
    };

    // 堆叠柱状图配置
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
            top: '10%',
            icon: 'roundRect',
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
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLabel: {
                interval: 0,
                rotate: 30,
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
                name: '已流失',
                type: 'bar',
                stack: 'total',
                barGap: 0,
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    color: '#ee6666',
                    borderRadius: [5, 5, 0, 0]
                },
                data: []
            },
            {
                name: '未流失',
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    color: '#91cc75',
                    borderRadius: [5, 5, 0, 0]
                },
                data: []
            }
        ]
    };

    // 设置初始配置
    charts.churnDistribution.setOption(churnChartOption);
    charts.contractAnalysis.setOption(contractChartOption);

    // 获取流失分布数据
    fetch(window.location.pathname + 'api/chart-data?type=churn')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Churn data:', data);
            const chartData = Object.entries(data).map(([name, value]) => ({
                name: name === 'Yes' ? '已流失' : '未流失',
                value,
                itemStyle: {
                    color: name === 'Yes' ? '#ee6666' : '#91cc75'
                }
            }));
            charts.churnDistribution.setOption({
                series: [{
                    data: chartData
                }]
            });
        })
        .catch(error => {
            console.error('获取流失数据失败:', error);
            document.getElementById('churnDistribution').innerHTML = 
                '<p style="color: red; text-align: center">加载数据失败: ' + error.message + '</p>';
        });

    // 获取合同类型分析数据
    fetch(window.location.pathname + 'api/chart-data?type=contract')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
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
} 