import axios from "axios";
import { Message } from "element-ui";
// 创建axios 赋给变量service
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devapi";
const service = axios.create({
  baseURL: BASEURL,
  timeout: 1000
});

// 添加请求拦截器
// 请求接口前，做一些数据处理（请求拦截器）
service.interceptors.request.use(
  function(config) {
    console.log(config.headers);
    // 业务需求
    // 最终目的是在请求头添加参数
    config.headers.Token = "1111";
    config.headers.userId = "22222";
    config.headers.sui = "33333";

    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
// 请求接口后,返回数据进行拦截（响应拦截器）
service.interceptors.response.use(
  function(response) {
    let data = response.data;
    if (data.resCode !== 0) {
      Message.error(data.message);
      return Promise.reject(data);
    } else {
      return response;
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
