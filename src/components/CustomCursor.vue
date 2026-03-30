<template>
    <div id="custom-cursor" ref="cursor"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const cursor = ref(null)

onMounted(() => {
    window.addEventListener('mousemove', (e) => {
    gsap.to(cursor.value, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out"
    })
    })

    // 监听全局 hover
    document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.hover-trigger, a, button')) {
        cursor.value.classList.add('cursor-hover')
    }
    })
    document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.hover-trigger, a, button')) {
        cursor.value.classList.remove('cursor-hover')
    }
    })
})
</script>

<style scoped>
#custom-cursor {
    position: fixed;
    top: 0; left: 0;
    width: 12px; height: 12px;
    background-color: #9b2e2e;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    mix-blend-mode: difference;
}
#custom-cursor.cursor-hover {
    width: 70px; height: 70px;
    background-color: #f2efe8;
}
</style>