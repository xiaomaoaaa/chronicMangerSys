<template>
  <div>
    <div class="notedetail">
        <div class="notedetail_head">
          <h3>{{noteitem.planName}}</h3>
        </div>
        <div class="notedetail_con">
            {{noteitem.planContent}}
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
        "planName": "",
        "planContent": "",
       
        }
    }
  },
  components: {

  },
  ready(){
    var that=this;
    var id=Public.getParameter("id");
  	 // 获取公告详情
    $.when(Public.commonajax("coms.commonChronicService","getPatientchronicmanagerplanById","['"+id+"']"))
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
  .notedetail_head{border-bottom: 1px solid #f0f0f0;padding: 0 10px 10px 0}
  .notedetail_con p,.notedetail_con{ font-size: 13px; color: #333333;line-height: 26px; }
  .notedetail_con{padding-top: 10px;}
</style>





