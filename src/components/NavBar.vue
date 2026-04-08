<template>
<header class="fixed top-0 left-0 w-full h-24 px-6 md:px-10 flex justify-between items-center z-[1000] pointer-events-none mix-blend-difference text-paper-bg">
    
    <router-link to="/" class="pointer-events-auto hover-trigger cursor-pointer flex items-center gap-4 group">
        <div class="w-10 h-10 bg-palace-red text-paper-bg flex items-center justify-center font-serif text-xl font-black shrink-0 transition-transform duration-700 group-hover:rotate-90">
            筑
        </div>
        <div class="flex flex-col">
            <span class="text-xl font-serif tracking-[0.3em] font-bold leading-none mb-1.5">筑理</span>
            <span class="text-[9px] uppercase tracking-[0.4em] font-sans opacity-60 leading-none block">The Kaogong Lab</span>
        </div>
    </router-link>
    
    <div class="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-x-12 pointer-events-auto text-xs tracking-[0.2em] font-serif items-center">
        
        <a href="/dashboard" target="_blank" class="text-palace-red transition-colors relative group text-center font-bold cursor-pointer">
            天枢 <span class="text-[9px] uppercase opacity-70 block text-center mt-1.5">Dashboard</span>
            <div class="absolute -bottom-3 left-0 w-full h-[1px] bg-palace-red opacity-30"></div>
        </a>

        <router-link to="/" class="hover:text-palace-red transition-colors relative group text-center">
            首页 <span class="text-[9px] uppercase opacity-50 block text-center mt-1.5">Home</span>
            <div class="absolute -bottom-3 left-1/2 w-0 h-[1px] bg-palace-red transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
        </router-link>
        
        <router-link to="/lanzhu" class="hover:text-palace-red transition-colors relative group text-center">
            览筑 <span class="text-[9px] uppercase opacity-50 block text-center mt-1.5">Explore</span>
            <div class="absolute -bottom-3 left-1/2 w-0 h-[1px] bg-palace-red transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
        </router-link>
        
        <router-link to="/dajiang" class="hover:text-palace-red transition-colors relative group text-center">
            大匠 <span class="text-[9px] uppercase opacity-50 block text-center mt-1.5">Masters</span>
            <div class="absolute -bottom-3 left-1/2 w-0 h-[1px] bg-palace-red transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
        </router-link>
        
        <router-link to="/dianji" class="hover:text-palace-red transition-colors relative group text-center">
            典籍 <span class="text-[9px] uppercase opacity-50 block text-center mt-1.5">Texts</span>
            <div class="absolute -bottom-3 left-1/2 w-0 h-[1px] bg-palace-red transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
        </router-link>
        
        <router-link to="/wenmai" class="hover:text-palace-red transition-colors relative group text-center">
            文脉 <span class="text-[9px] uppercase opacity-50 block text-center mt-1.5">Heritage</span>
            <div class="absolute -bottom-3 left-1/2 w-0 h-[1px] bg-palace-red transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
        </router-link>
        
        <button @click="openAiMaster" class="hover:text-palace-red transition-colors relative group text-center outline-none pointer-events-auto">
            <span class="relative">
                智脑
                <span class="absolute -top-1 -right-4 w-1.5 h-1.5 bg-palace-red rounded-full animate-pulse"></span>
            </span>
            <span class="text-[9px] uppercase opacity-50 block text-center mt-1.5">A.I.</span>
            <div class="absolute -bottom-3 left-1/2 w-0 h-[1px] bg-palace-red transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
        </button>
    </div>

    <div class="flex items-center gap-6 md:gap-10 pointer-events-auto">
        
        <div class="flex items-center hidden md:flex border-r border-paper-bg/30 pr-6">
            <button 
                v-if="!isLoggedIn" 
                @click="$router.push('/login')"
                class="border border-paper-bg px-4 py-1 text-xs font-bold tracking-widest hover:bg-paper-bg hover:text-[#111] transition-colors"
            >
                登 录
            </button>

            <div v-else class="flex items-center gap-3 group relative cursor-pointer py-1 mix-blend-normal">
                <div class="w-6 h-6 bg-palace-red rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-[10px]">
                    <img v-if="userAvatar" :src="userAvatar" class="w-full h-full object-cover" alt="avatar" />
                    <span v-else>{{ userName.charAt(0) }}</span>
                </div>
                
                <span class="text-xs font-bold tracking-widest text-paper-bg">{{ userName }}</span>
                
                <div class="absolute top-full right-0 w-28 bg-[#fcfaf5] border border-gray-200 shadow-xl 
                        opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto
                        before:content-[''] before:absolute before:-top-4 before:left-0 before:w-full before:h-4">
                    </div>
            </div>
        </div>

        <button @click="toggleMenu" class="text-xs tracking-widest uppercase hover-trigger relative group p-2 outline-none">
            <span v-if="!isMenuOpen">展开卷轴 / MENU</span>
            <span v-else>合上卷轴 / CLOSE</span>
        </button>
    </div>
</header>

<Transition name="menu-fade">
    <div v-if="isMenuOpen" class="fixed inset-0 z-[900] bg-[#0a0a0a] flex items-center justify-center">
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
            <span class="text-[40vw] font-serif text-white">营造</span>
        </div>

        <nav class="relative z-10 flex flex-col items-center space-y-6 md:space-y-10 text-center pointer-events-auto">
            <a href="/dashboard" target="_blank" @click="toggleMenu" class="text-4xl md:text-6xl font-serif text-palace-red hover:text-white transition-all tracking-[0.2em] font-bold cursor-pointer">
                天枢 · 舆图
            </a>
            
            <router-link to="/" @click="toggleMenu" class="text-3xl md:text-5xl font-serif text-paper-bg/80 hover:text-palace-red transition-all tracking-[0.2em]">首卷 · 开篇</router-link>
            <router-link to="/lanzhu" @click="toggleMenu" class="text-3xl md:text-5xl font-serif text-paper-bg/80 hover:text-palace-red transition-all tracking-[0.2em]">览筑 · 规制</router-link>
            <router-link to="/dajiang" @click="toggleMenu" class="text-3xl md:text-5xl font-serif text-paper-bg/80 hover:text-palace-red transition-all tracking-[0.2em]">大匠 · 匠心</router-link>
            <router-link to="/dianji" @click="toggleMenu" class="text-3xl md:text-5xl font-serif text-paper-bg/80 hover:text-palace-red transition-all tracking-[0.2em]">典籍 · 法式</router-link>
            <router-link to="/wenmai" @click="toggleMenu" class="text-3xl md:text-5xl font-serif text-paper-bg/80 hover:text-palace-red transition-all tracking-[0.2em]">文脉 · 传承</router-link>
            
            <button @click="openAiMaster" class="text-3xl md:text-5xl font-serif text-palace-red hover:text-white transition-all tracking-[0.2em] relative outline-none">
                智脑 · 推演
                <span class="absolute top-2 -right-6 md:-right-8 w-3 h-3 bg-palace-red rounded-full animate-pulse"></span>
            </button>

            <div class="pt-10 mt-10 border-t border-white/10 flex flex-col items-center">
                <button v-if="!isLoggedIn" @click="$router.push('/login'); toggleMenu()" class="text-xl tracking-widest text-gray-400 hover:text-white transition-colors">
                    登 录
                </button>
                <div v-else class="flex flex-col items-center gap-4">
                    <span class="text-xl tracking-widest text-white">居士：{{ userName }}</span>
                    <button @click="handleLogout(); toggleMenu()" class="text-sm tracking-widest text-palace-red hover:text-white">退出登录</button>
                </div>
            </div>
        </nav>
    </div>
</Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getInfo } from '@/api/login'

const isMenuOpen = ref(false)
const router = useRouter()
const isLoggedIn = ref(false)
const userName = ref('')
const userAvatar = ref('') // 🏮 新增头像变量

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
    document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

const openAiMaster = () => {
    window.dispatchEvent(new Event('open-ai-master'));
    if (isMenuOpen.value) {
        toggleMenu();
    }
}

const checkAuth = () => {
    const token = localStorage.getItem('ZHL_TOKEN')
    if (token) {
        isLoggedIn.value = true
        getInfo().then(res => {
            if (res.data && res.data.user) {
                // 🏮 同时获取名字和头像
                userName.value = res.data.user.nickName || res.data.user.userName
                userAvatar.value = res.data.user.avatar || ''
            }
        }).catch(() => {
            handleLogout()
        })
    }
}

const handleLogout = () => {
    localStorage.removeItem('ZHL_TOKEN')
    isLoggedIn.value = false
    userName.value = ''
    userAvatar.value = '' // 清除头像
    if(router.currentRoute.value.path !== '/') {
        router.push('/')
    }
}

onMounted(() => {
    checkAuth()
})
</script>

<style scoped>
.menu-fade-enter-active, .menu-fade-leave-active { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.menu-fade-enter-from, .menu-fade-leave-to { opacity: 0; transform: scale(1.05); }

nav a, nav router-link {
    transition: transform 0.3s ease;
}
nav a:hover {
    transform: scale(1.1);
}
</style>