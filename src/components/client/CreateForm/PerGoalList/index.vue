<template>
  <Card>
    <template #header>
      <div style="display: flex;justify-content: space-between;align-content: center;align-items: center;">
        <p>绩效指标</p>
        <el-button-group size="small">
          <el-button type="primary" @click="create_visible = true">新增</el-button>
        </el-button-group>
      </div>
    </template>
    <template #content>
      <el-table :data="data_list" height="100%">
        <el-table-column fixed type="expand">
          <template #default="props">
            <table class="detail">
              <tr>
                <th>附件</th>
                <td>
                  <ol style="margin: 0;padding: 0 1rem;">
                    <li v-for="item in props.row.file_list">
                      <a :href="Config.base_url + '/' + item.path" class="file_href"
                         style="color: #000;"
                         target="_blank">
                        {{ item.name }}
                      </a>
                    </li>
                  </ol>
                </td>
              </tr>
              <tr>
                <th>指标来源</th>
                <td>{{ props.row.source }}</td>
              </tr>
              <tr>
                <th>备注</th>
                <td>{{ props.row.comm }}</td>
              </tr>
              <tr>
                <th>申请人</th>
                <td>{{ props.row.requester_name }}</td>
              </tr>
              <tr>
                <th>审批小组</th>
                <td>{{ props.row.applicant_tag }}</td>
              </tr>
              <tr>
                <th>申请时间</th>
                <td>{{ props.row.request_time }}</td>
              </tr>
              <tr>
                <th>审批时间</th>
                <td>{{ props.row.approve_time }}</td>
              </tr>
              <tr v-if="props.row.status == 3">
                <th>驳回原因</th>
                <td>{{ props.row.refuse_reason }}</td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column label="绩效编码" prop="code" width="130rem"></el-table-column>

        <el-table-column label="一级指标" prop="quota_1"></el-table-column>
        <el-table-column label="二级指标" prop="quota_2"></el-table-column>
        <el-table-column label="三级指标" prop="quota_3"></el-table-column>
        <el-table-column label="指标值" prop="quota_value"></el-table-column>
        <el-table-column label="申请者" width="130rem">
          <template #default="props">
            {{ props.row.requester }} - {{ props.row.requester_name }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="审批状态">
          <template #default="props">
            <el-text v-if="props.row.status == 0" type="primary">待申请审批</el-text>
            <el-text v-else-if="props.row.status == 1" type="warning">待审批</el-text>
            <el-text v-else-if="props.row.status == 2" type="success">审批通过</el-text>
            <el-text v-else-if="props.row.status == 3" type="danger">审批驳回</el-text>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button-group size="small">
              <el-button v-if="scope.row.status == 0" type="warning" @click="approve(scope.row.id)">
                提请审核
              </el-button>
              <el-button :disabled="scope.row.status != 0 && scope.row.status != 3" title="待审批禁止编辑"
                         type="primary"
                         @click="data_edit(scope.$index)">编辑
              </el-button>
              <el-button :disabled="scope.row.status != 0" type="danger" @click="data_delete_confirm(scope.$index)">
                删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #footer>
      <el-pagination
          v-model:current-page="page_info.curr_page"
          :page-size="page_info.page_size"
          :total="page_info.total"
          layout="total, prev, pager, next"
          @current-change="page_to"
      />
    </template>
  </Card>
  <!--  新增  -->
  <el-dialog v-model="create_visible" destroy-on-close title="新增">
    <PerGoalCreateForm :success="create_success" width="90%">
    </PerGoalCreateForm>
  </el-dialog>
  <!--  编辑  -->
  <el-dialog v-model="edit_visible" :closed="get_data(page_info.curr_page)" destroy-on-close
             title="编辑">
    <PerGoalEditForm :form="data_list[data_index]" :success="edit_success"></PerGoalEditForm>
  </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import Card from '../../../Card.vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import $$ from '../../../../axios'
import PerGoalCreateForm from './PerGoalCreateForm.vue'
import PerGoalEditForm from './PerGoalEditForm.vue'
import Config from '../../../../Config.js'
import {useStore} from 'vuex'

const status_list = ref({
  0: '待申请',
  1: '待审批',
  2: '审批通过',
  3: '审批驳回',
})
const store = useStore()
const data_list = ref([])
const page_info = reactive({
  curr_page: 1,
  total: 10,
  page_size: 10,
})
const data_index = ref(0)
const edit_visible = ref(false)

const user_list = ref([])
if (user_list.value.length === 0) {
  $$.get('/user/-1').then(res => {
    user_list.value = res.data.data
  })
}

const create_visible = ref(false)

const page_to = (curr_page) => {
  get_data(curr_page)
}

if (data_list.value.length === 0) {
  get_data(1)
}

function get_data (curr_page) {
  store.commit('loading', true)
  const url = `/goal/-1?reverse=1&current_page=${curr_page}&page_size=${page_info.page_size}`
  $$.get(url, {
    params: {
      select_by: JSON.stringify(['requester']),
      select: JSON.stringify({
        requester: [store.getters['userinfo'].id],
      }),
    },
  })
      .then(res => {
        store.commit('loading', false)
        if (res.data.status === 200) {
          data_list.value = res.data.data
          page_info.page_size = res.data.page_info.page_size
          page_info.total = res.data.page_info.total
        } else {
          ElMessage({
            type: 'error',
            message: res.data.message,
          })
        }
      })
      .catch(res => {
        store.commit('loading', false)
        ElMessage({
          type: 'error',
          message: res,
        })
      })
}

const create_success = () => {
  create_visible.value = false
  get_data(page_info.curr_page)
}
const data_edit = (index) => {
  data_index.value = index
  edit_visible.value = true
}

const data_delete_confirm = (index) => {
  ElMessageBox.confirm(
      '是否确认删除？',
      '危险操作', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning',
      },
  ).then(res => {
    data_delete(index)
  }).catch(res => {
    ElMessage({
      type: 'info',
      message: '操作已取消',
    })
  })
}

function data_delete (index) {
  const url = `/goal/` + data_list.value[index]['id']
  $$.delete(url)
      .then(res => {
        if (res.data.status === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
          get_data(page_info.curr_page)
        } else {
          ElMessage({
            type: 'error',
            message: `删除失败 ${res.data.message}`,
          })
        }
      })
      .catch(res => {
        ElMessage({
          type: 'error',
          message: res,
        })
      })
}

const edit_success = () => {
  edit_visible.value = false
  get_data(page_info.curr_page)
}

function approve (id) {
  store.commit('loading', true)
  let form_data = new FormData()
  form_data.set('status', '1')
  $$.put(`/goal/approve/${id}`, form_data).then(res => {
    store.commit('loading', false)
    if (res.data.status == 200) {
      ElMessage.success('申请审核成功，请等待审核结果')
      get_data(page_info.curr_page)
    } else {
      ElMessage.error(res.data.message)
    }
  }).catch(res => {
    store.commit('loading', false)
    ElMessage.error(res)
  })
}
</script>


<style lang="scss" scoped>
.detail {
  width: 100%;
  border-collapse: collapse;

  th {
    width: 5rem;
    vertical-align: top
  }

  th, td {
    padding: 5px 10px;
    text-align: justify;
  }

  td {
    padding-right: 10px;
  }

  tr + tr {
    border-top: 1px solid #DDD;
  }
}

.file_href {
  text-decoration: none;
  display: inline-block;

  padding: 0 0 5px 0;

  &:hover {
    text-decoration: underline;
  }
}


</style>