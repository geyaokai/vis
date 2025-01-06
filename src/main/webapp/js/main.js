// 全局变量声明
const charts = {};
let slideContainer, slideHandle, pageDots, slideTrack;
let isDragging = false;
let startY, startTop;
let currentPage = 0;

// 导航控制
function showSection(sectionId, event) {
    const sections = ['churn-analysis', 'demographic-analysis', 'service-analysis', 'financial-analysis'];
    const index = sections.indexOf(sectionId);
    if (index !== -1) {
        slideTo(index);
    }
    
    // 更新导航项的激活状态
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

// 滑动到指定页面
function slideTo(index) {
    currentPage = index;
    slideContainer.style.transform = `translateX(-${index * 25}%)`;
    updateSlideHandle(index);
    updatePageDots(index);
    
    // 触发resize以确保图表正确渲染
    window.dispatchEvent(new Event('resize'));
}

// 更新滑动手柄位置
function updateSlideHandle(index) {
    const trackHeight = slideTrack.clientHeight - slideHandle.clientHeight;
    const newTop = (trackHeight * index) / 3;
    slideHandle.style.top = `${newTop}px`;
}

// 更新页面指示器
function updatePageDots(index) {
    pageDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// 初始化函数
function initSlideControls() {
    slideContainer = document.querySelector('.slide-container');
    slideHandle = document.querySelector('.slide-handle');
    pageDots = document.querySelectorAll('.page-dot');
    slideTrack = document.querySelector('.slide-track');

    // 滑动手柄拖拽事件
    slideHandle.addEventListener('mousedown', function(e) {
        isDragging = true;
        startY = e.clientY;
        startTop = parseInt(getComputedStyle(slideHandle).top);
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const trackHeight = slideTrack.clientHeight - slideHandle.clientHeight;
        let newTop = startTop + (e.clientY - startY);
        newTop = Math.max(0, Math.min(newTop, trackHeight));
        
        const percentage = newTop / trackHeight;
        const page = Math.round(percentage * 3);
        slideTo(page);
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        document.body.style.userSelect = '';
    });

    // 页面指示器点击事件
    pageDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            slideTo(index);
        });
    });

    // 添加鼠标滚轮事件
    let wheelTimeout;
    document.addEventListener('wheel', function(e) {
        if (wheelTimeout) return;
        
        wheelTimeout = setTimeout(() => {
            wheelTimeout = null;
        }, 500);

        if (e.deltaY > 0 && currentPage < 3) {
            slideTo(currentPage + 1);
        } else if (e.deltaY < 0 && currentPage > 0) {
            slideTo(currentPage - 1);
        }
    });
}

// 初始化函数
function initCharts() {
    // 客户流失分析图表
    charts.lifeCycleAnalysis = echarts.init(document.getElementById('lifeCycleAnalysis'));
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initSlideControls(); // 初始化滑动控制
    initCharts();       // 初始化图表
    loadChurnAnalysis();
    loadDemographicAnalysis();
    loadServiceAnalysis();
    loadFinancialAnalysis();
}); 