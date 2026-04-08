<template>
    <div v-if="loading" class="min-h-screen bg-[#fcfaf5] flex items-center justify-center">
        <div class="flex flex-col items-center gap-6">
            <div class="w-16 h-16 border-[1px] border-palace-red rounded-full border-t-transparent animate-spin opacity-60"></div>
            <div class="text-[#8c857d] font-serif tracking-[0.5em] animate-pulse text-sm">正在启扉入卷</div>
        </div>
    </div>

    <div v-else class="min-h-screen bg-[#fcfaf5] text-[#2c2825] selection:bg-palace-red selection:text-white overflow-x-hidden">
        
        <div class="absolute top-0 left-0 w-full z-[1100] p-6 md:p-10 pt-28 md:pt-36 flex justify-between items-center mix-blend-difference pointer-events-none">
            <button @click="$router.back()" class="pointer-events-auto text-paper-bg font-serif text-sm hover:text-palace-red transition-colors flex items-center gap-3 group">
                <span class="group-hover:-translate-x-2 transition-transform duration-500 opacity-60">←</span>
                <span class="tracking-[0.3em]">归卷</span>
            </button>
            <span class="text-paper-bg font-serif text-[10px] tracking-[0.5em] uppercase opacity-40 hidden md:block">Encyclopedia</span>
        </div>

        <header ref="headerRef" class="w-full h-[75vh] relative overflow-hidden bg-black cursor-zoom-in group/header" @click="toggleFullScreen">
            <div class="hero-image-wrapper w-full h-full relative will-change-transform">
                <img ref="imageRef" :src="building.coverImage" class="w-full h-full object-cover scale-110 origin-center opacity-80 transition-opacity duration-700" :class="{ 'opacity-0': isFullScreen }" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#fcfaf5] via-transparent to-black/40 z-10" :class="{ 'opacity-0': isFullScreen }"></div>
            
            <div class="absolute right-8 md:right-24 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:block opacity-20">
                <h1 class="text-white text-8xl font-serif tracking-[0.5em]" style="writing-mode: vertical-rl; text-orientation: upright;">
                    {{ (building.name || '').split('·').pop().trim() }}
                </h1>
            </div>

            <div class="absolute bottom-16 left-6 md:left-24 max-w-4xl z-20 hero-text pointer-events-none transition-all duration-700" :class="{ 'opacity-0 translate-y-10': isFullScreen }">
                <div class="flex items-center gap-4 mb-8">
                    <span v-for="tag in (building.tags || '').split(',').filter(t => t.trim())" :key="tag" class="text-white/80 font-serif text-xs tracking-[0.4em] border-l border-palace-red pl-3 uppercase">
                        {{ tag }}
                    </span>
                </div>
                <h1 class="text-5xl md:text-7xl font-serif tracking-[0.1em] mb-6 drop-shadow-2xl text-white">{{ building.name }}</h1>
                <p class="text-white/70 font-serif tracking-[0.5em] flex items-center gap-3 text-sm">
                    <span class="w-1.5 h-1.5 bg-palace-red rounded-full"></span> {{ building.location }}
                </p>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-6 md:px-20 py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div class="lg:col-span-8 relative">
                
                <div class="mb-24 relative">
                    <div class="absolute -left-8 top-0 text-palace-red text-6xl opacity-10 font-serif">❝</div>
                    <p class="text-2xl font-serif leading-[2.2] tracking-[0.2em] text-[#4a4540] text-justify italic pl-4">
                        {{ building.description }}
                    </p>
                </div>
                
                <div v-if="parsedContent.length > 0" class="space-y-24">
                    <section v-for="(section, index) in parsedContent" :key="index" class="relative flex flex-col md:flex-row gap-8 md:gap-12 group">
                        
                        <div class="absolute -top-10 -right-4 text-9xl font-serif text-black/[0.03] select-none pointer-events-none transition-opacity duration-700 group-hover:text-palace-red/[0.04]">
                            {{ cjkNumbers[index] || '拾' }}
                        </div>

                        <div class="md:w-16 flex-shrink-0 flex md:justify-end">
                            <div class="flex flex-col items-center gap-4">
                                <div class="w-[1px] h-8 bg-palace-red/40 hidden md:block group-hover:h-12 transition-all duration-700"></div>
                                <h4 class="text-2xl font-serif tracking-[0.3em] text-[#2c2825] py-2 md:border-none border-l-2 border-palace-red pl-4 md:pl-0" 
                                    :style="isMobile ? '' : 'writing-mode: vertical-rl; text-orientation: upright;'">
                                    {{ section.title }}
                                </h4>
                            </div>
                        </div>

                        <div class="flex-1 pt-2">
                            <div class="text-lg leading-[2.6] tracking-[0.15em] font-light text-[#5a5550] whitespace-pre-line text-justify html-content" v-html="section.content"></div>
                        </div>
                    </section>
                </div>

                <div v-else class="text-lg leading-[2.6] tracking-[0.15em] font-light text-[#5a5550] whitespace-pre-line text-justify html-content">
                    <div v-html="building.fullContent || '暂无详细营造记载'"></div>
                </div>
            </div>

            <aside class="lg:col-span-4 relative">
                <div class="sticky top-32">
                    <div class="relative bg-[#f5efe6] p-10 md:p-12 border border-[#e8dfd3] shadow-sm">
                        <div class="absolute top-0 left-0 w-4 h-4 border-t border-l border-palace-red/30"></div>
                        <div class="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-palace-red/30"></div>

                        <div class="flex items-center gap-4 mb-12">
                            <div class="w-8 h-[1px] bg-palace-red"></div>
                            <h4 class="font-serif text-palace-red tracking-[0.4em] text-lg">建筑案卷</h4>
                        </div>
                        
                        <ul class="space-y-8 text-sm mb-16">
                            <li v-for="(val, label) in parsedArchive" :key="label" class="flex flex-col gap-3">
                                <span class="text-[#8c857d] tracking-[0.3em] text-xs font-serif">{{ label }}</span>
                                <span class="font-serif text-[#2c2825] tracking-[0.2em] text-base border-b border-black/5 pb-2">{{ val }}</span>
                            </li>
                            <li v-if="Object.keys(parsedArchive).length === 0" class="text-[#8c857d] italic text-xs tracking-widest">
                                暂无归档规格数据
                            </li>
                        </ul>
                        
                        <button @click="open3DView" class="w-full py-5 border border-ink-dark text-ink-dark hover:bg-ink-dark hover:text-[#fcfaf5] transition-colors duration-500 flex items-center justify-center gap-4 group/btn">
                            <span class="font-serif tracking-[0.5em] text-sm">观其形 · 3D</span>
                            <span class="group-hover/btn:translate-x-2 transition-transform duration-500">→</span>
                        </button>
                    </div>

                    <div v-if="building.remark" class="pl-8 border-l-2 border-stone-200 mt-12">
                        <h5 class="text-[10px] font-sans tracking-[0.4em] text-gray-400 uppercase mb-4">营造备考</h5>
                        <p class="text-sm text-gray-500 leading-relaxed text-justify">{{ building.remark }}</p>
                    </div>
                </div>
            </aside>
        </main>

        <Transition name="fade">
            <div v-if="show3D" class="fixed inset-0 z-[2000] bg-[#fcfaf5] flex flex-col">
                <Transition name="fade">
                    <div v-if="is3DLoading" class="absolute inset-0 z-[2100] bg-[#fcfaf5] flex flex-col items-center justify-center">
                        <div class="relative w-24 h-24 mb-8">
                            <div class="absolute inset-0 border-[1px] border-palace-red/20 rounded-full"></div>
                            <div class="absolute inset-0 border-[1px] border-palace-red rounded-full border-t-transparent animate-spin"></div>
                            <div class="absolute inset-0 flex items-center justify-center font-serif text-sm text-palace-red">{{ Math.round(loadProgress) }}%</div>
                        </div>
                        <p class="font-serif tracking-[0.5em] text-xs text-[#8c857d] animate-pulse">正在唤醒数字孪生</p>
                    </div>
                </Transition>

                <div class="p-8 flex justify-between items-center z-10 pointer-events-none">
                    <div class="font-serif pointer-events-auto">
                        <h2 class="text-2xl tracking-[0.3em] text-ink-dark">{{ building.name }}</h2>
                    </div>
                    <button @click="close3DView" class="pointer-events-auto w-12 h-12 flex items-center justify-center hover:rotate-90 transition-transform duration-500 text-xl font-light text-ink-dark">✕</button>
                </div>

                <div ref="threeContainer" class="flex-1 w-full absolute inset-0 z-0">
                    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-3 bg-[#fcfaf5]/80 backdrop-blur-md border border-[#e8dfd3] pointer-events-none z-20">
                        <p class="text-[10px] text-[#8c857d] tracking-[0.4em] uppercase font-serif">WASD 漫游 ｜ 鼠标观微</p>
                    </div>
                </div>
            </div>
        </Transition>

        <Transition name="bg-expand">
            <div v-if="isFullScreen" class="fixed inset-0 z-[900] bg-black cursor-zoom-out" @click="toggleFullScreen">
                <img :src="building.coverImage" class="w-full h-full object-cover transition-transform duration-1000 ease-out" ref="fullImgRef" />
                <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none"></div>
                <div class="absolute bottom-20 left-10 md:left-24 z-10 animate-fade-up">
                    <h2 class="text-white/90 text-4xl md:text-7xl font-serif tracking-[0.3em] mb-4">{{ building.name }}</h2>
                    <p class="text-white/40 text-sm tracking-[0.8em] font-serif">筑 理 考 工 台</p>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 🏮 导入建筑 API
import { getArchitecture } from "@/api/building";

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const buildingId = route.params.id;

// ================= 状态管理 =================
const loading = ref(true); // 页面骨架屏加载状态
const building = ref({});  // 存储后端返回的建筑数据

const headerRef = ref(null);
const imageRef = ref(null);
const fullImgRef = ref(null);
const isFullScreen = ref(false);
const isMobile = ref(window.innerWidth < 768);

// 古风数字序号
const cjkNumbers = ['壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌'];

// 3D 状态
const show3D = ref(false);
const is3DLoading = ref(true);
const loadProgress = ref(0);
const threeContainer = ref(null);
let scene, camera, renderer, controls, animationId;
const keys = { w: false, a: false, s: false, d: false };

// ================= 核心逻辑 =================

// 🏮 1. 获取动态数据
const loadBuildingData = async () => {
    loading.value = true;
    try {
        const res = await getArchitecture(buildingId);
        // 安全取值
        building.value = res.data?.data || res.data || {};
        
        // 数据渲染完后，立刻执行开场动画和鼠标特效
        nextTick(() => {
            gsap.from('.hero-text > *', { y: 30, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out' });
            window.addEventListener('mousemove', handleMouseMove);
        });
    } catch (err) {
        console.error("加载建筑详情失败:", err);
    } finally {
        loading.value = false;
    }
};

// 🏮 2. 动态解析 JSON 格式的建筑案卷
const parsedArchive = computed(() => {
    const info = building.value.archiveInfo;
    if (!info) return {};
    try {
        return typeof info === 'string' ? JSON.parse(info) : info;
    } catch (e) {
        // 如果后端传的不是严谨的 JSON，当做普通字符串兜底显示
        return { "规格描述": info };
    }
});

// 🏮 3. 动态解析富文本中的 【段落标题】 (与你原有逻辑保持一致)
const parsedContent = computed(() => {
    const content = building.value.fullContent;
    if (!content) return [];
    
    const sections = [];
    const regex = /【(.*?)】\n?([\s\S]*?)(?=(?:【|$))/g;
    let match;
    
    while ((match = regex.exec(content)) !== null) {
        sections.push({
            title: match[1],
            content: match[2].trim()
        });
    }
    return sections;
});

// ================= 3D 渲染逻辑 =================
const initThreeJS = () => {
    const container = threeContainer.value;
    if (!container) return;

    is3DLoading.value = true;
    loadProgress.value = 0;

    const manager = new THREE.LoadingManager();
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
        loadProgress.value = (itemsLoaded / itemsTotal) * 100;
    };
    manager.onLoad = () => { setTimeout(() => { is3DLoading.value = false; }, 500); };

    scene = new THREE.Scene();
    scene.background = new THREE.Color('#fcfaf5');
    
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(15, 12, 30);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
    sunLight.position.set(10, 20, 10);
    scene.add(sunLight);

    // 🏮 优先使用数据库配置的模型地址，没有则用你的 OSS 兜底
    const modelPath = building.value.modelUrl || 'https://dandanxia-hs.oss-cn-hangzhou.aliyuncs.com/dazhengdian.glb';

    const loader = new GLTFLoader(manager);
    loader.load(modelPath, (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center); 
        scene.add(model);
        
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.z = maxDim * 1.5;
    }, undefined, (err) => {
        console.error("模型加载失败:", err);
        is3DLoading.value = false;
    });

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const animate = () => {
        animationId = requestAnimationFrame(animate);
        const moveSpeed = 0.04; 
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        forward.y = 0; 
        forward.normalize();
        const right = new THREE.Vector3().crossVectors(camera.up, forward).normalize();

        if (keys.w) { camera.position.addScaledVector(forward, moveSpeed); controls.target.addScaledVector(forward, moveSpeed); }
        if (keys.s) { camera.position.addScaledVector(forward, -moveSpeed); controls.target.addScaledVector(forward, -moveSpeed); }
        if (keys.a) { camera.position.addScaledVector(right, moveSpeed); controls.target.addScaledVector(right, moveSpeed); }
        if (keys.d) { camera.position.addScaledVector(right, -moveSpeed); controls.target.addScaledVector(right, -moveSpeed); }

        controls.update();
        renderer.render(scene, camera);
    };
    animate();
};

const handleKeyDown = (e) => { const k = e.key.toLowerCase(); if(keys.hasOwnProperty(k)) keys[k] = true; };
const handleKeyUp = (e) => { const k = e.key.toLowerCase(); if(keys.hasOwnProperty(k)) keys[k] = false; };

const open3DView = () => { show3D.value = true; document.body.style.overflow = 'hidden'; nextTick(() => initThreeJS()); };
const close3DView = () => { show3D.value = false; document.body.style.overflow = ''; window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp); cancelAnimationFrame(animationId); if (renderer) renderer.dispose(); };

// ================= 交互与生命周期 =================

const handleMouseMove = (e) => {
    if (isFullScreen.value || !imageRef.value) return;
    const mx = (e.clientX / window.innerWidth - 0.5) * 2;
    const my = (e.clientY / window.innerHeight - 0.5) * 2;
    gsap.to(imageRef.value, { x: mx * 20, y: my * 20, duration: 1.5, ease: 'power2.out' });
};

const toggleFullScreen = () => {
    isFullScreen.value = !isFullScreen.value;
    if (isFullScreen.value) {
        document.body.style.overflow = 'hidden';
        nextTick(() => { gsap.fromTo(fullImgRef.value, { scale: 1.1 }, { scale: 1, duration: 1.5, ease: 'power2.out' }); });
    } else { document.body.style.overflow = ''; }
};

onMounted(() => {
    window.addEventListener('resize', () => isMobile.value = window.innerWidth < 768);
    // 启动数据加载
    loadBuildingData();
});

onUnmounted(() => {
    window.removeEventListener('resize', () => {});
    window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.8s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.bg-expand-enter-active { transition: all 1s cubic-bezier(0.22, 1, 0.36, 1); }
.bg-expand-leave-active { transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1); }
.bg-expand-enter-from { opacity: 0; clip-path: inset(10% 10% 10% 10%); }
.bg-expand-enter-to { opacity: 1; clip-path: inset(0 0 0 0); }

.animate-fade-up { animation: fadeUp 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

/* 东方美学色彩微调 */
p { color: #5a5550; }
h1, h2, h3, h4 { color: #2c2825; }

/* 防止富文本渲染时图片过大溢出 */
:deep(.html-content img) {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin: 1.5rem 0;
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
}
</style>