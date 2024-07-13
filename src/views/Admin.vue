<template>
  <div>
    <el-container>
      <el-header height="80px" style="background-color: #cc3333">
        <el-row>
          <el-col :span="8">
            <h2 style="color: white; float: left; margin-left: 30px; margin-top: 22px">高校综合教务管理系统</h2>
          </el-col>
          <el-col :span="8"></el-col>
          <el-col :span="8">
            <div style="float: right; margin-top: 23px; margin-right: 30px">
            <span style="color: white; margin-right: 20px">
              {{ userInfo.userName }}，欢迎您！
            </span>
              <el-button @click="logout">
                登出
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-scrollbar style="height: 100%">
            <el-menu
              :default-openeds="['1']"
              background-color="#003366"
              active-text-color="#fff"
              text-color="#cccccc"
              style="height: 700px"
              default-active="1"
            >
              <el-menu-item index="1" @click="showQueue">
                <el-icon><List/></el-icon>排课
              </el-menu-item>
              <el-menu-item index="2" @click="showFinalCourseTable">
                <el-icon><List/></el-icon>最终课表查看
              </el-menu-item>
              <el-menu-item index="3" @click="showExam">
                <el-icon><List/></el-icon>考试安排
              </el-menu-item>
              <el-menu-item index="4" @click="showFinalExam">
                <el-icon><List/></el-icon>最终考试安排查看
              </el-menu-item>
              <el-menu-item index="5" @click="showClassroomQueue">
                <el-icon><List/></el-icon>空闲教室申请审核
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="22">
              <!------------------------------------- 排课 --------------------------------------->
              <br v-if="queueIsSelected === true">
              <h2 v-if="queueIsSelected === true">待排课表</h2>
              <br v-if="queueIsSelected === true">
              <el-button v-if="queueIsSelected === true" type="primary" round @click="arrange">审查完毕，开始排课</el-button>
              <br v-if="queueIsSelected === true">
              <br v-if="queueIsSelected === true">
              <el-table
                v-if="queueIsSelected === true"
                stripe
                border
                :cell-style="{'text-align': 'center'}"
                :data="queue.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
              >
                <el-table-column prop="courseId" label="课程号" header-align="center"></el-table-column>
                <el-table-column prop="courseName" label="课程名" header-align="center"></el-table-column>
                <el-table-column prop="courseTeacherId" label="授课教师编号" header-align="center"></el-table-column>
                <el-table-column prop="courseNum" label="每周课程数" header-align="center"></el-table-column>
              </el-table>
              <el-config-provider :locale="locale">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="queue.length"
                  background
                  v-if="queueIsSelected === true"
                ></el-pagination>
              </el-config-provider>
              <!---------------------------------- 最终课表查看 ------------------------------------>
              <br v-if="finalCourseIsSelected === true">
              <h2 v-if="finalCourseIsSelected === true">最终课程表</h2>
              <br v-if="finalCourseIsSelected === true">
              <el-table
                v-if="finalCourseIsSelected === true"
                stripe
                border
                :cell-style="{'text-align': 'center'}"
                :data="finalCourseTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
              >
                <el-table-column prop="courseId" label="课程号" header-align="center"></el-table-column>
                <el-table-column prop="courseName" label="课程名" header-align="center"></el-table-column>
                <el-table-column prop="courseTeacherId" label="授课教师编号" header-align="center"></el-table-column>
                <el-table-column prop="classroomName" label="授课地点" header-align="center"></el-table-column>
                <el-table-column prop="freeTime" label="授课时间段" header-align="center"></el-table-column>
              </el-table>
              <el-config-provider :locale="locale">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="finalCourseTable.length"
                  background
                  v-if="finalCourseIsSelected === true"
                ></el-pagination>
              </el-config-provider>
              <!------------------------------------- 考试安排 --------------------------------------->
              <br v-if="examIsSelected === true">
              <h2 v-if="examIsSelected === true">待安排考试</h2>
              <br v-if="examIsSelected === true">
              <el-button v-if="examIsSelected === true" type="primary" round @click="arrangeExam">审查完毕，开始安排考试</el-button>
              <br v-if="examIsSelected === true">
              <br v-if="examIsSelected === true">
              <el-table
                v-if="examIsSelected === true"
                stripe
                border
                :cell-style="{'text-align': 'center'}"
                :data="examList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
              >
                <el-table-column prop="examId" label="考试编号" header-align="center"></el-table-column>
                <el-table-column prop="majorId" label="考试专业编号" header-align="center"></el-table-column>
                <el-table-column prop="courseId" label="课程编号" header-align="center"></el-table-column>
                <el-table-column prop="examFormat" label="考试形式" header-align="center"></el-table-column>
              </el-table>
              <el-config-provider :locale="locale">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="examList.length"
                  background
                  v-if="examIsSelected === true"
                ></el-pagination>
              </el-config-provider>
              <!------------------------------------- 最终考试安排查看 --------------------------------------->
              <br v-if="finalExamIsSelected === true">
              <h2 v-if="finalExamIsSelected === true">最终考试安排</h2>
              <br v-if="finalExamIsSelected === true">
              <el-table
                v-if="finalExamIsSelected === true"
                stripe
                border
                :cell-style="{'text-align': 'center'}"
                :data="finalExamTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
              >
                <el-table-column prop="examId" label="考试编号" header-align="center"></el-table-column>
                <el-table-column prop="majorId" label="考试专业编号" header-align="center"></el-table-column>
                <el-table-column prop="courseId" label="课程编号" header-align="center"></el-table-column>
                <el-table-column prop="examFormat" label="考试形式" header-align="center"></el-table-column>
                <el-table-column prop="examTime" label="考试时间" header-align="center"></el-table-column>
                <el-table-column prop="classroomName" label="考试地点" header-align="center"></el-table-column>
              </el-table>
              <el-config-provider :locale="locale">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="finalExamTable.length"
                  background
                  v-if="finalExamIsSelected === true"
                ></el-pagination>
              </el-config-provider>
              <!------------------------------------- 教室审核 --------------------------------------->
              <br v-if="classroomQueueIsSelected === true">
              <h2 v-if="classroomQueueIsSelected === true">教室申请</h2>
              <br v-if="classroomQueueIsSelected === true">
              <el-table
                v-if="classroomQueueIsSelected === true"
                stripe
                border
                :cell-style="{'text-align': 'center'}"
                :data="classroomQueue.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
              >
                <el-table-column prop="userId" label="申请者编号" header-align="center"></el-table-column>
                <el-table-column prop="classroomId" label="教室编号" header-align="center"></el-table-column>
                <el-table-column prop="reason" label="申请理由" header-align="center"></el-table-column>
                <el-table-column prop="needTime" label="使用时间" header-align="center"></el-table-column>
                <el-table-column label="操作" header-align="center">
                  <template #default="scope">
                    <el-button type="primary" size="mini" @click="acceptClassroomQueue(scope.row)">通过</el-button>
                    <el-button type="danger" size="mini" @click="rejectClassroomQueue(scope.row)">拒绝</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-config-provider :locale="locale">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="classroomQueue.length"
                  background
                  v-if="classroomQueueIsSelected === true"
                ></el-pagination>
              </el-config-provider>
            </el-col>
            <el-col :span="1"></el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { markRaw, reactive } from 'vue'
import { List } from '@element-plus/icons-vue'
import {
  acceptClassroom,
  arrange,
  arrangeExam, getClassroomList,
  getExamApplicationList,
  getFinalCourseList,
  getFinalExamList,
  getOneCourseList,
  logout, rejectClassroom
} from '@/https/api'
import router from '@/router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { ElMessage } from 'element-plus'

export default {
  name: 'Admin',
  data () {
    return {
      List: markRaw(List),
      userInfo: reactive({
        userName: '',
        userType: ''
      }),
      queue: reactive([]),
      queueIsSelected: false,
      queueIsClicked: 0,
      courseList: reactive([]),
      finalCourseTable: reactive([]),
      finalCourseIsSelected: false,
      finalCourseIsClicked: 0,
      examIsSelected: false,
      examIsClicked: 0,
      examList: reactive([]),
      classroomQueue: reactive([]),
      classroomQueueIsSelected: false,
      classroomQueueIsClicked: 0,
      finalExamTable: reactive([]),
      finalExamIsSelected: false,
      finalExamIsClicked: 0,
      currentPage: 1,
      pageSize: 10,
      locale: zhCn,
    }
  },
  methods: {
    f () {
      return new Promise((resolve, reject) => {
        const id = localStorage.getItem('user')
        if (id === null) {
          resolve()
        } else {
          this.userInfo.userName = localStorage.getItem('userName')
          this.userInfo.userType = localStorage.getItem('userType')
        }
      })
    },
    logout () {
      logout().then(res => {
        localStorage.clear()
        sessionStorage.clear()
        router.replace('/')
      })
    },
    showQueue () {
      this.currentPage = 1
      this.pageSize = 10
      this.finalCourseTable = []
      this.finalCourseIsSelected = false
      this.finalCourseIsClicked = 0
      this.queueIsSelected = true
      this.queueIsClicked++
      this.examIsSelected = false
      this.examIsClicked = 0
      this.classroomQueueIsSelected = false
      this.classroomQueueIsClicked = 0
      this.finalExamIsSelected = false
      this.finalExamIsClicked = 0
      if (this.queueIsClicked === 1) {
        for (let i = 0; i < this.courseList.length; i++) {
          this.queue.push(this.courseList[i])
        }
      }
    },
    getCourseList () {
      getOneCourseList().then(res => {
        const list = res.data
        for (let i = 0; i < list.length; i++) {
          this.courseList.push(list[i])
        }
        this.showQueue()
      })
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    arrange () {
      // console.log(123456)
      arrange().then(res => {
        console.log(res)
        location.reload()
      })
    },
    arrangeExam () {
      arrangeExam().then(res => {
        console.log(res)
        location.reload()
      })
    },
    showFinalCourseTable () {
      if (this.queue.length !== 0) {
        alert('仍有课程待排')
      } else {
        this.currentPage = 1
        this.pageSize = 10
        this.queue = []
        this.queueIsSelected = false
        this.queueIsClicked = 0
        this.finalCourseIsSelected = true
        this.finalCourseIsClicked++
        this.examIsSelected = false
        this.examIsClicked = 0
        this.classroomQueueIsSelected = false
        this.classroomQueueIsClicked = 0
        this.finalExamIsSelected = false
        this.finalExamIsClicked = 0
        if (this.finalCourseIsClicked === 1) {
          getFinalCourseList().then(res => {
            // console.log(res)
            const list = res.data
            for (let i = 0; i < list.length; i++) {
              const courseId = list[i].courseId
              const courseName = list[i].courseName
              const courseTeacherId = list[i].courseTeacherId
              const classroomName = list[i].classroomName
              const tmpFreeTimeList = list[i].freeTime.split(',')
              let week = '周日'
              switch (tmpFreeTimeList[0]) {
                case 'Mon': week = '周一'; break
                case 'Tue': week = '周二'; break
                case 'Wed': week = '周三'; break
                case 'Thu': week = '周四'; break
                case 'Fri': week = '周五'; break
                case 'Sat': week = '周六'; break
                default: week = '周日'; break
              }
              const time = tmpFreeTimeList[1]
              this.finalCourseTable.push({
                courseId: courseId,
                courseName: courseName,
                courseTeacherId: courseTeacherId,
                classroomName: classroomName,
                freeTime: week + ' ' + time
              })
            }
          })
        }
      }
    },
    showExam () {
      this.examList = []
      this.currentPage = 1
      this.pageSize = 10
      this.queue = []
      this.queueIsSelected = false
      this.queueIsClicked = 0
      this.finalCourseTable = []
      this.finalCourseIsSelected = false
      this.finalCourseIsClicked = 0
      this.examIsSelected = true
      this.examIsClicked++
      this.classroomQueueIsSelected = false
      this.classroomQueueIsClicked = 0
      this.finalExamIsSelected = false
      this.finalExamIsClicked = 0
      if (this.examIsClicked === 1) {
        getExamApplicationList().then(res => {
          const list = res.data
          console.log(list)
          for (let i = 0; i < list.length; i++) {
            const examId = list[i].examId
            const majorId = list[i].majorId
            const courseId = list[i].courseId
            const examFormat = list[i].examFormat
            this.examList.push({
              examId: examId,
              majorId: majorId,
              courseId: courseId,
              examFormat: examFormat
            })
          }
        })
      }
    },
    showClassroomQueue () {
      this.queue = []
      this.queueIsSelected = false
      this.queueIsClicked = 0
      this.finalCourseTable = []
      this.classroomQueue = []
      this.finalCourseIsSelected = false
      this.finalCourseIsClicked = 0
      this.examIsSelected = false
      this.examIsClicked = 0
      this.classroomQueueIsSelected = true
      this.classroomQueueIsClicked++
      this.finalExamIsSelected = false
      this.finalExamIsClicked = 0
      if (this.classroomQueueIsClicked === 1) {
        getClassroomList().then(res => {
          console.log(res.data)
          const list = res.data
          for (let i = 0; i < list.length; i++) {
            const userId = list[i].userId
            const classroomId = list[i].classroomId
            const reason = list[i].reason
            const tmpFreeTimeList = list[i].needTime.split(',')
            let week = '周日'
            switch (tmpFreeTimeList[0]) {
              case 'Mon': week = '周一'; break
              case 'Tue': week = '周二'; break
              case 'Wed': week = '周三'; break
              case 'Thu': week = '周四'; break
              case 'Fri': week = '周五'; break
              case 'Sat': week = '周六'; break
              default: week = '周日'; break
            }
            const time = tmpFreeTimeList[1]
            this.classroomQueue.push({
              userId: userId,
              classroomId: classroomId,
              reason: reason,
              needTime: week + ' ' + time
            })
          }
        })
      }
    },
    showFinalExam () {
      if (this.examList.length !== 0) {
        alert('仍有考试待排')
      } else {
        this.queue = []
        this.queueIsSelected = false
        this.queueIsClicked = 0
        this.finalCourseTable = []
        this.finalExamTable = []
        this.finalCourseIsSelected = false
        this.finalCourseIsClicked = 0
        this.examIsSelected = false
        this.examIsClicked = 0
        this.examList = []
        this.classroomQueueIsSelected = false
        this.classroomQueueIsClicked = 0
        this.finalExamIsSelected = true
        this.finalExamIsClicked++
        if (this.finalExamIsClicked === 1) {
          getFinalExamList().then(res => {
            console.log(res.data)
            const list = res.data
            for (let i = 0; i < list.length; i++) {
              const courseId = list[i].courseId
              const examId = list[i].examId
              const majorId = list[i].majorId
              const examFormat = list[i].examFormat
              const classroomName = list[i].classroomName
              const tmpFreeTimeList = list[i].examTime.split(',')
              let week = '周日'
              switch (tmpFreeTimeList[0]) {
                case 'Mon': week = '周一'; break
                case 'Tue': week = '周二'; break
                case 'Wed': week = '周三'; break
                case 'Thu': week = '周四'; break
                case 'Fri': week = '周五'; break
                case 'Sat': week = '周六'; break
                default: week = '周日'; break
              }
              const time = tmpFreeTimeList[1]
              this.finalExamTable.push({
                courseId: courseId,
                examId: examId,
                majorId: majorId,
                examFormat: examFormat,
                classroomName: classroomName,
                examTime: week + ' ' + time
              })
            }
          })
        }
      }
    },
    acceptClassroomQueue (e) {
      console.log(e)
      const userId = e.userId
      const classroomId = e.classroomId
      const timeList = e.needTime.split(' ')
      let week = 'Sun'
      switch (timeList[0]) {
        case '周一': week = 'Mon'; break
        case '周二': week = 'Tue'; break
        case '周三': week = 'Wed'; break
        case '周四': week = 'Thu'; break
        case '周五': week = 'Fri'; break
        case '周六': week = 'Sat'; break
        default: week = 'Sun'; break
      }
      const time = timeList[1]
      const formData = new FormData()
      formData.append('userId', userId)
      formData.append('classroomId', classroomId)
      formData.append('needTime', week + ',' + time)
      acceptClassroom(formData).then(res => {
        console.log(res)
        if (res.status) {
          ElMessage.success('通过成功')
          this.classroomQueue.splice(this.classroomQueue.indexOf(e), 1)
        } else {
          ElMessage.error(res.message)
        }
      })
    },
    rejectClassroomQueue (e) {
      console.log(e)
      const userId = e.userId
      const classroomId = e.classroomId
      const timeList = e.needTime.split(' ')
      let week = 'Sun'
      switch (timeList[0]) {
        case '周一': week = 'Mon'; break
        case '周二': week = 'Tue'; break
        case '周三': week = 'Wed'; break
        case '周四': week = 'Thu'; break
        case '周五': week = 'Fri'; break
        case '周六': week = 'Sat'; break
        default: week = 'Sun'; break
      }
      const time = timeList[1]
      const formData = new FormData()
      formData.append('userId', userId)
      formData.append('classroomId', classroomId)
      formData.append('needTime', week + ',' + time)
      rejectClassroom(formData).then(res => {
        console.log(res)
        if (res.status) {
          ElMessage.success('拒绝成功')
          this.classroomQueue.splice(this.classroomQueue.indexOf(e), 1)
        } else {
          ElMessage.error(res.message)
        }
      })
    }
  },
  mounted () {
    this.getCourseList()
    this.f()
  }
}

</script>

<style lang="scss" scoped>
:deep(.el-table .cell) {
  white-space: pre;
}

:deep(.el-pagination) {
  justify-content: center;
  margin-top: 30px;
}
</style>
