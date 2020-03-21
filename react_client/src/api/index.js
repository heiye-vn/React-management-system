import axios from 'axios'
// 设置 axios 响应数据的统一格式
axios.interceptors.response.use(res=>res.data)

export const reqLogin = (userInfo)=>axios.post('/login',userInfo)
