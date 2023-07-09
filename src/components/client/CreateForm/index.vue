<template>
  <div class="d-flex flex-row h-100 m-0 p-0">
    <div class="d-flex flex-col justify-content-between p-right-10">
      <ListGroup
          :content="
				(item) => {
					return item.label;
				}
			"
          :curr_change="curr_change"
          :data="create_list"
          min-width="9rem"
          width="9rem"
      ></ListGroup>
    </div>
    <div class="flex-1">
      <component :is="curr_comp"></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useStore} from 'vuex';
import {markRaw, onMounted, reactive, ref} from 'vue';
import JobResponseList from './JobResponseList/index.vue';
import PerGoalList from './PerGoalList/index.vue';
import AnnualWorkPlanList from './AnnualWorkPlanList/index.vue';
import AnnualEconomicBusinessPlanList from './AnnualEconomicBusinessPlanList/index.vue';
import BudgetList from './BudgetList/index.vue';
import ListGroup from '../../ListGroup.vue';

const store = useStore();
const create_list = reactive([
  {label: '工作职责', comp: markRaw(JobResponseList)},
  {label: '年度绩效目标', comp: markRaw(PerGoalList)},
  {label: '年度工作计划', comp: markRaw(AnnualWorkPlanList)},
  {label: '年度经济业务计划单', comp: markRaw(AnnualEconomicBusinessPlanList)},
  {label: '公用经费预算', comp: markRaw(BudgetList)},

]);
const curr_comp = ref(create_list[0].comp);
const curr_change = (index) => {
  curr_comp.value = create_list[index].comp;
};

onMounted(() => {
  init_env();
});

function init_env() {
  store.dispatch('expert_group');
  store.dispatch('dept_list');
  store.dispatch('user_list');
  store.dispatch('eco_list');
  store.dispatch('job_list');
  store.dispatch('goal_list');
  store.dispatch('aebp_list');
  store.dispatch('awp_list');
}

const export_file_dialog_visible = ref(false);
</script>

<style lang="scss" scoped>

</style>