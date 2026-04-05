<template>
<div class="fixed inset-0 z-[2000] bg-[#f4f1ea] flex flex-col items-center justify-center overflow-hidden">
    <div class="relative w-48 h-48 flex items-end justify-center pb-10">
    <div class="absolute bottom-0 w-16 h-6 bg-palace-red animate-build-base"></div>
    <div class="absolute bottom-6 w-4 h-24 bg-[#333] origin-bottom animate-build-pillar"></div>
    <div class="absolute bottom-24 w-32 h-4 bg-palace-red animate-build-beam"></div>
    <div class="absolute bottom-28 flex gap-1">
        <div v-for="i in 5" :key="i" class="w-6 h-1 bg-[#111] opacity-0 animate-build-roof" :style="`animation-delay: ${0.8 + i*0.1}s`"></div>
    </div>
    </div>

    <div class="mt-8 flex flex-col items-center">
    <div class="text-xs font-serif tracking-[0.5em] text-[#111] font-bold animate-pulse">
        肆时营造 · 正在合龙
    </div>
    <div class="mt-2 w-32 h-[1px] bg-black/10 relative overflow-hidden">
        <div class="absolute inset-0 bg-palace-red animate-loading-bar"></div>
    </div>
    </div>

    <div class="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
    <span class="text-[30vw] font-black">筑</span>
    </div>
</div>
</template>

<style scoped>
/* 栌斗入场 */
@keyframes build-base {
0% { transform: scaleX(0); opacity: 0; }
100% { transform: scaleX(1); opacity: 1; }
}
/* 立柱升起 */
@keyframes build-pillar {
0% { transform: scaleY(0); }
30% { transform: scaleY(0); }
100% { transform: scaleY(1); }
}
/* 华拱入场 */
@keyframes build-beam {
0% { transform: translateY(20px) scaleX(0); opacity: 0; }
60% { transform: translateY(20px) scaleX(0); opacity: 0; }
100% { transform: translateY(0) scaleX(1); opacity: 1; }
}
/* 屋瓦铺设 */
@keyframes build-roof {
0% { transform: translateY(-10px); opacity: 0; }
100% { transform: translateY(0); opacity: 0.6; }
}
/* 进度条动画 */
@keyframes loading-bar {
0% { transform: translateX(-100%); }
100% { transform: translateX(100%); }
}

.animate-build-base { animation: build-base 0.6s ease forwards; }
.animate-build-pillar { animation: build-pillar 0.8s ease forwards; }
.animate-build-beam { animation: build-beam 0.5s ease forwards; }
.animate-build-roof { animation: build-roof 0.4s ease forwards; }
.animate-loading-bar { animation: loading-bar 1.5s infinite; }
</style>