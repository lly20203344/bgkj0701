<template>
    <div class="contain-edit">
        <div class="header">
           <p>新增/编辑模板信息</p>
           <el-button class="link" type="primary">
                <router-link to="/" style="color: #fff;">返回</router-link>
           </el-button>
       </div>
       <div class="main">
           <el-form :model="information" :rules="rules" ref="information" label-width="120px" class="">
                <el-form-item label="模板名称：" prop="templateName">
                    <el-input v-model="information.templateName"></el-input>
                </el-form-item>
                
                <div v-for="(value,index) in information.mainStory" :key="value" >
                    <el-input v-model="value.routeTitle" style="width:100px;"></el-input>：
                    <!-- <el-form-item label="" prop="mainStory" style="width:auto;margin-left:0px;"> -->
                    <!-- <el-select v-model="information.mainStory"  multipl filterable allow-create default-first-option placeholder="请选择">
                        <el-option
                            v-for="item in information.mainList"
                            :key="item.id"
                            :label="item.elementTitle"
                            :value="item.id">
                        </el-option>
                    </el-select> -->
                    <el-select prop="mainStory"
                        v-model="mainList"
                        multiple
                        filterable
                        default-first-option
                        placeholder="请选择文章标签">
                        <el-option
                            v-for="item in information.allList"
                            :key="item.id"
                            :label="item.elementTitle"
                            :value="item.id"> 
                        </el-option>
                    </el-select>
                <!-- </el-form-item> -->
                </div>
                <el-button class="btnAdd" style="" type="text" @click="addMain()">新增</el-button>
                
                <el-form-item label="次要故事：" prop="secondaryStory">
                    <el-select  v-model='information.secondaryStory'  placeholder='-请选择-'>
                        <el-option   v-for="item in information.allList"   :key="item.id"   :label="item.elementTitle"  :value="item.id"></el-option>
                    </el-select>
                    <el-button type="text" @click="addSecondary()">新增</el-button>
                </el-form-item>
                <el-form-item label="人物心路：" prop="figure">
                    <el-select  v-model='information.figure'  placeholder='-请选择-'>
                        <el-option   v-for="item in information.allList"   :key="item.id"   :label="item.elementTitle"  :value="item.id"></el-option>
                    </el-select>
                    <el-button type="text" @click="addFigure()">新增</el-button>
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
            mainList:[],
            secondaryList:[],
            figureList:[],
            mainStory:[],
            information:{
                mainStory:[],
                secondaryStory:[],
                figure:[],
                allList:[],
                element:[],
            },
            rules: {
            
            },
            loading: false
        };
    },
    components:{
         'bg-editor':()=>import('../common/bg-editor.vue')
    },
    mounted() {
        this.id  = this.$router.currentRoute.query.id;
        if(this.id){
            this.getDetail(); 
        }else{
            let mainObj = {};
            mainObj.routeTitle = '';
            mainObj.routeType = 1;
            mainObj.element = '';
            this.information.mainStory.push(mainObj);
        }
        this.getElementAll();
    },
    methods: {
        getElementAll(){
            let url = CONSTANT.URL.ELELMENT.FINDELEMENTALL;
            let data = {};
            let param = {};
            common.requestAjax(url, param, null, res => {
                let data = res.data.bussData;
                this.information.allList = data;
                
            });
        },
        getDetail(){
           let url = CONSTANT.URL.LIST.FINDDEVICEFAULTINFOBYID;
           let param = {
               faultId:this.id
           } ;
           common.requestAjax(url,param,null,(res)=>{
                let data = res.data.bussData;
                this.information.deviceFaultOrder = data.deviceFaultOrder;
                this.information.pointNumber = data.pointNumber;
                this.information.deviceNumber = data.deviceNumber;
                this.information.deviceType = data.deviceType;
                this.information.address = data.address;
                this.information.faultSource = data.faultSource;
                this.information.content = data.content;
                let faultDate = (new Date(data.faultDate)).getTime();
                 this.information.faultDate = faultDate;
                // console.log(this.information.faultDate);
           }) 
        },
        addMain(){
            let mainObj = {};
            mainObj.routeTitle = '';
            mainObj.routeType = 1;
            mainObj.element = '';
            
            this.information.mainStory.push(mainObj);
        },
        addSecondary(){

        },
        addFigure(){

        },
        submitForm(formName) {
            this.information.mainStory.element = this.mainList;
            console.log('主要故事',this.information.mainStory.element);
            console.log('提交',this.information.mainStory);
            this.$refs[formName].validate((valid) => {
                // if (valid) {
                //     this.loading = true;
                //     let url = CONSTANT.URL.LIST.SAVEFAULTINFO;
                //     let data = {
                //         mainStory: this.information.mainStory,
                //         secondaryStory: this.information.mainStory,
                //         figure:this.information.figure,
                //     };
                //     if(this.id != ''){
                //         data.id = this.id;
                //     };
                //     let param = JSON.stringify(data);
                //     common.requestAjax(url, param, null, res => {
                //         if(res.status == 200) {
                //             this.$message({
                //                 type: 'success',
                //                 message: '保存模板成功!'
                //             });
                //             this.loading = false;
                //             this.$router.push("/templateList");
                //         } else {
                //             this.$message({
                //                 type: 'error',
                //                 message: res.msg
                //             });
                //             this.loading = false;
                //         }
                //     });
                // } else {
                //     console.log('error submit!!');
                //     return false;
                // }
            });
        },
        
        back(){
            this.$router.push('/');
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