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
              <el-menu-item index="1" @click="showCourseTable">
                <el-icon><List/></el-icon>课程表查看
              </el-menu-item>
              <el-menu-item index="2" @click="showEmptyClassroomTable">
                <el-icon><List/></el-icon>空闲教室查看
              </el-menu-item>
              <el-menu-item index="3">
                <el-icon><List/></el-icon>评教
              </el-menu-item>
              <el-menu-item index="4">
                <el-icon><List/></el-icon>成绩单查看
              </el-menu-item>
              <el-menu-item index="5">
                <el-icon><List/></el-icon>选课
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="22">
              <!----------------------------------------------------------------------------------------------------->
              <!--------------------------------------------- 课程表查看 ---------------------------------------------->
              <!----------------------------------------------------------------------------------------------------->
              <el-table
                v-if="tmpIsSelected === true"
                stripe
                border
                :cell-style="{'text-align': 'center'}"
                :data="courseTable"
              >
                <el-table-column prop="timeRange" label="" header-align="center"></el-table-column>
                <el-table-column prop="Mon" label="星期一" header-align="center"></el-table-column>
                <el-table-column prop="Tues" label="星期二" header-align="center"></el-table-column>
                <el-table-column prop="Wed" label="星期三" header-align="center"></el-table-column>
                <el-table-column prop="Thur" label="星期四" header-align="center"></el-table-column>
                <el-table-column prop="Fri" label="星期五" header-align="center"></el-table-column>
              </el-table>
              <!----------------------------------------------------------------------------------------------------->
              <!-------------------------------------------- 空闲教室查看 --------------------------------------------->
              <!----------------------------------------------------------------------------------------------------->
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
              <!---------------------------------------------------------------------------------------------------->
              <!----------------------------------------------- 评教 ------------------------------------------------>
              <!---------------------------------------------------------------------------------------------------->
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
import { logout } from '@/https/api'
import router from '@/router'
import { ElMessage } from 'element-plus'

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
          timeRange: '8:00 - 10:00',
          Mon: '',
          Tues: '123' + '\n' + '软件工程' + '\n' + '王',
          Wed: '456' + '\n' + '计组' + '\n' + '金',
          Thur: '123' + '\n' + '软件工程' + '\n' + '王',
          Fri: '456' + '\n' + '计组' + '\n' + '金'
        },
        {
          timeRange: '10:00 - 12:00',
          Mon: '',
          Tues: '234' + '\n' + '高性能' + '\n' + '贺',
          Wed: '',
          Thur: '',
          Fri: ''
        },
        {
          timeRange: '14:30 - 16:20',
          Mon: '',
          Tues: '567' + '\n' + '体育' + '\n' + '李',
          Wed: '',
          Thur: '',
          Fri: ''
        },
        {
          timeRange: '16:40 - 18:30',
          Mon: '789' + '\n' + '习思想' + '\n' + '冯',
          Tues: '',
          Wed: '789' + '\n' + '习思想' + '\n' + '冯',
          Thur: '',
          Fri: ''
        }
      ]),
      courseTable: reactive([]),
      emptyClassroomTable: reactive([]),
      tmpIsSelected: false,
      emptyClassroomTableIsSelected: false,
      tmpIsClicked: 0,
      emptyClassroomIsClicked: 0,
      userInfo: reactive({
        userName: '',
        userType: ''
      }),
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
      emptyClassroomList: reactive([
        {
          week: 'Mon',
          classroomName: '电子楼 101',
          morningFirst: 'danger',
          morningSecond: 'danger',
          afternoonFirst: 'success',
          afternoonSecond: 'success'
        },
        {
          week: 'Tue',
          classroomName: '电子楼 102',
          morningFirst: 'success',
          morningSecond: 'success',
          afternoonFirst: 'danger',
          afternoonSecond: 'danger'
        },
        {
          week: 'Wed',
          classroomName: '商学院 101',
          morningFirst: 'success',
          morningSecond: 'danger',
          afternoonFirst: 'danger',
          afternoonSecond: 'success'
        }
      ]),
      weekList: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  },
  methods: {
    showCourseTable () {
      this.emptyClassroomTable = []
      this.emptyClassroomTableIsSelected = false
      this.emptyClassroomIsClicked = 0
      this.emptyClassroomSelection = null
      this.dateSelection = null
      this.tmpIsSelected = true
      this.tmpIsClicked++
      if (this.tmpIsClicked === 1) {
        for (let i = 0; i < this.courseList.length; i++) {
          this.courseTable.push(this.courseList[i])
        }
        console.log(this.courseTable[3])
        const tmp = '789' + '\n' + '习思想' + '\n' + '冯'
        this.courseTable[3].Mon = tmp
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
      this.emptyClassroomTableIsSelected = true
      this.emptyClassroomIsClicked++
      if (this.emptyClassroomIsClicked === 1) {
        for (let i = 0; i < this.emptyClassroomList.length; i++) {
          this.emptyClassroomTable.push({
            ...this.emptyClassroomList[i],
            rowId: i + 1
          })
        }
      }
    },
    disabledDate (time) {
      // return time.getTime() < Date.now()
      const maxTime = Date.now() - 24 * 60 * 60 * 1000 * 1
      return time.getTime() <= maxTime
    },
    startToSearch () {
      if (this.emptyClassroomSelection === null || this.dateSelection === null) {
        ElMessage.error('请先选择教学楼或时间段')
      } else {
        this.emptyClassroomTable = []
        for (let i = 0, j = 0; i < this.emptyClassroomList.length; i++) {
          if (
            this.emptyClassroomList[i].week === this.weekList[this.dateSelection.getDay()] &&
            this.emptyClassroomList[i].classroomName.split(' ')[0] === this.emptyClassroomSelection
          ) {
            this.emptyClassroomTable.push({
              ...this.emptyClassroomList[i],
              rowId: j + 1
            })
            j++
          }
        }
      }
    }
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
</style>
