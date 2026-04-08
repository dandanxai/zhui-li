<template>
    <section id="dianji" class="book-section relative bg-[#e3ded5] border-t border-ink-dark/10 h-[300vh]">
    
    <div class="fixed bottom-10 left-10 z-20 pointer-events-none book-title opacity-0 mix-blend-difference text-paper-bg">
        <span class="text-gold-accent font-serif tracking-[0.5em] text-xs block mb-2">卷三 · 典籍</span>
        <h2 class="text-2xl font-serif">智慧的传承</h2>
    </div>

    <div class="center-book-wrapper absolute top-0 left-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
        <div class="dynamic-cover absolute text-[35vw] font-serif text-ink-dark opacity-[0.03] select-none writing-vertical-rl book-bg-text transition-opacity duration-300">
            {{ currentBgText }}
        </div>
        
        <div class="book-model relative w-[300px] h-[450px] shadow-[0_40px_80px_rgba(0,0,0,0.2)] bg-[#f4f0e6] border border-[#d6cfb8]">
            <div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#d9d4c7] to-[#f4f0e6] border-r border-ink-dark/10"></div>
            <div class="absolute right-4 top-0 bottom-0 w-2 flex flex-col justify-evenly py-8">
                <div class="w-5 h-[2px] bg-ink-dark"></div><div class="w-5 h-[2px] bg-ink-dark"></div>
                <div class="w-5 h-[2px] bg-ink-dark"></div><div class="w-5 h-[2px] bg-ink-dark"></div>
            </div>
            <div class="absolute left-6 -top-3 w-8 h-20 shadow-md flex items-end justify-center pb-2 transition-colors duration-500 z-10" :class="currentColor">
                <span class="text-white text-xs font-serif">典籍</span>
            </div>
            <div class="w-full h-full p-12 flex justify-center items-center">
                <div class="border border-ink-dark p-2 w-full h-full">
                    <div class="border border-ink-dark w-full h-full flex justify-center items-center relative bg-[#faf8f5]">
                        <h4 class="dynamic-cover text-4xl md:text-5xl font-serif writing-vertical-rl tracking-[0.4em] text-ink-dark drop-shadow-sm transition-opacity duration-300">
                            {{ currentBookTitle }}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="absolute top-0 left-0 w-full z-10 pointer-events-none pt-[20vh] pb-[30vh]" v-if="bookData.length > 0">
        
        <div v-for="(book, index) in bookData" :key="book.id"
             class="scroll-card min-h-[70vh] flex items-center px-6 md:px-[15%]"
             :class="{ 'justify-end mt-[5vh]': index === 1, 'mt-[5vh]': index === 2 }">
            
            <div class="card-content w-full md:w-[45%] p-10 md:p-14 shadow-2xl pointer-events-auto border-t-4 hover-trigger cursor-pointer group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                 :class="[
                    index === 1 ? 'bg-ink-dark text-paper-bg border-gold-accent' : 
                    index === 0 ? 'bg-paper-bg/95 border-palace-red' : 'bg-paper-bg/95 border-[#8a979e]'
                 ]"
                 @click="router.push(`/dianji/${book.id}`)">
                
                <div class="flex justify-between items-start mb-4">
                    <span class="text-xs tracking-[0.3em] block uppercase"
                          :class="index === 0 ? 'text-palace-red' : index === 1 ? 'text-gold-accent' : 'text-[#8a979e]'">
                        {{ book.dynasty }} {{ book.author }} · {{ book.category }}
                    </span>
                    <span class="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0"
                          :class="index === 1 ? 'text-gold-accent' : 'text-palace-red'">
                        ↗
                    </span>
                </div>
                
                <h3 class="text-4xl font-serif mb-6 transition-colors" :class="index === 1 ? '' : 'text-ink-dark group-hover:text-palace-red'">
                    《{{ book.title }}》
                </h3>
                
                <p class="leading-loose text-justify font-light text-lg line-clamp-4" 
                   :class="index === 1 ? 'text-gray-400' : 'text-gray-700'">
                    {{ book.desc }}
                </p>
                
            </div>
        </div>

    </div>
    </section>
</template>

<script setup>
import { onMounted, ref, nextTick, onUnmounted } from 'vue'
import { useRouter } from 'vue-router' // 🏮 引入 router
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { listClassic } from '@/api/building'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter() // 🏮 实例化 router
const currentBookTitle = ref('')
const currentBgText = ref('')
const currentColor = ref('bg-palace-red')
const bookData = ref([])
const colorMap = ['bg-palace-red', 'bg-gold-accent', 'bg-[#8a979e]']

onMounted(async () => {
    try {
        const res = await listClassic({ pageNum: 1, pageSize: 100, status: '0' })
        const allBooks = res.rows || res.data?.rows || res.data || []
        
        const sortedBooks = allBooks.sort((a, b) => a.orderNum - b.orderNum)
        // 从索引 3（即第4项）开始截取，截取到索引 6 之前（不包含索引 6，即截取到第6项）
        const lastThreeBooks = sortedBooks.slice(3, 6)

        bookData.value = lastThreeBooks.map((item, index) => {
            return {
                id: item.id,
                title: item.title,
                bg: item.title ? item.title.substring(0, 2) : '典籍',
                color: colorMap[index] || colorMap[0],
                dynasty: item.dynasty || '未知',
                author: item.author || '佚名',
                category: item.category || '营造专著',
                desc: item.spiritDetail || item.description || '暂无详细描述'
            }
        })

        if (bookData.value.length > 0) {
            currentBookTitle.value = bookData.value[0].title
            currentBgText.value = bookData.value[0].bg
            currentColor.value = bookData.value[0].color
        }

    } catch (error) {
        console.error('获取典籍最后三条数据失败', error)
    }

    await nextTick()
    setTimeout(() => {
        initAnimations()
    }, 400)
})

const initAnimations = () => {
    ScrollTrigger.create({
        trigger: ".book-section",
        start: "top top",         
        end: "bottom bottom",     
        pin: ".center-book-wrapper", 
        pinSpacing: false         
    })

    gsap.from(".book-model", {
        y: 100, 
        opacity: 0, 
        duration: 1.5, 
        ease: "power3.out",
        scrollTrigger: { 
            trigger: ".book-section", 
            start: "top 80%" 
        }
    })

    gsap.fromTo(".book-title", 
        { y: 30, opacity: 0 },
        { 
            y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: ".book-section", start: "top center", end: "bottom center", toggleActions: "play reverse play reverse" }
        }
    )

    gsap.fromTo(".book-model", 
        { rotation: -8, scale: 1 }, 
        {
            rotation: 8,            
            scale: 1.1,             
            ease: "none",
            scrollTrigger: { 
                trigger: ".book-section", 
                start: "top bottom", 
                end: "bottom top", 
                scrub: true 
            }
        }
    )
    
    gsap.to(".book-bg-text", {
        yPercent: -100, ease: "none",
        scrollTrigger: { trigger: ".book-section", start: "top bottom", end: "bottom top", scrub: true }
    })

    gsap.utils.toArray('.scroll-card').forEach((card, index) => {
        gsap.fromTo(card.querySelector('.card-content'), 
            { y: 150 }, 
            { y: -150, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } }
        )

        ScrollTrigger.create({
            trigger: card,
            start: "top 50%", 
            end: "bottom 50%",
            onEnter: () => changeBook(index),
            onEnterBack: () => changeBook(index)
        })
    })

    ScrollTrigger.refresh()
}

const changeBook = (index) => {
    if (!bookData.value[index]) return;
    if (currentBookTitle.value === bookData.value[index].title) return;

    gsap.killTweensOf('.dynamic-cover');

    gsap.to('.dynamic-cover', {
        opacity: 0, 
        duration: 0.2, 
        onComplete: () => {
            currentBookTitle.value = bookData.value[index].title
            currentBgText.value = bookData.value[index].bg
            currentColor.value = bookData.value[index].color
            
            gsap.to('h4.dynamic-cover', { opacity: 1, duration: 0.3 })
            gsap.to('div.book-bg-text.dynamic-cover', { opacity: 0.08, duration: 0.3 })
        }
    })
}

onUnmounted(() => {
    ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<style scoped>
.writing-vertical-rl {
    writing-mode: vertical-rl;
    text-orientation: upright;
}
.mix-blend-difference {
    mix-blend-mode: difference;
}
.line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>