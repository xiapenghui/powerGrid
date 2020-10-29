// const newUrl = 'http://192.168.1.192:8888'
const newUrl = 'http://39.101.166.244'
import request from '@/utils/request'

export function login(data) {
  return request({
    url: newUrl + '/api/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
