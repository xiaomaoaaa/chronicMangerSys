<template>
  <div>
    <div class="notedetail">
        <div class="notedetail_con" id="notedetail_con">
            <!-- {{noteitem}} -->
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
        // noteitem:""
    }
  },
  components: {

  },
  ready(){
    var that=this;
    var id=Public.getParameter("id");
  	 // 获取公告详情
    $.when(Public.commonajax("coms.memberTypeService","getMemberTypeServiceAgreement","['"+id+"']"))
    .done(function(res){
      $("#notedetail_con").html(res.body)
      // that.noteitem=res.body;
    })
  },
  methods: {

      
  }
}
</script>

<style scoped>
  .notedetail{padding: 15px}
  .notedetail_con p,.notedetail_con{ font-size: 13px; color: #333333;line-height: 26px; }

</style>





