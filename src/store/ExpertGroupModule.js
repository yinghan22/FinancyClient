import $$ from '../axios';

export default {
    state: {
        expert_group: [],
    },
    getters: {
        expert_group(state) {
            return state.expert_group;
        },
    },
    mutations: {
        expert_group(state, data_list) {
            state.expert_group = data_list;
        },
    },
    actions: {
        expert_group(context, payload) {
            $$.get('/group/-1').then(res => {
                if (res.data.status === 200) {
                    context.commit('expert_group', res.data.data);
                }
            });
        },
    },
};