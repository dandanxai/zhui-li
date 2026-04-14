// =====================================================================
// 文件位置: src/api/ai.js
// 模块描述: 智能中枢 (AI) 相关接口
// =====================================================================
import request from '@/utils/request'
import { showToast } from '@/utils/toast'

/**
 * 1. 丹青绘画接口 (普通 JSON 响应)
 * 直接复用若依的 request 实例，自动处理 Token 和 baseURL
 */
export function drawImage(prompt, signal) {
    return request({
        url: '/ai/draw',
        method: 'post',
        data: { prompt },
        signal: signal 
    })
}

/**
 * 2. 流式对话接口 (SSE 流式响应)
 */
export function chatStream(message, signal) {
    // 🚨 核心修改 2：获取 Token
    const token = localStorage.getItem('ZHL_TOKEN')
    if (!token) {
        showToast('请先入卷登录，再使用智脑推演。', 'error')
        return Promise.reject(new Error('未登录'))
    }

    return fetch('/api/ai/chat', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 🚨 核心修改 3：必须把 Token 塞进请求头！
            'Authorization': 'Bearer ' + token
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
    // 🚨 核心修改 4：搜索接口同样需要带 Token
    const token = localStorage.getItem('ZHL_TOKEN')
    if (!token) {
        return Promise.reject(new Error('未登录'))
    }

    return fetch('/api/ai/search-stream', { // ⚠️ 修复了一个小拼写错误，前面加了个斜杠 /
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token // 塞入 Token
        },
        body: JSON.stringify({ keyword }), 
        signal: signal 
    })
}