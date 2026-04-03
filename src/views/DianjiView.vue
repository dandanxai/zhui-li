<template>
    <div class="min-h-screen bg-[#fcfaf5] text-[#2c2c2c] pt-32 pb-24 relative selection:bg-palace-red selection:text-white">
    
    <div class="fixed inset-0 opacity-[0.04] pointer-events-none" style="background-image: radial-gradient(#000000 1px, transparent 1px); background-size: 40px 40px;"></div>

    <header class="w-full max-w-7xl mx-auto px-6 md:px-12 mb-24 relative z-10">
        <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-[1px] bg-palace-red"></div>
        <span class="text-palace-red font-serif tracking-[0.4em] text-xs uppercase">The Classics Archive</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-serif text-[#111] tracking-[0.1em] mb-8 leading-tight">
        典籍 <span class="opacity-40">· 藏经</span>
        </h1>
        <p class="text-lg md:text-xl font-light tracking-widest leading-relaxed max-w-3xl text-gray-600 border-l-2 border-palace-red/50 pl-6">
        木石无言，典籍有声。中国古建的至高法则与营造智慧，皆藏于这些泛黄的卷帙之中。纵然宫阙化为尘土，只要法式尚存，华夏的营造脊梁便能千古长立。
        </p>
    </header>

    <div class="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 relative z-10">
        
        <aside class="md:w-1/4 hidden md:block relative">
        <div class="sticky top-40 flex flex-col gap-2 border-l border-[#e5e5e5] pl-6 chapter-nav">
            
            <p class="text-xs font-bold text-[#111] tracking-[0.2em] mb-3 mt-2">上卷 · 营造之魂</p>
            <button data-target="spirit" @click="scrollTo('spirit')" class="text-left font-serif tracking-widest text-sm transition-all duration-300 hover:text-palace-red nav-item active-nav py-2 text-palace-red font-bold">01 / 纸上千秋</button>
            <button data-target="rule" @click="scrollTo('rule')" class="text-left font-serif tracking-widest text-sm text-gray-400 hover:text-palace-red transition-all duration-300 nav-item py-2">02 / 规矩方圆</button>

            <p class="text-xs font-bold text-[#111] tracking-[0.2em] mb-3 mt-8">下卷 · 镇馆之宝</p>
            <button data-target="kaogongji" @click="scrollTo('kaogongji')" class="text-left font-serif tracking-widest text-sm text-gray-400 hover:text-palace-red transition-all duration-300 nav-item py-2">03 / 考工记</button>
            <button data-target="yingzaofashi" @click="scrollTo('yingzaofashi')" class="text-left font-serif tracking-widest text-sm text-gray-400 hover:text-palace-red transition-all duration-300 nav-item py-2">04 / 营造法式</button>
            <button data-target="yuanye" @click="scrollTo('yuanye')" class="text-left font-serif tracking-widest text-sm text-gray-400 hover:text-palace-red transition-all duration-300 nav-item py-2">05 / 园冶</button>

            <p class="text-xs font-bold text-[#111] tracking-[0.2em] mb-3 mt-8">附录 · 典籍全编</p>
            <button data-target="allbooks" @click="scrollTo('allbooks')" class="text-left font-serif tracking-widest text-sm text-gray-400 hover:text-palace-red transition-all duration-300 nav-item py-2">06 / 藏经总目</button>
        </div>
        </aside>

        <main class="md:w-3/4 flex flex-col gap-32">
        
        <section id="spirit" class="content-section scroll-mt-32">
            <h2 class="text-3xl font-serif text-[#111] tracking-widest mb-4 flex items-center gap-4"><span class="text-palace-red text-xl">01.</span> 纸上千秋</h2>
            <div class="w-full h-[1px] bg-black/10 mb-8"></div>
            <div class="bg-white border border-[#eaeaea] p-8 md:p-12 rounded-sm shadow-sm relative overflow-hidden">
            <span class="absolute -right-10 -bottom-10 text-[10rem] font-serif text-black/5 pointer-events-none">魂</span>
            <p class="font-serif text-2xl leading-loose tracking-widest text-[#111] mb-6">
                “中国建筑之伟大，不在于留下了多少不朽的石碑，而在于那些被文字烙印的法则。”
            </p>
            <p class="text-sm tracking-wider leading-relaxed text-gray-600 text-justify">
                西方的建筑是石头的史诗，中国的建筑是木头的轮回。木构易朽，水火无情，但中华文明却能在一千多年前的图纸和文字中，将极其复杂的卯榫、斗拱、飞檐，化作一套严密、可复制的数学模型与营造逻辑。这些典籍，就是中国古建不断重生的基因库。
            </p>
            </div>
        </section>

        <section id="rule" class="content-section scroll-mt-32">
            <h2 class="text-3xl font-serif text-[#111] tracking-widest mb-4 flex items-center gap-4"><span class="text-palace-red text-xl">02.</span> 规矩方圆</h2>
            <div class="w-full h-[1px] bg-black/10 mb-8"></div>
            <p class="text-base leading-loose tracking-wider font-light text-justify text-gray-700">
            不以规矩，不能成方圆。从先秦的《考工记》划定诸侯都城的尺寸，到宋代《营造法式》确立“材分制”，再到清代《工部做法则例》的“斗口制”。典籍的存在，将工匠口口相传的“秘籍”，上升为了统御庞大帝国工程的“国家标准”。这不仅是技术的沉淀，更是礼制与秩序的物化。
            </p>
        </section>

        <div class="w-full py-4 flex items-center justify-center">
            <div class="w-2 h-2 rounded-full bg-palace-red/30 mx-2"></div>
            <div class="w-2 h-2 rounded-full bg-palace-red/50 mx-2"></div>
            <div class="w-2 h-2 rounded-full bg-palace-red/30 mx-2"></div>
        </div>

        <section id="kaogongji" class="content-section scroll-mt-32">
            <h2 class="text-3xl font-serif text-[#111] tracking-widest mb-4 flex items-center justify-between">
            <div class="flex items-center gap-4"><span class="text-palace-red text-xl">03.</span> 考工记</div>
            <span class="text-sm text-gray-400 font-serif tracking-widest hidden md:block">春秋战国 · 佚名</span>
            </h2>
            <div class="w-full h-[1px] bg-black/10 mb-8"></div>
            <div class="flex flex-col md:flex-row gap-8 items-start">
            <div class="md:w-5/12 overflow-hidden rounded-sm aspect-[3/4] bg-[#e8e4d3] shadow-sm relative group">
                <img src="https://images.unsplash.com/photo-1599408031306-035985043812?q=80&w=800" class="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700">
                <div class="absolute top-4 right-4 bg-white/90 px-2 py-6 border border-black/80"><p class="vertical-text font-serif text-sm tracking-widest text-palace-red">百工之祖</p></div>
            </div>
            <div class="md:w-7/12 space-y-6">
                <p class="font-serif text-lg leading-loose tracking-widest text-palace-red italic">“匠人营国，方九里，旁三门。国中九经九纬，经涂九轨。”</p>
                <div class="space-y-4 text-sm text-gray-600 leading-relaxed tracking-wider text-justify">
                <p>《考工记》是齐国官营手工业各工种规范的汇编。其中的“匠人”篇，详细记载了古代都城规划、宫室建筑的尺度与比例，是中国古代城市规划与建筑设计的思想源头。</p>
                <p class="font-bold text-gray-800">历史地位：</p>
                <p>它确立了“左祖右社，面朝后市”的都城格局，深深影响了从汉长安城到明清北京城的规划理念，是中国封建都城建设的终极蓝本。</p>
                </div>
            </div>
            </div>
        </section>

        <section id="yingzaofashi" class="content-section scroll-mt-32">
            <h2 class="text-3xl font-serif text-[#111] tracking-widest mb-4 flex items-center justify-between">
            <div class="flex items-center gap-4"><span class="text-palace-red text-xl">04.</span> 营造法式</div>
            <span class="text-sm text-gray-400 font-serif tracking-widest hidden md:block">北宋 · 李诫</span>
            </h2>
            <div class="w-full h-[1px] bg-black/10 mb-8"></div>
            <div class="flex flex-col md:flex-row-reverse gap-8 items-start">
            <div class="md:w-5/12 overflow-hidden rounded-sm aspect-[3/4] bg-[#e8e4d3] shadow-sm relative group">
                <img src="https://images.unsplash.com/photo-1582650517303-b42616d56f8e?q=80&w=800" class="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700">
                <div class="absolute top-4 left-4 bg-white/90 px-2 py-6 border border-black/80"><p class="vertical-text font-serif text-sm tracking-widest text-palace-red">官修法典</p></div>
            </div>
            <div class="md:w-7/12 space-y-6">
                <p class="font-serif text-lg leading-loose tracking-widest text-palace-red italic">“凡构屋之制，皆以材为祖，材有八等。”</p>
                <div class="space-y-4 text-sm text-gray-600 leading-relaxed tracking-wider text-justify">
                <p>王安石变法期间，为杜绝工程贪腐而颁布的建筑图纸与估算标准。全书详细规定了大木作、小木作等13个工种的制度，是中国建筑史上最伟大的百科全书。</p>
                <p class="font-bold text-gray-800">核心贡献：</p>
                <p>首创“材分制”。以木材截面为基本模数，让建筑构件实现了高度的标准化与预制化，标志着中国古代建筑工程技术走向理性的巅峰。</p>
                </div>
            </div>
            </div>
        </section>

        <section id="yuanye" class="content-section scroll-mt-32">
            <h2 class="text-3xl font-serif text-[#111] tracking-widest mb-4 flex items-center justify-between">
            <div class="flex items-center gap-4"><span class="text-palace-red text-xl">05.</span> 园冶</div>
            <span class="text-sm text-gray-400 font-serif tracking-widest hidden md:block">明代 · 计成</span>
            </h2>
            <div class="w-full h-[1px] bg-black/10 mb-8"></div>
            <div class="flex flex-col md:flex-row gap-8 items-start">
            <div class="md:w-5/12 overflow-hidden rounded-sm aspect-[3/4] bg-[#e8e4d3] shadow-sm relative group">
                <img src="https://images.unsplash.com/photo-1529982412356-901cc3a363bc?q=80&w=800" class="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700">
                <div class="absolute top-4 right-4 bg-white/90 px-2 py-6 border border-black/80"><p class="vertical-text font-serif text-sm tracking-widest text-palace-red">造园圣经</p></div>
            </div>
            <div class="md:w-7/12 space-y-6">
                <p class="font-serif text-lg leading-loose tracking-widest text-palace-red italic">“虽由人作，宛自天开。巧于因借，精在体宜。”</p>
                <div class="space-y-4 text-sm text-gray-600 leading-relaxed tracking-wider text-justify">
                <p>世界第一部关于造园美学的理论专著。计成将江南士大夫的精神世界，完美地融入了亭台楼阁与山水之间，不讲枯燥尺寸，只谈意境与借景。</p>
                <p class="font-bold text-gray-800">美学影响：</p>
                <p>确立了中国古典园林的审美范式，让建筑不再是单纯的居住容器，而是可以寄托情怀的立体山水画卷。</p>
                </div>
            </div>
            </div>
        </section>

        <div class="w-full py-4 flex items-center justify-center">
            <div class="w-2 h-2 rounded-full bg-palace-red/30 mx-2"></div>
            <div class="w-2 h-2 rounded-full bg-palace-red/50 mx-2"></div>
            <div class="w-2 h-2 rounded-full bg-palace-red/30 mx-2"></div>
        </div>

        <section id="allbooks" class="content-section scroll-mt-32">
            <h2 class="text-3xl font-serif text-[#111] tracking-widest mb-4 flex items-center gap-4"><span class="text-palace-red text-xl">06.</span> 藏经总目</h2>
            <div class="w-full h-[1px] bg-black/10 mb-8"></div>
            
            <p class="text-sm tracking-wider leading-relaxed text-gray-600 mb-8">
            除上述镇馆之宝外，历朝历代尚有诸多营造典籍流传于世，它们共同构筑了中国古建的理论基石。
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div class="p-6 border border-black/5 bg-white hover:shadow-md transition-shadow group flex flex-col justify-between h-full">
                <div>
                <div class="flex items-center justify-between mb-2">
                    <h3 class="font-serif text-xl tracking-widest group-hover:text-palace-red transition-colors">木经</h3>
                    <span class="text-[10px] text-gray-400 border border-gray-200 px-2 py-1">北宋</span>
                </div>
                <p class="text-xs text-gray-500 tracking-wider mb-4">喻皓 / 著</p>
                <p class="text-sm text-gray-600 tracking-wider leading-relaxed line-clamp-2">
                    中国最早一部木结构专著。总结了高层木结构的抗风、抗震原则，是宋代大木作技术突飞猛进的标志。
                </p>
                </div>
            </div>

            <div class="p-6 border border-black/5 bg-white hover:shadow-md transition-shadow group flex flex-col justify-between h-full">
                <div>
                <div class="flex items-center justify-between mb-2">
                    <h3 class="font-serif text-xl tracking-widest group-hover:text-palace-red transition-colors">鲁班经</h3>
                    <span class="text-[10px] text-gray-400 border border-gray-200 px-2 py-1">明代</span>
                </div>
                <p class="text-xs text-gray-500 tracking-wider mb-4">民间传承</p>
                <p class="text-sm text-gray-600 tracking-wider leading-relaxed line-clamp-2">
                    流传于民间的工匠实用手册。融合了房屋尺寸做法与风水堪舆理念，是研究民间营造不可多得的史料。
                </p>
                </div>
            </div>

            <div class="p-6 border border-black/5 bg-white hover:shadow-md transition-shadow group flex flex-col justify-between h-full">
                <div>
                <div class="flex items-center justify-between mb-2">
                    <h3 class="font-serif text-xl tracking-widest group-hover:text-palace-red transition-colors">长物志</h3>
                    <span class="text-[10px] text-gray-400 border border-gray-200 px-2 py-1">明代</span>
                </div>
                <p class="text-xs text-gray-500 tracking-wider mb-4">文震亨 / 著</p>
                <p class="text-sm text-gray-600 tracking-wider leading-relaxed line-clamp-2">
                    晚明文人生活品味的最高指南，规定了文人居所的陈设与建筑格调，主张古朴、雅致。
                </p>
                </div>
            </div>

            <div class="p-6 border border-black/5 bg-white hover:shadow-md transition-shadow group flex flex-col justify-between h-full">
                <div>
                <div class="flex items-center justify-between mb-2">
                    <h3 class="font-serif text-xl tracking-widest group-hover:text-palace-red transition-colors">工部做法则例</h3>
                    <span class="text-[10px] text-gray-400 border border-gray-200 px-2 py-1">清代</span>
                </div>
                <p class="text-xs text-gray-500 tracking-wider mb-4">工部官修</p>
                <p class="text-sm text-gray-600 tracking-wider leading-relaxed line-clamp-2">
                    清代官式建筑设计的最高规范。确立“斗口制”，是故宫、圆明园等所有清代皇家建筑的施工依据。
                </p>
                </div>
            </div>

            <div class="p-6 border border-black/5 bg-white hover:shadow-md transition-shadow group flex flex-col justify-between h-full">
                <div>
                <div class="flex items-center justify-between mb-2">
                    <h3 class="font-serif text-xl tracking-widest group-hover:text-palace-red transition-colors">清式营造辞解</h3>
                    <span class="text-[10px] text-gray-400 border border-gray-200 px-2 py-1">现代</span>
                </div>
                <p class="text-xs text-gray-500 tracking-wider mb-4">梁思成 / 编撰</p>
                <p class="text-sm text-gray-600 tracking-wider leading-relaxed line-clamp-2">
                    用现代科学图解的方式翻译古建生僻术语。是中国古建从“传统匠学”向“现代科学”转型的里程碑。
                </p>
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
/* 导航红线动画 */
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

/* 竖排签条 */
.vertical-text {
    writing-mode: vertical-rl;
    text-orientation: upright;
}
</style>