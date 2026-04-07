// =====================================================================
// 文件位置: src/router/index.js
// 模块描述: Vue Router 全局路由配置（集成动态标题与加载动画逻辑）
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
        // 在 routes 数组中加入这段：
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
            meta: { 
                title: '入卷 · 考工台登录',
                hideGlobalUI: true // 隐藏全局导航栏（如果你在 App.vue 里做了类似 dashboard 的判断）
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
 * 路由前置守卫：处理加载动画逻辑
 */
router.beforeEach((to, from, next) => {
    if (to.name && !loadedRoutes.has(to.name)) {
        to.meta.needLoading = true; 
        loadedRoutes.add(to.name);  
    } else {
        to.meta.needLoading = false; 
    }
    next()
})

/**
 * 核心修改：路由后置守卫
 * 作用：每次跳转页面后，自动修改浏览器标签页的名称
 */
router.afterEach((to) => {
    // 默认标题为“筑理 · 智能营造平台”
    const defaultTitle = '筑理 · 智能营造平台';
    // 如果路由 meta 中定义了 title，则使用它，否则使用默认标题
    document.title = to.meta.title || defaultTitle;
});

export default router