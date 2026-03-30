<template>
<transition name="fade">
    <button 
    v-show="isVisible" 
    @click="scrollToTop" 
    class="fixed bottom-12 right-6 md:right-12 z-[100] p-3 md:p-4 bg-white/5 hover:bg-gold-accent/20 backdrop-blur-xl border border-white/10 rounded-full text-gold-accent transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group"
    aria-label="回到顶部"
    >
    <svg class="w-5 h-5 md:w-6 md:h-6 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
    </svg>
    </button>
</transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

// 监听滚动事件，控制按钮显隐
const checkScroll = () => {
// 滚动超过 500px 时显示按钮
isVisible.value = window.scrollY > 500
}

// 平滑滚动回顶部
const scrollToTop = () => {
window.scrollTo({
    top: 0,
    behavior: 'smooth'
})
}

onMounted(() => {
window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
window.addEventListener('scroll', checkScroll)
})
</script>

<style scoped>
/* Vue 默认的 fade 动画过渡类 */
.fade-enter-active,
.fade-leave-active {
transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
opacity: 0;
transform: translateY(20px);
}
</style>