<template>
    <div class="index clearafter">
        <module-head></module-head>
        <div class="content cbafter">
            <div class="w220 fl">
                <menu-list></menu-list>
            </div>
            <div class="w980 fr">
                <div class="h1_tit">
                    <h1>健康记录</h1>
                    <button data-toggle="modal" @click="editpatientNotes()">新增记录</button>
                </div>
               
                <div class="memo-message clearfix">

                    <div class="form-group searchcon">
                        <label class="col-md-3 control-label text-right">开始日期：</label>
                        <div class="col-md-2">
                            <input type="text" placeholder="请选择开始日期" class="form-control" id="startdate" v-model="param.startDate" />
                        </div>
                         <label class="col-md-2 control-label text-right">结束日期：</label>
                        <div class="col-md-2">
                            <input  type="text" placeholder="请选择结束日期" class="form-control" id="enddate" v-model="param.endDate" />
                        </div>
                        <div class="col-md-1">
                            <button class="btn btn-success" @click="searchbydate">搜索</button>
                        </div>
                    </div>
                    <div class="guest-info" v-for="(index,item) in patientlist">
                        <!--时间-->
                        <div class="memo-date">
                            <span class="date-icon-second"></span>
                            <span class="date-time">{{item.noteTime.substr(0,10)}}</span>
                        </div>
                        <!--内容-->
                        <table class="memo-content">
                            <thead>
                                <tr class="con-second">
                                    <th>客户姓名</th>
                                    <th>电话</th>
                                    <th>备忘说明</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(subindex,subitem) in item.patientNotes">
                                    <td>{{subitem.personName}}</td>
                                    <td>{{subitem.phoneNo}}</td>
                                    <td>{{subitem.note}}</td>
                                    <td>
                                        <span class="alter" @click="editpatientNotes(subitem)"></span>
                                    </td>
                                </tr>
                               
                            </tbody>
                        </table>
                    </div>
                    <div class="pages cbafter">
                      <div class="pull-left">
                                        <button class="btn btn-default" @click="refresh">刷新</button>
                                    </div>
                                    <div class="pull-right">
                                        <!-- 分页组件: -->
                                        <boot-page v-ref:page :async="true" :lens="lenArr" :page-len="pageLen" :headersparam="headersparam" :param="param"></boot-page>
                                    </div>
                     </div>
                </div>
                <!--新增修改记录-->
                <!--模态框-->
                <div class="modal fade" id="myModal-increase" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                  <form class="form-horizontal" role="form" v-on:submit.prevent="savepatientmethod">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" @click="regetlist">&times;</button>
                                <h4 class="modal-title" id="myModalLabel">{{patienttit}}</h4>
                            </div>
                            <div class="modal-body">
                              
                                    <P>
                                        <label for="">患者姓名 :</label>
                                        <input name="guest-name" type="text" placeholder="请选择客户" v-model="savepatient.personName" required @focus="findmember" />
                                    </P>
                                    <P>
                                        <label for="">备忘事件 :</label>
                                        <textarea v-model="savepatient.note" required rows="5" maxlength="1000"></textarea>
                                    </P>
                               
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="cencert-add">确认</button>
                            </div>
                        </div>
                        <!-- /.modal-content -->
                    </div>
                     </form>
                    <!-- /.modal -->
                </div>
                <!--查找患者-->
                <find-member v-ref:findmembercompent></find-member>
            </div>
        </div>
    </div>
</template>
<script>
import 'assets/lib/bootstrap-3.3.2/css/bootstrap.min.css'
import 'assets/lib/bootstrap-3.3.2/js/bootstrap.min.js'
import 'assets/lib/laydate/laydate.js'
import 'assets/lib/laydate/need/laydate.css'
import 'assets/lib/laydate/skins/danlan/laydate.css'
import 'assets/reset.css'
import Public from 'assets/public.js'
import moduleHead from 'components/module-head'
import menuList from 'components/menu-list'
import bootPage from 'components/BootPage.vue'
import findMember from 'components/findMember'
export default {
    data() {
            return {
                lenArr: [10, 20, 50], // 每页显示长度设置
                pageLen: 5, // 可显示的分页数
                headersparam: {
                    "X-Service-Id": "coms.workDailyService",
                    "X-Service-Method": "getPatientNodeList",
                },
                param: {
                    "endDate": "",
                    "pageNo": 1,
                    "pageSize": 10,
                    "startDate": "",
                    "firstRequest": "1"
                },
                patientlist: [], //备忘录列表
                patienttit: "", //修改还是新增备忘录的标题
                savepatient: { //保存记录的时候用
                    "mpiId": "",
                    "personName": "",
                    "phoneNo": "",
                    "note": "",
                },
               
            }
        },
        computed: {

        },
        components: {
            moduleHead, menuList, bootPage,findMember

        },
        ready() {
            var that = this;
            //搜索开始日期
            laydate({
                elem: '#startdate',
                max: laydate.now(),
                choose: function(datas) { //选择日期完毕的回调  
                    that.param.startDate = datas;
                }
            });
            //搜索结束日期
            laydate({
                elem: '#enddate',
                max: laydate.now(),
                choose: function(datas) { //选择日期完毕的回调  
                    that.param.endDate = datas;
                }
            });
            //获取日期搜索的值当前日期到上个月的日期
            var myDate = new Date(),month;
            this.param.endDate=Public.formatDate(myDate);
            myDate.setMonth(myDate.getMonth() - 1);
            this.param.startDate=Public.formatDate(myDate);
            
        },
        methods: {

            // 新增或者修改健康记录
            editpatientNotes(item) {
                    $("#myModal-increase").modal("show");
                    if (item) {
                        this.patienttit = "修改健康记录";
                        this.savepatient = item;
                     
                    } else {
                        this.patienttit = "新增健康记录";
                        this.savepatient = {
                            "mpiId": "",
                            "personName": "",
                            "phoneNo": "",
                            "note": "",
                        };
                    }
                },
                // 查找患者弹框
                findmember() {
                    this.$refs.findmembercompent.findmember();
                },
                
                //保存记录
                savepatientmethod() {
                    var that = this;
                    $.when(Public.commonajax("coms.workDailyService", "savePatientNote", "[" + JSON.stringify(this.savepatient) + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("保存成功")
                                $("#myModal-increase").modal("hide");
                                that.refresh();
                            }
                        });
                },
                // 列表页面刷新按钮
                refresh() {
                    this.$refs.page.refresh()
                },
                // 按照时间搜索
                searchbydate(){
                    this.param.firstRequest="0";
                    this.refresh();
                },
                // 弹框关闭按钮点击之后重新获取列表
                regetlist(){
                     $("#myModal-increase").modal("hide");
                    this.refresh();
                },
        },
        events: {
            // 分页列表数据
            'data' (data) {
                this.patientlist = data
            },
            'personInfo' (item){
                this.savepatient.personName=item.person.personName;
                this.savepatient.mpiId=item.person.mpiId;
                this.savepatient.phoneNo=item.person.phoneNo;
            },

        },
        watch: {

        }
}
</script>
<style scoped>
.h1_tit button {
    display: block;
    height: 32px;
    line-height: 32px;
    float: right;
    width: 130px;
    border-radius: 16px;
    background: #1dc499;
    color: #fff;
    outline: none;
}


/*memo-message*/

.memo-message {
    width: 950px;
    background-color: #fff;
    border-radius: 16px;
}

.memo-message .guest-info {
    width: 850px;
    margin: 0 0 0 45px;
    overflow: hidden;
    position: relative;
}

.memo-date:before {
    content: " ";
    width: 1px;
    height: 644px;
    background-color: #e9eef2;
    position: absolute;
    left: 10px;
    top: 0;
    -z-index: -1;
}

.guest-info .memo-date {
    width: 130px;
    height: 21px;
    line-height: 21px;
    -background-color: green;
    overflow: hidden;
    margin-top: 10%;
    float: left;
}

.guest-info .memo-date .date-icon-first,
.date-icon-second,
.date-icon-third {
    display: inline-block;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    margin-right: 5px;
    z-index: 2;
    position: relative;
}

.guest-info .memo-date .date-time {
    height: 21px;
    line-height: 21px;
    display: inline-block;
    overflow: hidden;
}

.guest-info .memo-content {
    width: 690px;
    float: left;
    margin-bottom: 25px;
    line-height: 40px
}

.guest-info .memo-content:first-of-type {
    margin-top: 25px;
}

.guest-info .memo-content {}

.guest-info .memo-content td {
    border-bottom: 1px dashed #eaeaec
}

.guest-info .memo-content td:nth-child(3) {
    width: 400px;
 
    line-height: 30px;
}


/*备忘录内容*/

table {
    text-align: center;
    border: 1px solid #eaeaec;
}

table th {
    text-align: center;
    font-weight: 400;
}

.con-first,
.con-second,
.con-third {
    color: #fff;
    height: 36px;
    line-height: 36px;
}

.con-first,
.date-icon-first {
    background-color: #56c9ff;
}

.con-second,
.date-icon-second {
    background-color: #1dc499;
}

.con-third,
.date-icon-third {
    background-color: #efad4d;
}

tbody tr .alter {
    display: inline-block;
    cursor: pointer;
}

tbody tr .alter:hover {
    cursor: pointer;
}

tbody tr .alter {
    width: 13px;
    height: 13px;
    background: url(../../assets/img/edit.png) no-repeat center;
}


/*新增--模态框*/

/*{
    width: 730px;
    height: 471px;
    position: fixed;
    margin-top: 100px;
}*/

.modal-body p {
    min-height: 32px;
    height: auto!important;
    height: 32px;
    margin: 0 auto;
    margin-top: 20px;
    width: 531px;
}

.modal-body p label {
    float: left;
}

.modal-body p input,
textarea {
    border: 0;
    border: 1px solid #bcc3c9;
    width: 443px;
    height: 32px;
    border-radius: 10px;
    margin-left: 13px;
    padding-left: 9px;
    outline: none;
}

.modal-body p input[name='guest-name'] {
    background: url(../../assets/img/selete_guest.png) no-repeat 413px center;
}

.modal-body p input[name='guest-date'] {
    padding-right: 40px;
    background: url(../../assets/img/calendar.png) no-repeat 413px center;
}

.modal-body p textarea {
    resize: none;
    height: 100px;
    margin-bottom: 50px;
    padding: 10px;
}

.modal-footer {
    background-color: #eff0f4;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 103px;
}

.modal-footer .cencert-add,
.cencert-save,
.cencert-cancel {
    border: 0;
    border-radius: 16px;
    background-color: #4796f2;
    color: #fff;
    text-align: center;
    width: 136px;
    height: 36px;
    line-height: 36px;
    outline: none;
}

.cencert-cancel {
    background-color: #f86448;
}

#myModal-cancel .modal-content {
    width: 475px;
    height: 362px;
}

#myModal-cancel .modal-body p:nth-child(1) {
    margin-top: 20px;
    margin-bottom: 20px;
}

#myModal-cancel .modal-body p:nth-child(4) {
    margin-bottom: 10px;
}

#myModal-cancel .modal-body p {
    width: 300px;
    margin-top: 0;
    line-height: 32px;
}

#myModal-cancel .modal-footer {
    height: 90px;
    line-height: 90px;
}

.searchcon{
    padding-top: 20px
}
.searchcon label{
    padding-top: 7px
}
.pages{padding: 20px}
</style>
