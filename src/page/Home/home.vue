<template>
  <div class="home-box h-100">
    <div class="home-header">
      <el-button>本周数据</el-button>
      <el-button>历史数据</el-button>
      <span>
        <el-date-picker v-model="year" align="right" type="year" placeholder="选择年"></el-date-picker>
        <span class="demonstration fs-16">年</span>
      </span>
      <span>
        <el-select v-model="month" placeholder="请选择">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <span class="demonstration fs-16">月</span>
      </span>
      <span>
        <el-select v-model="week" placeholder="请选择">
          <el-option v-for="item in 4" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <span class="demonstration fs-16">周</span>
      </span>
      <el-button type="primary">查询</el-button>
    </div>

    <div class="home-table flex h-100 bd-no pt-30">
      <div class="flex1 table-left bd-no">
        <div class="table-content bd-no">
          <el-table
            :data="tableData"
            style="width: 100%;text-align:center"
            :border="true"
            @selection-change="handleSelectionChange"
          >
            <el-table-column prop="userName" label="排名"></el-table-column>
            <el-table-column prop="trueName" label="姓名"></el-table-column>
            <el-table-column prop="mobile" label="部门"></el-table-column>
            <el-table-column prop="roleName" label="积分"></el-table-column>
          </el-table>
        </div>

        <div class="pagination pt-30">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageIndex"
            :page-size="pageSize"
            :page-sizes="[10,20,30,40]"
            layout="sizes, prev, pager, next"
            :total="pageCount"
          ></el-pagination>
        </div>
      </div>
      <!-- <div class="centen h-100 bg-aff">
        <div class="centen-border">1</div>
      </div>-->
      <div class="flex1 table-right">
        <div class="table-content">
          <el-table
            align="center"
            :data="tableData"
            :border="true"
            @selection-change="handleSelectionChange"
          >
            <el-table-column prop="userName" label="排名"></el-table-column>
            <el-table-column prop="trueName" label="姓名"></el-table-column>
            <el-table-column prop="mobile" label="部门"></el-table-column>
            <el-table-column prop="roleName" label="积分"></el-table-column>
          </el-table>
        </div>

        <div class="pagination pt-30">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageIndex"
            :page-size="pageSize"
            :page-sizes="[10,20,30,40]"
            layout="sizes, prev, pager, next"
            :total="pageCount"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let CONSTANT = require("../../constant/constant.js");
let common = require("../../common.js");
export default {
  name: "",
  data() {
    return {
      year: "", //年
      month: "", //月
      week: "", //  周
      tableData: [],
      pageCount: null,
      pageIndex: 1,
      pageSize: 10
    };
  },
  mounted() {
    this.getAdminList();
  },
  methods: {
    getAdminList() {
      let url = CONSTANT.URL.ADMIN.FINDADMINUSERBYPAGE;
      let dataForm = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      let data = {};
      let param = JSON.stringify(data);
      common.requestAjax(url, param, dataForm, res => {
        this.loading = false;
        let data = res.data;
        this.tableData = data.bussData;
        this.pageCount = data.pageCount * this.pageSize;
      });
    },
    handleSelectionChange(val) {},

    handleSizeChange(val) {
      this.pageSize = val;
      this.getAdminList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getAdminList();
    }
  }
};
</script>

<style  lang="scss" >
.table-left {
  border-right: 1px solid #eee;
  padding-right: 40px;
}
.table-right {
  padding-left: 100px;
}
.home-table {
  .el-table th > .cell {
    text-align: left;
    border: none;
  }
  .el-table td,
  .el-table th {
    border: none;
  }
  .el-table{
    border: none;
  }
  .el-table--border::after, .el-table--group::after, .el-table::before {
    background: #fff;
  }
}
</style>
