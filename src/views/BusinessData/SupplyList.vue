<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.supplyNo') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.supplyNo" :placeholder="$t('permission.supplyNoInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="创建时间" placement="top-start"><label class="radio-label">创建时间:</label></el-tooltip>
          </el-col>
          <el-col :span="16">
            <el-date-picker
              v-model="listQuery.importDate"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="false"
              :picker-options="pickerOptions"
              @change="importChange"
            />
          </el-col>
        </el-col>

        <el-col :span="4" class="textLeft">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('permission.search') }}</el-button>
          <el-button type="danger" icon="el-icon-refresh" @click="handleReset">{{ $t('permission.reset') }}</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="rightBtn">
      <el-button type="danger" icon="el-icon-delete" @click="deleteAll">{{ $t('permission.deleteAll') }}</el-button>
      <el-button type="primary" icon="el-icon-upload2" @click="okUpload">上传国网</el-button>
      <el-button type="primary" icon="el-icon-download" @click="okImprot">导入文件</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :header-cell-style="{ background: '#008284', color: '#ffffff' }"
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

      <el-table-column align="center" label="创建时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.upload')" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isUpload === 0" class="classBlack">未上传</el-tag>
          <el-tag v-else-if="scope.row.isUpload === 2" class="classGreen">已上传</el-tag>
          <el-tag v-else class="classRed">上传失败</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.purchaserHqCode')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.purchaserHqCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierCode')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.supplierCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplyNo')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.supplyNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.conType')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.conType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.conCode')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.conCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.sellerSignTime')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.sellerSignTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.prjName')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.prjName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.conName')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.conName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.sellerConCode')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.sellerConCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMaxCode')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.matMaxCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMedCode')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.matMedCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMinCode')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.matMinCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMaxName')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.matMaxName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMedName')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.matMedName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.matMinName')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.matMinName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.cargoName')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.cargoName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.categoryCode')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.categoryCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.subclassCode')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.subclassCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.purchaseName')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.purchaseName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.purchaseCode')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.purchaseCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.poItemNoOther')" width="120" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.poItemNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.receivedName')" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.receivedName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialCodeOther')" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.materialCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialDescOther')" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.materialDesc }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.eipMaterialCode')" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.eipMaterialCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.eipMaterialDesc')" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.eipMaterialDesc }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.amountOthers')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.measUnit')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.measUnit }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataSource')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.dataSource }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataSource')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.dataSource }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataSourceCreateTime')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.dataSourceCreateTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.remark')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ownerId')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.ownerId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.openId')" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.openId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-else type="success" size="small" @click="editSuccess(scope.$index, scope.row)">{{ $t('table.editSuccess') }}</el-button>
          <el-button type="warning" size="small" @click="clickLogs(scope.row)">日志</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹窗 -->
    <el-dialog title="编辑信息" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="130px" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">
            <el-form-item label="工厂" prop="saleOrg"><el-input v-model="ruleForm.saleOrg" :disabled="true" /></el-form-item>
            <el-form-item label="供应商编码" prop="supplierCode"><el-input v-model="ruleForm.supplierCode" /></el-form-item>
            <el-form-item label="合同类型" prop="conType"><el-input v-model="ruleForm.conType" /></el-form-item>
            <el-form-item label="合同签订日期">
              <el-date-picker v-model="ruleForm.sellerSignTime" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间" />
            </el-form-item>
            <el-form-item label="合同名称"><el-input v-model="ruleForm.conName" /></el-form-item>
            <el-form-item label="物资大类编号"><el-input v-model="ruleForm.matMaxCode" /></el-form-item>
            <el-form-item label="物资小类编号"><el-input v-model="ruleForm.matMinCode" /></el-form-item>
            <el-form-item label="物资中类名称"><el-input v-model="ruleForm.matMedName" /></el-form-item>
            <el-form-item label="货物名称" prop="cargoName"><el-input v-model="ruleForm.cargoName" /></el-form-item>
            <el-form-item label="种类编码" prop="subclassCode"><el-input v-model="ruleForm.subclassCode" /></el-form-item>
            <el-form-item label="采购方公司编码"><el-input v-model="ruleForm.purchaseCode" /></el-form-item>

            <el-tooltip class="itemrk" content="供货单行项目收货方公司名称" placement="top-start">
              <el-form-item label="供货单行项目收货方公司名称" prop="receivedName"><el-input v-model="ruleForm.receivedName" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="itemrk" content="供货单行项目物料描述" placement="top-start">
              <el-form-item label="供货单行项目物料描述" prop="materialDesc"><el-input v-model="ruleForm.materialDesc" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="itemrk" content="供货单行项目国网侧物料描述" placement="top-start">
              <el-form-item label="供货单行项目国网侧物料描述"><el-input v-model="ruleForm.eipMaterialDesc" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="itemrk" content="供货单行项目计量单位" placement="top-start">
              <el-form-item label="供货单行项目计量单位" prop="measUnit"><el-input v-model="ruleForm.measUnit" /></el-form-item>
            </el-tooltip>
            <el-tooltip class="itemrk" content="来源数据创建时间" placement="top-start">
              <el-form-item label="来源数据创建时间 " prop="dataSourceCreateTime">
                <el-date-picker v-model="ruleForm.dataSourceCreateTime" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间" />
              </el-form-item>
            </el-tooltip>

            <el-form-item label="数据拥有方"><el-input v-model="ruleForm.ownerId" /></el-form-item>
          </div>
          <div class="boxRight">
            <el-form-item label="采购方总部编码" prop="purchaserHqCode"><el-input v-model="ruleForm.purchaserHqCode" :disabled="true" /></el-form-item>
            <el-form-item label="采购供货单编号" prop="supplyNo"><el-input v-model="ruleForm.supplyNo" :disabled="true" /></el-form-item>
            <el-form-item label="合同编号" prop="conCode"><el-input v-model="ruleForm.conCode" :disabled="true" /></el-form-item>
            <el-form-item label="工程项目名称"><el-input v-model="ruleForm.prjName" :disabled="true" /></el-form-item>
            <el-form-item label="合同编号（国网经法）"><el-input v-model="ruleForm.sellerConCode" :disabled="true" /></el-form-item>
            <el-form-item label="物资中类编号"><el-input v-model="ruleForm.matMedCode" /></el-form-item>
            <el-form-item label="物资大类名称"><el-input v-model="ruleForm.matMaxName" /></el-form-item>
            <el-form-item label="物资小类名称"><el-input v-model="ruleForm.matMinName" /></el-form-item>
            <el-form-item label="品类编码" prop="categoryCode"><el-input v-model="ruleForm.categoryCode" /></el-form-item>
            <el-form-item label="采购方公司名称" prop="purchaseName"><el-input v-model="ruleForm.purchaseName" /></el-form-item>
            <el-form-item label="供货单项目号" prop="poItemNo"><el-input v-model="ruleForm.poItemNo" /></el-form-item>

            <el-tooltip class="itemrk" content="供货单行项目供应商侧物料编码" placement="top-start">
              <el-form-item label="供货单行项目供应商侧物料编码" prop="materialCode"><el-input v-model="ruleForm.materialCode" /></el-form-item>
            </el-tooltip>

            <el-tooltip class="itemrk" content="供货单行项目国网侧物料编码" placement="top-start">
              <el-form-item label="供货单行项目国网侧物料编码"><el-input v-model="ruleForm.eipMaterialCode" /></el-form-item>
            </el-tooltip>

            <el-tooltip class="itemrk" content="供货单行项目采购数量" placement="top-start">
              <el-form-item label="供货单行项目采购数量" prop="amount"><el-input v-model="ruleForm.amount" /></el-form-item>
            </el-tooltip>

            <el-form-item label="数据来源" prop="dataSource"><el-input v-model="ruleForm.dataSource" /></el-form-item>
            <el-form-item label="备注"><el-input v-model="ruleForm.remark" /></el-form-item>
            <el-form-item label="数据可见方"><el-input v-model="ruleForm.openId" /></el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </div>
    </el-dialog>

    <!-- 日志弹出框 -->
    <log-dialog :is-show="dialogTableVisible" :log-total="logTotal" :pagination-log="paginationLog" :data="gridData" @pageChange="getLogList" @closeLog="closeLog" />

    <!-- 上传文件弹窗 -->
    <ImprotFile
      :dialog-visible="dialogVisible"
      :improt-loading="improtLoading"
      :production-url="productionUrl"
      @handleavatarsuccess="handleAvatarSuccess"
      @beforeavatarupload="beforeAvatarUpload"
      @fileClose="fileClose"
    />

    <pagination v-show="total > 0" :total="total" :current.sync="pagination.current" :size.sync="pagination.size" @pagination="getList" />
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import i18n from '@/lang'
import { saList, saDellte, saEdit, saUpload, allLogs } from '@/api/business'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import logDialog from '@/components/logDialog' // 日志封装
import ImprotFile from '@/components/ImprotFile' // 文件上传文件封装
const fixHeight = 270
export default {
  name: 'SupplyList',
  components: { Pagination, logDialog, ImprotFile },
  data() {
    return {
      productionUrl: this.GLOBAL.BASE_URL + '/api/eip/sa/import/file',
      // 日志分页
      paginationLog: {
        current: 1,
        size: 10
      },
      logTotal: 0,
      logId: {}, // 日志行数据
      tableData: [],
      gridData: [], // 日志信息
      ruleForm: {}, // 编辑弹窗
      pagination: {
        current: 1,
        size: 50,
        startTime: '',
        endTime: ''
      },
      listQuery: {
        supplyNo: undefined,
        importDate: []
      },
      listLoading: true,
      editLoading: false, // 编辑loading
      improtLoading: false, // 导入文件进度loading
      total: 10,
      downloadLoading: false,
      selectedData: [], // 批量删除新数组
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogTableVisible: false, // 日志弹出框
      dialogVisible: false, // 文件上传弹出框
      dialogFormVisible: false, // 编辑弹出框
      content1: this.$t('permission.supplyNo'),
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      rules: {
        saleOrg: [{ required: true, message: '请输入工厂', trigger: 'blur' }],
        purchaserHqCode: [{ required: true, message: '请输入采购方总部编码', trigger: 'blur' }],
        supplierCode: [{ required: true, message: '请输入供应商编码', trigger: 'blur' }],
        supplyNo: [{ required: true, message: '请输入采购供货单编号', trigger: 'blur' }],
        conType: [{ required: true, message: '请输入合同类型', trigger: 'blur' }],
        conCode: [{ required: true, message: '请输入合同编号', trigger: 'blur' }],
        cargoName: [{ required: true, message: '请输入货物名称', trigger: 'blur' }],
        categoryCode: [{ required: true, message: '请输入品类编码', trigger: 'blur' }],
        subclassCode: [{ required: true, message: '请输入种类编码', trigger: 'blur' }],
        purchaseName: [{ required: true, message: '请输入采购方公司名称', trigger: 'blur' }],
        poItemNo: [{ required: true, message: '请输入供货单项目号', trigger: 'blur' }],
        receivedName: [{ required: true, message: '请输入供货单行项目收货方公司名称', trigger: 'blur' }],
        materialCode: [{ required: true, message: '请输入供货单行项目供应商侧物料编码', trigger: 'blur' }],
        materialDesc: [{ required: true, message: '请输入供货单行项目物料描述', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入供货单行项目采购数量', trigger: 'blur' }],
        measUnit: [{ required: true, message: '请输入供货单行项目计量单位', trigger: 'blur' }],
        dataSource: [{ required: true, message: '请输入数据来源', trigger: 'blur' }],
        dataSourceCreateTime: [{ required: true, message: '请输入来源数据创建时间', trigger: 'blur' }]
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
      this.content1 = this.$t('permission.supplyNo')
    },
    'listQuery.importDate': {
      handler(val) {
        this.pagination.startTime = val[0] + ' 00:00:00'
        this.pagination.endTime = val[1] + ' 23:59:59'
      },
      deep: true
    }
  },
  created() {
    // 搜索框初始化开始结束时间
    this.listQuery.importDate[0] = this.$moment(new Date())
      .subtract(1, 'months')
      .format('YYYY-MM-DD 00:00:00')
    this.listQuery.importDate[1] = this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')
    this.pagination.startTime = this.listQuery.importDate[0]
    this.pagination.endTime = this.listQuery.importDate[1]
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
    // 改变搜索框开始结束时间触发
    importChange(val) {
      this.listQuery.importDate[0] = val[0]
      this.listQuery.importDate[1] = val[1]
    },
    // 查询
    handleSearch() {
      this.pagination.current = 1
      if (this.listQuery.supplyNo === '') {
        this.listQuery.supplyNo = undefined
      }
      this.getList()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        supplyNo: undefined,
        importDate: [
          this.$moment(new Date())
            .subtract(1, 'months')
            .format('YYYY-MM-DD'),
          this.$moment(new Date()).format('YYYY-MM-DD')
        ]
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
    // 点击日志
    clickLogs(row) {
      this.logId = row
      allLogs(this.paginationLog, { dataId: row.id }).then(res => {
        if (res.data.records.length > 0) {
          this.dialogTableVisible = true
          this.gridData = res.data.records
          this.logTotal = res.data.total
        } else {
          this.dialogTableVisible = false
          this.$message('此条数据暂无操作日志！')
        }
      })
    },
    // 日志分页
    getLogList(val) {
      this.paginationLog = val
      this.clickLogs(this.logId)
    },
    //  关闭日志弹窗
    closeLog() {
      this.dialogTableVisible = false
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
            saDellte(idList).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.message
                })
                this.getList()
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: this.$t('table.deleteError')
            })
          })
      }
    },

    // 获取列表
    getList() {
      this.listLoading = true
      saList(this.pagination, this.listQuery).then(res => {
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
      this.ruleForm = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          saEdit(this.ruleForm).then(res => {
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
          this.editLoading = false
          this.$message({
            type: 'error',
            message: '必填项不能为空'
          })
          return false
        }
      })
    },
    // 上传
    okUpload() {
      this.listLoading = true
      saUpload().then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '操作成功！'
          })
        }
        this.getList()
        this.listLoading = false
      })
    },
    // 文件导入
    okImprot() {
      this.dialogVisible = true
    },
    // 关闭导入文件弹窗
    fileClose() {
      this.dialogVisible = false
    },
    // 成功
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.$message.success(this.$t('table.upSuccess'))
        this.dialogVisible = false
        this.improtLoading = false
        this.getList()
      } else {
        this.$message({
          message: res.message,
          type: 'error',
          duration: 5000
        })
        this.dialogVisible = false
        this.improtLoading = false
      }
    },
    beforeAvatarUpload(file) {
      const isXLS = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const isLt50M = file.size / 1024 / 1024 < 50

      if (!isXLS) {
        this.$message.error(this.$t('table.errorOne'))
      }
      if (!isLt50M) {
        this.$message.error(this.$t('table.errorTwo'))
      }
      this.improtLoading = true
      return isXLS && isLt50M
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
