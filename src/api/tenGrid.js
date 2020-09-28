const newUrl = 'http://120.53.4.153:8888'
import request from '@/utils/request'

// 表格解析接口
export function analysis() {
  return request({
    url: newUrl + '/api/excel/read',
    method: 'get'
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
    url: newUrl + '/api/kvsc/ct/confirm/ids',
    method: 'post',
    data
  })
}

// 生产总表
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

// 销售项目删除接口
export function saleDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/ct/delete/ids',
    method: 'post',
    data
  })
}

// 销售项目编辑保存接口
export function saleEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/ct/update',
    method: 'post',
    data
  })
}

// 销售项目批量确认接口
export function saleOk(data) {
  return request({
    url: newUrl + '/api/kvsc/ct/confirm/all',
    method: 'post',
    data
  })
}

// 电压列表
// 电压列表接口
export function voltageList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/vt/page',
    method: 'post',
    params: query,
    data
  })
}

// 电压删除接口
export function voltageDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/vt/delete/ids',
    method: 'post',
    data
  })
}

// 电压编辑保存接口
export function voltageEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/vt/update',
    method: 'post',
    data
  })
}

// 电压批量确认接口
export function voltageOk(data) {
  return request({
    url: newUrl + '/api/kvsc/vt/confirm/ids',
    method: 'post',
    data
  })
}
