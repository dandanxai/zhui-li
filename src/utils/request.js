// =====================================================================
// 文件位置: src/utils/request.js
// 模块描述: 全局 Axios 网络请求封装
// =====================================================================

import axios from 'axios'
import router from '@/router'

const request = axios.create({
    baseURL: '/api', 
    // 🏮 核心优化：为了防止从 OSS 拉取大型 3D 孪生模型或高清画册时请求断开，超时时间放宽至 60 秒
    timeout: 60000   
})

// ==========================================
// 1. 请求拦截器：携带 Token
// ==========================================
request.interceptors.request.use(
    config => {
        // 🏮 新增：发请求时，触发全局事件增加 Loading 计数
        if (!config.hideLoading) {
            window.dispatchEvent(new Event('network-start'))
        }

        const token = localStorage.getItem('ZHL_TOKEN')
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {
        // 🏮 新增：请求失败也要取消计数
        window.dispatchEvent(new Event('network-end'))
        return Promise.reject(error)
    }
)

// ==========================================
// 2. 响应拦截器：业务状态拦截与数据剥离
// ==========================================
request.interceptors.response.use(
    async res => {
        // 🚨🚨🚨 测试专用：强行让整个流程在这里睡上 3 秒钟 🚨🚨🚨
        // await new Promise(resolve => setTimeout(resolve, 6000));

        // 睡醒了之后，再发射网络结束的信号
        if (!res.config || !res.config.hideLoading) {
            window.dispatchEvent(new Event('network-end'))
        }

        const code = res.data.code || 200
        const msg = res.data.msg || '系统未知错误'

        if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
            return res.data
        }

        // 🏮 核心修改：Token 失效直接弹窗提示，并踢回首页
        if (code === 401) {
            ElMessage.warning('登录状态已失效，请重新登录！') // 若有 UI 库可替换为: ElMessage.warning('登录状态已失效，请重新登录！')
            
            localStorage.removeItem('ZHL_TOKEN')
            // 直接定位回首页
            router.push('/')
            return Promise.reject('无效的会话，或者会话已过期')
            
        } else if (code === 500) {
            console.error('服务器异常:', msg)
            return Promise.reject(new Error(msg))
            
        } else if (code === 601) {
            console.warn('系统警告:', msg)
            return Promise.reject(new Error(msg))
            
        } else if (code !== 200) {
            console.error('业务异常:', msg)
            return Promise.reject('error')
            
        } else {
            // 200 成功：剥离原生壳，直接返回核心数据
            return Promise.resolve(res)
        }
    },
    error => {
        // 🏮 新增：异常/超时情况下，结束 Loading 计数
        if (error.config && !error.config.hideLoading) {
            window.dispatchEvent(new Event('network-end'))
        } else if (!error.config) {
            window.dispatchEvent(new Event('network-end'))
        }

        // ==========================================
        // 3. 终极异常拦截：HTTP 维度的崩溃 (保留 404 处理)
        // ==========================================
        console.error('网络请求异常拦截:', error)
        let { message, response } = error
        
        if (response && response.status) {
            const status = response.status;
            
            // 🏮 核心修改：仅保留 404 错误页面的跳转
            if (status === 404) {
                router.push('/404')
                return Promise.reject('接口或资源不存在')
            } 
            // 兜底：如果后端把 401 写在 HTTP 状态码里
            else if (status === 401) {
                ElMessage.warning('登录状态已失效，请重新登录！')
                localStorage.removeItem('ZHL_TOKEN')
                router.push('/')
                return Promise.reject('认证失败')
            }
        }
        
        // 打印网络断开或超时警告
        if (message === 'Network Error') {
            console.error('后端接口连接异常，请检查网络或服务器状态')
        } else if (message.includes('timeout')) {
            console.error('系统接口请求超时，请稍后再试')
        }
        
        return Promise.reject(error)
    }
)

// 🏮 必须导出 request，解决之前的 import 报错
export default request