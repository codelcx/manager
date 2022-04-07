<template>
<div class='Bread'>
  <!-- 1.面包屑 -->
  <el-breadcrumb separator-class="ArrowRight">
    <el-breadcrumb-item><slot name="value1">首页</slot></el-breadcrumb-item>
    <el-breadcrumb-item><slot name="value2">权限</slot></el-breadcrumb-item>
    <el-breadcrumb-item><slot name="value3">列表</slot></el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>

<script>
import {
  ArrowRight,
} from "@element-plus/icons-vue";
export default {
  name: 'Bread',
  components: ArrowRight
}
</script>

<style scoped>
.Bread{
  margin-bottom:20px;
}
</style>
