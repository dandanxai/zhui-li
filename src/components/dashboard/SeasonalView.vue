<template>
<div class="h-full w-full flex items-center justify-between font-serif text-[#111] overflow-hidden min-h-0">
    
    <div class="w-[60%] 2xl:w-3/5 h-full flex flex-col justify-center 2xl:justify-between pr-2 2xl:pr-4 relative group min-h-0 py-0.5 2xl:py-1">
        
        <p class="text-[9px] 2xl:text-[13px] leading-relaxed text-gray-600 italic border-l-2 border-palace-red/20 pl-2 2xl:pl-4 py-0.5 2xl:py-1 line-clamp-2 shrink-0">
            “雨生百谷，万物生长。此时日光温润，太和殿檐下光影层次分明。”
        </p>

        <div class="w-full h-8 2xl:h-16 relative mt-1.5 2xl:mt-4 overflow-hidden border border-palace-red/5 bg-white/40 shrink-0">
            <svg viewBox="0 0 100 20" class="w-full h-full opacity-20" preserveAspectRatio="none">
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

            <div class="absolute inset-y-0 w-8 2xl:w-12 bg-gradient-to-r from-transparent via-[#e6b422]/30 to-transparent blur-md animate-sun-scan"></div>
            
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 2xl:w-1.5 2xl:h-1.5 bg-palace-red rounded-full shadow-[0_0_4px_#9b2e2e]"></div>
        </div>

        <div class="flex justify-between items-center text-[7px] 2xl:text-[10px] tracking-widest text-gray-400 mt-auto 2xl:mt-2 font-mono uppercase border-t border-dashed border-gray-100 pt-1.5 2xl:pt-2 shrink-0">
            <span class="truncate">Sun_Altitude</span>
            <span class="text-palace-red font-bold ml-1">42.5°</span>
        </div>
    </div>

    <div class="w-[40%] 2xl:w-2/5 flex flex-col justify-center items-center border-l border-black/5 pl-1 2xl:pl-4 h-full relative min-h-0">
        <h2 class="text-2xl 2xl:text-5xl text-palace-red font-bold drop-shadow-sm transition-all duration-700 hover:scale-105 cursor-default leading-none" 
            style="writing-mode: vertical-rl; text-orientation: upright; font-family: 'Noto Serif SC', serif;">
            穀雨
        </h2>
        
        <span class="absolute right-0 2xl:-right-1 top-1/2 -translate-y-1/2 text-[6px] 2xl:text-[9px] tracking-[0.2em] 2xl:tracking-[0.5em] text-gray-300 font-mono rotate-180 opacity-70" 
                style="writing-mode: vertical-rl;">
            GU YU // SPRING
        </span>
        
        <div class="absolute bottom-1 2xl:bottom-2 left-1 2xl:left-4 text-[5px] 2xl:text-[8px] text-palace-red/40 border border-palace-red/20 px-1 py-0.5 truncate max-w-[80%]">二十四节气</div>
    </div>

</div>
</template>

<style scoped>
/* 引入外部书法字体 */
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