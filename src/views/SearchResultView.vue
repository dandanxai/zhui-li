<template>
<div class="min-h-screen bg-[#fcfaf5] text-[#111] selection:bg-palace-red selection:text-white font-serif overflow-x-hidden pt-32 pb-20">
    
    <div class="fixed inset-0 opacity-[0.04] pointer-events-none z-0" style="background-image: radial-gradient(#000000 1.5px, transparent 1.5px); background-size: 40px 40px;"></div>

    <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <header class="mb-12 border-b border-black/10 pb-12">
            <span class="text-palace-red font-sans tracking-[0.8em] text-xs uppercase font-black mb-4 block">Global Search</span>
            <h1 class="text-4xl md:text-6xl font-black text-[#000] tracking-widest flex items-end gap-6">
                寻觅：<span class="text-palace-red underline decoration-palace-red/30 underline-offset-8">{{ currentKeyword }}</span>
            </h1>
            <p class="mt-6 text-gray-500 tracking-widest text-sm font-bold">
                于浩瀚营造案卷中，共为您觅得 <span class="text-[#111] text-lg mx-1">{{ results.length }}</span> 份相关卷宗
            </p>
        </header>

        <div class="mb-12 relative overflow-hidden rounded-sm bg-gradient-to-br from-white/80 to-[#fcfaf5]/40 border border-palace-red/20 shadow-[0_8px_30px_rgba(155,46,46,0.05)] backdrop-blur-md p-8 group">
            <div class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-palace-red to-transparent opacity-50"></div>
            
            <div class="flex gap-6 relative z-10">
                <div class="w-12 h-12 bg-palace-red flex items-center justify-center shrink-0 shadow-lg">
                    <span class="text-white font-serif text-lg" :class="{'animate-pulse': !aiFinished}">智</span>
                </div>
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-3">
                        <h3 class="text-sm font-black tracking-[0.3em] text-[#111]">智脑推演 <span class="text-gray-400 font-normal ml-2">A.I. INSIGHTS</span></h3>
                        <div v-if="aiLoading" class="flex gap-1">
                            <span class="w-1.5 h-1.5 bg-palace-red rounded-full animate-bounce"></span>
                            <span class="w-1.5 h-1.5 bg-palace-red rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
                            <span class="w-1.5 h-1.5 bg-palace-red rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                        </div>
                    </div>
                    
                    <p class="text-[14px] text-[#2c2c2c] font-medium leading-loose tracking-[0.15em] text-justify">
                        {{ aiContent }}
                        <span v-if="!aiFinished" class="inline-block w-1.5 h-4 ml-1 bg-palace-red animate-pulse align-middle"></span>
                    </p>
                    <p v-if="aiLoading" class="text-[12px] text-gray-400 tracking-widest italic mt-2">
                        正在连线天枢智脑，为您推演【{{ currentKeyword }}】的营造内涵...
                    </p>

                    <div v-if="aiFinished" class="mt-8 pt-6 border-t border-palace-red/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <p class="text-xs text-gray-500 tracking-widest italic">智脑已完成推演，是否需将其意境具象化为丹青画卷？</p>
                        <button @click="openDrawingModal" class="bg-[#111] text-white px-6 py-2.5 text-[10px] tracking-[0.3em] font-bold hover:bg-palace-red transition-all flex items-center gap-2 shadow-lg">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            开启丹青幻境
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-wrap gap-4 md:gap-8 mb-12">
            <button 
                v-for="tab in tabs" :key="tab.value"
                @click="activeTab = tab.value"
                class="text-xs tracking-[0.3em] font-bold px-6 py-2 transition-all outline-none"
                :class="activeTab === tab.value ? 'bg-[#111] text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-500 hover:border-palace-red hover:text-palace-red'"
            >
                {{ tab.label }}
            </button>
        </div>

        <div v-if="loading" class="py-32 flex flex-col items-center justify-center">
            <div class="w-12 h-12 border-2 border-palace-red rounded-full border-t-transparent animate-spin mb-6"></div>
            <p class="tracking-[0.4em] text-gray-400 text-sm">正在翻阅古籍案卷...</p>
        </div>

        <div v-else-if="filteredResults.length === 0" class="py-24 flex flex-col items-center justify-center text-center">
            <div class="text-[8rem] text-gray-200/50 font-black leading-none mb-6 select-none">空</div>
            <h3 class="text-2xl font-black tracking-widest text-gray-600 mb-2">未寻得相关卷宗</h3>
            <p class="text-gray-400 tracking-widest text-sm">换个辞藻，或许别有洞天</p>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div 
                v-for="item in filteredResults" 
                :key="item.id + item.type"
                @click="goToDetail(item)"
                class="result-card opacity-0 translate-y-10 group cursor-pointer bg-white border border-gray-100 hover:border-palace-red/50 hover:shadow-[0_20px_40px_rgba(155,46,46,0.08)] transition-all duration-500 flex flex-col"
            >
                <div class="aspect-[4/3] overflow-hidden relative bg-[#e8e4d3]">
                    <img :src="item.coverImg || '/default-cover.jpg'" class="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    <div class="absolute top-4 right-4 bg-[#111] text-white text-[10px] tracking-[0.2em] px-3 py-1 font-bold shadow-md">
                        {{ getTypeName(item.type) }}
                    </div>
                </div>
                
                <div class="p-6 md:p-8 flex-1 flex flex-col">
                    <span class="text-[10px] text-palace-red tracking-[0.3em] font-bold uppercase mb-3 block">{{ item.tag || '营造档案' }}</span>
                    <h3 class="text-xl font-black text-[#111] tracking-widest mb-4 group-hover:text-palace-red transition-colors" v-html="highlightText(item.title)"></h3>
                    <p class="text-[13px] text-gray-500 leading-loose tracking-widest text-justify line-clamp-3 flex-1" v-html="highlightText(item.description)"></p>
                    
                    <div class="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                        <span class="text-[10px] text-gray-300 font-sans tracking-widest uppercase">Archive-{{ item.id }}</span>
                        <span class="text-palace-red text-sm opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">↗</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Transition name="modal-fade">
        <div v-if="showModal" class="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 md:p-0">
            <div class="relative w-full max-w-2xl bg-[#fcfaf5] border border-palace-red/30 shadow-2xl p-2 md:p-3">
                
                <button @click="closeDrawingModal" class="absolute top-6 right-6 z-20 w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full text-gray-500 hover:text-palace-red hover:border-palace-red transition-all shadow-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div class="bg-white px-8 py-16 min-h-[400px] flex flex-col items-center justify-center relative">
                    
                    <div v-if="drawingLoading" class="flex flex-col items-center">
                        <div class="relative w-24 h-24 mb-10">
                            <div class="absolute inset-0 border-[3px] border-gray-100 rounded-full"></div>
                            <div class="absolute inset-0 border-[3px] border-palace-red border-t-transparent rounded-full animate-spin" style="animation-duration: 1.5s;"></div>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <span class="font-serif text-2xl text-palace-red font-black animate-pulse">绘</span>
                            </div>
                        </div>
                        <h3 class="text-xl font-black tracking-[0.3em] text-[#111] mb-3">丹青泼墨中</h3>
                        <p class="text-gray-400 tracking-widest text-xs mt-2 text-center leading-relaxed">
                            千问大模型正在为您勾勒【{{ currentKeyword }}】的意境...<br>
                            <span class="text-palace-red/80 opacity-80 mt-2 block">(约需 10-15 秒，关闭窗口将立即中止作画)</span>
                        </p>
                    </div>

                    <div v-else-if="fallbackImage" class="w-full flex flex-col items-center animate-fade-in">
                        <div class="relative w-full group">
                            <img :src="fallbackImage" class="w-full h-auto max-h-[60vh] object-contain shadow-lg border border-gray-100" />
                            <div class="absolute bottom-4 right-4 bg-black/70 text-white text-[10px] tracking-widest px-3 py-1 backdrop-blur-md">
                                A.I. Generated
                            </div>
                        </div>
                        <p class="text-xs text-gray-400 tracking-[0.3em] font-bold uppercase mt-6">智脑丹青画卷已落笔</p>
                    </div>

                    <div v-else class="text-center">
                        <div class="text-4xl text-gray-300 mb-4"><i class="ri-close-circle-line"></i></div>
                        <p class="text-palace-red tracking-widest text-sm font-bold">作画已中止或发生异常</p>
                    </div>
                </div>
            </div>
        </div>
    </Transition>

</div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import gsap from 'gsap'
// 导入接口
import { searchStream, drawImage } from '@/api/ai'
import { globalSearch } from '@/api/building' 

const route = useRoute()
const router = useRouter()

const currentKeyword = ref('')
const activeTab = ref('all')

const loading = ref(true)
const results = ref([])

// 流式智脑状态
const aiLoading = ref(false)
const aiFinished = ref(false)
const aiContent = ref('')
let chatAbortController = null 

// 🏮 绘画弹窗状态与控制
const showModal = ref(false)
const drawingLoading = ref(false)
const fallbackImage = ref('')
let drawAbortController = null // 🏮 专门用于中止画图请求

const tabs = [
    { label: '全部卷宗', value: 'all' },
    { label: '大匠志传', value: 'master' },
    { label: '营造典籍', value: 'classic' },
    { label: '建筑名录', value: 'building' }
]

const getTypeName = (type) => {
    const map = { 'master': '大匠', 'classic': '典籍', 'building': '建筑' }
    return map[type] || '档案'
}

const filteredResults = computed(() => {
    if (activeTab.value === 'all') return results.value
    return results.value.filter(item => item.type === activeTab.value)
})

const goToDetail = (item) => {
    if (item.type === 'master') router.push(`/master/${item.id}`)
    else if (item.type === 'classic') router.push(`/dianji/${item.id}`)
    else if (item.type === 'building') router.push(`/building/${item.id}`)
}

// 🏮 核心功能：高亮关键字
const highlightText = (text) => {
    if (!text || !currentKeyword.value) return text;
    // 过滤掉正则保留字，防止报错
    const safeKeyword = currentKeyword.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safeKeyword})`, 'gi');
    // 把匹配到的关键字包一层专属高亮样式
    return text.replace(regex, `<span class="text-palace-red font-black bg-palace-red/10 px-1 rounded-sm">$1</span>`);
}

const performSearch = async (keyword) => {
    if (!keyword) return
    currentKeyword.value = keyword
    
    // 🏮 1. 拦截器：先查本地是否已经存过这个词的推演结果
    const cacheKey = `zhl_search_${keyword}`
    const cachedData = sessionStorage.getItem(cacheKey)

    if (cachedData) {
        console.log(`命中缓存：${keyword}，直接秒开，不消耗 AI 额度！`)
        const parsed = JSON.parse(cachedData)
        
        // 直接从缓存恢复状态
        results.value = parsed.results
        aiContent.value = parsed.aiContent
        
        // 瞬间关闭所有 Loading
        loading.value = false
        aiLoading.value = false
        aiFinished.value = true
        drawingLoading.value = false
        fallbackImage.value = '' // 如果你想缓存画的图，也可以一起存进去

        // 触发列表卡片动画
        if (results.value.length > 0) {
            nextTick(() => {
                gsap.to('.result-card', { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' })
            })
        }
        return // 🏮 极其关键：直接 return，彻底阻断下面的所有后端接口请求！
    }

    // --- 下面是原本的请求逻辑（只有没搜过的词才会走到这里） ---
    
    // 重置状态
    loading.value = true
    results.value = []
    aiLoading.value = true
    aiFinished.value = false
    aiContent.value = ''

    // 1. 本地搜索
    // 这里加上 await，确保我们能拿到结果，方便等会儿存缓存
    try {
        const searchRes = await globalSearch(keyword)
        results.value = searchRes.data?.data || searchRes.data || []
        loading.value = false
        if (results.value.length > 0) {
            nextTick(() => {
                gsap.to('.result-card', { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' })
            })
        }
    } catch (e) {
        loading.value = false
    }

    // 2. 触发流式打字机请求
    if (chatAbortController) chatAbortController.abort() 
    chatAbortController = new AbortController()

    try {
        const response = await searchStream(keyword, chatAbortController.signal)
        const reader = response.body.getReader()
        const decoder = new TextDecoder('utf-8')
        
        aiLoading.value = false 

        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            const chunk = decoder.decode(value, { stream: true })
            
            const lines = chunk.split('\n')
            for (const line of lines) {
                if (line.startsWith('data:')) {
                    const dataStr = line.slice(5).trim()
                    if (dataStr === '[DONE]') {
                        aiFinished.value = true
                        break
                    }
                    if (dataStr) {
                        try {
                            const parsed = JSON.parse(dataStr)
                            if (parsed.text) aiContent.value += parsed.text
                        } catch (e) { }
                    }
                }
            }
        }
        aiFinished.value = true
        
        // 🏮 2. 存入缓存：当本地数据库和 AI 都返回完毕后，把它们“快照”下来
        sessionStorage.setItem(cacheKey, JSON.stringify({
            results: results.value,
            aiContent: aiContent.value
        }))

    } catch (error) {
        if (error.name !== 'AbortError') {
            aiContent.value = '智脑推演遇到节点阻碍，未能获取灵感。'
            aiFinished.value = true
        }
    }
}

// 🏮 弹窗打开：发起作画请求
const openDrawingModal = async () => {
    showModal.value = true
    drawingLoading.value = true
    fallbackImage.value = ''

    // 初始化新的中止控制器
    drawAbortController = new AbortController()

    try {
        // 传入中止信号
        const res = await drawImage(currentKeyword.value, drawAbortController.signal)
        const imgUrl = res.url || (res.data && res.data.url)
        if (imgUrl) {
            fallbackImage.value = imgUrl
        }
    } catch (error) {
        // 捕获 Axios Cancel 报错
        if (error.name === 'CanceledError' || error.message === 'canceled') {
            console.log("用户已中止作画请求")
        } else {
            console.error("AI 绘画失败", error)
        }
    } finally {
        drawingLoading.value = false
    }
}

// 🏮 弹窗关闭：中止一切作画请求
const closeDrawingModal = () => {
    showModal.value = false
    if (drawAbortController) {
        drawAbortController.abort() // 立刻砍断网络请求，停止扣费与等待
    }
}

watch(() => route.query.keyword, (newKeyword) => {
    if (newKeyword) {
        activeTab.value = 'all'
        performSearch(newKeyword)
    }
})

onMounted(() => {
    const kw = route.query.keyword
    if (kw) performSearch(kw)
    else loading.value = false
})
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* 🏮 弹窗动效：苹果风平滑缩放 */
.modal-fade-enter-active, .modal-fade-leave-active {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-fade-enter-from, .modal-fade-leave-to {
    opacity: 0;
    transform: scale(0.97);
}

.animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>