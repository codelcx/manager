import { request} from './request'

//商品分类
export function getGoodCategory() {
  return request({
    url: '/category',
  })
}

//商品列表
export function getGoodList() {
  return request({
    url:'/goodList'
  })
}

//获取分类参数
export function getGoodParam(id) {
  return request({
    url: '/goodParam',
    data:id
  })
}
