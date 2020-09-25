const newUrl = 'http://120.53.4.153:8888'
import request from '@/utils/request'



// 表格导入接口
export function uploadFile(data) {
  return request({
    url: newUrl + '/api/excel/upload',
    method: 'post',
    data
  })
}

// 电流互感器列表接口
export function electricCurrent(query, data) {
  return request({
    url: newUrl + '/api/kvsc/ct/page',
    method: 'post',
    params: query,
    data
  })
}

// 电流互感器删除接口
export function electricDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/ct/delete/ids',
    method: 'post',
    data
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
export function electricSecrch(query,data) {
  return request({
    url: newUrl + '/api/kvsc/ct/list',
    method: 'post',
    params: query,
    data
  })
}

// 电流互感器批量确认接口
export function electricOk(data) {
  return request({
    url: newUrl + '/api/kvsc/ct/confirm/all',
    method: 'post',
    data
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
