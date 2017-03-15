<template>
    <form class="form-horizontal" role="form" id="imgupload" v-on:submit.prevent>
        <input type="hidden" value="{{accessToken}}" name="accessToken">
        <div class="fileInput">
            <input type="file" name="file" class="upfile" />
            <input class="upFileBtn" type="button" value="上传图片" />
            <img :src="imgurl" :class="{none:imgurl==''}">
            <!-- <div :class="{none:imgurl==''}">×</div> -->
        </div>
       <!--  <button class="btn btn-primary" @click="saveimg">上传图片</button> -->
    </form>
</template>
<script>
import Public from 'assets/public.js'
module.exports = {
    data() {
            return {
                accessToken: Public.getsessionStorage("accessToken"),
            }
        },
        ready() {
            var that = this;
            // console.log(this.imgurl);
            // if(this.imgurl!=""){
            //     $(".upfile").siblings('img').show()
            //             .siblings('div').show();
            // }
            $(".upFileBtn").on('click', function(event) {
                event.preventDefault();
                $(this).prev(".upfile").click();
            });
            $(".fileInput").on('click', "div", function(event) {
                event.preventDefault();
                that.imgurl = "";
                $(this).hide().siblings('img').attr({
                        src: ''
                    }).hide()
                    .siblings('.upfile').val("");
            });
            $(".upfile").on('change', function(event) {
                event.preventDefault();
                var $that = $(this)
                var file = $that[0].files[0];
                if (!/image\/\w+/.test(file.type)) {
                    alert("请确保文件为图像类型");
                    return false;
                };
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function() {
                    $that.siblings('img').attr({
                            src: this.result
                        }).show()
                        .siblings('div').show();
                    $.when(Public.formajax(Public.IMGUPLOAD_URL(), "#imgupload"))
                        .done(function(data) {
                            Public.ajaxPrompt("上传成功")
                            var data = JSON.parse(data);
                            that.imgurl = Public.IMGVIEW_URL() + data.id;
                            that.$dispatch('serviceIconId', data.id)
                        })

                }
            });
        },
        props: {
            imgurl: {
                type: String,
                default: ""
            },
            // "formid": {
            //     type: String,
            //     default: "imgupload"
            // },
        },
        methods: {
            // saveimg() {
            //     var that = this;
            //     $.when(Public.formajax(Public.IMGUPLOAD_URL(), "#imgupload"))
            //         .done(function(data) {
            //             Public.ajaxPrompt("上传成功")
            //             var data = JSON.parse(data);
            //             that.imgurl = Public.IMGVIEW_URL() + data.id;
            //             that.$dispatch('serviceIconId', data.id)
            //         })
            // }
        },

}
</script>
<style scoped>
/*头部*/

.fileInput {
    width: 120px;
    height: 50px;
    background: url(../assets/img/addimg.jpg) no-repeat left center;
    position: relative;
    float: left;
    background-size: auto 100%;
    margin: 0 10px;
}

.fileInput img {
    /*position: absolute;
    top: 0;
    left: 0;*/
    /*display: none;*/
    /*z-index: 1;*/
    width: 50px;
    height: 50px;
    float: right;
    margin-left: 20px
}


/*.fileInput div {
    position: absolute;
    top: -8px;
    right: -8px;
   display: none;
    background: #32BE81;
    width: 16px;
    height: 16px;
    z-index: 2;
    border-radius: 8px;
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 14px
}*/

.upfile {
    display: none
}

.upFileBtn {
    width: 50px;
    height: 50px;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
    float: left;
}

.fileInput img {
    background: #fff;
}

#imgupload button {
    margin-top: 8px;
}
</style>
