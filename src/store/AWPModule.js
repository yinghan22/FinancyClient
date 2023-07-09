import $$ from '../axios';

export default {
    state: {
        awp_list: [],
    },
    getters: {
        awp_list(state) {
            return state.awp_list;
        },
    },
    mutations: {
        awp_list(state, data_list) {
            state.awp_list = data_list;
        },
    },
    actions: {
        awp_list(context) {
            $$.get('/awp/-1').then(res => {
                if (res.data.status) {
                    context.commit('awp_list', res.data.data);
                }
            });
        },
    },
};