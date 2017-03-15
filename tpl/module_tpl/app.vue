<template>
  <div>
    
      <div id='ajaxPrompt' style="display:none">
        <div class='bg_master1'></div>
        <div class='toast toast1'><p class='weui_toast_content'>{{ajaxPromptText}}</p></div>
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
       ajaxPromptText:"提交成功",
       menulisturl:Public.MENU_URL(),
       accesstokenget: localStorage.getItem('accessToken'),
       headimg:headimg, 
    }
  },
  components: {

  },
  ready(){
  	
  },
  methods: {

      
  }
}
</script>

<style scoped>


</style>





