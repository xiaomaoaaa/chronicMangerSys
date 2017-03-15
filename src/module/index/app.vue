<template>
    <div class="index clearafter">
        <module-head keep-alive></module-head>
        <div class="content cbafter">
            <div class="w220 fl">
                <menu-list keep-alive></menu-list>
            </div>
            <div class="w980 fr p20">
                <div class="index_con cbafter">
                    <div class="fl w650 wjz">
                        <div class="h2_index">
                            <h2 class="fl">危急值</h2>
                            <a href="javascript:void(0)" class="fr">刷新</a>
                        </div>
                        <div class="contain">
                            <div class="block" v-for="item in dangerRecordlist" track-by="$index">
                                <div class="block_con1">
                                    <span class="fl"> {{item.personName}} {{item.itemName}}</span>
                                    <span class="fr">{{item.occurTime}}</span>
                                </div>
                                <div class="block_con2 cbafter">
                                    <p class="fl">{{item.sourceTypeText}}</p>
                                    <div class="fl">
                                        <p><span>{{item.indexName}}</span><span :class="{'zhibiao2':parseFloat(item.indexVal)<parseFloat(item.normalValBottom),'zhibiao':parseFloat(item.indexVal)<parseFloat(item.normalValTop)}">{{item.indexVal}}</span></p>
                                    </div>
                                    <button class="fr" @click="dealdangerrecord(item)">马上处理</button>
                                </div>
                            </div>
                            <!-- <div class="block">
                                <div class="block_con1">
                                    <span class="fl">门诊号：0932333277 陈爱莲 T3T4全套</span>
                                    <span class="fr">8分钟前</span>
                                </div>
                                <div class="block_con2 cbafter">
                                    <p class="fl">检 验</p>
                                    <div class="fl">
                                        <p><span>高敏促甲状腺素</span><span class="zhibiao">0.101</span></p>
                                        <p><span>甲状腺球蛋白</span><span class="zhibiao">3.39</span></p>
                                    </div>
                                    <button class="fr">马上处理</button>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <div class="fr w290">
                        <div class="h2_index2">
                            <h2 class="fl">咨询问答</h2>
                            <a href="javascript:void(0)" class="fr">刷新</a>
                        </div>
                        <ul class="zxwd">
                            <li v-for="item in roster_lists">
                                <span></span>
                                <span>{{item.name}}</span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="need_dealt cb">
                    <div class="h2_index3">
                        <h2 class="fl">今日待办事项</h2>
                        <!-- <a href="javascript:void(0)" class="fr">刷新</a> -->
                    </div>
                    <ul class="list">
                        <li v-for="(index,item) in affairServicelist" :class="{over:item.dealFlag==1}" track-by="$index">
                            <p>{{item.affairTypeName}}</p>
                            <p>{{item.affairDesc}}</p>
                            <p>
                                <button class="agree" v-for="subitem in item.list" @click="dealaffair(subitem,item,index)" v-if="item.dealFlag==0" track-by="$index">{{subitem.operateName}}</button>
                                <!-- <button class="disagree">不同意</button> -->
                            </p>
                            <p>{{item.affairTime.substr(0,11)}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 保存成功提示 -->
        <div class="modal fade" id="successsaveinfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!--  <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                服务本体信息提示
                    </div> -->
                    <div class="modal-body threestep_con">
                        <h2>是否确认完成该事项？</h2>
                    </div>
                    <div class="form-group tbline text-center">
                        <div class="col-md-6">
                            <button class="default blue center fr" @click="dealed()">确定</button>
                        </div>
                        <div class="col-md-6">
                            <button class="default greynobg center fl" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 更换主管医生审核 -->
        <div class="modal fade" id="editexamine" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                更换主管医生审核</h4>
                    </div>
                    <div class="changeinfo cbafter">
                        <div class="changeinfo_head cbafter">
                            <span class="text-left">申请人：{{examineinfo.look.applyUserName}}</span>
                            <span class="text-right">申请时间：{{examineinfo.look.applyTime.substring(0,10)}}</span>
                        </div>
                        <div class="cb changeinfo_con">
                            <div class="content1">
                                <p><span>{{examineinfo.look.personName}}</span>{{examineinfo.look.chronicName}}</p>
                                <p>证件号码：{{examineinfo.look.idOrNo}}</p>
                            </div>
                            <div class="content2">
                                <p><img :src="imgdoc1"><span>{{examineinfo.look.oldMangerName}}</span>{{examineinfo.look.oldMangerLevelText}}</p>
                                <p><img :src="jiantou">更换为</p>
                                <p><img :src="imgdoc1"><span>{{examineinfo.look.newMangerName}}</span>{{examineinfo.look.newMangerLevelText}}</p>
                            </div>
                            <div class="content3"><span>更换原因：</span>{{examineinfo.look.changeReason}}</div>
                        </div>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" id="changedocform" v-on:submit.prevent="subexamine">
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label" style="padding-top:15px">审核意见：</label>
                                <div class="col-md-8">
                                    <div class="radio">
                                        <label class="checkbox-inline">
                                            <input type="radio" name="examineinfo" value="1" required v-model="examineinfo.sub.applyStatus">通过
                                        </label>
                                        <label class="checkbox-inline">
                                            <input type="radio" name="examineinfo" value="2" required v-model="examineinfo.sub.applyStatus">不通过
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" v-if="examineinfo.sub.applyStatus==2">
                                <label for="" class="col-md-3 control-label">不通过理由 :</label>
                                <div class="col-md-8">
                                    <textarea class="form-control" rows="3" placeholder="请输入审核不通过的理由" v-model="examineinfo.sub.refuseReason" :required="examineinfo.sub.applyStatus==2"></textarea>
                                </div>
                            </div>
                            <div class="form-group save">
                                <button type="submit" class="default center ok">确认</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- 设置健康顾问 -->
        <div class="modal fade" id="sethealdoc" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                设置健康顾问</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" id="changehealdocform" v-on:submit.prevent="changehealdoc">
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">会员姓名 :</label>
                                <div class="col-md-6">
                                    <input type="text" disabled class="form-control" v-model="selfInfo.personName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">会员性别 :</label>
                                <div class="col-md-6">
                                    <input type="text" disabled class="form-control" v-model="selfInfo.sexText">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">会员年龄 :</label>
                                <div class="col-md-6">
                                    <input type="text" disabled class="form-control" v-model="selfInfo.dob">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">手机号码 :</label>
                                <div class="col-md-6">
                                    <input type="text" disabled class="form-control" v-model="selfInfo.phoneNo">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">健康顾问 :</label>
                                <div class="col-md-6">
                                    <label class="radio-inline" v-for="item in HealthDoctorlist">
                                        <input type="radio" name="healthdoc" value="{{item.doctorId}}" v-model="selecthealdoc" required />{{item.doctorName}}
                                    </label>
                                </div>
                            </div>
                            <div class="form-group save">
                                <button type="submit" class="default ok center">确认</button>
                                <!--  <button type="button" class="btn btn-warning" @click="cancelchangehealdoc">取消</button> -->
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- 危急值处理通知 -->
        <div class="modal fade" id="noticeselect" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                危急值处理通知</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" v-model="allnotice"> 全部通知
                                </label>
                            </div>
                        </div>
                        <div class="form-group selectnoticepeople cbafter">
                            <ul>
                                <li :class="{noselect:item.noticeStauts==0}" v-for="item in dangerNoticelist" @click="changenoticeStauts(item)" track-by="$index">
                                    <img :src="headimg" />
                                    <p>{{item.noticeObjectName}} <span>{{item.noticeObjectTypeText}}</span></p>
                                    <p class="iphone">{{item.noticeObjectPhone}}</p>
                                    <div class="righttip" :class="{righttip2:item.noticeStauts==0}"></div>
                                </li>
                                
                            </ul>
                        </div>
                        <ul>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <div class="form-group save">
                            <button class="default blue center" @click="savedangerNotice">确认</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 修改会员信息弹出框组件 -->
        <member-edit v-ref:memberedit></member-edit>
    </div>
</template>
<script>
var imgdoc1 = require("assets/img/imgdoc1.jpg");
var jiantou = require("assets/img/jiantou.png");
var headimg = require("assets/img/cs2.jpg");
import 'assets/lib/bootstrap-3.3.2/css/bootstrap.min.css'
import 'assets/lib/bootstrap-3.3.2/js/bootstrap.min.js'
import 'assets/reset.css'
import Public from 'assets/public.js'
    // import 'assets/lib/webIM/strophe-1.2.8.min.js'
    // import 'assets/lib/webIM/websdk-1.1.3.js'
import moduleHead from 'components/module-head'
import menuList from 'components/menu-list'
import memberEdit from 'components/member-edit'
    // import criticalValues from 'components/critical-values'
    // import mattersToday from 'components/matters-today'
export default {
    data() {
            return {
                headimg: headimg,
                roleId: "",
                roster_lists: [],
                affairServicelist: [],
                affair: {},
                affairindex: "",

                // 更换主管医生用start
                imgdoc1: imgdoc1,
                jiantou: jiantou,
                examineinfo: {
                    "sub": {
                        "applyStatus": "",
                        "changeId": "",
                        "refuseReason": ""
                    },
                    "look": {
                        "applyUserName": "",
                        "applyTime": "",
                        "personName": "",
                        "chronicName": "",
                        "idOrNo": "",
                        "oldMangerName": "",
                        "oldMangerLevelText": "",
                        "newMangerName": "",
                        "newMangerLevelText": "",
                        "changeReason": "",
                        "refuseReason": "",
                        "applyStatus": "" //判断显示成功还是失败用
                    }
                },
                // 更换主管医生用end
                // 设置健康顾问开始
                // 健康顾问列表
                HealthDoctorlist: [],
                selecthealdoc: "",
                usermpiId: "",
                selfInfo: {
                    sexText: "",
                    personName: "",
                    dob: "",
                    phoneNo: "",

                },
                // 设置健康顾问结束

                // 危急值处理开始
                dangerRecordlist: [],
                dangerNoticelist: [],
                allnotice:false,
                // 危急值处理结束
            }
        },
        components: {
            moduleHead, menuList, memberEdit
            // ,criticalValues,mattersToday
        },
        ready() {
            var that = this;
            //获取代办事项列表
            $.when(Public.commonajax("coms.affairService", "findAffairList", "[]"))
                .done(function(res) {
                    if (res.code == 200) {
                        that.affairServicelist = res.body;
                    }

                });

            // 获取健康顾问列表
            $.when(Public.commonajax("coms.doctorService", "findHealthDoctor", "[[]]"))
                .done(function(res) {
                    if (res.code == 200) {
                        that.HealthDoctorlist = res.body;
                    }
                });
            //获取危急值列表
            $.when(Public.commonajax("coms.dangerIndexRecordService", "queryDangerIndexRecordListOnWeb", "[]"))
                .done(function(res) {
                    if (res.code == 200) {
                        $.each(res.body.list, function(index, el) {
                            el.occurTime = that.getlatesttime(el.occurTime)
                        });
                        that.dangerRecordlist = res.body.list;
                        that.roleId = res.body.roleId
                    }

                });

        },
        methods: {
            // 点击列表的按钮处理事件，locateUrl为空的不跳转，
            dealaffair(subitem, item, index) {
                    var that = this;
                    // 如果没有跳转的url
                    if (subitem.locateUrl == null) {
                        if (subitem.affairTypeId == 2 || subitem.affairTypeId == 1) {
                            $("#successsaveinfo").modal("show");
                        };
                        //主管医生变更审核
                        if (subitem.affairTypeId == 3) {
                            $("#editexamine").modal("show");
                            // 根据对应的iD获取对应的慢病医生主管医生变更审核
                            $.when(Public.commonajax("coms.doctorService", "findChangeInfoByChangeId", "['" + item.bussinessDataKey + "']"))
                                .done(function(res) {
                                    if (res.code == 200) {
                                        that.examineinfo.sub.changeId = res.body.changeId;
                                        that.examineinfo.sub.refuseReason = '';
                                        that.examineinfo.sub.applyStatus = '';
                                        that.examineinfo.look = res.body;
                                    }

                                })
                        };
                        //分配健康顾问
                        if (subitem.affairTypeId == 4) {
                            this.selecthealdoc = "";
                            $("#sethealdoc").modal("show");
                            this.usermpiId = item.bussinessDataKey;
                            // 设置健康顾问需要显示一下会员基本信息 姓名 性别 年龄 手机号   
                            $.when(Public.commonajax("coms.personService", "getSelfInfo", "['" + item.bussinessDataKey + "']"))
                                .done(function(res) {
                                    if (res.code == 200) {
                                        that.selfInfo = res.body.person;
                                        var d = new Date();
                                        var year = d.getFullYear();
                                        that.selfInfo.dob = parseInt(year) - parseInt(that.selfInfo.dob.substring(0, 4))
                                    }

                                })
                        };
                        // 备忘录
                        if (subitem.affairTypeId == 5) {
                            $("#successsaveinfo").modal("show");
                        }
                        this.affair = item;
                        this.affairindex = index;
                    } else { // 有跳转的url
                        // affairTypeId == 1会员入会信息完善 affairTypeId == 2新增慢病信息完善
                        if (subitem.affairTypeId == 1 || subitem.affairTypeId == 2) {
                            // sessionStorage.mpiId = item.bussinessDataKey;
                            $(".bg_master2").show();
                            $("#edit_member").show();
                            this.$refs.memberedit.getmipiid(item.bussinessDataKey);

                        }
                    }

                },
                // 改变待办事项为完成状态
                dealed() {
                    var that = this;
                    $.when(Public.commonajax("coms.affairService", "updateAffairDealFlag", "['" + this.affair.affairId + "']"))
                        .done(function(res) {
                            if (res.code == 200) {
                                $("#successsaveinfo").modal("hide");
                                that.affair.dealFlag = "1";
                                that.affairServicelist.splice(that.affairindex, 1);
                                that.affairServicelist.push(that.affair)
                            }

                        })
                },
                // 更换主管医生提交
                subexamine() {
                    var that = this;
                    $.when(Public.commonajax("coms.doctorService", "submitModifyMainDoctor", "[" + JSON.stringify(this.examineinfo.sub) + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                $("#editexamine").modal('hide');
                                that.dealed();
                            }
                        })
                },
                // 确定设置健康顾问
                changehealdoc() {
                    var that = this;
                    $.when(Public.commonajax("coms.doctorService", "saveHealthDoctor", "['" + this.usermpiId + "','" + this.selecthealdoc + "']"))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt('设置成功');
                                $("#sethealdoc").modal("hide");
                                that.dealed();
                            } else {
                                Public.ajaxPrompt(res.msg);
                            }

                        })
                },
                // 获取当前时间和返回时间的差
                getlatesttime(occurTime) {
                    var date1 = new Date();
                    var date2 = new Date(occurTime);
                    var s1 = date1.getTime(),
                        s2 = date2.getTime();
                    var total = (s1 - s2) / 1000;
                    var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
                    var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
                    var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
                    var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
                    var min = parseInt(afterHour / 60); //计算整数分
                    var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数
                    if (day > 0) {
                        return day + "天前"
                    }
                    if (hour > 0) {
                        return hour + "小时前"
                    }
                    if (min > 0) {
                        return min + "分钟前"
                    }
                    if (afterMin > 0) {
                        return afterMin + "秒前"
                    }
                },
                //处理危急值
                dealdangerrecord(item) {
                    var that=this;
                    // window.location.href="inspectdangerrecord.html?dangerRecordId="+item.dangerRecordId
                    if (this.roleId == "main_doctor") {
                        if (item.sourceType == 4) {
                            window.location.href = "seleftestdangerrecord.html?dangerRecordId=" + item.dangerRecordId
                        } else {
                            window.location.href = "inspectdangerrecord.html?dangerRecordId=" + item.dangerRecordId
                        }
                    } else {
                        $("#noticeselect").modal("show");
                        // 获取危急值通知列表
                        $.when(Public.commonajax("coms.dangerIndexRecordService", "findDangerPhone", "['"+item.dangerRecordId+"']"))
                            .done(function(res) {
                                if (res.code == 200) {
                                    that.dangerNoticelist = res.body;
                                }
                            });
                    }
                },
                // 选择或者取消危急值通知的的人物
                changenoticeStauts(item){
                    item.noticeStauts=item.noticeStauts=="0"?"1":"0"
                  
                },
                // 保存选中通知的的人物
                savedangerNotice(){
                    var that=this;
                    let temarr=[];
                    $.each(this.dangerNoticelist,function(index, el) {
                        let temobj={
                            dangerNoticeId:""
                        };
                        if(el.noticeStauts=="1"){
                            temobj.dangerNoticeId=el.dangerNoticeId;
                            temarr.push(temobj);
                        }
                    });
                    if(temarr.length>0){
                         $.when(Public.commonajax("coms.dangerIndexRecordService", "saveDangerPhoneNotcie", "["+JSON.stringify(temarr)+"]"))
                            .done(function(res) {
                                if (res.code == 200) {
                                   Public.ajaxPrompt("发送成功");
                                    $("#noticeselect").modal("hide");
                                }else{
                                     Public.ajaxPrompt(res.msg) 
                                }

                            });
                    }else{
                        Public.ajaxPrompt("请至少选一个")
                    }
                }   

        },
        events: {

        },
        watch:{
            "allnotice":function(val,oldval){
                if(val){
                    $.each(this.dangerNoticelist,function(index, el) {
                       el.noticeStauts="1"
                    });
                }else{
                      $.each(this.dangerNoticelist,function(index, el) {
                       el.noticeStauts="0"
                    });
                }
            }
        }

}
</script>
<style scoped>
/*主管医生*/
.w290 {
    width: 290px
}

.w650 {
    width: 650px
}

.index_con>div {
    height: 250px;
    -webkit-box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    -moz-box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    background: #fff;
    border-radius: 10px;
}

.index_con .list {
    overflow: auto;
}

.index_con .list li {
    height: 52px;
}

.index_con .list li p {
    height: 52px;
    line-height: 52px;
}

.index_con .list li p:nth-child(1) {
    width: 590px;
    float: left;
    padding-left: 20px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.index_con .list li p:nth-child(2) {
    float: right;
    padding-right: 10px
}

.index_con .list li p button {
    height: 20px;
    width: 20px;
    border: none;
    margin: 11px 0 0 5px
}

.index_con .list li p button.edit {
    background: url(../../assets/img/edit2.png) no-repeat center center;
}

.index_con .list li p button.dele {
    background: url(../../assets/img/dele2.png) no-repeat center center;
}

.index_con .list li:hover p button.edit {
    background: url(../../assets/img/edit.png) no-repeat center center;
    border-radius: 3px;
    border: #cfcfcf 1px solid
}

.index_con .list li:hover p button.dele {
    background: url(../../assets/img/dele.png) no-repeat center center;
    border-radius: 3px;
    border: #cfcfcf 1px solid
}

.index_con .list li:nth-child(2n) {
    background: #f7f7f7
}

.index_con .list li:nth-child(2n+1) {
    background: #fff
}

.index_con .list li:last-child {
    border-radius: 0 0 10px 10px
}

.zxwd li {
    height: 52px;
    box-sizing: border-box;
    padding: 0 10px
}

.zxwd li>span {
    display: inline-block;
    height: 32px;
    text-align: center;
    line-height: 34px;
}

.zxwd li>span:nth-child(1) {
    width: 52px;
}

.zxwd li>span:nth-child(2) {
    width: 52px;
}

.zxwd li>span:nth-child(3) {
    width: 40px;
}

.zxwd li>span:nth-child(4) {
    width: 52px;
}

.zxwd li>span:nth-child(5) {
    width: 40px;
    background: url(../../assets/img/wenda2.png) no-repeat center bottom;
}

.zxwd li:nth-child(2n) {
    background: #f7f7f7
}

.zxwd li:nth-child(2n+1) {
    background: #fff
}

.zxwd li:last-child {
    border-radius: 0 0 10px 10px
}

.h2_index {
    padding: 0 10px 0 20px;
    border-bottom: 2px solid #fb6e52;
    height: 40px;
}

.h2_index h2 {
    height: 40px;
    color: #fb6e52;
    line-height: 40px;
    background: url(../../assets/img/wjz.png) no-repeat left center;
    padding-left: 30px;
    font-size: 16px;
}

.h2_index a {
    display: block;
    height: 40px;
    line-height: 40px;
    float: right;
    width: 40px;
    background: url(../../assets/img/refres2.png) no-repeat center center;
    text-indent: -999rem
}

.index_con .contain {
    overflow: auto;
    height: 198px;
    width: 100%
}

.index_con .block {
    border: #e5e9ec 1px solid;
    margin: 10px 10px 0;
}

.index_con .block .block_con1 {
    padding: 0 10px;
    height: 26px;
    line-height: 26px;
    background: #f9fafc;
    color: #888888
}

.index_con .block .block_con2 {
    padding: 10px;
    color: #444444;
}

.index_con .block .block_con2 >p {
    color: #fb6e52;
}

.index_con .block .block_con2 p {
    line-height: 25px;
}

.index_con .block .block_con2>div {
    padding-left: 30px;
}

.index_con .block .block_con2>div p span:nth-child(1) {
    padding-left: 30px;
    width: 200px;
    display: inline-block;
}

.index_con .block .block_con2 .zhibiao {
    display: inline-block;
    background: url(../../assets/img/up_arrow.png) no-repeat right center;
    padding-right: 10px;
    width: 50px;
    height: 25px;
}

.index_con .block .block_con2 .zhibiao2 {
    display: inline-block;
    background: url(../../assets/img/down_arrow.png) no-repeat right center;
    padding-right: 10px;
    width: 50px;
    height: 25px;
}

.index_con .block .block_con2>button {
    color: #fb6e52;
    border: 1px solid #fb6e52;
    border-radius: 15px;
    height: 30px;
    background: none;
    padding: 0 10px;
    line-height: 30px
}

.h2_index2 {
    padding: 0 10px 0 20px;
    background: #22a7f0;
    height: 40px;
    border-radius: 10px 10px 0 0
}

.h2_index2 h2 {
    height: 40px;
    color: #fff;
    line-height: 40px;
    background: url(../../assets/img/wenda.png) no-repeat left center;
    padding-left: 30px;
    font-size: 16px;
}

.h2_index2 a {
    display: block;
    height: 40px;
    line-height: 40px;
    float: right;
    width: 40px;
    background: url(../../assets/img/refres.png) no-repeat center center;
    text-indent: -999rem
}

.need_dealt {
    margin-top: 20px;
    height: 444px;
    -webkit-box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    -moz-box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    background: #fff;
    border-radius: 10px
}

.h2_index3 {
    padding: 0 10px 0 20px;
    height: 40px;
    border-bottom: 2px solid #ffae00;
}

.h2_index3 h2 {
    height: 40px;
    color: #ffae00;
    line-height: 40px;
    background: url(../../assets/img/daiban.png) no-repeat left center;
    padding-left: 30px;
    font-size: 16px;
}

.h2_index3 a {
    display: block;
    height: 40px;
    line-height: 40px;
    float: right;
    width: 40px;
    background: url(../../assets/img/refres2.png) no-repeat center center;
    text-indent: -999rem
}

.need_dealt .list {
    height: 400px;
    padding: 10px;
    overflow-y: auto
}

.need_dealt .list li {
    height: 52px;
    border: #e6e7eb 1px solid;
    border-radius: 5px;
    border-left: 5px solid #1dc499;
    margin-top: 10px;
}

.need_dealt .list li.over {
    border-left: 5px solid #dfdfdf;
    background: #fafafb;
    color: #999
}

.need_dealt .list li p {
    height: 52px;
    line-height: 52px;
    float: left;
    padding-left: 20px;
    overflow: hidden;
}

.need_dealt .list li p:nth-child(1) {
    width: 160px;
    font-size: 14px;
}

.need_dealt .list li p:nth-child(2) {
    width: 420px;
}

.need_dealt .list li p:nth-child(3) {
    width: 200px;
}

.need_dealt .list li p:nth-child(4) {
    width: 130px;
    padding-left: 40px;
    float: right;
    background: url(../../assets/img/time.png) no-repeat 10px center;
}

.need_dealt .list li.over p:nth-child(4) {
    width: 130px;
    padding-left: 40px;
    float: right;
    background: url(../../assets/img/timeover.png) no-repeat 10px center;
}

.need_dealt .list li p button {
    height: 30px;
    width: 80px;
    border: none;
    margin: 11px 0 0 5px;
    background: none;
    padding: 0 10px;
    line-height: 30px;
    border-radius: 15px;
}

.need_dealt .list li p button.agree {
    color: #1dc499;
    border: 1px solid #1dc499;
}

.need_dealt .list li p button.disagree {
    color: #ffae00;
    border: 1px solid #ffae00;
}

.threestep_con h2 {
    margin: 20px auto;
    background: url(../../assets/img/c_ok.png) no-repeat 115px center;
    padding-left: 60px;
    color: #19ab85;
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-size: 20px
}


/*更换主管医生审核提交*/

.changeinfo {
    background: #1dc499;
    padding-bottom: 20px;
}

.changeinfo .changeinfo_head {
    color: #fff;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    width: 100%;
    text-align: center;
}

.changeinfo .changeinfo_head span {
    padding-right: 20px
}

.changeinfo_con {
    background: #fff;
    border-radius: 20px;
    width: 460px;
    min-height: 218px;
    margin: 0 auto;
    padding: 20px;
    border: 3px solid #eeeeee
}

.changeinfo_con p {
    display: inline-block;
    color: #999999;
    font-size: 12px;
}

.changeinfo_con .content1 {
    padding-left: 20px
}

.changeinfo_con .content1 p:nth-child(1) {
    margin: 0 10px 10px 0
}

.changeinfo_con .content1 p:nth-child(2) {
    width: 200px
}

.changeinfo_con .content1 p span {
    color: #19ab85;
    font-size: 14px;
    margin-right: 10px
}

.changeinfo_con .content2 {
    padding-left: 18px
}

.changeinfo_con .content2 p {
    width: 150px;
    color: #333333;
    text-align: center;
}

.changeinfo_con .content2 p:nth-child(2) {
    width: 70px;
    color: #999999;
}

.changeinfo_con .content2 img {
    display: block;
    margin: 0 auto 10px;
}

.changeinfo_con .content2 p:nth-child(2) img {
    display: block;
    margin: 0 auto 30px;
}

.changeinfo_con .content2 p span {
    margin-right: 10px
}

.changeinfo_con .content3 {
    margin-top: 20px;
    color: #999;
    font-size: 12px;
    padding-left: 20px;
    width: 400px;
    word-wrap: break-word
}

.changeinfo_con .content3 span {
    float: left;
}

.tbline {
    height: 60px;
    padding-top: 20px
}

.selectnoticepeople ul {
    width: 100%;
    margin: 0 auto;
}

.selectnoticepeople ul li {
    padding: 10px 0 10px;
    width: 130px;
    height: 170px;
    float: left;
    margin-left: 10px;
    border-radius: 10px;
    border: 2px solid #4796f2;
    position: relative;
}
.selectnoticepeople ul li:hover{
    cursor: pointer;
}
.selectnoticepeople ul li .righttip {
    position: absolute;
    width: 34px;
    height: 34px;
    background: url(../../assets/img/tipbg1.jpg) no-repeat center center;
    top: 0;
    right: 0;
}

.selectnoticepeople ul li.noselect {
    border: 2px solid #979797;
    position: relative;
}

.selectnoticepeople ul li .righttip2 {
    background: url(../../assets/img/tipbg2.jpg) no-repeat center center;
}

.selectnoticepeople ul li p {
    line-height: 30px;
    height: 30px;
    text-align: center;
}

.selectnoticepeople ul li img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: block;
    margin: 15px auto;
}

.selectnoticepeople ul li p:nth-child(2) {
    color: #1dc499
}

.selectnoticepeople ul li p:nth-child(2) span {
    color: #A9A9A9
}

.selectnoticepeople ul li p.iphone {
    background: url(../../assets/img/iphone.png) no-repeat 10px center;
    padding-left: 20px;
}
</style>
