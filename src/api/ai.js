// =====================================================================
// 文件位置: src/api/ai.js
// 模块描述: 智能中枢 (AI) 相关接口
// =====================================================================
import request from '@/utils/request'

/**
 * 1. 丹青绘画接口 (普通 JSON 响应)
 * 直接复用若依的 request 实例，自动处理 Token 和 baseURL
 */
export function drawImage(prompt) {
return request({
    url: '/ai/draw',
    method: 'post',
    data: { prompt }
})
}

/**
 * 2. 流式对话接口 (SSE 流式响应)
 * 考虑到 Axios 处理底层数据流较弱，这里单独封装 Fetch，并手动注入 Token
 */
export function chatStream(message, signal) {
// 手动获取 Token 以保证鉴权通过
const token = localStorage.getItem('ZHL_TOKEN')

return fetch('/api/ai/chat', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify({ message }),
    signal: signal // 用于中止请求
})
}