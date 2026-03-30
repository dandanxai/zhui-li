<template>
<transition name="modal-fade">
    <div 
    v-show="isOpen" 
    class="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
    @click.self="closeChat"
    >
    <div class="w-full max-w-3xl bg-[#0a0a0a] border border-gold-accent/20 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden h-[80vh] md:h-[600px]">
        
        <div class="px-8 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div class="flex items-center gap-4">
            <div class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-accent opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-accent"></span>
            </div>
            <h3 class="text-gold-accent font-serif tracking-[0.2em] text-lg">大匠智脑 · 典籍推演</h3>
        </div>
        <button @click="closeChat" class="text-gray-500 hover:text-white transition-colors" title="关闭 (Esc)">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        </div>

        <div ref="chatBoxRef" class="flex-1 p-8 overflow-y-auto chat-content-area bg-gradient-to-b from-transparent to-black/20">
        <div v-if="!aiReply && !isLoading" class="h-full flex flex-col items-center justify-center opacity-30 select-none">
            <svg class="w-16 h-16 mb-6 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            <p class="font-serif tracking-[0.3em] text-sm uppercase">已接入千问大语言模型</p>
            <p class="font-light tracking-widest text-xs mt-2">可推演古建营造法则、斗拱力学、名匠典故</p>
        </div>

        <div v-else class="text-gray-300 font-light text-base tracking-wide leading-loose whitespace-pre-wrap text-justify">
            <div v-if="askedQuestion" class="mb-6 pl-4 border-l-2 border-gold-accent/30 text-gray-500 italic text-sm">
            {{ askedQuestion }}
            </div>
            <span class="text-white">{{ aiReply }}</span>
            <span v-if="isLoading" class="inline-block w-2 h-4 ml-1 bg-gold-accent animate-pulse align-middle"></span>
        </div>
        </div>

        <div class="p-6 bg-[#0a0a0a] border-t border-white/5">
        <div class="relative flex items-center w-full">
            <input 
            v-model="userMessage" 
            @keyup.enter="askMaster"
            ref="inputRef"
            type="text" 
            placeholder="输入你的问题，例如：赵州桥的敞肩拱有什么科学依据？" 
            class="w-full bg-white/5 border border-white/10 rounded-xl pl-6 pr-28 py-4 text-sm text-white outline-none focus:border-gold-accent/50 transition-all placeholder:text-gray-600 font-light tracking-wider"
            :disabled="isLoading"
            />
            <button 
            @click="askMaster" 
            :disabled="isLoading || !userMessage.trim()"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-gold-accent text-ink-dark font-bold px-6 py-2.5 rounded-lg hover:brightness-110 disabled:opacity-30 transition-all text-sm tracking-widest"
            >
            {{ isLoading ? '推演中' : '请教' }}
            </button>
        </div>
        </div>

    </div>
    </div>
</transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const isOpen = ref(false); 
const userMessage = ref(''); 
const askedQuestion = ref(''); 
const aiReply = ref(''); 
const isLoading = ref(false); 
const chatBoxRef = ref(null); 
const inputRef = ref(null);

// 监听全局唤醒事件
const handleOpenAI = () => {
isOpen.value = true;
nextTick(() => {
    inputRef.value?.focus(); // 打开时自动聚焦输入框
});
};

const closeChat = () => {
if (!isLoading.value) {
    isOpen.value = false;
}
};

// 监听 Esc 键关闭
const handleKeyDown = (e) => {
if (e.key === 'Escape') closeChat();
};

onMounted(() => {
window.addEventListener('open-ai-master', handleOpenAI);
window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
window.removeEventListener('open-ai-master', handleOpenAI);
window.removeEventListener('keydown', handleKeyDown);
});

const scrollToBottom = async () => {
await nextTick();
if (chatBoxRef.value) {
    chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight;
}
};

const askMaster = async () => {
if (!userMessage.value.trim() || isLoading.value) return; 

askedQuestion.value = userMessage.value;
const question = userMessage.value;
userMessage.value = ''; 
aiReply.value = ''; 
isLoading.value = true; 

try {
    const response = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: question })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8'); 

    while (true) {
    const { done, value } = await reader.read();
    if (done) break; 

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter(line => line.trim() !== '');
    
    for (const line of lines) {
        if (line.replace(/^data: /, '').trim() === '[DONE]') break; 
        if (line.startsWith('data: ')) {
        const parsed = JSON.parse(line.replace(/^data: /, ''));
        if (parsed.text) {
            aiReply.value += parsed.text; 
            scrollToBottom(); 
        }
        }
    }
    }
} catch (error) {
    console.error('通信异常:', error);
    aiReply.value = '网络波动，大匠暂不可达，请查验后端服务。';
} finally {
    isLoading.value = false; 
    scrollToBottom();
}
};
</script>

<style scoped>
/* 优雅的细线滚动条 */
.chat-content-area::-webkit-scrollbar { width: 4px; }
.chat-content-area::-webkit-scrollbar-track { background: transparent; }
.chat-content-area::-webkit-scrollbar-thumb { background: rgba(192, 160, 98, 0.3); border-radius: 10px; }
.chat-content-area::-webkit-scrollbar-thumb:hover { background: rgba(192, 160, 98, 0.6); }

/* 模态框淡入淡出加缩放特效 */
.modal-fade-enter-active, .modal-fade-leave-active {
transition: opacity 0.3s ease;
}
.modal-fade-enter-active > div, .modal-fade-leave-active > div {
transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-fade-enter-from, .modal-fade-leave-to {
opacity: 0;
}
.modal-fade-enter-from > div, .modal-fade-leave-to > div {
transform: scale(0.95) translateY(10px);
}
</style>