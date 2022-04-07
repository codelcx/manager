
import limit from './limit'
const role = [
  {
    rid: 0,
    roleName: '管理员',
    roleDes: '后台管理',
    children:limit
  },
  {
    rid: 1,
    roleName: '主管',
    roleDes: '技术负责人',
    children:[limit[1]]
  },
  {
    rid: 2,
    roleName: '测试角色',
    roleDes: '测试功能',
    children:[]
  }
]

export default role