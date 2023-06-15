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
              <el-menu-item index="1">
                <el-icon><List/></el-icon>授课计划查看
              </el-menu-item>
              <el-menu-item index="2">
                <el-icon><List/></el-icon>评教信息查看
              </el-menu-item>
              <el-menu-item index="3">
                <el-icon><List/></el-icon>课程信息登记
              </el-menu-item>
              <el-menu-item index="4">
                <el-icon><List/></el-icon>考试信息登记
              </el-menu-item>
              <el-menu-item index="5">
                <el-icon><List/></el-icon>成绩信息登记
              </el-menu-item>
              <el-menu-item index="6">
                <el-icon><List/></el-icon>空闲教室申请
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="22">
              <el-table
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
import { logout } from '@/https/api'
import router from '@/router'

export default {
  name: 'Teacher',
  data () {
    return {
      List: markRaw(List),
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
      userInfo: reactive({
        userName: '',
        userType: ''
      })
    }
  },
  methods: {
    hh () {
      for (let i = 0; i < this.courseList.length; i++) {
        this.courseTable.push(this.courseList[i])
      }
      console.log(this.courseTable[3])
      const tmp = '789' + '\n' + '习思想' + '\n' + '冯'
      this.courseTable[3].Mon = tmp
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
