// =====================================================================
// 文件位置: src/router/index.js
// 模块描述: Vue Router 全局路由配置
// =====================================================================

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LanzhuView from '../views/LanzhuView.vue' 

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes: [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/lanzhu',
        name: 'lanzhu',
        component: LanzhuView
    },
    {
        path: '/lanzhu/:category', // 动态路由：palace, dwelling, bridge, official
        name: 'lanzhu-detail',
        component: () => import('../views/LanzhuDetailView.vue') 
    },
    {
        path: '/building/:id', // 动态 ID，如 /building/taihedian
        name: 'building-info',
        component: () => import('../views/BuildingInfoView.vue')
    },
    {
        path: '/dajiang',
        name: 'dajiang',
        component: () => import('../views/DajiangView.vue')
    },
    {
        path: '/master/:id',
        name: 'master-info',
        component: () => import('../views/MasterInfoView.vue')
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

export default router