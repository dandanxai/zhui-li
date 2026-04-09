<template>
<div class="h-screen w-screen bg-[#fcfaf5] text-[#2c2c2c] overflow-hidden flex flex-col font-serif relative selection:bg-palace-red selection:text-white">
    
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 40px 40px;"></div>

    <header class="h-24 flex items-center justify-between px-12 relative z-30 bg-white/60 backdrop-blur-xl border-b-[3px] border-double border-palace-red/20 shadow-[0_4px_30px_rgba(155,46,46,0.03)] overflow-hidden">
    
    <div class="absolute inset-0 opacity-[0.04] pointer-events-none select-none mix-blend-multiply" 
        style="background-image: url('https://www.transparenttextures.com/patterns/natural-paper.png');"></div>
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-full bg-gradient-to-b from-palace-red/[0.03] to-transparent pointer-events-none"></div>

    <div class="w-1/3 flex items-center gap-8 relative">
        <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-palace-red animate-pulse rounded-full shadow-[0_0_8px_#9b2e2e]"></span>
            <span class="text-[11px] font-mono tracking-[0.4em] text-[#111] font-bold uppercase">Archive_System</span>
        </div>
        <div class="flex items-center gap-4 text-[9px] font-mono text-gray-400 tracking-tighter italic">
            <span>LOC: 39.916N / 116.390E</span>
            <span class="border-l border-gray-200 pl-4 uppercase">Node_Active</span>
        </div>
        </div>
        <div class="h-8 w-[1px] bg-gradient-to-b from-transparent via-palace-red/20 to-transparent"></div>
    </div>

    <div class="flex-1 text-center relative group cursor-default">
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="w-64 h-16 bg-palace-red/[0.02] blur-2xl rounded-full scale-x-150"></div>
        </div>
        
        <div class="relative inline-block w-full max-w-full overflow-hidden">
            <h1 class="text-3xl md:text-4xl lg:text-5xl 
                    tracking-[0.6em] md:tracking-[0.8em] lg:tracking-[1.2em] 
                    text-[#1a1a1a] font-black font-serif 
                    ml-[0.6em] md:ml-[0.8em] lg:ml-[1.2em]
                    whitespace-nowrap
                    transition-all duration-700 
                    hover:tracking-[1.3em]">
                营造<span class="text-palace-red relative">·天枢
                    <span class="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-palace-red to-transparent opacity-40 scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></span>
                </span>
            </h1>
            
            <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap 
                        text-[6px] md:text-[8px] 
                        tracking-[0.4em] md:tracking-[0.8em] 
                        text-gray-400 uppercase font-mono opacity-60">
                Ancient Architecture Digital Twin System
            </div>
        </div>
    </div>

    <div class="w-1/3 flex justify-end items-center gap-10">
        <div class="hidden lg:flex items-end gap-[3px] h-6 mb-1 opacity-40">
        <div v-for="n in 8" :key="n" 
            class="w-[1.5px] bg-palace-red transition-all duration-300"
            :style="{ height: (20 + Math.random() * 80) + '%' }"></div>
        </div>
        
        <div class="text-right flex flex-col gap-1.5 border-r-2 border-palace-red/20 pr-6">
        <span class="text-[10px] tracking-[0.3em] text-palace-red font-black uppercase italic">Live_Heritage</span>
        <span class="font-mono text-xl text-gray-800 font-bold tabular-nums tracking-tighter">{{ currentTime }}</span>
        </div>
        
        <div class="flex flex-col gap-1 group cursor-pointer">
        <div v-for="i in 3" :key="i" class="w-1 h-1 bg-palace-red/30 rounded-full group-hover:bg-palace-red transition-colors"></div>
        </div>
    </div>

    <div class="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-palace-red/40 to-transparent animate-header-scan"></div>
    </header>

    <div class="flex-1 flex gap-4 xl:gap-6 p-4 xl:p-6 relative z-10 overflow-hidden min-h-0">
    
        <aside class="w-[260px] lg:w-[22%] xl:w-[24%] shrink-0 flex flex-col gap-4 xl:gap-6 min-h-0">
            <DashboardBox title="CHRONICLE" sub="营造漫谈" class="flex-[5] min-h-[200px]">
                <ScrollLog class="h-full overflow-y-auto custom-scrollbar pr-1" />
            </DashboardBox>
            <DashboardBox title="SEASONAL" sub="四时意象" class="flex-[3] min-h-[140px]">
                <SeasonalView class="h-full overflow-y-auto custom-scrollbar pr-1" />
            </DashboardBox>
            <DashboardBox title="PALETTE" sub="寻味中国" class="flex-[2] min-h-[120px]">
                <PaletteBox class="h-full overflow-y-auto custom-scrollbar pr-1" />
            </DashboardBox>
        </aside>

        <main class="flex-1 flex flex-col gap-4 xl:gap-6 min-w-[400px] min-h-0">
            <div class="flex-1 bg-white border border-palace-red/5 rounded-sm relative shadow-sm overflow-hidden min-h-[300px]">
                
                <div class="absolute top-4 right-4 xl:top-6 xl:right-6 z-30 flex bg-[#fcfaf5]/90 p-1 border border-palace-red/10 shadow-sm backdrop-blur-md">
                    <button @click="viewMode = 'models'" :class="viewMode === 'models' ? 'bg-palace-red text-white' : 'text-gray-400'" class="px-4 py-1.5 xl:px-6 xl:py-1.5 text-[10px] tracking-[0.2em] transition-all">数字孪生</button>
                    <button @click="viewMode = 'map'" :class="viewMode === 'map' ? 'bg-palace-red text-white' : 'text-gray-400'" class="px-4 py-1.5 xl:px-6 xl:py-1.5 text-[10px] tracking-[0.2em] transition-all">寻古舆图</button>
                    <button @click="viewMode = '3d'" :class="viewMode === '3d' ? 'bg-palace-red text-white' : 'text-gray-400'" class="px-4 py-1.5 xl:px-6 xl:py-1.5 text-[10px] tracking-[0.2em] transition-all">营造解构</button>
                </div>
                
                <transition name="fade-scale" mode="out-in">
                    <component :is="viewMode === 'map' ? MapView : (viewMode === 'models' ? ModelDirectoryView : ThreeDView)" class="w-full h-full" />
                </transition>
            </div>
            
            <div class="h-auto min-h-[120px] xl:h-40 bg-white border border-palace-red/5 rounded-sm p-4 xl:p-6 shadow-sm flex flex-col justify-center">
                <QuoteBox />
            </div>
        </main>

        <aside class="w-[260px] lg:w-[22%] xl:w-[24%] shrink-0 flex flex-col gap-4 xl:gap-6 min-h-0">
            <DashboardBox title="STRUCTURE" sub="构造挑战" class="flex-[5] min-h-[200px]">
                <StructureChallenge class="h-full overflow-y-auto custom-scrollbar pr-1" />
            </DashboardBox>
            <DashboardBox title="SOCIAL" sub="云端共赏" class="flex-[3] min-h-[140px]">
                <SocialFootprint class="h-full overflow-y-auto custom-scrollbar pr-1" />
            </DashboardBox>
            <DashboardBox title="SEAL" sub="数字朱印" class="flex-[2] min-h-[120px]">
                <DigitalSeal class="h-full overflow-y-auto custom-scrollbar pr-1" />
            </DashboardBox>
        </aside>

    </div>

    <footer class="h-12 border-t border-palace-red/10 flex items-center justify-between px-10 relative z-20 bg-white/30 backdrop-blur-sm overflow-hidden shrink-0">
    
        <div class="flex items-center gap-6 text-[10px] font-mono tracking-widest text-gray-500">
            <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-palace-red/40 rounded-full animate-pulse"></span>
                <span class="opacity-60 uppercase">Unit:</span>
                <span class="text-palace-red/80 font-bold">Imperial_Measurement</span>
            </div>
            <div class="hidden md:flex items-center gap-2 border-l border-palace-red/10 pl-6">
                <span class="opacity-60 uppercase">Coord:</span>
                <span class="text-gray-800 tracking-tighter">39.916N / 116.390E</span>
            </div>
        </div>

        <div class="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
            <div class="h-[1px] w-8 bg-gradient-to-r from-transparent to-palace-red/20"></div>
            <span class="text-[12px] md:text-[13px] font-serif text-[#1a1a1a] tracking-[0.4em] font-bold italic">
                传承数字化 <span class="mx-1 text-palace-red/40">·</span> 赋予古建筑第二次生命
            </span>
            <div class="h-[1px] w-8 bg-gradient-to-l from-transparent to-palace-red/20"></div>
        </div>

        <div class="flex items-center gap-6 text-[10px] font-mono">
            <div class="flex flex-col items-end leading-none gap-1">
                <span class="text-palace-red font-bold tracking-tighter">V2.7.0_STABLE</span>
                <span class="text-[8px] text-gray-400 uppercase tracking-widest opacity-60">System_Archive_Core</span>
            </div>
            <div class="hidden lg:flex gap-[2px] items-end h-4 opacity-30">
                <div v-for="n in 6" :key="n" 
                    class="w-[1.5px] bg-palace-red" 
                    :style="{ height: (n * 20) + '%' }">
                </div>
            </div>
        </div>

        <div class="absolute bottom-0 left-0 w-full h-[2px] bg-palace-red/5"></div>
    </footer>
</div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import DashboardBox from '../components/dashboard/DashboardBox.vue'
import ScrollLog from '../components/dashboard/ScrollLog.vue'
import SeasonalView from '../components/dashboard/SeasonalView.vue'
import PaletteBox from '../components/dashboard/PaletteBox.vue'
import QuoteBox from '../components/dashboard/QuoteBox.vue'
import StructureChallenge from '../components/dashboard/StructureChallenge.vue'
import SocialFootprint from '../components/dashboard/SocialFootprint.vue'
import DigitalSeal from '../components/dashboard/DigitalSeal.vue'

const MapView = defineAsyncComponent(() => import('../components/dashboard/MapView.vue'))
const ThreeDView = defineAsyncComponent(() => import('../components/dashboard/ThreeDView.vue'))
const ModelDirectoryView = defineAsyncComponent(() => import('../components/dashboard/ModelDirectoryView.vue'))

const viewMode = ref('models')
const currentTime = ref('')

onMounted(() => {
setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString('zh-CN', { hour12: false })
}, 1000)
})
</script>

<style scoped>
.fade-scale-enter-active, .fade-scale-leave-active { transition: all 0.5s ease; }
.fade-scale-enter-from { opacity: 0; transform: scale(1.02); }
.fade-scale-leave-to { opacity: 0; transform: scale(0.98); }

/* 🏮 新增：极简东方美学隐藏式滚动条 */
:deep(.custom-scrollbar::-webkit-scrollbar) {
    width: 3px; 
}
:deep(.custom-scrollbar::-webkit-scrollbar-track) {
    background: transparent;
}
:deep(.custom-scrollbar::-webkit-scrollbar-thumb) {
    background: rgba(155, 46, 46, 0); 
    border-radius: 4px;
    transition: background 0.3s ease;
}
:deep(.custom-scrollbar:hover::-webkit-scrollbar-thumb) {
    background: rgba(155, 46, 46, 0.3); 
}
:deep(.custom-scrollbar::-webkit-scrollbar-thumb:hover) {
    background: rgba(155, 46, 46, 0.6);
}
</style>