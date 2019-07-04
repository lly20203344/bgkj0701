<template>
    <div class="contain-edit">
        <div class="header">
           <p>新增/编辑消息</p>
           <!-- <el-button class="link" type="primary">
                <router-link to="/message" style="color: #fff;">返回</router-link>
           </el-button> -->
        </div>
       <div class="main">
           <el-form :model="information" :rules="rules" ref="information" label-width="120px" class="">
                <el-form-item label="信息标题" prop="title">
                    <el-input v-model="information.title" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="消息类别" prop="category" >
                    <el-select  v-model='information.category'  >
                        <el-option   v-for="item in categoryList"   :key="item.value"   :label="item.label"  :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="消息内容" prop="content">
                    <bg-editor 
                        :minHeight="300" 
                        :uploadUrl="upLoadUrl" 
                        :content="information.content"
                        @editorData='editorInfo'>
                    </bg-editor>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('information')"  :loading="loading">保存</el-button>
                    <el-button @click="back()">返回</el-button>
                </el-form-item>
           </el-form>
       </div>

    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js');
let common = require("../../common.js");
import $ from 'jquery'
  export default {
    data() {
        var validateNumber = (rules,value,callback)=>{
            if(isNaN(value)) {
                callback(new Error('请输入数字值!'));
            }
            else {
                callback();
            }
        }
        return {
            id:null,
            categoryList:[
                {value: 1 ,label:'系统消息'},
                {value: 4 ,label:'赛事消息'},
            ],
            upLoadUrl:'',
            
            information:{
               
            },
            rules: {
                title: [
                    { required: true, message: '请输入信息标题', trigger: 'blur' },
                ],
                content: [
                    { required: true, message: '请填写消息内容', trigger: 'blur' },
                ],
                category: [
                    { required: true, message: '请选择消息类别', trigger: 'blur' },
                ],
            },
            loading: false
        };
    },
    components:{
         'bg-editor':()=>import('../common/bg-editor.vue')
    },
    mounted() {
        // let sessionId = sessionStorage.getItem('sessionId');
        // this.upLoadUrl =CONSTANT.URL.SYSTEM.ADMINUPLOADFILE+ '?sessionId='+sessionId;
        this.id  = this.$router.currentRoute.query.id;
        if(this.id){
            this.getDetail(); 
        }  
    },
    methods: {
       
        getDetail(){
           let url = CONSTANT.URL.MESSAGE.FINDDETAIL;
           let param = {
               id:this.id
           } ;
           common.requestAjax(url,param,null,(res)=>{
                let data = res.data.bussData;
                // this.information.category = data.category;
                // this.information.title = data.title;
                // this.information.content = data.content;
                this.information = data;
           }) 
        },
        submitForm(formName) {
            if(this.id){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        let url = CONSTANT.URL.MESSAGE.UPDATE;
                        let data = {
                            id:this.id,
                            title  : this.information.title  ,
                            category : this.information.category ,
                            content  : this.information.content  ,
                            
                        };
                        let param = JSON.stringify(data);
                        common.requestAjax(url, param, null, res => {
                            if(res.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '新增消息成功!'
                                });
                                this.loading = false;
                                this.$router.push("/message");
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.errMsg
                            });
                            this.loading = false;
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            }else{
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    let url = CONSTANT.URL.MESSAGE.ADD;
                    let data = {
                        
                        title  : this.information.title  ,
                        category : this.information.category ,
                        content  : this.information.content  ,
                        
                    };
                    let param = JSON.stringify(data);
                    common.requestAjax(url, param, null, res => {
                        if(res.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '新增消息成功!'
                            });
                            this.loading = false;
                            this.$router.push("/message");
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.errMsg
                            });
                            this.loading = false;
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            }
                
        },
        editorInfo(val){
            this.information.content = val;
        }, 
        back(){
            this.$router.push('/message');
        }
        
    },
    filters:{
            categoryList(value){
                var status = [];
                status['1'] = '系统消息';
                status['2'] = '赛事消息';
                if(value){
                    return status[value];
                }
                else{ return '--'};
            },
            
        }
  }
</script>

<style lang="scss" scoped >
@import '/static/bootstrap.css';     
@import '/sys/static/bootstrap.css'; 
    .btnAdd{
        
    }
    .el-form-item__content{
        margin-left: 0;
    }
</style>