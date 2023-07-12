<template>
  <h3 class="border-bottom-1 d-flex flex-row justify-content-between align-items-center">
    <p>衔接业务单审核</p>
    <span>
      <el-text v-if="props.data.status == 0" type="primary">待申请审核</el-text>
            <el-text v-else-if="props.data.status == 1" type="warning">待审核</el-text>
            <el-text v-else-if="props.data.status == 2" type="success">审核已通过</el-text>
            <el-text v-else-if="props.data.status == 3" type="danger">审核已驳回</el-text>
    </span>
  </h3>
  <el-form label-position="top">
    <div class="d-flex flex-row-1">
      <table class="flex-1">
        <tr>
          <td>
            <el-form-item label="经济业务计划单编号">
              <el-input v-model="props.data.code" readonly></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="开展月份">
              <el-date-picker v-model="props.data.start_date" readonly type="month"/>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="衔接计划编码">
              <el-select v-model="props.data['annual_work_plan_id']" disabled filterable>
                <el-option v-for="item in store.getters['awp_list']" :label="item.code + ' - ' + item.name"
                           :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="经济类型">
              <el-select v-model="props.data['eco_class_id']" disabled filterable>
                <el-option-group v-for="item in store.getters['eco_class_list']"
                                 :label="item.classify + ' - ' + item.name">
                  <el-option v-for="value in store.getters['eco_kind_list'][item.classify]"
                             :label="value.classify + value.kind + ' - ' + value.name" :value="value.id"></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-form-item label="业务经济内容">
              <el-input v-model.trim="props.data.detail" readonly type="textarea"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-form-item label="产生支出内容">
              <el-input v-model.trim="props.data.content" readonly type="textarea"></el-input>
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
              <el-input v-model.trim="props.data.comm" readonly type="textarea"></el-input>
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
          <tr>
            <td>
              <el-form-item label="审核驳回原因">
                <el-input v-model="props.data['refuse_reason']" rows="10" type="textarea"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </div>
    </div>


    <el-form-item>
      <div class="m-0 p-0 w-100 d-flex flex-row justify-content-end">
        <el-button size="small" title="当前阶段驳回将终止审核" type="danger" @click="refuse">驳回</el-button>
        <el-button size="small" title="通过审核将清空驳回原因" type="primary" @click="pass">通过</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import $$ from '../../../../axios'
import {useStore} from 'vuex'
import {ElMessage} from 'element-plus'

const store = useStore()
const props = defineProps({
  data: Object,
  refuse: {
    type: Function,
    default: (module_text, refuse_reason) => {
    },
  },
  pass: {
    type: Function,
    default: () => {
    },
  },
})

const refuse = async () => {
  if (!props.data['refuse_reason'] || props.data['refuse_reason'].trim() == '') {
    ElMessage.error('【衔接业务单审核】请输入驳回原因')
    return
  }
  props.data['refuse_reason'] = props.data['refuse_reason'].trim()
  let form_data = new FormData()
  {
    form_data.set('status', '3')
    form_data.set('refuse_reason', props.data['refuse_reason'])
  }
  $$.put(`/aebp/approve/${props.data['code']}`, form_data).then(res => {
    if (res.data.status === 200) {
      props.refuse('衔接业务单审核', props.data['refuse_reason'])
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
  form_data.set('status', '2')
  $$.put(`/aebp/approve/${props.data['code']}`, form_data).then(res => {
    if (res.data.status === 200) {
      props.data['status'] = 2
      ElMessage.success('【衔接业务单审核】审核通过')
    }
    store.commit('area_loading', false)
  }).catch(() => {
    store.commit('area_loading', false)
  })
}
</script>

<style lang="scss" scoped>

</style>