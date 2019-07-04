<template>
    <div class="contain">
        <div class="input_modal">
            <div class="input-item">
                <el-button type="primary" @click="dialogFormVisible = true">导入</el-button> 
                <el-button type="primary" @click="addSubject">添加</el-button>
                <el-button type="primary" @click="deleteSubject">批量删除</el-button>
            </div>
            <el-dialog title="批量导入题目" :visible.sync="dialogFormVisible" width="500px">
                <el-form label-width="150px">
                    <el-form-item label="文件：" >
                        <el-upload
                            ref="upload" accept=".xls,.xlsx"
                            :action="uploadUrl" name="file" :limit="1" 
                            :auto-upload="false" :on-exceed="handExceed" :on-success="handUploadSuccess">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过10Mb&nbsp;&nbsp;
                                <a :href="importTemplateUrl" download="题目导入模板">点此下载导入模板</a>
                            </div>
                        </el-upload>
                    </el-form-item>
                </el-form>
            <el-alert v-if="null != importDescription"
                :title="importDescription.title"
                :type="importDescription.type" close-text="知道了"
                :description="importDescription.description"
                show-icon @close="importDescription.closeFunc">
            </el-alert>
        </el-dialog>
            <div class="input-item">
                <span>题目名称：</span>
                <el-input v-model="nameLike" placeholder="请输入内容"  class="proName"  @keyup.enter.native="search"></el-input>  
            </div>
            <div class="input-item">
                <span>类别：</span>
                <el-select v-model='cateId' placeholder='-请选择-' @change="getSubjectList">
                    <el-option   v-for="item in categoryList"   :key="item.id"   :label="item.name"  :value="item.id"></el-option>
                </el-select>
            </div>
            <div class="input-item">
                <span>题库：</span>
                <el-select v-model='itemId' placeholder='-请选择-' @change="getSubjectList">
                    <el-option   v-for="item in itemBanckList"   :key="item.id"   :label="item.name"  :value="item.id"></el-option>
                </el-select>
            </div>
            <!-- <div class="input-item">
                <span>等级：</span>
                <el-select v-model='level' @change="getSubjectList">
                    <el-option   v-for="item in levelList"   :key="item.value"   :label="item.label"  :value="item.value"></el-option>
                </el-select>
            </div> -->
            <div class="input-item">
                <el-button type="primary" @click="getSubjectList">查询</el-button>
            </div>
        </div>
        <div class="table-content">
            <el-table  v-loading="loading"  :data="tableData"  style="width: 100%;text-align:center"   :border='true'  @selection-change="handleSelectionChange">
                <el-table-column  type="selection" width='55'></el-table-column>
                <!-- <el-table-column  prop="level"    label="级别"></el-table-column> -->
                <el-table-column  prop="itemName"    label="题库名称"></el-table-column>
                <el-table-column  prop="name"    label="题目名称"></el-table-column>
                <el-table-column  prop="cateName"    label="类别"></el-table-column>
                <el-table-column  prop="id"  label="操作" fixed="right" width='300px'>
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="linkToDetail(scope.row.id)">查看</el-button>
                        <el-button type="primary" size="mini" @click="linkToEdit(scope.row.id)">编辑</el-button>
                        <el-button type="danger"  size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog   title="查看题目"   :visible.sync="dialogVisible"   width="500px"   :before-close="handleClose">
            <div class="dialog-con" style="margin-left:0;">
                <el-form :model="information" :rules="rules" ref="information" label-width="100px" class="">
                    <el-form-item label="" prop="elementAttribute" style="margin-top:25px;">
                        <div class="dia dia-category"  >
                            <span >{{information.name}}</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="" prop="elementAttribute" style="margin-top:25px;">
                        <div class="dia dia-level" >
                            <span >题库名称：{{information.itemName}}</span>
                            <span >题目类别：{{information.cateName}}</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="" prop="" style="margin-top:25px;">
                        <div class="dia dia-content" >
                            <div style="margin-bottom: 10px;">{{information.content}}</div>
                            <!-- <div class="options" v-for="items in information.options" :key="items.id">
                                {{items.content}}：{{items.introduction}}
                            </div> -->
                            <div v-if="information.optionA">A:{{information.optionA}}</div>
                            <div v-if="information.optionB">B:{{information.optionB}}</div>
                            <div v-if="information.optionC">C:{{information.optionC}}</div>
                            <div v-if="information.optionD">D:{{information.optionD}}</div>
                            <div class="answer">
                                <span style="float: right;">正确答案：{{information.correct}}</span>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">返回</el-button>
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
                nameLike:'',
                categoryList:[],
                itemBanckList:[],
                gameCount:null,
                onlineUser:null,
                nickname:'',
                cateId:'',
                itemId:'',
                tableData:[],
                pageCount:null,
                pageIndex:1,
                pageSize:10,
                information:{},
                dialogVisible:false,
                // 导入
                dialogFormVisible:false, 
                uploadUrl:'',
                importTemplateUrl:'static/template.xls',
                importDescription:null,
                level:'',
                ids:[],
                levelList:[
                    {value: '',label:'全部'},
                    {value: '1',label:'1级'},
                    {value: '2',label:'2级'},
                    {value: '3',label:'3级'},
                    {value: '4',label:'4级'},
                    {value: '5',label:'5级'},
                    {value: '6',label:'6级'},
                    {value: '7',label:'7级'},
                    {value: '8',label:'8级'},
                    {value: '9',label:'9级'},
                    {value: '10',label:'10级'},
                    {value: '11',label:'11级'},
                    {value: '12',label:'12级'},
                    {value: '13',label:'13级'},
                    {value: '14',label:'14级'},
                    {value: '15',label:'15级'},
                ],
                rules:{

                }
            }
        },
        mounted() {
            let sessionId = sessionStorage.getItem('sessionId');
            // console.log('sessionId',sessionId);
            // this.uploadUrl = CONSTANT.URL.QUESTION.FREIGHTIMPORT + '?sessionId=' + sessionId;
            this.getSubjectList();
            this.getCategory();
            this.getitemBanck()
        },
        methods: {
            // 类别
            getCategory(){
                let url = CONSTANT.URL.Category.ListCategory;
                let dataForm = {};
                let data = {
                };
                let param = JSON.stringify(data);
                // let param = data;
                common.requestAjax(url,param,dataForm,(res)=>{
                    this.loading = false;
                    this.categoryList = res.data.bussData;
                }) 
            },
            // 题库
            getitemBanck(){
                let url = CONSTANT.URL.itemBanck.ListItemBanckPage;
                let dataForm = {};
                let data = {
                };
                let param = JSON.stringify(data);
                // let param = data;
                common.requestAjax(url,param,dataForm,(res)=>{
                    this.loading = false;
                     this.itemBanckList = res.data.bussData;
                }) 
            },
            // 列表
            getSubjectList(){
                let url = CONSTANT.URL.Question.ListQuestion;
                let data = {
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize
                };
                if(this.nameLike != ''){
                    data.nameLike = this.nameLike;
                }
                if(this.cateId != ''){
                    data.cateId = this.cateId;
                }
                if(this.itemId  != ''){
                    data.itemId = this.itemId;
                }
                let param = JSON.stringify(data);
                common.requestAjax(url,param,null,(res)=>{
                    this.loading = false;
                    let data = res.data;
                    this.tableData = data.bussData;
                    this.pageCount = data.pageCount*this.pageSize;
                }) 
            },
            getSubjectDetail(){
                let url = CONSTANT.URL.Question.DetailQuestion;
                let param = {
                    id:this.id
                } ;
                common.requestAjax(url,param,null,(res)=>{
                        let data = res.data.bussData;
                        this.information = data;
                }) 
            },
            search:function(e){
                if(e.keyCode == 13){
                    this.pageIndex = 1; 
                    this.getSubjectList();
                }
            },
            
            addSubject(){
                this.$router.push({path:'/subjectEdit'});
            },
            linkToEdit(id){
                this.$router.push({path:'/subjectEdit',query:{'id':id}}); 
            },
            linkToDetail(id){
                this.dialogVisible = true;
                // console.log('查看',id);
                this.id = id;
                this.getSubjectDetail();
            },
            // 删除
            deleteItem(id){
                this.$confirm('确定删除?', '提示', {           
                    confirmButtonText: '确定',           
                    cancelButtonText: '取消',           
                    type: 'warning'         
                }).then(() => {           
                    let  url = CONSTANT.URL.Question.DeleteQuestion;
                    let param = {id:id} ;
                    common.requestAjax(url,param,null,(res)=>{
                        if(res.code == 200){
                            this.$message({
                                type:'success',
                                message:'删除成功!'
                            });
                            this.getSubjectList();
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
                this.getSubjectList();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getSubjectList();
            },
            // 批量删除
            handleSelectionChange(val) { 
                this.ids = [];        
                let list = val;
                list.forEach((item)=>{
                    this.ids.push(item.id);
                })  
            },
            deleteSubject(){
                if(this.ids.length == 0 ){
                    this.$message({
                        type: 'warning',
                        message: '请先选择题目数据!'
                    });
                    return false;
                }
                let url = CONSTANT.URL.Question.DeletesQuestion;
                let dataForm = {
                    ids : this.ids,
                };
                let param = {};
                // param = ;
                common.requestAjax(url,JSON.stringify(param),dataForm,(res)=>{
                    if(res.code == 200){
                        this.$message({
                            type:'success',
                            message:res.data.errMsg
                        });
                        this.getSubjectList();
                    }
                    else{
                        this.$message({
                            type:'warning',
                            message:res.data.errMsg
                        })
                    }
                })  
            },
            handleClose(){
                this.dialogVisible = false;
            },
            // 导入
            handExceed(files, fileList){
                var temp = {};
                temp.title = '选择文件错误';
                temp.type = 'warning';
                temp.description = '请先清除已选择的文件再选择新文件！';
                temp.closeFunc = () => {this.importDescription=null;}
                this.importDescription = temp;
                },
                handUploadSuccess(response, file, fileList){
                var temp = {};
                if(response.status == 200) {
                    temp.title = '导入成功';
                    temp.type = 'success';
                    temp.description = '导入成功，关闭后自动刷新';
                    // temp.closeFunc = () => {this.importDescription=null;this.dialogFormVisible=false;this.getList();}
                    temp.closeFunc = () => {this.importDescription=null;this.dialogFormVisible=false;this.getSubjectList();}
                } else {
                    temp.title = '导入失败';
                    temp.type = 'error';
                    temp.description = response.error;
                    temp.closeFunc = () => {this.importDescription=null;}
                }
                this.importDescription = temp;
            },
            submitUpload() {
                let file = this.$refs.upload.uploadFiles[0];
                let suffix = file.name.toLowerCase().split('.').splice(-1)[0];
                let size = file.size;
                if('xls' != suffix && 'xlsx' != suffix) {
                    this.$message.error('文件格式错误！请重新选择文件');
                    return false;
                }
                if(size > 10 * 1024 * 1024) {
                    this.$message.error('文件过大！请分割文件后多次导入');
                    return false;
                }
                this.$refs.upload.submit();
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
}
.el-dialog__header{
        background-color: #21b5cc;
         .el-dialog__title{
            color: #fff;
        }
    }
.dia {
    width: 350px; 
    border: 1px solid #ccc; 
    border-radius:3px;
    background:#fff;
    box-sizing: border-box; 
    padding: 0 20px;
}
.dia-level {
    display:flex;
    justify-content: space-between;
    box-sizing: border-box;
    
}
.dia-category{
    text-align: center;
}
.dia-content{
    height:340px;
    padding-top: 15px;
    padding-left: 30px;
    padding-right: 30px;
    box-sizing: border-box;
    .options{
        word-break: break-all; 
        word-wrap:break-word;
    }
    .answer{

    }
}
</style>
