<template>
    <div class="h-full w-full flex flex-col gap-3 justify-center">
    <div class="h-12 w-full flex gap-1">
        <div v-for="c in colors" :key="c.code" 
            class="flex-1 rounded-sm relative group cursor-crosshair transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:flex-[2.5] shadow-sm hover:shadow-md" 
            :style="{ backgroundColor: c.code }">
        <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
            <span class="text-[10px] font-serif tracking-widest">{{ c.name }}</span>
            <span class="text-[8px] font-mono scale-90 opacity-80">{{ c.code }}</span>
        </div>
        </div>
    </div>
    <div class="text-[9px] text-gray-400 tracking-[0.3em] font-mono flex justify-between uppercase">
        <span>Palace_Red</span>
        <span>Glazed_Gold</span>
        <span>Ink_Dark</span>
    </div>
    </div>
</template>
<script setup>
const colors = [
    {name:'宫墙红', code:'#9b2e2e'},
    {name:'琉璃黄', code:'#e6b422'},
    {name:'石青', code:'#2d5150'},
    {name:'汉玉白', code:'#e8e4d3'},
    {name:'玄黛', code:'#111111'}
]
</script>