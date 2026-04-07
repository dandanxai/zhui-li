<template>
<div class="min-h-screen bg-[#fcfaf5] flex items-center justify-center relative selection:bg-palace-red selection:text-white font-serif overflow-hidden">
    
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style="background-image: radial-gradient(#000000 1.5px, transparent 1.5px); background-size: 40px 40px;"></div>
    <div class="absolute -left-20 top-10 text-[20rem] font-black text-black/[0.02] select-none pointer-events-none leading-none">筑</div>

    <div class="w-full max-w-4xl mx-auto px-6 flex flex-col md:flex-row relative z-10">
    
    <div class="md:w-1/2 flex flex-col justify-center mb-16 md:mb-0 md:pr-16">
        <div class="w-12 h-[2px] bg-palace-red mb-8"></div>
        <h1 class="text-5xl font-black text-[#111] tracking-[0.2em] mb-6">入卷探源</h1>
        <p class="text-lg text-gray-500 tracking-widest leading-loose italic border-l-2 border-palace-red/30 pl-4">
        “结庐在人境，而无车马喧。”<br/>
        登录考工台，留下你的营造哲思。
        </p>
    </div>

    <div class="md:w-1/2 bg-white p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 relative group">
        <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-palace-red/50"></div>
        <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-palace-red/50"></div>

        <form @submit.prevent="handleLogin" class="space-y-8">
        <div>
            <label class="block text-xs font-sans font-bold tracking-[0.3em] text-gray-400 uppercase mb-2">账号 Account</label>
            <input 
            v-model="loginForm.username" 
            type="text" 
            required
            class="w-full bg-transparent border-b border-gray-300 py-3 text-lg text-[#111] focus:outline-none focus:border-palace-red transition-colors tracking-widest"
            placeholder="请输入名号"
            />
        </div>

        <div>
            <label class="block text-xs font-sans font-bold tracking-[0.3em] text-gray-400 uppercase mb-2">密钥 Password</label>
            <input 
            v-model="loginForm.password" 
            type="password" 
            required
            class="w-full bg-transparent border-b border-gray-300 py-3 text-lg text-[#111] focus:outline-none focus:border-palace-red transition-colors tracking-widest"
            placeholder="请输入密钥"
            />
        </div>

        <div v-if="captchaEnabled" class="flex gap-4 items-end">
            <div class="flex-1">
            <label class="block text-xs font-sans font-bold tracking-[0.3em] text-gray-400 uppercase mb-2">通关令 Captcha</label>
            <input 
                v-model="loginForm.code" 
                type="text" 
                class="w-full bg-transparent border-b border-gray-300 py-3 text-lg text-[#111] focus:outline-none focus:border-palace-red transition-colors tracking-widest"
                placeholder="验证码"
            />
            </div>
            <div class="w-1/3 cursor-pointer" @click="getCode">
            <img :src="codeUrl" class="w-full h-12 object-cover border border-gray-200" alt="点击刷新" />
            </div>
        </div>

        <div class="pt-6">
            <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-[#111] text-white py-4 font-bold tracking-[0.5em] hover:bg-palace-red transition-colors duration-500 flex justify-center items-center gap-3 disabled:opacity-50"
            >
            <span v-if="!loading">启 卷 登 录</span>
            <span v-else class="animate-pulse">唤 醒 中...</span>
            </button>
        </div>
        
        <div class="text-center mt-6">
        <span class="text-xs text-gray-400 tracking-widest">
            尚无名号？
            <router-link to="/register" class="text-palace-red hover:underline">入府登记</router-link>
        </span>
        </div>
        </form>
    </div>

    </div>
</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// 🏮 核心：删掉 import axios from 'axios'，改为导入你的 API
import { login, getCodeImg } from '@/api/login' 

const router = useRouter()
const loading = ref(false)
const captchaEnabled = ref(true) 
const codeUrl = ref('')

const loginForm = reactive({
username: '',
password: '',
code: '',
uuid: ''
})

// 获取若依验证码
const getCode = async () => {
try {
    const res = await getCodeImg()
    if (res.data.captchaEnabled === false) {
    captchaEnabled.value = false
    return
    }
    captchaEnabled.value = true
    codeUrl.value = 'data:image/gif;base64,' + res.data.img
    loginForm.uuid = res.data.uuid
} catch (error) {
    console.error("获取验证码失败", error)
}
}

// 提交登录
const handleLogin = async () => {
loading.value = true
try {
    // 🏮 使用封装的 login 方法
    const res = await login(loginForm.username, loginForm.password, loginForm.code, loginForm.uuid)
    
    // 如果若依后端返回 200，并且带有 token
    if (res.data && res.data.token) {
    // 1. 存入 Token (若依的 request 拦截器会自动去取它)
    localStorage.setItem('ZHL_TOKEN', res.data.token)
    
    // 2. 跳转回首页，触发 NavBar 组件重新挂载和检查用户信息
    router.push('/').then(() => {
        // 可选：强制刷新一下页面以确保全局状态更新
        window.location.reload()
    })
    } else {
    // 后端返回错误（例如账号密码不对）
    if(res.data.msg) alert(res.data.msg)
    if (captchaEnabled.value) getCode()
    }
} catch (error) {
    // 拦截器抛出异常
    if (captchaEnabled.value) getCode()
} finally {
    loading.value = false
}
}

onMounted(() => {
getCode()
})
</script>