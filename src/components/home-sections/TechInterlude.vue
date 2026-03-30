<template>
    <section id="tech-interlude" class="w-full h-screen bg-ink-dark relative flex items-center justify-center overflow-hidden border-y border-white/5">
    
    <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 50px 50px;"></div>

    <div class="absolute inset-0 w-full h-full z-10 tech-canvas-container opacity-0 scale-90">
        <div ref="canvasContainer" class="w-full h-full"></div>
    </div>

    <div class="absolute top-24 right-10 text-[10px] font-mono text-gold-accent tracking-widest opacity-40 text-right pointer-events-none z-20">
        <p>RENDER_ENGINE: WEBGL_THREE.JS</p>
        <p>CALIBRATION: CENTERED</p>
        <p>STATUS: ACTIVE</p>
    </div>

    <div class="absolute bottom-20 md:bottom-32 left-8 md:left-24 z-20 text-paper-bg pointer-events-none tech-text opacity-0 -translate-x-10">
        <p class="text-3xl md:text-5xl font-serif tracking-[0.2em] font-light drop-shadow-lg">微观：斗拱微积分</p>
        <div class="w-[3rem] h-[1px] bg-gold-accent my-6"></div>
        <p class="text-xs md:text-sm text-gray-400 tracking-widest font-sans uppercase">榫卯相扣，以柔克刚 / DOUGONG BRACKET SET</p>
    </div>

    <div class="absolute bottom-20 md:bottom-32 right-8 md:right-24 z-40 tech-action-ui opacity-0 translate-x-10 flex flex-col items-end gap-6">
        <div class="text-right border-r border-gold-accent/30 pr-4">
        <p class="text-[10px] text-gray-500 font-serif leading-relaxed uppercase tracking-widest">
            空白处旋转视角 / 指向缩放<br>
            <span class="text-gold-accent/80 font-bold">按住零件可自由拆解</span>
        </p>
        </div>
        <button @click="resetModel" class="pointer-events-auto bg-palace-red text-white px-8 py-3 rounded-full text-xs font-serif hover:brightness-125 transition-all shadow-lg shadow-palace-red/30 active:scale-95 flex items-center gap-2">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        一键重装
        </button>
    </div>
    
    </section>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'

gsap.registerPlugin(ScrollTrigger)

const canvasContainer = ref(null)
let scene, camera, renderer, orbitControls, dragControls
let draggableObjects = []
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const initialStates = new Map()

// 初始相机参数
const initialPos = new THREE.Vector3(0, 2, 6)

onMounted(() => {
    initThreeJS()

    // === 电影感进场动画：左右同步浮现 ===
    const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#tech-interlude",
        start: "top 80%", 
        toggleActions: "play none none reverse" 
    }
    })

    tl.to(".tech-canvas-container", { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" })
    .to(".tech-text", { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }, "-=1")
    .to(".tech-action-ui", { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }, "-=1.2")
})

const initThreeJS = () => {
    const container = canvasContainer.value
    if (!container) return

    scene = new THREE.Scene()
    
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.copy(initialPos)

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
    
    // 精准对齐中心
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.x -= center.x
    model.position.y -= center.y
    model.position.z -= center.z
    orbitControls.target.set(0, 0, 0)

    model.traverse((child) => {
        if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        draggableObjects.push(child)
        initialStates.set(child.uuid, {
            position: child.position.clone(),
            rotation: child.rotation.clone()
        })
        }
    })
    
    initDragControls()
    onWindowResize()
    renderer.render(scene, camera)
    })

    // 射线检测：控制缩放
    const onPointerMove = (event) => {
    if (!canvasContainer.value) return
    const rect = canvasContainer.value.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(draggableObjects, true)
    orbitControls.enableZoom = intersects.length > 0
    }

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
        gsap.to(child.position, { x: s.position.x, y: s.position.y, z: s.position.z, duration: 1.2, ease: "power3.inOut" })
        gsap.to(child.rotation, { x: s.rotation.x, y: s.rotation.y, z: s.rotation.z, duration: 1.2, ease: "power3.inOut" })
    }
    })
    gsap.to(camera.position, { x: initialPos.x, y: initialPos.y, z: initialPos.z, duration: 1.5, ease: "power2.inOut" })
    gsap.to(orbitControls.target, { x: 0, y: 0, z: 0, duration: 1.5 })
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
    ScrollTrigger.getAll().forEach(st => st.kill())
})
</script>