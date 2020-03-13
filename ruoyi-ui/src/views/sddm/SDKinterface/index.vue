<template>
  <div style="padding: 20px;">
    <span>sdk版本:</span>
    <el-select v-model="SDKinterface.version" @change="function2" >
      <el-option
        v-for="item in SDKinterface.options"
        :key="item.sdk_version"
        :label="item.sdk_version"
        :value="item.sdk_version"
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
              <el-button type="primary" @click="addInterface()">新增接口</el-button>
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
          <el-table-column label="接口描述" prop="interface_name_des" width="150"></el-table-column>
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
            v-model="SDKinterface.form.interface_name_des"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="SDKinterface.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postInfo(SDKinterface.form),SDKinterface.dialogFormVisible = false">确 定</el-button>
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
            v-model="SDKinterface.updata.interface_name_des"
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
  },
  methods: {
    //根据所选SDK版本查找对应接口数据
    function2() {
      let item = Object.assign(
        {},
        { key: "data.sdk_version", value: this.SDKinterface.version }
      );
      var param = [];
      param.push(item);

      this.$store.dispatch("sddmstore/getSDKinterface_action_getparam", param);
    },

    //所选sdk版本下接口的新增
    postInfo(form) {
      const params = Object.assign({}, this.SDKinterface.form,{id:this.SDKinterface.id});
      this.$store
        .dispatch("sddmstore/getSDKinterface_action_addinfo", params)
        .then(res => {
          this.$message({
            type: "info",
            message: "新建成功"
          });
          this.function2();
        })
        .catch(err => {
          this.$message({
            type: "warning",
            message: "新建失败"
          });
          console.log(err);
        });
    },

    //接口更新
    updateInfoById(updata) {
      const params = Object.assign({}, this.SDKinterface.updata,{id:this.SDKinterface.id});
      this.$store.dispatch("sddmstore/getSDKinterface_action_editinfo", params)
        .then(res => {
          this.dialogEditClass = false;
          this.$message.info("修改成功");
          this.function2();
        })
        .catch(err => {
          console.log(err);
          this.$message.error("修改失败");
        });
    },

    //删除接口

    delInfo(scope) {
      alert(this.SDKinterface.id)
      alert(scope.row.interface_name)
      // const params = Object.assign({}, this.SDKinterface.updata,{id:this.SDKinterface.id});
      // this.$store.dispatch("sddmstore/getSDKinterface_action_editinfo", params)
      //   .then(res => {
      //     this.dialogEditClass = false;
      //     this.$message.info("修改成功");
      //     this.function2();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     this.$message.error("修改失败");
      //   });
    },
    //新增dialog弹窗控制以及赋空值
    addInterface(){
          this.SDKinterface.dialogFormVisible = true;
          this.SDKinterface.form = Object.assign({
          interface_name: '',
          interface_name_des: '',
          });
    },   
    //修改dialog弹窗控制以及初值设置
    editInfo(scope) {
      this.SDKinterface.dialogEditClass = true;
      this.SDKinterface.updata = Object.assign(
        {},
        {
          interface_name: scope.row.interface_name,
          interface_name_des: scope.row.interface_name_des,
          id: scope.row.id,
          interface_name1:scope.row.interface_name,
        }
      );
    },
    //条件搜索
    handleSearch() {
      this.SDKinterface.pagination.current = 1;
      this.getTableData();
    },
    //重置搜索条件
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    
    
    
  }
};
</script>
<style>
</style>
