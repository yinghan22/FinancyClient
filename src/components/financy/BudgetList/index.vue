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
                <th>审批小组</th>
                <td>{{ scope.row.applicant_tag }}</td>
              </tr>
              <tr>
                <th>申请时间</th>
                <td>{{ scope.row.request_time }}</td>
              </tr>
              <tr>
                <th>审批时间</th>
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
        <el-table-column label="经济类型" prop="eco_name"></el-table-column>
        <el-table-column label="预算金额(元)" prop="budget_price"></el-table-column>
        <el-table-column label="衔接业务单编码" prop="aebp_id"></el-table-column>
        <el-table-column label="上年度本业务实际支出(元)" prop="actual_cost"></el-table-column>
        <el-table-column label="填报人" prop="requester_name"></el-table-column>
        <el-table-column align="center" label="审批状态">
          <template #default="props">
            <el-text v-if="props.row.status == 0" type="primary">待申请审批</el-text>
            <el-text v-else-if="props.row.status == 1" type="warning">待审批</el-text>
            <el-text v-else-if="props.row.status == 2" type="success">审批通过</el-text>
            <el-text v-else-if="props.row.status == 3" type="danger">审批驳回</el-text>
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
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import Card from '../../Card.vue';
import {ElMessage} from 'element-plus';
import $$ from '../../../axios';
import {useStore} from 'vuex';

const store = useStore();
const data_list = ref([]);
const page_info = reactive({
  curr_page: 1,
  total: 10,
  page_size: 14,
});

const page_to = (curr_page) => {
  get_data(curr_page);
};

if (data_list.value.length === 0) {
  get_data(1);
}

function get_data(curr_page) {
  const url = `/budget/-1?reverse=1&current_page=${curr_page}&page_size=${page_info.page_size}`;
  $$.get(url)
      .then(res => {
        if (res.data.status === 200) {
          data_list.value = res.data.data;
          page_info.page_size = res.data.page_info.page_size;
          page_info.total = res.data.page_info.total;
        } else {
          ElMessage({
            type: 'error',
            message: res.data.message,
          });
        }
      })
      .catch(res => {
        ElMessage({
          type: 'error',
          message: res,
        });
      });
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