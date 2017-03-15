<template>
    <div class="index clearafter">
        <module-head></module-head>
        <div class="content cbafter">
            <div class="w220 fl">
                <menu-list></menu-list>
            </div>
            <div class="w980 fr">
                <div class="h1_tit">
                    <h1>会员入会</h1>
                    <div class="step" v-bind:class="{ 'step1': stepview=='one', 'step2': stepview=='two','step3': stepview=='three' }"></div>
                </div>
                <div class="service_add memberadd">
                    <div class="row">
                        <form class="form-horizontal" role="form" id="onestepform" name="onestepform" v-form @submit.prevent="gotwostep">
                            <div class="onestep" v-show="stepview=='one'">
                                <h3>会员基本信息</h3>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">国籍:<span class="start">*</span> </label>
                                    <div class="col-md-6">
                                        <select class="form-control" name="nationality" v-model="steponeformdata.person.nationality" required v-form-ctrl>
                                            <option v-for="item in dictionary.nationality" value="{{item.key}}">{{item.text}}</option>
                                        </select>
                                    </div>
                                    <!-- <div class="col-md-3 start" v-if="onestepform.certificateNo.$error.required">请选择国籍</div> -->
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">证件类型:<span class="start">*</span></label>
                                    <div class="col-md-6">
                                        <select class="form-control" name="certificateType" v-model="steponeformdata.person.certificate.certificateType" required v-form-ctrl :selected="$index==0" @change="getBrithday">
                                            <!--  <option>请选择证件类型</option> -->
                                            <option v-for="item in dictionary.certificateType" value="{{item.key}}">{{item.text}}</option>
                                        </select>
                                    </div>
                                    <!-- <div class="col-md-3 start" v-if="onestepform.certificateNo.$error.required">请选择证件类型</div> -->
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">证件号码 :<span class="start">*</span></label>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" required v-form-ctrl placeholder="请输入证件号码" name="certificateNo" v-model="steponeformdata.person.certificate.certificateNo" custom-validator="certificateNoValidator" @blur="getBrithday" maxlength="36">
                                    </div>
                                    <!-- <div class="col-md-3 start" v-if="onestepform.certificateNo.$error.required">请输入证件号码</div> -->
                                    <div class="col-md-3 start" v-if="onestepform.certificateNo.$invalid">请输入正确证件号码</div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">姓 名:<span class="start">*</span></label>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" id="" required v-form-ctrl placeholder="请输入姓名" name="personName" v-model="steponeformdata.person.personName" maxlength="30">
                                    </div>
                                    <div class="col-md-3 start" v-if="onestepform.personName.$error.required">请输入姓名</div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label">性 别:<span class="start">*</span></label>
                                    <div class="col-md-6">
                                        <div class="radio">
                                            <label class="checkbox-inline" v-for="item in dictionary.gender">
                                                <input type="radio" name="sex" id="" value="{{item.key}}" v-model="steponeformdata.person.sex" required v-form-ctrl>{{item.text}}
                                            </label>
                                        </div>
                                    </div>
                                    <!-- <div class="col-md-3 start" v-if="onestepform.sex.$error.required">请选择性别</div> -->
                                    <!--   <div class="col-md-3 start" v-if="onestepform.certificateNo.$error.required">请选择性别</div> -->
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">出生日期 :<span class="start">*</span></label>
                                    <div class="col-md-6">
                                        <input class="input form-control" size="50" type="text" v-model="steponeformdata.person.dob" placeholder="请选择出生日期" name="dob" required v-form-ctrl id="dob">
                                    </div>
                                    <div class="col-md-3 start" v-if="onestepform.dob.$error.required">请选择出生日期</div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">手机号码 :<span class="start">*</span></label>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" placeholder="请输入手机号码" name="phoneNo" v-model="steponeformdata.person.phoneNo" custom-validator="phoneNoValidator" v-form-ctrl required>
                                    </div>
                                    <div class="col-md-3 start" v-if="onestepform.phoneNo.$invalid">请输入正确手机号码</div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">健康卡号 :</label>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" id="" placeholder="请输入健康卡号" name="cardNo" v-model="steponeformdata.card.cardNo" maxlength="36">
                                    </div>
                                    <!--    <div class="col-md-3 start" v-if="onestepform.cardNo.$error.required">请输入健康卡号</div> -->
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">家庭住址 :</label>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" id="" placeholder="请输入家庭住址" name="address" v-model="steponeformdata.person.address" maxlength="100">
                                    </div>
                                    <!-- <div class="col-md-3 start" v-if="onestepform.address.$error.required">请输入家庭住址</div> -->
                                </div>
                                <div class="form-group">
                                    <div class="col-md-12">
                                        <button type="submit" class="default greynobg center" :disabled="isregisted">下一步</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <form class="form-horizontal" role="form" id="twostepform" @submit.prevent="gothreestep" name="twostepform">
                            <div class="twostep" v-show="stepview=='two'">
                                <h3>会员健康信息</h3>
                                <div class="twostep_1">
                                    <h4>健康信息</h4>
                                    <div class="form-group">
                                        <label for="" class="col-md-3 control-label">慢病种类: </label>
                                        <div class="col-md-6">
                                            <select class="form-control" name="chronic" v-model="chronicid" required>
                                                <option selected="" value="">请选择慢病种类</option>
                                                <option v-for="item in chronicsortlist" value="{{item.chronic}}">{{item.chronicText}}</option>
                                            </select>
                                        </div>
                                        <!--   <div class="col-md-3 start" v-if="twostepform.chronic.$error.required">请选择慢病种类</div> -->
                                    </div>
                                </div>
                                <div class="twostep_2" v-show="chronicid">
                                    <h4>监测目标</h4>
                                    <div class="form-group" v-for="item in steptwoformdata.patientpersonalindexList">
                                        <!--  <input type="hidden" name="indexId{{item.indexId}}" value="{{item.indexId}}" v-model="item.indexId"> -->
                                        <label for="" class="col-md-2 control-label">{{item.indexName}}:<span class="start">*</span></label>
                                        <div class="col-md-3">
                                            <input type="text" class="form-control" placeholder="上限" name="quantifyIndexNormalTop{{item.indexId}}" required value="{{item.quantifyIndexDangerTop}}" v-model="item.quantifyIndexNormalTop" maxlength="11" @blur="amount" disabled>
                                        </div>
                                        <div class="col-md-1">
                                            {{item.indexUnit}}
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" class="form-control" placeholder="下限" name="quantifyIndexNormalBottom{{item.indexId}}" required value="{{item.quantifyIndexDangerBottom}}" v-model="item.quantifyIndexNormalBottom" maxlength="11" @blur="amount" disabled>
                                        </div>
                                        <div class="col-md-1">
                                            {{item.indexUnit}}
                                        </div>
                                        <div class="col-md-2 start" v-if="parseFloat(item.quantifyIndexNormalBottom)>parseFloat(item.quantifyIndexNormalTop)">下限必须小于等于上限</div>
                                    </div>
                                </div>
                                <div class="twostep_3">
                                    <h4>生活习惯</h4>
                                    <div class="form-group" v-for="item in steptwoformdata.questionnaireresultdetailList" v-show="item.ishow">
                                        <div class="subjectContent" :class="{'bgblue':item.subjectAnswerType=='05'}" v-if="item.subjectAnswerType!='99'">{{item.xuhao+item.subjectContent}}</div>
                                        <!--  <input type="hidden" name="subjectId" value="{{item.subjectId}}" v-if="item.subjectAnswerType!='02'"> -->
                                        <div class="radio" v-for="itemsub in item.options" v-if="item.subjectAnswerType=='01'">
                                            <label @click="rdioisSelected(itemsub,item.options)">
                                                <input type="radio" name="{{'radio'+$parent.$index}}" value="{{itemsub.optionId}}" :checked="itemsub.selected"><span>{{itemsub.optionContent}}</span>
                                            </label>
                                        </div>
                                        <div class="checkbox" v-for="itemsub in item.options" v-if="item.subjectAnswerType=='02'">
                                            <label @click="checkboxisSelected(itemsub,item.options)">
                                                <input type="checkbox" value="" name="{{'checkbox'+$parent.$index}}" :checked="itemsub.selected"><span>{{itemsub.optionContent}}</span>
                                            </label>
                                        </div>
                                        <input v-if="item.subjectAnswerType=='03'" type="text" class="text" v-model="item.optionInputContent">
                                        <textarea v-if="item.subjectAnswerType=='04'" v-model="item.optionInputContent"></textarea>
                                        <!-- <div v-if="item.subjectAnswerType=='99'" class="fyf"></div> -->
                                    </div>
                                    <div class="form-group pagebreaks">
                                        <div class="col-md-12 ">
                                            <ul>
                                                <li v-for="item in pagetotlearr" @click="pageclick(item,$event)" :class="{activecur:$index==0}">{{$index+1}}</li>
                                            </ul>
                                            <span>总共{{pagetotlearr.length}}页</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="form-group" v-show="validatorNum==0">
                                <p class="start text-center">必须填写所有表单</p>
                            </div> -->
                                <div class="form-group">
                                    <div class="col-md-12">
                                        <!-- <button type="button" class="btn btn-default" @click="goonestep">上一步</button> -->
                                        <button type="submit" class="default greynobg center">下一步</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <form class="form-horizontal" role="form" id="threestepform">
                            <div class="threestep" v-show="stepview=='three'">
                                <h3>入会成功</h3>
                                <div class="threestep_con">
                                    <h4>恭喜您，入会成功！</h4>
                                    <div class="threestep_con_info">
                                        <div class="fl">
                                            <p><span>患者姓名：</span>{{successdata.person.personName}} ｜ {{personsex}} ｜ {{personage}}岁</p>
                                            <p><span>证件号码：</span>{{successdata.person.certificate.certificateNo}}</p>
                                            <!-- <p><span>健康卡号：</span>{{successdata.cardNo}}</p> -->
                                            <p><span>手机号码：</span>{{successdata.person.phoneNo}}</p>
                                            <p><span>主管医生：</span>{{successdata.doctorName}}</p>
                                        </div>
                                        <div class="fr">
                                            <p>会员可使用证件号码或手机号</p>
                                            <p>登录,如果未在居民APP上注册</p>
                                            <p>过,则初始密码为：<span>{{successdata.password}}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-3 col-md-offset-5">
                                        <a class="btn btn-default" href="index.html">完  成</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import 'assets/lib/bootstrap-3.3.2/css/bootstrap.min.css'
import 'assets/lib/laydate/laydate.js'
import 'assets/lib/laydate/need/laydate.css'
import 'assets/lib/laydate/skins/danlan/laydate.css'
import 'assets/reset.css'
import Public from 'assets/public.js'
import moduleHead from 'components/module-head'
import menuList from 'components/menu-list'
export default {
    data() {
            return {

                stepview: "one",
                // stepview: "two",
                dictionary: { //字典可添加
                    gender: [],
                    nationality: [],
                    certificateType: []
                },
                chronicsortlist: [], //慢病种类
                chronicid: "", //慢病ID 通过选取这个显示对应的监测目标
                question: [], //生活问卷
                isregisted: false, //该会员是否已经注册过了
                //------------------------ 备注------------------------------------
                //监测目标或者问卷获取的值如果是固定的，可以直接赋值给提交表单的参数对象无需绑定
                //监测目标或者问卷获取的列表不需要v-model绑定 通过点击提交按钮钱serializeArray来获取
                //固定的表单或者select可以用v-model绑定提交表单的参数对象，已经绑定的需要用watch来监听赋值具体可以看日历表单
                //------------------------ 备注结束------------------------------------
                steponeformdata: {
                    "person": {
                        "mpiId": "",
                        "personName": "",
                        "sex": "",
                        "dob": "",
                        "phoneNo": "",
                        "nationality": "",
                        "address": "",
                        "certificate": {
                            "certificateNo": "",
                            "certificateType": "",
                            "source": "01" //固定值

                        }
                    },
                    "card": {
                        "cardNo": "",
                        "cardType": "02", //固定值
                        "source": "01" //固定值
                    },
                    userId: "",
                },
                steptwoformdata: {
                    mpiId: "",
                    "chroniclevel": [],
                    "patientpersonalindexList": [],
                    "questionnaireresult": {
                        "questionnaireId": "",
                        "operaterType": "2" //固定值
                    },
                    "questionnaireresultdetailList": []
                },
                successdata: {
                    "cardNo": "",
                    "person": {
                        "mpiId": "",
                        "personName": "",
                        "sex": "",
                        "dob": "",
                        "phoneNo": "",
                        "nationality": "",
                        "income": 0,
                        "address": "",
                        "certificate": {
                            "source": "",
                            "certificateType": "",
                            "certificateNo": ""
                        }
                    },
                    "doctorName": "",
                    "password": ""
                },
                onestepform: { //表单验证用

                },
                twostepform: {},
                validMpiIdOpt: {
                    certificateType: '',
                    certificateNo: '',

                },
                // validatorNum:0
                pagetotlearr: [], //问卷分页符

            }
        },
        components: {
            moduleHead, menuList
        },
        computed: {
            personage: function() {
                var d = new Date();
                var year = d.getFullYear();
                var age = parseInt(year) - parseInt(this.steponeformdata.person.dob.substring(0, 4));
                return age
            },
            personsex: function() {
                var sex = "";
                if (this.successdata.person.sex == 1) {
                    sex = "男"
                }
                if (this.successdata.person.sex == 2) {
                    sex = "女"
                }
                if (this.successdata.person.sex == 0) {
                    sex = "未知的性别"
                }
                if (this.successdata.person.sex == 9) {
                    sex = "未说明的性别"
                }
                return sex
            }
        },
        ready() {
            var that = this;
            //日历插件
            laydate({
                elem: '#dob',
                max: laydate.now(),
                choose: function(datas) { //选择日期完毕的回调  
                    that.steponeformdata.person.dob = datas;
                }
            });
            // 获取字典
            $.when(Public.commonajax("coms.multipleDictionaryService", "findDic", "[['base.dictionary.base_nationality','base.dictionary.base_gender','base.dictionary.base_certificateType']]"))
                .done(function(data) {
                    var data = data.body;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].dicId.indexOf("gender") != -1) {
                            that.dictionary.gender = data[i].items;
                        }
                        if (data[i].dicId.indexOf("nationality") != -1) {
                            that.dictionary.nationality = data[i].items;
                            that.steponeformdata.person.nationality = data[i].items[0].key;
                        }
                        if (data[i].dicId.indexOf("certificateType") != -1) {
                            that.dictionary.certificateType = data[i].items;
                            that.steponeformdata.person.certificate.certificateType = data[i].items[0].key;
                        }
                    }

                })
                // 获取慢病种类
            $.when(Public.commonajax("coms.commonChronicService", "findCommonChronic", "[[]]"))
                .done(function(data) {
                    var data = data.body;
                    that.chronicsortlist = data;
                })
                // 获取生活习惯
            $.when(Public.commonajax("coms.questionnairedefService", "findQuestionnairesubjectdefByQuestionnaireId", "[0, '01', 1]"))
                .done(function(data) {
                    var data = data.body;
                    var xuhao = 0,
                        pagebreaksindexarr = [];
                    // data.list= [];
                    // 制作分页符数组pagebreaksindexarr（获得用于截取questionnaireresultdetailList数组分成几页的索引）以及隐藏描述题目和分页符题目的序号
                    $.each(data.list, function(index, el) {
                        if (el.subjectAnswerType == "99") {
                            pagebreaksindexarr.push(index);
                        }
                        if (el.subjectAnswerType == "05" || el.subjectAnswerType == "99") {
                            el.xuhao = ""
                        } else {
                            xuhao++;
                            el.xuhao = (xuhao) + "、"
                        }
                        el.ishow = false;
                    });
                    //头部添加索引0和尾部添加100是为了使用slice函数截取数组
                    pagebreaksindexarr.unshift(0);
                    pagebreaksindexarr.push(100);
                    // 有几个页面pagetotle
                    for (var i = 0; i < pagebreaksindexarr.length - 1; i++) {
                        var pagebreakstemobj = {
                            start: pagebreaksindexarr[i],
                            end: pagebreaksindexarr[i + 1],
                        };
                        that.pagetotlearr.push(pagebreakstemobj);
                    }
                    var question2 = data.list.slice(pagebreaksindexarr[0], pagebreaksindexarr[1]);
                    // 修改显示当前分页的数据的属性ishow
                    $.each(question2, function(index, el) {
                        el.ishow = true
                    });
                    // 然后再把data.list的对应的数据用修改了的数据替换掉
                    $.each(data.list, function(index, el) {
                        $.each(question2, function(index2, el2) {
                            if (el.subjectId == el2.subjectId) {
                                el = el2;
                            }
                        });
                    });
                    that.steptwoformdata.questionnaireresult.questionnaireId = data.questionnairedef.questionnaireId;
                    that.steptwoformdata.questionnaireresultdetailList = data.list
                        // console.log(that.question);
                })

        },
        methods: {
            // 验证身份证
            certificateNoValidator(value) {
                    if (this.steponeformdata.person.certificate.certificateType == "01") {
                        return this.IdentityCodeValid(value)
                    } else {
                        return true;
                    }
                },
                //身份证验证
                IdentityCodeValid(code) {
                    var city = {
                        11: "北京",
                        12: "天津",
                        13: "河北",
                        14: "山西",
                        15: "内蒙古",
                        21: "辽宁",
                        22: "吉林",
                        23: "黑龙江 ",
                        31: "上海",
                        32: "江苏",
                        33: "浙江",
                        34: "安徽",
                        35: "福建",
                        36: "江西",
                        37: "山东",
                        41: "河南",
                        42: "湖北 ",
                        43: "湖南",
                        44: "广东",
                        45: "广西",
                        46: "海南",
                        50: "重庆",
                        51: "四川",
                        52: "贵州",
                        53: "云南",
                        54: "西藏 ",
                        61: "陕西",
                        62: "甘肃",
                        63: "青海",
                        64: "宁夏",
                        65: "新疆",
                        71: "台湾",
                        81: "香港",
                        82: "澳门",
                        91: "国外 "
                    };
                    var tip = "";
                    var pass = true;

                    if (!code || !/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i.test(code)) {
                        tip = "身份证号格式错误";
                        pass = false;
                    } else if (!city[code.substr(0, 2)]) {
                        tip = "地址编码错误";
                        pass = false;
                    } else {
                        //18位身份证需要验证最后一位校验位
                        if (code.length == 18) {
                            code = code.split('');
                            //∑(ai×Wi)(mod 11)
                            //加权因子
                            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                            //校验位
                            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                            var sum = 0;
                            var ai = 0;
                            var wi = 0;
                            for (var i = 0; i < 17; i++) {
                                ai = code[i];
                                wi = factor[i];
                                sum += ai * wi;
                            }
                            var last = parity[sum % 11];
                            if (parity[sum % 11] != code[17]) {
                                tip = "校验位错误";
                                pass = false;
                            }
                        }
                    }
                    // if(!pass) alert(tip);
                    return pass;
                },
                // 验证手机
                phoneNoValidator(value) {
                    if (value.length > 0) {
                        if (value.length == 11) {
                            return /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(value);
                            // return true
                        } else {

                            return false;
                        }
                    } else {
                        return false;
                    }
                },
                // goonestep(){
                //    this.stepview="one"
                // }, 
                // 验证小数点只能保留两位
                amount(event) {
                    var th = event.target;
                    // console.log(th);
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
                },
                gotwostep() {
                    var that = this;
                    if (this.onestepform.$valid == true) {
                        // 提交会员基本信息
                        $.when(Public.commonajax("coms.personService", "saveSelfInfo", '[' + JSON.stringify(this.steponeformdata) + ']'))
                            .done(function(res) {
                                if (res.code == 200) {
                                    that.steptwoformdata.mpiId = res.body.mpiId;
                                    that.stepview = "two";
                                } else {
                                    // var msgidex=res.msg.indexOf(":");console.log(msgidex);
                                    // alert(res.msg.substring(msgidex+1));
                                    alert(res.msg);
                                }


                            })
                    } else {
                        alert("表单所有带*选项不能为空");
                        // console.log(this.onestepform.$error)
                    };

                },
                // 单选的选项是否被选中
                rdioisSelected(subitem, options) {
                    // console.log(subitem);
                    $.each(options, function(index, el) {
                        el.selected = false;
                    });
                    subitem.selected = true;
                    // console.log(options);
                },

                // 多选的选项是否被选中
                checkboxisSelected(subitem, options) {

                    subitem.selected = !subitem.selected;
                    // console.log(options)
                },
                gothreestep() {
                    var that = this;
                    console.log(that.steptwoformdata);
                    $.when(Public.commonajax("coms.commonChronicService", "addHealthInfo", '[' + JSON.stringify(this.steptwoformdata) + ']'))
                        .done(function(res) {
                            if (res.code == 200) {
                                that.successdata = res.body;
                                that.stepview = "three";
                                that.steptwoformdata.patientpersonalindexList = [];
                                that.steptwoformdata.questionnaireresultdetailList = [];
                                that.steptwoformdata.chroniclevel = [];
                            } else {
                                alert(res.msg);

                            }

                        })
                },
                getBrithday() {
                    var that = this;
                    that.isregisted = false;
                    if (this.steponeformdata.person.certificate.certificateType == "01") {
                        var temval = this.steponeformdata.person.certificate.certificateNo;
                        var tembrithday = Public.getBirthdatByIdNo(temval);
                        var temsex = Public.getSexByIdNo(temval);
                        this.steponeformdata.person.dob = tembrithday;
                        this.steponeformdata.person.sex = temsex;

                    }

                    if (this.onestepform.certificateNo.$valid) {
                        this.validMpiIdOpt.certificateType = this.steponeformdata.person.certificate.certificateType;
                        this.validMpiIdOpt.certificateNo = this.steponeformdata.person.certificate.certificateNo;
                        $.when(Public.commonajax("coms.personService", "getSelfInfoByCertificate", "[" + JSON.stringify(this.validMpiIdOpt) + "]"))
                            .done(function(res) {
                                if (res.body.person) {
                                    if (res.body.haveChronic == 1) {
                                        Public.ajaxPrompt("该证件号码已经注册过了");
                                        that.isregisted = true;
                                    } else {
                                        that.steponeformdata.person.personName = res.body.person.personName;
                                        that.steponeformdata.person.sex = res.body.person.sex;
                                        that.steponeformdata.person.dob = res.body.person.dob.substring(0, 10);
                                        that.steponeformdata.person.phoneNo = res.body.person.phoneNo;
                                        that.steponeformdata.card.cardNo = res.body.cardNo ? res.body.cardNo : '';
                                        that.steponeformdata.person.address = res.body.person.address ? res.body.person.address : '';
                                        that.steponeformdata.person.mpiId = res.body.person.mpiId;
                                        that.steponeformdata.userId = res.body.userId;
                                    }


                                } else {
                                    // that.steponeformdata.person.personName = '';
                                    // that.steponeformdata.person.sex = '';
                                    // that.steponeformdata.person.dob = '';
                                    // that.steponeformdata.person.phoneNo = '';
                                    // that.steponeformdata.card.cardNo = '';
                                    // that.steponeformdata.person.address = '';
                                    // that.steponeformdata.person.mpiId = '';
                                    // that.steponeformdata.userId = '';
                                }
                            })

                    }

                },
                //分页符点击效果
                pageclick(item, event) {
                    // 所有数据显示属性ishow = false
                    $.each(this.steptwoformdata.questionnaireresultdetailList, function(index, el) {
                        el.ishow = false
                    });
                    $(event.target).addClass('activecur').siblings('li').removeClass('activecur');
                    var question2 = this.steptwoformdata.questionnaireresultdetailList.slice(item.start, item.end);
                    $.each(question2, function(index, el) {
                        el.ishow = true
                    });
                    $.each(this.steptwoformdata.questionnaireresultdetailList, function(index, el) {
                        $.each(question2, function(index2, el2) {
                            if (el.subjectId == el2.subjectId) {
                                el = el2;
                            }
                        });
                    });

                },

        },
        events: {

        },
        // 处理值的传递
        watch: {

            'chronicid': function(value, oldvalue) {
                // 根据慢病id查询监测目标
                var that = this;
                //会员入会制作提交慢病的数据的专用代码开始
                that.steptwoformdata.chroniclevel = [];
                var temobj_chronic = {
                    "chronic": value
                };
                that.steptwoformdata.chroniclevel.push(temobj_chronic);
                //会员入会制作提交慢病的数据的专用代码结束
                $.when(Public.commonajax("coms.commonChronicService", "findChronicMonitorIndicatorByChronic", "[" + value + "]"))
                    .done(function(data) {

                        var data = data.body;
                        that.steptwoformdata.patientpersonalindexList = data;
                        console.log(that.steptwoformdata.patientpersonalindexList);
                    })
            },

        },
}
</script>
<style scoped>
/*会员入会*/

.h1_tit {
    margin-bottom: 20px
}

.service,
.service_add {
    height: auto;
    -webkit-box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    -moz-box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    background: #fff;
    border-radius: 10px;
    padding: 0 0 40px
}

.service_add .form-horizontal {
    padding-top: 20px
}

.service_add .form-horizontal h3 {
    font-size: 16px;
    line-height: 30px;
    height: 30px;
    margin: 0 auto 20px;
    color: #1fc49a;
    width: 90%;
    border-bottom: 2px solid #e5e5e5
}

.memberadd .form-horizontal {
    line-height: 30px;
}



.memberadd .form-horizontal input[type="radio"],
.memberadd .form-horizontal input[type="checkbox"] {
    height: 20px;
    width: 20px;
    background: url(../../assets/img/radio.png) no-repeat center center;
}

.memberadd .form-horizontal input[type="radio"]:checked {
    background: url(../../assets/img/radiochecked.png) no-repeat center center;
}

.memberadd .twostep p {
    padding-top: 7px;
}

.form-horizontal .radio,
.form-horizontal .radio-inline {
    padding-top: 2px;
}

.h1_tit .step {
    height: 42px;
    line-height: 42px;
    float: right;
    width: 422px;
    background: #fff
}

.h1_tit .step1 {
    background: url(../../assets/img/step1.png) no-repeat center center;
}

.h1_tit .step2 {
    background: url(../../assets/img/step2.png) no-repeat center center;
}

.h1_tit .step3 {
    background: url(../../assets/img/step3.png) no-repeat center center;
}

.twostep_1,
.twostep_2,
.twostep_3 {
    border: 1px solid #d3d3d3;
    width: 760px;
    margin: 20px auto 0;
    padding-top: 20px;
    position: relative;
}

.twostep_3 {
    margin-bottom: 20px
}

.twostep h4 {
    background: #fff;
    width: 80px;
    text-align: center;
    padding: 0 10px;
    color: #bbbbbb;
    position: absolute;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    top: -15px;
    left: 50px;
}

#twostepform input[type="text"],
textarea {
    padding: 10px
}

.threestep {
    width: 760px;
    margin: 20px auto 0;
}

.threestep_con h4 {
    width: 350px;
    margin: 20px auto;
    background: url(../../assets/img/c_ok.png) no-repeat left center;
    padding-left: 60px;
    color: #19ab85;
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-size: 28px
}

.threestep_con_info {
    border: 1px dashed #d2d2d2;
    height: 250px;
    width: 620px;
    margin: 0 auto 20px;
    border-radius: 5px;
    background: #f7f7f8;
    padding: 30px
}

.threestep_con_info >div {
    padding: 20px 10px 10px
}

.threestep_con_info >div.fl {
    border-right: #cccccc 1px solid;
    width: 330px
}

.threestep_con_info >div.fl span {
    color: #999999
}

.threestep_con_info >div.fr span {
    color: #19ab85;
    font-weight: bold
}

.twostep_3 .subjectWrap {
    display: block
}

.twostep_3 .radio .subjectWrap:nth-child(1) {
    margin-left: 10px
}

.twostep_3 .form-group {
    margin-left: 30px;
    margin-right: 30px;
}

.twostep_3 .subjectContent {
    /*    display: inline-block;*/
    font-weight: bold;
    padding: 0 10px
}

.fyf {
    height: 1px;
    background: #ccc;
    display: none;
}

.twostep_3 .radio,
#twostepform .checkbox {
    padding-left: 30px;
}

.twostep_3 .radio span,
#twostepform .checkbox span {
    margin-left: 10px
}

.twostep_3 textarea,
#twostepform input.text {
    margin-left: 30px;
    border: 1px solid #ccc;
    width: 90%
}

.pagebreaks li {
    float: left;
    width: 30px;
    height: 30px;
    padding: 0 5px;
    border: 1px solid #ccc;
    line-height: 30px;
    text-align: center;
    margin-right: 10px;
}

.bgblue {
    background: #f1f1f1
}

.pagebreaks li:hover {
    cursor: pointer;
}

.pagebreaks li.activecur {
    background: #1dc499;
    color: #fff
}
</style>
