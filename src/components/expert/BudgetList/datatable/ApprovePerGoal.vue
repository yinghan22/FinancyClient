<template>
  <h3 class="border-bottom-1 d-flex flex-row justify-content-between align-items-center">
    <p>绩效指标审核</p>
    <span>
      <el-text v-if="props.data.status == 0" type="primary">待申请审核</el-text>
            <el-text v-else-if="props.data.status == 1" type="warning">待审核</el-text>
            <el-text v-else-if="props.data.status == 2" type="success">审核已通过</el-text>
            <el-text v-else-if="props.data.status == 3" type="danger">审核已驳回</el-text>
    </span>
  </h3>
  <el-form label-position="top">
    <div class="d-flex flex-row">
      <table class="flex-1">
        <tr>
          <td>
            <el-form-item label="绩效指标编码">
              <el-input v-model.trim="props.data['code']" readonly></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="一级指标">
              <el-input v-model.trim="props.data['quota_1']" readonly type="textarea"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="二级指标">
              <el-input v-model.trim="props.data['quota_2']" readonly type="textarea"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="三级指标">
              <el-input v-model.trim="props.data['quota_3']" readonly type="textarea"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="指标值">
              <el-input v-model.trim="props.data['quota_value']" readonly type="textarea"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="指标来源">
              <el-input v-model.trim="props.data['source']" readonly type="textarea"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="备注">
              <el-input v-model.trim="props.data['comm']" readonly type="textarea"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="附件">
              <ol style="margin: 0;padding: 0 1rem;">
                <li v-for="item in props.data.file_list">
                  <a :href="Config.base_url + '/' + item['path']" class="file_href"
                     style="color: #000;"
                     target="_blank">
                    {{ item['name'] }}
                  </a>
                </li>
              </ol>
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
                  <el-option :label="props.data['dept_name']"
                             :value="props.data['dept_id']"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="填报人">
                <el-select v-model="props.data['requester']" disabled filterable>
                  <el-option
                      :label="props.data['requester']+ ' - ' + props.data['requester_name']"
                      :value="props.data['requester']"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="审核小组">
                <el-select v-model="props.data['applicant_id']" disabled filterable>
                  <el-option :label="props.data['applicant_id'] + ' - ' + props.data['applicant_tag']"
                             :value="props.data['applicant_id']">
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="审核驳回原因">
                <el-input v-model="props.data['refuse_reason']" type="textarea"></el-input>
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
import {useStore} from 'vuex'
import {ElMessage} from 'element-plus'
import $$ from '../../../../axios'
import Config from '../../../../Config.js'

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

const refuse = async () => {
  if (!props.data['refuse_reason'] || props.data['refuse_reason'].trim() == '') {
    ElMessage.error('【绩效指标审核】请输入驳回原因')
    return
  }
  props.data['refuse_reason'] = props.data['refuse_reason'].trim()
  let form_data = new FormData()
  {
    form_data.set('refuse_reason', `${props.data['refuse_reason']}`)
    form_data.set('status', '3')
  }
  $$.put(`/goal/approve/${props.data['id']}`, form_data).then(res => {
    if (res.data.status === 200) {
      props.refuse('绩效目标审核', props.data['refuse_reason'])
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
  $$.put(`/goal/approve/${props.data['id']}`, form_data).then(res => {
    if (res.data.status === 200) {
      props.data['status'] = 2
      ElMessage.success('【绩效目标】审核通过')
    }
    store.commit('area_loading', false)
  }).catch(() => {
    store.commit('area_loading', false)
  })
}
</script>

<style lang="scss" scoped>

</style>