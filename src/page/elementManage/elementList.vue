<template>
    <div class="contain">
        <div class="header">
            <el-button  type="primary" size='small' style="font-size:14px;" @click="elementAdd()">新建</el-button>
        </div>
        <div class="table-content">
            <el-table   :data="tableData"  style="width: 100%;text-align:center"   :border='true'  @selection-change="handleSelectionChange">
                <el-table-column  prop="elementTitle"    label="元素标题"></el-table-column>
                <el-table-column  prop="elementAttribute"    label="场景标题"></el-table-column>
                <el-table-column  prop="id"  label="操作" fixed="right" width='300px'>
                      <template slot-scope="scope">
                          <el-button type="danger"  size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
                      </template>
                  </el-table-column>
            </el-table>
        </div>

        <el-dialog   title="新增元素"   :visible.sync="dialogVisible"   width="500px"   :before-close="handleClose">
            <div class="dialog-con">
                <el-form :model="information" :rules="rules" ref="information" label-width="100px" class="">
                    <el-form-item label="元素标题:" prop="elementTitle">
                        <el-input v-model="information.elementTitle" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="场景标题:" prop="elementAttribute">
                        <el-input v-model="information.elementAttribute" placeholder=""></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onConfirm('information')">确 定</el-button>
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
                tableData:[],
                pageCount:null,
                pageIndex:1,
                pageSize:10,
                dialogVisible:false,
                information:{

                },
                rules: {
               
                },
                loading:true,
            }
            
        },
        mounted() {
            this.getElementList();
        },
        methods: {
            getElementList(){
                let url = CONSTANT.URL.ELELMENT.FINDELEMENTBYPAGE;
                let dataForm = {
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize
                }
                let data = {
                };
                let param = {};
                common.requestAjax(url,param,dataForm,(res)=>{
                    this.loading = false;
                    let data = res.data;
                    this.tableData = data.bussData;
                    // console.log('元素列表数据',this.tableData);
                    this.pageCount = data.pageCount*this.pageSize;
                }) 
            },
            // 新建元素
            elementAdd(){
                this.dialogVisible = true;
            },
            onConfirm(formName){
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        this.loading = true;
                        let url = CONSTANT.URL.ELELMENT.SAVEELEMENT;
                        let data = {
                            elementTitle:this.information.elementTitle,
                            elementAttribute:this.information.elementAttribute,
                        };
                        let param = JSON.stringify(data);
                        common.requestAjax(url, param, null, res => {
                            if(res.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '新增成功!'
                                });
                                this.loading = false;
                                this.dialogVisible = false;
                                this.information = {};
                                this.getElementList();
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.errMsg
                                });
                                this.loading = false;
                            }
                        });
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            
            deleteItem(id){
                this.$confirm('确定删除?', '提示', {           
                    confirmButtonText: '确定',           
                    cancelButtonText: '取消',           
                    type: 'warning'         
                }).then(() => {           
                    let  url = CONSTANT.URL.ELELMENT.DELETEELEMNET;
                    let param = {id:id} ;
                    common.requestAjax(url,param,null,(res)=>{
                        if(res.status == 200){
                            this.$message({
                                type:'success',
                                message:'删除成功!'
                            });
                            this.getElementList();
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
                this.getInfoTypeList();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getInfoTypeList();
            },
            handleSelectionChange(val) { 
            
            },
            handleClose(){
                this.dialogVisible = false;
            },
        }

    }
</script>

<style lang="scss">
.contain {
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