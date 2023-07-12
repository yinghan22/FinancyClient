<template>
  <el-container>
    <el-header>
      <el-menu
          :ellipsis="false"
          class="el-menu-demo"
          mode="horizontal"
      >
        <h3 style="padding-left: 20px;">周口师范学院财务预算管理系统</h3>
        <div class="flex-grow-1"/>
        <template v-if="store.getters['userinfo'] != null">
          <el-dropdown size="small" style="padding-right: 20px;" trigger="click">
            <span class="el-dropdown-link"
                  style="display: flex;justify-content: center;align-content: center;align-items: center;font-size: 1rem;">
                            {{ store.getters['userinfo'].name }}
              <el-icon class="el-icon--right">
                <arrow-down/>
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="reset_pass">修改密码</el-dropdown-item>
                <el-dropdown-item divided @click="store.dispatch('logout', {success(){
                            router.push('/login')
                        }})">退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-menu>
    </el-header>
    <el-main v-loading="store.getters['loading']">
      <router-view></router-view>
    </el-main>
    <el-dialog v-model="reset_pass_visible" title="修改密码">
      <ResetPass :success="reset_pass_success"></ResetPass>
    </el-dialog>
  </el-container>
</template>

<script lang="ts" setup>
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

import {ArrowDown} from '@element-plus/icons-vue'
import {Base64} from 'js-base64'
import {onMounted, ref} from 'vue'
import ResetPass from './components/ResetPass/index.vue'
import {ElMessage} from 'element-plus'

const store = useStore()
const router = useRouter()
const token = localStorage.getItem('token')
if (token) {
  store.commit('loading', true)
  let temp = Base64.decode(localStorage.getItem('au-token'))
  let info = temp.split('&')
  store.dispatch('login', {
    id: info[0],
    password: info[1],
    success () {
      router.push(`/${store.getters['userinfo'].usertype}`)
    },
    error () {
    },
    finally () {
      store.commit('loading', false)
    },
  })
} else {
  router.push({path: '/login'})
}

const reset_pass_visible = ref(false)

function reset_pass () {
  reset_pass_visible.value = true
}

function reset_pass_success () {
  reset_pass_visible.value = false
}

onMounted(() => {
  let userAgent = navigator.userAgent
  if (userAgent.includes('Firefox') || userAgent.indexOf('Firefox') > -1 || !userAgent.includes('Chrome')) {
    ElMessage({
      type: 'error',
      dangerouslyUseHTMLString: true,
      message: '当前浏览器可能存在兼容问题，数据显示可能会出现异常<br />请更换Chromium内核浏览器：Microsoft Edge、Google Chrome、Chromium、Vivaldi、Brave等',
      duration: 7000,
    })
  }
})
</script>


<style scoped>
.el-header {
  padding: 0;
}

.el-main {
  padding-top: 5px;
  padding-bottom: 5px;
  flex: 1;
}
</style>
