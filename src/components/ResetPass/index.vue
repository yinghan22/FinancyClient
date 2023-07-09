<template>
  <el-form ref="form_ref" :model="pass" :rules="pass_rules" label-position="top">
    <el-form-item label="旧密码" prop="old_password" required>
      <el-input v-model.trim="pass.old_password"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="new_password" required>
      <el-input v-model.trim.lazy="pass.new_password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirm" required>
      <el-input v-model.trim.lazy="pass.confirm"></el-input>
    </el-form-item>
    <el-form-item>
      <div style="width: 100%;height: 100%;display: flex;justify-content: flex-end;">
        <el-button type="primary" @click="reset_pass(form_ref)">确认修改密码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import type {FormInstance, FormRules} from 'element-plus';
import {ElMessage} from 'element-plus';
import {useStore} from 'vuex';

const store = useStore();
const props = defineProps({
  success: {
    type: Function,
    default: () => {
    },
  },
});
const pass = reactive({
  old_password: '',
  new_password: '',
  confirm: '',
});
const form_ref = ref<FormInstance>();
const new_pass_valid = (rule: any, value: any, callback: any) => {
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
  } else if (value.trim() != pass.new_password) {
    return callback(new Error('两次密码不一致！请重新确认密码！'));
  }
  callback();
};

const pass_rules = reactive<FormRules>({
  old_password: [{required: true, message: '请输入旧密码', trigger: 'blur'}],
  new_password: [{validator: new_pass_valid, trigger: 'blur'}],
  confirm: [{validator: confirm_valid, trigger: 'blur'}],
});

const reset_pass = (form_el: FormInstance | undefined) => {
  if (!form_el) return;
  form_el.validate((valid) => {
    if (valid) {
      store.dispatch('reset_pass', {
        old_password: pass.old_password,
        new_password: pass.new_password,
        confirm: pass.confirm,
        success() {
          props.success();
          ElMessage({
            type: 'success',
            message: '密码更改成功',
          });
        },
      });
    }
  });

};
</script>

<style lang="scss" scoped>
</style>