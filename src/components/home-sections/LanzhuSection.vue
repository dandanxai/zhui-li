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
        
        <div v-for="(item, index) in categoryList" :key="item.id" 
            @click="router.push(`/lanzhu/${item.id}`)"
            :class="['scroll-item shrink-0 relative flex items-center justify-center px-10 hover-trigger cursor-pointer group', getContainerClass(index)]">
            
            <template v-if="index % 4 === 0">
                <div class="relative w-[90%] md:w-[70vw] h-[60vh] overflow-hidden shadow-2xl">
                    <img :src="item.tagImage" class="hz-img w-full h-full object-cover img-mask-elegant transform scale-110 group-hover:scale-115 transition-transform duration-700">
                </div>
                <div class="absolute left-4 md:left-20 bottom-20 bg-paper-bg p-8 md:p-12 max-w-lg shadow-2xl border-l-4 border-palace-red z-10">
                    <h3 class="text-4xl md:text-5xl font-serif mb-6 text-ink-dark">{{ item.title }}:{{ item.features }}</h3>
                    <p class="text-sm text-gray-700 leading-loose text-justify font-light" v-html="item.description"></p>
                </div>
            </template>

            <template v-else-if="index % 4 === 1">
                <div class="flex flex-col items-center w-[60vw]">
                    <div class="w-full flex justify-end mb-[-60px] z-10">
                        <h3 class="text-5xl md:text-6xl font-serif bg-paper-bg p-6 shadow-xl writing-vertical-rl text-ink-dark border border-[#dfdbd1]">{{ item.title }}</h3>
                    </div>
                    <div class="overflow-hidden w-[80%] h-[55vh] shadow-xl">
                        <img :src="item.tagImage" class="hz-img w-full h-full object-cover transform scale-110 filter sepia-[0.3] group-hover:sepia-0 transition-all duration-700">
                    </div>
                    <p class="w-[70%] text-justify mt-10 text-sm text-gray-700 leading-loose ml-auto border-t border-gold-accent pt-6 font-light" v-html="item.description"></p>
                </div>
            </template>

            <template v-else-if="index % 4 === 2">
                <div class="flex items-center w-[75vw]">
                    <div class="w-5/12 relative z-10 pl-10">
                        <span class="text-gold-accent tracking-[0.3em] text-xs mb-4 block">{{ item.features }}</span>
                        <h3 class="text-5xl font-serif mb-8 flex items-center text-ink-dark">
                            <span class="w-12 h-[2px] bg-palace-red mr-6"></span>{{ item.title }}
                        </h3>
                        <p class="text-sm text-gray-700 leading-loose text-justify font-light" v-html="item.description"></p>
                    </div>
                    <div class="w-7/12 relative h-[70vh]">
                        <div class="overflow-hidden absolute top-10 right-10 w-[80%] h-[60vh] shadow-2xl">
                            <img :src="item.tagImage" class="hz-img w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-1000">
                        </div>
                        <div class="absolute bottom-10 left-[-5%] w-[45%] bg-gold-accent/90 p-8 shadow-xl flex items-end">
                            <span class="writing-vertical-rl text-3xl font-serif text-paper-bg drop-shadow-md">{{ item.landmarkWord }}</span>
                        </div>
                    </div>
                </div>
            </template>

            <template v-else>
                <div class="w-[65vw] relative flex items-center justify-center">
                    <div class="overflow-hidden w-full h-[50vh]">
                        <img :src="item.tagImage" class="hz-img w-full h-full object-cover transform scale-110 filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700">
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <h3 class="text-[6rem] md:text-[8rem] font-serif text-white mix-blend-difference drop-shadow-2xl text-center">{{ item.title }}</h3>
                    </div>
                    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[85%] text-center bg-paper-bg py-6 px-10 shadow-2xl border-t-2 border-palace-red">
                        <p class="text-sm text-ink-dark tracking-widest leading-loose text-justify md:text-center" v-html="item.description"></p>
                    </div>
                </div>
            </template>

        </div>
    </div>
    </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router' // 🏮 引入路由跳转
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { listCategory } from '@/api/building'

const router = useRouter()
gsap.registerPlugin(ScrollTrigger)
const categoryList = ref([])

const getList = async () => {
    try {
        const res = await listCategory();
        // 适配若依的分页返回结构
        categoryList.value = res.rows || res.data.rows || [];
        nextTick(() => {
            initGsapAnimations();
        });
    } catch (err) {
        console.error("加载数据失败", err);
    }
}

const getContainerClass = (index) => {
    const widths = ['w-screen md:w-[80vw]', 'w-screen md:w-[65vw]', 'w-screen md:w-[80vw]', 'w-screen md:w-[70vw]'];
    return widths[index % 4];
}

const initGsapAnimations = () => {
    gsap.from(".absolute.top-24 > *", {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: "#lanzhu", start: "top 80%" }
    })

    const hzContainer = document.querySelector(".horizontal-container")
    if (!hzContainer) return

    let scrollTween = gsap.to(hzContainer, {
        x: () => -(hzContainer.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: ".horizontal-section",
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + (hzContainer.scrollWidth),
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                gsap.set("#hz-progress", { width: `${self.progress * 100}%` });
            }
        }
    })

    gsap.utils.toArray('.hz-img').forEach(img => {
        gsap.to(img, {
            xPercent: 15, ease: "none",
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
}

onMounted(() => {
    getList();
})
</script>