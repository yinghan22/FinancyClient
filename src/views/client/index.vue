<template>
  <div v-loading="store.getters['loading']" style="width: 100%;height: 100%;display: flex;">
    <ListGroup
        :content="
				(item) => {
					return item.title;
				}
			"
        :curr_change="curr_change"
        :data="data"
        min-width="10rem"
        width="14rem"
    ></ListGroup>
    <component :is="curr_comp"></component>
  </div>
</template>

<script lang="ts" setup>
import ListGroup from '../../components/ListGroup.vue';
import {markRaw, reactive, ref} from 'vue';
import MineInfo from '../../components/MineInfo/index.vue';
import MineApprove from '../../components/client/MineApprove/index.vue';
import {useStore} from 'vuex';

const store = useStore();
const data = reactive([
  {title: '预算审核情况', comp: markRaw(MineApprove)},
  {title: '我的信息', comp: markRaw(MineInfo)},
]);
const curr_comp = ref(data[0].comp);
const curr_change = (index) => {
  curr_comp.value = data[index].comp;
};
</script>

<style lang="scss" scoped></style>
