<template>
  <el-form ref="form_ref" :model="form" :rules="create_rules" label-position="top" label-width="60px" status-icon>
    <table style="width: 100%;">
      <tr>
        <td style="width: 50%;">
          <el-form-item label="部门名称" prop="dept_id" required>
            <el-select v-model="form['dept_id']" filterable>
              <el-option v-for="(item, index) in store.getters['dept_list']" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </td>
        <td style="width: 50%;">
          <el-form-item label="统计年度" required>
            <el-select v-model="form['year']" filterable>
              <el-option v-for="(item, index) in 15" :label="curr_year - index + '年'"
                         :value="curr_year - index"></el-option>
            </el-select>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td style="width: 50%;">
          <el-form-item label="省级科研项目数量">
            <el-input-number v-model="form['province_research_num']"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
        <td style="width: 50%;">
          <el-form-item label="省级科研经费（万元）">
            <el-input-number v-model="form['province_research_fund']" :precision="4"
                             :step="0.0001"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td style="width: 50%;">
          <el-form-item label="省级重点实验室数量">
            <el-input-number v-model="form['province_key_lab_num']"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
        <td style="width: 50%;">
          <el-form-item label="省级科研获奖数量">
            <el-input-number v-model="form['province_reward_num']"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td style="width: 50%;">
          <el-form-item label="国家级科研项目数量">
            <el-input-number v-model="form['nation_research_num']"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
        <td style="width: 50%;">
          <el-form-item label="国家级科研经费（万元）">
            <el-input-number v-model="form['nation_research_fund']"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td style="width: 50%;">
          <el-form-item label="国家级重点实验室数量">
            <el-input-number v-model="form['nation_key_lab_num']"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
        <td style="width: 50%;">
          <el-form-item label="国家级科研获奖数量">
            <el-input-number v-model="form['nation_reward_num']" type="textarea"></el-input-number>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td style="width: 50%;">
          <el-form-item label="横向科研项目经费（万元）">
            <el-input-number v-model="form['fund_total']" :precision="4" :step="0.0001"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
      </tr>
    </table>


    <el-form-item label="备注">
      <el-input v-model.trim="form['comm']" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <div style="width: 100%;height: 100%;display: flex;justify-content: flex-end;">
        <el-button type="primary" @click="update_data(form_ref)">确认</el-button>
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
  form: {
    type: Object,
    required: true,
    default: {
      dept_id: '',
      year: 0,
      province_research_num: 0,
      province_research_fund: 0,
      province_key_lab_num: 0,
      province_reward_num: 0,
      nation_research_num: 0,
      nation_research_fund: 0,
      nation_key_lab_num: 0,
      nation_reward_num: 0,
      fund_total: 0,
      comm: '',
    },
  },
  success: {
    type: Function,
    required: true,
    default: () => {
    },
  },
});
const curr_year = new Date().getFullYear();
const form_ref = ref<FormInstance>();
const create_rules = reactive<FormRules>({
  dept_name: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
});
if (store.getters['dept_list']) {
  console.log(123);
}
const update_data = (form_el: FormInstance | undefined) => {
  form_el.validate(valid => {
    if (valid) {
      store.commit('loading', true);
      let form_data = new FormData();
      {
        form_data.set('dept_id', props.form['dept_id']);
        form_data.set('year', JSON.stringify(props.form['year']));
        form_data.set('province_research_num', JSON.stringify(props.form['province_research_num']));
        form_data.set('province_research_fund', JSON.stringify(props.form['province_research_fund']));
        form_data.set('province_key_lab_num', JSON.stringify(props.form['province_key_lab_num']));
        form_data.set('province_reward_num', JSON.stringify(props.form['province_reward_num']));
        form_data.set('nation_research_num', JSON.stringify(props.form['nation_research_num']));
        form_data.set('nation_research_fund', JSON.stringify(props.form['nation_research_fund']));
        form_data.set('nation_key_lab_num', JSON.stringify(props.form['nation_key_lab_num']));
        form_data.set('nation_reward_num', JSON.stringify(props.form['nation_reward_num']));
        form_data.set('fund_total', JSON.stringify(props.form['fund_total']));
        form_data.set('comm', props.form['comm']);
      }
      $$.put(`/research/${props.form['id']}`, form_data)
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