<template>
<div class="h-full w-full flex items-center justify-between py-6 px-4 font-serif relative overflow-hidden group cursor-pointer select-none bg-white/40"
    @click="handleStamp">
    
    <div class="relative w-32 h-32 flex items-center justify-center">
    <div class="absolute bottom-4 w-16 h-3 bg-black/15 blur-xl rounded-full scale-125"></div>
    
    <div class="relative w-20 h-20 bg-palace-red shadow-[4px_4px_0px_rgba(155,46,46,0.2)] transition-all duration-300"
        :class="isPressing ? 'scale-90 shadow-none' : 'scale-100'">
        
        <div class="absolute inset-1 border-[1.5px] border-white/80"></div>

        <div class="absolute inset-0 p-1.5 grid grid-cols-2 grid-rows-2 text-white font-bold text-center backface-hidden"
            style="
            line-height: 1;
            font-family: 'Noto Serif SC', serif;
            font-size: 26px;
            /* 核心修正：利用 Grid 自带的排版顺序控制文字 */
            ">
        <span class="grid place-content-center">筑</span>
        <span class="grid place-content-center">理</span>
        <span class="grid place-content-center">天</span>
        <span class="grid place-content-center">枢</span>
        </div>
    </div>

    <div v-if="showRipple" class="absolute inset-0 flex items-center justify-center">
        <div class="w-20 h-20 border-2 border-palace-red animate-seal-ripple"></div>
    </div>
    </div>

    <div class="flex-1 flex flex-col pl-10 border-l-2 border-palace-red/10 h-[90%] py-1">
    <div class="flex items-center gap-3 mb-5">
        <div class="w-1.5 h-6 bg-palace-red shadow-[0_0_8px_rgba(155,46,46,0.4)]"></div>
        <span class="text-xl font-bold text-[#111] tracking-[0.2em]">数字印记签发</span>
    </div>

    <div class="flex-grow flex flex-col gap-5">
        <div class="flex flex-col gap-2 bg-[#fcfaf5] p-3 border border-palace-red/5 shadow-inner">
        <div class="flex justify-between items-center opacity-40">
            <span class="text-[9px] font-mono uppercase tracking-widest">Authentication_Hash</span>
        </div>
        <span class="text-sm font-mono text-palace-red font-bold break-all leading-tight">
            {{ currentHash }}
        </span>
        </div>
    </div>

    <div class="flex justify-between items-end pr-4 text-[10px] font-mono border-t border-dashed border-gray-100 pt-3 mt-4 h-10 overflow-hidden">
        <div class="flex flex-col">
        <span class="text-gray-400 uppercase mb-0.5">Signed_At</span>
        <span class="text-gray-800 font-bold tracking-wider">{{ signDate }}</span>
        </div>
        <div class="flex flex-col items-end">
        <span class="text-gray-400 uppercase mb-0.5">Status</span>
        <span class="text-green-600 font-bold flex items-center gap-1.5 italic">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></span>
            VERIFIED
        </span>
        </div>
    </div>
    </div>

    <div v-if="isPressing" class="absolute inset-0 z-50 bg-palace-red/5 animate-flash pointer-events-none"></div>
</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentHash = ref('0x' + Math.random().toString(16).slice(2, 18).toUpperCase())
const signDate = ref('')
const isPressing = ref(false)
const showRipple = ref(false)
let timer = null

const updateTime = () => {
const now = new Date()
// 简化时间显示，减少水平空间占用
signDate.value = String(now.getHours()).padStart(2, '0') + ':' + 
                String(now.getMinutes()).padStart(2, '0') + ':' + 
                String(now.getSeconds()).padStart(2, '0')
}

const handleStamp = () => {
if (isPressing.value) return
isPressing.value = true
showRipple.value = true
setTimeout(() => {
    currentHash.value = '0x' + Math.random().toString(16).slice(2, 18).toUpperCase()
    isPressing.value = false
}, 200)
setTimeout(() => showRipple.value = false, 800)
}

onMounted(() => {
updateTime()
timer = setInterval(updateTime, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
/* 强制 Grid 对齐 */
.display-grid { display: grid; }
.place-content-center { place-content: center; }
.perspective-1000 { perspective: 1000px; }

@keyframes seal-ripple {
0% { transform: scale(1); opacity: 0.8; }
100% { transform: scale(2); opacity: 0; }
}
.animate-seal-ripple {
animation: seal-ripple 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

@keyframes flash {
0% { opacity: 0; }
50% { opacity: 1; }
100% { opacity: 0; }
}
.animate-flash {
animation: flash 0.3s ease-out;
}
</style>