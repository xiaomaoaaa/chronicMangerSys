<template>
    <div class="index clearafter">
        <module-head></module-head>
        <div class="content cbafter">
            <div class="w220 fl">
                <menu-list></menu-list>
            </div>
            <div class="w980 fr">
                <div class="h1_tit">
                    <h1>会员会费维护</h1>
                </div>
                <!--会员会费维护-->
                <div class="vip-maintain">
                    <!--会员类型-->
                    <div class="vip-type">
                        <ul>
                            <li v-for="item in memberTypelist" @click="tabmemberType(item,$event)" :class="{'vip-bg':$index==0}">{{item.memberName}}</li>
                        </ul>
                        <div class="add-vip-type" @click="addmembertype">+ 新增会员类型</div>
                    </div>
                    <!--会员卡信息概况-->
                    <div class="vip-info">
                        <form class="form-horizontal" role="form" id="vipTypePre" v-on:submit.prevent="savemembertype" disabled>
                            <!--保存-常见服务-->
                            <div class="editAndServer text-right ">
                                <div class="btn-group">
                                    <button type="submit" class="btn btn-default" v-show="memberTypeinfo.lookdata.issave"><span class="glyphicon glyphicon-floppy-disk font12"></span>保存</button>
                                    <button type="button" class="btn btn-default" v-show="!memberTypeinfo.lookdata.issave" @click="inputabled"><span class="glyphicon glyphicon-pencil font12"></span>编辑</button>
                                    <button type="button" class="btn btn-default" @click="showcomservice" v-if="isaddoredit">常见服务</button>
                                </div>
                            </div>
                            <!--会员类型-->
                            <div class="vipTypePre">
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">会员类型:<span class="start">*</span> </label>
                                    <div class="col-md-5">
                                        <input type="text" class="form-control" v-model="memberTypeinfo.subdata.memberType.memberName" :disabled="!memberTypeinfo.lookdata.issave" required maxlength="6" />
                                    </div>
                                    <div class="col-md-3">
                                        <label class="checkbox-inline">
                                            <input type="checkbox" v-model="memberTypeinfo.subdata.memberType.permanentBoolean" :disabled="!memberTypeinfo.lookdata.issave"> 期效控制
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group" v-show="memberTypeinfo.subdata.memberType.permanentBoolean">
                                    <label for="" class="col-md-3 control-label">会员到期提醒:<span class="start">*</span> </label>
                                    <div class="col-md-4 psr" v-for="item in memberTypeinfo.subdata.memberExpirationreminderList">
                                        <!-- <input type="hidden" v-model="item.expirationReminderId"/> -->
                                        <input type="number" class="form-control" placeholder="" v-model="item.daysAhead" :disabled="!memberTypeinfo.lookdata.issave" :required="memberTypeinfo.subdata.memberType.permanentBoolean" oninput="if(value.length>3)value=value.slice(0,3)" />
                                        <div class="psa cursor" v-if="$index>0" @click="deldaysAhead($index)">x</div>
                                        <div class="psa psa2"><span>到期前</span></div>
                                        <div class="psa psa2 psa3"><span>天提醒</span></div>
                                    </div>
                                    <div class="col-md-1" v-show="isshowaddbtn">
                                        <span class="btn-add2 glyphicon glyphicon-plus-sign" @click="adddaysAhead"></span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">会费类型及金额:<span class="start">*</span></label>
                                    <div class="col-md-4">
                                        <input type="text" class="form-control" placeholder="请输入费用名称" v-model="memberTypeinfo.subdata.memberType.duesName" :disabled="!memberTypeinfo.lookdata.issave" maxlength="8" required>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" placeholder="请输入费用金额" :disabled="!memberTypeinfo.lookdata.issave" required @blur="amount" v-model="memberTypeinfo.subdata.memberPriceType.dues" name="dues" maxlength="11" />
                                    </div>
                                    <div class="col-md-1 lh34">
                                        元
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label"> </label>
                                    <div class="col-md-4">
                                        <input type="text" class="form-control" placeholder="请输入费用名称" v-model="memberTypeinfo.subdata.memberType.prepaymentName" :disabled="!memberTypeinfo.lookdata.issave" maxlength="8">
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" placeholder="请输入费用金额" :disabled="!memberTypeinfo.lookdata.issave" maxlength="11" @blur="amount" v-model="memberTypeinfo.subdata.memberPriceType.prepayment" name="prepayment" />
                                    </div>
                                    <div class="col-md-1 lh34">
                                        元
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">会费说明: </label>
                                    <div class="col-md-8">
                                        <textarea class="form-control" rows="3" v-model="memberTypeinfo.subdata.memberType.duesExplain" :disabled="!memberTypeinfo.lookdata.issave" maxlength="255">
                                        </textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">特有功能: </label>
                                    <div class="col-md-8">
                                        <label class="checkbox-inline" v-for="item in memberTypeinfo.lookdata.memberSpecialfunctionList">
                                            <input type="checkbox" name="specialFunction" v-model="memberTypeinfo.subdata.memberSpecialfunctionList" value="{{item.key}}" :disabled="!memberTypeinfo.lookdata.issave" />{{item.text}}
                                        </label>
                                        <!--  <label class="checkbox-inline">
                                            <input type="checkbox" id="inlineCheckbox1" value="option1"> 健康服务就诊安排
                                        </label>
                                        <label class="checkbox-inline">
                                            <input type="checkbox" id="inlineCheckbox1" value="option1"> 健康顾问图文咨询
                                        </label> -->
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">入会须知: </label>
                                    <div class="col-md-8">
                                        <!--  <textarea class="form-control" rows="3"  disabled v-show="!memberTypeinfo.lookdata.issave" maxlength="2000" id="summernoteNoticecon">
                                        </textarea> -->
                                        <div id="summernoteNoticecon" v-show="!memberTypeinfo.lookdata.issave"></div>
                                        <div id="summernoteNotice" class="summernote"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">服务协议: </label>
                                    <div class="col-md-8">
                                        <div id="summernoteAgreementcon" v-show="!memberTypeinfo.lookdata.issave"></div>
                                        <div id="summernoteAgreement" class="summernote"></div>
                                        <!-- <textarea class="form-control" rows="3" id="summernoteAgreementcon" disabled v-show="!memberTypeinfo.lookdata.issave" maxlength="2000">

                

                                        </textarea> -->
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!--常见服务弹出框-->
                    <!--模态框-->
                    <form class="form-horizontal" role="form" id="vipTypePre" v-on:submit.prevent="saveaddcomservice">
                        <div class="modal fade bs-example-modal-md" id="myModal-commonServer" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-md">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        <h4 class="modal-title" id="myModalLabel">{{memberName}}</h4>
                                    </div>
                                    <div class="modal-body">
                                        <!--所有服务-->
                                        <div class="serverAll">
                                            <h2>所有服务</h2>
                                            <div class="serverAllConcent">
                                                <span v-for="item in comservice.allcomservicelist" @click="selectedoneser(item)" :class="{'serverAllSelected':item.isserselected}">{{item.serviceName}}</span>
                                            </div>
                                        </div>
                                        <!--添加删除-->
                                        <div class="add-or-delete">
                                            <span class="addServer" @click="addselectedser">添加&gt;&gt;</span>
                                            <!-- <span class="delServer">删除&lt;&lt;</span> -->
                                        </div>
                                        <!--已添加服务-->
                                        <div class="alreadyAdd">
                                            <h2>已添加服务</h2>
                                            <div class="serverAllConcent">
                                                <ul>
                                                    <li class="alreadyItem" v-for="item in comservice.addserlist">
                                                        <span class="coverCheckbox" :class="{'unCheckbox':item.mainInterfaceView=='0'}" @click="isIndexShow($index,item)">{{item.serviceName}}</span>
                                                        <span class="glyphicon glyphicon-arrow-up" :class="{'unmove':$index==0}" @click="gohead($index,item)"></span>
                                                        <span class="glyphicon glyphicon-arrow-down" :class="{'unmove':$index==(comservice.addserlist.length-1)}" @click="gonext($index,item)"></span>
                                                        <span class="glyphicon glyphicon-trash" @click="deleoneser(item)"></span>
                                                    </li>
                                                </ul>
                                                <div class="isIndexShow">
                                                    <span class="coverCheckbox">是否在首页显示</span><span class="coverCheckbox2">首页显示最多只能选6个</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer savebtn">
                                        <button type="submit" class="default ok center">保 存</button>
                                    </div>
                                </div>
                                <!-- /.modal-content -->
                            </div>
                            <!-- /.modal -->
                        </div>
                    </form>
                    <!--常见服务弹出框-->
                    <!--会员卡信息概况-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import 'assets/lib/bootstrap-3.3.2/css/bootstrap.min.css'
import 'assets/lib/bootstrap-3.3.2/js/bootstrap.min.js'
import 'assets/reset.css'
import 'assets/lib/bootstrap-summernote/summernote.css'
import Public from 'assets/public.js'
import moduleHead from 'components/module-head'
import menuList from 'components/menu-list'
require('summernote')
export default {
    data() {
            return {
                memberType: "",
                memberName: "",
                isaddoredit: "",
                memberTypelist: [],
                memberTypeinfo: {
                    subdata: {
                        "memberType": {
                            "memberType": 0,
                            "memberName": "",
                            "memberNotice": "",
                            "serviceAgreement": "",
                            "permanentBoolean": false,
                            "duesName": "",
                            "prepaymentName": "",
                            "duesExplain": ""
                        },
                        "memberPriceType": {
                            "memberPriceType": 0,
                            "dues": "",
                            "prepayment": ""
                        },
                        "memberExpirationreminderList": [],
                        "memberSpecialfunctionList": []
                    },
                    lookdata: {
                        memberSpecialfunctionList: [],
                        issave: false,
                    },
                },
                comservice: {
                    allcomservicelist: [],
                    slectedcomservicelist: [],
                    addserlist: [],
                },
            }
        },
        computed: {
            'isshowaddbtn': function() {
                if (this.memberTypeinfo.subdata.memberExpirationreminderList.length < 2) {
                    return true
                }
            },
        },
        components: {
            moduleHead, menuList

        },
        ready() {
            var that = this;

            // 查询会员类型列表
            this.getTypeList();
            // 获取字典
            $.when(Public.commonajax("coms.multipleDictionaryService", "findDic", "[['base.dictionary.base_specialFunction']]"))
                .done(function(res) {
                    if (res.code == 200) {
                        // var data = res.body[0].items;
                        that.memberTypeinfo.lookdata.memberSpecialfunctionList = res.body[0].items;
                    }

                })
        },
        methods: {
            // 查询会员类型列表
            getTypeList() {
                    var that = this;
                    $.when(Public.commonajax("coms.memberTypeService", "getMemberTypeList", "[[]]"))
                        .done(function(res) {
                            that.memberTypelist = res.body;
                            // 默认初始化第一条数据
                            that.tabmemberType(res.body[0])

                        });
                },
                // 阻止小数点只能保留两位
                amount(event) {
                    var th = event.target;
                    var regStrs = [
                        // ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
                        // ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
                        ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
                        ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
                    ];
                    for (var i = 0; i < regStrs.length; i++) {
                        var reg = new RegExp(regStrs[i][0]);
                        th.value = th.value.replace(reg, regStrs[i][1]);
                    }
                    if (this.memberTypeinfo.subdata.memberPriceType.prepayment) {
                        this.memberTypeinfo.subdata.memberPriceType.prepayment = parseFloat(this.memberTypeinfo.subdata.memberPriceType.prepayment).toFixed(2)
                    } else {
                        this.memberTypeinfo.subdata.memberPriceType.prepayment = 0
                    }
                    if (this.memberTypeinfo.subdata.memberPriceType.dues) {
                        this.memberTypeinfo.subdata.memberPriceType.dues = parseFloat(this.memberTypeinfo.subdata.memberPriceType.dues).toFixed(2)
                    } else {
                        this.memberTypeinfo.subdata.memberPriceType.dues = 0
                    }

                },
                // tab点击编辑会员信息
                tabmemberType(item, event) {
                    var that = this;
                    // $('#summernoteNotice').summernote('destroy');
                    $('#summernoteNotice').summernote('destroy');
                    $('#summernoteNotice').hide();
                    $('#summernoteAgreement').summernote('destroy');
                    $('#summernoteAgreement').hide();
                    this.isaddoredit = true;
                    that.memberTypeinfo.lookdata.issave = false;
                    if (event) {
                        $(event.target).addClass('vip-bg').siblings('li').removeClass('vip-bg');
                    };
                    that.memberType = item.memberType;
                    that.memberName = item.memberName;
                    //  else {
                    //     // 点击tab中的会员类型
                    //     item = this.memberTypelist[0]
                    // }
                    $.when(Public.commonajax("coms.memberService", "getMemberTypeDetailByMemberType", "[" + item.memberType + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                var data = res.body;

                                that.memberTypeinfo.subdata = {
                                    "memberType": {
                                        "memberType": data.memberType.memberType,
                                        "memberName": data.memberType.memberName,
                                        "memberNotice": data.memberType.memberNotice,
                                        "serviceAgreement": data.memberType.serviceAgreement,
                                        "permanentBoolean": data.memberType.permanentBoolean,
                                        "duesName": data.memberType.duesName,
                                        "prepaymentName": data.memberType.prepaymentName,
                                        "duesExplain": data.memberType.duesExplain
                                    },
                                    "memberPriceType": {
                                        "memberPriceType": data.memberPriceType.memberPriceType,
                                        "dues": data.memberPriceType.dues,
                                        "prepayment": data.memberPriceType.prepayment
                                    },
                                    "memberExpirationreminderList": data.memberExpirationreminderList ? data.memberExpirationreminderList : [],
                                    "memberSpecialfunctionList": data.memberSpecialfunctionList ? data.memberSpecialfunctionList : []
                                };
                                $('#summernoteAgreementcon').html(that.memberTypeinfo.subdata.memberType.serviceAgreement);
                                $('#summernoteNoticecon').html(that.memberTypeinfo.subdata.memberType.memberNotice);
                                if (that.memberTypeinfo.subdata.memberExpirationreminderList.length == 0) {
                                    var temobj = {
                                        "daysAhead": "",
                                        "expirationReminderId": 0
                                    };
                                    that.memberTypeinfo.subdata.memberExpirationreminderList.push(temobj)
                                }

                                // if(that.memberTypeinfo.subdata.memberSpecialfunctionList.length==0){

                                // }

                            }
                        });


                },
                // 点击新增会员类型
                addmembertype() {
                    var that = this;
                    this.isaddoredit = false;
                    this.memberTypeinfo.lookdata.issave = true;
                    // 清空数据
                    this.memberTypeinfo.subdata = {
                        "memberType": {
                            "memberType": 0,
                            "memberName": "",
                            "memberNotice": "",
                            "serviceAgreement": "",
                            "permanentBoolean": false,
                            "duesName": "",
                            "prepaymentName": "",
                            "duesExplain": ""
                        },
                        "memberPriceType": {
                            "memberPriceType": 0,
                            "dues": "",
                            "prepayment": ""
                        },
                        "memberExpirationreminderList": [],
                        "memberSpecialfunctionList": []
                    };
                    var temobj = {
                        "daysAhead": "",
                        "expirationReminderId": 0
                    };

                    this.memberTypeinfo.subdata.memberExpirationreminderList.push(temobj);
                    $('#summernoteNotice').summernote({
                        height: 300,
                        lang: 'zh-CN'
                    });
                    $('#summernoteAgreement').summernote({
                        height: 300,
                        lang: 'zh-CN'
                    });
                    $('#summernoteNotice').summernote('code', that.memberTypeinfo.subdata.memberType.memberNotice);
                    $('#summernoteAgreement').summernote('code', that.memberTypeinfo.subdata.memberType.serviceAgreement);

                },
                // 保存会员类型
                savemembertype() {
                    var that = this;
                    // that.memberTypeinfo.subdata.memberPriceType.prepayment = parseFloat(that.memberTypeinfo.subdata.memberPriceType.prepayment).toFixed(2)
                    // that.memberTypeinfo.subdata.memberPriceType.dues = parseFloat(that.memberTypeinfo.subdata.memberPriceType.dues).toFixed(2)
                    var prepayment = parseFloat(that.memberTypeinfo.subdata.memberPriceType.prepayment),
                        dues = parseFloat(that.memberTypeinfo.subdata.memberPriceType.dues);

                    if (!that.memberTypeinfo.subdata.memberType.permanentBoolean) {
                        that.memberTypeinfo.subdata.memberExpirationreminderList = [];
                    };
                    if ((prepayment >= 0 && prepayment <= 99999999.99) && dues >= 0 && dues <= 99999999.99) {
                        that.memberTypeinfo.subdata.memberType.memberNotice = $('#summernoteNotice').summernote('code');
                        that.memberTypeinfo.subdata.memberType.serviceAgreement = $('#summernoteAgreement').summernote('code');
                        $.when(Public.commonajax("coms.memberService", "saveMemberType", "[" + JSON.stringify(that.memberTypeinfo.subdata) + "]"))
                            .done(function(res) {
                                if (res.code == 200) {
                                    // console.log(res)
                                    that.memberTypeinfo.lookdata.issave = false;
                                    that.memberTypeinfo.subdata = res.body;
                                    that.getTypeList();
                                    if (that.memberTypeinfo.subdata.memberExpirationreminderList.length == 0) {
                                        var temobj = {
                                            "daysAhead": "",
                                            "expirationReminderId": 0
                                        };
                                        that.memberTypeinfo.subdata.memberExpirationreminderList.push(temobj)
                                    }
                                } else {
                                    alert(res.msg)
                                }
                            });
                    } else {
                        // console.log(that.memberTypeinfo.subdata)
                        Public.ajaxPrompt("金额请输入0到99999999.99之间的数字");

                    }
                },
                // 新增一条会员到期提醒
                adddaysAhead() {
                    var temobj = {
                        "daysAhead": "",
                        "expirationReminderId": 0
                    };
                    this.memberTypeinfo.subdata.memberExpirationreminderList.push(temobj)
                },
                //删除一条会员到期提醒
                deldaysAhead(index) {
                    this.memberTypeinfo.subdata.memberExpirationreminderList.splice(index, 1)
                },
                //改变表单可编辑
                inputabled() {
                    var that = this;
                    this.memberTypeinfo.lookdata.issave = !this.memberTypeinfo.lookdata.issave;
                    $('#summernoteNotice').summernote({
                        height: 300,
                        lang: 'zh-CN'
                    });
                    $('#summernoteAgreement').summernote({
                        height: 300,
                        lang: 'zh-CN'
                    });
                    $('#summernoteNotice').summernote('code', that.memberTypeinfo.subdata.memberType.memberNotice);
                    $('#summernoteAgreement').summernote('code', that.memberTypeinfo.subdata.memberType.serviceAgreement);

                },
                // 常见服务弹出框
                showcomservice() {
                    var that = this;
                    $("#myModal-commonServer").modal("show");
                    // 获取指定会员类型的全部常见服务
                    $.when(Public.commonajax("base.baseServiceService", "list", "[[]]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                $.each(res.body, function(index, el) {
                                    el.isserselected = false;
                                });
                                that.comservice.allcomservicelist = res.body;

                            } else {
                                alert(res.msg)
                            }
                        });
                    // 获取指定会员类型的添加常见服务
                    console.log(that.isaddoredit);
                    if (that.isaddoredit) {
                        $.when(Public.commonajax("coms.serverService", "getMemberServerDetailByType", "[" + that.memberType + "]"))
                            .done(function(res) {
                                if (res.code == 200) {
                                    that.comservice.addserlist = res.body;
                                } else {
                                    alert(res.msg)
                                }
                            });
                    } else {
                        that.comservice.addserlist = [];
                    }
                },
                // 点击所有服务中的没的服务
                selectedoneser(item) {
                    item.isserselected = !item.isserselected
                },
                // 点击添加
                addselectedser() {
                    var that = this;
                    // that.comservice.slectedcomservicelist=[];
                    var temlist = this.comservice.allcomservicelist.filter(function(item) {
                        return item.isserselected == true
                    });
                    // 当点击添加的时候一个都没添加的时候提示
                    var count = 0;
                    $.each(temlist, function(index, el) {
                        $.each(that.comservice.addserlist, function(index2, el2) {
                            if (el.serviceId == el2.serviceId) {
                                count++
                            }
                        });
                    });
                    console.log(count);
                    if (count == 0) {
                        that.comservice.addserlist = that.comservice.addserlist.concat(temlist);
                        // 去重和取有用的字段
                        var temlist2 = [];
                        $.each(that.comservice.addserlist, function(index, el) {
                            var {
                                serviceId, mainInterfaceView, serviceName
                            } = el;
                            var temobj = {
                                serviceId: serviceId,
                                mainInterfaceView: mainInterfaceView == "1" ? '1' : '0',
                                serviceName: serviceName,
                            };
                            temlist2.push(temobj);
                        });

                        that.comservice.addserlist = Public.arrunique(temlist2, 'serviceId');
                    } else {
                        Public.ajaxPrompt("你选的服务有" + count + "个已经添加过了")
                    }

                },
                isIndexShow(index, item) {
                    this.comservice.addserlist.$set(index, {
                        serviceId: item.serviceId,
                        mainInterfaceView: item.mainInterfaceView == "1" ? "0" : "1",
                        serviceName: item.serviceName,
                    });
                },
                // 上移
                gohead(index, item) {
                    if (index == 0) {
                        return
                    } else {
                        this.comservice.addserlist.$remove(item);
                        this.comservice.addserlist.splice(index - 1, 0, item);
                    }
                },
                // 下移
                gonext(index, item) {
                    if (index == this.comservice.addserlist.length - 1) {
                        return
                    } else {
                        this.comservice.addserlist.$remove(item);
                        this.comservice.addserlist.splice(index + 1, 0, item);
                    }

                },
                //删除普通服务
                deleoneser(item) {
                    this.comservice.addserlist.$remove(item);
                    $.when(Public.commonajax("coms.serverService", "delteMemberServer", "[" + item.memberType + ",'" + item.serviceId + "']"))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("删除成功")
                            }

                        });
                },
                //保存普通服务
                saveaddcomservice() {
                    var temlist = this.comservice.addserlist.filter(function(item) {
                        return item.mainInterfaceView == "1"
                    });
                    if (temlist.length > 6) {
                        Public.ajaxPrompt("首页显示最多6个")
                    } else {
                        var temobj = {
                            memberType: this.memberType,
                            memberServerList: this.comservice.addserlist
                        };
                        $.when(Public.commonajax("coms.serverService", "saveMemberServer", "[" + JSON.stringify(temobj) + "]"))
                            .done(function(res) {
                                if (res.code == 200) {
                                    Public.ajaxPrompt("保存成功")
                                }

                            });
                    }
                },


        },
        events: {

        },
        watch: {

        }
}
</script>
<style scoped>
/*会员会费维护*/

.vip-maintain {
    width: 950px;
    min-height: 644px;
    height: auto!important;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    padding-top: 49px;
    background-color: #fafafa;
}

.vip-maintain .vip-type,
.vip-info {
    float: left;
    min-height: 593px;
    position: relative;
}


/*会员卡类型*/

.vip-maintain .vip-type {
    background: #f4f4f4 url(../../assets/img/vip-bg.png) no-repeat right bottom;
    width: 249px;
    border-radius: 0 0 0 10px;
}

.vip-type ul {
    height: auto!important;
    border-bottom: 1px solid #e2e2e2;
}

.vip-type ul li {
    margin: 15px 0 15px 30px;
    width: 230px;
    height: 59px;
    line-height: 59px;
    text-align: center;
    border-radius: 50px 0 0 50px;
}

.vip-type ul li:hover {
    cursor: pointer;
}

.vip-bg {
    background: url(../../assets/img/vip-cart-bg.png) no-repeat right;
    background-size: cover;
}

.vip-type .add-vip-type {
    width: 229px;
    height: 42px;
    border-radius: 16px;
    border: 2px solid #1dc498;
    line-height: 42px;
    text-align: center;
    margin: 17px auto;
    color: #1dc498;
    cursor: pointer;
}


/*会员卡信息*/

.vip-maintain .vip-info {
    width: 699px;
    border-radius: 0 0 10px 0;
    background: #fff;
}

.vip-info .editAndServer {
    height: 82px;
    padding: 20px
}

.vip-info .vip-item1,

/*常见服务弹出框*/

#myModal-commonServer .modal-body {
    width: 555px;
    margin: 0 auto;
    min-height: 464px;
    height: auto!important;
    padding: 15px 5px;
}

#myModal-commonServer .modal-body h2 {
    font-size: 16px;
    line-height: 16px;
    color: #1DC499;
    text-align: center;
    margin-bottom: 15px;
}

#myModal-commonServer .modal-body .serverAll,
.add-or-delete,
.alreadyAdd {
    min-height: 300px;
    float: left;
}

#myModal-commonServer .modal-body .serverAllConcent {
    border-radius: 10px;
    border: 1px solid #BCC4C7;
    height: 400px;
    padding: 10px;
    position: relative;
    overflow: auto;
}


/*所有服务*/

#myModal-commonServer .modal-body .serverAll {
    width: 235px;
}

#myModal-commonServer .modal-body .serverAll .serverAllConcent span {
    float: left;
    width: 85px;
    /*   height: 28px;*/
    line-height: 20px;
    text-align: center;
    margin: 5px;
    border-radius: 10px;
    cursor: pointer;
}


/*所有服务点击时添加的类样式*/

.serverAllSelected {
    background-color: #fcbb5d;
    color: #fff;
    padding: 0 10px
}


/*添加删除服务*/

#myModal-commonServer .modal-body .add-or-delete {
    width: 73px;
    margin: 30px 10px 0;
    text-align: center;
    border: 0;
}

#myModal-commonServer .modal-body .add-or-delete .addServer,
.delServer {
    display: inline-block;
    width: 73px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
}

#myModal-commonServer .modal-body .add-or-delete .addServer {
    margin: 133px 0 27px;
    background-color: #1dc499;
}

#myModal-commonServer .modal-body .add-or-delete .delServer {
    background-color: #9a9b9f;
}


/*已添加服务*/

#myModal-commonServer .modal-body .alreadyAdd {
    width: 215px;
    position: relative;
}

#myModal-commonServer .modal-body .alreadyAdd .alreadyItem {
    height: 33px;
    line-height: 33px;
    margin-bottom: 10px;
}

.alreadyItem .coverCheckbox {
    width: 110px;
    height: 30px;
    background: url(../../assets/img/checked.png) no-repeat left;
    background-size: auto 67%;
    float: left;
    cursor: pointer;
    line-height: 20px;
    padding-left: 30px;
}

.alreadyItem .unCheckbox {
    background: url(../../assets/img/checkbox_bg.png) no-repeat left;
}

.glyphicon-arrow-up,
.glyphicon-arrow-down {
    color: #1dc499;
    cursor: pointer;
}

.glyphicon-arrow-up.unmove,
.glyphicon-arrow-down.unmove {
    cursor: default;
    color: #ccc;
}

.glyphicon-trash {
    color: #C43C3C;
    cursor: pointer;
}

#myModal-commonServer .modal-body .alreadyAdd .isIndexShow {
    width: 100%;
    height: 37px;
    line-height: 37px;
    background-color: #f8f6f7;
    position: fixed;
    bottom: 0;
    left: 0;
    border-radius: 0 0 10px 10px;
}

#myModal-commonServer .modal-body .alreadyAdd .isIndexShow .coverCheckbox {
    float: left;
    width: 50%;
    height: 37px;
    background: url(../../assets/img/checked.png) no-repeat 5px center;
    background-size: auto 50%;
    padding-left: 30px;
    line-height: 37px
}

#myModal-commonServer .modal-body .alreadyAdd .isIndexShow .coverCheckbox2 {
    float: right;
    color: #1DC499;
    width: 50%;
    text-align: right;
    padding-right: 2%
}

#myModal-commonServer .modal-body .alreadyAdd .isIndexShow .coverCheckbox + label {
    float: left;
}

.btn-add2 {
    color: #4cae4c;
    display: inline-block;
    font-size: 20px;
    padding: 5px 30px 0
}

.btn-add2:hover {
    cursor: pointer;
}

.psr {
    position: relative;
}

.psr input {
    padding-left: 80px
}

.psa {
    position: absolute;
    top: 0px;
    right: 15px;
    color: #999;
    font-size: 16px;
    width: 16px;
    height: 34px;
    line-height: 34px;
}

.cursor:hover {
    cursor: pointer;
}

.psa2 {
    left: 27px;
    width: 42px;
    font-size: 14px;
}

.psa3 {
    left: 160px;
}

.font12 {
    font-size: 12px;
    margin-right: 5px;
}

.lh34 {
    line-height: 34px;
}

.alldisabled .form-control {
    border: none;
    box-shadow: none;
    border-bottom: 1px solid #ccc
}

.modal-footer {
    padding-bottom: 50px
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}

#summernoteNoticecon,
#summernoteAgreementcon {
    background-color: #eeeeee;
    border: 1px solid #CCCCCC;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    padding: 6px 12px;
}
</style>
