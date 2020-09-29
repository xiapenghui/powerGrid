<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings"><settings /></right-panel>
    </div>

    <!-- //导入文件 -->
    <el-button type="primary" size="mini" style="position: absolute;top: 10px; right: 260px;z-index: 9;" @click="dialogVisible = true">
      <i class="el-icon-folder-checked" />
    </el-button>
    <el-dialog title="文件上传" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-upload
        class="upload-demo"
        action="http://192.168.1.192:8888/api/excel/upload"
        :limit="1"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :auto-upload="true"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传
          <b>xls</b>
          或者
          <b>xlsx</b>
          文件，且不超过2M
        </div>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="closeOk">解析</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import { analysis } from '@/api/tenGrid'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    // 解析文件
    closeOk() {
      analysis().then(res => {
        debugger
      })
    },
    // 成功
    handleAvatarSuccess(res, file) {
      console.log('1', res)
      if (res.code === 200) {
        debugger
        this.$message.success('上传成功！')
      }
    },
    // 失败
    handleAvatarError(res, file) {
      alert('2', res)
      if (res.code === 500) {
        this.$message.error('上传失败！')
      }
    },
    beforeAvatarUpload(file) {
      const isXLS = file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isXLS) {
        this.$message.error('上传文件只能是xls或者xlsx格式！')
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!')
      }
      return isXLS && isLt2M
    },
    // 导入

    // 关闭弹窗
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
