<template>
<section id="tech-interlude" class="w-full h-screen bg-ink-dark relative flex items-center justify-center overflow-hidden border-y border-white/5">
    
    <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 50px 50px;"></div>

    <div class="relative w-full h-full z-10">
    
    <div v-show="currentTab === 0" class="absolute inset-0 w-full h-full flex items-center justify-center">
        <div ref="canvasContainer" class="w-full h-full"></div>
    </div>

    <div v-show="currentTab === 1" class="absolute inset-0 w-full h-full flex items-center justify-center px-10">
        <div class="w-full max-w-[800px] relative">
        <svg viewBox="0 0 800 400" class="w-full filter drop-shadow-[0_0_20px_rgba(192,160,98,0.4)]">
            <path d="M 150 350 Q 400 120 650 350" stroke="#c0a062" stroke-width="4" fill="none" />
            <line x1="80" y1="150" x2="720" y2="150" stroke="#8a979e" stroke-width="1" stroke-dasharray="8 4" />
            <path v-for="d in ['M 180 300 Q 220 180 260 210', 'M 620 300 Q 580 180 540 210']" :key="d" :d="d" stroke="#c0a062" stroke-width="2" fill="none" />
            <g class="force-arrow" stroke="#9b2e2e" stroke-width="2.5">
                <path d="M 400 60 L 400 120 M 390 105 L 400 120 L 410 105" />
            </g>
        </svg>
        </div>
    </div>

    </div>

    <button @click="prevTab" class="absolute left-8 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/5 hover:bg-gold-accent/20 border border-white/10 rounded-full text-white backdrop-blur-md transition-all active:scale-90">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
    </button>
    <button @click="nextTab" class="absolute right-8 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/5 hover:bg-gold-accent/20 border border-white/10 rounded-full text-white backdrop-blur-md transition-all active:scale-90">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </button>

    <div class="absolute bottom-20 md:bottom-32 left-8 md:left-24 z-30 text-paper-bg pointer-events-none">
        <p class="text-xs text-gold-accent mb-2 tracking-[0.3em] font-serif uppercase">TECH_EXHIBIT 0{{ currentTab + 1 }}</p>
        <p class="text-3xl md:text-5xl font-serif tracking-[0.2em] font-light drop-shadow-lg">{{ scenes[currentTab].title }}</p>
        <div class="w-[3rem] h-[1px] bg-gold-accent my-6"></div>
        <p class="text-xs md:text-sm text-gray-400 tracking-widest font-sans uppercase whitespace-pre-line">{{ scenes[currentTab].desc }}</p>
    </div>

    <div class="absolute bottom-20 md:bottom-32 right-8 md:right-24 z-50 flex flex-col items-end gap-6">
    <div v-if="currentTab === 0" class="text-right border-r border-gold-accent/30 pr-4 hidden lg:block">
        <p class="text-[10px] text-gray-500 font-serif leading-relaxed uppercase tracking-widest">
        空白处旋转视角 / 指向缩放<br>
        <span class="text-gold-accent/80 font-bold">按住零件可自由拆解</span>
        </p>
    </div>
    <button v-if="currentTab === 0" @click="resetModel" class="pointer-events-auto bg-palace-red text-white px-6 py-2 rounded-full text-[10px] font-serif hover:brightness-125 transition-all shadow-lg active:scale-95 flex items-center gap-2">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        一键重装
    </button>
    </div>
    
</section>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'

gsap.registerPlugin(ScrollTrigger)

// --- 状态控制 ---
const currentTab = ref(0)
const scenes = [
// 合并了斗拱与榫卯的文案
{ title: '微观：斗拱与榫卯', desc: '严丝合缝 · 不着一钉\n作为中华营造技艺的核心，通过榫卯相扣实现以柔克刚' },
{ title: '宏观：敞肩力学', desc: '赵州石拱 · 千载利水\n敞肩泄洪设计，展现了极致的几何与结构力学之美' }
]

const canvasContainer = ref(null)
let scene, camera, renderer, orbitControls, dragControls
let draggableObjects = []
const initialStates = new Map()
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

onMounted(async () => {
await nextTick()
initThreeJS()

// 1. 满屏无感淡入动画 
gsap.from("#tech-interlude", {
    opacity: 0,
    duration: 1.5,
    scrollTrigger: {
    trigger: "#tech-interlude",
    start: "top 80%",
    toggleActions: "play none none reverse"
    }
})

// 2. ★ 磁吸完美对齐逻辑 (Magnetic Snap) ★
ScrollTrigger.create({
    trigger: "#tech-interlude",
    start: "top 50%",   // 当黑色区域头部到达屏幕中间时触发
    end: "bottom 50%",  // 当黑色区域底部到达屏幕中间时结束
    snap: {
    snapTo: 0.5,      // 0.5 代表吸附到这个触发区域的正中心（即完美对齐全屏）
    duration: { min: 0.3, max: 0.6 }, // 吸附的动画时间，很丝滑
    delay: 0.1,       // 判定用户停下滚轮 0.1 秒后，自动触发吸附对齐
    ease: "power2.out"
    }
})
})

// 切换逻辑改为 2 个场景
const nextTab = () => { currentTab.value = (currentTab.value + 1) % 2 }
const prevTab = () => { currentTab.value = (currentTab.value - 1 + 2) % 2 }

const onPointerMove = (event) => {
    if (!canvasContainer.value) return
    const rect = canvasContainer.value.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(draggableObjects, true)
    orbitControls.enableZoom = intersects.length > 0
}


const initThreeJS = () => {
const container = canvasContainer.value
if (!container) return

scene = new THREE.Scene()
camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
camera.position.set(0, 2, 6)

renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setSize(container.clientWidth, container.clientHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap
container.appendChild(renderer.domElement)

scene.add(new THREE.AmbientLight(0xffffff, 1.2))
const dirLight = new THREE.DirectionalLight(0xc0a062, 2)
dirLight.position.set(5, 10, 5)
dirLight.castShadow = true
scene.add(dirLight)

orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true
orbitControls.enableZoom = false 

const loader = new GLTFLoader()
loader.load('/dougong.glb', (gltf) => {
    const model = gltf.scene
    scene.add(model)
    
    // 强制对齐中心点
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.x -= center.x
    model.position.y -= center.y
    model.position.z -= center.z
    orbitControls.target.set(0, 0, 0)

    model.traverse((child) => {
    if (child.isMesh) {
        draggableObjects.push(child)
        initialStates.set(child.uuid, { position: child.position.clone(), rotation: child.rotation.clone() })
    }
    })
    
    initDragControls()
    onWindowResize()
    renderer.render(scene, camera)

    // 👇 👇 👇 核心添加：模型渲染完毕后，告诉全局 GSAP 重新计算坐标
    setTimeout(() => {
        ScrollTrigger.refresh()
        console.log("3D模型加载完毕，GSAP坐标已重新校准！")
    }, 200)
})


window.addEventListener('pointermove', onPointerMove)

const animate = () => {
    requestAnimationFrame(animate)
    orbitControls.update()
    renderer.render(scene, camera)
}
animate()
window.addEventListener('resize', onWindowResize)
}

const initDragControls = () => {
dragControls = new DragControls(draggableObjects, camera, renderer.domElement)
dragControls.addEventListener('dragstart', () => { orbitControls.enabled = false })
dragControls.addEventListener('dragend', () => { orbitControls.enabled = true })
}

const resetModel = () => {
draggableObjects.forEach(child => {
    const s = initialStates.get(child.uuid)
    if (s) {
    gsap.to(child.position, { x: s.position.x, y: s.position.y, z: s.position.z, duration: 1 })
    gsap.to(child.rotation, { x: s.rotation.x, y: s.rotation.y, z: s.rotation.z, duration: 1 })
    }
})
}

const onWindowResize = () => {
if(!canvasContainer.value) return
camera.aspect = canvasContainer.value.clientWidth / canvasContainer.value.clientHeight
camera.updateProjectionMatrix()
renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight)
}

onBeforeUnmount(() => {
window.removeEventListener('resize', onWindowResize)
window.removeEventListener('pointermove', onPointerMove)
if(renderer) renderer.dispose()
})
</script>