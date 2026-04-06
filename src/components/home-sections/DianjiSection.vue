<template>
    <section id="dianji" class="book-section relative bg-[#e3ded5] border-t border-ink-dark/10 h-[300vh]">
    
    <div class="fixed bottom-10 left-10 z-20 pointer-events-none book-title opacity-0 mix-blend-difference text-paper-bg">
        <span class="text-gold-accent font-serif tracking-[0.5em] text-xs block mb-2">卷三 · 典籍</span>
        <h2 class="text-2xl font-serif">智慧的传承</h2>
    </div>

    <div class="center-book-wrapper absolute top-0 left-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
        <div class="dynamic-cover absolute text-[35vw] font-serif text-ink-dark opacity-[0.03] select-none writing-vertical-rl book-bg-text transition-opacity duration-300">
            {{ currentBgText }}
        </div>
        
        <div class="book-model relative w-[300px] h-[450px] shadow-[0_40px_80px_rgba(0,0,0,0.2)] bg-[#f4f0e6] border border-[#d6cfb8]">
            <div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#d9d4c7] to-[#f4f0e6] border-r border-ink-dark/10"></div>
            <div class="absolute right-4 top-0 bottom-0 w-2 flex flex-col justify-evenly py-8">
                <div class="w-5 h-[2px] bg-ink-dark"></div><div class="w-5 h-[2px] bg-ink-dark"></div>
                <div class="w-5 h-[2px] bg-ink-dark"></div><div class="w-5 h-[2px] bg-ink-dark"></div>
            </div>
            <div class="absolute left-6 -top-3 w-8 h-20 shadow-md flex items-end justify-center pb-2 transition-colors duration-500 z-10" :class="currentColor">
                <span class="text-white text-xs font-serif">典籍</span>
            </div>
            <div class="w-full h-full p-12 flex justify-center items-center">
                <div class="border border-ink-dark p-2 w-full h-full">
                    <div class="border border-ink-dark w-full h-full flex justify-center items-center relative bg-[#faf8f5]">
                        <h4 class="dynamic-cover text-4xl md:text-5xl font-serif writing-vertical-rl tracking-[0.4em] text-ink-dark drop-shadow-sm transition-opacity duration-300">
                            {{ currentBookTitle }}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="absolute top-0 left-0 w-full z-10 pointer-events-none pt-[20vh] pb-[30vh]">
        
        <div class="scroll-card min-h-[70vh] flex items-center px-6 md:px-[15%]">
            <div class="card-content w-full md:w-[45%] bg-paper-bg/95 p-10 md:p-14 shadow-2xl pointer-events-auto border-t-4 border-palace-red hover-trigger">
                <span class="text-palace-red text-xs tracking-[0.3em] mb-4 block uppercase">北宋李诫 · 巅峰专著</span>
                <h3 class="text-4xl font-serif mb-6 text-ink-dark">《营造法式》</h3>
                <p class="text-gray-700 leading-loose text-justify font-light text-lg">
                中国古代最完整、最严谨的建筑技术专著。全书34卷，包含极其精密的“测算”与“制图”。<br><br>其最大的科学价值在于总结出了<b>“模数制（以材为祖）”</b>，代表了中国十一世纪建筑工程学的最高水平。
                </p>
            </div>
        </div>

        <div class="scroll-card min-h-[70vh] flex items-center justify-end px-6 md:px-[15%] mt-[5vh]">
            <div class="card-content w-full md:w-[45%] bg-ink-dark text-paper-bg p-10 md:p-14 shadow-2xl pointer-events-auto border-t-4 border-gold-accent hover-trigger">
                <span class="text-gold-accent text-xs tracking-[0.3em] mb-4 block uppercase">清代雍正 · 官方规范</span>
                <h3 class="text-4xl font-serif mb-6">《工程做法则例》</h3>
                <p class="text-gray-400 leading-loose text-justify font-light text-lg">
                清雍正十二年工部颁布的官修建筑规范。相较于宋代，该书更加强调斗拱功能的退化与梁架结构的强化。它更是古代中央集权在工程预算审计上的管理学体现。
                </p>
            </div>
        </div>

        <div class="scroll-card min-h-[70vh] flex items-center px-6 md:px-[15%] mt-[5vh]">
            <div class="card-content w-full md:w-[45%] bg-paper-bg/95 p-10 md:p-14 shadow-2xl pointer-events-auto border-t-4 border-[#8a979e] hover-trigger">
                <span class="text-[#8a979e] text-xs tracking-[0.3em] mb-4 block uppercase">明代计成 · 园林圣典</span>
                <h3 class="text-4xl font-serif mb-6 text-ink-dark">《园冶》</h3>
                <p class="text-gray-700 leading-loose text-justify font-light text-lg">
                世界造园学最早的专著。如果说前两部是冷硬的工程学，这部则是极具东方哲学的环境生态科学。全书提出<b>“虽由人作，宛自天开”</b>的核心思辨。
                </p>
            </div>
        </div>

    </div>
    </section>
</template>

<script setup>
import { onMounted, ref, nextTick, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const currentBookTitle = ref('营造法式')
const currentBgText = ref('法式')
const currentColor = ref('bg-palace-red')

const bookData = [
    { title: '营造法式', bg: '法式', color: 'bg-palace-red' },
    { title: '工程做法则例', bg: '则例', color: 'bg-gold-accent' },
    { title: '园冶', bg: '园冶', color: 'bg-[#8a979e]' }
]

onMounted(async () => {
    await nextTick()
    setTimeout(() => {
        initAnimations()
    }, 400)
})

const initAnimations = () => {
    // 1. 强行钉住中间容器！(解决不跟着滚的问题)
    ScrollTrigger.create({
        trigger: ".book-section",
        start: "top top",         // 区域到达屏幕顶部时触发
        end: "bottom bottom",     // 区域底部到达屏幕底部时解除
        pin: ".center-book-wrapper", // 死死钉住中间的书本层
        pinSpacing: false         // 保证不影响原来的高度布局
    })

    // 左下角标题
    gsap.to(".book-title", {
        opacity: 1, duration: 0.5,
        scrollTrigger: { trigger: ".book-section", start: "top center", end: "bottom center", toggleActions: "play reverse play reverse" }
    })

    // 2. 书本从左向右倾斜 (解决倾斜效果)
    gsap.fromTo(".book-model", 
        { rotation: -8, scale: 1 }, // 初始：向左倾斜8度
        {
            rotation: 8,            // 结束：向右倾斜8度
            scale: 1.1,             // 稍微放大
            ease: "none",
            scrollTrigger: { 
                trigger: ".book-section", 
                start: "top bottom", 
                end: "bottom top", 
                scrub: true 
            }
        }
    )
    
    // 背景大字
    gsap.to(".book-bg-text", {
        yPercent: -100, ease: "none",
        scrollTrigger: { trigger: ".book-section", start: "top bottom", end: "bottom top", scrub: true }
    })

    // 3. 卡片滚动与文字切换
    gsap.utils.toArray('.scroll-card').forEach((card, index) => {
        // 卡片自身视差
        gsap.fromTo(card.querySelector('.card-content'), 
            { y: 150 }, 
            { y: -150, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } }
        )

        // 触发换书
        ScrollTrigger.create({
            trigger: card,
            start: "top 50%", 
            end: "bottom 50%",
            onEnter: () => changeBook(index),
            onEnterBack: () => changeBook(index)
        })
    })

    ScrollTrigger.refresh()
}

const changeBook = (index) => {
    if (currentBookTitle.value === bookData[index].title) return;

    gsap.killTweensOf('.dynamic-cover');

    gsap.to('.dynamic-cover', {
        opacity: 0, 
        duration: 0.2, 
        onComplete: () => {
            currentBookTitle.value = bookData[index].title
            currentBgText.value = bookData[index].bg
            currentColor.value = bookData[index].color
            
            gsap.to('h4.dynamic-cover', { opacity: 1, duration: 0.3 })
            gsap.to('div.book-bg-text.dynamic-cover', { opacity: 0.03, duration: 0.3 })
        }
    })
}

onUnmounted(() => {
    ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<style scoped>
.writing-vertical-rl {
    writing-mode: vertical-rl;
    text-orientation: upright;
}
.mix-blend-difference {
    mix-blend-mode: difference;
}
</style>