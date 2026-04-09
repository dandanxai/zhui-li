<template>
<div class="h-full w-full flex flex-col font-serif relative group/container min-h-0"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false">
    
    <div class="absolute right-0 top-0 text-4xl font-serif font-black text-palace-red opacity-[0.03] italic pointer-events-none select-none">
        STEP.{{ ['壹', '贰', '叁', '肆'][activeStep] }}
    </div>

    <div class="flex-1 min-h-0 overflow-y-auto custom-scrollbar relative pl-8 py-2 pr-2">
        <div class="absolute left-[7px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-transparent via-palace-red/30 to-transparent"></div>

        <div v-for="(step, index) in steps" :key="index" 
            @mouseenter="handleMouseEnter(index)"
            class="relative cursor-pointer transition-all duration-500 ease-out py-3"
            :class="[
                activeStep === index ? 'translate-x-4 opacity-100' : 'opacity-20 hover:opacity-50 translate-x-0'
            ]">
            
            <div class="absolute -left-[25px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-palace-red transition-all duration-500"
                :class="activeStep === index ? 'bg-palace-red scale-125 shadow-[0_0_12px_rgba(155,46,46,0.6)]' : 'bg-white'"></div>

            <div class="flex flex-col gap-1.5">
                <div class="flex items-baseline gap-3 xl:gap-4">
                    <span class="text-lg xl:text-2xl font-bold text-gray-900 tracking-widest">{{ step.name }}</span>
                    <span class="text-[9px] xl:text-[10px] font-mono text-gray-400 uppercase tracking-tighter opacity-70">{{ step.en }}</span>
                </div>
                
                <transition name="slide-up">
                    <div v-if="activeStep === index" class="max-w-[180px] xl:max-w-[200px]">
                        <div class="w-full h-[2px] bg-palace-red/10 relative overflow-hidden my-1.5 xl:my-2">
                            <div class="absolute h-full bg-palace-red" :class="{ 'animate-logic-progress': !isHovered }"></div>
                        </div>
                        <p class="text-[11px] xl:text-[13px] text-gray-600 leading-relaxed italic animate-in fade-in slide-in-from-left-4 duration-500 line-clamp-3">
                            {{ step.desc }}
                        </p>
                    </div>
                </transition>
            </div>
        </div>
    </div>

    <div class="mt-4 xl:mt-6 pt-3 xl:pt-4 relative shrink-0">
        <div class="absolute top-0 left-0 w-16 h-[1px] bg-palace-red/40"></div>
        <div class="flex items-center gap-3">
            <span class="text-[9px] xl:text-[10px] font-mono text-palace-red animate-pulse">LIVE_SIM</span>
            <p class="text-[10px] xl:text-[12px] text-[#111] leading-relaxed italic opacity-80 font-serif line-clamp-1">
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

const startTimer = () => {
    timer = setInterval(() => {
        if (!isHovered.value) {
            activeStep.value = (activeStep.value + 1) % steps.length
        }
    }, 4000)
}

const handleMouseEnter = (index) => {
    activeStep.value = index
}

onMounted(() => startTimer())
onUnmounted(() => {
    if (timer) clearInterval(timer)
})
</script>

<style scoped>
.slide-up-enter-active { transition: all 0.5s ease-out; }
.slide-up-enter-from { opacity: 0; transform: translateY(10px); }

@keyframes logic-progress {
    from { width: 0; }
    to { width: 100%; }
}
.animate-logic-progress {
    animation: logic-progress 4s linear infinite;
}

/* 🏮 加入我们之前设定的优雅细滚动条 */
.custom-scrollbar::-webkit-scrollbar {
    width: 3px; 
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(155, 46, 46, 0); 
    border-radius: 4px;
    transition: background 0.3s ease;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background: rgba(155, 46, 46, 0.3); 
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(155, 46, 46, 0.6);
}
</style>