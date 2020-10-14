<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.poItemIds') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.soNo" :placeholder="$t('permission.poItemIdInfos')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="rightBtn">
      <el-button type="danger" icon="el-icon-delete" @click="deleteAll">{{ $t('permission.deleteAll') }}</el-button>
      <el-button type="success" icon="el-icon-check" @click="okAll">{{ $t('permission.okAll') }}</el-button>
      <el-button type="primary" icon="el-icon-upload2" @click="okUpload">上传国网</el-button>
      <el-button type="primary" icon="el-icon-download" @click="okImprot">导入文件</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="tableData"
      :height="tableHeight"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55" fixed />
      <el-table-column align="center" :label="$t('permission.SaleOrg')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.saleOrg }}</span>
          <el-input v-else v-model="scope.row.saleOrg" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.status')" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" :class="[scope.row.isConfirm === 0 ? 'classRed' : 'classGreen']">{{ scope.row.isConfirm === 0 ? '未确认' : '确认' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.upload')" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" :class="[scope.row.isUpload === 0 ? 'classRed' : 'classGreen']">{{ scope.row.isUpload === 0 ? '未上传' : '上传' }}</el-tag>
        </template>
      </el-table-column>
      s

      <el-table-column align="center" :label="$t('permission.purchaserHqCode')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.purchaserHqCode }}</span>
          <el-input v-else v-model="scope.row.purchaserHqCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.soNo')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.soNo }}</span>
          <el-input v-else v-model="scope.row.soNo" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierCode')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.supplierCode }}</span>
          <el-input v-else v-model="scope.row.supplierCode" />
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.buyerCode')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.buyerCode }}</span>
          <el-input v-else v-model="scope.row.buyerCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.buyerName')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.buyerName }}</span>
          <el-input v-else v-model="scope.row.buyerName" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.buyerProvinceOther')" width="160">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.buyerProvince }}</span>
          <el-input v-else v-model="scope.row.buyerProvince" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.categoryCode')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.categoryCode }}</span>
          <el-input v-else v-model="scope.row.categoryCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.subclassCode')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.subclassCode }}</span>
          <el-input v-else v-model="scope.row.subclassCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.soStatus')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.soStatus }}</span>
          <el-input v-else v-model="scope.row.soStatus" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.soItemNo')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.soItemNo }}</span>
          <el-input v-else v-model="scope.row.soItemNo" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.poItemId')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.poItemId }}</span>
          <el-input v-else v-model="scope.row.poItemId" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productCode')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.productCode }}</span>
          <el-input v-else v-model="scope.row.productCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productName')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.productName }}</span>
          <el-input v-else v-model="scope.row.productName" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productUnit')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.productUnit }}</span>
          <el-input v-else v-model="scope.row.productUnit" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productAmount')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.productAmount }}</span>
          <el-input v-else v-model="scope.row.productAmount" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ownerId')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.ownerId }}</span>
          <el-input v-else v-model="scope.row.ownerId" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.openId')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.openId }}</span>
          <el-input v-else v-model="scope.row.openId" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataSource')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.dataSource }}</span>
          <el-input v-else v-model="scope.row.dataSource" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataSourceCreateTime')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.dataSourceCreateTime }}</span>
          <el-input v-else v-model="scope.row.dataSourceCreateTimes" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-else type="success" size="small" @click="editSuccess(scope.$index, scope.row)">{{ $t('table.editSuccess') }}</el-button>
          <el-button type="warning" size="small" @click="clickLogs(scope.$index, scope.row)">日志</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="日志信息" :visible.sync="dialogTableVisible">
      <el-table border style="width: 100%" height="50vh" :data="gridData">
        <el-table-column property="username" label="操作人" width="100" align="center" />
        <el-table-column property="createTime" label="操作时间" width="150" align="center" />
        <el-table-column property="message" label="日志消息" width="150" align="center" />
        <!-- <el-table-column property="levelString" label="状态" align="center" />s -->
        <el-table-column label="状态" width="150" align="center">k
          <template slot-scope="scope">
            <el-tag :type="scope.row.levelString" :class="[scope.row.levelString === 'ERROR' ? 'classRed' : 'classGreen']">
              {{ scope.row.levelString === 'ERROR' ? '错误' : '成功' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column property="responseBody" label="响应消息" />
      </el-table>
      <!-- <pagination v-show="total > 0" :total="totalS" :current.sync="pagination.currentS" :size.sync="pagination.sizeS" @pagination="getListS" /> -->
    </el-dialog>

    <el-dialog title="导入文件" :visible.sync="dialogVisible" width="30%">
      <!-- action="http://192.168.1.192:8888/api/eip/so/import/file" -->
      <el-upload
        class="upload-demo"
        :action="this.GLOBAL.BASE_URL + '/api/eip/so/import/file'"
        :limit="1"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :auto-upload="true"
      >
        <el-button size="small" type="primary">{{ $t('table.clickUp') }}</el-button>
        <div slot="tip" class="el-upload__tip">
          {{ $t('table.onlyUpload') }}
          <b>{{ $t('table.xls') }}</b>
          {{ $t('table.or') }}
          <b>{{ $t('table.xlsx') }}</b>
          {{ $t('table.fileSize') }}
        </div>
      </el-upload>
    </el-dialog>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.current" :size.sync="pagination.size" @pagination="getList" />
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import i18n from '@/lang'
import { saleList, saleDellte, saleEdit, saleOk, saleUpload, allLogs } from '@/api/business'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const fixHeight = 320
export default {
  components: { Pagination },
  data() {
    return {
      tableData: [
        // {
        //   SaleOrg: '工程',
        //   status: '未确认',
        //   upload: '上传',
        //   purchaserHqCode: '123',
        //   soNo: '123',
        //   supplierCode: '123',
        //   buyerCode: '123',
        //   buyerName: '小米',
        //   buyerProvince: '河南',
        //   categoryCode: '123',
        //   subclassCode: '456',
        //   soStatus: '已完成',
        //   soItemNo: '000',
        //   poItemId: '123',
        //   productCode: '456',
        //   productName: '手机',
        //   productUnit: '个',
        //   productAmount: '10',
        //   ownerId: '小米公司',
        //   openId: '小米公司',
        //   dataSource: '小米公司',
        //   dataSourceCreateTime: '2020-09-23'
        // }
      ],
      gridData: [], // 日志信息
      pagination: {
        current: 1,
        size: 50
      },
      listQuery: {
        soNo: undefined
      },
      listLoading: true,
      total: 10,
      downloadLoading: false,
      selectedData: [], // 批量删除新数组
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogTableVisible: false, // 日志弹出框
      dialogVisible: false, // 文件上传弹出框
      content1: this.$t('permission.poItemIds')
    }
  },
  computed: {},
  watch: {
    // 监听表格高度
    tableHeight(val) {
      if (!this.timer) {
        this.tableHeight = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    },
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.content1 = this.$t('permission.poItemIds')
    }
  },
  created() {
    // 监听表格高度
    const that = this
    window.onresize = () => {
      return (() => {
        that.tableHeight = window.innerHeight - fixHeight
      })()
    }
    this.getList()
  },
  methods: {
    // 查询
    handleSearch() {
      this.pagination.current = 1
      if (this.listQuery.soNo === '') {
        this.listQuery.soNo = undefined
      }
      this.getList()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        soNo: undefined
      }
      this.pagination = {
        current: 1,
        size: 50
      }
      this.getList()
    },
    // 多选
    handleSelectionChange(val) {
      this.selectedData = val
    },
    // 删除数据
    // handleDelete(index, row) {
    //   this.$message({
    //     type: 'error',
    //     message: '功能暂未开通！'
    //   })
    //   if (this.tableData.length > 0) {
    //     this.$confirm(this.$t('table.deleteInfo'), this.$t('table.Tips'), {
    //       confirmButtonText: this.$t('table.confirm'),
    //       cancelButtonText: this.$t('table.cancel'),
    //       type: 'warning'
    //     })
    //       .then(() => {
    //         saleDellte([row.id]).then(res => {
    //           if (res.code === 0) {
    //             this.$message({
    //               type: 'success',
    //               message: this.$t('table.deleteSuccess')
    //             })
    //             this.getList()
    //           }
    //         })
    //       })
    //       .catch(() => {
    //         this.$message({
    //           type: 'info',
    //           message: this.$t('table.deleteError')
    //         })
    //       })
    //   }
    // },

    // 点击日志
    clickLogs(index, row) {
      allLogs(this.pagination, { dataId: row.id }).then(res => {
        if (res.data.records.length > 0) {
          this.dialogTableVisible = true
          this.gridData = res.data.records
        } else {
          this.dialogTableVisible = false
          this.$message('此条数据暂无操作日志！')
        }
      })
    },
    // 批量删除
    deleteAll() {
      if (this.selectedData.length > 0) {
        this.$confirm(this.$t('table.deleteInfo'), this.$t('table.Tips') + this.$t('table.total') + this.selectedData.length + this.$t('table.dataInfo'), {
          confirmButtonText: this.$t('table.confirm'),
          cancelButtonText: this.$t('table.cancel'),
          type: 'warning'
        })
          .then(() => {
            const idList = []
            this.selectedData.map(item => {
              const newFeatid = item.id
              idList.push(newFeatid)
            })
            saleDellte(idList).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.deleteSuccess')
                })
                this.getList()
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('table.deleteError')
            })
          })
      }
    },
    // 批量确认
    okAll() {
      if (this.selectedData.length > 0) {
        this.$confirm(this.$t('table.okInfo'), this.$t('table.Tips') + this.$t('table.total') + this.selectedData.length + this.$t('table.dataInfo'), {
          confirmButtonText: this.$t('table.confirm'),
          cancelButtonText: this.$t('table.cancel'),
          type: 'warning'
        })
          .then(() => {
            const newId = []
            this.selectedData.map(item => {
              const newConfirm = item.isConfirm
              if (newConfirm === 0) {
                newId.push(item.id)
              }
            })
            saleOk(newId).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: this.$t('table.operationSuccess')
                })
                this.getList()
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('table.operationError')
            })
          })
      }
    },

    // 导出用户
    handleExport() {
      if (this.tableData.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = [
            this.$t('permission.companyNo'),
            this.$t('permission.companyName'),
            this.$t('permission.title'),
            this.$t('permission.department'),
            this.$t('permission.company'),
            this.$t('permission.description'),
            this.$t('permission.state'),
            this.$t('permission.user'),
            this.$t('permission.time')
          ]
          const filterVal = ['companyNo', 'name', 'title', 'department', 'company', 'description', 'state', 'user', 'time']
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data
          })
        })
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
    },
    // 导出用户
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 获取列表
    getList() {
      this.listLoading = true
      saleList(this.pagination, this.listQuery).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
        this.listLoading = false
      })
    },

    i18n(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`)
        if (route.children) {
          route.children = this.i18n(route.children)
        }
        return route
      })
      return app
    },
    // 编辑
    handleEdit(index, row) {
      this.$set(row, 'isEgdit', true)
    },
    // 编辑成功
    editSuccess(index, row) {
      // if (row.poItemId === '') {
      //   debugger;
      //   this.$message.error('采购订单项目ID输入错误！');
      //   return;
      // } else if (!row.productCode) {
      //   this.$message.error('物质编码输入错误！');
      //   return;
      // }
      // this.$message.success('恭喜你，数据保存成功！');
      // this.$set(row, 'isEgdit', false);
      saleEdit(row).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: this.$t('table.editSuc')
          })
          this.$set(row, 'isEgdit', false)
        } else {
          this.$message({
            type: 'error',
            message: this.$t('table.editErr')('table.editErr')
          })
        }
      })
    },
    // 上传
    okUpload() {
      saleUpload().then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '上传成功！'
          })
        }
        this.getList()
      })
    },
    // 文件导入
    okImprot() {
      this.dialogVisible = true
    },
    // 成功
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        debugger
        this.$message.success(this.$t('table.upSuccess'))
        this.dialogVisible = false
        this.getList()
      }
    },
    // 失败
    handleAvatarError(res, file) {
      if (res.code === 500 && res.type === 'error') {
        this.$message.error(this.$t('table.upError'))
      }
    },
    beforeAvatarUpload(file) {
      const isXLS = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isXLS) {
        this.$message.error(this.$t('table.errorOne'))
      }
      if (!isLt2M) {
        this.$message.error(this.$t('table.errorTwo'))
      }
      return isXLS && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
