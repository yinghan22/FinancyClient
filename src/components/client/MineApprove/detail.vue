<template>
  <div>
    <DetailJobResp :data="props.job_resp"></DetailJobResp>
    <DetailPerGoal :data="props.per_goal"></DetailPerGoal>
    <DetailAWP :data="props.awp"></DetailAWP>
    <DetailAEBP :data="props.aebp"></DetailAEBP>
    <DetailBudget :data="props.budget"></DetailBudget>
  </div>
</template>

<script lang="ts" setup>
import DetailBudget from '../detail/DetailBudget.vue';
import DetailAEBP from '../detail/DetailAEBP.vue';
import DetailAWP from '../detail/DetailAWP.vue';
import DetailPerGoal from '../detail/DetailPerGoal.vue';
import DetailJobResp from '../detail/DetailJobResp.vue';

const props = defineProps({
  budget: Object,
  aebp: Object,
  awp: Object,
  job_resp: Object,
  per_goal: Object,
});


</script>

<style lang="scss" scoped>

</style>