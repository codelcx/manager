<template>
<div class='goodAdd'>
  <el-card>
    <bread>
      <template #value2>商品管理</template>
      <template #value3>商品列表</template>
    </bread>
    <el-alert title="添加商品" type="success" center show-icon style="margin-bottom: 5px"> </el-alert>

    <!-- 步骤 -->
    <el-steps :active="active" align-center finish-status="success" simple >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <el-form label-position="top" label-width="100px" :model="form" style="max-width: 460px;overflow:auto">
      <el-tabs @tab-click="clickItem" v-model="value" tab-position="left">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.good_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.good_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.good_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.good_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader clearable v-model="option" :options="options" :props="props" @change="handleChange"></el-cascader>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="2" label="商品参数">
          <el-form-item :label="item1.attr_name" v-for="(item1,i) in attrDParameter" :key="i">
            <el-checkbox-group v-model="item1.attr_value">
              <el-checkbox border :label="item2" v-for="(item2,i) in item1.attr_value" :key="i"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <el-form-item :label="item.attr_name" v-for="(item,i) in attrSParameter" :key="i">
            <el-input v-model="item.attr_value"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <el-upload class="upload-demo" action="http://192.168.200.105:8080/login" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
            <el-button type="primary">商品图片</el-button>
            <!-- <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
              </div>
            </template> -->
          </el-upload>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
          <el-form-item>
            <el-button type="primary">添加商品</el-button>
            <QuillEditor v-model="form.good_introduce" theme="snow" toolbar="minial" style="width:100%;height:300px" />
          </el-form-item>

        </el-tab-pane>
      </el-tabs>
    </el-form>

  </el-card>

</div>
</template>

<script>
import {
  QuillEditor
} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {
  ElMessage
} from "element-plus";
import {
  getGoodCategory,
  getGoodParam,
} from '@/network/good'
import Bread from '@/components/content/Bread'
export default {
  name: 'goodAdd',
  components: {
    Bread,
    QuillEditor
  },
  data() {
    return {
      value: "1",
      //商品名、价格、数量、重量、介绍、图片路径、参数
      form: {
        good_name: '',
        good_cat: '',
        good_price: '',
        good_number: '',
        good_weight: '',
        good_introduce: '',
        pics: '',
        attrs: ''
      },
      //动态参数，静态参数
      attrDParameter: [],
      attrSParameter: [],
      //级联选择器
      props: {
        expandTrigger: 'hover',
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      options: [],
      option: [],
      checkList: [],
      fileList: []
    }
  },
  computed: {
    active: function () {
      return parseInt(this.value)
    }
  },
  created() {
    //获取分类
    this.getGoodCategory()
  },
  methods: {
    handleRemove() {

    },
    handlePreview(file) {
      console.log(111);
      console.log(file);
    },
    clickItem() {
      if (this.value == "2") {
        if (this.option.length != 3) {
          ElMessage.warning({
            message: "请选择商品三级分类",
            center: true,
            offset: 7,
          });
          return;
        } else {
          getGoodParam(this.option[2]).then(res => {
            this.attrDParameter = res.d_attr;
            this.attrSParameter = res.s_attr;
          })
        }
      }
    },
    getGoodCategory() {
      getGoodCategory().then(res => {
        this.options = res;
        console.log(this.options);
        console.log(res);
      })
    },
    handleChange(option) {
      console.log(option);
    }
  }

}
</script>

<style scoped>
.el-steps {
  margin-bottom: 10px;
}
</style>
