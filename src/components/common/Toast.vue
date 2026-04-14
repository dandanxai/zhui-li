<template>
    <Transition name="toast-fade" @after-leave="destroy">
        <div v-if="show" 
             class="fixed top-12 left-1/2 -translate-x-1/2 z-[9999] px-8 py-4 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center gap-4 min-w-[280px] bg-[#111]"
             :class="type === 'error' ? 'border-l-4 border-palace-red' : 'border-l-4 border-[#c5a977]'">
            <span class="w-1.5 h-1.5 rounded-full animate-pulse" 
                  :class="type === 'error' ? 'bg-palace-red' : 'bg-[#c5a977]'"></span>
            <span class="font-serif tracking-[0.2em] text-sm text-white">{{ msg }}</span>
        </div>
    </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    msg: { type: String, required: true },
    type: { type: String, default: 'error' }, // 'error' 或 'success'
    duration: { type: Number, default: 3000 },
    onDestroy: { type: Function } // 动画结束后销毁 DOM 的回调
})

const show = ref(false)

onMounted(() => {
    show.value = true // 挂载后立刻滑入
    // 定时自动消失
    setTimeout(() => {
        show.value = false
    }, props.duration)
})

// 动画执行完毕后，触发外部传进来的销毁函数
const destroy = () => {
    if (props.onDestroy) {
        props.onDestroy()
    }
}
</script>

<style scoped>
.toast-fade-enter-active, .toast-fade-leave-active {
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-fade-enter-from, .toast-fade-leave-to {
    opacity: 0;
    transform: translate(-50%, -20px);
}
</style>