# manager

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 项目实现过程
### git版本控制

### 使用的技术框架
1.Element-UI
- npm install element-plus --save
- npm install @element-plus/icons-vue
- main.js导入


2.vue-router
- npm install vue-router --save
- 创建router文件夹，创建index.js,配置路由
- main.js导入router

3.axios
- npm install axios --save
- 新建network文件夹，创建request.js
- 第一种方式：二次封装axios
- 第二种方式：以插件的形式使用，可参考vue文档开发插件

4.mock.js
- npm install mockjs --save
- 创建mock文件夹，创建js文件用于处理拦截请求
- main.js引入自定义的js文件

5.less
-- 预处理器用于样式穿透
- npm install less less-loader --save-dev
- npm install -D less-loader@7.x 版本过高会报错

6.echart
request to https://registry.npmjs.org/echarts failed, reason: connect ETIMEDOUT 104.16.23.35:443
### 1.完成登录界面
### 2.用户列表
####  2.1.面包屑分隔符使用组件的方式 separator-class="ArrowRight"
#### 2.2elementplus单元格中使用数据时有如下方式
```
    <el-table stripe :data="tableData" height="500" style="width: 100%">
      <el-table-column prop="date" label="日期" />
    </el-table>

    <el-table stripe :data="tableData" height="500" style="width: 100%">

    <el-table-column label="日期">
      <template slot-scope="tableData">
      {{tableData.row.date|filter}}
      </template>
    </el-table-column>


    </el-table>
    1.prop="data|filter" prop不支持过滤器
    2.不同组件具有不同作用域不能够直接使用上层数据，需要将上层数据下传，此时数据源为slot-scope="scope",他会自动寻找上一级数据源,scope.row遍历每一个对象
    3.值得注意的是slot-scope在vue3中已经被废除，v-slot能够更好的支持slot
    
```
#### 2.3 分页功能
比如当页码为10，然后切换显示条数为8时会无数据返回
其中主要时当切换数据条数时，页码为10，而此时最大页码为3，后台需要对此判断，否则截取数据会出问题

#### 2.4用户添加
mock.js模拟用户添加，添加的数据在页面不刷新时才有效
#### 2.5用户删除
当一个页面数据全部删除时，会触发两次相同的请求，删除一次，页面减少一次，影响性能（未解决）
#### 2.6用户编辑
#### 2.7用户状态修改
#### 2.8用户角色分配
#### 2.9权限分配
1.多级权限显示，使用v-for嵌套遍历
2.选中相同标签，同时修改，ctrl+shift+L，移动箭头到需要位置
3.树形结构,defau-checked-keys改变，视图不会随着数据的更新而更新，解决方式在tree渲染后执行setCheckedKeys方法，重新设置选中状态节点

#### 问题
1.使用elementplus在标签中设置boolean是直接写会报错，此时需要给该属性设置v-bind
2.表格展开后对其进行操作展开自动闭合，el-table设置row-key