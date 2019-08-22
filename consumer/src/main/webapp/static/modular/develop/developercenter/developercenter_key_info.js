/**
 * 初始化开发者管理KEY详情对话框
 */
var DevKeyInfoDlg = {
    devKeyInfoData : {},
    validateFields: {
    	appname: {
            validators: {
                notEmpty: {
                    message: '不能为空应用名称'
                }
            }
        },
        apptype: {
            validators: {
                notEmpty: {
                    message: '应用类型不能为空'
                }
            }
        },
        appintro: {
            validators: {
                notEmpty: {
                    message: '应用简介不能为空'
                }
            }
        },
        appkey: {
            validators: {
                notEmpty: {
                    message: 'appkey不能为空'
                }
            }
        },
        secretkey: {
            validators: {
                notEmpty: {
                    message: 'secretkey不能为空'
                }
            }
        }
    }
};

/**
 * 清除数据
 */
DevKeyInfoDlg.clearData = function() {
    this.devKeyInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
DevKeyInfoDlg.set = function(key, val) {
    this.devKeyInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
DevKeyInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
DevKeyInfoDlg.close = function() {
    parent.layer.close(window.parent.DevelopercenterKey.layerIndex);
}

/**
 * 收集数据
 */
DevKeyInfoDlg.collectData = function() {
    this
        .set("id")
    .set('appname')
    .set('apptype')
    .set('appintro')
    .set('appkey')
    .set('secretkey')
}
/**
 * 验证数据是否为空
 */
DevKeyInfoDlg.validate = function () {
    $('#developercenterKeyInfoForm').data("bootstrapValidator").resetForm();
    $('#developercenterKeyInfoForm').bootstrapValidator('validate');
    return $("#developercenterKeyInfoForm").data('bootstrapValidator').isValid();
};
/**
 * 提交添加
 */
DevKeyInfoDlg.addSubmit = function() {
    this.clearData();
    this.collectData();
    if (!this.validate()) {
        return;
    }
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/developercenter/add", function(data){
        Feng.success("添加成功!");
        window.parent.location.reload();
        DevKeyInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.devKeyInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
DevKeyInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();
    if (!this.validate()) {
        return;
    }
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/developercenter/update", function(data){
        Feng.success("修改成功!");
        window.parent.location.reload();
        DevKeyInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.devKeyInfoData);
    ajax.start();
}

$(function() {
	Feng.initValidator("developercenterKeyInfoForm", DevKeyInfoDlg.validateFields);
});
