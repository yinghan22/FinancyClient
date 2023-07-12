<template>
  <div class="list-group">
    <a v-for="(item,index) in data" :class="{active:index==current_index, 'list-group-item':true}"
       :style="{
            'width':width,
            'minWidth':minWidth,
            }"
       @click="current_index = index">
      {{ content(item, index) }}
    </a>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'

const props = defineProps({
  width: {
    type: String,
    required: false,
    default () {
      return '100%'
    },
  },
  minWidth: {
    type: String,
    required: false,
    default () {
      return 'initial'
    },
  },
  data: {
    type: Array,
    required: true,
    default () {
      return []
    },
  },
  content: {
    type: Function,
    required: false,
    default: (item, index) => {
      return item
    },
  },
  curr_change: {
    type: Function,
    required: true,
    default: (index) => {
    },
  },
})

const current_index = ref(0)

watch(current_index, (e) => {
  props.curr_change(current_index.value)
  localStorage.setItem('curr_comp_index', `${current_index.value}`)
})

onMounted(() => {
  let last_index = +localStorage.getItem('curr_comp_index')
  current_index.value = last_index > props.data.length ? 0 : last_index
})
</script>

<style lang="scss" scoped>
.list-group {
  margin: 0;
  --border-radius: 0.375rem;
  --list-group-active-color: #FFF;
  --list-group-active-bg: #0D6EFD;
  --list-group-active-border-color: #0D6EFD;

  --list-group-active-hover-color: #212529;
  --list-group-active-hover-bg: #F8F9FA;
  --list-group-active-hover-border-color: #212529;


  display: flex;
  flex-direction: column;
  padding-left: 0;
  border-radius: var(--border-radius);

  .list-group-item {
    position: relative;
    display: block;
    padding: 0.5rem 1rem;
    border: 1px solid #EEE;

    &:hover {
      cursor: pointer;
      color: var(--list-group-active-hover-color);
      background: var(--list-group-active-hover-bg);
    }

    &.active {
      background: var(--list-group-active-bg);
      border-color: var(--list-group-active-border-color);
      color: var(--list-group-active-color);
    }

    &:first-child {
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
    }

    &:last-child {
      border-bottom-right-radius: inherit;
      border-bottom-left-radius: inherit;
    }
  }

  .list-group-item + .list-group-item {
    border-top: none;
  }


}

</style>