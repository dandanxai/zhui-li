// =====================================================================
// 文件位置: src/api/ai.js
// 模块描述: 智能中枢 (AI) 相关接口
// =====================================================================
import request from '@/utils/request'

/**
 * 1. 丹青绘画接口 (普通 JSON 响应)
 * 直接复用若依的 request 实例，自动处理 Token 和 baseURL
 */
export function drawImage(prompt, signal) {
    return request({
        url: '/ai/draw',
        method: 'post',
        data: { prompt },
        signal: signal // 🏮 核心：将中断信号传给 axios
    })
}

/**
 * 2. 流式对话接口 (SSE 流式响应)
 */
export function chatStream(message, signal) {
    return fetch('/api/ai/chat', { // 注意加上后台地址前缀
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 如果后端需要 token 鉴权，把下面这行解开注释
            // 'Authorization': 'Bearer ' + localStorage.getItem('ZHL_TOKEN')
        },
        body: JSON.stringify({ message }),
        signal: signal 
    })
}

// 全局搜索接口
export function getAiRecommendation(keyword) {
    return request({
    url: '/ai/recommend',
    method: 'get',
    params: { keyword }
    })
}


// 🏮 新增：专供搜索页的流式接口，前端只传 keyword
export function searchStream(keyword, signal) {
    return fetch('api/ai/search-stream', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword }), // 现在只传关键词
        signal: signal 
    })
}

