<template>
<div class="min-h-screen w-full bg-[#fcfaf5] text-[#111111] overflow-x-hidden selection:bg-palace-red selection:text-white font-serif">
    
    <div class="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style="background-image: radial-gradient(#000000 1.5px, transparent 1.5px); background-size: 40px 40px;"></div>

    <section class="min-h-screen w-full flex flex-col items-center pt-[20vh] relative overflow-hidden z-10 mb-32">
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
            <span class="text-[40vw] font-black translate-y-10">脉</span>
        </div>

        <div class="relative z-10 text-center flex flex-col items-center px-6 reveal-up">
            <p class="text-palace-red font-sans tracking-[0.8em] text-xs mb-8 uppercase font-black">Heritage & Lineage</p>
            <h1 class="text-7xl md:text-9xl font-black tracking-[0.2em] mb-12 text-[#000] drop-shadow-sm">
                文脉 <span class="opacity-20 italic font-bold text-5xl">Lineage</span>
            </h1>
            <div class="w-[2px] h-24 bg-gradient-to-b from-palace-red to-transparent mb-12"></div>
            
            <p class="text-2xl md:text-4xl font-black tracking-widest text-[#000] leading-loose text-center max-w-5xl px-6 mb-10">
                “西方起石为神殿，欲与天公试比高；<br/>
                华夏构木为宇舍，俯首甘为天地客。”
            </p>
            <p class="text-[16px] md:text-lg tracking-[0.2em] leading-[2.2] text-[#333] font-bold max-w-4xl text-justify md:text-center px-6">
                1911年以前的中国大匠，不筑虚妄的宝塔神佛，只为最真实的人间立命。
                从九五之尊的<strong class="text-palace-red">皇宫</strong>到威严正大的<strong class="text-palace-red">官府</strong>，
                从聚族而居的<strong class="text-palace-red">民居</strong>到跨越天堑的<strong class="text-palace-red">桥梁</strong>。<br/>
                <span class="block mt-6 text-[#111] font-black text-xl border-t-2 border-black/10 pt-6">我们传承法度，我们使用智慧，我们弘扬生生不息的中华营造之魂。</span>
            </p>
        </div>
    </section>

    <main class="w-full max-w-7xl mx-auto flex flex-col gap-40 relative z-10 pb-40">

        <section class="w-full px-6 md:px-12 relative reveal-up">
            <div class="absolute -left-10 md:-left-20 top-0 text-[18vw] font-black text-black/[0.03] select-none pointer-events-none leading-none z-0">承</div>
            
            <div class="grid grid-cols-1 md:grid-cols-12 gap-16 items-center relative z-10">
                <div class="md:col-span-5 relative group">
                    <div class="aspect-[4/5] bg-[#e8e4d3] shadow-2xl overflow-hidden relative elegant-card border-4 border-white">
                        <img src="https://dandanxia-hs.oss-cn-hangzhou.aliyuncs.com/%E6%95%85%E5%AE%AB.jpg" class="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[1.5s]" />
                        <div class="absolute top-0 right-0 bg-[#111] text-white p-6 shadow-xl">
                            <p class="writing-vertical font-black tracking-[0.5em] text-lg">秩序骨气</p>
                        </div>
                    </div>
                </div>

                <div class="md:col-span-7 space-y-10">
                    <div class="space-y-4">
                        <h2 class="text-palace-red font-sans tracking-[0.5em] text-sm uppercase flex items-center gap-4 font-black">
                            <span class="w-8 h-[2px] bg-palace-red"></span> 01 / 传承 · 礼制法度
                        </h2>
                        <h3 class="text-4xl md:text-5xl font-black tracking-widest leading-tight text-[#000]">
                            非壮丽无以重威<br>传下不可逾越的国家秩序
                        </h3>
                        <p class="text-[#444] text-[16px] leading-loose tracking-widest font-bold pt-4">
                            中国古建的“传承”，绝不仅是图纸的抄录，而是整个帝国哲学与礼制的血脉延续。
                        </p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-white border-t-4 border-black/10 p-6 shadow-sm hover:border-palace-red transition-colors duration-500">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-2 h-2 bg-palace-red rounded-full"></div>
                                <h4 class="font-black text-xl tracking-widest">中轴对称 · 皇权法度</h4>
                            </div>
                            <p class="text-[14px] text-[#555] leading-relaxed tracking-widest font-medium text-justify">
                                <strong class="text-[#111]">皇宫与官府</strong>的前朝后寝，无一不是法度的外化。老祖宗用严苛的面阔九间、重檐庑殿，在地面上画出了阶级与秩序的绝对红线。
                            </p>
                        </div>

                        <div class="bg-white border-t-4 border-black/10 p-6 shadow-sm hover:border-palace-red transition-colors duration-500">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-2 h-2 bg-palace-red rounded-full"></div>
                                <h4 class="font-black text-xl tracking-widest">榫卯咬合 · 以柔克刚</h4>
                            </div>
                            <p class="text-[14px] text-[#555] leading-relaxed tracking-widest font-medium text-justify">
                                不用铁钉锁死，而是用一凸一凹包容万物、化解地震的毁灭之力。传承的是<strong class="text-palace-red">“天下至柔驰骋至坚”</strong>的东方道家哲学。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="w-full px-6 md:px-12 relative reveal-up">
            <div class="absolute -right-10 md:-right-10 top-20 text-[18vw] font-black text-black/[0.03] select-none pointer-events-none leading-none z-0">用</div>
            
            <div class="flex flex-col-reverse lg:flex-row gap-16 items-center relative z-10">
                <div class="lg:w-7/12 space-y-10 flex flex-col lg:items-end">
                    <div class="space-y-4 lg:text-right">
                        <h2 class="text-palace-red font-sans tracking-[0.5em] text-sm uppercase flex items-center gap-4 font-black justify-end">
                            02 / 使用 · 烟火生存 <span class="w-8 h-[2px] bg-palace-red"></span>
                        </h2>
                        <h3 class="text-4xl md:text-5xl font-black tracking-widest leading-tight text-[#000]">
                            粉墙黛瓦，四水归堂<br>文人意气与实用主义的神作
                        </h3>
                        <p class="text-[#444] text-[16px] leading-loose tracking-widest font-bold pt-4 max-w-2xl lg:ml-auto">
                            如果说紫禁城是权力的巅峰，<strong class="text-palace-red">那么安徽的徽派民居，便是实用主义与东方意境结合的最高神作。</strong>不求虚幻来世，只求此生的安居与通达。
                        </p>
                    </div>
                    
                    <div class="w-full flex flex-col gap-4">
                        <div class="flex items-start gap-6 bg-white p-6 border border-black/5 shadow-sm group hover:shadow-md transition-shadow">
                            <div class="w-12 h-12 shrink-0 bg-[#111] text-white flex items-center justify-center font-serif text-2xl font-black group-hover:bg-palace-red transition-colors">徽</div>
                            <div class="text-left">
                                <h4 class="font-black text-lg tracking-widest text-[#000] mb-2">马头墙 · 御火挡风的水墨长卷</h4>
                                <p class="text-[14px] text-[#555] leading-relaxed tracking-widest font-medium">高耸错落的墙体不仅造就了绝美的黑白极简审美，更是为了在密集的村落中切断火源与山风，是真正的生存护盾。</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-6 bg-white p-6 border border-black/5 shadow-sm group hover:shadow-md transition-shadow">
                            <div class="w-12 h-12 shrink-0 bg-[#111] text-white flex items-center justify-center font-serif text-2xl font-black group-hover:bg-palace-red transition-colors">水</div>
                            <div class="text-left">
                                <h4 class="font-black text-lg tracking-widest text-[#000] mb-2">四水归堂 · 融于砖瓦的风水商道</h4>
                                <p class="text-[14px] text-[#555] leading-relaxed tracking-widest font-medium">向内倾斜的屋面让雨水汇聚天井。不仅解决采光与微气候，更将徽商“肥水不流外人田”的风水哲学落于实处。</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-6 bg-white p-6 border border-black/5 shadow-sm group hover:shadow-md transition-shadow">
                            <div class="w-12 h-12 shrink-0 bg-[#111] text-white flex items-center justify-center font-serif text-2xl font-black group-hover:bg-palace-red transition-colors">桥</div>
                            <div class="text-left">
                                <h4 class="font-black text-lg tracking-widest text-[#000] mb-2">千载桥梁 · 跨越天堑的工程奇迹</h4>
                                <p class="text-[14px] text-[#555] leading-relaxed tracking-widest font-medium">无论是赵州桥的敞肩泄洪，还是广济桥的浮梁启闭，皆是先民为连通世界而留下的极致实用智慧。</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:w-5/12 relative group w-full">
                    <div class="aspect-[3/4] bg-[#e8e4d3] shadow-2xl relative elegant-card border-4 border-white">
                        
                        <div class="absolute inset-0 overflow-hidden">
                            <img src="https://dandanxia-hs.oss-cn-hangzhou.aliyuncs.com/%E5%BE%BD%E6%B4%BE.jpg" class="w-full h-full object-cover opacity-90 transition-transform duration-[2s] group-hover:scale-110 ease-out" />
                        </div>
                        
                        <div class="absolute bottom-10 -left-6 lg:left-[-3rem] z-10 bg-white/95 backdrop-blur-sm p-6 shadow-2xl border border-black/5 group-hover:-translate-y-2 transition-transform duration-700">
                            <p class="text-xl font-black tracking-widest text-[#000] mb-2">一生痴绝处</p>
                            <p class="text-sm font-bold text-gray-500 tracking-[0.3em]">无梦到徽州</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <section id="dark-epilogue" class="w-full relative px-6 md:px-24 py-40 bg-[#0a0a0a] text-[#fcfaf5] overflow-hidden z-20">
        <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-palace-red/40 via-[#0a0a0a] to-[#0a0a0a]"></div>
        <div class="absolute inset-0 opacity-[0.05] pointer-events-none" style="background-image: linear-gradient(to right, #ffffff 1px, transparent 1px); background-size: 5% 100%;"></div>

        <div class="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center reveal-up">
            
            <h2 class="text-palace-red font-sans tracking-[0.8em] text-sm uppercase flex items-center gap-4 justify-center mb-12 font-black">
                <span class="w-16 h-[2px] bg-palace-red"></span> 03 / 弘扬 · 薪火接力 <span class="w-16 h-[2px] bg-palace-red"></span>
            </h2>
            
            <h3 class="text-5xl md:text-7xl font-black tracking-widest leading-tight mb-20 drop-shadow-lg text-white">
                我们不是在守护灰烬<br>
                <span class="text-gray-400 text-4xl md:text-5xl block mt-6">而是在接力传递那一束火光</span>
            </h3>

            <div class="space-y-10 text-[16px] md:text-[18px] text-gray-300 leading-loose tracking-widest font-bold text-justify md:text-left max-w-4xl mx-auto border-l-2 border-palace-red/50 pl-8 md:pl-12">
                
                <p>
                    <strong class="text-white font-serif text-2xl tracking-widest mb-2 block">为什么要弘扬古建文化？</strong>
                    在千城一面的钢筋水泥丛林里，那些斑驳的官署、江南的黛瓦、千年的古桥，是我们民族在这个星球上存在过的独特印记。它们不是封建糟粕，而是中华民族抵御文化虚无的绝对锚点。
                </p>

                <p>
                    <strong class="text-white font-serif text-2xl tracking-widest mb-2 block">何为真正的弘扬？</strong>
                    真正的弘扬，绝不是把老祖宗的东西锁在博物馆的玻璃罩里凭吊。<strong class="text-palace-red">而是将其中蕴含的东方哲学与民族审美提取出来</strong>，让那种“择一事，终一生”的工匠精神，流淌进现代青年的血液。
                </p>

                <p class="text-xl md:text-2xl font-black text-white italic pt-10 border-t border-white/10 mt-12 text-center md:text-left">
                    “筑理”所做的，正是这场跨越百年的握手。<br>
                    我们用数字化的代码去重新丈量这四类伟大的建筑。从实体到像素，让古老的心跳在数字宇宙中，生生不息！
                </p>
            </div>

            <button @click="$router.push('/')" class="group relative px-16 py-6 mt-32 overflow-hidden border-2 border-white/20 bg-white/5 hover:border-palace-red transition-all duration-500 shadow-2xl">
                <div class="absolute inset-0 w-0 bg-palace-red group-hover:w-full transition-all duration-[0.6s] ease-out z-0"></div>
                <span class="relative z-10 text-sm tracking-[0.5em] font-black uppercase group-hover:text-white transition-colors">致敬大匠 · 返回首页</span>
            </button>
        </div>
        
    </section>

</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

let revealObserver = null
let handleScroll = null

onMounted(() => {
    // 1. 苹果级丝滑浮现动画
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

    // 2. 磁性滚动吸附 (Magnetic Scroll) 逻辑
    const darkSection = document.getElementById('dark-epilogue')
    if (darkSection) {
        let isSnapping = false
        let lastScrollY = window.scrollY

        handleScroll = () => {
            const currentScrollY = window.scrollY
            const isScrollingDown = currentScrollY > lastScrollY

            if (isScrollingDown && !isSnapping) {
                const rect = darkSection.getBoundingClientRect()
                const viewportHeight = window.innerHeight
                
                // 当暗黑区域的顶部露出屏幕视口15% (即 rect.top 小于 viewport的 85%)，并且还未完全越过视口顶部
                if (rect.top < viewportHeight * 0.85 && rect.top > 0) {
                    isSnapping = true
                    
                    window.scrollTo({
                        top: darkSection.offsetTop,
                        behavior: 'smooth'
                    })
                    
                    // 防抖处理，避免鬼畜拉扯
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

/* 强制防抖与抗锯齿，所有正文重墨显示 */
p, h1, h2, h3, h4, span, strong {
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
    box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.2);
}
</style>