<template>
<div class="min-h-screen bg-[#fcfaf5] flex items-center justify-center relative selection:bg-palace-red selection:text-white font-serif overflow-hidden">
    
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style="background-image: radial-gradient(#000000 1.5px, transparent 1.5px); background-size: 40px 40px;"></div>
    <div class="absolute -right-20 bottom-10 text-[20rem] font-black text-black/[0.02] select-none pointer-events-none leading-none">理</div>

    <div class="w-full max-w-4xl mx-auto px-6 flex flex-col md:flex-row-reverse relative z-10">
    
    <div class="md:w-1/2 flex flex-col justify-center mb-16 md:mb-0 md:pl-16">
        <div class="w-12 h-[2px] bg-palace-red mb-8"></div>
        <h1 class="text-5xl font-black text-[#111] tracking-[0.2em] mb-6">名录留芳</h1>
        <p class="text-lg text-gray-500 tracking-widest leading-loose italic border-r-2 border-palace-red/30 pr-4 text-right">
        “志合者，不以山海为远。”<br/>
        登记名号，共赴营造之约。
        </p>
    </div>

    <div class="md:w-1/2 bg-white p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 relative group">
        <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-palace-red/50"></div>
        <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-palace-red/50"></div>

        <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
            <label class="block text-xs font-sans font-bold tracking-[0.3em] text-gray-400 uppercase mb-2">名号 Username</label>
            <input v-model="registerForm.username" type="text" required class="w-full bg-transparent border-b border-gray-300 py-2 text-lg text-[#111] focus:outline-none focus:border-palace-red transition-colors tracking-widest" placeholder="请输入您的名号" />
        </div>

        <div>
            <label class="block text-xs font-sans font-bold tracking-[0.3em] text-gray-400 uppercase mb-2">密钥 Password</label>
            <input v-model="registerForm.password" type="password" required class="w-full bg-transparent border-b border-gray-300 py-2 text-lg text-[#111] focus:outline-none focus:border-palace-red transition-colors tracking-widest" placeholder="请输入密钥" />
        </div>

        <div>
            <label class="block text-xs font-sans font-bold tracking-[0.3em] text-gray-400 uppercase mb-2">确认密钥 Confirm</label>
            <input v-model="registerForm.confirmPassword" type="password" required class="w-full bg-transparent border-b border-gray-300 py-2 text-lg text-[#111] focus:outline-none focus:border-palace-red transition-colors tracking-widest" placeholder="请再次输入密钥" />
        </div>

        <div v-if="captchaEnabled" class="flex gap-4 items-end">
            <div class="flex-1">
            <label class="block text-xs font-sans font-bold tracking-[0.3em] text-gray-400 uppercase mb-2">通关令 Captcha</label>
            <input v-model="registerForm.code" type="text" class="w-full bg-transparent border-b border-gray-300 py-2 text-lg text-[#111] focus:outline-none focus:border-palace-red transition-colors tracking-widest" placeholder="验证码" />
            </div>
            <div class="w-1/3 cursor-pointer" @click="getCode">
            <img :src="codeUrl" class="w-full h-10 object-cover border border-gray-200" alt="点击刷新" />
            </div>
        </div>

        <div class="pt-4">
            <button type="submit" :disabled="loading" class="w-full bg-[#111] text-white py-4 font-bold tracking-[0.5em] hover:bg-palace-red transition-colors duration-500 flex justify-center items-center gap-3 disabled:opacity-50">
            <span v-if="!loading">登 记 入 册</span>
            <span v-else class="animate-pulse">记 载 中...</span>
            </button>
        </div>
        
        <div class="text-center mt-4">
            <span class="text-xs text-gray-400 tracking-widest">已有名号？<router-link to="/login" class="text-palace-red hover:underline">直接启卷</router-link></span>
        </div>
        </form>
    </div>
    </div>
</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { register, getCodeImg } from '@/api/login'

const router = useRouter()
const loading = ref(false)
const captchaEnabled = ref(true)
const codeUrl = ref('')

const registerForm = reactive({
username: '',
password: '',
confirmPassword: '',
code: '',
uuid: '',
userType: '01' // 🏮 默认为前台普通用户
})

const getCode = async () => {
const res = await getCodeImg()
if (res.data.captchaEnabled === false) {
    captchaEnabled.value = false
    return
}
captchaEnabled.value = true
codeUrl.value = 'data:image/gif;base64,' + res.data.img
registerForm.uuid = res.data.uuid
}

const handleRegister = async () => {
if (registerForm.password !== registerForm.confirmPassword) {
    alert("两次输入的密钥不一致")
    return
}
loading.value = true
try {
    const res = await register(registerForm)
    if (res.data.code === 200) {
    alert("登记成功，请前往启卷登录")
    router.push('/login')
    } else {
    alert(res.data.msg || "登记失败")
    if (captchaEnabled.value) getCode()
    }
} catch (error) {
    if (captchaEnabled.value) getCode()
} finally {
    loading.value = false
}
}

onMounted(() => { getCode() })
</script>