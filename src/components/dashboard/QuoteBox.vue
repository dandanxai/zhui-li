<template>
<div class="relative flex h-full w-full overflow-hidden bg-[#fcfaf5] p-6 cursor-pointer select-none group"
    @click="handleManualSwitch">
    
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
        style="background-image: url('https://www.transparenttextures.com/patterns/natural-paper.png');"></div>
    <div class="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none scale-150">
    <div class="w-64 h-64 border border-palace-red/10 rounded-full"></div>
    </div>

    <transition name="ripple">
    <div v-if="showRipple" class="absolute w-20 h-20 border-[4px] border-palace-red rounded-full opacity-0 pointer-events-none animate-quote-ripple"
        :style="{ left: ripplePos.x + 'px', top: ripplePos.y + 'px' }"></div>
    </transition>

    <div class="text-[120px] font-serif leading-none absolute -top-10 -left-6 z-10 
                bg-gradient-to-b from-palace-red to-transparent bg-clip-text text-transparent opacity-15">
    “
    </div>

    <div class="flex-1 flex flex-col justify-center h-full pl-10 pr-6 relative z-10">
    <transition name="fade-slide" mode="out-in">
        <p :key="currentIndex" 
        class="text-xl md:text-2xl font-serif text-[#111] leading-relaxed tracking-[0.1em] font-medium 
                group-hover:text-palace-red transition-colors duration-500">
        {{ quotes[currentIndex].content }}
        </p>
    </transition>

    <div class="flex justify-end items-center gap-4 mt-6">
        <div class="relative w-16 h-[2px] bg-palace-red/10 overflow-hidden">
        <div class="absolute inset-0 bg-palace-red transform origin-left transition-transform duration-[6000ms] linear"
                :style="{ transform: `scaleX(${progress})` }"
                :key="currentIndex"></div>
        </div>
        
        <div class="flex items-center gap-2">
        <div class="w-1 h-3 bg-palace-red shadow-[0_0_8px_rgba(155,46,46,0.3)]"></div>
        <span class="text-xs tracking-[0.4em] font-serif uppercase text-[#333] font-bold">{{ quotes[currentIndex].author }}</span>
        </div>
    </div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentIndex = ref(0)
const progress = ref(0)
const showRipple = ref(false)
const ripplePos = ref({ x: 0, y: 0 })
let timer = null

const quotes = [
{ content: '建筑是凝固的音乐，而斗拱则是这乐谱中最跳动的音符。', author: '梁思成' },
{ content: '它们不仅是结构，更是中国文人对宇宙空间的一种骨气表达。', author: '林徽因' },
{ content: '在严丝合缝的木头里，藏着中国人千年的处世哲学。', author: '营造档案' },
{ content: '天枢者，万物之轴也。数字数字化并非复制，而是另一种形式的生命开启。', author: '筑理天枢' }
]

// 重置并启动进度条
const resetTimer = () => {
if (timer) clearInterval(timer)
progress.value = 0

// 模拟一个 6 秒的平滑进度
const step = 0.01
const interval = 6000 * step
timer = setInterval(() => {
    progress.value += step
    if (progress.value >= 1) {
        progress.value = 1
        currentIndex.value = (currentIndex.value + 1) % quotes.length
        resetTimer() // 循环调用
    }
}, interval)
}

// 模拟盖章点击反馈
const handleManualSwitch = (e) => {
if (showRipple.value) return

const rect = e.currentTarget.getBoundingClientRect()
ripplePos.value = { x: e.clientX - rect.left, y: e.clientY - rect.top }
showRipple.value = true

// 模拟点击切换
setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % quotes.length
    resetTimer() // 立即充值计时器
    showRipple.value = false
}, 200)
}

onMounted(() => resetTimer())
onUnmounted(() => {
    if (timer) clearInterval(timer)
})
</script>

<style scoped>
/* 核心引言切换动画：增加时间让它更丝滑 */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 1s cubic-bezier(0.19, 1, 0.22, 1); }
.fade-slide-enter-from { opacity: 0; transform: translateX(25px) scale(1.02); }
.fade-slide-leave-to { opacity: 0; transform: translateX(-25px) scale(0.98); }

/* 朱砂涟漪动画 */
@keyframes quote-ripple {
0% { transform: scale(1) translate(-50%, -50%); opacity: 0.8; }
100% { transform: scale(3) translate(-50%, -50%); opacity: 0; }
}
.animate-quote-ripple {
animation: quote-ripple 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

/* 强制进度条线性变化 */
.linear { transition-timing-function: linear; }
</style>