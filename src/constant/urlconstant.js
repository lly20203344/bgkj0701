// const api = 'http://eoms.icebartech.com/admin/';
// const api = 'https://answer.icebartech.com/api/admin/';
// const api = 'http://192.168.1.130:60807/api/admin/';

const host = window.location.host,
      //api = `https://${host}/api/admin/`;
      api = 'https://intest.icebartech.com/api/admin/';
      //api = `http://192.168.2.125:60833/api/admin/`;
      console.log(host)
module.exports = {
  //管理员
  ADMIN: {
    HOME: api + 'app/activity/page', //HOME
    LOGINOUT:api+'user/logout',    // 登出接口
    LOGIN: api + 'user/login',      //登录接口
    UPDUSERPWD: api + 'user/reset_passowrd', //重置密码接口

    FINDUSERPERMISSIONS:api+'menu/find_list',  // 获取用户拥有的左侧菜单权限

    FINDAPPROLEBYPAGE: api+'role/find_list',   //  分页获取角色列表(权限管理---分页获取)
    FINDADMINUSERBYPAGE:api+'user/findAdminUserByPage',  //  分页获取用户列表(管理员列表)
    // SAVEADMINUSER:api+'user/saveAdminUser',   //  保存用户基本信息(管理员列表保存编辑) 
    SAVEADMINUSER:api+'role/insert',   //  

    DELETEADMINUSERBYUSERID:api+'user/deleteAdminUserByUserId',   //  删除后台用户(管理员列表) 
    FINDADMINUSERDETAILBYUSERID:api+'user/findAdminUserDetailByUserId',   //  获取用户详情(管理员列表-查看)  

    GETALLAPPPERMISSION: api+'role/getAllAppPermission',   //  获取所有权限列表
    GETROLEINFOBYROLEID: api+'role/getRoleInfoByRoleId',   //  获取角色详情
    SAVEAPPROLE: api+'role/insert',   //  保存角色与权限(权限管理新增编辑)
    updatePPROLE: api+'role/update',   //  保存角色与权限(权限管理新增编辑)
    DELETEROLEBYROLEID: api+'role/delete',   //  删除角色记录



    // leying
    Api_find_detail: api+'role/find_detail',   //  获取角色详情

 




  },

// =====================================================================================================================

 // 题库管理   leying
 itemBanck:{
  AddItemBanck:api+'item/insert',   //  添加题库
  ListItemBanck:api+'item/find_list',   //  题库列表
  ListItemBanckPage:api+'item/find_page',   //  题库列表
  DetailItemBanck:api+'item/find_detail',   //  题库详情
  EditItemBanck:api+'item/update',   //  编辑题库
  DeleteItemBanck:api+'item/delete',   //  删除题库
  DeletesItemBanck:api+'item/deletes',   //  批量删除题库
},

 // 类别管理   leying
 Category:{
  AddCategory:api+'cate/insert',   //  添加类别
  ListCategoryPage:api+'cate/find_page',   //  类型列表
  ListCategory:api+'cate/find_list',   //  类型列表
  DetailCategory:api+'cate/find_detail',   //  类别详情
  EditICategory:api+'cate/update',   //  编辑类别
  DeleteCategory:api+'cate/delete',   //  删除类别
  DeletesCategory:api+'cate/deletes',   //  批量删除类别
},

//题目
Question:{
  AddQuestion:api+'question/insert',   //  添加题目
  ListQuestion:api+'question/find_page',   //  题目列表
  DetailQuestion:api+'question/find_detail',   //  题库详情
  EditQuestion:api+'question/update',   //  编辑题目
  DeleteQuestion:api+'question/delete',   //  删除题目
  DeletesQuestion:api+'question/deletes',   //  批量删除题目
},


Admin:{
  GetSysvar:api+'sysvar/find_rule',   //  获取规则
  AddSysvar:api+'sysvar/set_rule',   //  编辑规则

 
  AddUser:api+'user/insert',   //  添加管理员
  ListUser:api+'user/find_page',   //  管理员列表
  DetailUser:api+'user/find_detail',   //  管理员详情
  EditUser:api+'user/update',   //  编辑管理员

  GetSysvarFind_enable_fake:api+'sysvar/find_enable_fake',   //  获取开启三九内经（0-关闭 1-开启
  GetSysvarFind_enable_true:api+'sysvar/find_enable_true',   //  获取开启答题竞赛（0-关闭 1-开启
  AddSysvarFind_set_enable_fake:api+'sysvar/set_enable_fake',   //  设置开启三九内经（0-关闭 1-开启）
  AddSysvarFind_set_enable_true:api+'sysvar/set_enable_true',   //  设置开启答题竞赛（0-关闭 1-开启
  
},

Message:{
  ListMessage:api+'feedback/find_page',   //  留言列表
  DetailMessage:api+'feedback/find_detail',   //  留言详情
  DeleteMessage:api+'feedback/delete',   //  删除留言
},
// 留言

// =====================================================================================================================


  // 用户列表
  USER:{
    FINGPAGE:api+'mini_user/find_page',   //  分页获取用户信息
    FINGdelete:api+'mini_user/delete',   //  删除用户信息
    FINDDETAIL:api+'mini_user/find_detail',   //  获取用户详情
    FINDGAMESTATUS:api+'mini/user/findGameStatus',   //  获取游戏状态
    DELETE:api+'mini/user/delete',   //  冻结用户
    RESTORE:api+'mini/user/restore',   //  解冻用户
  },
  // 对战管理
  VERSUS:{
    FINDPAGE:api+'game/findPage',   //  获取游戏记录分页(对战列表)
    FINDDETAIL:api+'game/findDetail',   //  获取游戏记录详情(对战列表-详情)
    FINDTATALCOUNT:api+'game/findTotalCount',   //  获取总对战局数
  },
  // 题目管理
  // QUESTION:{
  //   ADD:api+'question/add',   //  添加题目
  //   DELETE:api+'question/delete',   //  删除题目
  //   DETAIL:api+'question/findDetail',   //  获取题目详情
  //   PAGE:api+'question/findPage',   //  获取题目分页
  //   UPDATE:api+'question/update',   //  修改题目
  //   FREIGHTIMPORT:api+'question/freightImport',   //  导入题目
  //   DELETES:api+'question/deletes',   //  批量删除题目
  // },
  // 系统管理----等级设置
  LEVEL:{
    ADD:api+'level/add',   //  新增等级
    DELETE:api+'level/delete',  // 删除等级
    FINDPAGE:api+'level/findPage',  //  获取等级分页
    UPDATE:api+'level/update',  //  更新等级
  },
  // 系统管理----段位设置
  DAN:{
    ADD:api+'dan/add',   //  新增段位
    DELETE:api+'dan/delete',   //  删除段位
    FINDPAGE:api+'dan/findPage',   //  获取段位分页
    UPDATE:api+'dan/update',   //  更新段位
  },
  // 系统管理----对战规则
  GAMERULE:{
    FINDONE:api+'gamerule/findOne',   //  获取游戏规则
    UPDATE:api+'gamerule/update',   //  更新游戏规则
  },
  // 系统管理----消息管理
  MESSAGE:{
    FINDPAGE:api+'message/findPage',   //  获取消息分页
    ADD:api+'message/add',   //  新增消息
    FINDDETAIL:api+'message/findDetail',   //  获取消息详情
    DELETE:api+'message/delete',   //  删除消息
    UPDATE:api+'message/update',   //  更新消息
  },
  SYS:{
    // lOADDICTIONARY:'http://192.168.1.130:60807/api/base/sys/loadDictionary', 
    lOADDICTIONARY:api+'syscode/message/category/findPage',  // 获取消息字典分页(系统消息赛事消息)
    UPDATE:api+'syscode/category/update',   // 更新字典

    QUESTIONDINFPAGE:api+'syscode/question/category/findPage',   //  获取题目字典分页
    QUESTIONADD:api+'syscode/question/category/add',   //  新增题目字典（文艺。。。。）
  },
  ELELMENT:{
    FINDELEMENTBYPAGE:api+'element/findElementByPage',   //  分页获取元素信息
    SAVEELEMENT:api+'element/saveElement',   //  保存元素信息
    DELETEELEMNET:api+'element/deleteElement',   //  删除元素信息
    FINDELEMENTALL:api+'element/findElementALL',   //  获取所有元素信息
  },
  SYSTEM:{
    ADMINUPLOADFILE:api+'base/sys/adminUploaderFile',   //  上传文件
  }
    
}
