<template>
    <header class="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 pointer-events-none mix-blend-difference text-paper-bg">
    <div class="text-lg font-serif tracking-[0.4em] font-bold pointer-events-auto hover-trigger cursor-pointer flex items-center">
        <span class="w-2 h-2 bg-palace-red mr-3 rounded-full"></span>筑理
    </div>
    
    <div class="hidden md:flex space-x-12 pointer-events-auto text-xs tracking-[0.2em] font-serif">
        <a href="#lanzhu" class="hover:text-palace-red transition-colors relative group">
        览筑 <span class="text-[9px] uppercase opacity-50 block text-center mt-1">Explore</span>
        <div class="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-palace-red transition-all group-hover:w-full group-hover:left-0"></div>
        </a>
        <a href="#dajiang" class="hover:text-palace-red transition-colors relative group">
        大匠 <span class="text-[9px] uppercase opacity-50 block text-center mt-1">Masters</span>
        <div class="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-palace-red transition-all group-hover:w-full group-hover:left-0"></div>
        </a>
        <a href="#dianji" class="hover:text-palace-red transition-colors relative group">
        典籍 <span class="text-[9px] uppercase opacity-50 block text-center mt-1">Texts</span>
        <div class="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-palace-red transition-all group-hover:w-full group-hover:left-0"></div>
        </a>
        <a href="#wenmai" class="hover:text-palace-red transition-colors relative group">
        文脉 <span class="text-[9px] uppercase opacity-50 block text-center mt-1">Heritage</span>
        <div class="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-palace-red transition-all group-hover:w-full group-hover:left-0"></div>
        </a>
    </div>

    <button @click="toggleMenu" class="text-xs tracking-widest uppercase pointer-events-auto hover-trigger relative group">
        <span v-if="!isMenuOpen">展开卷轴 / MENU</span>
        <span v-else>合上卷轴 / CLOSE</span>
    </button>
    </header>

    <Transition name="menu-fade">
    <div v-if="isMenuOpen" class="fixed inset-0 z-40 bg-ink-dark flex items-center justify-center">
        <nav class="relative z-10 flex flex-col items-center space-y-10 text-center">
        <a href="#" @click.prevent="toggleMenu" class="text-4xl md:text-6xl font-serif text-paper-bg hover:text-palace-red transition-all tracking-[0.2em] hover-trigger">览筑 · 规制</a>
        <a href="#" @click.prevent="toggleMenu" class="text-4xl md:text-6xl font-serif text-paper-bg hover:text-palace-red transition-all tracking-[0.2em] hover-trigger">大匠 · 匠心</a>
        <a href="#" @click.prevent="toggleMenu" class="text-4xl md:text-6xl font-serif text-paper-bg hover:text-palace-red transition-all tracking-[0.2em] hover-trigger">典籍 · 法式</a>
        <a href="#" @click.prevent="toggleMenu" class="text-4xl md:text-6xl font-serif text-paper-bg hover:text-palace-red transition-all tracking-[0.2em] hover-trigger">文脉 · 传承</a>
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
</script>

<style scoped>
.menu-fade-enter-active, .menu-fade-leave-active { transition: opacity 0.5s ease; }
.menu-fade-enter-from, .menu-fade-leave-to { opacity: 0; }
</style>