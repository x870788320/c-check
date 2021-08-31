import axios from 'axios'

import { baseURL, timeout, errData } from './httpConfig'

const Axios = axios.create({
  baseURL,
  timeout,
  // responseType: "json",
//   withCredentials: true, //是否允许带cookie
})

Axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded;charset=utf-8";
// Axios.defaults.headers.common['token'] = sessionStorage.getItem("c-token");

Axios.interceptors.request.use(
  config => {
    // 显示Loading的组件
    showLoading()
    config.headers['token'] = sessionStorage.getItem("c-token");
    // config.data = JSON.stringify(config.data)

    //formdata 不能 JSON.stringify 否则报错
    // if (config.method === 'post'){
    //     //序列化
    //     let formObj = new FormData();
    //     formObj.append('uname','bbg' )
    //     formObj.append('upass','123456' )
    //     config.data = formObj
    // } else {

    // }
    console.log(config.url)
    return config
  },
  err => hideLoading() && Promise.error(err)
)

Axios.interceptors.response.use(
    res => hideLoading() && (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
    err => {
        hideLoading()
        const { response } = err;
        if (response) {
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            window.console.log("请查看网络");
            return Promise.reject("请查看网络");
        }
  }
)

//失败时的状态
const errorHandle = (status, msg) => {
    switch(status){
        case 200:
            toLogin();
            break;
        default:
            window.console.log(msg+'111');
    }
}
//跳登录
// const toLogin = () => router.replace({name: "login"})
const toLogin = () => {}

//一般由外界引入方法
const showLoading = () => '显示Loading的组件'
const hideLoading = () => '隐藏Loading的组件'

//暴露axios
export default Axios

//暴露get方法
export const GET = (url, params, loading = false) => {
    loading && showLoading()
    return new Promise((resolve, reject) => 
        Axios.get(url, { params }).then( res => resolve(res.data)).catch(error => reject(errData))
    )
}

//暴露post方法
export const POST = (url, params, loading = false) => {
    loading && showLoading()
    return new Promise((resolve, reject) => {
        console.log(params)
        return Axios.post(url,  params ).then( res => resolve(res.data)).catch(error => reject(errData))
    })
}