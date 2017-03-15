<template>
    <div class="index clearafter">
        <module-head></module-head>
        <div class="content cbafter">
            <div class="w220 fl">
                <menu-list></menu-list>
            </div>
            <div class="w980 fr">
                <h1>慢病病种分级维护</h1>
                <div class="w940_two cbafter">
                    <div class="fl w460">
                        <div class="h2_tit">
                            <h2 class="fl">慢病病种维护</h2>
                            <a class="fr" @click="addoreditchronicLevel(unit)">增加</a>
                        </div>
                        <ul class="list">
                            <li v-for="item in chronicLevel.lookdata.chroniclist">
                                <div>{{item.chronicText?item.chronicText:item.chronicName}}
                                    <span v-for="item2 in item.chroniclevelList">{{item2.levelName}}</span></div>
                                <div>
                                    <p class="edit" @click="addoreditchronicLevel(item)"></p>
                                    <p class="dele" @click="delechronicLevel"></p>
                                </div>
                                <span class="confirmdiv2">
                                     <button class='btn btn-success savedata' @click="delechronicLevelsave(item,$index)">确定</button>
                                      <button type='button' class='btn btn-danger cancledata' @click="delechronicLevelcancel">取消</button>
                                  </span>
                            </li>
                        </ul>
                    </div>
                    <div class="fr w460">
                        <div class="h2_tit">
                            <h2 class="fl">慢病管理方案模板维护</h2>
                            <a class="fr" @click="addchronicManagerPlan(item)">增加</a>
                        </div>
                        <ul class="list">
                            <li v-for="item in chronicManagerPlan.lookdata.chronicManagerPlanlist">
                                <div>{{item.planName}}</div>
                                <div>
                                    <p class="edit" @click="addchronicManagerPlan(item)"></p>
                                    <p class="dele" @click="delechronicLevel"></p>
                                </div>
                                <span class="confirmdiv2">
                                     <button class='btn btn-success savedata'  @click="delechronicManagerPlansave(item,$index)">确定</button>
                                      <button type='button' class='btn btn-danger cancledata'  @click="delechronicLevelcancel" >取消</button>
                                  </span>
                            </li>
                    </div>
                </div>
                <div class="w940_one cbafter">
                    <div class="h2_tit">
                        <h2 class="fl">疾病关联自测指标维护</h2>
                    </div>
                    <div class="fl w560">
                        <ul class="list">
                            <li v-for="item in chronicSelfTest.lookdata.chronicSelfTestlist">
                                <p @click="showChronicMonitorIndicator(item)">{{item.chronicText}}</p>
                                <p>{{item.list.join('+')}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="fr w360">
                        <a @click="showChronicMonitorIndicator(item)">
                            <button></button>
                            <p>维护关联自测指标</p>
                        </a>
                        <a data-toggle="modal" data-target="#myModal-maintain-target">
                            <button></button>
                            <p>维护全部自测指标</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 慢病病种维护 -->
        <div class="modal fade" id="addchronicLevel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                {{chronicLevel.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" v-on:submit.prevent="addchronicLevelsave">
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">疾病名称 :</label>
                                <div class="col-md-8">
                                    <input type="hidden" v-model="chronicLevel.subdata.chronic">
                                    <input type="input" class="form-control" name="chronicName" placeholder="请输入疾病名称" v-model="chronicLevel.subdata.chronicName" required maxlength="32">
                                </div>
                            </div>
                            <div class="form-group" v-for="item in chronicLevel.subdata.chroniclevelList">
                                <label for="" class="col-md-3 control-label">疾病分级 :</label>
                                <div class="col-md-8">
                                    <input type="input" class="form-control" name="{{item.levelName?'levelName':'newlevelName'}}" placeholder="请输入疾病分级" value="{{item.levelName}}" data-chronicLevel="{{item.chronicLevel?item.chronicLevel:''}}" maxlength="32">
                                </div>
                                <div class="col-md-1" v-if="$index>0" @click="delelevelName($index,$event)"><span class="del_btn"></span></div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label"></label>
                                <div class="col-md-8">
                                    <a class="btn btn-add" @click="addlevelName">添加</a>
                                </div>
                            </div>
                            <div class="form-group topline">
                                <button type="submit" class="default blue center">保存</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- 管理方案模板维护 -->
        <div class="modal fade bs-example-modal-lg" id="addchronicManagerPlan" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                {{chronicManagerPlan.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" v-on:submit.prevent="addchronicManagerPlansave">
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">疾病名称：</label>
                                <div class="col-md-8">
                                    <select class="form-control" id="jbbz" v-model="chronicManagerPlan.subdata.chronic" required>
                                        <option v-for="item in chronicList" value="{{item.chronic}}">{{item.chronicText}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">方案标题 :</label>
                                <div class="col-md-8">
                                    <input type="input" class="form-control" name="planName" placeholder="请输入方案标题" v-model="chronicManagerPlan.subdata.planName" maxlength="32" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">方案模板 :</label>
                                <div class="col-md-8">
                                    <div id="summernote" class="form-control"></div>
                                </div>
                            </div>
                            <div class="form-group topline">
                                <button type="submit" class="default blue center">保存</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- 修改慢病关联自测指标 -->
        <div class="modal fade bs-example-modal-lg" id="saveChronicMonitorIndicator" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                {{chronicSelfTest.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" v-on:submit.prevent="saveChronicMonitorIndicator">
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">疾病名称:</label>
                                <div class="col-md-8">
                                    <select class="form-control" id="jbbz2" v-model="chronicSelfTest.subdata.chronic" :disabled="chronicSelfTest.lookdata.isdisabled">
                                        <option v-for="item in chronicList" value="{{item.chronic}}">{{item.chronicText}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="selectChronicMonitor form-group">
                                <ul>
                                    <li>
                                        <div class="fl">关联自测指标</div>
                                        <div class="fr">是否推送危急值</div>
                                    </li>
                                    <li>
                                        <div class="fl">关联自测指标</div>
                                        <div class="fr">是否推送危急值</div>
                                    </li>
                                    <li v-for="item in chronicSelfTest.lookdata.selfTestlist">
                                        <div class="fl">
                                            <label class="checkbox-inline">
                                                <input type="checkbox" name="indexId" value="{{item.indexId}}" data-indexBelongName="{{item.indexBelongName}}" :checked="item.ischecked" @click="clickchangeautoSendFlag($index)">{{item.indexName}}
                                            </label>
                                        </div>
                                        <div class="fr">
                                            <p class="checkboxThree">
                                                <input type="checkbox" :id="$index" class="chk_3" name="autoSendFlag" :checked="item.ischecked&&item.asfischecked" value="1" />
                                                <label :for="$index" @click="changeautoSendFlag"></label>
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="form-group topline">
                                <button type="submit" class="default blue center">保存</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- 自测指标列表 -->
        <div class="modal fade" id="myModal-maintain-target" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">维护自测指标</h4>
                    </div>
                    <div class="modal-body">
                        <span class="mark" v-for="item in chronicSelfTest.lookdata.selfTestlist" @click="add_selftest(item)">{{item.indexName}}</span>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="cencert-add" @click="add_selftest(item)">添加</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>
        <!--新增自测指标-->
        <div class="modal fade bs-example-modal-lg" id="add_selftest" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                {{myselftesttitel}}</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" id="addform" v-on:submit.prevent="add_selftest_save">
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">自测指标分类: <span class="start">*</span></label>
                                <div class="col-md-8">
                                    <input class="form-control" type="text" placeholder="请输入指标分类" v-model="myselftest.selftestindexdef.indexBelongName" required name="indexBelongName" maxlength="5">
                                    <!-- <select v-model="myselftest.selftestindexdef.indexBelongName" required name="indexBelongName" class="form-control">
                                      <option v-for="item in chronicList" value="{{item.chronic}}">{{item.chronicText}}</option>
                                    </select> -->
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">自测指标名称: <span class="start">*</span></label>
                                <div class="col-md-8">
                                    <input class="form-control" type="text" placeholder="请输入指标名称" v-model="myselftest.selftestindexdef.indexName" required name="indexName" maxlength="20">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">自测指标单位:<span class="start">*</span> </label>
                                <div class="col-md-8">
                                    <input class="form-control" type="text" placeholder="请输入指标单位" v-model="myselftest.selftestindexdef.indexUnit" required name="indexUnit" maxlength="10">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">指定类型: <span class="start">*</span></label>
                                <div class="col-md-8">
                                    <label class="radio-inline">
                                        <input type="radio" name="type_val" v-model="myselftest.selftestindexdef.indexType" value="01"> 定量型
                                    </label>
                                    <label class="radio-inline">
                                        <input type="radio" name="type_val" v-model="myselftest.selftestindexdef.indexType" value="02"> 定性型
                                    </label>
                                </div>
                            </div>
                            <div class="form-group" v-show="myselftest.selftestindexdef.indexType=='01'">
                                <label class="col-md-3 control-label">正常值范围:<span class="start">*</span> </label>
                                <div class="col-md-3">
                                    <input type="text" class="form-control" v-model="myselftest.selftestindexdef.quantifyIndexNormalTop" placeholder="上限：" :required="myselftest.selftestindexdef.indexType=='01'" maxlength="11" @blur="amount">
                                </div>
                                <div class="col-md-3">
                                    <input type="text" class="form-control" v-model="myselftest.selftestindexdef.quantifyIndexNormalBottom" placeholder="下限：" :required="myselftest.selftestindexdef.indexType=='01'" maxlength="11" @blur="amount">
                                </div>
                                <div class="col-md-3 start" v-if="lessthan">下限不能大于上限</div>
                            </div>
                            <div class="form-group" v-show="myselftest.selftestindexdef.indexType=='01'">
                                <label for="" class="col-md-3 control-label">危急值范围:<span class="start">*</span> </label>
                                <div class="col-md-3">
                                    <input type="text" class="form-control" placeholder="上限：" v-model="myselftest.selftestindexdef.quantifyIndexDangerTop" :required="myselftest.selftestindexdef.indexType=='01'">
                                </div>
                                <div class="col-md-3">
                                    <input type="text" class="form-control" placeholder="下限：" v-model="myselftest.selftestindexdef.quantifyIndexDangerBottom" :required="myselftest.selftestindexdef.indexType=='01'">
                                </div>
                                <div class="col-md-3 start" v-if="lessthan2">下限不能大于上限</div>
                                 <div class="col-md-3 start" v-if="parseFloat(myselftest.selftestindexdef.quantifyIndexDangerTop)<=parseFloat(myselftest.selftestindexdef.quantifyIndexNormalTop)">危急值上限要大于正常值上限</div>
                                  <div class="col-md-3 start" v-if="
parseFloat(myselftest.selftestindexdef.quantifyIndexDangerBottom)>=parseFloat(myselftest.selftestindexdef.quantifyIndexNormalBottom)">危急值下限要小于正常值下限</div>
                                 
                            </div>
                            <div v-show="myselftest.selftestindexdef.indexType=='02'">
                                <div class="form-group" v-for="item in myselftest.selftestindexqualitydefList" data-qualityIndexValId="item.qualityIndexValId">
                                    <label class="col-md-3 control-label">指标值:<span class="start">*</span> </label>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" v-model="item.qualityIndexVal" placeholder="请输入指标值" :required="myselftest.selftestindexdef.indexType=='02'" maxlength="11" @blur="amount">
                                    </div>
                                    <div class="col-md-4">
                                        <label class="radio-inline">
                                            <input type="radio" name="zb_val{{$index}}" value="01" v-model="item.qualityIndexState" :required="myselftest.selftestindexdef.indexType=='02'"> 正常值
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="zb_val{{$index}}" value="02" v-model="item.qualityIndexState" :required="myselftest.selftestindexdef.indexType=='02'"> 异常值
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="zb_val{{$index}}" value="03" v-model="item.qualityIndexState" :required="myselftest.selftestindexdef.indexType=='02'"> 危急值
                                        </label>
                                    </div>
                                    <div class="col-md-2">
                                        <span class="btn-add2 glyphicon glyphicon-plus-sign" @click="addDxonerow"></span>
                                        <span class="btn-del2 glyphicon glyphicon-remove-circle" @click="delDxonerow($index)" v-if="$index>0"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">指标测量时间: <span class="start">*</span></label>
                                <div class="col-md-8">
                                    <label class="checkbox-inline">
                                        <input type="checkbox" v-model="myselftest.selftestindexdef.specifyTimeFlagBoolean">指定时间
                                    </label>
                                    <label class="checkbox-inline">
                                        <input type="checkbox" v-model="myselftest.selftestindexdef.freeTimeFlagBoolean"> 自选时间
                                    </label>
                                </div>
                            </div>
                            <div v-show="myselftest.selftestindexdef.specifyTimeFlagBoolean">
                                <div class="form-group" v-for="item in myselftest.selftestindextimedefList" data-indexTimeId="item.indexTimeId">
                                    <label for="" class="col-md-3 control-label"><span class="start">*</span></label>
                                    <div class="col-md-4">
                                        <input type="text" class="form-control" placeholder="请输入指定时间，如早餐前" v-model="item.indexTimeName" :required="myselftest.selftestindexdef.specifyTimeFlagBoolean" maxlength="10">
                                    </div>
                                    <div class="col-md-4">
                                        <span class="btn-add2 glyphicon glyphicon-plus-sign" @click="addZdsjonerow"></span>
                                        <span class="btn-del2 glyphicon glyphicon-remove-circle" @click="delZdsjonerow($index)" v-if="$index>0"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" v-for="item in myselftest.selftestindexdangeractionList" data-indexActionId="item.indexActionId">
                                <label for="" class="col-md-3 control-label">危急采取措施:<span class="start">*</span> </label>
                                <div class="col-md-6">
                                    <input class="form-control" type="text" placeholder="请输入危急采取措施" required v-model="item.indexActionName" maxlength="20">
                                </div>
                                <div class="col-md-2">
                                    <span class="btn-add2 glyphicon glyphicon-plus-sign" @click="addWjzcsonerow"></span>
                                    <span class="btn-del2 glyphicon glyphicon-remove-circle" @click="delWjzcsonerow($index)" v-if="$index>0"></span></div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">异常值提示信息: </label>
                                <div class="col-md-8">
                                    <textarea class="form-control" rows="3" placeholder="请输入异常值提示信息" v-model="myselftest.selftestindexdef.abnormalMessage" required maxlength="50"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">危急值提示信息: </label>
                                <div class="col-md-8">
                                    <textarea class="form-control" rows="3" placeholder="请输入危急值提示信息" v-model="myselftest.selftestindexdef.dangerMessage" required maxlength="50"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="default ok center">保存</button>
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
import 'assets/lib/bootstrap-summernote/summernote.css'
require('summernote')
import 'assets/reset.css'
import Public from 'assets/public.js'
import moduleHead from 'components/module-head'
import menuList from 'components/menu-list'
export default {
    data() {
            return {
                // 慢病慢病分级start
                chronicLevel: {
                    title: "",
                    lookdata: {
                        chroniclist: [],
                    },
                    subdata: {
                        'chronicName': '',
                        'chronic': 0,
                        'chroniclevelList': [{
                            "levelName": "",
                            'chronicLevel': '',
                        }],
                    },
                },
                // 慢病慢病分级end
                // 慢病管理方案模板维护start
                chronicList: [],
                chronicManagerPlan: {
                    title: "",
                    lookdata: {
                        chronicManagerPlanlist: [],
                    },
                    subdata: {
                        "chronic": "",
                        "planName": "",
                        "chronicManagerPlan": "",
                        "planContent": ""
                    },
                },
                // 慢病管理方案模板维护end
                //疾病关联自测指标维护start
                chronicSelfTest: {
                    title: "",
                    chronicid: "",
                    lookdata: {
                        chronicSelfTestlist: [],
                        selfTestlist: [],
                        isdisabled: false
                    },
                    subdata: {
                        "chronic": "",
                        "chronicmonitorindicatorList": []
                    },

                },
                // 疾病关联自测指标维护end
                //自测指标维护start
                myselftest: {
                    "selftestindexdef": {
                        "indexId": "",
                        "indexBelongName": "",
                        "indexName": "",
                        "indexUnit": "",
                        "indexType": "01",
                        "quantifyIndexNormalTop": "",
                        "quantifyIndexNormalBottom": "",
                        "quantifyIndexDangerTop": "",
                        "quantifyIndexDangerBottom": "",
                        "abnormalMessage": "",
                        "dangerMessage": "",
                        "specifyTimeFlagBoolean": true,
                        "freeTimeFlagBoolean": true
                    },
                    "selftestindextimedefList": [],
                    "selftestindexqualitydefList": [],
                    "selftestindexdangeractionList": [],
                },
                myselftesttitel: "",
                // 自测指标维护end
            }
        },
        computed: {
            'lessthan': function() {
                 console.log(parseFloat(this.myselftest.selftestindexdef.quantifyIndexNormalTop));
                console.log(parseFloat(this.myselftest.selftestindexdef.quantifyIndexNormalBottom));
                if (parseFloat(this.myselftest.selftestindexdef.quantifyIndexNormalTop) < parseFloat(this.myselftest.selftestindexdef.quantifyIndexNormalBottom)) {
                    return true
                }
            },
            'lessthan2': function() {
                if (parseFloat(this.myselftest.selftestindexdef.quantifyIndexDangerTop) < parseFloat(this.myselftest.selftestindexdef.quantifyIndexDangerBottom)) {
                    return true
                }
            },
        },
        components: {
            moduleHead, menuList
        },
        ready() {
            var that = this;
            // 获取慢病种类
            $.when(Public.commonajax("coms.commonChronicService", "findCommonChronic", "[[]]"))
                .done(function(res) {
                    var temobj = {
                        "chronic": '',
                        "chronicText": "请选择疾病"
                    };
                    res.body.unshift(temobj);
                    that.chronicList = res.body;

                })
                // 获取慢病分级列表
            $.when(Public.commonajax("coms.commonChronicService", "findChronicLevel", "[]"))
                .done(function(res) {
                    that.chronicLevel.lookdata.chroniclist = res.body;
                });
            // 获取慢病管理方案模板维护列表
            $.when(Public.commonajax("coms.commonChronicService", "findChronicManagerPlanList", "[]"))
                .done(function(res) {
                    that.chronicManagerPlan.lookdata.chronicManagerPlanlist = res.body;
                });
            // 获取慢病关联指标列表
            $.when(Public.commonajax("coms.commonChronicService", "getChronicmonitorindicatorList", "[]"))
                .done(function(res) {
                    that.chronicSelfTest.lookdata.chronicSelfTestlist = res.body;
                });
            // 获取自测指标列表
            $.when(Public.commonajax("coms.selftestindexdefService", "findSelftestindexdef", "[]"))
                .done(function(res) {
                    $.each(res.body, function(index, el) {
                        el.ischecked = false;
                        el.asfischecked = false;
                    });
                    that.chronicSelfTest.lookdata.selfTestlist = res.body;
                    // console.log(res.body);
                });
            $("#summernote").summernote({
                height: 300
                    /*lang: 'zh-CN',*/
                    /*onblur: function(e) {
                     $etitor.val($etitor.code())
                     }*/
            });
        },
        methods: {
             // 验证小数点只能保留两位
                amount(event) {
                   var th= event.target;
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
            // 新建或修改慢病等级弹出框
            addoreditchronicLevel(item) {
                    $("#addchronicLevel").modal("show");
                    this.chronicLevel.subdata.chroniclevelList = [];

                    if (item) {
                        this.chronicLevel.title = "修改慢病病种分级维护";
                        this.chronicLevel.subdata.chroniclevelList = item.chroniclevelList;
                        this.chronicLevel.subdata.chronicName = item.chronicText ? item.chronicText : item.chronicName;
                        this.chronicLevel.subdata.chronic = item.chronic;

                    } else {
                        var temobj = {
                            "levelName": '',
                        };
                        this.chronicLevel.subdata.chroniclevelList.push(temobj);
                        this.chronicLevel.title = "新增慢病病种分级维护";
                        this.chronicLevel.subdata.chronicName = '';
                        this.chronicLevel.subdata.chronic = 0;
                    }
                },
                // 新建慢病等级保存
                addchronicLevelsave() {
                    var that = this;
                    var levelName = $("#addchronicLevel").find("input[name='levelName']");
                    var newlevelName = $("#addchronicLevel").find("input[name='newlevelName']");
                    // console.log(levelName.length);
                    that.chronicLevel.subdata.chroniclevelList = [];
                    // console.log(that.chronicLevel.subdata.chroniclevelList);
                    $.each(newlevelName, function(index, el) {
                        var temobj = {
                            "levelName": $(el).val(),
                        };
                        if ($(el).val() != "") {
                            that.chronicLevel.subdata.chroniclevelList.push(temobj);
                        }
                    });
                    $.each(levelName, function(index, el) {
                        var temobj = {
                            "levelName": $(el).val(),
                            "chronicLevel": $(el).attr("data-chronicLevel"),
                        };
                        that.chronicLevel.subdata.chroniclevelList.push(temobj);
                    });

                    $.when(Public.commonajax("coms.commonChronicService", "saveCommonChronic", "[" + JSON.stringify(that.chronicLevel.subdata) + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("保存成功");
                                $("#addchronicLevel").modal("hide");
                                $("#addchronicLevel").find("input[name='newlevelName']").val("");
                                // if(that.chronicLevel.subdata.chronic==0){
                                //    that.chronicLevel.lookdata.chroniclist.unshift(res.body);
                                // }
                                that.chronicLevel.subdata.chronicName = "";
                                that.chronicLevel.subdata.chroniclevelList = [];
                                that.chronicLevel.subdata.chronic = 0;
                                // 获取慢病慢病分级列表更新列表
                                // $.when(Public.commonajax("coms.commonChronicService", "findChronicLevel", "[]"))
                                //     .done(function(res2) {
                                //         that.chronicLevel.lookdata.chroniclist = res2.body;

                                //     });
                                //需要页面重载 因为会影响慢病管理方案模板维护和疾病关联自测指标维护
                                location.reload();
                            } else {
                              
                                alert(res.msg)
                            }

                        });

                },
                //新增页面中增加一行慢病等级
                addlevelName() {
                    var temobj = {
                        "levelName": "",
                    };
                    this.chronicLevel.subdata.chroniclevelList.push(temobj);
                },
                // 新增页面中删除一行慢病等级
                delelevelName(index, event) {
                    var that = this;
                    var chroniclevel = $(event.target).closest('div').prev(".col-md-8").find('input').attr("data-chroniclevel");
                    console.log(chroniclevel);
                    if (chroniclevel != "") {
                        $.when(Public.commonajax("coms.commonChronicService", "deleteChronicLevel", "[" + chroniclevel + "]"))
                            .done(function(res) {
                                if (res.code == 200) {
                                    that.chronicLevel.subdata.chroniclevelList.splice(index, 1);
                                }

                            });
                    } else {
                        that.chronicLevel.subdata.chroniclevelList.splice(index, 1);
                    }
                },
                // 删除慢病等级维护 与慢病方案公用  
                delechronicLevel(event) {
                    $(event.target).closest('div').next('.confirmdiv2').show();

                },
                // 删除慢病等级维护确定
                delechronicLevelsave(item, index) {
                    var that = this;
                    $.when(Public.commonajax("coms.commonChronicService", "deleteCommonChronicAndChronicLevel", "[" + item.chronic + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                if (res.body) {
                                    Public.ajaxPrompt(res.body);
                                } else {
                                    Public.ajaxPrompt("删除成功");
                                    location.reload();
                                }

                            }

                            // that.chronicLevel.lookdata.chroniclist.splice(index, 1);

                        });
                },
                // 删除慢病等级维护取消与慢病方案公用
                delechronicLevelcancel(event) {
                    $(event.target).closest('.confirmdiv2').hide();
                },
                // 新建或修改慢病管理方案模板弹出框
                addchronicManagerPlan(item) {
                    $("#addchronicManagerPlan").modal("show");
                    $('#summernote').summernote('code', '');
                    this.chronicManagerPlan.subdata.planContent = '';
                    this.chronicManagerPlan.subdata.planName = '';
                    this.chronicManagerPlan.subdata.chronic = '';
                    this.chronicManagerPlan.subdata.chronicManagerPlan = '';
                    if (item) {
                        this.chronicManagerPlan.title = "修改慢病管理方案模板";
                        this.chronicManagerPlan.subdata.chronicManagerPlan = item.chronicManagerPlan;
                        this.chronicManagerPlan.subdata.planName = item.planName;
                        this.chronicManagerPlan.subdata.chronic = item.chronic;
                        $('#summernote').summernote('code', item.planContent);
                    } else {
                        this.chronicManagerPlan.subdata.chronicManagerPlan = 0;
                        this.chronicManagerPlan.title = "新增慢病管理方案模板";
                    }
                },
                // 新建或修改慢病管理方案模板保存
                addchronicManagerPlansave() {
                    var that = this;
                    // this.chronicManagerPlan.subdata.chronic = $("#jbbz").val();
                    this.chronicManagerPlan.subdata.planContent = $('#summernote').summernote('code');
                    $.when(Public.commonajax("coms.commonChronicService", "saveChronicmanagerplan", "[" + JSON.stringify(this.chronicManagerPlan.subdata) + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("保存成功");
                                $("#addchronicManagerPlan").modal("hide");
                                that.chronicManagerPlan.subdata.chronic = '';
                                // 获取慢病管理方案模板维护列表
                                $.when(Public.commonajax("coms.commonChronicService", "findChronicManagerPlanList", "[]"))
                                    .done(function(res) {
                                        that.chronicManagerPlan.lookdata.chronicManagerPlanlist = res.body;
                                    });
                            } else {
                                  alert(res.msg)
                            }
                        });
                },
                // 删除慢病管理方案模板确定
                delechronicManagerPlansave(item, index) {
                    var that = this;
                    $.when(Public.commonajax("coms.commonChronicService", "deleteChronicManagePlanByPlanId", "[" + item.chronicManagerPlan + "]"))
                        .done(function(res) {
                            Public.ajaxPrompt("删除成功");
                            that.chronicManagerPlan.lookdata.chronicManagerPlanlist.splice(index, 1);
                        });
                },

                // 修改慢病关联自测指标弹出框
                showChronicMonitorIndicator(item) {
                    this.chronicSelfTest.subdata.chronicmonitorindicatorList = [];
                    this.chronicSelfTest.subdata.chronic = '';
                    $("#saveChronicMonitorIndicator").modal("show");
                    if (item) {
                        this.chronicSelfTest.title = "修改疾病关联自测指标";
                        this.chronicSelfTest.subdata.chronic = item.chronic;
                        this.chronicSelfTest.lookdata.isdisabled = true;
                        // this.chronicLevel.subdata.chronicName = item.chronicText ? item.chronicText : item.chronicName;
                        // this.chronicLevel.subdata.chronic = item.chronic;

                    } else {
                        // var temobj = {
                        //     "levelName": '',
                        // };
                        // this.chronicLevel.subdata.chroniclevelList.push(temobj);
                        this.chronicSelfTest.lookdata.isdisabled = false;
                        this.chronicSelfTest.title = "新增疾病关联自测指标";
                        // this.chronicLevel.subdata.chronicName = '';
                        // this.chronicLevel.subdata.chronic = 0;
                    }
                },
                // 修改慢病关联自测指标保存
                saveChronicMonitorIndicator() {
                    var that = this;
                    var indexId_domarr = $(".selectChronicMonitor").find("input[name='indexId']:checked");
                    console.log(indexId_domarr);
                    var autoSendFlag_domarr = $(".selectChronicMonitor").find("input[name='indexId']:checked").closest('div').next("div").find("input[name='autoSendFlag']");
                    $.each(indexId_domarr, function(index, el) {
                        var temobj = {
                            "monitorIndicator": $(el).val(),
                            "autoSendFlag": $(autoSendFlag_domarr[index]).val(),
                        };
                        // console.log(temobj)
                        that.chronicSelfTest.subdata.chronicmonitorindicatorList.push(temobj)
                    });
                    console.log(this.chronicSelfTest.subdata);
                    $.when(Public.commonajax("coms.commonChronicService", "saveChronicMonitorIndicator", "[" + JSON.stringify(this.chronicSelfTest.subdata) + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                $("#saveChronicMonitorIndicator").modal("hide");
                                Public.ajaxPrompt("保存成功");
                                // 获取慢病关联指标列表
                                $.when(Public.commonajax("coms.commonChronicService", "getChronicmonitorindicatorList", "[]"))
                                    .done(function(res) {
                                        that.chronicSelfTest.lookdata.chronicSelfTestlist = res.body;
                                    });

                            }

                        });
                },
                // 点击检测指标关联是否推送
                clickchangeautoSendFlag(index) {
                    this.chronicSelfTest.lookdata.selfTestlist[index].ischecked = !this.chronicSelfTest.lookdata.selfTestlist[index].ischecked;
                    this.chronicSelfTest.lookdata.selfTestlist[index].asfischecked = this.chronicSelfTest.lookdata.selfTestlist[index].ischecked
                },
                // 点击改变是否推送的值
                changeautoSendFlag(event) {
                    if ($(event.target).prev('input').val() == 1) {
                        $(event.target).prev('input').val("0")
                    } else {
                        $(event.target).prev('input').val("1")
                    }
                },
                // 新增和修改自侧指标弹窗
                add_selftest(item) {
                    var that = this;
                    $("#add_selftest").modal("show");
                    var temobj1 = {
                            "indexTimeName": "",
                            "indexTimeId": 0
                        },
                        temobj2 = {
                            "qualityIndexState": "",
                            "qualityIndexVal": ""
                        },
                        temobj3 = {
                            "indexActionName": "",
                            indexActionId: 0
                        };
                    if (item) {
                        this.myselftest.selftestindexdef.indexId = item.indexId;
                        that.myselftesttitel = "维护自测指标";
                        $.when(Public.commonajax("coms.selftestindexdefService", "getSelftestindexdefDetailByIndexId", "[" + item.indexId + "]"))
                            .done(function(res) {
                                var data = res.body;
                                if (res.code == 200) {
                                    // Public.ajaxPrompt("huo成功");
                                    that.myselftest.selftestindexdef.indexId = data.indexId;
                                    that.myselftest.selftestindexdef.indexBelongName = data.indexBelongName;
                                    that.myselftest.selftestindexdef.indexName = data.indexName;
                                    that.myselftest.selftestindexdef.indexUnit = data.indexUnit;
                                    that.myselftest.selftestindexdef.indexType = data.indexType;
                                    that.myselftest.selftestindexdef.abnormalMessage = data.abnormalMessage;
                                    that.myselftest.selftestindexdef.dangerMessage = data.dangerMessage;
                                    that.myselftest.selftestindexdef.specifyTimeFlagBoolean = data.specifyTimeFlagBoolean;
                                    that.myselftest.selftestindexdef.freeTimeFlagBoolean = data.freeTimeFlagBoolean;
                                    that.myselftest.selftestindexdangeractionList = data.selftestindexdangeractionList;
                                    if (data.indexType == "02") {
                                        that.myselftest.selftestindexdef.quantifyIndexNormalTop = "";
                                        that.myselftest.selftestindexdef.quantifyIndexNormalBottom = "";
                                        that.myselftest.selftestindexdef.quantifyIndexDangerTop = "";
                                        that.myselftest.selftestindexdef.quantifyIndexDangerBottom = "";
                                        that.myselftest.selftestindexqualitydefList = data.selftestindexqualitydefList;

                                    } else {
                                        that.myselftest.selftestindexqualitydefList = [];
                                        that.myselftest.selftestindexdef.quantifyIndexNormalTop = data.quantifyIndexNormalTop;
                                        that.myselftest.selftestindexdef.quantifyIndexNormalBottom = data.quantifyIndexNormalBottom;
                                        that.myselftest.selftestindexdef.quantifyIndexDangerTop = data.quantifyIndexDangerTop;
                                        that.myselftest.selftestindexdef.quantifyIndexDangerBottom = data.quantifyIndexDangerBottom;
                                        that.myselftest.selftestindexqualitydefList.push(temobj2)
                                    };
                                    if (data.specifyTimeFlagBoolean == false) {
                                        that.myselftest.selftestindextimedefList = [];
                                        that.myselftest.selftestindextimedefList.push(temobj1);
                                    } else {
                                        that.myselftest.selftestindextimedefList = data.selftestindextimedefList;
                                    }

                                }
                            });
                    } else {
                        that.myselftesttitel = "新增自测指标";
                        this.myselftest = {
                            "selftestindexdef": {
                                "indexId": 0,
                                "indexBelongName": "",
                                "indexName": "",
                                "indexUnit": "",
                                "indexType": "01",
                                "quantifyIndexNormalTop": "",
                                "quantifyIndexNormalBottom": "",
                                "quantifyIndexDangerTop": "",
                                "quantifyIndexDangerBottom": "",
                                "abnormalMessage": "",
                                "dangerMessage": "",
                                "specifyTimeFlagBoolean": true,
                                "freeTimeFlagBoolean": true
                            },
                            "selftestindextimedefList": [],
                            "selftestindexqualitydefList": [],
                            "selftestindexdangeractionList": [],
                        };

                    }


                    //先设置一行空行
                    this.myselftest.selftestindextimedefList.push(temobj1);
                    this.myselftest.selftestindexqualitydefList.push(temobj2);
                    this.myselftest.selftestindexdangeractionList.push(temobj3);

                },
                // 新增自侧指标保存
                add_selftest_save() {
                    var that = this;
                    console.log(this.myselftest);
                    if (this.myselftest.selftestindexdef.indexType == "02") {
                        this.myselftest.selftestindexdef.quantifyIndexNormalTop = "";
                        this.myselftest.selftestindexdef.quantifyIndexNormalBottom = "";
                        this.myselftest.selftestindexdef.quantifyIndexDangerTop = "";
                        this.myselftest.selftestindexdef.quantifyIndexDangerBottom = "";
                    } else {
                        this.myselftest.selftestindexqualitydefList = [];
                    };
                    if (this.myselftest.selftestindexdef.specifyTimeFlagBoolean == false) {
                        this.myselftest.selftestindextimedefList = [];
                    };
                    console.log(this.myselftest);
                    $.when(Public.commonajax("coms.selftestindexdefService", "saveSelftestindexdef", "[" + JSON.stringify(this.myselftest) + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("提交成功");
                                $("#add_selftest").modal("hide");
                                // 获取自测指标列表
                                $.when(Public.commonajax("coms.selftestindexdefService", "findSelftestindexdef", "[]"))
                                    .done(function(res) {
                                        $.each(res.body, function(index, el) {
                                            el.ischecked = false;
                                            el.asfischecked = false;
                                        });
                                        that.chronicSelfTest.lookdata.selfTestlist = res.body;
                                        // console.log(res.body);
                                    });
                            }else{
                                alert(res.msg)
                            }
                        });
                },
                // 增加定性指标一行
                addDxonerow() {
                    var temobj2 = {
                        "qualityIndexState": "",
                        "qualityIndexVal": ""
                    };
                    this.myselftest.selftestindexqualitydefList.push(temobj2);
                },
                // 删除定性指标一行
                delDxonerow(index) {
                    var that = this;
                    var qualityIndexValId = this.myselftest.selftestindexqualitydefList[index].qualityIndexValId;
                    if (this.myselftest.indexId && qualityIndexValId) {

                        $.when(Public.commonajax("coms.selftestindexdefService", "deleteQualitydef", "[" + qualityIndexValId + "," + this.myselftest.indexId + "]"))
                            .done(function(res) {
                                if (res.code == 200) {
                                    that.myselftest.selftestindexqualitydefList.splice(index, 1);
                                    Public.ajaxPrompt("删除成功");
                                }
                            });
                    } else {
                        that.myselftest.selftestindexqualitydefList.splice(index, 1);
                    }
                },
                // 增加指定时间指标一行
                addZdsjonerow() {
                    var temobj1 = {
                        "indexTimeName": ""
                    };
                    this.myselftest.selftestindextimedefList.push(temobj1);
                },
                // 删除指定时间指标一行
                delZdsjonerow(index) {
                    var that = this;
                    var indexTimeId = this.myselftest.selftestindextimedefList[index].indexTimeId;
                    if (this.myselftest.indexId && indexTimeId) {
                        $.when(Public.commonajax("coms.selftestindexdefService", "deleteTimedef", "[" + indexTimeId + "," + this.myselftest.indexId + "]"))
                            .done(function(res) {
                                if (res.code == 200) {
                                    that.myselftest.selftestindextimedefList.splice(index, 1);
                                    Public.ajaxPrompt("删除成功");
                                }
                            });
                    } else {
                        that.myselftest.selftestindextimedefList.splice(index, 1);
                    }
                },
                // 增加危急值措施一行
                addWjzcsonerow() {
                    var temobj3 = {
                        "indexActionName": ""
                    };
                    this.myselftest.selftestindexdangeractionList.push(temobj3);
                },
                // 删除危急值措施一行
                delWjzcsonerow(index) {
                    var that = this;
                    var indexActionId = this.myselftest.selftestindexdangeractionList[index].indexActionId;
                    if (this.myselftest.indexId && indexActionId) {
                        $.when(Public.commonajax("coms.selftestindexdefService", "deleteDangeraction", "[" + indexActionId + "," + this.myselftest.indexId + "]"))
                            .done(function(res) {
                                if (res.code == 200) {
                                    that.myselftest.selftestindexdangeractionList.splice(index, 1);
                                    Public.ajaxPrompt("删除成功");
                                }
                            });
                    } else {
                        that.myselftest.selftestindexdangeractionList.splice(index, 1);
                    }
                },


        },
        watch: {
            "chronicSelfTest.subdata.chronic": function(value, oldvalue) {
                var that = this;
                that.chronicSelfTest.subdata.chronic = value;
                //选择慢病之后全部变为false
                $.each(that.chronicSelfTest.lookdata.selfTestlist, function(index, el) {
                    el.ischecked = false;
                    el.asfischecked = false;
                })
                if (value != "") {
                    $.when(Public.commonajax("coms.commonChronicService", "getChronicMonitorIndicatorByChronic", "[" + value + "]"))
                        .done(function(res) {
                            $.each(res.body, function(index, el) {
                                $.each(that.chronicSelfTest.lookdata.selfTestlist, function(index2, el2) {
                                    if (el.monitorIndicator == el2.indexId) {
                                        el2.ischecked = true;
                                        // console.log(el.autoSendFlag);
                                        if (el.autoSendFlag == 1) {
                                            el2.asfischecked = true;
                                        }
                                    }
                                })
                            });
                            // console.log(that.chronicSelfTest.lookdata.selfTestlist);

                        });
                }
            }
        },
        events: {}

}
</script>
<style scoped>
/*慢病医生*/

.w460 {
    width: 460px
}

.h2_tit {
    padding: 0 10px 0 20px;
    border-bottom: 1px solid #e6e6e6;
    height: 42px
}

.h2_tit h2 {
    height: 42px;
    line-height: 42px;
    background: url(../../assets/img/h2_icon.png) no-repeat left center;
    padding-left: 30px;
    font-size: 16px;
}

.h2_tit a {
    display: block;
    height: 42px;
    line-height: 42px;
    float: right;
    width: 41px;
    background: url(../../assets/img/add.png) no-repeat center center;
    text-indent: -999rem
}

.h2_tit a:hover {
    cursor: pointer;
}

.content .w980 h1 {
    font-size: 20px;
    color: #333333;
    margin-bottom: 20px;
}

.w940_two>div {
    height: 250px;
    -webkit-box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    -moz-box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    background: #fafafa;
    border-radius: 10px;
}

.w940_two .list {
    overflow-y: auto;
    height: 208px
}

.w940_two .list li {
    height: 52px;
    position: relative;
}

.w940_two .list li>div {
    height: 52px;
    line-height: 52px;
}

.w940_two .list li>div:nth-child(1) {
    width: 340px;
    float: left;
    padding-left: 20px;
    font-size: 14px;
    /*   overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;*/
}

.w940_two .list li>div:nth-child(1) span {
    margin-left: 10px;
    color: #1dc499
}

.w940_two .list li>div:nth-child(2) {
    float: right;
    padding-right: 10px
}

.w940_two .list li>div p {
    height: 20px;
    width: 20px;
    border: none;
    margin: 15px 0 0 5px;
    display: inline-block;
}

.w940_two .list li>div p.edit {
    background: url(../../assets/img/edit2.png) no-repeat center center;
}

.w940_two .list li>div p.dele {
    background: url(../../assets/img/dele2.png) no-repeat center center;
}

.confirmdiv2 {
    position: absolute;
    bottom: -50px;
    right: 0px;
    z-index: 100000000000000000;
    padding: 10px;
    width: 140px;
    height: 70px;
    display: none;
}

.w940_two .list li>div p.edit:hover {
    background: url(../../assets/img/edit.png) no-repeat center center;
    border-radius: 3px;
    border: #cfcfcf 1px solid;
    cursor: pointer;
}

.w940_two .list li>div p.dele:hover {
    background: url(../../assets/img/dele.png) no-repeat center center;
    border-radius: 3px;
    border: #cfcfcf 1px solid;
    cursor: pointer;
    
}

.w940_two .list li:nth-child(2n) {
    background: #f7f7f7
}

.w940_two .list li:nth-child(2n+1) {
    background: #fff
}

.w940_two .list li:last-child {
    border-radius: 0 0 10px 10px
}

.w940_one {
    /*height: 250px;*/
    -webkit-box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    -moz-box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    background: #fff;
    border-radius: 10px;
    margin-top: 30px
}

.w940_one .h2_tit {
    background: #fafafa;
    border-radius: 10px 10px 0 0;
}

.w940_one .list {
    overflow: auto;
    padding: 15px 0;
    height: 356px;
}

.w940_one .list li {
    height: 52px;
    border-bottom: dashed 1px#d9e2e7;
    margin: 0 20px
}

.w940_one .list li p {
    height: 52px;
    line-height: 52px;
}

.w940_one .list li p:nth-child(1) {
    background: url(../../assets/img/point.png) no-repeat left center;
    width: 200px;
    float: left;
    padding-left: 20px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.w940_one .list li p:nth-child(1):hover {
    cursor: pointer;
}

.w940_one .list li p:nth-child(2) {
    width: 200px;
    float: right;
    padding-right: 10px;
    color: #1dc499;
     overflow: hidden;
    white-space: nowrap;
}

.w560 {
    width: 560px;
}

.w360 {
    width: 360px;
}

.w940_one .w560 {
    background: url(../../assets/img/sunxian.png) no-repeat right center;
}

.w940_one .w360>a {
    width: 130px;
    height: 95px;
    border-radius: 10px;
    display: inline-block;
    margin-top: 129px;
}

.w940_one .w360>a {
    background: #1dc499;
    margin-right: 30px
}


/*.w940_one .w360>a:nth-child(1) {
    background: #1dc499;
    margin-right: 30px
}

.w940_one .w360>a:nth-child(2) {
    background: #ebf0f1
}*/

.w940_one .w360>a button {
    background: none;
    border: none;
    border-radius: 50%;
    height: 48px;
    width: 48px;
    display: block;
    margin: 10px auto;
}

.w940_one .w360>a button {
    background: #ebf0f1 url(../../assets/img/green_add.png) no-repeat center center;
}


/*.w940_one .w360>a:nth-child(1) button {
    background: #ebf0f1 url(../../assets/img/green_add.png) no-repeat center center;
}

.w940_one .w360>a:nth-child(2) button {
    background: #cad0d3 url(../../assets/img/white_add.png) no-repeat center center;
}*/

.w940_one .w360>a p {
    text-align: center;
}

.w940_one .w360>a p {
    color: #fff
}


/*.w940_one .w360>a:nth-child(1) p {
    color: #fff
}*/


/*.w940_one .w360>a:nth-child(2) p {
    color: #9ba1a4
}*/

.h1_tit {
    height: 42px
}

.h1_tit h1 {
    float: left;
}


/*.modal-title{background: url(../../assets/img/inco1.png) no-repeat left center;padding-left:15px;color:#19ab85; }*/

.btn-add {
    border-radius: 17px;
    background: url(../../assets/img/ic4.png) no-repeat 10px center;
    padding-left: 20px;
    border: 1px #19ab85 solid;
    width: 70px;
    color: #19ab85;
}

.btn_save {
    width: 100px;
    margin: 0 auto;
    display: block;
}

.del_btn {
    background: url(../../assets/img/ic5.png) no-repeat left center;
    height: 34px;
    width: 34px;
    line-height: 34px;
    display: block
}
.del_btn:hover{
    cursor: pointer;
}
.topline {
    border-top: 1px solid #e5e5e5;
    padding-top: 20px
}

.chk_3 {
    display: none;
}

.chk_3 + label {
    background-color: #fafbfa;
    padding: 9px;
    border-radius: 50px;
    display: inline-block;
    position: relative;
    margin-right: 30px;
    -webkit-transition: all 0.1s ease-in;
    transition: all 0.1s ease-in;
    width: 80px;
    height: 30px;
}

.chk_3 + label:after {
    content: ' ';
    position: absolute;
    top: 0;
    -webkit-transition: box-shadow 0.1s ease-in;
    transition: box-shadow 0.1s ease-in;
    left: 0;
    width: 80px;
    height: 30px;
    border-radius: 100px;
    box-shadow: inset 0 0 0 0 #eee, 0 0 1px rgba(0, 0, 0, 0.4);
}

.chk_3 + label:before {
    content: ' ';
    position: absolute;
    background: white;
    top: 1px;
    left: 1px;
    z-index: 999999;
    width: 28px;
    -webkit-transition: all 0.1s ease-in;
    transition: all 0.1s ease-in;
    height: 28px;
    border-radius: 100px;
    box-shadow: 0 3px 1px rgba(0, 0, 0, 0.05), 0 0px 1px rgba(0, 0, 0, 0.3);
}

.chk_3:active + label:after {
    box-shadow: inset 0 0 0 20px #eee, 0 0 1px #eee;
}

.chk_3:active + label:before {
    width: 37px;
}

.chk_3:checked:active + label:before {
    width: 37px;
    left: 20px;
}

.chk_3 + label:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 3px rgba(0, 0, 0, 0.1);
}

.chk_3:checked + label:before {
    content: ' ';
    position: absolute;
    left: 52px;
    border-radius: 100px;
}

.chk_3:checked + label:after {
    content: ' ';
    font-size: 1.5em;
    position: absolute;
    background: #1dc499;
    box-shadow: 0 0 1px #1dc499;
}

.checkboxThree {
    width: 80px;
    height: 30px;
    margin: 10px auto;
    display: inline-block;
}

.selectChronicMonitor li {
    width: 50%;
    float: left;
}

.selectChronicMonitor li:nth-child(1),
.selectChronicMonitor li:nth-child(2) {
    background: #1dc499;
    color: #fff;
    border-bottom: none;
    line-height: 40px;
    height: 40px;
}

.selectChronicMonitor li:nth-child(1)>div,
.selectChronicMonitor li:nth-child(2)>div {
    text-align: center;
    padding-left: 0
}

.selectChronicMonitor li {
    border-bottom: 1px dashed #f1f1f1
}

.selectChronicMonitor li>div {
    width: 50%;
    text-align: left;
    padding-left: 30px
}

.selectChronicMonitor .checkbox-inline {
    margin-top: 5px;
}


/*维护自测指标*/

#myModal-maintain-target .modal-body {
    min-height: 220px;
    height: auto!important;
    padding-left: 35px;
}

#myModal-maintain-target .modal-body .mark {
    width: 88px;
    display: inline-block;
    text-align: center;
    line-height: 38px;
    background-color: #EEE;
    border-radius: 5px;
    margin: 0 10px 10px 0;
    overflow: hidden;
    white-space: nowrap;
    /*是不允许文字换行*/
    word-break: keep-all;
    /*是不允许把单词拆开*/
    text-overflow: ellipsis;
    /*文本超出容器，以省略号显示*/
}

#myModal-maintain-target .modal-body .mark:hover {
    background: #1DC499 url(../../assets/img/alert-mark.png) no-repeat right top;
    color: #fff;
    cursor: pointer;
}

#myModal-maintain-target .modal-footer {
    height: 68px;
}


/*#myModal-maintain-target .modal-dialog{
  position: absolute;
  top: 20%;
  left: 30%;
}*/

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
    display: block;
    margin: 0 auto;
}


/*新增自测指标*/

.add_selftest ul {
    padding: 40px 80px;
}

.add_selftest h2 {
    background: #5cb85c;
    color: #fff;
    border-radius: 5px 5px 0 0;
    text-align: center;
    line-height: 40px;
    height: 40px;
    font-size: 16px
}

.add_selftest li {
    line-height: 40px;
    height: 40px;
    background: url(../../assets/img/next.png) no-repeat 98% center;
    background-size: auto 50%;
    border-bottom: 1px solid #ccc;
    padding: 0 20px
}

.add_selftest button {
    margin: 0 auto;
    display: block;
}

.btn-add2 {
    color: #4cae4c;
    display: inline-block;
    font-size: 20px;
    padding: 5px 10px 0
}

.btn-del2 {
    color: #d43f3a;
    display: inline-block;
    font-size: 20px;
    padding: 5px 10px 0
}

.btn-add2:hover,
.btn-del2:hover {
    cursor: pointer;
}


</style>
