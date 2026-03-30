<template>
<div class="min-h-screen bg-[#fcfaf5] text-[#111] selection:bg-palace-red selection:text-white">
    
    <nav class="absolute top-0 left-0 w-full z-40 p-6 md:p-10 pt-32 md:pt-40 flex justify-between items-center mix-blend-difference pointer-events-none">
    <button 
        @click="$router.back()" 
        class="pointer-events-auto text-paper-bg font-serif text-sm flex items-center gap-2 group border-b border-paper-bg/20 pb-1"
    >
        <span class="group-hover:-translate-x-1 transition-transform duration-300">←</span>
        <span class="tracking-widest">返回 BACK</span>
    </button>
    
    <span class="text-paper-bg font-serif text-[10px] tracking-[0.4em] uppercase opacity-60 hidden md:block">
        The Great Architect Archive
    </span>
    </nav>

    <div class="flex flex-col lg:flex-row min-h-screen">
    
    <aside class="lg:w-[45%] h-[60vh] lg:h-screen relative overflow-hidden sticky top-0">
        <transition name="fade-scale" appear>
        <div class="h-full w-full">
            <img :src="master.img" class="w-full h-full object-cover grayscale brightness-75 contrast-125" />
            <div class="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-[#fcfaf5]/10"></div>
        </div>
        </transition>

        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span class="text-[20vw] font-serif text-white/10 select-none">匠心</span>
        </div>

        <div class="absolute bottom-12 left-12 right-12 z-10 text-white">
        <p class="text-palace-red font-serif tracking-[0.5em] mb-4 text-sm">{{ master.era }} · {{ master.identity }}</p>
        <h1 class="text-5xl md:text-8xl font-serif tracking-widest mb-6">{{ master.name }}</h1>
        <div class="w-12 h-1 bg-white/30"></div>
        </div>
    </aside>

    <main class="flex-1 px-8 md:px-24 py-32 md:py-48 bg-[#fcfaf5]">
        
        <div class="max-w-2xl">
        <section class="mb-24">
            <h3 class="text-palace-red font-serif text-xs tracking-[0.5em] uppercase mb-8">Major Achievement / 核心成就</h3>
            <h2 class="text-3xl md:text-4xl font-serif leading-snug tracking-widest text-[#2c2c2c]">
            {{ master.achievement }}
            </h2>
        </section>

        <section class="mb-24">
            <div class="flex items-center gap-4 mb-10">
            <span class="w-12 h-[1px] bg-black"></span>
            <h4 class="font-serif tracking-[0.3em] text-gray-400">生平概览</h4>
            </div>
            <p class="text-xl font-serif text-gray-700 leading-relaxed tracking-widest text-justify italic mb-12">
            “{{ master.intro }}”
            </p>
            <div class="text-lg text-gray-600 leading-loose tracking-widest font-light text-justify whitespace-pre-line">
            {{ master.fullContent }}
            </div>
        </section>

        <section class="p-10 border border-palace-red/10 rounded-2xl bg-palace-red/[0.01] relative overflow-hidden group">
            <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <svg width="100" height="100" viewBox="0 0 100 100"><path d="M10 50 L90 50 M50 10 L50 90" stroke="currentColor" stroke-width="2"/></svg>
            </div>
            <h5 class="text-palace-red font-serif text-sm tracking-widest mb-6">营造智慧</h5>
            <p class="text-gray-500 text-sm leading-relaxed tracking-widest font-serif italic">
            中国古建之魂，不在于石木的堆砌，而在于那份对“度”的精准把握。每一根梁、每一块瓦，皆是匠人与天地的无声对话。
            </p>
        </section>

        <div class="mt-32 pt-12 border-t border-black/5 flex justify-between items-center text-[10px] text-gray-400 tracking-[0.3em] uppercase">
            <span>Zhui Li · Master Archive</span>
            <span>Est. 2026</span>
        </div>
        </div>

    </main>
    </div>
</div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { mastersData } from '../data/masters';

const route = useRoute();
const master = computed(() => {
const id = route.params.id;
// 获取数据，若匹配不到显示“李诫”作为兜底
return mastersData[id] || mastersData['lijie'];
});

onMounted(() => {
// 确保进入页面时滚动到顶部
window.scrollTo(0, 0);
});
</script>

<style scoped>
/* 人物肖像入场动画 */
.fade-scale-enter-active {
transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-scale-enter-from {
opacity: 0;
transform: scale(1.1);
filter: blur(10px);
}

/* 移动端适配：左侧背景图在手机上高度缩小 */
@media (max-width: 1024px) {
aside {
    position: relative;
    height: 50vh;
}
}
</style>