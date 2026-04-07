<template>
    <section id="lanzhu" class="horizontal-section relative bg-[#ebe7df] overflow-hidden border-y border-ink-dark/10">
    <div class="absolute top-24 left-10 md:left-24 z-20 pointer-events-none">
        <span class="text-palace-red font-serif tracking-[0.5em] text-sm block mb-2">卷一 · 览筑</span>
        <h2 class="text-4xl md:text-5xl font-serif text-ink-dark">规制与风物</h2>
    </div>

    <div class="absolute bottom-12 left-24 w-64 h-[1px] bg-ink-dark/20 z-20 hidden md:block">
        <div id="hz-progress" class="h-full bg-palace-red w-0"></div>
    </div>

    <div class="horizontal-container flex h-screen items-center pl-[20vw] pr-[20vw] w-max">
        
        <div class="scroll-item w-screen md:w-[70vw] shrink-0 relative flex items-center justify-center px-10 hover-trigger">
            <div class="relative w-[90%] md:w-[70%] h-[60vh] overflow-hidden shadow-2xl">
                <img src="https://img.cc0.cn/pixabay/2019102100361318849.jpg!cc0.cn.jpg" class="hz-img w-full h-full object-cover img-mask-elegant transform scale-110">
            </div>
            <div class="absolute left-4 md:left-20 bottom-20 bg-paper-bg p-8 md:p-12 max-w-lg shadow-2xl border-l-4 border-palace-red z-10">
                <h3 class="text-4xl md:text-5xl font-serif mb-6 text-ink-dark">皇宫建筑：防震与排水的科学巅峰</h3>
                <p class="text-sm text-gray-700 leading-loose text-justify font-light">
                    其卓越的自然科学成就体现在<b>抗震力学</b>与<b>精密排水系统</b>。利用榫卯结构与多层斗拱形成“柔性骨架”，遭遇强震时如太极般卸力；历经数百年无积水之患。
                </p>
            </div>
        </div>

        <div class="scroll-item w-screen md:w-[60vw] shrink-0 relative flex flex-col items-center justify-center px-10 hover-trigger">
            <div class="w-full flex justify-end mb-[-60px] z-10">
                <h3 class="text-5xl md:text-6xl font-serif bg-paper-bg p-6 shadow-xl writing-vertical-rl text-ink-dark border border-[#dfdbd1]">官府衙署</h3>
            </div>
            <div class="overflow-hidden w-[80%] h-[55vh] shadow-xl">
                <img src="https://img.cc0.cn/pixabay/2019101906522355000.jpg!cc0.cn.jpg" class="hz-img w-full h-full object-cover transform scale-110 filter sepia-[0.3]">
            </div>
            <p class="w-[70%] text-justify mt-10 text-sm text-gray-700 leading-loose ml-auto border-t border-gold-accent pt-6 font-light">
                整体布局遵循“前堂后寝”的严格规制，展现了古代官方建筑在功能分区、采光通风与安保防御上的高度实用主义科学。
            </p>
        </div>

        <div class="scroll-item w-screen md:w-[70vw] shrink-0 relative flex items-center px-10 hover-trigger">
            <div class="w-5/12 relative z-10 pl-10">
                <span class="text-gold-accent tracking-[0.3em] text-xs mb-4 block">气候适应与生态智慧</span>
                <h3 class="text-5xl font-serif mb-8 flex items-center text-ink-dark"><span class="w-12 h-[2px] bg-palace-red mr-6"></span>传统民居</h3>
                <p class="text-sm text-gray-700 leading-loose text-justify font-light">
                    皖南徽派建筑以高耸的<b>“马头墙”</b>切断火灾蔓延路径；内部的<b>“天井”</b>设计利用热压差形成自然穿堂风，完美解决了聚居环境下的微气候调节问题。
                </p>
            </div>
            <div class="w-7/12 relative h-[70vh]">
                <div class="overflow-hidden absolute top-10 right-10 w-[80%] h-[60vh] shadow-2xl">
                    <img src="https://img.cc0.cn/pixabay/2019102100302718085.jpg!cc0.cn.jpg" class="hz-img w-full h-full object-cover transform scale-110">
                </div>
                <div class="absolute bottom-10 left-[-10%] w-[50%] bg-gold-accent/90 p-8 shadow-xl flex items-end">
                    <span class="writing-vertical-rl text-3xl font-serif text-paper-bg drop-shadow-md">粉墙黛瓦</span>
                </div>
            </div>
        </div>

        <div class="scroll-item w-screen md:w-[60vw] shrink-0 relative flex items-center justify-center px-10 hover-trigger">
            <div class="overflow-hidden w-full h-[50vh]">
                <img src="https://img.cc0.cn/pixabay/2019102106333866668.jpg!cc0.cn.jpg" class="hz-img w-full h-full object-cover transform scale-110 filter grayscale contrast-125">
            </div>
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h3 class="text-[8rem] font-serif text-white mix-blend-difference drop-shadow-2xl text-center">古典桥梁</h3>
            </div>
            <div class="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[85%] text-center bg-paper-bg py-6 px-10 shadow-2xl border-t-2 border-palace-red">
                <p class="text-sm text-ink-dark tracking-widest leading-loose text-justify md:text-center">
                    <b>力学与几何学的奇迹。</b>首创“敞肩式”单孔石拱桥设计，不仅极大节省了石料，更巧妙地增加了泄洪面积，降低洪水对桥身的冲击力。
                </p>
            </div>
        </div>
    </div>
    </section>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(async () => {
    // 1. 等待 DOM 完全挂载
    await nextTick()
    
    // 🍏 苹果风：大标题区域交错上浮入场
    gsap.from(".absolute.top-24 > *", {
        y: 40, 
        opacity: 0, 
        duration: 1.2, 
        stagger: 0.2, // 子元素依次延迟 0.2s 出现
        ease: "power3.out",
        scrollTrigger: { 
            trigger: "#lanzhu", 
            start: "top 80%" // 当该区域顶部到达屏幕 80% 处触发
        }
    })

    let hzContainer = document.querySelector(".horizontal-container")
    if (!hzContainer) return

    // 2. 初始化横向滚动
    let scrollTween = gsap.to(hzContainer, {
        x: () => -(hzContainer.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: ".horizontal-section",
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + (hzContainer.scrollWidth),
            invalidateOnRefresh: true, // 核心：刷新时重算
            onUpdate: (self) => {
                gsap.set("#hz-progress", { width: `${self.progress * 100}%` });
            }
        }
    })

    // 3. 内部图片视差
    gsap.utils.toArray('.hz-img').forEach(img => {
        gsap.to(img, {
            xPercent: 15, 
            ease: "none",
            scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
                invalidateOnRefresh: true
            }
        })
    })
})
</script>

<style scoped>
.horizontal-container {
    will-change: transform;
}
.writing-vertical-rl { writing-mode: vertical-rl; text-orientation: upright; }
.img-mask-elegant { mask-image: linear-gradient(to right, black 80%, transparent 100%); -webkit-mask-image: linear-gradient(to right, black 80%, transparent 100%); }
.mix-blend-difference { mix-blend-mode: difference; }
</style>