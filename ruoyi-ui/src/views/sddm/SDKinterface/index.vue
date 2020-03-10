<template>
  <div style="padding: 20px;">
    <span>sdk版本:</span>
    <el-select v-model="SDKinterface.version" @change="function2" >
      <el-option
        v-for="item in SDKinterface.options"
        :key="item.sdk_version_number"
        :label="item.sdk_version_number"
        :value="item.sdk_version_number"
      ></el-option>     
    </el-select> 
    <!--  //查询-->
    <el-collapse v-model="SDKinterface.activeCollapse">
      <el-collapse-item title="查询条件" name="search">
        <el-form
          ref="searchCondition"
          :model="SDKinterface.filter"
          label-width="100px"
          label-position="‘left’"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="SDK接口" prop="interfaceName">
                <el-input v-model="SDKinterface.filter.interfaceName" :clearable="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="marginLeft:20px;">
              <el-button @click="handleSearch" type="primary">查询</el-button>
              <el-button @click='resetForm("searchCondition")'>重置</el-button>
            </el-col>
            <el-col :span="2" style="margin: 0px 0 10px 0;" type="flex" justify="end">
              <el-button type="primary" @click="SDKinterface.dialogFormVisible = true">新增接口</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <!--列表-->
    <div>
      <div style="margin-bottom: 20px">
        <el-table :data="SDKinterface.data" width="100%" border>
          <el-table-column type="index" width="65" label="序号"></el-table-column>
          <el-table-column label="接口名称" prop="interface_name" width="150"></el-table-column>
          <el-table-column label="接口描述" prop="interface_describe" width="150"></el-table-column>
          <el-table-column label="操作" prop="operate">
            <template scope="scope">
              <el-button @click="delInfo(scope)" type="primary" size="primary">删除</el-button>
              <el-button
                type="primary"
                @click="editInfo(scope),SDKinterface.dialogupdataVisible = true"
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!--    新增-->
    <el-dialog title="新增SDK接口" :visible.sync="SDKinterface.dialogFormVisible">
      <el-form :model="SDKinterface.form">
        <el-form-item label="接口名称" :label-width="formLabelWidth">
          <el-input v-model="SDKinterface.form.interface_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="接口描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="SDKinterface.form.interface_describe"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="SDKinterface.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postInfo(form),SDKinterface.dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--    修改-->
    <el-dialog title="修改" :visible.sync="SDKinterface.dialogupdataVisible">
      <el-form :model="SDKinterface.updata">
        <el-form-item label="接口名称" :label-width="SDKinterface.formLabelWidth">
          <el-input v-model="SDKinterface.updata.interface_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="接口描述" :label-width="SDKinterface.formLabelWidth">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="SDKinterface.updata.interface_describe"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="SDKinterface.dialogupdataVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateInfoById(updata),SDKinterface.dialogupdataVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "sdkinterface",
  computed: {
    ...mapState({
      SDKinterface: state => state.sddmstore.SDKinterface
    })
  },
  created() {
    this.$store.dispatch("sddmstore/getTableData_action_get");
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    function2() {
      let form = {
        sdk_version_number: this.SDKinterface.version
      };
      let item = Object.assign(
        {},
        { key: "data.sdk_version_number", value: this.SDKinterface.version }
      );
      var param = [];
      param.push(item);

      this.$store.dispatch("sddmstore/getSDKinterface_action_getparam", param);
    },
    getTableData() {
      //---------------------获取列表数据
      console.log("demo", this.SDKinterface.form.domains);
      let para = {
        pageNum: this.SDKinterface.pagination.current,
        pageSize: this.SDKinterface.pagination.pageSize,
        ...this.filter
      };
      console.log(para);
      this.$store.dispatch("sddmstore/getSDKinterface_action_get");
    },
    postInfo(form) {
      //---------------------提交新建表单
      const params = Object.assign({}, this.SDKinterface.form);
      this.$store
        .dispatch("sddmstore/getSDKinterface_action_addinfo", params)
        .then(res => {
          this.$message({
            type: "info",
            message: "新建成功"
          });
          this.getTableData();
        })
        .catch(err => {
          this.$message({
            type: "warning",
            message: "新建失败"
          });
          console.log(err);
        });
    },
    removeInfo(scope) {
      const params = {
        id: scope.row.id
      };

      this.$store
        .dispatch("sddmstore/getSDKinterface_action_remove", params.id)
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
    },
    updateInfoById(updata) {
      console.log("updata", this.SDKinterface.updata); //---------------------上传修改
      let params = Object.assign({}, this.SDKinterface.updata);
      console.log("11", params);
      this.$store.dispatch("sddmstore/getSDKinterface_action_addinfo", params);
      this.$store
        .dispatch("sddmstore/getSDKinterface_action_remove", params.id)
        .then(res => {
          this.dialogEditClass = false;
          this.getTableData();
          this.$message.info("修改成功");
        })
        .catch(err => {
          console.log(err);
          this.$message.error("修改失败");
        });
    },
    delInfo(scope) {
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
    editInfo(scope) {
      //---------------------编辑操作
      this.SDKinterface.dialogEditClass = true;
      this.SDKinterface.updata = Object.assign(
        {},
        {
          interface_name: scope.row.data.interface_name,
          interface_describe: scope.row.data.interface_describe,
          compare_method: scope.row.data.compare_method,
          upload_version: scope.row.data.upload_version,
          update_version: scope.row.data.update_version,
          domains: scope.row.data.domains,
          domains2: scope.row.data.domains2,
          id: scope.row.id
        }
      );
    },
    removeDomain(item) {
      var index = this.SDKinterface.form.domains.indexOf(item);
      if (index !== 0) {
        this.SDKinterface.form.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.SDKinterface.form.domains.push({
        value: ""
      });
    },
    removeDomain2(item) {
      var index = this.SDKinterface.form.domains2.indexOf(item);
      if (index !== 0) {
        this.SDKinterface.form.domains2.splice(index, 1);
      }
    },
    addDomain2() {
      this.SDKinterface.form.domains2.push({
        value: ""
      });
    },

    removeDomain_updata(item) {
      var index = this.SDKinterface.updata.domains.indexOf(item);
      if (index !== 0) {
        this.SDKinterface.updata.domains.splice(index, 1);
      }
    },
    addDomain_updata() {
      this.SDKinterface.updata.domains.push({
        value: ""
      });
    },
    removeDomain2_updata(item) {
      var index = this.SDKinterface.updata.domains2.indexOf(item);
      if (index !== 0) {
        this.SDKinterface.updata.domains2.splice(index, 1);
      }
    },
    addDomain2_updata() {
      this.SDKinterface.updata.domains2.push({
        value: ""
      });
    },

    //---------------------------------------------------------------------------------

    //条件搜索
    handleSearch() {
      this.SDKinterface.pagination.current = 1;
      this.getTableData();
    },
    //重置搜索条件
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //设置分页大小
    handlePageSizeChange(pageSize) {
      this.SDKinterface.pagination.pageSize = pageSize;
      this.getTableData();
    },
    //设置页码
    handleCurrentChange(current) {
      this.SDKinterface.pagination.current = current;
      this.getTableData();
    },
    handleCloseAddDialog() {
      this.classFrom = Object.assign({}, this.defaultClassFrom);
      this.$refs.addClassForm.resetFields();
      this.$refs.createClass.close();
    },
    handleCloseEditDialog() {
      this.editFrom = Object.assign({}, this.defaultClassFrom);
      this.$refs.editClassForm.resetFields();
      this.$refs.editClass.close();
    },
    handleSave() {
      //---------------------提交新建表单
      this.$refs.addClassForm.validate(valid => {
        if (valid) {
          const params = Object.assign({}, this.classFrom);
          addClasses(params)
            .then(res => {
              this.$message({
                type: "info",
                message: "新建成功"
              });
              this.$refs.createClass.close();
              this.classFrom = Object.assign({}, this.defaultClassFrom);
              this.$refs.addClassForm.resetFields();
              this.getTableData();
            })
            .catch(err => {
              this.$message({
                type: "warning",
                message: "新建失败"
              });
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editClass(scope) {
      //---------------------编辑操作
      this.SDKinterface.dialogEditClass = true;
      this.editFrom = Object.assign(
        {},
        {
          className: scope.row.className,
          gradge: scope.row.gradge,
          masterName: scope.row.masterName,
          message: scope.row.message,
          id: scope.row.id
        }
      );
    },
    udpateClassesById() {
      console.log(this.classData);
      let params = Object.assign({}, this.editFrom);

      console.log(params);

      updateClasses(params)
        .then(res => {
          console.log(res);
          this.SDKinterface.dialogEditClass = false;
          this.getTableData();
          this.$message.info("修改班级信息成功");
        })
        .catch(err => {
          console.log(err);
          this.$message.error("修改班级信息失败");
        });
    },
    delStu(scope) {
      //---------------------删除学生
      this.$confirm("此操作将删除选中项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.removeStudent(scope);
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消删除"
          });
        });
    },
    removeStudent(scope) {
      const params = {
        id: scope.row.id
      };
      console.log(scope);
      removeStudentById(params)
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
    },

    handleCloseAddStuDialog() {
      this.stuFrom = Object.assign({}, this.defaultstuFrom);
      this.$refs.addStuForm.resetFields();
      this.$refs.createStudent.close();
    },
    addStudent(scope) {
      this.SDKinterface.dialogCreateStu = true;
      this.stuFrom.classesId = scope.row.id;
      console.log("------------------" + this.stuFrom.classesId);
    },
    handleSaveStu() {
      this.$refs.addStuForm.validate(valid => {
        if (valid) {
          const params = Object.assign({}, this.stuFrom);
          addStudent(params)
            .then(res => {
              this.$message({
                type: "info",
                message: "新建成功"
              });
              this.$refs.createStudent.close();
              this.stuFrom = Object.assign({}, this.defaultstuFrom);
              this.$refs.addStuForm.resetFields();
            })
            .catch(err => {
              this.$message({
                type: "warning",
                message: "新建失败"
              });
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style>
</style>
