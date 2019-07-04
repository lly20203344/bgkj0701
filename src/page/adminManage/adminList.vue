<template>
    <div class="contain">
        <div class="input_modal">
            <div class="input-item">
                <el-button type="primary" @click="addAdmin">添加</el-button>
            </div>
        </div>
        <div class="table-content adminTab">
            <el-table   v-loading="loading"   :data="tableData"  style="width: 100%;text-align:center"   :border='true'  @selection-change="handleSelectionChange">
                <el-table-column  prop="userName"    label="管理员账号"></el-table-column>
                <el-table-column  prop="loginName"    label="姓名"></el-table-column>
                <el-table-column  prop="gmtCreated"    label="创建时间"></el-table-column>
                <el-table-column  prop="roleName"    label="所属角色"></el-table-column>
                <el-table-column  prop="id"  label="操作" fixed="right" width='300px'>
                      <template slot-scope="scope">
                          <el-button type="primary" size="mini" @click="linkToEdit(scope.row.id)">编辑</el-button>
                          <el-button type="primary" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
                          <!-- <span v-if="tableData[scope.$index].status == 'VERIFIED'">已核实</span> -->
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
                :total="pageCount">     
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
                loading:true,
                gameCount:null,
                onlineUser:null,
                nickname:'',
                isDeleted:'',
                tableData:[],
                pageCount:null,
                pageIndex:1,
                pageSize:10,
                statusList: [
                {value: '', label: '全部' }, 
                {value: 'y',  label: '正常'}, 
                {value: 'n',  label: '冻结'}, 
                ],
            }
        },
        mounted() {
            // let sessionId = sessionStorage.getItem('sessionId');
            // console.log('sessionId',sessionId);
            this.getAdminList();
        },
        methods: {
            
            getAdminList(){
                // let url = CONSTANT.URL.ADMIN.FINDAPPROLEBYPAGE;
                let url = CONSTANT.URL.Admin.ListUser
                let dataForm = {
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize
                }
                let data = {
                };
                let param = JSON.stringify(data);
                common.requestAjax(url,param,dataForm,(res)=>{
                    this.loading = false;
                    let data = res.data;
                    this.tableData = data.bussData;
                    this.pageCount = data.pageCount*this.pageSize;
                }) 
            },
            search:function(e){
                if(e.keyCode == 13){
                    this.pageIndex = 1; 
                    this.getAdminList();
                }
            },
            addAdmin(){
                this.$router.push({path:'/adminEdit'});
            },
            linkToEdit(userId){
                this.$router.push({path:'/adminEdit',query:{'userId':userId}}); 
            },
            deleteItem(userId){
                this.$confirm('确定删除？','提示',{
                    confirmButtonText: '确定',           
                    cancelButtonText: '取消',           
                    type: 'warning'         
                }).then(()=> {
                    let url = CONSTANT.URL.ADMIN.DELETEADMINUSERBYUSERID;
                    let param = {userId:userId};
                    common.requestAjax(url,param,null,(res)=>{
                        if(res.status == 200){
                            this.$message({
                                type:'success',
                                message:'删除成功!'
                            });
                            this.getAdminList();
                        }
                        else{
                            this.$message({
                                type:'warning',
                                message:res.data.errMsg
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({             
                        type: 'info',             
                        message: '已取消删除'           
                    }); 
                });
            },
            handleSizeChange(val) {
                this.pageSize= val;
                this.getAdminList();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getAdminList();
            },
            handleSelectionChange(val) { 
            
            },
        },
        filters:{
            statusList(value){
                var status = [];
                status['n'] = '正常';
                status['y'] = '冻结';
                if(value){
                    return status[value];
                }
                else{ return '--'};
            },
            
        }
    }
</script>

<style lang="scss">
.contain {
    .adminTab {
        .el-table--border td {
            text-align: center;
        }
    }
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