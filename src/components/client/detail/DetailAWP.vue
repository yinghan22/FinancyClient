<template>
  <h3 class="border-bottom-1 d-flex flex-row justify-content-between align-items-center">
    <p>衔接年度工作计划审核</p>
    <span>
      <el-text v-if="props.data.status == 0" type="primary">待申请审核</el-text>
            <el-text v-else-if="props.data.status == 1" type="warning">待审核</el-text>
            <el-text v-else-if="props.data.status == 2" type="success">审核已通过</el-text>
            <el-text v-else-if="props.data.status == 3" type="danger">审核已驳回</el-text>
    </span>
  </h3>
  <el-form label-position="top">
    <div class="d-flex w-100 flex-row">
      <table class="flex-1">
        <tr>
          <td>
            <el-form-item label="计划编码">
              <el-input v-model.trim="props.data['code']" readonly></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="计划名称">
              <el-input v-model.trim="props.data['name']" readonly></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-form-item label="计划详情">
              <el-input v-model.trim="props.data['detail']" readonly type="textarea"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="隶属工作职责编码">
              <el-input v-model="props.data['job_resp_code']" readonly></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="绩效编码">
              <el-input v-model="props.data['per_goal_code']" readonly></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-form-item label="上年度是否开展">
              <el-radio-group v-model="props.data['carry_out']" disabled>
                <el-radio :label="true">已开展</el-radio>
                <el-radio :label="false">未开展</el-radio>
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-form-item label="备注">
              <el-input v-model.trim="props.data['comm']" readonly type="textarea"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
      <div>
        <table>
          <tr>
            <td>
              <el-form-item label="部门">
                <el-select v-model="props.data['dept_id']" disabled filterable>
                  <el-option
                      :label="props.data['dept_name']"
                      :value="props.data['dept_id']"
                  ></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="申请人">
                <el-select v-model="props.data['requester']" disabled filterable>
                  <el-option
                      :label="props.data['requester'] + ' - ' + props.data['requester_name']"
                      :value="props.data['requester']"
                  ></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="审核小组">
                <el-select v-model="props.data['applicant_id']" disabled filterable>
                  <el-option
                      :label=" props.data['applicant_id'] + ' - ' + props.data['applicant_tag']"
                      :value="props.data['applicant_id']"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr v-if="props.data['status'] == 3">
            <td>
              <el-form-item label="审核驳回原因" prop="refuse_reason">
                <el-input v-model="props.data['refuse_reason']" readonly type="textarea"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import {useStore} from 'vuex'

const store = useStore()
const props = defineProps({
  data: Object,
})
</script>

<style lang="scss" scoped>

</style>