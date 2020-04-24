<template>
<div class="app-container">
  <div style="padding: 20px;">
    <el-row>
    <el-col :span='6'>
      <div>版本：
    <el-select v-model="methodPage.sdk_version" placeholder="请选择SDK版本" @change="functionSelectInterface">
       <el-option
              v-for="item in methodPage.options1"
              :key="item.sdk_version"
              :label="item.sdk_version"
              :value="item.sdk_version"
            ></el-option>
    </el-select>
    </div>
    </el-col>
    <el-col :span='6'>
      <div>接口：
    <el-select v-model="methodPage.interface_name" placeholder="请选择接口" @change="functionSelectMethod">
       <el-option
              v-for="item in methodPage.options2"
              :key="item.interface_name"
              :label="item.interface_name"
              :value="item.interface_name"
            ></el-option>
    </el-select>
    </div>
    </el-col>
    </el-row>

  <!--  //查询-->
  <el-collapse v-model='activeCollapse'>
    <el-collapse-item title='查询条件' name='search'>
      <el-form  :model='methodPage.filter' label-width='100px' label-position=‘left’>
        <el-row>
          <el-col :span='6'>
            <el-form-item label='方法名' prop='method_name'>
              <el-input v-model='methodPage.filter.method_name' :clearable='true'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='6' style="marginLeft:20px;">
            <el-button @click='handleSearch(methodPage.filter.method_name)' type='primary'>查询</el-button>
            <el-button @click='resetForm("searchCondition")'>重置</el-button>
          </el-col>
          <el-col :span='2' style='margin: 0px 0 10px 0;' type='flex' justify='end'>
            <el-button type="primary" @click='methodPage.dialogaddMethodVisible=true'>新增方法</el-button>
          </el-col>
        </el-row>
      </el-form>
      </el-collapse-item>
  </el-collapse>
  
<!-- 列表 -->
    <div>
      <div style='margin-bottom: 20px'>
        <el-table :data='methodPage.list' width='100%' border>
          <el-table-column type='index' width='65' label="序号"></el-table-column>
          <el-table-column label='方法名称' prop='method_name' width='250%'></el-table-column>
          <el-table-column label='方法描述' prop='method_des' width='350%'></el-table-column>
          <el-table-column label='操作' prop='operate'>
            <template scope="scope">
              <el-button @click="delInfo(scope)" type="primary" size="primary">删除</el-button>
              <el-button type="primary" @click="editInfo(scope)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-row type='flex' justify='end'>
        <el-pagination
          @size-change='handlePageSizeChange'
          @current-change='handleCurrentChange'
          :current-page='methodPage.pagination.current'
          :page-sizes='[10, 20, 50, 100]'
          :page-size='methodPage.pagination.pageSize'
          :total='methodPage.pagination.total'
          layout='prev,pager,next,jumper,total,sizes'
        ></el-pagination>
      </el-row>
    </div>
<!-- 新增 -->
   
    <el-dialog title="新增方法" :visible.sync="methodPage.dialogaddMethodVisible">
      <el-form :model="methodPage.form">
        <el-form-item label="方法名称" :label-width="formLabelWidth" prop='sdk_itrative_version'>
          <el-input v-model="methodPage.form.method_name" ></el-input>
        </el-form-item>
        <el-form-item label="方法描述" :label-width="formLabelWidth" prop='sdk_version_number'>
          <el-input v-model="methodPage.form.method_des" auto-complete="off"></el-input>
        </el-form-item>        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="methodPage.dialogaddMethodVisible = false">取 消</el-button>
        <el-button type="primary" @click="postInfo(methodPage.form),methodPage.dialogaddMethodVisible = false">确 定</el-button>
      </div>
    </el-dialog>
<!-- 修改 -->
    <el-dialog title="修改方法信息" :visible.sync="methodPage.dialogupdataMethodVisible">
      <el-form :model="methodPage.updata">
        <el-form-item label="方法名称" :label-width="formLabelWidth">
          <el-input v-model="methodPage.updata.method_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="方法描述" :label-width="formLabelWidth">
          <el-input v-model="methodPage.updata.method_des" auto-complete="off"></el-input>
        </el-form-item>        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="methodPage.dialogupdataMethodVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateInfoById(updata),methodPage.dialogupdataMethodVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</div>
</template>
<script>
import {mapState} from 'vuex'
  export default {
    name: 'method',
    computed: {
      ...mapState({
        SDKinformation: state=> state.sddmstore.SDKinformation,
        methodPage: state=> state.sddmstore.methodPage,
      })
    },
    created(){
      this.$store.dispatch("sddmstore/getTableData_action_get")
        //alert(this.sdkversion);
    },
    methods: {
      //根据sdk版本和接口名查找对应的方法
      functionSelectMethod(){
          let item = Object.assign({}, {key:"data.sdk_version",value:this.methodPage.sdk_version},
          {key:"data.interface_name",value:this.methodPage.interface_name});
          var params=[];
          params.push({key:"data.sdk_version",value:this.methodPage.sdk_version});
          console.log(params)
          this.$store.dispatch("sddmstore/getMethodList_search_action",params)
         
        },
        //方法修改
        editInfo(scope){
          this.methodPage.dialogupdataMethodVisible = true
          this.methodPage.updata = Object.assign({}, {
            method_name: scope.row.method_name,
            method_des: scope.row.method_des,
            id:this.methodPage.id,
            method_name_old: scope.row.method_name,
          });
        },
        
        //根据选择的版本展示改版本下的所有接口名称
        functionSelectInterface() {
          let item = Object.assign({}, {key:"data.sdk_version",value:this.methodPage.sdk_version});
              var param=[];
              param.push(item);
          this.methodPage.optionInterface = [];
          this.$store.dispatch("sddmstore/getSDKinterface_action_getparam",param)
          .then(res=>{
           this.methodPage.interface_name='';
          })

        },
        //方法新增
        postInfo(form) {
          const params = Object.assign({}, this.methodPage.form,{id:this.methodPage.id},{interface_name:this.methodPage.interface_name});
          this.$store
            .dispatch("sddmstore/getaddMethodinfo_action", params)
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
        //修改方法
        updateInfoById(updata) {
          const params = Object.assign({}, this.methodPage.updata);
          this.$store.dispatch("sddmstore/getMethod_action_editinfo", params)
            .then(res => {
              this.dialogEditClass = false;
              this.$message.info("修改成功");
              this.functionSelectInterface();
            })
            .catch(err => {
              console.log(err);
              this.$message.error("修改失败");
            });
        },
  
    },
    // 监听
    // watch:{
    //   'sdkversion.formlist.sdk_itrative_version': function(oldval,newval){
    //     alert(newval,oldval)
    //   }
    // }

  
  }


</script>
<style>
</style>