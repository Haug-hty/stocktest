import {
  getsdkversion_api,
  getTableData_action_getgetList_api,
  getList_search_action_api,
  sdkversion_delete_action_api,
  sdkversion_addInfo_action_api,
  getstocktypecode_delete_api,
  getstocktypecode_post_api,
  getstocktypecode_get_api,
  getSDKinterface_get_api,
  getSDKinterface_remove_api,
  getSDKinterface_addinfo_api,
  getSDKinterface_getparam_api,
  getmethodpage_getparam_api,
  getmethod_addinfo_api,
  sdkversion_editinfo_api,
  getSDKinterface_editinfo_api,
} from '../../api/sddm/index'
//  自动化测试平台添加

const state = {
  //数据结构
  SDKinformation: {
    id: "",
    schemaId: "",
    collectionName: "",
    data:
        {
            sdk_version: "v4.0",
            sdk_version_des: "上证12月份版本",
            platform: "IOS",
            release_date: "2020-03-07 12:14:35",
            file_name: "/use/XXX.sdk",
            interfaces: [
                {
                    interface_name: "QuoteDetail",
                    interface_name_des: "行情快照接口",
                    methods: [
                        {
                            method_name: "QuoteDetailTest",
                            method_des: "行情快照测试方法",
                            testcases: [
                                {
                                    case_name: "json.dumps({'CODE': '000100.sz','SUBTYPE': '1001'}",
                                    case_name_des: "000100.sz测试用例",
                                    interval_time: 1000,
                                    times: 1
                                },
                                {
                                    case_name: "json.dumps({'CODE': '000100.sh','SUBTYPE': '1001'}",
                                    case_name_des: "000100.sh测试用例",
                                    interval_time: 1000,
                                    times: 1
                                }
                            ]
                        },                        
                    ]
                },                
            ]
    },
    status: ""
  },

  //SDK版本页面
  sdkversion: {
    filter: {
      versionName: ''
    },
    activeCollapse: 'search', //开关查询折叠面板
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    },
    editVisible: false,
    //dialog弹窗监控
    dialogFormVisible: false,    
    dialogupdataVisible: false,
    form: {
      sdk_version: '',
      sdk_version_des: '',
      platform: '',
      upload_time: ''
    },
    updata: {
      sdk_version: '',
      sdk_version_des: '',
      platform: '',
      upload_time: '',
      id:'',
    },
    formLabelWidth: '120px'

  },



  //方法管理页面
  methodPage: {
    list:[],
    id:'',
    sdk_version: '',
    interface_name: '',
    filter: {
      method_name: ''
    },
    status: '',
    formList: {
      method_name: 'aa',
      method_des: 'bb',
    },
    //开关查询折叠面板									
    activeCollapse: 'search',
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    },
    //新增方法dialog弹窗控制器
    dialogaddMethodVisible: false,
    //新增方法页面表单
    form: {
      method_name: '',
      method_des: '',
    },
    //修改方法dialog弹窗控制器
    dialogupdataMethodVisible: false,
    //修改方法页面表单
    updata: {
      method_name: '',
      method_des: '',
      method_name1: '',
    },
    formLabelWidth: '120px',
    options1: [],
    options2: [],
  },

  //接口管理
  SDKinterface: {
    id:'',
    data: {
      interface_name: '',
      interface_name_des: '',
    },
    version: '',

    filter: {
      interfaceName: ''
    }, //查询条件
    activeCollapse: 'search', //开关查询折叠面板
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    },
    editVisible: false,
    dialogFormVisible: false,
    form: {
      interface_name: '',
      interface_name_des: '',
      id:'',
    },
    dialogupdataVisible: false,
    updata: {
      interface_name: '',
      interface_name_des: '',
      id:'',
      interface_name_old:'',

    },
    formLabelWidth: '120px',
    formlist: [{
      id: "",
      schemaId: "",
      collectionName: "",
      data: {
        sdk_version_number: '',
        sdk_itrative_version: '',
        platform: '',
        upload_time: ''
      },
      status: ""
    }],
    options: [

    ]
  }
}
const mutations = {
 
  //sdk版本管理
  GET_SDKVERSION(state, address) {
    console.log('address',address)
    state.SDKinformation = address;
    //state.SDKinterface.formlist = address;
    var array = [];
    for (let i = 0; i < state.SDKinformation.length; i++) {
      array.push(state.SDKinformation[i].data)
    }
    state.SDKinterface.options = [...new Set(array)]
    state.methodPage.options1 = [...new Set(array)]

    var array2 = [];
    for (let i = 0; i < state.TestCase.formlist.length; i++) {
      array2.push(state.TestCase.formlist[i].data)
    }
    state.TestCase.options1 = [...new Set(array)]
  },

  GET_SDKVERSION_list(state, address) {
    console.log('address',address)
    state.SDKinformation = address.data;
  },
  
  //接口管理
  GET_SDKINTERFACE_GET(state, address) {
    state.SDKinterface.data = address.data[0].data.interfaces
    state.SDKinterface.id = address.data[0].id
    state.methodPage.id = address.data[0].id
    var array = [];
    for (let i = 0; i < state.SDKinterface.data.length; i++) {
      array.push(state.SDKinterface.data[i])
    }
    state.methodPage.options2 = [...new Set(array)]
    state.TestCase.options2 = [...new Set(array)]
    console.log(state.methodPage.options2)

  },

  //方法管理
  GET_METHODPAGE_GET(state, address) {
    
    state.SDKinformation = address.data;
    console.log(state.SDKinformation)
    console.log(address.data[0].data)
    address.data[0].data.interfaces.forEach(item=>{
      console.log(address.data[0].data.interfaces)
      if(item.interface_name == state.methodPage.interface_name){
              state.methodPage.list =item.methods
            }
        })
  }
  
}


const actions = {
  

  //sdk版本页面初始化查询
  getTableData_action_get(context) {
    const res = getTableData_action_getgetList_api()
 
    res.then(function (response) {
      console.log(response)
      context.commit('GET_SDKVERSION', response)
    })
  },
  //sdk版本页面条件查询
  getList_search_action(context, params) {
    console.log(params)
    const res = getList_search_action_api(params)
    res.then(function (response) {
      console.log(response.data)
      context.commit('GET_SDKVERSION_list', response)
    })
  },
  //sdk版本删除
  sdkversion_delete_action(context, param) {
    console.log(param)
    const res = sdkversion_delete_action_api(param)
    res.then(function (response) {
      context.commit('GET_SDKVERSION', response)
    })
  },
  //sdk版本新增
  sdkversion_addInfo_action(context, params) {
    let param ={
      sdk_version: params.sdk_version,
      sdk_version_des: params.sdk_version_des,
      platform: params.platform,
      release_date: "2020-03-07 12:14:35",
      file_name: "/use/XXX.sdk",
      interfaces: [
          {
              interface_name: "QuoteDetail",
              interface_name_des: "行情快照接口",
              methods: [
                  {
                      method_name: "QuoteDetailTest",
                      method_des: "行情快照测试方法",
                      testcases: [
                          {
                              case_name: "json.dumps({'CODE': '000100.sz','SUBTYPE': '1001'}",
                              case_name_des: "000100.sz测试用例",
                              interval_time: 1000,
                              times: 1
                          },
                          {
                              case_name: "json.dumps({'CODE': '000100.sh','SUBTYPE': '1001'}",
                              case_name_des: "000100.sh测试用例",
                              interval_time: 1000,
                              times: 1
                          }
                      ]
                  },                        
              ]
          },                
      ],      
      status: ""
    }
    console.log(params)
    const res = sdkversion_addInfo_action_api(param)
    console.log(res)

  },
  //版本修改
  sdkversion_editInfo_action(context, param){
    var id = param.id
    let params ={
      "content":[{"key":"data.sdk_version","value":param.sdk_version},{"key":"data.sdk_version_des","value":param.sdk_version_des},
      {"key":"data.platform","value":param.platform},{"key":"data.sdk_version","value":param.sdk_version}]
      }     
    
    const res = sdkversion_editinfo_api(id,params)

    res.then(function (response) {

      context.commit('GET_SDKINTERFACE_ADDINFO', response)
    })

  },

  //接口管理
  getSDKinterface_action_get(context) {
    const res = getSDKinterface_get_api()

    res.then(function (response) {

      context.commit('GET_SDKINTERFACE_GET', response)
    })
  },
  //根据版本查找接口
  getSDKinterface_action_getparam(context, param) {
    console.log('param222', param)
    const res = getSDKinterface_getparam_api(param)
    console.log('res', res)
    res.then(function (response) {

      context.commit('GET_SDKINTERFACE_GET', response)
    })
  },
  // getSDKinterface_action_remove(context, param) {

  //   const res = getSDKinterface_remove_api(param)

  //   res.then(function (response) {

  //     context.commit('GET_SDKINTERFACE_REMOVE', response)
  //   })

  // },
  //接口新增
  getSDKinterface_action_addinfo(context, param) {
    var id = param.id
    let params ={
      "type":"insert",
      "location":"data.interfaces",
      "content":{"interface_name":param.interface_name,"interface_name_des":param.interface_name_des}
      }
    
    const res = getSDKinterface_addinfo_api(id,params)

    res.then(function (response) {

      context.commit('GET_SDKINTERFACE_ADDINFO', response)
    })
  },
  //接口修改
  getSDKinterface_action_editinfo(context, param) {
    
    var id = param.id
    let params ={
      "filterFactors":[{"key":"i.interface_name","value":param.interface_name1}],
      "content":[{"key":"data.interfaces.$[i].interface_name_des","value":param.interface_name_des},{"key":"data.interfaces.$[i].interface_name","value":param.interface_name}]
      }
    
    const res = getSDKinterface_editinfo_api(id,params)
  },


  //方法管理
  getmethodPage_action_getparam(context,param) {
    const res = getmethodpage_getparam_api(param)
    console.log('333',res)
    res.then(function (response) {

      context.commit('GET_METHODPAGE_GET', response)
    })
  },
  //方法页面查询
  getMethodList_search_action(context,param){
    const res = getmethodpage_getparam_api(param)
    res.then(function (response) {
      context.commit('GET_METHODPAGE_GET', response)
    })
  },

  //方法新增
  getaddMethodinfo_action(context, param) {
    var id = param.id
    let params ={
      "type":"insert",
      "location":"data.interfaces.$[i].methods",
      "filterFactors":[{"key":"i.interface_name","value":param.interface_name}],
      "content":{"method_name":param.method_name,"method_des":param.method_des}
      }
    const res = getmethod_addinfo_api(id,params)

    res.then(function (response) {

      context.commit('GET_SDKINTERFACE_ADDINFO', response)
    })
  },
  //方法修改  
  getMethod_action_editinfo(context, param) {
    var id = param.id
    let params ={
      "filterFactors":[{"key":"i.interface_name","value":state.methodPage.interface_name},{"key":"j.method_name","value":param.method_name_old}],
      "content":[{"key":"data.interfaces.$[i].methods.$[j].method_des","value":param.method_des},{"key":"data.interfaces.$[i].methods.$[j].method_name","value":param.method_name}]
      }
    
    const res = getSDKinterface_editinfo_api(id,params)
  },
  
}



export default {
  namespaced: true,
  state,
  mutations,
  actions
}
