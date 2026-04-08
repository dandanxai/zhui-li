<template>
<div class="fixed inset-0 z-[2000] bg-[#fcfaf5] flex flex-col items-center justify-center overflow-hidden">
    
    <div class="absolute inset-0 opacity-[0.02] pointer-events-none select-none flex items-center justify-center mix-blend-multiply">
        <span class="text-[40vw] font-black font-serif writing-vertical-rl tracking-widest">考工</span>
    </div>

    <div class="relative w-64 h-64 flex items-center justify-center">
        <div class="absolute inset-0 border-[1px] border-[#111]/10 rounded-full animate-[spin_12s_linear_infinite]"></div>
        <div class="absolute inset-3 border border-dashed border-palace-red/40 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
        <div class="absolute inset-8 border-[1px] border-[#111]/5 rounded-full"></div>

        <svg viewBox="0 0 100 100" class="w-28 h-28 relative z-10 text-[#111]">
            <g class="svg-draw-lines" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5,40 Q50,15 95,40" class="path-1" />
                <path d="M15,40 L85,40" class="path-2" />
                <path d="M25,40 V50 M40,40 V50 M60,40 V50 M75,40 V50" class="path-3" />
                <path d="M20,50 H80" class="path-4" />
                <path d="M30,50 V80 M70,50 V80" stroke-width="2" class="path-5" />
                <path d="M45,50 V80 M55,50 V80" stroke-width="1" class="path-6" />
                <path d="M15,80 H85" stroke-width="2" class="path-7" />
                <path d="M20,85 H80" class="path-8" />
                <path d="M25,90 H75" class="path-9" />
            </g>
            <circle cx="50" cy="50" r="3" fill="#9b2e2e" class="animate-pulse" />
        </svg>

        <div class="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
            <div class="w-full h-1/2 bg-gradient-to-b from-transparent via-palace-red/10 to-transparent animate-scan-line"></div>
        </div>
    </div>

    <div class="mt-12 flex flex-col items-center relative z-10">
        <div class="text-sm font-serif tracking-[0.8em] text-[#111] font-bold ml-[0.8em] flex items-center gap-4">
            <span class="w-1.5 h-1.5 bg-palace-red rounded-full animate-ping"></span>
            系统组装中
        </div>
        <p class="mt-4 text-[10px] tracking-widest text-gray-400 font-mono uppercase">
            Digitizing Ancient Architecture ...
        </p>

        <div class="mt-8 w-48 h-[1px] bg-black/10 relative overflow-hidden">
            <div class="absolute inset-y-0 left-0 bg-palace-red w-full origin-left animate-progress-bar"></div>
        </div>
    </div>
</div>
</template>

<style scoped>
/* 竖排文字 */
.writing-vertical-rl {
    writing-mode: vertical-rl;
}

/* 🏮 SVG 魔法：让线条自动一笔一画描绘出来的核心逻辑 */
.svg-draw-lines path {
    stroke-dasharray: 200;
    stroke-dashoffset: 200;
    animation: drawLine 2s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
}

/* 错开每根线条的描绘时间，产生“搭建”的层次感 */
.path-1 { animation-delay: 0.0s !important; }
.path-2 { animation-delay: 0.2s !important; }
.path-3 { animation-delay: 0.4s !important; }
.path-4 { animation-delay: 0.6s !important; }
.path-5 { animation-delay: 0.8s !important; }
.path-6 { animation-delay: 1.0s !important; }
.path-7 { animation-delay: 1.2s !important; }
.path-8 { animation-delay: 1.4s !important; }
.path-9 { animation-delay: 1.6s !important; }

@keyframes drawLine {
    0% { stroke-dashoffset: 200; }
    100% { stroke-dashoffset: 0; }
}

/* 全息扫描光效 */
@keyframes scan-line {
    0% { transform: translateY(-100%); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(200%); opacity: 0; }
}
.animate-scan-line {
    animation: scan-line 2.5s linear infinite;
}

/* 数据拉取进度条 */
@keyframes progress-bar {
    0% { transform: scaleX(0); opacity: 1; }
    80% { transform: scaleX(1); opacity: 1; }
    100% { transform: scaleX(1); opacity: 0; }
}
.animate-progress-bar {
    animation: progress-bar 2s ease-in-out infinite;
}
</style>