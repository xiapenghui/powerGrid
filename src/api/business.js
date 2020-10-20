const newUrl = 'http://192.168.1.192:8888'
// const newUrl = 'http://39.101.166.244:8888'
import request from '@/utils/request'

// 所有日志查询接口
export function allLogs(query, data) {
  return request({
    url: newUrl + '/sys/logs/dataId',
    method: 'post',
    params: query,
    data
  })
}

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

// 重点原材料列表
// 重点原材料列表接口
export function miList(query, data) {
  return request({
    url: newUrl + '/api/eip/mi/page',
    method: 'post',
    params: query,
    data
  })
}

// 重点原材料删除接口
export function miDellte(data) {
  return request({
    url: newUrl + '/api/eip/mi/delete/ids',
    method: 'post',
    data
  })
}

// 重点原材料编辑保存接口
export function miEdit(data) {
  return request({
    url: newUrl + '/api/eip/mi/update',
    method: 'post',
    data
  })
}

// 重点原材料批量确认接口
export function miOk(data) {
  return request({
    url: newUrl + '/api/eip/mi/confirm/ids',
    method: 'post',
    data
  })
}

// 重点原材料上传接口
export function miUpload() {
  return request({
    url: newUrl + '/api/eip/mi/upload',
    method: 'get'
  })
}

// 实物ID信息列表
// 实物ID信息列表接口
export function pidList(query, data) {
  return request({
    url: newUrl + '/api/eip/pid/page',
    method: 'post',
    params: query,
    data
  })
}

// 实物ID信息删除接口
export function pidDellte(data) {
  return request({
    url: newUrl + '/api/eip/pid/delete/ids',
    method: 'post',
    data
  })
}

// 实物ID信息保存接口
export function pidEdit(data) {
  return request({
    url: newUrl + '/api/eip/pid/update',
    method: 'post',
    data
  })
}

// 实物ID信息批量确认接口
export function pidOk(data) {
  return request({
    url: newUrl + '/api/eip/pid/confirm/ids',
    method: 'post',
    data
  })
}

// 实物ID信息上传接口
export function pidUpload() {
  return request({
    url: newUrl + '/api/eip/pid/upload',
    method: 'get'
  })
}

// 备品备件库存列表
// 备品备件库存列表接口
export function siList(query, data) {
  return request({
    url: newUrl + '/api/eip/si/page',
    method: 'post',
    params: query,
    data
  })
}

// 备品备件库存删除接口
export function siDellte(data) {
  return request({
    url: newUrl + '/api/eip/si/delete/ids',
    method: 'post',
    data
  })
}

// 备品备件库存保存接口
export function siEdit(data) {
  return request({
    url: newUrl + '/api/eip/si/update',
    method: 'post',
    data
  })
}

// 备品备件库存批量确认接口
export function siOk(data) {
  return request({
    url: newUrl + '/api/eip/si/confirm/ids',
    method: 'post',
    data
  })
}

// 备品备件库存上传接口
export function siUpload() {
  return request({
    url: newUrl + '/api/eip/si/upload',
    method: 'get'
  })
}

// 产成品库存列表
// 产成品库存列表接口
export function piList(query, data) {
  return request({
    url: newUrl + '/api/eip/pi/page',
    method: 'post',
    params: query,
    data
  })
}

// 产成品库存删除接口
export function piDellte(data) {
  return request({
    url: newUrl + '/api/eip/pi/delete/ids',
    method: 'post',
    data
  })
}

// 产成品库存保存接口
export function piEdit(data) {
  return request({
    url: newUrl + '/api/eip/pi/update',
    method: 'post',
    data
  })
}

// 产成品库存批量确认接口
export function piOk(data) {
  return request({
    url: newUrl + '/api/eip/pi/confirm/ids',
    method: 'post',
    data
  })
}

// 产成品库存上传接口
export function piUpload() {
  return request({
    url: newUrl + '/api/eip/pi/upload',
    method: 'get'
  })
}

// 采购订单信息列表
//  采购订单信息列表接口
export function poList(query, data) {
  return request({
    url: newUrl + '/api/eip/po/page',
    method: 'post',
    params: query,
    data
  })
}

//  采购订单信息列表接口
export function poDown() {
  return request({
    url: newUrl + '/api/eip/po/page',
    method: 'get'
  })
}
