import $$ from '../axios';
import {ElMessage} from 'element-plus';
import {Base64} from 'js-base64';

export default {
    state: {
        userinfo: null,
    },
    getters: {
        userinfo(state) {
            return state.userinfo;
        },
    },
    mutations: {
        userinfo(state, userinfo) {
            state.userinfo = userinfo;
        },
    },
    actions: {
        login(context, payload) {
            let form_data = new FormData();
            form_data.set('id', payload.id);
            form_data.set('password', payload.password);
            const url = `/user/login`;
            $$.post(url, form_data)
                .then((res) => {
                    if (res.data.status === 200) {
                        context.commit('userinfo', res.data.data);
                        localStorage.setItem('token', Base64.encode(`${payload.id}&${payload.password}`));
                        if (payload.success)
                            payload.success();
                    } else {
                        ElMessage({
                            type: 'error',
                            message: res.data.message,
                        });
                        if (payload.error)
                            payload.error();
                    }
                }).catch((res) => {
                if (payload.error)
                    payload.error();
                ElMessage({
                    type: 'error',
                    message: res,
                });
            });
        },

        logout(context, payload) {
            const url = `/user/logout`;
            $$.post(url)
                .then(res => {
                    ElMessage({
                        type: 'success',
                        message: '请重新登录',
                    });
                    localStorage.removeItem('token');
                    context.commit('userinfo', null);
                    if (payload.success)
                        payload.success();
                })
                .catch(res => {
                    ElMessage({
                        type: 'success',
                        message: res,
                    });
                });
        },
        set_pass(context, payload) {
            let form_data = new FormData();
            {
                form_data.set('password', payload.password);
                form_data.set('confirm', payload.confirm);
            }
            $$.post(`/user/setpass/${payload.id}`, form_data).then(res => {
                if (res.data.status === 200) {
                    if (payload.success)
                        payload.success();
                } else {
                    ElMessage({
                        type: 'error',
                        message: res.data.message,
                    });
                }
            }).catch(res => {
                ElMessage({
                    type: 'error',
                    message: res,
                });
            });
        },
        reset_pass(context, payload) {
            let form_data = new FormData();
            {
                form_data.set('old_password', payload.old_password);
                form_data.set('new_password', payload.new_password);
                form_data.set('confirm', payload.confirm);
            }
            $$.post(`/user/resetpass/${context.state.userinfo.id}`, form_data).then(res => {
                if (res.data.status === 200) {
                    if (payload.success)
                        payload.success();
                } else {
                    ElMessage({
                        type: 'error',
                        message: res.data.message,
                    });
                }
            }).catch(res => {
                ElMessage({
                    type: 'error',
                    message: res,
                });
            });
        },
    },
};