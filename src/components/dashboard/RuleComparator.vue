<template>
    <div class="h-full w-full flex flex-col justify-between py-1">
    <div class="flex justify-between items-end border-b border-palace-red/10 pb-3">
        <h5 class="text-xs font-serif font-bold tracking-[0.5em] text-[#111]">规制考究 <span class="font-mono text-[9px] text-gray-400 font-normal">// SPEC_COMPARISON</span></h5>
        <span class="text-[9px] text-palace-red font-mono animate-pulse tracking-widest bg-palace-red/5 px-2 py-0.5 border border-palace-red/10">ANALYZING...</span>
    </div>
    
    <div class="grid grid-cols-4 gap-10 mt-4">
        <div v-for="i in metrics" :key="i.label" class="space-y-3 group">
        <div class="text-[10px] text-gray-500 tracking-widest font-serif">{{ i.label }}</div>
        <div class="flex items-baseline gap-1">
            <span class="text-3xl font-serif font-bold text-[#111] group-hover:text-palace-red transition-colors">{{ i.val }}</span>
            <span class="text-[10px] text-palace-red/60 font-mono">%</span>
        </div>
        <div class="h-2 w-full bg-gray-100 relative rounded-sm overflow-hidden shadow-inner">
            <div class="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(0,0,0,0.05)_4px,rgba(0,0,0,0.05)_5px)]"></div>
            <div class="absolute inset-y-0 left-0 bg-gradient-to-r from-palace-red/40 to-palace-red transition-all duration-1000 ease-out" :style="{width: i.val+'%'}"></div>
        </div>
        </div>
    </div>
    </div>
</template>
<script setup>
const metrics = [
    {label:'材份模数', en:'Modular', val: 98.4},
    {label:'铺作比例', en:'Structure', val: 92.1},
    {label:'举折曲线', en:'Curve', val: 95.7},
    {label:'面阔进深', en:'Dimension', val: 99.1}
]
</script>