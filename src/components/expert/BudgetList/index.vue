<template>
  <Card>
    <template #header>
      <div style="display: flex;justify-content: space-between;align-content: center;align-items: center;">
        <p>公用经费预算</p>
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
              <el-button type="primary" @click="approve_budget(scope.row)">审核
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

  <el-drawer
      v-model="approve_visible"
      destroy-on-close
      direction="rtl"
      size="60%"
      title="公用预算经费审核"
  >
    <ApproveForm :aebp="aebp" :awp="awp" :budget="budget" :job_resp="job_resp" :pass="pass"
                 :per_goal="per_goal" :refuse="refuse"></ApproveForm>
  </el-drawer>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import Card from '../../Card.vue'
import {ElMessage} from 'element-plus'
import $$ from '../../../axios'
import ApproveForm from './ApproveForm.vue'
import {useStore} from 'vuex'

const store = useStore()
const data_list = ref([])
const page_info = reactive({
  curr_page: 1,
  total: 10,
  page_size: 14,
})

const budget = ref({})
const aebp = ref({})
const awp = ref({})
const job_resp = ref({})
const per_goal = ref({})

const approve_visible = ref(false)

const expert_belong_group = ref([])

const page_to = (curr_page) => {
  get_data(curr_page)
}

if (data_list.value.length === 0) {
  get_data(1)
}


function get_data (curr_page) {
  // 获取当前专家所在分组，以获取被分配的待审核单
  if (expert_belong_group.value.length === 0) {
    const url = `/budget/-1?reverse=1&current_page=${curr_page}&page_size=${page_info.page_size}`
    $$.get(url, {
      params: {
        select_by: JSON.stringify(['status', 'applicant_id']),
        select: JSON.stringify({
          status: [1, 2, 3],
          applicant_id: store.getters['user_group'],
        }),
      },
    })
        .then(res => {
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
          ElMessage({
            type: 'error',
            message: res,
          })
        })
  }
}

const budget_status = ref<boolean>(false)
const aebp_status = ref<boolean>(false)
const awp_status = ref<boolean>(false)
const job_resp_status = ref<boolean>(false)
const per_goal_status = ref<boolean>(false)

async function get_job_resp (job_resp_code, cb: Function) {
  let response = await $$.get(`/job/id/${job_resp_code}`)
  if (response.data.status == 200) {
    job_resp.value = response.data.data[0]
    job_resp_status.value = true
    cb()
  }
}

async function get_per_goal (per_goal_code, cb: Function) {
  let response = await $$.get(`/goal/id/${per_goal_code}`)
  if (response.data.status == 200) {
    per_goal.value = response.data.data[0]
    per_goal_status.value = true
    cb()
  }
}

async function get_awp (awp_id, cb: Function) {
  let response = await $$.get(`/awp/code/${awp_id}`)
  if (response.data.status === 200) {
    awp.value = response.data.data[0]
    awp_status.value = true
    await get_per_goal(awp.value['per_goal_id'], cb)
    await get_job_resp(awp.value['job_resp_id'], cb)
    cb()
  }
}

async function get_aebp (aebp_id, cb: Function) {
  let response = await $$.get(`/aebp/code/${aebp_id}`)
  if (response.data.status === 200) {
    aebp.value = response.data.data[0]
    aebp_status.value = true
    await get_awp(aebp.value['annual_work_plan_id'], cb)
    cb()
  }
}


const approve_budget = async (item) => {
  store.dispatch('loading', {status: true})
  budget.value = item
  budget_status.value = true
  const aebp_id = budget.value['aebp_id']
  await get_aebp(aebp_id, () => {
    if (budget_status.value && aebp_status.value && awp_status.value && job_resp_status.value && per_goal_status.value) {
      store.dispatch('loading', {status: false})
      approve_visible.value = true
    }
  })
}

const refuse = () => {
  approve_visible.value = false
  budget_status.value = false
  aebp_status.value = false
  awp_status.value = false
  job_resp_status.value = false
  per_goal_status.value = false
  get_data(page_info.curr_page)
}

const pass = () => {
  budget_status.value = false
  aebp_status.value = false
  awp_status.value = false
  job_resp_status.value = false
  per_goal_status.value = false
  approve_visible.value = false
  get_data(page_info.curr_page)
}

onMounted(() => {
  store.dispatch('eco_list', {keyword: ''})
})
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  border-collapse: collapse;

  th {
    width: 5rem;
    vertical-align: top
  }

  th,
  td {
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