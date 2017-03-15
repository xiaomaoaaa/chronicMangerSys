<template> 
  <div class="index clearafter">
    <module-head></module-head>
    <div class="content cbafter">
        <div class="w220 fl">
             <menu-list></menu-list>
        </div>
         <div class="w980 fr">
            <div class="add_selftest bg">
                 <h2>自测指标维护</h2>
                  <ul>
                    <li @click="edit_selftest">舒张压</li>
                    <li>收缩压</li>
                    <li>心率</li>
                    <li>空腹血糖</li>
                    <li>糖化血红蛋白</li>
                  </ul>
                  <button class="btn btn-success" @click="add_selftest"><span class="glyphicon glyphicon-plus"></span>添加自测指标</button>
            </div>

        </div>
    </div>
        <!-- 新增自测指标 -->
        <div class="modal fade bs-example-modal-lg" id="add_selftest" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" > 
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myModalLabel">
                新增自测指标</h4>
              </div>
              <div class="modal-body">
               <form class="form-horizontal" role="form" id="addform">
                  <div class="form-group">
                     <label for="" class="col-md-3 control-label">自测指标分类: </label>
                        <div class="col-md-8">
                          <input class="form-control" type="text" placeholder="请输入指标分类">  
                        </div>           
                  </div>
                  <div class="form-group">
                     <label for="" class="col-md-3 control-label">自测指标名称: </label>
                        <div class="col-md-8">
                          <input class="form-control" type="text" placeholder="请输入指标名称">  
                        </div>           
                  </div>
                  <div class="form-group">
                     <label for="" class="col-md-3 control-label">自测指标单位: </label>
                        <div class="col-md-8">
                          <input class="form-control" type="text" placeholder="请输入指标单位">  
                        </div>           
                  </div>  
                  <div class="form-group">
                    <label for="" class="col-md-3 control-label">指定类型: </label>
                    <div class="col-md-8">
                        <label class="radio-inline">
                          <input type="radio" name="type_val" id="inlineRadio1" value="1" checked=true v-model="addishow"> 定量型
                        </label>
                        <label class="radio-inline">
                          <input type="radio" name="type_val" id="inlineRadio2" value="2" v-model="addishow"> 定性型
                        </label>   
                    </div> 
                  </div>
                  <div class="form-group" v-show="addishow==1">
                    <label for="" class="col-md-3 control-label">正常值范围: </label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" name=""  value="" placeholder="上限：">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" name=""  value="" placeholder="下限：">
                    </div> 
                  </div>
                  <div class="form-group" v-show="addishow==2">
                    <label for="" class="col-md-3 control-label">指标值: </label>
                    <div class="col-md-2">
                        <input type="text" class="form-control" name=""  value="" placeholder="">
                    </div>
                    <div class="col-md-4">
                        <label class="radio-inline">
                          <input type="radio" name="zb_val" id="inlineRadio1" value="option1" checked="true"> 正常值
                        </label>
                        <label class="radio-inline">
                          <input type="radio" name="zb_val" id="inlineRadio2" value="option2"> 异常值
                        </label>
                        <label class="radio-inline">
                          <input type="radio" name="zb_val" id="inlineRadio3" value="option1" > 危急值
                        </label> 
                    </div> 
                    <div class="col-md-2"><span class="btn-add glyphicon glyphicon-plus-sign" ></span><span class="btn-del glyphicon glyphicon-remove-circle" ></span></div>
                  </div>
                  
                  <div class="form-group" v-show="addishow==1">
                    <label for="" class="col-md-3 control-label">危急值范围: </label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" name=""  value="" placeholder="上限：">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" name=""  value="" placeholder="下限：">
                    </div> 
                  </div>
                  <div class="form-group">
                    <label for="" class="col-md-3 control-label">指标测量时间: </label>
                    <div class="col-md-8">
                        <label class="checkbox-inline">
                          <input type="checkbox" id="zbcl_time1" value="1"  checked="true" v-model="addishow2">指定时间
                        </label>
                        <label class="checkbox-inline">
                          <input type="checkbox" id="zbcl_time2" value="2"  checked="true"> 自选时间
                        </label>  
                    </div>
                    
                  </div>
                  <div class="form-group" v-show="addishow2">
                     <label for="" class="col-md-3 control-label"> </label>
                    <div class="col-md-4">
                         <input type="text" class="form-control" name=""  value="" placeholder="早餐前" required>
                    </div> 
                     <div class="col-md-4"><span class="btn-add glyphicon glyphicon-plus-sign" ></span><span class="btn-del glyphicon glyphicon-remove-circle" ></span></div>
                  </div>
                   <div class="form-group">
                     <label for="" class="col-md-3 control-label">危急采取措施: </label>
                        <div class="col-md-6">
                          <input class="form-control" type="text" placeholder="请输入危急采取措施" required>  
                        </div> 
                        <div class="col-md-2"><span class="btn-add glyphicon glyphicon-plus-sign" ></span><span class="btn-del glyphicon glyphicon-remove-circle" ></span></div>          
                  </div>
                 
                  <div class="form-group">
                     <label for="" class="col-md-3 control-label">异常值提示信息: </label>
                        <div class="col-md-8">
                         <textarea class="form-control" rows="3" placeholder="请输入异常值提示信息"></textarea>  
                        </div>           
                  </div>
                  <div class="form-group">
                     <label for="" class="col-md-3 control-label">危急值提示信息: </label>
                        <div class="col-md-8">
                          <textarea class="form-control" rows="3" placeholder="请输入危急值提示信息"></textarea>
                        </div>           
                  </div> 
               </form>
              </div>
              <div class="modal-footer">
                <div class="col-md-7"> <button type="button" class="btn btn-success btn_save">保存</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 修改自测指标 edit_selftest-->
        <div class="modal fade bs-example-modal-lg" id="edit_selftest" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" > 
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myModalLabel">
                修改自测指标</h4>
              </div>
              <div class="modal-body">
               <form class="form-horizontal" role="form" id="editform">
                  <div class="form-group">
                     <label for="" class="col-md-3 control-label">自测指标分类: </label>
                        <div class="col-md-8">
                          <input class="form-control" type="text" placeholder="请输入指标分类">  
                        </div>           
                  </div>
                  <div class="form-group">
                     <label for="" class="col-md-3 control-label">自测指标名称: </label>
                        <div class="col-md-8">
                          <input class="form-control" type="text" placeholder="请输入指标名称">  
                        </div>           
                  </div>
                  <div class="form-group">
                     <label for="" class="col-md-3 control-label">自测指标单位: </label>
                        <div class="col-md-8">
                          <input class="form-control" type="text" placeholder="请输入指标单位" value="">  
                        </div>           
                  </div>  
                  <div class="form-group">
                    <label for="" class="col-md-3 control-label">指定类型: </label>
                    <div class="col-md-8">
                        <label class="radio-inline">
                          <input type="radio" name="type_val" id="inlineRadio1" value="1" checked=true v-model="editishow"> 定量型
                        </label>
                        <label class="radio-inline">
                          <input type="radio" name="type_val" id="inlineRadio2" value="2" v-model="editishow"> 定性型
                        </label>   
                    </div> 
                  </div>
                  <div class="form-group" v-show="editishow==1">
                    <label for="" class="col-md-3 control-label">正常值范围: </label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" name=""  value="" placeholder="上限：">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" name=""  value="" placeholder="下限：">
                    </div> 
                  </div>
                  <div class="form-group" v-show="editishow==2">
                    <label for="" class="col-md-3 control-label">指标值: </label>
                    <div class="col-md-2">
                        <input type="text" class="form-control" name=""  value="" placeholder="">
                    </div>
                    <div class="col-md-4">
                        <label class="radio-inline">
                          <input type="radio" name="zb_val" id="inlineRadio1" value="option1" checked="true"> 正常值
                        </label>
                        <label class="radio-inline">
                          <input type="radio" name="zb_val" id="inlineRadio2" value="option2"> 异常值
                        </label>
                        <label class="radio-inline">
                          <input type="radio" name="zb_val" id="inlineRadio3" value="option1" > 危急值
                        </label> 
                    </div> 
                    <div class="col-md-2"><span class="btn-add glyphicon glyphicon-plus-sign" ></span><span class="btn-del glyphicon glyphicon-remove-circle" ></span></div>
                  </div>
                  
                  <div class="form-group" v-show="editishow==1">
                    <label for="" class="col-md-3 control-label">危急值范围: </label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" name=""  value="" placeholder="上限：">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" name=""  value="" placeholder="下限：">
                    </div> 
                  </div>
                  <div class="form-group">
                    <label for="" class="col-md-3 control-label">指标测量时间: </label>
                    <div class="col-md-8">
                        <label class="checkbox-inline">
                          <input type="checkbox" id="zbcl_time1" value="1"  checked="true" v-model="editishow2">指定时间
                        </label>
                        <label class="checkbox-inline">
                          <input type="checkbox" id="zbcl_time2" value="2"  checked="true"> 自选时间
                        </label>  
                    </div>
                    
                  </div>
                  <div class="form-group" v-show="editishow2">
                     <label for="" class="col-md-3 control-label"> </label>
                    <div class="col-md-4">
                         <input type="text" class="form-control" name=""  value="" placeholder="早餐前" required>
                    </div> 
                     <div class="col-md-4"><span class="btn-add glyphicon glyphicon-plus-sign" ></span><span class="btn-del glyphicon glyphicon-remove-circle" ></span></div>
                  </div>
                   <div class="form-group">
                     <label for="" class="col-md-3 control-label">危急采取措施: </label>
                        <div class="col-md-6">
                          <input class="form-control" type="text" placeholder="请输入危急采取措施" required>  
                        </div> 
                        <div class="col-md-2"><span class="btn-add glyphicon glyphicon-plus-sign" ></span><span class="btn-del glyphicon glyphicon-remove-circle" ></span></div>          
                  </div>
                 
                  <div class="form-group">
                     <label for="" class="col-md-3 control-label">异常值提示信息: </label>
                        <div class="col-md-8">
                         <textarea class="form-control" rows="3" placeholder="请输入异常值提示信息"></textarea>  
                        </div>           
                  </div>
                  <div class="form-group">
                     <label for="" class="col-md-3 control-label">危急值提示信息: </label>
                        <div class="col-md-8">
                          <textarea class="form-control" rows="3" placeholder="请输入危急值提示信息"></textarea>
                        </div>           
                  </div> 
               </form>
              </div>
              <div class="modal-footer">
                <div class="col-md-7"> <button type="button" class="btn btn-success btn_save">保存</button>
                </div>
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
       
        addishow:"",
        addishow2:true,
        editishow:"",
        editishow2:true,
            }
    },
   components: {
    moduleHead,menuList

  },
  ready(){
  	
  },
  methods: {   
    add_selftest () {
      $("#add_selftest").modal("show")
       document.getElementById("editform").reset(); 
     } ,
    edit_selftest () {
      $("#edit_selftest").modal("show");
      document.getElementById("editform").reset(); 
     } 
     
  },
  events:{
    
  }
}
$(function(){
  $(".form-group").on('click', '.btn-add', function(event) {
        var $container=$(this).closest(".form-group");
        $container.clone(true).insertAfter($container);
      });
  $(".form-group").on('click', '.btn-del', function(event) {
        var $container=$(this).closest(".form-group");
        $container.remove();
      }); 
})
     
</script>

<style scoped>
.add_selftest ul{padding:40px 80px;}
.add_selftest h2{background: #5cb85c;color: #fff;border-radius:5px 5px 0 0;text-align: center; line-height: 40px;height: 40px;font-size: 16px}

.add_selftest li{line-height:40px;height: 40px;background: url(../../assets/img/next.png) no-repeat 98% center;background-size: auto 50%;border-bottom: 1px solid #ccc;padding: 0 20px }
.add_selftest button{margin:0 auto;display: block;}
.btn-add{color: #4cae4c; display: inline-block;font-size: 20px;padding: 5px 10px 0}
.btn-del{color: #d43f3a;display: inline-block;font-size: 20px;padding: 5px 10px 0}
</style>





