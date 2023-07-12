import $$ from '../axios'
import * as XLSX from 'xlsx'
import {ElMessage} from 'element-plus'

async function get_all_data (module_name, field_name) {
    let response = await $$.get(`/${module_name}`)
    let data = await response.data.data
    let res = []
    data.map(item => {
        let obj = {}
        Object.keys(item).forEach(key => {
            if (typeof (item[key]) === 'boolean') {
                item[key] = item[key] ? '是' : '否'
            }
            if (key in field_name) {
                obj[field_name[key]] = item[key]
            }
        })
        res.push(obj)
    })
    return res
}

const Mapper = {
    async user () {
        const field_name = {
            'id': '工号',
            'name': '姓名',
            'pro_title': '职称',
            'job_title': '职务',
            'dept_name': '隶属教研室（科室）',
            'comm': '备注',
        }
        let res = {}
        res['data'] = await get_all_data('user', field_name)
        res['header'] = ['工号', '姓名', '职称', '职务', '隶属教研室（科室）', '备注']
        res['title'] = '部门基本信息--人员情况表'

        return res
    },

    async job_resp () {
        const field_name = {
            'code': '职责编号',
            'abstract': '职责概述',
            'detail': '职责内容描述',
            'operator_name': '经办人',
            'leader_name': '责任领导',
            'comm': '备注',
        }
        let res = {}
        res['data'] = await get_all_data('job', field_name)
        res['header'] = ['职责编号', '职责概述', '职责内容描述', '经办人', '责任领导', '备注']
        res['title'] = '部门基本信息-工作职责'
        return res
    },

    async per_goal () {
        const field_name = {
            'code': '绩效编号',
            'quota_1': '一级指标',
            'quota_2': '二级指标',
            'quota_3': '三级指标',
            'quota_value': '指标值',
            'source': '指标来源',
            'comm': '备注',
        }
        let res = {}
        res['data'] = await get_all_data('goal', field_name)
        res['header'] = ['绩效编号', '一级指标', '二级指标', '三级指标', '指标值', '指标来源', '备注']
        res['title'] = '部门基本信息——绩效目标表'
        return res
    },

    async awp () {
        const field_name = {
            'code': '计划编号',
            'name': '计划名称',
            'detail': '计划内容',
            'job_resp_code': '隶属工作职责编码',
            'job_resp_abst': '职责概述',
            'per_goal_code': '支撑部门绩效目标编码',
            'carry_out': '上年度是否开展',
            'comm': '备注',
        }
        let res = {}
        res['data'] = await get_all_data('awp', field_name)
        res['header'] = ['计划编号', '计划名称', '计划内容', '隶属工作职责编码', '职责概述', '支撑部门绩效目标编码', '上年度是否开展', '备注']
        res['title'] = '部门年度工作计划'
        return res
    },

    async aebp () {
        const field_name = {
            'code': '业务单编号',
            'eco_class_name': '经济分类',
            'detail': '业务经济内容',
            'start_date': '开展月份',
            'content': '产生支出内容',
            'annual_work_plan_id': '衔接计划编码',
            'carry_out': '上年度是否开展',
            'comm': '备注',
        }
        let res = {}
        res['data'] = await get_all_data('aebp', field_name)
        res['header'] = ['业务单编号', '经济分类', '业务经济内容', '开展月份', '产生支出内容', '衔接计划编码', '上年度是否开展', '备注']
        res['title'] = '部门年度经济业务计划单'
        return res
    },

    async budget () {
        const field_name = {
            'id': '序号',
            'eco_class_name': '经济分类',
            'budget_price': '预算金额',
            'aebp_id': '衔接经济业务编码',
            'detail': '详细测算过程',
            'actual_cost': '上年度本业务实际支出数',
            'diff_reason': '“预算金额”与“上年度本业务实际支出数”差异说明',
            'comm': '备注',
        }
        let res = {}
        res['data'] = await get_all_data('budget', field_name)
        res['header'] = ['序号', '经济分类', '预算金额', '衔接经济业务编码', '详细测算过程', '上年度本业务实际支出数', '“预算金额”与“上年度本业务实际支出数”差异说明', '备注']
        res['title'] = '部门公用经费预算表'
        return res
    },

    async teach () {
        const field_name = {
            'id': '序号',
            'dept_name': '教学院部名称',
            'year': '统计年度',
            'major_num': '专业数量',
            'province_key_discipline_num': '省级重点学科数量',
            'undergraduate_num': '本科学生人数',
            'province_first_class_course_num': '省级一流课程数量',
            'province_first_class_major_num': '省级一流专业数量',
            'nation_first_class_course_num': '国家级一流课程数量',
            'nation_first_class_major_num': '国家级一流专业数量',
            'province_teach_reward': '省级以上教学成果奖',
            'top_reward_num': '教育部认可的竞赛最高奖获奖项目数量',
        }
        let res = {}
        res['data'] = await get_all_data('teach', field_name)
        res['header'] = ['序号', '教学院部名称', '统计年度', '专业数量', '省级重点学科数量', '本科学生人数', '省级一流课程数量', '省级一流专业数量', '国家级一流课程数量', '国家级一流专业数量', '省级以上教学成果奖', '教育部认可的竞赛最高奖获奖项目数量']
        res['title'] = '部门公用经费预算信息教学活动方面统计表（教务处填报）'
        return res
    },

    async research () {
        const field_name = {
            'id': '序号',
            'dept_name': '教学院部名称',
            'year': '统计年度',
            'province_research_num': '省级科研项目数量',
            'province_research_fund': '省级科研经费（万元）',
            'province_key_lab_num': '省级重点实验室数量',
            'province_reward_num': '省级科研获奖数量',
            'nation_research_num': '国家级科研项目数量',
            'nation_research_fund': '国家级科研经费（万元）',
            'nation_key_lab_num': '国家级重点实验室数量',
            'nation_reward_num': '国家级科研获奖数量',
            'fund_total': '横向科研项目经费（万元）',
            'comm': '备注',
        }
        let res = {}
        res['data'] = await get_all_data('research', field_name)
        res['header'] = ['序号', '教学院部名称', '统计年度', '省级科研项目数量', '省级科研经费（万元）', '省级重点实验室数量', '省级科研获奖数量', '国家级科研项目数量', '国家级科研经费（万元）', '国家级重点实验室数量', '国家级科研获奖数量', '横向科研项目经费（万元）', '备注']
        res['title'] = '部门公用经费预算信息科研活动方面统计表（科研处填报）'
        return res
    },

    label: {
        'user': '部门基本信息——人员情况表',
        'job_resp': '部门基本信息——工作职责',
        'per_goal': '部门年度绩效目标表',
        'awp': '部门年度工作计划表',
        'aebp': '部门年度经济业务计划单',
        'budget': '部门公用经费预算表',
        'teach': '信息统计——教学活动方面',
        'research': '信息统计——科研活动方面',
    },
}

export default async function (data) {
    if (data.length === 0)
        return ElMessage({
            type: 'error',
            message: '请选择需要导出的数据表',
        })
    const workbook = XLSX.utils.book_new()
    for (let item of data) {
        const res = await Mapper[item]()
        const sheet = XLSX.utils.json_to_sheet(res.data, {
            header: res.header,
            origin: {r: 1, c: 0},
        })
        sheet.style = {
            font: {
                name: '新宋体',
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center',
            },
        }
        sheet['!merges'] = [
            {s: {r: 0, c: 0}, e: {r: 0, c: res.header.length - 1}},
        ]
        sheet['A1'] = {
            t: 's',
            v: res.title,
            s: {
                font: {
                    bold: true,
                },
                alignment: {
                    horizontal: 'center',
                },
            },
        }
        XLSX.utils.book_append_sheet(workbook, sheet, Mapper.label[item])
    }
    XLSX.writeFile(workbook, '数据表.xlsx', {
        bookType: 'xlsx',
    })
};