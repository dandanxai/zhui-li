// =====================================================================
// 文件位置: src/router/index.js
// 模块描述: Vue Router 全局路由配置（增加鉴权拦截与动态加载控制）
// =====================================================================

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LanzhuView from '../views/LanzhuView.vue'

const loadedRoutes = new Set();

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { title: '筑理 · 开启营造之旅' }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
            meta: { 
                title: '入卷 · 考工台登录',
                hideGlobalUI: true 
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue'),
            meta: { 
                title: '入府 · 考工台登记',
                hideGlobalUI: true 
            }
        },
        // 🏮 核心修改：个人中心
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue'),
            meta: { 
                title: '居士书斋 · 个人中心',
                requireAuth: true // 🏮 关键标记：必须登录才能进
            }
        },
        {
            path: '/lanzhu',
            name: 'lanzhu',
            component: LanzhuView,
            meta: { title: '览筑 · 建筑规制' }
        },
        {
            path: '/lanzhu/:category',
            name: 'lanzhu-detail',
            component: () => import('../views/LanzhuDetailView.vue'),
            meta: { title: '览筑 · 营造分类' }
        },
        {
            path: '/building/:id',
            name: 'building-info',
            component: () => import('../views/BuildingInfoView.vue'),
            meta: { title: '览筑 · 建筑详情' }
        },
        {
            path: '/dajiang',
            name: 'dajiang',
            component: () => import('../views/DajiangView.vue'),
            meta: { title: '大匠 · 匠心传承' }
        },
        {
            path: '/master/:id',
            name: 'master-info',
            component: () => import('../views/MasterInfoView.vue'),
            meta: { title: '大匠 · 宗师录' }
        },
        {
            path: '/dianji',
            name: 'dianji',
            component: () => import('../views/DianjiView.vue'),
            meta: { title: '典籍 · 营造法式' }
        },
        {
            path: '/dianji/:id',
            name: 'dianji-info',
            component: () => import('../views/BookDetailView.vue'),
            meta: { title: '典籍 · 博览古今' }
        },
        {
            path: '/wenmai',
            name: 'wenmai',
            component: () => import('../views/WenmaiView.vue'),
            meta: { title: '文脉 · 赓续传承' }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/DashboardView.vue'),
            meta: { 
                hideGlobalUI: true, 
                title: '天枢 · 数字化可视化平台' 
            }
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0, behavior: 'smooth' }
        }
    }
})

/**
 * 🏮 核心修改：全局前置守卫 (处理权限 & 加载动画)
 */
router.beforeEach((to, from, next) => {
    // 1. 获取 Token
    const token = localStorage.getItem('ZHL_TOKEN');

    // 2. 鉴权判断：如果要去需要权限的页面，但没登录
    if (to.meta.requireAuth && !token) {
        // 强制跳转到登录页，并带上 redirect 参数以便登录后跳回来
        next({ 
            path: '/login', 
            query: { redirect: to.fullPath } 
        });
    } else {
        // 3. 处理加载动画逻辑 (如果是第一次进入该路由)
        if (to.name && !loadedRoutes.has(to.name)) {
            to.meta.needLoading = true; 
            loadedRoutes.add(to.name);  
        } else {
            to.meta.needLoading = false; 
        }
        next();
    }
})

/**
 * 路由后置守卫：修改标题
 */
router.afterEach((to) => {
    const defaultTitle = '筑理 · 智能营造平台';
    document.title = to.meta.title || defaultTitle;
});

export default router;