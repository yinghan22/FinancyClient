<template>
  <div class="d-flex flex-row w-100 h-100 m-0 p-0">
    <div class="d-flex flex-col justify-content-between p-right-10">
      <ListGroup
          :content="
				(item) => {
					return item.label;
				}
			"
          :curr_change="curr_change"
          :data="admin_list"
          min-width="9rem"
          width="9rem"
      ></ListGroup>

      <el-button class="w-100" type="primary" @click="export_file_dialog_visible=true">
        导出数据至文件
      </el-button>
    </div>
    <div class="flex-grow-1">
      <component :is="curr_comp"></component>
    </div>
    <el-dialog v-model="export_file_dialog_visible" destroy-on-close title="导出为文件">
      <ExportFileForm :success="()=>{
        export_file_dialog_visible=false;
      }"
      ></ExportFileForm>
    </el-dialog>
  </div>

</template>

<script lang="ts" setup>
import {markRaw, onMounted, reactive, ref} from 'vue'
import ExportFileForm from '../../components/export_file/index.vue'
import UserList from '../../components/admin/UserList/index.vue'
import DeptList from '../../components/admin/DeptList/index.vue'
import TeachList from '../../components/admin/TeachList/index.vue'
import ResearchList from '../../components/admin/ResearchList/index.vue'
import PerGoalList from '../../components/admin/PerGoalList/index.vue'
import JobRespList from '../../components/admin/JobRespList/index.vue'

import GroupList from '../../components/admin/GroupList/index.vue'

import BudgetList from '../../components/admin/BudgetList/index.vue'
import AnnualWorkPlanList from '../../components/admin/PlanList/index.vue'
import WorkPlanList from '../../components/admin/WorkPlanList/index.vue'
import EcoClassList from '../../components/admin/EcoClassList/index.vue'
import ListGroup from '../../components/ListGroup.vue'

import {useStore} from 'vuex'

const store = useStore()
const admin_list = reactive([
  {label: '用户管理', comp: markRaw(UserList)},
  {label: '工作职责', comp: markRaw(JobRespList)},
  {label: '部门管理', comp: markRaw(DeptList)},
  {label: '年度绩效目标', comp: markRaw(PerGoalList)},
  {label: '年度经济业务计划单', comp: markRaw(AnnualWorkPlanList)},
  {label: '年度工作计划', comp: markRaw(WorkPlanList)},
  {label: '公用经费预算', comp: markRaw(BudgetList)},
  {label: '教学活动统计', comp: markRaw(TeachList)},
  {label: '科研活动统计', comp: markRaw(ResearchList)},

  {label: '经济分类', comp: markRaw(EcoClassList)},
  {label: '专家分组', comp: markRaw(GroupList)},
])
const curr_comp = ref(markRaw(UserList))
const curr_change = (index) => {
  curr_comp.value = admin_list[index].comp
  localStorage.removeItem('curr_comp_index')
  localStorage.setItem('curr_comp_index', index)
}

const export_file_dialog_visible = ref(false)

onMounted(() => {
  for (let item of ['expert_group', 'dept_list', 'user_list', 'eco_list', 'job_list', 'goal_list', 'aebp_list', 'awp_list'])
    new Promise(() => {
      store.dispatch(item, {keyword: ''})
    })
})
</script>

<style lang="scss" scoped></style>
