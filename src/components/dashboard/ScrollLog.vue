<template>
<div class="h-full w-full font-serif overflow-hidden relative group bg-[#fcfaf5]/50">
    <div class="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#fcfaf5] to-transparent z-10 pointer-events-none"></div>
    
    <div class="absolute left-1 top-0 bottom-0 w-[1px] bg-palace-red/10 border-l border-dashed border-palace-red/20 z-10"></div>

    <div ref="scrollRef" class="h-full overflow-y-auto no-scrollbar space-y-8 py-8 px-4 scroll-smooth">
    <div v-for="(log, index) in logs" :key="index" 
        class="flex flex-col gap-3 relative animate-fade-in">
        
        <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
            <span class="bg-palace-red/5 text-palace-red text-[10px] px-2 py-0.5 border border-palace-red/30 rounded-sm font-bold tracking-widest shadow-[2px_2px_0px_rgba(155,46,46,0.1)]">
            {{ log.tag }}
            </span>
            <div class="h-[1px] w-8 bg-palace-red/20"></div>
        </div>
        <span class="font-mono text-[10px] text-gray-400 tracking-tighter italic">{{ log.time }}</span>
        </div>

        <div class="text-[#333] text-sm md:text-base leading-[1.8] text-justify tracking-wide indent-4 border-b border-dashed border-gray-100 pb-4">
        {{ log.content }}
        </div>

        <div class="absolute -right-2 -bottom-1 opacity-10 text-[8px] rotate-90 pointer-events-none uppercase tracking-[0.5em]">
        TianKhu_Archive
        </div>
    </div>
    </div>

    <div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#fcfaf5] to-transparent z-10 pointer-events-none"></div>
</div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const scrollRef = ref(null)
const logs = ref([
{ tag: '营造法式', time: '10:02:15', content: '“凡构屋之制，皆以材为祖。” 宋代李诫在《营造法式》中确立了模数制的巅峰，规定了八等材的规格，使中国建筑实现了千年前的“标准化”生产。' },
{ tag: '斗拱之美', time: '10:45:30', content: '故宫角楼拥有九梁十八柱、七十二条脊，其结构之精巧被誉为“巧夺天工”。数字化测绘显示，其构件契合度偏差不足两毫米。' },
{ tag: '工匠精神', time: '11:20:08', content: '样式雷家族八代执掌清代内廷建筑设计，留下了无数精美的“烫样”模型。这些模型不仅是缩影，更是中国古代三维建模的先行者。' }
])

const pool = [
{ tag: '色彩密码', content: '宫墙红由矾红与朱砂调制，随光线阴晴而变幻。在数字孪生系统中，我们通过实时算法捕捉这种随紫外线强度变化的动态色彩。' },
{ tag: '榫卯契合', content: '中国古建筑不发一钉，全靠木件之间的契合抵御千年的震颤。燕尾榫、馒头榫... 每一种连接都蕴含着中国人的处世哲学。' },
{ tag: '屋顶艺术', content: '歇山顶侧面的“悬鱼”，在保护木架结构的同时，寄托了如鱼得水的吉祥祈愿。这种“实用与美学”的统一，是大木作的灵魂。' },
{ tag: '梁架力学', content: '大木架结构的“举折”技术，通过逐层垫高梁头，形成了中国建筑特有的优美屋顶曲线，同时完美解决了排水与采光的矛盾。' }
]

onMounted(() => {
setInterval(() => {
    const item = pool[Math.floor(Math.random() * pool.length)]
    const now = new Date()
    const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false }) + ':' + String(now.getMilliseconds()).padStart(2, '0').slice(0, 2)
    
    logs.value.push({ ...item, time: timeStr })
    
    // 保持列表长度，防止内存溢出
    if (logs.value.length > 8) logs.value.shift()
    
    // 平滑滚动到底部
    nextTick(() => {
    if (scrollRef.value) {
        scrollRef.value.scrollTo({
        top: scrollRef.value.scrollHeight,
        behavior: 'smooth'
        })
    }
    })
}, 6000)
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

@keyframes fade-in {
from { opacity: 0; transform: translateY(10px); }
to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
animation: fade-in 0.8s ease-out forwards;
}
</style>