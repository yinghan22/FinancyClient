<template>
  <Card>
    <template #header>
      <div style="display: flex;justify-content: space-between;align-content: center;align-items: center;">
        <p>经济分类</p>
        <!--                <el-button-group>-->
        <!--                    <el-button type="success" @click="export_data">导出</el-button>-->
        <!--                </el-button-group>-->
      </div>
    </template>
    <template #content>
      <el-table :data="store.getters['eco_class_list']" height="100%">
        <el-table-column fixed type="expand">
          <template #default="scope" style="box-sizing: content-box">
            <div style="padding-left: 50px;">
              <el-table :data="store.getters['eco_kind_list'][scope.row.classify]">

                <el-table-column label="科目类" prop="classify" width="100px"></el-table-column>
                <el-table-column label="科目种" prop="kind" width="100px"></el-table-column>
                <el-table-column label="名称" prop="name" width="150px"></el-table-column>
                <el-table-column label="说明" prop="comm"
                                 style="text-align: justify;"></el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="科目类" prop="classify" width="100px"></el-table-column>
        <el-table-column label="名称" prop="name" width="150px"></el-table-column>
        <el-table-column label="说明" prop="comm" style="text-align: justify;"></el-table-column>
      </el-table>
    </template>

  </Card>
</template>

<script lang="ts" setup>
import Card from '../../Card.vue';
import {useStore} from 'vuex';

const store = useStore();


const export_data = () => {
};
</script>

<style lang="scss" scoped>
</style>