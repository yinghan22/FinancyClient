import $$ from '../axios'

export default {
    stat: {job_list: {}},
    getters: {
        job_list (state) {
            return state.job_list
        },
    },
    mutations: {
        job_list (state, data_list) {
            state.job_list = data_list
        },
    },
    actions: {
        job_list (context, payload) {
            $$.get('/job?keyword=' + payload.keyword).then((res) => {
                if (res.data.status === 200) {
                    context.commit('job_list', res.data.data)
                }
            })
        },
    },
}
