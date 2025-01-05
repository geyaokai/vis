// 全局图表对象
const charts = {};

// 导航控制
function showSection(sectionId) {
    // 隐藏所有section
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    // 显示选中的section
    document.getElementById(sectionId).classList.add('active');
    
    // 更新导航项的激活状态
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 触发窗口resize事件，确保图表正确渲染
    window.dispatchEvent(new Event('resize'));
}

// 初始化函数
function initCharts() {
    // 客户流失分析图表
    charts.churnDistribution = echarts.init(document.getElementById('churnDistribution'));
    charts.contractAnalysis = echarts.init(document.getElementById('contractAnalysis'));
    
    // 人口统计分析图表
    charts.genderDistribution = echarts.init(document.getElementById('genderDistribution'));
    charts.ageServiceRadar = echarts.init(document.getElementById('ageServiceRadar'));
    
    // 服务使用分析图表
    charts.serviceHeatmap = echarts.init(document.getElementById('serviceHeatmap'));
    charts.serviceTrend = echarts.init(document.getElementById('serviceTrend'));
    
    // 财务分析图表
    charts.chargesScatter = echarts.init(document.getElementById('chargesScatter'));
    charts.chargesBoxplot = echarts.init(document.getElementById('chargesBoxplot'));
    
    // 设置响应式
    window.addEventListener('resize', function() {
        Object.values(charts).forEach(chart => chart.resize());
    });
}

// 页面加载完成后初始化图表
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    // 加载各个图表的数据和配置
    loadChurnAnalysis();
    loadDemographicAnalysis();
    loadServiceAnalysis();
    loadFinancialAnalysis();
}); 