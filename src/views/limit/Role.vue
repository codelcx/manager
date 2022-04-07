<template>
<div class='role'>
  <el-card>
    <bread>
      <template #value1>首页</template>
      <template #value2>权限管理</template>
      <template #value3>角色列表</template></bread>
    <el-button type="primary" @click="add_role">角色添加</el-button>
    <el-table :data="roleList" border style="width: 100%">

      <el-table-column type="expand">
        <template v-slot="scope">
          <span v-if="scope.row.children.length==0">未分配权限</span>
          <el-row v-for="(item1,i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag closable @close="deleteLimit(scope.row,item1.id)">{{item1.name}}
                <el-icon>
                  <arrow-right />
                </el-icon>
              </el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2,j) in item1.children" :key="j">
                <el-col :span="4">
                  <el-tag closable @close="deleteLimit(scope.row,item2.id)" type="success">{{item2.name}}
                    <el-icon>
                      <arrow-right />
                    </el-icon>
                  </el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag closable @close="deleteLimit(scope.row,item3.id)" type="danger" v-for="(item3,k) in item2.children" :key="k">{{item3.name}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

        </template>
      </el-table-column>

      <el-table-column type="index" label="#" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleDes" label="角色描述" />

      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="success" @click="setLimit(scope.row)">
            <el-icon>
              <check />分配
            </el-icon>
          </el-button>
          <el-button type="primary" @click="editUser(scope.row)">
            <el-icon>
              <edit />编辑
            </el-icon>
          </el-button>

          <el-button type="danger" @click="deleteUser(scope.row)">
            <el-icon>
              <delete />删除
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisibleRole" title="修改权限" top="0" custom-class="scaleSize">
      <!-- 树形结构 -->
      <el-tree ref="tree" default-expand-all :data="limitTree" show-checkbox node-key="id" :props="defaultProps"  :default-checked-keys="arrcheck"/>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisibleRole = false">取消</el-button>
          <el-button type="primary" @click="editLimit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</div>
</template>

<script>
import {
  getLimitList,
  getRoleList,
} from '@/network/limit'
import {
  ArrowRight,
  Edit,
  Check,
  Delete,
} from "@element-plus/icons-vue";
import Bread from '@/components/content/Bread.vue'
export default {
  name: 'Role',
  components: {
    Bread,
    Edit,
    Check,
    Delete,
    ArrowRight,
  },
  data() {
    return {
      limitTree: [],
      roleList: [],
      dialogVisibleRole: false,
      //树形结构
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      arrcheck: [],
      currentRoleId: -1
    }
  },
  created() {
    this.getRoleList();
    this.getLimitList();
  },
  methods: {
    add_role() {},
    getLimitList() {
      getLimitList().then(res => {
        this.limitTree = res;
        // console.log(res);
      })
    },
    getRoleList() {
      getRoleList().then(res => {
        // console.log(res);
        this.roleList = res;
      })
    },
    deleteLimit(role, lid) {
      console.log(role.rid, lid);
      //发送请求删除权限
      //返回该角色剩余权限,重新赋值给该角色role.children=res

    },
    setLimit(role) {
      this.dialogVisibleRole = true;
      this.currentRoleId = role.rid;
      this.arrcheck=[]
      const check_key = [];
      // const roleArr=Array.from(role.children);
      role.children.forEach(item1 => {
        // this.arrcheck.push(item1.id);
        item1.children.forEach(item2 => {
          // this.arrcheck.push(item2.id);
          item2.children.forEach(item3 => {
            check_key.push(item3.id);
          })
        })
      });

      // if (this.$refs.tree) {
      //   console.log(1);
      //   this.$refs.tree.setCheckedKeys(check_key);
      //  }
      this.arrcheck=check_key
      //dom加载完成后执行选中
      this.$nextTick(()=>{
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys(check_key);
       }})
    },
    editLimit() {
      this.dialogVisibleRole = false;
      const arr1=this.$refs.tree.getCheckedKeys();
      const arr2=this.$refs.tree.getHalfCheckedKeys();
      const arr3=[...arr1,...arr2]
      console.log(this.currentRoleId,arr1,arr2);
      console.log(arr3);
      //发送请求修改权限
    }
  },

}
</script>

<style>
.scaleSize {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
}
</style>
