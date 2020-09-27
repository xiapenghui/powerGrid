const newUrl = 'http://120.53.4.153:8888'
import request from '@/utils/request'

// 表格解析接口
export function analysis() {
  return request({
    url: newUrl + '/api/excel/read',
    method: 'get',
  })
}

// 电流互感器列表-分页接口
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



// 电流互感器批量确认接口
export function electricOk(data) {
  return request({
    url: newUrl + '/api/kvsc/ct/confirm/all',
    method: 'post',
    data
  })
}


//生产总表
// 生产总表列表接口
export function productionList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/ct/page',
    method: 'post',
    params: query,
    data
  })
}

// 生产总表删除接口
export function productionDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/ct/delete/ids',
    method: 'post',
    data
  })
}

// 生产总表编辑保存接口
export function productionEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/ct/update',
    method: 'post',
    data
  })
}

// 生产总表条件查询接口
export function productionSecrch(query,data) {
  return request({
    url: newUrl + '/api/kvsc/ct/list',
    method: 'post',
    params: query,
    data
  })
}

// 生产总表批量确认接口
export function productionOk(data) {
  return request({
    url: newUrl + '/api/kvsc/ct/confirm/all',
    method: 'post',
    data
  })
}



// 销售项目列表
// 销售项目列表接口
export function saleList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/ct/page',
    method: 'post',
    params: query,
    data
  })
}

// 生产总表删除接口
export function saleDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/ct/delete/ids',
    method: 'post',
    data
  })
}

// 生产总表编辑保存接口
export function saleEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/ct/update',
    method: 'post',
    data
  })
}

// 生产总表条件查询接口
export function saleSecrch(query,data) {
  return request({
    url: newUrl + '/api/kvsc/ct/list',
    method: 'post',
    params: query,
    data
  })
}

// 生产总表批量确认接口
export function saleOk(data) {
  return request({
    url: newUrl + '/api/kvsc/ct/confirm/all',
    method: 'post',
    data
  })
}
