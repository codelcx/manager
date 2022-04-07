<template>
<div class="user">
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator-class="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2.搜索框 -->
    <el-row class="input_search">
      <el-col :span="10">
        <el-input clearable placeholder="Please input" class="input_append" v-model="page.query" @clear="getUserList">
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
        <el-button type="primary" @click="add_user">用户添加</el-button>
      </el-col>
    </el-row>
    <!-- 3.表格 -->
    <el-table stripe :data="tableData" height="500" style="width: 100%">
      <el-table-column type="index" label="#" />
      <el-table-column prop="username" label="姓名" min-width="50" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="mobile" label="电话" />
      <el-table-column prop="date" label="创建日期" />
      <el-table-column prop="state" label="用户状态" min-width="40">
        <template v-slot="scope">
          <el-switch @change="changeState(scope.row)" v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949" />
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <template v-slot="scope">
          <el-button type="success" @click="editRole(scope.row)">
            <el-icon>
              <check />
            </el-icon>分配
          </el-button>
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
    <!-- 4.分页 -->
    <div class="demo-pagination-block">
      <el-pagination :currentPage="page.pageNum" :page-sizes="[2, 4, 8, 16]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <!-- 5.添加对话框 -->
    <el-dialog v-model="dialogFormVisible" title="用户添加" width="30%" center>
      <el-form :model="formData">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addUser">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 6.编辑对话框 -->
    <el-dialog v-model="dialogEditVisible" title="用户编辑" width="30%" center>
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input clearable v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input clearable v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取消</el-button>
          <el-button type="primary" @click="addUser">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 7.角色分配 -->
    <el-dialog width="30%" v-model="dialogRoleVisible" title="角色分配">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <!-- currentRoleId与value值匹配，匹配谁显示谁 -->
          <el-select v-model="currentRoleId" placeholder="Please select a zone">
            <el-option :label="item.roleName" :value="i" v-for="(item,i) in roleData" :key="i">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogRoleVisible = false">取消</el-button>
          <el-button type="primary" @click="s_editRole">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</div>
</template>

<script>
//用户请求
import {
  getUserList,
  addUser,
  deleteUser,
  editUserRole,
} from "@/network/user";
import {
  getRoleList
} from '@/network/limit'
//elementplus图标
import {
  ArrowRight,
  Search,
  Edit,
  Check,
  Delete,
} from "@element-plus/icons-vue";

//elementplus组件
import {
  ElMessage,
  ElMessageBox
} from "element-plus";

export default {
  name: "User",
  components: {
    ArrowRight,
    Search,
    Edit,
    Check,
    Delete,
  },

  //接口请求一般放在mounted中，
  //服务端渲染不支持mounted，需要放到created中
  created() {
    this.getUserList();
    this.getRoleList();
  },
  data() {
    return {
      tableData: [],
      //分页
      page: {
        query: '',
        pageNum: 1,
        pageSize: 2,
      },
      total: 0,
      //添加对话框
      dialogFormVisible: false,
      formLabelWidth: '60px',
      formData: {},
      form: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      //编辑对话框
      dialogEditVisible: false,
      //角色
      roleData: [],
      dialogRoleVisible: false,
      currentRoleId: '',
    }
  },
  methods: {
    //1.获取用户列表
    getUserList() {
      getUserList(this.page).then(res => {
        // console.log(res);
        this.tableData = res.data;
        this.total = res.total;
        // this.tableData = res.data;
        // this.tableData.shift();
        // console.log(this.tableData);
        // console.log(res);
      })
    },
    //2.分页
    //2.1分页条数改变时触发
    handleSizeChange(num) {
      this.page.pageSize = num;
      this.getUserList();
      // console.log(`${num} items per page`)
    },
    //2.2当前页改变时触发
    handleCurrentChange(num) {
      this.page.pageNum = num;
      this.getUserList();
      // console.log(`current page: ${num}`)
    },

    //3.用户搜索
    //4.用户添加
    add_user() {
      this.dialogFormVisible = true;
      // for(let key in this.form){
      //   this.form[key]='';
      // }
    },
    addUser() {
      addUser(this.formData).then(res => {
        if (res.status == 200) {
          this.getUserList();
          ElMessage.success({
            message: res.msg,
            center: true,
            offset: 7,
          });
          this.dialogFormVisible = false
        } else {
          ElMessage.error({
            message: res.msg,
            center: true,
            offset: 7,
          });
        }
      })
    },
    //5.用户删除
    deleteUser(user) {
      // console.log(id);
      ElMessageBox.confirm(
          '是否删除用户',
          'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
        )
        .then(() => {
          deleteUser(user.id).then(res => {
            if (res.status == 200) {
              this.total = res.total;
              this.getUserList();
              // console.log(this.page.pageNum);
              ElMessage({
                type: 'success',
                message: '删除成功',
              })
            }

          })

        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    },
    //6.编辑用户
    editUser(user) {
      this.dialogEditVisible = true;
      this.form = user;

      //发送请求
    },

    //7.修改用户状态
    changeState(user) {
      this.form = user;
      //发送请求
    },

    //8.获取角色列表
    getRoleList() {
      getRoleList().then(res => {
        this.roleData = res;
      })
    },
    //8.角色分配
    editRole(user) {
      this.dialogRoleVisible = true;
      this.form = user;
      this.currentRoleId = user.rid;
    },
    //9.角色修改
    s_editRole() {
      this.dialogRoleVisible = false;

      if (this.currentRoleId != this.form.rid) {
        const data = {
          id: this.form.id,
          rid: this.currentRoleId
        };
        editUserRole(data).then(res => {
          if (res.status == 200) {
            ElMessage.success('角色修改成功');
            this.getUserList();
          }
        })
      }

    }
  }
};
</script>

<style scoped>
.user {
  height: 100%;
}

.el-card {
  height: 98%;
}

.input_search {
  margin-top: 15px;
}

.btn_add {
  margin-left: 10px;
}
</style>
