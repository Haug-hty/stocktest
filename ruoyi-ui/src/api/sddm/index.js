import ajax from './ajax'
import axios from 'axios'
import request from 'axios'
const BASE_URL = '/api'
const AIR_flow = '/dags'
////////自动化测试平台接口
//export const getsdkversion_api =()=> ajax(BASE_URL+'/api/sdkversion')
// export const reqAddress =(param)=> ajax('/position/${param}')

//sdk版本页面初始化查询
export const getTableData_action_getgetList_api =()=> ajax(BASE_URL+'/api/testinformation',{},'POST')
//sdk版本页面条件查询<未实现>
export const getList_search_action_api = params => { return axios.post(`${BASE_URL}/api/testinformation`,  params)};
//export const getList_search_action_api =(params)=> ajax(BASE_URL+'/api/testinformation',{params:JSON.stringify(params)},'POST')
//sdk版本页面删除
export const sdkversion_delete_action_api =(param)=> ajax(BASE_URL+'/api/testinformation/'+param,'','DELETE')
//sdk版本新增
export const sdkversion_addInfo_action_api = params => { return axios.post(`${BASE_URL}/api/testinformation/new`, params)};
//export const sdkversion_addInfo_action_api =(params)=> ajax(BASE_URL+'/api/sdkversion/new',{params},'POST')

//股票代码
// export const getstocktypecode_delete_api =(id)=> ajax(BASE_URL+'/stocktypecode/${param}')
export const getstocktypecode_delete_api =(id)=> ajax(BASE_URL+'/api/stocktypecode/'+id,'','DELETE')
// export const getstocktypecode_post_api =(param)=> ajax(BASE_URL+'/stocktypecode/new',{param},'POST')
export const getstocktypecode_post_api = params => { return axios.post(`${BASE_URL}/api/stocktypecode/new`, params)};
export const getstocktypecode_get_api =()=> ajax(BASE_URL+'api/stocktypecode')


//SDK接口管理
export const getSDKinterface_get_api =()=> ajax(BASE_URL+'/api/testinformation','','POST')
export const getSDKinterface_remove_api =(id)=> ajax(BASE_URL+'/api/testinformation/'+id,'','DELETE')
// export const getSDKinterface_addinfo_api =(param)=> ajax(BASE_URL+'/api/sdkinterface/new/',{param:JSON.stringify(param)},'POST')

//新增接口
export const getSDKinterface_addinfo_api = (id,params) => { return axios.put(`${BASE_URL}/api/testinformation/`+id+'?embeddedDocument=true', params)};
//删除接口
export const getsdkinterface_delinfo_api = (id,params) => { return axios.put(`${BASE_URL}/api/testinformation/`+id+'?embeddedDocument=true', params)};
//接口根据sdk版本查询
export const getSDKinterface_getparam_api = params => { return axios.post(`${BASE_URL}/api/testinformation`,  params)};

//根据版本和接口查询方法
export const getmethodpage_getparam_api = params => { return axios.post(`${BASE_URL}/api/testinformation`,  params)};
//export const getSDKinterface_addinfo_api = params => { return axios.put(`${BASE_URL}/api/testinformation/`+("5e65ba51f408582150de98a9"), params)};


//方法新增
export const getmethod_addinfo_api = (id,params) => { return axios.put(`${BASE_URL}/api/testinformation/`+id+'?embeddedDocument=true', params)};
//方法删除
export const getmethod_delinfo_api = (id,params) => { return axios.put(`${BASE_URL}/api/testinformation/`+id+'?embeddedDocument=true', params)};
//sdk版本修改
export const sdkversion_editinfo_api = (id,params) => { return axios.put(`${BASE_URL}/api/testinformation/update/`+id+'?embeddedDocument=false', params)};

//用例修改
export const getTestCase_editinfo_api=(id,params) =>{  return axios.put(`${BASE_URL}/api/testinformation/`+id+'?embeddedDocument=true', params)};
//用例新增
export const getTestCase_addinfo_api = (id,params) => { return axios.put(`${BASE_URL}/api/testinformation/`+id+'?embeddedDocument=true', params)};
//用例删除
export const getTestCase_delinfo_api = (id,params) => { return axios.put(`${BASE_URL}/api/testinformation/`+id+'?embeddedDocument=true', params)};
//用例管理
export const getTestCase_getparam_api = params => { return axios.post(`${BASE_URL}/api/testinformation`,  params)};
//接口，方法，用例修改
export const getSDKinterface_editinfo_api = (id,params) => { return axios.put(`${BASE_URL}/api/testinformation/update/`+id+'?embeddedDocument=true', params)};
//测试报告
export const gettestreport_get_api = param => { return axios.get(`${BaseURL}/stocktypecode`)};
//测试计划制定新增
export const getTestPlan_addinfo_api = params => { return axios.post(`${BASE_URL}/api/testplan/new`, params)};

//测试计划修改
export const getTestPlan_editinfo_api = (id,params) => { return axios.put(`${BASE_URL}/api/testplan/`+id+'?embeddedDocument= false', params)};

//测试计划制定页面初始化查询
export const getTestPlanTableData_action_get =()=> ajax(BASE_URL+'/api/testplan',{},'POST')

//运行测试计划（请求airflow）
//export const getRunPlan_action_api = params => {return axios.post(`${AIR_flow}/api/experimental/dags/android_test/dag_runs`, params)};
export const getRunPlan_action_api =(dag_id,params)  => {return axios.post(`${AIR_flow}/api/experimental/dags/` + dag_id + `/dag_runs`, params)};
//存储运行计划的时间戳
export const getTestCasePlan_addTimeStamp_api = (id,params) => { return axios.put(`${BASE_URL}/api/testplan/update/`+id+'?embeddedDocument=false', params)};
//查看测试计划运行状态
export const getTestPlan_state_api = (dag_id,time) => { return axios.get(`${AIR_flow}/api/experimental/dags/`+ dag_id + `/dag_runs/` + time)};
//根据测试计划的执行状态进行操作
export const TestPlan_getState_result_api = (id,collectionName,params) => { return axios.put(`${BASE_URL}/api/testresult/airflowTestResult/`+ id +`?collectionName=` + collectionName ,params)};




//-------------测试结果Start---------------
//测试计划名称
export const getTestResult_PlanName_api = params => {return axios.post(`${BASE_URL}/api/testresult/questionPlan`,params)}
//问题列表
export const getTestResult_PlanQuestions_api = params => {return axios.post(`${BASE_URL}/api/testresult/questionList`,params)}
//确认和忽略操作
export const getTestResult_CheckAndIgnoreOptions_api = (id,params) => {return axios.put(`${BASE_URL}/api/testresult/update/`+id+'?embeddedDocument=true',params)}
//测试报告数据
export const getTestResult_PlanReport_api = params => {return axios.post(`${BASE_URL}/api/testresult/testReport`,params)}
//-------------End-------------------------