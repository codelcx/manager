import { request,JSON } from './request'

//用户列表
export function getUserList(data) {
  return request({
    url: '/userList',
    method: 'post',
    data: JSON.stringify(data)
  })
}

//添加用户
export function addUser(data) {
  return request({
    url: '/adduser',
    method: 'post',
    data: JSON.stringify(data)
  })
}

//删除用户
export function deleteUser(id) {
  return request({
    url: '/deleteuser',
    method: 'post',
    data:`${id}`
  })
}

//修改用户角色
export function editUserRole(data) {
  return request({
    url: '/roleuser',
    method: 'post',
    data: JSON.stringify(data)
  })
}