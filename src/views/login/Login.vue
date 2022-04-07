<template>
  <div class="login">
    <el-form
      class="login-form"
      label-position="top"
      label-width="100px"
      style="max-width: 500px"
      :model="userData"
      @submit.prevent.native
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input
          v-model="userData.username"
          auto-complete="on"
          autofocus="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userData.password" auto-complete="on"></el-input>
      </el-form-item>
      <el-button
        class="login-btn"
        native-type="submit"
        @click="handlerLogin"
        type="primary"
        round
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { login } from "@/network/login";

import { ElMessage } from "element-plus";

export default {
  name: "Login",
  data() {
    return {
      userData: {
        username: "admin",
        password: "admin",
      },
    };
  },
  methods: {
    async handlerLogin() {
      const res = await login(this.userData);
      const {
        data,
        meta: { msg, status },
      } = res; //解构赋值
      if (status === 200) {
        localStorage.setItem("token", data);
        localStorage.setItem('username',this.userData.username);
        this.$router.push("/home"); //跳转到首页
        ElMessage.success({
          message: msg,
          offset: 7,
          center: true,
        });
      } else {
        ElMessage.error(msg);
      }
    },
  },
};
</script>
<style scoped lang="less">
.login {
  height: 100%;
  background-color: #324153;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  position: relative;
  width: 320px;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f1f3f4;
}
.login-btn {
  position: relative;
  width: 80%;
  height: 40px;
  left: 50%;
  transform: translate(-50%);
}
</style>



