<template>
    <section id="wenmai" class="bg-[#0a0a0a] text-paper-bg py-40 md:py-60 relative overflow-hidden">
        
        <div class="absolute top-0 right-10 md:right-40 text-[30vw] font-serif font-black text-white/[0.02] select-none pointer-events-none leading-none z-0 writing-vertical-rl">
            文脉
        </div>

        <div class="max-w-7xl mx-auto px-6 md:px-16 relative z-10 flex flex-col md:flex-row items-start gap-20">
            
            <div class="w-full md:w-5/12 md:sticky md:top-40 z-20">
                <div class="flex items-center gap-4 mb-8">
                    <div class="w-12 h-[1px] bg-gold-accent"></div>
                    <span class="text-gold-accent font-serif tracking-[0.5em] text-sm uppercase">卷四 · 传承弘扬</span>
                </div>
                
                <h2 class="text-6xl md:text-7xl font-serif text-white leading-[1.2] font-black mb-10 tracking-wide">
                    千载营造<br>
                    <span class="text-transparent border-text italic mt-4 inline-block transform -translate-x-4">生生不息</span>
                </h2>
                
                <p class="text-gray-400 font-light leading-loose text-lg tracking-widest text-justify mb-16">
                    古建的文脉，绝非故纸堆里的冰冷遗迹，而是中华民族刻在骨子里的工程基因。<br><br>在呼唤可持续发展的今天，重温古建的“规矩与方圆”，不仅是文化自信的寻根，更是让传统的科学精神照亮未来的营造之路。
                </p>

                <button class="group flex items-center gap-6 text-gold-accent hover:text-white transition-colors duration-500">
                    <span class="text-sm font-bold tracking-[0.4em] uppercase">展开千年长卷</span>
                    <div class="w-12 h-12 rounded-full border border-gold-accent/30 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all duration-500">
                        <i class="ri-arrow-right-line text-xl transform group-hover:translate-x-1 transition-transform"></i>
                    </div>
                </button>
            </div>

            <div class="w-full md:w-7/12 relative mt-20 md:mt-0 pt-10 pb-40">
                
                <div class="absolute left-[27px] top-0 bottom-0 w-[1px] bg-white/10 z-0 hidden md:block"></div>
                <div class="golden-line absolute left-[27px] top-0 w-[2px] bg-gradient-to-b from-gold-accent via-gold-accent to-transparent z-10 hidden md:block origin-top"></div>

                <div class="flex flex-col gap-32 relative z-20">
                    
                    <div class="heritage-node relative pl-0 md:pl-24 group">
                        <div class="hidden md:flex absolute left-4 top-2 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-gold-accent/30 items-center justify-center group-hover:border-gold-accent transition-colors duration-500">
                            <div class="w-1.5 h-1.5 rounded-full bg-gold-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        
                        <div class="flex items-baseline gap-6 mb-6">
                            <span class="text-4xl font-serif text-white/20 font-black">01</span>
                            <h4 class="text-3xl font-serif text-white tracking-widest">循道 · 敬畏自然</h4>
                        </div>
                        <div class="bg-white/[0.02] border border-white/5 p-10 hover:bg-white/[0.05] transition-colors duration-500">
                            <p class="text-gray-400 font-light leading-loose text-[15px] tracking-widest text-justify">
                                古建营造始终秉持“天人合一”的哲学。不违背山水走势，因地制宜。无论是四水归堂的集水智慧，还是干阑式建筑的防潮逻辑，都是先民与自然和谐共生的工程学表达。
                            </p>
                        </div>
                    </div>

                    <div class="heritage-node relative pl-0 md:pl-24 group">
                        <div class="hidden md:flex absolute left-4 top-2 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-gold-accent/30 items-center justify-center group-hover:border-gold-accent transition-colors duration-500">
                            <div class="w-1.5 h-1.5 rounded-full bg-gold-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        
                        <div class="flex items-baseline gap-6 mb-6">
                            <span class="text-4xl font-serif text-white/20 font-black">02</span>
                            <h4 class="text-3xl font-serif text-white tracking-widest">制器 · 科学精神</h4>
                        </div>
                        <div class="bg-white/[0.02] border border-white/5 p-10 hover:bg-white/[0.05] transition-colors duration-500">
                            <p class="text-gray-400 font-light leading-loose text-[15px] tracking-widest text-justify">
                                抛弃玄学，走向精密。榫卯的力学解构、斗拱的抗震哲理、模数制的标准化生产。古代大匠以超越时代的科学眼光，为世界建筑史贡献了无与伦比的“中国方案”。
                            </p>
                        </div>
                    </div>

                    <div class="heritage-node relative pl-0 md:pl-24 group">
                        <div class="hidden md:flex absolute left-4 top-2 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-gold-accent/30 items-center justify-center group-hover:border-gold-accent transition-colors duration-500">
                            <div class="w-1.5 h-1.5 rounded-full bg-gold-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        
                        <div class="flex items-baseline gap-6 mb-6">
                            <span class="text-4xl font-serif text-white/20 font-black">03</span>
                            <h4 class="text-3xl font-serif text-gold-accent tracking-widest">传世 · 守正拓新</h4>
                        </div>
                        <div class="bg-gold-accent/5 border border-gold-accent/20 p-10 hover:bg-gold-accent/10 transition-colors duration-500 shadow-[0_0_30px_rgba(230,196,143,0.05)]">
                            <p class="text-gray-300 font-light leading-loose text-[15px] tracking-widest text-justify">
                                传承，是为了更好地前行。将传统的榫卯技艺与现代材料科学结合，让古建的形制在数字化浪潮中重生。我们要传承的不仅是飞檐翘角，更是那份精益求精的大匠之魂。
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
    // 🍏 苹果风：左侧固定叙事区交错上浮
    gsap.from(".md\\:sticky > *", {
        y: 50, 
        opacity: 0, 
        duration: 1.2, 
        stagger: 0.15, // 标题、段落、按钮会像流水一样依次出来
        ease: "power3.out",
        scrollTrigger: { 
            trigger: "#wenmai", 
            start: "top 75%" 
        }
    })

    // 2. 核心动画：右侧脉络金线向下生长
    gsap.fromTo(".golden-line", 
        { scaleY: 0 }, 
        { 
            scaleY: 1, 
            ease: "none",
            scrollTrigger: {
                trigger: ".golden-line",
                start: "top 60%", // 线条开始进入视口时
                end: "bottom 40%", // 线条底部离开视口时画完
                scrub: 1 // 绑定滚动条，跟随滚动生长的灵魂
            }
        }
    )

    // 3. 右侧节点依次上浮淡入 (将 ease 改为 power3.out)
    gsap.utils.toArray('.heritage-node').forEach((node, i) => {
        gsap.from(node, {
            y: 60, opacity: 0, duration: 1.2, ease: "power3.out",
            scrollTrigger: {
                trigger: node,
                start: "top 85%", // 节点到达屏幕下方 85% 处触发
                toggleActions: "play none none reverse"
            }
        })
    })
})
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css');

.writing-vertical-rl {
    writing-mode: vertical-rl;
    text-orientation: upright;
}

/* 镂空文字的描边样式，极其高级 */
.border-text {
    -webkit-text-stroke: 2px #e6c48f; /* 使用金色的描边 */
    color: transparent;
}
</style>