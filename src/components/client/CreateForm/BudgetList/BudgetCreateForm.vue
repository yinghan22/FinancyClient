<template>
  <el-form ref="form_ref" :model="form" :rules="create_rules" label-position="top" status-icon>
    <div class="d-flex flex-row-1">
      <table class="flex-1">
        <tr>
          <td>
            <el-form-item label="预算金额(元)" required>
              <el-input-number v-model="form.budget_price" :precision="2"
                               :step="0.01" controls-position="right"></el-input-number>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="上年度本业务实际支出(元)" required>
              <el-input-number v-model.trim="form.actual_cost" :precision="2"
                               :step="0.01" controls-position="right"></el-input-number>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="经济分类" required>
              <el-select v-model="form['economy_id']" filterable>
                <el-option-group v-for="item in store.getters['eco_class_list']"
                                 :label="item.classify + ' - ' + item.name">
                  <el-option v-for="value in store.getters['eco_kind_list'][item.classify]"
                             :label="value.classify + value.kind + ' - ' + value.name" :value="value.id"></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="衔接业务单编码" required>
              <el-select v-model="form.aebp_id">
                <el-option v-for="item in store.getters['aebp_list']" :label="item.code" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </td>

        </tr>
        <tr>
          <td colspan="2">
            <el-form-item label="详细测算过程" required>
              <el-input v-model.trim="form.detail" type="textarea"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-form-item :required="form.actual_cost != form.budget_price && form.actual_cost !=0" label="差异说明">
              <el-input v-model.trim="form.diff_reason" type="textarea"></el-input>
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
    </div>
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
  economy_id: '',
  detail: '',
  budget_price: 0.0,
  actual_cost: 0.0,
  diff_reason: '',
  aebp_id: '',
  comm: '',

  status: 0,
  requester: store.getters['userinfo'].id,
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

const create_rules = reactive<FormRules>({
  economy_id: [{required: true, message: '请输入经济分类名称', trigger: 'blur'}],
  detail: [{required: true, message: '当前选项不得为空', trigger: 'blur'}],
  actual_cost: [{required: true, message: '当前选项不得为空', trigger: 'blur'}],
  diff_reason: [{required: true, message: '当前选项不得为空', trigger: 'blur'}],
  aebp_id: [{required: true, message: '当前选项不得为空', trigger: 'blur'}],

  status: [{required: true, message: '当前选项不得为空', trigger: 'blur'}],
  requester: [{required: true, message: '当前选项不得为空', trigger: 'blur'}],
});

const create_data = (form_el: FormInstance | undefined) => {
  if (!form_el) return;
  form_el.validate(valid => {
    if (valid) {
      store.commit('loading', true);
      let form_data = new FormData();
      {
        form_data.set('economy_id', form.economy_id);
        form_data.set('detail', form.detail);
        form_data.set('budget_price', JSON.stringify(form.budget_price));
        form_data.set('aebp_id', form.aebp_id);
        form_data.set('actual_cost', JSON.stringify(form.actual_cost));
        form_data.set('diff_reason', form.diff_reason);
        form_data.set('comm', form.comm);

        form_data.set('status', JSON.stringify(form.status));
        form_data.set('requester', form.requester);

        if (request_time) {
          form_data.set('request_time', now_datetime());
        }
        if (approve_time) {
          form_data.set('approve_time', now_datetime());
        }
      }
      $$.post('/budget', form_data)
          .then(res => {
            store.commit('loading', false);
            if (res.data.status === 200) {
              ElMessage({
                type: 'success',
                message: '新增成功',
              });
              props.success();
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
  });
};
</script>

<style lang="scss" scoped>
</style>