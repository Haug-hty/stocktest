<template>
    <el-container>
        <el-main>
            <el-form>
                <el-form-item>
                    <label style="text-indent: 0px; font-size: 15px;">测试计划：</label>
                    <el-select v-model="planname" placeholder="请选择" @change="selectOption()" ref="plannameselect" v-loading.fullscreen.lock="fullscreenLoading">
                        <el-option v-for="(item,index) in testResult.options" :label="item.label" :value="item.value" :key="item.value">
                        </el-option>
                    </el-select>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="generateTestReport()">生成测试报告
                    </el-button>
                </el-form-item>
            </el-form>

            <el-collapse>
                <el-row style="text-align: center;margin-top: 5px;margin-bottom: 5px;">
                    <label style="bottom: 101px; top: 0px; font-size: 18px; font-weight: bold;">错误信息列表</label>
                </el-row>
                <el-table :data="testResult.errormessage" width="100%" border  max-height="700" :row-class-name="tableRowClassName" :flag = false>
                    <el-table-column type='index' width="50"></el-table-column>
                    <el-table-column label='方法名' prop='testcaseID'></el-table-column>
                    <el-table-column label='用例参数' prop='paramData' width="200px" :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label='错误类型' prop='type'></el-table-column>
                    <el-table-column label='比对结果'>
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.type == 'false' || scope.row.type == 'sort1_false' || scope.row.type == 'sort2_false'" type="text"
                                @click="clickDetailInfo(scope.row)">详细信息
                            </el-button>
                            <div v-if="scope.row.type == 'sort1_unknown' || scope.row.type == 'sort2_unknown'" type="text"
                                >{{scope.row.errorMsg}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label='是否为BUG'>
                        <template slot-scope="scope">
                            <div v-if="scope.row.status == 0">
                                <el-button @click="checkOption(scope.row.id,scope.row.type,scope.row.recordID,scope.row.quoteDetail)"
                                    type="primary" size="primary">确认</el-button>
                                <el-button @click="ignoreOption(scope.row.id,scope.row.type,scope.row.recordID,scope.row.quoteDetail)"
                                    type="primary" size="primary">忽略</el-button>
                            </div>
                            <div v-else>
                                <el-button disabled type="primary" size="primary">确认</el-button>
                                <el-button disabled type="primary" size="primary">忽略</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>

                <el-dialog title="详细信息" :visible.sync="outerVisible" style="margin-top: 10%;">
                    <el-scrollbar style="height:100%;">
                        <el-table :data='details' width="100%" max-height="500" border stripe>
                            <el-table-column label='location' prop='location'></el-table-column>
                            <el-table-column :label='this.srcA' prop='src_a'></el-table-column>
                            <el-table-column :label='this.srcB' prop='src_b'></el-table-column>
                        </el-table>
                    </el-scrollbar>
                    <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                    :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="3"
                                    layout="total, sizes, prev, pager, next, jumper" :total="400">
                                </el-pagination> -->
                    <!-- <el-dialog title="状态码" :visible.sync="innerVisible" append-to-body style="margin: 15% auto 0;">404</el-dialog>
                                <div slot="footer" class="dialog-footer">
                                    <el-button type="primary" @click="innerVisible = true">状态码</el-button>
                                </div> -->
                </el-dialog>
                <el-dialog title="行情快照时间信息" :visible.sync="outerVisible1" style="margin-top: 5%;">
                    <el-form>                    
                    <el-scrollbar style="height:100%;">    
                        <el-row>
                            <el-col span="12">
                                <el-form-item label="dataTime总数:">
                                <u>{{numbers}}</u>
                                </el-form-item>
                            </el-col>
                            <el-col span="12">
                                <el-form-item label="dataTime错过率:">
                                <u>{{missRate}}</u>
                                </el-form-item>
                            </el-col>
                        </el-row>    
                        <el-row>
                            <el-col span="12">
                                <el-form-item label="正确率:">
                                <u>{{matchRate}}</u>
                                </el-form-item>
                            </el-col>
                            <el-col span="12">
                                <el-form-item label="错误率:">
                                <u>{{errorRate}}</u>
                                </el-form-item>
                            </el-col>
                        </el-row>      
                        <el-row>
                            <el-col>
                                <el-form-item label="错过的dataTime数:">
                                    <u>{{miss_time.length}}</u>
                                <!-- <el-button type="text"
                                        @click="clickDetailInfo1(scope.row)">
                                    </el-button> -->
                                </el-form-item>
                            </el-col>
                        </el-row>            
                        <el-table :data='quoteDetails' width="100%" max-height="500" border stripe>
                            <el-table-column label='dateTime' prop='dateTime'></el-table-column>
                            <el-table-column label='比对结果'>
                                <template slot-scope="scope">
                                    <el-button type="text"
                                        @click="clickDetailInfo1(scope.row)">详细信息
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-scrollbar>
                    </el-form>
                </el-dialog>
                <el-dialog title="行情快照详细信息" :visible.sync="outerVisible2" style="margin-top: 8%;">
                    <el-scrollbar style="height:100%;">
                        <el-table :data='quoteDetails1' width="100%" max-height="400" border stripe>
                            <el-table-column label='location' prop='location'></el-table-column>
                            <el-table-column :label='this.srcA' prop='src_a'></el-table-column>
                            <el-table-column :label='this.srcB' prop='src_b'></el-table-column>
                            <!-- <el-table-column label='date_time' prop='src_b' v-if="testResult.errormessage[0].quoteDetail == 1"></el-table-column> -->
                        </el-table>
                    </el-scrollbar>
                </el-dialog>
                <el-dialog title="Bug描述" :visible.sync="bugDescribeVisible" style="margin-top: 20%;">
                    <el-input type="textarea" v-model="bugDescribe" placeholder="请输入Bug描述"></el-input>
                    <el-row style="text-align: center;margin-top: 6px;">
                        <el-button type="primary" round @click="confirmOption()">确认</el-button>
                        <el-button type="info" round @click="cancelOption()">取消</el-button>
                    </el-row>
                </el-dialog>
            </el-collapse>
        </el-main>
    </el-container>
</template>
<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'questionList',
        //组件声明
        components: {

        },
        props: {

        },
        computed: {
            ...mapState({
                testResult: state => state.sddmstore.testResult
            })
        },
        data() {
            return {
                planname: '', //测试计划名
                outerVisible: false, //详细信息dialog组件控制器(基准)
                outerVisible1: false,//详细信息dialog组件控制器(行情)
                outerVisible2: false,//详细信息dialog组件控制器(行情)
                details: [], //详细信息内容
                quoteDetails:[],
                numbers:'',
                missRate:'',
                matchRate:'',
                errorRate:'',
                miss_time:[],
                quoteDetails1:[],
                bugDescribeVisible: false, //bug描述dialog组件控制器
                bugDescribe: '', //bug描述内容
                id: '',
                type: '',
                quoteDetailInfo:'',
                recordID: '',
                srcA:'',
                srcB:'',
                fullscreenLoading : false
            }
        },
        methods: {
            ...mapActions('sddmstore', ['getTestResult_PlanName', 'getTestResult_PlanQuestions', 'getTestResult_CheckAndIgnoreOptions']),
            selectOption() {
                this.$nextTick(()=>{
                    //访问后台拿到对应测试计划的问题列表
                    let _this = this
                    let param = [{ "key": "jobID", "value": this.$refs.plannameselect.value }];                    
                    this.fullscreenLoading = true 
                    this.testResult.errormessage = []
                    this.getTestResult_PlanQuestions(param)
                    .then(res => {
                        _this.fullscreenLoading = false;         
                        })
                        .catch(err => {
                        console.log(err);
                        });
                })
            },
            generateTestReport() {
                let conet = true
                this.testResult.errormessage.forEach(element => {
                    if(element.status == 0){
                        conet = false;
                    }                    
                });
                if(conet == false){
                        alert("请确认或忽略全部bug")
                }else{
                    //跳转到测试报告页面
                this.$router.push({
                    name: 'testReport',
                    params: {
                        plannamevalue: this.$refs.plannameselect.value
                    }
                })

                }

                
                
            },
            getTestResultList() {
                this.getTestResult_PlanName()
            },
            clickDetailInfo(info) {
                console.log(info)
                if(info.detailType[0]==0){
                        this.srcA = "测试环境"
                    } else if(info.detailType[0]==1){
                        this.srcA = "全真环境"
                    }else if(info.detailType[0]==2){
                        this.srcA = "生产环境"
                    }else{
                        this.srcA = info.detailType[0]
                    }
                    if(info.detailType[1]==0){
                        this.srcB = "测试环境"
                    } else if(info.detailType[1]==1){
                        this.srcB = "全真环境"
                    }else if(info.detailType[1]==2){
                        this.srcB = "生产环境"
                    }else{
                        this.srcB = info.detailType[1]
                    }
                if(info.quoteDetail == 0 ||info.quoteDetail == 2){
                    this.outerVisible = true;
                    this.details = info.details;
                } else {
                    this.outerVisible1 = true;
                    this.quoteDetails = info.questionDetails;
                    this.numbers = info.number
                    this.missRate = info.missRate
                    this.matchRate = info.matchRate
                    this.errorRate = info.errorRate
                    this.miss_time = info.missTime
                    console.log(this.quoteDetails)

                }
            },
            clickDetailInfo1(info){
                console.log("....",info)
                this.outerVisible2 = true;
                this.quoteDetails1 = info.details;
            },
            
            checkOption(idInfo, typeInfo, recordIDInfo,quoteDetailInfo) {
                this.id = idInfo;
                this.type = typeInfo;
                this.quoteDetail = quoteDetailInfo;
                this.recordID = recordIDInfo;
                this.bugDescribe = '';
                this.bugDescribeVisible = true;
            },
            ignoreOption(idInfo, typeInfo, recordIDInfo,quoteDetailInfo) {
                this.$confirm('是否忽略？', '提示', {
                    confirmButtonText: '确定',
                    cacelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let params = {}
                    let _this = this;
                    if (typeInfo == "false") {
                        if(quoteDetailInfo == 0){
                            params = {
                            id: idInfo,
                            "filterFactors": [
                                { "key": "i.recordID1", "value": recordIDInfo }
                            ],
                            "content": [
                                { "key": "result.false.$[i].status", "value": "2" }
                            ]
                        }
                        }else {
                            params = {
                            id: idInfo,
                            "filterFactors": [
                                { "key": "i.recordID", "value": recordIDInfo }
                            ],
                            "content": [
                                { "key": "result.false.$[i].status", "value": "2" }
                            ]
                        }
                            
                        }
                        
                    } else if (typeInfo == "error"){
                        params = {
                            id: idInfo,
                            "filterFactors": [
                                { "key": "i.recordID", "value": recordIDInfo }
                            ],
                            "content": [
                                { "key": "error.$[i].status", "value": "2" }
                            ]
                        }
                    } else if (typeInfo == "mismatch"){
                        params = {
                            id: idInfo,
                            "filterFactors": [
                                { "key": "i.recordID", "value": recordIDInfo }
                            ],
                            "content": [
                                { "key": "mismatch.$[i].status", "value": "2" }
                            ]
                        }
                    } else if (typeInfo == "error"){
                        params = {
                            id: idInfo,
                            "filterFactors": [
                                { "key": "i.recordID", "value": recordIDInfo }
                            ],
                            "content": [
                                { "key": "error.$[i].status", "value": "2" }
                            ]
                        }
                    } else {
                        params = {
                            id: idInfo,
                            "filterFactors": [
                                { "key": "i.recordID", "value": recordIDInfo }
                            ],
                            "content": [
                                { "key": "empty.$[i].status", "value": "2" }
                            ]
                        }
                    }
                    this.getTestResult_CheckAndIgnoreOptions(params).then(() => {
                        if(_this.testResult.statusflag){
                            _this.$message({
                                message: '忽略成功',
                                type: 'success'
                            });
                            _this.selectOption();
                        }else{
                            _this.$message.error('忽略失败');
                        }
                    }).catch((error) => {
                        _this.$message.error('服务器异常');
                        _this.bugDescribeVisible = false;
                    })
                })
            },
            
            confirmOption() {
                this.$confirm('是否确认？', '提示', {
                    confirmButtonText: '确定',
                    cacelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    let params = {}
                    let _this = this;
                    if (this.type == "false" ) {
                        if(this.quoteDetail == 0){
                            params = {                            
                            id: this.id,
                            "filterFactors": [
                                { "key": "i.recordID1", "value": this.recordID }
                            ],
                            "content": [
                                { "key": "result.false.$[i].status", "value": "1" },
                                { "key": "result.false.$[i].bugDescribe", "value": this.bugDescribe }
                            ]
                        }
                        }else {
                            params = {                            
                            id: this.id,
                            "filterFactors": [
                                { "key": "i.recordID", "value": this.recordID }
                            ],
                            "content": [
                                { "key": "result.false.$[i].status", "value": "1" },
                                { "key": "result.false.$[i].bugDescribe", "value": this.bugDescribe }
                            ]
                        }
                            
                        }
                        
                    } else if (this.type == "mismatch"){
                        params = {
                            id: this.id,
                            "filterFactors": [
                                { "key": "i.recordID", "value": this.recordID }
                            ],
                            "content": [
                                { "key": "mismatch.$[i].status", "value": "1" },
                                { "key": "mismatch.$[i].bugDescribe", "value": this.bugDescribe }
                            ]
                        }
                    } else if (this.type == "error"){
                        params = {
                            id: this.id,
                            "filterFactors": [
                                { "key": "i.recordID", "value": this.recordID }
                            ],
                            "content": [
                                { "key": "error.$[i].status", "value": "1" },
                                { "key": "error.$[i].bugDescribe", "value": this.bugDescribe }
                            ]
                        }
                    } else{
                        params = {
                            id: this.id,
                            "filterFactors": [
                                { "key": "i.recordID", "value": this.recordID }
                            ],
                            "content": [
                                { "key": "empty.$[i].status", "value": "1" },
                                { "key": "empty.$[i].bugDescribe", "value": this.bugDescribe }
                            ]
                        }
                    }
                    console.log(params)
                    this.getTestResult_CheckAndIgnoreOptions(params).then(() => {
                        if(_this.testResult.statusflag){
                            _this.$message({
                                message: '确认成功',
                                type: 'success'
                            });
                            _this.bugDescribeVisible = false;
                            _this.selectOption();
                        }else{
                            _this.$message.error('确认失败');
                        }
                    }).catch((error) => {
                        _this.$message.error('服务器异常');
                        _this.bugDescribeVisible = false;
                    })
                })
            },
            cancelOption() {
                this.bugDescribeVisible = false;
            },
            //确认的bug标红
            tableRowClassName({row, rowIndex}){
                if (row.status == "1") {
                     return 'warning-row';
                }
                return '';
            },
        },
        mounted: function () {
            this.getTestResultList()
        }
    }
</script>
<style lang="scss" scoped>
    .el-scrollbar__wrap {
        overflow: hidden !important;
    }

    
</style>
<style>
    .el-table .warning-row {
    background: #e25959;
    }
</style>