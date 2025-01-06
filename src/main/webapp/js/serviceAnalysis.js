function loadServiceAnalysis() {
    // 服务关联热力图配置
    const heatmapChartOption = {
        backgroundColor: 'transparent',
        title: {
            text: '服务关联性分析',
            left: 'center',
            top: 10,
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff'
            }
        },
        tooltip: {
            position: 'top',
            formatter: function(params) {
                return `${params.marker} ${params.name}<br/>
                        关联度: ${params.value[2].toFixed(2)}%`;
            },
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderColor: '#1890ff',
            borderWidth: 1,
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            top: '60px',
            left: '3%',
            right: '4%',
            bottom: '50px',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['电话服务', '互联网', '在线安全', '在线备份', '设备保护', '技术支持', '流媒体TV', '流媒体电影'],
            splitArea: {
                show: true
            },
            axisLabel: {
                color: '#fff',
                interval: 0,
                rotate: 45,
                margin: 15,
                align: 'right',
                textStyle: {
                    fontSize: 11
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: ['电话服务', '互联网', '在线安全', '在线备份', '设备保护', '技术支持', '流媒体TV', '流媒体电影'],
            splitArea: {
                show: true
            },
            axisLabel: {
                color: '#fff'
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15px',
            textStyle: {
                color: '#fff'
            },
            inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', 
                       '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
        },
        series: [{
            name: '服务关联度',
            type: 'heatmap',
            data: [],
            label: {
                show: true,
                formatter: function(params) {
                    return params.value[2].toFixed(0) + '%';
                },
                color: '#fff'
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    // 服务订阅趋势折线图配置
    const trendChartOption = {
        backgroundColor: 'transparent',
        title: {
            text: '服务订阅趋势',
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
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderColor: '#1890ff',
            borderWidth: 1,
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            data: ['电话服务', '互联网', '在线安全', '在线备份', '设备保护', '技术支持', '流媒体TV', '流媒体电影'],
            top: 40,
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '100px',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['0-6月', '7-12月', '1-2年', '2-3年', '3-4年', '4-5年', '5年以上'],
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
            name: '订阅率(%)',
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
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(255,255,255,0.2)'
                }
            }
        },
        series: []
    };

    // 服务关系图配置
    const relationChartOption = {
        backgroundColor: 'transparent',
        title: {
            text: '服务与流失关系图',
            left: 'center',
            top: 10,
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff'
            }
        },
        tooltip: {
            formatter: function(params) {
                if (params.dataType === 'edge') {
                    return `${params.data.source} -> ${params.data.target}<br/>
                            流失关联度: ${params.data.value.toFixed(2)}%`;
                }
                return `${params.name}<br/>
                        流失客户数: ${params.value}`;
            }
        },
        series: [{
            type: 'graph',
            layout: 'force',
            animation: true,
            draggable: true,
            categories: [
                {
                    name: '中心'
                },
                {
                    name: '服务'
                }
            ],
            force: {
                repulsion: 350,
                edgeLength: [100, 200]
            },
            label: {
                show: true,
                position: 'right',
                color: '#fff',
                formatter: '{b}'
            },
            lineStyle: {
                color: 'source',
                opacity: 0.5
            }
        }]
    };

    // 初始化图表
    charts.serviceHeatmap = echarts.init(document.getElementById('serviceHeatmap'));
    charts.serviceTrend = echarts.init(document.getElementById('serviceTrend'));
    charts.serviceRelation = echarts.init(document.getElementById('serviceRelation'));

    // 设置配置项
    charts.serviceHeatmap.setOption(heatmapChartOption);
    charts.serviceTrend.setOption(trendChartOption);
    charts.serviceRelation.setOption(relationChartOption);

    // 获取服务关联数据
    fetch(window.location.pathname + 'api/chart-data?type=service-correlation')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Service correlation data:', data);
            const heatmapData = [];
            data.forEach((row, i) => {
                row.forEach((val, j) => {
                    heatmapData.push([j, i, val]);
                });
            });
            charts.serviceHeatmap.setOption({
                series: [{
                    data: heatmapData
                }]
            });
        })
        .catch(error => {
            console.error('获取服务关联数据失败:', error);
            document.getElementById('serviceHeatmap').innerHTML = 
                '<p style="color: red; text-align: center">加载数据失败: ' + error.message + '</p>';
        });

    // 获取服务趋势数据
    fetch(window.location.pathname + 'api/chart-data?type=service-trend')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Service trend data:', data);
            const series = Object.entries(data).map(([service, values]) => ({
                name: service,
                type: 'line',
                smooth: true,
                data: values,
                symbolSize: 6,
                lineStyle: {
                    width: 2
                }
            }));
            charts.serviceTrend.setOption({
                series: series
            });
        })
        .catch(error => {
            console.error('获取服务趋势数据失败:', error);
            document.getElementById('serviceTrend').innerHTML = 
                '<p style="color: red; text-align: center">加载数据失败: ' + error.message + '</p>';
        });

    // 获取服务关系数据
    fetch(window.location.pathname + 'api/chart-data?type=service-relation')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Service relation data:', data);
            charts.serviceRelation.setOption({
                series: [{
                    data: data.nodes,
                    links: data.links
                }]
            });
        })
        .catch(error => {
            console.error('获取服务关系数据失败:', error);
            document.getElementById('serviceRelation').innerHTML = 
                '<p style="color: red; text-align: center">加载数据失败: ' + error.message + '</p>';
        });
} 