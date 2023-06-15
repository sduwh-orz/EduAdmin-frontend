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
              style="height: 1200px"
              default-active="1"
            >
              <el-menu-item index="1" @click="showCourseTable">
                <el-icon><List/></el-icon>课程表查看
              </el-menu-item>
              <el-menu-item index="2" @click="showEmptyClassroomTable">
                <el-icon><List/></el-icon>空闲教室查看
              </el-menu-item>
              <el-menu-item index="3" @click="showEvaluate">
                <el-icon><List/></el-icon>评教
              </el-menu-item>
              <el-menu-item index="4" @click="showGradeTable">
                <el-icon><List/></el-icon>成绩单查看
              </el-menu-item>
              <el-menu-item index="5" @click="showFinalCourseTable">
                <el-icon><List/></el-icon>选课
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="22">
              <!--------------------------------------------- 课程表查看 ---------------------------------------------->
              <br v-if="tmpIsSelected === true">
              <h2 v-if="tmpIsSelected === true">本学期课程表</h2>
              <br v-if="tmpIsSelected === true">
              <el-table
                v-if="tmpIsSelected === true"
                stripe
                border
                :cell-style="{'text-align': 'center'}"
                :data="courseTable"
              >
                <el-table-column prop="timeRange" label="" header-align="center"></el-table-column>
                <el-table-column prop="Mon" label="星期一" header-align="center"></el-table-column>
                <el-table-column prop="Tue" label="星期二" header-align="center"></el-table-column>
                <el-table-column prop="Wed" label="星期三" header-align="center"></el-table-column>
                <el-table-column prop="Thu" label="星期四" header-align="center"></el-table-column>
                <el-table-column prop="Fri" label="星期五" header-align="center"></el-table-column>
              </el-table>
              <!-------------------------------------------- 空闲教室查看 --------------------------------------------->
              <br v-if="emptyClassroomTableIsSelected === true">
              <div
                style="display: flex; justify-content: space-between; align-items: center"
                v-if="emptyClassroomTableIsSelected === true"
              >
                <div style="display: flex; align-items: center">
                  <div>
                    <span>请选择教学楼：</span>
                    <el-select-v2
                      v-model="emptyClassroomSelection"
                      :options="options"
                      placeholder="请选择教学楼"
                      style="width: 200px"
                      size="large"
                    ></el-select-v2>
                    <br><br>
                    <span>请选择时间段：</span>
                    <el-date-picker
                      v-model="dateSelection"
                      placeholder="请选择日期"
                      size="large"
                      :disabled-date="disabledDate"
                      style="width: 200px"
                    ></el-date-picker>
                  </div>
                  <div style="margin-left: 30px">
                    <el-button type="primary" round @click="startToSearch">开始查询</el-button>
                  </div>
                </div>
                <div>
                  <span>状态指示：</span>
                  <el-tag
                    type="danger"
                    effect="dark"
                    style="margin-left: 5px"
                  >有课</el-tag>
                  <el-tag
                    type="success"
                    effect="dark"
                    style="margin-left: 10px"
                  >空闲</el-tag>
                </div>
              </div>
              <br v-if="emptyClassroomTableIsSelected === true"><br v-if="emptyClassroomTableIsSelected === true">
              <el-table
                v-if="emptyClassroomTableIsSelected === true"
                stripe
                border
                :cell-style="{'text-align': 'center'}"
                :data="emptyClassroomTable"
              >
                <el-table-column prop="rowId" label="" width="50" v-if="false"></el-table-column>
                <el-table-column prop="week" label="" width="50" v-if="false"></el-table-column>
                <el-table-column prop="classroomName" label="" header-align="center"></el-table-column>
                <el-table-column prop="morningFirst" label="08:00 - 09:50" header-align="center">
                  <template #default="scope">
                    <el-tag
                      :type="emptyClassroomTable[scope.row.rowId - 1].morningFirst"
                      effect="dark"
                      style="width: 75px"
                    >
                      <el-icon
                        v-if="emptyClassroomTable[scope.row.rowId - 1].morningFirst === 'danger'"
                      ><CircleCloseFilled/></el-icon>
                      <el-icon
                        v-if="emptyClassroomTable[scope.row.rowId - 1].morningFirst === 'success'"
                      ><CircleCheckFilled/></el-icon>
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="morningSecond" label="10:10 - 12:00" header-align="center">
                  <template #default="scope">
                    <el-tag
                      :type="emptyClassroomTable[scope.row.rowId - 1].morningSecond"
                      effect="dark"
                      style="width: 75px"
                    >
                      <el-icon
                        v-if="emptyClassroomTable[scope.row.rowId - 1].morningSecond === 'danger'"
                      ><CircleCloseFilled/></el-icon>
                      <el-icon
                        v-if="emptyClassroomTable[scope.row.rowId - 1].morningSecond === 'success'"
                      ><CircleCheckFilled/></el-icon>
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="AfternoonFirst" label="14:30 - 16:20" header-align="center">
                  <template #default="scope">
                    <el-tag
                      :type="emptyClassroomTable[scope.row.rowId - 1].afternoonFirst"
                      effect="dark"
                      style="width: 75px"
                    >
                      <el-icon
                        v-if="emptyClassroomTable[scope.row.rowId - 1].afternoonFirst === 'danger'"
                      ><CircleCloseFilled/></el-icon>
                      <el-icon
                        v-if="emptyClassroomTable[scope.row.rowId - 1].afternoonFirst === 'success'"
                      ><CircleCheckFilled/></el-icon>
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="AfternoonSecond" label="16:40 - 18:30" header-align="center">
                  <template #default="scope">
                    <el-tag
                      :type="emptyClassroomTable[scope.row.rowId - 1].afternoonSecond"
                      effect="dark"
                      style="width: 75px"
                    >
                      <el-icon
                        v-if="emptyClassroomTable[scope.row.rowId - 1].afternoonSecond === 'danger'"
                      ><CircleCloseFilled/></el-icon>
                      <el-icon
                        v-if="emptyClassroomTable[scope.row.rowId - 1].afternoonSecond === 'success'"
                      ><CircleCheckFilled/></el-icon>
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
              <!----------------------------------------------- 评教 ------------------------------------------------>
              <br v-if="showEvaluateIsSelected === true">
              <h2 v-if="showEvaluateIsSelected === true">评教</h2>
              <br v-if="showEvaluateIsSelected === true">
              <el-table
                v-if="showEvaluateIsSelected === true"
                stripe
                border
                :cell-style="{'text-align': 'center'}"
                :data="evaluateTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
              >
                <el-table-column prop="courseId" label="课程编号" header-align="center"></el-table-column>
                <el-table-column prop="courseName" label="课程名称" header-align="center"></el-table-column>
                <el-table-column label="操作" header-align="center">
                  <template #default="scope1">
                      <el-select-v2
                        v-model="EvaluateSelection[scope1.$index]"
                        :options="optionsForEvaluate"
                        placeholder="请选择评价等级"
                        style="width: 200px"
                        size="large"
                      ></el-select-v2>
                    <el-button type="primary" size="default" @click="acceptEvaluate(scope1.row)" style="margin-left: 20px">提交</el-button>
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
                  :total="evaluateTable.length"
                  background
                  v-if="showEvaluateIsSelected === true"
                ></el-pagination>
              </el-config-provider>
              <!----------------------------------------------- 成绩查询 ------------------------------------------------>
              <br v-if="showGradeTableIsSelected === true">
              <h2 v-if="showGradeTableIsSelected === true">成绩查询</h2>
              <br v-if="showGradeTableIsSelected === true">
              <el-table
                v-if="showGradeTableIsSelected === true"
                stripe
                border
                :cell-style="{'text-align': 'center'}"
                :data="GradeTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
              >
                <el-table-column prop="courseId" label="课程编号" header-align="center"></el-table-column>
                <el-table-column prop="score" label="分数" header-align="center"></el-table-column>
              </el-table>
              <el-config-provider :locale="locale">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="GradeTable.length"
                  background
                  v-if="showGradeTableIsSelected === true"
                ></el-pagination>
              </el-config-provider>
              <!----------------------------------------------- 选课 ------------------------------------------------>
              <!----------------------------------------------- 选课 ------------------------------------------------>
              <br v-if="finalCourseIsSelected === true">
              <h2 v-if="finalCourseIsSelected === true">选课表</h2>
              <br v-if="finalCourseIsSelected === true">
              <el-table
                v-if="finalCourseIsSelected === true"
                stripe
                border
                :cell-style="{'text-align': 'center'}"
                :data="finalCourseTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
              >
                <el-table-column prop="rowId" label="" width="50" v-if="false"></el-table-column>
                <el-table-column prop="courseId" label="课程号" header-align="center"></el-table-column>
                <el-table-column prop="courseName" label="课程名" header-align="center"></el-table-column>
                <el-table-column prop="courseTeacher" label="授课教师" header-align="center"></el-table-column>
                <el-table-column prop="classroomName" label="授课地点" header-align="center"></el-table-column>
                <el-table-column prop="freeTime" label="授课时间段" header-align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" header-align="center">
                  <template #default="scope">
                    <el-button type="primary" @click="checkIfConflict(finalCourseTable[scope.row.rowId - 1])">选课</el-button>
                    <el-button type="danger" @click="checkIfSelected(finalCourseTable[scope.row.rowId - 1])">退课</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <br v-if="finalCourseIsSelected === true">
              <el-button v-if="finalCourseIsSelected === true" type="primary" @click="courseSelectionDialog = true">查看已选课程</el-button>
              <br v-if="finalCourseIsSelected === true">
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
              <el-dialog
                v-model="courseSelectionDialog"
                title="目前已选课表"
              >
                <h2>选课后将无法再进行操作，请谨慎选择！</h2>
                <br><br>
                <el-table
                  :data="courseSelection"
                  stripe
                  border
                  :cell-style="{'text-align': 'center'}"
                >
                  <el-table-column prop="courseId" label="课程号" header-align="center"></el-table-column>
                  <el-table-column prop="courseName" label="课程名" header-align="center"></el-table-column>
                  <el-table-column prop="courseTeacher" label="授课教师" header-align="center"></el-table-column>
                  <el-table-column prop="classroomName" label="授课地点" header-align="center"></el-table-column>
                  <el-table-column prop="freeTime" label="授课时间段" header-align="center"></el-table-column>
                </el-table>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="courseSelectionDialog = false">取消</el-button>
                    <el-button
                      type="primary"
                      @click="submitCourseSelection"
                    >
                      确认选课
                    </el-button>
                  </span>
                </template>
              </el-dialog>
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
import { List, CircleCheckFilled, CircleCloseFilled } from '@element-plus/icons-vue'
import {
  getByWhereAndDay, getCourseSelection,
  getEvaluateList, getFinalCourseList,
  getStudentCourseList,
  getStudentScore,
  logout, selectCourse,
  setEvaluation
} from '@/https/api'
import router from '@/router'
import { ElMessage } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default {
  name: 'Student',
  components: { CircleCheckFilled, CircleCloseFilled },
  data () {
    return {
      List: markRaw(List),
      CircleCheckFilled: markRaw(CircleCheckFilled),
      CircleCloseFilled: markRaw(CircleCloseFilled),
      courseList: reactive([
        {
          timeRange: '08:00-09:50',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: ''
        },
        {
          timeRange: '10:10-12:00',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: ''
        },
        {
          timeRange: '14:30-16:20',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: ''
        },
        {
          timeRange: '16:40-18:30',
          Mon: '',
          Tue: '',
          Wed: '',
          Thu: '',
          Fri: ''
        }
      ]),
      courseTable: reactive([]),
      GradeTable: reactive([]),
      emptyClassroomTable: reactive([]),
      tmpIsSelected: false,
      emptyClassroomTableIsSelected: false,
      tmpIsClicked: 0,
      emptyClassroomIsClicked: 0,
      showGradeTableIsSelected: false,
      showGradeTableIsClicked: 0,
      showEvaluateIsSelected: false,
      showEvaluateIsClicked: 0,
      evaluateTable: reactive([]),
      userInfo: reactive({
        userName: '',
        userType: ''
      }),
      EvaluateSelection: reactive([]),
      optionsForEvaluate: [
        {
          value: '优',
          label: '优'
        },
        {
          value: '良',
          label: '良'
        },
        {
          value: '中',
          label: '中'
        },
        {
          value: '差',
          label: '差'
        },
      ],
      emptyClassroomSelection: null,
      dateSelection: null,
      options: [
        {
          value: '图西教学楼',
          label: '图西教学楼'
        },
        {
          value: '电子楼',
          label: '电子楼'
        },
        {
          value: '文学楼',
          label: '文学楼'
        },
        {
          value: '商学院',
          label: '商学院'
        }
      ],
      weekList: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      finalCourseIsSelected: false,
      finalCourseIsClicked: 0,
      finalCourseTable: reactive([]),
      currentPage: 1,
      pageSize: 10,
      locale: zhCn,
      finalCourseIndexClickedNow: 0,
      courseSelection: reactive([]),
      checkCourseIdList: reactive([]),
      checkTimeList: reactive([]),
      courseSelectionDialog: false
    }
  },
  methods: {
    showCourseTable () {
      this.finalCourseTable = []
      this.finalCourseIsSelected = false
      this.finalCourseIsClicked = 0
      this.emptyClassroomTable = []
      this.emptyClassroomTableIsSelected = false
      this.emptyClassroomIsClicked = 0
      this.emptyClassroomSelection = null
      this.dateSelection = null
      this.tmpIsSelected = true
      this.tmpIsClicked++
      this.GradeTable = []
      this.showGradeTableIsSelected = false
      this.showGradeTableIsClicked = 0
      this.showEvaluateIsSelected = false
      this.showEvaluateIsClicked = 0
      this.finalCourseTable = []
      this.finalCourseIsSelected = false
      this.finalCourseIsClicked = 0
      if (this.tmpIsClicked === 1) {
        getStudentCourseList().then(res => {
          console.log(res)
          const list = res.data
          for (let i = 0; i < list.length; i++) {
            const teacherName = list[i].courseTeacher
            const courseName = list[i].courseName
            const courseId = list[i].courseId
            const classroomName = list[i].classroomName
            const timeList = list[i].freeTime.split(',')
            const Day = timeList[0]
            const timeRange = timeList[1]
            for (let j = 0; j < this.courseList.length; j++) {
              if (this.courseList[j].timeRange === timeRange) {
                this.courseList[j][Day] = courseId + '\n' + courseName + '\n' + teacherName + '\n' + classroomName
              }
            }
          }
          for (let i = 0; i < this.courseList.length; i++) {
            this.courseTable.push(this.courseList[i])
          }
        })
      }
    },
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
        ElMessage({
          message: res.message,
          type: res.status === true ? 'success' : 'error'
        })
        localStorage.clear()
        sessionStorage.clear()
        router.replace('/')
      })
    },
    showEmptyClassroomTable () {
      this.tmpIsSelected = false
      this.tmpIsClicked = 0
      this.courseTable = []
      this.finalCourseIsSelected = false
      this.finalCourseIsClicked = 0
      this.finalCourseTable = []
      this.emptyClassroomTableIsSelected = true
      this.emptyClassroomIsClicked++
      this.GradeTable = []
      this.showGradeTableIsSelected = false
      this.showGradeTableIsClicked = 0
      this.showEvaluateIsSelected = false
      this.showEvaluateIsClicked = 0
      this.finalCourseTable = []
      this.finalCourseIsSelected = false
      this.finalCourseIsClicked = 0
    },
    disabledDate (time) {
      // return time.getTime() < Date.now()
      const maxTime = Date.now() - 24 * 60 * 60 * 1000
      return time.getTime() <= maxTime
    },
    startToSearch () {
      if (this.emptyClassroomSelection === null || this.dateSelection === null) {
        ElMessage.error('请先选择教学楼或时间段')
      } else {
        this.emptyClassroomTable = []
        const formData = new FormData()
        formData.append('classroomName', this.emptyClassroomSelection)
        formData.append('day', this.weekList[this.dateSelection.getDay()])
        getByWhereAndDay(formData).then(res => {
          const list = res.data
          const tmpList = []
          for (let i = 0; i < list.length; i += 4) {
            tmpList.push({
              week: this.weekList[this.dateSelection.getDay()],
              classroomName: list[i].classroomName,
              morningFirst: list[i].freeNow === 1 ? 'success' : 'danger',
              morningSecond: list[i + 1].freeNow === 1 ? 'success' : 'danger',
              afternoonFirst: list[i + 2].freeNow === 1 ? 'success' : 'danger',
              afternoonSecond: list[i + 3].freeNow === 1 ? 'success' : 'danger'
            })
          }
          for (let i = 0; i < tmpList.length; i++) {
            this.emptyClassroomTable.push({
              ...tmpList[i],
              rowId: i + 1
            })
          }
        })
      }
    },
    showGradeTable () {
      this.GradeTable = []
      this.courseTable = []
      this.emptyClassroomTable = []
      this.tmpIsSelected = false
      this.emptyClassroomTableIsSelected = false
      this.tmpIsClicked = 0
      this.emptyClassroomIsClicked = 0
      this.showGradeTableIsSelected = true
      this.showGradeTableIsClicked++
      this.showEvaluateIsSelected = false
      this.showEvaluateIsClicked = 0
      this.finalCourseTable = []
      this.finalCourseIsSelected = false
      this.finalCourseIsClicked = 0
      if (this.showGradeTableIsClicked === 1) {
        getStudentScore().then(res => {
          console.log(res)
          const list = res.data
          for (let i = 0; i < list.length; i++) {
            this.GradeTable.push({
              courseId: list[i].courseId,
              score: list[i].score
            })
          }
        })
      }
    },
    showFinalCourseTable () {
      getCourseSelection().then(res => {
        if (res.data !== null) {
          ElMessage.error('你已选过课，不能再进行操作')
        } else {
          this.courseTable = []
          this.tmpIsSelected = false
          this.tmpIsClicked = 0
          this.courseTable = []
          this.emptyClassroomTable = []
          this.emptyClassroomTableIsSelected = false
          this.emptyClassroomSelection = null
          this.dateSelection = null
          this.emptyClassroomIsClicked = 0
          this.finalCourseIsSelected = true
          this.finalCourseIsClicked++
          this.showEvaluateIsSelected = false
          this.showEvaluateIsClicked = 0
          this.showGradeTableIsClicked = 0
          this.showGradeTableIsSelected = false
          if (this.finalCourseIsClicked === 1) {
            getFinalCourseList().then(res => {
              // console.log(res)
              const list = res.data
              for (let i = 0; i < list.length; i++) {
                const courseId = list[i].courseId
                const courseName = list[i].courseName
                const courseTeacher = list[i].courseTeacher
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
                  rowId: i + 1,
                  courseId: courseId,
                  courseName: courseName,
                  courseTeacher: courseTeacher,
                  classroomName: classroomName,
                  freeTime: week + ' ' + time
                })
              }
            })
          }
        }
      })
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    checkIfConflict (data) {
      let courseIdFlag = 0
      for (let i = 0; i < this.checkCourseIdList.length; i++) {
        if (data.courseId === this.checkCourseIdList[i]) {
          ElMessage.error('已经选择该课程')
          courseIdFlag = 1
          break
        }
      }
      if (courseIdFlag === 0) {
        let timeFlag = 0
        for (let i = 0; i < this.checkTimeList.length; i++) {
          if (data.freeTime === this.checkTimeList[i]) {
            ElMessage.error('该课程与已选课程上课时间冲突')
            timeFlag = 1
            break
          }
        }
        if (courseIdFlag === 0 && timeFlag === 0) {
          this.checkCourseIdList.push(data.courseId)
          this.checkTimeList.push(data.freeTime)
          this.courseSelection.push(data)
          ElMessage.success('选择成功')
        }
      }
    },
    showEvaluate () {
      this.queue = []
      this.courseTable = []
      this.emptyClassroomTable = []
      this.GradeTable = []
      this.evaluateTable = []
      this.tmpIsSelected = false
      this.emptyClassroomTableIsSelected = false
      this.tmpIsClicked = 0
      this.emptyClassroomIsClicked = 0
      this.showGradeTableIsSelected = false
      this.showGradeTableIsClicked = 0
      this.showEvaluateIsSelected = true
      this.showEvaluateIsClicked++
      this.finalCourseIsClicked = 0
      this.finalCourseIsSelected = false
      if (this.showEvaluateIsClicked === 1) {
        getEvaluateList().then(res => {
          console.log(res.data)
          const list = res.data
          for (let i = 0; i < list.length; i++) {
            const courseId = list[i].courseId
            const courseName = list[i].courseName
            this.evaluateTable.push({
              courseId: courseId,
              courseName: courseName,
              Index: i
            })
          }
        })
      }
    },
    checkIfSelected (data) {
      for (let i = 0; i < this.checkCourseIdList.length; i++) {
        if (data.courseId === this.checkCourseIdList[i]) {
          this.checkCourseIdList = this.checkCourseIdList.filter(item => item !== data.courseId)
          this.checkTimeList = this.checkTimeList.filter(item => item !== data.freeTime)
          this.courseSelection = this.courseSelection.filter(item => item !== data)
          ElMessage.success('退选成功')
          return
        }
      }
      ElMessage.error('未选择该课程')
    },
    submitCourseSelection () {
      const formData = new FormData()
      formData.append('courseIdList', this.checkCourseIdList)
      selectCourse(formData).then(res => {
        ElMessage.success('提交成功')
        this.courseSelectionDialog = false
        setTimeout(function () {
          location.reload()
        }, 500)
      })
    },
    acceptEvaluate (e) {
      console.log(e)
      console.log(this.EvaluateSelection[e.Index])
      const formData = new FormData()
      formData.append('courseId', e.courseId)
      formData.append('score', this.EvaluateSelection[e.Index])
      setEvaluation(formData).then(res => {
        if (res.status) {
          ElMessage({
            message: '评价成功',
            type: 'success'
          })
          this.evaluateTable.splice(e.Index, 1)
          this.EvaluateSelection[e.Index] = null
        } else {
          ElMessage({
            message: '评价失败',
            type: 'error'
          })
        }
      })
    },
  },
  mounted () {
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
