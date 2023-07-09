import axios from "axios";
import router from "../router";

export const request = (config: any) => {
    const http = axios.create({
        baseURL: 'https://service.test.nttcc.com.cn',
        // timeout: 5000,
    })

    // 请求拦截
    http.interceptors.request.use((config) => {
        if (config.method === 'put' || config.method === 'delete') {
            const id = config.data._id || config.data.id
            config.url += `/${id}`
        }
        const token = localStorage.getItem('token')
        // @ts-ignore
        config.headers = {
            Authorization: 'Bearer ' + token
        }
        return config
    }, (error) => {
        console.log('requestError', error)
    })
    // 响应拦截
    http.interceptors.response.use((res) => {
        return res.data ? res.data : res
    }, (error) => {
        console.log('responseError', error.response)
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('userInfo')
            router.push('/login')
        }
    })

    return http(config)
}