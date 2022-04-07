import { request} from './request'
import qs from 'qs'
//角色权限
const token = localStorage.getItem('token');
export function getLimitList(type) {
  const data={type,token}
  return request({
    url: '/limit',
    method:'post',
    data: qs.stringify(data)
  })
}

//角色列表
export function getRoleList() {
  return request({
    url: '/roleList',
  })
}