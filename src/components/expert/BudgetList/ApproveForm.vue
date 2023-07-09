<template>
  <ApproveJobResp :data="props.job_resp" :refuse="refuse"></ApproveJobResp>
  <ApprovePerGoal :data="per_goal" :refuse="refuse"></ApprovePerGoal>
  <ApproveAWP :data="props.awp" :refuse="refuse"></ApproveAWP>
  <ApproveAEBP :data="props.aebp" :pass="props.pass" :refuse="refuse"></ApproveAEBP>
  <ApproveBudget :data="props.budget" :pass="props.pass" :refuse="props.refuse"></ApproveBudget>
</template>

<script lang="ts" setup>
import ApproveAEBP from './datatable/ApproveAEBP.vue';
import ApproveBudget from './datatable/ApproveBudget.vue';
import ApproveAWP from './datatable/ApproveAWP.vue';
import ApproveJobResp from './datatable/ApproveJobResp.vue';
import ApprovePerGoal from './datatable/ApprovePerGoal.vue';

import $$ from '../../../axios';
import {ElMessage} from 'element-plus';

const props = defineProps({
  budget: Object,
  aebp: Object,
  awp: Object,
  per_goal: Object,
  job_resp: Object,
  refuse: {
    type: Function,
    default: () => {
    },
  },
  pass: {
    type: Function,
    default: () => {
    },
  },
});

const refuse = async (module_text, refuse_reason) => {
  let form_data = new FormData();
  {
    form_data.set('status', '3');
    form_data.set('refuse_reason', `【${module_text}】${refuse_reason}`);
  }
  $$.put(`/budget/approve/${props.budget.id}`, form_data).then(res => {
    if (res.data.status === 200) {
      props.refuse();
    } else {
      ElMessage.error(res.data.message);
    }
  }).catch(res => {
    ElMessage.error(res);
  });
};
</script>

<style lang="scss" scoped>
</style>