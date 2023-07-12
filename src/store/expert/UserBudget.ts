import $$ from '../../axios'

export default {
    state: {
        user_budget: [],
    },
    getters: {
        user_budget (state) {
            return state.user_budget
        },
    },
    mutations: {
        user_budget (state, data_list) {
            state.user_budget = data_list
        },
    },
    actions: {
        user_budget (context, payload: {
            curr_page: Number,
            page_size: Number,
            callBack: Function
        }) {
            $$.get(`/budget/-1?reverse=1&current_page=${payload.curr_page}&page_size=${payload.page_size}`, {
                params: {
                    select_by: JSON.stringify(['applicant_id']),
                    select: JSON.stringify({applicant_id: context.getters['user_group']}),
                },
            }).then((res => {
                if (res.data.status == 200) {
                    context.commit('user_budget', res.data.data)
                }
            }))
        },
    },
}