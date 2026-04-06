<template>
<div class="fixed inset-0 z-[2000] bg-[#fcfaf5] flex flex-col items-center justify-center overflow-hidden font-serif selection:none">
    
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none" 
         style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 30px 30px;"></div>
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span class="text-[40vw] font-black text-black/[0.02] animate-water-ink">筑</span>
    </div>

    <div class="relative w-64 h-64 flex items-center justify-center z-10">
        <div class="absolute w-1.5 h-32 bg-[#111] animate-pillar-grow"></div>
        
        <div class="absolute w-40 h-1 bg-palace-red opacity-0 animate-joint-slide-1 top-[45%]"></div>
        <div class="absolute w-24 h-1 bg-[#111] opacity-0 animate-joint-slide-2 top-[35%]"></div>
        <div class="absolute w-56 h-1 bg-palace-red opacity-0 animate-joint-slide-3 top-[25%]"></div>

        <div class="absolute w-full h-[1px] bg-black/5 scale-x-0 animate-line-expand"></div>
    </div>

    <div class="mt-12 flex flex-col items-center reveal-up">
        <div class="flex items-center gap-4 mb-4">
            <div class="w-8 h-[1px] bg-palace-red/30"></div>
            <div class="text-[11px] tracking-[0.8em] text-[#111] font-black uppercase">
                肆时营造 · 正在合龙
            </div>
            <div class="w-8 h-[1px] bg-palace-red/30"></div>
        </div>
        
        <div class="w-48 h-[2px] bg-black/5 relative overflow-hidden">
            <div class="absolute inset-y-0 left-0 bg-palace-red animate-loading-stripes" style="width: 100%"></div>
        </div>
        
        <p class="mt-4 font-mono text-[9px] text-gray-400 tracking-widest uppercase">
            System_Loading // ARCHIVE_Constructing
        </p>
    </div>
</div>
</template>

<style scoped>
/* 1. 立柱垂直生长：时长增加到 1.5s */
@keyframes pillar-grow {
    0% { transform: scaleY(0); opacity: 0; }
    10% { transform: scaleY(0); opacity: 1; }
    100% { transform: scaleY(1); opacity: 1; }
}

/* 2. 榫卯对位：时长增加到 1.2s，增加模糊渐变感 */
@keyframes joint-slide {
    0% { transform: scaleX(1.8); opacity: 0; filter: blur(15px); }
    100% { transform: scaleX(1); opacity: 1; filter: blur(0); }
}

/* 3. 辅助线展开：时长增加到 2s */
@keyframes line-expand {
    0% { transform: scaleX(0); opacity: 0; }
    100% { transform: scaleX(1); opacity: 1; }
}

/* 4. 水墨背景呼吸：极慢节奏 */
@keyframes water-ink {
    0%, 100% { transform: scale(1); opacity: 0.02; }
    50% { transform: scale(1.03); opacity: 0.04; }
}

/* 5. 进度条动画：放慢到 3s 一循环 */
@keyframes loading-stripes {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0); }
    100% { transform: translateX(100%); }
}

/* 动画类分配（调整了 Duration 和 Delay） */
.animate-pillar-grow { 
    animation: pillar-grow 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
}
.animate-joint-slide-1 { 
    animation: joint-slide 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards; 
}
.animate-joint-slide-2 { 
    animation: joint-slide 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards; 
}
.animate-joint-slide-3 { 
    animation: joint-slide 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards; 
}
.animate-line-expand {
    animation: line-expand 2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
}
.animate-water-ink {
    animation: water-ink 10s ease-in-out infinite;
}
.animate-loading-stripes {
    animation: loading-stripes 3s cubic-bezier(0.76, 0, 0.24, 1) infinite;
}

/* 文字浮现：在合龙接近尾声时（1.5s）再淡入 */
.reveal-up {
    animation: reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.5s both;
}
@keyframes reveal {
    from { opacity: 0; transform: translateY(15px); filter: blur(5px); }
    to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
</style>