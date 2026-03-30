<template>
    <div class="home-wrapper">
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
import { onMounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '@/components/home-sections/HeroSection.vue'
import LanzhuSection from '@/components/home-sections/LanzhuSection.vue'
import TechInterlude from '@/components/home-sections/TechInterlude.vue' // 引入
import DajiangSection from '@/components/home-sections/DajiangSection.vue'
import DianjiSection from '@/components/home-sections/DianjiSection.vue'
import WenmaiSection from '@/components/home-sections/WenmaiSection.vue'
import HomeFooter from '@/components/home-sections/HomeFooter.vue'
import BackToTop from '@/components/BackToTop.vue'

onMounted(() => {
    setTimeout(() => ScrollTrigger.refresh(), 500)
    window.addEventListener('resize', () => ScrollTrigger.refresh())
})
</script>