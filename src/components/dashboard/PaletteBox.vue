<template>
<div class="h-full w-full flex flex-col justify-center gap-4 py-2 font-serif"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay">
    
    <div class="h-16 w-full flex gap-1.5 items-end">
    <div v-for="(c, index) in colors" :key="c.code" 
        @mouseenter="activeIndex = index"
        class="flex-1 h-full rounded-sm relative cursor-crosshair transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-sm group overflow-hidden border border-black/5" 
        :class="{ 'flex-[3]': activeIndex === index }"
        :style="{ backgroundColor: c.code }">
        
        <span class="absolute top-2 left-2 text-[8px] font-mono transition-all duration-500"
            :class="[
                index === 4 ? 'text-black' : 'text-white',
                activeIndex === index ? 'opacity-100 scale-110' : 'opacity-30'
            ]">0{{ index + 1 }}</span>

        <div class="absolute inset-0 flex items-center justify-center transition-all duration-700"
            :class="activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'">
        <span class="text-[12px] font-bold tracking-[0.3em] whitespace-nowrap drop-shadow-sm"
                :class="index === 4 ? 'text-black/80' : 'text-white'">
            {{ c.name }}
        </span>
        </div>

        <div v-if="isAutoplaying && activeIndex === index" 
            class="absolute bottom-0 left-0 h-[3px] bg-white/40 animate-progress"></div>
    </div>
    </div>

    <div class="flex flex-col gap-1 border-t border-palace-red/10 pt-3 relative">
    <transition name="slide-fade" mode="out-in">
        <div :key="activeIndex" class="flex justify-between items-baseline">
        <div class="flex items-center gap-3">
            <span class="text-sm font-bold text-gray-800 tracking-widest">{{ colors[activeIndex].name }}</span>
            <span class="text-[10px] font-mono text-palace-red bg-palace-red/5 px-2 py-0.5 border border-palace-red/10 shadow-inner">
            {{ colors[activeIndex].code }}
            </span>
        </div>
        <div class="flex items-center gap-2">
            <span v-if="!isAutoplaying" class="text-[8px] text-palace-red/60 animate-pulse font-mono tracking-tighter">MANUAL MODE</span>
            <span class="text-[9px] text-gray-400 font-mono tracking-[0.2em] uppercase italic">
            {{ colors[activeIndex].en }}
            </span>
        </div>
        </div>
    </transition>

    <p class="text-[11px] text-gray-500 leading-relaxed italic opacity-80 min-h-[3em] flex items-center">
        {{ colors[activeIndex].desc }}
    </p>
    </div>

</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeIndex = ref(0)
const isAutoplaying = ref(true)
let timer = null
let resumeTimeout = null

const colors = [
{ name: '宫墙红', code: '#9B2E2E', en: 'Palace_Red', desc: '朱砂凝厚，正如紫禁城墙，承托着千年的皇家威仪。' },
{ name: '琉璃黄', code: '#E6B422', en: 'Glazed_Gold', desc: '金碧辉煌，屋脊流光。此色象征大地之德，皇权至上。' },
{ name: '石青', code: '#2D5150', en: 'Azurite', desc: '取自矿石之青，沉稳而深邃，常用于彩画点睛之笔。' },
{ name: '玄黛', code: '#2D2D2D', en: 'Ink_Dark', desc: '墨色入木，素雅沉静。北方建筑之瓦，如水墨晕染。' },
{ name: '汉玉', code: '#F2F2F2', en: 'Jade_White', desc: '温润如玉，洁净无瑕。基座之栏，映射文人之气。' }
]

// 自动切换逻辑
const startAutoplay = () => {
// 延迟 3 秒再重新开始自动播放，防止鼠标频繁进出的抖动
resumeTimeout = setTimeout(() => {
    isAutoplaying.ref = true
    timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % colors.length
    }, 4000) // 每 4 秒换一个色块
}, 3000)
}

const stopAutoplay = () => {
isAutoplaying.value = false
if (timer) clearInterval(timer)
if (resumeTimeout) clearTimeout(resumeTimeout)
}

onMounted(() => {
// 初始启动
timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % colors.length
}, 4000)
})

onUnmounted(() => {
stopAutoplay()
})
</script>

<style scoped>
/* 细腻的切换动画 */
.slide-fade-enter-active { transition: all 0.5s ease-out; }
.slide-fade-leave-active { transition: all 0.4s ease-in; }
.slide-fade-enter-from { transform: translateY(8px); opacity: 0; }
.slide-fade-leave-to { transform: translateY(-8px); opacity: 0; }

/* 底部进度条动画：4秒一个周期 */
@keyframes progress-load {
0% { width: 0; }
100% { width: 100%; }
}
.animate-progress {
animation: progress-load 4s linear infinite;
}

/* 隐藏滚动条 */
::-webkit-scrollbar { display: none; }
</style>