<template>
  <el-form ref="form_ref" :model="form" :rules="create_rules" label-position="top" status-icon>
    <table class="w-100">
      <tr>
        <td>
          <el-form-item label="开展月份" required>
            <el-date-picker v-model="form.start_date" type="month"/>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="衔接计划编码" required>
            <el-select v-model="form['annual_work_plan_id']" filterable>
              <el-option v-for="item in store.getters['awp_list']"
                         :label="item.code + ' - ' + item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td>
          <el-form-item label="经济分类" required>
            <el-select v-model="form['eco_class_id']" filterable>

              <el-option-group v-for="item in store.getters['eco_class_list']"
                               :label="item.classify + ' - ' + item.name">
                <el-option v-for="value in store.getters['eco_kind_list'][item.classify]"
                           :label="value.classify + value.kind + ' - ' + value.name" :value="value.id"></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-form-item label="业务经济内容" required>
            <el-input v-model.trim="form.detail" type="textarea"></el-input>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-form-item label="产生支出内容" required>
            <el-input v-model.trim="form.content" type="textarea"></el-input>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-form-item label="上年度是否开展" required>
            <el-radio-group v-model="form['carry_out']">
              <el-radio :label="true">已开展</el-radio>
              <el-radio :label="false">未开展</el-radio>
            </el-radio-group>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-form-item label="备注">
            <el-input v-model.trim="form.comm" type="textarea"></el-input>
          </el-form-item>
        </td>
      </tr>
    </table>


    <el-form-item>
      <div style="width: 100%;height: 100%;display: flex;justify-content: flex-end;">
        <el-button type="primary" @click="create_data(form_ref)">确认</el-button>
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
import Formatter from '../../../../utils/formatter.js';
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
  detail: '',
  start_date: '',
  content: '',
  eco_class_id: '',
  annual_work_plan_id: '',
  carry_out: '',
  comm: '',
  dept_id: store.getters['userinfo'].dept_id,

  status: 0,
  requester: store.getters['userinfo'].id,
});
const create_rules = reactive<FormRules>({
  detail: [{required: true, message: '当前选项不得为空', trigger: 'blur'}],
  start_date: [{required: true, message: '当前选项不得为空', trigger: 'blur'}],
  content: [{required: true, message: '当前选项不得为空', trigger: 'blur'}],
  annual_work_plan_id: [{required: true, message: '当前选项不得为空', trigger: 'blur'}],

  eco_class_id: [{required: true, message: '当前选项不得为空', trigger: 'blur'}],
  dept_id: [{required: true, message: '当前选项不得为空', trigger: 'blur'}],
  status: [{required: true, message: '当前选项不得为空', trigger: 'blur'}],
  requester: [{required: true, message: '当前选项不得为空', trigger: 'blur'}],
});

const status = form.status;
let request_time = false;
let approve_time = false;

const status_change = (e: any) => {
  if (status == 0 && e == 1) {
    request_time = true;
  } else if (status == 1 && e != 0 && e != 1) {
    approve_time = true;
  }
};

const create_data = (form_el: FormInstance | undefined) => {
  if (!form_el) return;
  form_el.validate(valid => {
    if (valid) {
      let form_data = new FormData();
      {
        form_data.set('detail', form.detail);
        form_data.set('start_date', Formatter.format_date(form.start_date));
        form_data.set('content', form.content);
        form_data.set('eco_class_id', form.eco_class_id);
        form_data.set('annual_work_plan_id', form.annual_work_plan_id);
        form_data.set('carry_out', form.carry_out);
        form_data.set('comm', form.comm);
        form_data.set('dept_id', form.dept_id);

        form_data.set('status', JSON.stringify(form.status));
        form_data.set('requester', form.requester);

        if (request_time) {
          form_data.set('request_time', now_datetime());
        }
        if (approve_time) {
          form_data.set('approve_time', now_datetime());
        }
      }
      $$.post('/aebp', form_data)
          .then(res => {
            if (res.data.status === 200) {
              props.success();
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
  });
};
</script>

<style lang="scss" scoped>
</style>