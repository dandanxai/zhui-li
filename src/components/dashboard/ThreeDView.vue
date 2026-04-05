<template>
<div class="absolute inset-0 w-full h-full bg-[#fcfaf5] overflow-hidden group">
    <div class="absolute top-8 left-8 z-20 pointer-events-none">
    <div class="flex items-center gap-3">
        <div class="w-2 h-8 bg-palace-red shadow-[0_0_10px_rgba(155,46,46,0.4)]"></div>
        <div class="flex flex-col">
        <h2 class="text-2xl font-black font-serif tracking-[0.3em] text-[#111]">营造解构 · 斗拱</h2>
        <span class="text-[9px] font-mono text-palace-red/60 uppercase tracking-[0.5em] mt-1 italic">Structural_Deconstruction // V1.0</span>
        </div>
    </div>
    </div>

    <div class="absolute top-8 right-32 z-20 font-mono text-[10px] text-gray-400 bg-white/50 px-3 py-1 border border-palace-red/10 flex items-center gap-2 backdrop-blur-sm">
    <span class="w-1.5 h-1.5 bg-palace-red rounded-full animate-pulse"></span>
    ZOOM_LEVEL: {{ zoomPercent }}%
    </div>

    <div ref="canvasContainer" class="w-full h-full z-10 cursor-grab active:cursor-grabbing"></div>

    <transition name="bubble">
    <div v-if="info.visible" 
        class="absolute z-50 pointer-events-none transform -translate-x-1/2 -translate-y-[110%]"
        :style="{ left: info.x + 'px', top: info.y + 'px' }">
        <div class="bg-white border-2 border-black p-4 w-56 shadow-[10px_10px_0px_rgba(155,46,46,0.1)] relative">
        <div class="text-sm font-serif font-black border-b-2 border-palace-red/20 pb-2 mb-2 text-[#111] uppercase tracking-wider">
            {{ info.title }}
        </div>
        <div class="text-[11px] text-gray-600 leading-relaxed font-serif italic">{{ info.desc }}</div>
        <div class="absolute bottom-[-9px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-black rotate-45"></div>
        </div>
    </div>
    </transition>

    <div class="absolute bottom-8 right-8 z-20 flex gap-4">
    <button @click="resetModel" class="bg-black text-white px-6 py-2 text-[10px] font-black tracking-widest hover:bg-palace-red transition-all shadow-xl uppercase border border-white/20">
        Reset_Assembly // 一键复位
    </button>
    </div>
</div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'

const canvasContainer = ref(null)
const info = ref({ visible: false, x: 0, y: 0, title: '', desc: '' })
const zoomPercent = ref(100)

let scene, camera, renderer, orbitControls, dragControls, draggableObjects = []
let clickedObject = null, pointerDownTime = 0
const initialPositions = new Map()

const dict = {
'ludou': { title: '栌斗 (Lú Dǒu)', desc: '承载整组斗拱重量的底座，是力量传递的核心枢纽。' },
'huagong': { title: '华拱 (Huá Gǒng)', desc: '向外伸展的悬挑结构，承托屋檐出挑深度。' },
'default': { title: '营造构件', desc: '中国大木作通过精密榫卯实现结构弹性，千年不倒。' }
}

const initThree = () => {
scene = new THREE.Scene()
camera = new THREE.PerspectiveCamera(45, canvasContainer.value.clientWidth / canvasContainer.value.clientHeight, 0.1, 1000)
camera.position.set(0, 3, 10)

renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight)
canvasContainer.value.appendChild(renderer.domElement)

// 灯光增强
scene.add(new THREE.AmbientLight(0xffffff, 1.5))
const sun = new THREE.DirectionalLight(0xffeeda, 2)
sun.position.set(10, 20, 10)
scene.add(sun)

// 1. 开启缩放控制
orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true
orbitControls.enableZoom = true  // 开启缩放
orbitControls.minDistance = 2   // 最小距离
orbitControls.maxDistance = 20  // 最大距离

// 监听缩放更新 UI
orbitControls.addEventListener('change', () => {
    const dist = camera.position.distanceTo(orbitControls.target)
    zoomPercent.value = Math.round((10 / dist) * 100)
})

// 加载模型
new GLTFLoader().load('/dougong.glb', (gltf) => {
    const model = gltf.scene
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.sub(center)
    scene.add(model)

    model.traverse(child => {
    if (child.isMesh) {
        child.material = child.material.clone()
        initialPositions.set(child.uuid, child.position.clone())
        draggableObjects.push(child)
    }
    })
    
    // 拖拽逻辑
    dragControls = new DragControls(draggableObjects, camera, renderer.domElement)
    dragControls.addEventListener('dragstart', (e) => {
    orbitControls.enabled = false
    info.value.visible = false
    e.object.material.emissive.set(0x9b2e2e) // 拖拽时发光
    })
    dragControls.addEventListener('dragend', (e) => {
    orbitControls.enabled = true
    e.object.material.emissive.set(0x000000)
    })
})

// 点击事件
renderer.domElement.addEventListener('pointerdown', () => pointerDownTime = Date.now())
renderer.domElement.addEventListener('pointerup', (e) => {
    if (Date.now() - pointerDownTime < 250) handleInfo(e)
})

const animate = () => {
    requestAnimationFrame(animate)
    orbitControls.update()
    if (info.value.visible && clickedObject) updateBubblePos()
    renderer.render(scene, camera)
}
animate()
}

const handleInfo = (e) => {
const rect = canvasContainer.value.getBoundingClientRect()
const mouse = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1)
const ray = new THREE.Raycaster()
ray.setFromCamera(mouse, camera)
const intersects = ray.intersectObjects(draggableObjects)

if (intersects.length > 0) {
    clickedObject = intersects[0].object
    const name = clickedObject.name.toLowerCase()
    const data = dict[Object.keys(dict).find(k => name.includes(k))] || dict.default
    info.value = { visible: true, title: data.title, desc: data.desc, x: 0, y: 0 }
} else { 
    info.value.visible = false 
}
}

const updateBubblePos = () => {
const vec = new THREE.Vector3()
clickedObject.getWorldPosition(vec)
vec.project(camera)
const rect = canvasContainer.value.getBoundingClientRect()
info.value.x = (vec.x * 0.5 + 0.5) * rect.width
info.value.y = -(vec.y * 0.5 - 0.5) * rect.height
}

const resetModel = () => {
draggableObjects.forEach(obj => {
    const pos = initialPositions.get(obj.uuid)
    gsap.to(obj.position, { x: pos.x, y: pos.y, z: pos.z, duration: 1, ease: 'power2.out' })
})
}

onMounted(() => initThree())
onBeforeUnmount(() => renderer?.dispose())
</script>

<style scoped>
.bubble-enter-active { transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1); }
.bubble-enter-from { opacity: 0; transform: translate(-50%, -80%) scale(0.8); }

/* 禁用原生 Canvas 的默认行为 */
canvas { outline: none; -webkit-tap-highlight-color: transparent; }
</style>