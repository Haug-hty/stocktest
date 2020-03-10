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
} from '../../api/sddm/index'
//  自动化测试平台添加

const state = {
  // sdkversions: [{
  //   id: "",
  //   schemaId: "",
  //   collectionName: "",
  //   data: {
  //     sdkVersion: "555",
  //     title: "wwww"
  //   },
  //   status: ""
  // }],

  //SDK版本页面
  sdkversion: {
    filter: {
      versionName: ''
    },
    status: '',
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
    activeCollapse: 'search', //开关查询折叠面板
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    },
    editVisible: false,
    dialogFormVisible: false,
    form: {
      sdk_version_number: '',
      sdk_itrative_version: '',
      platform: '',
      upload_time: ''
    },
    dialogupdataVisible: false,
    updata: {
      sdk_version_number: '',
      sdk_itrative_version: '',
      platform: '',
      upload_time: ''
    },
    formLabelWidth: '120px'

  },



  //方法管理页面
  methodPage: {
    filter: {
      sdk_version_number: '',
      interface_name: '',
      method_name: ''
    },
    status: '',
    formlist: [{
      method_name: '',
      method_des: '',
    }],
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
      method_name: "QuoteDetailTest1",
      method_des: "行情快照测试方法1",
    },
    formLabelWidth: '120px',
    options1: [],
    options2: [],
    formlist: [{
      id: "",
      schemaId: "",
      collectionName: "",
      data: {
        sdk_version_number: '',
        sdk_itrative_version: '',
        platform: '',
        upload_time: '',
        file_name: '',
        interFaceList: [{
          interface_name: '',
          interface_name_des: '',
        }, ]
      },
      status: ""
    }],
    interFaceList: [],
    sdk_version_number: '',
    interface_name: '',
  },

  //用例管理
  TestCase: {
    formlist: [{
      id: "",
      schemaId: "",
      collectionName: "",
      data: {
        sdk_version_number: '',
        sdk_itrative_version: '',
        platform: '',
        upload_time: '',
        file_name: '',
        interFaceList: [{
          interface_name: '',
          interface_name_des: '',
        }, ]
      },
      status: ""
    }],
    studentData: [{
      versionName: '自定义规范',
      iterationVersion: '历史k线',
      platform: '历史k线方法1',
      updataTime: 'android',
      up: '600000.sh,dayk'
    }],
    filter:{
      versionName: '',
      iterationVersion:''
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
      versionName: '',
      iterationVersion: '',
      platform: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    },
    dialogupdataVisible: false,
    updata: {
      versionName: '',
      iterationVersion: '',
      platform: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    },
    formLabelWidth: '120px',
    sdk_version_number:'',
    interface_name:'',
    method_name:'',
    options1:[],
    options2:[],
    options3:[],
  },
  //股票代码
  stockTypeCode: {
    studentData: [{
      stock_type: '上证A股',
      stock_id: 'SH1001',
    }],
    filter: {
      versionName: ''
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
      stock_type: '',
      stock_id: '',
      platform: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
      domains: [{
        value1: '',
        value2: '',
        value3: ''
      }],
    },
    dialogupdataVisible: false,
    updata: {
      stock_type: '',
      stock_id: '',
      platform: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    },
    formLabelWidth: '120px'

  },

  //接口管理
  SDKinterface: {
    data: {
      interface_name: '',
      interface_describe: '',
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
      interface_describe: '',
      compare_method: '',
      upload_version: '',
      update_version: '',
      platform: '',
      delivery: false,
      domains: [{
        value: ''
      }],
      domains2: [{
        value: ''
      }],
    },
    dialogupdataVisible: false,
    updata: {
      interface_name: '',
      interface_describe: '',
      compare_method: '',
      upload_version: '',
      update_version: '',
      platform: '',
      delivery: false,
      domains: [{
        value: ''
      }],
      domains2: [{
        value: ''
      }],
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
    state.sdkversion.formlist = address;
    state.SDKinterface.formlist = address;
    var array = [];
    for (let i = 0; i < state.SDKinterface.formlist.length; i++) {
      array.push(state.SDKinterface.formlist[i].data)
    }
    state.SDKinterface.options = [...new Set(array)]

    var array1 = [];
    for (let i = 0; i < state.methodPage.formlist.length; i++) {
      array1.push(state.methodPage.formlist[i].data)
    }
    state.methodPage.options1 = [...new Set(array)]

    var array2 = [];
    for (let i = 0; i < state.TestCase.formlist.length; i++) {
      array2.push(state.TestCase.formlist[i].data)
    }
    state.TestCase.options1 = [...new Set(array)]
  },
  //股票代码
  GET_STOCKTYPECODE_DELETE(state, address) {
    state.stockTypeCode.studentData = address
  },
  GET_STOCKTYPECODE_POST(state, address) {

    state.stockTypeCode.updata = address
  },
  GET_STOCKTYPECODE_GET(state, address) {
    console.log('address', address)
    state.stockTypeCode.studentData = address;
  },

  //接口管理
  GET_SDKINTERFACE_GET(state, address) {
    state.SDKinterface.data = address.data[0].data.interFaceList
    var array = [];
    for (let i = 0; i < state.SDKinterface.data.length; i++) {
      array.push(state.SDKinterface.data[i])
    }
    state.methodPage.options2 = [...new Set(array)]
    state.TestCase.options2 = [...new Set(array)]
    console.log(state.methodPage.options2)

  },
  GET_STOCKTYPECODE_REMOVE(state, address) {

    state.SDKinterface.studentData = address;
    // state.SDKinterface.getTableData();
    // state.SDKinterface.$message({
    //   type: "info",
    //   message: "删除成功"
    // }).catch(err => {
    //   console.log(err);
    // });
  },
  GET_SDKINTERFACE_ADDINFO(state, address) {
    state.SDKinterface.updata = address;
  },

  //方法管理
  GET_METHODPAGE_GET(state, address) {
    console.log('444',address)
  }
}


const actions = {
  

  //sdk版本页面初始化查询
  getTableData_action_get(context) {
    const res = getTableData_action_getgetList_api()
 
    res.then(function (response) {
      context.commit('GET_SDKVERSION', response)
    })
  },
  //sdk版本页面条件查询
  getList_search_action(context, params) {
    console.log(params)
    const res = getList_search_action_api(params)
    res.then(function (response) {
      console.log(res)
      context.commit('GET_SDKVERSION', response)
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
    console.log(params)
    const res = sdkversion_addInfo_action_api(params)

  },
  //股票代码
  getstocktypecode_action_delete(context, param) {

    const res = getstocktypecode_delete_api(param)

    res.then(function (response) {
      context.commit('GET_STOCKTYPECODE_DELETE', response)
    })
  },
  getstocktypecode_action_post(context, param) {
    console.log('param', param)
    const res = getstocktypecode_post_api(param)
    console.log('res', res)
    res.then(function (response) {

      context.commit('GET_STOCKTYPECODE_POST', response)
    })
  },
  getstocktypecode_action_get(context) {

    const res = getstocktypecode_get_api()

    res.then(function (response) {

      context.commit('GET_STOCKTYPECODE_GET', response)
    })
  },


  //接口管理
  getSDKinterface_action_get(context) {
    const res = getSDKinterface_get_api()

    res.then(function (response) {

      context.commit('GET_SDKINTERFACE_GET', response)
    })
  },
  getSDKinterface_action_getparam(context, param) {
    console.log('param222', param)
    const res = getSDKinterface_getparam_api(param)
    console.log('res', res)
    res.then(function (response) {

      context.commit('GET_SDKINTERFACE_GET', response)
    })
  },
  getSDKinterface_action_remove(context, param) {

    const res = getSDKinterface_remove_api(param)

    res.then(function (response) {

      context.commit('GET_SDKINTERFACE_REMOVE', response)
    })

  },
  getSDKinterface_action_addinfo(context, param) {

    const res = getSDKinterface_addinfo_api(param)

    res.then(function (response) {

      context.commit('GET_SDKINTERFACE_ADDINFO', response)
    })
  },

  //方法管理
  getmethodPage_action_getparam(context,param) {
    const res = getmethodpage_getparam_api(param)
    console.log('333',res)
    res.then(function (response) {

      context.commit('GET_METHODPAGE_GET', response)
    })
  }
}



export default {
  namespaced: true,
  state,
  mutations,
  actions
}
