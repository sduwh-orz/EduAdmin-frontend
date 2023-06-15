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
                <el-icon><List/></el-icon>授课计划查看
              </el-menu-item>
              <!--              <el-menu-item index="2">-->
              <!--                <el-icon><List/></el-icon>评教信息查看-->
              <!--              </el-menu-item>-->
              <el-menu-item index="2" @click="courseDialog = true">
                <el-icon><List/></el-icon>课程信息登记
              </el-menu-item>
              <el-menu-item index="3" @click="examDialog = true">
                <el-icon><List/></el-icon>考试信息登记
              </el-menu-item>
              <el-menu-item index="4" @click="scoreDialog = true">
                <el-icon><List/></el-icon>成绩信息登记
              </el-menu-item>
              <el-menu-item index="5" @click="classroomADialog = true">
                <el-icon><List/></el-icon>空闲教室申请
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="22">
              <!---------------------------------- 授课计划查看 ------------------------------------>
              <br v-if="tmpIsSelected === true">
              <h2 v-if="tmpIsSelected === true">本学期授课计划</h2>
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
              <!---------------------------------- 课程信息登记 ------------------------------------>
              <el-dialog
                v-model="courseDialog"
                title="课程信息登记"
                width="500px"
              >
                <el-form
                  :model="courseForm"
                  :rules="courseRules"
                  style="margin-top: 20px; text-align: center"
                >
                  <el-form-item prop="courseName" style="display: inline-block">
                    <el-input
                      v-model="courseForm.courseName"
                      placeholder="请输入待登记的课程名"
                      style="width: 400px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="courseNum" style="display: inline-block">
                    <el-input
                      v-model="courseForm.courseNum"
                      placeholder="请输入待登记的课程数量"
                      style="width: 400px"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="courseDialog = false">取消</el-button>
                    <el-button
                      type="primary"
                      @click="courseApplication"
                      :disabled="courseForm.courseName === '' || courseForm.courseNum === ''"
                    >
                      确认
                    </el-button>
                  </span>
                </template>
              </el-dialog>
              <!---------------------------------- 考试信息登记 ------------------------------------>
              <el-dialog
                v-model="examDialog"
                title="考试信息登记"
                width="500px"
              >
                <el-form
                  :model="examForm"
                  :rules="examRules"
                  style="margin-top: 20px; text-align: center"
                >
                  <el-form-item prop="majorId" style="display: inline-block">
                    <el-input
                      v-model="examForm.majorId"
                      placeholder="请输入待登记的考试的专业号"
                      style="width: 400px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="courseId" style="display: inline-block">
                    <el-input
                      v-model="examForm.courseId"
                      placeholder="请输入待登记的考试的课程号"
                      style="width: 400px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="examFormat" style="display: inline-block">
                    <el-input
                      v-model="examForm.examFormat"
                      placeholder="请输入待登记的考试的考试形式(开卷/闭卷)"
                      style="width: 400px"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="examDialog = false">取消</el-button>
                    <el-button
                      type="primary"
                      @click="examApplication"
                      :disabled="examForm.majorId === '' || examForm.courseId === '' || examForm.examFormat === ''"
                    >
                      确认
                    </el-button>
                  </span>
                </template>
              </el-dialog>
              <!---------------------------------- 成绩信息登记 ------------------------------------>
              <el-dialog
                v-model="scoreDialog"
                title="成绩信息登记"
                width="500px"
              >
                <el-form
                  :model="scoreForm"
                  :rules="scoreRules"
                  style="margin-top: 20px; text-align: center"
                >
                  <el-form-item prop="userId" style="display: inline-block">
                    <el-input
                      v-model="scoreForm.userId"
                      placeholder="请输入学生的学号"
                      style="width: 400px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="courseId" style="display: inline-block">
                    <el-input
                      v-model="scoreForm.courseId"
                      placeholder="请输入待登记的学生成绩的课程号"
                      style="width: 400px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="score" style="display: inline-block">
                    <el-input
                      v-model="scoreForm.score"
                      placeholder="请输入该学生对应课程的成绩"
                      style="width: 400px"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="scoreDialog = false">取消</el-button>
                    <el-button
                      type="primary"
                      @click="scoreApplication"
                      :disabled="scoreForm.userId === '' || scoreForm.courseId === '' || scoreForm.score === ''"
                    >
                      确认
                    </el-button>
                  </span>
                </template>
              </el-dialog>
              <!---------------------------------- 空闲教室申请 ------------------------------------>
              <el-dialog
                v-model="classroomADialog"
                title="空闲教室申请"
                width="500px"
              >
                <el-form
                  :model="classroomAForm"
                  :rules="classroomARules"
                  style="margin-top: 20px; text-align: center"
                >
                  <el-form-item prop="classroomId" style="display: inline-block">
                    <el-input
                      v-model="classroomAForm.classroomId"
                      placeholder="请输入准备预约的教室号"
                      style="width: 400px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="reason" style="display: inline-block">
                    <el-input
                      v-model="classroomAForm.reason"
                      placeholder="请输入预约理由"
                      style="width: 400px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="needTime" style="display: inline-block">
                    <el-input
                      v-model="classroomAForm.needTime"
                      placeholder="请用英文输入法输入预约时间(格式例:Wed,10:10-12:00)"
                      style="width: 400px"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="classroomADialog = false">取消</el-button>
                    <el-button
                      type="primary"
                      @click="classroomAApplication"
                      :disabled="classroomAForm.classroomId === '' || classroomAForm.reason === '' || classroomAForm.needTime === ''"
                    >
                      确认
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
import { List } from '@element-plus/icons-vue'
import {
  classroomAApplication,
  courseApplication,
  examApplication,
  // getFinalCourseList,
  getTeacherCourseList,
  logout,
  scoreApplication
} from '@/https/api'
import router from '@/router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { ElMessage } from 'element-plus'
export default {
  name: 'Teacher',
  data () {
    return {
      List: markRaw(List),
      courseList: reactive([
        {
          timeRange: '8:00-10:00',
          Mon: '',
          Tue: '', // '123' + '\n' + '软件工程' + '\n' + '王',
          Wed: '', // '456' + '\n' + '计组' + '\n' + '金',
          Thu: '', // '123' + '\n' + '软件工程' + '\n' + '王',
          Fri: ''// '456' + '\n' + '计组' + '\n' + '金'
        },
        {
          timeRange: '10:00-12:00',
          Mon: '',
          Tue: '', // '234' + '\n' + '高性能' + '\n' + '贺',
          Wed: '',
          Thu: '',
          Fri: ''
        },
        {
          timeRange: '14:30-16:20',
          Mon: '',
          Tue: '', // '567' + '\n' + '体育' + '\n' + '李',
          Wed: '',
          Thu: '',
          Fri: ''
        },
        {
          timeRange: '16:40-18:30',
          Mon: '', // '789' + '\n' + '习思想' + '\n' + '冯',
          Tue: '',
          Wed: '', // '789' + '\n' + '习思想' + '\n' + '冯',
          Thu: '',
          Fri: ''
        }
      ]),
      courseTable: reactive([]),
      emptyClassroomTable: reactive([]),
      GradeTable: reactive([]),
      userInfo: reactive({
        userName: '',
        userType: ''
      }),
      courseDialog: false,
      courseNameInput: '',
      courseNumInput: '',
      courseForm: {
        courseName: '',
        courseNum: ''
      },
      courseRules: {
        courseName: [
          {
            required: true,
            message: '课程名不能为空',
            trigger: 'blur'
          }
        ],
        courseNum: [
          {
            required: true,
            message: '课程数量不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^\d{1,}$/,
            message: '请输入正确的课程数量',
            trigger: 'blur'
          }
        ]
      },
      examDialog: false,
      majorIdInput: '',
      courseIdInput: '',
      examFormatInput: '',
      examForm: {
        majorId: '',
        courseId: '',
        examFormat: ''
      },
      examRules: {
        majorId: [
          {
            required: true,
            message: '专业号不能为空',
            trigger: 'blur'
          }
        ],
        courseId: [
          {
            required: true,
            message: '课程号不能为空',
            trigger: 'blur'
          }
        ],
        examFormat: [
          {
            required: true,
            message: '考试形式不能为空',
            trigger: 'blur'
          }
        ]
      },
      scoreDialog: false,
      useIdInput4: '',
      courseIdInput4: '',
      scoreInput4: '',
      scoreForm: {
        userId: '',
        courseId: '',
        score: ''
      },
      scoreRules: {
        userId: [
          {
            required: true,
            message: '学生学号不能为空',
            trigger: 'blur'
          }
        ],
        courseId: [
          {
            required: true,
            message: '课程号不能为空',
            trigger: 'blur'
          }
        ],
        score: [
          {
            required: true,
            message: '分数不能为空',
            trigger: 'blur'
          }
        ]
      },
      classroomADialog: false,
      classroomIdInput: '',
      reasonInput: '',
      needTime: '',
      classroomAForm: {
        classroomId: '',
        reason: '',
        needTime: ''
      },
      classroomARules: {
        classroomId: [
          {
            required: true,
            message: '教室号不能为空',
            trigger: 'blur'
          }
        ],
        reason: [
          {
            required: true,
            message: '原因不能为空',
            trigger: 'blur'
          }
        ],
        needTime: [
          {
            required: true,
            message: '预约时间不能为空',
            trigger: 'blur'
          }
        ]
      },
      tmpIsSelected: false,
      emptyClassroomTableIsSelected: false,
      tmpIsClicked: 0,
      emptyClassroomIsClicked: 0,
      showGradeTableIsSelected: false,
      showGradeTableIsClicked: 0,
      finalCourseTable: reactive([]),
      finalCourseIsSelected: false,
      courseApplicationIsSelected: false,
      currentPage: 1,
      pageSize: 10,
      locale: zhCn,
    }
  },
  methods: {
    hh () {
      for (let i = 0; i < this.courseList.length; i++) {
        this.courseTable.push(this.courseList[i])
      }
      console.log(this.courseTable[3])
      // const tmp = '789' + '\n' + '习思想' + '\n' + '冯'
      // this.courseTable[3].Mon = tmp
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
        localStorage.clear()
        sessionStorage.clear()
        router.replace('/')
      })
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    showCourseTable () {
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
      if (this.tmpIsClicked === 1) {
        getTeacherCourseList().then(res => {
          console.log(res)
          const list = res.data
          for (let i = 0; i < list.length; i++) {
            //   // const teacherName = list[i].courseTeacher
            const courseName = list[i].courseName
            const courseId = list[i].courseId
            const classroomName = list[i].classroomName
            const timeList = list[i].freeTime.split(',')
            const Day = timeList[0]
            const timeRange = timeList[1]
            for (let j = 0; j < this.courseList.length; j++) {
              if (this.courseList[j].timeRange === timeRange) {
                this.courseList[j][Day] = courseId + '\n' + courseName + '\n' + classroomName
              }
            }
          }
          // // for (let i = 0; i < this.courseList.length; i++) {
          // //   this.courseTable.push(this.courseList[i])
          // }
        })
        // for (let i = 0; i < this.courseList.length; i++) {
        //   this.courseTable.push(this.courseList[i])
        // }
        // console.log(this.courseTable[3])
        // const tmp = '789' + '\n' + '习思想' + '\n' + '冯'
        // this.courseTable[3].Mon = tmp
      }
    },
    courseApplication () {
      const formData = new FormData()
      formData.append('courseName', this.courseForm.courseName)
      formData.append('courseNum', this.courseForm.courseNum)
      courseApplication(formData).then(res => {
        console.log(res)
        ElMessage.success('登记成功')
        this.courseDialog = false
      })
    },
    examApplication () {
      const formData = new FormData()
      formData.append('majorId', this.examForm.majorId)
      formData.append('courseId', this.examForm.courseId)
      formData.append('examFormat', this.examForm.examFormat)
      examApplication(formData).then(res => {
        console.log(res)
        ElMessage.success('登记成功')
        this.examDialog = false
      })
    },
    scoreApplication () {
      const formData = new FormData()
      formData.append('userId', this.scoreForm.userId)
      formData.append('courseId', this.scoreForm.courseId)
      formData.append('score', this.scoreForm.score)
      scoreApplication(formData).then(res => {
        console.log(res)
        ElMessage.success('登记成功')
        this.scoreDialog = false
      })
    },
    classroomAApplication () {
      const formData = new FormData()
      formData.append('classroomId', this.classroomAForm.classroomId)
      formData.append('reason', this.classroomAForm.reason)
      formData.append('needTime', this.classroomAForm.needTime)
      classroomAApplication(formData).then(res => {
        console.log(res)
        ElMessage.success('登记成功')
        this.classroomADialog = false
      })
    }
  },
  mounted () {
    this.hh()
    this.f()
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-table .cell) {
  white-space: pre;
}
</style>
