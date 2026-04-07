// =====================================================================
// 文件位置: src/api/login.js
// 模块描述: 用户登录、验证码及鉴权相关接口
// =====================================================================
import request from '@/utils/request' // 确保你的 request.js 已经配置好拦截器

// 1. 登录方法 (获取 Token)
export function login(username, password, code, uuid) {
return request({
    url: '/login',
    method: 'post',
    data: {
    username,
    password,
    code,
    uuid
    }
})
}

// 2. 获取验证码
export function getCodeImg() {
return request({
    url: '/captchaImage',
    method: 'get',
    timeout: 20000
})
}

// 3. 获取用户详细信息 (登录成功后调用，用来获取头像、角色等)
export function getInfo() {
return request({
    url: '/getInfo',
    method: 'get'
})
}

// 4. 退出方法
export function logout() {
return request({
    url: '/logout',
    method: 'post'
})
}

// 5. 注册方法
export function register(data) {
return request({
    url: '/register',
    method: 'post',
    data: data
})
}