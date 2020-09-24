const newUrl = 'http://192.168.1.192:8888'
import request from '@/utils/request'
// 电流互感器列表接口
export function electricCurrent(query) {
  return request({
    url: newUrl + '/api/kvsc/ct/page',
    method: 'post',
    params: query
  })
}

// 电流互感器删除接口
export function electricDellte(query) {
  return request({
    url: newUrl + '/api/kvsc/ct/delete/ids',
    method: 'post',
    params: query
  })
}

// 电流互感器编辑保存接口
export function electricEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/ct/update',
    method: 'post',
    data
  })
}

// 电流互感器条件查询接口
export function electricSecrch(query) {
  return request({
    url: newUrl + '/api/kvsc/ct/list',
    method: 'post',
    params: query
  })
}

// 销售项目列表接口
export function saleInfo(query) {
  return request({
    url: newUrl + '/api/so/page',
    method: 'post',
    params: query
  })
}

// 销售项目单选删除接口
export function saleDellte(data) {
  return request({
    url: newUrl + '/api/so/delete/ids',
    method: 'detele',
    data
  })
}

// 销售项目批量删除接口
export function saleDellteAll(data) {
  return request({
    url: newUrl + '/api/so/delete/all',
    method: 'detele',
    data
  })
}
