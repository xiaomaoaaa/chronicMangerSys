<template>
    <div class="index clearafter">
        <module-head></module-head>
        
        <div class="content cbafter">
            <div class="w220 fl">
                <menu-list></menu-list>
            </div>
            <div class="w980 fr">
                <h1>设计问卷</h1>
                <div class="w940_one cbafter">
                    <div class="h2_tit">
                        <h2 class="fl">选择您的问卷需求，为你设计完美问卷！</h2>
                    </div>
                    <div class="q_content cbafter">
                        <div class="con_menu fl">
                            <h2>选择题型</h2>
                            <ul>
                                <li v-for="item in qtypelist" @click="addqtype(item)">{{item.name}}</li>
                            </ul>
                        </div>
                        <div class="con_menu_info fr">
                            <div class="search_q">
                                <label>标 题</label>
                                <input type="text" v-model="questionnaireTitle" disabled />
                            </div>
                            <div class="q_detail_list" id="q_detail_list">
                                <div class="form-group" v-for="item in qlist" data-id="{{item.subjectId}}" track-by="$index" @mouseenter="showoperation" @mouseleave="hideoperation">
                                    <div class="subtit">{{$index+1}}、
                                        <input type="text" v-model="item.subjectContent" />
                                    </div>
                                    <div v-if="item.subjectAnswerType=='01'" class="radio" v-for="subitem in item.options">
                                        <input type="radio" name="radio{{$parent.$index}}">
                                        <input type="text" v-model="subitem.optionContent" @focus="showoptionOp" @blur="hideoptionOp">
                                        <div class="optionOp"><span class="glyphicon glyphicon-trash" @click="deloption($parent.$index,subitem)"></span></div>
                                    </div>
                                    <div v-if="item.subjectAnswerType=='02'" class="checkbox" v-for="subitem in item.options">
                                        <input type="checkbox" name="checkbox{{$parent.$index}}">
                                        <input type="text" v-model="subitem.optionContent" @focus="showoptionOp" @blur="hideoptionOp">
                                        <div class="optionOp"><span class="glyphicon glyphicon-trash" @click="deloption($parent.$index,subitem)"></span></div>
                                    </div>
                                    <div v-if="item.subjectAnswerType=='03'">
                                        <input type="text" class="form-control">
                                    </div>
                                    <div v-if="item.subjectAnswerType=='04'">
                                        <textarea class="form-control" rows="6"></textarea>
                                    </div>
                                    <!-- <div v-if="item.subjectAnswerType=='05'">
                                       
                                    </div> -->
                                    <div v-if="item.subjectAnswerType=='99'" class="fyf">
                                    </div>
                                    <div class="operation2" v-if="item.subjectAnswerType=='01'||item.subjectAnswerType=='02'">
                                        <span class="glyphicon glyphicon-plus-sign" @click="addoption($index)"></span>
                                    </div>
                                    <div class="operation">
                                        <span class="glyphicon glyphicon-trash" @click="delsubject(item)"></span>
                                        <span class="glyphicon glyphicon-move"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="nocontip" v-if="qlist.length==0">
                                请您先点击左侧题型，以添加问卷题目！
                            </div>
                            <div class="form-group text-center" v-if="qlist.length>0">
                                <button class="default ok center" @click="savequestionnaire" v-if="isused">发布问卷</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="confimdel">
            <div class="toast3">
                <p>确认删除</p>
                <p>{{delsubjectitem.subjectContent}}</p>
                <p>
                    <button class="btn btn-danger" @click="okdelesubject">确定</button>
                    <button class="btn btn-default" @click="canceldelesubject">取消</button>
                </p>
            </div>
            <div class="bg_master3"></div>
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
import Sortable from 'sortablejs'

export default {
    data() {
            return {
                // 菜单栏写死的数据
                qtypelist: [{
                    name: '单选题',
                    typeid: "01"
                }, {
                    name: '多选题',
                    typeid: "02"
                }, {
                    name: '单行填空题',
                    typeid: "03"
                }, {
                    name: '多行填空题',
                    typeid: "04"
                }, {
                    name: '描述说明',
                    typeid: "05"
                }, {
                    name: '分页符',
                    typeid: "99"
                }],
                qlist: [], //问卷列表数据
                questionnaireTitle: "", //问卷题目
                onStartindex: "", //移动题目开始的索引
                delsubjectitem: {}, //删除当前题目对象
                savedesign: {
                    questionnaireId: "", //问卷ID
                    questionnairesubjectdefs: []
                },
                isused:true,//判断是否可以保存问卷
            }
        },
        computed: {

        },
        components: {
            moduleHead, menuList
        },
        ready() {
            
            var that = this;
            var urlquestionnaireId = Public.getParameter("id");
            this.savedesign.questionnaireId = urlquestionnaireId;
            // 根据ID获取问卷设计有就显示 没有就空白
            $.when(Public.commonajax("coms.questionnairedefService", "getQuestionnairesubjectdefByQuestionnaireId", "[" + urlquestionnaireId + "]"))
                .done(function(res) {
                    if (res.code == 200) {
                        that.qlist = res.body.questionnairesubjectdefs;
                        that.questionnaireTitle = res.body.questionnaireTitle
                        if(res.body.used==1){
                            that.isused=false;
                            Public.ajaxPrompt("此问卷使用中,不能修改")
                        }
                    }
                })
            var container = document.getElementById('q_detail_list');
            new Sortable(container, {
                // group: "name",
                // store: null, // @see Store
                handle: ".glyphicon-move", // 点击目标元素约束开始
                draggable: ".form-group", // 指定那些选项需要排序
                ghostClass: "sortable-ghost",
                ghostClass: "sortable-ghost", // Class name for the drop placeholder
                chosenClass: "sortable-chosen", // Class name for the chosen item
                dragClass: "sortable-drag", // Class name for the dragging item

                onStart: function(evt) { // 拖拽开始
                    evt.preventDefault();
                    var itemEl = evt.item;
                    var formgroup = $("#q_detail_list").find(".form-group");
                    var temarr = Array.from(formgroup);
                    var onStartindex = temarr.findIndex((value) => value == itemEl);
                    console.log(onStartindex)
                        // that.onStartdata=that.qlist[onStartindex];
                    that.onStartindex = onStartindex;

                },

                onEnd: function(evt) { // 拖拽结束
                    evt.preventDefault();
                    var itemEl = evt.item;
                    var formgroup = $("#q_detail_list").find(".form-group");
                    var temarr = Array.from(formgroup); //转化成数组方便使用数组的方法
                    var onEndindex = temarr.findIndex((value) => value == itemEl);
                    // 更换数据的位置
                    var onStartdata = that.qlist[that.onStartindex];
                    var onEnddata = that.qlist[onEndindex];
                    that.qlist.$set(that.onStartindex, onEnddata)
                    that.qlist.$set(onEndindex, onStartdata)

                },

                onAdd: function(evt) {
                    var itemEl = evt.item;
                    // console.log(itemEl);
                },

                onUpdate: function(evt) {
                    var itemEl = evt.item; // 当前拖拽的html元素
                    // console.log(itemEl);
                },

                onRemove: function(evt) {
                    var itemEl = evt.item;
                    // console.log(itemEl);
                }
            });

        },
        methods: {
            // 点击菜单增加问卷题目
            addqtype(item) {
                    if (item.typeid == "01") {
                        var temobj = {
                            "subjectAnswerType": "01",
                            subjectContent: "单选题",
                            "options": [{
                                "optionContent": "单选选项1",
                                "optionDefaultFlag": "0",
                                "optionInputFlag": "0"
                            }, {
                                "optionContent": "单选选项2",
                                "optionDefaultFlag": "0",
                                "optionInputFlag": "0"
                            }]
                        }
                    }
                    if (item.typeid == "02") {
                        var temobj = {
                            "subjectAnswerType": "02",
                            subjectContent: "多选题",
                            "options": [{
                                "optionContent": "多选选项1",
                                "optionDefaultFlag": "0",
                                "optionInputFlag": "0"
                            }, {
                                "optionContent": "多选选项2",
                                "optionDefaultFlag": "0",
                                "optionInputFlag": "0"
                            }]
                        }
                    }
                    if (item.typeid == "03") {
                        var temobj = {
                            "subjectAnswerType": "03",
                            subjectContent: "单行填空题"
                        }
                    }
                    if (item.typeid == "04") {
                        var temobj = {
                            "subjectAnswerType": "04",
                            subjectContent: "多行填空题"
                        }
                    }
                    if (item.typeid == "05") {
                        var temobj = {
                            "subjectAnswerType": "05",
                            subjectContent: "描述说明"
                        }
                    }
                    if (item.typeid == "99") {
                        var temobj = {
                            "subjectAnswerType": "99",
                            subjectContent: "分页符"
                        }
                    }
                    this.qlist.push(temobj);
                },
                // 显示选项的删除按钮
                showoptionOp(event) {
                    $("#q_detail_list").find('.optionOp').hide();
                    $(event.target).next(".optionOp").show();

                },
                // 显示选项的删除按钮
                hideoptionOp(event) {
                    setTimeout(function() {
                        $(event.target).next(".optionOp").hide()
                    }, 500)

                },
                // 删除单选或者多选的选项
                deloption(pindex, subitem) {
                    var that=this;
                    if(subitem.optionId){
                        // 根据optionId删除问卷题目选项
                    $.when(Public.commonajax("coms.questionnairedefService", "deleteOptionByOptionId", "[" + subitem.optionId + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                that.qlist[pindex].options.$remove(subitem);
                            }else{
                                Public.ajaxPrompt(res.msg)
                            }
                        })
                    }else{
                        that.qlist[pindex].options.$remove(subitem);
                    }
                    
                    
                },
                // 新增单选或者的选项
                addoption(index) {
                    var temobj = {
                        "optionContent": "新增选项",
                        "optionDefaultFlag": "0",
                        "optionInputFlag": "0"
                    };
                    this.qlist[index].options.push(temobj)
                },
                // 删除题目
                delsubject(item) {
                    $("#confimdel").show();
                    this.delsubjectitem = item;
                },
                // 取消删除题目
                canceldelesubject() {
                    $("#confimdel").hide();
                },
                // 确认删除题目
                okdelesubject() {
                    var that=this;
                    if(this.delsubjectitem.subjectId){
                    // this.qlist.$remove(this.delsubjectitem);
                  
                    // 根据sujectId删除问卷题目
                    $.when(Public.commonajax("coms.questionnairedefService", "deleteQuestionnairesubjectdef", "[" + that.delsubjectitem.subjectId + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                               
                                that.qlist.$remove(that.delsubjectitem);
                            }else{
                                Public.ajaxPrompt(res.msg)
                            }
                        })
                    }else{

                        that.qlist.$remove(that.delsubjectitem);
                    }
                      $("#confimdel").hide();
                },
                // 保存问卷设计
                savequestionnaire() {
                    // console.log(this.qlist)
                    var that = this;
                    this.savedesign.questionnairesubjectdefs = this.qlist;
                    $.when(Public.commonajax("coms.questionnairedefService", "saveQuestionnairesubjectdefAndoptiondef", "[" + JSON.stringify(this.savedesign) + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                 Public.ajaxPrompt("保存成功")
                                $.when(Public.commonajax("coms.questionnairedefService", "getQuestionnairesubjectdefByQuestionnaireId", "[" + that.savedesign.questionnaireId + "]"))
                                    .done(function(res) {
                                        if (res.code == 200) {

                                            that.qlist = res.body.questionnairesubjectdefs;
                                            that.questionnaireTitle = res.body.questionnaireTitle
                                        }
                                    })
                            }else{
                                alert(res.msg);
                            }
                        })

                },
                // 鼠标移动到题目上显示删除和移动图标
                showoperation(event) {
                    $(event.target).find(".operation").show()
                },
                // 鼠标离开题目隐藏删除和移动图标
                hideoperation(event) {
                    $(event.target).find(".operation").hide()
                }


        },
        watch: {},
        events: {}

}
</script>
<style scoped>
.h2_tit {
    padding: 0 10px 0 20px;
    border-bottom: 1px solid #e6e6e6;
    height: 42px
}

.h2_tit h2 {
    height: 42px;
    line-height: 42px;
    font-size: 16px;
}

.content .w980 h1 {
    font-size: 20px;
    color: #333333;
    margin-bottom: 20px;
}

.w940_one {
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

.w940_one .q_content {
    padding: 20px
}

.con_menu {
    border: 1px solid #E9EEF2;
    width: 180px;
}

.con_menu h2 {
    font-size: 16px;
    border-bottom: 1px solid #E9EEF2;
    line-height: 50px;
    height: 50px;
    padding-left: 20px;
    font-weight: bold
}

.con_menu ul {
    padding: 20px
}

.con_menu ul li {
    line-height: 50px;
    height: 50px;
    background: url(../../assets/img/change.png) no-repeat left center;
    padding-left: 30px;
}

.con_menu ul li:hover {
    cursor: pointer;
}

.con_menu ul li:nth-child(1) {
    background: url(../../assets/img/radio2.png) no-repeat left center;
}

.con_menu ul li:nth-child(2) {
    background: url(../../assets/img/checkbox.png) no-repeat left center;
}

.con_menu ul li:nth-child(3) {
    background: url(../../assets/img/input.png) no-repeat left center;
}

.con_menu ul li:nth-child(4) {
    background: url(../../assets/img/textarea.png) no-repeat left center;
}

.con_menu ul li:nth-child(5) {
    background: url(../../assets/img/des.png) no-repeat left center;
}

.con_menu ul li:nth-child(6) {
    background: url(../../assets/img/fyf.png) no-repeat left center;
}

.con_menu_info {
    width: 700px
}

.search_q {
    background: #1dc499;
    height: 50px;
    line-height: 50px;
}

.search_q label {
    width: 100px;
    color: #fff;
    font-size: 30px;
    text-align: center;
    float: left;
}

.search_q input {
    width: 575px;
    background: #fff;
    height: 40px;
    float: left;
    line-height: 40px;
    margin-top: 5px;
    margin-left: 20px;
    padding: 0 10px;
    font-size: 18px;
    font-weight: bold
}

.btn-success,
.btn-success:hover,
.btn-success:focus,
.btn-success.focus,
.btn-success:active {
    background-color: #1dc499;
    border-color: #1dc499;
}

.q_detail_list .form-group {
    border: 1px solid #E9EEF2;
    margin-top: 20px;
    padding: 30px 20px;
    position: relative;
}

.q_detail_list .subtit {
    font-weight: bold
}

.form-control {
    margin-top: 10px;
    border: 1px solid #E9EEF2;
}

.operation {
    position: absolute;
    color: #ccc;
    font-size: 20px;
    right: 20px;
    top: 10px;
    display: none
}

.operation span {
    display: inline-block;
    width: 30px
}

.operation2 {
    position: absolute;
    color: #ccc;
    font-size: 20px;
    left: 20px;
    bottom: 5px;
}

.glyphicon-move {
    cursor: move
}

.checkbox,
.radio {
    padding-left: 20px;
}

.nocontip {
    width: 100%;
    height: 300px;
    line-height: 300px;
    color: #999;
    font-size: 16px;
    text-align: center
}

.optionOp {
    position: absolute;
    right: 100px;
    top: -26px;
    color: #ccc;
    display: none;
    padding: 0 20px
}

#q_detail_list input[type='text'],
#q_detail_list textarea {
    width: 100%
}

#q_detail_list .subtit input[type='text'] {
    width: 90%
}

#confimdel {
    display: none
}

.fyf {
    border-bottom: 1px solid #ccc;
    height: 20px
}
</style>
