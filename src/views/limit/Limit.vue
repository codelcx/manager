<template>
<div class='Limit'>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <bread>
      <template #value1>首页</template>
      <template #value2>权限管理</template>
      <template #value3>权限列表</template>
    </bread>

    <!-- 表格 -->
    <el-table  :data="tableData" border style="width: 100%" max-height="700">
      <el-table-column type="index" label="#" />
      <el-table-column prop="name" label="权限名称" />
      <el-table-column prop="path" label="路径" />
      <el-table-column label="权限等级">
        <template v-slot="scope">
          <span v-if="scope.row.level==0">一级</span>
          <span v-if="scope.row.level==1">二级</span>
          <span v-if="scope.row.level==2">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

</div>
</template>

<script>
import {
  getLimitList
} from '@/network/limit'
import Bread from '@/components/content/Bread.vue'
export default {
  name: 'Limit',
  components: {
    Bread,
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getLimitList()
  },
  methods: {
    getLimitList() {
      getLimitList('list').then(res => {
        this.tableData=res;
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>

</style>
