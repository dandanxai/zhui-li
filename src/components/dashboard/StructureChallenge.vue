<template>
<div class="h-full w-full flex flex-col justify-between py-6 font-serif relative overflow-hidden group/container"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false">
    
    <div class="flex items-end justify-between mb-10 px-1 relative">
    <div class="flex flex-col gap-1">
        <div class="flex items-center gap-3">
        <div class="w-1.5 h-1.5 bg-palace-red rotate-45 animate-pulse"></div>
        <span class="text-xl font-bold text-[#111] tracking-[0.3em]">大木营造</span>
        </div>
        <span class="text-[9px] font-mono text-gray-400 uppercase tracking-[0.4em] pl-5">Architectural_Logic</span>
    </div>
    <div class="text-4xl font-serif font-black text-palace-red opacity-10 italic">
        {{ ['壹', '贰', '叁', '肆'][activeStep] }}
    </div>
    </div>

    <div class="flex-1 relative pl-8 flex flex-col justify-between py-2">
    <div class="absolute left-[7px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-palace-red/30 to-transparent"></div>

    <div v-for="(step, index) in steps" :key="index" 
        @mouseenter="handleMouseEnter(index)"
        class="relative cursor-pointer transition-all duration-500 ease-out py-2"
        :class="[
            activeStep === index ? 'translate-x-4 opacity-100' : 'opacity-20 hover:opacity-50 translate-x-0'
        ]">
        
        <div class="absolute -left-[25px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-palace-red transition-all duration-500"
            :class="activeStep === index ? 'bg-palace-red scale-125 shadow-[0_0_12px_rgba(155,46,46,0.6)]' : 'bg-white'"></div>

        <div class="flex flex-col gap-2">
        <div class="flex items-baseline gap-4">
            <span class="text-2xl font-bold text-gray-900 tracking-widest">{{ step.name }}</span>
            <span class="text-[10px] font-mono text-gray-400 uppercase tracking-tighter opacity-70">{{ step.en }}</span>
        </div>
        
        <transition name="slide-up">
            <div v-if="activeStep === index" class="max-w-[200px]">
            <div class="w-full h-[2px] bg-palace-red/10 relative overflow-hidden my-2">
                <div class="absolute h-full bg-palace-red" :class="{ 'animate-logic-progress': !isHovered }"></div>
            </div>
            <p class="text-[13px] text-gray-600 leading-relaxed italic animate-in fade-in slide-in-from-left-4 duration-500">
                {{ step.desc }}
            </p>
            </div>
        </transition>
        </div>
    </div>
    </div>

    <div class="mt-8 pt-4 relative">
    <div class="absolute top-0 left-0 w-16 h-[1px] bg-palace-red/40"></div>
    <div class="flex items-center gap-3">
        <span class="text-[10px] font-mono text-palace-red animate-pulse">LIVE_SIM</span>
        <p class="text-[12px] text-[#111] leading-relaxed italic opacity-80 font-serif">
        “不论间数，皆以材为祖。”
        </p>
    </div>
    </div>

</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeStep = ref(0)
const isHovered = ref(false)
let timer = null

const steps = [
{ name: '伐木制材', en: 'Lumbering', desc: '甄选千年良木，依“材份制”裁定规格。' },
{ name: '弹线划正', en: 'Marking', desc: '以墨线定中，精准预留榫卯咬合深度。' },
{ name: '榫卯凿作', en: 'Joinery', desc: '不落一钉，仅凭凹凸咬合实现结构弹性。' },
{ name: '升架合龙', en: 'Assembly', desc: '万件归位，屋脊合龙，建筑方得神魂。' }
]

// 自动滚动逻辑
const startTimer = () => {
timer = setInterval(() => {
    if (!isHovered.value) {
    activeStep.value = (activeStep.value + 1) % steps.length
    }
}, 4000)
}

// 鼠标进入具体某一项
const handleMouseEnter = (index) => {
activeStep.value = index
}

onMounted(() => {
startTimer()
})

onUnmounted(() => {
if (timer) clearInterval(timer)
})
</script>

<style scoped>
/* 标题文字滑入动画 */
.slide-up-enter-active { transition: all 0.5s ease-out; }
.slide-up-enter-from { opacity: 0; transform: translateY(10px); }

@keyframes logic-progress {
from { width: 0; }
to { width: 100%; }
}
.animate-logic-progress {
animation: logic-progress 4s linear infinite;
}

/* 隐藏滚动条 */
::-webkit-scrollbar { display: none; }
</style>