<template>
<div class="min-h-screen bg-[#fcfaf5] flex items-center justify-center relative selection:bg-palace-red selection:text-white font-serif overflow-hidden">
    
    <Transition name="toast-fade">
        <div v-if="toast.show" 
                class="fixed top-12 left-1/2 -translate-x-1/2 z-[9999] px-8 py-4 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center gap-4 min-w-[280px] bg-[#111]"
                :class="toast.type === 'error' ? 'border-l-4 border-palace-red' : 'border-l-4 border-[#c5a977]'">
            <span class="w-1.5 h-1.5 rounded-full animate-pulse" 
                    :class="toast.type === 'error' ? 'bg-palace-red' : 'bg-[#c5a977]'"></span>
            <span class="font-serif tracking-[0.2em] text-sm text-white">{{ toast.msg }}</span>
        </div>
    </Transition>

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

// 🏮 告文 (Toast) 控制逻辑
const toast = reactive({ show: false, msg: '', type: 'error' })
let toastTimer = null
const showToast = (msg, type = 'error') => {
    toast.msg = msg
    toast.type = type
    toast.show = true
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => { toast.show = false }, 3000)
}

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
        showToast("令符获取失败，请重试", "error")
    }
}

const handleLogin = async () => {
    loading.value = true
    try {
        const res = await login(loginForm.username, loginForm.password, loginForm.code, loginForm.uuid)
        
        if (res.data && res.data.token) {
            localStorage.setItem('ZHL_TOKEN', res.data.token)
            showToast("登卷成功", "success")
            
            setTimeout(() => {
                router.push('/').then(() => {
                    window.location.reload()
                })
            }, 800) // 延迟跳转，让用户看清成功提示
        } else {
            // 🏮 替换丑陋的 alert
            if(res.data.msg) showToast(res.data.msg, 'error')
            if (captchaEnabled.value) getCode()
        }
    } catch (error) {
        if (captchaEnabled.value) getCode()
        // 这里如果有全局拦截器抛错，拦截器通常会自带提示，也可在此补底
        showToast("登录遇阻，请检查通关令或重试", "error")
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    getCode()
})
</script>

<style scoped>
/* 🏮 优雅告文的滑入滑出动画 */
.toast-fade-enter-active, .toast-fade-leave-active {
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-fade-enter-from, .toast-fade-leave-to {
    opacity: 0;
    transform: translate(-50%, -20px);
}
</style>