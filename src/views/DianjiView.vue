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

    <main class="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-48 pt-10">
        
        <section class="relative reveal-up">
            <div class="absolute -right-10 md:right-0 top-0 text-[18vw] font-black text-black/[0.03] select-none pointer-events-none leading-none">考</div>
            <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                <div class="md:col-span-5 relative group">
                    <div class="aspect-[3/4] overflow-hidden border-4 border-white shadow-2xl elegant-card bg-[#e8e4d3]">
                        <img src="https://images.unsplash.com/photo-1599408031306-035985043812?q=80&w=800" class="w-full h-full object-cover mix-blend-multiply transition-transform duration-[1.5s] group-hover:scale-105">
                    </div>
                    <div class="absolute -bottom-6 -left-6 bg-palace-red text-white p-6 shadow-xl">
                        <p class="writing-vertical font-black tracking-[0.5em] text-lg">百工之祖</p>
                    </div>
                </div>
                <div class="md:col-span-7 md:pl-12 space-y-8">
                    <div class="space-y-2">
                        <span class="text-sm font-sans tracking-[0.4em] text-gray-400 font-bold uppercase">春秋战国 · 佚名 (齐国官书)</span>
                        <h2 class="text-5xl font-black text-[#000] tracking-widest">考工记</h2>
                    </div>
                    <p class="text-[20px] text-palace-red font-bold leading-relaxed tracking-widest italic border-l-4 border-palace-red/30 pl-6">
                        “匠人营国，方九里，旁三门。国中九经九纬，经涂九轨。”
                    </p>
                    <div class="text-[16px] text-[#222] font-medium leading-loose tracking-widest space-y-6">
                        <p>中国目前所见年代最早的手工业技术文献。其中的“匠人”篇，详细记载了古代都城规划、宫室建筑的尺度与比例，是中国古代城市规划与建筑设计的思想源头。</p>
                        <div class="bg-white border-2 border-black/5 p-6 shadow-sm">
                            <span class="text-[12px] bg-[#111] text-white px-2 py-1 font-bold tracking-widest block w-max mb-3">文明基石</span>
                            <span class="font-bold">确立了“左祖右社，面朝后市”的都城格局，深深影响了从汉长安城到明清北京城三千年的规划理念。</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="relative reveal-up">
            <div class="absolute -left-10 md:-left-20 top-10 text-[18vw] font-black text-black/[0.03] select-none pointer-events-none leading-none">法</div>
            <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                <div class="md:col-span-7 md:pr-12 space-y-8 md:text-right order-2 md:order-1 flex flex-col md:items-end">
                    <div class="space-y-2">
                        <span class="text-sm font-sans tracking-[0.4em] text-gray-400 font-bold uppercase">北宋 · 李诫 (将作监)</span>
                        <h2 class="text-5xl font-black text-[#000] tracking-widest">营造法式</h2>
                    </div>
                    <p class="text-[20px] text-palace-red font-bold leading-relaxed tracking-widest italic border-r-4 border-palace-red/30 pr-6 text-right">
                        “凡构屋之制，皆以材为祖，材有八等。”
                    </p>
                    <div class="text-[16px] text-[#222] font-medium leading-loose tracking-widest space-y-6 text-right flex flex-col items-end">
                        <p>王安石变法期间，为杜绝工程贪腐而颁布的国家级建筑图纸与估算标准。全书三十四卷，详细规定了大木作、小木作、彩画作等13个工种的制度。</p>
                        <div class="bg-white border-2 border-black/5 p-6 shadow-sm text-left max-w-lg">
                            <span class="text-[12px] bg-[#111] text-white px-2 py-1 font-bold tracking-widest block w-max mb-3">旷世发明</span>
                            <span class="font-bold">首创“材分制”。以木材截面为基本模数，让建筑构件实现了高度的标准化与预制化，比西方早了近千年。</span>
                        </div>
                    </div>
                </div>
                <div class="md:col-span-5 relative group order-1 md:order-2">
                    <div class="aspect-[3/4] overflow-hidden border-4 border-white shadow-2xl elegant-card bg-[#e8e4d3]">
                        <img src="https://images.unsplash.com/photo-1582650517303-b42616d56f8e?q=80&w=800" class="w-full h-full object-cover mix-blend-multiply transition-transform duration-[1.5s] group-hover:scale-105">
                    </div>
                    <div class="absolute -top-6 -right-6 bg-[#111] text-white p-6 shadow-xl">
                        <p class="writing-vertical font-black tracking-[0.5em] text-lg">大宋国标</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="relative reveal-up">
            <div class="absolute -right-10 md:right-10 top-0 text-[18vw] font-black text-black/[0.03] select-none pointer-events-none leading-none">园</div>
            <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                <div class="md:col-span-5 relative group">
                    <div class="aspect-[3/4] overflow-hidden border-4 border-white shadow-2xl elegant-card bg-[#e8e4d3]">
                        <img src="https://images.unsplash.com/photo-1529982412356-901cc3a363bc?q=80&w=800" class="w-full h-full object-cover mix-blend-multiply transition-transform duration-[1.5s] group-hover:scale-105">
                    </div>
                    <div class="absolute -bottom-6 -right-6 bg-[#333] text-white p-6 shadow-xl">
                        <p class="writing-vertical font-black tracking-[0.5em] text-lg">造园圣经</p>
                    </div>
                </div>
                <div class="md:col-span-7 md:pl-12 space-y-8">
                    <div class="space-y-2">
                        <span class="text-sm font-sans tracking-[0.4em] text-gray-400 font-bold uppercase">明代 · 计成 (造园家)</span>
                        <h2 class="text-5xl font-black text-[#000] tracking-widest">园冶</h2>
                    </div>
                    <p class="text-[20px] text-[#444] font-bold leading-relaxed tracking-widest italic border-l-4 border-black/20 pl-6">
                        “虽由人作，宛自天开。巧于因借，精在体宜。”
                    </p>
                    <div class="text-[16px] text-[#222] font-medium leading-loose tracking-widest space-y-6">
                        <p>世界第一部关于造园美学的理论专著。计成将江南士大夫的精神世界，完美地融入了亭台楼阁与山水之间，全书不讲枯燥尺寸，只谈意境与借景。</p>
                        <div class="bg-white border-2 border-black/5 p-6 shadow-sm">
                            <span class="text-[12px] bg-palace-red text-white px-2 py-1 font-bold tracking-widest block w-max mb-3">美学圣经</span>
                            <span class="font-bold">彻底确立了中国古典园林的审美范式，让建筑不再是单纯的居住容器，而是寄托情怀的立体山水画卷。</span>
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
                    <p class="text-palace-red font-sans tracking-[0.4em] text-[10px] font-black mt-4 border border-palace-red/30 inline-block px-3 py-1 bg-palace-red/10">TOTAL ARCHIVES: {{ archiveBooks.length }} RECORDS</p>
                </div>
            </header>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 border-t-2 border-white/10 pt-16">
                
                <div v-for="(book, index) in archiveBooks" :key="index" 
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
                    
                    <p class="text-[13px] text-gray-400 tracking-[0.15em] leading-loose font-medium opacity-80 group-hover:opacity-100 transition-opacity text-justify relative z-10 flex-1">
                        {{ book.desc }}
                    </p>
                </div>

            </div>
        </div>
    </section>

</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const archiveBooks = [
    { title: '考工记', dynasty: '先秦', author: '佚名', category: '都城规制', desc: '中国最早手工业技术文献，确立“面朝后市，左祖右社”的都城极高法则。' },
    { title: '木经', dynasty: '北宋', author: '喻皓', category: '木作理论', desc: '中国最早一部木结构专著，总结高层木结构的抗风震原则，后虽失传但影响深远。' },
    { title: '营造法式', dynasty: '北宋', author: '李诫', category: '国家标准', desc: '北宋官修建筑规范，首创“材分制”，是中国古代建筑工程技术走向理性的巅峰。' },
    { title: '梓人遗制', dynasty: '元代', author: '薛景石', category: '器物卯榫', desc: '现存极少数详细记载古代木器制作尺寸与榫卯图样的专著，填补元代木作史料空白。' },
    { title: '园冶', dynasty: '明代', author: '计成', category: '造园美学', desc: '世界第一部造园学专著。提出“虽由人作，宛自天开”，为江南园林奠定审美基础。' },
    { title: '鲁班经', dynasty: '明代', author: '民间官修', category: '民间营造', desc: '流传极广的民间工匠实用手册。融合房屋尺寸、家具做法与风水理念的孤本史料。' },
    { title: '长物志', dynasty: '明代', author: '文震亨', category: '居所格调', desc: '晚明文人生活品味最高指南。专门规定了文人居所的建筑格局，主张古朴雅致。' },
    { title: '天工开物', dynasty: '明代', author: '宋应星', category: '综合工艺', desc: '古代综合性工艺百科，其中“陶埏”、“瓦石”篇详细记载了砖瓦烧制与砌筑工艺。' },
    { title: '阳宅十书', dynasty: '明代', author: '王君荣', category: '堪舆风水', desc: '中国古代风水学集大成之作。将环境学与阴阳五行深度绑定，深刻影响古代村落选址。' },
    { title: '工部做法则例', dynasty: '清代', author: '清工部', category: '皇家规范', desc: '清代官式建筑最高规范。确立“斗口制”取代“材分制”，是故宫施工的绝对依据。' },
    { title: '工程做法', dynasty: '清代', author: '雍正帝颁', category: '造价算例', desc: '为控制工程造价而颁布的大型图册与算例，内容极其精细，是清代考工重中之重。' },
    { title: '大清会典', dynasty: '清代', author: '官修密档', category: '礼制等级', desc: '详细记载了清代各品级官员的府邸规制、彩画等级、台基高度，逾越即斩。' },
    { title: '样式雷图档', dynasty: '清代', author: '雷氏家族', category: '皇家图纸', desc: '清代掌管皇家建筑两百年的雷氏家族留下的万件图纸与烫样，是世界记忆遗产。' },
    { title: '营造算例', dynasty: '清代', author: '匠人传抄', category: '民间算诀', desc: '民间工匠在实际施工中总结的材料估算口诀与经验数据，是对官方做法的民间补充。' },
    { title: '营造法原', dynasty: '民国', author: '姚承祖', category: '江南木作', desc: '唯一系统总结江南地区传统木构（香山帮工匠）做法的专著，被誉为南方古建密码。' },
    { title: '中国建筑史', dynasty: '现代', author: '梁思成', category: '现代考据', desc: '中国人用现代科学方法写出的第一部建筑通史，彻底打破西方“中国无建筑史”偏见。' },
    { title: '清代匠作则例', dynasty: '现代', author: '王璞子', category: '文献整理', desc: '对清代各种官匠、民匠做法则例的系统整理，是古建大修必备的工具全书。' },
    { title: '清式营造辞解', dynasty: '现代', author: '梁思成等', category: '术语辞典', desc: '用现代制图学图解的方式翻译清代古建生僻术语，是向“现代科学”转型的里程碑。' },
    { title: '图像中国建筑史', dynasty: '现代', author: '梁思成', category: '测绘图鉴', desc: '以极其精美的全英文与线描图向世界展示中国古建之美，手绘测绘图至今无人超越。' },
    { title: '华夏意匠', dynasty: '现代', author: '李允鉌', category: '理论综述', desc: '总结中国古典建筑设计原理的宏篇巨著。从文化、哲学、美学维度重塑中国建筑观。' }
]

let revealObserver = null
let handleScroll = null

onMounted(() => {
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
</style>