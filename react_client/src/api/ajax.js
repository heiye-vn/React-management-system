/*
*   这个文件封装axios  统一get 和post的请求格式
* */

import axios from 'axios'
//设置axios响应数据的统一格式
axios.interceptors.response.use(res=>res.data)

//暴露一个名字是axios的函数
export default function ajax(url, data = {}, method = 'get') {
    //url请求的地址
    //data 请求时发送的数据
    //method 请求的方式
    return new Promise(resolve=>{
        let p = null
        if (method === 'get') { //如果请求是get方式
            p = axios.get(url, {
                params:data
            })
        } else {
            p = axios.post(url, data)
        }

        p.then(res=>{
            resolve(res)
        })
    })

}
