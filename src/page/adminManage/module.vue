<template>
  <div class="module-box">
    <div class="module-div header pb-20">
      <div class="module-div-left fw-600">模块名称</div>
      <div class="module-div-centen fw-600">状态</div>
      <div class="module-div-right fw-600">操作</div>
    </div>
    <div class="module-div pb-20 mt-30">
      <div class="module-div-left">三九内经</div>
      <div class="module-div-centen">{{fake==0? '关闭':'开启'}}</div>
      <div class="module-div-right">
        <el-button class="btnNo" v-if="fake!=0" @click="submit('sjnj0')" :loading="loading1">关闭</el-button>
        <el-button class="btnOff" v-else @click="submit('sjnj1')" :loading="loading2">开启</el-button>
      </div>
    </div>

    <div class="module-div pb-20">
      <div class="module-div-left">答题竞赛</div>
      <div class="module-div-centen">{{fakeTO==0? '关闭':'开启'}}</div>
      <div class="module-div-right">
        <el-button class="btnNo" v-if="fakeTO!=0" @click="submit('dtjs0')" :loading="loading3">关闭</el-button>
        <el-button class="btnOff" @click="submit('dtjs1')" v-else :loading="loading4">开启</el-button>
      </div>
    </div>
     
  </div>
</template>

<script>
let CONSTANT = require("../../constant/constant.js");
let common = require("../../common.js");
export default {
  data() {
    return {
      fake: 0,
      fakeTO: 0,
      fullscreenLoading:true,
      loading1:false,
      loading2:false,
      loading3:false,
      loading4:false,
    };
  },
  components: {},
  mounted() {
    this.getDetail();
    this.getDetailTO();
    this.openFullScreen()
  },
  methods: {
    // 获取三九内经
    getDetail() {
      const loading = this.$loading({
          lock: true,
          text: '正在加载中····',
          spinner: 'el-icon-loading',
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      let param = {};
      let url = CONSTANT.URL.Admin.GetSysvarFind_enable_fake;
      common.requestAjax(url, param, null, res => {
        this.fake = res.data.bussData;
      });
    },
    getDetailTO() {
      let param = {};
      let url = CONSTANT.URL.Admin.GetSysvarFind_enable_true;
      common.requestAjax(url, param, null, res => {
        this.fakeTO = res.data.bussData;
        // this.fullscreenLoading = false;
      });
    },
    submit(type) {
      if (type == "sjnj1") {
         this.loading2 = true;
        this.$confirm("确定开启此模块吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let param = { value: 1 };
            let url = CONSTANT.URL.Admin.AddSysvarFind_set_enable_fake;
            common.requestAjax(url, param, null, res => {
              this.getDetail();
              this.loading2 = false;
            });
          })
          .catch(() => {});
      } else if (type == "sjnj0") {
        this.loading1 = true;
        this.$confirm("确定关闭此模块吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let param = { value: 0 };
            let url = CONSTANT.URL.Admin.AddSysvarFind_set_enable_fake;
            common.requestAjax(url, param, null, res => {
              this.getDetail();
              this.loading1 = false;
            });
          })
          .catch(() => {});
      } else if (type == "dtjs1") {
          this.loading4 = true;
        //开启答题
        this.$confirm("确定开启此模块吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let param = { value: 1 };
            let url = CONSTANT.URL.Admin.AddSysvarFind_set_enable_true;
            common.requestAjax(url, param, null, res => {
              this.getDetailTO();
               this.loading4 = false;
            });
          })
          .catch(() => {});
      } else if (type == "dtjs0") {
        //关闭答题
         this.loading3 = true;
        this.$confirm("确定关闭此模块吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let param = { value: 0 };
            let url = CONSTANT.URL.Admin.AddSysvarFind_set_enable_true;
            common.requestAjax(url, param, null, res => {
              this.getDetailTO();
              this.loading3 = false;
            });
          })
          .catch(() => {});
      }
    }
  }
};
</script>

<style lang="scss" scoped >

.module-box {
  margin: 0 auto;
  text-align: center;
  .header {
    border-bottom: 1px solid #eee;
  }
  .module-div {
    display: flex;
    div {
      flex: 1;
    }
    .module-div-right {
      .btnNo {
        border-color: red;
        color: red;
        border: 1px solid red;
      }
      .btnOff {
        border-color: #008aff;
        color: #008aff;
        border: 1px solid #008aff;
      }
    }
  }
}
</style>