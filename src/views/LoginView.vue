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
        
        <div class="pt-6 border-t border-gray-100 mt-6">
            <div class="text-center mb-4 relative">
                <span class="bg-white px-4 text-xs tracking-[0.3em] text-gray-300 relative z-10">其他通关印信</span>
                <div class="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -z-0"></div>
            </div>
            
            <div class="flex justify-center gap-6">
                <button type="button" @click="mockThirdParty('微信')" class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#07C160] hover:border-[#07C160] transition-colors group relative" title="微信登录">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5.5-3c-.83 0-1.5-.67-1.5-1.5S13.17 7.5 14 7.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 1.5c0-2.76-2.69-5-6-5s-6 2.24-6 5c0 1.53.82 2.89 2.08 3.79-.17.65-.48 1.48-.52 1.59-.03.09.06.18.15.13.11-.06.84-.46 1.53-.87C10.72 16.92 11.59 17 12.5 17c3.31 0 6-2.24 6-5zm-9.5-3c-.83 0-1.5-.67-1.5-1.5S8.17 6 9 6s1.5.67 1.5 1.5S9.83 9 9 9zm10.5 4.5c0 2.48-2.42 4.5-5.4 4.5-.82 0-1.6-.14-2.31-.38-.63.37-1.28.74-1.38.79-.08.04-.16-.04-.13-.12.04-.1.32-.84.47-1.42C9.5 15.65 8.7 14.63 8.7 13.5c0-2.48 2.42-4.5 5.4-4.5s5.4 2.02 5.4 4.5z"/></svg>
                </button>
                
                <button type="button" @click="mockThirdParty('手机号')" class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-palace-red hover:border-palace-red transition-colors group relative" title="手机号登录">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                </button>
                
                <button type="button" @click="mockThirdParty('邮箱')" class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#c5a977] hover:border-[#c5a977] transition-colors group relative" title="邮箱登录">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </button>
            </div>
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
import { showToast } from '@/utils/toast' 

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
            showToast("登卷成功，正在入府...", "success") 
            
            setTimeout(() => {
                router.push('/').then(() => {
                    window.location.reload()
                })
            }, 800) 
        } else {
            if(res.data.msg) showToast(res.data.msg, 'error') 
            if (captchaEnabled.value) getCode()
        }
    } catch (error) {
        if (captchaEnabled.value) getCode()
        showToast("登录遇阻，请检查通关令或重试", "error")
    } finally {
        loading.value = false
    }
}

// 🏮 占位按钮点击事件
const mockThirdParty = (provider) => {
    showToast(`系统暂未开启${provider}验证通道`, "error")
}

onMounted(() => {
    getCode()
})
</script>