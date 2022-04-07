import { request } from './request.js'
export function getOrderList() {
  return request({
    url: '/order',
  })
}