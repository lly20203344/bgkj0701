<template>
    <div class="contain">
        <div class="header" style="height: 56px;">
            <span style="font-size:18px;">等级说明</span>
        </div>
        <div class="table-content">
            <el-table   :data="tableData"  style="width: 100%;text-align:center"   :border='true'  @selection-change="handleSelectionChange">
                <el-table-column  prop="level"    label="等级"></el-table-column>
                <el-table-column  prop="nextLevelExp"    label="所需经验"></el-table-column>
                <el-table-column  prop="id"  label="操作" fixed="right" width='300px'>
                      <template slot-scope="scope">
                          <el-button type="primary" size="mini" @click="linkToEdit(scope.row.id,scope.row.level,scope.row.nextLevelExp)">编辑</el-button>
                      </template>
                  </el-table-column>
            </el-table>
        </div>

        <el-dialog   title="编辑等级所需要经验"   :visible.sync="dialogVisible"   width="500px"   :before-close="handleClose">
            <div class="dialog-con" >
                <el-form :model="information" :rules="rules" ref="information" label-width="100px" class="">
                    <el-form-item label="经验:" prop="nextLevelExp" style="margin-top:25px;">
                        <el-input v-model="information.nextLevelExp" placeholder="请输入经验值"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onConfirm()">确 定</el-button>
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
                
                dialogVisible:false,
                tableData:[],
                pageCount:null,
                pageIndex:1,
                pageSize:10,
                information:{
                    id:'',
                    level:null,
                    nextLevelExp:'',
                },
                rules:{

                }
            }
        },
        mounted() {
            // let sessionId = sessionStorage.getItem('sessionId');
            // console.log('sessionId',sessionId);
            this.getLevelList();
        },
        methods: {
            getLevelList(){
                let url = CONSTANT.URL.LEVEL.FINDPAGE
                // let dataForm = {
                //     pageIndex:this.pageIndex,
                //     pageSize:this.pageSize
                // }
                let data = {
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize
                };
                let param = JSON.stringify(data);
                common.requestAjax(url,param,null,(res)=>{
                    this.loading = false;
                    let data = res.data;
                    this.tableData = data.bussData;
                    this.pageCount = data.pageCount*this.pageSize;
                }) 
            },
            onConfirm(){
                this.dialogVisible = false;
                let url = CONSTANT.URL.LEVEL.UPDATE;
                let data = {
                    id : this.information.id ,
                    level : this.information.level ,
                    nextLevelExp : this.information.nextLevelExp ,
                };
                let param = JSON.stringify(data);
                // let param = data;
                common.requestAjax(url, param, null, res => {
                    if(res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '更改成功!'
                        });
                        this.getLevelList();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.errMsg
                        });
                        this.loading = false;
                    }
                });
            },
            linkToEdit(id,level,nextLevelExp){
                this.dialogVisible = true; 
                this.information.id = id;
                this.information.level = level;
                this.information.nextLevelExp = nextLevelExp;

            },
            handleSizeChange(val) {
                this.pageSize= val;
                this.getLevelList();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getLevelList();
            },
            handleSelectionChange(val) { 
            
            },
            handleClose(){
                this.dialogVisible = false;
            }
        },
        filters:{
            
        }
    }
</script>

<style lang="scss">
.contain {
  .el-dialog__body{ padding-left: 0;padding-top: 30px;border-top:1px solid #dedede;}
  .dialog-con{
      background-color: #fff;
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
}
</style>