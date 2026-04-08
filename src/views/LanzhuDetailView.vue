<template>
<div class="min-h-screen bg-[#fcfaf5] pt-40 pb-24 px-6 md:px-12 selection:bg-palace-red selection:text-white">
    <button @click="$router.back()" class="fixed top-32 left-6 md:left-12 z-30 flex items-center gap-2 text-gray-400 hover:text-palace-red transition-colors group nav-back">
        <span class="text-xl group-hover:-translate-x-1 transition-transform">←</span>
        <span class="text-xs font-serif tracking-widest font-bold">归卷 BACK</span>
    </button>

    <div class="max-w-7xl mx-auto">
        <div class="mb-20 page-header">
            <h1 class="text-4xl md:text-6xl font-serif text-[#111] tracking-widest mb-4 font-black">
                {{ categoryInfo.title || '加载中...' }}
            </h1>
            <p class="text-gray-500 font-sans font-bold tracking-[0.2em] uppercase text-sm">
                {{ categoryInfo.enTitle || 'Loading...' }}
            </p>
            <div class="w-12 h-[2px] bg-palace-red/60 mt-8"></div>
        </div>

        <div v-if="!loading && architectureList.length === 0" class="text-center py-32 opacity-50">
            <p class="text-xl font-serif tracking-widest text-[#111]">此卷暂无收录建筑</p>
            <p class="text-xs font-sans tracking-widest mt-4 uppercase">No Architecture Found in this Category</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div 
                v-for="(item, index) in architectureList" 
                :key="item.id" 
                class="group cursor-pointer building-card opacity-0"
                @click="$router.push(`/building/${item.id}`)"
            >
                <div class="aspect-[3/4] overflow-hidden rounded-sm mb-6 bg-gray-100 relative shadow-sm border border-black/5">
                    <img :src="item.coverImage" :alt="item.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000">
                    
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center px-10 text-center backdrop-blur-sm">
                        <span class="w-1.5 h-1.5 bg-palace-red rounded-full mb-6"></span>
                        
                        <p class="text-white font-serif text-lg leading-relaxed tracking-[0.2em] mb-8 font-medium italic">
                            「 {{ item.poem || '巧夺天工，鬼斧神工' }} 」
                        </p>
                        
                        <div class="flex flex-col items-center gap-2">
                            <span class="text-white/50 text-[9px] tracking-[0.4em] uppercase font-sans">点击入卷探源</span>
                            <div class="w-8 h-[1px] bg-white/20"></div>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-2 mb-4">
                    <span class="w-2 h-[1px] bg-palace-red"></span>
                    <span class="text-[10px] text-gray-400 font-sans font-black tracking-widest uppercase">{{ item.location || '未知地域' }}</span>
                </div>

                <h3 class="text-xl font-serif text-[#111] font-bold mb-3 tracking-widest group-hover:text-palace-red transition-colors duration-500">
                    {{ item.name }}
                </h3>

                <p class="text-sm text-gray-500 leading-[2] tracking-wider font-light text-justify line-clamp-3">
                    {{ item.remark || item.description || '暂无详细记载' }}
                </p>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'

// 🏮 导入 API 接口
import { getCategory , listArchitecture } from '@/api/building' 

const route = useRoute()
const categoryId = route.params.category // 这里的路由参数名字是 :category

const loading = ref(true)
const categoryInfo = ref({}) // 存储当前分类的信息（大标题）
const architectureList = ref([]) // 存储建筑列表

// 🏮 核心逻辑：加载当前分类详情和它下面的建筑列表
const loadPageData = async () => {
    loading.value = true
    try {
        // 1. 获取当前分类的大标题等信息
        const catRes = await getCategory(categoryId);
        if (catRes.data.data) {
            categoryInfo.value = catRes.data.data;
        } else {
            // 兼容性兜底，万一找不到该分类
            categoryInfo.value = { title: '营造寻迹', enTitle: 'Architectural Exploration' };
        }

        // 2. 根据分类 ID 获取该分类下的所有建筑 (破除 10 条限制)
        const archRes = await listArchitecture({
            categoryId: categoryId,
            pageNum: 1,
            pageSize: 500, // 给一个大值，前端展示全部
            status: '0' // 只查询状态为“展示”的建筑
        });
        
        // 适配若依的分页返回结构
        architectureList.value = archRes.rows || archRes.data?.rows || archRes.data || [];
        
        // 3. 数据挂载后触发 GSAP 动画
        nextTick(() => {
            initGsapAnimation()
        })
    } catch (err) {
        console.error("建筑列表加载失败", err)
    } finally {
        loading.value = false
    }
}

// 🏮 初始化 GSAP 页面浮现动画
const initGsapAnimation = () => {
    // 1. 返回按钮淡入
    gsap.fromTo('.nav-back', 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }
    );

    // 2. 标题区上浮淡入
    gsap.fromTo('.page-header', 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.1 }
    );

    // 3. 卡片列表错落浮现 (如果有数据的话)
    if (architectureList.value.length > 0) {
        gsap.fromTo('.building-card', 
            { opacity: 0, y: 60 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1, 
                stagger: 0.15, // 每张卡片延迟0.15秒出现
                ease: 'power3.out',
                delay: 0.3     // 总体延迟，等标题先出来
            }
        );
    }
}

// 页面挂载时启动
onMounted(() => {
    // 防止用户没传 id 进来报错
    if (categoryId) {
        loadPageData();
    }
})
</script>

<style scoped>
/* 悬停时整个卡片轻微上浮，配合文字变色 */
.group:hover {
    transform: translateY(-4px);
}
.building-card {
    will-change: transform, opacity;
}
/* 控制简介最多显示三行，多余显示省略号，保持排版整洁 */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>