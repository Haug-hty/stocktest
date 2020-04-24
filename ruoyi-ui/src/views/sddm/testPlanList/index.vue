<template>
  <div class="app-container">
    <el-container>
      <el-main>
        <el-collapse v-model="activeCollapse">
          <el-collapse-item title="查询条件" name="search">
            <el-form ref="searchCondition" :model="testPlan.filter" label-width="80px" label-position="‘left’">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="计划名" prop="name">
                    <el-input v-model="testPlan.filter.name" :clearable="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" style="marginLeft:20px;">
                  <el-button @click="handleSearch(testPlan.filter.name)" type="primary">查询</el-button>
                  <el-button @click="resetForm('searchCondition')" type="primary">重置</el-button>
                </el-col>
                <el-col :span="2" style="margin: 0px 0 10px 0;" type="flex" justify="end">
                  <el-button @click="addTestPlan()" type="primary">新建</el-button>
                </el-col>
                <el-col :span="2" style="margin: 0px 0 10px 0;" type="flex" justify="end">
                  <el-button @click="getTestPlanState" type="primary">刷新</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-collapse-item>
        </el-collapse>

        <el-table :data="TestPlaninformation" width="100%">
          <el-table-column prop="data.plan_name" label="计划名" width="auto"></el-table-column>
          <el-table-column prop="data.plan_type" label="计划类型" width="auto"></el-table-column>
          <el-table-column prop="data.state" label="执行状态" width="auto"></el-table-column>
          <el-table-column prop="operation" label="操作" width="auto">
            <template slot-scope="scope">
              <el-button @click="playPlan(scope)" type="primary" size="small" style="margin-left: -5px" round>运行
              </el-button>
              <el-button @click="editPlan(scope)" type="warning" size="small" style="margin-left: -2px" round>修改
              </el-button>
              <el-button @click="delPlan(scope)" type="danger" size="small" style="margin-left: -2px" round>删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- <el-row>
          <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange"
            :current-page="testPlan.pagination.current" :page-sizes="[100, 200, 300, 400]" :page-size="100"
            layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
        </el-row> -->

        <el-dialog title="新建计划" ref="createPlan" style="width:150%;padding: 50px;marginLeft:-300px;"
          :visible.sync="testPlan.dialogCreatePlan">
          <!-- <el-dialog
        title="新建计划"
        size="large"
        ref="createPlan"
        v-model="testPlan.dialogCreatePlan"
        style="width:800px;padding: 50px;marginLeft:200px;"
          >-->
          <div style="padding: 20px 50px">
            <el-form label-width="100px" ref="testPlan.planForm" :model="testPlan.planForm">
              <el-row type="flex" justify="space-between">
                <el-col :span="11">
                  <el-form-item label="测试计划名" prop="name" label-width="100px">
                    <el-input v-model="testPlan.planForm.name" style="width:250px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="测试计划类型" prop="type">
                    <el-select v-model="testPlan.planForm.type" style="width:250px" placeholder="请选择">
                      <el-option v-for="item in testPlan.options" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
    <!----------------------------------------数据项展示 ------------------------------------------->
              <div id="addForm2" v-if="testPlan.planForm.type == 2 || testPlan.planForm.type == 1 
              || testPlan.planForm.type == 3 || testPlan.planForm.type == 4">

              <!------------------- 对比方法选择 ------------------>
               <el-row type="flex" justify="space-between">
                  <el-col :span="24">
                    <el-form-item label="对比方法">
                      <el-select v-model="testPlan.dag_id">
                        <el-option v-for="item in testPlan.compareMethod" :key="item.dictValue" :label="item.dictLabel"
                          :value="item.dictValue"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>                
                </el-row>

              <!------------------- 市场权限选择 ------------------>
                <el-row type="flex" justify="space-between">
                  <el-col :span="11">
                    <el-form-item label="市场名称">
                      <div v-for="item in testPlan.marketname" style="width:400px">
                        <div model="testPlan.marketname1" :label="item" :value="item">
                          {{item}}
                          <template v-for="perm in testPlan.MarketPerm">
                            <span v-if="perm.dictLabel === item" style="margin-left: 15px;margin-right:0px">
                              <el-checkbox :label="perm.dictLabel+':'+perm.dictValue"
                                v-model="testPlan.marketPermission"><span style="width: 30px;">{{perm.dictValue}}</span></el-checkbox>
                            </span>
                          </template>
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              <!------------------- 运行环境一 ------------------>
                <el-row type="flex" justify="space-between">
                  <el-col :span="24">
                    <el-form-item label="运行环境1">
                      <el-select v-model="testPlan.Env1value">
                        <el-option v-for="item in testPlan.Env" :key="item.value" :label="item.label"
                          :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>                
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div v-if="testPlan.Env1value == '0'">
                      <el-form-item >
                      <el-table :data="testPlan.Url1value" border style="width: 100%" 
                                @selection-change="selectionEnv1Change" height="250" stripe="true">
                        <el-table-column type="selection" />
                        <el-table-column prop="dictLabel" label="站点名称" width="auto" ></el-table-column>
                        <el-table-column prop="dictValue" label="站点ip" width="auto"></el-table-column>
                      </el-table>
                    </el-form-item>
                    </div>
                    <div v-if="testPlan.Env1value == '1'">
                      <el-form-item >
                      <el-table :data="testPlan.Url2value" border style="width: 100%" @selection-change="selectionEnv1Change" height="250" stripe="true">
                        <el-table-column type="selection" />
                        <el-table-column prop="dictLabel" label="站点名称" width="auto"></el-table-column>
                        <el-table-column prop="dictValue" label="站点ip" width="auto"></el-table-column>
                      </el-table>
                    </el-form-item>
                    </div>
                    <div v-if="testPlan.Env1value == '2'">
                      <el-form-item >
                      <el-table :data="testPlan.Url3value" border style="width: 100%" @selection-change="selectionEnv1Change" height="250">
                        <el-table-column type="selection" />
                        <el-table-column prop="dictLabel" label="站点名称" width="auto"></el-table-column>
                        <el-table-column prop="dictValue" label="站点ip" width="auto"></el-table-column>
                      </el-table>
                    </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              <!---------------- 运行环境二 ----------------->
                <el-row v-if="testPlan.planForm.type == 2 || testPlan.planForm.type == 3">
                  <el-col :span="24">
                    <el-form-item label="运行环境2">
                      <el-select v-model="testPlan.Env2value">
                        <el-option v-for="item in testPlan.Env" :key="item.value" :label="item.label"
                          :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div v-if="testPlan.Env2value == '0'">
                      <el-form-item >
                      <el-table :data="testPlan.Url1value" border style="width: 100%" @selection-change="selectionEnv2Change" height="250">
                        <el-table-column type="selection" />
                        <el-table-column prop="dictLabel" label="站点名称" width="auto"></el-table-column>
                        <el-table-column prop="dictValue" label="站点ip" width="auto"></el-table-column>
                      </el-table>
                    </el-form-item>
                    </div>
                    <div v-if="testPlan.Env2value == '1'">
                      <el-form-item >
                      <el-table :data="testPlan.Url2value" border style="width: 100%" @selection-change="selectionEnv2Change" height="250">
                        <el-table-column type="selection" style=""/>
                        <el-table-column prop="dictLabel" label="站点名称" width="auto"></el-table-column>
                        <el-table-column prop="dictValue" label="站点ip" width="auto"></el-table-column>
                      </el-table>
                    </el-form-item>
                    </div>
                    <div v-if="testPlan.Env2value == '2'">
                      <el-form-item >
                      <el-table :data="testPlan.Url3value" border style="width: 100%" @selection-change="selectionEnv2Change" height="250">
                        <el-table-column type="selection" />
                        <el-table-column prop="dictLabel" label="站点名称" width="auto"></el-table-column>
                        <el-table-column prop="dictValue" label="站点ip" width="auto"></el-table-column>
                      </el-table>
                    </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <!----------- 选择版本方法用例 ------------->
                <el-row>
                  <el-col>
                    <el-form-item label="SDK版本">
                      <el-select v-model="testPlan.SDKversion" @change="functionSelectInterface">
                        <el-option v-for="item in testPlan.androidSDKlist" :key="item.sdk_version"
                          :label="item.sdk_version" :value="item.sdk_version"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item label="执行方法列表">
                      <el-table :data="testPlan.contentList" @selection-change="selectionChange"
                        :row-class-name="tableRowClassName" height="300" border>
                        <el-table-column type="selection" />
                        <el-table-column prop="method_name" label="方法名"></el-table-column>
                        <el-table-column prop="method_des" label="方法描述"></el-table-column>
                        <el-table-column prop="operate" label="操作">
                          <template slot-scope="scope">
                            <el-button @click="choseTestCase(scope),testPlan.dialogCreateJiaoBen = true" type="primary" plain>用例选择</el-button>
                            <!------- 用例管理 -------->
                            <el-dialog width="30%" :visible.sync="testPlan.dialogCreateJiaoBen" append-to-body>
                              <div>
                                <el-form>
                                  <el-form-item label="用例列表">
                                    <el-table ref="multipleTable" :data="testPlan.testcaseList"
                                      @selection-change="handleSelectionChange" height="250" border>
                                      <el-table-column type="selection" />
                                      <el-table-column prop="case_name" label="用例名" ></el-table-column>
                                    </el-table>
                                  </el-form-item>
                                </el-form>
                                <el-row type="flex" justify="end">
                                  <el-button @click="testPlan.dialogCreateJiaoBen = false">取消</el-button>
                                  <el-button type="primary" @click="addTestcase()">保存</el-button>
                                </el-row>
                              </div>
                            </el-dialog>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div>
                  <!--------- 固定参数填写 ------------->
                  <el-row>
                    <el-col :span="13">
                      <el-form-item label="计划开始时间" prop="testPlan.start_date" label-width="230px">
                        <!-- <el-input v-model="testPlan.start_date" :clearable="true" style="width:100%"></el-input> -->
                        <el-date-picker
                          v-model="testPlan.start_date"
                          type="datetime"
                          placeholder="选择日期时间"
                          style="width:100%">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item label="用例执行间隔" prop="testPlan.round_interval_sec" label-width="130px">
                        <el-input v-model="testPlan.round_interval_sec" :clearable="true" style="width:100%"></el-input>
                      </el-form-item>
                    </el-col>                    
                  </el-row>
                  <el-row>
                    <el-col :span="13">
                      <el-form-item label="执行次数" prop="testPlan.run_times" label-width="230px">
                        <el-input v-model="testPlan.run_times" :clearable="true" style="width:100%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item label="快照规则比对" prop="testPlan.quote_detail" label-width="130px">
                        <el-input v-model="testPlan.quote_detail" :clearable="true" style="width:100%" placeholder="行情快照填写1，非行情快照填写0"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!---------- 版本一tag_sha,tag_id填写 ---------->
                  <el-row >                    
                    <el-col span="13">
                      <el-form-item label="tag_id" prop="testPlan.tag_id" label-width="230px">
                        <el-input v-model="testPlan.tag_id" :clearable="true" style="width:100%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="11">
                      <el-form-item label="tag_sha" prop="testPlan.tag_sha" label-width="130px">
                        <el-input v-model="testPlan.tag_sha" :clearable="true" style="width:100%"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!---------- 版本二tag_sha,tag_id填写 ---------->
                  <div v-if="testPlan.planForm.type == 1 || testPlan.planForm.type == 3">
                    <el-row>
                      <el-col span="13">
                        <el-form-item label="tag_id" prop="testPlan.tag_id" label-width="230px">
                          <el-input v-model="testPlan.tag_id_1" :clearable="true" style="width:100%"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="11">
                        <el-form-item label="tag_sha" prop="testPlan.tag_sha" label-width="130px">
                          <el-input v-model="testPlan.tag_sha_1" :clearable="true" style="width:100%"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>                    
                  </div>
                  <!-------- 存储表名填写 ---------->
                  <!-- <el-row>
                    <el-col>
                      <el-form-item label="执行结果存储表名" label-width="230px">
                        <el-input v-model="testPlan.collectionName" style="width:100%"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row> -->
                </div>
              </div>

              <!-- <div id="addForm3" v-if="testPlan.planForm.type == 3">
              <el-row>
                <el-col :span="11">
                  <el-label style="margin-left: 10px">上证所数据：</el-label>
                  <el-row type="flex" justify="space-between">
                    <el-col :span="11">
                      <el-form-item label="市场权限">
                        <el-checkbox v-for="item in MarketPerm" :label="item"></el-checkbox>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="space-between" style="margin-top: 10px">
                    <el-col>
                      <el-form-item label="运行环境">
                        <el-select v-model="testcase.Envvalue">
                          <el-option
                            v-for="item in Env"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row type="flex" justify="space-between">
                    <el-col :span="11">
                      <div v-if="Env1value == 1">
                        <el-form-item
                          v-for="(item,index) in Url1value"
                          :label="item.label"
                          :key="item.label"
                        >
                          <el-checkbox v-for="item in Url1value[index].value" :label="item"></el-checkbox>
                        </el-form-item>
                      </div>
                      <div v-if="Env1value == 2">
                        <el-form-item
                          v-for="(item,index) in Url2value"
                          :label="item.label"
                          :key="item.label"
                        >
                          <el-checkbox v-for="item in Url2value[index].value" :label="item"></el-checkbox>
                        </el-form-item>
                      </div>
                      <div v-if="Env1value == 3">
                        <el-form-item
                          v-for="(item,index) in Url3value"
                          :label="item.label"
                          :key="item.label"
                        >
                          <el-checkbox v-for="item in Url3value[index].value" :label="item"></el-checkbox>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col>
                      <el-form-item label="SDK版本：">
                        <el-select v-model="testcase.androidSDKversion">
                          <el-option
                            v-for="item in androidSDKlist"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="方法名" prop="name">
                        <el-input v-model="testcase.filter.name" :clearable="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" style="marginLeft:20px;">
                      <el-button @click="handleSearch" type="primary">查询</el-button>
                      <el-button @click="resetForm('searchCondition')">重置</el-button>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="运行方法列表:">
                        <el-table :data="testcase.contentList">
                          <el-table-column prop="label" label="方法名"></el-table-column>
                          <el-table-column prop="operate" label="操作">
                            <template slot-scope="scope">
                              <el-button @click="editJiaoBen(scope)" type="button" size="primary">修改</el-button>
                              <el-button @click="delJiaoBen(scope)" type="danger" size="primary">删除</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-form-item>
                      <el-button @click="testcase.dialogCreateJiaoBen = true" type="button" size="primary">新增</el-button>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="13">
                  <el-label style="margin-left: 10px">竞品数据：</el-label>
                  <div
                    v-for="(item, index) in jingpincase.dynamicItem"
                    :key="index"
                    style="margin-top: 10px"
                  >
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="分类代码" :prop="'dynamicItem.' + index + '.type'">
                          <el-input v-model="item.type"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="股票代码" :prop="'dynamicItem.' + index + '.name'">
                          <el-input v-model="item.code"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="开始时间" :prop="'dynamicItem.'+index+'.time'">
                          <el-input v-model="item.time"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="执行次数" :prop="'dynamicItem.'+index+'.doNum'">
                          <el-input v-model="item.doNum"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="间隔" :prop="'dynamicItem.'+index+'.waitTime'">
                          <el-input v-model="item.waitTime"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-form-item>
                        <i class="el-icon-delete" @click="deleteItem(item, index)"></i>
                      </el-form-item>
                    </el-row>
                  </div>
                  <el-row type="flex" justify="end">
                    <el-button @click="addItem" type="primary">增加</el-button>
                  </el-row>
                </el-col>
              </el-row>
              </div>-->
            </el-form>
            <el-row type="flex" justify="end">
              <el-button @click="testPlan.dialogCreatePlan = false">取消</el-button>
              <el-button type="primary" @click="postInfo()">保存</el-button>
            </el-row>
          </div>
        </el-dialog>

        <!-- <el-dialog
        title="修改计划"
        size="large"
        ref="editPlan"
        v-model="testPlan.dialogEditPlan"
        style="width:800px;padding: 50px;marginLeft:400px;"
      >
        <div style="padding: 20px 50px">
          <el-form label-width="100px" ref="editPlanForm" :model="testPlan.editPlanForm">
            <el-row type="flex" justify="space-between">
              <el-col :span="11">
                <el-form-item label="计划名" prop="name">
                  <el-input v-model="testPlan.editPlanForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="计划类型" prop="type">
                  <el-select v-model="testPlan.editPlanForm.type" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <div id="editForm1" v-if="editPlanForm.type==1">
              <el-row type="flex" justify="space-between">
                <el-col :span="11">
                  <el-form-item label="运行环境">
                    <el-select v-model="testPlan.Envvalue">
                      <el-option
                        v-for="item in Env"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" justify="space-between">
                <el-col :span="11">
                  <div v-if="Envvalue == 1">
                    <el-form-item
                      v-for="(item,index) in Url1value"
                      :label="item.label"
                      :key="item.label"
                    >
                      <el-checkbox v-for="item in Url1value[index].value" :label="item"></el-checkbox>
                    </el-form-item>
                  </div>
                  <div v-if="Envvalue == 2">
                    <el-form-item
                      v-for="(item,index) in Url2value"
                      :label="item.label"
                      :key="item.label"
                    >
                      <el-checkbox v-for="item in Url2value[index].value" :label="item"></el-checkbox>
                    </el-form-item>
                  </div>
                  <div v-if="Envvalue == 3">
                    <el-form-item
                      v-for="(item,index) in Url3value"
                      :label="item.label"
                      :key="item.label"
                    >
                      <el-checkbox v-for="item in Url3value[index].value" :label="item"></el-checkbox>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="安卓系统SDK版本：">
                    <el-select v-model="androidSDKversion">
                      <el-option
                        v-for="item in androidSDKlist"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="IOS系统SDK版本：">
                    <el-select v-model="testPlan.iosSDKversion">
                      <el-option
                        v-for="item in iosSDKlist"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="运行脚本列表:">
                    <el-table :data="testPlan.contentList">
                      <el-table-column prop="name" label="脚本名"></el-table-column>
                      <el-table-column prop="operate" label="操作">
                        <template slot-scope="scope">
                          <el-button @click="editJiaoBen(scope)" type="button" size="primary">修改</el-button>
                          <el-button @click="delJiaoBen(scope)" type="danger" size="primary">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-form-item>
                  <el-button @click="testPlan.dialogCreateJiaoBen = true" type="button" size="primary">新增</el-button>
                </el-col>
              </el-row>
            </div>

            <div id="editForm2" v-if="editPlanForm.type == 2">
              <el-row type="flex" justify="space-between">
                <el-col :span="11">
                  <el-form-item label="运行环境1">
                    <el-select v-model="Env1value">
                      <el-option
                        v-for="item in Env"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="运行环境2">
                    <el-select v-model="Env2value">
                      <el-option
                        v-for="item in Env"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" justify="space-between">
                <el-col :span="11">
                  <div v-if="Env1value == 1">
                    <el-form-item
                      v-for="(item,index) in Url1value"
                      :label="item.label"
                      :key="item.label"
                    >
                      <el-checkbox v-for="item in Url1value[index].value" :label="item"></el-checkbox>
                    </el-form-item>
                  </div>
                  <div v-if="Env1value == 2">
                    <el-form-item
                      v-for="(item,index) in Url2value"
                      :label="item.label"
                      :key="item.label"
                    >
                      <el-checkbox v-for="item in Url2value[index].value" :label="item"></el-checkbox>
                    </el-form-item>
                  </div>
                  <div v-if="Env1value == 3">
                    <el-form-item
                      v-for="(item,index) in Url3value"
                      :label="item.label"
                      :key="item.label"
                    >
                      <el-checkbox v-for="item in Url3value[index].value" :label="item"></el-checkbox>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="11">
                  <div v-if="Env2value == 1">
                    <el-form-item
                      v-for="(item,index) in Url1value"
                      :label="item.label"
                      :key="item.label"
                    >
                      <el-checkbox v-for="item in Url1value[index].value" :label="item"></el-checkbox>
                    </el-form-item>
                  </div>
                  <div v-if="Env2value == 2">
                    <el-form-item
                      v-for="(item,index) in Url2value"
                      :label="item.label"
                      :key="item.label"
                    >
                      <el-checkbox v-for="item in Url2value[index].value" :label="item"></el-checkbox>
                    </el-form-item>
                  </div>
                  <div v-if="Env2value == 3">
                    <el-form-item
                      v-for="(item,index) in Url3value"
                      :label="item.label"
                      :key="item.label"
                    >
                      <el-checkbox v-for="item in Url3value[index].value" :label="item"></el-checkbox>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="SDK版本：">
                    <el-select v-model="androidSDKversion">
                      <el-option
                        v-for="item in androidSDKlist"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="运行脚本列表:">
                    <el-table :data="contentList">
                      <el-table-column prop="name" label="脚本名"></el-table-column>
                      <el-table-column prop="operate" label="操作">
                        <template slot-scope="scope">
                          <el-button @click="editJiaoBen(scope)" type="button" size="primary">修改</el-button>
                          <el-button @click="delJiaoBen(scope)" type="danger" size="primary">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-form-item>
                  <el-button @click="dialogCreateJiaoBen = true" type="button" size="primary">新增</el-button>
                </el-col>
              </el-row>
            </div>
            <div id="editForm3" v-if="editPlanForm.type == 3">
              <el-row>
                <el-col :span="11">
                  <el-label style="margin-left: 10px">上证所数据：</el-label>
                  <el-row type="flex" justify="space-between" style="margin-top: 10px">
                    <el-col>
                      <el-form-item label="运行环境">
                        <el-select v-model="Envvalue">
                          <el-option
                            v-for="item in Env"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row type="flex" justify="space-between">
                    <el-col :span="11">
                      <div v-if="Env1value == 1">
                        <el-form-item
                          v-for="(item,index) in Url1value"
                          :label="item.label"
                          :key="item.label"
                        >
                          <el-checkbox v-for="item in Url1value[index].value" :label="item"></el-checkbox>
                        </el-form-item>
                      </div>
                      <div v-if="Env1value == 2">
                        <el-form-item
                          v-for="(item,index) in Url2value"
                          :label="item.label"
                          :key="item.label"
                        >
                          <el-checkbox v-for="item in Url2value[index].value" :label="item"></el-checkbox>
                        </el-form-item>
                      </div>
                      <div v-if="Env1value == 3">
                        <el-form-item
                          v-for="(item,index) in Url3value"
                          :label="item.label"
                          :key="item.label"
                        >
                          <el-checkbox v-for="item in Url3value[index].value" :label="item"></el-checkbox>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col>
                      <el-form-item label="SDK版本：">
                        <el-select v-model="androidSDKversion">
                          <el-option
                            v-for="item in androidSDKlist"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="运行脚本列表:">
                        <el-table :data="contentList">
                          <el-table-column prop="name" label="脚本名"></el-table-column>
                          <el-table-column prop="operate" label="操作">
                            <template slot-scope="scope">
                              <el-button @click="editJiaoBen(scope)" type="button" size="primary">修改</el-button>
                              <el-button @click="delJiaoBen(scope)" type="danger" size="primary">删除</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-form-item>
                      <el-button @click="dialogCreateJiaoBen = true" type="button" size="primary">新增</el-button>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="13">
                  <el-label style="margin-left: 10px">竞品数据：</el-label>
                  <div
                    v-for="(item, index) in jingpincase.dynamicItem"
                    :key="index"
                    style="margin-top: 10px"
                  >
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="分类代码" :prop="'dynamicItem.' + index + '.type'">
                          <el-input v-model="item.type"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="股票代码" :prop="'dynamicItem.' + index + '.name'">
                          <el-input v-model="item.code"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="开始时间" :prop="'dynamicItem.'+index+'.time'">
                          <el-input v-model="item.time"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="执行次数" :prop="'dynamicItem.'+index+'.doNum'">
                          <el-input v-model="item.doNum"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="间隔" :prop="'dynamicItem.'+index+'.waitTime'">
                          <el-input v-model="item.waitTime"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-form-item>
                        <i class="el-icon-delete" @click="deleteItem(item, index)"></i>
                      </el-form-item>
                    </el-row>
                  </div>
                  <el-row type="flex" justify="end">
                    <el-button @click="addItem" type="primary">增加</el-button>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <el-row type="flex" justify="end">
            <el-button @click="handleCloseEditDialog">取消</el-button>
            <el-button type="info" @click="updatePlanById">保存</el-button>
          </el-row>
        </div>
        </el-dialog>-->
      </el-main>
    </el-container>
  </div>
</template>
<script type="text/javascript">
  import { mapState, mapActions } from "vuex";
  import axios from "axios";

  export default {
    name: "testPlan",
    computed: {
      ...mapState({
        SDKinformation: state => state.sddmstore.SDKinformation,
        sdkversion: state => state.sddmstore.sdkversion,
        methodPage: state => state.sddmstore.methodPage,
        testPlan: state => state.sddmstore.testPlan,
        TestPlaninformation: state => state.sddmstore.TestPlaninformation
      })
    },
    data() {
      return {
        activeCollapse: ["search"]
      };
    },
    created() {
      this.$store.dispatch("sddmstore/getTableData_action_get");
      this.getTableData();


      //市场权限参数字典
      this.getDicts("sys_market").then(res => {
        var marketlabel = "";
        this.testPlan.MarketPerm = res.data;
        this.testPlan.MarketPerm.forEach(element => {
          if (marketlabel == element.dictLabel) {
            marketlabel = element.dictLabel;
          } else {
            this.testPlan.marketname.push(element.dictLabel);
            marketlabel = element.dictLabel;
          }
        });
      });

      //测试环境参数字典
      this.getDicts("sys_ceshi").then(res => {
        this.testPlan.Url1value = res.data;
      });
      //生产环境参数字典
      this.getDicts("sys_quanzhen").then(res => {
        this.testPlan.Url2value = res.data;
      });
      //生产环境参数字典
      this.getDicts("sys_shengchan").then(res => {
        this.testPlan.Url3value = res.data;
      });
      //对比方法参数字典
      this.getDicts("sys_compareMethod").then(res => {
        this.testPlan.compareMethod = res.data;
      });
    },
    // 监听
    watch: {},
    methods: {
      ...mapActions('sddmstore', ['getTestCasePlan_action_runPlan','getTestPlan_action_state']),
      //页面初始化查询
      getTableData() {
        this.$store.dispatch("sddmstore/getTestPlanTableData_action_get");
      },

      //新增测试计划
      addTestPlan(){
        this.testPlan.planForm.type = ''
        this.testPlan.dialogCreatePlan=true
      },

      //新增测试计划保存
      postInfo() {
        let _this = this
        //页面选择的市场权限数据处理
        this.testPlan.marketPermission.forEach(item => {
          var a = [];
          a = item.split(":");
          if (a[0] == "沪深市场") {
            if (a[1] == "Level1") {
              this.testPlan.market[0].permission.push("1");
            } else {
              this.testPlan.market[0].permission.push("2");
            }
          } else {
            this.testPlan.market[1].permission.push(a[1]);
          }
        });
        //运行环境1数据处理存储
        this.testPlan.runEenvironment1.forEach(runEn => {
          this.testPlan.serverSites1.push([runEn.dictLabel, runEn.dictValue]);
        });
        //运行环境2数据处理存储
        this.testPlan.runEenvironment2.forEach(runEn1 => {
          this.testPlan.serverSites2.push([runEn1.dictLabel, runEn1.dictValue]);
        });
        this.testPlan.dialogCreatePlan = false;
        this.$store
          .dispatch("sddmstore/getTestCasePlan_action_addinfo")
          .then(res => {
            this.$message({
              type: "info",
              message: "新建成功",
            });
          })
          .catch(err => {
            this.$message({
              type: "warning",
              message: "新建失败"
            });
            console.log(err);
          });
      },

      //运行测试计划
      playPlan(scope) {
        const params = Object.assign({}, scope.row.data);
        let _this = this;
        let tableName = params.collectionName;
        let _params = params;
        let time_stamp = "";
        let time1 = '';
        this.getTestCasePlan_action_runPlan(params).then(() => {
          time1 = _this.testPlan.response.data.message.substring(_this.testPlan.response.data.message.indexOf("@")+1).trim()
          time_stamp =
            time1.substring(27, 54) +
            " " +
            _this.testPlan.response.data.message.substring(54, 59);
          alert(time_stamp)
          const params = Object.assign(
            {},
            { id: scope.row.id },
            { time_stamp: time_stamp }
          );
          _this.$store.dispatch(
            "sddmstore/getTestCasePlan_action_addTimeStamp",
            params          
          );
        });
      },


      //根据选择的版本展示改版本下的所有方法名称
      functionSelectInterface() {
        let item = Object.assign(
          {},
          { key: "data.sdk_version", value: this.testPlan.SDKversion }
        );
        var param = [];
        param.push(item);
        this.$store
          .dispatch("sddmstore/getmethod_action_get", param)
          .then(res => {
            this.methodPage.interface_name = "";
          });
      },
      //根据选择方法展示用例
      functionSelectTestcase() {
        let item = Object.assign(
          {},
          { key: "data.sdk_version", value: this.testPlan.SDKversion }
        );
        var param = [];
        param.push(item);
        this.$store
          .dispatch("sddmstore/getmethod_action_get1", param)
          .then(res => {
            this.methodPage.interface_name = "";
          });
      },

      //选择用例
      choseTestCase(scope) {
        this.testPlan.testcaseList = [];
        this.testPlan.transfer = scope.row;
        this.testPlan.number = scope.row.index;
        this.testPlan.method_name = scope.row.method_name;
        this.functionSelectTestcase();
      },

      //保存用例
      addTestcase() {
        this.testPlan.contentList[
          this.testPlan.number
        ].testcases = this.testPlan.paramStrs;
        this.testPlan.paramStrs = [];
        this.testPlan.dialogCreateJiaoBen = false;
      },
      //用例选择器
      handleSelectionChange(val) {
        this.testPlan.paramStrs = val;
      },

      tableRowClassName({ row, rowIndex }) {
        row.index = rowIndex;
      },
      //使用方法选择器
      selectionChange(val) {
        this.testPlan.useMethod = val;
      },
      //运行环境1选择
      selectionEnv1Change(val) {
        this.testPlan.runEenvironment1 = val;
      },
      //运行环境1选择
      selectionEnv2Change(val) {
        this.testPlan.runEenvironment2 = val;
      },

      //刷新获取airflow中计划的状态
      getTestPlanState(){
        let time
        let _this = this
        this.TestPlaninformation.forEach(item=>{
          if(item.data.state =="运行中"){
            time = item.data.time_stamp.substring(8, 27)
            const params = Object.assign(
              {},
              { dag_id: item.data.dag_id },
              { time_stamp: time }
            );
            this.getTestPlan_action_state(params).then(() => {
                if(_this.testPlan.state == 'success' || _this.testPlan.state == 'failed' ){
                  let id =item.id
                  let timetamp = item.data.time_stamp
                  let state1 = ''
                  let collectiontable =  item.data.collectionName
                  if(_this.testPlan.state == 'success'){
                    state1 = '执行成功'
                  }else{
                    state1 = '执行失败'
                  }
                  const param = Object.assign(
                      {},
                      { id: id},
                      { time_stamp: timetamp },
                      { state: state1},
                      { tableNa: collectiontable}
                    );
                  _this.$store.dispatch("sddmstore/getTestPlan_action_findResult",param);
                }
                })
          }
        })

      },
    }
  };
</script>

<style type="text/css">
</style>