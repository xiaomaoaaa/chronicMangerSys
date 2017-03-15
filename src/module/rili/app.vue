<template>
    <ul id="treeDemo" class="ztree"></ul>
    <ul id="treeDemo2" class="ztree"></ul>
</template>
<script>
// import 'assets/lib/ztree/css/zTreeStyle/zTreeStyle.css'
// import 'assets/lib/ztree/css//demo.css'
// import 'assets/lib/ztree/js/jquery.ztree.core.min.js'
// import 'assets/lib/ztree/js/jquery.ztree.excheck.js'
import Public from 'assets/public.js'
export default {
    data() {
            return {

            }
        },
        components: {

        },
        ready() {
            // var that = this;
            // // 测试队列
            //  //全局变量，储存第一个ajax请求数据
            //         var a_data;
            // // 第一个ajax请求
            // $(document).queue(
            //     function() {
                   
            //         $.ajax({
            //             url: Public.MENU_URL(),
            //             type: "POST",
            //             headers: {
            //                 "X-Access-Token": sessionStorage.getItem('accessToken'),
            //                 "X-Service-Id": "coms.commonChronicService",
            //                 "X-Service-Method": "findCommonChronic",
            //                 "Content-Type": "application/json"
            //             },
            //             dataType: "JSON",
            //             data: "[[]]",
            //             success: function(res) {
            //                 a_data = res;
            //                 $(document).dequeue();

            //             },

            //         });
                  
            //     });
            // // 第二个ajax请求
            // $(document).queue(
            //     function() {
            //          $.ajax({
            //             url: Public.MENU_URL(),
            //             type: "POST",
            //             headers: {
            //                 "X-Access-Token": sessionStorage.getItem('accessToken'),
            //                 "X-Service-Id": "coms.memberService",
            //                 "X-Service-Method": "findMemberSearchCon",
            //                 "Content-Type": "application/json"
            //             },
            //             dataType: "JSON",
            //             data: "[[]]",
                       
            //             success: function(res) {
            //                  console.log(a_data);
            //                 $(document).dequeue();

            //             },

            //         });

                   
            //     });
            // // 触发queue往下执行
            // $(document).dequeue("ajaxRequests");

           $.ajax({ url: Public.MENU_URL(),
                        type: "POST",
                        headers: {
                            "X-Access-Token": sessionStorage.getItem('accessToken'),
                            "X-Service-Id": "coms.commonChronicService",
                            "X-Service-Method": "findCommonChronic",
                            "Content-Type": "application/json"
                        },
                        dataType: "JSON",
                        data: "[[]]",
                    }).then(function(data){
                         console.log(data) 
                   return  $.ajax({
                        url: Public.MENU_URL(),
                        type: "POST",
                        headers: {
                            "X-Access-Token": sessionStorage.getItem('accessToken'),
                            "X-Service-Id": "coms.doctorService",
                            "X-Service-Method": "getDoctorCurrent",
                            "Content-Type": "application/json"
                        },
                        dataType: "JSON",
                        data: "[[]]",
                       
                    }) }).then(function(data){
        console.log(data) 
        return
    })






            // var zTreeObj, zTreeObj2;
            // // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
            // var setting = {
            //     data: {
            //         key: {
            //             children: "childModules",
            //             name: "moduleName",
            //             id: "moduleId"
            //         }
            //     },

            //     view: {
            //         selectedMulti: false
            //     },
            //     check: {
            //         enable: true
            //     },
            //     callback: {
            //         onCheck: onCheck
            //     },
            // };
            // var setting2 = {

            //     data: {
            //         simpleData: {
            //             enable: true
            //         }
            //     },

            // };

            // function onCheck(e, treeId, treeNode) {
            //     var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            //     var checkeds = zTree.getCheckedNodes(true),
            //         nocheckeds = zTree.getCheckedNodes(false);
            //     var temarr = []
            //     $.each(checkeds, function(index, el) {
            //         var temobj = {
            //             "id": el.moduleId,
            //             "pId": el.parentModuleId,
            //             "name": el.moduleName,
            //             "open": true,
            //             "url": el.url
            //         };
            //         temarr.push(temobj);

            //     });

            //     zTreeObj2 = $.fn.zTree.init($("#treeDemo2"), setting2, temarr);

            // }


            // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
            // var zNodes = [{
            //             "moduleId": 7,
            //             "parentModuleId": 0,
            //             "moduleName": "管理平台",
            //             "groupType": "1",
            //             "desc": "",
            //             "createDt": "2017-03-07 11:28:06",
            //             "createUser": "",
            //             "lastModifyDt": "2017-03-07 11:28:10",
            //             "lastModifyUser": "",
            //             "isEnable": 1,
            //             "tenantId": "pcn.zhongshan",
            //             "childModules": [
            //                 {
            //                     "moduleId": 8,
            //                     "parentModuleId": 7,
            //                     "moduleCode": "",
            //                     "moduleName": "居民管理",
            //                     "groupType": "1",
            //                     "desc": "",
            //                     "createDt": "2017-03-07 11:28:06",
            //                     "createUser": "",
            //                     "lastModifyDt": "2017-03-07 11:28:10",
            //                     "lastModifyUser": "",
            //                     "isEnable": 1,
            //                     "tenantId": "pcn.zhongshan",
            //                     "childModules": [
            //                         {
            //                             "moduleId": 14,
            //                             "parentModuleId": 8,
            //                             "moduleCode": "",
            //                             "moduleName": "签约列表",
            //                             "groupType": "1",
            //                             "desc": "",
            //                             "url": "signedLists.html",
            //                             "createDt": "2017-03-07 11:28:06",
            //                             "createUser": "",
            //                             "lastModifyDt": "2017-03-07 11:28:10",
            //                             "lastModifyUser": "",
            //                             "isEnable": 1,
            //                             "tenantId": "pcn.zhongshan",
            //                             "hasChild": false
            //                         }
            //                     ],
            //                     "hasChild": true
            //                 },
            //                 {
            //                     "moduleId": 9,
            //                     "parentModuleId": 7,
            //                     "moduleCode": "",
            //                     "moduleName": "服务管理",
            //                     "groupType": "1",
            //                     "desc": "",
            //                     "url": "123",
            //                     "createDt": "2017-03-07 11:28:06",
            //                     "createUser": "",
            //                     "lastModifyDt": "2017-03-07 11:28:10",
            //                     "lastModifyUser": "",
            //                     "isEnable": 1,
            //                     "tenantId": "pcn.zhongshan",
            //                     "childModules": [
            //                         {
            //                             "moduleId": 15,
            //                             "parentModuleId": 9,
            //                             "moduleCode": "",
            //                             "moduleName": "服务项",
            //                             "groupType": "1",
            //                             "desc": "",
            //                             "url": "serverProgram.html",
            //                             "createDt": "2017-03-07 11:28:06",
            //                             "createUser": "",
            //                             "lastModifyDt": "2017-03-07 11:28:10",
            //                             "lastModifyUser": "",
            //                             "isEnable": 1,
            //                             "tenantId": "pcn.zhongshan",
            //                             "hasChild": false
            //                         },
            //                         {
            //                             "moduleId": 16,
            //                             "parentModuleId": 9,
            //                             "moduleCode": "",
            //                             "moduleName": "服务包",
            //                             "groupType": "1",
            //                             "desc": "",
            //                             "url": "serverPacks.html",
            //                             "createDt": "2017-03-07 11:28:06",
            //                             "createUser": "",
            //                             "lastModifyDt": "2017-03-07 11:28:10",
            //                             "lastModifyUser": "",
            //                             "isEnable": 1,
            //                             "tenantId": "pcn.zhongshan",
            //                             "hasChild": false
            //                         },
            //                         {
            //                             "moduleId": 17,
            //                             "parentModuleId": 9,
            //                             "moduleCode": "",
            //                             "moduleName": "协议管理",
            //                             "groupType": "1",
            //                             "desc": "",
            //                             "url": "protocolManage.html",
            //                             "createDt": "2017-03-07 11:28:06",
            //                             "createUser": "",
            //                             "lastModifyDt": "2017-03-07 11:28:10",
            //                             "lastModifyUser": "",
            //                             "isEnable": 1,
            //                             "tenantId": "pcn.zhongshan",
            //                             "hasChild": false
            //                         }
            //                     ],
            //                     "hasChild": true
            //                 },
            //                 {
            //                     "moduleId": 10,
            //                     "parentModuleId": 7,
            //                     "moduleCode": "",
            //                     "moduleName": "业务管理",
            //                     "groupType": "1",
            //                     "desc": "",
            //                     "url": "123",
            //                     "createDt": "2017-03-07 11:28:06",
            //                     "createUser": "",
            //                     "lastModifyDt": "2017-03-07 11:28:10",
            //                     "lastModifyUser": "",
            //                     "isEnable": 1,
            //                     "tenantId": "pcn.zhongshan",
            //                     "hasChild": false
            //                 },
            //                 {
            //                     "moduleId": 11,
            //                     "parentModuleId": 7,
            //                     "moduleCode": "",
            //                     "moduleName": "基础数据",
            //                     "groupType": "1",
            //                     "desc": "",
            //                     "url": "22",
            //                     "createDt": "2017-03-07 11:28:06",
            //                     "createUser": "",
            //                     "lastModifyDt": "2017-03-07 11:28:10",
            //                     "lastModifyUser": "",
            //                     "isEnable": 1,
            //                     "tenantId": "pcn.zhongshan",
            //                     "childModules": [
            //                         {
            //                             "moduleId": 18,
            //                             "parentModuleId": 11,
            //                             "moduleCode": "",
            //                             "moduleName": "机构管理",
            //                             "groupType": "1",
            //                             "desc": "",
            //                             "url": "organizationManage.html",
            //                             "createDt": "2017-03-07 11:28:06",
            //                             "createUser": "",
            //                             "lastModifyDt": "2017-03-07 11:28:10",
            //                             "lastModifyUser": "",
            //                             "isEnable": 1,
            //                             "tenantId": "pcn.zhongshan",
            //                             "hasChild": false
            //                         },
            //                         {
            //                             "moduleId": 19,
            //                             "parentModuleId": 11,
            //                             "moduleCode": "",
            //                             "moduleName": "科室管理",
            //                             "groupType": "1",
            //                             "desc": "",
            //                             "createDt": "2017-03-07 11:28:06",
            //                             "createUser": "",
            //                             "lastModifyDt": "2017-03-07 11:28:10",
            //                             "lastModifyUser": "",
            //                             "isEnable": 1,
            //                             "tenantId": "pcn.zhongshan",
            //                             "hasChild": false
            //                         },
            //                         {
            //                             "moduleId": 20,
            //                             "parentModuleId": 11,
            //                             "moduleCode": "",
            //                             "moduleName": "医生管理",
            //                             "groupType": "1",
            //                             "desc": "",
            //                             "createDt": "2017-03-07 11:28:06",
            //                             "createUser": "",
            //                             "lastModifyDt": "2017-03-07 11:28:10",
            //                             "lastModifyUser": "",
            //                             "isEnable": 1,
            //                             "tenantId": "pcn.zhongshan",
            //                             "hasChild": false
            //                         },
            //                         {
            //                             "moduleId": 21,
            //                             "parentModuleId": 11,
            //                             "moduleCode": "",
            //                             "moduleName": "家医团队",
            //                             "groupType": "1",
            //                             "desc": "",
            //                             "createDt": "2017-03-07 11:28:06",
            //                             "createUser": "",
            //                             "lastModifyDt": "2017-03-07 11:28:10",
            //                             "lastModifyUser": "",
            //                             "isEnable": 1,
            //                             "tenantId": "pcn.zhongshan",
            //                             "hasChild": false
            //                         }
            //                     ],
            //                     "hasChild": true
            //                 },
            //                 {
            //                     "moduleId": 12,
            //                     "parentModuleId": 7,
            //                     "moduleCode": "",
            //                     "moduleName": "统计分析",
            //                     "groupType": "1",
            //                     "desc": "",
            //                     "url": "22",
            //                     "createDt": "2017-03-07 11:28:06",
            //                     "createUser": "",
            //                     "lastModifyDt": "2017-03-07 11:28:10",
            //                     "lastModifyUser": "",
            //                     "isEnable": 1,
            //                     "tenantId": "pcn.zhongshan",
            //                     "childModules": [
            //                         {
            //                             "moduleId": 22,
            //                             "parentModuleId": 12,
            //                             "moduleCode": "",
            //                             "moduleName": "统计分析",
            //                             "groupType": "1",
            //                             "desc": "",
            //                             "createDt": "2017-03-07 11:28:06",
            //                             "createUser": "",
            //                             "lastModifyDt": "2017-03-07 11:28:10",
            //                             "lastModifyUser": "",
            //                             "isEnable": 1,
            //                             "tenantId": "pcn.zhongshan",
            //                             "hasChild": false
            //                         }
            //                     ],
            //                     "hasChild": true
            //                 },
            //                 {
            //                     "moduleId": 13,
            //                     "parentModuleId": 7,
            //                     "moduleCode": "",
            //                     "moduleName": "系统管理",
            //                     "groupType": "1",
            //                     "desc": "",
            //                     "url": "22",
            //                     "createDt": "2017-03-07 11:28:06",
            //                     "createUser": "",
            //                     "lastModifyDt": "2017-03-07 11:28:10",
            //                     "lastModifyUser": "",
            //                     "isEnable": 1,
            //                     "tenantId": "pcn.zhongshan",
            //                     "childModules": [
            //                         {
            //                             "moduleId": 23,
            //                             "parentModuleId": 13,
            //                             "moduleCode": "",
            //                             "moduleName": "角色管理",
            //                             "groupType": "1",
            //                             "desc": "",
            //                             "url": "roleManage.html",
            //                             "createDt": "2017-03-07 11:28:06",
            //                             "createUser": "",
            //                             "lastModifyDt": "2017-03-07 11:28:10",
            //                             "lastModifyUser": "",
            //                             "isEnable": 1,
            //                             "tenantId": "pcn.zhongshan",
            //                             "hasChild": false
            //                         },
            //                         {
            //                             "moduleId": 24,
            //                             "parentModuleId": 13,
            //                             "moduleCode": "",
            //                             "moduleName": "后台用户",
            //                             "groupType": "1",
            //                             "desc": "",
            //                             "url": "backstageUser.html",
            //                             "createDt": "2017-03-07 11:28:06",
            //                             "createUser": "",
            //                             "lastModifyDt": "2017-03-07 11:28:10",
            //                             "lastModifyUser": "",
            //                             "isEnable": 1,
            //                             "tenantId": "pcn.zhongshan",
            //                             "hasChild": false
            //                         },
            //                         {
            //                             "moduleId": 25,
            //                             "parentModuleId": 13,
            //                             "moduleCode": "",
            //                             "moduleName": "app更新",
            //                             "groupType": "1",
            //                             "desc": "",
            //                             "createDt": "2017-03-07 11:28:06",
            //                             "createUser": "",
            //                             "lastModifyDt": "2017-03-07 11:28:10",
            //                             "lastModifyUser": "",
            //                             "isEnable": 1,
            //                             "tenantId": "pcn.zhongshan",
            //                             "hasChild": false
            //                         },
            //                         {
            //                             "moduleId": 26,
            //                             "parentModuleId": 13,
            //                             "moduleCode": "",
            //                             "moduleName": "系统模块",
            //                             "groupType": "1",
            //                             "desc": "",
            //                             "createDt": "2017-03-07 11:28:06",
            //                             "createUser": "",
            //                             "lastModifyDt": "2017-03-07 11:28:10",
            //                             "lastModifyUser": "",
            //                             "isEnable": 1,
            //                             "tenantId": "pcn.zhongshan",
            //                             "hasChild": false
            //                         },
            //                         {
            //                             "moduleId": 27,
            //                             "parentModuleId": 13,
            //                             "moduleCode": "",
            //                             "moduleName": "日志管理",
            //                             "groupType": "1",
            //                             "desc": "",
            //                             "createDt": "2017-03-07 11:28:06",
            //                             "createUser": "",
            //                             "lastModifyDt": "2017-03-07 11:28:10",
            //                             "lastModifyUser": "",
            //                             "isEnable": 1,
            //                             "tenantId": "pcn.zhongshan",
            //                             "hasChild": false
            //                         },
            //                         {
            //                             "moduleId": 28,
            //                             "parentModuleId": 13,
            //                             "moduleCode": "",
            //                             "moduleName": "字典维护",
            //                             "groupType": "1",
            //                             "desc": "",
            //                             "createDt": "2017-03-07 11:28:06",
            //                             "createUser": "",
            //                             "lastModifyDt": "2017-03-07 11:28:10",
            //                             "lastModifyUser": "",
            //                             "isEnable": 1,
            //                             "tenantId": "pcn.zhongshan",
            //                             "hasChild": false
            //                         }
            //                     ],
            //                     "hasChild": true
            //                 }
            //             ],
            //             "hasChild": true
            //         }];


            // zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);


        },
        methods: {

        }
}
</script>
<style scoped>
</style>
