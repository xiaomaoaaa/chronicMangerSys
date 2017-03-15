<template>
    <div id="con">
        <div class="loginhead">
            <div>
                <img :src="bg[0]" width="224" height="50" class="fl">
                <img :src="bg[1]" width="363" height="28" class="fr">
            </div>
        </div>
        <div class="login" id="login">
            <div class="selectrole">
                <h3>请选择一个登录角色</h3>
                <ul>
                    <li :class="{'maindoc':item.roleId=='main_doctor','choicdoc':item.roleId=='chronic_doctor','healthdoc':item.roleId=='health_doctor'}" data-roleID="{{item.roleId}}" @click="getroleID(item)" v-for="item in role_list">
                        <p></p>
                        <p>{{item.roleName}}</p>
                    </li>
                </ul>
            </div>
            <div class="loginbox">
                <div class="inputmain">欢迎登录</div>
                <ul class="inputbox">
                    <li>
                        <input class="logininput user" type="text" placeholder="请输入您的手机号" v-model="user.UserName" />
                    </li>
                    <li>
                        <input class="logininput password" placeholder="密码" v-model="user.PassWord" onfocus="this.type='password'" autocomplete="off" />
                    </li>
                </ul>
                <div class="forgetpassword">
                    <a href="">忘记密码？</a>
                </div>
                <button @click="loginAction" class="btn_login">登&nbsp;&nbsp;录</button>
            </div>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in bgarr"><img :src="item" width="100%" height="100%"> </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="login_foot">版权所有：创业软件股份有限公司 Copyright © 2008-2017 BSOFT</div>
    </div>
</template>
<script>
var md5 = require("md5");
var login_logo = require("assets/img/login_logo.png");
var softname = require("assets/img/softname.png");
import 'assets/lib/swiper/swiper.min.css';
import 'assets/lib/swiper/swiper.jquery.min.js';
import 'assets/reset.css';
import Public from 'assets/public.js'
export default {
    data() {
            return {
                user: {
                    UserName: "",
                    PassWord: ""
                },
                // password1:'',
                // password2:'',
                // isshow:false,
                role_list: [],
                bg: [login_logo, softname],
                bgarr: [Public.IMGVIEW_URL()+274, Public.IMGVIEW_URL()+275, Public.IMGVIEW_URL()+276],

            }
        },
        components: {


        },
        ready() {
            var mySwiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                spaceBetween: 30,
                centeredSlides: true,
                autoplay: 2500,
                autoplayDisableOnInteraction: false
            });


        },
        methods: {
            //登录操作
            loginAction() {

                    var that = this;
                    if (that.user.UserName == "" || that.user.PassWord == "") {
                        // that.loginerror = "账号或密码不能不空";
                        Public.ajaxPrompt("账号或密码不能不空")
                    } else {
                        // 登录前先获取账号的角色
                        $.ajax({
                            // url: "/coms-web/logon/login",
                            url: Public.ROLES_URL(),
                            type: "POST",
                            dataType: "json",
                            data: JSON.stringify({
                                uid: that.user.UserName,
                                pwd: md5(that.user.PassWord),
                                forAccessToken: true
                            }),
                            success: function(res) {
                                if (res.code == 200) {
                                    var data = res.body;
                                    // $.each(data,function(index, el) {
                                    //     if(el.roleId=="patient"){
                                    //        data.splice(index,1);
                                    //     }                                
                                    //   });
                                    that.role_list = data.filter(function(item) {  
                                        return item.roleId != "patient";
                                    });;
                                    // console.log(that.role_list);
                                    if (that.role_list.length == 1) {
                                        $.ajax({
                                            // url: "/coms-web/logon/login",
                                            url: Public.LOGIN_URL(),
                                            type: "POST",
                                            dataType: "json",
                                            data: JSON.stringify({
                                                tenantId: 'coms.xiangtan',
                                                loginName: that.user.UserName,
                                                
                                                roleId: res.body[0].roleId,
                                                pwd: md5(that.user.PassWord),
                                                forAccessToken: true
                                            }),
                                            success: function(res) {
                                                console.log(res);
                                                sessionStorage.setItem('accessToken', res.properties.accessToken);
                                                sessionStorage.setItem('roleId', res.body.roleId);
                                                sessionStorage.setItem('userName', res.body.userName);

                                                // that.loginerror = "登录成功，请稍等...";
                                                window.location.replace("index.html");
                                            },
                                            error: function(err) {
                                                that.loginerror = "请输入正确的账号密码";
                                            }
                                        });
                                    } else {
                                        $(".selectrole").show(); //显示选择角色
                                    }
                                } else {
                                    Public.ajaxPrompt("账号或密码错误，请联系管理员");
                                }

                            },
                            // error: function(err) {
                            //  that.loginerror = "请输入正确的账号密码";
                            // }
                        });

                    }

                },
                //修改密码
                // setpassword(){
                //  var  that=this;
                //  if(this.password1==this.password2){
                //      $.ajax({
                //          url: "/Login/ValidUser",
                //          type: "POST",
                //          dataType: "json",
                //          data: {
                //              username: "+username+",
                //              password: "+password+"
                //          },
                //          success: function(res) {
                //              that.loginerror2 = "修改密码成功";
                //              that.isshow=false;
                //          },
                //          error: function(err) {
                //              that.loginerror2 = "保存失败";


                //          }
                //      })
                //  }else{
                //      this.loginerror2 = "请确认两次输入的密码一致";
                //  }
                // },
                // toggle(){
                //  this.isshow=!this.isshow
                // },
                getroleID(item) {
                    var that = this;
                    // 选择角色好获取token（如果只有一个角色直接登录有多个角色就）
                    $.ajax({
                        // url: "/coms-web/logon/login",
                        url: Public.LOGIN_URL(),
                        type: "POST",
                        dataType: "json",
                        data: JSON.stringify({
                            tenantId: 'coms.xiangtan',
                            loginName: that.user.UserName,
                            // rid:'patient',
                            roleId: item.roleId,
                            pwd: md5(that.user.PassWord),
                            forAccessToken: true
                        }),
                        success: function(res) {
                            console.log(res.properties.accessToken);
                            sessionStorage.setItem('accessToken', res.properties.accessToken);
                            sessionStorage.setItem('userName', res.body.userName);
                            sessionStorage.setItem('roleId', item.roleId);
                            window.location.replace("index.html");
                        },
                        error: function(err) {

                        }
                    });
                }
        },

}
</script>
<style scoped>
/*.swiper-container {
    height: 513px;
    width: 1200px;
    margin: 0 auto;
}*/

div#con {
    width: 100%;
    height: 100%
}

.swiper-container {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    height: 100%;
    text-align: center;
    font-size: 18px;
    background-size: cover;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}

.loginhead {
    width: 100%;
    background: #fff;
    padding: 10px 30px;
    position: fixed;
    top: 0;
    z-index: 999999999999
}

.loginhead>div {
    width: 1200px;
    margin: 0 auto;
}

.loginhead>div img:nth-child(2) {
    margin-top: 11px;
}

.login {
    position: fixed;
    width: 1200px;
    padding: 10px 30px;
    height: 300px;
    z-index: 9999999999999;
    top: 70px;
    margin-left: -600px;
    left: 50%;
}

.loginbox {
    width: 322px;
    height: 334px;
    position: absolute;
    top: 160px;
    right: 50px;
    border-radius: 5px;
    /*  box-shadow: 0 0 8px #ddd;*/
    z-index: 99;
    background: #fff
}

.selectrole {
    width: 300px;
    height: 200px;
    position: absolute;
    top: 210px;
    right: 351px;
    border-radius: 5px 0 0 5px;
    /*  box-shadow: 0 0 8px #ddd;*/
    z-index: 99;
    background: rgba(29, 196, 153, 0.8);
    display: none;
}

.selectrole h3 {
    color: #fff;
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    font-weight: normal;
}

.selectrole ul {
    width: 270px;
    margin: 0 auto;
}

.selectrole ul li {
    padding: 10px 0 10px;
    width: 80px;
    height: 120px;
    float: left;
    color: #fff;
    margin-left: 10px;
    border-radius: 5px;
}

.selectrole ul li p {
    line-height: 30px;
    height: 30px;
    text-align: center;
}

.selectrole ul li.maindoc p:nth-child(1) {
    height: 80px;
    background: url(../../assets/img/maindoc.png) no-repeat center center;
}

.selectrole ul li.choicdoc p:nth-child(1) {
    height: 80px;
    background: url(../../assets/img/choicdoc.png) no-repeat center center;
}

.selectrole ul li.healthdoc p:nth-child(1) {
    height: 80px;
    background: url(../../assets/img/healthdoc.png) no-repeat center center;
}

.selectrole ul li:hover {
    background: rgba(255, 255, 255, 0.7);
    color: #0677eb
}

.inputmain {
    border-radius: 5px 5px 0 0;
    height: 58px;
    line-height: 58px;
    color: #fff;
    background: #1dc499;
    text-align: center;
    font-size: 18px;
}

.btn_login {
    background: #1dc499;
    color: #fff;
    display: block;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
    margin-top: 20px;
    width: 262px;
    margin-left: 30px;
    border: none;
    font-size: 16px;
}

.logininput {
    font-size: 14px;
    height: 36px;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    /*font-weight: bold;*/
    color: #888;
    padding-left: 40px;
    margin-left: 30px;
    width: 222px;
    margin-top: 10px;
}

.user {
    background: url(../../assets/img/userbg.png) no-repeat 10px center;
    box-sizing: auto 80%;
}

.password {
    background: url(../../assets/img/passwordbg.png) no-repeat 10px center;
    box-sizing: auto 80%;
}

.inputbox li {
    margin: 15px 0 0 0;
}

.forgetpassword {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: right;
    padding-right: 30px
}

.forgetpassword a {
    color: #36bf94;
}

.login_foot {
    width: 100%;
    background: #fff;
    text-align: center;
    font-size: 12px;
    color: #b7b6b6;
    height: 60px;
    line-height: 60px;
    position: fixed;
    bottom: 0;
    z-index: 999999999999
}

.swiper-container-horizontal>.swiper-pagination {
    bottom: 100px;
}


/*.setpassword{
    margin-top: 25px;
    color: #888;
}
.setpassword span{
    font-size: 20px;
    vertical-align: middle;
    color: #888;
}
.setpassword span{color: #04BE02}*/
</style>
