<template>
<div class="h-full w-full flex items-center justify-between py-1 font-serif text-[#111]">
    
    <div class="w-3/5 h-full flex flex-col justify-between pr-4 relative group">
    <p class="text-[13px] leading-relaxed text-gray-600 italic border-l-2 border-palace-red/20 pl-4 py-1">
        “雨生百谷，万物生长。此时日光温润，太和殿檐下光影层次分明。”
    </p>

    <div class="w-full h-16 relative mt-4 overflow-hidden border border-palace-red/5 bg-white/40">
        <svg viewBox="0 0 100 20" class="w-full h-full opacity-20">
        <defs>
            <linearGradient id="tickGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#9b2e2e" stop-opacity="0" />
            <stop offset="50%" stop-color="#9b2e2e" stop-opacity="1" />
            <stop offset="100%" stop-color="#9b2e2e" stop-opacity="0" />
            </linearGradient>
        </defs>
        <line v-for="i in 21" :key="i" 
                :x1="(i-1)*5" y1="0" :x2="(i-1)*5" y2="20" 
                :stroke="i === 11 ? '#9b2e2e' : 'url(#tickGradient)'" 
                :stroke-width="i === 11 ? 0.5 : 0.2" />
        <line x1="0" y1="10" x2="100" y2="10" stroke="#9b2e2e" stroke-width="0.1" />
        </svg>

        <div class="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-[#e6b422]/30 to-transparent blur-md animate-sun-scan"></div>
        
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-palace-red rounded-full shadow-[0_0_6px_#9b2e2e]"></div>
    </div>

    <div class="flex justify-between items-center text-[10px] tracking-widest text-gray-400 mt-2 font-mono uppercase border-t border-dashed border-gray-100 pt-2">
        <span>Sun_Altitude / 日高</span>
        <span class="text-palace-red font-bold">42.5°</span>
    </div>
    </div>

    <div class="w-2/5 flex flex-col justify-center items-center border-l border-black/5 pl-4 h-full relative">
    <h2 class="text-5xl text-palace-red font-bold drop-shadow-sm transition-all duration-700 hover:scale-105 cursor-default" 
        style="writing-mode: vertical-rl; text-orientation: upright; font-family: 'Noto Serif SC', serif;">
        穀雨
    </h2>
    <span class="absolute -right-1 top-1/2 -translate-y-1/2 text-[9px] tracking-[0.5em] text-gray-300 font-mono rotate-180 opacity-70" 
            style="writing-mode: vertical-rl;">
        GU YU // SPRING
    </span>
    <div class="absolute bottom-2 left-4 text-[8px] text-palace-red/40 border border-palace-red/20 px-1 py-0.5">二十四节气</div>
    </div>

</div>
</template>

<style scoped>
/* 引入外部书法字体（如果项目未配置，需在 index.html 引入 Noto Serif SC） */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@700&display=swap');

/* 光影扫描动画 */
@keyframes sun-scan {
0% { left: -20%; opacity: 0; }
20% { opacity: 1; }
80% { opacity: 1; }
100% { left: 100%; opacity: 0; }
}

.animate-sun-scan {
animation: sun-scan 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
</style>