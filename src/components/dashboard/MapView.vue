<template>
<div class="absolute inset-0 w-full h-full relative bg-[#fcfaf5] overflow-hidden">
    <div id="amap-container" class="w-full h-full opacity-95 contrast-[1.1] saturate-[0.8] sepia-[0.05] mix-blend-multiply"></div>

    <div class="absolute inset-0 pointer-events-none z-10 opacity-[0.04]" 
        style="background-image: radial-gradient(#9b2e2e 0.5px, transparent 0.5px); background-size: 30px 30px;">
    </div>

    <div class="absolute bottom-10 left-10 z-20">
    <div class="bg-white/95 p-5 border-l-[6px] border-palace-red shadow-xl">
        <div class="flex items-center gap-3 mb-3">
        <div class="w-2.5 h-2.5 bg-palace-red animate-pulse"></div>
        <span class="text-[14px] font-black tracking-[0.3em] text-[#000]">中国营造 · 寻古舆图</span>
        </div>
        <div class="flex gap-10">
        <div class="flex flex-col">
            <span class="text-[9px] text-gray-500 font-bold uppercase">Nodes</span>
            <span class="text-2xl font-mono font-black text-palace-red">{{ architectureNodes.length }}</span>
        </div>
        <div class="flex flex-col border-l border-gray-200 pl-8">
            <span class="text-[9px] text-gray-400 font-bold uppercase">Assets</span>
            <span class="text-2xl font-mono font-black text-[#111]">42.8k</span>
        </div>
        </div>
    </div>
    </div>
</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { architectureNodes } from '../../data/architectureData'

let map = null
const defaultCenter = [105.3, 35.5]
const defaultZoom = 5

// 重置视角函数
const resetView = () => {
if (map) {
    map.setZoomAndCenter(defaultZoom, defaultCenter, false, 1000)
}
}

onMounted(() => {
window._AMapSecurityConfig = { securityJsCode: import.meta.env.VITE_AMAP_SECURITY_CODE }

AMapLoader.load({
    key: import.meta.env.VITE_AMAP_KEY,
    version: '2.0',
    plugins: ['AMap.Marker']
}).then((AMap) => {
    map = new AMap.Map('amap-container', {
    zoom: defaultZoom,
    center: defaultCenter,
    mapStyle: 'amap://styles/light', 
    features: ['bg', 'point', 'road', 'building'],
    viewMode: '2D'
    })

    architectureNodes.forEach(node => {
    // 保持之前的十字标点样式
    const content = `
        <div class="marker-wrapper">
        <div class="marker-guide"></div>
        <div class="marker-node">
            <div class="node-cross-v"></div>
            <div class="node-cross-h"></div>
            <div class="node-core"></div>
        </div>
        <div class="marker-data-card">
            <div class="card-tag">ARCHIVE // ${node.type}</div>
            <div class="card-main">
            <span class="card-region">${node.region}</span>
            <h5 class="card-famous">${node.famous}</h5>
            <div class="card-stats">
                <span class="stats-label">构件总数</span>
                <span class="stats-value">${node.count.toLocaleString()}</span>
            </div>
            <p class="card-desc">${node.desc}</p>
            </div>
        </div>
        </div>`

    const marker = new AMap.Marker({
        position: [node.lng, node.lat],
        content: content,
        offset: new AMap.Pixel(0, 0),
        extData: node // 存储节点数据以便点击时调用
    })

    // 【核心功能】绑定点击聚焦事件
    marker.on('click', (e) => {
        const data = e.target.getExtData()
        // 设置缩放级别和中心点，最后一个参数是动画持续时间(ms)
        map.setZoomAndCenter(data.zoom || 12, [data.lng, data.lat], false, 800)
    })

    map.add(marker)
    })
})
})

onUnmounted(() => map?.destroy())
</script>

<style>
/* 样式部分完全沿用上个版本的“十字准星”样式，无需改动 */
.amap-logo, .amap-copyright { display: none !important; }
.marker-wrapper { position: relative; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; }
.marker-guide { position: absolute; bottom: 50%; width: 1px; height: 30px; background: linear-gradient(to top, #9b2e2e, transparent); opacity: 0.4; }
.marker-node { position: relative; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; z-index: 5; cursor: pointer; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.node-cross-v { position: absolute; width: 2px; height: 100%; background: #9b2e2e; }
.node-cross-h { position: absolute; width: 100%; height: 2px; background: #9b2e2e; }
.node-core { width: 6px; height: 6px; background: #000; border: 1.5px solid #fff; z-index: 10; box-shadow: 0 0 10px rgba(155, 46, 46, 0.5); }
.marker-node::after { content: ''; position: absolute; width: 22px; height: 22px; background: radial-gradient(circle, rgba(155, 46, 46, 0.4) 0%, transparent 70%); animation: node-breathe 2.5s ease-in-out infinite; }
.marker-wrapper:hover .marker-node { transform: rotate(45deg) scale(1.3); }
.marker-data-card { position: absolute; bottom: 65px; left: 50%; transform: translateX(-50%) translateY(20px); width: 280px; background: #fffefb; border: 2px solid #000; opacity: 0; pointer-events: none; transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1); box-shadow: 0 30px 60px rgba(0,0,0,0.3); z-index: 100; }
.marker-wrapper:hover .marker-data-card { opacity: 1; transform: translateX(-50%) translateY(0); }
.card-tag { background: #000; color: #fff; font-size: 10px; padding: 4px 12px; font-family: mono; font-weight: bold; }
.card-main { padding: 18px; }
.card-region { font-size: 12px; color: #9b2e2e; font-weight: 900; margin-bottom: 5px; display: block; }
.card-famous { font-size: 24px; font-weight: 900; color: #000; font-family: serif; border-bottom: 3px solid #9b2e2e; display: inline-block; margin-bottom: 15px; }
.card-stats { display: flex; justify-content: space-between; align-items: center; background: #000; padding: 10px 15px; color: #fff; margin-bottom: 15px; }
.stats-value { font-size: 22px; font-family: mono; font-weight: 900; }
.card-desc { font-size: 14px; color: #111; line-height: 1.6; font-family: serif; }
@keyframes node-breathe { 0%, 100% { transform: scale(0.8); opacity: 0.2; } 50% { transform: scale(1.4); opacity: 0.5; } }
</style>