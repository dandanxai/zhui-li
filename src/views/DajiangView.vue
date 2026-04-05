<template>
<div class="h-screen w-full bg-[#f4f1ea] flex overflow-hidden font-serif selection:bg-palace-red selection:text-white relative">
    
    <aside class="w-24 md:w-32 h-full border-r border-black/5 flex flex-col items-center py-20 z-[60] bg-[#f4f1ea] shrink-0 transition-all duration-700"
        :class="{ 'opacity-0 -translate-x-full pointer-events-none': drawerVisible }">
    <div class="flex flex-col items-center gap-16 relative">
        <div class="absolute top-0 bottom-0 w-[1px] bg-black/10 -z-10"></div>
        <div v-for="era in eraData" :key="era.id" @click="scrollToEra(era.id)" class="cursor-pointer group flex flex-col items-center gap-4">
        <div class="w-2 h-2 rounded-full border border-palace-red transition-all duration-500"
            :class="currentActiveId === era.id ? 'bg-palace-red scale-150 shadow-[0_0_10px_#9b2e2e]' : 'bg-transparent'"></div>
        <span class="writing-vertical text-[10px] tracking-[0.5em] transition-all duration-500 uppercase"
                :class="currentActiveId === era.id ? 'text-palace-red font-bold' : 'text-gray-400 group-hover:text-black'">
            {{ era.eraName }}
        </span>
        </div>
    </div>
    </aside>

    <main ref="scrollContainer" @scroll="handleScroll" class="flex-1 h-full overflow-y-auto scroll-smooth snap-y snap-mandatory relative z-10 pt-24">
    
    <section v-for="era in eraData" :key="era.id" :id="era.id" 
            class="min-h-screen w-full snap-start flex flex-col justify-center px-12 md:px-32 relative overflow-hidden">
        
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none z-0">
        <span class="text-[45vw] font-black leading-none block transform rotate-[15deg] whitespace-nowrap">{{ era.eraName }}</span>
        </div>

        <div class="relative z-10 grid grid-cols-12 gap-4">
        <div class="col-span-12 lg:col-span-5 relative group">
            <div class="relative overflow-hidden aspect-[3/4] shadow-[40px_40px_80px_rgba(0,0,0,0.1)] bg-white">
            <img :src="era.chief.img" class="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" />
            <div class="absolute top-0 right-0 bg-palace-red text-white px-4 py-8 writing-vertical tracking-[0.5em] text-sm font-bold shadow-xl">
                {{ era.theme }}
            </div>
            </div>
            <div class="absolute -bottom-8 -left-8 w-48 h-48 border-l-2 border-b-2 border-palace-red/20 -z-10"></div>
        </div>

        <div class="col-span-12 lg:col-span-6 lg:col-start-8 flex flex-col justify-center space-y-10 pt-12 lg:pt-0">
            <div class="space-y-4">
            <div class="flex items-center gap-4">
                <span class="text-palace-red font-mono text-sm tracking-widest uppercase font-bold">{{ era.period }}</span>
                <div class="h-[1px] flex-1 bg-gradient-to-r from-palace-red/40 to-transparent"></div>
            </div>
            <h2 class="text-6xl md:text-8xl font-black text-[#111] leading-none tracking-tighter">{{ era.chief.name }}</h2>
            </div>
            <div class="space-y-6">
            <p class="text-2xl text-gray-800 font-medium leading-snug tracking-widest border-l-4 border-palace-red pl-6 italic">{{ era.chief.slogan }}</p>
            <p class="text-gray-500 leading-relaxed text-lg tracking-wide text-justify font-light opacity-80">{{ era.chief.intro }}</p>
            </div>
            <div class="flex flex-wrap gap-6 pt-10">
            <button @click="$router.push(`/master/${era.chief.id}`)" class="px-10 py-4 bg-[#111] text-white text-xs tracking-[0.4em] hover:bg-palace-red transition-all flex items-center gap-4 shadow-xl">
                研读平生 <span class="text-lg">→</span>
            </button>
            <button @click="openDrawer(era)" class="px-10 py-4 border-2 border-[#111] text-[#111] text-xs tracking-[0.4em] hover:bg-[#111] hover:text-white transition-all font-bold">
                探索{{ era.eraName }}代众匠
            </button>
            </div>
        </div>
        </div>
    </section>
    </main>

    <transition name="ink-slide">
    <div v-if="drawerVisible" class="fixed inset-0 z-[100] flex">
        
        <div class="absolute inset-0 bg-[#111]/90 backdrop-blur-md transition-all duration-500" @click="drawerVisible = false">
        <transition name="fade-ink-mask">
            <div v-if="hoveredMaster" :key="'mask-' + hoveredMaster.id" 
                class="absolute left-10 bottom-20 text-[10vw] font-black text-white/5 pointer-events-none select-none writing-vertical uppercase tracking-tighter">
            {{ hoveredMaster.quoteTitle }} // {{ hoveredMaster.name }}
            </div>
        </transition>
        </div>
        
        <div class="relative ml-auto w-full max-w-6xl bg-[#fcfaf5] h-full shadow-2xl p-16 flex flex-col overflow-hidden">
        <div class="absolute top-0 right-0 text-[20rem] font-black text-black/[0.01] pointer-events-none select-none">匠</div>
        
        <header class="flex justify-between items-end mb-20 border-b-2 border-black/5 pb-10 relative z-10">
            <div>
            <span class="text-palace-red tracking-[0.8em] text-xs font-bold uppercase mb-4 block">Archive Register</span>
            <h4 class="text-5xl font-black tracking-widest text-[#111]">{{ activeEra.eraName }}代名匠全集</h4>
            </div>
            <button @click="drawerVisible = false" class="text-3xl hover:rotate-90 transition-all p-4">✕</button>
        </header>

        <div class="flex-1 grid grid-cols-12 gap-12 overflow-hidden relative z-10">
            <div class="col-span-5 overflow-y-auto pr-8 custom-scroll space-y-4">
            <div v-for="m in activeEra.peers" :key="m.id" 
                @mouseenter="hoveredMaster = m"
                @mouseleave="hoveredMaster = null"
                class="p-6 cursor-pointer border-b border-black/5 transition-all duration-500 hover:bg-palace-red hover:text-white group"
                @click="$router.push(`/master/${m.id}`)">
                <div class="flex justify-between items-center">
                <span class="text-2xl font-bold tracking-widest">{{ m.name }}</span>
                <span class="text-[10px] opacity-0 group-hover:opacity-60 tracking-widest transition-opacity uppercase">Trace_Path →</span>
                </div>
            </div>
            </div>

            <div class="col-span-7 flex flex-col justify-center pl-16 border-l border-black/5 relative">
            <transition name="fade-ink" mode="out-in">
                <div v-if="hoveredMaster" :key="'detail-' + hoveredMaster.id" class="space-y-10">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full border-2 border-palace-red flex items-center justify-center text-palace-red font-bold">匠</div>
                    <span class="text-xl tracking-[0.4em] text-palace-red font-bold">「营造诗志」</span>
                </div>
                <p class="text-4xl md:text-5xl font-black text-[#111] leading-tight writing-vertical-ltr tracking-tighter">
                    {{ hoveredMaster.poetry }}
                </p>
                <p class="text-gray-400 text-sm tracking-widest italic pt-10 border-t border-black/5">{{ hoveredMaster.desc }}</p>
                </div>
                <div v-else class="text-center opacity-5">
                <p class="text-9xl font-black">匠心独运</p>
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
import { ref, onMounted } from 'vue'

const scrollContainer = ref(null)
const currentActiveId = ref('era-1')
const drawerVisible = ref(false)
const activeEra = ref(null)
const hoveredMaster = ref(null)

const eraData = [
{
    id: 'era-1',
    period: 'BC 206 - AD 589',
    eraName: '秦汉魏晋',
    theme: '规制萌芽',
    chief: { id: 'wuming', name: '将作大匠', slogan: '高台榭，美宫室', intro: '秦汉魏晋是规制的奠基期。虽匠名多佚，但阿房宫的宏阔与未央宫的深远确立了中国宫殿“高台重楼”的初始格局。', img: 'https://images.unsplash.com/photo-1599408031306-035985043812?w=1200' },
    peers: [
    { id: 'yangcheng', name: '阳城延', quoteTitle: '秦筑大少府', poetry: '覆压三百余里，隔离天日', desc: '秦代将作少府，主持营建阿房宫。' },
    { id: 'lvzhao', name: '吕昭', quoteTitle: '魏太极开创', poetry: '太极殿高，以正中轴', desc: '主持营建魏太极殿，确立了宫殿中轴对称雏形。' },
    { id: 'xiandequan', name: '萧何', quoteTitle: '汉宫定基人', poetry: '非壮丽无以重威', desc: '虽为相国，却亲定未央宫规制，确立汉代礼制建筑基调。' }
    ]
},
{
    id: 'era-2',
    period: 'AD 581 - 1279',
    eraName: '隋唐宋',
    theme: '巅峰营造',
    chief: { id: 'lijie', name: '李诫', slogan: '以材为祖，定法式', intro: '他编纂了《营造法式》，将原本师徒口授的经验转化为严密的标准化模数，影响后世千年。', img: 'https://images.unsplash.com/photo-1582650726715-db14757c23bc?w=1200' },
    peers: [
    { id: 'lijie-p', name: '李诫', quoteTitle: '营造法式编修', poetry: '凡构屋之制，皆以材为祖', desc: '北宋营缮大匠，建筑标准化之父。' },
    { id: 'yuhao', name: '喻皓', quoteTitle: '北宋塔王', poetry: '梵塔撑天，木石有灵', desc: '一代塔王，著有世界最早木结构专著《木经》。' },
    { id: 'lichun', name: '李春', quoteTitle: '赵州桥匠', poetry: '如初月出云，长虹饮涧', desc: '隋代赵州桥设计者，敞肩拱宗师。' }
    ]
},
{
    id: 'era-3',
    period: 'AD 1271 - 1644',
    eraName: '元明',
    theme: '大朝威仪',
    chief: { id: 'kuaixiang', name: '蒯祥', slogan: '双手画龙，筑紫禁', intro: '香山帮鼻祖，主持营建北京故宫。承天门（天安门）及三大殿的宏伟规制皆出自其手。', img: 'https://images.unsplash.com/photo-1543013327-04669fec8935?w=1200' },
    peers: [
    { id: 'kuaixiang-p', name: '蒯祥', quoteTitle: '故宫总规划师', poetry: '双手同绘，紫禁神工', desc: '明代宫廷建筑师，故宫营建首功。' },
    { id: 'jicheng', name: '计成', quoteTitle: '造园宗师', poetry: '虽由人作，宛自天开', desc: '一代造园宗师，著有园林理论神作《园冶》。' }
    ]
},
{
    id: 'era-4',
    period: 'AD 1644 - 1912',
    eraName: '清',
    theme: '集大成者',
    chief: { id: 'yangshilei', name: '样式雷', slogan: '烫样微缩，皇家缩影', intro: '雷氏家族掌控清代皇家建筑两百年。独创“烫样”模型，将万千宏大建筑纳于方寸。', img: 'https://images.unsplash.com/photo-1579308101416-09257d079d85?w=1200' },
    peers: [
    { id: 'yangshilei-p', name: '样式雷', quoteTitle: '皇家建筑世家', poetry: '一家雷氏，半部建筑史', desc: '清代宫廷建筑世家。' },
    { id: 'leijinyu', name: '雷金玉', quoteTitle: '圆明园掌案', poetry: '内廷样房，掌案天下', desc: '样式雷家族奠基人，主持营建圆明园。' }
    ]
}
];

const scrollToEra = (id) => {
const el = document.getElementById(id)
if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const handleScroll = () => {
const sections = eraData.map(e => document.getElementById(e.id))
const scrollPos = scrollContainer.value.scrollTop + 300
sections.forEach((section, idx) => {
    if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
    currentActiveId.value = eraData[idx].id
    }
})
}

const openDrawer = (era) => {
activeEra.value = era
drawerVisible.value = true
}
</script>

<style scoped>
.writing-vertical { writing-mode: vertical-rl; }
.writing-vertical-ltr { writing-mode: vertical-lr; }

/* 核心修正 1：背景水印物理隔离 */
section { overflow: hidden; }

/* 滚动条美化 */
.custom-scroll::-webkit-scrollbar { width: 3px; }
.custom-scroll::-webkit-scrollbar-thumb { background: #9b2e2e; }

/* 水墨感切换动画 */
.ink-slide-enter-active, .ink-slide-leave-active { transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.ink-slide-enter-from { transform: translateX(100%); filter: blur(20px); }
.ink-slide-leave-to { transform: translateX(100%); opacity: 0; }

/* 右侧详情淡入 */
.fade-ink-enter-active, .fade-ink-leave-active { transition: all 0.6s ease; }
.fade-ink-enter-from { opacity: 0; transform: translateY(20px); filter: blur(5px); }
.fade-ink-leave-to { opacity: 0; transform: translateY(-20px); filter: blur(5px); }

/* 左侧蒙版文字淡入 */
.fade-ink-mask-enter-active, .fade-ink-mask-leave-active { transition: all 1s ease; }
.fade-ink-mask-enter-from { opacity: 0; transform: translateX(-50px); filter: blur(10px); }
.fade-ink-mask-leave-to { opacity: 0; transform: translateX(30px); filter: blur(10px); }
</style>