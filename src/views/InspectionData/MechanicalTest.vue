<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.supplierWorkNo') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.supplierWorkNo" :placeholder="$t('permission.supplierWorkNo')" clearable /></el-col>
        </el-col>

        <el-col :span="8">
          <el-col :span="4">
            <el-tooltip class="item" effect="dark" placement="top-start"><label class="radio-label">创建时间:</label></el-tooltip>
          </el-col>
          <el-col :span="18">
            <el-date-picker
              v-model="listQuery.importDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="false"
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
      <el-button type="primary" icon="el-icon-download" @click="okImprot">导入文件</el-button>
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

      <el-table-column align="center" label="创建时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.upload')" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isUpload === 0" class="classBlack">未上传</el-tag>
          <el-tag v-else-if="scope.row.isUpload === 1" class="classGreen">已上传</el-tag>
          <el-tag v-else class="classRed">上传失败</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.SaleOrg')" width="100">
        <template slot-scope="scope">
          {{ scope.row.saleOrg }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.standardVersion')" width="160">
        <template slot-scope="scope">
          {{ scope.row.standardVersion }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierWorkNo')" width="120">
        <template slot-scope="scope">
          {{ scope.row.supplierWorkNo }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierCodeOther')" width="120">
        <template slot-scope="scope">
          {{ scope.row.supplierCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.modelCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.modelCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.categoryType')" width="120">
        <template slot-scope="scope">
          {{ scope.row.categoryType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.factoryCode')" width="120">
        <template slot-scope="scope">
          {{ scope.row.factoryCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierSupportId')" width="150">
        <template slot-scope="scope">
          {{ scope.row.supplierSupportId }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productModelOther')" width="150">
        <template slot-scope="scope">
          {{ scope.row.productModel }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.equipmentName')" width="120">
        <template slot-scope="scope">
          {{ scope.row.equipmentName }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.equipmentUniqueCode')" width="150">
        <template slot-scope="scope">
          {{ scope.row.equipmentUniqueCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.isAlarmData')" width="180">
        <template slot-scope="scope">
          {{ scope.row.isAlarmData }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.alarmItem')" width="120">
        <template slot-scope="scope">
          {{ scope.row.alarmItem }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.processTypeThree')" width="120">
        <template slot-scope="scope">
          {{ scope.row.processType }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.pdCodeOther')" width="120">
        <template slot-scope="scope">
          {{ scope.row.pdCode }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.checkTime')" width="150">
        <template slot-scope="scope">
          {{ scope.row.checkTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.putCenterTime')" width="150">
        <template slot-scope="scope">
          {{ scope.row.putCenterTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ContactNumOther')" width="150">
        <template slot-scope="scope">
          {{ scope.row.contactNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.MaterialSNs')" width="150">
        <template slot-scope="scope">
          {{ scope.row.mterialSN }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakTimeMax')" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakTimeMax }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakTimeMin')" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakTimeMin }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakTimeA')" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakTimeA }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakTimeB')" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakTimeB }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakTimeC')" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakTimeC }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeTimeMax')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeTimeMax }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeTimeMin')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeTimeMin }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeTimeA')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeTimeA }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeTimeB')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeTimeB }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeTimeC')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeTimeC }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeNotSameTimeUn')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeNotSameTimeUn }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeNotSameTime')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeNotSameTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakNotSameTimeUn')" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakNotSameTimeUn }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.breakNotSameTime')" width="150">
        <template slot-scope="scope">
          {{ scope.row.breakNotSameTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeBounceTimeUn')" width="150">
        <template slot-scope="scope">
          {{ scope.row.closeBounceTimeUn }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.closeBounceTime')" width="200">
        <template slot-scope="scope">
          {{ scope.row.closeBounceTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.imageFileUrl')" width="200">
        <template slot-scope="scope">
          {{ scope.row.imageFileUrl }}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.operations')" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button type="warning" size="small" @click="clickLogs(scope.row)">日志</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹窗 -->
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" v-loading="editLoading" :model="ruleForm" :rules="rules" label-width="130px" class="demo-ruleForm">
        <div class="bigUpBox">
          <div class="boxLeft">
            <el-form-item label="工厂名称" prop="saleOrg"><el-input v-model="ruleForm.saleOrg" /></el-form-item>
            <el-form-item label="供应商工单编号" prop="supplierWorkNo"><el-input v-model="ruleForm.supplierWorkNo" /></el-form-item>
            <el-form-item label="规格型号编码" prop="modelCode"><el-input v-model="ruleForm.modelCode" /></el-form-item>
            <el-form-item label="厂区编号"><el-input v-model="ruleForm.factoryCode" /></el-form-item>
            <el-form-item label="供应商产品厂内编号" prop="productModel"><el-input v-model="ruleForm.productModel" /></el-form-item>
            <el-form-item label="生产设备唯一识别号" prop="equipmentUniqueCode"><el-input v-model="ruleForm.equipmentUniqueCode" /></el-form-item>
            <el-form-item label="是告警问题数据"><el-input v-model="ruleForm.isAlarmData" /></el-form-item>
            <el-form-item label="感知过程" prop="processType"><el-input v-model="ruleForm.processType" /></el-form-item>
            <el-form-item label="采集时间" prop="checkTime">
              <el-date-picker v-model="ruleForm.checkTime" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间" />
            </el-form-item>
            <el-form-item label="断路器出厂编号(常州)" prop="contactNum"><el-input v-model="ruleForm.contactNum" /></el-form-item>
            <el-form-item label="额定分闸时间上限值" prop="breakTimeMax"><el-input v-model="ruleForm.breakTimeMax" /></el-form-item>
            <el-form-item label="A相分闸时间" prop="breakTimeA"><el-input v-model="ruleForm.breakTimeA" /></el-form-item>
            <el-form-item label="C相分闸时间" prop="breakTimeC"><el-input v-model="ruleForm.breakTimeC" /></el-form-item>
            <el-form-item label="额定合闸时间下限" prop="closeTimeMin"><el-input v-model="ruleForm.closeTimeMin" /></el-form-item>
            <el-form-item label="B相合闸时间" prop="closeTimeB"><el-input v-model="ruleForm.closeTimeB" /></el-form-item>
            <el-form-item label="合闸不同期额定值(ms)" prop="closeNotSameTimeUn"><el-input v-model="ruleForm.closeNotSameTimeUn" /></el-form-item>
            <el-form-item label="分闸不同期额定值(ms)" prop="breakNotSameTimeUn"><el-input v-model="ruleForm.breakNotSameTimeUn" /></el-form-item>
            <el-form-item label="合闸弹跳（真空断路器）额定值(ms)" prop="closeBounceTimeUn"><el-input v-model="ruleForm.closeBounceTimeUn" /></el-form-item>
          </div>
          <div class="boxRight">
            <el-form-item label="采集规范版本号" prop="standardVersion"><el-input v-model="ruleForm.standardVersion" /></el-form-item>
            <el-form-item label="国网侧供应商编码" prop="supplierCode"><el-input v-model="ruleForm.supplierCode" /></el-form-item>
            <el-form-item label="物资品类类型" prop="categoryType"><el-input v-model="ruleForm.categoryType" /></el-form-item>
            <el-form-item label="供应商产品编号"><el-input v-model="ruleForm.supplierSupportId" /></el-form-item>
            <el-form-item label="生产设备名称" prop="equipmentName"><el-input v-model="ruleForm.equipmentName" /></el-form-item>
            <el-form-item label="告警项"><el-input v-model="ruleForm.alarmItem" /></el-form-item>
            <el-form-item label="工序" prop="pdCode"><el-input v-model="ruleForm.pdCode" /></el-form-item>
            <el-form-item label="入数采中心时间" prop="putCenterTime">
              <el-date-picker v-model="ruleForm.putCenterTime" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间" />
            </el-form-item>
            <el-form-item label="成品序列号" prop="materialSN"><el-input v-model="ruleForm.materialSN" /></el-form-item>
            <el-form-item label="额定分闸时间下限值" prop="breakTimeMin"><el-input v-model="ruleForm.breakTimeMin" /></el-form-item>
            <el-form-item label="B相分闸时间" prop="breakTimeB"><el-input v-model="ruleForm.breakTimeB" /></el-form-item>
            <el-form-item label="额定合闸时间上限值" prop="closeTimeMax"><el-input v-model="ruleForm.closeTimeMax" /></el-form-item>
            <el-form-item label="A相合闸时间" prop="closeTimeA"><el-input v-model="ruleForm.closeTimeA" /></el-form-item>
            <el-form-item label="C相合闸时间" prop="closeTimeC"><el-input v-model="ruleForm.closeTimeC" /></el-form-item>
            <el-form-item label="合闸不同期" prop="closeNotSameTime"><el-input v-model="ruleForm.closeNotSameTime" /></el-form-item>
            <el-form-item label="分闸不同期(ms)" prop="breakNotSameTime"><el-input v-model="ruleForm.breakNotSameTime" /></el-form-item>
            <el-form-item label="合闸弹跳（真空断路器）(ms)" prop="closeBounceTime"><el-input v-model="ruleForm.closeBounceTime" /></el-form-item>
            <el-form-item label="机械特性试验报告"><el-input v-model="ruleForm.imageFileUrl" /></el-form-item>
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
    <el-dialog title="导入文件" :visible.sync="dialogVisible" width="30%">
      <el-upload
        class="upload-demo"
        :action="this.GLOBAL.BASE_URL + '/api/kvsc/mct/import/file'"
        :limit="1"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :auto-upload="true"
      >
        <el-button size="small" type="primary">{{ $t('table.clickUp') }}</el-button>
        <div slot="tip" class="el-upload__tip">
          {{ $t('table.onlyUpload') }}
          <b>{{ $t('table.xls') }}</b>
          {{ $t('table.or') }}
          <b>{{ $t('table.xlsx') }}</b>
          {{ $t('table.fileSize') }}
        </div>
      </el-upload>
    </el-dialog>
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.current" :size.sync="pagination.size" @pagination="getList" />
  </div>
</template>

<script>
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import i18n from '@/lang'
import { mctList, mctDellte, mctEdit, allLogs } from '@/api/tenGrid'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination4
import logDialog from '@/components/logDialog' // 日志封装
const fixHeight = 280
export default {
  name: 'MechanicalTest',
  components: { Pagination, logDialog },
  data() {
    return {
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
      srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'],
      pagination: {
        current: 1,
        size: 50,
        startTime: '',
        endTime: ''
      },
      listQuery: {
        supplierWorkNo: undefined,
        importDate: []
      },
      listLoading: true,
      editLoading: false, // 编辑loading
      total: 10,
      selectedData: [], // 批量删除新数组
      tableHeight: window.innerHeight - fixHeight, // 表格高度
      dialogTableVisible: false, // 日志弹出框
      dialogVisible: false, // 文件上传弹出框
      dialogFormVisible: false, // 编辑弹出框
      content1: this.$t('permission.supplierWorkNo'),
      rules: {
        saleOrg: [{ required: true, message: '请输入工厂', trigger: 'blur' }],
        standardVersion: [{ required: true, message: '请输入采集规范版本号', trigger: 'blur' }],
        supplierWorkNo: [{ required: true, message: '请输入供应商工单编号', trigger: 'blur' }],
        supplierCode: [{ required: true, message: '请输入国网侧供应商编码', trigger: 'blur' }],
        modelCode: [{ required: true, message: '请输入规格型号编码', trigger: 'blur' }],
        categoryType: [{ required: true, message: '请输入物资品类类型', trigger: 'blur' }],
        productModel: [{ required: true, message: '请输入供应商产品厂内编号', trigger: 'blur' }],
        equipmentName: [{ required: true, message: '请输入生产设备名称', trigger: 'blur' }],
        equipmentUniqueCode: [{ required: true, message: '请输入生产设备唯一识别号', trigger: 'blur' }],
        processType: [{ required: true, message: '请输入感知过程', trigger: 'blur' }],
        pdCode: [{ required: true, message: '请输入工序', trigger: 'blur' }],
        checkTime: [{ required: true, message: '请输入采集时间', trigger: 'blur' }],
        putCenterTime: [{ required: true, message: '请输入入数采中心时间', trigger: 'blur' }],
        contactNum: [{ required: true, message: '请输入断路器出厂编号', trigger: 'blur' }],
        materialSN: [{ required: true, message: '请输入成品序列号', trigger: 'blur' }],
        breakTimeMax: [{ required: true, message: '请输入额定分闸时间上限值', trigger: 'blur' }],
        breakTimeMin: [{ required: true, message: '请输入额定分闸时间下限值', trigger: 'blur' }],
        breakTimeA: [{ required: true, message: '请输入A相分闸时间', trigger: 'blur' }],
        breakTimeB: [{ required: true, message: '请输入B相分闸时间', trigger: 'blur' }],
        breakTimeC: [{ required: true, message: '请输入C相分闸时间', trigger: 'blur' }],
        closeTimeMax: [{ required: true, message: '请输入额定合闸时间上限值', trigger: 'blur' }],
        closeTimeMin: [{ required: true, message: '请输入额定合闸时间下限值', trigger: 'blur' }],
        closeTimeA: [{ required: true, message: '请输入A相合闸时间', trigger: 'blur' }],
        closeTimeB: [{ required: true, message: '请输入B相合闸时间', trigger: 'blur' }],
        closeTimeC: [{ required: true, message: '请输入C相合闸时间', trigger: 'blur' }],
        closeNotSameTimeUn: [{ required: true, message: '请输入合闸不同期额定值', trigger: 'blur' }],
        closeNotSameTime: [{ required: true, message: '请输入合闸不同期', trigger: 'blur' }],
        breakNotSameTimeUn: [{ required: true, message: '请输入分闸不同期额定值', trigger: 'blur' }],
        breakNotSameTime: [{ required: true, message: '请输入分闸不同期', trigger: 'blur' }],
        closeBounceTimeUn: [{ required: true, message: '请输入合闸弹跳（真空断路器）额定值', trigger: 'blur' }],
        closeBounceTime: [{ required: true, message: '请输入合闸弹跳（真空断路器）', trigger: 'blur' }]
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
    'listQuery.importDate': {
      handler(val) {
        this.pagination.startTime = val[0] + ' 00:00:00'
        this.pagination.endTime = val[1] + ' 23:59:59'
      },
      deep: true
    },
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.content1 = this.$t('permission.supplierWorkNo')
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
      if (this.listQuery.supplierWorkNo === '') {
        this.listQuery.supplierWorkNo = undefined
      }
      this.getList()
    },
    // 重置
    handleReset() {
      this.listQuery = {
        supplierWorkNo: undefined,
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
            mctDellte(idList).then(res => {
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
    // 获取列表
    getList() {
      this.listLoading = true
      mctList(this.pagination, this.listQuery).then(res => {
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
      this.dialogFormVisible = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },
    // 编辑成功
    submitForm(formName) {
      this.editLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          mctEdit(this.ruleForm).then(res => {
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
    // 文件导入
    okImprot() {
      this.dialogVisible = true
    },
    // 成功
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.$message.success(this.$t('table.upSuccess'))
        this.dialogVisible = false
        this.getList()
      }
    },
    // 失败
    handleAvatarError(res, file) {
      if (res.code === 500 && res.type === 'error') {
        this.$message.error(this.$t('table.upError'))
      }
    },
    beforeAvatarUpload(file) {
      const isXLS = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isXLS) {
        this.$message.error(this.$t('table.errorOne'))
      }
      if (!isLt2M) {
        this.$message.error(this.$t('table.errorTwo'))
      }
      return isXLS && isLt2M
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
