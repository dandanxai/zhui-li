<template>
  <CustomCursor />
  <FloatingAsk />
  
  <Transition name="construction-fade">
    <ConstructionLoading v-if="isLoading" />
  </Transition>
  
  <NavBar v-if="!$route.meta.hideGlobalUI" />
  
  <!-- <main :class="{ 'is-dashboard': $route.meta.hideGlobalUI }">
    <router-view v-if="!isLoading" />
  </main> -->

  <!-- <main :class="{ 'is-dashboard': $route.meta.hideGlobalUI }">
    <router-view />
  </main> -->

  <main :class="[
    $route.meta.hideGlobalUI ? 'is-dashboard' : '',
    isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'
  ]">
    <router-view />
  </main>
  
  <BackToTop v-if="!$route.meta.hideGlobalUI" />
  <AiMaster v-if="!$route.meta.hideGlobalUI" />
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from './components/CustomCursor.vue'
import NavBar from './components/NavBar.vue'
import AiMaster from './components/AiMaster.vue'
import BackToTop from './components/BackToTop.vue'
import ConstructionLoading from './components/ConstructionLoading.vue'
import FloatingAsk from './components/FloatingAsk.vue';

const router = useRouter()
const isLoading = ref(false)

// 核心加载控制变量
let startTime = 0           // 记录动画开始的时间戳
let activeRequests = 0      // 记录当前正在进行的网络请求数量
let finishTimer = null      // 定时器引用，方便随时清除
const MIN_LOADING_TIME = 1500 // 保底加载时间 1.5 秒

// 1. 开启加载动画 (现在只有 Router 有资格调用它)
const startLoading = () => {
  if (!isLoading.value) {
    isLoading.value = true
    startTime = Date.now() // 记录起跑时间
  }
}

// 2. 尝试停止加载动画（核心逻辑：网络判断 + 1.5秒保底）
const tryStopLoading = () => {
  // 如果还有网络请求没回来，直接 return，继续转圈！
  if (activeRequests > 0) return 

  // 计算已经转了多久
  const elapsed = Date.now() - startTime
  const remaining = Math.max(0, MIN_LOADING_TIME - elapsed)

  clearTimeout(finishTimer)
  finishTimer = setTimeout(() => {
    // 定时器到了之后，再检查一次有没有新的请求混进来
    if (activeRequests === 0) { 
      isLoading.value = false
    }
  }, remaining)
}

// ==========================================
// 路由拦截联动
// ==========================================
router.beforeEach((to, from, next) => {
  // 只有路由判定是第一次进这个页面，才允许唤醒动画
  if (to.meta.needLoading) { startLoading() }
  next()
})

router.afterEach((to) => {
  if (to.meta.needLoading) {
    tryStopLoading() // 路由跑完了，去算算还要不要继续转
  } else {
    // 强制放行不需要 loading 的页面 (二次访问直接秒进)
    isLoading.value = false
    activeRequests = 0
  }
})

// ==========================================
// 🚨 核心修复：监听来自 request.js 的网络状态事件
// ==========================================
const handleNetworkStart = () => {
  activeRequests++
  // 删除了这里的 startLoading() ！！！
  // 解释：普通的网络请求只负责告诉系统“我正在忙(activeRequests++)”，
  // 但它没有资格去“擅自唤醒”全屏过场动画。
}

const handleNetworkEnd = () => {
  activeRequests--
  if (activeRequests < 0) activeRequests = 0 // 兜底防负数
  
  // 只有在全屏动画确实开启着的情况下，才需要去尝试停止它
  if (isLoading.value) {
    tryStopLoading() 
  }
}

onMounted(() => {
  window.addEventListener('network-start', handleNetworkStart)
  window.addEventListener('network-end', handleNetworkEnd)
})

onUnmounted(() => {
  window.removeEventListener('network-start', handleNetworkStart)
  window.removeEventListener('network-end', handleNetworkEnd)
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
/* 🏮 出现时瞬间罩住（无过渡），消失时缓慢淡出（0.8s） */
.construction-fade-enter-active { transition: none; } 
.construction-fade-leave-active { transition: opacity 0.8s ease-in-out; }
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