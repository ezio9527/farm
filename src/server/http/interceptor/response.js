// 添加响应拦截器
const axios = require('axios')
axios.interceptors.response.use(function (response) {
  const res = response.data
  if (res.code === '200') {
    if (response.config.interceptors) {
      // 不做处理
      return Promise.resolve(res)
    } else {
      return Promise.resolve(res.data)
    }
  } else {
    return Promise.reject(res)
  }
}, function (error) {
  return Promise.reject(error)
})
