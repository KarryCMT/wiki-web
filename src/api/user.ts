import request from '../utils/request';
// 新增用户评价
export function postUserLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  });
}
