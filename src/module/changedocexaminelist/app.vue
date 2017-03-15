<template> 
  <div class="index clearafter">
    <module-head></module-head>
    <div class="content cbafter">
        <div class="w220 fl">
             <menu-list></menu-list>
        </div>
         <div class="w980 fr">
            <div class="h1_tit">
                <h1>主管医生更换审核</h1>
            </div>
            <div class="changdoclist bg">
                   <table class="table table-hover">
                      <thead>
                        <tr>
                          <th colspan="2">患者</th>
                          <th>原主管医生</th>
                          <th>更换医生</th>
                          <th>申请人</th>
                          <th>申请时间</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in changedocexaminelist" track-by="$index">
                          <td><img :src="headimg"></td>
                          <td>
                            <p class="nopoint"><span class="name">{{item.personName}}</span> <button type="button" class="btn btn-default">{{item.chronicName}}</button></p>
                            <p>{{item.idTypeText}}：{{item.idOrNo}}</p>
                          </td>
                          <td>
                           <p>{{item.oldMangerName}}</p>
                           <p>{{item.oldMangerLevelText}}</p>
                           </td>
                          <td>
                             <p>{{item.newMangerName}}</p>
                           <p>{{item.newMangerLevelText}}</p>
                          </td>
                          <td>
                            <p class="onerow">{{item.applyUserName}}</p>
                          </td>
                          <td>
                            <p class="onerow">{{item.applyTime.substring(0,10)}}</p>
                          </td>
                          <td>
                          <p>
                            <button type="button" class="staut btnwait"  v-if="item.applyStatus==0" @click="editexamine(item)">{{item.applyStatusText}}</button>
                            <button type="button" class="staut" :class="{'btnok':item.applyStatus==1,'btnno':item.applyStatus==2}" v-if="item.applyStatus!=0" @click="lookexamine(item)">{{item.applyStatusText}}</button>
                          </p>
                          </td>
                        </tr>
                        <!-- <tr>
                          <td><img :src="headimg"></td>
                          <td>
                            <p><span class="name">陈爱玲</span> <button type="button" class="btn btn-default">糖尿病</button></p>
                            <p>身份证：33089009987123456</p>
                          </td>
                          <td>
                           <p>张庆伟</p>
                           <p>副主任医师</p>
                           </td>
                          <td>
                             <p>丁仍会</p>
                              <p>主任医师</p>
                          </td>
                          <td>
                            <p class="onerow">张庆伟</p>
                          </td>
                          <td>
                            <p class="onerow">2016-11-30</p>
                          </td>
                          <td>
                          <p><button type="button" class="staut btnno">未通过</button></p>
                          </td>
                        </tr>
                        <tr>
                          <td><img :src="headimg"></td>
                          <td>
                            <p><span class="name">陈爱玲</span> <button type="button" class="btn btn-default">糖尿病</button></p>
                            <p>身份证：33089009987123456</p>
                          </td>
                          <td>
                           <p>张庆伟</p>
                           <p>副主任医师</p>
                           </td>
                          <td>
                             <p>丁仍会</p>
                              <p>主任医师</p>
                          </td>
                          <td>
                            <p class="onerow">张庆伟</p>
                          </td>
                          <td>
                            <p class="onerow">2016-11-30</p>
                          </td>
                          <td>
                          <p><button type="button" class="staut btnwait">待审核</button></p>
                          </td>
                        </tr> -->
                      </tbody>
                  </table>
            </div>
        </div>
    </div>
    <!-- 审核 -->
    <div class="modal fade" id="editexamine" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
           <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myModalLabel">
                更换主管医生审核</h4>

              </div>
               <div class="changeinfo cbafter">
                  <div class="changeinfo_head cbafter">
                    <span class="text-left">申请人：{{examineinfo.look.applyUserName}}</span>
                    <span class="text-right">申请时间：{{examineinfo.look.applyTime.substring(0,10)}}</span>
                  </div>
                  <div class="cb changeinfo_con">
                    <div class="content1">
                      <p><span>{{examineinfo.look.personName}}</span>{{examineinfo.look.chronicName}}</p>
                      <p>证件号码：{{examineinfo.look.idOrNo}}</p>

                    </div>
                    <div class="content2">
                      <p><img :src="imgdoc1"><span>{{examineinfo.look.oldMangerName}}</span>{{examineinfo.look.oldMangerLevelText}}</p>
                      <p><img :src="jiantou"><span>更换为</span></p>
                      <p><img :src="imgdoc1"><span>{{examineinfo.look.newMangerName}}</span>{{examineinfo.look.newMangerLevelText}}</p>
                    </div>
                    <div class="content3"><span>更换原因：</span>{{examineinfo.look.changeReason}}</div>

                  </div>
                </div>
            
            <div class="modal-body">
              <form class="form-horizontal" role="form" id="changedocform" v-on:submit.prevent="subexamine">
                <div class="form-group">
                    <label for="" class="col-md-3 control-label" style="padding-top:15px">审核意见：</label>
                    <div class="col-md-8">
                         <div class="radio">
                             <label class="checkbox-inline" >
                              <input type="radio" name="examineinfo" value="1" required v-model="examineinfo.sub.applyStatus">通过
                                        </label>
                              <label class="checkbox-inline" >
                               <input type="radio" name="examineinfo" value="2" required v-model="examineinfo.sub.applyStatus">不通过
                               </label>
                                       
                        </div>      
                  </div>
                </div>
                
                  <div class="form-group" v-if="examineinfo.sub.applyStatus==2">
                    <label for="" class="col-md-3 control-label">不通过理由 :</label>
                       <div class="col-md-8">
                        <textarea class="form-control" rows="3" placeholder="请输入审核不通过的理由" v-model="examineinfo.sub.refuseReason" :required="examineinfo.sub.applyStatus==2"></textarea>
                         
                        </div>   
                  </div>
                  <div class="form-group save">
                      <button type="submit" class="default ok center">确认</button>
                    
                  </div>
              </form> 
             </div>
           
            </div>
          </div>
    </div>
    <!-- 查看 -->
    <div class="modal fade" id="lookexamine" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
           <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myModalLabel">
                审核结果</h4>

              </div>
               <div class="modal-body">
                  <div class="fail cbafter successed">
                    <div class="icon1" v-if="examineinfo.look.applyStatus==1"></div>
                    <div class="icon2" v-if="examineinfo.look.applyStatus==2"></div>
                    <div class="textdes">
                      <p class="success" v-if="examineinfo.look.applyStatus==1">审核已通过！</p>
                      <p class="nosuccess" v-if="examineinfo.look.applyStatus==2">审核未通过！</p>
                    </div>
                    <p v-if="examineinfo.look.applyStatus==2">{{examineinfo.look.refuseReason}}</p>
                  </div>
                   <div class="changeinfo cbafter">
                      <div class="changeinfo_head cbafter">
                        <span class="text-left">申请人：{{examineinfo.look.applyUserName}}</span>
                        <span class="text-right">申请时间：{{examineinfo.look.applyTime.substring(0,10)}}</span>
                      </div>
                      <div class="cb changeinfo_con">
                        <div class="content1">
                          <p><span>{{examineinfo.look.personName}}</span>{{examineinfo.look.chronicName}}</p>
                          <p>证件号码：{{examineinfo.look.idOrNo}}</p>

                        </div>
                      <div class="content2">
                        <p><img :src="imgdoc1"><span>{{examineinfo.look.oldMangerName}}</span>{{examineinfo.look.oldMangerLevelText}}</p>
                        <p><img :src="jiantou">更换为</p>
                        <p><img :src="imgdoc1"><span>{{examineinfo.look.newMangerName}}</span>{{examineinfo.look.newMangerLevelText}}</p>
                    </div>
                    <div class="content3"><span>更换原因：</span>{{examineinfo.look.changeReason}}</div>

                      </div>
                   </div>
              </div>
            </div>
          </div>
    </div>
  </div>
</template>
<script>
    var headimg=require("assets/img/cs2.jpg");
    var imgdoc1=require("assets/img/imgdoc1.jpg");
     var jiantou=require("assets/img/jiantou.png");
    import 'assets/lib/bootstrap-3.3.2/css/bootstrap.min.css'
    import 'assets/lib/bootstrap-3.3.2/js/bootstrap.min.js'
    import 'assets/reset.css'
    import Public from 'assets/public.js'
    import moduleHead from 'components/module-head'
    import menuList from 'components/menu-list'
export default {
  data() {
    return {
       headimg:headimg, 
       imgdoc1:imgdoc1,
       jiantou:jiantou,
       changedocexaminelist:[],
       // currentTime:Public.formatDate(),
       examineinfo:{
          "sub":{
            "applyStatus":"",
            "changeId":"",
            "refuseReason":""
          },
          "look":{
            "applyUserName":"",
            "applyTime":"",
            "personName":"",
            "chronicName":"",
            "idOrNo":"",
            "oldMangerName":"",
            "oldMangerLevelText":"",
            "newMangerName":"",
            "newMangerLevelText":"",
            "changeReason":"",
            "refuseReason":"",
            "applyStatus":""//判断显示成功还是失败用
          }
       }
    }
},
computed:{

},
components: {
    moduleHead,menuList
  },
  ready(){
    var that=this;
     // 获取列表数据
    $.when(Public.commonajax("coms.doctorService","findHealthmanagerchange","[[]]"))
    .done(function(res){
      that.changedocexaminelist=res.body;
     
    })
    
  },
methods: {
   editexamine(item){
      $("#editexamine").modal('show');
      this.examineinfo.sub.changeId=item.changeId;
      this.examineinfo.sub.refuseReason='';
      this.examineinfo.sub.applyStatus='';
      this.examineinfo.look=item;

      
   },
   lookexamine(item){
      $("#lookexamine").modal('show');
      this.examineinfo.look=item;

   },
   subexamine(){
        var that=this;
       $.when(Public.commonajax("coms.doctorService","submitModifyMainDoctor","["+JSON.stringify(this.examineinfo.sub)+"]"))
        .done(function(res){
          if(res.code==200){

            $.each(that.changedocexaminelist,function(index, el) {
              if(el.changeId ==that.examineinfo.sub.changeId){
                  el.applyStatus=res.body.applyStatus;
                  el.applyStatusText=res.body.applyStatusText;
                  el.refuseReason=res.body.refuseReason;
              }
            });
           
            $("#editexamine").modal('hide');

          }
        })
   },

        
  },
events:{
    
  },
watch:{
       
    },
}
$(function(){
 
})
</script>

<style scoped>

/*会员列表*/
.changdoclist{padding:20px}
.changdoclist table th{text-align: center;line-height: 36px;height: 36px; font-weight: normal;}
.changdoclist table tr td{overflow: hidden;}
.changdoclist table tr td p:nth-child(1){margin-top: 10px}
.changdoclist table tr td:nth-child(2) p{ text-align: left;}
.changdoclist table p{line-height: 26px;text-align: center;}
.changdoclist table img{display: block;margin:0 auto 0; border-radius: 50%}
.changdoclist table p button{border:1px solid #1dc499;color: #1dc499; padding:1px 8px;margin-left:10px;}
.changdoclist table p.nopoint button:hover{cursor: default;}
.changdoclist table p button.staut{color: #fff; padding:1px 8px;margin-left:10px;border-radius: 17px; margin-top: 7px;border:none; width: 90px}
.changdoclist table p button.staut.btnok{background:#1DC499}
.changdoclist table p button.staut.btnno{background:#F05038}
.changdoclist table p button.staut.btnwait{ background:#FCBB5D }
.changdoclist table p button.vip{border:1px solid #ff8c68;color: #ff8c68; padding:1px 8px;margin-left:10px;}
.changdoclist table td p span{display: inline-block;margin-left: 10px;height: 20px }
.changdoclist table td .name{font-weight: bold;}
.changdoclist table tr td:nth-child(1) {
    width: 80px
}

.changdoclist table tr td:nth-child(2) {
    width: 160px
}

.changdoclist table tr td:nth-child(3) {
   width: 100px
}
.changdoclist table tr td:nth-child(4) {
    width: 100px
}

.changdoclist table tr td:nth-child(5) {
    width: 170px
}

.changdoclist table tr td:nth-child(6) {
   width: 100px
}
.changdoclist table tr td:nth-child(7) {
   width: 100px
}
/*审核提交*/
.changeinfo{background: #1dc499;padding-bottom: 20px; }
.changeinfo .changeinfo_head{color: #fff; height: 40px; line-height: 40px;margin:0 auto; width:100%;text-align: center;}
.changeinfo .changeinfo_head span{padding-right: 20px}
.changeinfo_con{background: #fff;border-radius: 20px; width: 460px; min-height: 218px;margin:0 auto ;padding: 20px;border: 3px solid #eeeeee}
.changeinfo_con  p{display: inline-block;color: #999999; font-size: 12px;}
.changeinfo_con .content1{padding-left: 20px}
.changeinfo_con .content1 p:nth-child(1){margin:0 10px 10px 0}
.changeinfo_con .content1 p:nth-child(2){width: 200px}
.changeinfo_con .content1 p span{color:#19ab85; font-size: 14px;margin-right: 10px}
.changeinfo_con .content2 {padding-left:18px}
.changeinfo_con .content2 p{ width: 150px;color: #333333;text-align: center;}
.changeinfo_con .content2 p:nth-child(2){ width:70px;color: #999999;position: relative; }
.changeinfo_con .content2 p:nth-child(2) span{ position:absolute;top:30px; top: 20px;
    width: 100%;
    left: 0;}
.changeinfo_con .content2 img{ display: block ; margin:0 auto 10px;} 
.changeinfo_con .content2 p:nth-child(2) img{ display: block ; margin:0 auto 30px;} 
.changeinfo_con .content2 p span{margin-right: 10px}
.changeinfo_con .content3{margin-top: 20px;color: #999;font-size: 12px;padding-left: 20px;width: 400px;word-wrap: break-word}
.changeinfo_con .content3 span{float: left;}
#lookexamine .changeinfo{background: #fff}
#lookexamine .changeinfo .changeinfo_head{color: #333333;}
.fail{width: 350px; margin:20px auto;}
.fail div{display: inline-block;float: left;width: 278px;}
.fail div.icon1{background: url(../../assets/img/c_ok.png) no-repeat center bottom; height: 52px; width: 52px;margin-right: 20px}
.fail div.icon2{background: url(../../assets/img/no.png) no-repeat center bottom; height: 52px; width: 52px;margin-right: 20px;float: left}
/*.fail div:nth-child(2) p{line-height: 26px}*/
.textdes{margin-bottom: 10px;}
.textdes p{word-wrap: break-word;}
.textdes p:nth-child(1){font-size: 20px}
.textdes p.success{color:#19ab85;line-height: 52px}
.textdes p.nosuccess{color:#ef5037;line-height: 52px}
.successed{width: 194px;}
.successed div{display: inline-block;float: left;width: 122px;}
</style>





