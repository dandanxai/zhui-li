<template>
    <div class="absolute inset-0 w-full h-full bg-[#fcfaf5] overflow-hidden">
    
    <div ref="canvasContainer" class="w-full h-full z-10 cursor-move"></div>

    <div class="absolute top-6 left-6 z-20 space-y-2 pointer-events-none">
        <div class="text-[10px] text-gray-500 font-mono tracking-widest border-l-2 border-palace-red pl-3">
        <p class="text-[#111] font-bold mb-1 font-serif text-lg tracking-widest">大木解构</p>
        <p class="text-palace-red">MODEL: DOUGONG.GLB</p>
        <p>STATUS: INTERACTIVE</p>
        <p>ACTION: DRAG / CLICK_FOR_INFO</p>
        </div>
    </div>

    <div class="absolute bottom-6 left-6 z-20 text-[10px] text-gray-500 font-serif tracking-widest pointer-events-none bg-white/60 px-3 py-1 border border-palace-red/10 backdrop-blur-sm">
        <span class="text-palace-red mr-2">※</span>旋转视角 / <b>拖拽拆解</b> / <b>点击构件查看解析</b>
    </div>

    <button @click="resetModel" class="absolute bottom-6 right-6 z-20 pointer-events-auto bg-[#fcfaf5] border border-palace-red/30 text-[#111] hover:bg-palace-red hover:text-white px-6 py-2 text-[10px] font-serif tracking-[0.3em] transition-all duration-300 shadow-sm active:scale-95 flex items-center gap-2 group">
        <svg class="w-4 h-4 text-palace-red group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        一键重装
    </button>

    <transition name="bubble-fade">
        <div v-if="activePartInfo.visible" 
            class="absolute z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full pb-4 transition-all duration-75"
            :style="{ left: activePartInfo.x + 'px', top: activePartInfo.y + 'px' }">
        
        <div class="bg-[#fcfaf5]/95 backdrop-blur-md border border-palace-red/30 shadow-xl p-4 w-56 relative flex flex-col gap-2">
            <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-palace-red"></div>
            <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-palace-red"></div>
            
            <div class="flex justify-between items-start border-b border-palace-red/10 pb-2">
            <h3 class="text-sm font-serif font-bold text-[#111] tracking-widest">{{ activePartInfo.name }}</h3>
            <span class="text-[8px] font-mono text-palace-red border border-palace-red/20 px-1 bg-palace-red/5">SELECTED</span>
            </div>
            
            <p class="text-[10px] text-gray-600 leading-relaxed font-serif text-justify">
            {{ activePartInfo.desc }}
            </p>

            <div class="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#fcfaf5] border-b border-r border-palace-red/30 transform rotate-45"></div>
        </div>
        </div>
    </transition>

    </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue'
import gsap from 'gsap'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'

const canvasContainer = ref(null)

let scene, camera, renderer, orbitControls, dragControls
let draggableObjects = []
const initialStates = new Map()

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
let animationFrameId = null
let resizeObserver = null

// --- 交互状态 ---
const clickedMesh = ref(null) 
const activePartInfo = ref({ visible: false, x: 0, y: 0, name: '', desc: '' })

// 智能点击检测辅助变量
let pointerDownTime = 0
let pointerDownPos = { x: 0, y: 0 }

// 构件字典
const partDictionary = {
    'ludou': { name: '栌斗 (Lú Dǒu)', desc: '斗拱最底层的核心承重块，形如方形大斗，将上部结构的重量均匀传递至柱头。' },
    'huagong': { name: '华拱 (Huá Gǒng)', desc: '垂直于建筑面阔方向出跳的拱，逐层向外伸展，承托挑出的屋檐。' },
    'ang': { name: '昂 (Áng)', desc: '利用杠杆原理设计的斜向构件，前端挑起屋檐，后端压在梁下，极具力学智慧。' },
    'jiaohudou': { name: '交互斗 (Jiāo Hù Dǒu)', desc: '位于拱端的小斗，用于承接上一层的十字交叉构件，起到连接与缓冲作用。' },
    'default': { name: '木构件 (Component)', desc: '中国古建筑不使用铁钉，全靠木构件之间的榫卯咬合，以柔克刚，抵御地震。' }
}

onMounted(async () => {
    await nextTick()
    initThreeJS()
    resizeObserver = new ResizeObserver(() => onWindowResize())
    if (canvasContainer.value) resizeObserver.observe(canvasContainer.value)
})

onBeforeUnmount(() => {
    if (renderer && renderer.domElement) {
    renderer.domElement.removeEventListener('pointerdown', onPointerDown)
    renderer.domElement.removeEventListener('pointerup', onPointerUp)
    renderer.domElement.removeEventListener('pointermove', onPointerMove)
    }
    if (resizeObserver && canvasContainer.value) resizeObserver.unobserve(canvasContainer.value)
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
    if (renderer) {
    renderer.dispose()
    renderer.forceContextLoss()
    }
})

const initThreeJS = () => {
    const container = canvasContainer.value
    if (!container) return

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.set(0, 2, 8)

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // 修复警告：使用官方最新推荐的阴影映射算法
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap 
    
    container.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(ambientLight)
    const dirLight = new THREE.DirectionalLight(0xffeeda, 2)
    dirLight.position.set(5, 10, 5)
    dirLight.castShadow = true
    scene.add(dirLight)

    orbitControls = new OrbitControls(camera, renderer.domElement)
    orbitControls.enableDamping = true
    orbitControls.dampingFactor = 0.05
    orbitControls.enableZoom = false

    const loader = new GLTFLoader()
    loader.load('/dougong.glb', (gltf) => {
    const model = gltf.scene
    scene.add(model)
    
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    model.position.sub(center)
    orbitControls.target.set(0, 0, 0)

    model.traverse((child) => {
        if (child.isMesh) {
        if (child.material) {
            child.material = child.material.clone()
            child.material.roughness = 0.8
            child.material.metalness = 0.1
        }
        child.castShadow = true
        child.receiveShadow = true
        draggableObjects.push(child)
        initialStates.set(child.uuid, { 
            position: child.position.clone(), 
            rotation: child.rotation.clone(),
            originalEmissive: child.material.emissive ? child.material.emissive.clone() : new THREE.Color(0x000000)
        })
        }
    })
    
    initDragControls()
    })

    // ★ 绑定自定义的智能点击事件 ★
    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    renderer.domElement.addEventListener('pointerup', onPointerUp)
    renderer.domElement.addEventListener('pointermove', onPointerMove)

    const animate = () => {
    animationFrameId = requestAnimationFrame(animate)
    if (orbitControls) orbitControls.update()
    
    if (clickedMesh.value && activePartInfo.value.visible) {
        updateBubblePosition()
    }

    renderer.render(scene, camera)
    }
    animate()
}

const initDragControls = () => {
    dragControls = new DragControls(draggableObjects, camera, renderer.domElement)
    dragControls.addEventListener('dragstart', () => { 
    if (orbitControls) orbitControls.enabled = false 
    activePartInfo.value.visible = false 
    resetHighlight()
    })
    dragControls.addEventListener('dragend', () => { 
    if (orbitControls) orbitControls.enabled = true 
    })
}

// ==========================================
// ★ 核心修复：智能点击检测逻辑 ★
// ==========================================
const onPointerDown = (event) => {
    pointerDownTime = performance.now()
    pointerDownPos = { x: event.clientX, y: event.clientY }
}

const onPointerUp = (event) => {
    const timeDiff = performance.now() - pointerDownTime
    const dist = Math.sqrt(
    Math.pow(event.clientX - pointerDownPos.x, 2) + 
    Math.pow(event.clientY - pointerDownPos.y, 2)
    )

    // 如果按下的时间小于 300ms 且鼠标几乎没有移动（小于 5 像素），则判定为“点击”而非“拖拽”
    if (timeDiff < 300 && dist < 5) {
    handleSmartClick(event)
    }
}

const handleSmartClick = (event) => {
    if (!canvasContainer.value) return
    
    const rect = canvasContainer.value.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(draggableObjects, true)

    if (intersects.length > 0) {
    const object = intersects[0].object
    clickedMesh.value = object
    
    resetHighlight()
    object.material.emissive.setHex(0x330000) 

    const meshName = object.name.toLowerCase().replace(/\s+/g, '')
    const matchedKey = Object.keys(partDictionary).find(k => meshName.includes(k)) || 'default'
    const info = partDictionary[matchedKey]

    activePartInfo.value.name = info.name
    activePartInfo.value.desc = info.desc
    activePartInfo.value.visible = true
    updateBubblePosition()
    } else {
    activePartInfo.value.visible = false
    clickedMesh.value = null
    resetHighlight()
    }
}

const updateBubblePosition = () => {
    if (!clickedMesh.value || !canvasContainer.value) return
    const vector = new THREE.Vector3()
    vector.setFromMatrixPosition(clickedMesh.value.matrixWorld)
    vector.project(camera)
    
    const rect = canvasContainer.value.getBoundingClientRect()
    const x = (vector.x * 0.5 + 0.5) * rect.width
    const y = -(vector.y * 0.5 - 0.5) * rect.height
    
    activePartInfo.value.x = x
    activePartInfo.value.y = y
}

const resetHighlight = () => {
    draggableObjects.forEach(child => {
    const state = initialStates.get(child.uuid)
    if (state && child.material) {
        child.material.emissive.copy(state.originalEmissive)
    }
    })
}

const onPointerMove = (event) => {
    if (!canvasContainer.value) return
    const rect = canvasContainer.value.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(draggableObjects, true)
    if (orbitControls) orbitControls.enableZoom = intersects.length > 0
}

const resetModel = () => {
    if (draggableObjects.length === 0) return
    activePartInfo.value.visible = false
    resetHighlight()
    
    draggableObjects.forEach(child => {
    const state = initialStates.get(child.uuid)
    if (state) {
        gsap.to(child.position, { x: state.position.x, y: state.position.y, z: state.position.z, duration: 1, ease: "power2.out" })
        gsap.to(child.rotation, { x: state.rotation.x, y: state.rotation.y, z: state.rotation.z, duration: 1, ease: "power2.out" })
    }
    })
    
    gsap.to(camera.position, { x: 0, y: 2, z: 8, duration: 1.5, ease: "power2.inOut" })
    if (orbitControls) gsap.to(orbitControls.target, { x: 0, y: 0, z: 0, duration: 1.5, ease: "power2.inOut" })
}

const onWindowResize = () => {
    if(!canvasContainer.value || !camera || !renderer) return
    const width = canvasContainer.value.clientWidth
    const height = canvasContainer.value.clientHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
}
</script>

<style scoped>
.bubble-fade-enter-active {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.bubble-fade-leave-active {
    transition: all 0.2s ease-in;
}
.bubble-fade-enter-from,
.bubble-fade-leave-to {
    opacity: 0;
    transform: translate(-50%, -80%) scale(0.8);
}
.bubble-fade-enter-to {
    opacity: 1;
    transform: translate(-50%, -100%) scale(1);
}
</style>