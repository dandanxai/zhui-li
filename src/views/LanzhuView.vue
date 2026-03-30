<template>
<div class="min-h-screen bg-[#fcfaf5] text-[#2c2c2c] pt-32 pb-24 relative selection:bg-palace-red selection:text-white">
    
    <div class="fixed inset-0 opacity-[0.04] pointer-events-none" style="background-image: radial-gradient(#000000 1px, transparent 1px); background-size: 40px 40px;"></div>

    <header class="w-full max-w-7xl mx-auto px-6 md:px-12 mb-24 relative z-10">
    <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-[1px] bg-palace-red"></div>
        <span class="text-palace-red font-serif tracking-[0.4em] text-xs uppercase">Architecture & Heritage</span>
    </div>
    <h1 class="text-5xl md:text-7xl font-serif text-[#111] tracking-[0.1em] mb-8 leading-tight">
        览筑 <span class="opacity-40">· 规制与典范</span>
    </h1>
    <p class="text-lg md:text-xl font-light tracking-widest leading-relaxed max-w-3xl text-gray-600 border-l-2 border-palace-red/50 pl-6">
        从天子之堂到市井小巷，从庙堂之肃到山水之间。中国古建在严苛的礼制法度之下，依然创造出了极致的结构与人文之美。
    </p>
    </header>

    <div class="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 relative z-10">
    
    <aside class="md:w-1/4 hidden md:block relative">
        <div class="sticky top-40 flex flex-col gap-2 border-l border-[#e5e5e5] pl-6 chapter-nav">
        <p class="text-xs font-bold text-[#111] tracking-[0.2em] mb-3 mt-2">上篇 · 规制法度</p>
        <button data-target="roof" @click="scrollTo('roof')" class="text-left font-serif tracking-widest text-sm transition-all duration-300 hover:text-palace-red nav-item active-nav py-2 text-palace-red font-bold">01 / 屋顶形制</button>
        <button data-target="platform" @click="scrollTo('platform')" class="text-left font-serif tracking-widest text-sm text-gray-400 hover:text-palace-red transition-all duration-300 nav-item py-2">02 / 台基等级</button>
        <button data-target="color" @click="scrollTo('color')" class="text-left font-serif tracking-widest text-sm text-gray-400 hover:text-palace-red transition-all duration-300 nav-item py-2">03 / 色彩法则</button>
        <button data-target="layout" @click="scrollTo('layout')" class="text-left font-serif tracking-widest text-sm text-gray-400 hover:text-palace-red transition-all duration-300 nav-item py-2">04 / 空间面阔</button>

        <p class="text-xs font-bold text-[#111] tracking-[0.2em] mb-3 mt-8">下篇 · 营造典范</p>
        <button data-target="palace" @click="scrollTo('palace')" class="text-left font-serif tracking-widest text-sm text-gray-400 hover:text-palace-red transition-all duration-300 nav-item py-2">05 / 皇宫威仪</button>
        <button data-target="official" @click="scrollTo('official')" class="text-left font-serif tracking-widest text-sm text-gray-400 hover:text-palace-red transition-all duration-300 nav-item py-2">06 / 坛庙与官衙</button>
        <button data-target="dwelling" @click="scrollTo('dwelling')" class="text-left font-serif tracking-widest text-sm text-gray-400 hover:text-palace-red transition-all duration-300 nav-item py-2">07 / 烟火民居</button>
        <button data-target="bridge" @click="scrollTo('bridge')" class="text-left font-serif tracking-widest text-sm text-gray-400 hover:text-palace-red transition-all duration-300 nav-item py-2">08 / 千载桥梁</button>
        </div>
    </aside>

    <main class="md:w-3/4 flex flex-col gap-32">
        
        <section id="roof" class="content-section scroll-mt-32">
        <h2 class="text-3xl font-serif text-[#111] tracking-widest mb-4 flex items-center gap-4"><span class="text-palace-red text-xl">01.</span> 屋顶形制</h2>
        <div class="w-full h-[1px] bg-black/10 mb-8"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white border border-[#eaeaea] p-8 rounded-xl shadow-sm">
            <h3 class="text-palace-red font-serif tracking-widest mb-3 text-lg">重檐庑殿顶 (至尊)</h3>
            <p class="text-sm tracking-wider leading-relaxed text-gray-600">最高级的屋顶样式，严格限制为皇家宫殿使用，民间绝不可僭越。</p>
            </div>
            <div class="bg-[#f7f5f0] border border-[#eaeaea] p-8 rounded-xl">
            <h3 class="text-[#111] font-serif tracking-widest mb-3 text-lg">重檐歇山顶 (次尊)</h3>
            <p class="text-sm tracking-wider leading-relaxed text-gray-600">结合庑殿与悬山特点，常用于皇宫侧殿、重要官署（如天安门）。</p>
            </div>
        </div>
        </section>

        <section id="platform" class="content-section scroll-mt-32">
        <h2 class="text-3xl font-serif text-[#111] tracking-widest mb-4 flex items-center gap-4"><span class="text-palace-red text-xl">02.</span> 台基等级</h2>
        <div class="w-full h-[1px] bg-black/10 mb-8"></div>
        <p class="text-base leading-loose tracking-wider font-light text-justify text-gray-700">“高台榭，美宫室”。最高等级的为**须弥座**，常由汉白玉雕刻而成。紫禁城三大殿是罕见的三层须弥座。</p>
        </section>

        <section id="color" class="content-section scroll-mt-32">
        <h2 class="text-3xl font-serif text-[#111] tracking-widest mb-4 flex items-center gap-4"><span class="text-palace-red text-xl">03.</span> 色彩法则</h2>
        <div class="w-full h-[1px] bg-black/10 mb-8"></div>
        <p class="text-base leading-loose tracking-wider font-light text-justify text-gray-700 mb-6">黄为贵，红为尊。色彩不仅是装饰，更是阴阳五行的视觉表达。</p>
        </section>

        <section id="layout" class="content-section scroll-mt-32">
        <h2 class="text-3xl font-serif text-[#111] tracking-widest mb-4 flex items-center gap-4"><span class="text-palace-red text-xl">04.</span> 空间面阔</h2>
        <div class="w-full h-[1px] bg-black/10 mb-8"></div>
        <p class="text-base leading-loose tracking-wider font-light text-justify text-gray-700">开间数必为奇数。面阔九间、进深五间，即“九五之尊”，象征帝王最高权威。</p>
        </section>

        <div class="w-full py-4 flex items-center justify-center">
        <div class="w-2 h-2 rounded-full bg-palace-red/30 mx-2"></div>
        <div class="w-2 h-2 rounded-full bg-palace-red/50 mx-2"></div>
        <div class="w-2 h-2 rounded-full bg-palace-red/30 mx-2"></div>
        </div>

        <section id="palace" class="content-section scroll-mt-32 group">
        <h2 @click="$router.push('/lanzhu/palace')" class="text-3xl font-serif text-[#111] tracking-widest mb-4 flex items-center justify-between cursor-pointer hover:text-palace-red transition-colors">
            <div class="flex items-center gap-4">
            <span class="text-palace-red text-xl">05.</span> 皇宫威仪
            </div>
            <span class="text-[10px] font-sans text-palace-red opacity-0 group-hover:opacity-100 group-hover:-translate-x-4 transition-all duration-500 tracking-[0.2em] hidden md:block">
            查看更多图鉴 ENTIRE COLLECTION →
            </span>
        </h2>
        <div class="w-full h-[1px] bg-black/10 mb-8"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="group/item cursor-pointer" @click="$router.push('/building/taihedian')">
            <div class="overflow-hidden rounded-xl mb-4 aspect-[4/3] bg-gray-200 shadow-sm">
                <img src="https://images.unsplash.com/photo-1543013327-04669fec8935?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700">
            </div>
            <h3 class="text-xl font-serif text-[#111] tracking-widest mb-2 border-l-2 border-palace-red pl-3">北京 · 故宫太和殿</h3>
            <p class="text-sm text-gray-600 tracking-wider leading-relaxed text-justify">集中国古建最高规制于一身，重檐庑殿顶与三层须弥座展现了皇权的至高无上。</p>
            </div>
            <div class="group/item cursor-pointer" @click="$router.push('/building/dazhengdian')">
            <div class="overflow-hidden rounded-xl mb-4 aspect-[4/3] bg-gray-200 shadow-sm">
                <img src="https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700">
            </div>
            <h3 class="text-xl font-serif text-[#111] tracking-widest mb-2 border-l-2 border-[#e6b422] pl-3">沈阳 · 故宫大政殿</h3>
            <p class="text-sm text-gray-600 tracking-wider leading-relaxed text-justify">清初八角重檐攒尖顶，将汉、满、蒙建筑文化完美融合，极具民族特色。</p>
            </div>
        </div>
        </section>

        <section id="official" class="content-section scroll-mt-32 group">
        <h2 @click="$router.push('/lanzhu/official')" class="text-3xl font-serif text-[#111] tracking-widest mb-4 flex items-center justify-between cursor-pointer hover:text-palace-red transition-colors">
            <div class="flex items-center gap-4">
            <span class="text-palace-red text-xl">06.</span> 坛庙与官衙
            </div>
            <span class="text-[10px] font-sans text-palace-red opacity-0 group-hover:opacity-100 group-hover:-translate-x-4 transition-all duration-500 tracking-[0.2em] hidden md:block">
            查看更多图鉴 ENTIRE COLLECTION →
            </span>
        </h2>
        <div class="w-full h-[1px] bg-black/10 mb-8"></div>
        
        <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row gap-6 group/item items-center cursor-pointer" @click="$router.push('/building/qiniandian')">
            <div class="md:w-1/2 overflow-hidden rounded-xl aspect-video bg-gray-200 shadow-sm">
                <img src="https://images.unsplash.com/photo-1582650517303-b42616d56f8e?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700">
            </div>
            <div class="md:w-1/2">
                <h3 class="text-2xl font-serif text-[#111] tracking-widest mb-3">北京 · 天坛祈年殿</h3>
                <p class="text-sm text-gray-600 tracking-wider leading-relaxed">三重檐圆攒尖顶象征青天，其内部梁柱结构暗合时令星宿，是天人合一思想的巅峰。</p>
            </div>
            </div>
            <div class="flex flex-col md:flex-row-reverse gap-6 group/item items-center cursor-pointer" @click="$router.push('/building/pxys')">
            <div class="md:w-1/2 overflow-hidden rounded-xl aspect-video bg-gray-200 shadow-sm">
                <img src="https://images.unsplash.com/photo-1542640244-7e672d6cb466?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700">
            </div>
            <div class="md:w-1/2">
                <h3 class="text-2xl font-serif text-[#111] tracking-widest mb-3">山西 · 平遥县署</h3>
                <p class="text-sm text-gray-600 tracking-wider leading-relaxed">中国现存最完整的古县衙，通过严谨的中轴线对称布局，营造出一种公门的肃穆与威严。</p>
            </div>
            </div>
        </div>
        </section>

        <section id="dwelling" class="content-section scroll-mt-32 group">
        <h2 @click="$router.push('/lanzhu/dwelling')" class="text-3xl font-serif text-[#111] tracking-widest mb-4 flex items-center justify-between cursor-pointer hover:text-palace-red transition-colors">
            <div class="flex items-center gap-4">
            <span class="text-palace-red text-xl">07.</span> 烟火民居
            </div>
            <span class="text-[10px] font-sans text-palace-red opacity-0 group-hover:opacity-100 group-hover:-translate-x-4 transition-all duration-500 tracking-[0.2em] hidden md:block">
            查看更多图鉴 ENTIRE COLLECTION →
            </span>
        </h2>
        <div class="w-full h-[1px] bg-black/10 mb-8"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="group/item cursor-pointer" @click="$router.push('/building/hongcun')">
            <div class="overflow-hidden rounded-xl mb-4 aspect-square bg-gray-200 shadow-sm">
                <img src="https://images.unsplash.com/photo-1529982412356-901cc3a363bc?w=600" class="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700">
            </div>
            <h3 class="text-lg font-serif text-[#111] tracking-widest mb-2">皖南徽派民居</h3>
            <p class="text-xs text-gray-600 tracking-wider leading-relaxed">粉墙黛瓦，马头墙错落有致，如水墨长卷。</p>
            </div>
            <div class="group/item cursor-pointer" @click="$router.push('/building/tulou')">
            <div class="overflow-hidden rounded-xl mb-4 aspect-square bg-gray-200 shadow-sm">
                <img src="https://images.unsplash.com/photo-1628100808298-508b9cdfb705?w=600" class="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700">
            </div>
            <h3 class="text-lg font-serif text-[#111] tracking-widest mb-2">福建客家土楼</h3>
            <p class="text-xs text-gray-600 tracking-wider leading-relaxed">集聚族而居与防御堡垒于一体，展现了震撼的向心力。</p>
            </div>
            <div class="group/item cursor-pointer" @click="$router.push('/building/siheyuan')">
            <div class="overflow-hidden rounded-xl mb-4 aspect-square bg-gray-200 shadow-sm">
                <img src="https://images.unsplash.com/photo-1563290637-295ea9fdf196?w=600" class="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700">
            </div>
            <h3 class="text-lg font-serif text-[#111] tracking-widest mb-2">北京传统四合院</h3>
            <p class="text-xs text-gray-600 tracking-wider leading-relaxed">严谨的院落围合，是北方宗法伦理的建筑缩影。</p>
            </div>
        </div>
        </section>

        <section id="bridge" class="content-section scroll-mt-32 group">
        <h2 @click="$router.push('/lanzhu/bridge')" class="text-3xl font-serif text-[#111] tracking-widest mb-4 flex items-center justify-between cursor-pointer hover:text-palace-red transition-colors">
            <div class="flex items-center gap-4">
            <span class="text-palace-red text-xl">08.</span> 千载桥梁
            </div>
            <span class="text-[10px] font-sans text-palace-red opacity-0 group-hover:opacity-100 group-hover:-translate-x-4 transition-all duration-500 tracking-[0.2em] hidden md:block">
            查看更多图鉴 ENTIRE COLLECTION →
            </span>
        </h2>
        <div class="w-full h-[1px] bg-black/10 mb-8"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white border border-[#eaeaea] rounded-xl overflow-hidden hover:shadow-md transition-all group/item cursor-pointer" @click="$router.push('/building/zhaozhou')">
            <div class="h-48 overflow-hidden bg-gray-200">
                <img src="https://images.unsplash.com/photo-1596766782334-0f2c422f281e?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700">
            </div>
            <div class="p-6">
                <h3 class="text-xl font-serif text-[#111] tracking-widest mb-2">河北 · 赵州桥</h3>
                <p class="text-sm text-gray-600 tracking-wider leading-relaxed">李春设计的敞肩石拱桥，不仅节省材料，更让洪水能从侧拱通过，跨越千年依旧稳固。</p>
            </div>
            </div>
            <div class="bg-white border border-[#eaeaea] rounded-xl overflow-hidden hover:shadow-md transition-all group/item cursor-pointer" @click="$router.push('/building/guangji')">
            <div class="h-48 overflow-hidden bg-gray-200">
                <img src="https://images.unsplash.com/photo-1582650726715-db14757c23bc?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700">
            </div>
            <div class="p-6">
                <h3 class="text-xl font-serif text-[#111] tracking-widest mb-2">潮州 · 广济桥</h3>
                <p class="text-sm text-gray-600 tracking-wider leading-relaxed">独特的启闭式桥梁，将梁桥、浮桥、拱桥融为一体，展现了古人极强的因地制宜智慧。</p>
            </div>
            </div>
        </div>
        </section>

    </main>
    </div>
</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const scrollTo = (id) => {
const el = document.getElementById(id)
if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
}

let observer = null

onMounted(() => {
const sections = document.querySelectorAll('.content-section')
const navItems = document.querySelectorAll('.nav-item')

observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        navItems.forEach(item => {
        item.classList.remove('text-palace-red', 'font-bold')
        item.classList.add('text-gray-400')
        })
        
        const id = entry.target.getAttribute('id')
        const activeBtn = document.querySelector(`.nav-item[data-target="${id}"]`)
        
        if (activeBtn) {
        activeBtn.classList.remove('text-gray-400')
        activeBtn.classList.add('text-palace-red', 'font-bold')
        }
    }
    })
}, { rootMargin: '-10% 0px -70% 0px' }) 

sections.forEach(sec => observer.observe(sec))
})

onUnmounted(() => {
if (observer) observer.disconnect()
})
</script>

<style scoped>
.nav-item {
position: relative;
}
.nav-item::before {
content: '';
position: absolute;
left: -25px;
top: 50%;
transform: translateY(-50%);
width: 0;
height: 2px;
background-color: #9b2e2e; 
transition: width 0.3s ease;
}
.nav-item.text-palace-red::before {
width: 15px;
}
</style>