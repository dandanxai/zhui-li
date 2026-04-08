<template>
<div class="min-h-screen bg-[#fcfaf5] text-[#111] relative selection:bg-palace-red selection:text-white font-serif overflow-x-hidden">
    
    <div class="fixed inset-0 opacity-[0.04] pointer-events-none z-0" style="background-image: radial-gradient(#000000 1.5px, transparent 1.5px); background-size: 40px 40px;"></div>

    <div class="w-full min-h-screen flex flex-col items-center pt-[20vh] relative z-10 mb-32">
        
        <header class="w-full flex flex-col items-center px-6 reveal-up">
            <span class="text-palace-red font-sans tracking-[0.8em] text-xs uppercase font-black mb-6">The Classics Archive</span>
            <h1 class="text-7xl md:text-9xl font-black text-[#000] tracking-[0.2em] flex items-center gap-8">
                典籍 <span class="text-3xl md:text-5xl text-gray-300 font-light italic">Texts</span>
            </h1>
        </header>

        <section class="w-full max-w-5xl mx-auto px-6 md:px-12 mt-20 relative border-y-2 border-black/5 py-16 reveal-up delay-100">
            <div class="absolute -left-10 -top-16 text-[15rem] text-palace-red/5 font-serif leading-none select-none pointer-events-none">魂</div>
            
            <div class="space-y-10 relative z-10 text-justify md:text-center">
                <p class="text-3xl md:text-4xl font-black tracking-widest leading-[1.8] text-[#000]">
                    “西方的建筑是石头的史诗，<br class="hidden md:block"/>而中国的古建，是木头与典籍的轮回。”
                </p>
                <p class="text-[18px] tracking-[0.2em] leading-loose text-[#333] font-bold">
                    木构易朽，水火无情。历朝历代的阿房宫、未央宫、大明宫，无论当年何等气象万千，最终多化为一抔黄土。<span class="text-palace-red">但中华营造的脊梁，从未断绝。</span>
                </p>
                <p class="text-[16px] tracking-[0.2em] leading-loose text-[#555] font-medium">
                    因为古人早早领悟：真正的永恒，不在于材质的坚固，而在于<strong class="text-[#000]">“法式的传承”</strong>。从诸侯都城的规制，到江南园林的意境；从皇家大木作的严苛比例，到民间工匠的口诀暗语。这一切，皆被先贤镌刻于竹简、宣纸与图样之中。
                </p>
                <p class="text-[18px] tracking-[0.2em] leading-loose text-[#111] font-black border-l-4 border-palace-red pl-6 md:border-none md:pl-0">
                    宫阙纵然化为焦土，只要法式尚存，华夏的巍峨大殿便能于废墟中千古长立！
                </p>
            </div>
        </section>
    </div>

    <main v-if="archiveBooks.length > 0" class="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-48 pt-10">
        
        <section v-for="(book, index) in archiveBooks.slice(0, 3)" :key="book.id" class="relative reveal-up">
            <div class="absolute top-0 text-[18vw] font-black text-black/[0.03] select-none pointer-events-none leading-none"
                    :class="index % 2 === 0 ? '-right-10 md:right-0' : '-left-10 md:-left-20'">
                {{ book.title ? book.title.substring(0, 1) : '' }}
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                
                <div class="md:col-span-5 relative group cursor-pointer" 
                        :class="index % 2 === 0 ? 'order-1' : 'order-1 md:order-2'"
                        @click="router.push(`/dianji/${book.id}`)">
                    
                    <div class="aspect-[3/4] overflow-hidden border-4 border-white shadow-2xl elegant-card bg-[#e8e4d3]">
                        <img :src="book.coverImg" class="w-full h-full object-cover mix-blend-multiply transition-transform duration-[1.5s] group-hover:scale-105">
                    </div>
                    
                    <div class="absolute p-6 shadow-xl"
                            :class="index === 0 ? '-bottom-6 -left-6 bg-palace-red text-white' : index === 1 ? '-top-6 -right-6 bg-[#111] text-white' : '-bottom-6 -right-6 bg-[#333] text-white'">
                        <p class="writing-vertical font-black tracking-[0.5em] text-lg">{{ book.category || '营造典籍' }}</p>
                    </div>
                </div>

                <div class="md:col-span-7 space-y-8 cursor-pointer group"
                        :class="index % 2 === 0 ? 'order-2 md:pl-12' : 'order-2 md:order-1 md:pr-12 md:text-right flex flex-col md:items-end'"
                        @click="router.push(`/dianji/${book.id}`)">
                    
                    <div class="space-y-2">
                        <span class="text-sm font-sans tracking-[0.4em] text-gray-400 font-bold uppercase">{{ book.dynasty }} · {{ book.author }}</span>
                        <h2 class="text-5xl font-black text-[#000] tracking-widest group-hover:text-palace-red transition-colors">{{ book.title }}</h2>
                    </div>
                    
                    <p class="text-[20px] font-bold leading-relaxed tracking-widest italic"
                        :class="index % 2 === 0 ? 'text-palace-red border-l-4 border-palace-red/30 pl-6' : 'text-[#444] border-r-4 border-black/20 pr-6 text-right'">
                        “{{ book.spiritSummary || '匠心独运，巧夺天工。' }}”
                    </p>
                    
                    <div class="text-[16px] text-[#222] font-medium leading-loose tracking-widest space-y-6"
                            :class="index % 2 === 0 ? '' : 'text-right flex flex-col items-end'">
                        <p class="line-clamp-3">{{ book.description }}</p>
                        
                        <div class="bg-white border-2 border-black/5 p-6 shadow-sm text-left" :class="index % 2 === 0 ? '' : 'max-w-lg'">
                            <span class="text-[12px] text-white px-2 py-1 font-bold tracking-widest block w-max mb-3"
                                    :class="index % 2 === 0 ? 'bg-[#111]' : 'bg-palace-red'">传世价值</span>
                            <span class="font-bold line-clamp-2">{{ book.heritageHighlight || book.description }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <section id="dark-archive" class="w-full bg-[#0a0a0a] text-white py-40 mt-40 relative overflow-hidden z-20">
        <div class="absolute inset-0 opacity-[0.08] pointer-events-none" style="background-image: linear-gradient(to right, #ffffff 1px, transparent 1px); background-size: 6.25% 100%;"></div>
        
        <div class="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10 reveal-up">
            
            <header class="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
                <div>
                    <span class="text-palace-red font-sans tracking-[0.6em] text-[10px] uppercase font-black block mb-4 flex items-center gap-4">
                        <div class="w-8 h-[2px] bg-palace-red"></div> Database of Yingzao
                    </span>
                    <h2 class="text-5xl md:text-7xl font-black tracking-widest text-white">藏经总目</h2>
                </div>
                <div class="md:text-right">
                    <p class="text-gray-400 text-[16px] tracking-widest leading-relaxed font-bold border-l-2 md:border-l-0 md:border-r-2 border-palace-red pl-4 md:pr-4">
                        历代孤本、皇家密档、民间堪舆、现代测绘。<br/>
                        海量营造数据，皆存封于此。
                    </p>
                    <p class="text-palace-red font-sans tracking-[0.4em] text-[10px] font-black mt-4 border border-palace-red/30 inline-block px-3 py-1 bg-palace-red/10">
                        TOTAL ARCHIVES: {{ archiveBooks.length }} RECORDS
                    </p>
                </div>
            </header>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 border-t-2 border-white/10 pt-16">
                
                <div v-for="book in archiveBooks.slice(3)" :key="book.id" 
                    @click="router.push(`/dianji/${book.id}`)"
                    class="group cursor-pointer p-6 bg-white/[0.03] border border-white/10 hover:bg-palace-red/10 hover:border-palace-red/50 hover:shadow-[0_0_30px_rgba(155,46,46,0.2)] transition-all duration-500 relative overflow-hidden flex flex-col h-full">
                    
                    <div class="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none z-0"></div>

                    <div class="flex items-center justify-between mb-4 border-b border-white/10 pb-4 relative z-10">
                        <h3 class="font-black text-xl tracking-widest text-white group-hover:text-palace-red transition-colors">{{ book.title }}</h3>
                        <span class="text-[10px] text-black font-sans font-black tracking-[0.2em] uppercase bg-white/80 px-2 py-1">{{ book.dynasty }}</span>
                    </div>
                    
                    <div class="flex items-center justify-between mb-6 relative z-10">
                        <div class="flex items-center gap-3">
                            <div class="w-4 h-[2px] bg-palace-red"></div>
                            <p class="text-[11px] text-gray-300 tracking-widest font-bold">{{ book.author }}</p>
                        </div>
                        <span class="text-[9px] text-gray-500 tracking-[0.2em] uppercase font-sans border border-gray-700 px-1">{{ book.category }}</span>
                    </div>
                    
                    <p class="text-[13px] text-gray-400 tracking-[0.15em] leading-loose font-medium opacity-80 group-hover:opacity-100 transition-opacity text-justify relative z-10 flex-1 line-clamp-4">
                        {{ book.description }}
                    </p>
                </div>

            </div>
        </div>
    </section>

</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

// 🏮 引入你后端的 API
import { listClassic } from '@/api/building'

const router = useRouter()

// 响应式的典籍数组
const archiveBooks = ref([])

let revealObserver = null
let handleScroll = null

// 🏮 从 API 动态加载数据
const loadData = async () => {
    try {
        const res = await listClassic({ pageNum: 1, pageSize: 100, status: '0' });
        // 获取数据，按照 orderNum 排序
        const data = res.rows || res.data?.rows || res.data || [];
        archiveBooks.value = data.sort((a, b) => a.orderNum - b.orderNum);
        
        // 数据渲染完后，初始化动画与吸附效果
        nextTick(() => {
            initAnimations();
        });
    } catch (e) {
        console.error("获取营造典籍失败", e);
    }
}

const initAnimations = () => {
    // 1. 浮现动画
    const revealElements = document.querySelectorAll('.reveal-up')
    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                revealObserver.unobserve(entry.target)
            }
        })
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 })
    revealElements.forEach(el => revealObserver.observe(el))

    // 2. 磁性吸附逻辑
    const darkSection = document.getElementById('dark-archive')
    if (darkSection) {
        let isSnapping = false
        let lastScrollY = window.scrollY

        handleScroll = () => {
            const currentScrollY = window.scrollY
            const isScrollingDown = currentScrollY > lastScrollY

            if (isScrollingDown && !isSnapping) {
                const rect = darkSection.getBoundingClientRect()
                const viewportHeight = window.innerHeight
                
                if (rect.top < viewportHeight * 0.85 && rect.top > 0) {
                    isSnapping = true
                    
                    window.scrollTo({
                        top: darkSection.offsetTop,
                        behavior: 'smooth'
                    })
                    
                    setTimeout(() => {
                        isSnapping = false
                    }, 1200)
                }
            }
            lastScrollY = currentScrollY
        }
        window.addEventListener('scroll', handleScroll)
    }
}

onMounted(() => {
    loadData();
})

onUnmounted(() => {
    if (revealObserver) revealObserver.disconnect()
    if (handleScroll) window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.writing-vertical {
    writing-mode: vertical-rl;
    text-orientation: upright;
}

p, h1, h2, h3, h4, span {
    font-variant-ligatures: none;
    -webkit-font-smoothing: antialiased;
}

/* =========================================================================
    动效 (Elegant Animations)
    ========================================================================= */
.reveal-up {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1);
}
.reveal-up.is-visible {
    opacity: 1;
    transform: translateY(0);
}

.delay-100 { transition-delay: 150ms; }

.elegant-card {
    transition: box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.elegant-card:hover {
    box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.15);
}

@keyframes shimmer {
    100% { transform: translateX(100%); }
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>