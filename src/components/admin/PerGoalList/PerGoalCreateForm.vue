<template>
  <el-form ref="form_ref" :model="form" :rules="create_rules" label-position="top" label-width="80px" status-icon>
    <div style="display: flex;flex-direction: column;">
      <div style="display: flex;flex-direction: row;">
        <div>
          <table style="width: 100%;">
            <tr>
              <td style="width: 50%;">
                <el-form-item label="填报人" prop="requester" required>
                  <el-select v-model="form.requester" filterable>
                    <el-option v-for="item in user_list"
                               :label="item.id + ' - ' +item.name"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td style="width: 50%;">
                <el-form-item label="部门" prop="dept_id" required>
                  <el-select v-model="form.dept_id" filterable>
                    <el-option v-for="item in store.getters['dept_list']"
                               :label="item.name"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td style="width: 50%;">
                <el-form-item label="一级指标" prop="quota_1" required>
                  <el-input v-model.trim="form.quota_1" type="textarea"></el-input>
                </el-form-item>
              </td>
              <td style="width: 50%;">
                <el-form-item label="二级指标" prop="quota_2" required>
                  <el-input v-model.trim="form.quota_2" type="textarea"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td style="width: 50%;">
                <el-form-item label="三级指标" prop="quota_3" required>
                  <el-input v-model.trim="form.quota_3" type="textarea"></el-input>
                </el-form-item>
              </td>
              <td style="width: 50%;">
                <el-form-item label="指标值" prop="quota_value" required>
                  <el-input v-model.trim="form.quota_value" type="textarea"></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>


          <el-form-item label="指标来源" prop="source" required>
            <el-input v-model.trim="form.source" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model.trim="form.comm" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="附件">
            <el-upload v-model:file-list="form.file_list" multiple @change="change_file_list">
              <el-button type="primary">上传附件</el-button>
            </el-upload>
          </el-form-item>
        </div>
        <div>
          <table>
            <tr>
              <td>
                <el-form-item label="审批小组" prop="applicant_id" required>
                  <el-select v-model="form.applicant_id" filterable>
                    <el-option v-for="item in store.getters['expert_group']" :label="item['tag']"
                               :value="item['id']">
                    </el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <el-form-item label="审批状态" prop="status" required>
                <el-select v-model="form.status" filterable>
                  <el-option v-for="(item,value) in store.getters['approve_status_list']"
                             :label="item"
                             :value="value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </tr>
            <tr v-if="form.status == 3">
              <td>
                <el-form-item :required="form.status == 3" label="审批驳回原因" prop="refuse_reason">
                  <el-input v-model="form.refuse_reason" type="textarea"></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>


        </div>
      </div>
      <div>
        <el-form-item>
          <div style="width: 100%;height: 100%;display: flex;justify-content: flex-end;">
            <el-button type="primary" @click="create_data(form_ref)">确认</el-button>
          </div>
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import type {FormInstance, FormRules} from 'element-plus'
import {ElMessage} from 'element-plus'
import {reactive, ref} from 'vue'
import $$ from '../../../axios'
import {useStore} from 'vuex'

const store = useStore()
const props = defineProps({
  dept_list: Object,
  user_list: Array,
  success: {
    type: Function,
    required: true,
    default: () => {
    },
  },
})


const user_list = ref([])
if (user_list.value.length === 0) {
  $$.get('/user').then(res => {
    user_list.value = res.data.data
  })
}

const form_ref = ref<FormInstance>()
const form = reactive({
  dept_id: '',
  quota_1: '',
  quota_2: '',
  quota_3: '',
  quota_value: '',
  source: '',
  comm: '',
  file_list: [],
  status: 0,
  requester: '',
  applicant_id: null,
  refuse_reason: '',
})
const change_file_list = (file, file_list) => {
  if (file.name in form.file_list) {
    ElMessage({
      type: 'error',
      message: '文件名已存在',
    })
  } else {
    form.file_list.push(file.raw)
  }
}
const create_rules = reactive<FormRules>({
  dept_id: [{required: true, message: '该选项不得为空', trigger: 'blur'}],
  quota_1: [{required: true, message: '该选项不得为空', trigger: 'blur'}],
  quota_2: [{required: true, message: '该选项不得为空', trigger: 'blur'}],
  quota_3: [{required: true, message: '该选项不得为空', trigger: 'blur'}],
  quota_value: [{required: true, message: '该选项不得为空', trigger: 'blur'}],
  source: [{required: true, message: '该选项不得为空', trigger: 'blur'}],
})


const create_data = (form_el: FormInstance | undefined) => {
  if (!form_el) return
  form_el.validate(valid => {
    if (valid) {
      store.commit('loading', true)
      let form_data = new FormData()
      {
        form_data.set('dept_id', form.dept_id)
        form_data.set('quota_1', form.quota_1)
        form_data.set('quota_2', form.quota_2)
        form_data.set('quota_3', form.quota_3)
        form_data.set('quota_value', form.quota_value)
        form_data.set('source', form.source)
        form_data.set('comm', form.comm)
        form_data.set('requester', form.requester)
        form_data.set('status', JSON.stringify(form.status))
        form_data.set('applicant_id', form.applicant_id)
        form_data.set('refuse_reason', form.refuse_reason)

        for (let item of form.file_list) {
          form_data.append('file_list', item)
        }
      }
      $$.post('/goal', form_data)
          .then(res => {
            store.commit('loading', false)
            if (res.data.status === 200) {
              props.success()
            } else {
              ElMessage({
                type: 'error',
                message: res.data.message,
              })
            }
          })
          .catch(res => {
            store.commit('loading', false)
            ElMessage({
              type: 'error',
              message: res,
            })
          })
    }
  })
}
</script>

<style lang="scss" scoped>
</style>