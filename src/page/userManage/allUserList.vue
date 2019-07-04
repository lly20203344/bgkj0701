<template>
    <div class="contain">
        <div class="input_modal">
            <div class="input-item">
                <span>姓名：</span>
                <el-input v-model="nickname" placeholder="请输入内容" class="proName"  @keyup.enter.native="search"></el-input>  
            </div>
            <div class="input-item">
                <span>手机号：</span>
                <el-input v-model="mobile" placeholder="请输入内容" class="proName"  @keyup.enter.native="search"></el-input> 
            </div>
            <el-button type="primary" @click="getUserList">查询</el-button>
        </div>
        <div class="table-content">
            <el-table   :data="tableData"  style="width: 100%;text-align:center"   :border='true'  @selection-change="handleSelectionChange">
                <el-table-column label="姓名">
                    <template slot-scope="scope">
                        <span>{{scope.row.realName || '未填写'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="昵称">
                    <template slot-scope="scope">
                        <span>{{scope.row.nickname || '未填写'}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="头像">
                    <template  slot-scope="scope">
                        <img class="userhead" :src="scope.row.avatarUrl" v-if="scope.row.avatarUrl">
                        <img class="userhead" src="../../images/avatar.png" v-else>
                    </template>
                </el-table-column>
                <el-table-column  label="用户类型">
                    <template  slot-scope="scope">
                        <span>{{scope.row.userType | userTypeFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="性别">
                    <template  slot-scope="scope">
                        <span>{{scope.row.sex | userSexFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column   label="家庭成员">
                  <template slot-scope="scope">
                    <span v-if="!scope.row.relationCount">0</span>
                    <span v-else class="has-relation">{{scope.row.relationCount}}</span>
                  </template>
                </el-table-column>
                <el-table-column  prop="id" label="操作" fixed="right" width='300px'>
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="deleteUser(scope.row.id)">删除</el-button>
                        <el-button type="primary" size="mini" @click="linkToDetail(scope.row.id)">测量数据</el-button>
                    </template>
                  </el-table-column>
            </el-table>
        </div>

        <div class="pagination">
            <el-pagination   @size-change="handleSizeChange"  @current-change="handleCurrentChange"
                :current-page.sync="pageIndex"              
                :page-size="pageSize"   
                :page-sizes='[10,20,30,40]'    
                layout="sizes, prev, pager, next"
                :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    let CONSTANT = require("../../constant/constant.js");
    let common = require("../../common.js");
    export default{
        data(){
            return {
                nickname: '',
                mobile: '',
                gameCount:null,
                onlineUser:null,
                isDeleted:'',
                tableData:[],
                totalCount:null,
                pageIndex:1,
                pageSize:10,
            }
        },
        mounted() {
            this.getUserList();
        },
        methods: {
            getUserList () {
                let url = CONSTANT.URL.USER.FINDPAGE;
                let dataForm = {
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize
                }
                let data = {
                    nickname: this.nickname,
                    mobile: this.mobile
                };
                let param = JSON.stringify(data);
                common.requestAjax(url,param,dataForm,(res)=>{
                    this.loading = false;
                    let resData = res.data.bussData;
                    this.tableData = resData;
                    this.totalCount = data.pageCount*this.pageSize;
                }) 
            },
            search (e) {
                if(e.keyCode == 13){
                    this.pageIndex = 1; 
                    this.getUserList();
                }
            },
            linkToDetail (userId) {
                this.$router.push({path:'/userDetail',query:{'userId':userId}}); 
            },
            handleSizeChange (val) {
                this.pageSize= val;
                this.getUserList();
            },
            handleCurrentChange (val) {
                this.pageIndex = val;
                this.getUserList();
            },
            handleSelectionChange (val) {},
            deleteUser (userId) {
                this.$confirm(
                    '此操作将删除该用户的所有信息，是否继续?',
                    '提示',
                    {
                        confirmButtinText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    },
                )
                .then(() => {
                    let url = CONSTANT.URL.USER.DELETE,
                        dataForm = {id: userId},
                        data = {};
                        data = JSON.stringify(data);
                        common.requestAjax(
                            url,
                            data,
                            dataForm,
                            res => {
                                if (res.status == 200) {
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                }
                            }
                        )
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            linkToDetail (userId) {
                this.$router.push({path: '/userDetail', query:{'userId': userId}})
            }
        },
        filters:{
            userTypeFilter(val) {
                switch(val) {
                    case 'ADULT':
                        return '成年人'
                    case 'CHILDREN':
                        return '儿童'
                    case 'NEWBORN':
                        return '新生儿'
                }
            },
            userSexFilter(val) {
                switch(val) {
                    case 1:
                        return '男'
                    case 0:
                        return '女'
                    case -1:
                        return '未知'
                }
            }
        }
    }
</script>

<style lang="scss">
.contain {
  .el-button--danger {background-color: #f56c6c !important; border-color: #f56c6c  !important;}
  .has-relation {cursor: pointer; color: #21b5cc; }
  .userhead {width: 40px; height: 40px; border-radius: 50%;}
  .input_modal .el-button {vertical-align: top;}
  .el-dialog__body{ padding-left: 0;padding-top: 30px;border-top:1px solid #dedede;}
  .dialog-con{
      background-color: #f5f5f5;
      display: flex;
      justify-content: space-between;
      ul{ 
          width:28%;list-style: none;padding:0;font-size:14px;float: left;margin-top:0;z-index:999;
          li{ list-style: none;height:60px;line-height:60px;text-align: center;display: block;}
          li.active{color:#21b5cc;background-color: #fff;font-size:16px;border-right:2px solid #21b5cc;}
        //   li:hover{font-size:16px; }
      }
      .tab-content{ width: 70%;display: inline-block;padding-left:10%;background-color: #fff;min-height:300px;
        .sort{
            .sort_name{ font-weight: 600;margin-bottom: 5px;}
            .group-list{ padding-left: 20px;
                .el-radio{display:block;margin-left: 0;margin-bottom: 3px;}
            }
        }
      }
      .el-button--default{background-color: #fff !important;}
  }
}
</style>