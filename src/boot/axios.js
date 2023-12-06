import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: 'http://192.168.0.104:8000/api' })
api.defaults.headers.common.Accept = 'application/json'
api.defaults.headers.common['Content-Type'] = 'application/json'

export default boot(({ app, router }) => {
  api.interceptors.request.use(function (config) {
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  api.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    if (error.response.status === 401) {
      router.push({
        path: '/auth/login'
      })
    }
    return Promise.reject(error)
  })
})

export { api }
