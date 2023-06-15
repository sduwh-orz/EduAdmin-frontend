<template>
  <div class="login-container">
    <div class="login-box">
      <el-form ref="formRef" :model="form" class="login-form" :rules="rules">
        <div class="title-container">
          <h3 class="title">高校综合教务管理系统登录入口</h3>
        </div>
        <el-form-item prop="userId">
          <el-input
            v-model="form.userId"
            class="w-50 m-2"
            size="large"
            placeholder="请输入学号 / 工号"
            :prefix-icon="UserFilled"
            clearable
          />
        </el-form-item>
        <el-form-item prop="userPassword">
          <el-input
            v-model="form.userPassword"
            class="w-50 m-2"
            size="large"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        <el-link type="info" style="color: grey">忘记密码？</el-link>
        <br /><br />
        <el-button type="primary" class="login-button" round @click="handleLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { markRaw } from 'vue'
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { login } from '@/https/api'
import router from '@/router'
import { ElMessage } from 'element-plus'

export default {
  name: 'Login',
  data () {
    return {
      UserFilled: markRaw(UserFilled),
      Lock: markRaw(Lock),
      form: {
        userId: '',
        userPassword: '',
      },
      rules: {
        userId: [
          {
            required: true,
            message: '学号 / 工号不能为空',
            trigger: 'blur',
          },
        ],
        userPassword: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    handleLogin () {
      if (this.form.userId === '' || this.form.userPassword === '') {
        alert('提交错误')
      } else {
        const formData = new FormData()
        formData.append('userId', this.form.userId)
        formData.append('userPassword', this.form.userPassword)
        login(formData).then(res => {
          console.log(res)
          ElMessage({
            message: res.message,
            type: res.status === true ? 'success' : 'error'
          })
          if (res.status === true) {
            localStorage.setItem('user', res.data.userId)
            sessionStorage.setItem('user', res.data.userId)
            localStorage.setItem('userName', res.data.userName)
            localStorage.setItem('userType', res.data.userType)
            if (res.data.userType === 'student') {
              router.push('/student')
            } else if (res.data.userType === 'teacher') {
              router.push('/teacher')
            } else {
              router.push('/admin')
            }
          }
        })
      }
    },
    gotoRegister () {
      router.push('/Register')
    },
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  height: 100%;
  width: 100%;
  //background-color: $bg;
  background: url("~@/assets/sysImages/SDU.jpg");
  position: fixed;
  background-size: 100% 100%;
}

.login-box {
  width: 500px;
  height: 400px;
  background-color: rgba(230, 230, 230, 0.9);
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -200px;
}

.login-form {
  position: absolute;
  width: 400px;
  height: 360px;
  left: 50%;
  top: 52%;
  margin-left: -200px;
  margin-top: -140px;
  //max-width: 100%;
  //padding: 160px 35px 0;
  //margin: 0 auto;
  //overflow: hidden;
}

//.svg-container {
//  padding: 6px 5px 6px 15px;
//  color: rgb(0, 0, 0);
//  vertical-align: middle;
//  display: inline-block;
//}

:deep(.el-form-item) {
  border: transparent;
  background: transparent;
  border-radius: 10px;
  color: #454545;
}

:deep(.el-input) {
  //display: inline-block;
  height: 47px;
  width: 100%;

  input {
    //background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 10px;
    padding: 12px 30px 12px 15px;
    color: black;
    height: 47px;
    //caret-color: $cursor;
  }
}

.title-container {
  position: relative;

  .title {
    font-size: 26px;
    color: black;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  :deep(.lang-select) {
    position: absolute;
    top: 4px;
    right: 0;
    background-color: white;
    font-size: 22px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }
}

.login-button {
  width: 35%;
  box-sizing: border-box;
}

//.login-form {
//  position: relative;
//  width: 520px;
//  max-width: 100%;
//  padding: 160px 35px 0;
//  margin: 0 auto;
//  overflow: hidden;
//
//  :deep(.el-form-item) {
//    border: 1px solid rgba(255, 255, 255, 0.1);
//    background: rgba(0, 0, 0, 0.1);
//    border-radius: 5px;
//    color: #454545;
//  }
//
//  :deep(.el-input) {
//    display: inline-block;
//    height: 47px;
//    width: 85%;
//
//    input {
//      background: transparent;
//      border: 0px;
//      -webkit-appearance: none;
//      border-radius: 0px;
//      padding: 12px 5px 12px 15px;
//      color: $light_gray;
//      height: 47px;
//      caret-color: $cursor;
//    }
//  }
//  .login-button {
//    width: 100%;
//    box-sizing: border-box;
//  }
//}
//
//.tips {
//  font-size: 16px;
//  line-height: 28px;
//  color: #fff;
//  margin-bottom: 10px;
//
//  span {
//    &:first-of-type {
//      margin-right: 16px;
//    }
//  }
//}
//
//.svg-container {
//  padding: 6px 5px 6px 15px;
//  color: $dark_gray;
//  vertical-align: middle;
//  display: inline-block;
//}
//
//.title-container {
//  position: relative;
//
//  .title {
//    font-size: 26px;
//    color: $light_gray;
//    margin: 0px auto 40px auto;
//    text-align: center;
//    font-weight: bold;
//  }
//
//  :deep(.lang-select) {
//    position: absolute;
//    top: 4px;
//    right: 0;
//    background-color: white;
//    font-size: 22px;
//    padding: 4px;
//    border-radius: 4px;
//    cursor: pointer;
//  }
//}
//
//.show-pwd {
//  // position: absolute;
//  // right: 10px;
//  // top: 7px;
//  font-size: 16px;
//  color: $dark_gray;
//  cursor: pointer;
//  user-select: none;
//}
</style>
