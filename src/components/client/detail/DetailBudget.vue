<template>
  <h3 class="border-bottom-1 d-flex flex-row justify-content-between align-items-center">
    <p>预算审核</p>
    <span>
      <el-text v-if="props.data.status == 0" type="primary">待申请审核</el-text>
            <el-text v-else-if="props.data.status == 1" type="warning">待审核</el-text>
            <el-text v-else-if="props.data.status == 2" type="success">审核已通过</el-text>
            <el-text v-else-if="props.data.status == 3" type="danger">审核已驳回</el-text>
    </span>
  </h3>
  <el-form v-model="props.data" label-position="top">
    <div class="d-flex flex-row-1">
      <table class="flex-1">
        <tr>
          <td>
            <el-form-item label="预算金额(元)">
              <el-input-number v-model="data['budget_price']" :precision="2" :step="0.01"
                               controls-position="right" readonly></el-input-number>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="上年度本业务实际支出(元)">
              <el-input-number v-model.trim="data['actual_cost']" :precision="2"
                               :step="0.01" controls-position="right" readonly></el-input-number>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="经济分类">
              <el-select v-model="data['economy_id']" disabled filterable>
                <el-option-group v-for="item in store.getters['eco_class_list']"
                                 :label="item.classify + ' - ' + item.name">
                  <el-option v-for="value in store.getters['eco_kind_list'][item.classify]"
                             :label="value.classify + value.kind + ' - ' + value.name" :value="value.id"></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="衔接业务单编码">
              <el-select v-model="data['aebp_id']" disabled>
                <el-option v-for="item in store.getters['aebp_list']" :label="item.code" :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </td>

        </tr>
        <tr>
          <td colspan="2">
            <el-form-item label="详细测算过程">
              <el-input v-model.trim="data['detail']" readonly type="textarea"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-form-item label="差异说明">
              <el-input v-model.trim="data['diff_reason']" readonly type="textarea"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-form-item label="备注">
              <el-input v-model.trim="data['comm']" readonly type="textarea"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
      <div>
        <table>
          <tr>
            <td>
              <el-form-item
                  label="申请人"
              >
                <el-select
                    v-model="data['requester']"
                    disabled
                    filterable
                >
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
            <td>
              <el-form-item label="审核小组">
                <el-select v-model="props.data['applicant_id']" disabled filterable>
                  <el-option v-for="item in store.getters['expert_group']" :label="item['tag']" :value="item['id']"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
        </table>
        <el-form-item v-if="props.data['status'] == 3" class="flex-grow-1" label="审核驳回原因">
          <el-input v-model="data['refuse_reason']" readonly rows="10" type="textarea"></el-input>
        </el-form-item>
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