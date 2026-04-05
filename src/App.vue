<template>
  <CustomCursor />
  
  <Transition name="construction-fade">
    <ConstructionLoading v-if="isLoading" />
  </Transition>
  
  <NavBar v-if="!$route.meta.hideGlobalUI" />
  
  <main :class="{ 'is-dashboard': $route.meta.hideGlobalUI }">
    <router-view v-show="!isLoading" />
  </main>
  
  <BackToTop v-if="!$route.meta.hideGlobalUI" />
  <AiMaster v-if="!$route.meta.hideGlobalUI" />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CustomCursor from './components/CustomCursor.vue'
import NavBar from './components/NavBar.vue'
import AiMaster from './components/AiMaster.vue'
import BackToTop from './components/BackToTop.vue'
import ConstructionLoading from './components/ConstructionLoading.vue' // 引入动画组件

const route = useRoute()
const router = useRouter()
const isLoading = ref(false)

// 3. 路由守卫逻辑：切换时开启动画
router.beforeEach((to, from, next) => {
  isLoading.value = true
  next()
})

router.afterEach((to) => {
  // 根据路由 meta 设置的 loadingTime 动态决定动画时长，默认为 1200ms
  const delay = to.meta.loadingTime || 1200
  setTimeout(() => {
    isLoading.value = false
  }, delay)
})
</script>

<style>
/* 4. 加载动画的过渡效果 */
.construction-fade-enter-active, 
.construction-fade-leave-active {
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.construction-fade-enter-from, 
.construction-fade-leave-to {
  opacity: 0;
}

/* 如果是可视化页面，去掉 main 的默认间距/边距 */
.is-dashboard {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* 基础重置，确保加载背景铺满 */
body, html {
  margin: 0;
  padding: 0;
  background-color: #f4f1ea; /* 统一宣纸色底色 */
}
</style>