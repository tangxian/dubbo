/**
 * 初始化资源管理详情对话框
 */
var ResourcePutAwayDlg = {
    resourcePutAwayData: {},
    editor: null,
    validateFields: {
        retailprice: {
            validators: {
                notEmpty: {
                    message: '统一零售价不能为空'
                },
                regexp: {
                    regexp: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,5})))$/,
                    message: '请输入有效的数字'
                }
            }
        },
        retailpricedividedeveloper: {
            validators: {
                notEmpty: {
                    message: '开发者比例分成不能为空'
                },
                regexp: {
                    regexp: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,5})))$/,
                    message: '请输入有效的数字'
                }
            }
        },
        retailpricedividepublish: {
            validators: {
                notEmpty: {
                    message: '出版社比例分成不能为空'
                },
                regexp: {
                    regexp: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,5})))$/,
                    message: '请输入有效的数字'
                }
            }
        },
        unifiedprice: {
            validators: {
                notEmpty: {
                    message: '开发者购买价不能为空'
                },
                regexp: {
                    regexp: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,5})))$/,
                    message: '请输入有效的数字'
                }
            }
        },
        unifiedpricedividepublish: {
            validators: {
                notEmpty: {
                    message: '出版社分成比例不能为空'
                },
                regexp: {
                    regexp: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,5})))$/,
                    message: '请输入有效的数字'
                }
            }
        }
    }
};

/**
 * 清除数据
 */
ResourcePutAwayDlg.clearData = function () {
    this.resourcePutAwayData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ResourcePutAwayDlg.set = function (key, val) {
    this.resourcePutAwayData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ResourcePutAwayDlg.get = function (key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
ResourcePutAwayDlg.close = function () {
    parent.layer.close(window.parent.Resource.layerIndex);
}

/**
 * 收集数据
 */
ResourcePutAwayDlg.collectData = function () {
    this.resourcePutAwayData['developerids'] = $("#developer").val() != null ? $("#developer").val().join(",") : "";
    this.resourcePutAwayData['id'] = $("#putawayinfoid").val();
    this
        .set('resourceid')
        .set('authorization')
        .set('retailprice')
        .set('retailpricedividedeveloper')
        .set('retailpricedividepublish')
        .set('retailpricedividediruicloud')
        .set('unifiedprice')
        .set('unifiedpricedividepublish')
        .set('unifiedpricedividediruicloud');
}

/**
 * 选择授权范围
 */
ResourcePutAwayDlg.authChange = function (value) {
    if (value == 1) {
        $("#developerdiv").css("display", "none");
    } else {
        $("#developerdiv").css("display", "block");
        $("#developerdiv").css("display", "inline");
        $("#developer").css("width", "200px");
        $("#developer_chosen").css("width", "200px");
        $(".default").css("width", "90px");
    }
}

/**
 * 验证数据是否为空
 */
ResourcePutAwayDlg.validate = function () {
    $('#resourcePutAwayForm').data("bootstrapValidator").resetForm();
    $('#resourcePutAwayForm').bootstrapValidator('validate');
    return $("#resourcePutAwayForm").data('bootstrapValidator').isValid();
};

/**
 * 上架提交
 */
ResourcePutAwayDlg.Submit = function () {
    var authorization = $("#authorization").val();
    var developer = $("#developer").val();
    if (authorization == 2) {
        if (developer == null) {
            Feng.error("请选择开发者");
            return;
        }
    }
    this.clearData();
    this.collectData();
    if (!this.validate()) {
        return;
    }
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/resource/putaway_save", function (data) {
        Feng.success("上架成功!");
        window.parent.Resource.table.refresh();
        ResourcePutAwayDlg.close();
    }, function (data) {
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.resourcePutAwayData);
    ajax.start();
}

/**
 * 修改上架信息
 */
ResourcePutAwayDlg.editSubmit = function () {
    var authorization = $("#authorization").val();
    var developer = $("#developer").val();
    if (authorization == 2) {
        if (developer == null) {
            Feng.error("请选择开发者");
            return;
        }
    }
    this.clearData();
    this.collectData();
    if (!this.validate()) {
        return;
    }
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/resource/putaway_update", function (data) {
        Feng.success("修改成功!");
        window.parent.Resource.table.refresh();
        ResourcePutAwayDlg.close();
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.resourcePutAwayData);
    ajax.start();
}
$(function () {


    Feng.initValidator("resourcePutAwayForm", ResourcePutAwayDlg.validateFields);

    /**
     * 查询开发者下拉框
     */
    var ajax = new $ax(Feng.ctxPath + "/developer/allList", function (data) {
        var strHtml = '';
        var developerids = $("#developerids").val();
        if ("" != developerids) {//指定开发者
            var developeridsArr = developerids.split(",");
            $.each(data, function (key, val) {
                var flag = 0;
                for (var i = 0; i < developeridsArr.length; i++) {
                    if (val.id == developeridsArr[i]) {
                        flag = 1;
                    }
                }
                if (flag == 1) {
                    strHtml += '<option value="' + val.id + '" selected hassubinfo="true">' + val.appname + '</option>';
                } else if (flag == 0) {
                    strHtml += '<option value="' + val.id + '" hassubinfo="true">' + val.appname + '</option>';
                }
            })
        } else {//全部开发者
            $.each(data, function (key, val) {
                strHtml += '<option value="' + val.id + '" hassubinfo="true">' + val.appname + '</option>';
            })
        }
        $("#developer").html(strHtml);
        /**
         *开发者类型
         */
        var authorization1 = $("#authorization1").val();
        $("#authorization").val(authorization1);
        ResourcePutAwayDlg.authChange(authorization1);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax.set("status", "1");
    ajax.start();
});
