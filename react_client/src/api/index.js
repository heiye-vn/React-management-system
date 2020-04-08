import axios from 'axios'
import jsonp from 'jsonp'
// 设置 axios 响应数据的统一格式
axios.interceptors.response.use(res=>res.data)

// 暴露请求登录接口的函数
export const reqLogin = (userInfo)=>axios.post('/login',userInfo)


/*
*      合法的城市   status:"success"
*      非法的城市   status:" No result available"
* */

// 暴露请求天气信息的接口函数
export const reqWeather = (city) =>{
    const url = 'http://api.map.baidu.com/telematics/v3/weather?location='+city+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2&callback=__jp1'
    return new Promise(res=>{
        jsonp(url,{},function(err,data){

            if(data.status === 'success'){
                data = data.results[0].weather_data[0]
                res(data)
            }else{
                res('非法的城市名')
            }
        })
    })
}


