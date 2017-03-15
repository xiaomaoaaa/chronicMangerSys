<template>
    <div class="index clearafter">
        <module-head></module-head>
        <div class="content cbafter">
            <div class="w220 fl">
                <menu-list></menu-list>
            </div>
            <div class="w980 fr">
                <div class="h1_tit">
                    <h1>我的消息箱</h1>
                </div>
                <div class="message-maintain">
                    <div class="message-type">
                        <ul>
                            <li :class="{active:item.active}" v-for="item in notification" @click="getmessagelist(item)">{{item.businessName}}<span class="badge" v-if="item.count>0">{{item.count}}</span></li>
                        </ul>
                    </div>
                    <div class="messagelist fr">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th colspan="3">
                                        <p>
                                            <input type="checkbox" name="allselected"  v-model="allselectedval" />全选</p>
                                        <p @click="deleselected" class="deleselected"><span class="glyphicon glyphicon-trash"></span>删除</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in messagelist">
                                    <td>
                                        <input type="checkbox" name="selected" @click="selectedmessage" v-model="item.selected" />
                                    </td>
                                    <td>
                                        <p>{{item.title}}</p>
                                        <p>{{item.content}}</p>
                                    </td>
                                    <td>{{item.sendTime}}</td>
                                </tr>
                                <tr v-show="param.businessType!=''">
                                    <td colspan="3">
                                        <div class="pull-left">
                                            <button class="btn btn-default" @click="refresh">刷新</button>
                                        </div>
                                        <div class="pull-right">
                                            <!-- 分页 -->
                                            <boot-page v-ref:page :async="true" :lens="lenArr" :page-len="pageLen" :headersparam="headersparam" :param="param"></boot-page>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
import bootPage from 'components/BootPage.vue'
export default {
    data() {
            return {
                // 分页组件开始
                lenArr: [10, 20, 50], // 每页显示长度设置
                pageLen: 5, // 可显示的分页数
                headersparam: {
                    "X-Service-Id": "base.notificationService",
                    "X-Service-Method": "findNotificationsFromPc",
                },
                param: {
                    businessType: ""
                },
                // 分页组件结束
                notification: [], //信息类别列表
                messagelist: [], //信息列表
                allselectedval: false,

            }
        },
        computed: {

        },
        components: {
            moduleHead, menuList, bootPage

        },
        ready() {
            var that = this;
            // 获取信息类别
            $.when(Public.commonajax("base.notificationService", "queryNotificationCountFromPc", "[[]]"))
                .done(function(res) {
                    if (res.code == 200) {
                        $.each(res.body, function(index, el) {
                            el.active = false;
                        });
                        that.notification = res.body
                    }
                });

        },
        methods: {
            // 消息列表页面刷新按钮
            refresh() {
                    this.$refs.page.refresh()
                },
                // 点击分类获取对应的消息列表
                getmessagelist(item) {
                    item.count = 0;
                    this.param.businessType = item.businessType;
                    $.each(this.notification, function(index, el) {
                        el.active = false;
                    });
                    item.active = true;
                    this.refresh()

                },
                //全选当前页面消息
                // allselected() {
                //     if (this.allselectedval) {
                //         $.each(this.messagelist, function(index, el) {
                //          el.selected =true
                //         });
                //     }else{
                //         $.each(this.messagelist, function(index, el) {
                //          el.selected =false
                //         });
                //     }
                    
                // },
                //点击选择让单个消息
                selectedmessage(item) {
                    item.selected = !item.selected
                },
                // 删除选中的
                deleselected() {
                    var that = this
                    var temarr = this.messagelist.filter(function(val) {
                        return val.selected == true;
                    });
                    var delearr = [];
                    $.each(temarr, function(index, el) {
                        delearr.push(el.notificationId)
                    });
                    if(delearr.length>0){
                        $.when(Public.commonajax("base.notificationService", "deleteNotification", "[" + JSON.stringify(delearr) + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("删除成功");
                                that.refresh()
                            }
                        });
                    }else{
                        Public.ajaxPrompt("请至少选一个");
                    }
                    

                }
        },
        events: {
            // 分页列表数据
            'data' (data) {
                if (this.allselectedval) {
                      $.each(data, function(index, el) {
                        el.sendTime = el.sendTime.substr(0, 11);
                        el.selected = true;
                    });
                   
                } else {
                    $.each(data, function(index, el) {
                        el.sendTime = el.sendTime.substr(0, 11);
                        el.selected = false;
                    });
                }
                this.messagelist = data;
            },
            // 分页栏上的刷新按钮
            'refresh' () {
                this.refresh()
            },
        },
        watch: {
            'allselectedval'(val,oldval){
                if (val) {
                        $.each(this.messagelist, function(index, el) {
                         el.selected =true
                        });
                    }else{
                        $.each(this.messagelist, function(index, el) {
                         el.selected =false
                        });
                    }
            }
        }
}
</script>
<style scoped>
.message-maintain {
    width: 950px;
    min-height: 700px;
    height: auto!important;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    background-color: #fafafa;
}

.message-maintain .message-type,
.message-info {
    float: left;
    min-height: 698px;
    position: relative;
}

.message-maintain .message-type {
    background: #f4f4f4 url(../../assets/img/messagebg.jpg) no-repeat left bottom;
    width: 230px;
    border-radius: 10px 0 0 10px;
    float: left
}

.message-type ul {
    height: auto!important;
}

.message-type ul li {
    margin: 15px auto;
    width: 210px;
    height: 59px;
    line-height: 59px;
    text-align: center;
    border-radius: 10px;
}

.message-type ul li:hover {
    cursor: pointer;
    background: #eee
}

.message-type ul li.active {
    cursor: pointer;
    background: #4796F2;
    color: #fff
}

.messagelist {
    padding: 20px;
    width: 700px;
}

.messagelist .table>thead>tr>th {
    border: none
}

.messagelist table thead {
    border-bottom: #1dc499 2px solid;
}

.messagelist table th {
    line-height: 36px;
    height: 36px;
    font-weight: normal;
}

.messagelist table th p {
    float: left;
    width: 100px;
    font-size: 16px;
}

.messagelist table th p input {
    margin-right: 5px
}

.messagelist table th span {
    margin: 0 5px 0 15px;
}

.messagelist table tr {
    margin-top: 10px
}

.messagelist table thead tr {
    border: none;
}

.messagelist table td {
    line-height: 40px;
    color: #898989;
}

.messagelist table td p {
    line-height: 20px;
}

.messagelist table tr td:nth-child(1) {
    width: 100px
}

.messagelist table tr td:nth-child(2) {
    width: 500px
}

.messagelist table tr td:nth-child(3) {
    width: 100px
}

input[type=checkbox] {
    width: 20px;
    height: 20px
}

.deleselected:hover {
    cursor: pointer;
}

.message-type li span {
    margin-left: 10px;
    background: #ef5037;
}
</style>
