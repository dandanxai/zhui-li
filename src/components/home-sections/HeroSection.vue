<template>
    <section class="hero w-full h-screen relative flex items-center justify-center overflow-hidden">
    <div class="hero-compass absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] border border-ink-dark/5 rounded-full flex items-center justify-center pointer-events-none">
        <div class="w-[60%] h-[60%] border border-ink-dark/5 rounded-full"></div>
        <div class="absolute w-full h-[1px] bg-ink-dark/5"></div>
        <div class="absolute h-full w-[1px] bg-ink-dark/5"></div>
    </div>
    
    <div class="z-10 flex space-x-8 md:space-x-24 items-center">
        <div class="flex flex-col items-end space-y-8 transform translate-y-12">
        <p class="hero-anim text-water-gray tracking-[0.4em] text-sm font-serif">弘扬中华优秀传统文化系列之六</p>
        <div class="hero-anim w-[1px] h-32 bg-gold-accent origin-top"></div>
        <p class="hero-anim writing-vertical-rl text-palace-red tracking-[0.5em] text-sm font-serif">中国古代建筑成就展</p>
        </div>
        
        <h1 class="hero-title writing-vertical-rl text-[6rem] md:text-[12rem] font-serif tracking-[0.2em] text-ink-dark leading-none mix-blend-multiply filter drop-shadow-sm">
        筑理
        </h1>

        <div class="hero-seal writing-vertical-rl border-2 border-palace-red text-palace-red p-3 text-2xl font-serif tracking-widest transform -translate-y-16 rotate-6 shadow-sm bg-paper-bg mix-blend-multiply">
        大<br>道
        </div>
    </div>

    <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-40">
        <div class="w-[1px] h-16 bg-gradient-to-b from-ink-dark to-transparent relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full bg-ink-dark animate-[scroll-down_1.5s_ease-in-out_infinite]"></div>
        </div>
    </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
    // 只保留属于序章的动画
    const tlHero = gsap.timeline()
    tlHero.from(".hero-title", { filter: "blur(10px)", opacity: 0, y: 50, duration: 2, ease: "power3.out" })
        .from(".hero-seal", { scale: 0, rotation: 90, opacity: 0, duration: 1.5, ease: "back.out" }, "-=1.5")
        .from(".hero-anim", { opacity: 0, stagger: 0.2, duration: 1.5, ease: "power2.out" }, "-=1.5")
        .to(".hero-compass", { rotation: 360, duration: 60, repeat: -1, ease: "none" }, 0)
})
</script>

<style scoped>
.writing-vertical-rl {
    writing-mode: vertical-rl;
    text-orientation: upright;
}
@keyframes scroll-down {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
}
</style>