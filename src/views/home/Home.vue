<template>
<div class="home">
  <!-- 大容器 -->
  <el-container class="container">
    <!-- 顶部 -->
    <el-header>
      <el-row align="middle">
        <el-col :span="20" class="middle">
          <div class="grid-content bg-purple-light">
            <h3>电商后台管理系统</h3>
          </div>
        </el-col>
        <el-col :span="2" :push="1">
          <div style="color:#DDDFDF">
            <el-icon>
              <user />
            </el-icon>{{username}}
          </div>
        </el-col>
        <el-col :span="2" class="left">
          <div class="grid-content bg-purple">
            <a href="" @click="handlerToken" style="color:#DDDFDF">
              <el-icon>
                <switch-button />
              </el-icon>退出
            </a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!-- 底部 -->
    <el-container>
      <el-aside>
        <!-- 侧边栏 -->
        <el-menu text-color="#fff" active-text-color="#ffd04b" class="el-menu-vertical-demo" :router="true" background-color="#3A3D4C">
          <el-sub-menu :index="item1.path" v-for="(item1,i) in limitList" :key="i">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>{{item1.name}}</span>
            </template>

            <el-menu-item :index="item2.path" v-for="(item2,j) in item1.children" :key="j">
              <el-icon>
                <location />
              </el-icon>
              <span>{{item2.name}}</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <!-- 内容区 -->
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
import {
  getLimitList
} from '@/network/limit'
export default {
  name: "home",
  data() {
    return {
      limitList: [],
      username: '',
    }
  },
  created() {
    this.getLimitList();
    this.username = localStorage.getItem('username');
  },
  methods: {
    getLimitList() {
      getLimitList().then(res => {
        this.limitList = res;
        const path = this.limitList[0].children[0].path
        this.$router.push(`${path}`)
      })
    },
    handlerToken() {
      localStorage.clear();
      this.$message.warning({
        message: "退出登录",
        center: true,
        offset: 7,
      });
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.home {
  height: 100%;
}

.container {
  height: 100%;
}

.el-header {
  background-color: #1F262E;
  color: #C1EFE8;
}

.el-header .middle {
  padding-left: 10px;
}

.el-header .left a {
  text-decoration: none;
}

.left {
  text-align: center;
}

.el-icon {
  vertical-align: middle;
}

.el-aside {
  width: 230px;
  background-color: #3A3D4C;
}

.el-menu {
  border: 0
}

.el-menu-item {
  margin-left: 18px;
}

.el-main {
  padding: 0;
  background-color: #E9EBEC;
  color: var(--el-text-color-primary);
}

</style>
