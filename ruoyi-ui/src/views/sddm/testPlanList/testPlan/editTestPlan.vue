<template>
    <div class="app-container">
        <el-container>
          <el-main>
            <div>修改测试计划</div>
            <div style="padding: 20px 50px">
              <el-form label-width="100px" ref="testPlan.planForm" :model="testPlan.planForm">
                <el-row type="flex" justify="space-between">
                  <el-col :span="11">
                    <el-form-item label="测试计划名" prop="name" label-width="100px" >
                      <el-input v-model="testPlan.planForm.name" style="width:250px" ></el-input>
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
                        <el-select v-model="testPlan.dag_id" style="width:250px">
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
                        <div v-for="item in testPlan.marketname" :key="item" style="width:400px">
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
                        <el-select v-model="testPlan.Env1value" style="width:250px">
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
                        <el-select v-model="testPlan.Env2value" style="width:250px">
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
                          <el-table-column type="selection" />
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
                        <el-select v-model="testPlan.SDKversion" @change="functionSelectInterface" style="width:250px">
                          <el-option v-for="item in testPlan.androidSDKlist" :key="item.sdk_version"
                            :label="item.sdk_version" :value="item.sdk_version"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                        <el-form-item label="执行方法列表">
                            <el-table ref="multipleTable" :data="testPlan.contentList" @selection-change="selectionChange"
                            :row-class-name="tableRowClassName" height="400" border>
                                <el-table-column type="selection" />
                                <el-table-column prop="method_name" label="方法名"></el-table-column>
                                <el-table-column prop="method_des" label="方法描述"></el-table-column>
                                <el-table-column prop="operate" label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="choseTestCase(scope)" type="primary" plain>用例选择</el-button>
                                </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                      <!------- 用例管理 -------->
                      <div v-if="testPlan.controlCase == '1'">
                        <el-form-item label="用例选择列表">
                            <el-button type="primary" @click="addTestcase()">保存所选用例</el-button>
                            <el-table  :data="testPlan.testcaseList"
                                @selection-change="handleSelectionChange" height="400" border>
                                <el-table-column type="selection" />
                                <el-table-column prop="case_name" label="用例名" ></el-table-column>
                            </el-table>
                        </el-form-item>
                    </div>
                    </el-col>
                  </el-row>
                  <div>
                    <!--------- 固定参数填写 ------------->
                    <el-row>
                      <el-col :span="13">
                        <el-form-item label="计划开始时间" prop="start_date" label-width="230px">
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
                        <el-form-item label="用例执行间隔" prop="round_interval_sec" label-width="130px">
                          <el-input value="3" v-model="testPlan.round_interval_sec"  :clearable="true" style="width:100%" ></el-input>
                        </el-form-item>
                      </el-col>                    
                    </el-row>
                    <el-row>
                      <el-col :span="13">
                        <el-form-item label="执行次数" prop="run_times" label-width="230px" >
                          <el-input v-model="testPlan.run_times" :clearable="true" style="width:100%" ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="比对规则" prop="quote_detail" label-width="130px" >
                          <el-select v-model="testPlan.quote_detail" :clearable="true" style="width:100%" placeholder="请选择">
                            <el-option v-for="item in testPlan.optionsQuote" :key="item.value" :label="item.label"
                              :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!---------- 版本一tag_sha,tag_id填写 ---------->
                    <el-row >                    
                      <el-col span="13">
                        <el-form-item label="tag_id" prop="tag_id" label-width="230px" >
                          <el-input v-model="testPlan.tag_id" :clearable="true" style="width:100%" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="11">
                        <el-form-item label="tag_sha" prop="testPlan.tag_sha" label-width="130px" >
                          <el-input v-model="testPlan.tag_sha" :clearable="true" style="width:100%"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!---------- 版本二tag_sha,tag_id填写 ---------->
                    <div v-if="testPlan.planForm.type == 1 || testPlan.planForm.type == 3">
                      <el-row>
                        <el-col span="13">
                          <el-form-item label="tag_id" prop="tag_id_1" label-width="230px" >
                            <el-input v-model="testPlan.tag_id_1" :clearable="true" style="width:100%" ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col span="11">
                          <el-form-item label="tag_sha" prop="tag_sha_1" label-width="130px" >
                            <el-input v-model="testPlan.tag_sha_1" :clearable="true" style="width:100%" ></el-input>
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
  
                
              </el-form>
              <el-row type="flex" justify="end">
                <el-button type="primary" @click="postInfo()" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
              </el-row>
            </div>
          </el-main>
        </el-container>
        </div>
</template>

<script type="text/javascript">
    import { mapState, mapActions } from "vuex";
    import axios from "axios";
  
    export default {
      name: "editTestPlan",
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
          activeCollapse: ["search"],
          fullscreenLoading: false,
        };
      },
      created() {
        //sdk版本列表查询
        this.$store.dispatch("sddmstore/getTableData_action_get");

  
  
        //市场权限参数字典
        this.getDicts("sys_market").then(res => {
            var marketlabel = "";
            this.testPlan.marketname = [];
            this.testPlan.MarketPerm = res.data;
            this.testPlan.MarketPerm.forEach(element => {
            if (marketlabel == element.dictLabel) {
                marketlabel = element.dictLabel;
            } else {
                this.testPlan.marketname.push(element.dictLabel);
                marketlabel = element.dictLabel;
            }
            });
            console.log(this.testPlan.marketname)
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
        ...mapActions('sddmstore', ['getTestCasePlan_action_runPlan','getTestPlan_action_state','getTestCasePlan_action_addinfo',
                                    'getTestCasePlan_action_addTimeStamp','getTestPlan_action_findResult','getmethod_action_get1']),
        
    
        
        //保存时数据字符串中的空格处理（字符串前和后的空格）
        trim(str) {
          return str.replace(/(^\s*)|(\s*$)/g, "");
        },
        
        //新增测试计划保存
        postInfo() {
              
          let _this = this
          let that =_this
          if(this.testPlan.planForm.name == '' ){
            _this.$message.warning('请填写测试计划名称')
            return
          }
          if(this.testPlan.marketPermission == '' ){
            _this.$message.warning('请选择市场权限')
            return
          }
          if(this.testPlan.round_interval_sec == '' ){
            _this.$message.warning('请填写用例执行间隔')
            return
          }
          if(this.testPlan.run_times == '' ){
            _this.$message.warning('请填写执行次数')
            return
          }
          if(this.testPlan.quote_detail == '' ){
            _this.$message.warning('请选择快照比对规则')
            return
          }
          if(this.testPlan.tag_id == '' ){
            _this.$message.warning('请填写tag_id')
            return
          }
          if(this.testPlan.tag_sha == '' ){
            _this.$message.warning('请填写tag_sha')
            return
          }
          if(this.testPlan.planForm.type != '2'){
            if(this.testPlan.tag_id_1 == '' ){
            _this.$message.warning('请填写tag_id')
            return
            }
            if(this.testPlan.tag_sha_1 == '' ){
              _this.$message.warning('请填写tag_sha')
              return
            }
          }
        //   this.fullscreenLoading = true 
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
          //input框输入数据进行空字符的处理
          this.testPlan.round_interval_sec = this.trim(this.testPlan.round_interval_sec);
          this.testPlan.run_times = this.trim(this.testPlan.run_times);
          this.testPlan.tag_id = this.trim(this.testPlan.tag_id);
          this.testPlan.tag_sha = this.trim(this.testPlan.tag_sha);
          this.testPlan.tag_id_1 = this.trim(this.testPlan.tag_id_1);
          this.testPlan.tag_sha_1 = this.trim(this.testPlan.tag_sha_1);
          this.testPlan.dialogCreatePlan = false;
          this.getTestCasePlan_action_editinfo()
            .then(res => {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              _this.fullscreenLoading = false;
              _this.$router.push({
                    name: 'testPlan',                    
                })              
            })
            .catch(err => {
              this.$message({
                type: "warning",
                message: "修改失败"
              });
              console.log(err);
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
          this.getmethod_action_get1(param)
          .then(res=>{
            console.log("...",this.testPlan.testcaseList)
          })
            // .then(res => {
            //   //this.methodPage.interface_name = "";
            // });
        },
  
        //选择用例
        choseTestCase(scope) {
          this.testPlan.testcaseList = [];
          this.testPlan.transfer = scope.row;
          this.testPlan.number = scope.row.index;
          this.testPlan.method_name = scope.row.method_name;
          this.testPlan.interface_name = scope.row.interfacename;
          this.testPlan.controlCase = 1;
          this.functionSelectTestcase();
        },
  
        //保存用例
        addTestcase() {
          this.testPlan.contentList[
            this.testPlan.number
          ].testcases = this.testPlan.paramStrs;
          this.testPlan.paramStrs = [];
          this.$message({
            type: "success",
            message: "保存成功",
          });          
          this.$refs.multipleTable.toggleRowSelection(this.testPlan.transfer);
          this.testPlan.testcaseList = [];
          this.testPlan.controlCase = 0
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
        }
    }
    };
  </script>
  <style type="text/css">
  </style>