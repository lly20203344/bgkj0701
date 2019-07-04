<template>
    <div class="contain">
        <!-- <div class="input_modal">
            <div class="input-item">
                <el-button type="primary" @click="addMessage">添加</el-button>
            </div>
        </div> -->
        <div class="input_modal">
      <div class="input-item">
        <span>用户昵称：</span>
        <el-input
          v-model="miniUserNameLike"
          placeholder="请输入内容"
          class="proName"
          @keyup.enter.native="search"
        ></el-input>
      </div>
      <div class="input-item">
        <span>部门</span>
        <el-input
          v-model="miniUserDeptLike "
          placeholder="请输入内容"
          class="proName"
          @keyup.enter.native="search"
        ></el-input>
        <el-button type="primary" @click="getMessageList">查询</el-button>
      </div>
    </div>
        <div class="table-content messageTab">
            <el-table   v-loading="loading"  :data="tableData"  style="width: 100%;text-align:center"   :border='true'  @selection-change="handleSelectionChange">
                <el-table-column  prop="miniUserName"    label="用户姓名"></el-table-column>
                <el-table-column  prop="miniUserDept"    label="部门"></el-table-column>
                <el-table-column  prop="message"    label="留言内容"></el-table-column>
                <el-table-column  prop="gmtCreated"    label="留言时间"></el-table-column>
                <el-table-column  prop="id"  label="操作" fixed="right" width='300px'>
                      <template slot-scope="scope">
                          <el-button type="primary" size="mini" @click="linkToDetail(scope.row.id)">查看</el-button>
                          <el-button type="primary" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
                          <!-- <span v-if="tableData[scope.$index].status == 'VERIFIED'">已核实</span> -->
                      </template>
                  </el-table-column>
            </el-table>
        </div>

        <el-dialog   title="查看留言详情"   :visible.sync="dialogVisible"   width="500px"  class="messageDialog"  :before-close="handleClose">
            <div class="dialog-con" style="background-color: #;">
                <el-form :model="information" :rules="rules" ref="information" label-width="100px" class=" pl-34 pr-34">
                   <span>{{information.miniUserName}}</span>
                   <span>{{information.miniUserDept}}</span>
                   <span>{{information.gmtCreated}}</span>
                        <el-input
                            class="w-100 mt-20"
                            type="textarea"
                            :rows="4"
                            placeholder="请输入内容"
                            v-model="information.message">
                        </el-input>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteItem(information.id)">删除</el-button>
                <el-button @click="dialogVisible = false">返 回</el-button>
            </span>
        </el-dialog>

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
                miniUserNameLike: "",
                miniUserDeptLike:'',
                id:'',
                dialogVisible:false,
                nickname:'',
                isDeleted:'',
                tableData:[],
                pageCount:null,
                pageIndex:1,
                pageSize:10,
                information:{
                    id:'',
                    miniUserName:'',
                    miniUserDept:'',
                    gmtCreated:'',
                    message:'',

                },
                rules:{

                }
            }
        },
        mounted() {
            // let sessionId = sessionStorage.getItem('sessionId');
            // console.log('sessionId',sessionId);
            this.getMessageList();
        },
        methods: {
            
            getMessageList(){
                // let url = CONSTANT.URL.ADMIN.FINDAPPROLEBYPAGE;
                let url = CONSTANT.URL.Message.ListMessage
                let data = {
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize
                };
                 if (this.miniUserNameLike != "") {
                        data.miniUserNameLike = this.miniUserNameLike;
                    }
                    if (this.miniUserDeptLike  != "") {
                        data.miniUserDeptLike  = this.miniUserDeptLike ;
                    }
                let param = JSON.stringify(data);
                common.requestAjax(url,param,null,(res)=>{
                    this.loading = false;
                    let data = res.data;
                    this.tableData = data.bussData;
                    this.pageCount = data.pageCount*this.pageSize;
                }) 
            },


            getMessageDetail(){
                let url = CONSTANT.URL.Message.DetailMessage;
                let dataForm = {};
                let data = {
                    id : this.id,
                };
                // let param = JSON.stringify(data);
                let param = data;
                common.requestAjax(url,param,null,(res)=>{
                    this.loading = false;
                    let data = res.data.bussData;
                    // this.information = data;
                    this.information.miniUserName = data.miniUserName;
                    this.information.miniUserDept = data.miniUserDept;
                    this.information.message = data.message;
                    this.information.id = data.id;
                    this.information.gmtCreated = data.gmtCreated;
                    // console.log('列表数据',data);
                })
            },
            
            linkToDetail(id){
                this.dialogVisible = true;
                this.id = id;
                this.getMessageDetail();
            },
            addMessage(){
                this.$router.push({path:'/messageEdit'});
            },
            linkToEdit(id){
                this.$router.push({path:'/messageEdit',query:{'id':id}}); 
            },
            deleteItem(id){
                this.$confirm('确定删除?', '提示', {           
                    confirmButtonText: '确定',           
                    cancelButtonText: '取消',           
                    type: 'warning'         
                }).then(() => {           
                    let  url = CONSTANT.URL.Message.DeleteMessage;
                    let param = {id:id} ;
                    common.requestAjax(url,param,null,(res)=>{
                        if(res.code == 200){
                            this.$message({
                                type:'success',
                                message:'删除成功!'
                            });
                             this.dialogVisible = false;
                            this.getMessageList();
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
                // console.log('条目',val);
                this.pageSize= val;
                this.getMessageList();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getMessageList();
            },
            handleSelectionChange(val) { 
            
            },
            handleClose(){
                this.dialogVisible = false;
            },
        },
        filters:{
            categoryList(value){
                var status = [];
                status['1'] = '系统消息';
                status['4'] = '赛事消息';
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
    .messageTab {
        .el-table--border td {
            text-align: center;
        }
    }
    .messageDialog {
            .el-dialog__body,.el-dialog__footer {
                background: #eee;
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
    .el-dialog__header{
        background-color: #21b5cc;
         .el-dialog__title{
            color: #fff;
        }
    }
    .dia{
        width: 400px;
        border: 1px solid #ccc;
        border-radius: 3px;
        background-color: #fff;
        margin-left: 40px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .dia-title{
        text-align: center;
    }
    .dia-category{
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 20px;
    }
    .dia-content {
        box-sizing: border-box;
        padding: 20px 30px;
        word-break: break-all; 
        word-wrap:break-word; 
        min-height: 350px;
    }

}
</style>