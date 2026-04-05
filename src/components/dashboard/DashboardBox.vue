<template>
<div class="relative flex flex-col bg-[#fdfcf8] group overflow-hidden border border-palace-red/10 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(155,46,46,0.05)] hover:-translate-y-1">
    
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
        style="background-image: url('https://www.transparenttextures.com/patterns/paper.png');"></div>

    <div class="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-palace-red/20 group-hover:border-palace-red transition-colors duration-500"></div>
    <div class="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-palace-red/5"></div>
    <div class="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-palace-red/5"></div>
    <div class="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-palace-red/20 group-hover:border-palace-red transition-colors duration-500"></div>

    <div class="absolute top-0 right-10 w-24 h-[2px] bg-gradient-to-r from-transparent via-palace-red/10 to-transparent">
    <div class="absolute inset-0 animate-scan-line"></div>
    </div>

    <div class="relative px-5 py-3 border-b border-palace-red/5 bg-gradient-to-r from-palace-red/[0.03] to-transparent flex justify-between items-center overflow-hidden">
    <div class="absolute -left-2 top-0 bottom-0 w-12 bg-palace-red/5 skew-x-[-20deg] group-hover:w-24 transition-all duration-700"></div>
    
    <div class="relative z-10 flex items-center gap-3">
        <div class="w-1 h-4 bg-palace-red shadow-[1px_0_4px_rgba(155,46,46,0.3)]"></div>
        <div class="flex flex-col leading-none">
        <h4 class="text-[13px] font-serif tracking-[0.3em] text-[#111] uppercase font-black">{{ title }}</h4>
        <span class="text-[8px] font-mono mt-1 text-palace-red/40 tracking-[0.4em]">{{ sub }}</span>
        </div>
    </div>
    
    <div class="flex gap-1 items-center">
        <div class="w-1 h-1 bg-palace-red/20 rounded-full"></div>
        <div class="w-1 h-1 bg-palace-red/40 rounded-full animate-pulse"></div>
    </div>
    </div>

    <div class="flex-1 p-5 relative z-10">
    <slot></slot>
    </div>

    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-palace-red/10 to-transparent"></div>
</div>
</template>

<script setup>
defineProps(['title', 'sub'])
</script>

<style scoped>
@keyframes scan-line {
0% { transform: translateX(-100%); opacity: 0; }
50% { opacity: 1; }
100% { transform: translateX(100%); opacity: 0; }
}
.animate-scan-line {
width: 30%;
height: 100%;
background: linear-gradient(90deg, transparent, #9b2e2e, transparent);
animation: scan-line 3s linear infinite;
}
</style>