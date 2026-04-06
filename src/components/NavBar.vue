<template>
<header class="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-[1000] pointer-events-none mix-blend-difference text-paper-bg">
    
    <router-link to="/" class="text-lg font-serif tracking-[0.4em] font-bold pointer-events-auto hover-trigger cursor-pointer flex items-center">
        <span class="w-2 h-2 bg-palace-red mr-3 rounded-full"></span>筑理
    </router-link>
    
    <div class="hidden lg:flex space-x-10 pointer-events-auto text-xs tracking-[0.2em] font-serif items-start">
        <a href="/dashboard" target="_blank" class="text-palace-red transition-colors relative group text-left font-bold cursor-pointer">
            天枢 <span class="text-[9px] uppercase opacity-70 block text-center mt-1">Dashboard</span>
            <div class="absolute -bottom-2 left-0 w-full h-[1px] bg-palace-red opacity-30"></div>
        </a>

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
        
        <router-link to="/dianji" class="hover:text-palace-red transition-colors relative group text-left">
            典籍 <span class="text-[9px] uppercase opacity-50 block text-center mt-1">Texts</span>
            <div class="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-palace-red transition-all group-hover:w-full group-hover:left-0"></div>
        </router-link>
        
        <router-link to="/wenmai" class="hover:text-palace-red transition-colors relative group text-left">
            文脉 <span class="text-[9px] uppercase opacity-50 block text-center mt-1">Heritage</span>
            <div class="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-palace-red transition-all group-hover:w-full group-hover:left-0"></div>
        </router-link>
        
        <button @click="openAiMaster" class="hover:text-palace-red transition-colors relative group text-left outline-none pointer-events-auto">
            <span class="relative">
                智脑
                <span class="absolute -top-0.5 -right-3 w-1.5 h-1.5 bg-palace-red rounded-full animate-pulse"></span>
            </span>
            <span class="text-[9px] uppercase opacity-50 block text-center mt-1">A.I.</span>
            <div class="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-palace-red transition-all group-hover:w-full group-hover:left-0"></div>
        </button>
    </div>

    <button @click="toggleMenu" class="text-xs tracking-widest uppercase pointer-events-auto hover-trigger relative group p-2 outline-none">
        <span v-if="!isMenuOpen">展开卷轴 / MENU</span>
        <span v-else>合上卷轴 / CLOSE</span>
    </button>
</header>

<Transition name="menu-fade">
    <div v-if="isMenuOpen" class="fixed inset-0 z-[900] bg-[#0a0a0a] flex items-center justify-center">
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
            <span class="text-[40vw] font-serif text-white">营造</span>
        </div>

        <nav class="relative z-10 flex flex-col items-center space-y-6 md:space-y-10 text-center">
            <a href="/dashboard" target="_blank" @click="toggleMenu" class="text-4xl md:text-6xl font-serif text-palace-red hover:text-white transition-all tracking-[0.2em] font-bold cursor-pointer">
                天枢 · 舆图
            </a>
            
            <router-link to="/" @click="toggleMenu" class="text-3xl md:text-5xl font-serif text-paper-bg/80 hover:text-palace-red transition-all tracking-[0.2em]">首卷 · 开篇</router-link>
            <router-link to="/lanzhu" @click="toggleMenu" class="text-3xl md:text-5xl font-serif text-paper-bg/80 hover:text-palace-red transition-all tracking-[0.2em]">览筑 · 规制</router-link>
            <router-link to="/dajiang" @click="toggleMenu" class="text-3xl md:text-5xl font-serif text-paper-bg/80 hover:text-palace-red transition-all tracking-[0.2em]">大匠 · 匠心</router-link>
            <router-link to="/dianji" @click="toggleMenu" class="text-3xl md:text-5xl font-serif text-paper-bg/80 hover:text-palace-red transition-all tracking-[0.2em]">典籍 · 法式</router-link>
            <router-link to="/wenmai" @click="toggleMenu" class="text-3xl md:text-5xl font-serif text-paper-bg/80 hover:text-palace-red transition-all tracking-[0.2em]">文脉 · 传承</router-link>
            
            <button @click="openAiMaster" class="text-3xl md:text-5xl font-serif text-palace-red hover:text-white transition-all tracking-[0.2em] relative outline-none">
                智脑 · 推演
                <span class="absolute top-2 -right-6 md:-right-8 w-3 h-3 bg-palace-red rounded-full animate-pulse"></span>
            </button>
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

const openAiMaster = () => {
    window.dispatchEvent(new Event('open-ai-master'));
    if (isMenuOpen.value) {
        toggleMenu();
    }
}
</script>

<style scoped>
.menu-fade-enter-active, .menu-fade-leave-active { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.menu-fade-enter-from, .menu-fade-leave-to { opacity: 0; transform: scale(1.05); }

/* 导航链接的 hover 效果 */
nav a, nav router-link {
    transition: transform 0.3s ease;
}
nav a:hover {
    transform: scale(1.1);
}
</style>