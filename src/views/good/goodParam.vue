<template>
<div class='goodParam'>
  <el-card>
    <bread>
      <template #value2>商品管理</template>
      <template #value3>分类参数</template>
    </bread>
    <el-alert title="只允许为第三级分类设置参数" type="warning" show-icon style="margin-bottom: 10px"> </el-alert>
    <el-form ref="form" label-width="85px">
      <el-form-item label="请选择商品">
        <el-cascader :show-all-levels="false" clearable v-model="option" :options="options" :props="props" @change="handleChange"></el-cascader>
      </el-form-item>

      <el-tabs @tab-click="clickItem" v-model="value" tab-position="top">
        <el-tab-pane label="动态参数" name="1">
          <el-button type="primary">设置动态参数</el-button>
          <el-table row-key="attr_id" :data="tableData" style="width: 100%">
            <el-table-column type="expand">
              <template #default="props">
                <el-tag v-for="tag in props.row.attr_value" :key="tag" class="mx-1" closable :disable-transitions="false" @close="handleClose(tag)">
                  {{ tag }}
                </el-tag>
                <el-input style="width:50px;" v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                  + New Tag
                </el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" label="#" />
            <el-table-column label="属性名称" prop="attr_name" width="180" />
            <el-table-column label="操作">
              <template>
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
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="2">
          <el-button type="primary">设置静态参数</el-button>
          <el-table :data="tableData" height="250" style="width: 100%">
            <el-table-column type="index" label="#" />
            <el-table-column prop="attr_name" label="属性名称" width="180" />
            <el-table-column prop="attr_value" label="属性值" width="180" />
            <el-table-column label="操作">
              <template>
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
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

    </el-form>
  </el-card>

</div>
</template>

<script>
import {
  getGoodCategory,
  getGoodParam,
} from '@/network/good'
import Bread from '@/components/content/Bread'
export default {
  name: 'goodParam',
  components: {
    Bread
  },
  data() {
    return {
      props: {
        expandTrigger: 'hover',
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      options: [],
      option: [],
      value: '1',
      tableData: [],
      s_attr: [],
      d_attr: [],
      inputValue: '',
      inputVisible: false
    }
  },
  created() {
    this.getGoodCategory()
  },
  methods: {
    getGoodCategory() {
      getGoodCategory().then(res => {
        this.options = res;
      })
    },
    clickItem() {
      if (this.value == "1") {
        this.tableData = this.d_attr;
      } else {
        this.tableData = this.s_attr;
      }
    },
    handleChange() {
      if (this.option != null) {
        if (this.option.length != 3) {
          ElMessage.warning({
            message: "请选择商品三级分类",
            center: true,
            offset: 7,
          });
          return;
        } else {
          getGoodParam(this.option[2]).then(res => {
            this.s_attr = res.s_attr;
            this.d_attr = res.d_attr;
            this.tableData = res.d_attr
          })
        }
      } else {
        this.tableData = []
      }
    },
    handleClose(tag) {
      this.tableData.forEach(item => {
        let index = item.attr_value.indexOf(tag);
        if (index != -1) {
          item.attr_value.splice(index, 1);
        }
      });
    },
    showInput() {
      this.inputVisible = true;
    },
    handleInputConfirm() {
      if (this.inputValue) {
        this.tableData[0].attr_value.push(this.inputValue)
      }
      this.inputVisible = false;
      this.inputValue = ''
    }

  }
}
</script>

<style scoped>

</style>
