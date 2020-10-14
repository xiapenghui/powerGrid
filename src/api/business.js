
const newUrl = 'http://192.168.1.192:8888'
// const newUrl = 'http://39.101.166.244:8888'
import request from '@/utils/request'

// 生产总表
// 生产总表列表接口
export function productionList(query, data) {
  return request({
    url: newUrl + '/api/eip/prod/page',
    method: 'post',
    params: query,
    data
  })
}

// 生产总表删除接口
export function productionDellte(data) {
  return request({
    url: newUrl + '/api/eip/prod/delete/ids',
    method: 'post',
    data
  })
}

// 生产总表编辑保存接口
export function productionEdit(data) {
  return request({
    url: newUrl + '/api/eip/prod/update',
    method: 'post',
    data
  })
}

// 生产总表批量确认接口
export function productionOk(data) {
  return request({
    url: newUrl + '/api/eip/prod/confirm/ids',
    method: 'post',
    data
  })
}

// 生产总表上传接口
export function productionUpload() {
  return request({
    url: newUrl + '/api/eip/prod/upload',
    method: 'get'
  })
}

// 生产总表日志查询接口
export function productionLogs(data) {
  return request({
    url: newUrl + '/api/eip/prod/logs',
    method: 'post',
    data
  })
}

// 销售项目列表
// 销售项目列表接口
export function saleList(query, data) {
  return request({
    url: newUrl + '/api/eip/so/page',
    method: 'post',
    params: query,
    data
  })
}

// 销售项目删除接口
export function saleDellte(data) {
  return request({
    url: newUrl + '/api/eip/so/delete/ids',
    method: 'post',
    data
  })
}

// 销售项目编辑保存接口
export function saleEdit(data) {
  return request({
    url: newUrl + '/api/eip/so/update',
    method: 'post',
    data
  })
}

// 销售项目批量确认接口
export function saleOk(data) {
  return request({
    url: newUrl + '/api/eip/so/confirm/ids',
    method: 'post',
    data
  })
}

// 销售订单上传接口
export function saleUpload() {
  return request({
    url: newUrl + '/api/eip/so/upload',
    method: 'get'
  })
}

// 销售订单日志查询接口
export function saleLogs(data) {
  return request({
    url: newUrl + '/api/eip/so/logs',
    method: 'post',
    data
  })
}
