import { request } from './request.js'
import qs from 'qs'
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data:qs.stringify(data)
  })
}