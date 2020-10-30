<template>
  <el-dialog title="日志信息" :visible.sync="isShow" :before-close="onClose">
    <el-table border style="width: 100%" height="50vh" :data="data">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="工厂">
              <span>{{ props.row.saleOrg }}</span>
            </el-form-item>
            <el-form-item label="采集规范版本号">
              <span>{{ props.row.standardVersion }}</span>
            </el-form-item>
            <el-form-item label="供应商工单编号">
              <span>{{ props.row.supplierWorkNo }}</span>
            </el-form-item>
            <el-form-item label="国网侧供应商编码">
              <span>{{ props.row.supplierCode }}</span>
            </el-form-item>
            <el-form-item label="规格型号编码">
              <span>{{ props.row.modelCode }}</span>
            </el-form-item>
            <el-form-item label="物资品类类型">
              <span>{{ props.row.categoryType }}</span>
            </el-form-item>
            <el-form-item label="是否是告警问题数据">
              <span>{{ props.row.isAlarmData }}</span>
            </el-form-item>
            <el-form-item label="告警项">
              <span>{{ props.row.alarmItem }}</span>
            </el-form-item>
            <el-form-item label="感知过程">
              <span>{{ props.row.processType }}</span>
            </el-form-item>
            <el-form-item label="工序">
              <span>{{ props.row.pdCode }}</span>
            </el-form-item>
            <el-form-item label="采集时间">
              <span>{{ props.row.checkTime }}</span>
            </el-form-item>
            <el-form-item label="入数采中心时间">
              <span>{{ props.row.putCenterTime }}</span>
            </el-form-item>
            <el-form-item label="国网PO">
              <span>{{ props.row.rawMaterialSN }}</span>
            </el-form-item>
            <el-form-item label="材质">
              <span>{{ props.row.texture }}</span>
            </el-form-item>
            <el-form-item label="镀银层厚度(μm)">
              <span>{{ props.row.silveringThickness }}</span>
            </el-form-item>
            <el-form-item label="倒角">
              <span>{{ props.row.chamfering }}</span>
            </el-form-item>
            <el-form-item label="额定电流">
              <span>{{ props.row.ratedCurrent }}</span>
            </el-form-item>
            <el-form-item label="母排长">
              <span>{{ props.row.longBusbar }}</span>
            </el-form-item>
            <el-form-item label="母排宽">
              <span>{{ props.row.wideBusbar }}</span>
            </el-form-item>
            <el-form-item label="母排片数">
              <span>{{ props.row.sliceBusbar }}</span>
            </el-form-item>
            <el-form-item label="叠放类型">
              <span>{{ props.row.stackingType }}</span>
            </el-form-item>
            <el-form-item label="电导率(%IACS)">
              <span>{{ props.row.electricalConductivity }}</span>
            </el-form-item>
            <el-form-item label="母排检验报告附件">
              <span>{{ props.row.inspectionReportFile }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="levelString" prop="levelString" />
      <el-table-column label="消息提示" prop="responseBody" />
      <el-table-column label="消息日志" prop="message" />
    </el-table>
    <pagination v-show="logTotal > 0" :total="logTotal" :current.sync="paginationLog.current" :size.sync="paginationLog.size" @pagination="getLogList" />
  </el-dialog>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
<script>
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    logTotal: {
      type: Number,
      default: 0
    },
    paginationLog: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    getLogList(val) {
      this.$emit('pageChange', val)
    },
    onClose() {
      this.$emit('closeLog')
    }
  }
}
</script>
