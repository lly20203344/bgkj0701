import Vue from 'vue';
import Router from 'vue-router';
const loginPage = resolve => require(['@/page/common/login-page'], resolve) 
const rechargePassword = resolve => require(['@/page/common/recharge-password'], resolve) 
const userList = resolve => require(['@/page/userManage/userList'],resolve)
const userDetail = resolve => require(['@/page/userManage/userDetail'],resolve)
const versusLis = resolve => require(['@/page/versusManage/versusLis'],resolve)
const versusDetail = resolve => require(['@/page/versusManage/versusDetail'],resolve);
const categoryList = resolve => require(['@/page/categoryManage/categoryList'],resolve)
const subjectList = resolve => require(['@/page/subjectManage/subjectList'],resolve)   //题库
const subjectListitem = resolve => require(['@/page/subjectManage/subjectListitem'],resolve)   //题目


const subjectEdit = resolve => require(['@/page/subjectManage/subjectEdit'],resolve)
const adminList = resolve => require(['@/page/adminManage/adminList'],resolve)
const adminEdit = resolve => require(['@/page/adminManage/adminEdit'],resolve)
const Module = resolve => require(['@/page/adminManage/module'],resolve)


const propertyList = resolve => require(['@/page/adminManage/propertyList'],resolve)
const propertyEdit = resolve => require(['@/page/adminManage/propertyEdit'],resolve)
const propertyDeali = resolve => require(['@/page/adminManage/propertyDeali'],resolve)
const levelList = resolve => require(['@/page/systemManage/levelList'],resolve)
const danList = resolve => require(['@/page/systemManage/danList'],resolve)
const ruleIllustrate = resolve => require(['@/page/systemManage/ruleIllustrate'],resolve)
const message = resolve => require(['@/page/systemManage/message'],resolve)
const messageEdit = resolve => require(['@/page/systemManage/messageEdit'],resolve)
const templateEdit = resolve => require(['@/page/templetManage/templateEdit'],resolve)
const elementList = resolve => require(['@/page/elementManage/elementList'],resolve)
const test = resolve => require(['@/page/versusManage/test'],resolve);

// leying


const Home = resolve => require(['@/page/Home/home'],resolve);

Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/sys/', 
  routes: [
      {
          path: '/',
          name: 'loginPage',
          component: loginPage
      },
      // leying
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: '/rechargePassword',
        name: 'rechargePassword',
        component: rechargePassword
      },
      {
        path: '/userList',
        name: 'userList',
        component: userList
      },
      {
        path: '/userDetail',
        name: 'userDetail',
        component: userDetail
      },
      {
        path: '/versusLis',
        name: 'versusLis',
        component: versusLis
      },
      {
        path: '/versusDetail',
        name: 'versusDetail',
        component: versusDetail,
        // redirect: { 
        //   path: '/versusDetail',
        //   name: 'versusDetail',
        //   component: versusDetail,
        // }
      },
      {
        path: '/subjectList',
        name: 'subjectList',
        component: subjectList
      },
      {
        path: '/subjectListitem',
        name: 'subjectListitem',
        component: subjectListitem
      },
      
      {
        path: '/subjectEdit',
        name: 'subjectEdit',
        component: subjectEdit
      },
      {
        path: '/categoryList',
        name: 'categoryList',
        component: categoryList
      },
      {
        path: '/adminList',
        name: 'adminList',
        component: adminList
      },
      {
        path: '/adminEdit',
        name: 'adminEdit',
        component: adminEdit
      },
      {
        path: '/module',
        name: 'module',
        component: Module
      },
      
      {
        path: '/propertyList',
        name: 'propertyList',
        component: propertyList
      },
      {
        path: '/propertyEdit',
        name: 'propertyEdit',
        component: propertyEdit
      },
      {
        path: '/propertyDeali/:id',
        name: 'propertyDeali',
        component: propertyDeali
      },
      
      {
        path: '/levelList',
        name: 'levelList',
        component: levelList 
      },
      {
        path: '/danList',
        name: 'danList',
        component: danList
      },
      {
        path: '/ruleIllustrate',
        name: 'ruleIllustrate',
        component: ruleIllustrate
      },
      {
        path: '/message',
        name: 'message',
        component: message
      },
      {
        path: '/messageEdit',
        name: 'messageEdit',
        component: messageEdit
      },
      {
        path: '/elementList',
        name: 'elementList',
        component: elementList
      },
      {
        path: '/templateEdit',
        name: 'templateEdit',
        component: templateEdit
      },
      {
        path: '/test',
        name: 'test',
        component: test
      },
      
      
  ]
})
