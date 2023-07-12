<template>
  <div>
    <h3>当前分组信息</h3>
    <table>
      <tr>
        <th>分组名称</th>
        <td>{{ data.name }}</td>
      </tr>
      <tr>
        <th>分组详情</th>
        <td>{{ data.detail }}</td>
      </tr>
    </table>
    <el-form>
      <table>
        <tr>
          <td>
            <el-form-item>
              <el-select v-model="form.expert_id" filterable>
                <el-option
                    v-for="item in store.getters['user_list']"
                    :label="item.id + ' - '+item.name + ' - ' + usertype_map[item.usertype]"
                    :value="item.id"></el-option>
              </el-select>
              <el-button type="primary" @click="add_member(form_ref)">确认添加</el-button>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-table :data="data['member']" height="180px">
              <el-table-column label="工号" prop="expert_id"></el-table-column>
              <el-table-column label="姓名" prop="name"></el-table-column>
              <el-table-column label="操作">
                <template #default="prop">
                  <el-button size="small" type="danger" @click="remove_member(prop.row.id)">删除成员
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </td>
        </tr>
      </table>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import $$ from '../../../axios'
import {ElMessage, FormInstance} from 'element-plus'
import {useStore} from 'vuex'

const store = useStore()
const props = defineProps({
  group_id: Number,
})
const usertype_map = {
  'admin': '管理员',
  'finance': '财务处',
  'expert': '专家',
  'client': '普通用户',
}
const form = reactive({
  expert_id: '',
})
const data = ref({
  name: '',
  detail: '',
  member: [],
})

if (data.value) {
  get_data()
}
const form_ref = ref<FormInstance>()

function get_data () {
  $$.get(`/group/id/${props.group_id}`)
      .then(res => {
        if (res.data.status === 200) {
          data.value = res.data.data[0]
        }
      }).catch(res => {
    ElMessage({type: 'error', message: res})
  })
}

function add_member (form_el: FormInstance | undefined) {
  store.commit('loading', true)
  if (form.expert_id.trim() == '') {
    return ElMessage({
      type: 'error',
      message: '请选择用户',
    })
  }
  let form_data = new FormData()
  {
    form_data.set('group_id', JSON.stringify(props.group_id))
    form_data.set('expert_id', form.expert_id)
  }
  if (data.value['member']) {
    for (let item of data.value['member']) {
      if (item.id == form.expert_id) {
        ElMessage({
          type: 'error',
          message: '当前分组已存在该用户，请勿重复添加！',
        })
        store.commit('loading', false)
        return
      }
    }
  }
  $$.post(`/expert_group`, form_data)
      .then(res => {
        store.commit('loading', false)
        if (res.data.status === 200) {
          get_data()
        } else {
          ElMessage({type: 'error', message: res.data.message})
        }
      })
      .catch(res => {
        store.commit('loading', false)
        ElMessage({type: 'error', message: res})
      })
}

const remove_member = (expert_group_id) => {
  debugger
  $$.delete(`/expert_group/${expert_group_id}`)
      .then(res => {
        if (res.data.status === 200) {
          ElMessage({
            type: 'success',
            message: '成功移除成员',
          })
          get_data()
        } else {
          ElMessage({
            type: 'error',
            message: res.data.message,
          })
        }
      }).catch(res => {
    ElMessage({
      type: 'error',
      message: res,
    })
  })
}

</script>

<style lang="scss" scoped>
</style>