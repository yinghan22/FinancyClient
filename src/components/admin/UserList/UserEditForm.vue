<template>
  <el-form ref="form_ref" :model="form" :rules="create_rules" label-position="right" label-width="80px" status-icon>
    <el-form-item label="工号" prop="id" required>
      <el-input v-model.trim="form['id']" disabled></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name" required>
      <el-input v-model.trim="form['name']"></el-input>
    </el-form-item>
    <el-form-item label="类型" prop="usertype" required>
      <el-select v-model="form['usertype']" filterable>
        <el-option v-for="(item,index) in usertype_map" :label="item" :value="index"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="职务" prop="job_title" required>
      <el-input v-model.trim="form['job_title']"></el-input>
    </el-form-item>
    <el-form-item label="职称">
      <el-input v-model.trim="form['pro_title']"></el-input>
    </el-form-item>
    <el-form-item label="部门" prop="dept_id" required>
      <el-select v-model="form['dept_id']" filterable>
        <el-option v-for="item in dept_list" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form['comm']" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <div style="width: 100%;height: 100%;display: flex;justify-content: flex-end;">
        <el-button type="primary" @click="update_data(form_ref)">确认</el-button>
      </div>
    </el-form-item>
  </el-form>
  <el-divider/>
  <el-form ref="pass_form_ref" :model="pass" :rules="pass_rules">
    <el-form-item label="设置密码" prop="password">
      <el-input v-model.trim.lazy="pass.password" placeholder="需要重置密码时输入，输入时密码长度不少于 6 位"
                type="password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirm">
      <el-input v-model.trim.lazy="pass.confirm" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <div style="width: 100%;height: 100%;display: flex;justify-content: flex-end;">
        <el-button type="primary" @click="set_pass(pass_form_ref)">确认修改密码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import type {FormInstance, FormRules} from 'element-plus';
import {ElLoading, ElMessage} from 'element-plus';
import $$ from '../../../axios';
import {useStore} from 'vuex';

const store = useStore();
const props = defineProps({
  usertype_map: Object,
  dept_list: Object,
  form: {
    type: Object,
    required: true,
    default: () => {
      return {
        id: '',
        name: '',
        usertype: '',
        pro_title: '',
        job_title: '',
        dept_id: '',
        comm: '',
      };
    },
  },
  success: {
    type: Function,
    required: true,
    default: () => {
    },
  },
});

const pass = reactive({
  password: '',
  confirm: '',
});

const form_ref = ref<FormInstance>();

const create_rules = reactive<FormRules>({
  id: [{required: true, message: '请输入工号', trigger: 'blur'}],
  name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
  usertype: [{required: true, message: '请选择用户类型', trigger: 'blur'}],
  job_title: [{required: true, message: '请输入职务', trigger: 'blur'}],
  dept_id: [{required: true, message: '请选择任职部门', trigger: 'blur'}],
});

const update_data = (form_el: FormInstance | undefined) => {
  form_el.validate((valid) => {
    if (!form_el) return;
    if (valid) {
      const loading = ElLoading.service();
      const id = props.form.id;
      let form_data = new FormData();
      {
        form_data.set('name', props.form.name);
        form_data.set('usertype', props.form.usertype);
        form_data.set('job_title', props.form.job_title);
        form_data.set('pro_title', props.form.pro_title);
        form_data.set('dept_id', props.form.dept_id);
        form_data.set('comm', props.form.comm);
      }
      $$.put(`/user/${id}`, form_data)
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

const pass_form_ref = ref<FormInstance>();
const pass_valid = (rule: any, value: any, callback: any) => {
  if (value.trim() == '') {
    return callback(new Error('请输入新密码'));
  } else if (value.trim().length < 6) {
    return callback(new Error('新密码长度不能少于 6 位'));
  }
  callback();
};
const confirm_valid = (rule: any, value: any, callback: any) => {
  if (value.trim() == '') {
    return callback(new Error('请确认密码'));
  } else if (value.trim() != pass.password) {
    return callback(new Error('两次密码不一致！请重新确认密码！'));
  }
  callback();
};

const pass_rules = reactive<FormRules>({
  password: [{validator: pass_valid, trigger: 'blur'}],
  confirm: [{validator: confirm_valid, trigger: 'blur'}],
});

const set_pass = (form_el: FormInstance | undefined) => {
  if (!form_el) return;
  form_el.validate((valid) => {
    if (valid) {
      store.dispatch('set_pass', {
        id: props.form.id,
        password: pass.password,
        confirm: pass.confirm,
        success: () => {
          form_el.resetFields();
          ElMessage({
            type: 'success',
            message: '密码修改成功',
          });
        },
      });
    }
  });

};
</script>

<style lang="scss" scoped>
</style>