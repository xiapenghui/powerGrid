import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/userLogin', // http://192.168.200.185:8090/user/login
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getAuthMenu(token) {
  return request({
    url: '/dashboard',
    method: 'get',
    params: { token }
  })
}
