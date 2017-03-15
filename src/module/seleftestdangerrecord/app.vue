<template>
    <div class="index clearafter">
        <module-head></module-head>
        <div class="content cbafter">
            <div class="w220 fl">
                <menu-list></menu-list>
            </div>
            <div class="w980 fr">
                <div class="h1_tit">
                    <h1>危急值</h1>
                </div>
                <!-- 危急值 -->
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
                                        </td>
                                        <td>
                                            <button class="default ok" v-show="listordeal" @click="listshow">自测指标</button>
                                            <button class="default greynobg" v-show="!listordeal" @click="dealshow">返回上一页</button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="modal-body">
                                <div class="twostep" v-show="listordeal">
                                    <div class="twostep_1">
                                        <h4>危急值</h4>
                                        <p><span>{{patientinfo.indexName}}</span><span :class="{'zhibiao2':parseFloat(patientinfo.indexVal)<parseFloat(patientinfo.normalValBottom),'zhibiao':parseFloat(patientinfo.indexVal)<parseFloat(patientinfo.normalValTop)}">{{patientinfo.indexVal}}</span><span>{{patientinfo.indexActionName}}</span></p>
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
                                <div class="paientinfo testlist" v-show="!listordeal">
                                    <table>
                                        <tr>
                                            <th colspan="4">
                                                开始时间：
                                                <input type="text" id="start" v-model="param.startDate"> 结束时间：
                                                <input type="text" id="end" v-model="param.endDate">
                                                <button class="default" id="searchselftest" @click="searchselftestbytime">搜索</button>
                                            </th>
                                        </tr>
                                        <tr v-for="item in selftestlist">
                                            <td>
                                                <button class="default ok noradius">{{item.indexBelongName}}</button>
                                            </td>
                                            <td>
                                                <p v-for="subitem in item.itemList">{{subitem.name}}：<span :class="{colorred:subitem.isDanger=='1'}">{{subitem.value}}</span>{{subitem.unit}}<span class="Danger" v-if="subitem.isDanger=='1'">危</span><span>措施：{{subitem.measure}}</span></p>
                                            </td>
                                            <td>
                                                <button class="default greynobg okborder" @click="showcharts(item)">走势图</button>
                                            </td>
                                            <td>
                                                <p>{{item.time.substr(0,10)}}</p>
                                                <p>{{item.time.substr(10)}}</p>
                                            </td>
                                        </tr>
                                        <tr v-if="bootpageshow">
                                            <td colspan="4">
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
                    </div>
                </div>
            </div>
        </div>
        <!--模态框-->
        <div class="modal fade" id="charts" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="closecharts">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">{{chartstit}}</h4>
                    </div>
                    <div class="modal-body" id="main">
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
import Public from 'assets/public.js'
import moduleHead from 'components/module-head'
import menuList from 'components/menu-list'
import 'assets/lib/laydate/laydate.js'
import 'assets/lib/laydate/need/laydate.css'
import 'assets/lib/laydate/skins/danlan/laydate.css'
var headimg = require("assets/img/cs2.jpg");
import bootPage from 'components/BootPage.vue'
    // 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/markPoint');
require('echarts/lib/component/dataZoom');
export default {
    data() {
            return {
                bootpageshow: false,
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
                dangervalDealTypeselect: "",
                listordeal: true,
                lenArr: [10, 20, 50], // 每页显示长度设置
                pageLen: 5, // 可显示的分页数
                headersparam: {
                    "X-Service-Id": "coms.selftestindexdefService",
                    "X-Service-Method": "findPatientIndexOnWeb",
                },
                param: {
                    firstRequest: "1", //进入列表页面的请求的标识，区别搜索的的请求
                    mpiId: "",
                    endDate: "",
                    startDate: ""
                }, // 传递参数,
                selftestlist: [],
                chartstit: "", //趋势图title

            }
        },
        computed: {

        },
        components: {
            moduleHead, menuList, bootPage

        },
        ready() {
         
            var that = this;
            // 获取字典
            $.when(Public.commonajax("coms.multipleDictionaryService", "findDic", "[['base.dictionary.base_dangervalDealType']]"))
                .done(function(res) {
                    if (res.code == 200) {
                        that.dangervalDealTypelist = res.body[0].items;
                    }
                })
                // 根据dangerRecordId获取信息
            $.when(Public.commonajax("coms.dangerIndexRecordService", "findDangerIndexRecordById", "['" + Public.getParameter("dangerRecordId") + "']"))
                .done(function(res) {
                    if (res.code == 200) {
                        res.body.applyTime = res.body.applyTime != null ? res.body.applyTime.substr(0, 10) : "未填写";
                        res.body.occurTime = res.body.occurTime != null ? res.body.occurTime.substr(0, 10) : "未填写";
                        that.patientinfo = res.body;
                        that.param.mpiId = that.patientinfo.mpiId;

                    }

                })
            var myDate = new Date(); //获取今天日期
            this.param.endDate = Public.formatDate(myDate);
            myDate.setDate(myDate.getDate() - 7);
            this.param.startDate = Public.formatDate(myDate);
            // 日历插件
            laydate({
                elem: '#start',
                max: laydate.now(),
                min: laydate.now(-30),
                istoday: false,
                choose: function(datas) { //选择日期完毕的回调  
                    that.param.startDate = datas
                }
            });
            // 日历插件
            laydate({
                elem: '#end',
                max: laydate.now(),
                min: laydate.now(-30),
                istoday: false,
                choose: function(datas) { //选择日期完毕的回调  
                    that.param.endDate = datas
                }
            });

            // 图形插件
            // var myChart = echarts.init(document.getElementById('main'));
            // myChart.setOption({
            //     title: {
            //         text: '',
            //         // subtext: '纯属虚构'
            //     },
            //     tooltip: {
            //         trigger: 'axis'
            //     },
            //     legend: {
            //         data: ['最高气温', '最低气温'],
            //         right: 20
            //     },
            //     dataZoom: [{
            //         type: 'slider',

            //     }],
            //     xAxis: {
            //         type: 'category',
            //         boundaryGap: false,
            //         data: ['1', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6']
            //     },
            //     yAxis: {
            //         type: 'value',
            //         axisLabel: {
            //             formatter: '{value} °C'
            //         }
            //     },
            //     dataZoom: [{
            //         type: 'slider',
            //         xAxisIndex: 0,
            //         filterMode: 'empty'
            //     }, {
            //         type: 'inside',
            //         xAxisIndex: 0,
            //         filterMode: 'empty'
            //     }],
            //     series: [{
            //         name: '最高气温',
            //         type: 'line',
            //         data: [11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12, 13, 11, 11, 15, 13, 12, 13],
            //         markPoint: {
            //             data: [{
            //                 type: 'max',
            //                 name: '最大值'
            //             }, {
            //                 type: 'min',
            //                 name: '最小值'
            //             }]
            //         },
            //         markLine: {
            //             data: [{
            //                 type: 'average',
            //                 name: '平均值'
            //             }]
            //         }
            //     }, {
            //         name: '最低气温',
            //         type: 'line',
            //         data: [1, -2, 2, 5, 3, 2, 0, 1, -2, 2, 5, 3, 2, 1, -2, 2, 5, 3, 2],
            //         markPoint: {
            //             data: [{
            //                 name: '周最低',
            //                 value: -2,
            //                 xAxis: 1,
            //                 yAxis: -1.5
            //             }]
            //         },
            //         markLine: {
            //             data: [{
            //                     type: 'average',
            //                     name: '平均值'
            //                 },
            //                 [{
            //                     symbol: 'none',
            //                     x: '90%',
            //                     yAxis: 'max'
            //                 }, {
            //                     symbol: 'circle',
            //                     label: {
            //                         normal: {
            //                             position: 'start',
            //                             formatter: '最大值'
            //                         }
            //                     },
            //                     type: 'max',
            //                     name: '最高点'
            //                 }]
            //             ]
            //         }
            //     }]
            // });


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
                // 关闭趋势图弹框
                closecharts() {
                    $("#charts").modal("hide")
                },
                //根据起始时间和结束时间搜索健康列表
                searchselftestbytime() {
                    this.refresh();
                },
                // 显示趋势图弹框
                showcharts(item) {
                    var that = this;
                    that.chartstit = item.indexBelongName;
                    $("#charts").modal("show");
                    $("#main").height(430);
                    $("#main").width(600);
                    let tempobj = {
                        "endDate": this.param.endDate,
                        "indexBelongName": item.indexBelongName,
                        "mpiId": this.patientinfo.mpiId,
                        "startDate": this.param.startDate

                    };

                    // 获取字典
                    $.when(Public.commonajax("coms.selftestindexdefService", "patientIndexStaticsOnWeb", "[" + JSON.stringify(tempobj) + "]"))
                        .done(function(res) {
                            let resdata = res.body.bottomData;
                            let legenddata = [],
                                xAxisdata = [],
                                seriesdata = [];
                            if (res.code == 200) {
                                // if(resdata.length>1){
                                //    legenddata.push(resdata[0].indexName);
                                //    legenddata.push(resdata[1].indexName);
                                // }else{
                                //     legenddata.push(resdata[0].indexName);
                                // }


                                legenddata.push(resdata[0].indexName);
                                var myChart = echarts.init(document.getElementById('main'));

                                myChart.setOption({
                                    title: {
                                        text: '',
                                    },
                                    tooltip: {
                                        trigger: 'axis'
                                    },
                                    legend: {
                                        data: legenddata,
                                        right: 20
                                    },

                                    xAxis: {
                                        type: 'category',
                                        boundaryGap: false,
                                        data: resdata[0].list.map(function(item) {
                                            return item.selfTestTime.substr(5, 15);
                                        })
                                    },
                                    yAxis: {
                                        type: 'value',
                                        axisLabel: {
                                            formatter: '{value}'
                                        }
                                    },
                                    dataZoom: [{
                                        type: 'slider',
                                        xAxisIndex: 0,
                                        filterMode: 'empty'
                                    }],
                                    series: [{
                                        name: resdata[0].indexName,
                                        type: 'line',
                                        data: resdata[0].list.map(function(item) {
                                            return item.quantifyVal;
                                        }),

                                    }]
                                });
                            }
                        })

                },
                // 点击返回上一页 显示处理危急值页面
                dealshow() {
                    this.listordeal = true;
                    this.bootpageshow = false;
                },
                // 点击健康监测显示列表
                listshow() {
                    this.listordeal = false;
                    this.bootpageshow = true;

                },
                refresh() {
                    this.$refs.page.refresh()
                },

        },
        events: {
            // 分页组件传回的表格数据
            'data' (data) {
                this.selftestlist = data
            }
        },
        watch: {

        }
}
$(function() {

})
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
    background: url(../../assets/img/iphone.png) no-repeat left center;
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
    background: url(../../assets/img/up_arrow.png) no-repeat right center;
    padding-right: 10px;
    width: 100px;
}

.twostep_1 p span.zhibiao2 {
    display: inline-block;
    background: url(../../assets/img/down_arrow.png) no-repeat right center;
    padding-right: 10px;
    width: 100px;
}

.okborder {
    border: #1dc499 solid 1px;
    color: #1dc499;
    width: 80px
}

.noradius {
    border-radius: 0;
    width: 100px
}

.testlist {
    width: 80%;
    border-bottom: none;
}

.testlist tr {
    border-bottom: 1px dashed #EFEFEF;
    padding: 15px 0
}

.testlist tr th {
    padding: 0 0 20px;
    font-weight: normal;
}

.testlist tr td {
    padding: 15px 0
}

#main {
    width: 600px;
    height: 400px
}

.testlist input {
    border: 1px solid #EFEFEF;
    margin: 0 20px 0 10px;
    padding: 3px 10px 3px 10px
}

#searchselftest {
    display: inline-block;
    color: #333
}

.Danger {
    height: 24px;
    width: 24px;
    color: #fff;
    background: #F8684E;
    display: inline-block;
    border-radius: 50%;
    font-size: 12px;
    text-align: center;
}

.colorred {
    color: #F8684E
}
</style>
