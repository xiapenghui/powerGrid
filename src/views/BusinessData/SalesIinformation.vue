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
          <el-col :span="16"><el-input v-model="listQuery.poItemIds" :placeholder="$t('permission.poItemIdInfos')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.productCode') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.productCode" :placeholder="$t('permission.productCodeInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <label class="radio-label">{{ $t('permission.productName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.productName" :placeholder="$t('permission.productNameInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <label class="radio-label">{{ $t('permission.productName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.productName" :placeholder="$t('permission.productNameInfo')" clearable /></el-col>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top:20px">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content4" placement="top-start">
              <label class="radio-label">{{ $t('permission.ownerId') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.ownerId" :placeholder="$t('permission.ownerIdInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content5" placement="top-start">
              <label class="radio-label">{{ $t('permission.openId') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.openId" :placeholder="$t('permission.openIdInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content6" placement="top-start">
              <label class="radio-label">{{ $t('permission.dataSource') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.dataSource" :placeholder="$t('permission.dataSourceInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <label class="radio-label">{{ $t('permission.productName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.productName" :placeholder="$t('permission.productNameInfo')" clearable /></el-col>
        </el-col>
      </el-row>

      <el-row v-show="hidden" :gutter="20" style="margin-top:20px">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content4" placement="top-start">
              <label class="radio-label">{{ $t('permission.ownerId') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.ownerId" :placeholder="$t('permission.ownerIdInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content5" placement="top-start">
              <label class="radio-label">{{ $t('permission.openId') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.openId" :placeholder="$t('permission.openIdInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content6" placement="top-start">
              <label class="radio-label">{{ $t('permission.dataSource') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.dataSource" :placeholder="$t('permission.dataSourceInfo')" clearable /></el-col>
        </el-col>
      </el-row>

      <el-row class="center">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
        <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
        <el-button v-if="toggle" size="mini" circle @click="toggleBtn"><i class="el-icon-d-arrow-left" /></el-button>
        <el-button v-if="!toggle" size="mini" circle @click="toggleBtn"><i class="el-icon-d-arrow-right" /></el-button>
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
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column align="center" :label="$t('permission.SaleOrg')" width="150" fixed sortable prop="key">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.SaleOrg }}</span>
          <el-input v-else v-model="scope.row.SaleOrg" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.status')" width="150">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" :style="{ backgroundColor: scope.row.isConfirm === 0 ? '#FF5757' : '#13ce66' }">
            {{ scope.row.isConfirm === 0 ? '未确认' : '确认' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.upload')" width="150">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" :style="{ backgroundColor: scope.row.isUpload === 0 ? '#FF5757' : '#13ce66' }">
            {{ scope.row.isUpload === 0 ? '未上传' : '上传' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.purchaserHqCode')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.purchaserHqCode }}</span>
          <el-input v-else v-model="scope.row.purchaserHqCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.soNo')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.soNo }}</span>
          <el-input v-else v-model="scope.row.soNo" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierCode')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.supplierCode }}</span>
          <el-input v-else v-model="scope.row.supplierCode" />
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.buyerCode')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.buyerCode }}</span>
          <el-input v-else v-model="scope.row.buyerCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.buyerName')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.buyerName }}</span>
          <el-input v-else v-model="scope.row.buyerName" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.buyerProvinceOther')" prop="name" sortable width="250">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.buyerProvince }}</span>
          <el-input v-else v-model="scope.row.buyerProvince" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.categoryCode')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.categoryCode }}</span>
          <el-input v-else v-model="scope.row.categoryCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.subclassCode')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.subclassCode }}</span>
          <el-input v-else v-model="scope.row.subclassCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.soStatus')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.soStatus }}</span>
          <el-input v-else v-model="scope.row.soStatus" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.soItemNo')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.soItemNo }}</span>
          <el-input v-else v-model="scope.row.soItemNo" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.poItemId')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.poItemId }}</span>
          <el-input v-else v-model="scope.row.poItemId" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productCode')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.productCode }}</span>
          <el-input v-else v-model="scope.row.productCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productName')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.productName }}</span>
          <el-input v-else v-model="scope.row.productName" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productUnit')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.productUnit }}</span>
          <el-input v-else v-model="scope.row.productUnit" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productAmount')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.productAmount }}</span>
          <el-input v-else v-model="scope.row.productAmount" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ownerId')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.ownerId }}</span>
          <el-input v-else v-model="scope.row.ownerId" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.openId')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.openId }}</span>
          <el-input v-else v-model="scope.row.openId" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataSource')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.dataSource }}</span>
          <el-input v-else v-model="scope.row.dataSource" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataSourceCreateTime')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.dataSourceCreateTime }}</span>
          <el-input v-else v-model="scope.row.dataSourceCreateTimes" />
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
import { saleList, saleDellte, saleEdit, saleOk } from '@/api/business'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const fixHeight = 440
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
      pagination: {
        current: 1,
        size: 10
      },
      listQuery: {
        poItemIds: undefined,
        productCode: undefined,
        productName: undefined,
        ownerId: undefined,
        openId: undefined,
        dataSource: undefined
      },
      listLoading: true,
      toggle: true,
      hidden: false,
      total: 10,
      downloadLoading: false,
      selectedData: [], // 批量删除新数组
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      content1: this.$t('permission.poItemIds'),
      content2: this.$t('permission.productCode'),
      content3: this.$t('permission.productName'),
      content4: this.$t('permission.ownerId'),
      content5: this.$t('permission.openId'),
      content6: this.$t('permission.dataSource')
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
      this.content2 = this.$t('permission.productCode')
      this.content3 = this.$t('permission.productName')
      this.content4 = this.$t('permission.ownerId')
      this.content5 = this.$t('permission.openId')
      this.content6 = this.$t('permission.dataSource')
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
    // 折叠搜索框
    toggleBtn() {
      this.hidden = !this.hidden
      this.toggle = !this.toggle
    },
    // 查询
    handleSearch() {
      this.pagination.current = 1
      this.getList()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        isConfirm: undefined,
        isUpload: undefined,
        supplierWorkNo: undefined
      }
      this.pagination = {
        current: 1,
        size: 10
      }
      this.getList()
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 删除数据
    handleDelete(index, row) {
      if (this.tableData.length > 0) {
        this.$confirm(this.$t('table.deleteInfo'), this.$t('table.Tips'), {
          confirmButtonText: this.$t('table.confirm'),
          cancelButtonText: this.$t('table.cancel'),
          type: 'warning'
        })
          .then(() => {
            saleDellte([row.id]).then(res => {
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
