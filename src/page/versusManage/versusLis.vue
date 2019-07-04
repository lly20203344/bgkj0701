<template>
    <div class="contain">
        <div class="header">
            <div>当前总对战局数：<span>{{totalCount}}局</span></div>
        </div>
        <div class="input_modal">
            <div class="input-item">
                <span>昵称：</span>
                <el-input v-model="nickname" placeholder="请输入内容"  class="proName"  @keyup.enter.native="search"></el-input>  
            </div>
            <div class="input-item">
                <span>日期：</span>
                <el-date-picker v-model="starttime" type="datetime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期时间" @change="getVersusList()">
                </el-date-picker>
                <el-button type="primary" @click="getVersusList">查询</el-button>
            </div>
        </div>
        <div class="table-content">
            <el-table   :data="tableData"  style="width: 100%;text-align:center"   :border='true'  @selection-change="handleSelectionChange">
                <el-table-column  prop="id"    label="对战编号"></el-table-column>
                <el-table-column  prop="starttime"    label="对战时间"></el-table-column>
                <el-table-column  prop="players"    label="对战玩家">
                    <template slot-scope="scope">
                        <span v-for="items in scope.row.players" :key="items.id" style="margin-right:10px;">
                            {{items.nickname}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column  prop="winner"    label="胜方"></el-table-column>
                <el-table-column  prop="id"  label="操作" fixed="right" width='300px'>
                      <template slot-scope="scope">
                          <el-button type="primary" size="mini" @click="linkToEdit(scope.row.id)">查看</el-button>
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
                totalCount:0,
                starttime:'',
                nickname:'',
                // players:[],
                tableData:[],
                pageCount:null,
                pageIndex:1,
                pageSize:10,
                
            }
        },
        mounted() {
            // let sessionId = sessionStorage.getItem('sessionId');
            // console.log('sessionId',sessionId);
            this.getVersusList();
            this.getGameStatus();
        },
        methods: {
            getGameStatus(){
                let url = CONSTANT.URL.VERSUS.FINDTATALCOUNT;
                let dataForm = {};
                let data = {};
                let param = {};
                common.requestAjax(url,param,dataForm,(res)=>{
                    this.loading = false;
                    let data = res.data.bussData;
                    this.totalCount = data;
                    // console.log('战局',data);
                }) 
            },
            getVersusList(){
                let url = CONSTANT.URL.VERSUS.FINDPAGE;
                // let dataForm = {
                //     pageIndex:this.pageIndex,
                //     pageSize:this.pageSize
                // }
                let data = {
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize
                };
                if(this.nickname != ''){
                    data.nickname = this.nickname;
                }
                if(this.starttime != ''){
                    data.starttime = this.starttime;
                }
                let param = JSON.stringify(data);
                common.requestAjax(url,param,null,(res)=>{
                    this.loading = false;
                    let data = res.data;
                    this.tableData = data.bussData;
                    // console.log(data);
                    // console.log('列表数据',this.tableData);
                    this.pageCount = data.pageCount*this.pageSize;
                }) 
            },
            search:function(e){
                if(e.keyCode == 13){
                    this.pageIndex = 1; 
                    this.getVersusList();
                }
            },
           
            linkToEdit(id){
                this.$router.push({path:'/versusDetail',query:{'id':id}}); 
                // this.$router.push({path:'/test',query:{'id':id}}); 
            },
            handleSizeChange(val) {
                this.pageSize= val;
                this.getVersusList();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getVersusList();
            },
            handleSelectionChange(val) { 
            
            },
        },
        filters:{
            btnStatus(value){
                var status = [];
                status['n'] = '冻结';
                status['y'] = '解冻';
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