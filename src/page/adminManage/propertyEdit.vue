<template>
    <div class="contain-edit">
        <div class="header">
           <p>新增/修改角色</p>
           <el-button class="link" type="info">
                <router-link to="/propertyList" style="color: #fff;">返回</router-link>
           </el-button>
       </div>
       <div class="main">
            <el-form :model="role" :rules="rules" ref="role" label-width="120px" class="">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="role.roleName" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDescribe">
                    <el-input type="textarea" v-model="role.roleDescribe" placeholder="请输入角色描述" :rows="5"></el-input>
                </el-form-item>
                <el-form-item label="角色权限" prop="roleList">
                   <!-- <div class="access-list">
                        <div  v-for="(item,index) in role.roleList" :key="item.id" class="access-item">
                            <template>   
                                <el-checkbox v-model="item.checkAll" :indeterminate="item.isIndeterminate" @change="roleChange(index)"  :label="item.id" :key="item.id">{{item.menuName}}</el-checkbox>   
                                <el-checkbox-group v-model="role.checkedOrder" >     
                                    <el-checkbox v-for="(list,num) in item.subMenus" @change="roleListChange(index,num)" :label="list.id" :key="list.id">{{list.menuName}}</el-checkbox>   
                                </el-checkbox-group> 
                            </template>
                        </div>
                    </div> -->
                    <div class="checkbox-table" v-for="(item, indexkey) in role.roleList" :key="item.id">
                            <template>
                            <el-checkbox
                                class="check1"
                                style="font-weight: 600;margin-bottom: 15px "
                                v-model="menusIds"
                                :label="item.id"
                                @change="handleCheck(1,indexkey)"
                            >{{item.menuName}}</el-checkbox>
                            <div style="margin-bottom: 20px;">
                                <div
                                v-for="list in item.subMenus"
                                class="line-check"
                                :key="list.id"
                                style="display: inline-block; margin-left: 20px;margin-bottom: 20px;"
                                >
                                <el-checkbox
                                    class="check2"
                                    @change="handleCheck(2,indexkey)"
                                    v-model="menusIds"
                                    :label="list.id"
                                >{{list.menuName}}</el-checkbox>
                                </div>
                            </div>
                            </template>
                        </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="handleSave('role')">保存</el-button>
                    <el-button type="info" @click="backList">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js');
let common = require("../../common.js");
export default {
    data() {
        return {
            id:'',
            menusIds:[],
            role: {
                roleList:[],
                roleName:'',
                roleDescribe:'',
                checkedOrder:[], 
                sumData:[]
            },
            rules: {
                roleName: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                roleDescribe: [
                    { required: true, message: '请输入角色描述', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                roleList:[
                    { type: 'array', required: true, trigger: 'change' }
                ],
                checkedOrder:[
                    { type: 'array',  message: '请选择角色权限', required: true, trigger: 'change' }
                ]
            },
            
        }
    },
    mounted() {
        this.id = this.$router.currentRoute.query.id;
        if(this.id){
            this.getDetailById();
        }else{
            this.getList();
        }
    },
    methods: {
          handleCheck(type, a = 0) { // 多选框
        // let self = this;
        if (type == 2) { // 二级菜单点击
          let index = 0;
          this.role.roleList[a].subMenus.map(item => {
            if (this.menusIds.indexOf(item.id) > -1) {
              index += 1;
            }
          })
          if (index > 0) {
            if (this.menusIds.indexOf( this.role.roleList[a].id) < 0) {
              this.menusIds.push(this.role.roleList[a].id);
            }
          } else {
            if (this.menusIds.indexOf( this.role.roleList[a].id) > 0) {
              this.menusIds.splice(this.menusIds.indexOf( this.role.roleList[a].id), 1);
            }
          }
        } else {
          if (this.menusIds.indexOf( this.role.roleList[a].id) > -1) {
            this.role.roleList[a].subMenus.map(item => {
              if (this.menusIds.findIndex((n) => n == item.id) < 0) {
                this.menusIds.push(item.id)
              }
            })
          } else {
             this.role.roleList[a].subMenus.map(item => {
              if (this.menusIds.findIndex((n) => n == item.id) > -1) {
                this.menusIds.splice(this.menusIds.findIndex((n) => n == item.id), 1);
              }
            })
          }
        }
      },
        backList:function(){
            this.$router.go(-1);
        },
        getDetailById:function(){
            let url = CONSTANT.URL.ADMIN.GETROLEINFOBYROLEID;
            let param = { roleId:this.id} ;
            common.requestAjax(url,param,null,(res)=>{
                //console.log(res);
                if(res.status == 200){
                    let data = res.data.bussData;
                    this.role.roleName = data.roleName;
                    this.role.roleDescribe = data.roleDescribe;
                    this.role.checkedOrder = data.permissionIds;
                    this.getList();
                }
            }) 
        },
        getList:function(){
            let url = CONSTANT.URL.ADMIN.FINDUSERPERMISSIONS;
            let data = {};
            let param = JSON.stringify(data);
            common.requestAjax(url,param,null,(res)=>{
                let data = res.data.bussData;
                // data.forEach((item)=>{
                //     let status = false,
                //         num = 0;
                //     item.childPermissions.map((list)=>{
                //         if(this.role.checkedOrder.includes(list.id)){
                //             status = true;
                //             num++
                //         }
                //     })
                //     item.checkAll = num === item.childPermissions.length?true:false;
                //     item.isIndeterminate = num === item.childPermissions.length?false:status;
                // })
                this.role.roleList = data;
            })
        }, 
        handleSave:function(formName){
            let arr=[]
            this.role.roleList.filter((el,index,self)=>{
               if(el.checkAll==true){
                   return arr.push(el.id)
               }
              
            })
           
            this.sumData=arr
            // data.forEach((item,index)=>{
            //     console.log(item.id)
            // })
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let url = CONSTANT.URL.ADMIN.SAVEAPPROLE,
                    data,param;
                    // if(this.role.checkedOrder.length){
                    //     this.role.checkedOrder.forEach((item)=>{
                    //         item = parseInt(item)
                    //     })
                    // }else{
                    //     this.role.checkedOrder = []
                    // }
                    param = {
                        menuIds:this.menusIds,
                        roleName:this.role.roleName,
                        roleDesc:this.role.roleDescribe,
                        permissionIds:this.role.checkedOrder
                    }
                    common.requestAjax(url,JSON.stringify(param) ,null,(res)=>{
                        if(res.code == 200){
                            this.$message({
                                type: 'success',
                                message: '保存成功！'
                            });
                            setTimeout(()=>{
                                // this.$router.go(-1);
                                this.$router.push({ path: '/propertyList'}) 
                            },500)
                        }else{
                            this.$message({
                                type: 'warning',
                                message: res.data.errMsg
                            }); 
                        }
                    }) 
                } else {
                    return false;
                }
            });
        },
        roleChange:function(index){
            let arr = this.role.roleList[index].id,
                id = this.role.roleList[index].id;
                this.role.roleList[index].isIndeterminate = false;
        },
        roleListChange:function(index,num){
            let objArr = this.role.roleList[index].childPermissions,
                 obj = objArr[num];
                this.role.checkedOrder.find((item,index)=>{
                    if(event.target.checked){
                        if(this.role.checkedOrder.includes(obj.id)) return;
                        this.role.checkedOrder.push(obj.id)
                    }else{
                        if(!this.role.checkedOrder.includes(obj.id)) return;
                         this.role.checkedOrder.splice(index,1)
                    }
                })
                let checkNum = 0,
                    id = this.role.roleList[index].id;
                objArr.map((item)=>{
                    if(this.role.checkedOrder.includes(item.id)){
                        checkNum++
                    }
                })
                
                if(checkNum>0&&checkNum<objArr.length){
                    this.role.roleList[index].isIndeterminate = true
                }else if(checkNum==0||checkNum == objArr.length){
                    this.role.roleList[index].isIndeterminate = false
                }
                
                if(checkNum == 0){
                    this.role.roleList[index].checkAll = false
                }else if(checkNum == objArr.length){
                    this.role.roleList[index].checkAll = true
                }
                  
                if(checkNum){
                    if(this.role.checkedOrder.includes(id)) return;
                    this.role.checkedOrder.push(id)
                }else{
                    this.role.checkedOrder.find((item,index)=>{
                        if(item == id){
                            this.role.checkedOrder.splice(index,1)
                        }
                    })
                }


        }
    },
    
}
</script>

<style lang='scss' scoped>
    .el-textarea{
        width: 400px !important;
        .el-textarea__inner{ width: 400px !important;}
    }
    .access-list{
        .access-item{
            .el-checkbox,.el-checkbox-group{ display: inline-block;}
            .el-checkbox{ width: 200px;}
            .el-checkbox-group{ margin-left: 20px;}
        }
    }
</style>
