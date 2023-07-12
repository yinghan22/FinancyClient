import $$ from '../axios'

export default {
    state: {
        aebp_list: [],
    },
    getters: {
        aebp_list (state) {
            return state.aebp_list
        },
    },
    mutations: {
        aebp_list (state, data_list) {
            state.aebp_list = data_list
        },
    },
    actions: {
        aebp_list (context, payload) {
            $$.get('/aebp?keyword=' + payload.keyword).then(res => {
                if (res.data.status) {
                    context.commit('aebp_list', res.data.data)
                }
            })
        },
    },
}