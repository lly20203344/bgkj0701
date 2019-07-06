<template>
  <div class="contain">
    <div class="header">
      <div>
        当前在线人数：
        <span>{{onlineUser}}</span>人
      </div>
      <div>
        实时对局数：
        <span>{{gameCount}}</span>局
      </div>
    </div>
    <div class="input_modal">
      <div class="input-item">
        <span>用户昵称：</span>
        <el-input
          v-model="nameLike"
          placeholder="请输入内容"
          class="proName"
          @keyup.enter.native="search"
        ></el-input>
      </div>
      <div class="input-item">
        <span>部门</span>
        <el-input
          v-model="deptLike "
          placeholder="请输入内容"
          class="proName"
          @keyup.enter.native="search"
        ></el-input>
        <el-button type="primary" @click="getUserList">查询</el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table
        v-loading="loading"
        :data="tableData"
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%;text-align:center"
        :border="true"
        @selection-change="handleSelectionChange"
        @sort-change="handleSsrtChange"
      >
        <el-table-column prop="name" label="用户昵称"></el-table-column>
        <el-table-column prop="dept" label="部门"></el-table-column>
        <el-table-column prop="truePoint" sortable label="竞赛积分数"></el-table-column>
        <el-table-column prop="fakePoint" sortable label="三九内经积分数"></el-table-column>
        <!-- <template slot-scope="scope">
                        <span>{{ scope.row.status | statusList }}</span>
        </template>-->
        <el-table-column prop="id" label="操作" fixed="right" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="linkToEdit(scope.row.id)">查看</el-button>
            <el-button type="primary" size="mini" @click="onDelete(scope.row.id)">删除</el-button>
            <!-- <el-button
              type="danger"
              size="mini"
              @click="changeStatus(scope.row.userId,scope.row.status)"
            >{{ scope.row.status | btnStatus }}</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
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
</template>
<script>
let CONSTANT = require("../../constant/constant.js");
let common = require("../../common.js");
export default {
  data() {
    return {
      loading:true,
      gameCount: null,
      onlineUser: null,
      nameLike: "",
      deptLike:'',
      isDeleted: "",
      tableData: [
        {
          userId: 123,
          nickname: "乐英",
          level: 1,
          gardenGold: 1000,
          gardenDiamond: 10,
          status: 1
        }
      ],
      pageCount: null,
      pageIndex: 1,
      pageSize: 10,
      statusList: [
        { value: "", label: "全部" },
        { value: "on", label: "正常" },
        { value: "off", label: "冻结" }
      ],
      truePointASC:false,
      truePointDESC:false,
      fakePointASC :false,
      fakePointDESC:false
    };
  },
  mounted() {
    // let sessionId = sessionStorage.getItem('sessionId');
    // console.log('sessionId',sessionId);
    this.getUserList();
    // this.getGameStatus();
  },
  methods: {
    getGameStatus() {
      let url = CONSTANT.URL.USER.FINDGAMESTATUS;
      let dataForm = {};
      let data = {};
      let param = {};
      common.requestAjax(url, param, dataForm, res => {
        this.loading = false;
        let data = res.data.bussData;
        this.gameCount = data.gameCount;
        this.onlineUser = data.onlineUser;
        // console.log('战局',data);
      });
    },
    getUserList() {
      let url = CONSTANT.URL.USER.FINGPAGE;
      // let dataForm = {
      //     pageIndex:this.pageIndex,
      //     pageSize:this.pageSize
      // }
      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        truePointASC: this.truePointASC,
        truePointDESC: this.truePointDESC,
        fakePointASC: this.fakePointASC,
        fakePointDESC: this.fakePointDESC
      };
      if (this.nameLike != "") {
        data.nameLike = this.nameLike;
      }
      if (this.deptLike  != "") {
        data.deptLike  = this.deptLike ;
      }
      let param = JSON.stringify(data);
      common.requestAjax(url, param, null, res => {
        this.loading = false;
        let data = res.data;
        this.tableData = data.bussData;
        // console.log('列表数据',this.tableData);
        this.pageCount = data.pageCount * this.pageSize;
      });
    },
    search: function(e) {
      if (e.keyCode == 13) {
        this.pageIndex = 1;
        this.getUserList();
      }
    },
    onDelete(id, isDelete) {
        // 删除
        let url = CONSTANT.URL.USER.FINGdelete;
        let param = {
          id: id
        };
        common.requestAjax(url, param, null, res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.getUserList();
          } else {
            this.$message({
              type: "warning",
              message: res.data.errMsg
            });
          }
        });
    },
    changeStatus(userId, isDelete) {
      if (isDelete == "on") {
        // 冻结
        let url = CONSTANT.URL.USER.DELETE;
        let param = {
          userId: userId
        };
        common.requestAjax(url, param, null, res => {
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.getUserList();
          } else {
            this.$message({
              type: "warning",
              message: res.data.errMsg
            });
          }
        });
      } else {
        // 解冻
        let url = CONSTANT.URL.USER.RESTORE;
        let param = {
          userId: userId
        };
        common.requestAjax(url, param, null, res => {
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.getUserList();
          } else {
            this.$message({
              type: "warning",
              message: res.data.errMsg
            });
          }
        });
      }
    },
    linkToEdit(userId) {
      this.$router.push({ path: "/userDetail", query: { userId: userId } });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getUserList();
    },

    
    handleSelectionChange(val) {
     
      
    },
    handleSsrtChange(val) {
       switch (val) {
        case val.prop == "truePoint" && val.order == "ascending":   //竞赛积分升序
          this.truePointASC = true;
          break;
        case val.prop == "truePoint" && val.order == "descending": //竞赛积分降序
          this.truePointDESC  = true;
          break;
        case val.prop == "fakePoint" && val.order == "ascending":  //三九升序 
          this.fakePointASC = true;
          break;
        case val.prop == "fakePoint" && val.order == "descending":
          this.fakePointDESC = true;
          break;
        default:
          break;
      }
       this.getUserList()
    }
  },
  filters: {
    statusList(value) {
      var status = [];
      status["on"] = "正常";
      status["off"] = "冻结";
      if (value) {
        return status[value];
      } else {
        return "--";
      }
    },
    btnStatus(value) {
      var status = [];
      status["on"] = "冻结";
      status["off"] = "解冻";
      if (value) {
        return status[value];
      } else {
        return "--";
      }
    }
  }
};
</script>

<style lang="scss">
.contain {
  .el-dialog__body {
    padding-left: 0;
    padding-top: 30px;
    border-top: 1px solid #dedede;
  }
  .dialog-con {
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    ul {
      width: 28%;
      list-style: none;
      padding: 0;
      font-size: 14px;
      float: left;
      margin-top: 0;
      z-index: 999;
      li {
        list-style: none;
        height: 60px;
        line-height: 60px;
        text-align: center;
        display: block;
      }
      li.active {
        color: #21b5cc;
        background-color: #fff;
        font-size: 16px;
        border-right: 2px solid #21b5cc;
      }
      //   li:hover{font-size:16px; }
    }
    .tab-content {
      width: 70%;
      display: inline-block;
      padding-left: 10%;
      background-color: #fff;
      min-height: 300px;
      .sort {
        .sort_name {
          font-weight: 600;
          margin-bottom: 5px;
        }
        .group-list {
          padding-left: 20px;
          .el-radio {
            display: block;
            margin-left: 0;
            margin-bottom: 3px;
          }
        }
      }
    }
    .el-button--default {
      background-color: #fff !important;
    }
  }
}
</style>