import axios from 'axios';
console.log(process.env.NODE_ENV)
axios.defaults.baseURL = process.env.NODE_ENV==="production"?"http://liweifei.com:3889":"http://localhost:3889"; // 配置axios请求的地址
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.crossDomain = true;

//拿本地touken
// let luckydrawToken = localStorage.getItem("luckydrawToken");
// if (luckydrawToken) axios.defaults.headers.common["Authorization"] = luckydrawToken;
// // 请求前拦截处理
// axios.interceptors.request.use(
//     config=>{
//         return config;
//     },error=>{
//         return Promise.reject(error)
//     }
// )
// // 请求后拦截处理
// axios.interceptors.response.use(
//     response=>{
//         return response
//     },error=>{
//         if(error.response.status==500){
//             router.push({
//                 path:"/500"
//             })
//         }else if(error.response.status==404){
//             router.push({
//                 path:"/404"
//             })
//         }
//         return Promise.reject(error)
//     }
// )
export default axios