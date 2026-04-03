<template>
    <div class="h-screen w-screen bg-[#fcfaf5] text-[#2c2c2c] overflow-hidden flex flex-col font-serif relative">
    
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
    <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-palace-red/5 rounded-full blur-[100px]"></div>

    <header class="h-20 flex items-center justify-between px-10 border-b border-palace-red/10 relative z-20 bg-[#fcfaf5]/60 backdrop-blur-sm">
        <div class="w-1/3 flex items-center gap-4 text-[10px] tracking-[0.4em] text-gray-400">
        <span class="w-10 h-[1px] bg-palace-red/40"></span> 
        DIGITAL_CHINESE_ESTHETICS
        </div>
        
        <div class="w-1/3 text-center">
        <h1 class="text-4xl tracking-[1.5em] text-[#1a1a1a] drop-shadow-sm ml-[1.5em]">
            营造<span class="text-palace-red font-bold">·</span>天枢
        </h1>
        </div>

        <div class="w-1/3 flex justify-end items-center gap-6">
        <div class="text-right flex flex-col">
            <span class="text-[9px] tracking-widest text-palace-red/60 uppercase">System_Active</span>
            <span class="font-mono text-xs">{{ currentTime }}</span>
        </div>
        <div class="w-10 h-10 border border-palace-red/20 rounded-full relative animate-spin-slow">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-palace-red rounded-full"></div>
        </div>
        </div>
    </header>

    <div class="flex-1 flex gap-6 p-6 relative z-10 overflow-hidden">
        
        <aside class="w-[25%] flex flex-col gap-6">
        <DashboardBox title="ARCHIVE_CHRONICLE" sub="营造漫谈" class="flex-1 overflow-hidden">
            <ScrollLog />
        </DashboardBox>
        <DashboardBox title="SEASONAL_ATMOSPHERE" sub="四时意象" class="h-[28%]">
            <HealthStats />
        </DashboardBox>
        <DashboardBox title="COLOR_PALETTE" sub="大木取色" class="h-[28%]">
            <KnowledgeGraph />
        </DashboardBox>
        </aside>

        <main class="flex-1 flex flex-col gap-6 relative">
        <div class="flex-1 bg-white border border-palace-red/5 rounded-sm relative overflow-hidden group shadow-sm">
            <div class="absolute top-6 right-6 z-30 flex bg-[#fcfaf5] p-1 border border-palace-red/10 shadow-sm">
            <button @click="viewMode = 'map'" :class="viewMode === 'map' ? 'bg-palace-red text-white' : 'text-gray-400'" class="px-6 py-1.5 text-[10px] tracking-[0.2em] transition-all">寻古舆图</button>
            <button @click="viewMode = '3d'" :class="viewMode === '3d' ? 'bg-palace-red text-white' : 'text-gray-400'" class="px-6 py-1.5 text-[10px] tracking-[0.2em] transition-all">营造解构</button>
            </div>
            
            <transition name="fade-scale" mode="out-in">
            <component :is="viewMode === 'map' ? MapView : ThreeDView" />
            </transition>
        </div>

        <div class="h-40 bg-white border border-palace-red/5 rounded-sm p-6 relative shadow-sm">
            <RuleComparator />
        </div>
        </main>

        <aside class="w-[25%] flex flex-col gap-6">
        <DashboardBox title="STRUCTURAL_CHALLENGE" sub="营造挑战" class="flex-1">
            <RadarChart />
        </DashboardBox>
        <DashboardBox title="GLOBAL_VISITORS" sub="云端共赏" class="h-[28%]">
            <TrendChart />
        </DashboardBox>
        <DashboardBox title="DIGITAL_SEAL" sub="数字朱印" class="h-[28%]">
            <DigitalFingerprint />
        </DashboardBox>
        </aside>

    </div>

    <footer class="h-10 border-t border-palace-red/10 flex items-center justify-between px-10 text-[9px] tracking-widest text-gray-400 uppercase">
        <span>Unit: Imperial_Measurement</span>
        <span class="opacity-30">传承数字化 · 赋予古建筑第二次生命</span>
        <span>V2.6.0 Stable</span>
    </footer>
    </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import DashboardBox from '../components/dashboard/DashboardBox.vue'
import ScrollLog from '../components/dashboard/ScrollLog.vue'
import RuleComparator from '../components/dashboard/RuleComparator.vue'
import HealthStats from '../components/dashboard/HealthStats.vue'
import KnowledgeGraph from '../components/dashboard/KnowledgeGraph.vue'
import RadarChart from '../components/dashboard/RadarChart.vue'
import TrendChart from '../components/dashboard/TrendChart.vue'
import DigitalFingerprint from '../components/dashboard/DigitalFingerprint.vue'

const MapView = defineAsyncComponent(() => import('../components/dashboard/MapView.vue'))
const ThreeDView = defineAsyncComponent(() => import('../components/dashboard/ThreeDView.vue'))

const viewMode = ref('map')
const currentTime = ref('')

onMounted(() => {
    setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString('zh-CN', { hour12: false })
    }, 1000)
})
</script>

<style scoped>
.fade-scale-enter-active, .fade-scale-leave-active { transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
.fade-scale-enter-from { opacity: 0; transform: scale(1.02); }
.fade-scale-leave-to { opacity: 0; transform: scale(0.98); }

.animate-spin-slow { animation: spin 20s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>