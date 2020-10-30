// const newUrl = 'http://192.168.1.192'
const newUrl = 'http://39.101.166.244'
import request from '@/utils/request'

// 所有日志查询接口
export function allLogs(query, data) {
  return request({
    url: newUrl + '/api/sys/logs/dataId',
    method: 'post',
    params: query,
    data
  })
}

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

// 辅助回路绝缘测试列表
// 辅助回路绝缘测试列表接口
export function routerList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/acit/page',
    method: 'post',
    params: query,
    data
  })
}

// 辅助回路绝缘测试删除接口
export function routerDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/acit/delete/ids',
    method: 'post',
    data
  })
}

// 辅助回路绝缘测试编辑保存接口
export function routerEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/acit/update',
    method: 'post',
    data
  })
}

// 辅助回路绝缘测试批量确认接口
export function routerOk(data) {
  return request({
    url: newUrl + '/api/kvsc/acit/confirm/ids',
    method: 'post',
    data
  })
}

// 电气连锁列表
//  电气连锁列表接口
export function electricalList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/ei/page',
    method: 'post',
    params: query,
    data
  })
}

//  电气连锁删除接口
export function electricalDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/ei/delete/ids',
    method: 'post',
    data
  })
}

//  电气连锁编辑保存接口
export function electricalEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/ei/update',
    method: 'post',
    data
  })
}

//  电气连锁批量确认接口
export function electricalOk(data) {
  return request({
    url: newUrl + '/api/kvsc/ei/confirm/ids',
    method: 'post',
    data
  })
}

// 整柜工频耐压试验列表
//  整柜工频耐压试验列表接口
export function fcpwvtList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/fcpfwvt/page',
    method: 'post',
    params: query,
    data
  })
}

//  整柜工频耐压试验删除接口
export function fcpwvtDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/fcpfwvt/delete/ids',
    method: 'post',
    data
  })
}

// 整柜工频耐压试验编辑保存接口
export function fcpwvtEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/fcpfwvt/update',
    method: 'post',
    data
  })
}

//  整柜工频耐压试验批量确认接口
export function fcpwvtOk(data) {
  return request({
    url: newUrl + '/api/kvsc/fcpfwvt/confirm/ids',
    method: 'post',
    data
  })
}

// 主回路电阻值列表
// 主回路电阻值列表接口
export function mcrList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/mcr/page',
    method: 'post',
    params: query,
    data
  })
}

//  主回路电阻值删除接口
export function mcrDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/mcr/delete/ids',
    method: 'post',
    data
  })
}

// 主回路电阻值编辑保存接口
export function mcrEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/mcr/update',
    method: 'post',
    data
  })
}

//  主回路电阻值批量确认接口
export function mcrOk(data) {
  return request({
    url: newUrl + '/api/kvsc/mcr/confirm/ids',
    method: 'post',
    data
  })
}

// 机械操作列表
// 机械操作列表接口
export function moList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/mo/page',
    method: 'post',
    params: query,
    data
  })
}

// 机械操作删除接口
export function moDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/mo/delete/ids',
    method: 'post',
    data
  })
}

// 机械操作编辑保存接口
export function moEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/mo/update',
    method: 'post',
    data
  })
}

//  机械操作批量确认接口
export function moOk(data) {
  return request({
    url: newUrl + '/api/kvsc/mo/confirm/ids',
    method: 'post',
    data
  })
}

// 机械特性试验列表
// 机械特性试验列表接口
export function mctList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/mct/page',
    method: 'post',
    params: query,
    data
  })
}

// 机械特性试验删除接口
export function mctDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/mct/delete/ids',
    method: 'post',
    data
  })
}

// 机械特性试验编辑保存接口
export function mctEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/mct/update',
    method: 'post',
    data
  })
}

//  机械特性试验批量确认接口
export function mctOk(data) {
  return request({
    url: newUrl + '/api/kvsc/mct/confirm/ids',
    method: 'post',
    data
  })
}

// 供应商管理列表
// 供应商管理列表接口
export function supplierList(query, data) {
  return request({
    url: newUrl + '/api/sys/supplier/page',
    method: 'post',
    params: query,
    data
  })
}

// 供应商管理编辑保存接口
export function supplierEdit(data) {
  return request({
    url: newUrl + '/api/sys/supplier/update',
    method: 'post',
    data
  })
}

// 供应商管理删除接口
export function supplierDellte(data) {
  return request({
    url: newUrl + '/api/sys/supplier/delete',
    method: 'post',
    data
  })
}

// 供应商管理增加接口
export function supplierAdd(data) {
  return request({
    url: newUrl + '/api/sys/supplier/add',
    method: 'post',
    data
  })
}

// 供应商管理增加接口
export function saleOrg() {
  return request({
    url: newUrl + '/api/sys/supplier/saleOrg',
    method: 'get'
  })
}

// 用户管理列表
// 用户管理列表接口
export function userList(query, data) {
  return request({
    url: newUrl + '/api/sys/user/page',
    method: 'post',
    params: query,
    data
  })
}

// 用户管理编辑保存接口
export function userEdit(data) {
  return request({
    url: newUrl + '/api/sys/user/update',
    method: 'post',
    data
  })
}

// 用户管理删除接口
export function userDellte(data) {
  return request({
    url: newUrl + '/api/sys/user/delete',
    method: 'post',
    data
  })
}

// 用户管理增加接口
export function userAdd(data) {
  return request({
    url: newUrl + '/api/sys/user/add',
    method: 'post',
    data
  })
}


// 短路器小车列表
//短路器小车列表接口
export function dlqxcList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/dlqxc/page',
    method: 'post',
    params: query,
    data
  })
}

// 短路器小车删除接口
export function dlqxcDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/dlqxc/delete/ids',
    method: 'post',
    data
  })
}

// 短路器小车编辑保存接口
export function dlqxcEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/dlqxc/update',
    method: 'post',
    data
  })
}

//  短路器小车批量确认接口
export function dlqxcOk(data) {
  return request({
    url: newUrl + '/api/kvsc/dlqxc/confirm/ids',
    method: 'post',
    data
  })
}


// 母排列表
//母排列表接口
export function npList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/np/page',
    method: 'post',
    params: query,
    data
  })
}

// 母排删除接口
export function npDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/np/delete/ids',
    method: 'post',
    data
  })
}

// 母排编辑保存接口
export function npEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/np/update',
    method: 'post',
    data
  })
}

//  母排批量确认接口
export function npOk(data) {
  return request({
    url: newUrl + '/api/kvsc/np/confirm/ids',
    method: 'post',
    data
  })
}



// 矩体材质厚度列表
//矩体材质厚度列表接口
export function cgczhdList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/cgczhd/page',
    method: 'post',
    params: query,
    data
  })
}

// 矩体材质厚度删除接口
export function cgczhdDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/cgczhd/delete/ids',
    method: 'post',
    data
  })
}

// 矩体材质厚度编辑保存接口
export function cgczhdEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/cgczhd/update',
    method: 'post',
    data
  })
}

//  矩体材质厚度批量确认接口
export function cgczhdOk(data) {
  return request({
    url: newUrl + '/api/kvsc/cgczhd/confirm/ids',
    method: 'post',
    data
  })
}



// 静触头列表
//静触头列表接口
export function jctList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/jct/page',
    method: 'post',
    params: query,
    data
  })
}

// 静触头删除接口
export function jctDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/jct/delete/ids',
    method: 'post',
    data
  })
}

// 静触头编辑保存接口
export function jctEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/jct/update',
    method: 'post',
    data
  })
}

//  静触头批量确认接口
export function jctOk(data) {
  return request({
    url: newUrl + '/api/kvsc/jct/confirm/ids',
    method: 'post',
    data
  })
}



// 静触头列表
//静触头列表接口
export function dctList(query, data) {
  return request({
    url: newUrl + '/api/kvsc/dct/page',
    method: 'post',
    params: query,
    data
  })
}

// 静触头删除接口
export function dctDellte(data) {
  return request({
    url: newUrl + '/api/kvsc/dct/delete/ids',
    method: 'post',
    data
  })
}

// 静触头编辑保存接口
export function dctEdit(data) {
  return request({
    url: newUrl + '/api/kvsc/dct/update',
    method: 'post',
    data
  })
}

//  静触头批量确认接口
export function dctOk(data) {
  return request({
    url: newUrl + '/api/kvsc/dct/confirm/ids',
    method: 'post',
    data
  })
}
