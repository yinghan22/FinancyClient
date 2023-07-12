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
                <el-option :label="props.data['aebp_code']" :value="props.data['aebp_code']"
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
        </table>
        <el-form-item class="flex-grow-1" label="审核驳回原因">
          <el-input v-model="data['refuse_reason']" rows="10" type="textarea"></el-input>
        </el-form-item>
      </div>
    </div>
    <el-form-item>
      <div class="m-0 p-0 w-100 d-flex flex-row justify-content-end">
        <el-button size="small" title="当前阶段驳回将终止审核" type="danger" @click="budget_refuse">驳回</el-button>
        <el-button size="small" title="通过审核将清空驳回原因" type="primary" @click="pass">通过</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {useStore} from 'vuex'
import {ElMessage} from 'element-plus'
import $$ from '../../../../axios'

const store = useStore()
const props = defineProps({
  data: Object,
  refuse: {
    type: Function,
    default: () => {
    },
  },
  pass: {
    type: Function,
    default: () => {
    },
  },
})

const budget_refuse = () => {
  if (!props.data['refuse_reason'] || props.data['refuse_reason'].trim() == '') {
    ElMessage.error('【预算审核】请输入驳回原因')
    return
  }
  props.data['refuse_reason'] = props.data['refuse_reason'].trim()
  let form_data = new FormData()
  {
    form_data.set('status', '3')
    form_data.set('refuse_reason', props.data['refuse_reason'])
  }
  $$.put(`/budget/approve/${props.data['id']}`, form_data).then(res => {
    if (res.data.status === 200) {
      props.refuse('预算审核', props.data['refuse_reason'])
    } else {
      ElMessage.error(res.data.message)
    }
  }).catch(res => {
    ElMessage.error(res)
  })
}

const pass = () => {
  store.commit('area_loading', true)
  let form_data = new FormData()
  form_data.set('status', JSON.stringify(2))
  $$.put(`/budget/approve/${props.data['id']}`, form_data).then(res => {
    if (res.data.status === 200) {
      props.pass()
    }
    store.commit('area_loading', false)
  }).catch(() => {
    store.commit('area_loading', false)
  })
}

</script>

<style lang="scss" scoped>

</style>