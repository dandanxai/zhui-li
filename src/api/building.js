// src/api/building.js
import request from '@/utils/request'

// 获取览筑分类列表
export function listCategory(query) {
return request({
    url: '/building/category/list',
    method: 'get',
    params: query
})
}

// 查询建筑精选展示列表
export function listFeatured(query) {
    return request({
    url: '/building/featured/list',
    method: 'get',
    params: query
    })
}

// 查询建筑信息列表
export function listArchitecture(query) {
    return request({
    url: '/building/architecture/list',
    method: 'get',
    params: query
    })
}

// 查询筑理百科-建筑分类详细
export function getCategory(id) {
    return request({
    url: '/building/category/' + id,
    method: 'get'
    })
}

// 查询建筑信息详细
export function getArchitecture(id) {
    return request({
    url: '/building/architecture/' + id,
    method: 'get'
    })
}

// 查询大匠名录列表
export function listArtisan(query) {
    return request({
    url: '/building/artisan/list',
    method: 'get',
    params: query
    })
}

// 查询大匠时代主题详细
export function getHistory(id) {
    return request({
    url: '/building/history/' + id,
    method: 'get'
    })
}

// 查询大匠时代主题列表
export function listHistory(query) {
    return request({
    url: '/building/history/list',
    method: 'get',
    params: query
    })
}

// 查询大匠名录详细
export function getArtisan(id) {
    return request({
    url: '/building/artisan/' + id,
    method: 'get'
    })
}

// 查询营造典籍列表
export function listClassic(query) {
    return request({
    url: '/building/classic/list',
    method: 'get',
    params: query
    })
}

// 查询营造典籍详细
export function getClassic(id) {
    return request({
    url: '/building/classic/' + id,
    method: 'get'
    })
}