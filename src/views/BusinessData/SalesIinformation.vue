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
          <el-col :span="16"><el-input v-model="form.poItemIds" :placeholder="$t('permission.poItemIdInfos')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.productCode') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.productCode" :placeholder="$t('permission.productCodeInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <label class="radio-label">{{ $t('permission.productName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.productName" :placeholder="$t('permission.productNameInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <label class="radio-label">{{ $t('permission.productName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.productName" :placeholder="$t('permission.productNameInfo')" clearable /></el-col>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top:20px">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content4" placement="top-start">
              <label class="radio-label">{{ $t('permission.ownerId') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.ownerId" :placeholder="$t('permission.ownerIdInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content5" placement="top-start">
              <label class="radio-label">{{ $t('permission.openId') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.openId" :placeholder="$t('permission.openIdInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content6" placement="top-start">
              <label class="radio-label">{{ $t('permission.dataSource') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.dataSource" :placeholder="$t('permission.dataSourceInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <label class="radio-label">{{ $t('permission.productName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.productName" :placeholder="$t('permission.productNameInfo')" clearable /></el-col>
        </el-col>
      </el-row>

      <el-row v-show="hidden" :gutter="20" style="margin-top:20px">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content4" placement="top-start">
              <label class="radio-label">{{ $t('permission.ownerId') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.ownerId" :placeholder="$t('permission.ownerIdInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content5" placement="top-start">
              <label class="radio-label">{{ $t('permission.openId') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.openId" :placeholder="$t('permission.openIdInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content6" placement="top-start">
              <label class="radio-label">{{ $t('permission.dataSource') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.dataSource" :placeholder="$t('permission.dataSourceInfo')" clearable /></el-col>
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
      :data="rolesList"
      style="width: 100%"
      border
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column align="center" :label="$t('permission.SaleOrg')" width="150" fixed sortable prop="key">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.SaleOrg }}</span>
          <el-input v-else v-model="scope.row.SaleOrg" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.status')" width="150">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" :style="{ color: scope.row.status === '未确认' ? '#FF5757' : '#13ce66' }">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.upload')" width="150">
        <template slot-scope="scope">
          <el-tag :type="scope.row.upload" :style="{ color: scope.row.upload === '未上传' ? '#FF5757' : '#13ce66' }">{{ scope.row.upload }}</el-tag>
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
    <pagination v-show="total > 0" :total="total" :page.sync="form.page" :limit.sync="form.limit" @pagination="getList" />
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import { deleteRole } from '@/api/role'
import i18n from '@/lang'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      rolesList: [
        {
          SaleOrg: '工程',
          status: '未确认',
          upload: '上传',
          purchaserHqCode: '123',
          soNo: '123',
          supplierCode: '123',
          buyerCode: '123',
          buyerName: '小米',
          buyerProvince: '河南',
          categoryCode: '123',
          subclassCode: '456',
          soStatus: '已完成',
          soItemNo: '000',
          poItemId: '123',
          productCode: '456',
          productName: '手机',
          productUnit: '个',
          productAmount: '10',
          ownerId: '小米公司',
          openId: '小米公司',
          dataSource: '小米公司',
          dataSourceCreateTime: '2020-09-23'
        }

      ],
      form: {
        companyNo: '',
        companyName: '',
        showReviewer: false,
        page: 1,
        limit: 10
      },
      listLoading: true,
      toggle: true,
      hidden: false,
      total: 10,
      downloadLoading: false,
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
      this.form.page = 1
      this.getList()
    },
    // 重置
    handleReset() {
      this.form = {
        companyNo: '',
        fullName: '',
        companyName: '',
        showReviewer: false,
        page: 1,
        limit: 10
      }
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 批量删除
    deleteAll() {

    },
    // 批量确认
    okAll() {

    },

    // 导出用户
    handleExport() {
      if (this.rolesList.length) {
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
          const list = this.rolesList
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
      this.listLoading = false
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total
      //   // Just to simulate the time of the request
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
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
      if (row.poItemId === '') {
        debugger
        this.$message.error('采购订单项目ID输入错误！')
        return
      } else if (!row.productCode) {
        this.$message.error('物质编码输入错误！')
        return
      }
      this.$message.success('恭喜你，数据保存成功！')
      this.$set(row, 'isEgdit', false)
    },
    // 删除角色
    handleDelete({ $index, row }) {
      this.$confirm(this.$t('permission.errorInfo'), this.$t('permission.errorTitle'), {
        confirmButtonText: this.$t('permission.Confirm'),
        cancelButtonText: this.$t('permission.Cancel'),
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => {
          console.error(err)
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
