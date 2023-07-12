import $$ from '../axios'

export default {
    state: {
        dept_list: [],
    },
    getters: {
        dept_list (state) {
            return state.dept_list
        },
    },
    mutations: {
        dept_list (state, data_list) {
            state.dept_list = data_list
        },
    },
    actions: {
        dept_list (context, payload) {
            $$.get('/dept?keyword=' + payload.keyword).then(res => {
                if (res.data.status === 200) {
                    context.commit('dept_list', res.data.data)
                }
            })
        },
    },
}