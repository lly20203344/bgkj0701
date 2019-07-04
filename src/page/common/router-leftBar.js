export default {
  routerList: [
    { 
      id:'1', 
      menuName: '用户管理', 
      menuUrl: '/', 
      icon:'el-icon-document',
      childPermissions:[
        {
          id:'1-1', 
          menuName: '用户列表', 
          menuUrl: '/', 
          menuList:[],
        }
      ],
    },
    { 
      id:'2', 
      menuName: '对战管理', 
      menuUrl: '/versusManage', 
      icon:'el-icon-document',
      childPermissions:[
        {
          id:'2-1', 
          menuName: '对战列表', 
          menuUrl: '/versusLis', 
          menuList:[],
        }
      ],
    },
    { 
      id:'3', 
      menuName: '题目管理', 
      menuUrl: '/subjectManage', 
      icon:'el-icon-document',
      childPermissions:[
        {
          id:'3-1', 
          menuName: '题目列表', 
          menuUrl: '/subjectList', 
          menuList:[],
        }
      ],
    },
    { 
      id:'4', 
      menuName: '类别管理', 
      menuUrl: '/categoryManage', 
      icon:'el-icon-document',
      childPermissions:[
        {
          id:'4-1', 
          menuName: '类别列表', 
          menuUrl: '/categoryList', 
          menuList:[],
        }
      ],
    },
    { 
      id:'5', 
      menuName: '管理员管理', 
      menuUrl: '/adminManage', 
      icon:'el-icon-document',
      childPermissions:[
        {
          id:'5-1', 
          menuName: '管理员列表', 
          menuUrl: '/adminList', 
          menuList:[],
        },
        {
          id:'5-2', 
          menuName: '权限管理', 
          menuUrl: '/propertyList', 
          menuList:[],
        }
      ],
    },
    { 
      id:'6', 
      menuName: '系统设置', 
      menuUrl: '/systemManage', 
      icon:'el-icon-document',
      childPermissions:[
        {
          id:'6-1', 
          menuName: '等级设置', 
          menuUrl: '/levelList', 
          menuList:[],
        },
        {
          id:'6-2', 
          menuName: '段位设置', 
          menuUrl: '/danList', 
          menuList:[],
        },
        {
          id:'6-3', 
          menuName: '对战规则说明', 
          menuUrl: '/ruleIllustrate', 
          menuList:[],
        },
        {
          id:'6-4', 
          menuName: '客服消息', 
          menuUrl: '/message', 
          menuList:[],
        }
      ],
    },
    
  ]
}
