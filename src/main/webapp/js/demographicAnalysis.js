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
} 