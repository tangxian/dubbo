/**
 * 初始化资源管理详情对话框
 */
var ResourceInfoDlg = {
    resourceInfoData: {},
    editor: null,
    validateFields: {
        resourcecode: {
            validators: {
                notEmpty: {
                    message: '资源编码不能为空'
                }
            }
        },
        resourcename: {
            validators: {
                notEmpty: {
                    message: '资源名称不能为空'
                }
            }
        },
        publish: {
            validators: {
                notEmpty: {
                    message: '出版社不能为空'
                }
            }
        },
        author: {
            validators: {
                notEmpty: {
                    message: '作者不能为空'
                }
            }
        }
    }
};

/**
 * 清除数据
 */
ResourceInfoDlg.clearData = function () {
    this.resourceInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ResourceInfoDlg.set = function (key, val) {
    this.resourceInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ResourceInfoDlg.get = function (key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
ResourceInfoDlg.close = function () {
    parent.layer.close(window.parent.Resource.layerIndex);
}

/**
 * 收集数据
 */
ResourceInfoDlg.collectData = function () {
    this.resourceInfoData['intro'] = encodeURI(ResourceInfoDlg.editor.txt.html());
    //获取复选框的值 转为字符串
    var resourceitem = new Array();
    $("input[name='resourceitem']:checked").each(function () {
        resourceitem.push($(this).val());
    });
    var resourceitemStr = resourceitem.join();
    this.resourceInfoData['resourceitem'] = resourceitemStr;
    this
        .set('id')
        .set('resourcecode')
        .set('resourcename')
        .set('publish')
        .set('author')
        .set('coverpicture')
        .set('resourcestatus')
        .set('resourcefilecdnpath')
        .set('time')
        .set('remark')
        .set('userid');
}

/**
 * 验证数据是否为空
 */
ResourceInfoDlg.validate = function () {
    $('#resourceInfoForm').data("bootstrapValidator").resetForm();
    $('#resourceInfoForm').bootstrapValidator('validate');
    return $("#resourceInfoForm").data('bootstrapValidator').isValid();
};

/**
 * 提交添加
 */
ResourceInfoDlg.addSubmit = function () {
    //验证资源类型是否为空
    var resourceitem = $("input[name='resourceitem']:checked").val();
    if (resourceitem == null || resourceitem == "") {
        Feng.error("请选择资源类型");
        return;
    }
    this.clearData();
    this.collectData();
    if (!this.validate()) {
        return;
    }
    var coverpicture = $("#coverpicture").val();
    var resourcefile = $("#resourceFile").val();
    if (coverpicture.length == 0) {
        Feng.error("请上传封面图片");
        return;
    }
    if (resourcefile.length == 0) {
        Feng.error("请选择资源文件");
        return;
    }
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/resource/add", function (data) {
        Feng.success("添加成功!");
        window.location.reload();
        //ResourceInfoDlg.close();
    }, function (data) {
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.resourceInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
ResourceInfoDlg.editSubmit = function () {
    this.clearData();
    this.collectData();

    if (!this.validate()) {
        return;
    }
    var coverpicture = $("#coverpicture").val();
    if (coverpicture.length == 0) {
        Feng.error("请上传封面图片");
        return;
    }
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/resource/update", function (data) {
        Feng.success("修改成功!");
        window.parent.Resource.table.refresh();
        ResourceInfoDlg.close();
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.resourceInfoData);
    ajax.start();
};
//资源文件选中填充资源编码和资源名称
ResourceInfoDlg.resourceFileChange = function (resourcecode) {
    if (resourcecode.length == 0) {
        return;
    }
    var option = $("#resourceFile option:selected");//获取当前选中项
    $("#resourcecode").val(resourcecode);
    $("#resourcename").val(option.text());
};

$(function () {
    Feng.initValidator("resourceInfoForm", ResourceInfoDlg.validateFields);
    var resourceitem_hidden = $("#resourceitem_hidden").val();
    //查询资源类型复选框
    var ajax = new $ax(Feng.ctxPath + "/dict/selectbyparentcodelist", function (data) {
        var strHtml = '';
        $.each(data, function (key, val) {
            if (resourceitem_hidden != "" && resourceitem_hidden != null) {//编辑资源
                var resourceitemArr = resourceitem_hidden.split(",");
                var flag = 0;
                for (var i = 0; i < resourceitemArr.length; i++) {
                    if (val.code == resourceitemArr[i]) {
                        flag = 1;
                    }
                }
                if (flag == 0) {
                    strHtml += '<input type="checkbox" name="resourceitem" value="' + val.code + '"><span class="m-l-xs">' + val.name + '</span><br/>';
                } else if (flag == 1) {
                    strHtml += '<input type="checkbox" checked="checked" name="resourceitem" value="' + val.code + '"><span class="m-l-xs">' + val.name + '</span><br/>';
                }
            } else {//新建资源
                if (val.code == 1) {
                    strHtml += '<input type="checkbox" checked="checked" name="resourceitem" value="' + val.code + '"><span class="m-l-xs">' + val.name + '</span><br/>';
                } else {
                    strHtml += '<input type="checkbox" name="resourceitem" value="' + val.code + '"><span class="m-l-xs">' + val.name + '</span><br/>';
                }
            }
        });
        $("#resourceitem").html(strHtml);
    }, function (data) {
        Feng.error("页面初始化失败!");
    });
    ajax.set("code", "resource_item");
    ajax.start();

    //初始化资源文件下拉框
      var ajax_resourceFile = new $ax(Feng.ctxPath + "/resource/selectResourceFile", function (data) {
          var strHtml = '<option value="">请选择资源</option>';
          $.each(JSON.parse(data).data.books, function (key, val) {
              strHtml += '<option  value ="' + val.id + '">' + val.name + '</option>';
          });
          $("#resourceFile").html(strHtml);
          console.log(Feng.ctxPath);
      }, function (data) {
          Feng.error("页面初始化失败!");
      });
      ajax_resourceFile.set("name", "waiyanshe");
      ajax_resourceFile.set("pageNo", "5");
      ajax_resourceFile.set("pageSize", "20");
      ajax_resourceFile.start();
    //初始化编辑器
    var E = window.wangEditor;
    var editor = new E('#editor');
    editor.create();
    editor.txt.html($("#introVal").val());
    ResourceInfoDlg.editor = editor;
    // 初始化封面上传
    var avatarUp = new $WebUpload("coverpicture");
    avatarUp.setUploadBarId("progressBar");
    avatarUp.init();
});
