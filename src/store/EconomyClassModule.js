import $$ from '../axios'

export default {
    state: {
        eco_list: [],
    },
    getters: {
        eco_list (state) {
            return state.eco_list
        },
        eco_class_list (state) {
            let list = []
            for (let item of state.eco_list) {
                if (!item.kind) {
                    list.push(item)
                }
            }
            return list
        },
        eco_kind_list (state) {
            let dict = {}
            for (let item of state.eco_list) {
                if (!(item.classify in dict)) {
                    dict[item.classify] = []
                }
                if (item.kind) {
                    dict[item.classify].push(item)
                }
            }
            // console.log(dict);
            return dict
        },
    },
    mutations: {
        eco_list (state, data_list) {
            state.eco_list = data_list
        },
    },
    actions: {
        eco_list (context, payload) {
            $$.get('/economy?keyword=' + payload.keyword)
                .then(res => {
                    if (res.data.status === 200) {
                        context.commit('eco_list', res.data.data)
                    }
                })
        },
    },
}