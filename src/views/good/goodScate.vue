<template>
<div class='goodScate'>
  <el-card>
    <bread>
      <template #value2>商品管理</template>
      <template #value3>商品分类</template>
    </bread>
    <el-button type="primary" style="margin-bottom:10px">添加分类</el-button>
    <el-table :data="list" style="width: 100%" row-key="cat_id" border lazy :load="load" :tree-props="{ children: 'children', hasChildren: true}">
      <el-table-column prop="cat_name" label="分类名称" width="180" />
      <el-table-column label="级别" width="180">
        <template v-slot="scope">
          <span v-if="scope.row.cat_level==0">一级</span>
          <span v-if="scope.row.cat_level==1">二级</span>
          <span v-if="scope.row.cat_level==2">三级</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200"> <template v-slot="scope">
          <el-button type="primary" @click="editUser(scope.row)">
            <el-icon>
              <edit />
            </el-icon>编辑
          </el-button>
          <el-button type="danger" @click="deleteUser(scope.row)">
            <el-icon>
              <delete />
            </el-icon>删除
          </el-button>
        </template></el-table-column>
    </el-table>
  </el-card>
  <!-- <el-table :data="list" border max-height="250">
    <el-table-tree-column
    prop="label" 
    label="分类名称" 
    levelKey="level"
    parentKey="pid"
    treeKey="id"
    childKey="children"
    width="220" />
  </el-table> -->

</div>
</template>

<script>
import {
  getGoodCategory,
} from '@/network/good'
import Bread from '@/components/content/Bread'
export default {
  name: 'goodScate',
  components: {
    Bread,
  },
  data() {
    return {
      list: [],
      // list: [{
      //   label: 'Level one 1',
      //   level: 0,
      //   pid: 0,
      //   id: 1,
      //   children: [{
      //     label: 'Level two 1-1',
      //     level: 1,
      //     pid: 1,
      //     id: 2,
      //     children: [{
      //       label: 'Level three 1-1-1',
      //       level: 2,
      //       pid: 2,
      //       id: 3
      //     }],
      //   }],
      // }],
    }
  },
  created() {
    this.getGoodCategory()
  },
  methods: {
    getGoodCategory() {
      getGoodCategory().then(res => {
        this.list = res;
      })
    },
    load(){

    }
  },

}
</script>

<style scoped>

</style>
