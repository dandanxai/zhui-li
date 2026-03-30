<template>
<div class="min-h-screen bg-[#fcfaf5] text-[#111] selection:bg-palace-red selection:text-white">
    <div class="absolute top-0 left-0 w-full z-40 p-6 md:p-10 pt-28 md:pt-36 flex justify-between items-center mix-blend-difference pointer-events-none">
    <button 
        @click="$router.back()" 
        class="pointer-events-auto text-paper-bg font-serif text-sm border-b border-paper-bg/30 hover:border-palace-red transition-colors flex items-center gap-2 group"
    >
        <span class="group-hover:-translate-x-1 transition-transform">←</span>
        <span>返回 BACK</span>
    </button>
    
    <span class="text-paper-bg font-serif text-[10px] tracking-[0.4em] uppercase opacity-50 hidden md:block">
        Encyclopedia · 筑理百科
    </span>
    </div>

    <header class="w-full h-[60vh] relative overflow-hidden">
    <img :src="building.img" class="w-full h-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#fcfaf5]"></div>
    <div class="absolute bottom-12 left-6 md:left-24 max-w-4xl">
        <div class="flex items-center gap-3 mb-4">
        <span v-for="tag in building.tags" :key="tag" class="px-3 py-0.5 bg-palace-red text-white text-[10px] tracking-widest rounded-full uppercase">{{ tag }}</span>
        </div>
        <h1 class="text-4xl md:text-7xl font-serif tracking-widest mb-4">{{ building.name }}</h1>
        <p class="text-gray-500 font-serif tracking-widest flex items-center gap-2">
        <span class="w-2 h-2 bg-palace-red rounded-full"></span> {{ building.location }}
        </p>
    </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 md:px-24 py-20 grid grid-cols-1 md:grid-cols-12 gap-16">
    <div class="md:col-span-8">
        <h3 class="text-2xl font-serif mb-8 border-l-4 border-palace-red pl-6">营造概览</h3>
        <p class="text-xl font-light leading-loose tracking-widest text-gray-700 mb-12 text-justify italic">
        {{ building.desc }}
        </p>
        <div class="w-full h-[1px] bg-black/5 mb-12"></div>
        <div class="text-lg leading-relaxed tracking-widest font-light text-gray-600 whitespace-pre-line text-justify">
        {{ building.fullContent }}
        </div>
    </div>

    <aside class="md:col-span-4 flex flex-col gap-10">
        <div class="bg-white p-8 rounded-2xl border border-[#eaeaea] shadow-sm">
        <h4 class="font-serif text-palace-red mb-6 border-b border-palace-red/10 pb-4 tracking-widest">建筑档案 INFO</h4>
        <ul class="space-y-6 text-sm">
            <li class="flex justify-between border-b border-black/5 pb-2">
            <span class="text-gray-400">所属分类</span>
            <span class="font-serif">中国古建筑</span>
            </li>
            <li class="flex justify-between border-b border-black/5 pb-2">
            <span class="text-gray-400">核心材料</span>
            <span class="font-serif">木 / 石 / 砖</span>
            </li>
            <li class="flex justify-between border-b border-black/5 pb-2">
            <span class="text-gray-400">保护级别</span>
            <span class="font-serif">世界文化遗产 / 重点文物</span>
            </li>
        </ul>
        </div>
        
        <div class="p-8 bg-palace-red/5 border border-palace-red/10 rounded-2xl">
        <p class="text-xs text-palace-red leading-relaxed tracking-widest font-serif italic text-justify">
            “凡屋之高，以举径为法。凡屋之深，以步架为准。尺寸之间，皆是天人之法。” ——《营造法式》
        </p>
        </div>
    </aside>
    </main>
</div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { buildingsData } from '../data/buildings';

const route = useRoute();
const building = computed(() => {
const id = route.params.id;
// 按照 ID 获取数据，找不到就默认显示太和殿
return buildingsData[id] || buildingsData['taihedian'];
});
</script>