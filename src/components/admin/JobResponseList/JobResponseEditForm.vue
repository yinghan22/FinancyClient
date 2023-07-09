<template>
  <el-form
      ref="form_ref"
      :model="form"
      :rules="create_rules"
      label-position="top"
      label-width="160px"
      status-icon
  >
    <div style="display: flex; flex-direction: column">
      <div style="display: flex; flex-direction: row">
        <div>
          <table style="width: 100%">
            <tr>
              <td>
                <el-form-item label="职责编号" prop="code">
                  <el-input
                      v-model="form['code']"
                      readonly
                  ></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item
                    label="部门"
                    prop="dept_id"
                    required
                >
                  <el-select v-model="form['dept_id']" filterable>
                    <el-option
                        v-for="item in store.getters[
												'dept_list'
											]"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item
                    label="职责概述"
                    prop="abstract"
                    required
                >
                  <el-input
                      v-model.trim="form['abstract']"
                      type="textarea"
                  ></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item
                    label="职责内容描述"
                    prop="detail"
                    required
                >
                  <el-input
                      v-model.trim="form['detail']"
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
                        v-for="item in store.getters[
												'user_list'
											]"
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
                    <el-option
                        v-for="item in store.getters[
												'user_list'
											]"
                        :label="item.id + ' - ' + item.name"
                        :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <el-form-item label="备注">
                  <el-input
                      v-model.trim="form['comm']"
                      type="textarea"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </div>
        <div>
          <table>
            <tr>
              <td>
                <el-form-item label="填报人">
                  <el-input v-model="form['requester']" readonly></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item
                    label="审批小组"
                    prop="applicant_id"
                    required
                >
                  <el-select v-model="form['applicant_id']" filterable>
                    <el-option v-for="item in store.getters['expert_group']"
                               :label="item['id'] + ' - ' + item['tag']"
                               :value="item['id']"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <el-form-item
                  label="审批状态"
                  prop="status"
                  required
              >
                <el-select v-model="form['status']"
                           filterable
                           @change="status_change"
                >
                  <el-option
                      v-for="(item, index) in store.getters[
											'approve_status_list'
										]"
                      :label="item"
                      :value="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </tr>
            <tr v-if="form['status'] == 3">
              <td>
                <el-form-item
                    :required="form['status'] == 3"
                    label="审批驳回原因"
                    prop="refuse_reason"
                >
                  <el-input
                      v-model="form['refuse_reason']"
                      type="textarea"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <el-form-item>
      <div
          style="
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: flex-end;
				"
      >
        <el-button type="primary" @click="update_data(form_ref)"
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
import $$ from '../../../axios';
import {useStore} from 'vuex';
import now_datetime from '../../../utils/now.js';

const store = useStore();
const props = defineProps({
  form: {
    type: Object,
    required: true,
    default: {
      id: '',
      code: '',
      department_id: '',
      abstract: '',
      detail: '',
      operator_id: '',
      leader_id: '',
      comm: '',
      status: 0,
      requester: '',
      applicant_id: '',
      refuse_reason: '',
    },
  },
  success: {
    type: Function,
    required: true,
    default: () => {
    },
  },
});

const status = props.form.status;
let request_time = false;
let approve_time = false;

const status_change = (e) => {
  if (status == 0 && e == 1) {
    request_time = true;
  } else if (status == 1 && e != 0 && e != 1) {
    approve_time = true;
  }
};

const form_ref = ref<FormInstance>();
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
  comm: [{required: true, message: '该选项不得为空', trigger: 'blur'}],
  status: [
    {required: true, message: '该选项不得为空', trigger: 'blur'},
  ],
  requester: [
    {required: true, message: '该选项不得为空', trigger: 'blur'},
  ],
  applicant_id: [
    {required: true, message: '该选项不得为空', trigger: 'blur'},
  ],
  refuse_reason: [
    {required: true, message: '该选项不得为空', trigger: 'blur'},
  ],
});

const update_data = (form_el: FormInstance | undefined) => {
  if (!form_el) return;
  form_el.validate((valid) => {
    if (valid) {
      store.commit('loading', true);
      let form_data = new FormData();
      {
        form_data.set('detail', props.form.detail);
        form_data.set('department_id', props.form.department_id);
        form_data.set('operator_id', props.form.operator_id);
        form_data.set('leader_id', props.form.leader_id);
        form_data.set('comm', props.form.comm);
        form_data.set('abstract', props.form.abstract);

        form_data.set('status', JSON.stringify(props.form.status));
        form_data.set('requester', props.form.requester);
        form_data.set('applicant_id', props.form.applicant_id);
        form_data.set('refuse_reason', props.form.refuse_reason);

        if (request_time) {
          form_data.set('request_time', now_datetime());
        }
        if (approve_time) {
          form_data.set('approve_time', now_datetime());
        }
      }
      $$.put(`/job/${props.form.id}`, form_data)
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
