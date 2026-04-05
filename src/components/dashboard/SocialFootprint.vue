<template>
<div class="h-full w-full flex flex-col justify-between py-4 font-serif relative overflow-hidden group">
    
    <div class="flex items-center justify-between px-1">
    <div class="flex flex-col">
        <span class="text-[14px] font-bold text-[#111] tracking-[0.2em]">时空回响</span>
        <span class="text-[8px] font-mono text-palace-red/60 uppercase italic tracking-tighter">Temporal_Echo_Pulse</span>
    </div>
    <div class="text-[10px] font-mono text-gray-400 opacity-40 uppercase">Global_Sync</div>
    </div>

    <div class="flex-1 relative flex items-center justify-center">
    <div class="absolute w-32 h-32 border border-palace-red/5 rounded-full animate-[ping_4s_linear_infinite]"></div>
    <div class="absolute w-20 h-20 border border-palace-red/10 rounded-full animate-[ping_6s_linear_infinite] delay-1000"></div>
    
    <div class="relative z-10 flex flex-col items-center">
        <div class="w-2 h-2 bg-palace-red rounded-full shadow-[0_0_15px_rgba(155,46,46,0.8)] animate-pulse"></div>
        <span class="text-3xl font-bold text-[#111] mt-3 tabular-nums">{{ visitorCount }}</span>
        <span class="text-[8px] text-gray-400 tracking-[0.4em] uppercase mt-1">Echo_Value</span>
    </div>

    <transition-group name="bubble">
        <div v-for="b in bubbles" :key="b.id" 
            class="absolute text-[9px] text-palace-red/60 whitespace-nowrap pointer-events-none italic font-serif"
            :style="{ left: b.x + '%', top: b.y + '%', opacity: b.opacity }">
        · {{ b.text }}
        </div>
    </transition-group>
    </div>

    <div class="mt-4 pt-3 border-t border-dashed border-gray-100">
    <p class="text-[11px] text-gray-500 leading-relaxed italic text-center">
        “每一次注视，皆为对千年营造的一次唤醒。”
    </p>
    </div>

</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visitorCount = ref(2486)
const bubbles = ref([])
let timer = null
let bubbleId = 0

const cityNames = ['西安', '北京', '洛阳', '伦敦', '京都', '苏州']

const createBubble = () => {
const id = bubbleId++
const bubble = {
    id,
    text: `${cityNames[Math.floor(Math.random() * cityNames.length)]}营造者 +1`,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    opacity: 0.8
}
bubbles.value.push(bubble)

// 3秒后移除
setTimeout(() => {
    bubbles.value = bubbles.value.filter(b => b.id !== id)
}, 3000)
}

onMounted(() => {
timer = setInterval(() => {
    visitorCount.value += Math.floor(Math.random() * 3)
    if (Math.random() > 0.6) createBubble()
}, 2000)
})

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
/* 气泡弹出动画 */
.bubble-enter-active, .bubble-leave-active {
transition: all 3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.bubble-enter-from {
opacity: 0;
transform: translateY(20px) scale(0.8);
}
.bubble-leave-to {
opacity: 0;
transform: translateY(-40px) scale(1.2);
}
</style>