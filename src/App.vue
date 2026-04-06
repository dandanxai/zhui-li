<template>
  <CustomCursor />
  <FloatingAsk />
  
  <Transition name="construction-fade">
    <ConstructionLoading v-if="isLoading" />
  </Transition>
  
  <NavBar v-if="!$route.meta.hideGlobalUI" />
  
  <main :class="{ 'is-dashboard': $route.meta.hideGlobalUI }">
    <router-view v-if="!isLoading" />
  </main>
  
  <BackToTop v-if="!$route.meta.hideGlobalUI" />
  <AiMaster v-if="!$route.meta.hideGlobalUI" />
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from './components/CustomCursor.vue'
import NavBar from './components/NavBar.vue'
import AiMaster from './components/AiMaster.vue'
import BackToTop from './components/BackToTop.vue'
import ConstructionLoading from './components/ConstructionLoading.vue'
import FloatingAsk from './components/FloatingAsk.vue'; // 引入组件

const router = useRouter()
const isLoading = ref(false)

// 路由逻辑保持不变...
router.beforeEach((to, from, next) => {
  if (to.meta.needLoading) { isLoading.value = true }
  next()
})

router.afterEach((to) => {
  if (to.meta.needLoading) {
    setTimeout(() => { isLoading.value = false }, 3200)
  } else {
    isLoading.value = false
  }
})

watch(isLoading, async (newVal) => {
  if (!newVal) {
    await nextTick()
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 300)
  }
})
</script>

<style>
/* 样式部分保持不变 */
.construction-fade-enter-active, .construction-fade-leave-active { transition: opacity 0.8s; }
.construction-fade-enter-from, .construction-fade-leave-to { opacity: 0; }
body, html { margin: 0; padding: 0; background-color: #fcfaf5; overflow-x: hidden; }

/* =========================================================================
    全局滚动条重塑 - 筑理专属风格
   ========================================================================= */

/* 1. 针对 Chrome, Edge, Safari (WebKit 内核) */
::-webkit-scrollbar {
  width: 6px;  /* 纵向滚动条宽度：极细设计 */
  height: 6px; /* 横向滚动条高度 */
}

/* 滚动条轨道：保持透明或极浅色，不干扰视觉 */
::-webkit-scrollbar-track {
  background: transparent; 
}

/* 滚动条滑块（那个会动的小方块） */
::-webkit-scrollbar-thumb {
  background: rgba(155, 46, 46, 0.15); /* 初始状态：半透明的宫廷红 */
  border-radius: 10px;               /* 圆角化，符合现代审美 */
  transition: all 0.3s ease;         /* 平滑过渡 */
}

/* 鼠标悬停在滚动条上时：加深颜色，增强反馈 */
::-webkit-scrollbar-thumb:hover {
  background: rgba(155, 46, 46, 0.45); /* 悬停：宫廷红加深 */
}

/* 激活状态（点击时） */
::-webkit-scrollbar-thumb:active {
  background: rgba(155, 46, 46, 0.7);
}

/* 2. 针对 Firefox (标准语法) */
* {
  scrollbar-width: thin;           /* 细滚动条 */
  scrollbar-color: rgba(155, 46, 46, 0.2) transparent; /* 滑块颜色 轨道颜色 */
}

/* 3. 特殊区域优化：针对 AiMaster 或弹出框内部的滚动条 */
/* 让它们看起来更轻量 */
.chat-container::-webkit-scrollbar {
  width: 3px; 
}
</style>