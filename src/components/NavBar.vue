<template>
<header class="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 pointer-events-none mix-blend-difference text-paper-bg">
    
    <div class="text-lg font-serif tracking-[0.4em] font-bold pointer-events-auto hover-trigger cursor-pointer flex items-center">
    <span class="w-2 h-2 bg-palace-red mr-3 rounded-full"></span>筑理
    </div>
    
    <div class="hidden md:flex space-x-12 pointer-events-auto text-xs tracking-[0.2em] font-serif items-start">
    <router-link to="/" class="hover:text-palace-red transition-colors relative group text-left">
        首页 <span class="text-[9px] uppercase opacity-50 block text-center mt-1">Home</span>
        <div class="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-palace-red transition-all group-hover:w-full group-hover:left-0"></div>
    </router-link>
    
    <router-link to="/lanzhu" class="hover:text-palace-red transition-colors relative group text-left">
        览筑 <span class="text-[9px] uppercase opacity-50 block text-center mt-1">Explore</span>
        <div class="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-palace-red transition-all group-hover:w-full group-hover:left-0"></div>
    </router-link>
    
    <router-link to="/dajiang" class="hover:text-palace-red transition-colors relative group text-left">
        大匠 <span class="text-[9px] uppercase opacity-50 block text-center mt-1">Masters</span>
        <div class="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-palace-red transition-all group-hover:w-full group-hover:left-0"></div>
    </router-link>
    
    <router-link to="/#dianji" class="hover:text-palace-red transition-colors relative group text-left">
        典籍 <span class="text-[9px] uppercase opacity-50 block text-center mt-1">Texts</span>
        <div class="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-palace-red transition-all group-hover:w-full group-hover:left-0"></div>
    </router-link>
    
    <router-link to="/#wenmai" class="hover:text-palace-red transition-colors relative group text-left">
        文脉 <span class="text-[9px] uppercase opacity-50 block text-center mt-1">Heritage</span>
        <div class="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-palace-red transition-all group-hover:w-full group-hover:left-0"></div>
    </router-link>
    
    <button @click="openAiMaster" class="hover:text-palace-red transition-colors relative group text-left outline-none">
        <span class="relative">
        智脑
        <span class="absolute -top-0.5 -right-3 w-1.5 h-1.5 bg-palace-red rounded-full animate-pulse"></span>
        </span>
        <span class="text-[9px] uppercase opacity-50 block text-center mt-1">A.I.</span>
        <div class="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-palace-red transition-all group-hover:w-full group-hover:left-0"></div>
    </button>
    </div>

    <button @click="toggleMenu" class="text-xs tracking-widest uppercase pointer-events-auto hover-trigger relative group">
    <span v-if="!isMenuOpen">展开卷轴 / MENU</span>
    <span v-else>合上卷轴 / CLOSE</span>
    </button>
</header>

<Transition name="menu-fade">
    <div v-if="isMenuOpen" class="fixed inset-0 z-40 bg-ink-dark flex items-center justify-center">
    <nav class="relative z-10 flex flex-col items-center space-y-10 text-center">
        <router-link to="/" @click="toggleMenu" class="text-4xl md:text-6xl font-serif text-paper-bg hover:text-palace-red transition-all tracking-[0.2em] hover-trigger">首卷 · 开篇</router-link>
        <router-link to="/lanzhu" @click="toggleMenu" class="text-4xl md:text-6xl font-serif text-paper-bg hover:text-palace-red transition-all tracking-[0.2em] hover-trigger">览筑 · 规制</router-link>
        <router-link to="/dajiang" @click="toggleMenu" class="text-4xl md:text-6xl font-serif text-paper-bg hover:text-palace-red transition-all tracking-[0.2em] hover-trigger">大匠 · 匠心</router-link>
        <router-link to="/#dianji" @click="toggleMenu" class="text-4xl md:text-6xl font-serif text-paper-bg hover:text-palace-red transition-all tracking-[0.2em] hover-trigger">典籍 · 法式</router-link>
        <router-link to="/#wenmai" @click="toggleMenu" class="text-4xl md:text-6xl font-serif text-paper-bg hover:text-palace-red transition-all tracking-[0.2em] hover-trigger">文脉 · 传承</router-link>
        
        <a href="#" @click.prevent="openAiMaster" class="text-4xl md:text-6xl font-serif text-palace-red hover:text-white transition-all tracking-[0.2em] hover-trigger relative">
        智脑 · 推演
        <span class="absolute top-2 -right-6 md:-right-8 w-3 h-3 bg-palace-red rounded-full animate-pulse"></span>
        </a>
    </nav>
    </div>
</Transition>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
isMenuOpen.value = !isMenuOpen.value
document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

// 派发全局事件，唤醒 AI 控制台
const openAiMaster = () => {
window.dispatchEvent(new Event('open-ai-master'));
if (isMenuOpen.value) {
    toggleMenu();
}
}
</script>

<style scoped>
.menu-fade-enter-active, .menu-fade-leave-active { transition: opacity 0.5s ease; }
.menu-fade-enter-from, .menu-fade-leave-to { opacity: 0; }
</style>