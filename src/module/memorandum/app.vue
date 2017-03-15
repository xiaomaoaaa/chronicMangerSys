<template>
    <div class="index clearafter">
        <module-head></module-head>
        <div class="content cbafter">
            <div class="w220 fl">
                <menu-list></menu-list>
            </div>
            <div class="w980 fr">
                <!--备忘录-->
                <div class="h1_tit">
                    <h1>备忘录</h1>
                    <button data-toggle="modal" @click="editmemorandum()" class="default ok fr">新增备忘录</button>
                </div>
                <!--备忘内容-->
                <div class="memo-message clearfix">
                    <div class="guest-info" v-for="(index,item) in memorandumlist">
                        <!--时间-->
                        <div class="memo-date">
                            <span class="date-icon-second"></span>
                            <span class="date-time">{{item.workDailyDate.substr(0,10)}}</span>
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
                                <tr v-for="(subindex,subitem) in item.workDailyList">
                                    <td>{{subitem.personName}}</td>
                                    <td>{{subitem.phoneNo}}</td>
                                    <td>{{subitem.workDailyContent}}</td>
                                    <td>
                                        <span class="alter" @click="editmemorandum(subitem)"></span>
                                        <span class="delete" @click="delememorandum(subitem)"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!--新增修改备忘录-->
                <!--模态框-->
                <div class="modal fade" id="myModal-increase" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <form v-on:submit.prevent="savememorandummethod" id="savememorandummethod">
                            <div class="modal-header">
                                <button type="button" class="close"  @click="regetlist">&times;</button>
                                <h4 class="modal-title" id="myModalLabel">{{memorandumtit}}</h4>
                            </div>
                            <div class="modal-body">
                                
                                    <P>
                                        <label for="">患者姓名 :</label>
                                        <!--查找患者-->
                                        <input name="guest-name" type="text" placeholder="请选择客户" v-model="savememorandum.personName" required @focus="findmember" />
                                    </P>
                                    <P>
                                        <label for="">备忘日期 :</label>
                                        <input name="guest-date" type="text" placeholder="请选择备忘日期" v-model="savememorandum.workDailyDate" id="workDailyDate" required/>
                                    </P>
                                    <P>
                                        <label for="">备忘事件 :</label>
                                        <textarea v-model="savememorandum.workDailyContent" required rows="5" maxlength="400"></textarea>
                                    </P>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="default ok center">确认</button>
                            </div>
                            </form>
                        </div>
                        <!-- /.modal-content -->
                    </div>
                    <!-- /.modal -->
                </div>
                <!--取消备忘录-->
                <!--模态框-->
                <div class="modal fade" id="myModal-cancel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 class="modal-title" id="myModalLabel">取消备忘录</h4>
                            </div>
                            <div class="modal-body">
                                <p>您是否确认取消下列备忘录？</p>
                                <P>
                                    <label for="">患者姓名 :</label><span class="guestName">{{delememorandumdata.personName}}</span>
                                </P>
                                <P>
                                    <label for="">备忘日期 :</label><span class="memoDate">{{delememorandumdata.workDailyDate}}</span>
                                </P>
                                <P class="cbafter">
                                    <label for="">备忘事件 :</label><span class="memoEvent fr">{{delememorandumdata.workDailyContent}}</span>
                                </P>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="default cancel center" @click="delememorandumsave">确认取消</button>
                            </div>
                        </div>
                        <!-- /.modal-content -->
                    </div>
                    <!-- /.modal -->
                </div>
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
import findMember from 'components/findMember'
export default {
    data() {
            return {
                memorandumlist: [], //备忘录列表
                memorandumtit: "", //修改还是新增备忘录的标题
                savememorandum: { //保存备忘录数据结构
                    "workDailyDate": "",
                    "workDailyContent": "",
                    "mpiId": "",
                    "personName": "",
                    "phoneNo": ""
                },

                delememorandumdata: { //删除备忘录
                    "workDailyDate": "",
                    "workDailyContent": "",
                    "mpiId": "",
                    "personName": "",
                    "phoneNo": "",
                    workDailyId: "",
                },

            }
        },
        computed: {

        },
        components: {
            moduleHead, menuList, findMember

        },
        ready() {
            var that = this;
            // 备忘录列表
            that.getmemorandumlist();

            //日历插件
            laydate({
                elem: '#workDailyDate',
                min: laydate.now(),
                choose: function(datas) { //选择日期完毕的回调  
                    that.savememorandum.workDailyDate = datas;
                }
            });
        },
        methods: {
            // 获取备忘录列表
            getmemorandumlist() {
                    var that = this;
                    $.when(Public.commonajax("coms.workDailyService", "findWorkDailyList", "[]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                that.memorandumlist = res.body;
                            }
                        });
                },
                // 新增或者修改备忘录
                editmemorandum(item) {
                    $("#myModal-increase").modal("show");
                    if (item) {
                        this.memorandumtit = "修改备忘录";
                        this.savememorandum = item;
                        this.savememorandum.workDailyDate = this.savememorandum.workDailyDate.substr(0, 10);
                    } else {
                        this.memorandumtit = "新增备忘录";
                        this.savememorandum = {
                            "workDailyDate": "",
                            "workDailyContent": "",
                            "mpiId": "",
                            "personName": "",
                            "phoneNo": ""
                        };
                    }
                },
                findmember() {
                    this.$refs.findmembercompent.findmember();
                },
                //保存备忘录
                savememorandummethod() {
                    var that = this;
                    $.when(Public.commonajax("coms.workDailyService", "saveWorkDaily", "[" + JSON.stringify(this.savememorandum) + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("保存成功")
                                $("#myModal-increase").modal("hide");
                                that.getmemorandumlist();
                            }
                        });
                },
                //删除备忘录弹框
                delememorandum(subitem) {
                    $("#myModal-cancel").modal("show");
                    subitem.workDailyDate=subitem.workDailyDate.substr(0,10);
                    this.delememorandumdata = subitem;
                },
                //删除备忘录确定   
                delememorandumsave() {
                    var that = this;
                    $.when(Public.commonajax("coms.workDailyService", "deleteWorkDaily", "['" + this.delememorandumdata.workDailyId + "']"))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("删除成功")
                                $("#myModal-cancel").modal("hide");
                                that.getmemorandumlist();
                            }
                        });
                },
                 // 弹框关闭按钮点击之后重新获取列表
                regetlist(){
                     $("#myModal-increase").modal("hide");
                    this.getmemorandumlist();
                },

        },
        events: {
            'personInfo' (item) {
                this.savememorandum.personName = item.person.personName;
                this.savememorandum.mpiId = item.person.mpiId;
                this.savememorandum.phoneNo = item.person.phoneNo;
            },
        },
        watch: {

        }
}
</script>
<style scoped>



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
    text-align: left;
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

tbody tr .alter,
.delete {
    display: inline-block;
    cursor: pointer;
}

tbody tr .alter:hover,
tbody tr .delete:hover {
    cursor: pointer;
}

tbody tr .alter {
    width: 13px;
    height: 13px;
    background: url(../../assets/img/edit.png) no-repeat center;
}

tbody tr .delete {
    float: right;
    margin-right: 21px;
    width: 21px;
    height: 40px;
    background: url(../../assets/img/delete.png) no-repeat center;
}


/*新增--模态框*/

.modal-body p {

    margin: 0 auto;
    margin-top: 20px;
    width: 531px;
}

.modal-body p label {
    float: left;
    color: #999999;
    font-weight: normal;
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



#myModal-cancel .modal-content {
    width: 475px;
}

#myModal-cancel .modal-body p:nth-child(1) {
    margin-top: 20px;
    font-weight:bold;
   
}

#myModal-cancel .modal-body p:nth-child(4) {
    margin-bottom: 10px;
    
}
#myModal-cancel .modal-body p.cbafter span{
    width: 260px;display:block;
    max-height: 100px; overflow: auto;line-height: 30px;padding: 5px;
}
#myModal-cancel .modal-body p {
    width: 330px;
    margin-top: 0;
    line-height: 32px;
}

#myModal-cancel .modal-footer {
    height: 90px;
    line-height: 90px;
}
</style>
