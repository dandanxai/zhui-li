<template>
  <CustomCursor />
  
  <NavBar v-if="!$route.meta.hideGlobalUI" />
  
  <main :class="{ 'is-dashboard': $route.meta.hideGlobalUI }">
    <router-view />
  </main>
  
  <BackToTop v-if="!$route.meta.hideGlobalUI" />
  <AiMaster v-if="!$route.meta.hideGlobalUI" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import CustomCursor from './components/CustomCursor.vue'
import NavBar from './components/NavBar.vue'
import AiMaster from './components/AiMaster.vue'
import BackToTop from './components/BackToTop.vue'

const route = useRoute()
</script>

<style>
/* 如果是可视化页面，去掉 main 的默认间距/边距 */
.is-dashboard {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* 可视化面板通常禁止滚动，内部自滚动 */
}
</style>