<template>
<div class="min-h-screen bg-[#fcfaf5] text-[#111] pt-32 pb-40 relative selection:bg-palace-red selection:text-white font-serif">
    
    <div class="fixed inset-0 opacity-[0.05] pointer-events-none z-0" style="background-image: radial-gradient(#000000 1.5px, transparent 1.5px); background-size: 40px 40px;"></div>
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45vw] font-black text-black/[0.02] pointer-events-none select-none z-0">筑</div>

    <header class="w-full max-w-7xl mx-auto px-6 md:px-12 mb-32 relative z-10 reveal-up">
        <div class="flex items-center gap-6 mb-8">
            <div class="w-20 h-[2px] bg-palace-red shadow-[0_0_10px_#9b2e2e]"></div>
            <span class="text-palace-red font-sans tracking-[0.6em] text-sm uppercase font-black">Chronicle of Yingzao</span>
        </div>
        <h1 class="text-6xl md:text-8xl font-black text-[#000] tracking-[0.15em] mb-12">览筑 <span class="opacity-30 font-bold italic text-[0.6em]">Perspective</span></h1>
        <p class="text-xl md:text-2xl font-bold tracking-[0.2em] leading-relaxed text-[#000] border-l-4 border-palace-red pl-10 max-w-4xl italic">
            中国古建在严苛的礼制法度之下，依然创造出了极致的结构与人文之美。
        </p>
    </header>

    <div class="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-24 relative z-10">
    
    <aside class="lg:w-1/5 hidden lg:block relative">
        <div class="sticky top-32 flex flex-col border-l-2 border-black/10 pl-8 py-4 reveal-up">
        <p class="text-[12px] font-black text-[#555] tracking-[0.4em] mb-8 uppercase">Part I. Principles</p>
        <div class="flex flex-col gap-6">
            <button v-for="(item, i) in navUpper" :key="item.id" @click="scrollTo(item.id)" 
            :class="activeId === item.id ? 'text-palace-red translate-x-2 font-black' : 'text-[#666] font-bold hover:text-black'"
            class="nav-item text-left font-serif text-[17px] tracking-widest transition-all duration-500 py-1 flex items-center gap-3">
            <span class="text-[11px] font-sans opacity-40">0{{i+1}}</span> {{item.name}}
            </button>
        </div>
        <p class="text-[12px] font-black text-[#555] tracking-[0.4em] mb-8 mt-16 uppercase">Part II. Masterpieces</p>
        <div class="flex flex-col gap-6">
            <button v-for="(item, i) in navLower" :key="item.id" @click="scrollTo(item.id)" 
            :class="activeId === item.id ? 'text-palace-red translate-x-2 font-black' : 'text-[#666] font-bold hover:text-black'"
            class="nav-item text-left font-serif text-[17px] tracking-widest transition-all duration-500 py-1 flex items-center gap-3">
            <span class="text-[11px] font-sans opacity-40">0{{i+5}}</span> {{item.name}}
            </button>
        </div>
        </div>
    </aside>

    <main class="lg:w-4/5 flex flex-col gap-48">
        
        <section id="roof" class="content-section scroll-mt-32">
        <h2 class="text-4xl font-black text-[#000] tracking-widest mb-12 flex items-center gap-6 reveal-up">01. 屋顶形制 <span class="w-12 h-[2px] bg-black/20"></span></h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="bg-white p-12 border-2 border-black/5 shadow-sm relative group elegant-card reveal-up">
            <h3 class="text-palace-red font-black tracking-widest mb-6 text-2xl transition-colors duration-500">重檐庑殿顶</h3>
            <p class="text-[16px] tracking-[0.15em] leading-loose text-[#111] font-bold text-justify">
                最高级的屋顶样式，具有五脊四坡。严格限制为皇家宫殿使用，民间绝不可僭越。气势雄浑，是中国古建等级的巅峰。
            </p>
            </div>
            <div class="bg-[#f7f5f0] p-12 border-2 border-black/5 flex flex-col justify-center elegant-card reveal-up delay-100">
            <h3 class="text-[#000] font-black tracking-widest mb-4 text-2xl">重檐歇山顶</h3>
            <p class="text-[16px] tracking-[0.15em] leading-loose text-[#111] font-bold">结合庑殿与悬山特点，飞檐翘起，灵动优雅。常用于皇宫侧殿、重要官署。</p>
            </div>
        </div>
        </section>

        <section id="platform" class="content-section scroll-mt-32">
        <h2 class="text-4xl font-black text-[#000] tracking-widest mb-12 flex items-center gap-6 reveal-up">02. 台基等级 <span class="w-12 h-[2px] bg-black/20"></span></h2>
        <div class="flex flex-col md:flex-row gap-16 items-center">
            <div class="md:w-1/2 space-y-8 reveal-up">
                <p class="text-[18px] leading-relaxed tracking-widest font-black text-[#000] border-l-4 border-palace-red pl-8">
                “高台榭，美宫室”。台基不仅是防潮之用，更是区分尊卑的物理边界。
                </p>
                <p class="text-[16px] text-[#111] leading-loose tracking-widest font-bold">
                紫禁城太和殿所用的**三层须弥座**，是古建史上最高等级的承托结构，通体汉白玉雕琢，饰以精美的石雕。
                </p>
            </div>
            <div class="md:w-1/2 grid grid-cols-2 gap-6 reveal-up delay-100">
                <div class="aspect-square bg-white border-4 border-palace-red/20 flex flex-col items-center justify-center p-6 text-center elegant-card shadow-md">
                <span class="text-palace-red font-black text-4xl mb-2">叁层</span>
                <span class="text-[12px] text-[#000] font-black tracking-[0.3em] uppercase">Imperial</span>
                </div>
                <div class="aspect-square bg-gray-100 border-2 border-black/10 flex flex-col items-center justify-center p-6 text-center elegant-card opacity-60">
                <span class="text-[#333] font-black text-4xl mb-2">单层</span>
                <span class="text-[12px] text-[#555] tracking-[0.3em] font-bold">Normal</span>
                </div>
            </div>
        </div>
        </section>

        <section id="color" class="content-section scroll-mt-32">
        <h2 class="text-4xl font-black text-[#000] tracking-widest mb-12 reveal-up">03. 色彩法则</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 border-2 border-black/5 p-1 bg-white shadow-sm reveal-up">
            <div class="aspect-[3/4] bg-[#9b2e2e] p-8 flex flex-col justify-end group overflow-hidden relative">
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700"></div>
            <span class="text-white font-black tracking-widest text-2xl z-10 drop-shadow-md">宫墙红</span>
            <span class="text-white/80 text-[12px] font-black z-10 mt-2 tracking-widest">#9B2E2E</span>
            </div>
            <div class="aspect-[3/4] bg-[#e6b422] p-8 flex flex-col justify-end group overflow-hidden relative">
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700"></div>
            <span class="text-white font-black tracking-widest text-2xl z-10 drop-shadow-md">琉璃黄</span>
            <span class="text-white/80 text-[12px] font-black z-10 mt-2 tracking-widest">#E6B422</span>
            </div>
            <div class="aspect-[3/4] bg-[#2d4e39] p-8 flex flex-col justify-end group overflow-hidden relative">
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700"></div>
            <span class="text-white font-black tracking-widest text-2xl z-10 drop-shadow-md">青黛绿</span>
            <span class="text-white/80 text-[12px] font-black z-10 mt-2 tracking-widest">#2D4E39</span>
            </div>
            <div class="aspect-[3/4] bg-[#1a1a1a] p-8 flex flex-col justify-end group overflow-hidden relative">
            <div class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-700"></div>
            <span class="text-white font-black tracking-widest text-2xl z-10 drop-shadow-md">玄漆黑</span>
            <span class="text-white/80 text-[12px] font-black z-10 mt-2 tracking-widest">#1A1A1A</span>
            </div>
        </div>
        </section>

        <section id="layout" class="content-section scroll-mt-32">
        <div class="flex items-center gap-10 mb-16 reveal-up">
            <h2 class="text-4xl font-black text-[#000] tracking-widest shrink-0">04. 空间面阔</h2>
            <div class="flex-1 h-[2px] bg-black/20"></div>
        </div>
        
        <div class="bg-[#111] text-white p-12 md:p-24 relative overflow-hidden border-y-4 border-palace-red elegant-shadow reveal-up">
            <div class="absolute inset-0 opacity-30 pointer-events-none" style="background-image: linear-gradient(to right, #fff 1.5px, transparent 1.5px); background-size: 11.11% 100%;"></div>
            <div class="relative z-10 max-w-4xl mb-20">
                <h3 class="text-palace-red font-black text-4xl tracking-widest mb-10 drop-shadow-lg">“九五之尊”的数字解构</h3>
                <p class="text-white text-[16px] leading-loose tracking-[0.15em] font-bold text-justify">
                开间必为奇数，此谓“阳数”。在紫禁城的最高等级规制中，**面阔九间、进深五间**。这种模数化的比例控制，不仅是受力逻辑，更是对皇权的数字化测量。
                </p>
            </div>
            <div class="grid grid-cols-9 h-16 gap-2 mb-6 relative z-10">
                <div v-for="i in 9" :key="i" class="bg-palace-red/60 border-2 border-palace-red flex items-center justify-center text-[14px] font-black text-white hover:bg-palace-red transition-colors duration-500 cursor-default">{{i}}</div>
            </div>
            <div class="flex justify-between text-[12px] text-gray-300 tracking-[0.5em] font-black uppercase relative z-10">
                <span>Frontage: 9 Bays</span>
                <span class="text-palace-red italic">Imperial Logic // 09:05</span>
            </div>
        </div>
        </section>

        <section id="palace" class="content-section scroll-mt-32">
        <div class="flex items-end justify-between mb-20 border-b-2 border-black/10 pb-6 group cursor-pointer reveal-up" @click="router.push('/lanzhu/palace')">
            <h2 class="text-5xl font-black text-[#000] tracking-widest group-hover:text-palace-red transition-colors duration-500">05. 皇宫威仪</h2>
            <span class="text-xs font-bold text-gray-400 tracking-[0.4em] uppercase group-hover:translate-x-2 group-hover:text-palace-red transition-all duration-500 hidden md:block">Explore Category →</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start reveal-up">
            <div class="lg:col-span-8 group cursor-pointer elegant-card" @click="router.push('/building/taihedian')">
            <div class="relative overflow-hidden aspect-[16/10] bg-gray-200 mb-12 border-2 border-black/5 shadow-md group-hover:shadow-xl transition-shadow duration-700">
                <img src="https://images.unsplash.com/photo-1543013327-04669fec8935?q=80&w=1200" 
                    class="w-full h-full object-cover transition-transform duration-[1.5s] scale-100 group-hover:scale-[1.03] ease-out" />
            </div>
            <h3 class="text-3xl font-black tracking-widest mb-6 text-[#000] group-hover:text-palace-red transition-colors duration-500">北京 · 故宫太和殿</h3>
            <p class="text-[16px] text-[#111] tracking-[0.15em] leading-loose text-justify font-bold italic">
                集中国古建最高规制于一身，重檐庑殿顶与三层须弥座展现了皇权的至高无上。
            </p>
            </div>
            <div class="lg:col-span-4 border-l-4 border-palace-red pl-12 py-10 space-y-12">
            <div>
                <p class="text-[13px] text-palace-red font-black tracking-[0.4em] uppercase mb-4">Technique</p>
                <p class="text-[16px] text-[#000] font-black tracking-widest leading-relaxed">三层须弥座 / 汉白玉栏杆 / 御路石雕</p>
            </div>
            <div>
                <p class="text-[13px] text-palace-red font-black tracking-[0.4em] uppercase mb-4">Dimension</p>
                <p class="text-[16px] text-[#000] font-black tracking-widest leading-relaxed">面阔十一间 / 柱高十二米 / 进深五间</p>
            </div>
            </div>
        </div>
        </section>

        <section id="official" class="content-section scroll-mt-32">
        <div class="flex items-end justify-between mb-16 border-b-2 border-black/10 pb-6 group cursor-pointer reveal-up" @click="router.push('/lanzhu/official')">
            <h2 class="text-4xl font-black text-[#000] tracking-widest group-hover:text-palace-red transition-colors duration-500">06. 坛庙官衙</h2>
            <span class="text-xs font-bold text-gray-400 tracking-[0.4em] uppercase group-hover:translate-x-2 group-hover:text-palace-red transition-all duration-500 hidden md:block">Explore Category →</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div class="group cursor-pointer elegant-card reveal-up" @click="router.push('/building/qiniandian')">
                <div class="overflow-hidden mb-8 shadow-md group-hover:shadow-xl transition-shadow duration-700 border-2 border-black/5">
                <img src="https://images.unsplash.com/photo-1582650517303-b42616d56f8e?w=800" class="w-full aspect-video object-cover transition-transform duration-[1.5s] scale-100 group-hover:scale-[1.03] ease-out">
                </div>
                <h3 class="text-2xl font-black tracking-widest mb-4 text-[#000] group-hover:text-palace-red transition-colors duration-500">天坛祈年殿</h3>
                <p class="text-[16px] text-[#111] tracking-widest leading-loose font-bold">三重檐圆攒尖顶象征青天，内部梁柱结构暗合时令星宿。</p>
            </div>
            <div class="group cursor-pointer elegant-card reveal-up delay-100" @click="router.push('/building/pxys')">
                <div class="overflow-hidden mb-8 shadow-md group-hover:shadow-xl transition-shadow duration-700 border-2 border-black/5">
                <img src="https://images.unsplash.com/photo-1542640244-7e672d6cb466?w=800" class="w-full aspect-video object-cover transition-transform duration-[1.5s] scale-100 group-hover:scale-[1.03] ease-out">
                </div>
                <h3 class="text-2xl font-black tracking-widest mb-4 text-[#000] group-hover:text-palace-red transition-colors duration-500">平遥县署</h3>
                <p class="text-[16px] text-[#111] tracking-widest leading-loose font-bold">对称布局，前朝后寝。营造出一种公门的肃穆与威严。</p>
            </div>
        </div>
        </section>

        <section id="dwelling" class="content-section scroll-mt-32">
        <div class="flex items-end justify-center md:justify-between mb-24 border-b-2 border-black/10 pb-6 group cursor-pointer reveal-up" @click="router.push('/lanzhu/dwelling')">
            <h2 class="text-5xl font-black tracking-[0.3em] text-[#000] group-hover:text-palace-red transition-colors duration-500">07. 烟火民居</h2>
            <span class="text-xs font-bold text-gray-400 tracking-[0.4em] uppercase group-hover:translate-x-2 group-hover:text-palace-red transition-all duration-500 hidden md:block">Explore Category →</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div v-for="(item, index) in dwellings" :key="item.name" class="group cursor-pointer elegant-card reveal-up" :style="`transition-delay: ${index * 100}ms`" @click="router.push(item.path)">
                <div class="overflow-hidden mb-8 aspect-[3/4] shadow-md group-hover:shadow-2xl transition-shadow duration-700 border-2 border-black/5">
                    <img :src="item.img" class="w-full h-full object-cover transition-transform duration-[1.5s] scale-100 group-hover:scale-[1.03] ease-out">
                </div>
                <h3 class="text-2xl font-black tracking-widest text-center text-[#000] group-hover:text-palace-red transition-colors duration-500">{{item.name}}</h3>
            </div>
        </div>
        </section>

        <section id="bridge" class="content-section scroll-mt-32 pb-40">
        <div class="flex items-end justify-between mb-16 border-b-2 border-black/10 pb-6 group cursor-pointer reveal-up" @click="router.push('/lanzhu/bridge')">
            <h2 class="text-4xl font-black text-[#000] tracking-widest group-hover:text-palace-red transition-colors duration-500">08. 千载桥梁</h2>
            <span class="text-xs font-bold text-gray-400 tracking-[0.4em] uppercase group-hover:translate-x-2 group-hover:text-palace-red transition-all duration-500 hidden md:block">Explore Category →</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div v-for="(bridge, index) in bridges" :key="bridge.title" class="p-12 bg-white border-2 border-black/10 hover:border-palace-red transition-all duration-500 group cursor-pointer elegant-shadow elegant-card reveal-up" :style="`transition-delay: ${index * 150}ms`" @click="router.push(bridge.path)">
                <h3 class="text-3xl font-black tracking-widest mb-8 group-hover:text-palace-red transition-colors text-[#000]">{{bridge.title}}</h3>
                <p class="text-[16px] text-[#111] tracking-[0.1em] leading-relaxed font-bold italic">{{bridge.content}}</p>
            </div>
        </div>
        </section>

    </main>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeId = ref('roof')

const navUpper = [
{ name: '屋顶形制', id: 'roof' },
{ name: '台基等级', id: 'platform' },
{ name: '色彩法则', id: 'color' },
{ name: '空间面阔', id: 'layout' }
]

const navLower = [
{ name: '皇宫威仪', id: 'palace' },
{ name: '坛庙官衙', id: 'official' },
{ name: '烟火民居', id: 'dwelling' },
{ name: '千载桥梁', id: 'bridge' }
]

const dwellings = [
{ name: '徽派民居', path: '/building/hongcun', img: 'https://images.unsplash.com/photo-1529982412356-901cc3a363bc?w=600' },
{ name: '客家土楼', path: '/building/tulou', img: 'https://images.unsplash.com/photo-1628100808298-508b9cdfb705?w=600' },
{ name: '北京合院', path: '/building/siheyuan', img: 'https://images.unsplash.com/photo-1563290637-295ea9fdf196?w=600' }
]

const bridges = [
{ title: '河北 · 赵州桥', path: '/building/zhaozhou', content: '李春设计的敞肩石拱桥，跨越千年依旧稳固，展现出极致的力学之美。' },
{ title: '潮州 · 广济桥', path: '/building/guangji', content: '独特的启闭式桥梁，将梁、拱、浮桥融为一体，展现了古人因地制宜的智慧。' }
]

const scrollTo = (id) => {
activeId.value = id
const el = document.getElementById(id)
if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
}

let scrollObserver = null
let revealObserver = null

onMounted(() => {
    // 1. 导航监听
    const sections = document.querySelectorAll('.content-section')
    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            activeId.value = entry.target.getAttribute('id')
        }
        })
    }, { rootMargin: '-20% 0px -60% 0px' }) 
    sections.forEach(sec => scrollObserver.observe(sec))

    // 2. Apple 风格浮现动画监听
    const revealElements = document.querySelectorAll('.reveal-up')
    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                // 动画执行一次后取消监听，性能更好
                revealObserver.unobserve(entry.target)
            }
        })
    }, { 
        rootMargin: '0px 0px -10% 0px', // 元素进入视口底部 10% 后触发，更有节奏感
        threshold: 0.1 
    })
    revealElements.forEach(el => revealObserver.observe(el))
})

onUnmounted(() => {
    if (scrollObserver) scrollObserver.disconnect()
    if (revealObserver) revealObserver.disconnect()
})
</script>

<style scoped>
/* 导航刻度尺交互 */
.nav-item {
position: relative;
}
.nav-item::before {
content: ''; position: absolute; left: -32px; top: 50%; transform: translateY(-50%);
width: 0; height: 3px; background-color: #9b2e2e; transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-item.text-palace-red::before { width: 22px; }

p { color: #111; }

/* =========================================================================
APPLE 风格素雅动效 (Elegant Animations)
========================================================================= */

/* 1. 出现动效 (Reveal Up) */
.reveal-up {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1);
}
.reveal-up.is-visible {
    opacity: 1;
    transform: translateY(0);
}

/* 延迟类 (用于 Grid 并排元素的交错浮现) */
.delay-100 { transition-delay: 100ms; }
.delay-200 { transition-delay: 200ms; }

/* 2. 素雅悬浮动效 (Elegant Card Hover) */
.elegant-card {
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.elegant-card:hover {
    transform: translateY(-4px); /* 极其微弱的上浮 */
}
/* 卡片原本如果是 shadow-sm 或 shadow-md，悬浮时稍微加强扩散范围，但不加深黑色 */
.elegant-shadow:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
}
</style>