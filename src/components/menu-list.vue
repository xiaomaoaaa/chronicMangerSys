<template>
    <ul class="menu">
        <li v-for="item in menu_lists" :class="{left_arrow:item.child!=undefined,active:item.active}"><a  @click="menu_toggle" href="{{item.linkedUrl+'?moduleId='+item.moduleId}}" :style="{background: 'url('+imgviewurl+item.menuIconId+')no-repeat left center',}">{{item.menuName}}</a>
            <ul>
                <li v-for="menu_sub in item.child" :class="{men_active:menu_sub.active}"><a href="{{menu_sub.linkedUrl+'?moduleId='+menu_sub.moduleId}}">{{menu_sub.menuName}}</a></li>
            </ul>
        </li>
    </ul>
</template>
<script>
import Public from 'assets/public.js'
export default {
    data() {
            return {
                menu_lists: [],
                imgviewurl: Public.IMGVIEW_URL(),
            }
        },
        components: {

        },
        ready() {
            var that = this;
            // console.log(that.accesstokenget);
            $.when(Public.commonajax("coms.menuService", "findPcMenu", "[]"))
                .done(function(res) {
                    if (res.code == 200) {
                        $.each(res.body, function(index, el) {
                            //为了显示当前页面的菜单
                            if (el.child) {
                                $.each(el.child, function(index2, el2) {
                                    el2.active = false;
                                    if (Public.getParameter("moduleId") == el2.moduleId) {
                                        el2.active = true;
                                        el.active = true;
                                    }
                                });
                            }

                        })

                        that.menu_lists = res.body;
                         // console.log(that.menu_lists)
                    }
                })
                // $.ajax({
                //            // url: "/coms-web/logon/login",
                //            url: that.menulisturl,
                //            type: "POST",
                //            headers:{
                //                "X-Access-Token":that.accesstokenget,
                //                "X-Service-Id":"coms.menuService",
                //                "X-Service-Method": "findPcMenu",
                //                "Content-Type":"application/json"
                //            },
                //            dataType: "JSON",
                //            data: "[]",
                //            success: function(res) {
                //                // console.log(res);
                //                if(res.code==200){
                //                    that.menu_lists=res.body
                //                } 
                //            },
                //            error: function(err) {
                //                that.loginerror = "fail";
                //            }
                //    });
        },
        methods: {
            menu_toggle(event) {
                var childli_len = $(event.target).next("ul").find("li").length;
                // console.log($(event.target).html());
                if (childli_len) {
                    event.preventDefault();
                    if($(event.target).parent("li").is(".active")){
                       $(event.target).parent("li").removeClass('active');
                    }else{
                        
                         $(event.target).parent("li").addClass('active').siblings('li').removeClass('active');
                    }

                }


            },

        },
        props: {
            // menulisturl: {
            //        type: String,
            //        default: ""
            //    },
            // accesstokenget: {
            //         type: String,
            //         default: ""
            //     },
        }
}
</script>
<style scoped>
.menu {
    width: 220px;
}

.menu>li {
    padding: 0 26px;
    width: 220px;
    border-bottom: 1px solid #4ad0ad;
    box-sizing: border-box;
}

.menu>li.left_arrow {
    background: url(../assets/img/left_triangle.png) no-repeat 200px 33px;
}

.menu>li>a {
    display: block;
    width: 100%;
    height: 70px;
    line-height: 70px;
    color: #fff;
    padding-left: 45px;
    font-size: 16px;
}


/*.menu>li.doctormanger>a{background: url(../assets/img/doctormanger.png) no-repeat left center;}
.menu>li.docservice>a{background: url(../assets/img/docservice.png) no-repeat left center;}
.menu>li.patientservice>a{background: url(../assets/img/patientservice.png) no-repeat left center;}
.menu>li.chart>a{background: url(../assets/img/chart.png) no-repeat left center;}
.menu>li.adminmanger>a{background: url(../assets/img/adminmanger.png) no-repeat left center;}*/

.menu>li>ul {
    display: none;
    padding: 0 0 20px
}

.menu>li.active>ul {
    display: block;
}

.menu>li.active {
    background: #19ab85 url(../assets/img/down_triangle.png) no-repeat 200px 33px;
}

.menu>li.active li {
    padding: 0 0 0 40px;
    width: 177px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
}

.menu>li.active li.men_active {
    background: url(../assets/img/men_active.png) no-repeat left center;
}

.menu>li.active li:hover {
    text-decoration: underline;
    /*background: url(../assets/img/men_active.png) no-repeat left center;*/
}

.menu>li.active li a {
    color: #fff
}

.menu>li.active li.men_active a {
    color: #eec81f
}
</style>
