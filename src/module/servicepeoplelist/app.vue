<template>
    <div class="index clearafter">
        <module-head></module-head>
        <div class="content cbafter">
            <div class="w220 fl">
                <menu-list></menu-list>
            </div>
            <div class="w980 fr">
                <div class="h1_tit">
                    <h1 class="fl">服务人员维护</h1>
                     <button class="fr default ok" @click="deptProvider">导入服务人员</button>
                    <div class="fr" id="searchbyname">
                    <div class="col-md-6"><input type="text" class="form-control" v-model="param.content" placeholder="请输入姓名进行搜索"></div>
                     <div class="col-md-3"> <button class="default blue" @click="getsearchlist">搜索</button></div>

                    </div>
                    
                   
                   
                </div>
                <div class="servicepeoplelist bg">
                    <table class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <!--   <th>工号</th> -->
                                <th>姓名</th>
                                <th>职称</th>
                                <th>机构科室</th>
                                <th>手机号码</th>
                                <th>角色类型</th>
                                <th>病种管理</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in servicePersonlist" track-by="$index">
                                <!-- <td>{{item.localDoctorId}}</td> -->
                                <td>{{item.personame}}</td>
                                <td>{{item.levelText}}</td>
                                <td>{{item.fullName}} {{item.depname}}</td>
                                <td>{{item.phoneNo}}</td>
                                <td>{{item.personTypeCodeText}}</td>
                                <td>{{item.chronicName}}</td>
                                <td><span class="glyphicon glyphicon-pencil" @click="servicepeoplemodalshow(item)"></span></td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <div class="pull-left">
                                        <button class="btn btn-default" @click="refresh">刷新</button>
                                    </div>
                                    <div class="pull-right">
                                        <!-- 分页组件: -->
                                        <boot-page v-ref:page :async="true" :lens="lenArr" :page-len="pageLen" :headersparam="headersparam" :param="param"></boot-page>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- 修改服务人员-->
        <div class="modal fade bs-example-modal-lg" id="servicepeoplemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                修改服务人员信息</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal cbafter" role="form" id="reviewvisitform" v-on:submit.prevent="servicepeople_save">
                            <div class="service_add ">
                                <!--  <div class="form-group">
                                    <label class="col-md-3 control-label">工号:</label>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" placeholder="请输入工号" v-model="saveservicePerson.">
                                    </div>
                                </div> -->
                                <div class="form-group">
                                    <label class="col-md-3 control-label">姓名:</label>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" placeholder="请输入姓名" v-model="saveservicePerson.doctor.name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label">头像:</label>
                                    <div class="col-md-6">
                                        <img-upload-btn :imgurl="imgurl"></img-upload-btn>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label">手机号码:</label>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" placeholder="请输入手机号码" v-model="saveservicePerson.doctor.phoneNo">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label">擅长:</label>
                                    <div class="col-md-6">
                                        <textarea class="form-control" rows="3" v-model="saveservicePerson.doctor.speciality"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <h3>执业机构<span class="fr addorg glyphicon glyphicon-plus-sign" @click="addorg"></span></h3>
                                </div>
                                <div class="form-group" v-for="(index,orginfo) in saveservicePerson.doctorOrgsList">
                                    <div class="col-md-3 mainorg">
                                        <label class="radio-inline fr">
                                            <input type="radio" name="mainOrg" v-model="orginfo.mainFlag" required @click="setmainorg(index)" value="1"> 主执业机构
                                        </label>
                                    </div>
                                    <label class="col-md-1 control-label">机构:</label>
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="orginfo.orgId" :disabled="orginfo.id!=undefined" @change="getDepttlist2(orginfo,index)">
                                            <option value="{{orginfo.orgId}}" v-if="orginfo.id">{{orginfo.orgname}}</option>
                                            <option value="{{item.orgId}}" v-for="item in orglist" v-if="!orginfo.id">{{item.fullName}}</option>
                                        </select>
                                    </div>
                                    <label class="col-md-1 control-label">科室:</label>
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="orginfo.deptId" :disabled="orginfo.id!=undefined">
                                            <option value="{{orginfo.deptId}}" v-if="orginfo.id">{{orginfo.depname}}</option>
                                            <option value="{{item.deptId}}" v-if="!orginfo.id" v-for="(index2, item) in editdeptlist[index]">{{item.name}}</option>
                                        </select>
                                    </div>
                                    <div class="col-md-1" v-show="saveservicePerson.doctorOrgsList.length>1&&orginfo.localDoctorId==null"><span class="delorg glyphicon glyphicon-trash" @click="deleorg(orginfo.id,index)"></span></div>
                                </div>
                                <div class="form-group">
                                </div>
                                <div class="form-group">
                                    <h3>角色类型</h3>
                                </div>
                                <div class="form-group cbafter">
                                    <label class="col-md-3 control-label">角色类型:</label>
                                    <div class="col-md-6">
                                        <label class="radio-inline" v-for="item in roletypelist">
                                            <input type="checkbox" name="personTypeCode" value="{{item.key}}" v-model="newservicePersonList" >{{item.text}}
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group" v-show="newservicePersonList.indexOf('061')!=-1">
                                    <label class="col-md-3 control-label"></label>
                                    <div class=" col-md-6 CommonChronic" id="chronicselect">
                                        <div class="arrow"></div>
                                        <label class="checkbox-inline">
                                            <input type="checkbox" name="quankedoctor" value="0" v-model="quankedoctor">全科医生
                                        </label>
                                        <label class="checkbox-inline" v-for="(index,item) in chronicsortlist">
                                            <input type="checkbox" name="chronic" value="{{item.chronic}}" v-model="saveservicePerson.managerschronicrelations" :disabled="item.isselect"> {{item.chronicText}}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="service_save">
                                <button class="default ok center">保 存</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- 导入服务人员信息-->
        <div class="modal fade bs-example-modal-lg" id="deptProvider" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">
                导入服务人员信息</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal cbafter" role="form">
                            <div class="form-group">
                                <label class="col-md-2 control-label">请选择导入机构:</label>
                                <div class="col-md-4">
                                    <select class="form-control" v-model="Importcon.orgId" @change="getDepttlist(Importcon.orgId)">
                                        <option v-for="item in orglist" value="{{item.orgId}}">{{item.fullName}}</option>
                                    </select>
                                </div>
                                <label class="col-md-2 control-label">请选择导入科室:</label>
                                <div class="col-md-4" id="searchdept">
                                    <!-- <select class="form-control" v-model="Importcon.deptId" @change="getDeptDoctlist">
                                        <option v-for="item in deptlist" value="{{item.deptId}}">{{item.name}}</option>
                                    </select> -->
                                    <input type="hidden" class="form-control" placeholder="" v-model="Importcon.deptId">
                                    <input type="text" class="form-control" v-model="Importcon.name">
                                    <div class="yishenglist">
                                        <p @click="mayclick(item,$event)" v-for="item in  deptlist | filterBy Importcon.name in 'name'">{{item.name}}</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="servicepeoplelist bg cb ">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" name="allselected" @click="allselected" />全选</th>
                                        <th>序号</th>
                                        <th>姓名</th>
                                        <th>职称</th>
                                        <th>科室</th>
                                        <th>手机号码</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in doclist">
                                        <td>
                                            <input type="checkbox" name="{{'people'+($index+1)}}" @click="selectedpeople(item)" v-model="item.selected" />
                                        </td>
                                        <td>{{$index+1}}</td>
                                        <td>{{item.name}}</td>
                                        <td>{{item.levelText}}</td>
                                        <td>{{item.deptName}}</td>
                                        <td>{{item.phoneNo}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-foot">
                        <div class="form-group text-center">
                            <button class="btn btn-info" @click="importselectp">导 入</button>
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
import ImgUploadBtn from 'components/ImgUploadBtn.vue'
import bootPage from 'components/BootPage.vue'
export default {
    data() {
            return {
                lenArr: [10, 20, 50], // 每页显示长度设置
                pageLen: 5, // 可显示的分页数
                headersparam: {
                    "X-Service-Id": "coms.servicePersonService",
                    "X-Service-Method": "queryServicePersonList",
                },
                param: {
                    content: ""
                },
                imgurl: "", //修改的时候图片预览
                servicePersonlist: [],
                chronicsortlist: [], //选择主管医生的时候弹出的慢病
                orglist: [], //医院列表 导入信息的时候用
                deptlist: [], //科室列表 导入信息的时候用
                doclist: [],
                Importcon: {
                    orgId: "",
                    deptId: "",
                    name: ""
                },
                roletypelist: [], //角色列表
                editdeptlist: [], //修改编辑获取科室列表二维数组 修改人员信息的时候用到

                // deptindex:0,//获取二位数组数据的索引 修改人员信息的时候用到
                saveservicePerson: {
                    "doctorId": "",
                    "doctor": {
                        "name": "",
                        "avatarFileId": "",
                        "speciality": "",
                        "phoneNo": ""
                    },
                    "servicePersonList": [],
                    "doctorOrgsList": [],
                    "managerschronicrelations": []
                },
                quankedoctor: false, //全科医生是否选中
                newservicePersonList: [],//用你绑定checkbox的数组
               
            }
        },
        computed: {
        },
        components: {
            moduleHead, menuList, ImgUploadBtn, bootPage
        },
        ready() {
            var that = this;
            // 获取慢病种类
            $.when(Public.commonajax("coms.commonChronicService", "findCommonChronic", "[[]]"))
                .done(function(res) {
                    $.each(res.body, function(index, el) {
                        el.isselect = false
                    });
                    that.chronicsortlist = res.body;
                })

            //获取医院列表
            $.when(Public.commonajax("base.orgProvider", "findOrgByCloudId", "[]"))
                .done(function(res) {
                    if (res.code == 200) {
                        that.orglist = res.body
                    }
                });
            //获取服务人员角色数据
            $.when(Public.commonajax("coms.multipleDictionaryService", "findDic", "[['base.dictionary.base_servicePersonType']]"))
                .done(function(res) {
                    if (res.code == 200) {
                        that.roletypelist = res.body[0].items
                    } else {
                        alert(res.msg)
                    }
                });
        },
        methods: {
            mayclick(item, event) {

                    this.Importcon.deptId = item.deptId;
                    this.Importcon.name = item.name
                    $(".yishenglist").hide();
                    this.getDeptDoctlist();

                },
                // 导入服务人员弹框
                deptProvider() {
                    $("#deptProvider").modal("show");
                },
                //修改服务人员   
                servicepeoplemodalshow(item) {
                    var that = this;
                    // console.log(that.orglist);
                    that.editdeptlist = [];
                    that.quankedoctor = false;
                    // that.deptindex=0;
                    that.saveservicePerson.doctorOrgsList = [];
                    that.saveservicePerson.managerschronicrelations = [];
                    $("#servicepeoplemodal").modal("show");
                    //根据doctorId获取服务人员详细信息
                    $.when(Public.commonajax("coms.servicePersonService", "getServicePersonInfo", "['" + item.doctorId + "']"))
                        .done(function(res) {
                            if (res.code == 200) {
                                if (res.body.managerschronicrelations[0] == "0") {
                                    that.quankedoctor = true;
                                }
                                that.saveservicePerson = res.body;
                                    var arr=[];
                                    $.each(that.saveservicePerson.servicePersonList,function(index, el) {
                                        arr.push(el.personTypeCode);
                                    });
                                that.newservicePersonList=arr;
                                if (res.body.doctor.avatarFileId) {
                                    that.imgurl = Public.IMGVIEW_URL() + res.body.doctor.avatarFileId;
                                } else {
                                    that.imgurl = ""
                                }
                            }
                        });

                },
                //导入信息的时候根据医院获取科室列表
                getDepttlist(orgId) {
                    var that = this
                        //根据医院获取科室列表
                    $.when(Public.commonajax("base.deptProvider", "findDeptListByOrgId", "['" + orgId + "']"))
                        .done(function(res) {
                            if (res.code == 200) {
                                that.deptlist = res.body;
                            }
                        });

                },
                //修改人员信息的时候根据医院获取科室列表
                getDepttlist2(orginfo, index) {
                    var that = this;

                    //根据医院获取科室列表
                    $.when(Public.commonajax("base.deptProvider", "findDeptListByOrgId", "['" + orginfo.orgId + "']"))
                        .done(function(res) {
                            if (res.code == 200) {
                                that.editdeptlist.$set(index, res.body)

                            }
                        });

                },
                // 选择角色的切换，选中了不是主管医生的角色之后saveservicePerson.managerschronicrelations数组为空
                // roleselect(index) {
                //     if (index != 0) {
                //         this.saveservicePerson.managerschronicrelations = [];
                //     }
                // },
                //修改服务人员保存
                servicepeople_save() {
                    var that = this,temarr = [];
                    // if(this.newservicePersonList.length==0){
                    //     Public.ajaxPrompt("至少选一个角色");
                    //     return
                    // }
                    $.each(this.newservicePersonList, function(index, el) {
                        var temobj = {
                            personTypeCode: el
                        };
                        temarr.push(temobj)
                    });
                    this.saveservicePerson.servicePersonList = temarr;
                    $.when(Public.commonajax("coms.servicePersonService", "saveServicePersonDetail", "[" + JSON.stringify(this.saveservicePerson) + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                Public.ajaxPrompt("修改成功");
                                that.refresh();
                                $("#servicepeoplemodal").modal("hide");
                            } else {
                                Public.ajaxPrompt(res.msg);
                            }
                        });
                },
                //根据医院科室获取医生列表
                getDeptDoctlist() {
                    var that = this;
                    var item = {};
                    $.each(that.deptlist, function(index, el) {
                        if (el.deptId == that.Importcon.deptId) {
                            item = el;
                            item.orgId = that.Importcon.orgId
                        }
                    });
                    //根据科室获取医生列表
                    $.when(Public.commonajax("base.doctorProvider", "getDeptDoctInfo", "[" + JSON.stringify(item) + "]"))
                        .done(function(res) {
                            if (res.code == 200) {
                                $.each(res.body, function(index, el) {
                                    el.selected = false;
                                });
                                that.doclist = res.body
                            }
                        });
                },
                //全选服务人员
                allselected() {
                    $.each(this.doclist, function(index, el) {
                        el.selected = !el.selected;
                    });
                },
                //点击选择让单个服务人员
                selectedpeople(item) {
                    item.selected = !item.selected
                },
                //导入选中的服务人员信息
                importselectp() {
                    var temarr = this.doclist.filter(function(val) {
                        return val.selected == true;
                    });
                    if (temarr.length == 0) {
                        Public.ajaxPrompt("请选择导入信息")
                    } else {
                        $.when(Public.commonajax("base.doctorProvider", "importDeptDoct", "[" + JSON.stringify(temarr) + "]"))
                            .done(function(res) {
                                if (res.code == 200) {
                                    Public.ajaxPrompt("导入成功")

                                }
                            });
                    }

                },
                // 列表页面刷新按钮
                refresh() {
                    this.$refs.page.refresh()
                },
                //添加执业机构
                addorg() {
                    var temobj = {
                        "orgId": "",
                        "deptId": "",
                        "localDeptId": "",
                        "localDoctorId": null,
                        "mainFlag": "0",
                        // "deptselectindex":this.deptindex,
                    };
                    //制造空的二位数组
                    var emptyarr = [];
                    this.editdeptlist.push(emptyarr);
                    this.saveservicePerson.doctorOrgsList.push(temobj)

                },
                //删除执业机构
                deleorg(id, index) {
                    var that = this;
                    if (id) {
                        $.when(Public.commonajax("base.doctorProvider", "deleteDoctorOrgs", "['" + id + "']"))
                            .done(function(res) {
                                if (res.code == 200) {

                                    that.saveservicePerson.doctorOrgsList.splice(index, 1);
                                }
                            });
                    } else {

                        that.saveservicePerson.doctorOrgsList.splice(index, 1);
                    }
                    Public.ajaxPrompt("删除执业机构成功");

                },
                // 点击全科医生其他不能点
                chronicselect(item) {
                    if (item.chronic == 0) {
                        this.saveservicePerson.managerschronicrelations
                    }

                },
                // 设置主执业机构
                setmainorg(index) {
                    $.each(this.saveservicePerson.doctorOrgsList, function(index2, el2) {
                        if (index == index2) {
                            el2.mainFlag = "1"
                        } else {
                            el2.mainFlag = "0"
                        }

                    });
                    console.log(this.saveservicePerson.doctorOrgsList);

                },
                // 姓名按照拼音排序
                sorebyname(arr) {
                    var resultArr = arr.sort(
                        function compareFunction(param1, param2) {
                            return param1.personame.localeCompare(param2.personame);
                        }
                    );
                    return resultArr
                },
                  // 点击搜搜按钮
                getsearchlist(){
                    this.refresh()
                }


        },
        events: {
            // 分页列表数据
            'data' (data) {
                this.servicePersonlist = this.sorebyname(data);
            },

            //头像ID
            'serviceIconId' (serviceIconId) {
                this.saveservicePerson.doctor.avatarFileId = serviceIconId;
            }
        },
        watch: {
            'quankedoctor' (val, oldval) {
                if (val) {
                    this.saveservicePerson.managerschronicrelations = ["0"];
                    $.each(this.chronicsortlist, function(index, el) {
                        el.isselect = true
                    });

                } else {
                    this.saveservicePerson.managerschronicrelations = [];
                    $.each(this.chronicsortlist, function(index, el) {
                        el.isselect = false
                    });
                }
            },
            'newservicePersonList' (val, oldval) {
                if (val.indexOf("061") != -1) {
                    
                } else {
                    this.saveservicePerson.managerschronicrelations = [];
                }
            }

        },
}
$(function() {
    // 搜索位置科室的下拉
    $("#searchdept").find('input').on('click', function(event) {
        event.preventDefault();
        $(".yishenglist").show();
    });
})
</script>
<style scoped>
.servicepeoplelist {
    padding: 20px
}

.servicepeoplelist table th {
    text-align: center;
    line-height: 36px;
    height: 36px;
    font-weight: normal;
}

.servicepeoplelist table td {
    line-height: 40px;
    text-align: center;
    color: #898989;
}

.servicepeoplelist table tr td:nth-child(1) {
    font-weight: bold;
    color: #333;
    text-align: left
}

.servicepeoplelist table tr td:nth-child(2),
.servicepeoplelist table tr td:nth-child(3) {
    color: #333
}

.servicepeoplelist table tr td:nth-child(6) {
    width: 200px
}

.servicepeoplelist table tr td .glyphicon-pencil {
    display: inline-block;
    width: 30px;
    height: 30px;
}

.servicepeoplelist table tr td .glyphicon-pencil:hover {
    color: #1dc499;
    cursor: pointer;
}


/*
.btn-success,
.btn-success:hover,
.btn-success:focus,
.btn-success.focus,
.btn-success:active {
    background-color: #1dc499;
    border-color: #1dc499;
}*/

.service_add {
    min-height: 500px;
    /* overflow-y: auto;
    overflow-x: hidden;*/
}

.service_add h3 {
    font-size: 16px;
    line-height: 30px;
    height: 30px;
    margin: 20px auto 20px;
    color: #1fc49a;
    width: 90%;
    border-bottom: 2px solid #e5e5e5
}

.service_save {
    border-top: 2px solid #e5e5e5;
    text-align: center;
    padding-top: 10px
}

.service_add h3:nth-child(1) {
    margin-top: 0;
}

.tbline {
    border-top: 1px solid #ccc;
    margin-top: 20px;
    padding-top: 20px
}

.threestep_con h2 {
    margin: 20px auto;
    background: url(../../assets/img/c_ok.png) no-repeat 115px center;
    padding-left: 60px;
    color: #19ab85;
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-size: 20px
}

#ServicePropertylist {
    width: 90%;
    margin: 0 auto;
}

#ServicePropertylist th {
    background: #19ab85;
    color: #fff;
    text-align: center;
}

#ServicePropertylist td {
    text-align: center;
}

.CommonChronic {
    background: #E7F8F0;
    border: #C1E9E1 1px solid;
    min-height: 36px;
    padding-bottom: 10px
}

.CommonChronic .checkbox-inline {
    margin-left: 10px;
    position: relative;
}

.CommonChronic .arrow {
    background: url(../../assets/img/arrowtop.png) no-repeat;
    position: absolute;
    width: 22px;
    height: 10px;
    top: -9px;
    left: 40px;
}

.delorg {
    margin-top: 8px;
    color: red
}

.addorg:hover,
.delorg:hover {
    cursor: pointer;
}

.yishenglist {
    position: absolute;
    display: none;
    left: 17px;
    top: 31px;
    z-index: 9;
    width: 90%;
    height: 200px;
    overflow: auto;
    -webkit-box-shadow: 0 0 10px rgba(230, 230, 230, .9);
    -moz-box-shadow: 0 0 10px rgba(230, 230, 230, .9);
    box-shadow: 0 0 10px rgba(230, 230, 230, .9);
    background: #fff;
    border-radius: 0 0 10px 10px;
    padding: 10px
}

.yishenglist p {
    line-height: 26px;
    height: 26px;
    margin-top: 5px;
    background: #f1f1f1;
    padding-left: 10px
}

.yishenglist p:hover {
    background: #1dc499;
    color: #fff
}
#searchbyname{width: 400px}
</style>
