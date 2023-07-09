import $$ from '../axios';

export default {
    state: {
        user_list: [],
    },
    getters: {
        user_list(state) {
            return state.user_list;
        },
    },
    mutations: {
        user_list(state, data_list) {
            state.user_list = data_list;
        },
    },
    actions: {
        user_list(context) {
            $$.get('/user/-1').then(res => {
                if (res.data.status === 200) {
                    context.commit('user_list', res.data.data);
                }
            });
        },
    },
};