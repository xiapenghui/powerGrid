<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.SO_Num') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.SO_Num" :placeholder="$t('permission.SO_NumInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.MaterialSNs') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.MaterialSNs" :placeholder="$t('permission.MaterialSNInfos')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <label class="radio-label">{{ $t('permission.ContactNums') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.ContactNums" :placeholder="$t('permission.ContactNumInfos')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content4" placement="top-start">
              <label class="radio-label">{{ $t('permission.RawMaterialSN') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.RawMaterialSN" :placeholder="$t('permission.RawMaterialSNInfo')" clearable /></el-col>
        </el-col>
      </el-row>

      <el-row class="center">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
        <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
      </el-row>
    </div>
    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-document-remove" style="display: none;" @click="handleExport">{{ $t('permission.exportOrder') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :data="rolesList" style="width: 100%" border>
      <el-table-column align="center" :label="$t('permission.SaleOrg')">
        <template slot-scope="scope">
          {{ scope.row.SaleOrg }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.SO_Num')">
        <template slot-scope="scope">
          {{ scope.row.SO_Num }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.MaterialSN')">
        <template slot-scope="scope">
          {{ scope.row.MaterialSN }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.supplierName')">
        <template slot-scope="scope">
          {{ scope.row.supplierName }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.ContactNum')">
        <template slot-scope="scope">
          {{ scope.row.ContactNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.RawMaterialSN')">
        <template slot-scope="scope">
          {{ scope.row.RawMaterialSN }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')">
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
      total: 10,
      content1: this.$t('permission.SO_Num'),
      content2: this.$t('permission.MaterialSNs'),
      content3: this.$t('permission.ContactNums'),
      content4: this.$t('permission.RawMaterialSN')

    }
  },
  computed: {},
  watch: {
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.content1 = this.$t('permission.SO_Num')
      this.content2 = this.$t('permission.MaterialSNs')
      this.content3 = this.$t('permission.ContactNums')
      this.content4 = this.$t('permission.RawMaterialSN')
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getList()
  },
  methods: {
    // 查询
    handleSearch() {
      this.form.page = 1
      this.getList()
    },
    // 重置
    handleReset() {
      this.form = { }
    },

    // 导出用户
    handleExport() {
      if (this.rolesList.length) {
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
