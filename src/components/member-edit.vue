<template>
    <div class="w980 ">
        <!-- 修改会员 -->
        <div class="bs-example-modal-lg" id="edit_member">
            <button type="button" class="close" id="handclose" @click="handclose"><span>&times;</span></button>
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <ul class="cbafter tabmenu">
                            <li class="cur">基本信息</li>
                            <li>健康信息</li>
                            <li>健康管理</li>
                        </ul>
                    </div>
                    <div class="modal-body">
                        <div class="tabcon">
                            <form class="form-horizontal" role="form" id="onestepform" name="onestepform" v-form @submit.prevent="gotwostep">
                                <div class="twostep_0">
                                    <div class="form-group">
                                        <label for="" class="col-md-3 control-label">国籍: </label>
                                        <div class="col-md-6">
                                            <select class="form-control" name="nationality" v-model="steponeformdata.person.nationality">
                                                <!-- <option>请选择国籍</option> -->
                                                <option v-for="item in dictionary.nationality" value="{{item.key}}">{{item.text}}</option>
                                            </select>
                                        </div>
                                        <!-- <div class="col-md-1 start">*</div> -->
                                    </div>
                                    <div class="form-group">
                                        <label for="" class="col-md-3 control-label">证件类型:</label>
                                        <div class="col-md-6">
                                            <select class="form-control" name="certificateType" v-model="steponeformdata.person.certificate.certificateType">
                                                <!-- <option>请选择证件类型</option> -->
                                                <option v-for="item in dictionary.certificateType" value="{{item.key}}">{{item.text}}</option>
                                            </select>
                                        </div>
                                        <!-- <div class="col-md-1 start">*</div> -->
                                    </div>
                                    <div class="form-group">
                                        <label for="" class="col-md-3 control-label">证件号码 :</label>
                                        <div class="col-md-6">
                                            <input type="input" class="form-control" id="" placeholder="请输入证件号码" name="certificateNo" v-model="steponeformdata.person.certificate.certificateNo" required v-form-ctrl custom-validator="certificateNoValidator" maxlength="36">
                                        </div>
                                        <div class="col-md-3 start" v-if="onestepform.certificateNo.$invalid">请输入正确证件号码</div>
                                    </div>
                                    <div class="form-group">
                                        <label for="" class="col-md-3 control-label">姓 名:</label>
                                        <div class="col-md-6">
                                            <input type="input" class="form-control" id="" placeholder="请输入姓名" name="personName" v-model="steponeformdata.person.personName" required v-form-ctrl maxlength="30">
                                        </div>
                                        <div class="col-md-3 start" v-if="onestepform.personName.$error.required">请输入姓名</div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-3 control-label">性 别:</label>
                                        <div class="col-md-6">
                                            <div class="radio">
                                                <label class="checkbox-inline" v-for="item in dictionary.gender">
                                                    <input type="radio" name="sex" id="" value="{{item.key}}" v-model="steponeformdata.person.sex">{{item.text}}
                                                </label>
                                            </div>
                                        </div>
                                        <!-- <div class="col-md-1 start">*</div> -->
                                    </div>
                                    <div class="form-group">
                                        <label for="" class="col-md-3 control-label">出生日期 :</label>
                                        <div class="col-md-6">
                                            <input class="input form-control" size="50" type="text" v-model="steponeformdata.person.dob" placeholder="请选择出生日期" name="dob" required v-form-ctrl id="dob">
                                        </div>
                                        <!-- <div class="col-md-3 start" v-if="onestepform.dob.$error.required">请选择出生日期</div> -->
                                    </div>
                                    <div class="form-group">
                                        <label for="" class="col-md-3 control-label">手机号码 :</label>
                                        <div class="col-md-6">
                                            <input type="input" class="form-control" id="" placeholder="请输入手机号码" name="phoneNo" v-model="steponeformdata.person.phoneNo" custom-validator="phoneNoValidator" v-form-ctrl required>
                                        </div>
                                        <div class="col-md-3 start" v-if="onestepform.phoneNo.$invalid">请输入正确手机号码</div>
                                    </div>
                                    <div class="form-group">
                                        <label for="" class="col-md-3 control-label">健康卡号 :</label>
                                        <div class="col-md-6">
                                            <input type="input" class="form-control" id="" placeholder="请输入健康卡号" name="cardNo" v-model="steponeformdata.card.cardNo" maxlength="36">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="" class="col-md-3 control-label">家庭住址 :</label>
                                        <div class="col-md-6">
                                            <input type="input" class="form-control" id="" placeholder="请输入家庭住址" name="address" v-model="steponeformdata.person.address" maxlength="100">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-md-3 col-md-offset-5">
                                            <button type="submit" class="default greynobg">保存</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="tabcon none twostep">
                            <form class="form-horizontal twostepform" role="form" id="twostepform" v-on:submit.prevent="gothreestep" name="twostepform">
                                <div class="twostep_1">
                                    <h4>健康信息</h4>
                                    <div class="form-group" v-for="item in steptwoformdata.chroniclevel">
                                        <label for="" class="col-md-3 control-label">慢病种类: </label>
                                        <div class="col-md-6">
                                            <select class="form-control" value="{{item.chronic}}" disabled="">
                                                <option selected>{{item.chronicText}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="twostep_2">
                                    <h4>监测目标</h4>
                                    <div class="form-group" v-for="item in steptwoformdata.patientpersonalindexList">
                                        <!--  <input type="hidden" name="indexId{{item.indexId}}" value="{{item.indexId}}" v-model="item.indexId"> -->
                                        <label for="" class="col-md-2 control-label">{{item.indexName}}:<span class="start">*</span></label>
                                        <div class="col-md-3">
                                            <input type="input" class="form-control" placeholder="上限" name="quantifyIndexNormalTop{{item.indexId}}" required value="{{item.quantifyIndexDangerTop}}" v-model="item.quantifyIndexNormalTop" maxlength="11" @blur="amount" disabled>
                                        </div>
                                        <div class="col-md-2">
                                            {{item.indexUnit}}
                                        </div>
                                        <div class="col-md-3">
                                            <input type="input" class="form-control" placeholder="下限" name="quantifyIndexNormalBottom{{item.indexId}}" required value="{{item.quantifyIndexDangerBottom}}" v-model="item.quantifyIndexNormalBottom" maxlength="11" @blur="amount" disabled>
                                        </div>
                                        <div class="col-md-2">
                                            {{item.indexUnit}}
                                        </div>
                                        <div class="col-md-1 start" v-if="parseFloat(item.quantifyIndexNormalBottom)>parseFloat(item.quantifyIndexNormalTop)">下限必须小于等于上限</div>
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
                                        <input v-if="item.subjectAnswerType=='03'" type="text" class="text" v-model="item.options[0].optionInputContent">
                                        <textarea v-if="item.subjectAnswerType=='04'" v-model="item.options[0].optionInputContent"></textarea>
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
                                <div class="form-group">
                                    <div class="col-md-3 col-md-offset-5">
                                        <button type="submit" class="default greynobg">保存</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="tabcon none">
                            <div class="threestep">
                                <a class="btn btn-default btn_add"><span class="glyphicon glyphicon-plus" @click="addprogramme">新增慢病方案</span></a>
                                <a class="btn btn-default btn_del"><span class="glyphicon glyphicon-minus" @click="delprogramme">删除慢病方案</span></a>
                                <div class="tab">
                                    <ul class="tab_menu cbafter">
                                        <li v-for="item in Patientchronicmanagerplan" :class="{active:$index==0}" @click="tabsummernote(item,$event)" data-optId="{{item.patientChronicManagerPlan}}" data-index="{{$index}}">{{item.planName}}</li>
                                    </ul>
                                    <div class="tab_con">
                                        <div class="form-group">
                                            <label for="" class="col-md-3 control-label"></label>
                                            <div class="col-md-8">
                                                <div id="summernote" class="summernote"></div>
                                                <textarea id="summernotecon" name="planContent" class="form-control" rows="3" style="display:none"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-3 col-md-offset-5">
                                        <button type="button" class="ok default center" @click="updateplandetail" id="updateplandetail">保存</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 修改会员弹框背景-->
        <div class="bg_master2" style="display:none"></div>
        <!-- 新增慢病方案 -->
        <div class="modal fade" id="addprogramme" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="cancelplandetailTo"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">               新增慢病方案</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" v-on:submit.prevent>
                            <div class="form-group">
                                <label for="" class="col-md-5 control-label">
                                    <p class="mb_tag cbafter">
                                        <a @click="getchronicList(item,$event)" v-for="item in chronicList">{{item.chronicText}}</a>
                                    </p>
                                </label>
                                <div class="col-md-7">
                                    <ul class="programme_list">
                                        <li v-for="item in programmelist">
                                            <div class="radio">
                                                <label>
                                                    <input type="radio" name="optionsRadios" @click='selectitem(item,$event)' value="{{item.chronicManagerPlan}}">{{item.planName}}</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer" v-show="programmelist.length>0">
                        <div class="col-md-6">
                            <button type="button" class="default ok center fr" @click="plandetailTo">确 认</button>
                        </div>
                        <div class="col-md-6">
                            <button type="button" class="default greynobg center fl" @click="cancelplandetailTo">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 删除方案 -->
        <div class="modal fade" id="confirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">               删除慢病方案</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" v-on:submit.prevent>
                            <div class="form-group">
                                <div class="col-md-12">
                                    <ul class="programme_list" id="delprogramme_list">
                                        <li v-for="item in Patientchronicmanagerplan">
                                            <div class="radio">
                                                <label>
                                                    <input type="radio" name="optionsRadios" @click='selectitemdel($index,item,$event)' value="{{item.chronicManagerPlan}}">{{item.planName}}</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <div class="col-md-6">
                            <button type="button" class="default dele center fr" @click="deleplandetailconfirm" style>确 认</button>
                        </div>
                        <div class="col-md-6">
                            <button type="button" class="default greynobg center fl" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import 'assets/lib/bootstrap-3.3.2/css/bootstrap.min.css'
import 'assets/lib/bootstrap-3.3.2/js/bootstrap.min.js'
import 'assets/lib/bootstrap-summernote/summernote.css'
import 'assets/reset.css'
import Public from 'assets/public.js'
import 'assets/lib/laydate/laydate.js'
import 'assets/lib/laydate/need/laydate.css'
import 'assets/lib/laydate/skins/danlan/laydate.css'
require('summernote')
export default {
    data() {
            return {
                dictionary: { //字典可添加
                    gender: [],
                    nationality: [],
                    certificateType: []
                },
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
                    userId: ""
                },
                steptwoformdata: {
                    mpiId: "",
                    "chroniclevel": [],
                    "patientpersonalindexList": [],
                    "questionnaireresult": {
                        "questionnaireId": "",
                        "operaterType": "2", //固定值
                        "resultId": "",

                    },
                    "questionnaireresultdetailList": []
                },
                onestepform: { //表单验证用

                },
                plandetail: { //用于新增慢病方案
                    "mpiId": "",
                    "chronic": "",
                    "chronicManagerPlan": "",
                    "planName": "",
                    "planContent": ""

                },
                plandetailDEL: { //用于删除慢病方案
                    "mpiId": "",
                    "chronic": "",
                    "chronicManagerPlan": "",
                    "planName": "",
                    "planContent": "",
                    "patientchronicmanagerplan": ""

                },
                delindex: "",
                chronicList: [], //慢病种类 增加慢病方案的时候
                programmelist: [], //根据ID获取方案列表
                Patientchronicmanagerplan: [], //点击列表修改会员后，通过mpiId查询病人的方案列表
                pagetotlearr: [], //问卷分页符
            }
        },
        computed: {

        },
        components: {


        },
        props: {
            mpiidfromparent: {
                type: String,
                default: ""
            },
        },
        ready() {
            var that = this;

            // 获取字典
            $.when(Public.commonajax("coms.multipleDictionaryService", "findDic", "[['base.dictionary.base_nationality','base.dictionary.base_gender','base.dictionary.base_certificateType']]"))
                .done(function(data) {
                    var data = data.body;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].dicId.indexOf("gender") != -1) {
                            that.dictionary.gender = data[i].items
                        }
                        if (data[i].dicId.indexOf("nationality") != -1) {
                            that.dictionary.nationality = data[i].items
                        }
                        if (data[i].dicId.indexOf("certificateType") != -1) {
                            that.dictionary.certificateType = data[i].items
                        }
                    }

                })
                // 获取慢病列表
            $.when(Public.commonajax("coms.commonChronicService", "findCommonChronic", "[[]]"))
                .done(function(data) {

                    that.chronicList = data.body;


                })
            laydate({
                elem: '#dob',
                max: laydate.now(),
                choose: function(datas) { //选择日期完毕的回调  
                    that.steponeformdata.person.dob = datas;
                }
            });
            // 慢病方案编辑器
            $('#summernote').summernote({
                callbacks: {
                    onImageUpload: function(files) {
                        //上传图片到服务器，使用了formData对象，至于兼容性...据说对低版本IE不太友好
                        var formData = new FormData();
                        console.log(formData);
                        formData.append('file', files[0]);

                        formData.append('accessToken', Public.getsessionStorage("accessToken"));
                        $.ajax({
                            url: Public.IMGUPLOAD_URL(), //后台文件上传接口
                            type: 'POST',
                            data: formData,
                            async: true,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function(res) {

                                $('#summernote').summernote('insertImage', Public.IMGVIEW_URL() + JSON.parse(res).id, 'img');
                            }
                        });

                    }
                },
                height: 300
            });


        },
        methods: {
            // 直接用$refs运行子组件的方法
            getmipiid(mpiidfromparent) {
                    var that = this;
                    var mpiId = mpiidfromparent;
                    that.steptwoformdata.mpiId = mpiId;
                    that.plandetail.mpiId = mpiId;
                    $.when(Public.commonajax("coms.personService", "getSelfInfo", "['" + mpiId + "']"))
                        .done(function(res) {
                            that.steponeformdata.userId = res.body.userId;
                            // console.log(res);
                            that.steponeformdata.person = res.body.person;
                            that.steponeformdata.person.dob = that.steponeformdata.person.dob.substring(0, 10);
                            that.steponeformdata.card.cardNo = res.body.cardNo;
                            that.steponeformdata.card.source = res.body.cardSource?res.body.cardSource:"01";
                            that.steponeformdata.card.cardType = res.body.cardType?res.body.cardType:"02";
                        });

                    // 获取病人方案列表
                    $.when(Public.commonajax("coms.commonChronicService", "findPatientchronicmanagerplan", "['" + mpiId + "']"))
                        .done(function(res) {
                            if (res.body.length > 0) {
                                $('#summernote').summernote('code', res.body[0].planContent);
                                that.Patientchronicmanagerplan = res.body;
                            } else {
                                $('#summernote').summernote('code', "");
                                that.Patientchronicmanagerplan = [];
                            }
                        });
                    //获取健康信息
                    that.getHealthInfomethod(mpiId);
                },
                // // 验证身份证
                // certificateNoValidator(value) {
                //     if (value.length > 0) {
                //         if (this.steponeformdata.person.certificate.certificateType == "01") {
                //             if (value.length == 15) {
                //                 return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(value);
                //             } else if (value.length == 18) {
                //                 return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
                //             } else {
                //                 return false;
                //             }
                //         } else {
                //             return true;
                //         }
                //     } else {

                //         return false;
                //     }
                // },
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

                // 验证小数点只能保留两位
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
                },
                refresh() {
                    this.$refs.page.refresh()
                },
                // 提交会员基本信息
                gotwostep() {
                    var that = this;
                    if (this.onestepform.$valid == true) {
                        // 提交会员基本信息
                        $.when(Public.commonajax("coms.personService", "saveSelfInfo", '[' + JSON.stringify(this.steponeformdata) + ']'))
                            .done(function(res) {

                                if (res.code == 200) {
                                    Public.ajaxPrompt("提交成功");
                                } else {
                                    alert(res.msg)
                                }

                                // $(".tabmenu").find("li").eq(1).addClass('cur').siblings('li').removeClass('cur')
                                // $(".tabcon").eq(1).removeClass('none').siblings('.tabcon').addClass('none');
                            })
                    } else {
                        alert("必须填写所有表单")
                    }

                },
                // 提交会员健康信息
                gothreestep(res) {
                    var that = this;

                    // 提交会员健康信息

                    $.when(Public.commonajax("coms.commonChronicService", "saveHealthInfo", '[' + JSON.stringify(this.steptwoformdata) + ']'))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("提交成功");

                                // that.steptwoformdata.questionnaireresultdetailList = [];
                                // that.steptwoformdata.patientpersonalindexList = [];
                                // that.steptwoformdata.chroniclevel=[];
                            } else {
                                alert(res.msg)
                            }
                        })

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
                // 选中方案列表中的一条
                selectitem(item, event) {
                    var that = this;
                    $(event.target).parents("li").addClass('active').siblings('li').removeClass("active");

                    that.plandetail.chronic = item.chronic;
                    that.plandetail.planName = item.planName;
                    that.plandetail.planContent = item.planContent;
                    that.plandetail.chronicManagerPlan = item.chronicManagerPlan;
                    // console.log(event);
                    // console.log( $(event.target).val());
                },
                // 选中方案列表中的一条后点击确定 向服务器请求新增方案
                plandetailTo() {
                    var that = this;
                    // console.log(that.plandetail);
                    // that.plandetail.$set('mpiId',this.steptwoformdata.mpiId);

                    $.when(Public.commonajax("coms.commonChronicService", "addPatientchronicmanagerplan", "[" + JSON.stringify(this.plandetail) + "]"))
                        .done(function(res) {
                            console.log(res);
                            if (res.code == 200) {
                                that.plandetailDEL = res.body;
                                $("#addprogramme").modal("hide");
                                that.Patientchronicmanagerplan.unshift(that.plandetailDEL);
                                $('#summernote').summernote('code', that.plandetailDEL.planContent);
                                that.programmelist = [];
                                $(".mb_tag").find(".active").removeClass('active')
                            } else {
                                alert(res.msg);

                            }
                        })
                },
                cancelplandetailTo() {
                    this.programmelist = [];
                    $(".mb_tag").find(".active").removeClass('active');
                    $("#addprogramme").modal('hide')
                },
                // 选中删除方案列表中的一条
                selectitemdel(index, item, event) {
                    var that = this;
                    $(event.target).parents("li").addClass('active').siblings('li').removeClass("active");
                    that.delindex = index;
                    this.plandetailDEL = item;
                },
                // 选中删除方案列表中的一条后点击确定 向服务器请求删除方案请求
                deleplandetailconfirm() {
                    var that = this;
                    if ($("#delprogramme_list").find('input:checked').length > 0) {
                        $.when(Public.commonajax("coms.commonChronicService", "deletePatientchronicmanagerplan", "[" + this.plandetailDEL.patientChronicManagerPlan + "]"))
                            .done(function(res) {
                                if (res.code == 200) {
                                    $("#confirm").modal("hide");
                                    that.Patientchronicmanagerplan.splice(that.delindex, 1);
                                    if (that.Patientchronicmanagerplan.length > 0) {
                                        $('#summernote').summernote('code', that.Patientchronicmanagerplan[0].planContent);
                                        that.plandetailDEL = that.Patientchronicmanagerplan[0];
                                    } else {
                                        $('#summernote').summernote('code', '');

                                    }

                                }


                            })
                    } else {
                        Public.ajaxPrompt("请选择要删除的方案")
                    }

                },
                // 修改当前方案
                updateplandetail() {
                    var that = this;
                    var index = $(".tab_menu").find(".active").attr("data-index");
                    var optId = $(".tab_menu").find(".active").attr("data-optId");
                    if (!optId) {
                        Public.ajaxPrompt("请选择方案");
                    } else {
                        var summernote_con = $('#summernote').summernote('code');
                        var templanobj = {
                            'patientChronicManagerPlan': optId,
                            'planContent': summernote_con
                        };

                        $.when(Public.commonajax("coms.commonChronicService", "updatePatientchronicmanagerplan", "[" + JSON.stringify(templanobj) + "]"))
                            .done(function(res) {
                                if (res.code == 200) {
                                    Public.ajaxPrompt("提交成功");
                                    that.Patientchronicmanagerplan.splice(index, 1, res.body);
                                    // $('#summernote').summernote('code',that.Patientchronicmanagerplan[0].planContent);
                                }


                            })
                    }


                },
                // tab 切换summernote内容 同时变换修改ajax的参数
                tabsummernote(item, event) {
                    $(event.target).addClass('active').siblings('li').removeClass('active');
                    this.plandetailDEL = item;
                    $('#summernote').summernote('code', item.planContent);
                    // console.log(this.plandetail)
                },
                // 新增的时候点击a标签后根据ID获取方案列表
                getchronicList(item, event) {
                    var that = this;
                    $.when(Public.commonajax("coms.commonChronicService", "findChronicmanagerplanByChronic", "[" + item.chronic + "]"))
                        .done(function(res) {
                            // console.log(res);
                            $(event.target).addClass('active').siblings('a').removeClass('active');
                            that.programmelist = res.body;

                        })
                },


                addprogramme() {
                    $("#addprogramme").modal("show");

                },
                delprogramme() {
                    $("#confirm").modal("show")
                },
                // 修改生活问卷的数据进行分页
                editquestiondata(data) {
                    var that = this;
                    that.pagetotlearr = [];
                    // 获取会员健康信息
                    var xuhao = 0,
                        pagebreaksindexarr = [];
                    // 制作分页符数组pagebreaksindexarr（获得用于截取questionnaireresultdetailList数组分成几页的索引）以及隐藏描述题目和分页符题目的序号
                    $.each(data, function(index, el) {
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
                    var question2 = data.slice(pagebreaksindexarr[0], pagebreaksindexarr[1]);
                    // 修改显示当前分页的数据的属性ishow
                    $.each(question2, function(index, el) {
                        el.ishow = true
                    });
                    // 然后再把data的对应的数据用修改了的数据替换掉
                    $.each(data, function(index, el) {
                        $.each(question2, function(index2, el2) {
                            if (el.subjectId == el2.subjectId) {
                                el = el2;
                            }
                        });
                    });

                    return data
                },
                //获取患者健康信息
                getHealthInfomethod(mpiId) {
                    var that = this;
                    that.steptwoformdata.questionnaireresultdetailList = [];
                    that.steptwoformdata.chroniclevel = [];
                    that.steptwoformdata.patientpersonalindexList = [];
                    $.when(Public.commonajax("coms.commonChronicService", "getHealthInfo", "['" + mpiId + "']"))
                        .done(function(res) {
                            if (res.code = 200) {
                                res.body.mpiId = mpiId;
                                res.body.questionnaireresultdetailList = that.editquestiondata(res.body.questionnaireresultdetailList)
                                that.steptwoformdata = res.body;
                            }
                        })
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
                // 点击关闭修改会员弹框
                handclose() {
                    $("#edit_member").hide();
                    $(".bg_master2").hide();
                },

        },
        events: {

        },
        watch: {

        }
}
$(function() {
    $(".tabmenu").on('click', "li", function(event) {
        event.preventDefault();
        var index = $(this).index();
        $(this).addClass('cur').siblings('li').removeClass('cur');
        $(".tabcon").eq(index).removeClass('none').siblings('.tabcon').addClass('none');
    });
})
</script>
<style scoped>
#edit_member .modal-body {
    height: 550px;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
}

.w980 {
    padding: 0
}

#edit_member .modal-header {
    min-height: 60px;
    padding: 0;
    border-bottom: 1px solid #e5e5e5;
    /*width: 950px;*/
}


#edit_member .modal-header ul {
    background: #fafafa;
    position: relative;
}

#edit_member .modal-header ul li {
    height: 60px;
    line-height: 60px;
    border-right: 1px solid #e6e6e6;
    font-size: 18px;
    width: 100px;
    text-align: center;
    position: absolute;
}
#edit_member .modal-header ul li:nth-child(1){border-radius: 5px 0 0 0;left:0;top:0;}
#edit_member .modal-header ul li:nth-child(2){left:101px;top:0;}
#edit_member .modal-header ul li:nth-child(3){left:202px;top:0;}

#edit_member .modal-header ul li.cur {
    color: #1fc49a;
    background: #fff;
     border-top: 4px solid #1fc49a;
}

.threestep {
    margin: 20px auto 0;
    position: relative;
}

.threestep>.btn-default {
    border: 2px solid #1dc499;
    color: #1dc499;
    border-radius: 17px;
    position: absolute;
}

.threestep>.btn-default.btn_add {
    top: 300px;
    left: 74px;
}

.threestep>.btn-default.btn_del {
    top: 350px;
    left: 74px;
}

.threestep>.btn-default:hover {
    background: none
}

.tab_menu {
    border-radius: 5px;
    position: absolute;
    top: 120px;
    left: 74px;
    z-index: 1
}

.tab_menu li {
    line-height: 46px;
    height: 46px;
    font-size: 14px;
    width: 172px;
    background: url(../assets/img/tap_menu.png) no-repeat left center;
    color: #999;
    text-align: center;
    margin-bottom: 10px;
}

.tab_menu li.active {
    background: url(../assets/img/tab_cur.png) no-repeat left center;
    color: #fff
}

.tab_con {
    padding: 20px
}

.note-editor .programme_list {
    padding: 10px 0 10px
}

.programme_list li {
    padding: 5px 0 5px 15px;
    border: 1px solid #fafafa;
    border-radius: 5px;
    margin-top: 10px
}

.programme_list li.active {
    background: #1dc499;
    color: #fff
}

.programme_list li input {
    background: none;
    border: none
}

.mb_tag {
    background: #fafafa;
    border-right: 1px solid #eeeeee;
    min-height: 200px;
    padding: 10px
}

.mb_tag a {
    display: block;
    width: 50%;
    float: left;
    background: none;
    color: #787878;
    height: 34px;
    line-height: 34px;
    border-radius: 17px;
    text-align: center;
    overflow: hidden;
}

.mb_tag a.active {
    background: #1dc499;
    color: #fff;
}

.twostep_0,
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
    font-weight: bold;
    padding: 0 10px 5px
}

.twostep_3 .radio,
.twostepform .checkbox {
    padding-left: 30px;
}


/*.twostep_3 .radio input,
.twostepform .checkbox  input{
  width: 20px; height: 20px
}*/

.twostep_3 .radio span,
.twostepform .checkbox span {
    margin-left: 10px;
    margin-top: 3px;
    display: inline-block;
}

.twostep_3 textarea,
.twostepform input.text {
    margin-left: 30px;
    border: 1px solid #ccc;
    width: 90%
}

.twostepform input[type="text"],
textarea {
    padding: 10px
}

.twostepform input[type="radio"],
.twostepform input[type="checkbox"] {
    height: 20px;
    width: 20px;
    background: url(../assets/img/radio.png) no-repeat center center;
}

.twostepform input[type="radio"]:checked {
    background: url(../assets/img/radiochecked.png) no-repeat center center;
}

.twostepform p {
    padding-top: 7px;
}

.form-horizontal .radio,
.form-horizontal .radio-inline {
    padding-top: 2px;
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


/*分页样式*/

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

.pagebreaks span {
    display: inline-block;
    margin-top: 5px;
}


#edit_member {
    position: absolute;
    width: 1000px;
    height: 700px;
    /*background: red;*/
    top: 100px;
    display: none;
    left: 50%;
    margin-left: -500px;
    border-radius: 10px;
    z-index: 2;
}

#handclose {
    position: absolute;
    z-index: 99;
    top: 40px;
    right: 70px
}
</style>
