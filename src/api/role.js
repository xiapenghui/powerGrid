const newUrl = 'http://192.168.1.192:8888'
// const newUrl = 'http://39.101.166.244:8888'
import request from '@/utils/request'

// 用户列表接口
export function userList(query, data) {
  return request({
    url: newUrl + '/sys/user/update',
    method: 'post',
    params: query,
    data
  })
}

