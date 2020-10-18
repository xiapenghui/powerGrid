<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.purchaserHqCode') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.purchaserHqCode" :placeholder="$t('permission.purchaserHqCodeInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.supplierCode') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.supplierCode" :placeholder="$t('permission.supplierCodeInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <label class="radio-label">{{ $t('permission.supplierName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="pagination.supplierName" :placeholder="$t('permission.supplierNameInfo')" clearable /></el-col>
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
          {{ scope.row.saleOrg }}
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

      <el-table-column align="center" :label="$t('permission.purchaserHqCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.purchaserHqCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.supplierCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierName')" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.supplierName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productCodeOther')" width="120">
        <template slot-scope="scope">
          {{ scope.row.productCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productNameOther')" width="150">
        <template slot-scope="scope">
          {{ scope.row.productName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productAmounts')" width="150">
        <template slot-scope="scope">
          {{ scope.row.productAmount }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productUnits')" width="150">
        <template slot-scope="scope">
          {{ scope.row.productUnit }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ownerId')" width="120">
        <template slot-scope="scope">
          {{ scope.row.ownerId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.openId')" width="120">
        <template slot-scope="scope">
          {{ scope.row.openId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.poNo')" width="150">
        <template slot-scope="scope">
          {{ scope.row.poNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.batchCodeOther')" width="120">
        <template slot-scope="scope">
          {{ scope.row.batchCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.purchaseName')" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.purchaseName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataSource')" width="120">
        <template slot-scope="scope">
          {{ scope.row.dataSource }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataSourceCreatetime')" width="150">
        <template slot-scope="scope">
          {{ scope.row.dataSourceCreatetime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.remark')" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.remark }}
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

    <!-- 编辑弹窗 -->
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="130px" class="demo-ruleForm">
        <div class="boxLeft">
          <el-form-item label="工厂名称" prop="saleOrg"><el-input v-model="ruleForm.saleOrg" /></el-form-item>
          <el-form-item label="供应商编码" prop="supplierCode"><el-input v-model="ruleForm.supplierCode" /></el-form-item>
          <el-form-item label="原材料名称" prop="matName"><el-input v-model="ruleForm.matName" /></el-form-item>
          <el-form-item label="原材料库存数量" prop="matNum"><el-input v-model="ruleForm.matNum" /></el-form-item>
          <el-form-item label="数据拥有方"><el-input v-model="ruleForm.ownerId" /></el-form-item>
          <el-form-item label="国网采购订单号"><el-input v-model="ruleForm.poNo" /></el-form-item>
          <el-form-item label="当前入库批次库存剩余数量" prop="productAmount"><el-input v-model="ruleForm.productAmount" /></el-form-item>
          <el-form-item label="数据来源" prop="dataSource"><el-input v-model="ruleForm.dataSource" /></el-form-item>
          <el-form-item label="备注" prop="remark"><el-input v-model="ruleForm.remark" /></el-form-item>
        </div>
        <div class="boxRight">
          <el-form-item label="采购方总部编码" prop="purchaserHqCode"><el-input v-model="ruleForm.purchaserHqCode" /></el-form-item>
          <el-form-item label="供应商名称" prop="supplierName"><el-input v-model="ruleForm.supplierName" /></el-form-item>
          <el-form-item label="原材料编码" prop="matCode"><el-input v-model="ruleForm.matCode" /></el-form-item>
          <el-form-item label="计量单位" prop="productUnit"><el-input v-model="ruleForm.productUnit" /></el-form-item>
          <el-form-item label="数据可见方"><el-input v-model="ruleForm.openId" /></el-form-item>
          <el-form-item label="入库批次号" prop="batchCode"><el-input v-model="ruleForm.batchCode" /></el-form-item>
          <el-form-item label="采购方公司名称" prop="purchaseName"><el-input v-model="ruleForm.purchaseName" /></el-form-item>
          <el-form-item label="来源数据创建时间" prop="dataSourceCreateTime">
            <el-date-picker v-model="ruleForm.dataSourceCreateTime" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间" />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </div>
    </el-dialog>

    <!-- 日志弹窗 -->
    <el-dialog title="日志信息" :visible.sync="dialogTableVisible">
      <el-table border style="width: 100%" height="50vh" :data="gridData">
        <el-table-column property="username" label="操作人" width="100" align="center" />
        <el-table-column property="createTime" label="操作时间" width="150" align="center" />
        <el-table-column property="message" label="日志消息" width="150" align="center" />
        <el-table-column label="状态" width="150" align="center">
          k
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
      <el-upload
        class="upload-demo"
        :action="this.GLOBAL.BASE_URL + '/api/eip/pi/import/file'"
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
import { piList, piDellte, piEdit, piOk, piUpload, allLogs } from '@/api/business'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const fixHeight = 320
export default {
  components: { Pagination },
  data() {
    return {
      tableData: [],
      gridData: [], // 日志信息
      ruleForm: {}, // 编辑弹窗
      pagination: {
        current: 1,
        size: 50
      },
      listQuery: {
        soNo: undefined
      },
      listLoading: true,
      editLoading: false, // 编辑loading
      total: 10,
      downloadLoading: false,
      selectedData: [], // 批量删除新数组
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogTableVisible: false, // 日志弹出框
      dialogVisible: false, // 文件上传弹出框
      dialogFormVisible: false, // 编辑弹出框
      content1: this.$t('permission.purchaserHqCode'),
      content2: this.$t('permission.supplierCode'),
      content3: this.$t('permission.supplierName'),
      rules: {
        saleOrg: [{ required: true, message: '请输入工厂', trigger: 'blur' }],
        purchaserHqCode: [{ required: true, message: '请输入采购方总部编码', trigger: 'blur' }],
        supplierCode: [{ required: true, message: '请输入供应商编码', trigger: 'blur' }],
        supplierName: [{ required: true, message: '请输入供应商名称', trigger: 'blur' }],
        productCode: [{ required: true, message: '请输入产成品编码', trigger: 'blur' }],
        productName: [{ required: true, message: '请输入产成品名称', trigger: 'blur' }],
        productAmount: [{ required: true, message: '请输入产成品库存剩余数量', trigger: 'blur' }],
        productUnit: [{ required: true, message: '请输入计量单位', trigger: 'blur' }],
        batchCode: [{ required: true, message: '请输入入库批次号', trigger: 'blur' }],
        dataSource: [{ required: true, message: '请输入数据来源', trigger: 'blur' }],
        dataSourceCreateTime: [{ required: true, message: '请输入来源数据创建时间', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入备注', trigger: 'blur' }]
      }
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
      this.content1 = this.$t('permission.purchaserHqCode')
      this.content2 = this.$t('permission.supplierCode')
      this.content3 = this.$t('permission.supplierName')
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
    //         piDellte([row.id]).then(res => {
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
            piDellte(idList).then(res => {
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
            piOk(newId).then(res => {
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
      piList(this.pagination, this.listQuery).then(res => {
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
      this.dialogFormVisible = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },
    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          piEdit(this.ruleForm).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: this.$t('table.editSuc')
              })
              this.editLoading = false
              this.dialogFormVisible = false
              this.getList()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 上传
    okUpload() {
      piUpload().then(res => {
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
