<template>
  <div style="padding: 20px;">
    <!--  //查询-->
    <el-collapse v-model="stockTypeCode.activeCollapse">
      <el-collapse-item title="查询条件" name="search">
        <el-form
          ref="searchCondition"
          :model="stockTypeCode.filter"
          label-width="100px"
          label-position="‘left’"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="分类代码" prop="stockTypeCode.filter.versionName">
                <el-input v-model="stockTypeCode.filter.versionName" :clearable="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="marginLeft:20px;">
              <el-button @click="handleSearch" type="primary">查询</el-button>
              <el-button @click="resetForm('searchCondition')">重置</el-button>
            </el-col>
            <el-col :span="2" style="margin: 0px 0 10px 0;" type="flex" justify="end">
              <el-button type="primary" @click="stockTypeCode.dialogFormVisible = true">新增</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <!--列表-->
    <div>
      <div style="margin-bottom: 20px">
        <el-table :data="stockTypeCode.studentData" width="100%" border>
          <el-table-column type="index" width="65" label="序号"></el-table-column>
          <el-table-column label="分类代码" prop="data.value1" width="150"></el-table-column>
          <el-table-column label="分类名称" prop="data.value2" width="150"></el-table-column>
          <el-table-column label="包含股票" prop="data.value3" width="150"></el-table-column>
          <el-table-column label="操作" prop="operate">
            <template scope="scope">
              <el-button @click="delStu(scope)" type="primary" size="primary">删除</el-button>
              <el-button
                type="primary"
                @click="editClass(scope),stockTypeCode.dialogupdataVisible = true"
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-row type="flex" justify="end">
        <el-pagination
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentChange"
          :current-page="stockTypeCode.pagination.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="stockTypeCode.pagination.pageSize"
          :total="stockTypeCode.pagination.total"
          layout="prev,pager,next,jumper,total,sizes"
        ></el-pagination>
      </el-row>
    </div>
    <!--    新增-->
    <el-dialog title="新增" :visible.sync="stockTypeCode.dialogFormVisible">
      <el-form :model="stockTypeCode.form">
        <el-form-item v-for="(domain, index) in stockTypeCode.form.domains" :key="domain.key">
          <label>股票类型</label>
          <el-input v-model="stockTypeCode.form.value1" style="width: 100px;"></el-input>
          <label>类型名称</label>
          <el-input v-model="stockTypeCode.form.value2" style="width: 100px;"></el-input>
          <label>包含股票</label>
          <el-input v-model="stockTypeCode.form.value3" style="width: 140px;"></el-input>
          <el-button @click="addDomain">添加</el-button>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="stockTypeCode.dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="postInfo(form),stockTypeCode.dialogFormVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!--    修改-->
    <el-dialog title="修改" :visible.sync="stockTypeCode.dialogupdataVisible">
      <el-form :model="stockTypeCode.updata">
        <el-form-item v-for="(domain, index) in stockTypeCode.form.domains" :key="domain.key">
          <label>股票类型</label>
          <el-input v-model="stockTypeCode.updata.value1" style="width: 100px;"></el-input>
          <label>类型名称</label>
          <el-input v-model="stockTypeCode.updata.value2" style="width: 100px;"></el-input>
          <label>包含股票</label>
          <el-input v-model="stockTypeCode.updata.value3" style="width: 140px;"></el-input>
          <el-button @click="addDomain">添加</el-button>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="stockTypeCode.dialogupdataVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateClassesById(updata),stockTypeCode.dialogupdataVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name:'stocktypecode',
  computed: {
    ...mapState({
      stockTypeCode: state => state.sddmstore.stockTypeCode
    })
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      //---------------------获取列表数据
      let para = {
        pageNum: this.stockTypeCode.pagination.current,
        pageSize: this.stockTypeCode.pagination.pageSize,
        ...this.stockTypeCode.filter
      };

      this.$store.dispatch("sddmstore/getstocktypecode_action_get");
    },

    updateClassesById(updata) {
      let params = Object.assign({}, this.stockTypeCode.updata);

      this.$store.dispatch(
        "sddmstore/getstocktypecode_action_delete",params.id)
      this.$store
        .dispatch("sddmstore/getstocktypecode_action_post", this.stockTypeCode.updata)
        .then(res => {         
          this.stockTypeCode.dialogEditClass = false;
          this.getTableData();
          this.$message.info("修改成功");
        })
        .catch(err => {
          console.log(err);
          this.$message.error("修改失败");
        });
    },
     postInfo(form){
       
    this.$store.dispatch('sddmstore/getstocktypecode_action_post', this.stockTypeCode.form)
    .then((res)=> {
      this.$message({
        type: 'info',
        message: '新建成功'
      });
    
      this.getTableData();
    }, function (response) {
      this.$message({
        type: 'warning',
        message: '新建失败'
      });
      console.log(err);
    })
  },
    removeStudent(scope){
    const params = {
      id: scope.row.id
    };  
        
    this.$store.dispatch("sddmstore/getstocktypecode_action_delete",params.id)
    .then((res) => {
      alert(11)
      this.getTableData();
      this.$message({
        type: 'info',
        message: '删除成功'
      });
    }).catch((err) => {
      console.log(err);
    })
  },
    handleSearch() {
      this.stockTypeCode.pagination.current = 1;
      this.getTableData();
    },
    //重置搜索条件
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //设置分页大小
    handlePageSizeChange(pageSize) {
      this.stockTypeCode.pagination.pageSize = pageSize;
      this.getTableData();
    },
    //设置页码
    handleCurrentChange(current) {
      this.stockTypeCode.pagination.current = current;
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
      //---------------------编辑操作---------------------------
      this.dialogEditClass = true;
      this.stockTypeCode.updata = Object.assign(
        {},
        {
         
          value1: scope.row.data.value1,
          value2: scope.row.data.value2,
          value3: scope.row.data.value3,
          id: scope.row.id
        }
      );
    },
    delStu(scope) {
      //---------------------删除
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
    handleCloseAddStuDialog() {
      this.stuFrom = Object.assign({}, this.defaultstuFrom);
      this.$refs.addStuForm.resetFields();
      this.$refs.createStudent.close();
    },
    addStudent(scope) {
      this.dialogCreateStu = true;
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
    },
    removeDomain(item) {
      var index = this.stockTypeCode.form.domains.indexOf(item);
      if (index != 0) {
        this.stockTypeCode.form.domains.splice(index, 1);
      }
    },
    addDomain() {
      
      this.stockTypeCode.form.domains.push({
        value1: "",
        value2: "",
        value3: ""
      });
    },
    addClass() {
      //---------------------编辑操作
      //this.dialogFormClass = true;
      this.form = Object.assign(
        {},
        {
          stock_type: "",
          stock_id: ""
        }
      );
    }
  }
};
</script>
<style>
</style>
