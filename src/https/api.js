import request from './request'

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function getInfo (userId) {
  return request({
    url: '/user/getInfo/' + userId,
    method: 'get'
  })
}

export function getAllTags () {
  return request({
    url: '/tag/getAllTags',
    method: 'get'
  })
}

export function createTag (data) {
  return request({
    url: '/tag/create',
    method: 'post',
    data
  })
}

export function deleteTag (data) {
  return request({
    url: '/tag/delete',
    method: 'post',
    data
  })
}

export function modifyTag (data) {
  return request({
    url: '/tag/modify',
    method: 'post',
    data
  })
}

export function getAdminsAndCheckers () {
  return request({
    url: '/user/getAdminsAndCheckers',
    method: 'get'
  })
}

export function grant (data) {
  return request({
    url: '/user/grant',
    method: 'post',
    data
  })
}

export function changeStatus (data) {
  return request({
    url: '/user/status',
    method: 'post',
    data
  })
}

export function getBannedUsers () {
  return request({
    url: '/user/getBannedUsers',
    method: 'get'
  })
}

export function getBannedUser (userId) {
  return request({
    url: '/user/getBannedUser/' + userId,
    method: 'get'
  })
}
