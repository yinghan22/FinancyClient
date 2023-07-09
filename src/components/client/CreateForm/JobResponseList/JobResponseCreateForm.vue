<template>
  <el-form
      ref="form_ref"
      :model="form"
      :rules="create_rules"
      label-position="top"
      status-icon
  >
    <table class="w-100">
      <tr>
        <td>
          <el-form-item label="申请人" prop="requester" required>
            <el-select v-model="form.requester" disabled filterable>
              <el-option
                  v-for="item in store.getters['user_list']"
                  :label="item.id + ' - ' + item.name"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="部门" prop="dept_id" required>
            <el-select v-model="form['dept_id']" disabled filterable>
              <el-option
                  v-for="item in store.getters['dept_list']"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-form-item label="职责概述" prop="abstract" required>
            <el-input
                v-model.trim="form.abstract"
                type="textarea"
            ></el-input>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-form-item
              label="职责内容描述"
              prop="detail"
              required
          >
            <el-input
                v-model.trim="form.detail"
                type="textarea"
            ></el-input>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td>
          <el-form-item
              label="经办人"
              prop="operator_id"
              required
          >
            <el-select v-model="form['operator_id']" filterable>
              <el-option
                  v-for="item in store.getters['user_list']"
                  :label="item.id + ' - ' + item.name"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </td>
        <td>
          <el-form-item
              label="责任领导"
              prop="leader_id"
              required
          >
            <el-select v-model="form['leader_id']" filterable>
              <template v-for="item in store.getters['user_list']">
                <el-option
                    :label="item.id + ' - ' + item.name"
                    :value="item.id"
                ></el-option>
              </template>

            </el-select>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-form-item label="备注">
            <el-input
                v-model.trim="form.comm"
                type="textarea"
            ></el-input>
          </el-form-item>
        </td>
      </tr>
    </table>
    <el-form-item>
      <div
          style="
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: flex-end;
				"
      >
        <el-button type="primary" @click="create_data(form_ref)"
        >确认
        </el-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type {FormInstance, FormRules} from 'element-plus';
import {ElMessage} from 'element-plus';
import {reactive, ref} from 'vue';
import $$ from '../../../../axios';
import {useStore} from 'vuex';
import now_datetime from '../../../../utils/now.js';

const store = useStore();
const props = defineProps({
  success: {
    type: Function,
    required: true,
    default: () => {
    },
  },
});

const form_ref = ref<FormInstance>();
const form = reactive({
  dept_id: store.getters['userinfo'].dept_id,
  requester: store.getters['userinfo'].id,
  abstract: '',
  detail: '',
  operator_id: '',
  leader_id: '',
  comm: '',
  status: 0,
  refuse_reason: '',
});
const create_rules = reactive<FormRules>({
  department_id: [
    {required: true, message: '该选项不得为空', trigger: 'blur'},
  ],
  abstract: [
    {required: true, message: '该选项不得为空', trigger: 'blur'},
  ],
  detail: [
    {required: true, message: '该选项不得为空', trigger: 'blur'},
  ],
  operator_id: [
    {required: true, message: '该选项不得为空', trigger: 'blur'},
  ],
  leader_id: [
    {required: true, message: '该选项不得为空', trigger: 'blur'},
  ],
  status: [
    {required: true, message: '该选项不得为空', trigger: 'blur'},
  ],
  requester: [
    {required: true, message: '该选项不得为空', trigger: 'blur'},
  ],
});

const status = form.status;
let request_time = false;
let approve_time = false;

const status_change = (e) => {
  if (status === 0 && e === 1) {
    request_time = true;
  } else if (status === 1 && e !== 0 && e !== 1) {
    approve_time = true;
  }
};

const create_data = (form_el: FormInstance | undefined) => {
  if (!form_el) return;
  form_el.validate((valid) => {
    if (valid) {
      store.commit('loading', true);
      let form_data = new FormData();
      {
        form_data.set('dept_id', form.dept_id);
        form_data.set('detail', form.detail);
        form_data.set('operator_id', form.operator_id);
        form_data.set('leader_id', form.leader_id);
        form_data.set('comm', form.comm);
        form_data.set('abstract', form.abstract);

        form_data.set('requester', form.requester);
        form_data.set('status', JSON.stringify(form.status));

        if (request_time) {
          form_data.set('request_time', now_datetime());
        }
        if (approve_time) {
          form_data.set('approve_time', now_datetime());
        }
      }
      $$.post('/job', form_data)
          .then((res) => {
            store.commit('loading', false);
            if (res.data.status === 200) {
              props.success();
            } else {
              ElMessage({
                type: 'error',
                message: res.data.message,
              });
            }
          })
          .catch((res) => {
            store.commit('loading', false);
            ElMessage({
              type: 'error',
              message: res,
            });
          });
    }
  });
};
</script>

<style lang="scss" scoped></style>
