import Mock from 'mockjs'
import qs from 'qs'

//数据导入
import role from './data/role'
import limit from './data/limit'
import userList from './data/user'
import category from './data/category'
import goodList from './data/good'
import parameter from './data/parameter'
import orderList from './data/order'

//工具函数导入
import tree2List from './util/tree2List'


//网络地址
const baseURL = 'http://192.168.200.105:8080';


//{url: 'http://192.168.200.105:8080/userList', type: 'POST', body: 'pageNum=1&pageSize=2'}
//body: "pageNum=1&pageSize=2"
//type: "POST"
//登录拦截
Mock.mock(baseURL + '/login',req => {
  const { username, password } = qs.parse(req.body);//req.body username="&password=""
  for (let i = 0; i < userList.data.length; i++){
    if (userList.data[i].username === username && userList.data[i].password === password) {
      return {
        data:userList.data[i].token,
        meta: {
          status: 200,
          msg: '登录成功',
        }
      }
    }
  }
  return {
    meta: {
      status:201,
      msg: '用户名或密码错误',
    }
  }
});

//用户列表
Mock.mock(baseURL + '/userList', req => {
  const { query, pageNum, pageSize } = qs.parse(req.body);
  const total = userList.data.length;
  //const max_page = parseInt(total / pageSize)+1 ;//最大页面数
  const max_page = Math.ceil(total / pageSize);
  const page_num = pageNum > max_page ? max_page : pageNum;//请求的页面
  const end = page_num * pageSize >= total ? total : page_num * pageSize;//截取数据的末端位置
  const start = pageSize * (page_num - 1);//截取数据的起始位置
  const data = userList.data.slice(start, end);//获取数据
  //对象字面量的增强写法
  return {
    data,
    total
  }
});

//用户添加
Mock.mock(baseURL + '/adduser', req => {
  const user = qs.parse(req.body);
  if (user.username === '' || user.password === '') {
    return {
      status: 201,
      msg: '添加失败',
    }
  } else {
    user.id = userList.data.length + 1;
    user.date = Random.now('second');
    user.state = true;
    // userList.data.unshift(user);
    userList.data.push(user);
    const length = userList.data.length;
    return {
      status: 200,
      msg: '添加成功',
      total:length
    }
  }
});

//用户删除
Mock.mock(baseURL + '/deleteuser', res => {
  const id = res.body;
  const index = userList.data.findIndex(item => item.id==id)
  const item = userList.data.splice(index, 1);
  const length = userList.data.length;
  return {
    status: 200,
    total:length
  }
})





//角色列表
Mock.mock(baseURL+'/roleList', role);
//角色修改
Mock.mock(baseURL + '/roleuser', res => {
  const { id, rid } = qs.parse(res.body);
  const index = userList.data.findIndex(item => item.id==id)
  userList.data[index].rid = parseInt(rid);
  return {
    status: 200,
  }
})


//权限列表
Mock.mock(baseURL + '/limit', req => {
  const { type, token } = qs.parse(req.body)
  for (let i = 0; i < userList.data.length; i++){
    if (userList.data[i].token == token) {
      for (let j = 0; j < role.length; j++){
        if (userList.data[i].rid == role[j].rid) {
          const limits = role[j].children;
          if (type == 'list') {
            return tree2List(limit);
          }
          return limits
        }
      }
    }
  }

});


//商品分类
Mock.mock(baseURL + '/category', category);

//商品列表
Mock.mock(baseURL + '/goodList', goodList);

//分类参数
Mock.mock(baseURL + '/goodParam', req => {
  let id =parseInt(req.body);
  const param = {
    s_attr: [],
    d_attr:[]
  }
  for (let i = 0; i < parameter.length; i++){
    if (parameter[i].cat_id == id) {
      if (Array.isArray(parameter[i].attr_value)) {
        param.d_attr.push(parameter[i]);
      } else {
        param.s_attr.push(parameter[i])
      }
    }
  }
  return param;
});

//订单列表
Mock.mock(baseURL + '/order', orderList);