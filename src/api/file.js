const BASEURL = 'http://localhost:3333/'
const URL = {
  getCategory: BASEURL + '/api/eip/prod/import/file', // 生产总表文件上传
  getGoodsInfo: BASEURL + 'api/eip/so/import/file'// 销售订单文件上传
}
export default {
  URL
}
