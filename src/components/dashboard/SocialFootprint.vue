<template>
<div class="h-full w-full flex flex-col justify-between font-serif relative overflow-hidden group min-h-0">
    
    <!-- <div class="flex items-center justify-between px-1 shrink-0 pt-1">
        <div class="flex flex-col">
            <span class="text-xs xl:text-[14px] font-bold text-[#111] tracking-[0.2em] leading-none">时空回响</span>
            <span class="text-[7px] xl:text-[8px] font-mono text-palace-red/60 uppercase italic tracking-tighter mt-1">Temporal_Echo_Pulse</span>
        </div>
        <div class="text-[8px] xl:text-[10px] font-mono text-gray-400 opacity-40 uppercase">Global_Sync</div>
    </div> -->

    <div class="flex-1 min-h-0 relative flex items-center justify-center overflow-hidden my-2">
        <div class="absolute w-20 h-20 xl:w-32 xl:h-32 border border-palace-red/5 rounded-full animate-[ping_4s_linear_infinite]"></div>
        <div class="absolute w-14 h-14 xl:w-20 xl:h-20 border border-palace-red/10 rounded-full animate-[ping_6s_linear_infinite] delay-1000"></div>
        
        <div class="relative z-10 flex flex-col items-center">
            <div class="w-1.5 h-1.5 xl:w-2 xl:h-2 bg-palace-red rounded-full shadow-[0_0_15px_rgba(155,46,46,0.8)] animate-pulse"></div>
            <span class="text-3xl xl:text-4xl font-bold text-[#111] mt-2 xl:mt-3 tabular-nums">{{ visitorCount }}</span>
            <span class="text-[7px] xl:text-[8px] text-gray-400 tracking-[0.4em] uppercase mt-1">Echo_Value</span>
        </div>

        <transition-group name="bubble">
            <div v-for="b in bubbles" :key="b.id" 
                class="absolute text-[8px] xl:text-[10px] text-palace-red/60 whitespace-nowrap pointer-events-none italic font-serif"
                :style="{ left: b.x + '%', top: b.y + '%', opacity: b.opacity }">
            · {{ b.text }}
            </div>
        </transition-group>
    </div>

    <div class="mt-auto pt-1.5 xl:pt-3 border-t border-dashed border-gray-100 shrink-0">
        <p class="text-[9px] xl:text-[11px] text-gray-500 leading-relaxed italic text-center line-clamp-1">
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
        // 往中间收缩生成范围，防止初始位置就贴边被过度裁剪
        x: 25 + Math.random() * 50,
        y: 25 + Math.random() * 50,
        opacity: 0.8
    }
    bubbles.value.push(bubble)

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
.bubble-enter-active, .bubble-leave-active {
    transition: all 3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.bubble-enter-from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
}
/* 稍微减少气泡上浮的距离，防止快速闪烁 */
.bubble-leave-to {
    opacity: 0;
    transform: translateY(-30px) scale(1.1);
}
</style>