<template>
    <div class="relative flex flex-col bg-white/40 backdrop-blur-md group overflow-hidden rounded-sm transition-all duration-500 hover:bg-white/60 hover:shadow-[0_4px_20px_-5px_rgba(155,46,46,0.1)]">
    
    <div class="absolute inset-0 border border-palace-red/10 pointer-events-none"></div>

    <div class="absolute top-0 left-0 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-palace-red/50 transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-palace-red"></div>
    <div class="absolute bottom-0 right-0 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-palace-red/50 transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-palace-red"></div>

    <div class="absolute top-0 right-4 w-1/3 h-[2px] bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#9b2e2e33_2px,#9b2e2e33_4px)]"></div>

    <div class="px-5 py-3 border-b border-palace-red/5 flex justify-between items-center bg-gradient-to-r from-palace-red/[0.03] to-transparent">
        <div class="flex items-center gap-3">
        <div class="w-[2px] h-3 bg-palace-red shadow-[0_0_5px_rgba(155,46,46,0.5)]"></div>
        <h4 class="text-[12px] font-serif tracking-[0.4em] text-[#111] uppercase">{{ title }}</h4>
        </div>
        <span class="text-[9px] font-mono italic text-palace-red/40 tracking-[0.2em]">{{ sub }}</span>
    </div>

    <div class="flex-1 p-5 overflow-hidden relative">
        <slot></slot>
    </div>
    </div>
</template>

<script setup>
defineProps(['title', 'sub'])
</script>