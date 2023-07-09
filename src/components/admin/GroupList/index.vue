<template>
  <Card>
    <template #header>
      <div style="display: flex;justify-content: space-between;align-content: center;align-items: center;">
        <p>专家分组</p>
        <el-button-group size="small">
          <!--                    <el-button type="success" @click="export_data">导出</el-button>-->
          <el-button type="primary" @click="create_visible = true">新增</el-button>
        </el-button-group>
      </div>
    </template>
    <template #content>
      <el-table :data="data_list" height="100%" style="width: 100%">
        <el-table-column label="分组名称" prop="name"/>
        <el-table-column label="分组详情" prop="detail"/>
        <el-table-column label="成员" prop="tag"/>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button-group size="small">
              <el-button type="warning" @click="add_group_member(scope.row.id)">添加组成员</el-button>
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
          :total="page_info.total_page"
          layout="total, prev, pager, next"
          @current-change="page_to"
      />
    </template>
  </Card>
  <!--  添加组成员  -->
  <el-dialog v-model="add_visible"
             :closed="get_data(page_info.curr_page)"
             destroy-on-close
             title="新增专家组成员">
    <AddGroupMember :group_id="target_group_id">
    </AddGroupMember>
  </el-dialog>
  <!--  新增  -->
  <el-dialog v-model="create_visible" destroy-on-close title="新增">
    <GroupCreateForm :success="create_success"></GroupCreateForm>
  </el-dialog>
  <!--  编辑  -->
  <el-dialog v-model="edit_visible" :closed="get_data(page_info.curr_page)" destroy-on-close title="编辑">
    <GroupEditForm :form="data_list[data_index]" :success="edit_success"></GroupEditForm>
  </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import Card from '../../Card.vue';
import {ElMessage, ElMessageBox} from 'element-plus';
import $$ from '../../../axios';
import GroupCreateForm from './GroupCreateForm.vue';
import GroupEditForm from './GroupEditForm.vue';
import AddGroupMember from './AddGroupMember.vue';
import {useStore} from 'vuex';

const store = useStore();
const data_list = ref([]);
const page_info = reactive({
  curr_page: 1,
  total_page: 10,
  page_size: 14,
});
const data_index = ref(0);
const edit_visible = ref(false);

const create_visible = ref(false);

const page_to = (curr_page) => {
  get_data(curr_page);
};

if (data_list.value.length === 0) {
  get_data(1);
}

function get_data(curr_page) {
  store.commit('loading', true);
  const url = `/group/-1?current_page=${curr_page}&page_size=${page_info.page_size}`;
  $$.get(url)
      .then(res => {
        store.commit('loading', false);
        if (res.data.status === 200) {
          data_list.value = res.data.data;
          page_info.page_size = res.data.page_info.page_size;
          page_info.total_page = res.data.page_info.total_page;
        } else {
          ElMessage({
            type: 'error',
            message: res.data.message,
          });
        }
      })
      .catch(res => {
        store.commit('loading', false);
        ElMessage({
          type: 'error',
          message: res,
        });
      });
}

const create_success = () => {
  create_visible.value = false;
  get_data(page_info.curr_page);
};
const data_edit = (index) => {
  data_index.value = index;
  edit_visible.value = true;
};

const data_delete_confirm = (index) => {
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
};

function data_delete(index) {
  store.commit('loading', true);
  const url = `/group/` + data_list.value[index]['id'];
  $$.delete(url)
      .then(res => {
        store.commit('loading', true);
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
        store.commit('loading', true);
        ElMessage({
          type: 'error',
          message: res,
        });
      });
}

const edit_success = () => {
  edit_visible.value = false;
  get_data(page_info.curr_page);
};

const add_visible = ref(false);
const target_group_id = ref(0);
const add_group_member = (group_id) => {
  target_group_id.value = group_id;
  add_visible.value = true;
};
</script>

<style lang="scss" scoped>
</style>