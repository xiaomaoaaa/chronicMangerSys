<template>
    <div class="header">
        <div class="header_con">
            <div class="fl"><img v-bind:src="logo" width="400" height="47"></div>
            <ul class="fr">
                <li class="home">
                    <a href="index.html">首 页</a>
                </li>
                <li class="info" @click="gotomessagebox">
                    <span class="badge">{{messagsetotal}}</span>
                    <a >消 息</a>
                </li>
                <li class="set">
                    <a @click="setpassword">设 置</a>
                </li>
                <li class="phone">
                    <a href="">手机端</a>
                </li>
                <li class="headimg">
                    <a href="">Hi！{{userName}}</a>
                </li>
                <li class="exit">
                    <a @click="loginout"> 退出</a>
                </li>
            </ul>
        </div>
        <!-- 设置密码 -->
        <div class="modal fade" id="setpassword" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                设置密码</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" id="changehealdocform" v-on:submit.prevent="savesetpassword">
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">用户名 :</label>
                                <div class="col-md-6">
                                    <input type="text" disabled class="form-control" v-model="userName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">原密码 :</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" v-model="passwordobj.originalPwd" onfocus="this.type='password'">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">新密码 :</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" v-model="passwordobj.newPwd" onfocus="this.type='password'">
                                </div>
                            </div>
                            <div class="form-group save">
                                <button type="submit">确认</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
var logo = require("assets/img/logo.png");
import Public from 'assets/public.js'
var md5 = require("md5");
module.exports = {
    data() {
            return {
                logo: logo,
                userName: sessionStorage.getItem('userName'),
                passwordobj: {
                    originalPwd: "",
                    newPwd: "",
                },
                messagsetotal:"",//未读信息总数
            }
        },
        props: {
            //      "title":{
            //  type:String,
            //  default:"标题"
            // },

        },
        ready() {
            var that=this;
            if (sessionStorage.getItem('accessToken')) {

            } else {
                window.location.replace("login.html");
            };
            //获取未读消息总数
             $.when(Public.commonajax("base.notificationService", "getCountNotification", "[[]]"))
                .done(function(res) {
                    if (res.code == 200) {
                        that.messagsetotal = res.body;
                    }
                });
        },
        methods: {
            loginout() {
                    $.ajax({
                        url: Public.LOGOUT_URL(),
                        type: "GET",
                        headers: {
                            "X-Access-Token": sessionStorage.getItem('accessToken'),
                        },
                        beforeSend: function() {
                            Public.loading("")
                        },
                        success: function(res) {
                            Public.stoploading();
                            sessionStorage.setItem('accessToken', "");
                            window.location.replace("login.html");
                        },
                        error: function(err) {
                            Public.stoploading();
                            return err
                        }
                    });

                },
                //设置就是修改密码
                setpassword() {
                    $("#setpassword").modal("show");
                },
                //修改密码保存
                savesetpassword() {
                    var that = this;
                    $.ajax({
                        url: Public.CHANGEPWD_URL(),
                        type: "POST",
                        headers: {
                            "X-Access-Token": sessionStorage.getItem('accessToken'),
                        },
                        data: JSON.stringify({
                            "originalPwd": md5(that.passwordobj.originalPwd),
                            "newPwd": md5(that.passwordobj.newPwd),
                        }),
                        beforeSend: function() {
                            Public.loading("")
                        },
                        success: function(res) {
                            if (res.code == 200) {
                                Public.stoploading();
                                $("#setpassword").modal("hide");
                                Public.ajaxPrompt("修改成功")
                            }else{
                                Public.stoploading();
                                 Public.ajaxPrompt(res.msg)
                            }
                        },
                        
                    });

                },
                // 跳转到消息列表
                gotomessagebox(){
                     window.location.href="messagebox.html";
                }
        },
}
</script>
<style scoped>
/*头部*/

.header {
    background: url(../assets/img/bg.jpg) no-repeat center center;
    width: 100%;
    height: 80px;
    border-bottom: #1dc499 solid 2px;
    box-sizing: border-box;
}

.header img {
    margin-top: 16px;
}

.header .header_con {
    height: 80px;
    width: 1200px;
    margin: 0 auto;
    font-size: 12px;
}

.header ul li {
    width: 75px;
    float: left;
}

.header ul li a {
    color: #1dc499;
    display: block;
    width: 100%;
    line-height: 40px;
    padding-top: 40px;
    text-align: center;
    font-weight: 600
}

.header ul li a:hover {
    cursor: pointer;
}

.header ul li.home a {
    background: url(../assets/img/home.png) no-repeat center 20px;
}

.header ul li.info {
    position: relative;
}

.header ul li.info a {
    background: url(../assets/img/info.png) no-repeat center 20px;
}

.header ul li.info span {
    position: absolute;
    top: 10px;
    right: 20px;
    background: #ef5037;
    color: #fff
}

.header ul li.set {
    position: relative;
}

.header ul li.set a {
    background: url(../assets/img/set.png) no-repeat center 20px;
}

.header ul li.phone a {
    background: url(../assets/img/phone.png) no-repeat center 20px;
}

.header ul li.phone {
    border-left: 1px solid #1dc499;
    border-right: 1px solid #1dc499
}

.header ul li.headimg {
    width: 120px;
}

.header ul li.headimg a,
.header ul li.exit a {
    background: url(../assets/img/headimg.png) no-repeat 10px center;
    line-height: 80px;
    height: 80px;
    padding-top: 0;
    text-align: left;
    padding-left: 40px;
    overflow: hidden;
}

.header ul li.exit a {
    background: url(../assets/img/exit.png) no-repeat 10px center;
}

.save {
    border-top: 1px solid #e5e5e5;
    ;
}

.save button {
    color: #fff;
    padding: 5px 10px;
    margin-left: 10px;
    border-radius: 17px;
    margin-top: 7px;
    border: none;
    width: 80px;
    background: #1DC499;
    display: block;
    margin: 10px auto;
}
</style>
