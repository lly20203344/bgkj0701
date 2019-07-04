<template>
    <div class="contain-edit">
        <div class="header">
           <p>新增/编辑管理员信息</p>
        </div>
       <div class="main">
           <el-form :model="information" :rules="rules" ref="information" label-width="120px" class="">
                <el-form-item v-if="!userId" label="管理员账号：" prop="userName">
                    <el-input v-model="information.userName" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item v-if="userId" label="管理员账号：" prop="userName">
                    <div >{{information.userName}}</div>
                </el-form-item>
                <el-form-item v-if="!userId" label="管理员密码：" prop="password">
                    <el-input v-model="information.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item v-if="!userId" label="确认密码：" prop="confirmPassword">
                    <el-input v-model="information.confirmPassword" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="trueName">
                    <el-input v-model="information.trueName" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <!-- <el-form-item label="管理员手机号：" prop="mobile">
                    <el-input v-model="information.mobile" placeholder="请输入手机号" ></el-input>
                </el-form-item> -->
                <el-form-item label="角色身份：" prop="roleId" >
                    <el-select  v-model='information.roleId'  >
                        <el-option   v-for="item in roleList"   :key="item.roleId"   :label="item.roleName"  :value="item.roleId"></el-option>
                    </el-select>
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
        var validateUserName = (rules,value,callback)=>{
            let valReg = /(?=[\x21-\x7e]+)[^A-Za-z0-9]/;
            if(!valReg.test(value)){
                callback();
            }else{
                callback(new Error('只能输入英文字母和数字!'));
            }
        }
        var validatePassword = (rules,value,callback)=>{
            if(this.information.password === this.information.confirmPassword){
                callback();
            }else{
                callback(new Error('两次输入密码不一致'));  
            }
        }
        var validateMobile = (rules,value,callback)=>{
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
            if (!myreg.test(value)) {  
                callback(new Error('请输入正确的手机号码格式!'));  
            } else {  
                callback();  
            } 
        }
        return {
            id:null,
            userId:'',
            categoryList:[],
            roleList:[],
            information:{
                // correct:'',
                // categoryList:[],
                userName:'',
                trueName:'',
                mobile:'',
                roleId:'',

            },
            pageRoleIndex:1,
            pageRoleSize:100,
            rules: {
                userName: [
                    { required: true, message: '请输入管理员账号', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                    { validator: validateUserName, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                    { validator: validateUserName, trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                    { validator: validatePassword, trigger: 'blur' },
                    { validator: validateUserName, trigger: 'blur' }
                ],
                trueName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: validateMobile, trigger: 'blur' }
                ],
                roleId: [
                    { required: true, message: '请选择角色身份', trigger: 'blur' },
                ],

            },
            loading: false
        };
    },
    components:{
         'bg-editor':()=>import('../common/bg-editor.vue')
    },
    mounted() {
        this.getRoleList();
        this.userId  = this.$router.currentRoute.query.userId;
        if(this.userId){
            this.getDetail(); 
        }  
        
    },
    methods: {
        // 获取角色身份
        getRoleList(){
            let url = CONSTANT.URL.ADMIN.FINDAPPROLEBYPAGE;
            let param = {
               pageIndex:this.pageRoleIndex,
               pageSize:this.pageRoleSize,
            } ;
            common.requestAjax(url,param,null,(res)=>{
                let data = res.data.bussData;
                for(let i = 0;i < data.length; i++){
                    let Obj = {};
                    Obj.roleId = data[i].id;
                    Obj.roleName = data[i].roleName;
                    this.roleList.push(Obj);
                }
            }) 
        },
        getDetail(){
           let url = CONSTANT.URL.Admin.DetailUser;
           let param = {
               id:this.userId
           } ;
           common.requestAjax(url,param,null,(res)=>{
                let data = res.data.bussData;
                this.information.userName = data.userName;
                this.information.trueName = data.loginName;
                // this.information.mobile = data.mobile;
                this.information.roleId =data.roleId;
           }) 
        },
        submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    let url = this.userId==undefined?CONSTANT.URL.Admin.AddUser:CONSTANT.URL.Admin.EditUser;
                    let data = {
                        userName : this.information.userName ,
                        loginName: this.information.trueName ,
                        password: this.information.password ,
                        roleId: this.information.roleId,
                    };
                    if( !!this.userId){
                        data.id = this.userId;
                    };
                    // let param = ;
                    let param = data;
                    common.requestAjax(url, JSON.stringify(data), null, res => {
                        if(res.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '保存成功!'
                            });
                            this.loading = false;
                            this.$router.push("/adminList");
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.errMsg
                            });
                            this.loading = false;
                        }
                    });
                } else {
                    
                    return false;
                }
            });
        },
        
        back(){
            this.$router.push('/adminList');
        }
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