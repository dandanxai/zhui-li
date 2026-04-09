<template>
<div class="min-h-screen bg-[#fcfaf5] pt-40 pb-16 px-6 md:px-12 selection:bg-palace-red selection:text-white overflow-hidden">
    <button @click="$router.back()" class="fixed top-32 left-6 md:left-12 z-30 flex items-center gap-2 text-gray-400 hover:text-palace-red transition-colors group nav-back reveal-up">
        <span class="text-xl group-hover:-translate-x-1 transition-transform">←</span>
        <span class="text-xs font-serif tracking-widest font-bold">归卷 BACK</span>
    </button>

    <div class="max-w-7xl mx-auto">
        <div class="mb-32 page-header text-center relative reveal-up">
            <h1 class="text-5xl md:text-6xl font-serif text-[#1a1818] tracking-[0.2em] mb-8 font-medium relative z-10">
                {{ categoryInfo.title || '加载中...' }}
            </h1>
            <div class="flex items-center justify-center gap-6 relative z-10">
                <span class="w-16 h-[1px] bg-palace-red/40"></span>
                <p class="text-gray-400 font-sans tracking-[0.4em] uppercase text-xs">
                    {{ categoryInfo.enTitle || 'Loading...' }}
                </p>
                <span class="w-16 h-[1px] bg-palace-red/40"></span>
            </div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[12rem] font-serif font-black text-[#f2ebd9] opacity-40 select-none z-0 whitespace-nowrap pointer-events-none">
                {{ categoryInfo.title || '营造' }}
            </div>
        </div>

        <div class="flex flex-col gap-y-32 md:gap-y-48 pb-20">
            <div 
                v-for="(item, index) in architectureList" 
                :key="item.id" 
                class="group relative flex flex-col md:flex-row items-center building-card"
                :class="{'md:flex-row-reverse': index % 2 !== 0}"
            >
                <div class="absolute top-[-4rem] text-[10rem] md:text-[14rem] font-serif font-black text-[#eee8d5] -z-10 select-none leading-none scroll-reveal reveal-up"
                     :class="index % 2 === 0 ? '-left-8 md:-left-16' : '-right-8 md:-right-16'">
                    {{ String(index + 1).padStart(2, '0') }}
                </div>

                <div class="w-full md:w-[60%] aspect-[4/3] md:aspect-[16/10] relative overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.15)] z-0 cursor-pointer scroll-reveal"
                     :class="index % 2 === 0 ? 'reveal-left' : 'reveal-right'"
                     @click="$router.push(`/building/${item.id}`)">
                    <img :src="item.coverImage" :alt="item.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out">
                    
                    <div class="absolute inset-0 bg-[#1c1a18]/70 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center p-8 backdrop-blur-sm">
                        <div class="absolute inset-6 border border-white/10 scale-95 group-hover:scale-100 transition-transform duration-700 ease-out"></div>
                        <p class="vertical-text text-white/95 font-serif text-xl leading-[3] tracking-[0.4em] font-light">
                            {{ item.poem || '巧夺天工，鬼斧神工' }}
                        </p>
                    </div>
                </div>

                <div class="w-[90%] md:w-[45%] z-10 bg-[#fcfaf5]/95 backdrop-blur-md p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] border border-[#f0ead8] mt-[-60px] md:mt-0 cursor-pointer transition-transform duration-500 group-hover:-translate-y-2 scroll-reveal delay-200"
                     :class="[
                         index % 2 === 0 ? 'md:-ml-20 reveal-right' : 'md:-mr-20 reveal-left'
                     ]"
                     @click="$router.push(`/building/${item.id}`)">
                    
                    <div class="flex items-center gap-3 mb-8">
                        <span class="w-8 h-[1px] bg-palace-red/60"></span>
                        <span class="text-[11px] text-palace-red font-sans font-bold tracking-[0.2em] uppercase">{{ item.location || '未知地域' }}</span>
                    </div>

                    <h3 class="text-3xl md:text-4xl font-serif text-[#111] font-medium mb-6 tracking-[0.1em] group-hover:text-palace-red transition-colors duration-500">
                        {{ item.name }}
                    </h3>

                    <p class="text-sm text-[#666] leading-[2.2] tracking-widest font-light line-clamp-4 text-justify">
                        {{ item.remark || item.description || '暂无详细记载，待后人考究。' }}
                    </p>

                    <div class="mt-10 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <span class="text-xs font-serif tracking-widest text-[#111]">入卷探源</span>
                        <span class="w-12 h-[1px] bg-[#111] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200"></span>
                    </div>
                </div>
            </div>
        </div>

        <div ref="bottomSentinel" class="py-12 flex flex-col items-center justify-center">
            <div v-if="loadingMore" class="flex flex-col items-center gap-4 reveal-up is-visible">
                <div class="w-6 h-6 border-2 border-palace-red border-t-transparent rounded-full animate-spin"></div>
                <span class="text-xs font-serif tracking-widest text-gray-400">研墨展卷中...</span>
            </div>

            <div v-if="!hasMore && !loading" class="flex flex-col items-center gap-6 mt-8 reveal-up is-visible">
                <div class="flex items-center gap-4">
                    <span class="w-2 h-2 rotate-45 bg-gray-300"></span>
                    <span class="w-32 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></span>
                    <span class="w-2 h-2 rotate-45 bg-gray-300"></span>
                </div>
                <p class="text-lg font-serif tracking-[0.5em] text-gray-400 italic">
                    卷已展尽，墨迹至此
                </p>
            </div>
        </div>

    </div>
</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { getCategory , listArchitecture } from '@/api/building' 

const route = useRoute()
const categoryId = route.params.category 

const loading = ref(true)
const categoryInfo = ref({})
const architectureList = ref([])

// 🏮 分页与加载状态
const pageNum = ref(1)
const pageSize = ref(4) // 每次滚动加载的条数 (可自定义，建议少一点能看清动画)
const hasMore = ref(true)
const loadingMore = ref(false)
const bottomSentinel = ref(null)

// 🏮 核心加载逻辑
const loadPageData = async (isLoadMore = false) => {
    if (loadingMore.value || (!hasMore.value && isLoadMore)) return;
    
    if (isLoadMore) {
        loadingMore.value = true;
    } else {
        loading.value = true;
    }

    try {
        if (!isLoadMore) {
            const catRes = await getCategory(categoryId);
            categoryInfo.value = catRes.data?.data || { title: '营造寻迹', enTitle: 'Architectural Exploration' };
        }

        const archRes = await listArchitecture({
            categoryId: categoryId,
            pageNum: pageNum.value,
            pageSize: pageSize.value,
            status: '0' 
        });
        
        const newRows = archRes.rows || archRes.data?.rows || archRes.data || [];
        
        if (isLoadMore) {
            architectureList.value.push(...newRows);
        } else {
            architectureList.value = newRows;
        }

        // 判断是否还有下一页
        if (newRows.length < pageSize.value) {
            hasMore.value = false;
        } else {
            pageNum.value++;
        }

        // 数据更新后，重新绑定滚动动画监听
        nextTick(() => {
            initScrollObserver();
        });

    } catch (err) {
        console.error("数据加载失败", err)
    } finally {
        loading.value = false;
        loadingMore.value = false;
    }
}

// 🏮 视差滚动 & 触底加载 核心观察器
let observer = null;
const initScrollObserver = () => {
    if (observer) observer.disconnect();
    
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 1. 处理视差浮现动画
            if (entry.target.classList.contains('scroll-reveal') || entry.target.classList.contains('reveal-up')) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // 出现后取消监听，只动画一次
                }
            }
            
            // 2. 处理触底加载更多
            if (entry.target === bottomSentinel.value && entry.isIntersecting) {
                if (hasMore.value && !loadingMore.value) {
                    loadPageData(true);
                }
            }
        });
    }, {
        threshold: 0.15, // 元素露出 15% 时触发
        rootMargin: '0px 0px 50px 0px' // 提前 50px 触发触底
    });

    // 绑定动画元素
    document.querySelectorAll('.scroll-reveal, .reveal-up').forEach(el => {
        if (!el.classList.contains('is-visible')) {
            observer.observe(el);
        }
    });
    
    // 绑定底部哨兵元素 (用于触底加载)
    if (bottomSentinel.value) {
        observer.observe(bottomSentinel.value);
    }
}

onMounted(() => {
    if (categoryId) {
        loadPageData();
    }
    // 页面刚加载时，让头部元素立刻浮现
    setTimeout(() => {
        document.querySelectorAll('.page-header, .nav-back').forEach(el => el.classList.add('is-visible'));
    }, 100);
})

onUnmounted(() => {
    if (observer) observer.disconnect();
})
</script>

<style scoped>
/* =========================================
   滚动浮现动画核心 CSS (代替 GSAP)
   ========================================= */

/* 初始状态：透明且带有位移 */
.reveal-up {
    opacity: 0;
    transform: translateY(60px);
    transition: all 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.reveal-left {
    opacity: 0;
    transform: translateX(-80px);
    transition: all 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.reveal-right {
    opacity: 0;
    transform: translateX(80px);
    transition: all 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}

/* 延迟类 */
.delay-200 { transition-delay: 200ms; }

/* 触发状态：可见且归位 */
.is-visible {
    opacity: 1 !important;
    transform: translate(0, 0) !important;
}

/* =========================================
   排版细节
   ========================================= */
.line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.vertical-text {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    height: 70%;
    display: flex;
    align-items: center;
}
</style>