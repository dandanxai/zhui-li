<template>
<div class="min-h-screen bg-[#fcfaf5] text-[#111] selection:bg-palace-red selection:text-white font-serif overflow-x-hidden">
    
    <nav class="fixed top-0 left-0 w-full z-[100] p-6 md:p-10 pt-28 md:pt-36 flex justify-between items-center mix-blend-difference pointer-events-none">
        <button @click="$router.back()" class="pointer-events-auto text-paper-bg hover:text-palace-red transition-colors flex items-center gap-4 group">
            <span class="group-hover:-translate-x-2 transition-transform duration-500">←</span>
            <span class="tracking-[0.4em] text-xs font-bold">归卷 BACK</span>
        </button>
    </nav>

    <div v-if="loading" class="h-screen flex items-center justify-center bg-[#fcfaf5]">
        <div class="flex flex-col items-center gap-6">
            <div class="w-16 h-16 border-[1px] border-palace-red rounded-full border-t-transparent animate-spin opacity-60"></div>
            <div class="text-[#8c857d] font-serif tracking-[0.5em] animate-pulse text-sm">正在展卷...</div>
        </div>
    </div>

    <template v-else>
        <header class="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#e8e4d3]">
            <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#000 1.2px, transparent 1.2px); background-size: 40px 40px;"></div>
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span class="text-[30vw] font-black text-black/[0.03]">营造</span>
            </div>

            <div class="relative z-10 flex flex-col items-center text-center px-6 hero-content">
                <span class="text-palace-red tracking-[1em] text-xs uppercase font-black mb-10 border-y border-palace-red/30 py-2 px-6">
                    {{ book.category || '营造典籍' }}
                </span>
                
                <div class="relative mb-10">
                    <div class="absolute -left-16 -top-20 text-[10rem] text-black/5 font-black select-none pointer-events-none">典</div>
                    <h1 class="text-7xl md:text-9xl font-black tracking-[0.3em] drop-shadow-sm text-[#000]">
                        {{ book.title }}
                    </h1>
                </div>
                
                <p class="text-xl md:text-3xl text-gray-600 tracking-[0.8em] mt-4 font-medium opacity-80">
                    {{ book.dynasty }} · {{ book.author }}
                </p>
            </div>
        </header>

        <main class="max-w-6xl mx-auto px-6 py-24 md:py-40">
            
            <section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 mb-40 md:mb-64 items-center reveal-on-scroll">
                <div class="md:col-span-5 relative hidden md:block section-img">
                    <div class="absolute -left-12 -top-12 text-[15rem] text-palace-red/5 font-serif leading-none select-none">魂</div>
                    <div class="aspect-[3/4] bg-white p-5 shadow-2xl rotate-[-3deg] transition-all hover:rotate-0 duration-1000 relative z-10 border border-gray-100">
                        <img :src="book.coverImg" class="w-full h-full object-cover grayscale opacity-90" />
                        <div class="absolute inset-0 bg-palace-red/5 mix-blend-multiply"></div>
                    </div>
                </div>
                <div class="md:col-span-7 space-y-12 section-text">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-[2px] bg-palace-red"></div>
                        <h2 class="text-3xl font-black tracking-widest text-[#000]">文化之魂 · 哲思</h2>
                    </div>
                    <p class="text-2xl md:text-3xl leading-[2] tracking-widest text-[#222] font-bold text-justify italic border-l-4 border-palace-red/30 pl-8">
                        {{ book.spiritSummary }}
                    </p>
                    <div class="text-lg md:text-xl leading-[2.6] tracking-widest text-gray-700 text-justify font-light opacity-90 whitespace-pre-line">
                        {{ book.spiritDetail }}
                    </div>
                </div>
            </section>

            <section v-if="parsedImpacts.length" class="mb-40 md:mb-64 relative bg-[#111] p-12 md:p-24 shadow-2xl overflow-hidden reveal-on-scroll">
                <div class="absolute right-0 top-0 text-[20rem] text-white/[0.03] font-black leading-none translate-x-1/4 -translate-y-1/4">功</div>
                
                <div class="relative z-10 max-w-4xl mx-auto">
                    <div class="flex flex-col items-center mb-20 text-center">
                        <span class="text-xs text-palace-red font-bold tracking-[0.8em] mb-6 uppercase">Historical Impact</span>
                        <h2 class="text-4xl md:text-5xl font-black tracking-[0.2em] text-white">乱世孤本 · 时代重器</h2>
                    </div>
                    
                    <div class="grid grid-cols-1 gap-16">
                        <div v-for="(impact, i) in parsedImpacts" :key="i" class="flex flex-col md:flex-row gap-8 md:gap-12 group">
                            <div class="text-palace-red font-serif italic text-6xl opacity-20 group-hover:opacity-100 transition-all duration-700">0{{ i+1 }}</div>
                            <div class="pt-2">
                                <h4 class="text-2xl font-black mb-6 tracking-widest text-white border-b border-white/10 pb-4 inline-block">{{ impact.title }}</h4>
                                <p class="text-lg leading-[2.2] text-gray-400 tracking-[0.15em] text-justify font-light">{{ impact.desc }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center reveal-on-scroll">
                <div class="space-y-12 order-2 md:order-1">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-[2px] bg-palace-red"></div>
                        <h2 class="text-3xl font-black tracking-widest text-[#000]">后世影响 · 传承</h2>
                    </div>
                    <div class="text-lg md:text-xl leading-[2.6] tracking-widest text-gray-700 font-light space-y-8 text-justify">
                        <p class="font-black text-2xl text-[#111] italic underline decoration-palace-red/30 underline-offset-8">{{ book.heritageHighlight }}</p>
                        <p class="whitespace-pre-line">{{ book.heritageText }}</p>
                    </div>
                    <div class="pt-12">
                        <div class="p-8 bg-[#111] text-white flex items-center justify-between shadow-2xl border-l-8 border-palace-red">
                            <span class="text-[10px] tracking-[0.8em] opacity-40 uppercase font-black">Dianji Seal</span>
                            <span class="text-lg font-black tracking-[0.4em]">华夏文明 · 营造基因</span>
                        </div>
                    </div>
                </div>
                
                <div class="order-1 md:order-2 hidden md:block">
                    <div class="aspect-square relative overflow-hidden group border-8 border-white shadow-2xl p-2 bg-white">
                        <img :src="book.manuscriptImg || book.coverImg" class="w-full h-full object-cover grayscale transition-transform duration-[3s] group-hover:scale-110" />
                        <div class="absolute inset-0 bg-palace-red/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    </div>
                </div>
            </section>
        </main>
    </template>
</div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 🏮 引入你后端的 API
import { getClassic } from '@/api/building';

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const loading = ref(true);
const book = ref({});

// 🏮 安全解析后端传来的 JSON 字符串
const parsedImpacts = computed(() => {
    try {
        return book.value.impactJson ? JSON.parse(book.value.impactJson) : [];
    } catch (e) {
        return [];
    }
});

const fetchBookDetail = async (id) => {
    loading.value = true;
    try {
        const res = await getClassic(id);
        book.value = res.data?.data || res.data || {};
    } catch(e) {
        console.error("加载典籍详情失败", e);
    } finally {
        loading.value = false;
        
        // 🏮 DOM 渲染完成后，触发 GSAP 动画
        nextTick(() => {
            initAnimations();
        });
    }
};

const initAnimations = () => {
    gsap.from('.hero-content > *', {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: 'power4.out'
    });

    const revealSections = document.querySelectorAll('.reveal-on-scroll');
    revealSections.forEach((section) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out'
        });
    });
};

onMounted(() => {
    window.scrollTo(0, 0); // 确保在顶部
    fetchBookDetail(route.params.id);
});
</script>

<style scoped>
p, h1, h2, h3, h4, span {
    -webkit-font-smoothing: antialiased;
}

/* 移动端调整 */
@media (max-width: 768px) {
    header h1 { font-size: 4rem; letter-spacing: 0.1em; }
}
</style>