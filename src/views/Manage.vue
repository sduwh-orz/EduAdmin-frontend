<template>
  <div class="common-layout" style="height: 100%; min-width: 1500px">
    <el-container>
      <el-header height="100px" style="text-align: left; background-color: var(--el-color-primary-light-7);">
        <el-row type="flex" align="middle">
          <el-col :span="8">
            <el-button
              type="primary"
              link
              @click="jumpToHome"
              style="font-family: Courgette; font-size: 40px; margin-left: 30px; margin-top: 30px"
            >
              PictureNet
            </el-button>
          </el-col>
          <el-col :span="8">
            <el-input
              class="search"
              v-model="searchInput"
              size="large"
              placeholder="孤独摇滚！"
              :prefix-icon="Search"
              @keyup.enter="startToSearch"
            />
          </el-col>
          <el-col :span="8">
            <el-button
              type="success"
              size="large"
              class="create-button"
              round
              style="margin-top: 30px; margin-left: 160px; width: 130px"
              @click="startToCreate"
            >
              <el-icon><UploadFilled/></el-icon>&nbsp;&ensp;开始创作
            </el-button>
            <el-tooltip content="消息" placement="bottom">
              <el-badge is-dot class="item" style="margin-top: 30px">
                <el-button
                  color="#fbb950"
                  :icon="Message"
                  type="warning"
                  size="large"
                  style="margin-left: 20px"
                ></el-button>
              </el-badge>
            </el-tooltip>
            <el-dropdown style="margin-left: 30px; margin-top: 23px">
              <span class="el-dropdown-link">
                <el-avatar :size="50" :src="require('/public/image/' + `${this.userMicroInfo.pathImage}`)" style="vertical-align: middle; margin-right: 3px"></el-avatar>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu style="width: 200px">
                  <el-dropdown-item @click="myUserPageCanBeClicked && jumpToUserPageByUserId(userMicroInfo.userId)">
                    <div>
                      <el-avatar :size="40" :src="require('/public/image/' + `${this.userMicroInfo.pathImage}`)" style="vertical-align: middle; margin-right: 5px"></el-avatar>
                      {{ storageId === null ? '尚未登录' : userMicroInfo.userName }}
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item
                    divided
                    v-if="this.userMicroInfo.userType === 'admin'"
                    @click="jumpToManage"
                  >
                    <el-icon :size="20" class="el-icon--left"><EditPen/></el-icon>
                    用户与标签管理
                  </el-dropdown-item>
                  <el-dropdown-item divided v-if="this.userMicroInfo.userType === 'checker'" @click="jumpToCheck">
                    <el-icon :size="20" class="el-icon--left"><Ticket/></el-icon>
                    作品审核
                  </el-dropdown-item>
<!--                  <el-dropdown-item divided>-->
<!--                    <el-icon :size="20" class="el-icon&#45;&#45;left"><UserFilled/></el-icon>-->
<!--                    我关注的用户-->
<!--                  </el-dropdown-item>-->
<!--                  <el-dropdown-item>-->
<!--                    <el-icon :size="20" class="el-icon&#45;&#45;left"><StarFilled/></el-icon>-->
<!--                    我点赞过的作品-->
<!--                  </el-dropdown-item>-->
                  <el-dropdown-item divided v-if="userMicroInfo.userName !== ''" @click="jumpToModify">
                    <el-icon :size="20" class="el-icon--left"><Setting/></el-icon>
                    修改个人信息
                  </el-dropdown-item>
                  <el-dropdown-item divided>
                    <el-button type="primary" round @click="loginOrLogout" style="width: 100%">
                      {{ userMicroInfo.userName === '' ? '请先登录' : '退出登录' }}
                    </el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" style="height: 100%">
          <el-scrollbar style="height: 100%">
            <el-menu
              :default-openeds="['1', '2']"
              background-color="#545c64"
              active-text-color="#ffd04b"
              text-color="#fff"
              style="height: 1200px"
              default-active="1-1"
            >
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><User/></el-icon>用户状态管理
                </template>
                <el-menu-item index="1-1" @click="showNormalTable">
                  <el-icon><CircleCheck/></el-icon>用户解封
                </el-menu-item>
                <el-menu-item index="1-2" @click="showBanUserDialog">
                  <el-icon><CircleClose/></el-icon>用户封禁
                </el-menu-item>
                <el-menu-item index="1-3" @click="showDeleteUserDialog">
                  <el-icon><Delete/></el-icon>用户注销
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item index="2" @click="showTagTable">
                <el-icon><PriceTag/></el-icon>标签管理
              </el-menu-item>
              <el-menu-item index="3" @click="showGrantTable">
                <el-icon><Key/></el-icon>用户角色管理
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="2"></el-col>
            <el-col :span="20">
              <!-- TagController -->
              <el-table
                v-if="tagTableIsSelected === true"
                :data="tagTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                stripe
                :cell-style="{'text-align': 'center'}"
              >
                <el-table-column prop="tagId" label="标签编号" header-align="center"></el-table-column>
                <el-table-column prop="tagName" label="标签名" header-align="center"></el-table-column>
                <el-table-column prop="tagStatus" label="标签状态" header-align="center">
                  <template #default="scope">
                    <el-tag :type="tagTable[scope.row.tagId - 1].type">{{ tagTable[scope.row.tagId - 1].tagStatus }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="相关操作" header-align="center">
                  <template #default="scope">
                    <el-button
                      v-if="tagTable[scope.row.tagId - 1].tagStatus === '正常'"
                      type="danger"
                      @click="showDeleteTagDialog(tagTable[scope.row.tagId - 1].tagName)"
                    >
                      删除
                    </el-button>
                    <el-button
                      v-if="tagTable[scope.row.tagId - 1].tagStatus === '正常'"
                      type="warning"
                      @click="showModifyTagDialog(tagTable[scope.row.tagId - 1].tagName)"
                    >
                      修改
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                v-if="tagTableIsSelected === true"
                type="primary"
                style="width: 100%; margin-top: 20px"
                @click="createTagDialog = true"
              >创建标签</el-button>
              <el-config-provider :locale="locale">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[1, 5, 10, 20]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="tagTable.length"
                  background
                  v-if="tagTableIsSelected === true"
                ></el-pagination>
              </el-config-provider>
              <el-dialog
                v-model="createTagDialog"
                title="创建标签"
                width="400px"
              >
                <el-input
                  v-model="tagNameInput"
                  placeholder="请输入标签名"
                  :prefix-icon="PriceTag"
                  style="width: 280px"
                ></el-input>
                <el-button
                  type="primary"
                  style="margin-left: 20px"
                  @click="createTag"
                  :disabled="tagNameInput === ''"
                >
                  确认
                </el-button>
              </el-dialog>
              <el-dialog
                v-model="deleteTagDialog"
                title="提醒"
              >
                <span>确定删除此标签？</span>
                <template #footer>
                <span class="dialog-footer">
                  <el-button @click="deleteTagDialog = false">取消</el-button>
                  <el-button type="primary" @click="deleteTag">
                    确认
                  </el-button>
                </span>
                </template>
              </el-dialog>
              <el-dialog
                v-model="modifyTagDialog"
                title="修改标签"
                width="400px"
              >
                <el-input
                  v-model="modifyTagNameInput"
                  placeholder="请输入修改后的标签名"
                  :prefix-icon="PriceTag"
                  style="width: 280px"
                ></el-input>
                <el-button
                  type="primary"
                  style="margin-left: 20px"
                  @click="modifyTag"
                  :disabled="modifyTagNameInput === ''"
                >
                  确认
                </el-button>
              </el-dialog>
              <!-- UserController: grant -->
              <h2 v-if="grantTableIsSelected === true">管理员与审核员表</h2>
              <br v-if="grantTableIsSelected === true"><br v-if="grantTableIsSelected === true">
              <el-table
                v-if="grantTableIsSelected === true"
                :data="grantTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                stripe
                :cell-style="{'text-align': 'center'}"
              >
                <el-table-column prop="userId" label="用户编号" header-align="center"></el-table-column>
                <el-table-column prop="userName" label="用户名" header-align="center"></el-table-column>
                <el-table-column prop="tagStatus" label="标签状态" header-align="center">
                  <template #default="scope">
                    <el-tag
                      :type="grantTable[adminAndCheckerListIndexAndGrantTableIndex.get(scope.row.userId)].type"
                    >
                      {{ grantTable[adminAndCheckerListIndexAndGrantTableIndex.get(scope.row.userId)].userType }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="角色更改为" header-align="center">
                  <template #default="scope">
                    <el-button
                      v-if="grantTable[adminAndCheckerListIndexAndGrantTableIndex.get(scope.row.userId)].userType !== '管理员'"
                      type="success"
                      plain
                      @click="grant(scope.row.userId, 'admin')"
                    >
                      管理员
                    </el-button>
                    <el-button
                      v-if="grantTable[adminAndCheckerListIndexAndGrantTableIndex.get(scope.row.userId)].userType !== '审核员'"
                      type="primary"
                      plain
                      @click="grant(scope.row.userId, 'checker')"
                    >
                      审核员
                    </el-button>
                    <el-button
                      type="danger"
                      plain
                      @click="grant(scope.row.userId, 'common')"
                    >
                      普通用户
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                v-if="grantTableIsSelected === true"
                type="primary"
                style="width: 100%; margin-top: 20px"
                @click="grantDialog = true"
              >
                授权普通用户为管理员或审核员
              </el-button>
              <el-config-provider :locale="locale">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[1, 5, 10, 20]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="grantTable.length"
                  background
                  v-if="grantTableIsSelected === true"
                ></el-pagination>
              </el-config-provider>
              <el-dialog
                v-model="grantDialog"
                title="普通用户授权"
                width="300px"
              >
                <el-form :model="form" :rules="rules">
                  <el-form-item prop="userId">
                    <el-input
                      v-model="form.userId"
                      placeholder="请输入用户编号"
                      :prefix-icon="User"
                      style="width: 280px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="userType">
                    授权为：&nbsp;&nbsp;
                    <el-radio-group v-model="radioData">
                      <el-radio label="admin">管理员</el-radio>
                      <el-radio label="checker">审核员</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
                <template #footer>
                <span class="dialog-footer">
                  <el-button @click="grantDialog = false">取消</el-button>
                  <el-button
                    type="primary"
                    @click="grant(form.userId, radioData)"
                    :disabled="form.userId === ''"
                  >
                    确认
                  </el-button>
                </span>
                </template>
              </el-dialog>
              <!-- UserController: delete -->
              <el-dialog
                v-model="deleteUserDialog"
                title="用户注销"
                width="800px"
              >
                <h2>经注销账户的信息将<span style="color: red">全部丢失</span>，请在与申请注销用户充分沟通后进行操作！</h2>
                <el-form
                  :model="deleteUserForm"
                  :rules="deleteUserRules"
                  style="margin-top: 20px; text-align: center"
                >
                  <el-form-item prop="deleteUserId" style="display: inline-block">
                    <el-input
                      v-model="deleteUserForm.deleteUserId"
                      placeholder="请输入待注销的用户编号"
                      :prefix-icon="User"
                      style="width: 400px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="deleteUserIdConfirm" style="display: inline-block">
                    <el-input
                      v-model="deleteUserForm.deleteUserIdConfirm"
                      placeholder="请再次输入待注销的用户编号"
                      :prefix-icon="User"
                      style="width: 400px"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <template #footer>
                <span class="dialog-footer">
                  <el-button @click="deleteUserForm = false">取消</el-button>
                  <el-button
                    type="primary"
                    @click="changeStatus(deleteUserForm.deleteUserId, 'deleted', null)"
                    :disabled="deleteUserForm.deleteUserId !== deleteUserForm.deleteUserIdConfirm ||
                    deleteUserForm.deleteUserId === '' || deleteUserForm.deleteUserIdConfirm === ''"
                  >
                    确认
                  </el-button>
                </span>
                </template>
              </el-dialog>
              <!-- UserController: ban -->
              <el-dialog
                v-model="banUserDialog"
                title="用户封禁"
                width="800px"
              >
                <h2>封禁将对被执行用户产生重大影响，请在与其他管理员充分讨论后进行操作！</h2>
                <el-form
                  :model="banUserForm"
                  :rules="banUserRules"
                  style="margin-top: 20px; text-align: center"
                >
                  <el-form-item prop="bannedUserId" style="display: inline-block">
                    <el-input
                      v-model="banUserForm.bannedUserId"
                      placeholder="请输入待封禁的用户编号"
                      :prefix-icon="User"
                      style="width: 500px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="bannedReason" style="display: inline-block">
                    <el-input
                      v-model="banUserForm.bannedReason"
                      type="textarea"
                      maxlength="50"
                      show-word-limit
                      placeholder="请输入封禁理由"
                      clearable
                      style="width: 500px"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <template #footer>
                <span class="dialog-footer">
                  <el-button @click="banUserDialog = false">取消</el-button>
                  <el-button
                    type="primary"
                    @click="changeStatus(banUserForm.bannedUserId, 'banned', banUserForm.bannedReason)"
                    :disabled="banUserForm.bannedUserId === '' || banUserForm.bannedReason === ''"
                  >
                    确认
                  </el-button>
                </span>
                </template>
              </el-dialog>
              <!-- UserController: normal -->
              <h2 v-if="normalTableIsSelected === true">封禁用户表</h2>
              <br v-if="normalTableIsSelected === true"><br v-if="normalTableIsSelected === true">
              <el-input
                v-model.number="bannedUserSearch"
                v-if="normalTableIsSelected === true"
                :prefix-icon="Filter"
                placeholder="请输入想要查询的封禁用户编号"
                clearable
                style="width: 400px"
                @input="searchAndShow"
              ></el-input>
              <br v-if="normalTableIsSelected === true"><br v-if="normalTableIsSelected === true">
              <el-table
                v-if="normalTableIsSelected === true"
                :data="normalTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                stripe
                :cell-style="{'text-align': 'center'}"
              >
                <el-table-column prop="rowId" label="行编号" width="50" v-if="false"></el-table-column>
                <el-table-column prop="userId" label="用户编号" width="120" header-align="center"></el-table-column>
                <el-table-column prop="userName" label="用户名" header-align="center"></el-table-column>
                <el-table-column prop="bannedTime" label="封禁时间" header-align="center"></el-table-column>
                <el-table-column prop="bannedReason" label="封禁理由" header-align="center"></el-table-column>
                <el-table-column prop="isBanned" label="封禁是否解除" width="120" header-align="center"></el-table-column>
                <el-table-column fixed="right" label="相关操作" width="120" header-align="center">
                  <template #default="scope">
                    <el-button
                      type="primary"
                      v-if="normalTable[scope.row.rowId - 1].isBanned === '否'"
                      @click="changeStatus(normalTable[scope.row.rowId - 1].userId, 'normal', null)"
                    >
                      解除封禁
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-config-provider :locale="locale">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[1, 5, 10, 20]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="normalTable.length"
                  background
                  v-if="normalTableIsSelected === true"
                ></el-pagination>
              </el-config-provider>
            </el-col>
            <el-col :span="2"></el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { markRaw, reactive } from 'vue'
import {
  EditPen,
  Message,
  Picture,
  Search,
  Setting,
  StarFilled, Ticket,
  UploadFilled,
  UserFilled,
  User,
  CircleCheck,
  CircleClose,
  CirclePlus,
  Remove,
  Delete,
  PriceTag,
  Key,
  Edit,
  Filter
} from '@element-plus/icons-vue'
import router from '@/router'
import {
  changeStatus,
  createTag,
  deleteTag,
  getAdminsAndCheckers,
  getAllTags, getBannedUser, getBannedUsers,
  getInfo,
  grant,
  logout,
  modifyTag
} from '@/https/api'
import { ElMessage } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default {
  name: 'Manage',
  data () {
    return {
      storageId: localStorage.getItem('user'),
      Search: markRaw(Search),
      UserFilled: markRaw(UserFilled),
      StarFilled: markRaw(StarFilled),
      Setting: markRaw(Setting),
      Picture: markRaw(Picture),
      Message: markRaw(Message),
      UploadFilled: markRaw(UploadFilled),
      EditPen: markRaw(EditPen),
      Ticket: markRaw(Ticket),
      User: markRaw(User),
      CircleCheck: markRaw(CircleCheck),
      CircleClose: markRaw(CircleClose),
      CirclePlus: markRaw(CirclePlus),
      Remove: markRaw(Remove),
      Delete: markRaw(Delete),
      PriceTag: markRaw(PriceTag),
      Key: markRaw(Key),
      Edit: markRaw(Edit),
      Filter: markRaw(Filter),
      userMicroInfo: reactive({
        userId: '',
        userName: '',
        userImage: '',
        userType: '',
        pathImage: 'default.png'
      }),
      currentPage: 1,
      pageSize: 10,
      locale: zhCn,
      tagTable: reactive([]),
      tagTableIsSelected: false,
      tagTableIsClicked: 0,
      createTagDialog: false,
      tagNameInput: '',
      deleteTagDialog: false,
      deleteTagName: '',
      modifyTagDialog: false,
      originalTagName: '',
      modifyTagNameInput: '',
      grantTable: reactive([]),
      grantTableIsSelected: false,
      grantTableIsClicked: 0,
      adminAndCheckerListIndexAndGrantTableIndex: new Map(),
      grantDialog: false,
      form: {
        userId: '',
        userType: ''
      },
      rules: {
        userId: [
          {
            required: true,
            message: '用户编号不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^\d{1,}$/,
            message: '请正确输入用户编号',
            trigger: 'blur'
          }
        ]
      },
      radioData: 'admin',
      deleteUserDialog: false,
      deleteUserForm: {
        deleteUserId: '',
        deleteUserIdConfirm: ''
      },
      deleteUserRules: {
        deleteUserId: [
          {
            required: true,
            message: '用户编号不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^\d{1,}$/,
            message: '请正确输入用户编号',
            trigger: 'blur'
          }
        ],
        deleteUserIdConfirm: [
          {
            required: true,
            validator: this.validateDeleteUserId(),
            trigger: 'blur'
          }
        ]
      },
      banUserDialog: false,
      banUserForm: {
        bannedUserId: '',
        bannedReason: ''
      },
      banUserRules: {
        bannedUserId: [
          {
            required: true,
            message: '用户编号不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^\d{1,}$/,
            message: '请正确输入用户编号',
            trigger: 'blur'
          }
        ],
        bannedReason: [
          {
            required: true,
            message: '封禁理由不能为空',
            trigger: 'blur'
          }
        ]
      },
      normalTable: reactive([]),
      normalTableIsSelected: false,
      normalTableIsClicked: 0,
      bannedUserSearch: '',
      myUserPageCanBeClicked: false,
      searchInput: ''
    }
  },
  methods: {
    jumpToHome () {
      router.push('/')
    },
    f () {
      return new Promise((resolve, reject) => {
        const id = localStorage.getItem('user')
        if (id === null) {
          resolve()
        } else {
          getInfo(id).then(res => {
            console.log(res)
            this.userMicroInfo.userId = res.data.userId
            this.userMicroInfo.userName = res.data.userName
            this.userMicroInfo.userImage = res.data.userImage
            this.userMicroInfo.userType = res.data.userType
            this.userMicroInfo.pathImage = this.userMicroInfo.userImage.slice(34)
            this.myUserPageCanBeClicked = true
            resolve(res.data)
          }).catch(err => {
            reject(err)
          })
        }
      })
    },
    loginOrLogout () {
      if (localStorage.getItem('user') === null) {
        router.push('/login')
      } else {
        const res = logout()
        console.log(res)
        localStorage.removeItem('user')
        sessionStorage.removeItem('user')
        router.replace('/')
      }
    },
    startToCreate () {
      if (localStorage.getItem('user') === null) {
        ElMessage.error('请先登录以开始创作！')
      } else {
        router.push('/create')
      }
    },
    jumpToCheck () {
      router.push('/check')
    },
    jumpToManage () {
      router.push('/manage')
    },
    showTagTable () {
      this.grantTable = []
      this.normalTable = []
      this.grantTableIsSelected = false
      this.normalTableIsSelected = false
      this.grantTableIsClicked = 0
      this.normalTableIsClicked = 0
      this.tagTableIsSelected = true
      this.tagTableIsClicked += 1
      if (this.tagTableIsClicked === 1) {
        getAllTags().then(res => {
          console.log(res)
          const list = res.data
          for (let i = 0; i < list.length; i++) {
            const tagId = list[i].tagId
            const tagName = list[i].tagName
            const tagStatus = list[i].tagStatus
            const type = tagStatus === 'normal' ? 'success' : 'danger'
            this.tagTable.push({
              tagId: tagId,
              tagName: tagName,
              tagStatus: tagStatus === 'normal' ? '正常' : '删除',
              type: type
            })
          }
        })
      }
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    createTag () {
      const formData = new FormData()
      formData.append('tagName', this.tagNameInput)
      createTag(formData).then(res => {
        console.log(res)
        ElMessage({
          message: res.message,
          type: res.status === true ? 'success' : 'error'
        })
        this.createTagDialog = false
        setTimeout(function () {
          location.reload()
        }, 500)
      })
    },
    showDeleteTagDialog (tagName) {
      this.deleteTagName = tagName
      this.deleteTagDialog = true
    },
    deleteTag () {
      const formData = new FormData()
      formData.append('tagName', this.deleteTagName)
      deleteTag(formData).then(res => {
        console.log(res)
        ElMessage({
          message: res.message,
          type: res.status === true ? 'success' : 'error'
        })
        this.deleteTagDialog = false
        setTimeout(function () {
          location.reload()
        }, 500)
      })
    },
    showModifyTagDialog (tagName) {
      this.originalTagName = tagName
      this.modifyTagDialog = true
    },
    modifyTag () {
      const formData = new FormData()
      formData.append('originalTagName', this.originalTagName)
      formData.append('tagName', this.modifyTagNameInput)
      modifyTag(formData).then(res => {
        console.log(res)
        ElMessage({
          message: res.message,
          type: res.status === true ? 'success' : 'error'
        })
        this.modifyTagDialog = false
        this.modifyTagNameInput = ''
        if (res.status === true) {
          setTimeout(function () {
            location.reload()
          }, 500)
        }
      })
    },
    showGrantTable () {
      this.tagTable = []
      this.normalTable = []
      this.tagTableIsSelected = false
      this.normalTableIsSelected = false
      this.tagTableIsClicked = 0
      this.normalTableIsClicked = 0
      this.grantTableIsSelected = true
      this.grantTableIsClicked += 1
      if (this.grantTableIsClicked === 1) {
        getAdminsAndCheckers().then(res => {
          console.log(res)
          const list = res.data
          for (let i = 0; i < list.length; i++) {
            const userId = list[i].userId
            const userName = list[i].userName
            const userType = list[i].userType === 'admin' ? '管理员' : '审核员'
            const type = list[i].userType === 'admin' ? 'success' : ''
            this.grantTable.push({
              userId: userId,
              userName: userName,
              userType: userType,
              type: type
            })
            this.adminAndCheckerListIndexAndGrantTableIndex.set(userId, i)
          }
        })
      }
    },
    grant (userId, userType) {
      const formData = new FormData()
      formData.append('userId', userId)
      formData.append('userType', userType)
      grant(formData).then(res => {
        console.log(res)
        ElMessage({
          message: res.message,
          type: res.status === true ? 'success' : 'error'
        })
        this.grantDialog = false
        this.form.userId = ''
        if (res.status === true) {
          setTimeout(function () {
            location.reload()
          }, 500)
        }
      })
    },
    showDeleteUserDialog () {
      this.tagTableIsSelected = false
      this.grantTableIsSelected = false
      this.normalTableIsSelected = false
      this.tagTableIsClicked = 0
      this.grantTableIsClicked = 0
      this.normalTableIsClicked = 0
      this.tagTable = []
      this.grantTable = []
      this.normalTable = []
      this.deleteUserDialog = true
    },
    validateDeleteUserId () {
      return (rule, value, callback) => {
        if (value !== this.deleteUserForm.deleteUserId && this.deleteUserForm.deleteUserId !== '') {
          callback(new Error('两次输入的用户编号不一致'))
        } else {
          callback()
        }
      }
    },
    changeStatus (userId, userStatus, bannedReason) {
      if (userId === '' && userStatus === 'deleted') {
        alert('提交错误')
      } else {
        const formData = new FormData()
        formData.append('userId', userId)
        formData.append('userStatus', userStatus)
        if (userStatus === 'banned') {
          formData.append('bannedReason', bannedReason)
        }
        changeStatus(formData).then(res => {
          console.log(res)
          ElMessage({
            message: res.message,
            type: res.status === true ? 'success' : 'error'
          })
          if (res.status === true) {
            if (userStatus === 'deleted') {
              this.deleteUserForm.deleteUserId = ''
              this.deleteUserForm.deleteUserIdConfirm = ''
              this.deleteUserDialog = false
            }
            if (userStatus === 'banned') {
              this.banUserForm.bannedUserId = ''
              this.banUserForm.bannedReason = ''
              this.banUserDialog = false
            }
            if (userStatus === 'normal') {
              setTimeout(function () {
                location.reload()
              }, 500)
            }
          }
        })
      }
    },
    showBanUserDialog () {
      this.tagTableIsSelected = false
      this.grantTableIsSelected = false
      this.normalTableIsSelected = false
      this.tagTableIsClicked = 0
      this.grantTableIsClicked = 0
      this.normalTableIsClicked = 0
      this.tagTable = []
      this.grantTable = []
      this.normalTable = []
      this.banUserDialog = true
    },
    showNormalTable () {
      this.tagTable = []
      this.grantTable = []
      this.tagTableIsSelected = false
      this.grantTableIsSelected = false
      this.tagTableIsClicked = 0
      this.grantTableIsClicked = 0
      this.normalTableIsSelected = true
      this.normalTableIsClicked += 1
      if (this.normalTableIsClicked === 1) {
        getBannedUsers().then(res => {
          console.log(res)
          const list = res.data
          for (let i = 0; i < list.length; i++) {
            const userId = list[i].userId
            const userName = list[i].userName
            const bannedTime = list[i].bannedTime
            const bannedReason = list[i].bannedReason
            const isBanned = list[i].isBanned === 0 ? '是' : '否'
            this.normalTable.push({
              rowId: i + 1,
              userId: userId,
              userName: userName,
              bannedTime: bannedTime,
              bannedReason: bannedReason,
              isBanned: isBanned
            })
          }
        })
      }
    },
    searchAndShow () {
      return new Promise((resolve, reject) => {
        const regular = /^\d{1,}$/
        if (this.bannedUserSearch === '') {
          getBannedUsers().then(res => {
            this.normalTable = []
            const list = res.data
            for (let i = 0; i < list.length; i++) {
              const userId = list[i].userId
              const userName = list[i].userName
              const bannedTime = list[i].bannedTime
              const bannedReason = list[i].bannedReason
              const isBanned = list[i].isBanned === 0 ? '是' : '否'
              this.normalTable.push({
                rowId: i + 1,
                userId: userId,
                userName: userName,
                bannedTime: bannedTime,
                bannedReason: bannedReason,
                isBanned: isBanned
              })
            }
            resolve()
          }).catch(err => {
            reject(err)
          })
        } else if (regular.test(this.bannedUserSearch)) {
          getBannedUser(this.bannedUserSearch).then(res => {
            this.normalTable = []
            const list = res.data
            for (let i = 0; i < list.length; i++) {
              const userId = list[i].userId
              const userName = list[i].userName
              const bannedTime = list[i].bannedTime
              const bannedReason = list[i].bannedReason
              const isBanned = list[i].isBanned === 0 ? '是' : '否'
              this.normalTable.push({
                rowId: i + 1,
                userId: userId,
                userName: userName,
                bannedTime: bannedTime,
                bannedReason: bannedReason,
                isBanned: isBanned
              })
            }
            resolve()
          }).catch(err => {
            reject(err)
          })
        }
      })
    },
    jumpToModify () {
      router.push('/modify')
    },
    jumpToUserPageByUserId (userId) {
      router.push('/user/' + userId)
    },
    startToSearch () {
      const searchKeyword = this.searchInput === '' ? '孤独摇滚！' : this.searchInput
      router.push('/search/' + searchKeyword.trim())
    },
  },
  mounted () {
    this.f()
    this.showNormalTable()
  }
}
</script>

<style lang="scss" scoped>
:deep(.search) {
  height: 47px;
  width: 100%;
  margin-top: 30px;

  input {
    border: 0px;
    -webkit-appearance: none;
    border-radius: 10px;
    padding: 12px 30px 12px 15px;
    color: black;
    height: 47px;
  }
}

.el-dropdown-link:focus {
  outline: none;
}

:deep(.el-pagination) {
  justify-content: center;
  margin-top: 30px;
}
</style>
