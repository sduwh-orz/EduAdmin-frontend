import axios from 'axios'
import { ElMessage } from 'element-plus'

const devUrl = 'http://localhost:7001'

const service = axios.create({
  baseURL: devUrl,
  timeout: 1000000,
  withCredentials: true
})

service.interceptors.response.use((response) => {
  const data = response.data
  if (data.status === true) {
    // ElMessage({
    //   message: data.message,
    //   type: 'success',
    // })
  } else {
    ElMessage.error(data.message)
  }
  return data
}, error => {
  error.response && ElMessage.error(error.response.data)
  return Promise.reject(new Error(error.response.data))
})

service.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('user')
  return config
}, error => {
  return Promise.reject(new Error(error))
})

export default service
