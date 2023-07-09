<template>
    <el-form ref="form_ref" :model="form" :rules="create_rules" label-position="top" label-width="60px" status-icon>
        <el-form-item label="分组名称" prop="name" required>
            <el-input v-model.trim="form.name"></el-input>
        </el-form-item>
        <el-form-item label="分组详情">
            <el-input v-model.trim="form.detail" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
            <div style="width: 100%;height: 100%;display: flex;justify-content: flex-end;">
                <el-button type="primary" @click="create_data(form_ref)">确认</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import type {FormInstance, FormRules} from 'element-plus';
import {ElMessage} from 'element-plus';
import {reactive, ref} from 'vue';
import $$ from '../../../axios';

const props = defineProps({
    success: {
        type: Function,
        required: true,
        default: () => {
        },
    },
});

const form_ref = ref<FormInstance>();
const form = reactive({
    name: '',
    detail: '',
    expert: '',
});
const create_rules = reactive<FormRules>({
    name: [{required: true, message: '请输入分组名称', trigger: 'blur'}],
});

const create_data = (form_el: FormInstance | undefined) => {
    if (!form_el) return;
    form_el.validate(valid => {
        if (valid) {
            let form_data = new FormData();
            {
                form_data.set('name', form.name);
                form_data.set('detail', form.detail);
                form_data.set('expert', form.expert);
            }
            $$.post('/group', form_data)
                .then(res => {
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