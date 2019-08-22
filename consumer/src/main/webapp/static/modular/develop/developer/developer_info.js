/**
 * 初始化开发者管理详情对话框
 */
var DeveloperInfoDlg = {
    developerInfoData: {},
    validateFields: {
        devaccount: {
            validators: {
                notEmpty: {
                    message: '邮箱账号不能为空'
                },
                regexp: {
                    regexp: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    message: '请输入正确的邮箱'
                }
            }
        },
        appname: {
            validators: {
                notEmpty: {
                    message: '应用名称不能为空'
                }
            }
        },
        companyname: {
            validators: {
                notEmpty: {
                    message: '企业名称不能为空'
                }
            }
        },
        companycode: {
            validators: {
                notEmpty: {
                    message: '企业信用码不能为空'
                }
            }
        },
        companyaddress: {
            validators: {
                notEmpty: {
                    message: '企业地址不能为空'
                }
            }
        },
        contacts: {
            validators: {
                notEmpty: {
                    message: '联系人不能为空'
                }
            }
        },
        phonenum: {
            validators: {
                notEmpty: {
                    message: '手机号不能为空'
                },
                regexp: {
                    regexp: /^(1[0-9][0-9])\d{8}$/,
                    message: '请输入正确的手机号'
                }
            }
        },
        divideproportion: {
            validators: {
                notEmpty: {
                    message: '分成比例不能为空'
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
DeveloperInfoDlg.clearData = function () {
    this.developerInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
DeveloperInfoDlg.set = function (key, val) {
    this.developerInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
DeveloperInfoDlg.get = function (key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
DeveloperInfoDlg.close = function () {
    parent.layer.close(window.parent.Developer.layerIndex);
}

/**
 * 收集数据
 */
DeveloperInfoDlg.collectData = function () {
    this.developerInfoData['contractfile'] = $("#contractfilefilename").val();
    this.developerInfoData['contractfilepath'] = $("#contractfile").val();
    this.developerInfoData['licensefilepath'] = $("#licensefile").val();
    this.developerInfoData['salemodel'] = $("#salemodel").val();
    this
        .set('id')
        .set('devaccount')
        .set('appname')
        .set('companyname')
        .set('companycode')
        .set('companyaddress')
        .set('contacts')
        .set('phonenum')
        .set('divideproportion')
        .set('status')
        .set('time')
        .set('remark');
}

/**
 * 验证数据是否为空
 */
DeveloperInfoDlg.validate = function () {
    $('#developerInfoForm').data("bootstrapValidator").resetForm();
    $('#developerInfoForm').bootstrapValidator('validate');
    return $("#developerInfoForm").data('bootstrapValidator').isValid();
};

/**
 * 提交添加
 */
DeveloperInfoDlg.addSubmit = function () {

    this.clearData();
    this.collectData();
    console.log(this.validate());
    if (!this.validate()) {
        return;
    }
    var contractfile = $("#contractfile").val();
    if (contractfile.length == 0) {
        Feng.error("请上传合同附件");
        return;
    }
    var licensefile = $("#licensefile").val();
    if (licensefile.length == 0) {
        Feng.error("请上传营业执照");
        return false;
    }
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/developer/add", function (data) {
        Feng.success("添加成功!");
        window.location.reload();
        //window.parent.Developer.table.refresh();
        //DeveloperInfoDlg.close();
    }, function (data) {
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.developerInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
DeveloperInfoDlg.editSubmit = function () {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/developer/update", function (data) {
        Feng.success("修改成功!");
        window.parent.Developer.table.refresh();
        DeveloperInfoDlg.close();
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.developerInfoData);
    ajax.start();
}

/**
 * 审核通过
 */
DeveloperInfoDlg.pass = function () {
    //销售模式 销售分成比例非空校验
    if ($("#salemodel").val() == 1) {
        if ($("#divideproportion").val() == 0) {
            Feng.error("请填写销售分成比例!")
            return;
        }
    }
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/developer/pass", function (data) {
        Feng.success("操作成功!");
        window.parent.Developer.table.refresh();
        DeveloperInfoDlg.close();
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set("id", $("#id").val());
    ajax.set("salemodel",$("#salemodel").val());
    ajax.set("divideproportion",$("#divideproportion").val());
    ajax.start();
}
/**
 * 选择销售模式
 */
DeveloperInfoDlg.modelChange = function (value) {
    if (value == 1) {
        $("#divideproportionDiv").css("display", "block");
    } else {
        $("#divideproportionDiv").css("display", "none");
        $("#divideproportion").val(0);//清空分成比例
    }
}

/**
 * 审核不通过(驳回)
 */
DeveloperInfoDlg.reject = function () {
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/developer/reject", function (data) {
        Feng.success("操作成功!");
        window.parent.Developer.table.refresh();
        DeveloperInfoDlg.close();
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set("id", $("#id").val());
    ajax.start();
}

$(function () {
    Feng.initValidator("developerInfoForm", DeveloperInfoDlg.validateFields);
    // 初始化资源上传
    var fileUp = new $WebUploadFile("contractfile");
    fileUp.setUploadBarId("progressBar");
    fileUp.init();
    // 初始化营业执照上传
    var avatarUp = new $WebUpload("licensefile");
    avatarUp.setUploadBarId("progressBar");
    avatarUp.init();
    //初始化销售模式
    var salemodel = $("#salemodel1").val();
    if (salemodel != "" && typeof(salemodel) != "undefined") {//销售模式有值
        if (salemodel == 1) {//统一零售价
            $("#divideproportionDiv").css("display", "block");
            $("#salemodel").val(1);
        } else {//统一定价
            $("#divideproportionDiv").css("display", "none");
            $("#salemodel").val(2);
            $("#divideproportion").val(0);//清空分成比例
        }
    } else {
        return;
    }
});
