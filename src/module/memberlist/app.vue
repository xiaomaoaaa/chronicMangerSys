<template>
    <div class="index clearafter">
        <module-head></module-head>
        <div class="content cbafter">
            <div class="w220 fl">
                <menu-list></menu-list>
            </div>
            <div class="w980 fr">
                <div class="h1_tit">
                    <h1>会员管理</h1>
                </div>
                <div class="memberlist bg mb20">
                    <form class="cbafter" id="search" v-on:submit.prevent="searchmethod">
                        <div class="fl">
                            <label for="">会员姓名：</label>
                            <input type="text" class="form-control" placeholder="" v-model="search.searchformdata.name">
                            <label for="">证件号码：</label>
                            <input type="text" class="form-control" placeholder="" v-model="search.searchformdata.idcard">
                            <label for="">手机号码：</label>
                            <input type="text" class="form-control" placeholder="" v-model="search.searchformdata.mobile">
                            <label for="">会员性别：</label>
                            <select class="form-control" v-model="search.searchformdata.sex">
                                <option value="">请选择</option>
                                <option v-for="item in dictionary.gender" value="{{item.key}}">{{item.text}}</option>
                            </select>
                            <label for="">会员类型：</label>
                            <select class="form-control" v-model="search.searchformdata.memberType">
                                <option value="">请选择</option>
                                <option v-for="item in  search.memberTypes" :value="item.memberType">{{item.memberName}}</option>
                            </select>
                            <label for="">疾病种类：</label>
                            <select class="form-control" v-model="search.searchformdata.chronic">
                                <option value="">请选择</option>
                                <option v-for="item in  search.commonChronics" :value="item.chronic">{{item.chronicText}}</option>
                            </select>
                            <!--  <label for="">主管医生：</label>

                             <select class="form-control" v-model="search.searchformdata.mainDoctor">
                             <option value="">请选择</option>
                                  <option v-for="item in  search.mainDoctor" :value="item.doctorId">{{item.doctorName}}</option>
                                </select> -->
                            <div class="form-group" id="zhuguanyis">
                                <label for="">主管医生：</label>
                                <input type="hidden" class="form-control" placeholder="" v-model="search.searchformdata.mainDoctor">
                                <input type="text" class="form-control" v-model="search.searchformdata.mainDoctorname">
                                <div class="yishenglist">
                                    <p @click="mayclick()">清空搜索内容</p>
                                    <p @click="mayclick(item,$event)" v-for="item in  search.mainDoctor | filterBy search.searchformdata.mainDoctorname in 'doctorName'">{{item.doctorName}}</p>
                                </div>
                            </div>
                            <label for="">健康顾问：</label>
                            <select class="form-control" v-model="search.searchformdata.healthDoctor">
                                <option value="">请选择</option>
                                <option v-for="item in  search.healthDoctor" :value="item.doctorId">{{item.doctorName}}</option>
                            </select>
                        </div>
                        <div class="fr">
                            <button class="btn btn-primary" type="submit">查 询</button>
                        </div>
                    </form>
                </div>
                <div class="memberlist bg">
                    <table class="table table-hover" id="memberlist" v-show="!search.issearchlist">
                        <tr v-for="item in tableList">
                            <td><img :src="headimg"></td>
                            <td>
                                <!--  <p><span class="name">{{item.person.personName}}</span><span :class="{'female': item.person.sex=='2', 'male': item.person.sex=='1' }">{{item.person.sexText}}</span><span class="age">{{item.person.dob}}岁</span><span class="iphone">{{item.person.phoneNo}}</span></p> -->
                                <p><span class="name">{{item.person.personName}}</span><span>{{item.person.sexText}}</span><span class="age">{{item.person.dob}}岁</span><span class="iphone">{{item.person.phoneNo}}</span></p>
                                <p>
                                    <span class="doctor" v-for="doc in item.mainDoctorList">{{doc.name}}：{{doc.levelText}}</span>
                                    <span class="doctor" v-for="doc in item.healthDoctor">健康顾问：{{doc.name}}</span>
                                </p>
                                <p>
                                    <button type="button" class="btn btn-default vip">
                                        <span v-for="member in item.memberList.typeList">{{member.memberName}}</span>
                                    </button>
                                    <button type="button" class="btn btn-default" v-for="chr in item.commonChronicList">{{chr.chronicText}}</button>
                                </p>
                            </td>
                            <td class="operationtd">
                                <div class="infoedit" @click="edit_member(item)" v-if="(htmlmoduleobj.infoedit && item.ishow)||item.ishow3">会员信息修改</div>
                                <!-- <div class="infoedit" @click="edit_member(item)" v-if="(htmlmoduleobj.infoedit && item.ishow)||item.ishow3">会员信息修改</div> -->
                                <div @click="changedoc(item)" class="change" v-if="htmlmoduleobj.changedoc">更换主管医生</div>
                                <div @click="add_mdisease(item)" class="addmb" v-if="htmlmoduleobj.addmb">新增慢病病种</div>
                                <div class="fucha" v-if="htmlmoduleobj.fucha && item.ishow" @click="reviewvisit(item)">复查及复诊</div>
                                <div class="heart" v-if="htmlmoduleobj.comment && item.ishow">医生评价意见</div>
                                <div class="comment dingwei" v-if="htmlmoduleobj.serviceset && item.ishow">
                                    <span @click="toggleshow">服务设置</span>
                                    <ul class="fw_set none">
                                        <li class="cbafter">
                                            <p class="checkboxThree">
                                                <input type="checkbox" :id="$index" class="chk_3" />
                                                <label :for="$index"></label>
                                            </p>
                                            <span>图文咨询</span>
                                            <p class="checkboxFive">
                                                <input type="checkbox" :id="'f'+$index" name="" />
                                                <label :for="'f'+$index"></label>
                                            </p>
                                            <span>免费咨询</span>
                                        </li>
                                        <li class="cbafter">
                                            <p class="checkboxThree">
                                                <input type="checkbox" :id="'t'+$index" class="chk_3" />
                                                <label :for="'t'+$index"></label>
                                            </p>
                                            <span>电话咨询</span>
                                            <p class="checkboxFive">
                                                <input type="checkbox" :id="'h'+$index" />
                                                <label :for="'h'+$index"></label>
                                            </p>
                                            <span>免费咨询</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="comment dingwei" v-if="htmlmoduleobj.sethealthdoc&& item.ishow2">
                                    <span @click="toggleshow2">设置健康顾问</span>
                                    <ul class="jkgw_set none">
                                        <li v-for="item2 in HealthDoctor.list" data-docid="{{item2.doctorId}}" class="dingwei" @click='changehealdocdivshow'>{{item2.doctorName}}
                                            <div class="confirmdiv2">
                                                <p>
                                                    <button class='btn btn-success savedata' @click="changehealdoc(item,$event)">保存</button>
                                                    <button type='button' class='btn btn-danger cancledata' @click="cancelchangehealdoc">取消</button>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <button class="more btn btn-success" @click="showalldiv($event)">更多</button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <div class="pull-left">
                                    <button class="btn btn-default" @click="refresh">刷新</button>
                                </div>
                                <div class="pull-right">
                                   
                                    <boot-page v-ref:page :async="true" :lens="lenArr" :page-len="pageLen" :headersparam="headersparam" :param="param"></boot-page>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <!-- 新增慢病病种 -->
        <div class="modal fade bs-example-modal-lg" id="add_mdisease" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                新增病种</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal twostepform" role="form" id="addmdisease" @submit.prevent="addmdisease" name="addmdisease">
                            <div class="twostep">
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
                                    <div class="form-group">
                                        <label for="" class="col-md-3 control-label">慢病种类: </label>
                                        <div class="col-md-6">
                                            <select class="form-control" name="addmchronic" v-model="addmchronicid" required>
                                                <option selected="" value="">请选择慢病种类</option>
                                                <option v-for="item in chronicList" value="{{item.chronic}}" @click="addnewmchronic(item)">{{item.chronicText}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="twostep_2" v-show="steptwoformdata.patientpersonalindexList.length!=0">
                                    <h4>监测目标</h4>
                                    <div class="form-group" v-for="item in steptwoformdata.patientpersonalindexList">
                                        <!--  <input type="hidden" name="indexId{{item.indexId}}" value="{{item.indexId}}" v-model="item.indexId"> -->
                                        <label for="" class="col-md-2 control-label">{{item.indexName}}:<span class="start">*</span></label>
                                        <div class="col-md-3">
                                            <input type="input" class="form-control" placeholder="上限" name="quantifyIndexNormalTop{{item.indexId}}" required value="{{item.quantifyIndexDangerTop}}" v-model="item.quantifyIndexNormalTop" maxlength="11" @blur="amount" disabled>
                                        </div>
                                        <div class="col-md-1">
                                            {{item.indexUnit}}
                                        </div>
                                        <div class="col-md-3">
                                            <input type="input" class="form-control" placeholder="下限" name="quantifyIndexNormalBottom{{item.indexId}}" required value="{{item.quantifyIndexDangerBottom}}" v-model="item.quantifyIndexNormalBottom" maxlength="11" @blur="amount" disabled>
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
                                <!-- <div class="form-group" v-show="validatorNum==0">
                                <p class="start text-center">必须填写所有表单</p>
                            </div> -->
                                <div class="form-group">
                                    <!-- <button type="button" class="btn btn-default" @click="goonestep">上一步</button> -->
                                    <button type="submit" class="default greynobg center">保存</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- 更换主管医生 -->
        <div class="modal fade" id="changedoc" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                更换主管医生申请</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" id="changedocform" v-on:submit.prevent="changedocsub">
                            <div class="form-group" style="border-bottom:1px dashed #ccc;padding-bottom:10px; width:96%;margin:0 auto 20px">
                                <div class="col-md-5 text-left">申请人：{{changedocajaxopt.subdata.applyUserName}}</div>
                                <div class="col-md-5 text-right">申请时间：{{currentTime}}</div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">患者姓名</label>
                                <div class="col-md-8">
                                    <input type="input" class="form-control" name="personName" value="{{changedocajaxopt.subdata.personName}}" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">疾病病种</label>
                                <div class="col-md-8">
                                    <select class="form-control" id="jbbz">
                                        <option v-for="item in changedocajaxopt.commonChronicList" value="{{item.chronic}}">{{item.chronicText}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">证件类型:</label>
                                <div class="col-md-8">
                                    <select class="form-control" disabled value={{changedocajaxopt.show.certificateType}}>
                                        <option>{{changedocajaxopt.show.certificateTypeText}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">证件号码 :</label>
                                <div class="col-md-8">
                                    <input type="input" class="form-control" name="" value="{{changedocajaxopt.show.certificateNo}}" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">原主管医生 :</label>
                                <div class="col-md-8">
                                    <select class="form-control" id="oldMangerobj" disabled="">
                                        <option v-for="item in changedocajaxopt.commonChronicList" value="{{item.doctorId+'/'+item.doctorName+'|'+item.level}}">{{item.doctorName}}</option>
                                    </select>
                                </div>
                            </div>
                            <!-- <div class="form-group">
                    <label for="" class="col-md-3 control-label">新主管医生 :</label>
                       <div class="col-md-8">
                                    <select class="form-control" v-model="changedocajaxopt.subdata.newManger" required>
                                        <option  value="{{item.doctorId}}" v-for="item in maindoctorlist">{{item.doctorName}}</option>
                                        
                                    </select>
                                </div>
                  </div> -->
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">更换原因 :</label>
                                <div class="col-md-8">
                                    <textarea class="form-control" rows="3" placeholder="请填写更换原因" v-model="changedocajaxopt.subdata.changeReason" required></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label"></label>
                                <div class="col-md-7">
                                    <button type="submit" class="default ok center">保存</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- 复查与复诊 -->
        <div class="modal fade bs-example-modal-lg" id="reviewvisit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                预约复查与复诊</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" id="reviewvisitform" v-on:submit.prevent="reviewvisitsave">
                            <div class="twostep">
                                <div class="twostep_1">
                                    <h4>复诊</h4>
                                    <div class="form-group" id="fuchaMark" v-for="item in reviewvisitlist.visitReview1">
                                        <label for="" class="col-md-2 control-label">复诊时间: </label>
                                        <div class="col-md-3">
                                            <input class="form-control" :value="item.reviewTime" name="review" id="review" :disabled="item.dataRecordId?true:false" @click="uselaydate($event,item)">
                                            <!-- <input class="form-control" value="" name="review" v-if="reviewvisitlist.visitReview1.length==0" id="review" @click="uselaydate($event)"> -->
                                        </div>
                                        <div class="col-md-2" v-show="item.reviewTime!=''">
                                            <button class="default ok" @click="cancledataconfirm(item,$event,$index)" type="button">取消复诊</button>
                                            <div class="confirmdiv">
                                                <div class='bg_master1'></div>
                                                <div class='toast3'>
                                                    <p>确认取消?</p>
                                                    <p>
                                                        <button class='btn btn-success savedata' type="button" @click="oksave(item,$event)">保存</button>
                                                        <button type='button' class='btn btn-danger cancledata' @click="cancelsave($event)">取消</button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="twostep_2">
                                    <h4>复查</h4>
                                    <div class="form-group" v-for="item in reviewvisitlist.visitReview2">
                                        <label for="" class="col-md-2 control-label">复查项目: </label>
                                        <div class="col-md-3">
                                            <select class="form-control" name="fuchaproject" :disabled="item.dataRecordId?true:false" v-model="item.indicatorId">
                                                <option value="">请选择</option>
                                                <option v-for="sub in ReviewindicatorList" value="{{sub.indicatorId}}">{{sub.indicatorName}}</option>
                                            </select>
                                        </div>
                                        <label for="" class="col-md-2 control-label">复查时间: </label>
                                        <div class="col-md-3">
                                            <input class="form-control" v-model="item.reviewTime" :disabled="item.dataRecordId?true:false" @click="uselaydate($event,item)" id="{{'fuchatime'+$index}}">
                                        </div>
                                        <div class="col-md-2" >
                                            <button class="canceldefault" @click="cancledataconfirm(item,$event,$index)" type="button">取消复查</button>
                                            <div class="confirmdiv">
                                                <div class='bg_master1'></div>
                                                <div class='toast3'>
                                                    <p>确认取消?</p>
                                                    <p>
                                                        <button class='btn btn-success savedata' @click="oksave(item,$event)" type="button">保存</button>
                                                        <button type='button' class='btn btn-danger cancledata' @click="cancelsave($event)">取消</button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-md-6 col-md-offset-5 ztlan" @click="addcheck">+添加项目</div>
                                    </div>
                                </div>
                                <div class="form-group h60">
                                    <div class="col-md-6">
                                        <button class="default greynobg fr" type="submit">保存</button>
                                    </div>
                                    <div class="col-md-6">
                                        <button type="button" class="default greynobg fl" data-dismiss="modal">取消</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- 修改会员信息弹出框组件 -->
        <member-edit v-ref:memberedit></member-edit>
    </div>
</template>
<script>
var headimg = require("assets/img/cs2.jpg");
import 'assets/lib/bootstrap-3.3.2/css/bootstrap.min.css'
import 'assets/lib/bootstrap-3.3.2/js/bootstrap.min.js'
import 'assets/lib/laydate/laydate.js'
import 'assets/lib/laydate/need/laydate.css'
import 'assets/lib/laydate/skins/danlan/laydate.css'
// import 'assets/lib/bootstrap-summernote/summernote.min.js'
import 'assets/reset.css'
import Public from 'assets/public.js'
import moduleHead from 'components/module-head'
import menuList from 'components/menu-list'
import bootPage from 'components/BootPage.vue'
import memberEdit from 'components/member-edit'
export default {
    data() {
            return {
                login_roleId: Public.getsessionStorage("roleId"),
                currentTime: Public.formatDate(),
                headimg: headimg,
                lenArr: [10, 20, 50], // 每页显示长度设置
                pageLen: 5, // 可显示的分页数
                headersparam: {
                    "X-Service-Id": "coms.memberService",
                    "X-Service-Method": "findPersonUserInfo",
                },
                param: {
                    firstRequest: 1, //进入列表页面的请求的标识，区别搜索的的请求
                }, // 传递参数,
                tableList: [], // 分页组件传回的分页后数据
                dictionary: { //字典可添加
                    gender: [],
                    nationality: [],
                    certificateType: []
                },



                chronicList: [], //慢病种类 增加慢病方案的时候


                // chronicid:"",//慢病ID 通过选取这个显示对应的监测目标
                search: { //搜索所需获取的字段
                    issearchlist: false,
                    searchtableList: [], //搜索之后返回的列表数据
                    memberTypes: [],
                    healthDoctor: [],
                    mainDoctor: [],
                    commonChronics: [],
                    searchformdata: {
                        "name": "", //姓名
                        "idcard": "", //身份证
                        "mobile": "", //手机号
                        "sex": "", //性别
                        "memberType": "", //会员类型
                        "chronic": "", //疾病种类
                        "mainDoctor": "", //主管医生id
                        "healthDoctor": "", //健康顾问id
                        "pageNo": "1",
                        "pageSize": "10",
                        "mainDoctorname": ""

                    } //搜索所需获取的字段
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


                // 更换主管医生开始
                changedocitem: {},
                changedocajaxopt: {
                    "subdata": {
                        "mpiId": "",
                        "personName": "",
                        "applyUser": "", //当前医生doctorId
                        "applyUserName": "", //当前医生姓名
                        "chronic": "", //慢病id
                        "mangerType": "061", //管理人员类型： 061主管医生 071健康顾问
                        "oldManger": "", //原医生的doctorId
                        "oldMangerLevel": "", //原医生的职称(level)
                        "oldMangerName": "", //原医生的姓名
                        "newManger": "", //更换医生的doctorId
                        "newMangerLevel": "", //更换医生的职称(level)
                        "newMangerName": "", //更换医生的姓名
                        "changeReason": "",
                        "applyType": "031" //固定填031
                    },

                    show: {
                        "chronicText": "",
                        "certificateType": "",
                        "certificateNo": "",
                        "certificateTypeText": "",
                    },
                    commonChronicList: []

                },


                // 更换主管医生结束

                // 新增慢病开始 和修改会员共用数据steptwoformdata
                addmchronicid: "", //慢病ID 通过选取这个显示对应的监测目标
                addmchronicobj: {}, //慢病新增慢病的数据添加到steptwoformdata.chroniclevel
                // addmquestion: [], //生活问卷
                // addmformdata: {
                //     mpiId: "",
                //     "chroniclevel": [],
                //     "patientpersonalindexList": [],
                //     "questionnaireresult": {
                //         "questionnaireId": "",
                //         "operaterType": "2" //固定值
                //     },
                //     "questionnaireresultdetailList": []
                // },

                // 新增慢病end
                // 设置健康顾问start
                HealthDoctor: {
                    list: [],
                },
                // 设置健康顾问end
                // 模块数组
                moduleArr: [],
                htmlmoduleobj: {
                    infoedit: false,
                    changedoc: false,
                    addmb: false,
                    fucha: false,
                    comment: false,
                    serviceset: false,
                    sethealthdoc: false
                },
                searchhtmlmoduleobj: {
                    infoedit: false,
                    changedoc: false,
                    addmb: false,
                    fucha: false,
                    comment: false,
                    serviceset: false,
                    sethealthdoc: false
                },
                currentDocId: "", //当前登录医生的id
                // 复诊和复查开始
                reviewvisitlist: {
                    "mpiId": "",
                    visitReview1: [],
                    visitReview2: []
                },

                ReviewindicatorList: [],
                // 复诊和复查结束
                pagetotlearr: [], //问卷分页符
            }
        },
        computed: {

        },
        components: {
            moduleHead, bootPage, menuList, memberEdit
        },

        ready() {
            var that = this;
            // console.log(this.login_roleId);

            // 根据moduleId获取列表要显示的模块
            $.when(Public.commonajax("coms.menuService", "findPcMoudleParamByMoudle", "['" + Public.getParameter('moduleId') + "']"))
                .done(function(data) {
                    var moduleArr = data.body.paramValue.split(',');
                    that.moduleArr = moduleArr;
                    // 设置列表中的模块 比如服务设置
                    for (var i = 0; i < that.moduleArr.length; i++) {
                        // var moduleArritem=moduleArr[i];
                        if (that.moduleArr[i] == 1) {
                            that.htmlmoduleobj.infoedit = true;
                        }

                        if (that.moduleArr[i] == 2) {
                            that.htmlmoduleobj.changedoc = true;
                        }
                        if (that.moduleArr[i] == 3) {
                            that.htmlmoduleobj.addmb = true;
                        }
                        if (that.moduleArr[i] == 4) {
                            that.htmlmoduleobj.fucha = true;
                        }
                        if (that.moduleArr[i] == 5) {
                            that.htmlmoduleobj.comment = true;
                        }
                        if (that.moduleArr[i] == 6) {
                            that.htmlmoduleobj.serviceset = true;
                        }
                        if (that.moduleArr[i] == 7) {
                            that.htmlmoduleobj.sethealthdoc = true;
                        }
                    };
                    that.refresh()
                })
                //日历插件

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
                // 获取慢病种类
            $.when(Public.commonajax("coms.commonChronicService", "findCommonChronic", "[[]]"))
                .done(function(data) {

                    that.chronicList = data.body;


                })
                // 获取健康顾问列表
            $.when(Public.commonajax("coms.doctorService", "findHealthDoctor", "[[]]"))
                .done(function(data) {
                    that.HealthDoctor.list = data.body;


                })


            // 获取搜索的 会员类型：   疾病种类：   主管医生：   健康顾问：4个数据
            $.when(Public.commonajax("coms.memberService", "findMemberSearchCon", "[[]]"))
                .done(function(data) {
                    var data = data.body;
                    that.search.memberTypes = data.memberTypes;
                    that.search.healthDoctor = data.healthDoctor;
                    // var temobj={"doctorId":"","doctorName":""};
                    // data.mainDoctor.unshift(temobj);
                    that.search.mainDoctor = data.mainDoctor;
                    // console.log(that.search.mainDoctor);
                    that.search.commonChronics = data.commonChronics;
                })
                // 获取当前登录医生的信息 更换主管医生中用到
            $.when(Public.commonajax("coms.doctorService", "getDoctorCurrent", "[]"))
                .done(function(res) {
                    that.changedocajaxopt.show.mainDoctorname = res.body.name;
                    that.changedocajaxopt.subdata.applyUser = res.body.doctorId;
                    if (that.login_roleId == "main_doctor") {
                        that.search.searchformdata.mainDoctor = res.body.doctorId; //搜索框主管医生中赋值
                        that.search.searchformdata.mainDoctorname = res.body.name; //搜索框主管医生中赋值
                    }
                    if (that.login_roleId == "health_doctor") {
                        that.search.searchformdata.healthDoctor = res.body.doctorId; //搜索框主管医生中赋值

                    }
                    that.changedocajaxopt.subdata.applyUserName = res.body.name;
                    that.changedocajaxopt.subdata.newManger = res.body.doctorId;
                    that.changedocajaxopt.subdata.newMangerLevel = res.body.level;
                    that.changedocajaxopt.subdata.newMangerName = res.body.name;
                    that.currentDocId = res.body.doctorId;


                })
                // 获取查询复查项目列表
            $.when(Public.commonajax("coms.reviewService", "getReviewindicatorList", "[]"))
                .done(function(res) {
                    that.ReviewindicatorList = res.body;

                })


        },
        methods: {
            // 点击修改会员
            edit_member(item) {
                    $("#edit_member").show();
                    $(".bg_master2").show();
                    this.$refs.memberedit.getmipiid(item.person.mpiId);
                },
                // 搜索中主管医生下拉框选中后赋值给input
                mayclick(item, event) {
                    if (item == undefined && event == undefined) {
                        this.search.searchformdata.mainDoctor = "";
                        this.search.searchformdata.mainDoctorname = "";
                    } else {
                        this.search.searchformdata.mainDoctor = item.doctorId;
                        this.search.searchformdata.mainDoctorname = item.doctorName

                    }
                    $(".yishenglist").hide();

                },
                // 显示列表中所有所有的div
                showalldiv(event) {
                    $(event.target).siblings("div:gt(5)").toggle();
                    // $(event.target).html("隐藏");
                },

                // 设置健康顾问
                changehealdocdivshow(event) {
                    $(event.target).find('.confirmdiv2').show();
                },
                changehealdoc(item, event) {
                    var that = this;
                    var $li = $(event.target).closest('li');
                    $li.addClass('active').siblings('li').removeClass('active')
                    var newdocid = $li.attr("data-docid");
                    $.when(Public.commonajax("coms.doctorService", "saveHealthDoctor", "['" + item.person.mpiId + "','" + newdocid + "']"))
                        .done(function(res) {
                            $(event.target).closest('.confirmdiv2').hide();
                            Public.ajaxPrompt('提交成功')
                        })
                },
                cancelchangehealdoc(event) {
                    $(event.target).closest('.confirmdiv2').hide();
                },
                // 点击搜索查询
                searchmethod() {
                    var that = this;
                    this.param = this.search.searchformdata;
                    console.log(this.param);
                    this.$nextTick(function() {
                        this.refresh();
                    })

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
                // 更换主管医生
                changedoc(item) {
                    var that = this;
                    console.log(item);
                    $("#changedoc").modal("show");
                    this.changedocitem = item;
                    this.changedocajaxopt.subdata.mpiId = item.person.mpiId;
                    this.changedocajaxopt.commonChronicList = item.commonChronicList;
                    this.changedocajaxopt.subdata.personName = item.person.personName;
                    that.changedocajaxopt.subdata.changeReason = "";
                    //以下是显示到页面上用的数据
                    this.changedocajaxopt.show.chronicText = item.commonChronicList[0].chronicText;
                    this.changedocajaxopt.show.certificateType = item.person.certificate.certificateType;
                    this.changedocajaxopt.show.certificateTypeText = item.person.certificate.certificateTypeText;
                    this.changedocajaxopt.show.certificateNo = item.person.certificate.certificateNo;

                },
                // 更换主管医生提交表单
                changedocsub() {
                    var that = this;
                    var query = $("#oldMangerobj").val();
                    var iStart1 = query.indexOf("/");
                    var iStart2 = query.indexOf("|");
                    this.changedocajaxopt.subdata.chronic = $("#jbbz").val();
                    this.changedocajaxopt.subdata.oldManger = query.substring(0, iStart1);
                    this.changedocajaxopt.subdata.oldMangerName = query.substring(iStart1 + 1, iStart2);
                    this.changedocajaxopt.subdata.oldMangerLevel = query.substring(iStart2 + 1);
                    if (this.changedocajaxopt.subdata.oldManger == this.changedocajaxopt.subdata.applyUser) {
                        Public.ajaxPrompt("当前主管医生已为你自己");
                    } else {

                        // console.log(this.changedocajaxopt);
                        $.when(Public.commonajax("coms.doctorService", "applyModifyMainDoctor", "[" + JSON.stringify(this.changedocajaxopt.subdata) + "]"))
                            .done(function(res) {
                                if (res.code == 200) {
                                    $("#changedoc").modal("hide");
                                    Public.ajaxPrompt("提交成功");
                                    that.changedocajaxopt.commonChronicList = [];
                                    that.maindoctorlist = [];
                                    that.changedocajaxopt.subdata.changeReason = "";
                                } else {
                                    Public.ajaxPrompt(res.msg);
                                }

                            })
                    }
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
                getHealthInfomethod(item) {
                    var that = this;
                    that.steptwoformdata.questionnaireresultdetailList = [];
                    that.steptwoformdata.chroniclevel = [];
                    that.steptwoformdata.patientpersonalindexList = [];
                    $.when(Public.commonajax("coms.commonChronicService", "getHealthInfo", "['" + item.person.mpiId + "']"))
                        .done(function(res) {
                            if (res.code = 200) {
                                res.body.mpiId = item.person.mpiId;
                                res.body.questionnaireresultdetailList = that.editquestiondata(res.body.questionnaireresultdetailList)
                                that.steptwoformdata = res.body;
                            }


                        })
                },

                // 增加慢病
                add_mdisease(item) {
                    $("#add_mdisease").modal("show");
                    var that = this;

                    that.addmchronicid = "";
                    // that.steptwoformdata.mpiId = item.person.mpiId;
                    that.getHealthInfomethod(item)

                },
                // 提交新增慢病
                addmdisease(res) {
                    var that = this;
                    this.steptwoformdata.chroniclevel.push(that.addmchronicobj);
                    // 提交新增慢病信息

                    $.when(Public.commonajax("coms.commonChronicService", "saveHealthInfo", '[' + JSON.stringify(this.steptwoformdata) + ']'))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("提交成功");

                            } else {

                                alert(res.msg)
                            }
                            $("#add_mdisease").modal("hide");
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

                //服务设置的显示和隐藏
                toggleshow(event) {
                    $(event.target).siblings(".fw_set").toggleClass('none');
                },
                toggleshow2(event) {
                    $(event.target).siblings(".jkgw_set").toggleClass('none');
                },


                // 弹出复查和复诊
                reviewvisit(item) {
                  
                    $("#reviewvisit").modal('show');
                    this.reviewvisitlist.mpiId = item.person.mpiId;
                    this.getreviewvist(this.reviewvisitlist.mpiId)
                },
                // 获取复查和复诊列表数据
                getreviewvist(mpiId){
                    var that=this;
                    $.when(Public.commonajax("coms.reviewService", "getReviewrecordList", "['" + mpiId + "']"))
                        .done(function(res) {
                            if (res.code == 200) {
                                that.reviewvisitlist.visitReview1 = res.body.visitReview1;
                                that.reviewvisitlist.visitReview2 = res.body.visitReview2;
                                if (that.reviewvisitlist.visitReview1.length == 0) {
                                    var temobj1 = {
                                        "visitReview": "1",
                                        "reviewTime": ""
                                    };
                                    that.reviewvisitlist.visitReview1.push(temobj1)
                                }
                                if (that.reviewvisitlist.visitReview2.length == 0) {
                                    var temobj2 = {
                                        "visitReview": "2",
                                        "reviewTime": "",
                                        "indicatorId": 0,
                                        "indicatorName": ""
                                    };
                                    that.reviewvisitlist.visitReview2.push(temobj2)
                                }

                            }

                        })

                },
                // 复查和复诊保存
                reviewvisitsave() {
                    var that = this;
                    if(that.reviewvisitlist.visitReview1[0].reviewTime == ""&&that.reviewvisitlist.visitReview2[0].reviewTime == ""){
                        Public.ajaxPrompt("复诊和复查至少选一项");
                        return
                    }
                    // 保存的时候visitReview1或者visitReview2没录值的话需要传空数组为参数
                    if (that.reviewvisitlist.visitReview1[0].reviewTime == "") {
                        that.reviewvisitlist.visitReview1 = []
                    }
                    if (that.reviewvisitlist.visitReview2[0].reviewTime == "") {
                        that.reviewvisitlist.visitReview2 = []
                    }
                    

                    $.when(Public.commonajax("coms.reviewService", "saveReviewrecordList", "[" + JSON.stringify(that.reviewvisitlist) + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("保存成功");
                                // 获取复查和复诊列表数据
                                that.getreviewvist(that.reviewvisitlist.mpiId);
                            }else{
                                Public.ajaxPrompt(res.msg);
                                if (that.reviewvisitlist.visitReview1.length == 0) {
                                    var temobj1 = {
                                        "visitReview": "1",
                                        "reviewTime": ""
                                    };
                                    that.reviewvisitlist.visitReview1.push(temobj1)
                                }
                            }

                        })
                },
                cancledataconfirm(item,event,index) {
                    if(item.dataRecordId){
                         $(event.target).next(".confirmdiv").show();
                    }else{
                        if(item.visitReview==2){
                         this.reviewvisitlist.visitReview2.splice(index,1);
                         if (this.reviewvisitlist.visitReview2.length == 0) {
                                    var temobj2 = {
                                        "visitReview": "2",
                                        "reviewTime": "",
                                        "indicatorId": 0,
                                        "indicatorName": ""
                                    };
                                    this.reviewvisitlist.visitReview2.push(temobj2)
                                }
                        }else{
                            this.reviewvisitlist.visitReview1.splice(index,1) ;
                            if (this.reviewvisitlist.visitReview1.length == 0) {
                                    var temobj1 = {
                                        "visitReview": "1",
                                        "reviewTime": ""
                                    };
                                    this.reviewvisitlist.visitReview1.push(temobj1)
                            }
                        }
                    }
                   
                },
                cancelsave(event) {
                    $(event.target).closest('.confirmdiv').hide();

                },
                oksave(item, event) {
                    var that = this;
                    $(event.target).closest('.confirmdiv').hide();
                    $.when(Public.commonajax("coms.reviewService", "deleteReviewrecord", "[" +item.dataRecordId + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("保存成功");
                                // 获取复查和复诊列表数据
                                that.getreviewvist(that.reviewvisitlist.mpiId);
                            }

                        })


                },
                uselaydate(event, item) {
                    var that = this;
                    laydate({
                        elem: '#' + $(event.target).attr("id"),
                        min: laydate.now(), //设定最小日期为当前日期
                        choose: function(datas) { //选择日期完毕的回调
                            item.reviewTime = datas;
                        }
                    });
                },
                addcheck() {
                    var temobj = {
                        "visitReview": "2",
                        "indicatorId": 0,
                        "indicatorName": "",
                        "reviewTime": ""
                    };
                    this.reviewvisitlist.visitReview2.push(temobj)


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
            // 分页组件传回的表格数据
            'data' (data) {
                // console.log(data);
                var that = this;
                var d = new Date();
                var year = d.getFullYear();
                $.each(data, function(index, el) {
                        el.person.dob = parseInt(year) - parseInt(el.person.dob.substring(0, 4));
                    })
                    // console.log(data);
                if (that.login_roleId == "main_doctor") {
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < data[i].mainDoctorList.length; j++) {
                            if (data[i].mainDoctorList[j].doctorId == this.currentDocId) {
                                data[i].ishow = true;
                            }
                        }
                    }
                } else if (that.login_roleId == "health_doctor") {
                    
                    for (var e = 0; e < data.length; e++) {
                        if (data[e].healthDoctor[0].doctorId == this.currentDocId) {
                            data[e].ishow3 = true;
                        }
                    }

                } else {
                    for (var n = 0; n < data.length; n++) {
                        data[n].ishow = true;
                        for (var m = 0; m < data[n].memberList.typeList.length; m++) {
                            if (data[n].memberList.typeList[m].memberType == 2) {
                                data[n].ishow2 = true;
                            }
                        }

                    }
                }
                console.log(this.htmlmoduleobj)
                this.tableList = data;
                this.$nextTick(function() {
                    var divlen = this.moduleArr.length;
                    if (divlen > 6) {
                        $("#memberlist .operationtd").find("div:gt(5)").hide();
                        $("#memberlist .operationtd").find(".more").show().html("更多");
                    }

                });

            },
            // 'refresh' () {
            //     this.refresh()
            // }
        },
        // 处理值的传递
        watch: {

            'addmchronicid': function(value, oldvalue) {
                // 根据慢病id查询监测目标
                var that = this;
                var isrepeat = true;
                $.each(that.steptwoformdata.chroniclevel, function(index, el) {
                    if (el.chronic == value) {
                        isrepeat = false;
                        Public.ajaxPrompt("不能选择重复慢病");
                        // alert("不能选择重复慢病")
                    }
                });

                if (value && isrepeat) {
                    $.when(Public.commonajax("coms.commonChronicService", "findChronicMonitorIndicatorByChronic", "[" + value + "]"))
                        .done(function(responsebale) {
                            var data = responsebale.body;
                            var tem_monitorindicator = [];
                            for (var i = 0; i < that.steptwoformdata.patientpersonalindexList.length; i++) {
                                that.steptwoformdata.patientpersonalindexList[i].biaoshi = "ok";
                                tem_monitorindicator.push(that.steptwoformdata.patientpersonalindexList[i]);
                            }
                            var concatdata = tem_monitorindicator.concat(data);

                            that.steptwoformdata.patientpersonalindexList = Public.arrunique(concatdata, "indexId");
                            that.addmchronicobj = {
                                "chronic": value
                            };

                        })
                }

            },
        },
}
$(function() {

    $("#jbbz").on('change', function(event) {
        event.preventDefault();
        var ld_index = $("#jbbz").find("option:selected").index();
        $("#oldMangerobj").find('option').eq(ld_index).attr({
            'selected': 'selected'
        }).siblings('option').attr({
            'selected': false
        });
    });
    // 搜索位置主管医生的下拉
    $("#zhuguanyis").find('input').on('click', function(event) {
        event.preventDefault();
        $(".yishenglist").show();
    });
})
</script>
<style scoped>
/*会员修改*/

#search select.form-control {
    display: inline-block;
    margin-top: 10px
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
    background: url(../../assets/img/radio.png) no-repeat center center;
}

.twostepform input[type="radio"]:checked {
    background: url(../../assets/img/radiochecked.png) no-repeat center center;
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


/*会员列表*/

.memberlist {
    padding: 20px
}

.memberlist table p {
    line-height: 26px;
}

.memberlist table img {
    display: block;
    margin: 10px auto 0;
    border-radius: 50%
}

.memberlist table p button {
    border: 1px solid #1dc499;
    color: #1dc499;
    padding: 1px 8px;
    margin-left: 10px;
    cursor: default;
}

.btn-default:hover,
.btn-default:focus,
.btn-default.focus,
.btn-default:active,
.btn-default.active {
    background-color: #fff;
}

.memberlist table p button.vip {
    border: 1px solid #ff8c68;
    color: #ff8c68;
    padding: 1px 8px;
    margin-left: 10px;
}

.memberlist table a {
    display: inline-block;
    color: #78909c;
    height: 26px;
    line-height: 26px;
    margin-left: 15px;
}

.memberlist table td p span {
    display: inline-block;
    margin-left: 10px;
    height: 20px;
}

.memberlist table td p span:hover {
    cursor: default;
}

.memberlist table .operationtd>div {
    display: inline-block;
    margin-left: 10px;
    height: 40px;
    float: left;
    width: 110px;
    cursor: pointer;
}

.memberlist table td .name {
    font-weight: bold;
}

.memberlist table td .female {
    background: url(../../assets/img/female.png) no-repeat left center;
    padding-left: 20px;
}

.memberlist table td .male {
    background: url(../../assets/img/male.png) no-repeat left center;
    padding-left: 20px;
}

.memberlist table td .iphone {
    background: url(../../assets/img/iphone.png) no-repeat left center;
    padding-left: 20px;
}

.memberlist table td .infoedit {
    background: url(../../assets/img/infoedit.png) no-repeat left center;
    padding-left: 25px;
    height: 26px;
    line-height: 26px;
}

.memberlist table td .change {
    background: url(../../assets/img/change.png) no-repeat left center;
    padding-left: 25px;
    height: 26px;
    line-height: 26px;
}

.memberlist table td .addmb {
    background: url(../../assets/img/addmb.png) no-repeat left center;
    padding-left: 25px;
    height: 26px;
    line-height: 26px;
}

.memberlist table td .fucha {
    background: url(../../assets/img/fucha.png) no-repeat left center;
    padding-left: 25px;
    height: 26px;
    line-height: 26px;
}

.memberlist table td .heart {
    background: url(../../assets/img/heart.png) no-repeat left center;
    padding-left: 25px;
    height: 26px;
    line-height: 26px;
}

.memberlist table td .comment {
    background: url(../../assets/img/comment.png) no-repeat left center;
    padding-left: 25px;
    height: 26px;
    line-height: 26px;
}

.memberlist table td .doctor {
    font-size: 12px;
    color: #999
}

.memberlist table td .name {
    font-weight: bold;
}

.memberlist table tr {
    border: none;
    border-bottom: #e9eef3 1px solid
}

.memberlist table a:hover {
    cursor: pointer;
}

.memberlist table td {
    border: none;
}

.memberlist table tr td:nth-child(1) {
    width: 80px
}

.memberlist table tr td:nth-child(2) {
    width: 370px
}

.memberlist table tr td:nth-child(3) {
    padding: 10px 40px 0 0;
}

.form-horizontal .radio-inline {
    padding-top: 1px
}

.form-horizontal p {
    padding-top: 7px
}

.mb20 {
    margin-bottom: 20px;
}

.memberlist form.cbafter .fl {
    width: 850px
}

.memberlist form.cbafter label {
    font-weight: normal;
    color: #999
}

.memberlist form.cbafter input,
.memberlist form.cbafter select {
    display: inline-block;
    width: 115px;
    border: none;
    border-bottom: 1px dashed #ccc;
    box-shadow: none;
    color: #333
}

.memberlist form.cbafter input:nth-of-type(2),
.memberlist form.cbafter input:nth-of-type(6) {
    width: 180px;
}

.memberlist form.cbafter input:nth-of-type(4),
.memberlist form.cbafter input:nth-of-type(8) {
    width: 80px;
}

.memberlist form.cbafter .fr {
    width: 50px;
}

.memberlist form.cbafter .fr button {
    display: block;
    margin: 20px auto;
}


/*.dropdown-menu>li>a{background: }*/

.fw_set,
.jkgw_set {
    position: absolute;
    top: 32px;
    z-index: 1;
    width: 300px;
    left: 0;
    height: auto;
    -webkit-box-shadow: 0 0 10px rgba(230, 230, 230, .9);
    -moz-box-shadow: 0 0 10px rgba(230, 230, 230, .9);
    box-shadow: 0 0 10px rgba(230, 230, 230, .9);
    background: #fff;
    border-radius: 10px;
    padding: 10px 0
}

.fw_set span {
    display: inline-block;
    width: 60px;
    height: 44px;
    line-height: 44px
}

.jkgw_set li {
    background: url(../../assets/img/comment.png) no-repeat 10px center;
    padding-left: 35px;
    height: 26px;
    line-height: 26px;
    text-align: left;
}

.jkgw_set li.active {
    color: #1dc499;
}


/*按钮开关*/

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

.checkboxFive {
    width: 25px;
    margin: 10px;
    position: relative;
    display: inline-block;
}

.checkboxThree {
    width: 80px;
    height: 30px;
    margin: 10px;
    display: inline-block;
    float: left
}

.checkboxFive label {
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: #eee;
    border: 1px solid #ddd;
}

.checkboxFive label:after {
    opacity: 0;
    content: '';
    position: absolute;
    width: 9px;
    height: 5px;
    background: transparent;
    top: 6px;
    left: 7px;
    border: 2px solid #1dc499;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
}

.checkboxFive label:hover::after {
    opacity: 0;
}

.checkboxFive input[type=checkbox]:checked + label:after {
    opacity: 1;
}

.checkboxFive input[type=checkbox]:checked + label {
    border: 1px solid #1dc499;
}

.tabcon {
    min-height: 450px;
}

.dingwei {
    position: relative;
}

#zhuguanyis {
    position: relative;
    display: inline-block;
}

#zhuguanyis .yishenglist {
    position: absolute;
    display: none;
    left: 80px;
    top: 32px;
    z-index: 9;
    width: 172px;
    height: 200px;
    overflow: auto;
    -webkit-box-shadow: 0 0 10px rgba(230, 230, 230, .9);
    -moz-box-shadow: 0 0 10px rgba(230, 230, 230, .9);
    box-shadow: 0 0 10px rgba(230, 230, 230, .9);
    background: #fff;
    border-radius: 0 0 10px 10px;
    padding: 10px
}

#zhuguanyis .yishenglist p {
    line-height: 26px;
    height: 26px;
    margin-top: 5px;
    background: #f1f1f1;
    padding-left: 10px
}

#zhuguanyis .yishenglist p:nth-child(1) {
    background: #1dc499;
    color: #fff
}

#memberlist .operationtd .more {
    position: absolute;
    right: 20px;
    top: 20px;
    display: none
}

#memberlist .operationtd {
    position: relative;
}

button.save {
    color: #fff;
    padding: 5px 10px;
    border-radius: 17px;
    margin-top: 7px;
    border: none;
    width: 80px;
    background: #1DC499;
    display: block;
    margin: 0 auto;
}

.confirmdiv,
.confirmdiv2 {
    display: none
}

.ztlan {
    color: #1DC499
}

.toast3 {
    position: absolute;
    width: 160px;
    min-height: 80px;
    top: 0;
    left: 50%;
    margin-left: -80px;
    background-color: rgba(250, 250, 250, 1);
    text-align: center;
    border-radius: 5px;
    text-align: center;
    box-sizing: border-box;
    z-index: 100000000000000000;
}

.toast3>p {
    padding: 10px
}

.toast3>p:nth-child(1) {
    border-bottom: 1px solid #1DC499;
    line-height: 40px;
}

.toast3>p button:nth-child(2) {
    margin-left: 10px
}

.confirmdiv2 {
    position: absolute;
    bottom: -10px;
    right: 0;
    background: #fff;
    z-index: 100000000000000000;
}

.confirmdiv2 p {
    padding: 10px;
    width: 140px;
    height: 40px
}

.memberlist table .confirmdiv2 p button {
    border: none;
    color: #fff;
    display: inline-block;
    margin-left: 10px;
    float: left;
    cursor: pointer;
}

#updateplandetail {
    width: 200px
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

button.canceldefault {
    display: block;
    height: 32px;
    line-height: 32px;
    width: 90px;
    border-radius: 16px;
    color: #fff;
    outline: none;
    background: #1dc499
}

.h60 {
    height: 60px;
    padding-top: 20px
}
</style>
