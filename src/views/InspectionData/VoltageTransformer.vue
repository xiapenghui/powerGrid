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
          <el-col :span="16"><el-input v-model="listQuery.purchaserHqCode" :placeholder="$t('permission.purchaserHqCodeInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.supplierCode') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.supplierCode" :placeholder="$t('permission.supplierCodeInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <label class="radio-label">{{ $t('permission.supplierName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.supplierName" :placeholder="$t('permission.supplierNameInfo')" clearable /></el-col>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top:20px">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content4" placement="top-start">
              <label class="radio-label">{{ $t('permission.dataSource') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.dataSource" :placeholder="$t('permission.dataSourceInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content5" placement="top-start">
              <label class="radio-label">{{ $t('permission.ownerId') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.ownerId" :placeholder="$t('permission.ownerIdInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content6" placement="top-start">
              <label class="radio-label">{{ $t('permission.openId') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.openId" :placeholder="$t('permission.openIdInfo')" clearable /></el-col>
        </el-col>
      </el-row>

      <el-row class="center">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
        <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="danger" icon="el-icon-delete" @click="deleteAll">{{ $t('permission.deleteAll') }}</el-button>
      <el-button type="primary" icon="el-icon-check" @click="okAll">{{ $t('permission.okAll') }}</el-button>
      <el-button type="primary" icon="el-icon-document-remove" @click="handleExport">{{ $t('permission.exportOrder') }}</el-button>
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
      <el-table-column type="selection" width="55" />
      <el-table-column align="center" :label="$t('permission.SaleOrg')" width="150" fixed>
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.SaleOrg }}</span>
          <el-input v-else v-model="scope.row.SaleOrg" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.status')" width="150">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" :class="[scope.row.isConfirm === 0 ? 'classRed' : 'classGreen']">{{ scope.row.isConfirm === 0 ? '未确认' : '确认' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.upload')" width="150">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" :class="[scope.row.isUpload === 0 ? 'classRed' : 'classGreen']">{{ scope.row.isUpload === 0 ? '未上传' : '上传' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.standardVersion')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.standardVersion }}</span>
          <el-input v-else v-model="scope.row.standardVersion" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierWorkNo')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.supplierWorkNo }}</span>
          <el-input v-else v-model="scope.row.supplierWorkNo" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierCodeOther')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.supplierCode }}</span>
          <el-input v-else v-model="scope.row.supplierCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.modelCode')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.modelCode }}</span>
          <el-input v-else v-model="scope.row.modelCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.categoryType')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.categoryType }}</span>
          <el-input v-else v-model="scope.row.categoryType" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.isAlarmData')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.isAlarmData }}</span>
          <el-input v-else v-model="scope.row.isAlarmData" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.alarmItem')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.alarmItem }}</span>
          <el-input v-else v-model="scope.row.alarmItem" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.processType')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.processType }}</span>
          <el-input v-else v-model="scope.row.processType" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pdCodeOther')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.pdCode }}</span>
          <el-input v-else v-model="scope.row.pdCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.checkTime')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.checkTime }}</span>
          <el-input v-else v-model="scope.row.checkTime" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.RawMaterialSNOther')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.RawMaterialSN }}</span>
          <el-input v-else v-model="scope.row.RawMaterialSN" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ratedCurrent')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.ratedCurrent }}</span>
          <el-input v-else v-model="scope.row.ratedCurrent" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pressureValue')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.pressureValue }}</span>
          <el-input v-else v-model="scope.row.pressureValue" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pressureTime')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.pressureTime }}</span>
          <el-input v-else v-model="scope.row.pressureTime" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.discharge')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.discharge }}</span>
          <el-input v-else v-model="scope.row.discharge" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.InspectionReportFileOther')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.InspectionReportFile }}</span>
          <el-input v-else v-model="scope.row.InspectionReportFile" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-else type="success" size="small" @click="editSuccess(scope.$index, scope.row)">{{ $t('table.editSuccess') }}</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.current" :size.sync="pagination.size" @pagination="getList" />
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import i18n from '@/lang'
import { voltageList, voltageDellte, voltageEdit, voltageOk } from '@/api/tenGrid'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const fixHeight = 450
export default {
  components: { Pagination },
  data() {
    return {
      tableData: [
        // {
        //   poItemId: '',
        //   productCode: '',
        //   productName: '',
        //   productUnit: '',
        //   productAmount: '',
        //   ownerId: '',
        //   openId: '',
        //   dataSource: '',
        //   dataSourceCreateTime: ''
        // }
      ],
      pagination: {
        current: 1,
        size: 10
      },
      listQuery: {
        purchaserHqCode: undefined,
        supplierCode: undefined,
        supplierName: undefined,
        dataSource: undefined,
        ownerId: undefined,
        openId: undefined
      },
      listLoading: true,
      total: 10,
      selectedData: [], // 批量删除新数组
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      content1: this.$t('permission.purchaserHqCode'),
      content2: this.$t('permission.supplierCode'),
      content3: this.$t('permission.supplierName'),
      content4: this.$t('permission.dataSource'),
      content5: this.$t('permission.ownerId'),
      content6: this.$t('permission.openId')
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
      this.content4 = this.$t('permission.dataSource')
      this.content5 = this.$t('permission.ownerId')
      this.content6 = this.$t('permission.openId')
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
      this.getList()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        purchaserHqCode: undefined,
        supplierCode: undefined,
        supplierName: undefined,
        dataSource: undefined,
        ownerId: undefined,
        openId: undefined
      }
      this.pagination = {
        current: 1,
        size: 10
      }
      this.getList()
    },
    // 多选
    handleSelectionChange(val) {
      this.selectedData = val
    },
    // 删除数据
    handleDelete(index, row) {
      if (this.tableData.length > 0) {
        this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            voltageDellte([row.id]).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功！'
                })
                this.getList()
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    // 批量删除
    deleteAll() {
      if (this.selectedData.length > 0) {
        this.$confirm('此操作将永久删除记录, 是否继续?', '提示：' + '共选择 ' + this.selectedData.length + ' 条数据 !', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const idList = []
            this.selectedData.map(item => {
              const newFeatid = item.id
              idList.push(newFeatid)
            })
            voltageDellte(idList).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功！'
                })
                this.getList()
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    // 批量确认
    okAll() {
      if (this.selectedData.length > 0) {
        this.$confirm('此操作将批量确认, 是否继续?', '提示：' + '共选择 ' + this.selectedData.length + ' 条数据 !', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
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
            voltageOk(newId).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '操作成功！'
                })
                this.getList()
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },

    // 导出用户
    handleExport() {
      if (this.tableData.length) {
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
      voltageList(this.pagination, this.listQuery).then(res => {
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
      //
      //   this.$message.error('采购订单项目ID输入错误！')
      //   return
      // } else if (!row.productCode) {
      //   this.$message.error('物质编码输入错误！')
      //   return
      // }
      // this.$message.success('恭喜你，数据保存成功！')
      // this.$set(row, 'isEgdit', false)
      voltageEdit(row).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          this.$set(row, 'isEgdit', false)
        } else {
          this.$message({
            type: 'error',
            message: '编辑失败!'
          })
        }
      })
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
