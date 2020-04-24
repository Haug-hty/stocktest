<template>
  <el-container>
    <el-main>
      <el-form label-width="100px">
        <el-form-item label="测试报告:" label-width="500px" style="font-weight: bold;">{{testreport.planName}}
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划类型:">
              <u v-if="testreport.planType === '1'">同数据源不同版本对比</u>
              <u v-if="testreport.planType === '2'">同版本不同数据源对比</u>
              <u v-if="testreport.planType === '3'">不同版本不同数据源对比</u>
              <u v-if="testreport.planType === '4'">竞品数据对比</u>
            </el-form-item>
            <el-form-item label="SDK版本:">
              <u>{{testreport.sdkVersion}}</u>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运行环境:">
              <u>{{testreport.environment}}</u>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="测试接口通过率:" label-width="145px"></el-form-item>
            <pie :data="interfacePassRatePie" style="width:50%" :key="interfacePassRatePie.value"></pie>
             <el-form-item label="测试方法通过率:" label-width="145px"></el-form-item>
            <pie :data="methodPassRatePie" style="width:50%" :key="methodPassRatePie.value"></pie>
            <el-form-item label="测试用例通过率:" label-width="145px"></el-form-item>
            <pie :data="testcasePassRatePie " style="width:50%" :key="testcasePassRatePie.value"></pie>
             
          </el-col>
          <el-col :span="12">
            <el-form-item label="测试接口覆盖率:" label-width="145px"></el-form-item>
            <pie :data="interfaceCoverRatePie " style="width:50%" :key="interfaceCoverRatePie.value"></pie>
             <el-form-item label="测试方法覆盖率:" label-width="145px"></el-form-item>
            <pie :data="methodCoverRatePie " style="width:50%" :key="methodCoverRatePie.value"></pie>
            <el-form-item label="测试用例覆盖率:" label-width="145px"></el-form-item>
            <pie :data="testcaseCoverRatePie " style="width:50%" :key="testcaseCoverRatePie.value"></pie>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="缺陷分布情况:" label-width="145px" v-if="testreport.interfaceErrorMap"></el-form-item>
            <bar :xAxisData="interfaceBar" style="width:auto" :key="interfaceBar.xAx"></bar>
        </el-row>
        <el-row style="font-weight: bold; position: relative; margin-bottom: 6px">缺陷列表</el-row>
        <el-table :data="testreport.bugList" width="100%" border stripe max-height="300" :flag=false>
          <el-table-column prop="testcaseID" label="方法名"></el-table-column>
          <el-table-column prop="paramStr" label="用例参数"></el-table-column>
          <el-table-column prop="bugDescribe" label="BUG描述"></el-table-column>
        </el-table>
      </el-form>
    </el-main>
  </el-container>
</template>

<script type="text/javascript">
  import pie from "./pie.vue";
  import bar from "./bar.vue";
  import { mapState, mapActions } from "vuex";
  export default {
    name: "testReport",
    components: { pie, bar },
    computed: {
      ...mapState({
        testreport: state => state.sddmstore.testReport
      })
    },
    props: {

    },
    data() {
      return {
        plannamevalue: this.$route.params.plannamevalue,
        planname: '',
        interfacePassRatePie:{},
        interfaceCoverRatePie:{},
        methodPassRatePie:{},
        methodCoverRatePie:{},
        testcaseCoverRate:{},
        testcasePassRatePie:{},
        // xAxis:[],
        // interfaceErrorBar:[],
        interfaceBar:{}
      }
    },
    mounted() {
      this.getTableData();
    },
    methods: {
      ...mapActions('sddmstore', ['getTestResult_PlanReport']),
      getTableData() {
        let param = [{
          "key": "jobID",
          "value": this.plannamevalue
        }]
        this.getTestResult_PlanReport(param).then(() => {
          var interfacePassRate1 = this.testreport.interfacePassRate[0]
          var interfacePassRate2 = this.testreport.interfacePassRate[1] - this.testreport.interfacePassRate[0]
          this.interfacePassRatePie={value:interfacePassRate2,name:'不通过',value1: interfacePassRate1,name1: "通过"}
          var interfaceCoverRate1 = this.testreport.interfaceCoverRate[0]
          var interfaceCoverRate2 = this.testreport.interfaceCoverRate[1] - this.testreport.interfaceCoverRate[0]
          this.interfaceCoverRatePie={value:interfaceCoverRate2,name:'未覆盖',value1: interfaceCoverRate1,name1: "覆盖"}
          var methodPassRate1 = this.testreport.methodPassRate[0]
          var methodPassRate2 = this.testreport.methodPassRate[1] - this.testreport.methodPassRate[0]
          this.methodPassRatePie={value:methodPassRate2,name:'不通过',value1: methodPassRate1,name1: "通过"}
          var methodCoverRate1 = this.testreport.methodCoverRate[0]
          var methodCoverRate2 = this.testreport.methodCoverRate[1] - this.testreport.methodCoverRate[0]
          this.methodCoverRatePie={value:methodCoverRate2,name:'未覆盖',value1: methodCoverRate1,name1: "覆盖"}
          var testcasePassRate1 = this.testreport.testcasePassRate[0]
          var testcasePassRate2 = this.testreport.testcasePassRate[1] - this.testreport.testcasePassRate[0]
          this.testcasePassRatePie={value:testcasePassRate2,name:'不通过',value1: testcasePassRate1,name1: "通过"}
          var testcaseCoverRate1 = this.testreport.testcaseCoverRate[0]
          var testcaseCoverRate2 = this.testreport.testcaseCoverRate[1] - this.testreport.testcaseCoverRate[0]
          this.testcaseCoverRatePie={value:testcaseCoverRate2,name:'未覆盖',value1: testcaseCoverRate1,name1: "覆盖"}
          var xAxis = []
          var interfaceErrorBar =[]
          for(var key in this.testreport.interfaceErrorMap){        
            xAxis.push(key)
            interfaceErrorBar.push(this.testreport.interfaceErrorMap[key])
          }
          this.interfaceBar = {xAx:xAxis,inter:interfaceErrorBar}
          console.log(this.interfaceBar.xAx)
        })

        
      }

    }
  };
</script>
<style type="text/css">
</style>