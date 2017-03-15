<template>
    <div class="modal fade" id="myModal-find" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form v-on:submit.prevent="getmemberlist" id="getmemberlist">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">查找患者</h4>
                    </div>
                    <div class="modal-body cbafter">
                        <P>
                            <label for="">患者姓名 :</label>
                            <input id="guest-name" type="text" placeholder="请选择客户" v-model="searchformdata.name" />
                        </P>
                        <P>
                            <label for="">证件号码 :</label>
                            <input id="guest-id" type="text" placeholder="请输入身份证号" v-model="searchformdata.idcard" />
                        </P>
                        <P>
                            <label for="">手机号码 :</label>
                            <input id="guest-tel" type="text" placeholder="请输入手机号" v-model="searchformdata.mobile" />
                        </P>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="default blue">确认</button>
                    </div>
                </form>
                <div class="find-message">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>姓名</th>
                                <th>年龄</th>
                                <th>性别</th>
                                <th>电话</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in PersonUserInfo" @click="selectPersonUser(item)">
                                <td>{{item.person.personName}}</td>
                                <td>{{item.person.dob}}</td>
                                <td>{{item.person.sexText}}</td>
                                <td>{{item.person.phoneNo}}</td>
                                <td>
                                    <span v-for="subitem in item.commonChronicList">{{subitem.chronicText}}</span>
                                </td>
                            </tr>
                            <tr v-show="pagesshow">
                                <td colspan="5">
                                    <div class="pull-left">
                                        <button class="btn btn-default" @click="refresh">刷新</button>
                                    </div>
                                    <div class="pull-right">
                                        <!-- 使用服务器数据的组件HTML: -->
                                        <boot-page v-ref:page :async="true" :lens="lenArr" :page-len="pageLen" :headersparam="headersparam" :param="param"></boot-page>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal -->
    </div>
</template>
<script>
import Public from 'assets/public.js'
import bootPage from 'components/BootPage.vue'

export default {
    data() {
            return {
                searchformdata: { //只需要传5个字段
                    "name": "", //姓名
                    "idcard": "", //证件
                    "mobile": "", //手机号
                    "sex": "",
                    "memberType": "",
                    "chronic": "",
                    "mainDoctor": "",
                    "healthDoctor": "",
                    "pageNo": 1,
                    "pageSize": 10
                },
                PersonUserInfo: [], //患者列表
                lenArr: [10, 20, 50], // 每页显示长度设置
                pageLen: 5, // 可显示的分页数
                headersparam: {
                    "X-Service-Id": "coms.memberService",
                    "X-Service-Method": "findPersonUserInfo",
                },
                pagesshow:false,
                
            }
        },
        computed:{
            'param':function(){
                return this.searchformdata
            }
        },
        components: {
            bootPage
        },
        ready() {
            var that = this;

        },
        methods: {
            // 查找患者弹框
            findmember() {
                    $("#myModal-find").modal("show");
                    this.PersonUserInfo = [];
                    this.searchformdata = {
                        "name": "", //姓名
                        "idcard": "", //证件
                        "mobile": "", //手机号
                        "sex": "",
                        "memberType": "",
                        "chronic": "",
                        "mainDoctor": "",
                        "healthDoctor": "",
                        "pageNo": 1,
                        "pageSize": 10

                    };

                },
                // 根据输入值获取患者列表
                getmemberlist() {
                    this.pagesshow=true;
                    this.refresh();
                },
                //选择患者后赋值到指定的表单中
                selectPersonUser(item) {
                     this.pagesshow=false;
                    $("#myModal-find").modal("hide");
                    this.$dispatch("personInfo", item)

                },
                // 列表页面刷新按钮
                refresh() {
                    this.$refs.page.refresh()
                },
        },
        props: {
            findmembername: {
                type: String,
                default: ""
            },
            // accesstokenget: {
            //         type: String,
            //         default: ""
            //     },
        },
        events: {
            // 分页列表数据
            'data' (data) {
                var d = new Date();
                var year = d.getFullYear();
                $.each(data, function(index, el) {
                    el.person.dob = parseInt(year) - parseInt(el.person.dob.substring(0, 4));
                })
                this.PersonUserInfo = data;
            },


        },
}
</script>
<style scoped>
#myModal-find .modal-content {
    width: 600px;
    min-height: 480px
}

#myModal-find .modal-body form p {
    width: 436px;
}

#myModal-find .modal-body input {
    width: 436px;
    float: left;
}

#myModal-find .modal-footer {
    height: 50px;
    line-height: 50px;
}

#myModal-find .find-message table {
    width: 100%;
    border: 0;
}

#myModal-find .find-message table th,
td {
    padding-left: 15px;
}

#myModal-find .find-message table thead tr {
    height: 50px;
    background-color: #1FC49A;
    color: #fff;
    font-weight: 400;
}

#myModal-find .find-message table tbody tr {
    border-bottom: 1px dotted #CACACA;
    height: 40px;
    margin-bottom: 3px;
}

#myModal-find .find-message table tbody td span {
    float: left;
    margin-left: 10px;
    width: 60px;
    text-align: center;
    border: 1px solid #1FC49A;
    color: #1FC49A;
    border-radius: 8px;
    font-size: 14px;
}

#myModal-find .find-message table tbody td span.hk-card {
    border: 1px solid #FEA965;
    color: #FEA965;
}

.modal-footer {
    background-color: #eff0f4;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 103px;
}
.modal-body p input {
    border: 0;
    border: 1px solid #bcc3c9;
    width: 443px;
    height: 32px;
    border-radius: 10px;
    margin-left: 13px;
    padding-left: 9px;
    outline: none;
}

.modal-body p input[name='guest-name'] {
    background: url(../assets/img/selete_guest.png) no-repeat 413px center;
}

.modal-body p label {
    float: left;
}

.modal-body p {
    min-height: 32px;
    height: auto!important;
    height: 32px;
    margin: 0 auto;
    margin-top: 20px;
    width: 531px;
}
</style>
