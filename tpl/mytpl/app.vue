<template> 
  <div class="index clearafter">
    <module-head></module-head>
    <div class="content cbafter">
        <div class="w220 fl">
             <menu-list></menu-list>
        </div>
         <div class="w980 fr">
            <div class="h1_tit">
                <h1>会员入会</h1>
                <div class="step step1"></div>
            </div>
            <div class="service_add memberadd">
                <div class="row">
                    <form class="form-horizontal" role="form">
                        <div class="onestep">
                            <h3>会员基本信息</h3>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">国籍: </label>
                                <div class="col-md-6">
                                    <select class="form-control">
                                        <option>中国</option>
                                        <option>港澳台</option>
                                    </select>
                                </div>
                                <div class="col-md-1 start">*</div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">证件类型:</label>
                                <div class="col-md-6">
                                    <select class="form-control">
                                        <option>身份证</option>
                                        <option>军人证</option>
                                    </select>
                                </div>
                                <div class="col-md-1 start">*</div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">证件号码 :</label>
                                <div class="col-md-6">
                                    <input type="input" class="form-control" id="" placeholder="请输入服务序号">
                                </div>
                                <div class="col-md-1 start">*</div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">姓 名:</label>
                                <div class="col-md-6">
                                    <input type="input" class="form-control" id="" placeholder="请输入服务名称">
                                </div>
                                <div class="col-md-1 start">*</div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">性 别:</label>
                                <div class="col-md-6">
                                    <div class="radio">
                                        <label class="checkbox-inline">
                                            <input type="radio" name="optionsRadios" id="" value="option1">男
                                        </label>
                                        <label class="checkbox-inline">
                                            <input type="radio" name="optionsRadios" id="" value="option1"> 女
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-1 start">*</div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">出生日期 :</label>
                                <div class="col-md-6">
                                    <input type="input" class="form-control" id="" placeholder="请输入服务序号">
                                </div>
                                <div class="col-md-1 start">*</div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">手机号码 :</label>
                                <div class="col-md-6">
                                    <input type="input" class="form-control" id="" placeholder="请输入服务序号">
                                </div>
                                <div class="col-md-1 start">*</div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">健康卡号 :</label>
                                <div class="col-md-6">
                                    <input type="input" class="form-control" id="" placeholder="请输入服务序号">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="" class="col-md-3 control-label">家庭住址 :</label>
                                <div class="col-md-6">
                                    <input type="input" class="form-control" id="" placeholder="请输入服务序号">
                                </div>
                            </div>
                            <div class="form-group">
                                 <div class="col-md-3 col-md-offset-5">
                                   <button type="button" class="btn btn-default">下一步</button>
                                 </div>
                            </div>
                        </div>
                        <div class="twostep">
                            <h3>会员健康信息</h3>
                            <div class="twostep_1">
                                 <h4>健康信息</h4>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">慢病种类: </label>
                                    <div class="col-md-6">
                                        <select class="form-control">
                                            <option>高血压</option>
                                            <option>糖尿病</option>
                                        </select>
                                    </div>
                                    <div class="col-md-1 start">*</div>
                                </div>
                            </div>
                            <div class="twostep_2">
                                <h4>监测目标</h4>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">收缩压:</label>
                                    <div class="col-md-2">
                                        <input type="input" class="form-control" id="" placeholder="上限">
                                    </div>
                                     <div class="col-md-1">
                                       mmHg
                                    </div>
                                     <div class="col-md-2">
                                        <input type="input" class="form-control" id="" placeholder="上限">
                                    </div>
                                     <div class="col-md-1">
                                       mmHg
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">舒张压:</label>
                                    <div class="col-md-2">
                                        <input type="input" class="form-control" id="" placeholder="上限">
                                    </div>
                                     <div class="col-md-1">
                                       mmHg
                                    </div>
                                     <div class="col-md-2">
                                        <input type="input" class="form-control" id="" placeholder="上限">
                                    </div>
                                     <div class="col-md-1">
                                       mmHg
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">心率:</label>
                                    <div class="col-md-2">
                                        <input type="input" class="form-control" id="" placeholder="上限">
                                    </div>
                                     <div class="col-md-1">
                                       次/分
                                    </div>
                                     <div class="col-md-2">
                                        <input type="input" class="form-control" id="" placeholder="上限">
                                    </div>
                                     <div class="col-md-1">
                                       次/分
                                    </div>
                                </div>
                            </div>
                            <div class="twostep_3">
                                <h4>生活习惯</h4>
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">健康项目:</label>
                                    <div class="col-md-6">
                                        <p>饮食习惯</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label">项目指标:</label>
                                    <div class="col-md-9">
                                        <div class="radio">
                                            <label class="radio-inline">
                                                <input type="radio" name="optionsRadios" id="" value="option1">荤素均衡 
                                            </label>
                                             <label class="radio-inline">
                                                <input type="radio" name="optionsRadios" id="" value="option1">荤食为主
                                            </label>
                                             <label class="radio-inline">
                                                <input type="radio" name="optionsRadios" id="" value="option1">素食为主 
                                            </label>
                                             <label class="radio-inline">
                                                <input type="radio" name="optionsRadios" id="" value="option1">嗜盐
                                            </label>
                                             <label class="radio-inline">
                                                <input type="radio" name="optionsRadios" id="" value="option1">嗜糖
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" name="optionsRadios" id="" value="option1">嗜油
                                            </label>
                                        </div>

                                     </div>
                                </div> 
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">健康项目:</label>
                                    <div class="col-md-6">
                                        <p>吸烟情况</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label">项目指标:</label>
                                    <div class="col-md-6">
                                        <div class="radio">
                                             <label class="radio-inline">
                                                <input type="radio" name="optionsRadios" id="" value="option1">从不
                                            </label>
                                             <label class="radio-inline">
                                                <input type="radio" name="optionsRadios" id="" value="option1">偶尔 
                                            </label>
                                             <label class="radio-inline">
                                                <input type="radio" name="optionsRadios" id="" value="option1">经常
                                            </label>
                                            
                                        </div>

                                     </div>
                                </div> 
                                <div class="form-group">
                                    <label for="" class="col-md-3 control-label">健康项目:</label>
                                    <div class="col-md-6">
                                        <p>饮酒情况</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label">项目指标:</label>
                                    <div class="col-md-6">
                                        <div class="radio">
                                            <label class="radio-inline">
                                                <input type="radio" name="optionsRadios" id="" value="option1">从不
                                            </label>
                                             <label class="radio-inline">
                                                <input type="radio" name="optionsRadios" id="" value="option1">偶尔 
                                            </label>
                                             <label class="radio-inline">
                                                <input type="radio" name="optionsRadios" id="" value="option1">经常
                                            </label>
                                        </div>

                                     </div>
                                </div>
                            </div>

                            <div class="form-group">
                                 <div class="col-md-3 col-md-offset-5">
                                   <button type="button" class="btn btn-default">下一步</button>
                                 </div>
                            </div> 
                        </div>
                        <div class="threestep">
                             <h3>入会成功</h3>
                             <div class="threestep_con">
                               <h4>恭喜您，入会成功！</h4>
                               <div class="threestep_con_info">
                                 <div class="fl">
                                   <p><span>患者姓名：</span>张楚生   ｜   男    ｜  48岁</p>
                                   <p><span>身份证号：</span>336201198806210014</p>
                                   <p><span>健康卡号：</span>9865336524001</p>
                                   <p><span>手机号码：</span>15865246599</p>
                                   <p><span>主管医生：</span>张庆龄</p>

                                 </div>
                                 <div class="fr">
                                    <p>登录账号使用证件号码，</p>
                                    <p>（例如：身份证号；）</p>
                                    <p>初始密码为：<span>123456</span></p>
                                 </div>
                               </div>
                             </div>
                              <div class="form-group">
                                 <div class="col-md-3 col-md-offset-5">
                                   <button type="button" class="btn btn-default">完  成</button>
                                 </div>
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
    import Public from 'assets/public.js'
    import moduleHead from 'components/module-head'
    import menuList from 'components/menu-list'
export default {
  data() {
    return {

      
    }
  },
   components: {
    moduleHead,menuList
    
  },
  ready(){
    
  },
  methods: {     
  },
  events:{
   
  },
  watch: {
       
      }
}
</script>

<style scoped>
/*会员入会*/
.h1_tit{margin-bottom: 20px}
.service,.service_add{height: auto; -webkit-box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    -moz-box-shadow: 0 0 10px rgba(230, 230, 230, .5);box-shadow: 0 0 10px rgba(230, 230, 230, .5);
    background: #fff;border-radius: 10px;padding: 0 0 40px}

.service_add .form-horizontal{padding-top: 20px}
.service_add .form-horizontal h3{font-size: 16px;line-height: 30px; height: 30px;margin:0 auto 20px;color: #1fc49a;width: 90%;border-bottom: 2px solid #e5e5e5}
.memberadd .form-horizontal {line-height: 30px;}
.start{font-size: 22px;color: red}
.memberadd .form-horizontal input[type="radio"]{height: 20px; width: 20px;background: url(../../assets/img/radio.png) no-repeat center center;}
.memberadd .form-horizontal input[type="radio"]:checked{background: url(../../assets/img/radiochecked.png) no-repeat center center;}
.memberadd .twostep p{padding-top:7px;}
.form-horizontal .radio, .form-horizontal .radio-inline{padding-top:2px;}
.h1_tit .step{height: 42px;line-height: 42px; float: right;width: 422px;background: #fff}
.h1_tit .step1{background: url(../../assets/img/step1.png) no-repeat center center;}
.h1_tit .step2{background: url(../../assets/img/step2.png) no-repeat center center;}
.h1_tit .step3{background: url(../../assets/img/step3.png) no-repeat center center;}
.twostep_1,.twostep_2,.twostep_3{border:1px solid #d3d3d3; width: 760px;margin:20px auto 0;padding-top: 20px;position: relative;}
.twostep_3{margin-bottom: 20px}
.twostep h4{background: #fff; width: 80px; text-align:center;padding: 0 10px;color: #bbbbbb;position: absolute;font-size: 12px;height: 30px;line-height: 30px;top:-15px;left:50px;}
.threestep{width: 760px;margin:20px auto 0;}
.threestep_con h4{width: 350px;margin:20px auto;background: url(../../assets/img/c_ok.png) no-repeat left center;padding-left: 60px;
  color: #19ab85;text-align:center ;height: 60px;line-height: 60px; font-size: 28px}
.threestep_con_info {border:1px dashed #d2d2d2;height: 250px; width: 620px;margin:0 auto 20px;border-radius: 5px;
  background:#f7f7f8; padding:30px}
.threestep_con_info >div{padding:20px 10px 10px}
.threestep_con_info >div.fl{border-right:#cccccc 1px solid; width: 330px}
.threestep_con_info >div.fl span{color:#999999}
.threestep_con_info >div.fr span{color:#19ab85; font-weight: bold }

</style>





