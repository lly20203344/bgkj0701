<template>
  <div id="app">
      <component :is="showCom"></component>
  </div>
</template>


<script>
export default {
  name: 'app',
    data () {
    return {
        showCom: 'menulist'
    }
  },
  components: {
    'menulist': () => import('./page/common/Menu-common'),
    'login': () => import('./page/common/login-page')
  },
  mounted(){
    
  },
  methods: {
    //读取cookie：
    getCookie(name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");　　
        return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
    }
  }
}
</script>

<style lang="scss">
html{
  height: 100%;
}
body{
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // background-color: #EDF3FC !important;
}
.el-loading-mask {
  left: 14% !important;
}
#app{
  height: 100%;
  
}
.el-menu-item.is-active{ color: #21b5cc !important;border-left:5px solid #21b5cc;}
a{text-decoration: none !important;}

.wrap{
  margin: 20px;
}

.el-button.link{
  padding: 0px;
  span{
    display: inline-block;
    a{
      display: inline-block;
      padding:9px 15px;
    }
  }
}

.note-editor.note-frame{
    width: 375px;
}
.el-table th>.cell{
  text-align: center;
}
.pic{ 
    width: 100%;
    height:60px;
    overflow: hidden; 
    text-align: center;
    img{ width:60px;height:60px;border-radius:50%;display: inline-block;}
}
.pro-item{
   margin: 0;
  border-bottom: 1px solid #dedede;
  padding:12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.pro-item:first-child{
  padding-top: 0;
}
.pro-item:last-child{
  border-bottom: none;
  padding-bottom: 0;
}
.table-order {
  .el-table__row {
    .el-table_1_column_3{
      .cell{
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
    }
    .el-table_1_column_4{
      .cell{
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
    }
    .el-table_1_column_5{
      .cell{
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
    }
  }
}
   

.contain {
  .header{
    padding: 16px;
    // border-bottom:1px solid #dedede; 
    background-color: #fff;
    form{
      display: inline-block;
      margin-left: 10px;
    }
    .export{
          cursor: pointer;
          padding: 9px 15px;
          font-family:Arial;
          font-size:14px;
          line-height: 14px;
          border-radius: 4px;
          border: 1px solid #c4c4c4;
          color: #fff;
          background-color: #21b5cc;
          border-color: #21b5cc;
          display: inline-block;
      }
      .export:hover {
          background: #21b5cc;
          border-color: #21b5cc;
          color: #fff;
      }
  }
  .input_modal {
    padding: 16px 16px 10px 16px;
    background-color: #fff;
    margin-top: 20px;
    .input-item{ 
        display: inline-block;
        margin-right: 20px;
        clear: both;
        height: 40px;
        line-height: 40px;
        .el-input,.el-button, .el-select,span{ float: left;margin-right: 10px;}
        .proName{width:200px;}
    }
  }
  .table-content{ background-color: #fff;padding: 10px;margin-top: 20px;}
  .pagination {
      text-align: right;
      margin-top: 20px;
      background-color: #fff;
      padding: 10px;
      display: block !important;
  }
  .el-button{ background-color: #21b5cc !important; border:1px solid #21b5cc; }
}

.contain-edit{
    .el-button--primary{ background-color: #21b5cc !important; border:1px solid #21b5cc; }
    .header{
        height: 60px;
        padding-bottom: 10px;
        background-color: #fff;
        padding: 12px 16px 10px;
        p{ float: left;height: 36px;line-height: 36px;margin: 0 0 0 10px;font-size: 18px;}
        .el-button{
          float: right;
          margin-right: 5%
        }
    }
    .main {
      // max-width: 1200px;
      margin-top: 20px;
      clear: both;
      background-color: #fff;
      padding: 16px;
      .el-input,.el-select {width: 250px;}
      .modal-body{
        .note-image-input{display: block;}
      }
    }
    .list{
        .title{
          padding-left: 20px;
                    height: 40px;
                    line-height: 40px;
                    background-color: #f5f5f5;
                    border: 1px solid #dedede;
                    font-weight: 600;
                }
                .noborder-top{
                    border-top:none;
                }
                .item{
                    height: 40px;
                    border: 1px solid #dedede;
                    border-top:none;
                    .item-key{
                        float: left;
                        width: 120px;
                        padding-left: 20px;
                        padding-right: 10px;
                        height: 40px;
                        line-height: 40px;
                        text-align: right;
                        border-right: 1px solid #dedede;
                    }
                    .item-value{
                        // width: auto;
                        height: 40px;
                        line-height: 40px;
                        padding-left: 20px;
                        float: left;
                    }
                    
                }
                .item-text{
                    height: 40px;
                    border: 1px solid #dedede;
                    border-top:none;
                    .item-key{
                        float: left;
                        width: 120px;
                        padding-left: 20px;
                        padding-right: 10px;
                        height: 40px;
                        line-height: 40px;
                        text-align: right;
                        border-right: 1px solid #dedede;
                    }
                    .item-value{
                        // width: auto;
                        height: 40px;
                        line-height: 40px;
                        padding-left: 20px;
                        float: left;
                    }
                    
                }
                .item-pic{
                    min-height: 400px;
                    .item-key{
                        min-height: 400px;
                    }
                    .item-value{
                        min-height: 400px;
                        width: 80%;
                        padding-left: 20px;
                        padding-top: 10px;
                        line-height: 24px;
                        section{
                           display: block;
                            width:100%;
                            padding:10px 0px;
                            float: left;
                            height: 100px;
                            overflow: hidden;
                            img{
                                height: 100px;
                                width: auto;
                                display: inline-block;
                            }
                        }
                        
                    }
                }
            }
}

.camera_contain {
  .el-button--primary{ background-color: #21b5cc !important; border:1px solid #21b5cc; }
  .header{
      height: 60px;
      padding-bottom: 10px;
      background-color: #fff;
      padding: 12px 16px 10px;
      p{ float: left;height: 36px;line-height: 36px;margin: 0 0 0 10px;font-size: 18px;}
      .el-button{
        float: right;
        margin-right: 5%
      }
  }
  .main {
      margin-top: 20px;
      clear: both;
      background-color: #fff;
      padding: 16px;
      .el-input,
      .el-select {width: 200px;}
      .el-form-item {
        margin-bottom: 22px;
        width: 31%;
        display: inline-block;
        margin-right:3%;
      }
      .el-form-item:nth-child(3n){
        margin-right:0;
      }
      .el-form-item:last-child{
        width: 100%;
        display: block;
      }
    }
  }

  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #21b5cc !important;
    border-color: #21b5cc !important;
}
.el-checkbox__input.is-checked+.el-checkbox__label{ color: #21b5cc !important;}
</style>
