<template>
<Transition name="pop">
    <div 
    v-if="visible" 
    class="fixed z-[3000] flex items-center gap-2 bg-palace-red text-white px-3 py-2 rounded-full shadow-xl cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300"
    :style="{ left: x + 'px', top: y + 'px' }"
    @mousedown.stop="askText"
    >
    <i class="ri-chat-smile-3-line"></i>
    <span class="text-[10px] font-black tracking-widest uppercase">请教大匠</span>
    </div>
</Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const visible = ref(false);
const x = ref(0);
const y = ref(0);
const selectedText = ref('');

const handleMouseUp = (e) => {
// 延迟一瞬，等待浏览器完成选中状态更新
setTimeout(() => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text && text.length > 1) {
    // 获取选中文字的矩形区域位置
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    // 计算气泡位置（显示在选中文字的正上方）
    x.value = rect.left + rect.width / 2 - 40;
    y.value = rect.top - 45;
    
    selectedText.value = text;
    visible.value = true;
    } else {
    visible.value = false;
    }
}, 10);
};

const askText = (e) => {
e.preventDefault(); // 防止点击导致取消选中
const prompt = `请帮我详细解析一下关于中国古建中“${selectedText.value}”的含义、历史背景或力学原理。`;
window.dispatchEvent(new CustomEvent('open-ai-master', { 
    detail: { prompt, mode: 'chat' } 
}));
visible.value = false;
// 清除选中，保持页面整洁
window.getSelection().removeAllRanges();
};

// 点击页面其他地方关闭气泡
const handleClickOutside = () => {
if (visible.value) visible.value = false;
};

onMounted(() => {
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
document.removeEventListener('mouseup', handleMouseUp);
document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<style scoped>
.pop-enter-active, .pop-leave-active {
transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from, .pop-leave-to {
opacity: 0;
transform: translateY(10px) scale(0.5);
}
</style>