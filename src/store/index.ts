import UserInfoModule from './UserInfoModule'
import {createStore} from 'vuex'
import Config from '../Config.js'
import ExpertGroupModule from './ExpertGroupModule.js'
import DeptModule from './DeptModule.js'
import UserModule from './UserModule.js'
import EconomyClassModule from './EconomyClassModule.js'
import JobRespModule from './JobRespModule.js'
import PerGoalModule from './PerGoalModule'
import AEBPModule from './AEBPModule.js'
import AWPModule from './AWPModule.js'
import UserBudget from './expert/UserBudget'

export default createStore({
    state: {
        root_url: Config.base_url,
        loading: false,
        area_loading: false,
        export_file_loading: false,
        approve_status_list: ['待申请', '待审批', '审批通过', '审批驳回'],
    },
    getters: {
        loading (state) {
            return state.loading
        },
        area_loading (state) {
            return state.area_loading
        },
        export_file_loading (state) {
            return state.export_file_loading
        },
        approve_status_list (state) {
            return state.approve_status_list
        },
    },
    mutations: {
        loading (state, status) {
            state.loading = status
        },
        export_file_loading (state, status) {
            state.export_file_loading = status
        },

        area_loading (state, status) {
            state.area_loading = status
        },
    },
    actions: {
        loading (context, payload: { status: Boolean }) {
            context.commit('loading', payload.status)
        },
    },
    modules: {
        UserInfoModule,
        UserModule,
        ExpertGroupModule,
        DeptModule,
        EconomyClassModule,
        JobRespModule,
        PerGoalModule,
        AEBPModule,
        AWPModule,
        UserBudget,
    },
})
