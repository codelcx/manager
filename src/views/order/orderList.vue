<template>
<div class='orderList'>
  <el-card>
    <bread>
      <template #value2>订单管理</template>
      <template #value3>订单列表</template>
    </bread>

    <el-table stripe  :data="tableData" height="700" style="width: 100%" border>
      <el-table-column type="index" label="#" />
      <el-table-column prop="order_number" label="订单编号" />
      <el-table-column prop="order_price" label="订单价格" />
      <el-table-column prop="order_play" label="是否付款" />
      <el-table-column prop="order_good" label="是否付款" />
      <el-table-column prop="order_create" label="下单时间" />
      <el-table-column label="操作" min-width="200">
        <el-button type="primary">
          <el-icon>
            <edit />
          </el-icon>编辑
        </el-button>
        <el-button type="danger">
          <el-icon>
            <delete />
          </el-icon>删除
        </el-button>
      </el-table-column>
    </el-table>
  </el-card>

</div>
</template>

<script>
import {
  getOrderList
} from '@/network/order'
import Bread from '../../components/content/Bread.vue'
export default {
  name: 'orderList',
  components: {
    Bread
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      getOrderList().then(res => {
        this.tableData = res
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>

</style>
