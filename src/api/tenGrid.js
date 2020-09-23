const newUrl = 'http://120.53.4.153:8888'
import request from '@/utils/request'
// 电流接口
export function electricCurrent(query) {
  return request({
    url: newUrl + '/api/kvsc/ct/page',
    method: 'post',
    params: query
  })
}
