<template>
  <div style="padding: 20px;">
  <!--  //查询-->
  <el-collapse v-model='activeCollapse'>
    <el-collapse-item title='查询条件' name='search'>
      <el-form ref='searchCondition' :model='sdkversion.filter' label-width='100px' label-position=‘left’>
        <el-row>
          <el-col :span='6'>
            <el-form-item label='SDK版本号' prop='versionName'>
              <el-input v-model='sdkversion.filter.versionName' :clearable='true'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='6' style="marginLeft:20px;">
            <el-button @click='handleSearch(sdkversion.filter.versionName)' type='primary'>查询</el-button>
            <el-button @click='resetForm("searchCondition")'>重置</el-button>
          </el-col>
          <el-col :span='2' style='margin: 0px 0 10px 0;' type='flex' justify='end'>
            <el-button type="primary" @click='addClass()'>新增版本</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-collapse-item>
  </el-collapse>
<!-- 列表 -->
    <div>

      <div style='margin-bottom: 20px'>
        <el-table :data='sdkversion.formlist' width='100%' border>
          <el-table-column type='index' width='65' label="序号"></el-table-column>
          <el-table-column label='迭代版本' prop='data.sdk_itrative_version' width='150'></el-table-column>
          <el-table-column label='SDK版本号' prop='data.sdk_version_number' width='150'></el-table-column>
          <el-table-column label='所属平台' prop='data.platform' width='150'></el-table-column>
          <el-table-column label='上传时间' prop='data.upload_time' width='150'></el-table-column>
          <el-table-column label='操作' prop='operate'>
            <template scope="scope">
              <el-button @click="delInfo(scope)" type="primary" size="primary">删除</el-button>
              <el-button type="primary" @click="editInfo(scope),sdkversion.dialogupdataVisible = true">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-row type='flex' justify='end'>
        <el-pagination
          @size-change='handlePageSizeChange'
          @current-change='handleCurrentChange'
          :current-page='sdkversion.pagination.current'
          :page-sizes='[10, 20, 50, 100]'
          :page-size='sdkversion.pagination.pageSize'
          :total='sdkversion.pagination.total'
          layout='prev,pager,next,jumper,total,sizes'
        ></el-pagination>
      </el-row>
    </div>
   <!-- 新增 -->
   
    <el-dialog title="新增版本" :visible.sync="sdkversion.dialogFormVisible">
      <el-form :model="sdkversion.form">
        <el-form-item label="迭代版本" :label-width="formLabelWidth" prop='sdk_itrative_version'>
          <el-input v-model="sdkversion.form.sdk_itrative_version" ></el-input>
        </el-form-item>
        <el-form-item label="版本号" :label-width="formLabelWidth" prop='sdk_version_number'>
          <el-input v-model="sdkversion.form.sdk_version_number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属平台" :label-width="formLabelWidth" prop='platform'>
          <el-select v-model="sdkversion.form.platform" placeholder="请选择所属平台">
            <el-option label="Android" value="android"></el-option>
            <el-option label="IOS" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件上传" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip"></div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sdkversion.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postInfo(sdkversion.form),sdkversion.dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
<!--    修改-->
    <el-dialog title="修改版本信息" :visible.sync="sdkversion.dialogupdataVisible">
      <el-form :model="sdkversion.updata">
        <el-form-item label="迭代版本" :label-width="formLabelWidth">
          <el-input v-model="sdkversion.updata.sdk_itrative_version" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="版本号" :label-width="formLabelWidth">
          <el-input v-model="sdkversion.updata.sdk_version_number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属平台" :label-width="formLabelWidth">
          <el-select v-model="sdkversion.updata.platform" placeholder="请选择所属平台">
            <el-option label="Android" value="android"></el-option>
            <el-option label="IOS" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件上传" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip"></div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sdkversion.dialogupdataVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateInfoById(updata),sdkversion.dialogupdataVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapState} from 'vuex'
  export default {
    name: 'sdkversion',
    computed: {
      ...mapState({
        sdkversion: state=> state.sddmstore.sdkversion,
      })
    },
    created(){
        //alert(this.sdkversion);
        console.log(this.sdkversion)
        this.getTableData();
    },
    methods: {
        addClass(){ 
            this.sdkversion.dialogFormVisible = true;
            // this.sdkversion.form = Object.assign({
            // sdk_version_number: '',
            // sdk_itrative_version: '',
            // platform: '',
            // updateTime: ''
            // });
        },
        getTableData(){                           //---------------------获取列表数据
            let para = {
            pageNum: this.sdkversion.pagination.current,
            pageSize: this.sdkversion.pagination.pageSize,
            //...this.filter
            };
            this.$store.dispatch("sddmstore/getTableData_action_get")
        },
        handleSearch(f) {
          this.sdkversion.pagination.current = 1;
          alert(1)          
          this.getTableData_filter();
          
        },

        getTableData_filter(){                           //---------------------查询获取列表数据
          let para = {
            pageNum: this.sdkversion.pagination.current,
            pageSize: this.sdkversion.pagination.pageSize,
            //...this.filter
          };
          alert(2)
          let item = Object.assign({}, {key:"data.sdk_version_number",value:this.sdkversion.filter.versionName});
          var params=[];
          params.push(item);
          this.$store.dispatch("sddmstore/getList_search_action",params)
          
        },
        delInfo(scope){      
          console.log(scope)                   //---------------------删除一条列表数据
          this.$confirm('此操作将删除选中项, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch("sddmstore/sdkversion_delete_action",scope.row.id);
          
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: '已取消删除'
            });
          });
        },
        //新增方法
        postInfo(f) {                                //---------------------提交新建表单
          const params = Object.assign({}, this.sdkversion.form)
          console.log(params)
          this.$store.dispatch("sddmstore/sdkversion_addInfo_action",params)
          .then((res) => {
            this.$message({
              type: 'info',
              message: '新建成功'
            });
            this.getTableData();
          }).catch((err) => {
            this.$message({
              type: 'warning',
              message: '新建失败'
            });
            console.log(err);
          });
        },
        //sdk版本修改
        editInfo(scope){
          this.updata = Object.assign({}, {
            sdk_version_number: scope.row.data.sdk_version_number,
            sdk_itrative_version: scope.row.data.sdk_itrative_version,
            platform: scope.row.data.platform,
            id:scope.row.id
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