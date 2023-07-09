<template>
	<el-form
		ref="form_ref"
		:model="form"
		:rules="create_rules"
		label-position="top"
		status-icon
	>
		<div class="d-flex w-100 flex-row">
			<table class="flex-1">
				<tr>
					<td colspan="2">
						<el-form-item label="计划名称" prop="name" required>
							<el-input v-model.trim="form['name']"></el-input>
						</el-form-item>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<el-form-item label="计划详情" prop="detail" required>
							<el-input
								v-model.trim="form['detail']"
								type="textarea"
							></el-input>
						</el-form-item>
					</td>
				</tr>
				<tr>
					<td>
						<el-form-item
							label="隶属工作职责编码"
							prop="job_resp_id"
							required
						>
							<el-select v-model="form['job_resp_id']" filterable>
								<el-option
									v-for="item in store.getters['job_list']"
									:label="item.code"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
					</td>
					<td>
						<el-form-item
							label="绩效编码"
							prop="per_goal_id"
							required
						>
							<el-select v-model="form['per_goal_id']" filterable>
								<el-option
									v-for="item in store.getters['goal_list']"
									:label="item.code"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<el-form-item
							label="上年度是否开展"
							prop="carry_out"
							required
						>
							<el-radio-group v-model="form['carry_out']">
								<el-radio :label="true">已开展</el-radio>
								<el-radio :label="false">未开展</el-radio>
							</el-radio-group>
						</el-form-item>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<el-form-item label="备注">
							<el-input
								v-model.trim="form['comm']"
								type="textarea"
							></el-input>
						</el-form-item>
					</td>
				</tr>
			</table>
			<div>
				<table>
					<tr>
						<td>
							<el-form-item label="部门" prop="dept_id" required>
								<el-select filterable v-model="form['dept_id']">
									<el-option
										v-for="item in store.getters[
											'dept_list'
										]"
										:label="item.name"
										:value="item.id"
									></el-option>
								</el-select>
							</el-form-item>
						</td>
					</tr>
					<tr>
						<td>
							<el-form-item
								label="申请人"
								prop="requester"
								required
							>
								<el-select
									filterable
									v-model="form['requester']"
								>
									<el-option
										v-for="item in store.getters[
											'user_list'
										]"
										:label="item.id + ' - ' + item.name"
										:value="item.id"
									></el-option>
								</el-select>
							</el-form-item>
						</td>
					</tr>
					<tr>
						<td>
							<el-form-item
								label="审批小组"
								prop="applicant_id"
								required
							>
								<el-select
									v-model="form['applicant_id']"
									filterable
								>
									<el-option
										v-for="item in store.getters[
											'expert_group'
										]"
										:label="item['tag']"
										:value="item['id']"
									>
									</el-option>
								</el-select>
							</el-form-item>
						</td>
					</tr>
					<tr>
						<el-form-item label="审批状态" prop="status" required>
							<el-select
								v-model="form['status']"
								@change="status_change"
							>
								<el-option
									v-for="(item, index) in store.getters[
										'approve_status_list'
									]"
									:label="item"
									:value="index"
								></el-option>
							</el-select>
						</el-form-item>
					</tr>
					<tr v-if="form['status'] == 3">
						<td>
							<el-form-item
								:required="form['status'] == 3"
								label="审批驳回原因"
								prop="refuse_reason"
							>
								<el-input
									v-model="form['refuse_reason']"
									type="textarea"
								></el-input>
							</el-form-item>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<el-form-item>
			<div
				style="
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: flex-end;
				"
			>
				<el-button type="primary" @click="create_data(form_ref)"
					>确认</el-button
				>
			</div>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
	import type { FormInstance, FormRules } from 'element-plus';
	import { ElMessage } from 'element-plus';
	import { reactive, ref } from 'vue';
	import $$ from '../../../axios';
	import { useStore } from 'vuex';
	import now_datetime from '../../../utils/now.js';

	const store = useStore();
	const props = defineProps({
		success: {
			type: Function,
			required: true,
			default: () => {},
		},
	});

	const form_ref = ref<FormInstance>();
	const form = reactive({
		name: '',
		detail: '',
		job_resp_id: '',
		per_goal_id: '',
		carry_out: '',
		comm: '',
		dept_id: '',

		status: 0,
		requester: '',
		applicant_id: '',
		refuse_reason: '',
	});

	const status = form.status;
	let request_time = false;
	let approve_time = false;

	const status_change = (e: any) => {
		if (status == 0 && e == 1) {
			request_time = true;
		} else if (status == 1 && e != 0 && e != 1) {
			approve_time = true;
		}
	};

	const create_rules = reactive<FormRules>({
		name: [{ required: true, message: '该选项不得为空', trigger: 'blur' }],
		detail: [
			{ required: true, message: '该选项不得为空', trigger: 'blur' },
		],
		job_resp_id: [
			{ required: true, message: '该选项不得为空', trigger: 'blur' },
		],
		per_goal_id: [
			{ required: true, message: '该选项不得为空', trigger: 'blur' },
		],
		carry_out: [
			{ required: true, message: '该选项不得为空', trigger: 'blur' },
		],
		dept_id: [
			{ required: true, message: '该选项不得为空', trigger: 'blur' },
		],
		requester: [
			{ required: true, message: '该选项不得为空', trigger: 'blur' },
		],
	});

	const create_data = (form_el: FormInstance | undefined) => {
		if (!form_el) return;
		form_el.validate((valid) => {
			if (valid) {
				store.commit('loading', true);
				let form_data = new FormData();
				{
					form_data.set('detail', form.detail);
					form_data.set('name', form.name);
					form_data.set('job_resp_id', form.job_resp_id);
					form_data.set('per_goal_id', form.per_goal_id);
					form_data.set('carry_out', form.carry_out);
					form_data.set('comm', form.comm);
					form_data.set('dept_id', form.dept_id);

					form_data.set('status', JSON.stringify(form.status));
					form_data.set('requester', form.requester);
					form_data.set('applicant_id', form.applicant_id);
					form_data.set('refuse_reason', form.refuse_reason);

					if (request_time) {
						form_data.set('request_time', now_datetime());
					}
					if (approve_time) {
						form_data.set('approve_time', now_datetime());
					}
				}
				$$.post('/awp', form_data)
					.then((res) => {
						store.commit('loading', false);
						if (res.data.status === 200) {
							ElMessage({
								type: 'success',
								message: '新增成功',
							});
							props.success();
						} else {
							ElMessage({
								type: 'error',
								message: res.data.message,
							});
						}
					})
					.catch((res) => {
						store.commit('loading', false);
						ElMessage({
							type: 'error',
							message: res,
						});
					});
			}
		});
	};
</script>

<style lang="scss" scoped></style>
