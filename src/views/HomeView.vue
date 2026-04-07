<template>
    <div class="home-wrapper" ref="homeRef">
        <HeroSection />
        <LanzhuSection />
        
        <TechInterlude /> 
        
        <DajiangSection />
        <DianjiSection />
        <WenmaiSection />
        <HomeFooter />
        <BackToTop />
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '@/components/home-sections/HeroSection.vue'
import LanzhuSection from '@/components/home-sections/LanzhuSection.vue'
import TechInterlude from '@/components/home-sections/TechInterlude.vue' 
import DajiangSection from '@/components/home-sections/DajiangSection.vue'
import DianjiSection from '@/components/home-sections/DianjiSection.vue'
import WenmaiSection from '@/components/home-sections/WenmaiSection.vue'
import HomeFooter from '@/components/home-sections/HomeFooter.vue'
import BackToTop from '@/components/BackToTop.vue'

// 定义引用与观察者
const homeRef = ref(null)
let resizeObserver = null
let debounceTimer = null

onMounted(() => {
    // 🍏 终极解法：使用 ResizeObserver 实时监听整个页面的高度变化
    // 无论 3D 模型加载多慢、图片多大，只要把网页撑开了，就会立刻触发！
    resizeObserver = new ResizeObserver(() => {
        // 使用防抖 (Debounce)，防止短时间内高度频繁变化导致卡顿
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            // 🌟 核心杀手锏：强制排序！
            // 告诉 GSAP：“不要管 Vue 的挂载顺序，严格按照 DOM 从上到下的物理顺序，把 pin 的高度加进去重新计算触发点！”
            ScrollTrigger.sort() 
            ScrollTrigger.refresh()
        }, 100)
    })

    if (homeRef.value) {
        resizeObserver.observe(homeRef.value) // 开始监听主容器
    }
    
    // 页面所有资源（含图片）完整加载完毕后的最后一次兜底校准
    window.addEventListener('load', () => {
        ScrollTrigger.sort()
        ScrollTrigger.refresh()
    })
})

onUnmounted(() => {
    // 离开页面时销毁监听，防止内存泄漏
    if (resizeObserver && homeRef.value) {
        resizeObserver.unobserve(homeRef.value)
        resizeObserver.disconnect()
    }
})
</script>