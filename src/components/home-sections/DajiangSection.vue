<template>
    <section id="dajiang" class="bg-[#fcfbf9] py-40 relative overflow-hidden">
    <div class="absolute top-20 right-20 text-[20rem] font-serif font-black text-gray-200/80 select-none pointer-events-none leading-none z-0">贰</div>
    
    <div class="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        
        <div class="mb-40 relative">
        <span class="text-palace-red font-serif font-bold tracking-[0.5em] text-sm block mb-4">卷二 · 大匠</span>
        <h2 class="text-5xl md:text-6xl font-serif text-ink-dark font-black">工匠与哲思</h2>
        <div class="w-24 h-[1px] bg-ink-dark/20 mt-8"></div>
        <p class="mt-8 text-water-gray tracking-widest text-sm font-light">从“口传心授”到“精密计算”，致敬中国古代工程学的先行者。</p>
        </div>

        <div v-if="loading" class="min-h-[50vh] flex flex-col items-center justify-center opacity-50">
            <div class="w-10 h-10 border-2 border-palace-red rounded-full border-t-transparent animate-spin mb-4"></div>
            <p class="font-serif tracking-widest">研读匠籍中...</p>
        </div>

        <template v-else-if="masters.length >= 4">
            
            <div class="scientist-block relative min-h-[50vh] flex items-center mb-40 hover-trigger group cursor-pointer" @click="router.push(`/master/${masters[0].id}`)">
                <h3 class="absolute top-[-10%] left-4 md:left-12 text-[12rem] md:text-[18rem] font-serif font-black text-outline z-0 pointer-events-none select-none transition-colors duration-700 group-hover:text-palace-red/15 group-hover:-webkit-text-stroke-transparent">
                    {{ masters[0].name }}
                </h3>
                
                <div class="relative z-10 w-full md:w-7/12 ml-auto">
                <div class="bg-white p-12 md:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-gray-100 transition-transform duration-500 group-hover:-translate-y-2">
                    <div class="flex justify-between items-start mb-4">
                        <span class="text-gold-accent font-bold tracking-widest text-sm block uppercase">{{ masters[0].eraBgText }} · {{ masters[0].nickName || '营造大师' }}</span>
                        <span class="text-palace-red opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0">阅览生平 ↗</span>
                    </div>
                    
                    <h4 class="text-4xl md:text-5xl font-serif font-bold mb-8 text-ink-dark group-hover:text-palace-red transition-colors duration-500 leading-snug flex items-center">
                    <span class="w-1.5 h-8 bg-palace-red mr-5 inline-block rounded-sm opacity-80"></span>
                    {{ masters[0].contribution || '一代宗师' }}
                    </h4>
                    
                    <p class="text-gray-700 leading-loose text-justify font-normal mb-10 text-[15px] line-clamp-4">
                    {{ masters[0].intro || '暂无生平记载。' }}
                    </p>

                    <div class="grid grid-cols-2 gap-8 border-t border-gray-100 pt-8">
                    <div>
                        <p class="text-xs text-water-gray font-bold tracking-widest mb-2 flex items-center">
                        传世著作 
                        <span class="text-[9px] uppercase ml-2 opacity-50 transform translate-y-[1px]">Masterpiece</span>
                        </p>
                        <p class="text-lg font-serif font-bold text-ink-dark">{{ masters[0].masterpiece || '营造绝学' }}</p>
                    </div>
                    <div>
                        <p class="text-xs text-water-gray font-bold tracking-widest mb-2 flex items-center">
                        核心成就 
                        <span class="text-[9px] uppercase ml-2 opacity-50 transform translate-y-[1px]">Contribution</span>
                        </p>
                        <p class="text-lg font-serif font-bold text-ink-dark line-clamp-1">{{ masters[0].contribution || '匠心传世' }}</p>
                    </div>
                    </div>
                    
                </div>
                </div>
            </div>

            <div class="scientist-block relative min-h-[50vh] flex items-center mb-40 hover-trigger group cursor-pointer" @click="router.push(`/master/${masters[1].id}`)">
            <h3 class="absolute top-10 right-[-5%] text-[12rem] md:text-[18rem] font-serif font-black text-outline z-0 pointer-events-none select-none transition-colors duration-700 group-hover:text-gold-accent/15 group-hover:-webkit-text-stroke-transparent">
                {{ masters[1].name }}
            </h3>
            
            <div class="relative z-10 w-full md:w-1/2">
                <div class="relative border-l-[3px] border-gold-accent pl-10 py-6 bg-white/50 backdrop-blur-sm shadow-[20px_0_40px_rgba(0,0,0,0.02)] transition-transform duration-500 group-hover:-translate-y-2">
                <div class="flex justify-between items-start mb-4">
                    <span class="text-palace-red font-bold tracking-widest text-sm block uppercase">{{ masters[1].eraBgText }} · {{ masters[1].nickName || '宗师巨匠' }}</span>
                    <span class="text-gold-accent opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0">阅览生平 ↗</span>
                </div>

                <h4 class="text-4xl md:text-5xl font-serif font-bold mb-8 text-ink-dark group-hover:text-gold-accent transition-colors duration-500 leading-snug">{{ masters[1].contribution || '力学与结构的探索者' }}</h4>
                
                <blockquote class="text-2xl font-serif font-medium text-gray-500 italic mb-8 leading-relaxed">
                    “{{ masters[1].slogan || masters[1].poetry || '大方无隅，大器晚成' }}”
                </blockquote>
                
                <p class="text-gray-700 leading-loose text-justify font-normal text-sm line-clamp-4">
                    {{ masters[1].intro || '历史长河中一位熠熠生辉的营造者。' }}
                </p>
                </div>
            </div>
            </div>

            <div class="scientist-block relative grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mt-20 pt-20 border-t border-ink-dark/10">
            
            <div class="relative hover-trigger group cursor-pointer transition-transform duration-500 hover:-translate-y-2" @click="router.push(`/master/${masters[2].id}`)">
                <div class="absolute -top-10 left-0 text-[8rem] font-serif font-black text-gray-200/60 group-hover:text-palace-red/15 transition-colors duration-500 z-0 select-none">
                    {{ masters[2].eraBgText || '古' }}
                </div>
                <div class="relative z-10 pl-6 border-l-[3px] border-transparent group-hover:border-palace-red transition-colors duration-500">
                <div class="flex items-end justify-between mb-4">
                    <h4 class="text-3xl font-serif font-bold text-ink-dark group-hover:text-palace-red transition-colors duration-500">{{ masters[2].name }}</h4>
                    <span class="text-[10px] text-palace-red font-bold tracking-widest uppercase px-2 py-1 bg-palace-red/10 flex items-center gap-2">
                        {{ masters[2].nickName || '营造大师' }} <span class="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                    </span>
                </div>
                <p class="text-sm text-gray-700 leading-loose font-normal text-justify line-clamp-4">
                    {{ masters[2].intro || '用双手丈量天地，在砖木之间烙印中华古建的灵魂。' }}
                </p>
                </div>
            </div>
            
            <div class="relative hover-trigger group mt-16 md:mt-24 cursor-pointer transition-transform duration-500 hover:-translate-y-2" @click="router.push(`/master/${masters[3].id}`)">
                <div class="absolute -top-10 left-0 text-[8rem] font-serif font-black text-gray-200/60 group-hover:text-gold-accent/15 transition-colors duration-500 z-0 select-none">
                    {{ masters[3].eraBgText || '匠' }}
                </div>
                <div class="relative z-10 pl-6 border-l-[3px] border-transparent group-hover:border-gold-accent transition-colors duration-500">
                <div class="flex items-end justify-between mb-4">
                    <h4 class="text-3xl font-serif font-bold text-ink-dark group-hover:text-gold-accent transition-colors duration-500">{{ masters[3].name }}</h4>
                    <span class="text-[10px] text-gold-accent font-bold tracking-widest uppercase px-2 py-1 bg-gold-accent/10 flex items-center gap-2">
                        {{ masters[3].nickName || '工程先驱' }} <span class="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                    </span>
                </div>
                <p class="text-sm text-gray-700 leading-loose font-normal text-justify line-clamp-4">
                    {{ masters[3].intro || '突破时代的工艺局限，他的每一寸图纸皆是建筑科学的不朽丰碑。' }}
                </p>
                </div>
            </div>

            </div>
        </template>
    </div>
    </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router' // 🏮 引入 router
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 导入你的大匠 API 接口
import { listArtisan } from '@/api/building'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter() // 🏮 实例化 router
const loading = ref(true)
const masters = ref([])

// 核心功能：请求所有大匠，并随机抽取 4 位
const fetchRandomMasters = async () => {
    try {
        const res = await listArtisan({ pageNum: 1, pageSize: 100, status: '0' })
        let allMasters = res.rows || res.data?.rows || res.data || []
        
        // 随机打乱数组顺序 (洗牌算法)
        allMasters = allMasters.sort(() => 0.5 - Math.random())
        
        // 截取前 4 个
        masters.value = allMasters.slice(0, 4)
        
    } catch (error) {
        console.error('随机获取大匠数据失败:', error)
    } finally {
        loading.value = false
        // 必须等 DOM 渲染完真实数据后，再初始化 GSAP 动画！
        await nextTick()
        if (masters.value.length >= 4) {
            initAnimations()
        }
    }
}

onMounted(() => {
    fetchRandomMasters()
})

// 原封不动的 GSAP 动画代码
const initAnimations = () => {
    // 顶部标题动画
    gsap.fromTo(".mb-40.relative > *", 
        { y: 50, opacity: 0 }, 
        {
            y: 0, 
            opacity: 1,        
            duration: 1.2, 
            stagger: 0.15, 
            ease: "power3.out",
            scrollTrigger: { 
                trigger: "#dajiang", 
                start: "top 80%" 
            }
        }
    )

    gsap.utils.toArray('.scientist-block').forEach((block) => {
        // 背景大字视差
        gsap.to(block.querySelector('.text-outline, .text-gray-200\\/80, .text-gray-200\\/60'), {
            y: -60, ease: "none",
            scrollTrigger: { trigger: block, start: "top bottom", end: "bottom top", scrub: true }
        })
        
        // 卡片浮现
        const card = block.querySelector('.z-10')
        if (card) {
            gsap.fromTo(card, 
                { y: 60, opacity: 0 }, 
                {
                    y: 0, 
                    opacity: 1,        
                    duration: 1.2, 
                    ease: "power3.out",
                    scrollTrigger: { trigger: block, start: "top 85%" }
                }
            )
        }
    })
}
</script>

<style scoped>
/* 描边样式 */
.text-outline {
    color: transparent;
    -webkit-text-stroke: 2px rgba(44, 44, 44, 0.15); 
}

.-webkit-text-stroke-transparent {
    -webkit-text-stroke-color: transparent;
}

/* 防越界截断 */
.line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>