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
                <button v-for="(item, i) in dynamicNav" :key="item.id" @click="scrollTo(item.id)" 
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

        <section v-for="(cat, index) in displayCategories" :key="cat.id" :id="`cat-section-${index}`" class="content-section scroll-mt-32 pb-12">
            
            <div class="flex items-end justify-between mb-16 border-b-2 border-black/10 pb-6 group cursor-pointer reveal-up" @click="router.push(`/lanzhu/${cat.id}`)">
                <h2 class="text-4xl md:text-5xl font-black text-[#000] tracking-widest group-hover:text-palace-red transition-colors duration-500">
                    0{{ index + 5 }}. {{ cat.title }}
                </h2>
                <span class="text-xs font-bold text-gray-400 tracking-[0.4em] uppercase group-hover:translate-x-2 group-hover:text-palace-red transition-all duration-500 hidden md:block">Explore Category →</span>
            </div>

            <div v-if="index === 0">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start reveal-up" v-for="feat in getFeaturedByCat(cat.id).slice(0, 1)" :key="feat.id">
                    <div class="lg:col-span-8 group cursor-pointer elegant-card" @click="router.push(`/building/${feat.architectureId}`)">
                        <div class="relative overflow-hidden aspect-[16/10] bg-gray-200 mb-12 border-2 border-black/5 shadow-md group-hover:shadow-xl transition-shadow duration-700">
                            <img :src="feat.image" class="w-full h-full object-cover transition-transform duration-[1.5s] scale-100 group-hover:scale-[1.03] ease-out" />
                        </div>
                        <h3 class="text-3xl font-black tracking-widest mb-6 text-[#000] group-hover:text-palace-red transition-colors duration-500">{{ feat.title }}</h3>
                        <p class="text-[16px] text-[#111] tracking-[0.15em] leading-loose text-justify font-bold italic">{{ feat.description }}</p>
                    </div>
                    <div class="lg:col-span-4 border-l-4 border-palace-red pl-12 py-10 space-y-12">
                        <div v-for="(block, idx) in parseRemark(feat.remark)" :key="idx">
                            <p class="text-[13px] text-[#111] font-black tracking-[0.4em] uppercase mb-4">
                                {{ block.label }}
                            </p>
                            <p class="text-[18px] text-[#000] font-black tracking-widest leading-relaxed">
                                {{ block.content }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="index === 1">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div v-for="(feat, fIdx) in getFeaturedByCat(cat.id).slice(0, 2)" :key="feat.id" class="group cursor-pointer elegant-card reveal-up" :class="{'delay-100': fIdx === 1}" @click="router.push(`/building/${feat.architectureId}`)">
                        <div class="overflow-hidden mb-8 shadow-md group-hover:shadow-xl transition-shadow duration-700 border-2 border-black/5">
                            <img :src="feat.image" class="w-full aspect-video object-cover transition-transform duration-[1.5s] scale-100 group-hover:scale-[1.03] ease-out">
                        </div>
                        <h3 class="text-2xl font-black tracking-widest mb-4 text-[#000] group-hover:text-palace-red transition-colors duration-500">{{ feat.title }}</h3>
                        <p class="text-[16px] text-[#111] tracking-widest leading-loose font-bold">{{ feat.description }}</p>
                    </div>
                </div>
            </div>

            <div v-else-if="index === 2">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div v-for="(feat, fIdx) in getFeaturedByCat(cat.id).slice(0, 3)" :key="feat.id" class="group cursor-pointer elegant-card reveal-up" :style="`transition-delay: ${fIdx * 100}ms`" @click="router.push(`/building/${feat.architectureId}`)">
                        <div class="overflow-hidden mb-8 aspect-[3/4] shadow-md group-hover:shadow-2xl transition-shadow duration-700 border-2 border-black/5">
                            <img :src="feat.image" class="w-full h-full object-cover transition-transform duration-[1.5s] scale-100 group-hover:scale-[1.03] ease-out">
                        </div>
                        <h3 class="text-2xl font-black tracking-widest text-center text-[#000] group-hover:text-palace-red transition-colors duration-500">{{ feat.title }}</h3>
                    </div>
                </div>
            </div>

            <div v-else-if="index === 3">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div v-for="(feat, fIdx) in getFeaturedByCat(cat.id).slice(0, 2)" :key="feat.id" class="p-12 bg-white border-2 border-black/10 hover:border-palace-red transition-all duration-500 group cursor-pointer elegant-shadow elegant-card reveal-up" :style="`transition-delay: ${fIdx * 150}ms`" @click="router.push(`/building/${feat.architectureId}`)">
                        <h3 class="text-3xl font-black tracking-widest mb-6 group-hover:text-palace-red transition-colors text-[#000]">{{ feat.title }}</h3>
                        <p class="text-[16px] text-[#111] tracking-[0.1em] leading-relaxed font-bold italic line-clamp-3">{{ feat.description }}</p>
                    </div>
                </div>
            </div>

        </section>

    </main>
    </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

// 🏮 直接复用你已经写好的规范化 API 文件
import { listCategory , listFeatured } from '@/api/building' 

const router = useRouter()
const activeId = ref('roof')

// ================= 数据状态 =================
const categoryList = ref([])
const featuredList = ref([])

// 🏮 截取前 4 个分类作为 05-08 模块显示
const displayCategories = computed(() => {
    return categoryList.value.slice(0, 4)
})

// 🏮 根据分类 ID 过滤对应的精选建筑
const getFeaturedByCat = (categoryId) => {
    // 确保只渲染属于当前分类的精选内容
    return featuredList.value.filter(item => item.categoryId === categoryId)
}

// 🏮 解析备注文本：将后台录入的文本按行拆分为 "标题 + 内容" 的数组
const parseRemark = (text) => {
    if (!text) return [];
    // 按换行符分割，去掉头尾空格，过滤掉空行
    const lines = text.split('\n').map(line => line.trim()).filter(line => line !== '');
    const blocks = [];
    // 两两一组组合成对象
    for (let i = 0; i < lines.length; i += 2) {
        blocks.push({
            label: lines[i],
            content: lines[i + 1] || '' // 防止最后一行落单
        });
    }
    return blocks;
}

// 🏮 动态生成右侧 Part II 导航
const dynamicNav = computed(() => {
    return displayCategories.value.map((cat, i) => ({
        name: cat.title,
        id: `cat-section-${i}` // 绑定锚点 ID
    }))
})

const navUpper = [
    { name: '屋顶形制', id: 'roof' },
    { name: '台基等级', id: 'platform' },
    { name: '色彩法则', id: 'color' },
    { name: '空间面阔', id: 'layout' }
]

// ================= 核心加载逻辑 =================
const loadAllData = async () => {
    try {
        // 🏮 配置查询参数，突破若依默认的 pageSize: 10 限制
        const categoryQuery = { 
            pageNum: 1, 
            pageSize: 50, 
            status: '0' // 仅查询状态为"启用"的分类
        };
        const featuredQuery = { 
            pageNum: 1, 
            pageSize: 500 // 给一个足够大的数值，确保前端能拿到所有精选建筑
        };

        // 并行发起两个请求，极大缩短页面白屏时间
        const [catRes, featRes] = await Promise.all([
            listCategory(categoryQuery),
            listFeatured(featuredQuery)
        ]);
        // 兼容若依的 rows 结构，提取数据
        categoryList.value = catRes.rows || catRes.data?.rows || catRes.data || [];
        featuredList.value = featRes.rows || featRes.data?.rows || featRes.data || [];

        
        console.log(categoryList.value);
        console.log(featuredList.value);
        
        // 数据渲染 DOM 后，重新绑定滚动监听和出现动画，防止失效
        nextTick(() => {
            initObservers()
        })
    } catch (err) {
        console.error("前台动态数据获取失败", err)
    }
}

// ================= 动画与交互 =================
const scrollTo = (id) => {
    activeId.value = id
    const el = document.getElementById(id)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

let scrollObserver = null
let revealObserver = null

const initObservers = () => {
    // 断开旧的监听，防止重复绑定引发性能问题
    if (scrollObserver) scrollObserver.disconnect()
    if (revealObserver) revealObserver.disconnect()

    // 1. 滚动锚点高亮监听
    const sections = document.querySelectorAll('.content-section')
    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeId.value = entry.target.getAttribute('id')
            }
        })
    }, { rootMargin: '-20% 0px -60% 0px' }) 
    sections.forEach(sec => scrollObserver.observe(sec))

    // 2. Apple 风格上浮动效监听
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
    loadAllData() // 初始化加载
})

onUnmounted(() => {
    if (scrollObserver) scrollObserver.disconnect()
    if (revealObserver) revealObserver.disconnect()
})
</script>

<style scoped>
/* 侧边刻度尺特效 */
.nav-item { position: relative; }
.nav-item::before {
    content: ''; position: absolute; left: -32px; top: 50%; transform: translateY(-50%);
    width: 0; height: 3px; background-color: #9b2e2e; transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-item.text-palace-red::before { width: 22px; }

/* Apple 风浮现动画 */
.reveal-up {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1);
}
.reveal-up.is-visible {
    opacity: 1; transform: translateY(0);
}

/* 延迟类 */
.delay-100 { transition-delay: 100ms; }

/* 卡片悬浮动效 */
.elegant-card {
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.elegant-card:hover { transform: translateY(-4px); }
.elegant-shadow:hover { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08); }

/* 多行文本省略号 */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>