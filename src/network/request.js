import axios from 'axios'
import qs from 'qs'
export const JSON = qs

const AUTH_TOKEN = localStorage.getItem('token');
export function request(config) {
  //axios.creat用于创建实例,分为全局配置与自定义配置，后者优先级高
  //baseURL,timeout,headers
  
  const instance = axios.create({
    baseURL: 'http://192.168.200.105:8080',
    timeout: 10000
  })
  
  //添加请求拦截
  instance.interceptors.request.use(config => {
    instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    //发送请求前做什么
    return config;
  },err => {
    console.log(err)
  })

  //添加响应拦截
  instance.interceptors.response.use(res => {
    //收到响应数据，对其做什么
    return res.data;
  },err => {
    console.log(err)
  })

  //返回自定义实例
  return instance (config)
}

// 使用方式,axios是基于promise的http库
// 1.导入 import {request} './request.js'
// 2.定义方法，方法中返回 return request(config)
//3.url为请求的相对地址，可以携带参数，会自动拼接在url后面
//4.默认是get请求
//const config={
  //   url:'xxx',
  //   params: {
  //       type,
  //       page
  //     }
  // })
//5.post
//import qs from 'qs';
//const data={username:xxx,password:xxx}
//const config={
//  url:'xxx',
//  method:"POST",
//  headers: { 'content-type': 'application/x-www-form-urlencoded' },
//  data: qs.stringify(data),
// })

//qs.parse 将url解析为对象形式
//qs.stringify 将对象序列化为url的形式以&拼接

