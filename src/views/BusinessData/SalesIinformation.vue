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
      <el-table-column align="center" :label="$t('permission.poItemId')" width="150" fixed sortable prop="key">
        <template slot-scope="scope">
          {{ scope.row.poItemId }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.productCode')" width="150">
        <template slot-scope="scope">
          {{ scope.row.productCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.productName')" width="150">
        <template slot-scope="scope">
          {{ scope.row.productName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.productUnit')" width="150">
        <template slot-scope="scope">
          {{ scope.row.productUnit }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.productAmount')" width="150">
        <template slot-scope="scope">
          {{ scope.row.productAmount }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ownerId')" width="150">
        <template slot-scope="scope">
          {{ scope.row.ownerId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.openId')" prop="name" sortable width="250">
        <template slot-scope="scope">
          {{ scope.row.openId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataSource')" width="200">
        <template slot-scope="scope">
          {{ scope.row.dataSource }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.dataSourceCreateTime')" width="200">
        <template slot-scope="scope">
          {{ scope.row.dataSourceCreateTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">{{ $t('table.edit') }}</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">{{ $t('table.delete') }}</el-button>
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
      routes: [],
      rolesList: [
        {
          poItemId: '',
          productCode: '',
          productName: '',
          productUnit: '',
          productAmount: '',
          ownerId: '',
          openId: '',
          dataSource: '',
          dataSourceCreateTime: ''
        }
      ],
      form: {
        companyNo: '',
        companyName: '',
        showReviewer: false,
        page: 1,
        limit: 20
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
    // Mock: get all routes and roles list from server
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
        limit: 20
      }
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
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
    handleEdit() {},
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
