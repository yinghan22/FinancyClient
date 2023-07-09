<template>
  <Card>
    <template #header>
      <div style="display: flex;justify-content: space-between;align-content: center;align-items: center;">
        <p>用户管理</p>
        <el-button-group size="small">
          <el-button type="primary" @click="create_visible = true">新增</el-button>
        </el-button-group>
      </div>
    </template>
    <template #content>
      <el-table :data="data_list" height="100%">
        <el-table-column label="工号" prop="id"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="职位" prop="job_title"></el-table-column>
        <el-table-column label="职称" prop="pro_title"></el-table-column>
        <el-table-column label="部门" prop="dept_name"></el-table-column>
        <el-table-column label="用户类型">
          <template #default="scope">
            {{ usertype_map[scope.row.usertype] }}
          </template>
        </el-table-column>

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
    <UserCreateForm :dept_list="dept_list" :success="create_success" :usertype_map="usertype_map"
                    @closed="get_data(page_info.curr_page)"></UserCreateForm>
  </el-dialog>

  <!--  编辑  -->
  <el-dialog v-model="edit_visible" :closed="get_data(page_info.curr_page)" destroy-on-close title="编辑"
             width="50%">
    <UserEditForm :dept_list="dept_list"
                  :form="data_list[data_index]" :success="edit_success"
                  :usertype_map="usertype_map">
    </UserEditForm>
  </el-dialog>
</template>

<script lang="ts" setup>
import Card from '../../Card.vue';
import {reactive, ref} from 'vue';
import $$ from '../../../axios';
import {useStore} from 'vuex';
import {ElMessage, ElMessageBox} from 'element-plus';
import UserCreateForm from './UserCreateForm.vue';
import UserEditForm from './UserEditForm.vue';

const store = useStore();
const usertype_map = {
  'admin': '管理员',
  'financy': '财务处',
  'expert': '专家',
  'client': '普通用户',
};

const data_index = ref(0);
const page_info = reactive({
  curr_page: 1,
  page_size: 20,
  total: 0,
});

const data_list = ref([]);
const dept_list = ref([]);

if (dept_list.value.length == 0) {
  $$.get('/dept/-1').then(res => {
    dept_list.value = res.data.data;
  });
}

const page_to = (e) => {
  get_data(e);
};

function get_data(e) {
  store.commit('loading', true);
  const url = `/user/-1?current_page=${e}&page_size=${page_info.page_size}`;
  $$.get(url).then(res => {

    store.commit('loading', false);
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
  }).catch(res => {
    store.commit('loading', false);
    ElMessage({
      type: 'error',
      message: res,
    });
  });
}

if (data_list.value.length === 0) {
  get_data(1);
}

const edit_visible = ref(false);
const edit_success = () => {
  edit_visible.value = false;
  get_data(page_info.curr_page);
};

function data_edit(index) {
  data_index.value = index;
  edit_visible.value = true;
}

const create_visible = ref(false);


const create_success = () => {
  debugger
  create_visible.value = false;
  get_data(page_info.curr_page);
};

function data_delete_confirm(index) {
  ElMessageBox.confirm(
      '是否确认删除？',
      '危险操作', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning',
      },
  ).then(res => {
    data_delete(index);
  }).catch(res => {
    ElMessage({
      type: 'info',
      message: '操作已取消',
    });
  });

}

function data_delete(index) {
  if (data_list.value[index]['id'] === store.getters['userinfo']['id']) {
    ElMessage({
      type: 'warning',
      message: '此账号为当前登录的账号，不可删除',
    });
    return;
  }

  const url = `/user/` + data_list.value[index]['id'];
  $$.delete(url)
      .then(res => {
        if (res.data.status === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功',
          });
          get_data(page_info.curr_page);
        } else {
          ElMessage({
            type: 'error',
            message: `删除失败 ${res.data.message}`,
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

</style>