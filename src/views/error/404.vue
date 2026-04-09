<template>
    <div class="not-found-container flex items-center justify-center min-h-screen bg-[#fcfaf5] p-6 overflow-hidden relative">
    
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <h1 class="text-[40vw] font-black font-serif select-none">肆零肆</h1>
    </div>

    <div class="relative z-10 max-w-2xl w-full text-center">
        
        <div class="relative inline-block mb-10">
        <h2 class="text-9xl md:text-[12rem] font-black tracking-tighter text-palace-red/10 animate-pulse">404</h2>
        <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-4xl md:text-5xl font-serif font-bold text-palace-red tracking-[0.5em] ml-4">迷途</span>
        </div>
        </div>

        <div class="space-y-6 mb-12">
        <div class="flex items-center justify-center gap-4">
            <div class="h-[1px] w-12 bg-palace-red/30"></div>
            <p class="text-sm font-mono tracking-widest text-[#8c857d]">ERROR_PAGE_NOT_FOUND</p>
            <div class="h-[1px] w-12 bg-palace-red/30"></div>
        </div>
        
        <h3 class="text-2xl md:text-3xl font-serif font-black text-ink-dark tracking-widest">
            云深不知处，卷轴已封存
        </h3>
        
        <p class="text-sm text-gray-500 leading-relaxed font-serif italic">
            “ 欲寻营造法，奈何路已偏。<br/>
            此处卷宗未载，请移步归园。 ”
        </p>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-center gap-6">
        <button @click="$router.back()" class="group flex items-center gap-3 text-sm tracking-[0.3em] text-gray-400 hover:text-palace-red transition-all duration-500">
            <span class="group-hover:-translate-x-2 transition-transform">←</span>
            <span>返回前页 // BACK</span>
        </button>

        <router-link to="/" class="px-10 py-3 bg-palace-red text-white text-sm tracking-[0.4em] font-bold shadow-[0_10px_30px_rgba(155,46,46,0.2)] hover:bg-ink-dark transition-all duration-500">
            归回首页 // HOME
        </router-link>
        </div>

    </div>

    <div class="absolute bottom-10 left-10 hidden md:block">
        <div class="w-12 h-[1px] bg-palace-red mb-2"></div>
        <p class="text-[10px] text-gray-400 font-mono tracking-tighter uppercase">Building digital heritage</p>
    </div>
    </div>
</template>

<script setup>
/** * 404 页面不需要复杂逻辑，主要是视觉呈现
 * 如果有需要可以在这里加入统计或自动跳转逻辑
 */
</script>

<style scoped>
.not-found-container {
    /* 背景模拟宣纸质感 */
    background-image: url('https://www.transparenttextures.com/patterns/p6-dark.png');
}

.animate-pulse {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 0.15; transform: scale(1); }
    50% { opacity: 0.05; transform: scale(1.05); }
}

/* 适配你的调色盘 */
.text-palace-red { color: #9b2e2e; }
.bg-palace-red { background-color: #9b2e2e; }
.text-ink-dark { color: #1a1a1a; }
</style>