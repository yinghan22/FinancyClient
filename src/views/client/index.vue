<template>
  <div v-loading="store.getters['loading']" class="d-flex flex-row w-100 h-100 m-0 p-0">
    <div class="d-flex flex-col justify-content-between p-right-10">
      <ListGroup
          :content="
				(item) => {
					return item.title;
				}
			"
          :curr_change="curr_change"
          :data="data_list"
          min-width="10rem"
          width="14rem"
      ></ListGroup>
    </div>
    <div class="flex-grow-1">
      <component :is="data_list[curr_comp_index].comp"></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ListGroup from '../../components/ListGroup.vue'
import {markRaw, onMounted, reactive, ref} from 'vue'
import MineInfo from '../../components/MineInfo/index.vue'
import MineApprove from '../../components/client/MineApprove/index.vue'
import {useStore} from 'vuex'

const store = useStore()
const data_list = reactive([
  {title: '预算审核情况', comp: markRaw(MineApprove)},
  {title: '我的信息', comp: markRaw(MineInfo)},
])
const curr_comp_index = ref(0)
const curr_change = (index) => {
  curr_comp_index.value = index
}

onMounted(() => {
  for (let item of ['expert_group', 'dept_list', 'user_list', 'eco_list', 'job_list', 'goal_list', 'aebp_list', 'awp_list'])
    new Promise(() => {
      store.dispatch(item, {keyword: ''})
    })
})
</script>

<style lang="scss" scoped></style>
