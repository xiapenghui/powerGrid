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
          <el-col :span="16"><el-input v-model="form.purchaserHqCode" :placeholder="$t('permission.purchaserHqCodeInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.supplierCode') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.supplierCode" :placeholder="$t('permission.supplierCodeInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <label class="radio-label">{{ $t('permission.supplierName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.supplierName" :placeholder="$t('permission.supplierNameInfo')" clearable /></el-col>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top:20px">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content4" placement="top-start">
              <label class="radio-label">{{ $t('permission.dataSource') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.dataSource" :placeholder="$t('permission.dataSourceInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content5" placement="top-start">
              <label class="radio-label">{{ $t('permission.ownerId') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.ownerId" :placeholder="$t('permission.ownerIdInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content6" placement="top-start">
              <label class="radio-label">{{ $t('permission.openId') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="form.openId" :placeholder="$t('permission.openIdInfo')" clearable /></el-col>
        </el-col>
      </el-row>

      <el-row class="center">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
        <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-document-remove" @click="handleExport">{{ $t('permission.exportOrder') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :data="rolesList" style="width: 100%" border>
      <el-table-column align="center" :label="$t('permission.SaleOrg')" width="150" fixed>
        <template slot-scope="scope">
          {{ scope.row.SaleOrg }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.standardVersion')" width="150">
        <template slot-scope="scope">
          {{ scope.row.standardVersion }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierWorkNo')" width="150">
        <template slot-scope="scope">
          {{ scope.row.supplierWorkNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierCodeOther')" width="150">
        <template slot-scope="scope">
          {{ scope.row.supplierCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.modelCode')" width="150">
        <template slot-scope="scope">
          {{ scope.row.modelCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.categoryType')" width="150">
        <template slot-scope="scope">
          {{ scope.row.categoryType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.isAlarmData')" width="150">
        <template slot-scope="scope">
          {{ scope.row.isAlarmData }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.alarmItem')" width="150">
        <template slot-scope="scope">
          {{ scope.row.alarmItem }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.processType')" width="150">
        <template slot-scope="scope">
          {{ scope.row.processType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pdCode')" width="150">
        <template slot-scope="scope">
          {{ scope.row.pdCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.checkTime')" width="150">
        <template slot-scope="scope">
          {{ scope.row.checkTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.RawMaterialSNOther')" width="150">
        <template slot-scope="scope">
          {{ scope.row.RawMaterialSN }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ratedCurrent')" width="200">
        <template slot-scope="scope">
          {{ scope.row.ratedCurrent }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pressureValue')" width="200">
        <template slot-scope="scope">
          {{ scope.row.pressureValue }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pressureTime')" width="200">
        <template slot-scope="scope">
          {{ scope.row.pressureTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.discharge')" width="200">
        <template slot-scope="scope">
          {{ scope.row.discharge }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.InspectionReportFile')" width="200">
        <template slot-scope="scope">
          {{ scope.row.InspectionReportFile }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.InspectionReportFile')" width="200">
        <template slot-scope="scope">
          <!-- <img :src="scope.row.test" alt="" style="width: 5rem;5rem"> -->
          <div class="demo-image__preview">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.test"
              :preview-src-list="srcList"
            /></div>
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
          dataSourceCreateTime: '',
          test: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'
        }
      ],
      srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'],
      form: {
        companyNo: '',
        companyName: '',
        showReviewer: false,
        page: 1,
        limit: 20
      },
      listLoading: true,
      total: 10,
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
      this.form = {
        companyNo: '',
        fullName: '',
        companyName: '',
        showReviewer: false,
        page: 1,
        limit: 20
      }
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
