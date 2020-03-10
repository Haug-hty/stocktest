import ajax from './ajax'
const BASE_URL = '/api'
import axios from 'axios'
////////自动化测试平台接口
// export const getsdkversion_api =()=> ajax(BASE_URL+'/api/sdkversion')
// export const reqAddress =(param)=> ajax('/position/${param}')

//sdk版本页面初始化查询
//export const getTableData_action_getgetList_api =()=> ajax(BASE_URL+'/api/sdkversion',{},'POST')
export const getTableData_action_getgetList_api =()=> ajax(BASE_URL+'/api/testinformation',{},'POST')
//sdk版本页面条件查询<未实现>
//export const getList_search_action_api = params => { return axios.post(`${BASE_URL}/api/sdkversion`,  params)};
export const getList_search_action_api = params => { return axios.post(`${BASE_URL}/api/testinformation`,  params)};
//export const getList_search_action_api =(params)=> ajax(BASE_URL+'/api/sdkversion',params,'POST')
//sdk版本页面删除
//export const sdkversion_delete_action_api =(param)=> ajax(BASE_URL+'/api/sdkversion/'+param,{},'DELETE')
export const sdkversion_delete_action_api =(param)=> ajax(BASE_URL+'/api/testinformation/'+param,'','DELETE')
//sdk版本新增<未实现>
//export const sdkversion_addInfo_action_api = params => { return axios.post(`${BASE_URL}/api/sdkversion/new`, params)};
export const sdkversion_addInfo_action_api = params => { return axios.post(`${BASE_URL}/api/testinformation/new`, params)};
//export const sdkversion_addInfo_action_api =(params)=> ajax(BASE_URL+'/api/sdkversion/new',{params},'POST')

//股票代码
// export const getstocktypecode_delete_api =(id)=> ajax(BASE_URL+'/stocktypecode/${param}')
export const getstocktypecode_delete_api =(id)=> ajax(BASE_URL+'/api/stocktypecode/'+id,'','DELETE')
// export const getstocktypecode_post_api =(param)=> ajax(BASE_URL+'/stocktypecode/new',{param},'POST')
export const getstocktypecode_post_api = params => { return axios.post(`${BASE_URL}/api/stocktypecode/new`, params)};
export const getstocktypecode_get_api =()=> ajax(BASE_URL+'api/stocktypecode')

//接口管理
//export const getSDKinterface_get_api =()=> ajax(BASE_URL+'/api/sdkinterface')
//export const getSDKinterface_remove_api =(id)=> ajax(BASE_URL+'/api/sdkinterface/'+id,'','DELETE')
// export const getSDKinterface_addinfo_api =(param)=> ajax(BASE_URL+'/api/sdkinterface/new/',{param:JSON.stringify(param)},'POST')
//export const getSDKinterface_addinfo_api = params => { return axios.post(`${BASE_URL}/api/sdkinterface/new`, params)};

//export const getSDKinterface_getparam_api = params => { return axios.post(`${BASE_URL}/api/sdkinterface`, params)};

export const getSDKinterface_get_api =()=> ajax(BASE_URL+'/api/testinformation','','POST')
export const getSDKinterface_remove_api =(id)=> ajax(BASE_URL+'/api/testinformation/'+id,'','DELETE')
// export const getSDKinterface_addinfo_api =(param)=> ajax(BASE_URL+'/api/sdkinterface/new/',{param:JSON.stringify(param)},'POST')
export const getSDKinterface_addinfo_api = params => { return axios.post(`${BASE_URL}/api/testinformation/new`, params)};
//接口根据sdk版本查询
export const getSDKinterface_getparam_api = params => { return axios.post(`${BASE_URL}/api/testinformation`,  params)};

//方法管理
export const getmethodpage_getparam_api = params => { return axios.post(`${BASE_URL}/api/testinformation`,  params)};