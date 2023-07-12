import $$ from '../axios'

export default {
    stat: {goal_list: {}},
    getters: {
        goal_list (state) {
            return state.goal_list
        },
    },
    mutations: {
        goal_list (state, data_list) {
            state.goal_list = data_list
        },
    },
    actions: {
        goal_list (context, payload) {
            $$.get('/goal?keyword=' + payload.keyword).then((res) => {
                if (res.data.status === 200) {
                    context.commit('goal_list', res.data.data)
                }
            })
        },
    },
}
