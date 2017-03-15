<template>
    <div class="index clearafter">
        <module-head></module-head>
        <div class="content cbafter">
            <div class="w220 fl">
                <menu-list></menu-list>
            </div>
            <div class="w980 fr">
                <div class="h1_tit">
                    <h1 class="fl">服务列表维护</h1>
                    <button class="fr default ok" @click="servicemodalshow(item)">新增服务维护</button>
                </div>
                <div class="servicelist bg">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>是否启用</th>
                                <th>服务序号</th>
                                <th>服务名称</th>
                                <th>服务图标</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in servicelist">
                                <td class="text-center"><span class="glyphicon glyphicon-play-circle" :class="{'effective':item.effectiveFlag==0}"></span></td>
                                <td>{{item.serviceCode}}</td>
                                <td>{{item.serviceName}}</td>
                                <td class="icon"><img :src="item.serviceIconId" width="40" height="40" /></td>
                                <td class="text-center"><span class="glyphicon glyphicon-pencil" @click="servicemodalshow(item)"></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- 新增或修改服务-->
        <div class="modal fade bs-example-modal-lg" id="servicemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                {{servicesavetitle}}</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" id="reviewvisitform" @submit.prevent="saveservicemodal">
                            <div class="service_add">
                                <div class="form-group">
                                    <div class="col-md-3 col-md-offset-9">
                                        <div class="btn-group">
                                            <button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-floppy-save"></span>保存</button>
                                            <button type="button" class="btn btn-default" data-dismiss="modal">返回</button>
                                        </div>
                                    </div>
                                </div>
                                <h3>本体信息</h3>
                                <div class="form-group sb">
                                    <label class="col-md-3 control-label"></label>
                                    <div class=" col-md-6">
                                        <label class="checkbox-inline">
                                            <input type="checkbox" name="starservice" v-model="servicesave.baseService.effectiveFlagBoolean"> 启用服务标志
                                        </label>
                                        <label class="checkbox-inline">
                                            <input type="checkbox" name="freeservice" v-model="servicesave.baseService.freeFlagBoolean"> 服务免费标志
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label">服务类别:<span class="start">*</span></label>
                                    <div class="col-md-6">
                                        <select class="form-control" v-model="servicesave.baseService.serviceType" required :disabled="servicesavetitle=='修改服务'">
                                            <option v-for="item in dictionary.svrItemType" value="{{item.key}}">{{item.text}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label">服务序号:<span class="start">*</span></label>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" placeholder="请输入服务序号" v-model="servicesave.baseService.serviceCode" readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                <label class="col-md-3 control-label">服务名称:<span class="start">*</span></label>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" placeholder="请输入服务名称" v-model="servicesave.baseService.serviceName" required maxlength="10">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label">服务图标:<span class="start">*</span></label>
                                    <div class="col-md-6">
                                        <img-upload-btn :imgurl="imgurl"></img-upload-btn>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label">对应模块:<span class="start">*</span></label>
                                    <div class="col-md-6">
                                        <div class="input-group">
                                            <input type="hidden" v-model="servicesave.baseService.moduleId">
                                            <input type="text" class="form-control" v-model="module.modulename" required >
                                            <div class="input-group-btn">
                                                <button type="button" class="btn btn-success" @click="dropdowntoggleul">选择模块 <span class="caret"></span></button>
                                            </div>
                                            <ul class="selcetmenu" @mouseleave="closeselcetmenu">
                                                <li v-for="item in module.moduleList">
                                                    <h4 @click="dropdowntoggledl"><span class="caret"></span>{{item.modelBelongTypeText}}</h4>
                                                    <dl>
                                                        <dd @click="setinputval(item2,item,$event)" v-for="item2 in item.list">{{item2.moduleName}}</dd>
                                                    </dl>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">提供者类别:<span class="start">*</span></label>
                                    <div class="col-md-6">
                                        <select class="form-control" v-model="servicesave.baseService.serviceProviderType" required>
                                            <option v-for="item in dictionary.objectType" value="{{item.key}}">{{item.text}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group cbafter" v-show="!servicesave.baseService.freeFlagBoolean">
                                    <label class="col-md-3 control-label">支付类别:<span class="start">*</span></label>
                                    <div class="col-md-6">
                                        <label class="radio-inline" v-for="item in dictionary.svrPayType">
                                            <input type="radio" name="svrPayType" value="{{item.key}}" v-model="servicesave.baseService.servicePaytype" :required="!servicesave.baseService.freeFlagBoolean">{{item.text}}
                                        </label>
                                    </div>
                                </div>
                                <h3 class="cb" v-show="!servicesave.baseService.freeFlagBoolean">计价方式</h3>
                                <div class="form-group sb" v-show="!servicesave.baseService.freeFlagBoolean">
                                    <label class="col-md-3 control-label">计价方式:<span class="start">*</span></label>
                                    <div class=" col-md-6">
                                        <label class="checkbox-inline" v-for="item in dictionary.svrPriceStyle">
                                            <input type="checkbox" name="svrPriceStyle" value="{{item.key}}" v-model="servicesave.servicePricestyleList"> {{item.text}}
                                        </label>
                                    </div>
                                </div>
                                <h3 class="cb" v-show="servicesavetitle=='修改服务'">扩展属性<span class="fr glyphicon glyphicon-plus-sign" @click="addServiceProperty(item)"></span></h3>
                                <table class="table table-hover" id="ServicePropertylist" v-show="servicesavetitle=='修改服务'">
                                    <thead>
                                        <tr>
                                            <th>属性代码</th>
                                            <th>显示名称</th>
                                            <th>字符类型</th>
                                            <th>默认值</th>
                                            <th>开通时是否可修改</th>
                                            <th>是否有效</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in servicesave.servicePropertyList">
                                            <td>{{item.exPropertyCode}}</td>
                                            <td>{{item.exPropertyDisplayName}}</td>
                                            <td>{{item.exPropertyTypeText}}</td>
                                            <td>{{item.exPropertyDefaultValue}}</td>
                                            <td>{{item.exPropertyValueModifyFlag==0?'否':'是'}}</td>
                                            <td>{{item.status==0?'否':'是'}}</td>
                                            <td><span class="glyphicon glyphicon-pencil" @click="addServiceProperty(item)"></span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- 服务本体信息保存成功提示 -->
        <div class="modal fade" id="successsaveinfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                服务本体信息提示
                    </div>
                    <div class="modal-body threestep_con">
                        <h2>恭喜，服务本地信息保存成功</h2>
                        <p class="text-center">是否继续生成扩展属性</p>
                       
                    </div>
                    <div class="form-group tbline text-center">
                        <div class="col-md-6">
                             <button  class="default center blue fr" @click="addServiceProperty(item)">是，继续</button>
                        </div>
                       <div class="col-md-6">
                                <button class="default center greynobg fl" data-dismiss="modal">不，返回</button>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
        <!-- 新增扩展属性 -->
    <div class="modal fade" id="ServiceProperty" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
       <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myModalLabel">{{servicePropertit}}</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" id="ServicePropertyform" v-on:submit.prevent="servicePropersave()">
                            <div>
                                <div class="form-group">
                                <label class="col-md-3 control-label">属性代码:<span class="start">*</span></label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control" placeholder="请输入属性代码" v-model="serviceProperdata.exPropertyCode" readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label">显示名称:<span class="start">*</span></label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control" placeholder="请输入显示名称" v-model="serviceProperdata.exPropertyDisplayName" required maxlength="10">
                                    </div>
                                </div>
                                <div class="form-group cbafter">
                                    <label class="col-md-3 control-label">数据类型:<span class="start">*</span></label>
                                    <div class="col-md-8">
                                        <label class="radio-inline" v-for="item in dictionary.baseDataType">
                                            <input type="radio" name="datatype" value="{{item.key}}" v-model="serviceProperdata.exPropertyType" >{{item.text}}
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group" v-show="serviceProperdata.exPropertyType==11">
                                    <label class="col-md-3 control-label">默认值:</label>
                                    <div class="col-md-8">
                                        <input type="number" class="form-control" placeholder="请输入默认值" v-model="serviceProperdata.exPropertyDefaultValue">
                                    </div>
                                </div>
                                <div class="form-group" v-show="serviceProperdata.exPropertyType==12">
                                    <label class="col-md-3 control-label">默认值:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control" placeholder="请输入默认值" v-model="serviceProperdata.exPropertyDefaultValue">
                                    </div>
                                </div>
                                <div class="form-group" v-show="serviceProperdata.exPropertyType==13">
                                    <label class="col-md-3 control-label">默认值:</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control" placeholder="请输入默认值" v-model="serviceProperdata.exPropertyDefaultValue" id="datedata">
                                    </div>
                                </div>
                                <div class="form-group cbafter">
                                    <label class="col-md-3 control-label">开通时是否修改:<span class="start">*</span></label>
                                    <div class="col-md-8">
                                        <label class="radio-inline">
                                            <input type="radio" name="isedit" value="1" v-model="serviceProperdata.exPropertyValueModifyFlag">是
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="isedit" value="0" v-model="serviceProperdata.exPropertyValueModifyFlag">否
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group cbafter">
                                    <label class="col-md-3 control-label">是否有效:<span class="start">*</span></label>
                                    <div class="col-md-8">
                                        <label class="radio-inline">
                                            <input type="radio" name="iseffective" value="1" v-model="serviceProperdata.status">是
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="iseffective" value="0" v-model="serviceProperdata.status">否
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group text-center tbline">
                                    <button type="submit" class="default center blue">确 认</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import 'assets/lib/bootstrap-3.3.2/css/bootstrap.min.css'
import 'assets/lib/bootstrap-3.3.2/js/bootstrap.min.js'
import 'assets/reset.css'
import 'assets/lib/laydate/laydate.js'
import 'assets/lib/laydate/need/laydate.css'
import 'assets/lib/laydate/skins/danlan/laydate.css'
import Public from 'assets/public.js'
import moduleHead from 'components/module-head'
import menuList from 'components/menu-list'
import ImgUploadBtn from 'components/ImgUploadBtn.vue'
export default {
    data() {
            return {
                imgurl: "", //修改的时候图片预览
                dictionary: {
                    svrItemType: [],
                    svrPayType: [],
                    objectType: [],
                    svrPriceStyle: [],
                    baseDataType: [],
                }, //字典
                module: {
                    moduleList: [], //服务详情对应模块
                    modulename: "", //服务详情对应模块名称
                },
                servicelist: [], //服务列表
                servicesave: {
                    "serviceId": "",
                    "baseService": { //服务新增保存和修改保存
                        "serviceType": "",
                        "serviceName": "",
                        "serviceProviderType": "",
                        "freeFlagBoolean": false,
                        "servicePaytype": "",
                        "moduleId": "",
                        "serviceIconId": "",
                        "effectiveFlagBoolean": true
                    },
                    "servicePricestyleList": [],
                    "servicePropertyList": [],
                },
                servicesavetitle: "", //服务修改或者新增的文本
                servicePropertit: "", //服务属性修改或者新增的文本
                serviceProperdata: { //服务属性新增保存和修改保存
                    "exPropertyCode": "",
                    "exPropertyDefaultValue": "",
                    "exPropertyDisplayName": "",
                    "exPropertyType": "12",
                    "exPropertyValueModifyFlag": "",
                    "status": "",
                    "serviceId": "",
                },
            }
        },
        computed: {

        },
        components: {
            moduleHead, menuList, ImgUploadBtn
        },
        ready() {
            var that = this;
            //日历插件
            laydate({
                elem: '#datedata',
                // max: laydate.now(),
                choose: function(datas) { //选择日期完毕的回调  
                    that.serviceProperdata.exPropertyDefaultValue = datas;
                }
            });
            //获取列表
            $.when(Public.commonajax("base.baseServiceService", "findServiceItemList", "[]"))
                .done(function(res) {
                    if (res.code == 200) {
                        $.each(res.body, function(index, el) {
                            el.serviceIconId = Public.IMGVIEW_URL() + el.serviceIconId
                        });
                        that.servicelist = res.body
                    } else {
                        Public.ajaxPrompt(res.msg);
                    }
                });
            //获取字典服务类别  服务支付类别 服务提供者类别 计价方式 属性数据类型
            $.when(Public.commonajax("coms.multipleDictionaryService", "findDic", "[['base.dictionary.base_svrItemType','base.dictionary.base_svrPayType','base.dictionary.base_serviceProviderType','base.dictionary.base_svrPriceStyle','base.dictionary.base_baseDataType']]"))
                .done(function(res) {
                    if (res.code == 200) {
                        var data = res.body;
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].dicId.indexOf("svrItemType") != -1) {
                                that.dictionary.svrItemType = data[i].items;
                            }
                            if (data[i].dicId.indexOf("svrPayType") != -1) {
                                that.dictionary.svrPayType = data[i].items;
                                // that.steponeformdata.person.nationality = data[i].items[0].key;
                            }
                            if (data[i].dicId.indexOf("serviceProviderType") != -1) {
                                that.dictionary.objectType = data[i].items;
                                // that.steponeformdata.person.certificate.certificateType = data[i].items[0].key;
                            }
                            if (data[i].dicId.indexOf("svrPriceStyle") != -1) {
                                that.dictionary.svrPriceStyle = data[i].items;
                                // that.steponeformdata.person.certificate.certificateType = data[i].items[0].key;
                            }
                            if (data[i].dicId.indexOf("baseDataType") != -1) {
                                that.dictionary.baseDataType = data[i].items;
                                // that.steponeformdata.person.certificate.certificateType = data[i].items[0].key;
                            }
                        }
                    }
                });
            // 获取对应模块
            $.when(Public.commonajax("coms.serverService", "findModuleList", "[]"))
                .done(function(res) {
                    if (res.code == 200) {
                        that.module.moduleList = res.body;
                    }
                });
            
        },
        methods: {
            // 显示新增或者修改后服务
            servicemodalshow(item) {
                    var that = this;
                    $("#servicemodal").modal("show");
                    if (item) {
                        this.servicesavetitle = "修改服务";
                        this.imgurl = item.serviceIconId;
                        // 查询某个服务项目详情
                        $.when(Public.commonajax("coms.serverService", "getServerDetail", "['" + item.serviceId + "']"))
                            .done(function(res) {
                                if (res.code == 200) {
                                    that.servicesave = res.body;
                                    $.each(that.module.moduleList,function(index, el) {
                                        if(res.body.baseService.modelBelongType==el.modelBelongType){
                                             that.module.modulename=el.modelBelongTypeText+">"+res.body.baseService.moduleName
                                       
                                        }
                                    });
                                     

                                }
                            });

                    } else {
                        this.servicesavetitle = "新增服务";
                        this.imgurl = "";
                        that.module.modulename = "";
                        this.servicesave = {
                            "baseService": {
                                "serviceType": "",
                                "serviceCode": "",
                                "serviceName": "",
                                "serviceProviderType": "",
                                "freeFlagBoolean": false,
                                "servicePaytype": "",
                                "moduleId": "",
                                "serviceIconId": "",
                                "effectiveFlagBoolean": true
                            },
                            "servicePricestyleList": [],
                            "servicePropertyList": [],
                        };

                    }
                    // $("#successsaveinfo").modal("show")
                },
                // 保存新增或者修改后服务
                saveservicemodal() {
                    var that = this;
                    // 删除effectiveFlag和freeFlag 修改的时候返回数据中有这两个字段
                     if(that.servicesave.baseService.effectiveFlag){
                        delete that.servicesave.baseService.effectiveFlag;
                     }
                     if(that.servicesave.baseService.freeFlag){
                        delete that.servicesave.baseService.freeFlag
                     }
                     if(that.servicesave.servicePricestyleList.length==0&&!that.servicesave.baseService.freeFlagBoolean){
                        Public.ajaxPrompt("请选择计价方式");
                        return

                    }
                    if(that.servicesave.baseService.serviceIconId==""){
                        Public.ajaxPrompt("请上传服务图标");
                        return
                    }
                    $.when(Public.commonajax("coms.serverService", "saveServiceDetail", "[" + JSON.stringify(that.servicesave) + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                               Public.ajaxPrompt("保存成功");
                                // 更新服务列表

                                    $.when(Public.commonajax("base.baseServiceService", "findServiceItemList", "[]"))
                                        .done(function(res) {
                                            if (res.code == 200) {
                                                $.each(res.body, function(index, el) {
                                                    el.serviceIconId = Public.IMGVIEW_URL() + el.serviceIconId
                                                });
                                                that.servicelist = res.body
                                            } else {
                                                Public.ajaxPrompt(res.msg);
                                            }
                                        });
                                if (that.servicesavetitle == "新增服务") {
                                    that.servicesave = res.body;
                                      $("#successsaveinfo").modal("show");
                                    //   res.body.baseService.serviceIconId = Public.IMGVIEW_URL() + res.body.baseService.serviceIconId;
                                    // that.servicelist.push(res.body.baseService);
                                    //   console.log(that.servicesave );

                                    that.servicesavetitle = "修改服务";

                                }
                            } else {
                                Public.ajaxPrompt(res.msg);

                            }
                        });
                },
               
                // 点击选择模块显示下拉列表ul
                dropdowntoggleul(event) {
                    $(event.target).parent(".input-group-btn").next("ul").toggle();
                },
                // 点击下拉列表的H4展开或者折叠菜单
                dropdowntoggledl(event) {
                    $(event.target).next("dl").toggle();
                },
                closeselcetmenu(event){
                     $(event.target).hide();
                },
                // 点击下拉列表的dd标签赋值到文本框
                setinputval(item2, item, event) {
                    this.servicesave.baseService.moduleId = item2.mouleId;
                    this.module.modulename = item.modelBelongTypeText + ">" + item2.moduleName;
                    $(event.target).closest("ul").hide();
                },
                // 添加或者修改服务扩展属性弹框
                addServiceProperty(item) {
                    $("#successsaveinfo").modal("hide");
                    $("#ServiceProperty").modal("show");
                    var that = this;
                    if (item) {
                        that.servicePropertit = "修改服务属性";
                        that.serviceProperdata = item;
                    } else {
                        that.servicePropertit = "新增服务属性";
                        that.serviceProperdata = {
                            "exPropertyCode": "",
                            "exPropertyDefaultValue": "",
                            "exPropertyDisplayName": "",
                            "exPropertyType": "12",
                            "exPropertyValueModifyFlag": "1",
                            "status": "1",
                            "serviceId": that.servicesave.baseService.serviceId,
                        };
                        // 获得属性代码
                        $.when(Public.commonajax("coms.serverService", "getPropertyCode", "['" + that.servicesave.baseService.serviceId + "','" + that.servicesave.baseService.serviceCode + "']"))
                            .done(function(res) {
                                if (res.code == 200) {
                                    that.serviceProperdata.exPropertyCode = res.body;
                                }
                            });
                    }

                },
                //服务扩展属性保存
                servicePropersave() {
                    var that = this;
                    $.when(Public.commonajax("coms.serverService", "saveServiceProperty", "[" + JSON.stringify(that.serviceProperdata) + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("提交成功");
                                $("#ServiceProperty").modal("hide");
                                if (that.servicePropertit == "新增服务属性") {
                                    that.servicesave.servicePropertyList.push(res.body)
                                }
                            } else {
                                Public.ajaxPrompt(res.msg);
                            }
                        });
                },
        },
        events: {
            'serviceIconId' (serviceIconId) {
                this.servicesave.baseService.serviceIconId = serviceIconId;
            }
        },
        watch: {
            //服务编码根据服务类别选择来生成并且只有在新增的时候才请求获取服务编码（serviceCode）
            'servicesave.baseService.serviceType' (val, oldval) {
                var that = this;
                if (that.servicesavetitle == "新增服务") {
                    if (val != oldval && val != "") {
                        $.when(Public.commonajax("base.baseServiceService", "getServicecode", "['" + val + "']"))
                            .done(function(res) {
                                if (res.code == 200) {
                                    that.servicesave.baseService.serviceCode = res.body
                                } else {
                                    Public.ajaxPrompt(res.msg);

                                }
                            });
                    }
                }

            }
        },
}
$(function() {

})
</script>
<style scoped>
.servicelist {
    padding: 20px
}

.servicelist table th {
    text-align: center;
    line-height: 36px;
    height: 36px;
    font-weight: normal;
}

.servicelist table td {
    line-height: 40px;
    text-align: center;
}

.servicelist table tr td:nth-child(1) {
    color: #66C875;
    font-size: 23px;
}

.servicelist table tr td:nth-child(3) {
    color: #898989
}

.servicelist table tr td:nth-child(5) {
    color: #999999
}

.servicelist table tr td .glyphicon-pencil {
    display: inline-block;
    width: 30px;
    height: 30px;
}

.servicelist table tr td .glyphicon-pencil:hover {
    color: #1dc499;
    cursor: pointer;
}


/*
.btn-success,
.btn-success:hover,
.btn-success:focus,
.btn-success.focus,
.btn-success:active {
    background-color: #1dc499;
    border-color: #1dc499;
}*/

.service_add {
    max-height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
}

.service_add h3 {
    font-size: 16px;
    line-height: 30px;
    height: 30px;
    margin: 20px auto 20px;
    color: #1fc49a;
    width: 90%;
    border-bottom: 2px solid #e5e5e5
}

.service_add h3:nth-child(1) {
    margin-top: 0;
}

.tbline {
    border-top: 1px solid #ccc;
    margin-top: 20px;
    padding-top: 20px;
    height: 60px;
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

#ServicePropertylist {
    width: 90%;
    margin: 0 auto;
}

#ServicePropertylist th {
    background: #19ab85;
    color: #fff;
    text-align: center;
}

#ServicePropertylist td {
    text-align: center;
}

.selcetmenu {
    width: 100%;
    position: absolute;
    top: 35px;
    left: 0;
    z-index: 99;
    background: #FAFAFC;
    display: none;
}

.selcetmenu li {
    padding: 0 10px;
}

.selcetmenu li h4 {
    line-height: 40px;
    height: 40px;
    font-size: 14px;
}

.selcetmenu li h4 span {
    margin-right: 10px;
    color: #19ab85
}

.selcetmenu li dl {
    display: none;
}

.selcetmenu li dl dd {
    height: 30px;
    line-height: 30px;
    padding: 0 30px
}

.selcetmenu li dl dd:hover {
    background: #19ab85;
    color: #fff
}

.effective {
    color: #999999
}

.checkbox-inline:last-child {
    margin-left: 0
}
</style>
