<template>
<div class='goodList'>
  <el-card>
    <bread>
      <template #value2>商品管理</template>
      <template #value3>商品列表</template>
    </bread>
    <!-- 搜索框 -->
    <el-row class="input_search">
      <el-col :span="10">
        <el-input clearable placeholder="Please input" class="input_append" @clear="getUserList">
          <template #append>
            <el-button>
              <el-icon>
                <search />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="4" class="btn_add">
        <el-button type="primary" @click="$router.push('/goodAdd')">商品添加</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table stripe :data="goodList" height="500" style="width: 100%">
      <el-table-column type="index" label="#" />
      <el-table-column prop="good_name" label="商品名称" min-width="50" />
      <el-table-column prop="good_price" label="价格" />
      <el-table-column prop="good_weight" label="重量" />
      <el-table-column prop="good_number" label="数量" />
      <el-table-column prop="good_create" label="创建日期" />
      <el-table-column label="操作" min-width="200">
        <template v-slot="scope">
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
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</div>
</template>

<script>
import {
  getGoodList
} from '@/network/good'
import Bread from '@/components/content/Bread'
export default {
  name: 'goodlist',
  components: {
    Bread
  },
  data() {
    return{
      goodList: []
    }
  },
  created() {
    this.getGoodList()
  },
  methods: {
    getGoodList() {
      getGoodList().then(res => {
        this.goodList = res;
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>
.btn_add {
  margin-left: 10px;
}
</style>
