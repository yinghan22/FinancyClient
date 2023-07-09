<template>
  <el-col
      :span="9"
      style="border: 1px solid #EEE; border-radius: 5px; padding: 10px"
  >
    <h3>登录</h3>
    <el-form ref="form_ref" :model="form" :rules="rules">
      <el-form-item label="工号" prop="id">
        <el-input v-model.lazy="form.id"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
            v-model.lazy="form.password"
            type="password"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <div
            style="
						width: 100%;
						height: 100%;
						display: flex;
						justify-content: flex-end;
					"
        >
          <el-button type="danger" @click="reset_form(form_ref)">
            重置
          </el-button>
          <el-button type="primary" @click="submit_form(form_ref)">
            登录
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import type {FormInstance, FormRules} from 'element-plus';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

const store = useStore();
const router = useRouter();

//////////////////////
const valid_id = (rule: any, value: any, callback: any) => {
  value = value.trim();
  if (!value) {
    return callback(new Error('请输入您的工号'));
  } else {
    callback();
  }
};

const valid_password = (rule: any, value: any, callback: any) => {
  value = value.trim();
  if (!value) {
    return callback(new Error('请输入您的密码'));
  } else if (value.length < 6) {
    return callback(new Error('请重新输入您的密码'));
  } else {
    callback();
  }
};
//////////////////////

const form = reactive({
  id: '',
  password: '',
});
const form_ref = ref<FormInstance>();
const rules = reactive<FormRules>({
  id: [{validator: valid_id, trigger: 'blur'}],
  password: [{validator: valid_password, trigger: 'blur'}],
});
const reset_form = (form_el: FormInstance | undefined) => {
  if (!form_el) return;
  form_el.resetFields();
};

const submit_form = (form_el: FormInstance | undefined) => {
  if (!form_el) return;
  form_el.validate((valid) => {
    if (valid) {
      store.dispatch('login', {
        id: form.id,
        password: form.password,
        success() {
          router.push(`/${store.getters['userinfo'].usertype}`);
        }, error() {
          router.push('/login');
        },
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.el-col {
  margin: 6em auto 0;
}
</style>
