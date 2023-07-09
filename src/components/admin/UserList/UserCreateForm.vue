<template>
  <el-form ref="form_ref" :model="form" :rules="create_rules" label-position="right" label-width="60px" status-icon>
    <el-form-item label="工号" prop="id" required>
      <el-input v-model.trim="form.id"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name" required>
      <el-input v-model.trim="form.name"></el-input>
    </el-form-item>
    <el-form-item label="类型" prop="usertype" required>
      <el-select v-model="form.usertype" filterable>
        <el-option v-for="(item,index) in usertype_map" :label="item" :value="index"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="密码" prop="password" required>
      <el-input v-model.trim="form.password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="职务" prop="job_title" required>
      <el-input v-model.trim="form.job_title"></el-input>
    </el-form-item>
    <el-form-item label="职称">
      <el-input v-model.trim="form.pro_title"></el-input>
    </el-form-item>
    <el-form-item label="部门" prop="dept_id" required>
      <el-select v-model="form.dept_id" filterable>
        <el-option v-for="item in dept_list" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.comm" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <div style="width: 100%;height: 100%;display: flex;justify-content: flex-end;">
        <el-button type="primary" @click="create_data(form_ref)">确认</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import type {FormInstance, FormRules} from 'element-plus';
import {ElLoading, ElMessage} from 'element-plus';
import $$ from '../../../axios';

const props = defineProps({
  usertype_map: Object,
  dept_list: Object,
  success: {
    type: Function,
    required: true,
    default: () => {
    },
  },
});
const form = reactive({
  id: '',
  name: '',
  password: '',
  usertype: '',
  pro_title: '',
  job_title: '',
  dept_id: '',
  comm: '',
});

const form_ref = ref<FormInstance>();

const create_rules = reactive<FormRules>({
  id: [{required: true, message: '请输入工号', trigger: 'blur'}],
  name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
  password: [{required: true, trigger: 'blur', message: '请输入密码'},
    {min: 6, message: '密码长度不少于6位', trigger: 'blur'}],
  usertype: [{required: true, message: '请选择用户类型', trigger: 'change'}],
  job_title: [{required: true, message: '请输入职务', trigger: 'blur'}],
  dept_id: [{required: true, message: '请选择任职部门', trigger: 'change'}],
});

const create_data = (form_el: FormInstance | undefined) => {
  form_el.validate((valid) => {
    if (valid) {
      const loading = ElLoading.service();
      let form_data = new FormData();
      {
        form_data.set('id', form.id);
        form_data.set('name', form.name);
        form_data.set('password', form.password);
        form_data.set('usertype', form.usertype);
        form_data.set('job_title', form.job_title);
        form_data.set('pro_title', form.pro_title);
        form_data.set('dept_id', form.dept_id);
        form_data.set('comm', form.comm);
      }
      $$.post('/user', form_data)
          .then(res => {
            loading.close();
            if (res.data.status === 200) {
              props.success();
            } else {
              ElMessage({
                type: 'error',
                message: res.data.message,
              });
            }
          })
          .catch(res => {
            loading.close();
            ElMessage({
              type: 'error',
              message: res,
            });
          });
    }
  });
};
</script>

<style lang="scss" scoped>
</style>