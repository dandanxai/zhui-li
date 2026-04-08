<template>
<div class="min-h-screen bg-[#fcfaf5] text-[#111] pt-32 pb-40 relative selection:bg-palace-red selection:text-white font-serif overflow-x-hidden">
    
    <div class="fixed inset-0 opacity-[0.05] pointer-events-none z-0" style="background-image: radial-gradient(#000000 1.5px, transparent 1.5px); background-size: 40px 40px;"></div>

    <header class="w-full max-w-5xl mx-auto px-6 md:px-12 mb-32 relative z-10 text-center reveal-up">
        <div class="flex items-center justify-center gap-6 mb-8">
            <div class="w-12 h-[2px] bg-palace-red"></div>
            <span class="text-palace-red font-sans tracking-[0.6em] text-sm uppercase font-black">Masters of Yingzao</span>
            <div class="w-12 h-[2px] bg-palace-red"></div>
        </div>
        <h1 class="text-6xl md:text-8xl font-black text-[#000] tracking-[0.15em] mb-10">大匠 <span class="opacity-20 font-bold italic text-[0.5em]">Artisans</span></h1>
        <p class="text-xl md:text-2xl font-bold tracking-[0.2em] leading-relaxed text-[#111] italic">
            千载木石之魂，皆在一代代巨匠的指尖传承。<br/>无名之辈筑长城，有姓之师建紫禁。
        </p>
    </header>

    <div v-if="!loading" class="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-6 items-center">
        <div class="w-[1px] h-20 bg-black/10 absolute top-0 -translate-y-full"></div>
        <button v-for="(era, index) in eraData" :key="era.id" @click="scrollTo(era.id)"
                class="relative group flex items-center justify-center w-6 h-6">
            <span class="absolute right-10 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300 text-[10px] font-black tracking-widest whitespace-nowrap text-palace-red uppercase">
                {{era.eraName}}
            </span>
            <div class="w-2 h-2 rounded-full transition-all duration-500 border border-[#111]"
                :class="activeId === era.id ? 'bg-[#111] scale-150' : 'bg-transparent'"></div>
        </button>
        <div class="w-[1px] h-20 bg-black/10 absolute bottom-0 translate-y-full"></div>
    </div>

    <div v-if="loading" class="w-full py-32 flex flex-col items-center justify-center opacity-50 relative z-10">
        <div class="w-10 h-10 border-2 border-palace-red rounded-full border-t-transparent animate-spin mb-4"></div>
        <p class="font-serif tracking-widest text-[#111]">正在研读名录...</p>
    </div>

    <main v-else class="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-48 relative z-10">
        
        <section v-for="(era, index) in eraData" :key="era.id" :id="era.id" class="content-section scroll-mt-32 relative">
            <div class="absolute top-10 pointer-events-none select-none z-0 text-[15vw] font-black text-black/[0.03] leading-none"
                :class="index % 2 === 0 ? '-right-10' : '-left-10'">
                {{ (era.eraName || '未知').substring(0, 2) }}
            </div>

            <div class="flex flex-col gap-16 relative z-10" :class="index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'">
                
                <div class="lg:w-7/12 group cursor-pointer reveal-up" @click="router.push(`/master/${era.chief.id}`)">
                    <div class="relative overflow-hidden aspect-[4/3] bg-gray-200 border-2 border-black/5 shadow-xl mb-8 elegant-card">
                        <img :src="era.chief.img" class="w-full h-full object-cover grayscale transition-transform duration-[1.5s] scale-100 group-hover:scale-[1.03] ease-out" />
                        <div class="absolute top-0 right-0 bg-palace-red text-white px-3 py-6 writing-vertical tracking-[0.5em] text-xs font-bold shadow-xl">
                            {{ era.theme }}
                        </div>
                    </div>
                    <div class="flex items-center gap-6 mb-4">
                        <h3 class="text-4xl font-black text-[#000] tracking-widest group-hover:text-palace-red transition-colors">{{ era.chief.name }}</h3>
                        <span class="text-[12px] bg-[#111] text-white px-2 py-1 tracking-widest font-bold">宗师</span>
                    </div>
                    <p class="text-[18px] text-palace-red font-bold leading-snug tracking-widest italic mb-4">“{{ era.chief.slogan }}”</p>
                    <p class="text-[15px] text-[#222] leading-loose tracking-widest font-medium text-justify w-5/6">
                        {{ era.chief.intro }}
                    </p>
                </div>

                <div class="lg:w-5/12 flex flex-col justify-center space-y-12 reveal-up delay-100" :class="index % 2 === 0 ? 'lg:pl-10' : 'lg:pr-10 lg:items-end lg:text-right'">
                    <div class="space-y-2">
                        <span class="text-palace-red font-sans text-sm tracking-[0.4em] font-black uppercase">{{ era.period }}</span>
                        <h2 class="text-5xl font-black text-[#000] tracking-widest">{{ era.eraName }}</h2>
                    </div>

                    <div class="bg-white p-8 border-2 border-black/5 shadow-md hover:border-palace-red/30 transition-colors w-full cursor-pointer" @click="router.push(`/master/${era.subChief.id}`)">
                        <div class="flex items-center gap-4 mb-4" :class="index % 2 !== 0 ? 'justify-end' : ''">
                            <span class="text-[10px] text-gray-400 border border-gray-300 px-2 py-1 font-bold uppercase tracking-widest">Representative</span>
                            <h4 class="text-2xl font-black text-[#000] tracking-widest">{{ era.subChief.name }}</h4>
                        </div>
                        <p class="text-[14px] text-[#333] leading-loose tracking-widest font-bold line-clamp-3">{{ era.subChief.desc }}</p>
                    </div>

                    <button @click="openDrawer(era)" class="group flex items-center justify-between w-full p-6 bg-[#111] text-white hover:bg-palace-red transition-colors duration-500 shadow-xl">
                        <div class="flex flex-col text-left">
                            <span class="text-[10px] tracking-[0.5em] opacity-60 uppercase font-sans font-bold mb-1">Archive Room</span>
                            <span class="text-lg tracking-widest font-black">阅览 {{era.eraName}} 众匠卷宗</span>
                        </div>
                        <span class="text-2xl font-light group-hover:translate-x-2 transition-transform">+</span>
                    </button>
                </div>

            </div>
        </section>

    </main>

    <transition name="slide-drawer">
        <div v-if="drawerVisible && activeEra" class="fixed inset-0 z-[100] flex justify-end">
            <div class="absolute inset-0 bg-[#000]/60 backdrop-blur-sm transition-opacity" @click="drawerVisible = false"></div>
            
            <div class="relative w-full md:w-[600px] lg:w-[800px] bg-[#fcfaf5] h-full shadow-2xl flex flex-col border-l-4 border-palace-red">
                
                <header class="flex justify-between items-end pt-32 pb-10 px-12 border-b-2 border-black/10 bg-white relative z-10 shrink-0">
                    <div>
                        <span class="text-palace-red tracking-[0.5em] text-[10px] font-black uppercase block mb-3">Master Roster</span>
                        <h4 class="text-4xl md:text-5xl font-black tracking-widest text-[#000]">{{ activeEra.eraName }} · 巨匠录</h4>
                    </div>
                    <button @click="drawerVisible = false" class="w-12 h-12 mb-1 shrink-0 flex items-center justify-center border-2 border-[#111] hover:bg-palace-red hover:border-palace-red hover:text-white transition-all text-xl cursor-pointer">
                        ✕
                    </button>
                </header>

                <div class="flex-1 flex overflow-hidden bg-[#fcfaf5]">
                    
                    <div class="w-2/5 border-r-2 border-black/5 overflow-y-auto custom-scroll py-8">
                        <div v-for="m in activeEra.allPeers" :key="m.id" 
                            @mouseenter="hoveredMaster = m"
                            class="px-10 py-6 cursor-pointer border-b border-black/5 transition-all duration-300 hover:bg-palace-red hover:text-white group"
                            @click="router.push(`/master/${m.id}`)">
                            <span class="text-2xl font-black tracking-widest block mb-2">{{ m.name }}</span>
                            <span class="text-[10px] opacity-50 tracking-[0.3em] uppercase font-bold group-hover:opacity-100 transition-opacity">View Archive →</span>
                        </div>
                    </div>

                    <div class="w-3/5 relative px-16 pt-20 pb-16 overflow-y-auto custom-scroll">
                        <div class="absolute top-12 right-12 text-[10rem] font-black text-black/[0.03] select-none pointer-events-none leading-none">录</div>
                        
                        <transition name="fade-fast" mode="out-in">
                            <div v-if="hoveredMaster" :key="'detail-' + hoveredMaster.id" class="space-y-10 relative z-10">
                                <div class="w-14 h-14 border-2 border-palace-red flex items-center justify-center text-palace-red font-black text-2xl mb-8">匠</div>
                                
                                <div class="space-y-6">
                                    <h5 class="text-5xl font-black text-[#000] tracking-widest">{{ hoveredMaster.name }}</h5>
                                    <p class="text-2xl text-palace-red font-bold italic tracking-widest leading-snug">
                                        「{{ hoveredMaster.poetry }}」
                                    </p>
                                </div>
                                
                                <div class="w-16 h-[2px] bg-black/10"></div>
                                
                                <p class="text-[16px] text-[#222] font-medium tracking-[0.15em] leading-[2.2] text-justify">
                                    {{ hoveredMaster.desc }}
                                </p>
                                
                                <div class="pt-8">
                                    <button class="text-[12px] font-black tracking-[0.4em] border-b-2 border-[#111] pb-2 hover:text-palace-red hover:border-palace-red transition-all uppercase"
                                            @click="router.push(`/master/${hoveredMaster.id}`)">
                                        进入生平志 →
                                    </button>
                                </div>
                            </div>

                            <div v-else class="h-full flex flex-col items-center pt-32 opacity-30">
                                <svg class="w-16 h-16 mb-6 text-[#111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                <p class="text-sm font-black tracking-[0.5em] uppercase text-[#111]">Hover to Preview</p>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </transition>

</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

// 导入后端的年代和大匠接口
import { listHistory , listArtisan } from '@/api/building'

const router = useRouter()
const activeId = ref('era-1')
const drawerVisible = ref(false)
const activeEra = ref(null)
const hoveredMaster = ref(null)
const loading = ref(true)

// 响应式数据源
const eraData = ref([])

// 🏮 核心数据加载与组装映射
const loadAllData = async () => {
    loading.value = true
    try {
        const [historyRes, artisanRes] = await Promise.all([
            listHistory({ pageNum: 1, pageSize: 50, status: '0' }),
            listArtisan({ pageNum: 1, pageSize: 500, status: '0' })
        ])

        const eras = historyRes.rows || historyRes.data?.rows || []
        const artisans = artisanRes.rows || artisanRes.data?.rows || []

        eras.sort((a, b) => a.orderNum - b.orderNum)

        eraData.value = eras.map(era => {
            const peers = artisans.filter(a => a.eraId === era.id).sort((a, b) => a.orderNum - b.orderNum)
            
            const chiefMatch = artisans.find(a => a.id === era.chiefId) || peers[0] || {}
            const subChiefMatch = artisans.find(a => a.id === era.subChiefId) || peers[1] || {}

            return {
                id: 'era-' + era.id,
                period: era.period || '未知年份',
                eraName: era.eraName,
                theme: era.theme,
                chief: {
                    id: chiefMatch.id,
                    name: chiefMatch.name || '佚名',
                    slogan: chiefMatch.slogan || chiefMatch.poetry || '大匠无言',
                    intro: chiefMatch.intro || chiefMatch.fullDesc || '暂无生平记载',
                    img: chiefMatch.imgUrl || 'https://images.unsplash.com/photo-1599408031306-035985043812?q=80&w=1200'
                },
                subChief: {
                    id: subChiefMatch.id,
                    name: subChiefMatch.name || '佚名',
                    desc: subChiefMatch.intro || subChiefMatch.contribution || '暂无事迹'
                },
                allPeers: peers.map(p => ({
                    id: p.id,
                    name: p.name,
                    poetry: p.poetry || p.slogan || '大方无隅，大器晚成',
                    desc: p.intro || p.contribution || '历史长河中一位熠熠生辉的营造者。'
                }))
            }
        })
    } catch (err) {
        console.error('加载大匠数据失败', err)
    } finally {
        // 🏮 【关键修复】：先把 loading 置为 false，让页面渲染真实节点
        loading.value = false
        
        // 🏮 然后在 nextTick 里去寻找渲染出来的节点绑定动画
        nextTick(() => {
            if (eraData.value.length > 0) {
                activeId.value = eraData.value[0].id
            }
            initObservers()
        })
    }
}

const scrollTo = (id) => {
    activeId.value = id
    const el = document.getElementById(id)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

const openDrawer = (era) => {
    activeEra.value = era
    hoveredMaster.value = era.allPeers[0] // 默认选中第一个
    drawerVisible.value = true
}

let scrollObserver = null
let revealObserver = null

const initObservers = () => {
    if (scrollObserver) scrollObserver.disconnect()
    if (revealObserver) revealObserver.disconnect()

    const sections = document.querySelectorAll('.content-section')
    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeId.value = entry.target.getAttribute('id')
            }
        })
    }, { rootMargin: '-30% 0px -50% 0px' }) 
    sections.forEach(sec => scrollObserver.observe(sec))

    // 🏮 这个时候，页面上真正的 .reveal-up 元素已经被拿到了！
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
}

onMounted(() => {
    loadAllData()
})

onUnmounted(() => {
    if (scrollObserver) scrollObserver.disconnect()
    if (revealObserver) revealObserver.disconnect()
})
</script>

<style scoped>
.writing-vertical { writing-mode: vertical-rl; text-orientation: upright; }
p, h1, h2, h3, h4, h5, span { font-variant-ligatures: none; -webkit-font-smoothing: antialiased; }
.reveal-up {
    opacity: 0; transform: translateY(40px);
    transition: opacity 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1);
}
.reveal-up.is-visible { opacity: 1; transform: translateY(0); }
.delay-100 { transition-delay: 150ms; }
.elegant-card {
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.elegant-card:hover { transform: translateY(-4px); }
.slide-drawer-enter-active, .slide-drawer-leave-active { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-drawer-enter-from, .slide-drawer-leave-to { transform: translateX(100%); }
.fade-fast-enter-active, .fade-fast-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-fast-enter-from { opacity: 0; transform: translateY(10px); }
.fade-fast-leave-to { opacity: 0; transform: translateY(-10px); }
.custom-scroll::-webkit-scrollbar { width: 4px; }
.custom-scroll::-webkit-scrollbar-thumb { background: #111; }
/* 防止简介过长溢出破坏排版 */
.line-clamp-3 {
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
</style>