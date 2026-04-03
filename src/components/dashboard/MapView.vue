<template>
    <div class="absolute inset-0 w-full h-full relative bg-[#fcfaf5]">
    
    <div id="amap-container" class="w-full h-full opacity-90 mix-blend-multiply"></div>

    <div class="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-10">
        <div class="w-full h-[1px] bg-palace-red absolute"></div>
        <div class="h-full w-[1px] bg-palace-red absolute"></div>
        <div class="w-[30vw] h-[30vw] rounded-full border border-palace-red/30 animate-[ping_10s_linear_infinite]"></div>
    </div>

    <div class="absolute bottom-6 left-6 z-20 text-[9px] tracking-[0.3em] font-mono text-gray-500 bg-[#fcfaf5]/80 px-4 py-2 backdrop-blur-sm border border-palace-red/10">
        <p>AMAP_GIS_SYSTEM // SECURED</p>
        <p class="mt-1 text-palace-red opacity-80">DATABANK: YINGZAO_V2</p>
    </div>

    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

let map = null

const architectureNodes = [
    { id: 'ZH-01', name: '山西 · 应县木塔', lng: 113.176, lat: 39.554 },
    { id: 'ZH-02', name: '北京 · 故宫太和殿', lng: 116.390, lat: 39.916 },
    { id: 'ZH-03', name: '安徽 · 宏村古建群', lng: 117.983, lat: 30.003 },
    { id: 'ZH-04', name: '河北 · 正定隆兴寺', lng: 114.576, lat: 38.143 },
    { id: 'ZH-05', name: '福建 · 永定土楼', lng: 117.051, lat: 24.629 },
    { id: 'ZH-06', name: '辽宁 · 沈阳故宫', lng: 123.447, lat: 41.796 },
    { id: 'ZH-07', name: '山西 · 佛光寺大殿', lng: 113.233, lat: 38.868 }
]

onMounted(() => {
    // 从 .env 文件中读取密钥
    window._AMapSecurityConfig = {
    securityJsCode: import.meta.env.VITE_AMAP_SECURITY_CODE, 
    }

    AMapLoader.load({
    key: import.meta.env.VITE_AMAP_KEY,
    version: '2.0',
    plugins: ['AMap.Marker']
    })
    .then((AMap) => {
    map = new AMap.Map('amap-container', {
        zoom: 4.8, 
        center: [105.397428, 36.90923], 
        // 核心美化 1：使用 whitesmoke 极简灰白底色
        mapStyle: 'amap://styles/whitesmoke', 
        // 核心美化 2：只保留背景(bg)和城市名称(point)，去掉难看的道路和红线边境
        features: ['bg', 'point'], 
    })

    architectureNodes.forEach(node => {
        // 核心美化 3：重写坐标点的 HTML，让它变得精致小巧，悬浮逻辑更严谨
        const customMarkerContent = `
        <div class="amap-custom-marker">
            <div class="marker-dot"></div>
            <div class="marker-pulse"></div>
            
            <div class="marker-tooltip">
            <span class="tooltip-name">${node.name}</span>
            <span class="tooltip-id">ID: ${node.id}</span>
            </div>
        </div>
        `

        const marker = new AMap.Marker({
        position: new AMap.LngLat(node.lng, node.lat),
        content: customMarkerContent,
        offset: new AMap.Pixel(0, 0)
        })

        map.add(marker)
    })
    })
    .catch((e) => {
    console.error('高德地图加载失败:', e)
    })
})

onUnmounted(() => {
    if (map) map.destroy()
})
</script>

<style>
/* 隐藏高德地图默认的 Logo 和版权信息 */
.amap-logo, .amap-copyright {
    display: none !important;
}

/* ========================================== */
/* 纯 CSS 解决高德地图 HTML 注入后的悬停层级问题 */
/* ========================================== */
.amap-custom-marker {
    position: relative;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: crosshair;
}

/* 中心的精细小红点 */
.marker-dot {
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: #9b2e2e;
    border-radius: 50%;
    z-index: 10;
    box-shadow: 0 0 4px rgba(155, 46, 46, 0.8);
}

/* 呼吸光晕 */
.marker-pulse {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #9b2e2e;
    border-radius: 50%;
    opacity: 0.3;
    animation: pulse-marker 2s ease-out infinite;
}

/* 悬停名牌 (默认绝对隐藏) */
.marker-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    margin-bottom: 8px;
    background-color: rgba(252, 250, 245, 0.95);
    border: 1px solid rgba(155, 46, 46, 0.15);
    padding: 6px 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    white-space: nowrap;
    z-index: 50;
    border-radius: 2px;
}

/* 悬停时浮现 */
.amap-custom-marker:hover .marker-tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}

/* 悬停名牌内的文字排版 */
.tooltip-name {
    color: #111;
    font-family: serif;
    font-size: 13px;
    letter-spacing: 0.1em;
    font-weight: 600;
}

.tooltip-id {
    color: #9b2e2e;
    font-family: monospace;
    font-size: 9px;
    margin-top: 4px;
    opacity: 0.6;
    letter-spacing: 0.1em;
}

@keyframes pulse-marker {
    0% { transform: scale(0.5); opacity: 0.6; }
    100% { transform: scale(1.5); opacity: 0; }
}
</style>