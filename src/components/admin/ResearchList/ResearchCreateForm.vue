<template>
  <el-form ref="form_ref" :model="form" :rules="create_rules" label-position="top"
           label-width="60px"
           status-icon>
    <table style="width: 100%;">
      <tr>
        <td style="width: 50%;">
          <el-form-item label="部门" prop="dept_id" required>
            <el-select v-model="form.dept_id" filterable>
              <el-option v-for="item in dept_list" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </td>
        <td style="width: 50%;">
          <el-form-item label="年度" required>
            <el-select v-model="form.year" filterable>
              <el-option v-for="(item, index) in 10" :label="curr_year - index + '年'"
                         :value="curr_year - index"></el-option>
            </el-select>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td style="width: 50%;">
          <el-form-item label="省级科研项目数量">
            <el-input-number v-model="form.province_research_num"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
        <td style="width: 50%;">
          <el-form-item label="省级科研经费（万元）">
            <el-input-number v-model="form.province_research_fund" :precision="4"
                             :step="0.0001"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td style="width: 50%;">
          <el-form-item label="省级重点实验室数量">
            <el-input-number v-model="form.province_key_lab_num"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
        <td style="width: 50%;">
          <el-form-item label="省级科研获奖数量">
            <el-input-number v-model="form.province_reward_num"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
      </tr>
      <tr>

        <td style="width: 50%;">
          <el-form-item label="国家级科研项目数量">
            <el-input-number v-model="form.nation_research_num"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
        <td style="width: 50%;">
          <el-form-item label="国家级科研经费（万元）">
            <el-input-number v-model="form.nation_research_fund"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
      </tr>
      <tr>

        <td style="width: 50%;">
          <el-form-item label="国家级重点实验室数量">
            <el-input-number v-model="form.nation_key_lab_num"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
        <td style="width: 50%;">
          <el-form-item label="国家级科研获奖数量">
            <el-input-number v-model="form.nation_reward_num" controls-position="right"
                             type="textarea"></el-input-number>
          </el-form-item>
        </td>
      </tr>
      <tr>

        <td style="width: 50%;">
          <el-form-item label="横向科研项目经费（万元）">
            <el-input-number v-model="form.fund_total" :precision="4" :step="0.0001"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
      </tr>
    </table>


    <el-form-item label="备注">
      <el-input v-model.trim="form.comm" type="textarea"></el-input>
    </el-form-item>
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
import $$ from '../../../axios';
import {useStore} from 'vuex';

const store = useStore();
const props = defineProps({
  dept_list: Array,
  success: {
    type: Function,
    required: true,
    default: () => {
    },
  },
});
const curr_year = new Date().getFullYear();
const form_ref = ref<FormInstance>();
const form = reactive({
  dept_id: '',
  year: '',
  province_research_num: 0,
  province_research_fund: 0.0,
  province_key_lab_num: 0,
  province_reward_num: 0,
  nation_research_num: 0,
  nation_research_fund: 0.0,
  nation_key_lab_num: 0,
  nation_reward_num: 0,
  fund_total: 0.0,
  comm: '',
});
const create_rules = reactive<FormRules>({
  dept_name: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
});

const create_data = (form_el: FormInstance | undefined) => {
  if (!form_el) return;
  form_el.validate(valid => {
    if (valid) {
      store.commit('loading', true);
      let form_data = new FormData();
      {
        form_data.set('dept_id', form.dept_id);
        form_data.set('year', form.year);
        form_data.set('province_research_num', JSON.stringify(form.province_research_num));
        form_data.set('province_research_fund', JSON.stringify(form.province_research_fund));
        form_data.set('province_key_lab_num', JSON.stringify(form.province_key_lab_num));
        form_data.set('province_reward_num', JSON.stringify(form.province_reward_num));
        form_data.set('nation_research_num', JSON.stringify(form.nation_research_num));
        form_data.set('nation_research_fund', JSON.stringify(form.nation_research_fund));
        form_data.set('nation_key_lab_num', JSON.stringify(form.nation_key_lab_num));
        form_data.set('nation_reward_num', JSON.stringify(form.nation_reward_num));
        form_data.set('fund_total', JSON.stringify(form.fund_total));
        form_data.set('comm', form.comm);
      }
      $$.post('/research', form_data)
          .then(res => {
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