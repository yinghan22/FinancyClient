import UserInfoModule from './UserInfoModule';
import {createStore} from 'vuex';
import Config from '../Config.js';
import ExpertGroupModule from './ExpertGroupModule.js';
import DeptModule from './DeptModule.js';
import UserModule from './UserModule.js';
import EconomyClassModule from './EconomyClassModule.js';
import JobRespModule from './JobRespModule.js';
import PerGoalModule from './PerGoalModule';
import AEBPModule from './AEBPModule.js';
import AWPModule from './AWPModule.js';

export default createStore({
    state: {
        root_url: Config.base_url,
        loading: false,
        export_file_loading: false,
        approve_status_list: ['待申请', '待审批', '审批通过', '审批驳回'],
    },
    getters: {
        loading(state) {
            return state.loading;
        },
        export_file_loading(state) {
            return state.export_file_loading;
        },
        approve_status_list(state) {
            return state.approve_status_list;
        },
    },
    mutations: {
        loading(state, status) {
            state.loading = status;
        },
        export_file_loading(state, status) {
            state.export_file_loading = status;
        },
    },
    actions: {},
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
    },
});
