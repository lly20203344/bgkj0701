<template>
  <div>
    <menu-top ref="top"></menu-top>
    <div class="content">
      <div class="content-wrap">
        <div>

          <menu-left ref="left" :href="href"></menu-left>


        </div>
        <el-col :span="23">
          <div class="wrap">
            <transition name="el-fade-in-linear" mode="out-in">
              <router-view keep-alive transition="fade" transition-mode='out-in'></router-view>
            </transition>
          </div>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
export default {
  name: 'menulist',
  data(){
    return{
      href:''
    }
  },
  components: {
    'menu-top':() => import('./Menu-Top'),
    'menu-left':() => import('./Menu-Left')
  },  
  watch: {  
      $route(to, from) {  
        if(!from.name) return;
        if(from.name == 'loginPage'){
          this.$refs.left.leftPermission();
          this.$refs.top.getManager();
        }else{
          // this.$refs.left.activePath()
        }
      }  
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.content{
  margin-left: 230px;
  padding-top: 80px;
}

a{
  text-decoration: none;
}

.wrap{
  margin: 20px;
}
</style>