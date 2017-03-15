<template>
    <div class="index clearafter">
        <module-head></module-head>
        <div class="content cbafter">
            <div class="w220 fl">
                <menu-list></menu-list>
            </div>
            <div class="w980 fr">
                <div class="h1_tit">
                    <h1 class="fl">问卷维护</h1>
                    <button class="fr default ok" @click="editquestionnaire()">创建空白问卷</button>
                </div>
                <div class="questionnairelist bg">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th colspan="2">问卷标题</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in questionnaire.look.questionnairelist">
                                <td class="text-center">{{$index+1}}</td>
                                <td>
                                    {{item.questionnaireTitle}}
                                </td>
                                <td class="text-center">
                                    <button class="btn btn-success" @click="editquestionnaire(item,$index)"><span class="glyphicon glyphicon-pencil"></span></button>
                                    <button class="btn btn-info" @click="designquestionnaire(item,$index)"><span class="glyphicon glyphicon-list"></span></button>
                                    <button class="btn btn-danger" @click="delquestionnairemethod(item,$index)"><span class="glyphicon glyphicon-remove"></span></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- 新增或修改问卷 -->
        <div class="modal fade" id="editquestionnaire" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                {{questionnaire.addoreditname}}</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" id="editquestionnaireform" v-on:submit.prevent="subquestionnaire">
                            <div class="form-group">
                            <label for="" class="col-md-3 control-label">问卷标题：<span class="start">*</span></label>
                                <div class="col-md-8">
                                    <input class="form-control" type="text" v-model="questionnaire.sub.questionnaireTitle" maxlength="20" required/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">问卷说明：<span class="start">*</span></label>
                                <div class="col-md-8">
                                    <input class="form-control" type="text" v-model="questionnaire.sub.questionnaireDesc" maxlength="100" required />
                                </div>
                            </div>
                            <div class="form-group save">
                                <button type="submit" class="default blue center">保存</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- 确认删除 -->
        <div class="modal fade" id="comfirmdel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                删除问卷</h4>
                    </div>
                    <div class="modal-body deleinfo">
                        <h2>您是否确认删除下列问卷信息？</h2>
                        <div><span>问卷标题：</span>{{delquestionnaire.look.questionnaireTitle}}</div>
                        <div><span>问卷说明：</span>{{delquestionnaire.look.questionnaireDesc}}</div>
                    </div>
                    <div class="form-group save">
                        <button type="submit" class="default dele center" @click="comfirmdel">确认删除</button>
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
export default {
    data() {
            return {
                urlquestionnaireTypeId:"",
                questionnaire: {
                    "sub": {
                        "questionnaireTypeId": "",
                        "questionnaireTitle": "",
                        "questionnaireDesc": "",
                        "questionnaireId": "",
                    },
                    "look": {
                        questionnairelist: [],
                        
                    },
                    editindex: "add",
                     addoreditname:""
                },
                delquestionnaire: {
                    sub: {
                        "questionnaireId": "",
                    },
                    look: {
                        "questionnaireTitle": "",
                        "questionnaireDesc": "",
                    },
                    delindex:""
                },
            }
        },
        computed: {

        },
        components: {
            moduleHead, menuList
        },
        ready() {
            var that = this;
            that.urlquestionnaireTypeId = Public.getParameter("type");
            var secondop=0;

            // 获取列表数据 根据模块id来显示问卷类型ID：01健康信息（传参数['01',1]）、02意见建议(分为医生对患者的，患者对医生的传参数['02',0]['03',0]) 
            $.when(Public.commonajax("coms.questionnairedefService", "findQuestionareDefListByIdAndType", "['"+that.urlquestionnaireTypeId+"','"+secondop+"']"))
                .done(function(res) {
                    if (res.code == 200) {
                        that.questionnaire.look.questionnairelist = res.body;
                    }
                })
        },
        methods: {
            // 新增或者编辑问卷弹框
            editquestionnaire(item, index) {
                    $("#editquestionnaire").modal('show');
                    if (item) {
                        this.questionnaire.sub = item;
                        this.questionnaire.editindex = index; //编辑
                        this.questionnaire.addoreditname="修改问卷"
                    } else {
                        this.questionnaire.editindex = "add"; //新增
                         this.questionnaire.addoreditname="新增问卷"
                        this.questionnaire.sub = {
                            "questionnaireTypeId": this.urlquestionnaireTypeId,
                            "questionnaireTitle": "",
                            "questionnaireDesc": "",
                            "questionnaireId": 0,
                        }
                    }
                },
                // 删除问卷弹框
                delquestionnairemethod(item,index) {
                    $("#comfirmdel").modal('show');
                     this.delquestionnaire.delindex=index;
                     this.delquestionnaire.look = {
                        questionnaireTitle: item.questionnaireTitle,
                        questionnaireDesc: item.questionnaireDesc
                    };
                    this.delquestionnaire.sub = {
                        questionnaireId: item.questionnaireId
                    }
                },
                // 确认删除问卷标题
                comfirmdel() {
                    var that=this;

                    $("#comfirmdel").modal('hide');
                    $.when(Public.commonajax("coms.questionnairedefService", "deleteQuestionnairedef", "["+this.delquestionnaire.sub.questionnaireId+"]"))
                        .done(function(res) {
                            if (res.code == 200) {
                               Public.ajaxPrompt("删除成功");
                               that.questionnaire.look.questionnairelist.splice(that.delquestionnaire.delindex,1)
                            }
                        })
                },
                // 新增或者编辑问卷保存    
                subquestionnaire() {
                    var that = this;
                    // 获取列表数据 根据模块id来显示问卷类型ID：01健康信息、02意见建议
                    $.when(Public.commonajax("coms.questionnairedefService", "saveQuestionnairedef", "[" + JSON.stringify(this.questionnaire.sub) + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("保存成功");
                                $("#editquestionnaire").modal('hide');
                                if (that.questionnaire.editindex != "add") {
                                    that.questionnaire.look.questionnairelist.$set(that.questionnaire.editindex, res.body);
                                } else {
                                    that.questionnaire.look.questionnairelist.unshift(res.body);
                                }

                            } else {
                                alert(res.msg)
                            }
                        })
                },
                //点击设计问卷传ID
                  designquestionnaire(item){
                    $.when(Public.commonajax("coms.questionnairedefService", "isQuestionaireDefIsUsed", "["+item.questionnaireId+"]"))
                        .done(function(res) {
                            // console.log(res);
                            if (res.body==undefined) {

                               window.location.href="questionnairedesign.html?id="+item.questionnaireId
                            }else{
                                Public.ajaxPrompt(res.body);
                            }
                        })
                   
                },
            
        },
        events: {

        },
        watch: {

        },
}
$(function() {

})
</script>
<style scoped>
/*问卷列表*/

.questionnairelist {
    padding: 20px
}

.questionnairelist table th {
    text-align: center;
    line-height: 36px;
    height: 36px;
    font-weight: normal;
}

.questionnairelist table th:nth-child(2) {
    width: 30%
}

.questionnairelist table td {
    line-height: 37px;
}

#editquestionnaire .modal-body {
    padding-bottom: 0
}

.btn-success,
.btn-success:hover,
.btn-success:focus,
.btn-success.focus,
.btn-success:active {
    background-color: #1dc499;
    border-color: #1dc499;
}

.save {
    border-top: 1px solid #ccc;
    padding-top: 20px
}


#comfirmdel .deleinfo {
    line-height: 40px;
    width: 80%;
    margin: 10px auto;
}

#comfirmdel .deleinfo h2 {
    font-size: 16px;
    line-height: 40px;
    text-align: center;
}

#comfirmdel .deleinfo div>span {
    color: #999999;
}
.form-horizontal .control-label{padding-top: 0}
</style>
