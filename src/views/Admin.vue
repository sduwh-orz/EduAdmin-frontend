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
              <el-menu-item index="3">
                <el-icon><List/></el-icon>考试安排
              </el-menu-item>
              <el-menu-item index="4">
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
import { arrange, getFinalCourseList, getOneCourseList, logout } from '@/https/api'
import router from '@/router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

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
      arrange().then(res => {
        console.log(res)
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
