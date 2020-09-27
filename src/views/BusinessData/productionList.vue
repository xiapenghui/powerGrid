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

      <el-table-column align="center" :label="$t('permission.purchaserHqCode')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.purchaserHqCode }}</span>
          <el-input v-else v-model="scope.row.purchaserHqCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ipoType')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.ipoType }}</span>
          <el-input v-else v-model="scope.row.ipoType" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.supplierCode')" width="150">
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

      <el-table-column align="center" :label="$t('permission.ipoNo')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.ipoNo }}</span>
          <el-input v-else v-model="scope.row.ipoNo" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.categoryCode')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.categoryCode }}</span>
          <el-input v-else v-model="scope.row.categoryCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.subclassCode')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.subclassCode }}</span>
          <el-input v-else v-model="scope.row.subclassCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.scheduleCode')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.scheduleCode }}</span>
          <el-input v-else v-model="scope.row.scheduleCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.poItemId')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.poItemId }}</span>
          <el-input v-else v-model="scope.row.poItemId" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataType')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.dataType }}</span>
          <el-input v-else v-model="scope.row.dataType" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.soItemNo')" width="150">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.soItemNo }}</span>
          <el-input v-else v-model="scope.row.soItemNo" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialsCode')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.materialsCode }}</span>
          <el-input v-else v-model="scope.row.materialsCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialsName')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.materialsName }}</span>
          <el-input v-else v-model="scope.row.materialsName" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialsUnit')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.materialsUnit }}</span>
          <el-input v-else v-model="scope.row.materialsUnit" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.materialsDesc')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.materialsDesc }}</span>
          <el-input v-else v-model="scope.row.materialsDesc" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.amount')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.amount }}</span>
          <el-input v-else v-model="scope.row.amount" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.unit')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.unit }}</span>
          <el-input v-else v-model="scope.row.unit" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productIdGrpNo')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.productIdGrpNo }}</span>
          <el-input v-else v-model="scope.row.productIdGrpNo" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productIdType')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.productIdType }}</span>
          <el-input v-else v-model="scope.row.productIdType" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.productModel')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.productModel }}</span>
          <el-input v-else v-model="scope.row.productModel" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.planStartDate')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.planStartDate }}</span>
          <el-input v-else v-model="scope.row.planStartDate" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.planFinishDate')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.planFinishDate }}</span>
          <el-input v-else v-model="scope.row.planFinishDate" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.actualStartDate')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.actualStartDate }}</span>
          <el-input v-else v-model="scope.row.actualStartDate" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.actualFinishDate')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.actualFinishDate }}</span>
          <el-input v-else v-model="scope.row.actualFinishDate" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.plantName')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.plantName }}</span>
          <el-input v-else v-model="scope.row.plantName" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.workshopName')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.workshopName }}</span>
          <el-input v-else v-model="scope.row.workshopName" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ipoStatus')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.ipoStatus }}</span>
          <el-input v-else v-model="scope.row.ipoStatus" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.center')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.center }}</span>
          <el-input v-else v-model="scope.row.center" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataSource')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.dataSource }}</span>
          <el-input v-else v-model="scope.row.dataSource" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dataSourceCreateTime')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.dataSourceCreateTime }}</span>
          <el-input v-else v-model="scope.row.dataSourceCreateTime" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.ownerId')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.ownerId }}</span>
          <el-input v-else v-model="scope.row.ownerId" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.openId')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.openId }}</span>
          <el-input v-else v-model="scope.row.openId" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.woStatus')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.woStatus }}</span>
          <el-input v-else v-model="scope.row.woStatus" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.dueDate')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.dueDate }}</span>
          <el-input v-else v-model="scope.row.dueDate" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.processCode')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.processCode }}</span>
          <el-input v-else v-model="scope.row.processCode" />
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('permission.processName')" width="200">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.processName }}</span>
          <el-input v-else v-model="scope.row.processName" />
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
import '../../styles/scrollbar.css'
import '../../styles/commentBox.scss'
import i18n from '@/lang'
import { productionList, productionDellte, productionEdit, productionSecrch, productionOk } from '@/api/tenGrid';
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const fixHeight = 380;
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
      srcList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'],
      pagination: {
        current: 1,
        size: 10
      },
      listQuery: {
        supplierName: undefined,
        ipoNo: undefined,
      },
      listLoading: true,
      total: 10,
      ids: null,
      selectedData: [], // 批量删除新数组
      searchDate: {},
      selectedData: [], // 批量删除新数组
      tableHeight: window.innerHeight - fixHeight, //表格高度
      content1: this.$t('permission.supplierName'),
      content2: this.$t('permission.ipoNo')
    }
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
      this.content1 = this.$t('permission.supplierName')
      this.content2 = this.$t('permission.ipoNo')
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
    this.getList()
  },
  methods: {
    // 查询
    handleSearch() {
     this.listLoading = true;
     productionSecrch(this.pagination, this.listQuery).then(res => {
       if (res.data.length > 0) {
         this.tableData = res.data;
         this.total = res.data.length;
         this.listLoading = false;
       } else {
         this.listQuery.current = 1;
         this.getList();
       }
     });
    },
    // 重置
    handleReset() {
      this.pagination = {
        current: 1,
        size: 10
      };
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
    				productionDellte([row.id]).then(res => {
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

      			productionDellte(idList).then(res => {
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
    okAll() {},
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
          ]
          const filterVal = ['companyNo', 'name', 'title', 'department', 'company', 'description', 'state', 'user', 'time']
          const list = this.tableData
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
      this.listLoading = true;
      productionList(this.listQuery, this.searchDate).then(res => {
      	this.tableData = res.data.records;
      	this.total = res.data.total;
      	this.listLoading = false;
      });
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
       productionEdit(row).then(res => {
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
    },

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
