<template>
  <div class="min-h-screen bg-[#fcfaf5] text-[#111] selection:bg-palace-red selection:text-white font-serif overflow-x-hidden">
      
      <nav class="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center mix-blend-difference pointer-events-none">
          <button @click="$router.back()" class="pointer-events-auto text-paper-bg hover:text-palace-red transition-colors flex items-center gap-4 group">
              <span class="group-hover:-translate-x-2 transition-transform duration-500">←</span>
              <span class="tracking-[0.4em] text-xs font-bold">归卷 BACK</span>
          </button>
      </nav>
  
      <div v-if="loading" class="h-screen flex items-center justify-center">
          <span class="text-palace-red font-serif tracking-[0.5em] animate-pulse">展卷中...</span>
      </div>
  
      <template v-else>
          <header class="relative w-full h-[75vh] flex items-center justify-center overflow-hidden bg-[#e8e4d3]">
              <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 30px 30px;"></div>
              
              <div class="relative z-10 flex flex-col items-center text-center reveal-up px-6">
                  <span class="text-palace-red tracking-[0.8em] text-[10px] md:text-xs uppercase font-black mb-8 border border-palace-red/30 px-4 py-1">{{ book.category }}</span>
                  <div class="relative">
                      <div class="absolute -left-12 -top-16 text-8xl text-black/5 font-black select-none pointer-events-none">典</div>
                      <h1 class="text-6xl md:text-8xl font-black tracking-[0.3em] mb-6 drop-shadow-sm text-[#000]">{{ book.title }}</h1>
                  </div>
                  <p class="text-lg md:text-2xl text-gray-600 tracking-[0.5em] mt-2 font-bold">{{ book.dynasty }} · {{ book.author }}</p>
              </div>
          </header>
  
          <main class="max-w-6xl mx-auto px-6 py-24 md:py-32">
              
              <section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-32 md:mb-48 items-center reveal-up">
                  <div class="md:col-span-5 relative hidden md:block">
                      <div class="absolute -left-10 -top-10 text-[12rem] text-palace-red/5 font-serif leading-none select-none">魂</div>
                      <div class="aspect-[3/4] bg-white p-4 shadow-2xl rotate-[-2deg] transition-transform hover:rotate-0 duration-700 relative z-10 border border-gray-100">
                          <img :src="book.coverImg" class="w-full h-full object-cover grayscale opacity-90" />
                      </div>
                  </div>
                  <div class="md:col-span-7 space-y-10">
                      <div class="flex items-center gap-4">
                          <div class="w-12 h-[2px] bg-palace-red"></div>
                          <h2 class="text-3xl font-black tracking-widest text-[#000]">文化之魂 · 哲思</h2>
                      </div>
                      <p class="text-xl md:text-2xl leading-[2.2] tracking-widest text-[#222] font-bold text-justify italic border-l-4 border-palace-red/30 pl-6 md:pl-8">
                          {{ book.spiritSummary }}
                      </p>
                      <div class="text-[15px] md:text-[16px] leading-[2.4] tracking-widest text-gray-700 text-justify font-medium">
                          {{ book.spiritDetail }}
                      </div>
                  </div>
              </section>
  
              <section v-if="parsedImpacts.length" class="mb-32 md:mb-48 relative bg-white p-10 md:p-20 border border-black/5 shadow-sm overflow-hidden reveal-up">
                  <div class="absolute right-0 top-0 text-[10rem] md:text-[15rem] text-black/[0.02] font-black leading-none translate-x-1/4 -translate-y-1/4">功</div>
                  
                  <div class="relative z-10 max-w-4xl mx-auto">
                      <div class="flex flex-col items-center mb-16 text-center">
                          <span class="text-xs text-palace-red font-bold tracking-[0.6em] mb-4 uppercase">Historical Impact</span>
                          <h2 class="text-3xl md:text-4xl font-black tracking-[0.2em] text-[#000]">乱世孤本 · 时代重器</h2>
                      </div>
                      
                      <div class="space-y-12">
                          <div v-for="(impact, i) in parsedImpacts" :key="i" class="flex flex-col md:flex-row gap-4 md:gap-8 group">
                              <div class="text-palace-red font-serif italic text-4xl opacity-30 group-hover:opacity-100 transition-opacity">0{{ i+1 }}</div>
                              <div class="pt-2">
                                  <h4 class="text-xl font-black mb-4 tracking-widest text-[#111]">{{ impact.title }}</h4>
                                  <p class="text-[15px] leading-loose text-gray-600 tracking-widest text-justify">{{ impact.desc }}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
  
              <section class="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center reveal-up">
                  <div class="space-y-10 order-2 md:order-1">
                      <div class="flex items-center gap-4">
                          <div class="w-12 h-[2px] bg-palace-red"></div>
                          <h2 class="text-3xl font-black tracking-widest text-[#000]">后世影响 · 传承</h2>
                      </div>
                      <div class="text-[15px] md:text-[16px] leading-[2.4] tracking-widest text-gray-700 font-medium space-y-6 text-justify">
                          <p class="font-black text-[18px] text-[#111]">{{ book.heritageHighlight }}</p>
                          <p>{{ book.heritageText }}</p>
                      </div>
                      <div class="pt-10">
                          <div class="p-6 bg-[#111] text-white flex items-center justify-between shadow-xl">
                              <span class="text-[10px] tracking-[0.5em] opacity-60 uppercase font-bold">Dianji Seal</span>
                              <span class="text-sm font-black tracking-widest">华夏文明 · 营造基因</span>
                          </div>
                      </div>
                  </div>
                  
                  <div class="order-1 md:order-2 hidden md:block">
                      <div class="aspect-square relative overflow-hidden group border border-gray-200 p-2 bg-white">
                          <img :src="book.manuscriptImg || book.coverImg" class="w-full h-full object-cover grayscale transition-transform duration-[2s] group-hover:scale-105" />
                          <div class="absolute inset-0 bg-palace-red/5 mix-blend-multiply"></div>
                      </div>
                  </div>
              </section>
          </main>
      </template>
  </div>
</template>
  
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import gsap from 'gsap';
// 如果有后端接口，在这里引入 import { getDianji } from '@/api/building/dianji'

const route = useRoute();
const loading = ref(true);
const book = ref({});

// 安全解析 JSON
const parsedImpacts = computed(() => {
    try {
        return book.value.impactJson ? JSON.parse(book.value.impactJson) : [];
    } catch (e) {
        console.error("JSON解析失败", e);
        return [];
    }
});

// 模拟获取数据 (后期可替换为 Axios 真实接口)
const fetchBookDetail = (id) => {
    // 模拟后端返回的数据格式
    const mockData = {
        id: id,
        title: '考工记',
        dynasty: '先秦',
        author: '佚名',
        category: '都城规制',
        spiritSummary: '“匠人营国，方九里，旁三门”——这不仅是城市的刻度，更是宗法礼制的空间具象。',
        spiritDetail: '《考工记》诞生于礼崩乐坏的春秋战国，先贤试图用严密的尺寸与对称的空间来重建社会秩序。书中的“匠人”篇，将宇宙观、阴阳五行与皇权至上深度绑定，让建筑成为了统治者教化万民的立体图腾。它所展现的“择中而立”哲学，深深刻入了中国人的基因。',
        impactJson: '[{"title":"奠定中国都城终极范式","desc":"其记载的九经九纬、左祖右社格局，直接成为了此后三千年历代都城建设的绝对法理。"},{"title":"礼制与空间的初次融合","desc":"让建筑脱离了纯粹的遮风挡雨功能，上升为国家意识形态的物质载体。"}]',
        heritageHighlight: '它是华夏文明在营建领域的“创世记”。',
        heritageText: '如果没有《考工记》，北京中轴线的壮美便无从谈起。它跨越两千多年，不仅指导了古代工匠，更在今天成为了世界城市规划史上独一无二的东方智慧标杆。',
        coverImg: 'https://images.unsplash.com/photo-1599408031306-035985043812?w=800',
        manuscriptImg: 'https://images.unsplash.com/photo-1599408031306-035985043812?w=800'
    };
    
    setTimeout(() => {
        book.value = mockData;
        loading.value = false;
        
        // 数据加载完后执行进场动画
        setTimeout(() => {
            gsap.from('.reveal-up', {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }, 100);
    }, 500);
};

onMounted(() => {
    const id = route.params.id;
    fetchBookDetail(id);
});
</script>
  
<style scoped>
p, h1, h2, h3, h4, span {
    font-variant-ligatures: none;
    -webkit-font-smoothing: antialiased;
}
</style>