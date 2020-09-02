<template>
  <div class="app-container">
    <el-table :data="list" border style="width: 100%;" height="260">
      <el-table-column prop="firstNum" label="第一周吃的数量" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.firstNum }}</span>
          <el-input v-else v-model="scope.row.firstNum" />
        </template>
      </el-table-column>
      <el-table-column prop="secondNum" label="第二周吃的数量" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.secondNum }}</span>
          <el-input v-else v-model="scope.row.secondNum" />
        </template>
      </el-table-column>
      <el-table-column prop="thirdNum" label="第三周吃的数量" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.thirdNum }}</span>
          <el-input v-else v-model="scope.row.thirdNum" />
        </template>
      </el-table-column>
      <el-table-column prop="fourthNum" label="第四周吃的数量" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEgdit">{{ scope.row.fourthNum }}</span>
          <el-input v-else v-model="scope.row.fourthNum" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.isEgdit" type="primary" size="small" icon="el-icon-edit" circle @click="edit(scope.$index, scope.row)" />
          <el-button v-else type="success" size="small" icon="el-icon-check" circle @click="editSuccess(scope.$index, scope.row)" />
          <el-button type="danger" size="small" icon="el-icon-delete" circle @click.native.prevent="deleteItem(scope.$index, list)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          firstNum: 10,
          secondNum: 3,
          thirdNum: 4,
          fourthNum: 6
        },
        {
          id: 2,
          firstNum: 7,
          secondNum: 6,
          thirdNum: 8,
          fourthNum: 2
        }
      ]
    }
  },
  methods: {
    // 删除数据
    deleteItem(index, list) {
      list.splice(index, 1)
    },
    // 编辑数据
    edit(index, row) {
      this.$set(row, 'isEgdit', true)
    },
    // 编辑成功
    editSuccess(index, row) {
      debugger
      if (row.firstNum === '') {
        alert('1错误')
        return
      } else if (row.secondNum === '') {
        alert('2错误')
        return
      } else if (row.thirdNum === '') {
        alert('3错误')
        return
      } else if (row.fourthNum === '') {
        alert('4错误')
        return
      }
      this.$set(row, 'isEgdit', false)
    }
  }
}
</script>
