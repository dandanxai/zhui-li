<template>
<div v-if="loading" class="min-h-screen bg-[#fcfaf5] flex items-center justify-center">
    <div class="flex flex-col items-center gap-6">
        <div class="w-16 h-16 border-[1px] border-palace-red rounded-full border-t-transparent animate-spin opacity-60"></div>
        <div class="text-[#8c857d] font-serif tracking-[0.5em] animate-pulse text-sm">正在寻卷...</div>
    </div>
</div>

<div v-else class="h-screen w-screen bg-[#fcfaf5] text-[#111] selection:bg-palace-red selection:text-white flex flex-col lg:flex-row overflow-hidden relative">
    
    <nav class="absolute top-0 left-0 w-full z-[100] p-6 md:p-10 pt-16 md:pt-20 flex justify-between items-center mix-blend-difference pointer-events-none">
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

    <aside class="lg:w-[45%] h-[50vh] lg:h-full relative overflow-hidden flex-shrink-0 z-20">
        <transition name="fade-scale" appear>
            <div class="h-full w-full">
                <img :src="master.img" class="w-full h-full object-cover grayscale brightness-75 contrast-125" />
                <div class="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-[#fcfaf5]/10"></div>
            </div>
        </transition>

        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span class="text-[15vw] font-serif text-white/10 select-none">匠心</span>
        </div>

        <div class="absolute bottom-12 left-12 right-12 z-10 text-white">
            <p class="text-palace-red font-serif tracking-[0.5em] mb-4 text-sm">{{ master.era }} · {{ master.identity }}</p>
            <h1 class="text-5xl md:text-8xl font-serif tracking-widest mb-6">{{ master.name }}</h1>
            <div class="w-12 h-1 bg-white/30"></div>
        </div>
    </aside>

    <main class="flex-1 h-full overflow-y-auto custom-scroll bg-[#fcfaf5] z-10 relative px-8 md:px-24 py-32 md:py-48">
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
                <div class="text-lg text-gray-600 leading-[2.2] tracking-widest font-light text-justify whitespace-pre-line html-content" v-html="master.fullContent">
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getArtisan } from '@/api/building';

const route = useRoute();
const loading = ref(true);
const master = ref({});

const loadMasterData = async () => {
    loading.value = true;
    try {
        const id = route.params.id;
        const res = await getArtisan(id);
        const data = res.data?.data || res.data || {};

        master.value = {
            name: data.name,
            era: data.eraBgText || '未知朝代',
            identity: data.nickName || '宗师',
            img: data.imgUrl || 'https://images.unsplash.com/photo-1599408031306-035985043812?q=80&w=1200',
            achievement: data.contribution || data.masterpiece || '名留青史的营造巨匠',
            intro: data.slogan || data.poetry || '大方无隅，大器晚成',
            fullContent: data.fullDesc || data.intro || '暂无详细志传内容'
        };
    } catch (err) {
        console.error("加载大匠生平失败:", err);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadMasterData();
});
</script>

<style scoped>
/* 🏮 自定义右侧滚动条：变得极细且深墨色 */
.custom-scroll::-webkit-scrollbar { width: 3px; }
.custom-scroll::-webkit-scrollbar-thumb { background: #111; }
.custom-scroll::-webkit-scrollbar-track { background: transparent; }

/* 动画部分保持 */
.fade-scale-enter-active { transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-scale-enter-from { opacity: 0; transform: scale(1.05); filter: blur(10px); }

:deep(.html-content img) {
    max-width: 100%;
    height: auto;
    border-radius: 2px;
    margin: 2rem 0;
}

:deep(.html-content p) { margin-bottom: 2.2rem; }

/* 🏮 移动端适配：取消固定高度，允许整体滚动 */
@media (max-width: 1024px) {
    .h-screen { height: auto !important; overflow: auto !important; }
    aside { height: 55vh !important; }
    main { height: auto !important; overflow: visible !important; }
}
</style>