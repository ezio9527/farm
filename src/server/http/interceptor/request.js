// 添加请求拦截器
const axios = require('axios')

axios.interceptors.request.use(function (config) {
  config.headers.get.token = localStorage.getItem('token')
  config.headers.post.token = localStorage.getItem('token')
  config.url = '/api' + config.url
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
