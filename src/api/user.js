// =====================================================================
// 文件位置: src/api/system/user.js
// 模块描述: 用户个人中心相关接口（资料、密码、头像）
// =====================================================================
import request from '@/utils/request'

// 1. 获取当前登录用户个人信息 (用于回显表单)
export function getUserProfile() {
return request({
    url: '/system/user/profile',
    method: 'get'
})
}

// 2. 修改用户个人信息 (姓名、手机号、性别、邮箱等)
export function updateUserProfile(data) {
return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
})
}

// 3. 用户密码重置 (需要校验旧密码)
export function updateUserPwd(oldPassword, newPassword) {
    const data = {
    oldPassword,
    newPassword
    }
    return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    data: data // 🏮 关键修改：将 params 改为 data
    })
}

// 4. 用户头像上传 (使用 FormData 上传二进制文件)
export function uploadAvatar(data) {
    return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    // 🏮 核心修改：必须声明为 multipart 表单格式
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
    })
}