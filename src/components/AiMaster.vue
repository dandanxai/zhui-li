<template>
<transition name="master-modal">
    <div v-show="isOpen" class="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8" @click.self="closeChat">
        <div class="absolute inset-0 bg-[#070707]/90 backdrop-blur-2xl transition-opacity"></div>

        <div class="relative w-full max-w-4xl h-[85vh] bg-[#0d0d0d] border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
            
            <header class="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-palace-red rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-palace-red/20">筑</div>
                    <div>
                        <h3 class="text-white font-bold tracking-[0.2em] text-lg">筑理 · 智能中枢</h3>
                        <p class="text-[10px] text-palace-red uppercase tracking-[0.4em] font-bold">Universal Intelligence Hub</p>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <button @click="clearChat" class="text-[10px] border border-white/10 px-4 py-1.5 rounded-full text-gray-500 hover:text-white transition-all uppercase tracking-widest font-bold">重置会话</button>
                    <button @click="closeChat" class="text-gray-500 hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round"/></svg>
                    </button>
                </div>
            </header>

            <div ref="chatBoxRef" class="flex-1 overflow-y-auto p-6 md:p-12 space-y-10 chat-container">
                
                <div v-if="history.length === 0" class="h-full flex flex-col items-center justify-center text-center">
                    <div class="max-w-2xl space-y-8">
                        <div class="text-6xl mb-6 opacity-20">⛩️</div>
                        <h4 class="text-white text-3xl font-black tracking-[0.2em]">请大匠推演或作画</h4>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                            <button v-for="p in prompts" :key="p" @click="quickAsk(p)" class="prompt-card group">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-palace-red text-[9px] font-black uppercase tracking-[0.2em]">建议咨询 // Prompt</span>
                                    <i class="ri-arrow-right-up-line text-gray-600 group-hover:text-palace-red transition-colors"></i>
                                </div>
                                <p class="text-gray-300 text-sm tracking-widest leading-relaxed text-left line-clamp-2 font-medium">{{ p }}</p>
                            </button>
                        </div>
                    </div>
                </div>

                <template v-for="(msg, index) in history" :key="index">
                    <div v-if="msg.role === 'user'" class="flex justify-end animate-in">
                        <div class="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl rounded-tr-none max-w-[75%]">
                            <p class="text-gray-200 text-sm tracking-widest leading-relaxed">{{ msg.content }}</p>
                        </div>
                    </div>

                    <div v-else class="flex justify-start gap-5 animate-in">
                        <div class="w-10 h-10 rounded-full bg-palace-red flex items-center justify-center text-white shrink-0 font-black text-sm shadow-2xl">筑</div>
                        <div class="flex-1 space-y-4 max-w-[88%]">
                            <div v-if="msg.type !== 'image'" class="bg-white/[0.02] border border-white/5 p-8 rounded-3xl rounded-tl-none relative markdown-body shadow-inner" v-html="renderMarkdown(msg.content)"></div>
                            
                            <div v-else class="bg-white/[0.02] border border-white/5 p-4 rounded-3xl rounded-tl-none relative group overflow-hidden">
                                <img v-if="msg.content && msg.content.startsWith('http')" :src="msg.content" class="w-full rounded-2xl shadow-2xl cursor-zoom-in hover:scale-[1.01] transition-transform duration-500" @click="viewImage(msg.content)" />
                                <div v-else-if="msg.content && !msg.content.startsWith('http')" class="p-4 text-palace-red text-sm tracking-widest font-bold">
                                    {{ msg.content }}
                                </div>
                                <div v-else class="h-64 flex flex-col items-center justify-center text-gray-500 gap-4">
                                    <div class="w-8 h-8 border-2 border-palace-red border-t-transparent rounded-full animate-spin"></div>
                                    <p class="italic text-sm tracking-widest">正在为您挥毫泼墨...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <div class="p-10 pt-4 bg-gradient-to-t from-black/40 to-transparent">
                <div class="flex items-center gap-6 mb-4 px-2">
                    <button @click="mode = 'chat'" class="flex items-center gap-2 transition-all" :class="mode === 'chat' ? 'text-palace-red' : 'text-gray-500'">
                        <i class="ri-chat-smile-3-line"></i>
                        <span class="text-[11px] font-black tracking-widest uppercase">对话推演</span>
                    </button>
                    <button @click="mode = 'draw'" class="flex items-center gap-2 transition-all" :class="mode === 'draw' ? 'text-palace-red' : 'text-gray-500'">
                        <i class="ri-brush-line"></i>
                        <span class="text-[11px] font-black tracking-widest uppercase">丹青作画</span>
                    </button>
                </div>

                <div class="relative flex items-center bg-white/5 border border-white/10 rounded-2xl p-1.5 transition-all focus-within:border-palace-red/50">
                    <input v-model="userMessage" @keydown.enter="askMaster" :placeholder="mode === 'chat' ? '请教关于古建的任何问题...' : '描述想生成的图像...'" class="flex-1 bg-transparent border-none text-white px-6 py-4 outline-none placeholder:text-gray-600" :disabled="isLoading" />
                    
                    <button v-if="isLoading" @click="stopGenerating" class="mr-2 bg-white/10 text-gray-300 hover:bg-white/20 px-5 py-4 rounded-xl transition-all text-xs font-black uppercase">
                        STOP
                    </button>

                    <button @click="askMaster" :disabled="isLoading || !userMessage.trim()" class="bg-palace-red text-white font-black px-8 py-4 rounded-xl hover:brightness-110 disabled:opacity-20 transition-all text-xs tracking-[0.2em] uppercase">
                        {{ isLoading ? '处理中' : '发送咨询' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { marked } from 'marked';
// 🏮 核心引入：使用抽离出去的规范化 API
import { drawImage, chatStream } from '@/api/ai';

const isOpen = ref(false); 
const mode = ref('chat'); 
const userMessage = ref(''); 
const history = ref([]); 
const isLoading = ref(false); 
const chatBoxRef = ref(null);
let abortController = null;

const prompts = [
    "赵州桥的敞肩拱如何实现泄洪？",
    "帮我总结一下徽派建筑‘四水归堂’的智慧。",
    "描述斗拱中‘昂’的杠杆力学原理。",
    "本站记录的最伟大的中国桥梁有哪些？"
];

const renderMarkdown = (text) => marked.parse(text, { breaks: true });

const stopGenerating = () => {
    if (abortController) {
        abortController.abort();
        isLoading.value = false;
    }
};

const askMaster = async () => {
    if (!userMessage.value.trim() || isLoading.value) return; 
    const text = userMessage.value;
    const currentMode = mode.value;
    
    history.value.push({ role: 'user', content: text });
    userMessage.value = ''; 
    isLoading.value = true; 

    // ----------------------------------------------------
    // 🏮 模式 A: 丹青作画 (生图接口)
    // ----------------------------------------------------
    if (currentMode === 'draw') {
        const aiMsgIndex = history.value.push({ role: 'assistant', type: 'image', content: '' }) - 1;
        try {
            // 调用封装好的 API (自动走 request.js 拦截器)
            const res = await drawImage(text);
            
            // 根据若依或你后端的返回格式判断 (通常若依拦截器会返回 res.data 或者直接返回解析后的结构)
            if (res && res.url) {
                history.value[aiMsgIndex].content = res.url;
            } else if (res && res.data && res.data.url) {
                history.value[aiMsgIndex].content = res.data.url;
            } else {
                history.value[aiMsgIndex].content = '画师报错：' + (res.error || res.msg || '未获取到图卷');
            }
        } catch (e) {
            history.value[aiMsgIndex].content = '网络异常，画师罢工了。' + (e.message || '');
        } finally { 
            isLoading.value = false; 
            scrollToBottom(); 
        }
        
    // ----------------------------------------------------
    // 🏮 模式 B: 对话推演 (SSE 流式接口)
    // ----------------------------------------------------
    } else {
        const aiMsgIndex = history.value.push({ role: 'assistant', type: 'text', content: '' }) - 1;
        abortController = new AbortController();
        
        try {
            // 调用封装好的流式请求 API
            const response = await chatStream(text, abortController.signal);
            
            // 🏮 核心防坑：HTTP 状态码显式报错
            if (!response.ok) {
                history.value[aiMsgIndex].content = `中枢连接失败！状态码: ${response.status} (检查后端是否启动及代理配置)`;
                isLoading.value = false;
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8'); 
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break; 
                
                // 🏮 修复1：加上 { stream: true }，防止中文字节被拦腰截断导致乱码
                const chunkText = decoder.decode(value, { stream: true });
                const lines = chunkText.split('\n');
                
                for (const line of lines) {
                    const trimmedLine = line.trim();
                    // 🏮 修复2：容错处理，不管冒号后面有没有空格，只要是 data: 开头就全收！
                    if (trimmedLine.startsWith('data:')) {
                        // 直接截掉前5个字符（即 "data:"），剩下的就是干净的 JSON
                        const dataString = trimmedLine.substring(5).trim();
                        
                        if (dataString === '[DONE]') break;
                        
                        try {
                            const parsed = JSON.parse(dataString);
                            if (parsed.error) {
                                history.value[aiMsgIndex].content += `\n\n**[后端告警]**: ${parsed.error}`;
                            } else {
                                history.value[aiMsgIndex].content += parsed.text || '';
                            }
                            scrollToBottom();
                        } catch (e) { 
                            // 某一块被截断的 JSON 解析失败不管它，等下一块拼上
                        }
                    }
                }
            }
        } catch (e) { 
            // 判断是否是主动停止
            if (e.name !== 'AbortError') {
                history.value[aiMsgIndex].content = '流式读取中断：' + e.message;
            }
        } finally { 
            isLoading.value = false; 
        }
    }
};

const handleOpenAI = (e) => {
    isOpen.value = true;
    if (e.detail && e.detail.prompt) {
        userMessage.value = e.detail.prompt;
        if (e.detail.mode) mode.value = e.detail.mode;
        // 延迟一瞬确保窗口已打开，然后自动触发发送
        setTimeout(() => {
            askMaster();
        }, 400);
    }
    scrollToBottom();
};

const closeChat = () => { if (!isLoading.value) isOpen.value = false; };
const viewImage = (url) => window.open(url, '_blank');
const clearChat = () => { history.value = []; };
const quickAsk = (p) => { userMessage.value = p; askMaster(); };
const scrollToBottom = async () => { await nextTick(); if (chatBoxRef.value) chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight; };

onMounted(() => {
    window.addEventListener('open-ai-master', handleOpenAI);
    window.addEventListener('keydown', (e) => e.key === 'Escape' && closeChat());
});
onUnmounted(() => {
    window.removeEventListener('open-ai-master', handleOpenAI);
});
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css');

.markdown-body { font-size: 15px; line-height: 2.2; color: #eee; text-align: justify; }
:deep(.markdown-body strong) { color: #fff; font-weight: 900; border-bottom: 1px solid #9b2e2e; }

.chat-container::-webkit-scrollbar { width: 3px; }
.chat-container::-webkit-scrollbar-thumb { background: rgba(155, 46, 46, 0.4); border-radius: 10px; }

.prompt-card { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); padding: 1.5rem; border-radius: 1.5rem; transition: all 0.3s ease; cursor: pointer; }
.prompt-card:hover { border-color: rgba(155, 46, 46, 0.5); background: rgba(255, 255, 255, 0.05); transform: translateY(-2px); }

.master-modal-enter-active, .master-modal-leave-active { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.master-modal-enter-from, .master-modal-leave-to { opacity: 0; transform: scale(1.05); filter: blur(20px); }
</style>