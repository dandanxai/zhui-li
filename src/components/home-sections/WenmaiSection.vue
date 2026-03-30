<template>
    <section id="wenmai" class="bg-ink-dark text-paper-bg py-60 px-6 md:px-16 relative overflow-hidden border-t border-white/5">
    <div class="absolute top-20 left-10 text-[15rem] font-serif text-white/5 select-none pointer-events-none">2026</div>
    <div class="absolute bottom-10 right-10 text-[10rem] font-serif text-gold-accent/5 select-none pointer-events-none">HERITAGE</div>

    <div class="max-w-6xl mx-auto relative z-10 culture-content">
        <div class="mb-32 text-left md:pl-10">
        <span class="text-gold-accent font-serif tracking-[0.5em] text-sm block mb-6 uppercase opacity-70">卷四 · 文脉</span>
        <h2 class="text-6xl md:text-[7rem] font-serif text-white leading-[1.1] filter drop-shadow-2xl">
            赓续文脉<br>
            <span class="text-gold-accent italic ml-20 md:ml-40">生生不息</span>
        </h2>
        </div>

        <div class="relative flex flex-col md:flex-row items-start gap-12 md:gap-0">
        
        <div class="culture-card w-full md:w-1/3 p-10 border-l border-gold-accent/30 bg-white/5 backdrop-blur-md relative group">
            <span class="absolute -top-6 -left-4 text-5xl font-serif text-gold-accent/20 group-hover:text-gold-accent/50 transition-colors">01</span>
            <h4 class="text-gold-accent font-serif text-2xl mb-8 tracking-widest">工程基因</h4>
            <p class="text-gray-400 font-light leading-loose text-sm tracking-widest text-justify">
            古建文脉，绝非故纸堆里的冰冷遗迹，而是中华民族刻在骨子里的工程基因。千百年来，它始终秉持对自然山水的敬畏，顺应天时，因地制宜。
            </p>
            <div class="w-full h-[1px] bg-white/10 mt-10"></div>
        </div>

        <div class="culture-card w-full md:w-1/3 p-10 border-l border-gold-accent/30 bg-white/5 backdrop-blur-md relative group md:-translate-y-20 md:mx-6">
            <span class="absolute -top-6 -left-4 text-5xl font-serif text-gold-accent/20 group-hover:text-gold-accent/50 transition-colors">02</span>
            <h4 class="text-gold-accent font-serif text-2xl mb-8 tracking-widest">科学远见</h4>
            <p class="text-gray-400 font-light leading-loose text-sm tracking-widest text-justify">
            榫卯的力学解构、斗拱的抗震哲理、四水归堂的生态法则。古代大匠以超越时代的科学眼光，为世界建筑史贡献了无与伦比的“中国方案”。
            </p>
            <div class="hidden md:block absolute -right-6 top-1/2 w-12 h-[1px] bg-gold-accent/30"></div>
        </div>

        <div class="culture-card w-full md:w-1/3 p-10 border border-gold-accent/40 bg-gold-accent/5 backdrop-blur-lg relative group md:translate-y-16">
            <span class="absolute -top-6 -left-4 text-5xl font-serif text-gold-accent/30 group-hover:text-gold-accent transition-colors">03</span>
            <div class="absolute inset-0 border border-gold-accent/10 scale-95 pointer-events-none"></div>
            <h4 class="text-white font-serif text-2xl mb-8 tracking-widest underline underline-offset-8 decoration-gold-accent/50">传承与拓新</h4>
            <p class="text-gray-300 font-light leading-loose text-sm tracking-widest text-justify">
            传承，是为了更好地前行。在呼唤可持续发展的今天，重温古建的“规矩与方圆”，不仅是文化自信的寻根，更是让传统的科学精神照亮未来的营造之路。
            </p>
        </div>

        </div>

        <div class="mt-60 flex flex-col items-center">
        <div class="w-20 h-[1px] bg-gold-accent/50 mb-10"></div>
        <p class="text-white text-xl md:text-2xl font-serif tracking-[0.5em] mb-12 opacity-80">致敬中国古代建筑科学家</p>
        <div class="w-[1px] h-40 bg-gradient-to-b from-gold-accent via-gold-accent/20 to-transparent"></div>
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
    // 标题区域动画
    gsap.from(".culture-content h2", {
        x: -50, opacity: 0, duration: 1.5, ease: "power3.out",
        scrollTrigger: { trigger: ".culture-content h2", start: "top 85%" }
    })
    
    // 卡片错位进场动画
    gsap.utils.toArray('.culture-card').forEach((card, i) => {
        gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
            delay: i * 0.2,
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
            }
        })
    })
})
</script>

<style scoped>
/* 增加平滑的背景渐变效果 */
.culture-card {
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s ease;
}
.culture-card:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-10px) !important;
}
</style>