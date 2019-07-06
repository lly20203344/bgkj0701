<template>
    <div class="contain">
        <div class="header">
             <el-button class="link" type="primary" >
                <router-link to="/propertyEdit" style="color: #fff;">新增角色</router-link>
            </el-button>
        </div>
        <div class="table-content">
            <el-table :data="tableData"  v-loading="loading"  style="width: 100%;text-align:center;"  :border='true'>
                  <el-table-column  prop="roleName"    label="角色名称" width='120'></el-table-column>
                  <el-table-column  prop="roleName" label="角色描述" width='220'></el-table-column>
                  <el-table-column  prop="topMenuName" label="拥有权限"></el-table-column>
                  <el-table-column  prop=""  label="操作" fixed='right' width='180'>
                      <template slot-scope="scope">
                          <el-button type="danger" size="mini" @click="onDeali(scope.row.id)">编辑</el-button>
                          <el-button type="danger" size="mini" @click="deleteRole(scope.row.id)">删除</el-button>
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
let CONSTANT = require('../../constant/constant.js');
let common = require("../../common.js");
export default {
    data() {
        return {
            tableData:[],
            pageCount:null,
            pageIndex:1,
            pageSize:10,
            loading:true
        }
    },
    mounted() {
        let path = this.$router.currentRoute.query.edit;
        if(path == 'edit'){
           window.location.reload();
          this.$router.push('/propertyList');
        }
        this.getRoleList();
    },
    methods: {
        //点击跳入详情
    onDeali(id) {
      this.$router.push({
        path: `/propertyDeali/${id}`
      });
    },
        getRoleList:function(){
           let url = CONSTANT.URL.ADMIN.FINDAPPROLEBYPAGE;
           let dataForm = {
              
           }
           let data = {
               pageIndex:this.pageIndex,
               pageSize:this.pageSize
           } ;
           let param = JSON.stringify(data);
           this.loading = true;
           common.requestAjax(url,param,dataForm,(res)=>{
                this.loading = false;
                let data = res.data;
                this.tableData = data.bussData;
                this.pageCount = data.pageCount*this.pageSize;
            }) 
        },
        deleteRole:function(id) {
            this.$confirm('确定删除?', '提示', {           
                confirmButtonText: '确定',           
                cancelButtonText: '取消',           
                type: 'warning'         
            }).then(() => {           
                let  url = CONSTANT.URL.ADMIN.DELETEROLEBYROLEID;
                let param = {id:id} ;
                common.requestAjax(url,param,null,(res)=>{
                    if(res.code == 200){
                        this.$message({
                            type:'success',
                            message:'删除成功!'
                        });
                        this.getRoleList();
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
            this.getRoleList();
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.getRoleList();
        }
    },
}
</script>

