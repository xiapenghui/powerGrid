<template>
  <div class="app-container">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
              <label class="radio-label">{{ $t('permission.isConfirm') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.isConfirm" :placeholder="$t('permission.isConfirmInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
              <label class="radio-label">{{ $t('permission.isUpload') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.isUpload" :placeholder="$t('permission.isUploadInfo')" clearable /></el-col>
        </el-col>

        <el-col :span="6">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" :content="content3" placement="top-start">
              <label class="radio-label">{{ $t('permission.supplierWorkNo') }}:</label>
            </el-tooltip>
          </el-col>
          <el-col :span="16"><el-input v-model="listQuery.supplierWorkNo" :placeholder="$t('permission.supplierWorkNoInfo')" clearable /></el-col>
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
      :data="tableData"
      :height="tableHeight"
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
          <span v-if="!scope.row.isEgdit">{{ scope.row.saleOrg }}</span>
          <el-input v-else v-model="scope.row.saleOrg" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.status')" width="150">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" :style="{ backgroundColor: scope.row.isConfirm === 0 ? '#FF5757' : '#13ce66' }">
            {{ scope.row.isConfirm === 0 ? '未确认' : '确认' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.upload')" width="150">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status" :style="{ backgroundColor: scope.row.isUpload === 0 ? '#FF5757' : '#13ce66' }">
            {{ scope.row.isUpload === 0 ? '未上传' : '上传' }}
          </el-tag>
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

      <el-table-column align="center" :label="$t('permission.checkTime')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.checkTime }}</span>
          <!-- <el-input v-else v-model="scope.row.checkTime" /> -->
          <el-date-picker v-else
          v-model="scope.row.checkTime |  dateFormat "
          type="datetime"
          placeholder="选择日期时间">
          </el-date-picker>
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

      <el-table-column align="center" :label="$t('permission.InspectionReportFile')" fixed="right" width="200">
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
    <pagination v-show="total > 0" :total="total" :current.sync="pagination.current" :size.sync="pagination.size" @pagination="getList" />
  </div>
</template>

<script>
import '../../styles/scrollbar.css';
import '../../styles/commentBox.scss';
import i18n from '@/lang';
import { electricCurrent, electricDellte, electricEdit, electricOk } from '@/api/tenGrid';
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination
import { getNowDate } from '@/api/tenGrid'
const fixHeight = 380;
export default {
  components: { Pagination },
  data() {
    return {
      tableData: [
        // {
        //   SaleOrg: '0',
        //   status: '',
        //   isConfirm: 0,
        //   isUpload: 0,
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
      srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'],
      pagination: {
        current: 1,
        size: 10
      },
      listQuery: {
        isConfirm: undefined,
        isUpload: undefined,
        supplierWorkNo: undefined
      },
      listLoading: true,
      total: 10,
      selectedData: [], // 批量删除新数组
      tableHeight: window.innerHeight - fixHeight, //表格高度
      content1: this.$t('permission.isConfirm'),
      content2: this.$t('permission.isUpload'),
      content3: this.$t('permission.supplierWorkNo')
    };
  },
  computed: {},
  watch: {
    //监听表格高度
    tableHeight(val) {
      if (!this.timer) {
        this.tableHeight = val;
        this.timer = true;
        const that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    },
    // 监听data属性中英文切换问题
    '$i18n.locale'() {
      this.content1 = this.$t('permission.isConfirm');
      this.content2 = this.$t('permission.isUpload');
      this.content3 = this.$t('permission.supplierWorkNo');
    }
  },
  created() {
    //监听表格高度
    const that = this;
    window.onresize = () => {
      return (() => {
        that.tableHeight = window.innerHeight - fixHeight;
      })();
    };
    this.getList();
  },
  methods: {
    // 查询
    handleSearch() {
      this.pagination.current = 1;
      this.getList();
    },
    // 重置
    handleReset() {
      debugger;
      this.listQuery = {
        isConfirm: undefined,
        isUpload: undefined,
        supplierWorkNo: undefined
      };
      this.pagination = {
        current: 1,
        size: 10
      };
      this.getList();
    },
    // 多选
    handleSelectionChange(val) {
      this.selectedData = val;
    },
    // 删除数据
    handleDelete(index, row) {
      if (this.tableData.length > 0) {
        this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            electricDellte([row.id]).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功！'
                });
                this.getList();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      }
    },
    // 批量删除
    deleteAll() {
      if (this.selectedData.length > 0) {
        this.$confirm('此操作将永久删除记录, 是否继续?', '提示：' + '共选择 ' + this.selectedData.length + ' 条数据 !', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const idList = [];
            this.selectedData.map(item => {
              const newFeatid = item.id;
              idList.push(newFeatid);
            });
            electricDellte(idList).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功！'
                });
                this.getList();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      }
    },
    // 批量确认
    okAll() {
      if (this.selectedData.length > 0) {
        this.$confirm('此操作将批量确认, 是否继续?', '提示：' + '共选择 ' + this.selectedData.length + ' 条数据 !', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const newId = [];
            this.selectedData.map(item => {
              const newConfirm = item.isConfirm;
              if (newConfirm === 0) {
                newId.push(item.id);
              }
            });
            electricOk(newId).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '操作成功！'
                });
                this.getList();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      }
    },
    // 导出用户
    handleExport() {
      if (this.tableData.length) {
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
          ];
          const filterVal = ['companyNo', 'name', 'title', 'department', 'company', 'description', 'state', 'user', 'time'];
          const list = this.tableData;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data
          });
        });
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        });
      }
    },
    // 导出用户
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 获取列表
    getList() {
      debugger
      this.listLoading = true;
      electricCurrent(this.pagination, this.listQuery).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
        this.listLoading = false;
      });
    },

    i18n(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`);
        if (route.children) {
          route.children = this.i18n(route.children);
        }
        return route;
      });
      return app;
    },
    // 编辑
    handleEdit(index, row) {
      this.$set(row, 'isEgdit', true);
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
      debugger;
      electricEdit(row).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          });
          this.$set(row, 'isEgdit', false);
        } else {
          this.$message({
            type: 'error',
            message: '编辑失败!'
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
