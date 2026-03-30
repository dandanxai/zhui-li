<template>
<div class="h-screen w-full bg-[#f2eee4] flex overflow-hidden selection:bg-palace-red">
    
    <aside class="w-40 md:w-60 h-full border-r border-black/5 flex flex-col justify-center px-8 z-50 bg-[#f2eee4] relative shrink-0">
    <div class="space-y-12 relative">
        <div v-for="(era, index) in eraData" :key="index" @click="scrollToEra(era.id)" class="cursor-pointer group relative pl-4">
        <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-palace-red transition-all duration-500 scale-0"
            :class="{ 'scale-100 shadow-[0_0_10px_#9b2e2e]': currentActiveId === era.id }"></div>
        <p class="text-[10px] font-serif tracking-[0.2em] mb-1 transition-colors duration-500"
            :class="currentActiveId === era.id ? 'text-palace-red' : 'text-gray-400 group-hover:text-black'">
            {{ era.period }}
        </p>
        <h2 class="text-2xl md:text-4xl font-serif tracking-widest transition-all duration-500"
            :class="currentActiveId === era.id ? 'text-[#111] translate-x-2' : 'text-gray-300 group-hover:text-gray-500'">
            {{ era.eraName }}
        </h2>
        </div>
    </div>
    </aside>

    <main ref="scrollContainer" @scroll="handleScroll" class="flex-1 h-full overflow-y-auto scroll-smooth snap-y snap-mandatory relative">
    <div v-for="(era, index) in eraData" :key="index" :id="era.id" class="min-h-screen w-full snap-start flex items-center p-8 md:px-24 relative border-b border-black/[0.02]">
        
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span class="text-[35vw] font-serif text-white/60 select-none translate-y-20">{{ era.eraName }}</span>
        </div>

        <div class="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div class="relative group">
            <div class="absolute -inset-4 border border-palace-red/10 translate-x-4 translate-y-4"></div>
            <div class="relative aspect-[4/5] overflow-hidden shadow-2xl bg-gray-100">
            <img :src="era.chief.img" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
            <div class="absolute bottom-8 left-8 text-white">
                <h3 class="text-4xl font-serif tracking-[0.2em]">{{ era.chief.name }}</h3>
            </div>
            </div>
        </div>

        <div class="space-y-8">
            <div class="flex items-center gap-2">
            <span class="w-8 h-[1px] bg-palace-red"></span>
            <span class="text-palace-red font-serif text-xs tracking-[0.3em] uppercase">Chronicle · 营造大观</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-serif text-[#111] leading-tight tracking-widest">{{ era.chief.slogan }}</h2>
            <p class="text-gray-600 leading-loose tracking-widest font-light text-justify">{{ era.chief.intro }}</p>
            <div class="flex flex-col sm:flex-row gap-4 pt-6">
            <button @click="$router.push(`/master/${era.chief.id}`)" class="flex-1 py-4 bg-[#111] text-white text-xs tracking-[0.3em] hover:bg-palace-red transition-all shadow-xl uppercase">
                研读平生 READ ARCHIVE
            </button>
            <button @click="openDrawer(era)" class="flex-1 py-4 border border-[#111] text-xs tracking-[0.3em] hover:bg-[#111] hover:text-white transition-all uppercase">
                探索{{ era.eraName }}代众匠 EXPLORE
            </button>
            </div>
        </div>
        </div>
    </div>
    </main>

    <transition name="drawer-slide">
    <div v-if="drawerVisible" class="fixed inset-0 z-[100] flex justify-end">
        <div class="absolute inset-0 bg-black/10backdrop-blur-[2px]" @click="drawerVisible = false"></div>
        
        <div class="relative w-full max-w-5xl bg-[#fcfaf5] h-full shadow-2xl p-12 md:p-16 flex flex-col border-l border-black/5 custom-scroll">
        
        <div class="flex justify-between items-center mb-16 border-b border-black/5 pb-6">
            <div>
            <p class="text-palace-red font-serif tracking-[0.5em] mb-2 text-sm uppercase">{{ activeEra.period }} · REGISTER</p>
            <h4 class="text-4xl font-serif tracking-widest text-[#111]">{{ activeEra.eraName }}代名匠录</h4>
            </div>
            <button @click="drawerVisible = false" class="text-2xl hover:rotate-90 transition-transform p-4">✕</button>
        </div>

        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-16 overflow-hidden">
            
            <div class="space-y-10 overflow-y-auto pr-6 custom-scroll">
                <div v-for="m in activeEra.peers" :key="m.name" 
                class="group cursor-pointer p-6 border border-transparent hover:border-palace-red/10 hover:bg-palace-red/[0.02] rounded-xl transition-all"
                @mouseenter="hoveredMaster = m"
                @mouseleave="hoveredMaster = null"
                @click="$router.push(`/master/${m.id}`)"
                >
                <div class="flex items-center gap-4 mb-2">
                    <span class="w-6 h-[1px] bg-gray-300 group-hover:w-10 group-hover:bg-palace-red transition-all"></span>
                    <h5 class="text-xl font-serif tracking-widest group-hover:text-palace-red transition-colors">{{ m.name }}</h5>
                </div>
                <p class="text-xs text-gray-500 font-light leading-relaxed tracking-wider mb-4">{{ m.desc }}</p>
                <p class="text-[9px] text-gray-400 tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity uppercase">点击进入详情页 →</p>
                </div>
            </div>

            <div class="h-full flex flex-col justify-center relative min-h-[300px] border-l border-black/5 pl-16">
                <transition name="fade-ink">
                <div v-if="!hoveredMaster" :key="'default-' + activeEra.id" class="space-y-6 text-center">
                    <p class="text-palace-red font-serif text-lg vertical-text-lg tracking-[0.6em] mx-auto opacity-30">
                        {{ activeEra.theme }} · 营造大观
                    </p>
                </div>
                <div v-else :key="hoveredMaster.name" class="space-y-8 text-center md:text-left">
                    <div class="flex items-center gap-3 justify-center md:justify-start">
                        <span class="w-6 h-6 rounded-full border border-palace-red/30 flex items-center justify-center text-palace-red text-xs font-serif">匠</span>
                        <p class="text-palace-red font-serif text-base tracking-[0.4em]">「{{ hoveredMaster.quoteTitle || '匠心' }}」</p>
                    </div>
                    <p class="text-[#111] font-serif text-2xl leading-loose vertical-text-lg tracking-widest mx-auto md:mx-0">
                        {{ hoveredMaster.poetry }}
                    </p>
                    <div class="pt-8 border-t border-black/5 w-1/2 mx-auto md:mx-0">
                        <p class="text-gray-400 text-[10px] tracking-widest uppercase">—— {{ hoveredMaster.name }} · 简志 ARCHIVE</p>
                    </div>
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
const hoveredMaster = ref(null) // 实时记录鼠标停在抽屉里哪个匠人身上

// =====================================================================
// 史诗级大匠数据 (补齐 22 位，确保跳转闭环)
// =====================================================================
const eraData = [
{
    id: 'era-1',
    period: 'BC 206 - AD 589',
    eraName: '秦汉魏晋',
    theme: '规制萌芽',
    chief: { id: 'wuming', name: '将作大匠', slogan: '高台榭，美宫室', intro: '秦汉魏晋是规制的奠基期。虽匠名多佚，但阿房宫的宏阔与未央宫的深远确立了中国宫殿“高台重楼”的初始格局。', img: 'https://images.unsplash.com/photo-1599408031306-035985043812?w=1200' },
    peers: [
    { id: 'yangcheng', name: '阳城延', quoteTitle: '秦筑', poetry: '覆压三百余里，隔离天日', desc: '秦代将作少府，主持营建阿房宫。' },
    { id: 'lvzhao', name: '吕昭', quoteTitle: '魏制', poetry: '太极殿高，以正中轴', desc: '主持营建魏太极殿，确立了宫殿中轴对称雏形。' },
    { id: 'xiandequan', name: '萧何', quoteTitle: '汉基', poetry: '非壮丽无以重威', desc: '虽为相国，却亲定未央宫规制，确立汉代礼制建筑基调。' },
    { id: 'caocao', name: '曹操', quoteTitle: '邺城', poetry: '三台矗立，俯瞰漳河', desc: '邺城规划者，其“一”字型城市布局深刻影响后世都城。' },
    { id: 'malun', name: '马钧', quoteTitle: '神工', poetry: '翻车水引，土木之变', desc: '三国机械大师，改进了大量营造工具与水利机械。' }
    ]
},
{
    id: 'era-2',
    period: 'AD 581 - 1279',
    eraName: '隋唐宋',
    theme: '巅峰营造',
    chief: { id: 'lijie', name: '李诫', slogan: '以材为祖，定法式', intro: '他编纂了《营造法式》，将原本师徒口授的经验转化为严密的标准化模数，影响后世千年。', img: 'https://images.unsplash.com/photo-1582650726715-db14757c23bc?w=1200' },
    peers: [
    { id: 'lijie', name: '李诫', quoteTitle: '法式', poetry: '凡构屋之制，皆以材为祖', desc: '北宋营缮大匠，建筑标准化之父。' },
    { id: 'yuhao', name: '喻皓', quoteTitle: '木经', poetry: '梵塔撑天，木石有灵', desc: '一代塔王，著有世界最早木结构专著《木经》。' },
    { id: 'lichun', name: '李春', quoteTitle: '虹饮', poetry: '如初月出云，长虹饮涧', desc: '隋代赵州桥设计者，敞肩拱宗师。' },
    { id: 'yuwenkai', name: '宇文恺', quoteTitle: '都城', poetry: '大兴城阙，指点江山', desc: '隋大兴、唐长安城总规划师。' },
    { id: 'hechou', name: '何稠', quoteTitle: '隋工', poetry: '琉璃万状，鬼斧神工', desc: '隋代工艺大师，主持营建隋仁寿宫。' }
    ]
},
{
    id: 'era-3',
    period: 'AD 1271 - 1644',
    eraName: '元明',
    theme: '大朝威仪',
    chief: { id: 'kuaixiang', name: '蒯祥', slogan: '双手画龙，筑紫禁', intro: '香山帮鼻祖，主持营建北京故宫。承天门（天安门）及三大殿的宏伟规制皆出自其手。', img: 'https://images.unsplash.com/photo-1543013327-04669fec8935?w=1200' },
    peers: [
    { id: 'kuaixiang', name: '蒯祥', quoteTitle: '鲁班', poetry: '双手同绘，紫禁神工', desc: '明代宫廷建筑师，故宫营建首功。' },
    { id: 'jicheng', name: '计成', quoteTitle: '园冶', poetry: '虽由人作，宛自天开', desc: '一代造园宗师，著有园林理论神作《园冶》。' },
    { id: 'xugao', name: '徐杲', quoteTitle: '重修', poetry: '三大殿重光，不废榫卯', desc: '嘉靖年间宫殿修缮专家。' },
    { id: 'yehe', name: '也黑迭儿', quoteTitle: '元筑', poetry: '大都繁华，皆入规矩', desc: '元大都营建副使，主持了元皇宫的修建。' },
    { id: 'ruanjian', name: '阮安', quoteTitle: '内府', poetry: '九门规画，匠心独具', desc: '明正统年间主持北京城墙与九门营建。' }
    ]
},
{
    id: 'era-4',
    period: 'AD 1644 - 1912',
    eraName: '清',
    theme: '集大成者',
    chief: { id: 'yangshilei', name: '样式雷', slogan: '烫样微缩，皇家缩影', intro: '雷氏家族掌控清代皇家建筑两百年。独创“烫样”模型，将万千宏大建筑纳于方寸。', img: 'https://images.unsplash.com/photo-1579308101416-09257d079d85?w=1200' },
    peers: [
    { id: 'yangshilei', name: '样式雷', quoteTitle: '烫样', poetry: '一家雷氏，半部建筑史', desc: '清代宫廷建筑世家。' },
    { id: 'liudaneng', name: '刘大能', quoteTitle: '实干', poetry: '颐和园里，木石皆情', desc: '晚清营造名匠，主持颐和园重建。' },
    { id: 'shenyuan', name: '沈源', quoteTitle: '丹青', poetry: '长春园景，指上画卷', desc: '宫廷画师，深度参与圆明园建筑装饰。' },
    { id: 'leijinyu', name: '雷金玉', quoteTitle: '样式', poetry: '内廷样房，掌案天下', desc: '样式雷家族奠基人，主持营建圆明园。' },
    { id: 'zhangrou', name: '张柔', quoteTitle: '工部', poetry: '坛庙法度，必依典籍', desc: '清代工部大匠，精通祭祀建筑规制。' }
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
    if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
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
/* 竖排文字：更有古风底蕴 */
.vertical-text-lg {
writing-mode: vertical-rl;
text-orientation: mixed;
}

/* 墨色渐变入场动画 */
.fade-ink-enter-active { transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-ink-enter-from { opacity: 0; transform: translateY(20px) scale(0.95); filter: blur(10px); }

/* 其他基础动画 */
.drawer-slide-enter-active, .drawer-slide-leave-active { transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
.drawer-slide-enter-from, .drawer-slide-leave-to { transform: translateX(100%); opacity: 0; }
</style>