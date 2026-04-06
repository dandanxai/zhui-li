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

    <div class="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-6 items-center">
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

    <main class="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-48 relative z-10">
        
        <section v-for="(era, index) in eraData" :key="era.id" :id="era.id" class="content-section scroll-mt-32 relative">
            <div class="absolute top-10 pointer-events-none select-none z-0 text-[15vw] font-black text-black/[0.03] leading-none"
                 :class="index % 2 === 0 ? '-right-10' : '-left-10'">
                {{ era.eraName.substring(0, 2) }}
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
                        <p class="text-[14px] text-[#333] leading-loose tracking-widest font-bold">{{ era.subChief.desc }}</p>
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
        <div v-if="drawerVisible" class="fixed inset-0 z-[100] flex justify-end">
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeId = ref('era-1')
const drawerVisible = ref(false)
const activeEra = ref(null)
const hoveredMaster = ref(null)

const eraData = [
{
    id: 'era-1',
    period: 'BC 206 - AD 589',
    eraName: '秦汉魏晋',
    theme: '规制萌芽',
    chief: { id: 'wuming', name: '将作大匠', slogan: '高台榭，美宫室', intro: '秦汉魏晋是规制的奠基期。虽匠名多佚，但阿房宫的宏阔与未央宫的深远确立了中国宫殿“高台重楼”的初始格局。', img: 'https://images.unsplash.com/photo-1599408031306-035985043812?q=80&w=1200' },
    subChief: { id: 'xiandequan', name: '萧何', desc: '虽为大汉相国，却亲自监工并定下了未央宫的建筑规制，确立了“非壮丽无以重威”的千古基调。' },
    allPeers: [
        { id: 'xiandequan', name: '萧何', poetry: '非壮丽无以重威', desc: '虽为相国，却亲定未央宫规制，确立汉代礼制建筑基调。' },
        { id: 'yangcheng', name: '阳城延', poetry: '覆压三百余里，隔离天日', desc: '秦代将作少府，主持营建阿房宫，开启了帝国建筑的宏大叙事。' },
        { id: 'lvzhao', name: '吕昭', poetry: '太极殿高，以正中轴', desc: '主持营建魏太极殿，确立了宫殿中轴对称的千古雏形。' }
    ]
},
{
    id: 'era-2',
    period: 'AD 581 - 1279',
    eraName: '隋唐宋',
    theme: '巅峰营造',
    chief: { id: 'lijie', name: '李诫', slogan: '以材为祖，定法式', intro: '他编纂了《营造法式》，将原本师徒口授的经验转化为严密的标准化模数。自此，中国建筑有了不可动摇的法理基石。', img: 'https://images.unsplash.com/photo-1582650726715-db14757c23bc?q=80&w=1200' },
    subChief: { id: 'lichun', name: '李春', desc: '隋代杰出工匠。首创敞肩式单孔石拱桥——赵州桥，其力学与几何学的完美结合，领先欧洲八百余年。' },
    allPeers: [
        { id: 'lichun', name: '李春', poetry: '如初月出云，长虹饮涧', desc: '隋代赵州桥设计者，首创敞肩石拱桥，领先世界八百余年。' },
        { id: 'yuhao', name: '喻皓', poetry: '梵塔撑天，木石有灵', desc: '一代塔王，著有世界最早木结构专著《木经》，其技艺震古烁今。' },
        { id: 'lijie-p', name: '李诫', poetry: '凡构屋之制，皆以材为祖', desc: '北宋营缮大匠，建筑标准化之父，著《营造法式》。' }
    ]
},
{
    id: 'era-3',
    period: 'AD 1271 - 1644',
    eraName: '元明',
    theme: '大朝威仪',
    chief: { id: 'kuaixiang', name: '蒯祥', slogan: '双手画龙，筑紫禁', intro: '香山帮鼻祖，主持营建北京故宫。承天门（天安门）及三大殿的宏伟规制皆出自其手，被宪宗尊为“蒯鲁班”。', img: 'https://images.unsplash.com/photo-1543013327-04669fec8935?q=80&w=1200' },
    subChief: { id: 'jicheng', name: '计成', desc: '明代造园宗师。其著作《园冶》是中国第一部造园学专著，提出了“虽由人作，宛自天开”的至高理念。' },
    allPeers: [
        { id: 'jicheng', name: '计成', poetry: '虽由人作，宛自天开', desc: '一代造园宗师，著有园林理论神作《园冶》，将文人写意融于土木。' },
        { id: 'kuailuban', name: '蔡信', poetry: '水抱皇城，金碧辉煌', desc: '参与明初北京城及故宫的规划设计，奠定九坛八庙之基。' },
        { id: 'kuaixiang-p', name: '蒯祥', poetry: '双手同绘，紫禁神工', desc: '明代宫廷建筑师，故宫营建首功。' }
    ]
},
{
    id: 'era-4',
    period: 'AD 1644 - 1912',
    eraName: '明清',
    theme: '集大成者',
    chief: { id: 'yangshilei', name: '样式雷', slogan: '烫样微缩，皇家缩影', intro: '雷氏家族掌控清代皇家建筑两百年。独创“烫样”模型，将万千宏大建筑纳于方寸之间，留下了海量珍贵图档。', img: 'https://images.unsplash.com/photo-1579308101416-09257d079d85?q=80&w=1200' },
    subChief: { id: 'leijinyu', name: '雷金玉', desc: '雷氏家族奠基人，受康熙皇帝赏识，出任圆明园“掌案”，开启了一个建筑世家的两百年传奇。' },
    allPeers: [
        { id: 'leijinyu', name: '雷金玉', poetry: '内廷样房，掌案天下', desc: '样式雷家族奠基人，受康熙赏识，主持营建万园之园圆明园。' },
        { id: 'leitingchang', name: '雷廷昌', poetry: '三海营建，集大成者', desc: '样式雷末代辉煌，主持重修颐和园与三海工程。' },
        { id: 'yangshilei-p', name: '雷发达', poetry: '一家雷氏，半部建筑史', desc: '清代宫廷建筑世家鼻祖。' }
    ]
}
]

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

onMounted(() => {
    const sections = document.querySelectorAll('.content-section')
    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeId.value = entry.target.getAttribute('id')
            }
        })
    }, { rootMargin: '-30% 0px -50% 0px' }) 
    sections.forEach(sec => scrollObserver.observe(sec))

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
})

onUnmounted(() => {
    if (scrollObserver) scrollObserver.disconnect()
    if (revealObserver) revealObserver.disconnect()
})
</script>

<style scoped>
/* 竖排文字 */
.writing-vertical { writing-mode: vertical-rl; text-orientation: upright; }

/* 强制重墨防漂浮 */
p, h1, h2, h3, h4, h5, span { font-variant-ligatures: none; -webkit-font-smoothing: antialiased; }

/* =========================================================================
   动效与抽屉样式
   ========================================================================= */
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

/* 抽屉划入动画 (右侧滑入) */
.slide-drawer-enter-active, .slide-drawer-leave-active { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-drawer-enter-from, .slide-drawer-leave-to { transform: translateX(100%); }

/* 抽屉内右侧详情淡入 */
.fade-fast-enter-active, .fade-fast-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-fast-enter-from { opacity: 0; transform: translateY(10px); }
.fade-fast-leave-to { opacity: 0; transform: translateY(-10px); }

/* 滚动条 */
.custom-scroll::-webkit-scrollbar { width: 4px; }
.custom-scroll::-webkit-scrollbar-thumb { background: #111; }
</style>