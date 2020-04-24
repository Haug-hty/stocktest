<template>
  <div style="padding: 20px;">
    <el-row>
      <el-col :span="6">
        <div>
          版本：
          <el-select
            v-model="TestCase.sdk_version"
            placeholder="请选择SDK版本"
            @change="funversion"
            clearable="true"
          >
            <el-option
              v-for="item in TestCase.options"
              :key="item.sdk_version"
              :label="item.sdk_version"
              :value="item.sdk_version"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          接口：
          <el-select v-model="TestCase.interface_name" placeholder="请选择接口" @change="funinterface">
            <el-option
              v-for="item in TestCase.options2"
              :key="item.interface_name"
              :label="item.interface_name"
              :value="item.interface_name"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          方法：
          <el-select v-model="TestCase.method_name" placeholder="请选择方法" @change="funmethod">
            <el-option
              v-for="item in TestCase.options3"
              :key="item.method_name"
              :label="item.method_name"
              :value="item.method_name"
            ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <!--  //查询-->
    <el-collapse v-model="TestCase.activeCollapse">
      <el-collapse-item title="查询条件" name="search">
        <el-form
          ref="searchCondition"
          :model="TestCase.filter"
          label-width="100px"
          label-position="‘left’"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="用例名称" prop="versionName">
                <el-input v-model="TestCase.filter.versionName" :clearable="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="marginLeft:20px;">
              <el-button @click="handleSearch" type="primary">查询</el-button>
              <el-button @click="resetForm('searchCondition')">重置</el-button>
            </el-col>
            <el-col :span="2" style="margin: 0px 0 10px 0;" type="flex" justify="end">
              <el-button type="primary" @click="addcaseInfo()">新增用例</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>

    <!-- 初始化查询列表 -->
    <div style="margin-bottom: 20px" v-if="TestCase.initvisable">
      <el-form :model="TestCase.form1">
        <el-table :data="TestCase.list" border>
          <el-table-column type="selection" width="29"></el-table-column>
          <el-table-column label="用例名称" prop="case_name"></el-table-column>
          <el-table-column label="用例描述" prop="case_name_des"></el-table-column>
          <el-table-column label="股票类型" prop="stocktype"></el-table-column>
          <el-table-column label="股票代码" prop="stockcode"></el-table-column>
          <el-table-column label="参数" prop="param"></el-table-column>
          <el-table-column label="操作" prop="operate" width="200">
            <template scope="scope">
              <el-button @click="delList(scope)" type="primary">删除</el-button>
              <el-button
                type="primary"
                @click="editinfo(scope),TestCase.dialogupdataVisible = true"
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>

    <!-- 修改初始化列表 -->
    <el-dialog title="修改" :visible.sync="TestCase.dialogupdataVisible">
      <el-form :model="TestCase.updata">
        <!-- <el-form-item v-for="(domain, index) in TestCase.list" :key="domain.key"> -->
        <label>用例名称</label>
        <el-input v-model="TestCase.updata.case_name" style="width: 100px;"></el-input>
        <label>用例描述</label>
        <el-input v-model="TestCase.updata.case_name_des" style="width: 100px;"></el-input>
        <label>股票类型</label>
        <el-input v-model="TestCase.updata.stocktype" style="width: 100px;"></el-input>

        <label>股票代码</label>
        <el-input v-model="TestCase.updata.stockcode" style="width: 100px;"></el-input>
        <label>参数</label>
        <el-input v-model="TestCase.updata.param" style="width: 100px;"></el-input>
        <!-- </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="TestCase.dialogupdataVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateClassesById(updata),TestCase.dialogupdataVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!--新增列表-->

    <div style="margin-bottom: 20px" v-if="TestCase.addvisable">
      <el-form :model="TestCase.form2">
        <el-table :data="TestCase.table1" border>
          <el-table-column type="selection" width="29"></el-table-column>
          <el-table-column label="用例名称" prop="case_name"></el-table-column>
          <el-table-column label="用例描述" prop="case_des"></el-table-column>
          <el-table-column label="股票类型" prop="stocktype"></el-table-column>
          <el-table-column label="股票代码" prop="stockcode"></el-table-column>
          <el-table-column label="参数" prop="param"></el-table-column>
          <el-table-column label="操作" prop="operate" width="200">
            <template scope="scope">
              <el-button @click="delList(scope)" type="primary">删除</el-button>
              <el-button type="primary" @click="editClass(scope),dialogupdataVisible = true">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>

    <!--    新增-->
    <el-dialog title="新增用例" :visible.sync="TestCase.dialogFormVisible">
      <el-table
        :data="TestCase.table"
        width="100%"
        height="250"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="69"></el-table-column>

        <el-table-column label="股票类型" prop="dictLabel" width="260"></el-table-column>
        <el-table-column label="股票代码" prop="dictValue" width="260"></el-table-column>
      </el-table>
      <el-form v-model="TestCase.datademo">
        <el-form-item
          v-for="(param, index) in TestCase.datademo.form1"
          :label="'参数' + index"
          :key="param.key"
          label-width="120"
        >
          <el-input v-model="param.value" style="width: 120px;"></el-input>
          <el-button @click="addParam()">添加</el-button>
          <el-button @click.prevent="removeParam(param)">删除</el-button>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="TestCase.dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="add(TestCase.datademo.form1),TestCase.dialogFormVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "TestCase",
  computed: {
    ...mapState({
      sdkversion: state => state.sddmstore.sdkversion,
      SDKinterface: state => state.sddmstore.SDKinterface,
      methodPage: state => state.sddmstore.methodPage,
      TestCase: state => state.sddmstore.TestCase
    })
  },
  created() {
    this.$store.dispatch("sddmstore/getTableData_action_get");
  },
  mounted() {
    // this.getTableData();
  },
  methods: {
    funversion() {
      //根据选择的版本展示改版本下的所有接口名称
      let item = Object.assign(
        {},
        { key: "data.sdk_version", value: this.TestCase.sdk_version }
      );
      var param = [];
      param.push(item);
      console.log("funversion -> param", param);

      this.$store
        .dispatch("sddmstore/getSDKinterface_action_getparam", param)
        .then(res => {
          this.TestCase.version = "";
        });
    },
    funinterface() {
      //根据sdk版本和接口名查找对应的方法

      let item = Object.assign(
        {},
        { key: "data.sdk_version", value: this.TestCase.sdk_version },
        { key: "data.interface_name", value: this.TestCase.interface_name }
      );
      var params = [];
      params.push({
        key: "data.sdk_version",
        value: this.TestCase.sdk_version
      });

      this.$store
        .dispatch("sddmstore/getMethodList_search_action", params)
        .then(res => {
          this.TestCase.method_name = "";
        });

      // let form = {
      //   interface_name: this.TestCase.interface_name
      // };
      // let item = Object.assign(
      //   {},
      //   {
      //     key: "data.interFaceList.interface_name",
      //     value: this.TestCase.interface_name
      //   }
      // );
      // var param = [];
      // param.push(item);

      // this.$store
      //   .dispatch("sddmstore/getmethodPage_action_getparam", param)
      //   .then(res => {
      //     this.TestCase.method_name = "";
      //   });
    },
    funmethod() {
      let item = Object.assign(
        {},
        { key: "data.sdk_version", value: this.TestCase.sdk_version }
      );
      let param = [];
      param.push(item);

      this.$store.dispatch("sddmstore/getTestCase_action_getparam", param);
    

      //  for(let i = 0;i<this.TestCase.stockOption.length;i++){
      //   this.TestCase.list.forEach(val => {
      //     this.TestCase.list[i].stocktype=this.TestCase.stockOption[i].dictValue
      //   })

      //  }

      //   console.log("funmethod -> this.TestCase.list", this.TestCase.list);
      // });
    },
    add(param) {
      console.log("add -> param", param);

      this.TestCase.initvisable = false;
      this.TestCase.addvisable = true;
      let demo = [];

      for (let i = 0; i < param.length; i++) {
        demo.push(param[i].value);
      }

      console.log("111", demo);
      if (demo.length == 1) {
        let array1 = [];

        array1 = demo[0].split(";");

        array1.map(val => {
          for (let i = 0; i < this.TestCase.multipleSelection.length; i++) {
            this.TestCase.table1.push({
              stocktype: this.TestCase.multipleSelection[i].stocktype,
              stockcode: this.TestCase.multipleSelection[i].stockcode,
              param: val
            });
          }
        });
        this.addinfo()
      } else if (demo.length == 2) {
        let array1 = [];
        let array2 = [];
        let temp = [];
        array1 = demo[0].split(";");
        array2 = demo[1].split(";");
        for (let i = 0; i < array1.length; i++) {
          for (let j = 0; j < array2.length; j++) {
            temp.push(array1[i] + ";" + array2[j]);
          }
        }
        temp.map(val => {
          for (let i = 0; i < this.TestCase.multipleSelection.length; i++) {
            this.TestCase.table1.push({
              stocktype: this.TestCase.multipleSelection[i].stocktype,
              stockcode: this.TestCase.multipleSelection[i].stockcode,
              param: val
            });
          }
        });
        this.addinfo()
      } else if (demo.length == 3) {
        let array1 = [];
        let array2 = [];
        let array3 = [];
        let temp = [];
        array1 = demo[0].split(";");
        array2 = demo[1].split(";");
        array3 = demo[2].split(";");
        for (let i = 0; i < array1.length; i++) {
          for (let j = 0; j < array2.length; j++) {
            for (let x = 0; x < array3.length; x++) {
              temp.push(array1[i] + ";" + array2[j] + ";" + array3[x]);
            }
          }
        }
        temp.map(val => {
          for (let i = 0; i < this.TestCase.multipleSelection.length; i++) {
            this.TestCase.table1.push({
              stocktype: this.TestCase.multipleSelection[i].stocktype,
              stockcode: this.TestCase.multipleSelection[i].stockcode,
              param: val
            });
          }
        });
      } else if (demo.length == 4) {
        let array1 = [];
        let array2 = [];
        let array3 = [];
        let array4 = [];
        let temp = [];
        array1 = demo[0].split(";");
        array2 = demo[1].split(";");
        array3 = demo[2].split(";");
        array4 = demo[3].split(";");
        for (let i = 0; i < array1.length; i++) {
          for (let j = 0; j < array2.length; j++) {
            for (let x = 0; x < array3.length; x++) {
              for (let y = 0; y < array4.length; y++) {
                temp.push(
                  array1[i] +
                    ";" +
                    array2[j] +
                    ";" +
                    array3[x] +
                    ";" +
                    array4[y]
                );
              }
            }
          }
        }
        temp.map(val => {
          for (let i = 0; i < this.TestCase.multipleSelection.length; i++) {
            this.TestCase.table1.push({
              stocktype: this.TestCase.multipleSelection[i].stocktype,
              stockcode: this.TestCase.multipleSelection[i].stockcode,
              param: val
            });
          }
        });
      } else if (demo.length == 5) {
        let array1 = [];
        let array2 = [];
        let array3 = [];
        let array4 = [];
        let array5 = [];
        let temp = [];
        array1 = demo[0].split(";");
        array2 = demo[1].split(";");
        array3 = demo[2].split(";");
        array4 = demo[3].split(";");
        array5 = demo[4].split(";");
        for (let i = 0; i < array1.length; i++) {
          for (let j = 0; j < array2.length; j++) {
            for (let x = 0; x < array3.length; x++) {
              for (let y = 0; y < array4.length; y++) {
                for (let z = 0; z < array5.length; z++) {
                  temp.push(
                    array1[i] +
                      ";" +
                      array2[j] +
                      ";" +
                      array3[x] +
                      ";" +
                      array4[y] +
                      ";" +
                      array5[z]
                  );
                }
              }
            }
          }
        }
        temp.map(val => {
          for (let i = 0; i < this.TestCase.multipleSelection.length; i++) {
            this.TestCase.table1.push({
              stocktype: this.TestCase.multipleSelection[i].stocktype,
              stockcode: this.TestCase.multipleSelection[i].stockcode,
              param: val
            });
          }
        });
        
      }
    },
     //方法新增
        postInfo(form) {
          const params = Object.assign({}, this.methodPage.form,{id:this.methodPage.id},{interface_name:this.methodPage.interface_name});
          this.$store
            .dispatch("sddmstore/getaddTestCaseinfo_action", params)
            .then(res => {
              this.$message({
                type: "info",
                message: "新建成功"
              });
              this.functionSelectInterface();
            })
            // .catch(err => {
            //   this.$message({
            //     type: "warning",
            //     message: "新建失败"
            //   });
            //   console.log(err);
            // });
        },
    addinfo(){
      const params = Object.assign({},this.TestCase.form,{id:this.TestCase.id},{interface_name:this.TestCase.interface_name},
      {method_name:this.TestCase.method_name})
       this.$store
            .dispatch("sddmstore/getaddMethodinfo_action", params)
            .then(res => {
              this.$message({
                type: "info",
                message: "新建成功"
              });
             this.funmethod();
            })
    },
    handleSelectionChange(val) {
      this.TestCase.multipleSelection = val;
    },
    addParam() {
      this.TestCase.datademo.form1.push({ value: "" });
    },
    removeParam(param) {
      var index = this.TestCase.datademo.form1.indexOf(param);
      if (index !== 0) {
        this.TestCase.datademo.form1.splice(index, 1);
      }
    },
    delList(scope) {
      //---------------------删除一条列表数据
      this.$confirm("此操作将删除选中项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeInfo(scope);
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消删除"
          });
        });
    },
    //方法修改
    editinfo(scope) {
      this.TestCase.updata = Object.assign(
        {},
        {
          case_name: scope.row.case_name,
          case_name_des: scope.row.case_name_des,
          id: this.TestCase.id,
          stocktype: scope.row.stocktype,
          stockcode: scope.row.stockcode,
          param: scope.row.param
          // method_name_old: scope.row.method_name
        }
      );
      console.log(" this.TestCase.updata", this.TestCase.updata);
    },
    //修改方法
    updateClassesById(updata) {
      console.log("updateClassesById -> updata", this.TestCase.updata);

      const params = Object.assign({}, this.TestCase.updata);
      this.$store
        .dispatch("sddmstore/getTestCase_action_editinfo", params)
        .then(res => {
          this.dialogupdataVisible = false;
          this.$message.info("修改成功");
          this.funmethod();
        })
        .catch(err => {
          console.log(err);
          this.$message.error("修改失败");
        });
    },
  
  addcaseInfo(){
  
      if(this.TestCase.method_name!=''){
        this.TestCase.dialogFormVisible = true
          this.getDicts("sys_stocktype").then(res => {
        this.TestCase.table = res.data;
         console.log("funmethod -> this.TestCase.stockOption", this.TestCase.table)
        })
      }else{
         this.$message({
          type: "warning",
          message: "请先选择范围"
        });
      }
       
  },
  deldata(scope) {
    //---------------------删除一条列表数据
    this.$confirm("此操作将删除选中项, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.removeInfo(scope);
      })
      .catch(() => {
        this.$message({
          type: "warning",
          message: "已取消删除"
        });
      });
  },
  removeInfo(scope) {
    const params = {
      id: scope.row.id
    };

    removeInfoById(params)
      .then(res => {
        this.getTableData();
        this.$message({
          type: "info",
          message: "删除成功"
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  //     //条件搜索
  //     handleSearch() {
  //       this.pagination.current = 1;
  //       this.getTableData();
  //     },
  //     //重置搜索条件
  //     resetForm(formName) {
  //       this.$refs[formName].resetFields();
  //     },
  //     //设置分页大小
  //     handlePageSizeChange(pageSize) {
  //       this.pagination.pageSize = pageSize;
  //       this.getTableData();
  //     },
  //     //设置页码
  //     handleCurrentChange(current) {
  //       this.pagination.current = current;
  //       this.getTableData();
  //     },
  //     handleCloseAddDialog() {
  //       this.classFrom = Object.assign({}, this.defaultClassFrom);
  //       this.$refs.addClassForm.resetFields();
  //       this.$refs.createClass.close();
  //     },
  //     handleCloseEditDialog() {
  //       this.editFrom = Object.assign({}, this.defaultClassFrom);
  //       this.$refs.editClassForm.resetFields();
  //       this.$refs.editClass.close();
  //     },
  //     editClass(scope) {
  //       //---------------------编辑操作
  //       this.dialogEditClass = true;
  //       this.editFrom = Object.assign(
  //         {},
  //         {
  //           className: scope.row.className,
  //           gradge: scope.row.gradge,
  //           masterName: scope.row.masterName,
  //           message: scope.row.message,
  //           id: scope.row.id
  //         }
  //       );
  //     },
  //      delStu(scope){                            //---------------------删除学生
  //     this.$confirm('此操作将删除选中项, 是否继续?', '提示', {
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消',
  //       type: 'warning'
  //     }).then(() => {
  //       this.removeStudent(scope);
  //     }).catch(() => {
  //       this.$message({
  //         type: 'warning',
  //         message: '已取消删除'
  //       });
  //     });
  //   },
  //    handleCloseAddStuDialog(){
  //     this.stuFrom =  Object.assign({}, this.defaultstuFrom);
  //     this.$refs.addStuForm.resetFields();
  //     this.$refs.createStudent.close();
  //   },
  }
};
</script>
<style>
</style>