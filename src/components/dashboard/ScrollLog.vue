<template>
    <div class="h-full w-full font-serif text-[11px] overflow-hidden relative group">
    
    <div class="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#fcfaf5] to-transparent z-10 pointer-events-none"></div>

    <div ref="scrollRef" class="h-full overflow-y-auto scroll-smooth no-scrollbar space-y-5 pb-12 pt-4">
        <div v-for="(log, index) in logs" :key="index" 
            class="flex flex-col gap-2 border-l border-palace-red/20 pl-4 py-1 hover:border-palace-red transition-colors duration-300">
        <div class="flex justify-between items-center text-[9px] tracking-widest">
            <span class="text-palace-red bg-palace-red/5 px-1 py-0.5 border border-palace-red/10">{{ log.tag }}</span>
            <span class="font-mono opacity-30">{{ log.time }}</span>
        </div>
        <div class="text-gray-600 leading-relaxed text-justify">{{ log.content }}</div>
        </div>
    </div>

    <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fcfaf5] to-transparent z-10 pointer-events-none"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const scrollRef = ref(null)
const logs = ref([
    { tag: '#营造法式', time: '10:02', content: '“凡构屋之制，皆以材为祖。” 宋代李诫在《营造法式》中确立了模数制的巅峰，规定了八等材的规格。' },
    { tag: '#斗拱之美', time: '10:45', content: '故宫角楼拥有九梁十八柱、七十二条脊，其结构之精巧被誉为“巧夺天工”，是数字化还原的重点。' },
    { tag: '#色彩密码', time: '11:20', content: '宫墙的红色并非单一色值，而是由“矾红”与“朱砂”调制，随光线阴晴而变幻，承载着厚重的历史感。' },
    { tag: '#榫卯结构', time: '12:05', content: '燕尾榫、馒头榫、透榫... 中国建筑不发一钉，全靠木件之间的契合抵御千年的震颤。' }
])

const pool = [
    { tag: '#匠人精神', content: '样式雷家族八代执掌清代内廷建筑设计，留下了无数精美的“烫样”模型。' },
    { tag: '#地域特色', content: '徽派建筑的马头墙不仅是美学设计，更具备实用的防火隔断功能。' },
    { tag: '#屋顶艺术', content: '歇山顶侧面的“博风板”与“悬鱼”，在保护檩头的同时，寄托了如鱼得水的吉祥祈愿。' },
    { tag: '#数字传承', content: '通过激光扫描，我们能精确还原梁架在重力作用下经历数百年的微小形变。' }
]

onMounted(() => {
    setInterval(() => {
    const item = pool[Math.floor(Math.random() * pool.length)]
    logs.value.push({ ...item, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) })
    if (logs.value.length > 15) logs.value.shift()
    
    // 实现自动平滑滚动
    nextTick(() => {
        if (scrollRef.value) {
        scrollRef.value.scrollTo({
            top: scrollRef.value.scrollHeight,
            behavior: 'smooth'
        })
        }
    })
    }, 2000)
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>