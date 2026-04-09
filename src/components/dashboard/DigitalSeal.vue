<template>
<div class="h-full w-full overflow-y-auto custom-scrollbar relative group cursor-pointer select-none" @click="handleStamp">
    
    <div class="flex flex-row items-start p-1 xl:p-2">
        
        <div class="relative shrink-0 w-14 h-14 flex items-center justify-center mt-0.5">
            <div class="absolute bottom-1 w-10 h-1.5 bg-black/15 blur-[2px] rounded-full scale-125"></div>
            
            <div class="relative w-10 h-10 bg-palace-red shadow-[1px_1px_0px_rgba(155,46,46,0.2)] transition-all duration-300"
                :class="isPressing ? 'scale-90 shadow-none' : 'scale-100'">
                
                <div class="absolute inset-[1px] border-[1px] border-white/80"></div>
                
                <div class="absolute inset-0 p-0.5 grid grid-cols-2 grid-rows-2 text-white font-bold text-center backface-hidden text-[10px]"
                    style="line-height: 1; font-family: 'Noto Serif SC', serif;">
                    <span class="grid place-content-center">筑</span>
                    <span class="grid place-content-center">理</span>
                    <span class="grid place-content-center">天</span>
                    <span class="grid place-content-center">枢</span>
                </div>
            </div>
            
            <div v-if="showRipple" class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div class="w-10 h-10 border border-palace-red animate-seal-ripple rounded-sm"></div>
            </div>
        </div>

        <div class="flex-1 min-w-0 flex flex-col border-l border-palace-red/10 pl-2 ml-2">
            
            <div class="flex items-center gap-1.5 mb-1 mt-0.5">
                <div class="w-1 h-2.5 bg-palace-red"></div>
                <span class="text-[11px] font-bold text-[#111] tracking-widest truncate leading-none">数字印记</span>
            </div>

            <div class="bg-[#fcfaf5] p-1 border border-palace-red/5 shadow-inner">
                <div class="text-[7px] text-gray-400 uppercase mb-0.5 leading-none">Auth_Hash</div>
                <span class="text-[9px] font-mono text-palace-red font-bold truncate block leading-none">
                    {{ currentHash }}
                </span>
            </div>

            <div class="flex justify-between items-center mt-1 pt-1 border-t border-dashed border-gray-100">
                <span class="text-[8px] text-gray-800 font-bold truncate leading-none">{{ signDate }}</span>
                <span class="text-[8px] text-green-600 font-bold flex items-center gap-1 italic leading-none">
                    <span class="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                    VALID
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
.display-grid { display: grid; }
.place-content-center { place-content: center; }

@keyframes seal-ripple {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.6); opacity: 0; }
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

/* 隐藏式滚动条，不占用宽度空间 */
.custom-scrollbar::-webkit-scrollbar {
    width: 2px; 
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
    background: rgba(155, 46, 46, 0.4); 
}
</style>