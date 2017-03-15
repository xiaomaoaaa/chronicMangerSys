<template>
  <div>
    <div class="notedetail">
        <div class="notedetail_head">
          <h3>{{noteitem.noticeTitle}}</h3>
          <p><span>公告发布时间：{{noteitem.expireDate.substring(0,10)}}</span><span>发布人：{{noteitem.operateUserName}}</span></p>
        </div>
        <div class="notedetail_con">
            {{noteitem.noticeContent}}
        </div>   
    </div>
  </div>
</template>

<script>

import 'assets/reset.css'
import Public from 'assets/public.js'
export default {
  data() {
    return {
        noteitem:{
        "noticeTitle": "",
        "noticeContent": "",
        "expireDate": "",
        }
    }
  },
  components: {

  },
  ready(){
    var that=this;
    var id=Public.getParameter("id");
  	 // 获取公告详情
    $.when(Public.commonajax("coms.noticeinfoService","getById","['"+id+"']"))
    .done(function(res){
      console.log(res);
      that.noteitem=res.body;
    })
  },
  methods: {

      
  }
}
</script>

<style scoped>
  .notedetail{padding: 15px}
  .notedetail h3{font-size: 14px;color: #333333;font-weight: bold;line-height: 24px}
  .notedetail_head{border-bottom: 1px solid #f0f0f0}
  .notedetail_head p{font-size: 12px;color: #999;line-height: 36px}
  .notedetail_head p span:nth-child(2){margin-left: 10px}
  .notedetail_con p,.notedetail_con{ font-size: 13px; color: #333333;line-height: 26px; }
  .notedetail_con{padding-top: 10px;}
</style>





