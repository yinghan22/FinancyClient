import $$ from '../axios'

export default {
    state: {
        data_budget: [],
    },
    getters: {
        data_budget (state) {
            return state.data_budget
        },
    },
    mutations: {
        data_budget (state, data_list) {
            state.data_budget = data_list
        },
    },
    actions: {
        fetch_budget (context, payload) {
            $$.get('/budget?keyword=' + payload.keyword).then(res => {
                if (res.data.status) {
                    context.commit('data_budget', res.data.data)
                }
            })
        },
    },
}