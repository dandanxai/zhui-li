<template>
<div class="w-full h-full bg-[#fcfaf5] relative font-serif text-[#111]">
    
    <div v-if="!activeModel" class="absolute inset-0 p-6 xl:p-10 overflow-y-auto custom-scrollbar flex flex-col" @scroll="handleScroll">
        
        <div class="flex items-end gap-4 mb-8 border-b border-palace-red/10 pb-4 shrink-0">
            <div class="w-2 h-8 bg-palace-red shadow-[0_0_10px_rgba(155,46,46,0.4)]"></div>
            <h2 class="text-2xl font-black tracking-[0.3em]">古建孪生档案</h2>
            <span class="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">Digital_Twin_Database</span>
        </div>

        <div v-if="isListLoading && models.length === 0" class="flex flex-col items-center justify-center py-20 opacity-60">
            <div class="w-8 h-8 border-[1px] border-palace-red rounded-full border-t-transparent animate-spin mb-4"></div>
            <span class="text-xs font-serif tracking-[0.4em] text-gray-500 animate-pulse">正在调取营造档案...</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
            <div v-for="model in models" :key="model.id" 
                class="group relative bg-white border border-palace-red/10 p-5 shadow-sm transition-all duration-500 hover:shadow-[0_10px_30px_rgba(155,46,46,0.05)] hover:-translate-y-1"
                :class="model.url ? 'cursor-pointer' : 'cursor-not-allowed opacity-70 grayscale'">
                
                <div class="absolute top-0 left-0 w-3 h-3 border-t border-l border-palace-red/40"></div>
                <div class="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-palace-red/40"></div>

                <div class="flex justify-between items-start mb-4">
                    <span class="text-[10px] font-mono text-gray-400 tracking-widest">{{ model.dynasty }}</span>
                    <span v-if="model.url" class="text-[9px] font-mono text-green-600 bg-green-50 px-2 py-0.5 border border-green-200">ONLINE</span>
                    <span v-else class="text-[9px] font-mono text-red-500 bg-red-50 px-2 py-0.5 border border-red-200">ARCHIVING</span>
                </div>

                <h3 class="text-xl font-bold tracking-widest mb-2 group-hover:text-palace-red transition-colors">{{ model.name }}</h3>
                <p class="text-xs text-gray-500 leading-relaxed mb-6 h-10 line-clamp-2 italic">{{ model.desc }}</p>

                <button @click="model.url && openModel(model)" 
                    class="w-full py-2.5 text-[11px] tracking-[0.3em] font-bold border transition-colors duration-300"
                    :class="model.url ? 'border-palace-red text-palace-red hover:bg-palace-red hover:text-white' : 'border-gray-200 text-gray-400 bg-gray-50'">
                    {{ model.url ? '载入孪生节点 // LOAD' : '测绘采集中 // PENDING' }}
                </button>
            </div>
        </div>

        <div class="w-full flex justify-center py-8 mt-4 shrink-0">
            <div v-if="isLoadingMore" class="flex items-center gap-3 opacity-80">
                <div class="w-3.5 h-3.5 border-[1.5px] border-palace-red rounded-full border-t-transparent animate-spin"></div>
                <span class="text-[10px] font-mono text-palace-red tracking-widest">LOADING_MORE...</span>
            </div>
            
            <div v-else-if="hasMore && models.length > 0" @click="loadMore" class="flex items-center gap-3 opacity-60 cursor-pointer hover:opacity-100 transition-opacity">
                <span class="text-[10px] font-mono text-palace-red tracking-widest border border-palace-red/30 px-4 py-1.5 rounded-full bg-palace-red/5">
                    LOAD_MORE // 滚动或点击加载更多
                </span>
            </div>
            
            <div v-else-if="!hasMore && models.length > 0" class="flex items-center gap-3 opacity-40">
                <div class="w-10 h-[1px] bg-palace-red/30"></div>
                <span class="text-[9px] font-mono text-gray-500 tracking-[0.3em] italic">END_OF_ARCHIVE / 已至卷轴底端</span>
                <div class="w-10 h-[1px] bg-palace-red/30"></div>
            </div>
        </div>
    </div>

    <Teleport to="body">
        <transition name="fade">
            <div v-if="activeModel" class="fixed inset-0 z-[9999] flex flex-col bg-[#fcfaf5] font-serif">
                
                <div class="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-8 md:p-12 pointer-events-none">
                    <button @click="closeModel" class="pointer-events-auto text-ink-dark flex items-center gap-3 hover:text-palace-red transition-colors group">
                        <span class="group-hover:-translate-x-2 transition-transform duration-500 text-xl">←</span>
                        <span class="text-sm tracking-[0.3em] font-bold">归卷 // BACK</span>
                    </button>
                    <h3 class="text-ink-dark text-xl md:text-2xl font-black tracking-[0.3em]">{{ activeModel.name }}</h3>
                </div>

                <transition name="fade">
                    <div v-if="is3DLoading" class="absolute inset-0 z-30 bg-[#fcfaf5] flex flex-col items-center justify-center">
                        <div class="relative w-24 h-24 mb-8">
                            <div class="absolute inset-0 border-[1px] border-palace-red/20 rounded-full"></div>
                            <div class="absolute inset-0 border-[1px] border-palace-red rounded-full border-t-transparent animate-spin"></div>
                            <div class="absolute inset-0 flex items-center justify-center font-serif text-sm text-palace-red font-bold">
                                {{ Math.round(loadProgress) }}%
                            </div>
                        </div>
                        <p class="font-serif tracking-[0.5em] text-xs text-[#8c857d] animate-pulse mb-8">正在唤醒数字孪生</p>
                        
                        <button @click="closeModel" class="pointer-events-auto border border-palace-red/30 px-6 py-2 text-[10px] tracking-[0.3em] font-mono text-palace-red hover:bg-palace-red hover:text-white transition-colors">
                            ABORT_REQUEST // 终止加载
                        </button>
                    </div>
                </transition>

                <div ref="threeContainer" class="flex-1 w-full absolute inset-0 z-10 cursor-grab active:cursor-grabbing"></div>

                <div class="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-3 bg-[#fcfaf5]/80 backdrop-blur-md border border-[#e8dfd3] shadow-sm pointer-events-none z-20">
                    <p class="text-[10px] text-[#8c857d] tracking-[0.4em] uppercase font-serif">WASD 漫游 | Left Click: Rotate | Scroll: Zoom</p>
                </div>
            </div>
        </transition>
    </Teleport>
</div>
</template>

<script setup>
import { ref, onMounted, nextTick, shallowRef } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { listArchitecture } from "@/api/building"

// ================= 数据源与分页 =================
const models = ref([])
const isListLoading = ref(true)

const queryParams = ref({
    pageNum: 1,
    pageSize: 10
})
const total = ref(0)
const hasMore = ref(true)
const isLoadingMore = ref(false)

// ================= 3D 与加载状态 =================
const activeModel = shallowRef(null)
const threeContainer = ref(null)
const is3DLoading = ref(false)
const loadProgress = ref(0)

let scene, camera, renderer, controls, animationId
let abortController = null 
let isCancelled = false

const keys = { w: false, a: false, s: false, d: false }
const handleKeyDown = (e) => { const k = e.key.toLowerCase(); if(keys.hasOwnProperty(k)) keys[k] = true; }
const handleKeyUp = (e) => { const k = e.key.toLowerCase(); if(keys.hasOwnProperty(k)) keys[k] = false; }

// ================= 核心方法 =================

// 🏮 单独抽离出触发加载的执行逻辑
const loadMore = () => {
    if (hasMore.value && !isLoadingMore.value && !isListLoading.value) {
        queryParams.value.pageNum++
        fetchModels(true)
    }
}

// 🏮 防弹版触底事件：大幅放大触发容错距离
const handleScroll = (e) => {
    const el = e.target
    // 原来是 20，现在改成 150，配合 Math.ceil 斩杀所有高分屏的小数偏差导致的失效
    if (el.scrollHeight - Math.ceil(el.scrollTop) - el.clientHeight <= 150) {
        loadMore()
    }
}

const fetchModels = async (isLoadMore = false) => {
    if (isLoadMore) {
        isLoadingMore.value = true
    } else {
        isListLoading.value = true
        queryParams.value.pageNum = 1
    }

    try {
        const res = await listArchitecture(queryParams.value)
        const dataList = res.data.rows
        
        // 更健壮的后端 total 处理
        const currentTotal = res.total ? Number(res.total) : 0
        total.value = currentTotal

        const formattedList = dataList.map(item => {
            let dynastyStr = item.location || '未知'
            if (item.archiveInfo) {
                try {
                    const info = JSON.parse(item.archiveInfo)
                    if (info['所属朝代']) dynastyStr = info['所属朝代']
                } catch(e) {}
            }

            return {
                id: item.id,
                name: item.name,
                dynasty: dynastyStr.toUpperCase() + ' // ' + (item.tags ? item.tags.split(',')[0] : '古建'),
                desc: item.description || '暂无营造概览。',
                url: item.modelUrl 
            }
        })

        if (isLoadMore) {
            models.value = [...models.value, ...formattedList]
        } else {
            models.value = formattedList
        }

        // 依然保留强制重排，保证每次加载新页后有模型的必定顶天立地
        models.value.sort((a, b) => {
            const aHasModel = a.url && a.url.trim() !== '' ? 1 : 0
            const bHasModel = b.url && b.url.trim() !== '' ? 1 : 0
            return bHasModel - aHasModel
        })

        // 健壮的 hasMore 判断
        if (currentTotal > 0) {
            hasMore.value = models.value.length < currentTotal
        } else {
            // 如果接口异常没有给 total，靠单页查回来的数据量判断兜底
            hasMore.value = dataList.length === queryParams.value.pageSize
        }

    } catch (error) {
        console.error("加载建筑列表失败:", error)
    } finally {
        isListLoading.value = false
        isLoadingMore.value = false
    }
}

const openModel = (model) => {
    isCancelled = false
    activeModel.value = model
    document.body.style.overflow = 'hidden' 
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    nextTick(() => {
        initThreeJS(model.url)
    })
}

const closeModel = () => {
    isCancelled = true
    document.body.style.overflow = ''

    if (abortController) {
        abortController.abort()
        abortController = null
    }
    
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)

    cancelAnimationFrame(animationId)
    if (renderer) {
        renderer.dispose()
        renderer.forceContextLoss()
        if (threeContainer.value && renderer.domElement) {
            threeContainer.value.removeChild(renderer.domElement)
        }
    }
    scene = null
    camera = null
    renderer = null
    controls = null
    activeModel.value = null
    is3DLoading.value = false
}

// 3D 底层流式加载 + WASD漫游 (无改动)
const initThreeJS = async (modelUrl) => {
    const container = threeContainer.value
    if (!container) return

    is3DLoading.value = true
    loadProgress.value = 0

    scene = new THREE.Scene()
    scene.background = new THREE.Color('#fcfaf5')
    
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.set(0, 5, 15)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputEncoding = THREE.sRGBEncoding
    container.appendChild(renderer.domElement)

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.maxDistance = 100
    controls.minDistance = 1

    scene.add(new THREE.AmbientLight(0xffffff, 0.9))
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.0)
    sunLight.position.set(10, 20, 10)
    scene.add(sunLight)

    abortController = new AbortController()
    
    try {
        const response = await fetch(modelUrl, { signal: abortController.signal })
        if (!response.ok) throw new Error("网络请求异常")

        const contentLength = response.headers.get('content-length')
        const total = contentLength ? parseInt(contentLength, 10) : 0
        let loaded = 0

        const reader = response.body.getReader()
        const chunks = []

        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            
            chunks.push(value)
            loaded += value.length
            
            if (total) {
                loadProgress.value = (loaded / total) * 100
            } else {
                loadProgress.value = Math.min((loaded / (1024 * 1024 * 10)) * 100, 99) 
            }
        }

        if (isCancelled) return

        const arrayBuffer = new Uint8Array(loaded)
        let position = 0
        for (let chunk of chunks) {
            arrayBuffer.set(chunk, position)
            position += chunk.length
        }

        const loader = new GLTFLoader()
        loader.parse(arrayBuffer.buffer, '', (gltf) => {
            if (isCancelled) return

            const model = gltf.scene
            const box = new THREE.Box3().setFromObject(model)
            const center = box.getCenter(new THREE.Vector3())
            const size = box.getSize(new THREE.Vector3())
            
            model.position.sub(center) 
            scene.add(model)
            
            const maxDim = Math.max(size.x, size.y, size.z)
            camera.position.set(maxDim * 0.8, maxDim * 0.5, maxDim * 1.5)
            controls.target.set(0, 0, 0)
            controls.update()

            setTimeout(() => { is3DLoading.value = false }, 300)

        }, (error) => {
            console.error("模型解析失败:", error)
            is3DLoading.value = false
        })

    } catch (err) {
        if (err.name === 'AbortError') {
            console.log('❌ 已成功拦截请求，阻断模型下载。')
        } else {
            console.error('模型拉取异常:', err)
        }
    }

    const resizeObserver = new ResizeObserver(() => {
        if (!container || !camera || !renderer) return
        camera.aspect = container.clientWidth / container.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(container.clientWidth, container.clientHeight)
    })
    resizeObserver.observe(container)

    const animate = () => {
        if (isCancelled) return
        animationId = requestAnimationFrame(animate)
        
        const moveSpeed = 0.08
        const forward = new THREE.Vector3()
        camera.getWorldDirection(forward)
        forward.y = 0
        forward.normalize()
        const right = new THREE.Vector3().crossVectors(camera.up, forward).normalize()

        if (keys.w) { camera.position.addScaledVector(forward, moveSpeed); controls.target.addScaledVector(forward, moveSpeed); }
        if (keys.s) { camera.position.addScaledVector(forward, -moveSpeed); controls.target.addScaledVector(forward, -moveSpeed); }
        if (keys.a) { camera.position.addScaledVector(right, moveSpeed); controls.target.addScaledVector(right, moveSpeed); }
        if (keys.d) { camera.position.addScaledVector(right, -moveSpeed); controls.target.addScaledVector(right, -moveSpeed); }

        controls.update()
        renderer.render(scene, camera)
    }
    animate()
}

onMounted(() => {
    fetchModels()
})
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
.fade-slide-enter-from { opacity: 0; transform: scale(0.98) translateY(10px); }
.fade-slide-leave-to { opacity: 0; transform: scale(1.02) translateY(-10px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(155, 46, 46, 0.2); border-radius: 4px; }
.custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(155, 46, 46, 0.6); }
</style>