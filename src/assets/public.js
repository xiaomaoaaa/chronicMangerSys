var Rxports = {
    // 接口汇总
    // 通用ajax请求接口地址
    MENU_URL: function() {
        var menuurl = "/proxyapi/coms-web/*.jsonRequest";
        return menuurl;
    },
    // 登录接口地址获取角色id
    ROLES_URL: function() {
        var rolesurl = "/proxyapi/coms-web/logon/myRoles";
        return rolesurl;
    },

    // 登录接口地址
    LOGIN_URL: function() {
        var loginurl = "/proxyapi/coms-web/logon/login";
        return loginurl;
    },
    //退出接口地址
    LOGOUT_URL: function() {
        var logout = "/proxyapi/coms-web/logon/logout";
        return logout;
    },
    //修改密码接口地址
    CHANGEPWD_URL: function() {
        var changepwd = "/proxyapi/coms-web/logon/changepwd";
        return changepwd;
    },
    // 图片上传接口地址
    IMGUPLOAD_URL: function() {
        var imgupload = "/proxyapi/coms-web/admin/file/upload";
        return imgupload;
    },
    // 图片预览地址
    IMGVIEW_URL: function() {
        var imgview_url = "http://115.236.19.147:15981/bs-coms/upload/";
        // id=274 bg1.jpg id=275 bg2.jpg id=276 bg3.jpg
        // var imgview_url = "http://10.0.26.23:8071/coms-web/upload/"; //江辉电脑
        // var imgview_url = "http://10.0.26.61:8085/coms-web/upload/"; //朱雄敏电脑IP电脑

        return imgview_url;
    },

    // 数据加载中
    loading: function(str) {
        var str = !str ? '数据加载中...' : str;
        var loadCon = $(" <div id='loading'><div class='bg_master'></div><div class='toast'><p class='weui_toast_content'>" + str + "</p></div></div>");
        $("body").append(loadCon);
    },
    // 获取请求令牌accessToken
    getsessionStorage: function(str) {
        return sessionStorage.getItem(str)
    },
    // 数据加载结束
    stoploading: function() {
        $("#loading").remove();
    },

    // 通用ajax请求方法
    commonajax: function(ServiceId, ServiceMethod, params) {　
        var dtd = $.Deferred(); //在函数内部，新建一个Deferred对象
        $.ajax({
            url: Rxports.MENU_URL(),
            type: "POST",
            headers: {
                "X-Access-Token": sessionStorage.getItem('accessToken'),
                "X-Service-Id": ServiceId,
                "X-Service-Method": ServiceMethod,
                "Content-Type": "application/json"
            },
            dataType: "JSON",
            data: params,
            beforeSend: function() {
                Rxports.loading("")
            },
            success: function(res) {
                Rxports.stoploading();
                dtd.resolve(res);
            },
            error: function(err) {
                Rxports.stoploading();
                return err
            }
        });
        return dtd.promise();
    },

    // 表单异步请求
    formajax: function(url, id) {
        var formData = new FormData($(id)[0]);
        var dtd = $.Deferred(); //在函数内部，新建一个Deferred对象
        $.ajax({
            // url: '/view/advisory/add',
            url: url,
            type: 'POST',
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function() {
                Rxports.loading()
            },
            success: function(res) {
                Rxports.stoploading()
                dtd.resolve(res);
            },
            error: function(xhr, type) {
                Rxports.stoploading()
            }
        })
        return dtd.promise();
    },
    // 获取url的字符串参数
    getParameter: function(param) {
        var query = window.location.search;

        var iLen = param.length;
        var iStart = query.indexOf(param);
        if (iStart == -1)
            return "";
        iStart += iLen + 1;
        var iEnd = query.indexOf("&", iStart);
        if (iEnd == -1) {
            return query.substring(iStart);
        }

        return query.substring(iStart, iEnd);
    },
    // 获取字符串参数
    // getstrParameter: function(query, param) {
    //     var iLen = param.length;
    //     var iStart = query.indexOf(param);
    //     if (iStart == -1)
    //         return "";
    //     iStart += iLen + 1;
    //     var iEnd = query.indexOf("&", iStart);
    //     if (iEnd == -1) {
    //         return query.substring(iStart);
    //     }

    //     return query.substring(iStart, iEnd);
    // },
    // 时间格式化
    formatDate: function(timestamp, format) {
        if (timestamp) {
            var d = new Date(timestamp);
        } else {
            var d = new Date();
        }

        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();
        if (format) {
            if (month >= 10) {
                return year + "-" + month + "-" + date;
            } else {
                return year + "-0" + month + "-" + date;
            }
        } else {
            // return year + "-" + (month < 10 ? '0' + month : month) + "-" + (date < 10 ? '0' + date : date) + "   " + (hour < 10 ? '0' + hour : hour) + ":" + (minute < 10 ? '0' + minute : minute) + ":" + (second < 10 ? '0' + second : second);
            // return year + "-" + (month < 10 ? '0' + month : month) + "-" + (date < 10 ? '0' + date : date) + "   " + (hour < 10 ? '0' + hour : hour) + ":" + (minute < 10 ? '0' + minute : minute);
            return year + "-" + (month < 10 ? '0' + month : month) + "-" + (date < 10 ? '0' + date : date);
        }
    },

    ajaxPrompt: function(str) {
        var html_con = $("<div id='ajaxPrompt'><div class='bg_master1'></div><div class='toast toast1'><p class='weui_toast_content'>" + str + "</p></div></div>");
        $("body").append(html_con);
        setTimeout(function() {
            $("#ajaxPrompt").remove();
        }, 2000);

    },
    // confirmPrompt: function(str) {
    //     var html_con = $("<div id='confirmPrompt'><div class='bg_master1'></div><div class='toast3'><p>" + str + "</p><p> <button class='btn btn-success' id='savedata'>保存</button><button type='button' class='btn btn-danger' id='cancledata'>取消</button></p></div></div>");
    //     $("body").append(html_con);
    // },
    // 验证表单的字数
    gbcount: function(message, total, used, remain) {

        var max;
        max = total.value;

        if (message.value.length > max) {

            message.value = message.value.substring(0, max);

            used.value = max;

            remain.value = 0;
            alert("不能超过150个字!");
        } else {

            used.value = message.value.length;

            remain.value = max - used.value;

        }

    },
    // 数组去重复
    arrunique: function(arr, str) {
        for (var i = 0, temp = {}, result = [], ci; ci = arr[i++];) {
            var ordid = ci[str];
            if (temp[ordid]) {
                continue;
            }
            temp[ordid] = true;
            result.push(ci);
        }
        return result

    },
    // 通过身份证获取生日
    getBirthdatByIdNo: function(iIdNo) {
        var tmpStr = "";
        iIdNo = $.trim(iIdNo);
        if (iIdNo.length == 0) {
            return tmpStr
        }
        if (iIdNo.length == 15) {
            tmpStr = iIdNo.substring(6, 12);
            tmpStr = "19" + tmpStr;
            tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
            return tmpStr;
        } else {
            tmpStr = iIdNo.substring(6, 14);
            tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
            return tmpStr;
        }
    },
    // 通过身份证获取性别
    getSexByIdNo: function(iIdNo) {
        var tmpStr = "";
        iIdNo = $.trim(iIdNo);
        if (iIdNo.length == 0) {
            return tmpStr
        }
        if (iIdNo.length == 15) {
            tmpStr = iIdNo.substring(14);

        } else {
            tmpStr = iIdNo.substring(16, 17);
        }
        if (parseInt(tmpStr) % 2 == 0) {
            return 2;
        } else {
            return 1
        }
    },
    //去除两个数组的重复元素
    // array_diff: function(a, b, str) {
    //     for (var i = 0; i < b.length; i++) {
    //         for (var j = 0; j < a.length; j++) {
    //             if (a[j][str] == b[i][str]) {
    //                 a.splice(j, 1);
    //                 j = j - 1;
    //             }
    //         }
    //     }
    //     return a;
    // },
}
module.exports = Rxports