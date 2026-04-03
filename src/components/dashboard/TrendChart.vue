<template>
    <div class="h-full w-full flex flex-col justify-between">
    <div class="flex items-baseline gap-2">
        <span class="text-3xl font-serif text-[#111]">1,429</span>
        <span class="text-[9px] text-gray-400 tracking-widest font-mono">USERS_ONLINE</span>
    </div>
    
    <div class="flex items-end gap-[3px] h-12 w-full group">
        <div v-for="n in 24" :key="n" 
            class="flex-1 bg-palace-red/20 rounded-t-sm hover:bg-palace-red transition-all duration-300 cursor-crosshair" 
            :style="{height: (20 + Math.random()*80) + '%'}">
        </div>
    </div>
    </div>
</template>