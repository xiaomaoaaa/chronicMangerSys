<template>
    <div class="index clearafter">
        <module-head></module-head>
        <div class="content cbafter">
            <div class="w220 fl">
                <menu-list></menu-list>
            </div>
            <div class="w980 fr">
                <h1>复查项目维护</h1>
                <div class="w940_one cbafter">
                    <div class="h2_tit">
                        <p class="fl">复查项目名称</p>
                        <p class="fl">项目说明</p>
                    </div>
                    <div class="fl w560">
                        <table class="table table-hover ">
                            <tbody>
                                <tr v-for="item in reviewservicelist" track-by="$index">
                                    <td>{{item.indicatorName}}</td>
                                    <td>{{item.indicatorDesc}}</td>
                                    <td><span class="glyphicon glyphicon-pencil" @click="reviewservicemodalshow(item)"></span><span class="glyphicon glyphicon-remove" @click="delereviewservice(item)"></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="fr w390">
                        <div>
                            <button @click="reviewservicemodalshow(item)"></button>
                            <p>维护复查项目</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 复查项目维护 -->
        <div class="modal fade" id="reviewservicemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" @click="getlist"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                {{reviewservice.title}}</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" v-on:submit.prevent="reviewservicesave">
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">复查项目名称 :</label>
                                <div class="col-md-8">
                                    <input type="input" class="form-control" name="chronicName" placeholder="请输入复查项目名称" v-model="reviewservice.subdata.indicatorName" required maxlength="10">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">项目说明 :</label>
                                <div class="col-md-8">
                                    <input type="input" class="form-control" name="chronicName" placeholder="请输入项目说明" v-model="reviewservice.subdata.indicatorDesc" required maxlength="32">
                                </div>
                            </div>
                            <div class="form-group topline">
                                <button type="submit" class="default center blue">保存</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- 删除项目维护 -->
        <div class="modal fade" id="delereviewservice" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                删除复查项目</h4>
                    </div>
                    <div class="modal-body">
                        <h3>你是否确认删除下列复查项目？</h3>
                        <div class="unit cbafter">
                            <p >复查项目：</p>
                            <div>
                                {{reviewservice.deledata.indicatorName}}
                            </div>
                        </div>
                        <div class="unit cbafter">
                            <p>项目说明：</p>
                            <div>
                                {{reviewservice.deledata.indicatorDesc}}
                            </div>
                        </div>
                        <div class="form-group topline text-center">
                            <button class="default dele center" @click="confirmdele">确认删除</button>
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
import 'assets/reset.css'
import Public from 'assets/public.js'
import moduleHead from 'components/module-head'
import menuList from 'components/menu-list'
export default {
    data() {
            return {
                reviewservicelist: [],
                reviewservice: {
                    title: "",
                    subdata: {
                        indicatorName: "",
                        indicatorDesc: ""
                    },
                    deledata: {}
                }
            }
        },
        computed: {

        },
        components: {
            moduleHead, menuList
        },
        ready() {
            var that = this;
            this.getlist();

        },
        methods: {
            getlist() {
                    var that = this;
                    // 获取维护列表
                    $.when(Public.commonajax("coms.reviewService", "getReviewindicatorList", "[]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                that.reviewservicelist = res.body;
                            }

                        });
                },
                // 新增或修改弹窗
                reviewservicemodalshow(item) {
                    $("#reviewservicemodal").modal("show");
                    if (item) {
                        this.reviewservice.title = "修改复查项目";
                        this.reviewservice.subdata = item;

                    } else {
                        this.reviewservice.title = "新增复查项目";
                        this.reviewservice.subdata = {
                            indicatorName: "",
                            indicatorDesc: ""
                        };

                    }
                },
                // 保存新增或修改复查项目
                reviewservicesave() {
                    var that = this;
                    $.when(Public.commonajax("coms.reviewService", "saveReviewindicator", "[" + JSON.stringify(this.reviewservice.subdata) + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("保存成功");
                                $("#reviewservicemodal").modal("hide");
                                that.getlist();
                            } else {
                                Public.ajaxPrompt(res.msg);
                            }

                        });
                },
            
                // 删除复查项目弹框
                delereviewservice(item) {
                    $("#delereviewservice").modal("show");
                    this.reviewservice.deledata = item
                },
                // 确认删除复查项目
                confirmdele(){
                    var that=this;
                    $.when(Public.commonajax("coms.reviewService", "deleteReviewindicator", "['"+this.reviewservice.deledata.indicatorId+"']"))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("删除成功");
                                $("#delereviewservice").modal("hide");
                                that.getlist();
                            } else {
                                Public.ajaxPrompt(res.msg);
                            }

                        });
                }
        },
        watch: {

        },
        events: {}

}
</script>
<style scoped>
.h2_tit {
    padding: 0 10px 0 20px;
    border-bottom: 1px solid #e6e6e6;
    height: 42px
}

.h2_tit p {
    height: 42px;
    line-height: 42px;
    font-size: 16px;
    text-align: center;
    width: 180px
}

.h2_tit p:nth-child(1) {
    width: 100px
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

.w560 {
    width: 560px;
    padding: 20px
}

.w390 {
    width: 390px;
}

.w940_one .w560 {
    background: url(../../assets/img/sunxian.png) no-repeat right center;
}

.w940_one .w560 td {
    line-height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    border-top: none;
}

.w940_one .w560 tr td:nth-child(1) {
    width: 120px
}

.w940_one .w560 tr td:nth-child(2) {
    width: 300px
}

.w940_one .w560 td span {
    color: #999;
    margin-left: 15px
}

.w940_one .w560 td span:hover {
    cursor: pointer;
}

.w940_one .w390>div {
    width: 200px;
    height: 115px;
    border-radius: 10px;
    margin: 90px auto 0;
    background: #1dc499;
    padding-top: 10px
}

.w940_one .w390>div button {
    background: none;
    border: none;
    border-radius: 50%;
    height: 48px;
    width: 48px;
    display: block;
    margin: 10px auto;
}

.w940_one .w390>div button {
    background: #ebf0f1 url(../../assets/img/green_add.png) no-repeat center center;
}

.w940_one .w390>div p {
    text-align: center;
    color: #fff
}

.h1_tit {
    height: 42px
}

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

.topline {
    border-top: 1px solid #e5e5e5;
    padding-top: 20px
}

#delereviewservice .modal-body h3 {
    font-size: 16px;margin:0 auto; width: 400px;line-height: 50px;
}
#delereviewservice .modal-body .unit{margin:0 auto; width: 400px;}
#delereviewservice .modal-body .unit p,#delereviewservice .modal-body .unit div{
    float: left;line-height: 30px;
}
#delereviewservice .modal-body .unit p{
   color:#ccc;
}
</style>
