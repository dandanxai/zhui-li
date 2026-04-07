import axios from 'axios'

const request = axios.create({
baseURL: '/api', // 你的若依后端接口前缀
})

// 🏮 请求拦截器：每次发请求前，把 Token 塞进去
request.interceptors.request.use(
config => {
    // 从本地存储获取 token
    const token = localStorage.getItem('ZHL_TOKEN')
    if (token) {
    // 若依默认识别的请求头是 Authorization，并且带着 Bearer 前缀
    config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
},
error => {
    return Promise.reject(error)
}
)

export default request