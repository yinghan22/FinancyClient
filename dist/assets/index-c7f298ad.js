import{C as r}from"./ListGroup-f347cb3b.js";import{d as u,u as a,o as c,c as d,w as _,h as t,t as s,n as o,p as i,q as p,_ as h}from"./index-c05e949c.js";const e=l=>(i("data-v-18c0a8f7"),l=l(),p(),l),f=e(()=>t("p",null,"我的信息",-1)),m=e(()=>t("th",null,"用户名",-1)),g=e(()=>t("th",null,"工号",-1)),x=e(()=>t("th",null,"在职部门",-1)),S=e(()=>t("th",null,"职位",-1)),v=e(()=>t("th",null,"职称",-1)),C=e(()=>t("th",null,"备注",-1)),I=u({__name:"index",setup(l){const n=a();return(w,y)=>(c(),d(r,null,{header:_(()=>[f]),content:_(()=>[t("table",null,[t("tr",null,[m,t("td",null,s(o(n).getters.userinfo.name),1)]),t("tr",null,[g,t("td",null,s(o(n).getters.userinfo.id),1)]),t("tr",null,[x,t("td",null,s(o(n).getters.userinfo.dept_name),1)]),t("tr",null,[S,t("td",null,s(o(n).getters.userinfo.job_title),1)]),t("tr",null,[v,t("td",null,s(o(n).getters.userinfo.pro_title||"-"),1)]),t("tr",null,[C,t("td",null,s(o(n).getters.userinfo.comm||"-"),1)])])]),_:1}))}});const k=h(I,[["__scopeId","data-v-18c0a8f7"]]);export{k as M};