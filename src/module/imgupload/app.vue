<template>
  <div>
     <img-upload-btn ></img-upload-btn>      
  </div>
</template>

<script>
    import 'assets/lib/bootstrap-3.3.2/css/bootstrap.min.css'
    import 'assets/lib/bootstrap-3.3.2/js/bootstrap.min.js'
    import 'assets/reset.css'
    import Public from 'assets/public.js'
    import ImgUploadBtn from 'components/ImgUploadBtn.vue'

export default {
  data() {
    return {
      
      // filename:"",
      // formid:"",
       
    }
  },
  components: {
    ImgUploadBtn
  },
  ready(){
  	
  },
  methods: {

   
  }
}

  
</script>

<style scoped>


</style>





