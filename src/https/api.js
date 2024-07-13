import request from './request'

export function login (data) {
  return request({
    url: '/user/user/login',
    method: 'post',
    data
  })
}

export function logout () {
  return request({
    url: '/user/user/logout',
    method: 'get'
  })
}

export function getInfo (userId) {
  return request({
    url: '/user/user/getUserName/' + userId,
    method: 'get'
  })
}

export function getOneCourseList () {
  return request({
    url: '/admin/course/getOneCourseList',
    method: 'get'
  })
}

export function arrange () {
  return request({
    url: '/admin/finalCourse/arrange',
    method: 'post'
  })
}

export function getFinalCourseList () {
  return request({
    url: '/admin/finalCourse/getFinalCourseList',
    method: 'get'
  })
}

export function getAllClassrooms () {
  return request({
    url: '/admin/classroom/getAllClassrooms',
    method: 'get'
  })
}

export function getByWhereAndDay (data) {
  return request({
    url: '/admin/classroom/getByWhereAndDay',
    method: 'post',
    data
  })
}

export function courseApplication (data) {
  return request({
    url: '/teacher/courseApplication/courseApplication',
    method: 'post',
    data
  })
}

export function getUserName (userId) {
  return request({
    url: '/user/user/getUserName/' + userId,
    method: 'get'
  })
}

export function selectCourse (data) {
  return request({
    url: '/student/student/select_course',
    method: 'post',
    data
  })
}

export function getCourseSelection () {
  return request({
    url: '/student/student/getCourseSelection',
    method: 'get'
  })
}

export function getCourseList () {
  return request({
    url: '/admin/course/getCourseList',
    method: 'get'
  })
}

export function getExamApplicationList () {
  return request({
    url: '/admin/examApplication/getExamList',
    method: 'get'
  })
}

export function arrangeExam () {
  return request({
    url: '/admin/finalExam/arrange',
    method: 'post'
  })
}

export function getFinalExamList () {
  return request({
    url: '/admin/finalExam/getFinalExamList',
    method: 'get'
  })
}

export function getClassroomList () {
  return request({
    url: '/admin/classroom/listApplication',
    method: 'get'
  })
}

export function acceptClassroom (data) {
  return request({
    url: '/admin/classroom/accept',
    method: 'post',
    data
  })
}

export function rejectClassroom (data) {
  return request({
    url: '/admin/classroom/reject',
    method: 'post',
    data
  })
}

export function getStudentScore () {
  return request({
    url: '/student/student/score',
    method: 'get'
  })
}

export function getStudentCourseList () {
  return request({
    url: '/student/student/courses',
    method: 'get'
  })
}

export function getEvaluateList () {
  return request({
    url: '/student/student/evaluation',
    method: 'get'
  })
}

export function setEvaluation (data) {
  return request({
    url: '/student/student/set_evaluation',
    method: 'post',
    data
  })
}

export function examApplication (data) {
  return request({
    url: '/admin/examApplication/examApplication',
    method: 'post',
    data
  })
}

export function scoreApplication (data) {
  return request({
    url: '/teacher/score/recordscore',
    method: 'post',
    data
  })
}

export function classroomAApplication (data) {
  return request({
    url: '/teacher/classroomapplication/classroomapplication',
    method: 'post',
    data
  })
}

export function getTeacherCourseList (data) {
  return request({
    url: '/admin/finalCourse/viewcourse',
    method: 'post',
    data
  })
}
