<template>
  <div v-loading="store.getters['loading']" class="d-flex flex-row w-100 h-100 m-0 p-0">
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
    </div>
    <div class="flex-grow-1">
      <component :is="curr_comp"></component>
      <!--      <BudgetList></BudgetList>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import {markRaw, reactive, ref} from 'vue'

import BudgetList from '../../components/expert/BudgetList/index.vue'
import ListGroup from '../../components/ListGroup.vue'
import {useStore} from 'vuex'

const store = useStore()
const admin_list = reactive([
  {label: '公用经费预算', comp: markRaw(BudgetList)},
])
const curr_comp = ref(admin_list[0].comp)
const curr_change = (index) => {
  // curr_comp.value = admin_list[index].comp
}


</script>

<style lang="scss" scoped></style>
