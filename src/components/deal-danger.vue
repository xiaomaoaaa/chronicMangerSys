<template>
    <!-- 危急值 -->
    <div class="bs-example-modal-lg" id="edit_danger">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header"></div>
                <div class="paientinfo">
                    <table>
                        <tr>
                            <td><img :src="headimg"></td>
                            <td>
                                <p><span class="name">{{patientinfo.personName}}</span><span>{{patientinfo.sexText}}</span><span class="age">{{patientinfo.personAge}}岁</span><span>|</span><span class="iphone">{{patientinfo.phoneNo}}</span></p>
                                <p>
                                    <span class="other">申请机构：{{patientinfo.applyOrgName==null?"未填写":patientinfo.applyOrgName}}</span>
                                    <span class="other">申请科室：{{patientinfo.applyDeptName==null?"未填写":patientinfo.applyDeptName}}</span>
                                    <span class="other">申请医生：{{patientinfo.applyDoctorName==null?"未填写":patientinfo.applyDoctorName}}</span>
                                    <span class="other">申请时间：{{patientinfo.applyTime}}</span>
                                </p>
                                <p>
                                    <span class="other">项目名称：{{patientinfo.itemName==null?"未填写":patientinfo.itemName}}</span>
                                    <span class="other">报告机构：{{patientinfo.reportOrgName==null?"未填写":patientinfo.reportOrgName}}</span>
                                    <span class="other">报告时间：{{patientinfo.occurTime}}</span>
                                </p>
                            </td>
                            <td>
                                <button class="default ok" v-if="patientinfo.sourceType!=4">报告详情</button>
                                <button class="default ok" v-if="patientinfo.sourceType==4">自测指标</button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="modal-body">
                    <div class="twostep">
                        <div class="twostep_1">
                            <h4>危急值</h4>
                            <p><span>{{patientinfo.indexName}}</span><span :class="{'zhibiao2':parseFloat(patientinfo.indexVal)<parseFloat(patientinfo.normalValBottom),'zhibiao':parseFloat(patientinfo.indexVal)<parseFloat(patientinfo.normalValTop)}">{{patientinfo.indexVal}}</span></p>
                        </div>
                        <div class="twostep_2">
                            <h4>处理意见</h4>
                            <form class="cbafter" id="search" v-on:submit.prevent="savedangerdeal">
                                <div class="form-group">
                                    <div class="col-md-9">
                                        <select class="form-control" v-model="dangervalDealTypeselect" required>
                                            <option v-for="item in dangervalDealTypelist" value="{{item.key}}">{{item.text}}</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <button class="default ok" type="submit">确定</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Public from 'assets/public.js'
var headimg = require("assets/img/cs2.jpg");
module.exports = {
    data() {
            return {
                headimg: headimg,
                patientinfo: {
                    personName: "",
                    sexText: "",
                    personAge: "",
                    phoneNO: "",
                    applyOrgName: "",
                    applyDeptName: "",
                    applyDoctorName: "",
                    applyTime: "",
                    itemName: "",
                    reportOrgName: "",
                    occurTime: "",
                    indexName: "",
                    indexVal: "",
                    normalValBottom: "",
                    normalValTop: "",
                    sourceType: "",

                },
                dangervalDealTypelist: [], //处理类型字典
                dangervalDealTypeselect: ""

            }
        },
        ready() {
            var that = this;
            var that = this;
            // 获取字典
            $.when(Public.commonajax("coms.multipleDictionaryService", "findDic", "[['base.dictionary.base_dangervalDealType']]"))
                .done(function(res) {
                    if (res.code == 200) {
                        that.dangervalDealTypelist = res.body[0].items;
                    }
                })

            // 根据dangerRecordId获取信息
            $.when(Public.commonajax("coms.dangerIndexRecordService", "findDangerIndexRecordById", "['" +this.dangerrecordid + "']"))
                .done(function(res) {
                    if (res.code == 200) {
                        res.body.applyTime = res.body.applyTime != null ? res.body.applyTime.substr(0, 10) : "未填写";
                        res.body.occurTime = res.body.occurTime != null ? res.body.occurTime.substr(0, 10) : "未填写";

                        that.patientinfo = res.body;
                    }

                })
        },
        props: {
            dangerrecordid: {
                type: String,
                default: ""
            },
            // "formid": {
            //     type: String,
            //     default: "imgupload"
            // },
        },
        methods: {
            // 保存危急值处理
            savedangerdeal() {
                $.when(Public.commonajax("coms.dangerIndexRecordService", "dealDangerIndexRecord", "['" + this.patientinfo.dangerRecordId + "','" + this.dangervalDealTypeselect + "']"))
                    .done(function(res) {
                        if (res.code == 200) {
                            window.location.replace("index.html")
                        }

                    })
            },
        },

}
</script>
<style scoped>
.modal-lg {
    width: 950px;
}

.modal-dialog {
    margin-top: 0
}

#edit_danger .modal-body {
    height: 550px;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
}

#edit_danger .modal-header {
    padding: 0;
    border-bottom: 1px solid #e5e5e5;
    height: 60px;
    background: #FAFAFA;
    border-radius: 5px 5px 0 0;
}

.twostep_1,
.twostep_2 {
    border: 1px solid #d3d3d3;
    width: 760px;
    margin: 20px auto 0;
    padding-top: 20px;
    position: relative;
    height: 100px;
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

.twostep_1 p {
    line-height: 70px;
    width: 500px;
}

.paientinfo {
    padding-bottom: 20px;
    border-bottom: 1px dashed #EFEFEF;
    width: 90%;
    margin: 20px auto;
}

.paientinfo table {
    width: 100%;
}

.paientinfo table td p span {
    display: inline-block;
    margin-left: 10px;
    height: 20px;
}

.paientinfo table td .iphone {
    background: url(../assets/img/iphone.png) no-repeat left center;
    padding-left: 20px;
}

.paientinfo table td .other {
    font-size: 12px;
    color: #999;
}

.paientinfo table td .name {
    font-weight: 700;
}

.twostep_1 p span {
    padding-left: 30px;
    display: inline-block;
}

.twostep_1 p span.zhibiao {
    display: inline-block;
    background: url(../assets/img/up_arrow.png) no-repeat right center;
    padding-right: 10px;
    width: 100px;
}

.twostep_1 p span.zhibiao2 {
    display: inline-block;
    background: url(../assets/img/down_arrow.png) no-repeat right center;
    padding-right: 10px;
    width: 100px;
}
</style>
