<template>
    <div class="wrap">
        <div class="login-wrap">
            <div class="login-title">花园学习后台-重置密码</div>
            <div id="darkbannerwrap"></div>
            <input type="text" @keyup.enter="login" v-model="oldPassword" placeholder="旧密码">
            <input type="password" @keyup.enter="login"  v-model="password" placeholder="新密码">
            <input type="password" @keyup.enter="login"  v-model="confirmNewPWD " placeholder="确认新密码" @keyup="confirmPass">
            <div class="login-tips" v-if="tipToggle">两次输入不一致</div>
            <div class="login-button">
                <button class="btn btn-primary" type="button" @click="login">确认修改</button>
            </div>
        </div>
    </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js'),
    common = require('../../common.js');
export default {
    name: 'login',
    data() {
        return {
            oldPassword:'',
            password:'',
            confirmNewPWD :'',
            tipToggle:false
        }
    },
    mounted(){

    },
    methods:{
        login(){
            let url = CONSTANT.URL.ADMIN.UPDUSERPWD,
                param ={
                    oldPassword:this.oldPassword,
                    newPassword:this.password,
                    confirmNewPWD :this.confirmNewPWD 
                }
            
            common.requestAjax(url,param,null,(res)=>{
                console.log(res)
               if(res.code == 200){
                    this.$message({
                        type: 'success',
                        message: '密码修改成功!'
                    });
                    setTimeout(()=>{
                        this.$router.push("/loginPage");
                    },1500)
                }else{
                    this.$message({
                        type: 'warning',
                        message: res.data.errMsg
                    });
                }
            })
        },
        confirmPass(){
            if(this.password == this.confirmNewPWD ){
                this.tipToggle = false;
            }
            else{
                this.tipToggle = true;
            }
        }
    }
}
</script>

<style scoped>
.wrap {
    height:100%;
    background: url(../../images/web_login_bg.png) no-repeat center;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    z-index: 999;
}

.login-wrap {
    position:relative;
    top:200px;
    /* margin: 0px auto 0 auto; */
    min-height: 420px;
    max-width: 420px;
    padding: 40px;
    background-color: #ffffff;
    margin-left: 60%;
    margin-right: auto;
    border-radius: 4px;
    /* overflow-x: hidden; */
    box-sizing: border-box;
}

.login-title {
    margin: 10px 0 0 -58px;
    padding: 18px 10px 18px 60px;
    background: #21b5cc;
    position: relative;
    color: #fff;
    font-size: 16px;
}

#darkbannerwrap {
    background: url(../../images/aiwrap.png);
    width: 18px;
    height: 10px;
    margin: 0 0 20px -58px;
    position: relative;
}

input[type=text], input[type=file], input[type=password], input[type=email], select {
    border: 1px solid #DCDEE0;
    vertical-align: middle;
    border-radius: 3px;
    height: 50px;
    padding: 0px 16px;
    font-size: 14px;
    color: #555555;
    outline: none;
    width: 90%;
    margin-bottom: 25px;
}
.login-tips {
    margin-top: -20px;
    margin-bottom: 20px;
    text-align: right;
    font-size: 12px;
    color: red;
}
.login-button button{
    padding: 12px 24px;
    margin: 0px;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    width: 100%;
    cursor: pointer;
    color: #ffffff;
    background-color: #21b5cc;
    border-radius: 3px;
    border: none;
}
</style>
