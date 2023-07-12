<template>
  <Card>
    <template #header>
      <div style="display: flex;justify-content: space-between;align-content: center;align-items: center;">
        <p>公用经费预算</p>
        <el-button-group size="small">
          <el-button type="primary" @click="create_budget_visible = true">新增</el-button>
        </el-button-group>
      </div>
    </template>
    <template #content>
      <el-table :data="data_list" height="100%">
        <el-table-column fixed type="expand">
          <template #default="scope">
            <table class="detail">
              <tr>
                <th>差异说明</th>
                <td>{{ scope.row.diff_reason }}</td>
              </tr>
              <tr>
                <th>备注</th>
                <td>{{ scope.row.comm }}</td>
              </tr>
              <tr>
                <th>详细测算过程</th>
                <td>{{ scope.row.detail }}</td>
              </tr>
              <tr>
                <th>申请人</th>
                <td>{{ scope.row.requester_name }}</td>
              </tr>
              <tr>
                <th>审核小组</th>
                <td>{{ scope.row.applicant_tag }}</td>
              </tr>
              <tr>
                <th>申请时间</th>
                <td>{{ scope.row.request_time }}</td>
              </tr>
              <tr>
                <th>审核时间</th>
                <td>{{ scope.row.approve_time }}</td>
              </tr>
              <tr v-if="scope.row.status == 3">
                <th>驳回原因</th>
                <td>{{ scope.row.refuse_reason }}</td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column label="经济类型" prop="eco_class_name"></el-table-column>
        <el-table-column label="预算金额(元)" prop="budget_price"></el-table-column>
        <el-table-column label="衔接业务单编码" prop="aebp_id"></el-table-column>
        <el-table-column label="上年度本业务实际支出(元)" prop="actual_cost"></el-table-column>
        <el-table-column label="填报人" prop="requester_name"></el-table-column>
        <el-table-column align="center" label="审核状态">
          <template #default="scope">
            <el-text v-if="scope.row.status == 0" type="primary">待申请审核</el-text>
            <el-text v-else-if="scope.row.status == 1" type="warning">待审核</el-text>
            <el-text v-else-if="scope.row.status == 2" type="success">审核通过</el-text>
            <el-text v-else-if="scope.row.status == 3" type="danger">审核驳回</el-text>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button-group size="small">
              <el-button size="small" type="primary" @click="detail(scope.row)">详情</el-button>
              <el-button v-if="scope.row.status == 0" size="small" type="warning" @click="approve(scope.row.id)">
                提请审核
              </el-button>
              <!--              <el-button v-if="[0, 3].indexOf(scope.row.status) > -1" size="small" type="danger">编辑</el-button>-->
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
  <el-drawer v-model="create_budget_visible" size="90%" title="新增预算报表">
    <CreateForm></CreateForm>
  </el-drawer>
  <el-drawer v-model="detail_budget_visible"
             destroy-on-close
             direction="rtl"
             size="60%"
             title="预算详情（只读）"
             @closed="close_drawer">
    <DetailBudget :aebp="detail_aebp" :awp="detail_awp" :budget="detail_budget" :job_resp="detail_job_resp"
                  :per_goal="detail_per_goal"></DetailBudget>
  </el-drawer>
</template>

<script lang="ts" setup>
import Card from '../../Card.vue'
import {onMounted, reactive, ref} from 'vue'
import $$ from '../../../axios'
import {useStore} from 'vuex'
import {ElMessage} from 'element-plus'
import DetailBudget from './detail.vue'
import CreateForm from '../CreateForm/index.vue'

const store = useStore()
const data_list = ref([])
const page_info = reactive({
  curr_page: 1,
  page_size: 10,
  total: 1,
})

const get_data = (e) => {
  store.commit('loading', true)
  const url = `/budget/-1/?current_page=${e}&page_size=${page_info.page_size}`
  $$.get(url, {
    params: {
      select_by: JSON.stringify(['requester']),
      select: JSON.stringify({
        requester: store.getters['userinfo'].id,
        applicant_id: store.getters['user_group'],
      }),
    },
  }).then(res => {

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
  }).catch(res => {
    store.commit('loading', false)
    ElMessage({
      type: 'error',
      message: res,
    })
  })
}

onMounted(() => {
  store.dispatch('eco_list', {keyword: ''})
})
const detail_budget = ref({})
const detail_job_resp = ref({})
const detail_aebp = ref({})
const detail_awp = ref({})
const detail_per_goal = ref({})
const create_budget_visible = ref(false)
const detail_budget_visible = ref(false)

const budget_status = ref<boolean>(false)
const aebp_status = ref<boolean>(false)
const awp_status = ref<boolean>(false)
const job_resp_status = ref<boolean>(false)
const per_goal_status = ref<boolean>(false)

async function get_job_resp (job_resp_code, cb: Function) {
  let response = await $$.get(`/job/id/${job_resp_code}`)
  if (response.data.status === 200) {
    detail_job_resp.value = response.data.data[0]
    job_resp_status.value = true
    cb()
  }
}

async function get_per_goal (per_goal_code, cb: Function) {
  let response = await $$.get(`/goal/id/${per_goal_code}`)
  if (response.data.status === 200) {
    detail_per_goal.value = response.data.data[0]
    per_goal_status.value = true
    cb()
  }
}

async function get_awp (awp_id, cb: Function) {
  let response = await $$.get(`/awp/code/${awp_id}`)
  if (response.data.status === 200) {
    detail_awp.value = response.data.data[0]
    awp_status.value = true
    await get_per_goal(detail_awp.value['per_goal_id'], cb)
    await get_job_resp(detail_awp.value['job_resp_id'], cb)
    cb()
  }
}

async function get_aebp (aebp_id, cb: Function) {
  let response = await $$.get(`/aebp/code/${aebp_id}`)
  if (response.data.status === 200) {
    detail_aebp.value = response.data.data[0]
    aebp_status.value = true
    await get_awp(detail_aebp.value['annual_work_plan_id'], cb)
    cb()
  }
}

const detail = async (budget) => {
  store.commit('loading', true)
  detail_budget.value = budget
  budget_status.value = true
  await get_aebp(budget['aebp_id'], () => {
    if (budget_status.value && aebp_status.value && awp_status.value && job_resp_status.value && per_goal_status.value) {
      store.dispatch('loading', {status: false})
      detail_budget_visible.value = true
    }
  })
}

const close_drawer = () => {
  budget_status.value = false
  aebp_status.value = false
  awp_status.value = false
  job_resp_status.value = false
  per_goal_status.value = false
}

if (data_list.value.length === 0) {
  get_all_approve(1)
}
const page_to = (curr_page) => {
  get_all_approve(curr_page)
}

function get_all_approve (curr_page) {
  store.commit('loading', true)
  $$.get(`/budget/requester/${store.getters['userinfo'].id}?reverse=1&page_size=${page_info.page_size}&current_page=${curr_page}`).then(res => {
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
  }).catch(res => {
    store.commit('loading', false)
    ElMessage({
      type: 'error',
      message: res,
    })
  })
}

function approve (budget_id) {
  store.commit('loading', true)
  let form_data = new FormData()
  form_data.set('status', '1')
  $$.put(`/budget/approve/${budget_id}`, form_data).then(res => {
    store.commit('loading', false)
    if (res.data.status == 200) {
      ElMessage.success('申请审核成功，请等待审核结果')
      get_all_approve(page_info.curr_page)
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
</style>