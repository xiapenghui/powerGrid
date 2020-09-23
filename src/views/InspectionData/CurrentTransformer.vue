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

      <el-table-column align="center" :label="$t('permission.pdCode')" width="150">
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

      <el-table-column align="center" :label="$t('permission.InspectionReportFile')" width="200">
        <template slot-scope="scope">
          <div class="demo-image__preview"><el-image style="width: 100px; height: 100px" :src="scope.row.InspectionReportFile" :preview-src-list="srcList" /></div>
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
    <pagination v-show="total > 0" :total="total" :current.sync="listQuery.current" :size.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import { deleteRole } from '@/api/role'
import i18n from '@/lang'
import { electricCurrent } from '@/api/tenGrid'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import { fetchList } from '@/api/article'
export default {
  components: { Pagination },
  data() {
    return {
      rolesList: [
        {
          SaleOrg: '0',
          status: '确认',
          upload: '上传',
          standardVersion: '1',
          supplierWorkNo: '2',
          supplierCode: '3',
          modelCode: '4',
          categoryType: '5',
          isAlarmData: '6',
          alarmItem: '7',
          processType: '8',
          pdCode: '9',
          checkTime: '10',
          RawMaterialSN: '11',
          ratedCurrent: '12',
          pressureValue: '13',
          pressureTime: '14',
          discharge: '15',
          InspectionReportFile: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'
        }
      ],
      srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'],
      listQuery: {
        purchaserHqCode: undefined,
        supplierCode: undefined,
        supplierName: undefined,
        dataSource: undefined,
        ownerId: undefined,
        openId: undefined,
        current: 1,
        size: 10
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
      this.listQuery.current = 1
      this.getList()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        current: 1,
        size: 10
      }
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 批量删除
    deleteAll() {},
    // 批量确认
    okAll() {},
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
      this.listLoading = true
      electricCurrent(this.listQuery).then(response => {
        console.log('response', response)
        this.rolesList = response.data.orders
        this.total = response.data.total
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
      //   debugger
      //   this.$message.error('采购订单项目ID输入错误！')
      //   return
      // } else if (!row.productCode) {
      //   this.$message.error('物质编码输入错误！')
      //   return
      // }
      // this.$message.success('恭喜你，数据保存成功！')
      // this.$set(row, 'isEgdit', false)
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
