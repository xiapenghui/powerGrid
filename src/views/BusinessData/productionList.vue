<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.supplierName') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.supplierName" :placeholder="$t('permission.supplierNameInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.ipoNo') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.ipoNo" :placeholder="$t('permission.ipoNoInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="rightBtn">
      <el-button type="danger" icon="el-icon-delete" @click="deleteAll">{{ $t('permission.deleteAll') }}</el-button>
      <el-button type="primary" icon="el-icon-check" @click="okAll">{{ $t('permission.okAll') }}</el-button>
      <el-button type="primary" icon="el-icon-upload2" @click="okUpload">上传国网</el-button>
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

      <el-table-column align="center" :label="$t('permission.isUploadProd')" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" :class="[scope.row.isUploadProd === 0 ? 'classRed' : 'classGreen']">{{ scope.row.isUploadProd === 0 ? '未上传' : '上传' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.isUploadWo')" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" :class="[scope.row.isUploadWo === 0 ? 'classRed' : 'classGreen']">{{ scope.row.isUploadWo === 0 ? '未上传' : '上传' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.isUploadSd')" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" :class="[scope.row.isUploadSd === 0 ? 'classRed' : 'classGreen']">{{ scope.row.isUploadSd === 0 ? '未上传' : '上传' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.isUploadPw')" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" :class="[scope.row.isUploadPw === 0 ? 'classRed' : 'classGreen']">{{ scope.row.isUploadPw === 0 ? '未上传' : '上传' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.purchaserHqCode')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.purchaserHqCode }}</span>
          <el-input v-else v-model="scope.row.purchaserHqCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ipoType')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.ipoType }}</span>
          <el-input v-else v-model="scope.row.ipoType" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierCode')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.supplierCode }}</span>
          <el-input v-else v-model="scope.row.supplierCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierName')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.supplierName }}</span>
          <el-input v-else v-model="scope.row.supplierName" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ipoNo')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.ipoNo }}</span>
          <el-input v-else v-model="scope.row.ipoNo" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.categoryCode')" width="130">
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

      <el-table-column align="center" :label="$t('permission.scheduleCode')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.scheduleCode }}</span>
          <el-input v-else v-model="scope.row.scheduleCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.poItemId')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.poItemId }}</span>
          <el-input v-else v-model="scope.row.poItemId" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataType')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.dataType }}</span>
          <el-input v-else v-model="scope.row.dataType" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.soItemNo')" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.soItemNo }}</span>
          <el-input v-else v-model="scope.row.soItemNo" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialsCode')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.materialsCode }}</span>
          <el-input v-else v-model="scope.row.materialsCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialsName')" :show-overflow-tooltip="true" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.materialsName }}</span>
          <el-input v-else v-model="scope.row.materialsName" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialsUnit')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.materialsUnit }}</span>
          <el-input v-else v-model="scope.row.materialsUnit" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialsDesc')" :show-overflow-tooltip="true" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.materialsDesc }}</span>
          <el-input v-else v-model="scope.row.materialsDesc" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.amount')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.amount }}</span>
          <el-input v-else v-model="scope.row.amount" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.unit')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.unit }}</span>
          <el-input v-else v-model="scope.row.unit" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productIdGrpNo')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.productIdGrpNo }}</span>
          <el-input v-else v-model="scope.row.productIdGrpNo" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productIdType')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.productIdType }}</span>
          <el-input v-else v-model="scope.row.productIdType" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productModel')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.productModel }}</span>
          <el-input v-else v-model="scope.row.productModel" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.planStartDate')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.planStartDate }}</span>
          <el-input v-else v-model="scope.row.planStartDate" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.planFinishDate')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.planFinishDate }}</span>
          <el-input v-else v-model="scope.row.planFinishDate" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.actualStartDate')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.actualStartDate }}</span>
          <el-input v-else v-model="scope.row.actualStartDate" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.actualFinishDate')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.actualFinishDate }}</span>
          <el-input v-else v-model="scope.row.actualFinishDate" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.plantName')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.plantName }}</span>
          <el-input v-else v-model="scope.row.plantName" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.workshopName')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.workshopName }}</span>
          <el-input v-else v-model="scope.row.workshopName" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ipoStatus')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.ipoStatus }}</span>
          <el-input v-else v-model="scope.row.ipoStatus" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.center')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.center }}</span>
          <el-input v-else v-model="scope.row.center" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataSource')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.dataSource }}</span>
          <el-input v-else v-model="scope.row.dataSource" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataSourceCreateTime')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.dataSourceCreateTime }}</span>
          <el-input v-else v-model="scope.row.dataSourceCreateTime" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ownerId')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.ownerId }}</span>
          <el-input v-else v-model="scope.row.ownerId" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.openId')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.openId }}</span>
          <el-input v-else v-model="scope.row.openId" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.woStatus')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.woStatus }}</span>
          <el-input v-else v-model="scope.row.woStatus" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dueDate')" width="180">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.dueDate }}</span>
          <el-input v-else v-model="scope.row.dueDate" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.processCode')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.processCode }}</span>
          <el-input v-else v-model="scope.row.processCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.processName')" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.processName }}</span>
          <el-input v-else v-model="scope.row.processName" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-else type="success" size="small" @click="editSuccess(scope.$index, scope.row)">{{ $t('table.editSuccess') }}</el-button>
          <!-- <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">{{ $t('table.delete') }}</el-button> -->
          <el-button type="warning" size="small" @click="clickLogs(scope.$index, scope.row)">日志</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="日志信息" :visible.sync="dialogTableVisible">
      <el-table border style="width: 100%" height="50vh" :data="gridData">
        <el-table-column property="username" label="操作人" width="100" align="center" />
        <el-table-column property="createTime" label="操作时间" width="150" align="center" />
        <el-table-column property="message" label="日志消息" width="150" align="center" />
        <el-table-column property="responseBody" label="相应消息" align="center" />
      </el-table>
      <!-- <pagination v-show="total > 0" :total="total" :current.sync="pagination.current" :size.sync="pagination.size" @pagination="getList" /> -->
    </el-dialog>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.current" :size.sync="pagination.size" @pagination="getList" />
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import i18n from '@/lang'
import { productionList, productionDellte, productionEdit, productionOk, productionUpload, productionLogs } from '@/api/business'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const fixHeight = 320
export default {
  components: { Pagination },
  data() {
    return {
      tableData: [
        // {
        //   SaleOrg: '0',
        //   status: '确认',
        //   upload: '上传',
        //   standardVersion: '1',
        //   supplierWorkNo: '2',
        //   supplierCode: '3',
        //   modelCode: '4',
        //   categoryType: '5',
        //   isAlarmData: '6',
        //   alarmItem: '7',
        //   processType: '8',
        //   pdCode: '9',
        //   checkTime: '10',
        //   RawMaterialSN: '11',
        //   ratedCurrent: '12',
        //   pressureValue: '13',
        //   pressureTime: '14',
        //   discharge: '15',
        //   InspectionReportFile: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'
        // }
      ],
      gridData: [], // 日志信息
      srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'],
      pagination: {
        current: 1,
        size: 50
      },
      listQuery: {
        supplierName: undefined,
        ipoNo: undefined
      },
      listLoading: true,
      total: 10,
      selectedData: [], // 批量删除新数组
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogTableVisible: false,
      content1: this.$t('permission.supplierName'),
      content2: this.$t('permission.ipoNo')
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
      this.content1 = this.$t('permission.supplierName')
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
      if (this.listQuery.supplierName === '') {
        this.listQuery.supplierName = undefined
      }
      if (this.listQuery.ipoNo === '') {
        this.listQuery.ipoNo = undefined
      }
      this.getList()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        supplierName: undefined,
        ipoNo: undefined
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
    //   });
    //   if (this.tableData.length > 0) {
    //     this.$confirm(this.$t('table.deleteInfo'), this.$t('table.Tips'), {
    //       confirmButtonText: this.$t('table.confirm'),
    //       cancelButtonText: this.$t('table.cancel'),
    //       type: 'warning'
    //     })
    //       .then(() => {
    //         productionDellte([row.id]).then(res => {
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
      productionLogs({ dataId: row.id }).then(res => {
        if (res.data.length > 0) {
          this.dialogTableVisible = true
          this.gridData = res.data
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
            productionDellte(idList).then(res => {
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
            productionOk(newId).then(res => {
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
    // 获取列表
    getList() {
      this.listLoading = true
      productionList(this.pagination, this.listQuery).then(res => {
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
      productionEdit(row).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: this.$t('table.editSuc')
          })
          this.$set(row, 'isEgdit', false)
        } else {
          this.$message({
            type: 'error',
            message: this.$t('table.editErr')
          })
        }
      })
    },
    // 上传
    okUpload() {
      productionUpload().then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '上传成功！'
          })
        }
        this.getList()
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
