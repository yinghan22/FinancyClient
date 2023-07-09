<template>
  <div v-loading="loading">
    <el-transfer v-model="target" :data="data()" :titles="['备选导出项','已选择的导出项']"
                 class="d-flex flex-row justify-content-between align-items-center mb-10" filterable/>
    <div class="w-100 d-flex flex-row justify-content-end">
      <el-button type="primary" @click="local_export_file()">导出</el-button>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {useStore} from 'vuex';
import {ElMessage} from 'element-plus';
import export_file from '../../utils/export_file.js';

const store = useStore();
const props = defineProps({
  fields: {
    type: Array,
    required: false,
    default: null,
  },
  success: {
    type: Function,
    required: true,
    default: () => {
    },
  },
});

const loading = ref(false);

function data() {
  const temp = {
    'user': {key: 'user', label: '人员情况表'},
    'job_resp': {key: 'job_resp', label: '工作职责'},
    'per_goal': {key: 'per_goal', label: '部门年度绩效目标表'},
    'awp': {key: 'awp', label: '部门年度工作计划表'},
    'aebp': {key: 'aebp', label: '部门年度经济业务计划单'},
    'budget': {key: 'budget', label: '部门公用经费预算表'},
    'teach': {key: 'teach', label: '信息统计——教学活动方面'},
    'research': {key: 'research', label: '信息统计——科研活动方面'},
  };
  let data_list = Object.values(temp);
  if (props.fields != null) {
    data_list = [];
    for (let item of props.fields) {
      data_list.push(temp[item]);
    }
  }
  return data_list;
}


const target = ref([]);

const local_export_file = async () => {
  loading.value = true;
  await export_file(target.value);
  ElMessage({
    type: 'success',
    message: '成功',
  });
  loading.value = false;
  props.success();
};
</script>

<style lang="scss" scoped></style>