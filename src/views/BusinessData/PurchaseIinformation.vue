<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.ipoNo') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.ipoNo" :placeholder="$t('permission.ipoNoInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" placement="top-start"><label class="radio-label">确认状态:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-select v-model="listQuery.isConfirm" placeholder="请选择">
              <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="6">
            <el-tooltip class="item" effect="dark" placement="top-start"><label class="radio-label">导入时间:</label></el-tooltip>
          </el-col>
          <el-col :span="18">
            <el-date-picker v-model="listQuery.improtTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-col>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="primary" icon="el-icon-download">下载表格</el-button>
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
    >
      <el-table-column align="center" :label="$t('permission.poNo')" width="120">
        <template slot-scope="scope">
          {{ scope.row.poNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.poItemNo')" width="120">
        <template slot-scope="scope">
          {{ scope.row.poItemNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.poItemId')" width="120">
        <template slot-scope="scope">
          {{ scope.row.poItemId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.conCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.conCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.conName')" width="150">
        <template slot-scope="scope">
          {{ scope.row.conName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.buyerName')" width="120">
        <template slot-scope="scope">
          {{ scope.row.buyerName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.buyerCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.buyerCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.materialCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialDesc')" width="120">
        <template slot-scope="scope">
          {{ scope.row.materialDesc }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.amountOther')" width="120">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.sellerConCode')" width="150">
        <template slot-scope="scope">
          {{ scope.row.sellerConCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.serialNumber')" width="120">
        <template slot-scope="scope">
          {{ scope.row.serialNumber }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.sellerSignTime')" width="120">
        <template slot-scope="scope">
          {{ scope.row.sellerSignTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.conType')" :show-overflow-tooltip="true" width="120">
        <template slot-scope="scope">
          {{ scope.row.conType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.prjCode')" width="100">
        <template slot-scope="scope">
          {{ scope.row.prjCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.prjName')" :show-overflow-tooltip="true" width="200">
        <template slot-scope="scope">
          {{ scope.row.prjName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matCodeOther')" width="120">
        <template slot-scope="scope">
          {{ scope.row.matCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.fixedTechId')" width="120">
        <template slot-scope="scope">
          {{ scope.row.fixedTechId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pkgNo')" width="120">
        <template slot-scope="scope">
          {{ scope.row.pkgNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.bidBatCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.bidBatCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.extDes')" width="120">
        <template slot-scope="scope">
          {{ scope.row.extDes }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMaxCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.matMaxCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMedCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.matMedCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMinCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.matMinCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMaxName')" width="120">
        <template slot-scope="scope">
          {{ scope.row.matMaxName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMedName')" width="120">
        <template slot-scope="scope">
          {{ scope.row.matMedName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMinName')" width="120">
        <template slot-scope="scope">
          {{ scope.row.matMinName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.modifyTime')" width="120">
        <template slot-scope="scope">
          {{ scope.row.modifyTime }}
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
import { poList } from '@/api/business'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const fixHeight = 280
export default {
  components: { Pagination },
  data() {
    return {
      tableData: [],
      pagination: {
        current: 1,
        size: 50
      },
      listQuery: {
        ipoNo: undefined,
        isConfirm: undefined,
        improtTime: undefined
      },
      listLoading: true,
      total: 10,
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      // content1: this.$t('permission.supplierName'),
      content2: this.$t('permission.ipoNo'),
      statusList: [
        {
          value: '0',
          label: '未确认'
        },
        {
          value: '1',
          label: '已确认'
        }
      ]
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
      // this.content1 = this.$t('permission.supplierName')
      this.content2 = this.$t('permission.ipoNo')
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
      if (this.listQuery.status === '') {
        this.listQuery.status = undefined
      }
      if (this.listQuery.ipoNo === '') {
        this.listQuery.ipoNo = undefined
      }
      this.getList()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        status: undefined,
        ipoNo: undefined
      }
      this.pagination = {
        current: 1,
        size: 50
      }
      this.getList()
    },
    // 获取列表
    getList() {
      this.listLoading = true
      poList(this.pagination, this.listQuery).then(res => {
        debugger
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
