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

export function getCourseList () {
  return request({
    url: '/course/getCourseList',
    method: 'get'
  })
}

export function getOneCourseList () {
  return request({
    url: '/course/getOneCourseList',
    method: 'get'
  })
}

export function arrange () {
  return request({
    url: '/finalCourse/arrange',
    method: 'post'
  })
}

export function getFinalCourseList () {
  return request({
    url: '/finalCourse/getFinalCourseList',
    method: 'get'
  })
}

export function getExamApplicationList () {
  return request({
    url: '/examapplication/getExamList',
    method: 'get'
  })
}

export function arrangeExam () {
  return request({
    url: '/finalExam/arrange',
    method: 'post'
  })
}

export function getFinalExamList () {
  return request({
    url: '/finalExam/getFinalExamList',
    method: 'get'
  })
}

export function getClassroomList () {
  return request({
    url: '/classroom/listApplication',
    method: 'get'
  })
}

export function acceptClassroom (data) {
  return request({
    url: '/classroom/accept',
    method: 'post',
    data
  })
}

export function rejectClassroom (data) {
  return request({
    url: '/classroom/reject',
    method: 'post',
    data
  })
}

export function getByWhereAndDay (data) {
  return request({
    url: '/classroom/getByWhereAndDay',
    method: 'post',
    data
  })
}

export function getStudentScore () {
  return request({
    url: '/student/score',
    method: 'get'
  })
}

export function getStudentCourseList () {
  return request({
    url: '/student/courses',
    method: 'get'
  })
}

export function getEvaluateList () {
  return request({
    url: '/student/evaluation',
    method: 'get'
  })
}

export function setEvaluation (data) {
  return request({
    url: '/student/set_evaluation',
    method: 'post',
    data
  })
}
