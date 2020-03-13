import ajax from './ajax'
import axios from 'axios'
const BASE_URL = '/api'

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

//SDK接口管理
export const getSDKinterface_get_api =()=> ajax(BASE_URL+'/api/testinformation','','POST')
export const getSDKinterface_remove_api =(id)=> ajax(BASE_URL+'/api/testinformation/'+id,'','DELETE')
// export const getSDKinterface_addinfo_api =(param)=> ajax(BASE_URL+'/api/sdkinterface/new/',{param:JSON.stringify(param)},'POST')

//新增接口
export const getSDKinterface_addinfo_api = (id,params) => { return axios.put(`${BASE_URL}/api/testinformation/`+id+'?embeddedDocument=true', params)};

//接口根据sdk版本查询
export const getSDKinterface_getparam_api = params => { return axios.post(`${BASE_URL}/api/testinformation`,  params)};

//根据版本和接口查询方法
export const getmethodpage_getparam_api = params => { return axios.post(`${BASE_URL}/api/testinformation`,  params)};
//export const getSDKinterface_addinfo_api = params => { return axios.put(`${BASE_URL}/api/testinformation/`+("5e65ba51f408582150de98a9"), params)};


//方法新增
export const getmethod_addinfo_api = (id,params) => { return axios.put(`${BASE_URL}/api/testinformation/`+id+'?embeddedDocument=true', params)};

//sdk版本修改
export const sdkversion_editinfo_api = (id,params) => { return axios.put(`${BASE_URL}/api/testinformation/update/`+id+'?embeddedDocument=false', params)};

//接口、方法、用例修改
export const getSDKinterface_editinfo_api = (id,params) => { return axios.put(`${BASE_URL}/api/testinformation/update/`+id+'?embeddedDocument=true', params)};