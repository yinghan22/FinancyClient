<template>
  <div class="d-flex flex-row w-100 h-100 m-0 p-0">
    <div class="d-flex flex-col justify-content-between p-right-10">
      <ListGroup :content="(item,index)=>{return item.title;}" :curr_change="curr_change" :data="data"
                 min-width="10rem" width="12rem"></ListGroup>
      <el-button class="w-100" type="primary" @click="export_file_dialog_visible=true">导出数据至文件
      </el-button>
    </div>
    <div class="flex-grow-1">
      <component :is="curr_comp"></component>
    </div>
    <el-dialog v-model="export_file_dialog_visible" destroy-on-close title="导出为文件">
      <ExportFileForm :fields="fields_list" :success="()=>{ export_file_dialog_visible=false;}"></ExportFileForm>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {markRaw, reactive, ref} from 'vue';
import Mine from '../../components/MineInfo/index.vue';
import ListGroup from '../../components/ListGroup.vue';
import ExportFileForm from '../../components/export_file/index.vue';
import BudgetList from '../../components/financy/BudgetList/index.vue';
import AEBPList from '../../components/financy/AnnualEconomicBusinessPlanList/index.vue';
import AWPList from '../../components/financy/AnnualWorkPlanList/index.vue';
import PerGoalList from '../../components/financy/PerGoalList/index.vue';
import JobRespList from '../../components/financy/JobResponseList/index.vue';

const data = reactive([
  {title: '预算审批情况', comp: markRaw(BudgetList)},
  {title: '年度经济业务计划单', comp: markRaw(AEBPList)},
  {title: '年度工作计划', comp: markRaw(AWPList)},
  {title: '绩效目标', comp: markRaw(PerGoalList)},
  {title: '工作职责', comp: markRaw(JobRespList)},
  {title: '我的信息', comp: markRaw(Mine)},
]);

const curr_comp = ref(markRaw(AEBPList));
const fields_list = ref(['job_resp', 'per_goal', 'awp', 'aebp', 'budget']);
const curr_change = (index) => {
  curr_comp.value = data[index].comp;
};

const export_file_dialog_visible = ref(false);
</script>

<style lang="scss" scoped>
</style>