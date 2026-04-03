<template>
    <div class="min-h-screen w-full bg-[#fcfaf5] text-[#111111] overflow-x-hidden selection:bg-palace-red selection:text-white">
    
    <div class="fixed inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(#000000 1px, transparent 1px); background-size: 30px 30px;"></div>

    <section class="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
        <span class="text-[35vw] font-serif translate-y-20">魂</span>
        </div>

        <div class="relative z-10 text-center flex flex-col items-center pt-24">
        <p class="text-palace-red font-serif tracking-[1em] text-xs mb-8 uppercase animate-pulse">Philosophy & Spirit</p>
        <h1 class="text-7xl md:text-9xl font-serif tracking-[0.2em] mb-12 text-[#111] drop-shadow-sm">
            文脉 <span class="opacity-30">· 魂魄</span>
        </h1>
        <div class="w-[1px] h-24 bg-gradient-to-b from-palace-red to-transparent mb-12"></div>
        <p class="text-xl md:text-2xl font-serif tracking-widest text-gray-700 font-light max-w-3xl leading-loose text-justify text-last-center px-6">
            西方建筑，是人对自然的征服，是用石头刺破苍穹的狂傲；<br>
            中国古建，是人与天地的和解，是用木头写给岁月的诗篇。<br>
            <span class="block mt-6 text-palace-red italic">器物终会腐朽，但藏在榫卯与飞檐里的中国智慧，万古长青。</span>
        </p>
        </div>
    </section>

    <section class="min-h-[80vh] w-full flex items-center justify-center relative px-6 md:px-24 py-32">
        <div class="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
        <div class="relative aspect-square flex justify-center items-center group">
            <div class="absolute inset-4 border border-black/5 rotate-45 group-hover:rotate-0 transition-transform duration-1000"></div>
            <div class="absolute inset-0 border border-black/5"></div>
            <div class="w-3/4 h-3/4 rounded-full overflow-hidden shadow-2xl z-10 border border-palace-red/10">
            <img src="https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=800" class="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100" />
            </div>
        </div>

        <div class="space-y-8">
            <h2 class="text-palace-red font-serif tracking-[0.5em] text-sm uppercase flex items-center gap-3">
            <span class="w-6 h-[1px] bg-palace-red"></span> 01 / 顺应天道
            </h2>
            <h3 class="text-4xl md:text-5xl font-serif tracking-widest leading-tight text-[#111]">不争之争<br>敬畏宇宙的留白</h3>
            <p class="text-gray-600 text-[15px] leading-loose tracking-widest text-justify font-light whitespace-pre-line border-l-2 border-palace-red/20 pl-6">
            中国古建的最高级之处，在于它懂得“退让”。它不追求刺破天空的绝对高度，而是将屋顶做成如鸟翼般舒展的曲线，去迎合风的走向、雨的轨迹。

            无论是紫禁城浩瀚的广场，还是江南四合院四方天井，古人永远将最核心的中心位置留给天空与大地。人处于其中，知晓四季更迭，感受雨雪落花。这种“天人合一”的哲学，是中国人骨子里对自然的敬畏与共生。
            </p>
        </div>
        </div>
    </section>

    <section class="min-h-[80vh] w-full relative px-6 md:px-24 py-32 bg-white/40 border-y border-black/5">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row-reverse gap-16 md:gap-24 items-center">
        
        <div class="w-full md:w-1/2 relative group">
            <div class="aspect-[4/3] bg-[#e8e4d3] shadow-lg overflow-hidden relative translate-x-4 translate-y-4">
            <img src="https://images.unsplash.com/photo-1543013327-04669fec8935?q=80&w=800" class="w-full h-full object-cover mix-blend-color-burn opacity-40 grayscale contrast-150" />
            <div class="absolute inset-0 border-[1px] border-black/20 m-4 border-dashed"></div>
            <p class="absolute top-6 left-6 font-mono text-[10px] tracking-widest text-palace-red">WISDOM OF SUNMAO</p>
            </div>
            <div class="absolute -top-8 -left-8 md:-left-16 w-3/4 aspect-square bg-white shadow-2xl overflow-hidden border-2 border-white group-hover:-translate-y-4 transition-transform duration-700">
            <img src="https://images.unsplash.com/photo-1582650517303-b42616d56f8e?q=80&w=800" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
        </div>

        <div class="w-full md:w-1/2 space-y-8">
            <h2 class="text-palace-red font-serif tracking-[0.5em] text-sm uppercase flex items-center gap-3">
            <span class="w-6 h-[1px] bg-palace-red"></span> 02 / 阴阳相生
            </h2>
            <h3 class="text-4xl md:text-5xl font-serif tracking-widest leading-tight text-[#111]">不着一钉<br>尽得风流的中庸之道</h3>
            
            <div class="space-y-6 text-gray-600 text-[15px] leading-loose tracking-widest text-justify font-light border-l-2 border-palace-red/20 pl-6">
            <p>
                如果说西方建筑的连接是钉死与锁死（对抗），那中国建筑的连接就是<strong class="text-palace-red font-serif">包容与化解</strong>。
            </p>
            <p>
                中国匠人从不使用破坏木材的铁钉，而是凭借“榫”与“卯”的一凸一凹。它们互为退让，又死死咬合，这正是太极图里“阴阳相生”的物理具象化。当地震来临，榫卯结构允许建筑产生微小的位移与扭转，在“摇晃”中把毁灭性的地震波消耗殆尽，做到“墙倒屋不塌”。
            </p>
            <p class="italic text-gray-500">
                这不是简单的工程学，这是老子《道德经》里“天下之至柔，驰骋天下之至坚”的顶级东方智慧。
            </p>
            </div>
        </div>
        </div>
    </section>

    <section class="min-h-[80vh] w-full flex flex-col justify-center px-6 md:px-12 relative py-32">
        <div class="text-center mb-16">
        <h2 class="text-palace-red font-serif tracking-[0.5em] text-sm uppercase mb-4">03 / 秩序与礼乐</h2>
        <h3 class="text-3xl md:text-4xl font-serif tracking-widest text-[#111]">映射宇宙的东方图腾</h3>
        <p class="text-gray-500 tracking-widest font-light mt-6 max-w-2xl mx-auto">古建的色彩，绝非随心所欲的涂抹，而是将金、木、水、火、土的宇宙法则，编织成了一张庞大而严密的文明网络。</p>
        </div>

        <div class="w-full max-w-7xl mx-auto h-[50vh] md:h-[60vh] flex gap-2 md:gap-4 group">
        <div 
            v-for="(color, index) in elements" :key="index"
            class="relative flex-1 hover:flex-[4] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden cursor-pointer rounded-xl bg-cover bg-center border border-black/5 shadow-inner"
            :style="{ backgroundImage: `url(${color.img})` }"
        >
            <div class="absolute inset-0 transition-opacity duration-700 opacity-95 group-hover:opacity-40" :style="{ backgroundColor: color.hex }"></div>
            <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-white mix-blend-overlay"></div>

            <div class="absolute inset-0 p-6 md:p-10 flex flex-col justify-end pointer-events-none overflow-hidden">
            <div class="w-full flex justify-center pb-4 transition-opacity duration-300 group-hover:opacity-0" style="writing-mode: vertical-rl; text-orientation: mixed;">
                <h4 class="font-serif text-3xl tracking-[0.4em] text-[#111]">{{ color.name }}</h4>
            </div>
            
            <div class="absolute bottom-10 left-10 w-[400px] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100 p-8 rounded-xl bg-white/95 backdrop-blur-sm shadow-2xl border border-black/5">
                <p class="text-palace-red font-serif text-xs tracking-widest mb-3 uppercase flex items-center gap-2">
                <span class="w-4 h-[1px] bg-palace-red"></span> {{ color.element }}之德
                </p>
                <h5 class="text-4xl font-serif tracking-widest text-[#111] mb-6">{{ color.fullName }}</h5>
                <p class="text-sm leading-loose tracking-widest text-gray-700 font-light text-justify">
                {{ color.desc }}
                </p>
            </div>
            </div>
        </div>
        </div>
    </section>

    <section class="w-full relative px-6 md:px-24 py-40 bg-[#111] text-[#fcfaf5] overflow-hidden">
        <div class="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-palace-red/40 via-[#0a0a0a] to-[#0a0a0a]"></div>
        
        <div class="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-palace-red/30 to-transparent"></div>
        <div class="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

        <div class="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        <h2 class="text-palace-red font-serif tracking-[0.8em] text-sm uppercase flex items-center gap-4 justify-center mb-12">
            <span class="w-12 h-[1px] bg-palace-red"></span> 04 / 薪火相传 <span class="w-12 h-[1px] bg-palace-red"></span>
        </h2>
        
        <h3 class="text-5xl md:text-7xl font-serif tracking-widest leading-tight mb-20 drop-shadow-lg text-white">
            我们不是在守护灰烬<br>
            <span class="text-gray-400 text-4xl md:text-5xl block mt-6">而是在接力传递那一束火光</span>
        </h3>

        <div class="space-y-12 text-base md:text-lg text-gray-300 leading-loose tracking-widest font-light text-justify md:text-left max-w-4xl mx-auto border-l border-palace-red/30 pl-8 md:pl-12">
            
            <p>
            <strong class="text-white font-serif text-xl">为什么要回望古建？</strong><br>
            因为那里藏着我们之所以为中国人的精神底色。在千城一面的钢筋水泥丛林里，那些斑驳的斗拱、褪色的彩画，是我们民族在这个星球上存在过的独特印记，是我们抵御文化虚无的锚点。
            </p>

            <p>
            <strong class="text-white font-serif text-xl">匠心不死，文脉不断。</strong><br>
            从李诫的《营造法式》到样式雷的图纸，中国大匠用一种近乎执拗的信仰，将脆弱的木材，营造成了抵御千年的丰碑。真正的传承，绝不是把古建锁在博物馆的玻璃罩里凭吊，而是让那种<span class="text-palace-red">“择一事，终一生”</span>的极致精神，流淌进现代青年的血液。
            </p>

            <p class="text-xl md:text-2xl font-serif text-white italic pt-8 border-t border-white/10 mt-12">
            “筑理”所做的，正是跨越时空的握手。<br>
            我们用数字化的代码去重新丈量五千年的梁柱。从实体到像素，从过去到未来，让古老的心跳在数字宇宙中，生生不息。
            </p>
        </div>

        <button @click="$router.push('/')" class="group relative px-12 py-5 mt-24 overflow-hidden border border-white/20 bg-white/5 hover:border-palace-red transition-colors duration-500">
            <div class="absolute inset-0 w-0 bg-palace-red group-hover:w-full transition-all duration-500 ease-out z-0"></div>
            <span class="relative z-10 text-xs tracking-[0.4em] font-serif group-hover:text-white transition-colors">致敬大匠 · 返回首页</span>
        </button>
        </div>
        
    </section>

    </div>
</template>

<script setup>
import { ref } from 'vue'

const elements = [
    { name: '赤', hex: '#9b2e2e', element: '火', meaning: 'Vitality', fullName: '生生不息之火', desc: '不只是皇权的象征，更是生命力的图腾。红色在阴阳中属至阳，古人借此祈求家族与文明的繁盛不衰。', img: 'https://images.unsplash.com/photo-1543013327-04669fec8935?w=600' },
    { name: '黄', hex: '#e6b422', element: '土', meaning: 'Central', fullName: '厚德载物之土', desc: '土居中央，滋养万物。黄色不仅代表权力的中心，更承载着中华农耕民族对土地最深沉的眷恋与感恩。', img: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=600' },
    { name: '青', hex: '#2d5150', element: '木', meaning: 'Nature', fullName: '万物竞发之木', desc: '东方之木，代表着生长与希望。古建中的青绿彩画，是匠人试图将永恒的春天，永远留在屋檐之下。', img: 'https://images.unsplash.com/photo-1582650517303-b42616d56f8e?w=600' },
    { name: '白', hex: '#d6d6d6', element: '金', meaning: 'Purity', fullName: '刚正不阿之金', desc: '坚硬的汉白玉托起整座大殿。它不染纤尘的洁白，寓意着礼法的刚正与不可侵犯的道德秩序。', img: 'https://images.unsplash.com/photo-1582650726715-db14757c23bc?w=600' },
    { name: '黑', hex: '#111111', element: '水', meaning: 'Wisdom', fullName: '上善若水之玄', desc: '黑色是最深沉的智慧。江南粉墙黛瓦里，藏着中国文人“知白守黑”、不与世争的禅意与豁达。', img: 'https://images.unsplash.com/photo-1529982412356-901cc3a363bc?w=600' }
]
</script>

<style scoped>
.vertical-text {
    writing-mode: vertical-rl;
    text-orientation: mixed;
}
</style>