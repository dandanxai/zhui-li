<template>
<div class="min-h-screen bg-[#fcfaf5] text-[#111] selection:bg-palace-red selection:text-white">
    
    <div class="absolute top-0 left-0 w-full z-[1100] p-6 md:p-10 pt-28 md:pt-36 flex justify-between items-center mix-blend-difference pointer-events-none">
        <button @click="$router.back()" class="pointer-events-auto text-paper-bg font-serif text-sm border-b border-paper-bg/30 hover:border-palace-red transition-colors flex items-center gap-2 group">
            <span class="group-hover:-translate-x-1 transition-transform">←</span>
            <span>返回 BACK</span>
        </button>
        <span class="text-paper-bg font-serif text-[10px] tracking-[0.4em] uppercase opacity-50 hidden md:block">Encyclopedia · 筑理百科</span>
    </div>

    <header ref="headerRef" class="w-full h-[65vh] relative overflow-hidden bg-black cursor-zoom-in group/header" @click="toggleFullScreen">
        <div class="hero-image-wrapper w-full h-full relative will-change-transform">
            <img 
                ref="imageRef"
                :src="building.img" 
                class="w-full h-full object-cover scale-110 origin-center opacity-80 transition-opacity duration-700" 
                :class="{ 'opacity-0': isFullScreen }"
            />
        </div>
        
        <div class="absolute inset-0 bg-gradient-to-t from-[#fcfaf5] via-transparent to-black/30 z-10 transition-opacity duration-700" :class="{ 'opacity-0': isFullScreen }"></div>
        
        <div class="absolute bottom-12 left-6 md:left-24 max-w-4xl z-20 hero-text pointer-events-none transition-all duration-700" :class="{ 'opacity-0 translate-y-10': isFullScreen }">
            <div class="flex items-center gap-3 mb-6">
                <span v-for="tag in building.tags" :key="tag" class="px-3 py-1 bg-palace-red text-white text-[10px] tracking-[0.3em] rounded-full uppercase">{{ tag }}</span>
            </div>
            <h1 class="text-5xl md:text-8xl font-serif tracking-[0.2em] mb-6 drop-shadow-2xl text-ink-dark">{{ building.name }}</h1>
            <p class="text-gray-600 font-serif tracking-[0.4em] flex items-center gap-3 text-sm">
                <span class="w-2 h-2 bg-palace-red rounded-full animate-pulse"></span> {{ building.location }}
            </p>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 md:px-24 py-24 grid grid-cols-1 md:grid-cols-12 gap-20">
        <div class="md:col-span-8">
            <h3 class="text-2xl font-serif mb-10 border-l-4 border-palace-red pl-6 tracking-widest">营造概览</h3>
            <p class="text-xl font-light leading-loose tracking-widest text-gray-700 mb-14 text-justify italic opacity-80">{{ building.desc }}</p>
            <div class="w-full h-[1px] bg-black/5 mb-14"></div>
            <div class="text-lg leading-[2.2] tracking-widest font-light text-gray-600 whitespace-pre-line text-justify">{{ building.fullContent }}</div>
        </div>
        <aside class="md:col-span-4 flex flex-col gap-12">
            <div class="bg-white p-10 rounded-3xl border border-[#eaeaea] shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
                <h4 class="font-serif text-palace-red mb-8 border-b border-palace-red/10 pb-6 tracking-widest font-bold">建筑档案 INFO</h4>
                <ul class="space-y-8 text-sm">
                    <li v-for="(val, label) in archiveInfo" :key="label" class="flex justify-between border-b border-black/5 pb-3">
                        <span class="text-gray-400 tracking-widest">{{ label }}</span>
                        <span class="font-serif font-bold">{{ val }}</span>
                    </li>
                </ul>
            </div>
        </aside>
    </main>

    <Transition name="bg-expand">
        <div v-if="isFullScreen" class="fixed inset-0 z-[900] bg-black cursor-zoom-out" @click="toggleFullScreen">
            <img 
                :src="building.img" 
                class="w-full h-full object-cover transition-transform duration-1000 ease-out"
                ref="fullImgRef"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none"></div>
            
            <div class="absolute bottom-20 left-10 md:left-24 z-10 animate-fade-up">
                <h2 class="text-white/90 text-4xl md:text-6xl font-serif tracking-[0.3em] mb-4">{{ building.name }}</h2>
                <p class="text-white/40 text-xs tracking-[0.6em] uppercase font-serif italic">The Art of Architecture · 筑理精选</p>
            </div>

            <div class="absolute top-1/2 right-10 -rotate-90 origin-right text-white/20 text-[9px] tracking-[1em] uppercase hidden md:block">
                Scroll Down or Click to Exit
            </div>
        </div>
    </Transition>
</div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { buildingsData } from '../data/buildings';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const headerRef = ref(null);
const imageRef = ref(null);
const fullImgRef = ref(null);
const isFullScreen = ref(false);

const building = computed(() => {
    const id = route.params.id;
    return buildingsData[id] || buildingsData['taihedian'];
});

const archiveInfo = { '所属分类': '中国古建筑', '核心材料': '木 / 石 / 砖', '保护级别': '世界文化遗产' };

// 🏮 切换逻辑
const toggleFullScreen = () => {
    isFullScreen.value = !isFullScreen.value;
    if (isFullScreen.value) {
        document.body.style.overflow = 'hidden';
        // 稍微加个呼吸感位移
        nextTick(() => {
            gsap.fromTo(fullImgRef.value, { scale: 1.1 }, { scale: 1, duration: 1.5, ease: 'power2.out' });
        });
    } else {
        document.body.style.overflow = '';
    }
};

// 视差逻辑
const handleMouseMove = (e) => {
    if (isFullScreen.value || !imageRef.value) return;
    const mx = (e.clientX / window.innerWidth - 0.5) * 2;
    const my = (e.clientY / window.innerHeight - 0.5) * 2;
    gsap.to(imageRef.value, { x: mx * 20, y: my * 20, duration: 1.5, ease: 'power2.out' });
};

onMounted(() => {
    gsap.from('.hero-text > *', { y: 30, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out' });
    gsap.to('.hero-image-wrapper', {
        yPercent: 30, ease: 'none',
        scrollTrigger: { trigger: headerRef.value, start: 'top top', end: 'bottom top', scrub: true }
    });
    window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    document.body.style.overflow = '';
});
</script>

<style scoped>
/* 🏮 全屏背景扩张动画 */
.bg-expand-enter-active {
    transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.bg-expand-leave-active {
    transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.bg-expand-enter-from {
    opacity: 0;
    clip-path: circle(30% at 50% 50%); /* 从中心圆形炸开的效果 */
}
.bg-expand-enter-to {
    opacity: 1;
    clip-path: circle(150% at 50% 50%);
}

.bg-expand-leave-to {
    opacity: 0;
    filter: blur(20px);
}

.animate-fade-up {
    animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

h1 { text-shadow: 0 10px 40px rgba(0,0,0,0.15); }
</style>