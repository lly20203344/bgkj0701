<template>
    <div class="contain-edit">
        <div class="header">
           <p>新增/编辑题目</p>
        </div>
       <div class="main">
           <el-form :model="information" :rules="rules" ref="information" label-width="120px" class="">
                <el-form-item label="名称：" prop="content">
                    <el-input  v-model="information.content" placeholder="请输入题目名称" style="margin-left:17px;"></el-input>
                </el-form-item>
                
                 <el-form-item label="题库：" prop="itemBanck" >
                    <el-select   v-model='information.itemBanck'  placeholder='请选择题库' @change="answer" style="margin-left:17px;"> 
                        <el-option   v-for="item in itemBancklist"   :key="item.id"   :label="item.name"  :value="item.id"></el-option>
                    </el-select> 
                </el-form-item>
                <el-form-item label="类别：" prop="category" >
                    <el-select   v-model='information.category'  placeholder='请选择题目类别' @change="answer" style="margin-left:17px;"> 
                        <el-option   v-for="item in categoryList"   :key="item.id"   :label="item.name"  :value="item.id"></el-option>
                    </el-select> 
                </el-form-item>
                <el-form-item label="选项：" prop="options">
                    <div style="margin-bottom:10px;">A:
                        <el-input v-model="information.optionA"  placeholder="请输入选项"
                        ></el-input>
                    </div>
                    <div style="margin-bottom:10px;">B:
                        <el-input v-model="information.optionB"  placeholder="请输入选项"></el-input>
                    </div>
                    <div style="margin-bottom:10px;">C:
                        <el-input v-model="information.optionC" placeholder="请输入选项"></el-input>
                    </div>
                    <div style="margin-bottom:10px;">D:
                        <el-input v-model="information.optionD" placeholder="请输入选项"
                        ></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="答案：" prop="correct" >
                    <el-select  v-model='information.correct'  placeholder='请选择正确答案' style="margin-left:17px;">
                        <el-option   v-for="item in typeList"   :key="item.value"   :label="item.label"  :value="item.value"></el-option>
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
        var validateOptions = (rules,value,callback)=>{
            this.submit = true;
            for(let i = 0 ; i < value.length;i++){
                let opt = value[i].introduction;
                var realLength = opt.length, len = opt.length, charCode = -1;
                if (realLength > 7) {  
                    // callback(new Error('答案限制最多输入9个字!')); 
                    this.$message({
                        type: 'error',
                        message: '答案限制最多输入7个字!'
                    });
                    this.submit = false;
                } 
            }  
            callback();
        }
        return {
            id:null,
            categoryList:[],
            itemBancklist:[],
            levelList:[
                {value: 1,label:'1级'},
                {value: 2,label:'2级'},
                {value: 3,label:'3级'},
                {value: 4,label:'4级'},
                {value: 5,label:'5级'},
                {value: 6,label:'6级'},
                {value: 7,label:'7级'},
                {value: 8,label:'8级'},
                {value: 9,label:'9级'},
                {value: 10,label:'10级'},
                {value: 11,label:'11级'},
                {value: 12,label:'12级'},
                {value: 13,label:'13级'},
                {value: 14,label:'14级'},
                {value: 15,label:'15级'},
            ],
            typeList:[
                {value:'A',label:'A'},
                {value:'B',label:'B'},
                {value:'C',label:'C'},
                {value:'D',label:'D'},
            ],
            submit:true,
            information:{
                content:'',
                correct:'',
                level:'',
                category:'',
                itemBanck:'',
                categoryList:[],
                optionA:'',
                optionB:'',
                optionC:'',
                optionD:'',
                options:[
                    {
                        content:'A',
                        introduction:'',
                    },
                    {
                        content:'B',
                        introduction:'',
                    },
                    {
                        content:'C',
                        introduction:'',
                    },
                    {
                        content:'D',
                        introduction:'',
                    },
                ],
                
            },
            rules: {
                content: [
                    { required: true, message: '请输入题目名称', trigger: 'blur' },
                ],
                category: [
                    { required: true, message: '请选择类别', trigger: 'blur' },
                ],
                level: [
                    { required: true, message: '请选择级别', trigger: 'blur' },
                ],
                options: [
                    { required: true, message: '请填写选项', trigger: 'blur' },
                    { validator: validateOptions, trigger: 'blur' }
                ],
                correct: [
                    { required: true, message: '请选择类别', trigger: 'blur' },
                ],
               

            },
            loading: false
        };
    },
    components:{
         'bg-editor':()=>import('../common/bg-editor.vue')
    },
    mounted() {
        this.id  = this.$router.currentRoute.query.id;
        this.getCategory();
        this.getItemBanck()
        if(this.id){
            this.getDetail(); 
        }  
    },
    methods: {
        answer(){
        },
        // 获取类别
        getCategory(){
            let url = CONSTANT.URL.Category.ListCategory;
            let dataForm = {};
            let data = {
            };
            let param = JSON.stringify(data);
            // let param = data;
            common.requestAjax(url,param,dataForm,(res)=>{
                this.loading = false;
                let data = res.data.bussData;
                this.categoryList = data;
            }) 
        },
         // 获取题库
        getItemBanck(){
            let url = CONSTANT.URL.itemBanck.ListItemBanck;
            let dataForm = {};
            let data = {
            };
            let param = JSON.stringify(data);
            // let param = data;
            common.requestAjax(url,param,dataForm,(res)=>{
                this.loading = false;
                let data = res.data.bussData;
                this.itemBancklist = data;
            }) 
        },

        getDetail(){
           let url = CONSTANT.URL.Question.DetailQuestion
           let param = {
               id:this.id
           } ;
           common.requestAjax(url,param,null,(res)=>{
                let data = res.data.bussData;
                this.information.content = data.name;
                this.information.category = data.cateId;
                this.information.categoryName = data.cateName;
                this.information.itemBanck = data.itemId;
                this.information.itemBanckName = data.itemName;
                this.information.optionA = data.optionA;
                this.information.optionB = data.optionB;
                this.information.optionC = data.optionC;
                this.information.optionD = data.optionD;
                this.information.correct = data.correct;
                this.information.id = data.id;
                this.information.level = data.level;
                // this.information.options = [];
                // for(let i = 0; i < 4 ;i++){
                //     if( i < data.options.length){
                //         this.information.options.push(data.options[i])
                //         console.log('after--',this.information.options[i]);
                //     }else{
                //         let obj = {};
                //         console.log('else-information--',this.information.options);
                //         console.log('else--',i); 
                //         switch(i){
                //             case 0 : obj.content = 'A';
                //                      obj.introduction = '';
                //                      this.information.options.push(obj);
                //                      break;
                //             case 1 : obj.content = 'B';
                //                      obj.introduction = '';
                //                      this.information.options.push(obj);
                //                      break;
                //             case 2 : obj.content = 'C';
                //                      obj.introduction = '';
                //                      this.information.options.push(obj);
                //                      break;
                //             case 3 : obj.content = 'D';
                //                      obj.introduction = '';
                //                      this.information.options.push(obj);
                //                      break;
                //             default: break;
                //         }
                //     }
                // }
                console.log('详情数据',data);
           }) 
        },
        // 增加
        submitForm(formName) {
            if(this.submit){
            if(this.id ){
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    let url = CONSTANT.URL.Question.EditQuestion;
                    let data = {
                        name : this.information.content ,
                        cateId : this.information.category ,
                        itemId : this.information.itemBanck ,
                        correct : this.information.correct ,
                        optionA:this.information.optionA,
                        optionB:this.information.optionB,
                        optionC:this.information.optionC,
                        optionD:this.information.optionD,
                        id:this.$router.currentRoute.query.id

                    };
                    if(this.id != ''){
                        data.id = this.id;
                    };
                    let param = JSON.stringify(data);
                    common.requestAjax(url, param, null, res => {
                        if(res.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '保存成功!'
                            });
                            this.loading = false;
                            this.$router.push("/subjectListitem");
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
                    let url = CONSTANT.URL.Question.AddQuestion;
                    let data = {
                        name : this.information.content ,
                        cateId : this.information.category ,
                        itemId : this.information.itemBanck ,
                        correct : this.information.correct ,
                        level: this.information.level,
                        optionA:this.information.optionA,
                        optionB:this.information.optionB,
                        optionC:this.information.optionC,
                        optionD:this.information.optionD,
                    };
                    
                    let param = JSON.stringify(data);
                    common.requestAjax(url, param, null, res => {
                        if(res.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '保存成功!'
                            });
                            this.loading = false;
                            this.$router.push("/subjectListitem");
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
            }else{
                this.$message({
                    type: 'error',
                    message: '请检查答案选项，限制最多输入7个字!'
                });
            }
            
        },
        
        back(){
            this.$router.push('/subjectList');
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