import{C as le,L as de}from"./ListGroup-f347cb3b.js";import{d as N,u as I,b as s,o as r,f as C,h as t,c as V,w as d,i as _,s as J,e as a,F as D,g as P,n as B,k as $,j as F,C as oe,t as A,y as G,z as R,a as z,r as T,l as ne,p as ue,q as se,_ as re,v as ie,x as _e}from"./index-c05e949c.js";const pe={class:"border-bottom-1 d-flex flex-row justify-content-between align-items-center"},me=t("p",null,"衔接业务单审核",-1),fe={class:"d-flex flex-row-1"},ce={class:"flex-1"},be={colspan:"2"},ye={colspan:"2"},Ve={colspan:"2"},ge={colspan:"2"},ve={class:"m-0 p-0 w-100 d-flex flex-row justify-content-end"},xe=N({__name:"ApproveAEBP",props:{data:Object,refuse:{type:Function,default:(f,e)=>{}},pass:{type:Function,default:()=>{}}},setup(f){const e=f,y=I(),v=async()=>{if(!e.data.refuse_reason||e.data.refuse_reason.trim()==""){$.error("【衔接业务单审核】请输入驳回原因");return}e.data.refuse_reason=e.data.refuse_reason.trim();let o=new FormData;o.set("status","3"),o.set("refuse_reason",e.data.refuse_reason),F.put(`/aebp/approve/${e.data.code}`,o).then(l=>{l.data.status===200?e.refuse("衔接业务单审核",e.data.refuse_reason):$.error(l.data.message)}).catch(l=>{$.error(l)})},x=()=>{y.commit("area_loading",!0);let o=new FormData;o.set("status","2"),F.put(`/aebp/approve/${e.data.code}`,o).then(l=>{l.data.status===200&&(e.data.status=2,$.success("【衔接业务单审核】审核通过")),y.commit("area_loading",!1)}).catch(()=>{y.commit("area_loading",!1)})};return(o,l)=>{const c=s("el-text"),i=s("el-input"),n=s("el-form-item"),U=s("el-date-picker"),j=s("el-option"),w=s("el-select"),m=s("el-option-group"),p=s("el-radio"),h=s("el-radio-group"),u=s("el-button"),O=s("el-form");return r(),C(D,null,[t("h3",pe,[me,t("span",null,[e.data.status==0?(r(),V(c,{key:0,type:"primary"},{default:d(()=>[_("待申请审核")]),_:1})):e.data.status==1?(r(),V(c,{key:1,type:"warning"},{default:d(()=>[_("待审核")]),_:1})):e.data.status==2?(r(),V(c,{key:2,type:"success"},{default:d(()=>[_("审核已通过")]),_:1})):e.data.status==3?(r(),V(c,{key:3,type:"danger"},{default:d(()=>[_("审核已驳回")]),_:1})):J("",!0)])]),a(O,{"label-position":"top"},{default:d(()=>[t("div",fe,[t("table",ce,[t("tr",null,[t("td",null,[a(n,{label:"经济业务计划单编号"},{default:d(()=>[a(i,{modelValue:e.data.code,"onUpdate:modelValue":l[0]||(l[0]=b=>e.data.code=b),readonly:""},null,8,["modelValue"])]),_:1})]),t("td",null,[a(n,{label:"开展月份"},{default:d(()=>[a(U,{modelValue:e.data.start_date,"onUpdate:modelValue":l[1]||(l[1]=b=>e.data.start_date=b),readonly:"",type:"month"},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"衔接计划编码"},{default:d(()=>[a(w,{modelValue:e.data.annual_work_plan_id,"onUpdate:modelValue":l[2]||(l[2]=b=>e.data.annual_work_plan_id=b),disabled:"",filterable:""},{default:d(()=>[(r(!0),C(D,null,P(B(y).getters.awp_list,b=>(r(),V(j,{label:b.code+" - "+b.name,value:b.code},null,8,["label","value"]))),256))]),_:1},8,["modelValue"])]),_:1})]),t("td",null,[a(n,{label:"经济类型"},{default:d(()=>[a(w,{modelValue:e.data.eco_class_id,"onUpdate:modelValue":l[3]||(l[3]=b=>e.data.eco_class_id=b),disabled:"",filterable:""},{default:d(()=>[(r(!0),C(D,null,P(B(y).getters.eco_class_list,b=>(r(),V(m,{label:b.classify+" - "+b.name},{default:d(()=>[(r(!0),C(D,null,P(B(y).getters.eco_kind_list[b.classify],L=>(r(),V(j,{label:L.classify+L.kind+" - "+L.name,value:L.id},null,8,["label","value"]))),256))]),_:2},1032,["label"]))),256))]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",be,[a(n,{label:"业务经济内容"},{default:d(()=>[a(i,{modelValue:e.data.detail,"onUpdate:modelValue":l[4]||(l[4]=b=>e.data.detail=b),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",ye,[a(n,{label:"产生支出内容"},{default:d(()=>[a(i,{modelValue:e.data.content,"onUpdate:modelValue":l[5]||(l[5]=b=>e.data.content=b),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",Ve,[a(n,{label:"上年度是否开展"},{default:d(()=>[a(h,{modelValue:e.data.carry_out,"onUpdate:modelValue":l[6]||(l[6]=b=>e.data.carry_out=b),disabled:""},{default:d(()=>[a(p,{label:!0},{default:d(()=>[_("已开展")]),_:1}),a(p,{label:!1},{default:d(()=>[_("未开展")]),_:1})]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",ge,[a(n,{label:"备注"},{default:d(()=>[a(i,{modelValue:e.data.comm,"onUpdate:modelValue":l[7]||(l[7]=b=>e.data.comm=b),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])])]),t("div",null,[t("table",null,[t("tr",null,[t("td",null,[a(n,{label:"部门"},{default:d(()=>[a(w,{modelValue:e.data.dept_id,"onUpdate:modelValue":l[8]||(l[8]=b=>e.data.dept_id=b),disabled:"",filterable:""},{default:d(()=>[a(j,{label:e.data.dept_name,value:e.data.dept_id},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"申请人"},{default:d(()=>[a(w,{modelValue:e.data.requester,"onUpdate:modelValue":l[9]||(l[9]=b=>e.data.requester=b),disabled:"",filterable:""},{default:d(()=>[a(j,{label:e.data.requester+" - "+e.data.requester_name,value:e.data.requester},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"审核小组"},{default:d(()=>[a(w,{modelValue:e.data.applicant_id,"onUpdate:modelValue":l[10]||(l[10]=b=>e.data.applicant_id=b),disabled:"",filterable:""},{default:d(()=>[a(j,{label:e.data.applicant_id+" - "+e.data.applicant_tag,value:e.data.applicant_id},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"审核驳回原因"},{default:d(()=>[a(i,{modelValue:e.data.refuse_reason,"onUpdate:modelValue":l[11]||(l[11]=b=>e.data.refuse_reason=b),rows:"10",type:"textarea"},null,8,["modelValue"])]),_:1})])])])])]),a(n,null,{default:d(()=>[t("div",ve,[a(u,{size:"small",title:"当前阶段驳回将终止审核",type:"danger",onClick:v},{default:d(()=>[_("驳回")]),_:1}),a(u,{size:"small",title:"通过审核将清空驳回原因",type:"primary",onClick:x},{default:d(()=>[_("通过")]),_:1})])]),_:1})]),_:1})],64)}}}),we={class:"border-bottom-1 d-flex flex-row justify-content-between align-items-center"},$e=t("p",null,"预算审核",-1),Ue={class:"d-flex flex-row-1"},ke={class:"flex-1"},qe={colspan:"2"},je={colspan:"2"},Fe={colspan:"2"},Ce={class:"m-0 p-0 w-100 d-flex flex-row justify-content-end"},Me=N({__name:"ApproveBudget",props:{data:Object,refuse:{type:Function,default:()=>{}},pass:{type:Function,default:()=>{}}},setup(f){const e=f,y=I(),v=()=>{if(!e.data.refuse_reason||e.data.refuse_reason.trim()==""){$.error("【预算审核】请输入驳回原因");return}e.data.refuse_reason=e.data.refuse_reason.trim();let o=new FormData;o.set("status","3"),o.set("refuse_reason",e.data.refuse_reason),F.put(`/budget/approve/${e.data.id}`,o).then(l=>{l.data.status===200?e.refuse("预算审核",e.data.refuse_reason):$.error(l.data.message)}).catch(l=>{$.error(l)})},x=()=>{y.commit("area_loading",!0);let o=new FormData;o.set("status",JSON.stringify(2)),F.put(`/budget/approve/${e.data.id}`,o).then(l=>{l.data.status===200&&e.pass(),y.commit("area_loading",!1)}).catch(()=>{y.commit("area_loading",!1)})};return(o,l)=>{const c=s("el-text"),i=s("el-input-number"),n=s("el-form-item"),U=s("el-option"),j=s("el-option-group"),w=s("el-select"),m=s("el-input"),p=s("el-button"),h=s("el-form");return r(),C(D,null,[t("h3",we,[$e,t("span",null,[e.data.status==0?(r(),V(c,{key:0,type:"primary"},{default:d(()=>[_("待申请审核")]),_:1})):e.data.status==1?(r(),V(c,{key:1,type:"warning"},{default:d(()=>[_("待审核")]),_:1})):e.data.status==2?(r(),V(c,{key:2,type:"success"},{default:d(()=>[_("审核已通过")]),_:1})):e.data.status==3?(r(),V(c,{key:3,type:"danger"},{default:d(()=>[_("审核已驳回")]),_:1})):J("",!0)])]),a(h,{modelValue:e.data,"onUpdate:modelValue":l[10]||(l[10]=u=>e.data=u),"label-position":"top"},{default:d(()=>[t("div",Ue,[t("table",ke,[t("tr",null,[t("td",null,[a(n,{label:"预算金额(元)"},{default:d(()=>[a(i,{modelValue:f.data.budget_price,"onUpdate:modelValue":l[0]||(l[0]=u=>f.data.budget_price=u),precision:2,step:.01,"controls-position":"right",readonly:""},null,8,["modelValue"])]),_:1})]),t("td",null,[a(n,{label:"上年度本业务实际支出(元)"},{default:d(()=>[a(i,{modelValue:f.data.actual_cost,"onUpdate:modelValue":l[1]||(l[1]=u=>f.data.actual_cost=u),modelModifiers:{trim:!0},precision:2,step:.01,"controls-position":"right",readonly:""},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"经济分类"},{default:d(()=>[a(w,{modelValue:f.data.economy_id,"onUpdate:modelValue":l[2]||(l[2]=u=>f.data.economy_id=u),disabled:"",filterable:""},{default:d(()=>[(r(!0),C(D,null,P(B(y).getters.eco_class_list,u=>(r(),V(j,{label:u.classify+" - "+u.name},{default:d(()=>[(r(!0),C(D,null,P(B(y).getters.eco_kind_list[u.classify],O=>(r(),V(U,{label:O.classify+O.kind+" - "+O.name,value:O.id},null,8,["label","value"]))),256))]),_:2},1032,["label"]))),256))]),_:1},8,["modelValue"])]),_:1})]),t("td",null,[a(n,{label:"衔接业务单编码"},{default:d(()=>[a(w,{modelValue:f.data.aebp_id,"onUpdate:modelValue":l[3]||(l[3]=u=>f.data.aebp_id=u),disabled:""},{default:d(()=>[a(U,{label:e.data.aebp_code,value:e.data.aebp_code},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",qe,[a(n,{label:"详细测算过程"},{default:d(()=>[a(m,{modelValue:f.data.detail,"onUpdate:modelValue":l[4]||(l[4]=u=>f.data.detail=u),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",je,[a(n,{label:"差异说明"},{default:d(()=>[a(m,{modelValue:f.data.diff_reason,"onUpdate:modelValue":l[5]||(l[5]=u=>f.data.diff_reason=u),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",Fe,[a(n,{label:"备注"},{default:d(()=>[a(m,{modelValue:f.data.comm,"onUpdate:modelValue":l[6]||(l[6]=u=>f.data.comm=u),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])])]),t("div",null,[t("table",null,[t("tr",null,[t("td",null,[a(n,{label:"申请人"},{default:d(()=>[a(w,{modelValue:e.data.requester,"onUpdate:modelValue":l[7]||(l[7]=u=>e.data.requester=u),disabled:"",filterable:""},{default:d(()=>[a(U,{label:e.data.requester+" - "+e.data.requester_name,value:e.data.requester},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"审核小组"},{default:d(()=>[a(w,{modelValue:e.data.applicant_id,"onUpdate:modelValue":l[8]||(l[8]=u=>e.data.applicant_id=u),disabled:"",filterable:""},{default:d(()=>[a(U,{label:e.data.applicant_id+" - "+e.data.applicant_tag,value:e.data.applicant_id},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})])])]),a(n,{class:"flex-grow-1",label:"审核驳回原因"},{default:d(()=>[a(m,{modelValue:f.data.refuse_reason,"onUpdate:modelValue":l[9]||(l[9]=u=>f.data.refuse_reason=u),rows:"10",type:"textarea"},null,8,["modelValue"])]),_:1})])]),a(n,null,{default:d(()=>[t("div",Ce,[a(p,{size:"small",title:"当前阶段驳回将终止审核",type:"danger",onClick:v},{default:d(()=>[_("驳回")]),_:1}),a(p,{size:"small",title:"通过审核将清空驳回原因",type:"primary",onClick:x},{default:d(()=>[_("通过")]),_:1})])]),_:1})]),_:1},8,["modelValue"])],64)}}}),ze={class:"border-bottom-1 d-flex flex-row justify-content-between align-items-center"},De=t("p",null,"衔接年度工作计划审核",-1),Oe={class:"d-flex w-100 flex-row"},he={class:"flex-1"},Ae={colspan:"2"},Se={colspan:"2"},Be={colspan:"2"},Ne={class:"m-0 p-0 w-100 d-flex flex-row justify-content-end"},Ie=N({__name:"ApproveAWP",props:{data:Object,refuse:{type:Function,default:()=>{}},pass:{type:Function,default:()=>{}}},setup(f){const e=f,y=I(),v=()=>{if(!e.data.refuse_reason||e.data.refuse_reason.trim()==""){$.error("【衔接年度工作计划审核】请输入驳回原因");return}e.data.refuse_reason=e.data.refuse_reason.trim();let o=new FormData;o.set("refuse_reason",e.data.refuse_reason),o.set("status","3"),F.put(`/awp/approve/${e.data.code}`,o).then(l=>{l.data.status===200?e.refuse("衔接年度工作计划审核",e.data.refuse_reason):$.error(l.data.message)}).catch(l=>{$.error(l)})},x=()=>{y.commit("area_loading",!0);let o=new FormData;o.set("status","2"),F.put(`/awp/approve/${e.data.code}`,o).then(l=>{l.data.status===200&&(e.data.status=2,$.success("【衔接年度工作计划审核】审核通过")),y.commit("area_loading",!1)}).catch(()=>{y.commit("area_loading",!1)})};return(o,l)=>{const c=s("el-text"),i=s("el-input"),n=s("el-form-item"),U=s("el-radio"),j=s("el-radio-group"),w=s("el-option"),m=s("el-select"),p=s("el-button"),h=s("el-form");return r(),C(D,null,[t("h3",ze,[De,t("span",null,[e.data.status==0?(r(),V(c,{key:0,type:"primary"},{default:d(()=>[_("待申请审核")]),_:1})):e.data.status==1?(r(),V(c,{key:1,type:"warning"},{default:d(()=>[_("待审核")]),_:1})):e.data.status==2?(r(),V(c,{key:2,type:"success"},{default:d(()=>[_("审核已通过")]),_:1})):e.data.status==3?(r(),V(c,{key:3,type:"danger"},{default:d(()=>[_("审核已驳回")]),_:1})):J("",!0)])]),a(h,{"label-position":"top"},{default:d(()=>[t("div",Oe,[t("table",he,[t("tr",null,[t("td",null,[a(n,{label:"计划编码"},{default:d(()=>[a(i,{modelValue:e.data.code,"onUpdate:modelValue":l[0]||(l[0]=u=>e.data.code=u),modelModifiers:{trim:!0},readonly:""},null,8,["modelValue"])]),_:1})]),t("td",null,[a(n,{label:"计划名称"},{default:d(()=>[a(i,{modelValue:e.data.name,"onUpdate:modelValue":l[1]||(l[1]=u=>e.data.name=u),modelModifiers:{trim:!0},readonly:""},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",Ae,[a(n,{label:"计划详情"},{default:d(()=>[a(i,{modelValue:e.data.detail,"onUpdate:modelValue":l[2]||(l[2]=u=>e.data.detail=u),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"隶属工作职责编码"},{default:d(()=>[a(i,{modelValue:e.data.job_resp_code,"onUpdate:modelValue":l[3]||(l[3]=u=>e.data.job_resp_code=u),readonly:""},null,8,["modelValue"])]),_:1})]),t("td",null,[a(n,{label:"绩效编码"},{default:d(()=>[a(i,{modelValue:e.data.per_goal_code,"onUpdate:modelValue":l[4]||(l[4]=u=>e.data.per_goal_code=u),readonly:""},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",Se,[a(n,{label:"上年度是否开展"},{default:d(()=>[a(j,{modelValue:e.data.carry_out,"onUpdate:modelValue":l[5]||(l[5]=u=>e.data.carry_out=u),disabled:""},{default:d(()=>[a(U,{label:!0},{default:d(()=>[_("已开展")]),_:1}),a(U,{label:!1},{default:d(()=>[_("未开展")]),_:1})]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",Be,[a(n,{label:"备注"},{default:d(()=>[a(i,{modelValue:e.data.comm,"onUpdate:modelValue":l[6]||(l[6]=u=>e.data.comm=u),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])])]),t("div",null,[t("table",null,[t("tr",null,[t("td",null,[a(n,{label:"部门"},{default:d(()=>[a(m,{modelValue:e.data.dept_id,"onUpdate:modelValue":l[7]||(l[7]=u=>e.data.dept_id=u),disabled:"",filterable:""},{default:d(()=>[a(w,{label:e.data.dept_name,value:e.data.dept_id},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"申请人"},{default:d(()=>[a(m,{modelValue:e.data.requester,"onUpdate:modelValue":l[8]||(l[8]=u=>e.data.requester=u),disabled:"",filterable:""},{default:d(()=>[a(w,{label:e.data.requester+" - "+e.data.requester_name,value:e.data.requester},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"审核小组"},{default:d(()=>[a(m,{modelValue:e.data.applicant_id,"onUpdate:modelValue":l[9]||(l[9]=u=>e.data.applicant_id=u),disabled:"",filterable:""},{default:d(()=>[a(w,{label:e.data.applicant_id+" - "+e.data.applicant_tag,value:e.data.applicant_id},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"审核驳回原因"},{default:d(()=>[a(i,{modelValue:e.data.refuse_reason,"onUpdate:modelValue":l[10]||(l[10]=u=>e.data.refuse_reason=u),type:"textarea"},null,8,["modelValue"])]),_:1})])])])])]),a(n,null,{default:d(()=>[t("div",Ne,[a(p,{size:"small",title:"当前阶段驳回将终止审核",type:"danger",onClick:v},{default:d(()=>[_("驳回")]),_:1}),a(p,{size:"small",title:"通过审核将清空驳回原因",type:"primary",onClick:x},{default:d(()=>[_("通过")]),_:1})])]),_:1})]),_:1})],64)}}}),Je={class:"border-bottom-1 d-flex flex-row justify-content-between align-items-center"},Le=t("p",null,"工作职责审核",-1),Pe={style:{display:"flex","flex-direction":"column"}},Ee={style:{display:"flex","flex-direction":"row"}},Ge={style:{width:"100%"}},Re={colspan:"2"},Te={colspan:"2"},We={colspan:"2"},He={class:"m-0 p-0 w-100 d-flex flex-row justify-content-end"},Ke=N({__name:"ApproveJobResp",props:{data:Object,refuse:{type:Function,default:(f,e)=>{}},pass:{type:Function,default:()=>{}}},setup(f){const e=f;I();const y=async()=>{if(!e.data.refuse_reason||e.data.refuse_reason.trim()==""){$.error("【工作职责审核】请输入驳回原因");return}e.data.refuse_reason=e.data.refuse_reason.trim();let x=new FormData;x.set("status","3"),x.set("refuse_reason",`${e.data.refuse_reason}`),F.put(`/job/approve/${e.data.id}`,x).then(o=>{o.data.status===200?e.refuse("工作职责审核",e.data.refuse_reason):$.error(o.data.message)}).catch(o=>{$.error(o)})},v=()=>{let x=new FormData;x.set("status","2"),F.put(`/job/approve/${e.data.id}`,x).then(o=>{o.data.status===200&&(e.data.status=2,$.success("【工作职责审核】审核通过"))})};return(x,o)=>{const l=s("el-text"),c=s("el-input"),i=s("el-form-item"),n=s("el-option"),U=s("el-select"),j=s("el-button"),w=s("el-form");return r(),C(D,null,[t("h3",Je,[Le,t("span",null,[e.data.status==0?(r(),V(l,{key:0,type:"primary"},{default:d(()=>[_("待申请审核")]),_:1})):e.data.status==1?(r(),V(l,{key:1,type:"warning"},{default:d(()=>[_("待审核")]),_:1})):e.data.status==2?(r(),V(l,{key:2,type:"success"},{default:d(()=>[_("审核已通过")]),_:1})):e.data.status==3?(r(),V(l,{key:3,type:"danger"},{default:d(()=>[_("审核已驳回")]),_:1})):J("",!0)])]),a(w,{"label-position":"top"},{default:d(()=>[t("div",Pe,[t("div",Ee,[t("div",null,[t("table",Ge,[t("tr",null,[t("td",null,[a(i,{label:"职责编号"},{default:d(()=>[a(c,{modelValue:e.data.code,"onUpdate:modelValue":o[0]||(o[0]=m=>e.data.code=m),readonly:""},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",Re,[a(i,{label:"职责概述"},{default:d(()=>[a(c,{modelValue:e.data.abstract,"onUpdate:modelValue":o[1]||(o[1]=m=>e.data.abstract=m),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",Te,[a(i,{label:"职责内容描述"},{default:d(()=>[a(c,{modelValue:e.data.detail,"onUpdate:modelValue":o[2]||(o[2]=m=>e.data.detail=m),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(i,{label:"经办人"},{default:d(()=>[a(U,{modelValue:e.data.operator_id,"onUpdate:modelValue":o[3]||(o[3]=m=>e.data.operator_id=m),disabled:"",filterable:""},{default:d(()=>[a(n,{label:e.data.operator_id+" - "+e.data.operator_name,value:e.data.operator_id},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})]),t("td",null,[a(i,{label:"责任领导",prop:"leader_id"},{default:d(()=>[a(U,{modelValue:e.data.leader_id,"onUpdate:modelValue":o[4]||(o[4]=m=>e.data.leader_id=m),disabled:"",filterable:""},{default:d(()=>[a(n,{label:e.data.leader_id+" - "+e.data.leader_name,value:e.data.leader_id},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",We,[a(i,{label:"备注"},{default:d(()=>[a(c,{modelValue:e.data.comm,"onUpdate:modelValue":o[5]||(o[5]=m=>e.data.comm=m),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])])])]),t("div",null,[t("table",null,[t("tr",null,[t("td",null,[a(i,{label:"部门"},{default:d(()=>[a(U,{modelValue:e.data.dept_id,"onUpdate:modelValue":o[6]||(o[6]=m=>e.data.dept_id=m),disabled:"",filterable:""},{default:d(()=>[a(n,{label:e.data.dept_name,value:e.data.dept_id},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(i,{label:"填报人"},{default:d(()=>[a(U,{modelValue:e.data.requester,"onUpdate:modelValue":o[7]||(o[7]=m=>e.data.requester=m),disabled:"",filterable:""},{default:d(()=>[a(n,{label:e.data.requester+" - "+e.data.requester_name,value:e.data.requester},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(i,{label:"审核小组"},{default:d(()=>[a(U,{modelValue:e.data.applicant_id,"onUpdate:modelValue":o[8]||(o[8]=m=>e.data.applicant_id=m),disabled:"",filterable:""},{default:d(()=>[a(n,{label:e.data.applicant_id+" - "+e.data.applicant_tag,value:e.data.applicant_id},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(i,{label:"审核驳回原因"},{default:d(()=>[a(c,{modelValue:e.data.refuse_reason,"onUpdate:modelValue":o[9]||(o[9]=m=>e.data.refuse_reason=m),type:"textarea"},null,8,["modelValue"])]),_:1})])])])])])]),a(i,null,{default:d(()=>[t("div",He,[a(j,{size:"small",title:"当前阶段驳回将终止审核",type:"danger",onClick:y},{default:d(()=>[_("驳回")]),_:1}),a(j,{size:"small",title:"通过审核将清空驳回原因",type:"primary",onClick:v},{default:d(()=>[_("通过")]),_:1})])]),_:1})]),_:1})],64)}}}),Qe={class:"border-bottom-1 d-flex flex-row justify-content-between align-items-center"},Xe=t("p",null,"绩效指标审核",-1),Ye={class:"d-flex flex-row"},Ze={class:"flex-1"},et={style:{margin:"0",padding:"0 1rem"}},tt=["href"],at={class:"m-0 p-0 w-100 d-flex flex-row justify-content-end"},lt=N({__name:"ApprovePerGoal",props:{data:Object,refuse:{type:Function,default:()=>{}},pass:{type:Function,default:()=>{}}},setup(f){const e=f,y=I(),v=async()=>{if(!e.data.refuse_reason||e.data.refuse_reason.trim()==""){$.error("【绩效指标审核】请输入驳回原因");return}e.data.refuse_reason=e.data.refuse_reason.trim();let o=new FormData;o.set("refuse_reason",`${e.data.refuse_reason}`),o.set("status","3"),F.put(`/goal/approve/${e.data.id}`,o).then(l=>{l.data.status===200?e.refuse("绩效目标审核",e.data.refuse_reason):$.error(l.data.message)}).catch(l=>{$.error(l)})},x=()=>{y.commit("area_loading",!0);let o=new FormData;o.set("status","2"),F.put(`/goal/approve/${e.data.id}`,o).then(l=>{l.data.status===200&&(e.data.status=2,$.success("【绩效目标】审核通过")),y.commit("area_loading",!1)}).catch(()=>{y.commit("area_loading",!1)})};return(o,l)=>{const c=s("el-text"),i=s("el-input"),n=s("el-form-item"),U=s("el-option"),j=s("el-select"),w=s("el-button"),m=s("el-form");return r(),C(D,null,[t("h3",Qe,[Xe,t("span",null,[e.data.status==0?(r(),V(c,{key:0,type:"primary"},{default:d(()=>[_("待申请审核")]),_:1})):e.data.status==1?(r(),V(c,{key:1,type:"warning"},{default:d(()=>[_("待审核")]),_:1})):e.data.status==2?(r(),V(c,{key:2,type:"success"},{default:d(()=>[_("审核已通过")]),_:1})):e.data.status==3?(r(),V(c,{key:3,type:"danger"},{default:d(()=>[_("审核已驳回")]),_:1})):J("",!0)])]),a(m,{"label-position":"top"},{default:d(()=>[t("div",Ye,[t("table",Ze,[t("tr",null,[t("td",null,[a(n,{label:"绩效指标编码"},{default:d(()=>[a(i,{modelValue:e.data.code,"onUpdate:modelValue":l[0]||(l[0]=p=>e.data.code=p),modelModifiers:{trim:!0},readonly:""},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"一级指标"},{default:d(()=>[a(i,{modelValue:e.data.quota_1,"onUpdate:modelValue":l[1]||(l[1]=p=>e.data.quota_1=p),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"二级指标"},{default:d(()=>[a(i,{modelValue:e.data.quota_2,"onUpdate:modelValue":l[2]||(l[2]=p=>e.data.quota_2=p),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"三级指标"},{default:d(()=>[a(i,{modelValue:e.data.quota_3,"onUpdate:modelValue":l[3]||(l[3]=p=>e.data.quota_3=p),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"指标值"},{default:d(()=>[a(i,{modelValue:e.data.quota_value,"onUpdate:modelValue":l[4]||(l[4]=p=>e.data.quota_value=p),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"指标来源"},{default:d(()=>[a(i,{modelValue:e.data.source,"onUpdate:modelValue":l[5]||(l[5]=p=>e.data.source=p),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"备注"},{default:d(()=>[a(i,{modelValue:e.data.comm,"onUpdate:modelValue":l[6]||(l[6]=p=>e.data.comm=p),modelModifiers:{trim:!0},readonly:"",type:"textarea"},null,8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"附件"},{default:d(()=>[t("ol",et,[(r(!0),C(D,null,P(e.data.file_list,p=>(r(),C("li",null,[t("a",{href:B(oe).base_url+"/"+p.path,class:"file_href",style:{color:"#000"},target:"_blank"},A(p.name),9,tt)]))),256))])]),_:1})])])]),t("div",null,[t("table",null,[t("tr",null,[t("td",null,[a(n,{label:"部门"},{default:d(()=>[a(j,{modelValue:e.data.dept_id,"onUpdate:modelValue":l[7]||(l[7]=p=>e.data.dept_id=p),disabled:"",filterable:""},{default:d(()=>[a(U,{label:e.data.dept_name,value:e.data.dept_id},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"填报人"},{default:d(()=>[a(j,{modelValue:e.data.requester,"onUpdate:modelValue":l[8]||(l[8]=p=>e.data.requester=p),disabled:"",filterable:""},{default:d(()=>[a(U,{label:e.data.requester+" - "+e.data.requester_name,value:e.data.requester},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"审核小组"},{default:d(()=>[a(j,{modelValue:e.data.applicant_id,"onUpdate:modelValue":l[9]||(l[9]=p=>e.data.applicant_id=p),disabled:"",filterable:""},{default:d(()=>[a(U,{label:e.data.applicant_id+" - "+e.data.applicant_tag,value:e.data.applicant_id},null,8,["label","value"])]),_:1},8,["modelValue"])]),_:1})])]),t("tr",null,[t("td",null,[a(n,{label:"审核驳回原因"},{default:d(()=>[a(i,{modelValue:e.data.refuse_reason,"onUpdate:modelValue":l[10]||(l[10]=p=>e.data.refuse_reason=p),type:"textarea"},null,8,["modelValue"])]),_:1})])])])])]),a(n,null,{default:d(()=>[t("div",at,[a(w,{size:"small",title:"当前阶段驳回将终止审核",type:"danger",onClick:v},{default:d(()=>[_("驳回")]),_:1}),a(w,{size:"small",title:"通过审核将清空驳回原因",type:"primary",onClick:x},{default:d(()=>[_("通过")]),_:1})])]),_:1})]),_:1})],64)}}}),dt=N({__name:"ApproveForm",props:{budget:Object,aebp:Object,awp:Object,per_goal:Object,job_resp:Object,refuse:{type:Function,default:()=>{}},pass:{type:Function,default:()=>{}}},setup(f){const e=f,y=I(),v=async(x,o)=>{let l=new FormData;l.set("status","3"),l.set("refuse_reason",`【${x}】${o}`),F.put(`/budget/approve/${e.budget.id}`,l).then(c=>{c.data.status===200?e.refuse():$.error(c.data.message)}).catch(c=>{$.error(c)})};return(x,o)=>{const l=G("loading");return R((r(),C("div",null,[a(Ke,{data:e.job_resp,refuse:v},null,8,["data"]),a(lt,{data:e.per_goal,refuse:v},null,8,["data"]),a(Ie,{data:e.awp,refuse:v},null,8,["data"]),a(xe,{data:e.aebp,pass:e.pass,refuse:v},null,8,["data","pass"]),a(Me,{data:e.budget,pass:e.pass,refuse:e.refuse},null,8,["data","pass","refuse"])])),[[l,B(y).getters.area_loading]])}}}),S=f=>(ue("data-v-86e9e410"),f=f(),se(),f),ot=S(()=>t("div",{style:{display:"flex","justify-content":"space-between","align-content":"center","align-items":"center"}},[t("p",null,"公用经费预算")],-1)),nt={class:"detail"},ut=S(()=>t("th",null,"差异说明",-1)),st=S(()=>t("th",null,"备注",-1)),rt=S(()=>t("th",null,"详细测算过程",-1)),it=S(()=>t("th",null,"申请人",-1)),_t=S(()=>t("th",null,"审核小组",-1)),pt=S(()=>t("th",null,"申请时间",-1)),mt=S(()=>t("th",null,"审核时间",-1)),ft={key:0},ct=S(()=>t("th",null,"驳回原因",-1)),bt=N({__name:"index",setup(f){const e=I(),y=z([]),v=T({curr_page:1,total:10,page_size:14}),x=z({}),o=z({}),l=z({}),c=z({}),i=z({}),n=z(!1),U=z([]),j=M=>{w(M)};y.value.length===0&&w(1);function w(M){if(U.value.length===0){const q=`/budget/-1?reverse=1&current_page=${M}&page_size=${v.page_size}`;F.get(q,{params:{select_by:JSON.stringify(["status","applicant_id"]),select:JSON.stringify({status:[1,2,3],applicant_id:e.getters.user_group})}}).then(g=>{g.data.status===200?(y.value=g.data.data,v.page_size=g.data.page_info.page_size,v.total=g.data.page_info.total):$({type:"error",message:g.data.message})}).catch(g=>{$({type:"error",message:g})})}}const m=z(!1),p=z(!1),h=z(!1),u=z(!1),O=z(!1);async function b(M,q){let g=await F.get(`/job/id/${M}`);g.data.status==200&&(c.value=g.data.data[0],u.value=!0,q())}async function L(M,q){let g=await F.get(`/goal/id/${M}`);g.data.status==200&&(i.value=g.data.data[0],O.value=!0,q())}async function W(M,q){let g=await F.get(`/awp/code/${M}`);g.data.status===200&&(l.value=g.data.data[0],h.value=!0,await L(l.value.per_goal_id,q),await b(l.value.job_resp_id,q),q())}async function H(M,q){let g=await F.get(`/aebp/code/${M}`);g.data.status===200&&(o.value=g.data.data[0],p.value=!0,await W(o.value.annual_work_plan_id,q),q())}const K=async M=>{e.dispatch("loading",{status:!0}),x.value=M,m.value=!0;const q=x.value.aebp_id;await H(q,()=>{m.value&&p.value&&h.value&&u.value&&O.value&&(e.dispatch("loading",{status:!1}),n.value=!0)})},Q=()=>{n.value=!1,m.value=!1,p.value=!1,h.value=!1,u.value=!1,O.value=!1,w(v.curr_page)},X=()=>{m.value=!1,p.value=!1,h.value=!1,u.value=!1,O.value=!1,n.value=!1,w(v.curr_page)};return ne(()=>{e.dispatch("eco_list",{keyword:""})}),(M,q)=>{const g=s("el-table-column"),E=s("el-text"),Y=s("el-button"),Z=s("el-button-group"),ee=s("el-table"),te=s("el-pagination"),ae=s("el-drawer");return r(),C(D,null,[a(le,null,{header:d(()=>[ot]),content:d(()=>[a(ee,{data:y.value,height:"100%"},{default:d(()=>[a(g,{fixed:"",type:"expand"},{default:d(k=>[t("table",nt,[t("tr",null,[ut,t("td",null,A(k.row.diff_reason),1)]),t("tr",null,[st,t("td",null,A(k.row.comm),1)]),t("tr",null,[rt,t("td",null,A(k.row.detail),1)]),t("tr",null,[it,t("td",null,A(k.row.requester_name),1)]),t("tr",null,[_t,t("td",null,A(k.row.applicant_tag),1)]),t("tr",null,[pt,t("td",null,A(k.row.request_time),1)]),t("tr",null,[mt,t("td",null,A(k.row.approve_time),1)]),k.row.status==3?(r(),C("tr",ft,[ct,t("td",null,A(k.row.refuse_reason),1)])):J("",!0)])]),_:1}),a(g,{label:"编号",prop:"id"}),a(g,{label:"经济类型",prop:"eco_class_name"}),a(g,{label:"预算金额(元)",prop:"budget_price"}),a(g,{label:"衔接业务单编码",prop:"aebp_id"}),a(g,{label:"上年度本业务实际支出(元)",prop:"actual_cost"}),a(g,{label:"填报人",prop:"requester_name"}),a(g,{align:"center",label:"审核状态"},{default:d(k=>[k.row.status==0?(r(),V(E,{key:0,type:"primary"},{default:d(()=>[_("待申请审核")]),_:1})):k.row.status==1?(r(),V(E,{key:1,type:"warning"},{default:d(()=>[_("待审核")]),_:1})):k.row.status==2?(r(),V(E,{key:2,type:"success"},{default:d(()=>[_("审核通过")]),_:1})):k.row.status==3?(r(),V(E,{key:3,type:"danger"},{default:d(()=>[_("审核驳回")]),_:1})):J("",!0)]),_:1}),a(g,{align:"center",label:"操作"},{default:d(k=>[a(Z,{size:"small"},{default:d(()=>[a(Y,{type:"primary",onClick:xt=>K(k.row)},{default:d(()=>[_("审核 ")]),_:2},1032,["onClick"])]),_:2},1024)]),_:1})]),_:1},8,["data"])]),footer:d(()=>[a(te,{"current-page":v.curr_page,"onUpdate:currentPage":q[0]||(q[0]=k=>v.curr_page=k),"page-size":v.page_size,total:v.total,layout:"total, prev, pager, next",onCurrentChange:j},null,8,["current-page","page-size","total"])]),_:1}),a(ae,{modelValue:n.value,"onUpdate:modelValue":q[1]||(q[1]=k=>n.value=k),"destroy-on-close":"",direction:"rtl",size:"60%",title:"公用预算经费审核"},{default:d(()=>[a(dt,{aebp:o.value,awp:l.value,budget:x.value,job_resp:c.value,pass:X,per_goal:i.value,refuse:Q},null,8,["aebp","awp","budget","job_resp","per_goal"])]),_:1},8,["modelValue"])],64)}}});const yt=re(bt,[["__scopeId","data-v-86e9e410"]]),Vt={class:"d-flex flex-row w-100 h-100 m-0 p-0"},gt={class:"d-flex flex-col justify-content-between p-right-10"},vt={class:"flex-grow-1"},Ut=N({__name:"index",setup(f){const e=I(),y=T([{label:"公用经费预算",comp:ie(yt)}]),v=z(y[0].comp),x=o=>{};return(o,l)=>{const c=G("loading");return R((r(),C("div",Vt,[t("div",gt,[a(de,{content:i=>i.label,curr_change:x,data:y,"min-width":"9rem",width:"9rem"},null,8,["content","data"])]),t("div",vt,[(r(),V(_e(v.value)))])])),[[c,B(e).getters.loading]])}}});export{Ut as default};