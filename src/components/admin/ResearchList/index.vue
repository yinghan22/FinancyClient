<template>
  <Card>
    <template #header>
      <div style="display: flex;justify-content: space-between;align-content: center;align-items: center;">
        <p>教学活动统计</p>
        <el-button-group size="small">
          <el-button type="primary" @click="create_visible = true">新增</el-button>
        </el-button-group>
      </div>
    </template>
    <template #content>
      <el-table :data="data_list" height="100%">
        <el-table-column fixed type="expand">
          <template #default="scope">
            <table class="detail">
              <tr>
                <th>备注</th>
                <td>{{ scope.row.comm }}</td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column label="部门名称" prop="dept_name"></el-table-column>
        <el-table-column label="统计年度" prop="year"></el-table-column>

        <el-table-column label="省级科研项目数量" prop="province_research_num"></el-table-column>
        <el-table-column label="省级科研经费（万元）" prop="province_research_fund"></el-table-column>
        <el-table-column label="省级重点实验室数量" prop="province_key_lab_num"></el-table-column>
        <el-table-column label="省级科研获奖数量" prop="province_reward_num"></el-table-column>
        <el-table-column label="国家级科研项目数量" prop="nation_research_num"></el-table-column>
        <el-table-column label="国家级科研经费（万元）" prop="nation_research_fund"></el-table-column>

        <el-table-column label="国家级重点实验室数量" prop="nation_key_lab_num"></el-table-column>
        <el-table-column label="国家级科研获奖数量" prop="nation_reward_num"></el-table-column>
        <el-table-column label="横向科研项目经费（万元）" prop="fund_total"></el-table-column>


        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button-group size="small">
              <el-button type="primary" @click="data_edit(scope.$index)">编辑</el-button>
              <el-button type="danger" @click="data_delete_confirm(scope.$index)">删除</el-button>
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
    <ResearchCreateForm :dept_list="dept_list" :success="create_success"></ResearchCreateForm>
  </el-dialog>
  <!--  编辑  -->
  <el-dialog v-model="edit_visible" :closed="get_data(page_info.curr_page)" destroy-on-close title="编辑">
    <ResearchEditForm :dept_list="dept_list" :form="data_list[data_index]"
                      :success="edit_success"></ResearchEditForm>
  </el-dialog>
</template>

<script lang="ts" setup>
import Card from '../../Card.vue'
import {reactive, ref} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import $$ from '../../../axios'
import ResearchCreateForm from './ResearchCreateForm.vue'
import ResearchEditForm from './ResearchEditForm.vue'
import {useStore} from 'vuex'

const store = useStore()
const data_list = ref([])

const page_info = reactive({
  curr_page: 1,
  page_size: 20,
  total: 0,
})
const data_index = ref(0)
const edit_visible = ref(false)
const create_visible = ref(false)

const dept_list = ref([])

if (dept_list.value.length == 0) {
  $$.get('/dept').then(res => {
    dept_list.value = res.data.data
  })
}

if (data_list.value.length === 0) {
  get_data(1)
}

const page_to = (index) => {
  get_data(index)
}

function get_data (curr_page) {
  store.commit('loading', true)
  const url = `/research?reverse=1&current_page=${curr_page}&page_size=${page_info.page_size}`
  $$.get(url)
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

const data_edit = (index) => {
  data_index.value = index
  edit_visible.value = true
}
const edit_success = () => {
  edit_visible.value = false
  get_data(page_info.curr_page)
}
const create_success = () => {
  create_visible.value = false
  get_data(page_info.curr_page)
}

function data_delete_confirm (index) {
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
  $$.delete(`/research/` + data_list.value[index]['id'])
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
      }).catch(res => {
    ElMessage({
      type: 'error',
      message: res,
    })
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
</style>