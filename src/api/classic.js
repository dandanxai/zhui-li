import request from '@/utils/request'

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

// 新增营造典籍
export function addClassic(data) {
  return request({
    url: '/building/classic',
    method: 'post',
    data: data
  })
}

// 修改营造典籍
export function updateClassic(data) {
  return request({
    url: '/building/classic',
    method: 'put',
    data: data
  })
}

// 删除营造典籍
export function delClassic(id) {
  return request({
    url: '/building/classic/' + id,
    method: 'delete'
  })
}
