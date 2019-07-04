<template>
    <div class="contain">
        <div class="header">
            <el-button  type="primary" size='small' style="font-size:14px;" @click="templateEdit()">新建</el-button>
        </div>
        <div class="table-content">
            <el-table   :data="tableData"  style="width: 100%;text-align:center"   :border='true'  @selection-change="handleSelectionChange">
                <el-table-column  prop="repairOrderCode"    label="模板名称"></el-table-column>
                <el-table-column  prop="deviceFaultOrder"    label="创建时间"></el-table-column>
                <el-table-column  prop="id"  label="操作" fixed="right" width='300px'>
                      <template slot-scope="scope">
                          <el-button type="primary" size="mini" @click="linkToEdit(scope.row.id)">查看</el-button>
                          <el-button type="danger"  size="mini" @click="deleteItem(scope.row.id)">核实</el-button>
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
                tableData:[],
                pageCount:null,
                pageIndex:1,
                pageSize:10,
            }
        },
        mounted() {
            let sessionId = sessionStorage.getItem('sessionId');
            console.log('sessionId',sessionId);
            this.getTemplatetList();
        },
        methods: {
            getTemplatetList(){
                let url = CONSTANT.URL.TEMPLETLIST.FINDTEMPLATBYPAGE;
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
                    console.log('列表数据',this.tableData);
                    this.pageCount = data.pageCount*this.pageSize;
                }) 
            },
            templateEdit(){
                this.$router.push({path:'/templateEdit'});
            },
            linkToEdit(id){
                this.$router.push({path:'/templetEdit',query:{'id':id}}); 
            },
            deleteItem(id){

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