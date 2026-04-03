<template>
    <div class="h-full w-full flex items-center justify-between py-1 font-serif text-[#111]">
    
    <div class="w-2/3 flex flex-col justify-between h-full pr-4">
        <div class="text-[11px] leading-relaxed text-gray-500 italic border-l-2 border-palace-red/20 pl-3">
        “雨生百谷，万物生长。此时光影流转，太和殿金脊微闪，最宜测绘。”
        </div>
        <div class="space-y-2 mt-auto">
        <div class="flex justify-between text-[8px] tracking-[0.2em] text-gray-400 uppercase font-mono">
            <span>Sun_Angle / 日影</span>
            <span class="text-palace-red">42.5°</span>
        </div>
        <div class="h-[3px] w-full bg-[repeating-linear-gradient(90deg,#eee,#eee_2px,transparent_2px,transparent_4px)] relative">
            <div class="absolute inset-y-0 left-0 bg-palace-red/50 w-[42.5%] transition-all duration-1000"></div>
        </div>
        </div>
    </div>

    <div class="w-1/3 flex justify-end items-center border-l border-black/5 pl-4 h-full">
        <h2 class="text-4xl text-palace-red font-bold" style="writing-mode: vertical-rl; text-orientation: upright;">
        穀雨
        </h2>
        <span class="text-[8px] tracking-[0.4em] text-gray-300 font-mono rotate-180" style="writing-mode: vertical-rl;">SPRING</span>
    </div>

    </div>
</template>
<script setup>
const colors = [{name:'宫墙红', code:'#9b2e2e'},{name:'琉璃金', code:'#e6b422'},{name:'玄黛', code:'#2d2d2d'},{name:'石青', code:'#2d5150'},{name:'汉玉', code:'#f2f2f2'}]
</script>