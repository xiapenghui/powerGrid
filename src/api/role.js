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

// 模板自带
export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
