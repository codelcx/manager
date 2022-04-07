const limit = [
  {
    id:1,
    name: "用户管理",
    path:'users',
    level: "0",
    children: [
      {
        id:11,
        name: '用户列表',
        path: "user",
        level: "1",
        children: [
          {
            id:111,
            name: '用户添加',
            path: "user",
            level:"2"
          },
          {
            id:112,
            name: '用户删除',
            path: "user",
            level:"2"
          },
        ]
      }
    ]
  },
  {
    id:2,
    name: "权限管理",
    path:'limits',
    level: "0",
    children: [
      {
        id:21,
        name: '角色列表',
        path: 'role',
        level: "1",
        children: [
          {
            id:211,
            name: '角色添加',
            path: 'role',
            level:"2"
          },
          {
            id:212,
            name: '角色删除',
            path: 'role',
            level:"2"
          },
        ]
      },
      {
        id:22,
        name: '权限列表',
        path: 'limit',
        level: "1",
        children: [
          {
            id:221,
            name: '查看权限',
            path: 'limit',
            level:"2"
          },
        ]
      },
    ]
  },
  {
    id:3,
    name: "商品管理",
    path:"goods",
    level: "0",
    children: [
      {
        id:31,
        name: '商品列表',
        path: 'goodList',
        level: "1",
        children: [
          {
            id:311,
            name: '商品添加',
            path: 'good',
            level:"2"
          },
          {
            id:312,
            name: '商品删除',
            path: 'good',
            level:"2"
          },
          {
            id:313,
            name: '商品修改',
            path: 'good',
            level:"2"
          },
        ]
      },
      {
        id:32,
        name: '分类参数',
        path: 'param',
        level: "1",
        children: [
          {
            id:321,
            name: '获取参数列表',
            path: 'param',
            level:"2"
          },
          {
            id:322,
            name: '删除商品参数',
            path: 'param',
            level:"2"
          },
        ]
      },
      {
        id:33,
        name: '商品分类',
        path: 'sort',
        level: "1",
        children: [
          {
            id:331,
            name: '分类添加',
            path: 'sort',
            level:"2"
          },
          {
            id:332,
            name: '分类删除',
            path: 'sort',
            level:"2"
          },
        ]
      },

    ]
  },
  {
    id:4,
    name: "订单管理",
    path:"orders",
    level: "0",
    children: [
      {
        id:41,
        name: '订单列表',
        path: 'order',
        level: "1",
        children: [
          {
            id:411,
            name: '订单增加',
            path: 'order',
            level:"2"
          },
          {
            id:412,
            name: '订单删除',
            path: 'order',
            level:"2"
          },
          {
            id:413,
            name: '订单详情',
            path: 'order',
            level:"2"
          },
        ]
      },
    ]
  },
  {
    id: 5,
    name:"数据统计",
    path: 'charts',
    level:"0",
    children: [
      {
        id:51,
        name: '数据报表',
        path: 'chart',
        level: "1",
        children: [
          {
            id:511,
            name: '报表查看',
            path: 'chart',
            level:"2"
          },
        ]
      }
    ]
  }
]

export default limit