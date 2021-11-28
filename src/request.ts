import axios from 'axios';
import { Message } from '@arco-design/web-react';

const service = axios.create({
  baseURL: 'http://127.0.0.1:8880',
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    // config.headers['code'] = 'kf';
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken();
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * 如果您想获得http信息，如头信息或状态
   * 请返回response => response
   */

  /**
   * 通过自定义代码确定请求状态
   * 这里只是一个例子
   * 您也可以通过HTTP状态码来判断状态
   */
  (response) => {
    const res = response.data;
    // 如果定制码不是200，则判定为错误。
    if (res.statusCode !== 600) {
      Message.error(res.data.message);
      // 508: 非法令牌;512: 其他客户已登录;514: 令牌过期;
      if (res.statusCode === 500 || res.statusCode === 502 || res.statusCode === 503) {
        // to re-login
      }
      return Promise.reject(new Error(res.message || '出现错误，请稍后再试'));
    }
    return res;
  },
  (error) => {
    console.log(`err${error}`); // for debug
    Message.error(error.message);
    return Promise.reject(error);
  }
);

export default service;
