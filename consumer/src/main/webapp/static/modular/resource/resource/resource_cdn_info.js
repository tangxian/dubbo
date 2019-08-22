/**
 * 初始化字典详情对话框
 */
var ResourceCdnInfoDlg = {
    count: $("#itemSize").val(),
    cndpath: '',			//CDN地址
    mutiString: '',		//拼接字符串内容(拼接字典条目)
    itemTemplate: $("#itemTemplate").html()
};

/**
 * 关闭此对话框
 */
ResourceCdnInfoDlg.close = function () {
    parent.layer.close(window.parent.Resource.layerIndex);
};

/**
 * item获取新的id
 */
ResourceCdnInfoDlg.newId = function () {
    if(this.count == undefined){
        this.count = 0;
    }
    this.count = this.count + 1;
    return "cdnPathItem" + this.count;
};

/**
 * 添加条目
 */
ResourceCdnInfoDlg.addItem = function () {
    $("#itemsArea").append(this.itemTemplate);
    $("#cdnPathItem").attr("id", this.newId());
};

/**
 * 删除item
 */
ResourceCdnInfoDlg.deleteItem = function (event) {
    var obj = Feng.eventParseObject(event);
    obj = obj.is('button') ? obj : obj.parent();
    obj.parent().parent().remove();
};

/**
 * 清除为空的item Dom
 */
ResourceCdnInfoDlg.clearNullDom = function(){
    $("[name='cdnPathItem']").each(function(){
        var cndpath = $(this).find("[name='cndpath']").val();
        if(cndpath == ''){
            $(this).remove();
        }
    });
};

/**
 * 收集添加字典的数据
 */
ResourceCdnInfoDlg.collectData = function () {
    this.clearNullDom();
    var mutiString = "";
    $("[name='cdnPathItem']").each(function(){
        var cndpath = $(this).find("[name='cndpath']").val();
        mutiString = mutiString + (cndpath +"#@#");
    });
    this.mutiString = mutiString.length>0?mutiString.substr(0,mutiString.length-3):mutiString;
};

/**
 * 提交修改
 */
ResourceCdnInfoDlg.editSubmit = function () {
    this.collectData();
    var ajax = new $ax(Feng.ctxPath + "/resource/resource_cdn_update/save", function (data) {
        Feng.success("修改成功!");
        window.parent.Resource.table.refresh();
        ResourceCdnInfoDlg.close();
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set('resourceId',$("#resourceId").val());
    ajax.set('resourcefilecdnpath',this.mutiString);
    ajax.start();
};
