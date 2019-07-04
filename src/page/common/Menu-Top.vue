<template>
    <header>
        <router-link  to="/home">
            <el-col  class="left pl-20 top"  @click="goHome" >花园学习后台</el-col>
        </router-link>
        <el-col :span="18">hi，欢迎登录花园学习后台</el-col>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                <img alt="Avatar" src="../../images/avatar2.jpg">
                <p class="manager">{{manager}}<img alt="Avatar" src="../../images/down.png" class="down"></p>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0">重置密码</el-dropdown-item>
                <el-dropdown-item command="1">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </header>
</template>

<script>
export default {
    data () {
        return {
            menuShow:false,
            manager:'',
        }
    },
    created(){

    },
    mounted(){
        this.getManager();
    },
    methods:{
        goHome(){
            console.log(111)
            this.$router.push('/') 
        },
        getManager(){
            this.manager = sessionStorage.getItem('manager')?sessionStorage.getItem('manager'):'管理员'
        },
        handleCommand(command){
            console.log(command)
            if(command == '1'){
                localStorage.removeItem('menus')
                this.$router.push("/");

            }else{
                this.$router.push("/rechargePassword");
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    header{
        position: fixed;
        display: flex;
        -webkit-display: flex;
        align-items: center;
        -webkit-align-items: center;
        height: 80px;
        background-color: #fff;
        color: #21b5cc;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 999;
        font-size: 16px;
        font-weight: 700;
        .top {
            cursor: pointer;
        }
        // position: relative;
        .manager{
            position: relative;
            padding-right: 30px;
            img{
                position: absolute;
                width: 15px;
                height: auto;
                right: 0;
                top:2px;
            }
            .down{
                border-radius: 0;
                top:5px;
            }
        }
        .left{ width: 205px;background-color:#21b5cc;color: #fff;height: 80px;line-height: 80px;text-align: center;font-size: 16px;
                position: absolute;left: 0;top:0;}
        .el-col-18 {padding-left: 255px;}
    }
    .el-dropdown{
        margin-left: 10%;
    }
    .el-dropdown-link{
        display: flex;
        -webkit-display: flex;
        align-items: center;
        -webkit-align-items: center;
        cursor: pointer;
        span{
            color: #21b5cc;
        }
        P{
            color: #000;
        }

        img{
            position: relative;
            margin-right: 10px;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            -webkit-border-radius: 50%; 
        }
    }
</style>
