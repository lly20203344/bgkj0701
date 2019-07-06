<template>
    <el-col  :style="{height:heightLength+'px'}" class="el-left-menu" :span="3">
        <el-menu  background-color="#324157" text-color="#bfcbd9" :default-active="active" :active="active"  class="el-menu-vertical-demo"  router unique-opened>
            <el-submenu v-for="menuItem in menusList" :key="menuItem.id" :index="menuItem.menuHref">
                <template slot="title">
                    <!-- <i :class="menuItem.icon"></i> -->
                    <span>{{menuItem.menuName}}</span>
                </template>
                <el-menu-item  v-for="item in menuItem.subMenus"  :key="item.menuName"  :index="item.menuHref" >{{item.menuName}} </el-menu-item>
            </el-submenu>
        </el-menu>
    </el-col>
</template>

<script>
let CONSTANT = require('../../constant/constant.js'),
    common = require('../../common.js');
var routerList = require('./router-leftBar.js');
export default {
  data () {
    return {
        active:'',
        routeList:[],   
        // routeList:routerList.default.routerList,
        heightLength:'' ,
        menusList:[],                                                                                                                                                                                                                               
    }
  },
  created(){
      // console.log(this.routeList);
      this.heightLength = document.body.scrollHeight ;
  },
  mounted(){
        this.leftPermission();
        // console.log('侧边栏',this.routeList);
        // this.fresh(1);
        window.addEventListener('scroll', ()=>{
            let scrollHeight = document.body.scrollHeight;
                this.heightLength =scrollHeight-80
        })
        let active = '/'+ this.$router.currentRoute.path.split('/')[1];
        // console.log(active + '------ test');
        this.active = active;
        if(localStorage.menus){
            let menusList=JSON.parse(localStorage.getItem('menus'));
            this.menusList=menusList
        }
  },
  methods:{
     getHome(){
             let url = CONSTANT.URL.ADMIN.HOME;
             let param = {'pageIndex':1,'pageSize':10 };
            this.$http.post(url, param, {emulateJSON:true}).then(res => {
                 let data = res.data;
                 if(data.code == 200){
                 }
                 else{
                   
                 }
             }, res => {
                 // error callback
            });

        },
      
    leftPermission(){
        let url = CONSTANT.URL.ADMIN.FINDUSERPERMISSIONS;
        let data = {};
        let param = JSON.stringify(data);
        common.requestAjax(url,param,null,(res)=>{
            this.routeList = res.data.bussData;
            let active = '/'+ this.$router.currentRoute.path.split('/')[1];
            //  console.log(active + '------ test');
            this.active = active;
        })
    },
    fresh(x){
        if(x == 1){
            setTimeout(()=> { window.location.reload();}, 1000);
        }
        else{
            this.fresh(x-1);
        }
    },
    handleOpen(key, keyPath) {
       
    },
    handleClose(key, keyPath) {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
    .el-left-menu{
      height:1000px;
      position: fixed;
      left: 0;
      width: 206px;
    }
    .el-menu-vertical-demo{
      height: 100%;
    }

    .el-menu-item{
        min-width:auto!important;
    }
    .el-menu-item-group__title{
        padding-top: 0px!important;
    }
    .el-menu-item{
        a{
            display: block;
            color: #bfcbd9;
        }
        &.is-active{
            a{
              color: #21b5cc;
            }
        }
    }
</style>
