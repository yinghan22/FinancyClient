import axios from 'axios'

import Config from '../Config.js'

// 2. 创建实例
const instance = axios.create({
    baseURL: Config.base_url,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
})

instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.set('X-token', localStorage.getItem('token'))
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    localStorage.removeItem('token')
    localStorage.setItem('token', response.headers.get('X-token'))
    return response
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})

// 3. 导出
export default instance