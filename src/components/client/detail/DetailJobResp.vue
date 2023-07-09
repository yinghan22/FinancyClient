<template>
  <h3 class="border-bottom-1 d-flex flex-row justify-content-between align-items-center">
    <p>工作职责审核</p>
    <span>
      <el-text v-if="props.data.status == 0" type="primary">待申请审核</el-text>
            <el-text v-else-if="props.data.status == 1" type="warning">待审核</el-text>
            <el-text v-else-if="props.data.status == 2" type="success">审核已通过</el-text>
            <el-text v-else-if="props.data.status == 3" type="danger">审核已驳回</el-text>
    </span>
  </h3>
  <el-form label-position="top">
    <div style="display: flex; flex-direction: column">
      <div style="display: flex; flex-direction: row">
        <div class="flex-1">
          <table style="width: 100%">
            <tr>
              <td>
                <el-form-item label="职责编号">
                  <el-input
                      v-model="props.data['code']"
                      readonly
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <el-form-item label="职责概述">
                  <el-input
                      v-model.trim="props.data['abstract']"
                      readonly
                      type="textarea"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <el-form-item label="职责内容描述">
                  <el-input v-model.trim="props.data['detail']" readonly type="textarea"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item label="经办人">
                  <el-select v-model="props.data['operator_id']" disabled filterable>
                    <el-option
                        v-for="item in store.getters[
												'user_list'
											]"
                        :label="item.id + ' - ' + item.name"
                        :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="责任领导" prop="leader_id">
                  <el-select v-model="props.data['leader_id']" disabled filterable>
                    <el-option
                        v-for="item in store.getters[
												'user_list'
											]"
                        :label="item.id + ' - ' + item.name"
                        :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <el-form-item label="备注">
                  <el-input
                      v-model.trim="props.data['comm']"
                      readonly type="textarea"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </div>
        <div>
          <table>
            <tr>
              <td>
                <el-form-item label="部门">
                  <el-select v-model="props.data['dept_id']" disabled filterable>
                    <el-option
                        v-for="item in store.getters[
												'dept_list'
											]"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item label="填报人">
                  <el-input v-model="props.data['requester']" readonly></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item label="审核小组">
                  <el-select v-model="props.data['applicant_id']" disabled filterable>
                    <el-option v-for="item in store.getters['expert_group']"
                               :label="item['id'] + ' - ' + item['tag']"
                               :value="item['id']"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr v-if="props.data['status'] == 3">
              <td>
                <el-form-item label="审核驳回原因">
                  <el-input v-model="props.data['refuse_reason']" readonly type="textarea"></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

  </el-form>
</template>

<script lang="ts" setup>
import {useStore} from 'vuex';

const store = useStore();
const props = defineProps({
  data: Object,

});

</script>

<style lang="scss" scoped>

</style>