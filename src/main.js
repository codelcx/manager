import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/css/base.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as icon from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
// import ElTreeGrid from 'element-tree-grid'
// app.component(ElTreeGrid.name,ElTreeGrid)

if (process.env.NODE_ENV === 'development') require('./mock/mock.js');

const app = createApp(App)
Object.keys(icon).forEach(key => {
  app.component(key,icon[key])
})

app.config.globalProperties.$messsage = ElMessage;
app.use(router)
app.use(ElementPlus)
app.mount('#app')
