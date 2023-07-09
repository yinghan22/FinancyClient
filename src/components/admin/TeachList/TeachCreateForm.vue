<template>
  <el-form ref="form_ref" :model="form" :rules="create_rules" label-position="top"
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
        <td>
          <el-form-item label="省重点学科">
            <el-input-number v-model="form.province_key_discipline_num" :min="0"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="本科学生人数">
            <el-input-number v-model="form.undergraduate_num" :min="0"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td>
          <el-form-item label="省一流学科">
            <el-input-number v-model="form.province_first_class_course_num" :min="0"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="省一流专业">
            <el-input-number v-model="form.province_first_class_major_num" :min="0"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td>
          <el-form-item label="国家一流学科">
            <el-input-number v-model="form.nation_first_class_course_num" :min="0"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
        <td>
          <el-form-item label="国家一流专业">
            <el-input-number v-model="form.nation_first_class_major_num" :min="0"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td>
          <el-form-item label="教育部认可竞赛最高奖获奖项目数量">
            <el-input-number v-model="form.top_reward_num" :min="0"
                             controls-position="right"></el-input-number>
          </el-form-item>
        </td>
        <td></td>
      </tr>
    </table>


    <el-form-item label="省以上教学成果">
      <el-input v-model="form.province_teach_reward" type="textarea"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <div style="width: 100%;height: 100%;display: flex;justify-content: flex-end;">
        <el-button type="primary" @click="create_data(form_ref)">确认</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {ElMessage, FormInstance, FormRules} from 'element-plus';
import $$ from '../../../axios';
import {useStore} from 'vuex';

const store = useStore();

const props = defineProps({
  dept_list: Object,
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
  year: curr_year,
  major_num: 0,
  province_key_discipline_num: 0,
  undergraduate_num: 0,
  province_first_class_course_num: 0,
  province_first_class_major_num: 0,
  nation_first_class_major_num: 0,
  nation_first_class_course_num: 0,
  top_reward_num: 0,
  province_teach_reward: '',
});
const valid_dept_id = (rule: any, value: any, callback: any) => {
  console.log(value);
  if (value == '') {
    callback(new Error('请选择部门'));
  } else {
    callback();
  }
};
const create_rules = reactive<FormRules>({
  dept_id: [{required: true, trigger: 'blur', message: '请选择部门'}],
});

function create_data(form_el: FormInstance | undefined) {
  if (!form_el) return;
  form_el.validate(valid => {
    if (valid) {
      store.commit('loading', true);
      let form_data = new FormData();
      {
        form_data.set('dept_id', form.dept_id);
        form_data.set('year', `${form.year}`);
        form_data.set('major_num', `${form.major_num}`);
        form_data.set('province_key_discipline_num', `${form.province_key_discipline_num}`);
        form_data.set('undergraduate_num', `${form.undergraduate_num}`);
        form_data.set('province_first_class_course_num', `${form.province_first_class_course_num}`);
        form_data.set('province_first_class_major_num', `${form.province_first_class_major_num}`);
        form_data.set('nation_first_class_major_num', `${form.nation_first_class_major_num}`);
        form_data.set('nation_first_class_course_num', `${form.nation_first_class_course_num}`);
        form_data.set('top_reward_num', `${form.top_reward_num}`);
        form_data.set('province_teach_reward', form.province_teach_reward);
      }
      $$.post('/teach', form_data)
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
}
</script>

<style lang="scss" scoped>
</style>