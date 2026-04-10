<template>
    <header class="fixed top-0 left-0 w-full h-24 px-6 md:px-10 flex justify-between items-center z-[1000] pointer-events-none mix-blend-difference text-paper-bg">
        
        <router-link to="/" class="pointer-events-auto hover-trigger cursor-pointer flex items-center gap-4 group">
            <div class="w-10 h-10 bg-palace-red text-paper-bg flex items-center justify-center font-serif text-xl font-black shrink-0 transition-transform duration-700 group-hover:rotate-90">筑</div>
            <div class="flex flex-col">
                <span class="text-xl font-serif tracking-[0.3em] font-bold leading-none mb-1.5">筑理</span>
                <span class="text-[9px] uppercase tracking-[0.4em] font-sans opacity-60 leading-none block">The Kaogong Lab</span>
            </div>
        </router-link>
        
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex justify-center items-center">
            
            <div :class="[
                'hidden lg:flex items-center space-x-12 text-xs tracking-[0.2em] font-serif transition-all duration-500 ease-in-out',
                isSearchOpen ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100 relative'
            ]">
                <a href="/dashboard" target="_blank" class="text-palace-red transition-colors relative group text-center font-bold cursor-pointer">
                    天枢 <span class="text-[9px] uppercase opacity-70 block text-center mt-1.5">Dashboard</span>
                    <div class="absolute -bottom-3 left-0 w-full h-[1px] bg-palace-red opacity-30"></div>
                </a>
                <router-link to="/" class="hover:text-palace-red transition-colors relative group text-center">
                    首页 <span class="text-[9px] uppercase opacity-50 block text-center mt-1.5">Home</span>
                </router-link>
                <router-link to="/lanzhu" class="hover:text-palace-red transition-colors relative group text-center">
                    览筑 <span class="text-[9px] uppercase opacity-50 block text-center mt-1.5">Explore</span>
                </router-link>
                <router-link to="/dajiang" class="hover:text-palace-red transition-colors relative group text-center">
                    大匠 <span class="text-[9px] uppercase opacity-50 block text-center mt-1.5">Masters</span>
                </router-link>
                <router-link to="/dianji" class="hover:text-palace-red transition-colors relative group text-center">
                    典籍 <span class="text-[9px] uppercase opacity-50 block text-center mt-1.5">Texts</span>
                </router-link>
                <router-link to="/wenmai" class="hover:text-palace-red transition-colors relative group text-center">
                    文脉 <span class="text-[9px] uppercase opacity-50 block text-center mt-1.5">Heritage</span>
                </router-link>
                <button @click="openAiMaster" class="hover:text-palace-red transition-colors relative group text-center outline-none">
                    <span class="relative">智脑<span class="absolute -top-1 -right-4 w-1.5 h-1.5 bg-palace-red rounded-full animate-pulse"></span></span>
                    <span class="text-[9px] uppercase opacity-50 block text-center mt-1.5">A.I.</span>
                </button>
                
                <button @click="toggleSearch" class="hover:text-palace-red transition-colors relative group text-center outline-none">
                    <span class="relative inline-flex items-center justify-center h-[16px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </span>
                    <span class="text-[9px] uppercase opacity-50 block text-center mt-1.5">Search</span>
                    <div class="absolute -bottom-3 left-1/2 w-0 h-[1px] bg-palace-red transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
                </button>
            </div>

            <div :class="[
                'flex items-center justify-between transition-all duration-500 ease-in-out border-b border-palace-red/50 px-2',
                isSearchOpen ? 'w-[75vw] md:w-[40rem] opacity-100 relative' : 'w-0 opacity-0 absolute pointer-events-none border-none'
            ]">
                <input ref="searchInput" v-model="searchQuery" type="text" placeholder="搜寻营造灵感..."
                    class="bg-transparent border-none outline-none text-paper-bg placeholder:text-paper-bg/40 w-full text-sm tracking-widest py-3" @keyup.enter="handleSearch" />
                <button @click="handleSearch" class="text-xs font-bold tracking-[0.3em] whitespace-nowrap text-paper-bg hover:text-palace-red transition-colors opacity-70 hover:opacity-100 mx-4">搜索</button>
                <button @click="toggleSearch" class="p-2 hover:text-palace-red transition-colors outline-none flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>
        </div>

        <div class="flex items-center gap-6 md:gap-10 pointer-events-auto">
            
            <button @click="toggleSearch" class="lg:hidden p-2 hover:text-palace-red transition-colors outline-none flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            
            <div class="flex items-center hidden md:flex border-r border-paper-bg/30 pr-6">
                <button v-if="!isLoggedIn" @click="$router.push('/login')" class="border border-paper-bg px-4 py-1 text-xs font-bold tracking-widest hover:bg-paper-bg hover:text-[#111] transition-colors">
                    登 录
                </button>
                <div v-else class="flex items-center gap-3 group relative py-1">
                    <div class="w-6 h-6 opacity-0"></div> <span class="text-xs font-bold tracking-widest">{{ userName }}</span>
                </div>
            </div>

            <button @click="toggleMenu" class="text-xs tracking-widest uppercase hover-trigger relative group p-2 outline-none">
                <span v-if="!isMenuOpen">展开卷轴 / MENU</span>
                <span v-else>合上卷轴 / CLOSE</span>
            </button>
        </div>
    </header>

    <header class="fixed top-0 left-0 w-full h-24 px-6 md:px-10 flex justify-between items-center z-[1001] pointer-events-none">
        
        <div class="flex-1 opacity-0"></div>

        <div class="flex items-center gap-6 md:gap-10 pointer-events-none">
            
            <button class="lg:hidden p-2 w-[34px] h-[34px] opacity-0"></button>
            
            <div class="flex items-center hidden md:flex border-r border-transparent pr-6 pointer-events-none">
                <button v-if="!isLoggedIn" class="border px-4 py-1 text-xs opacity-0 pointer-events-none">登 录</button>
                
                <div v-else class="flex items-center gap-3 group relative cursor-pointer py-1 pointer-events-auto">
                    <div class="w-6 h-6 bg-palace-red rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-[10px] shadow-md">
                        <img v-if="userAvatar" :src="userAvatar" class="w-full h-full object-cover" alt="avatar" />
                        <span v-else>{{ userName.charAt(0) }}</span>
                    </div>
                    <span class="text-xs font-bold tracking-widest opacity-0">{{ userName }}</span>
                    
                    <div class="absolute top-full right-0 w-28 bg-[#fcfaf5] border border-gray-200 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto before:content-[''] before:absolute before:-top-4 before:left-0 before:w-full before:h-4 text-[#111]">
                        <div class="py-1"> 
                            <router-link to="/profile" class="block w-full text-center py-3 text-xs tracking-widest hover:text-palace-red hover:bg-gray-100 transition-colors border-b border-gray-50">个人中心</router-link>
                            <button @click="handleLogout" class="w-full text-center py-3 text-xs tracking-widest hover:text-palace-red hover:bg-gray-100 transition-colors">退出登录</button>
                        </div>
                    </div>
                </div>
            </div>

            <button class="text-xs tracking-widest uppercase p-2 opacity-0 pointer-events-none">
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
                <a href="/dashboard" target="_blank" @click="toggleMenu" class="text-4xl md:text-6xl font-serif text-palace-red hover:text-white transition-all tracking-[0.2em] font-bold cursor-pointer">天枢 · 舆图</a>
                <router-link to="/" @click="toggleMenu" class="text-3xl md:text-5xl font-serif text-paper-bg/80 hover:text-palace-red transition-all tracking-[0.2em]">首卷 · 开篇</router-link>
                <router-link to="/lanzhu" @click="toggleMenu" class="text-3xl md:text-5xl font-serif text-paper-bg/80 hover:text-palace-red transition-all tracking-[0.2em]">览筑 · 规制</router-link>
                <router-link to="/dajiang" @click="toggleMenu" class="text-3xl md:text-5xl font-serif text-paper-bg/80 hover:text-palace-red transition-all tracking-[0.2em]">大匠 · 匠心</router-link>
                <router-link to="/dianji" @click="toggleMenu" class="text-3xl md:text-5xl font-serif text-paper-bg/80 hover:text-palace-red transition-all tracking-[0.2em]">典籍 · 法式</router-link>
                <router-link to="/wenmai" @click="toggleMenu" class="text-3xl md:text-5xl font-serif text-paper-bg/80 hover:text-palace-red transition-all tracking-[0.2em]">文脉 · 传承</router-link>
                
                <button @click="openAiMaster" class="text-3xl md:text-5xl font-serif text-palace-red hover:text-white transition-all tracking-[0.2em] relative outline-none">
                    智脑 · 推演<span class="absolute top-2 -right-6 md:-right-8 w-3 h-3 bg-palace-red rounded-full animate-pulse"></span>
                </button>

                <div class="pt-10 mt-10 border-t border-white/10 flex flex-col items-center">
                    <button v-if="!isLoggedIn" @click="$router.push('/login'); toggleMenu()" class="text-xl tracking-widest text-gray-400 hover:text-white transition-colors">登 录</button>
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
// 🏮 新增了 nextTick 用于搜索框自动聚焦
import { ref, onMounted, nextTick } from 'vue' 
import { useRouter } from 'vue-router'
import { getInfo } from '@/api/login'

const isMenuOpen = ref(false)
const router = useRouter()
const isLoggedIn = ref(false)
const userName = ref('')
const userAvatar = ref('')

// 🏮 新增：搜索功能状态与逻辑
const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

const toggleSearch = () => {
    isSearchOpen.value = !isSearchOpen.value
    if (isSearchOpen.value) {
        // 展开时自动获取焦点
        nextTick(() => {
            if (searchInput.value) searchInput.value.focus()
        })
    } else {
        searchQuery.value = '' // 收起时清空内容
    }
}

const handleSearch = () => {
    if (!searchQuery.value.trim()) return
    // 触发搜索跳转 (可根据你的实际路由路径修改 /search)
    router.push({ path: '/search', query: { keyword: searchQuery.value } })
    isSearchOpen.value = false
    searchQuery.value = ''
}

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
    userAvatar.value = ''
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

/* 🏮 新增：适配差值模式的占位符颜色 */
input::placeholder {
    color: inherit;
    opacity: 0.4;
}
</style>