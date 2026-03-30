<template>
  <CustomCursor />
  
  <NavBar />
  
  <main>
    <router-view />
  </main>
  
  <BackToTop />
  
  <AiMaster />
</template>

<script setup>
// 注意：这里不需要引入 HomeView 和 LanzhuView 了，router 会自动处理
import CustomCursor from './components/CustomCursor.vue'
import NavBar from './components/NavBar.vue'
import AiMaster from './components/AiMaster.vue'
import BackToTop from './components/BackToTop.vue'
</script>