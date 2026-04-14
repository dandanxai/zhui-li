<template>
    <footer class="bg-[#0a0a0a] text-[#e3ded5] py-20 px-8 md:px-16 border-t-4 border-palace-red relative z-10 font-serif overflow-hidden">
    
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 30px 30px;"></div>

    <div class="max-w-7xl mx-auto relative z-10">
        
        <div class="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-16">
        
        <div class="md:col-span-5 space-y-6">
            <h2 class="text-4xl font-black tracking-widest text-white flex items-end gap-4">
            筑理 <span class="text-xs font-sans font-bold text-gray-500 tracking-[0.4em] uppercase mb-1">Zhui Li</span>
            </h2>
            <p class="text-gray-400 leading-[2.2] tracking-widest text-[15px] max-w-sm text-justify">
            寻百工之理，筑华夏之魂。<br>探究严苛礼制法度之下的结构与人文之美。
            </p>
            <div class="pt-4">
            <span class="inline-block border border-palace-red/40 bg-palace-red/5 text-palace-red text-[11px] px-4 py-2 tracking-[0.3em] font-bold">
                考工实验室 / The Kaogong Lab
            </span>
            </div>
        </div>

        <div class="md:col-span-4 space-y-8">
            <h3 class="text-lg font-bold tracking-[0.2em] text-white border-b border-white/10 pb-4 inline-block relative">
            联系我们
            <span class="absolute bottom-0 left-0 w-8 h-[2px] bg-palace-red translate-y-[1px]"></span>
            </h3>
            <ul class="space-y-6 text-[14px] text-gray-400 tracking-widest">
            <li class="flex items-start gap-4">
                <!-- <span class="text-palace-red shrink-0 text-lg">📍</span> -->
                <span class="leading-relaxed">
                中国 · 考工<br/>
                <span class="text-xs text-gray-500 mt-1 block font-sans tracking-[0.1em] uppercase">China, R&D</span>
                </span>
            </li>
            <li class="flex items-center gap-4">
                <span class="text-palace-red shrink-0 text-lg">✉</span>
                <span class="font-sans tracking-wider">contact@kaogong.lab</span>
            </li>
            </ul>
        </div>

        <div class="md:col-span-3 space-y-8">
            <h3 class="text-lg font-bold tracking-[0.2em] text-white border-b border-white/10 pb-4 inline-block relative">
            展陈规范
            <span class="absolute bottom-0 left-0 w-8 h-[2px] bg-palace-red translate-y-[1px]"></span>
            </h3>
            <ul class="space-y-4 text-[14px] text-gray-400 tracking-widest">
            <li><span class="text-gray-500 mr-2">年代断限:</span>先秦至 1911 年</li>
            <li><span class="text-gray-500 mr-2">核心范畴:</span>宫殿 / 官衙 / 民居 / 桥梁</li>
            <li class="pt-4">
                <span class="text-palace-red text-xs font-bold bg-palace-red/10 px-3 py-2 border-l-2 border-palace-red block leading-relaxed text-justify">
                注：本数据库不包含宗教祭祀类（寺庙、佛塔）建筑。
                </span>
            </li>
            </ul>
        </div>

        </div>

        <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs tracking-[0.2em] text-gray-500 space-y-4 md:space-y-0">
        <p>© 2026 弘扬中华优秀传统文化系列之六 · 参赛作品</p>
        <p class="uppercase font-sans text-[10px] tracking-[0.4em] flex items-center gap-2">
            Designed & Coded by <span class="text-gray-300 font-bold">XXXXXX</span>
        </p>
        </div>

    </div>
    </footer>
</template>

<script setup>
// 纯静态展示组件，不需要逻辑
</script>

<style scoped>
/* 确保所有的英文字母和符号显示清晰 */
p, span, li {
    -webkit-font-smoothing: antialiased;
}
</style>