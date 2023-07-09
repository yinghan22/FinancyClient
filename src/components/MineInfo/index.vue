<template>
  <Card>
    <template #header>
      <p>我的信息</p>
    </template>
    <template #content>
      <table>
        <tr>
          <th>用户名</th>
          <td>{{ store.getters['userinfo'].name }}</td>
        </tr>
        <tr>
          <th>工号</th>
          <td>{{ store.getters['userinfo'].id }}</td>
        </tr>
        <tr>
          <th>在职部门</th>
          <td>{{ store.getters['userinfo'].dept_name }}</td>
        </tr>
        <tr>
          <th>职位</th>
          <td>{{ store.getters['userinfo'].job_title }}</td>
        </tr>
        <tr>
          <th>职称</th>
          <td>{{ store.getters['userinfo'].pro_title || '-' }}</td>
        </tr>
        <tr>
          <th>备注</th>
          <td>{{ store.getters['userinfo'].comm || '-' }}</td>
        </tr>
      </table>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import Card from '../Card.vue';
import {useStore} from 'vuex';

const store = useStore();

</script>

<style lang="scss" scoped>
table th, table td {padding: 0 1rem 0.5rem 0}

table th {text-align: right;}
</style>